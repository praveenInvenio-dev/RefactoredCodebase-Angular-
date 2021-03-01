import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { CorrespondanceService } from 'src/app/services/correspondance.service';
import { correspondanceConstants } from '../../constants/correspondanceConstants';

@Component({
  selector: 'app-correspondance',
  templateUrl: './correspondance.component.html',
  styleUrls: ['./correspondance.component.css'],
})
export class CorrespondanceComponent implements OnInit {
  lang: string;

  correspondanceConstants;

  correspondanceList = [];

  filteredList = [];

  selectedMessages = [];

  selectAll: boolean = false;

  viewMessage = null;

  viewMessageIndex: number;

  searchFilter: string = '';

  setFavoriteFilter: boolean = false;
  Cokey: string;
  indexValue: string;

  constructor(public correspondanceService: CorrespondanceService,
    private routers: ActivatedRoute,) { }

  ngOnInit(): void {
    moment.locale('en');
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'ar';
      moment.locale('ar');
    } else {
      this.lang = 'en';
      moment.locale('en');
    }

    this.correspondanceConstants = correspondanceConstants;
    this.routers.queryParams.subscribe((queryParams: any) => {
      this.Cokey = queryParams.Cokey;
      this.indexValue = queryParams.indexValue;
      this.correspondanceList = [];
      this.getInitialData();
    });
    // this.getInitialData();
  }

  getInitialData() {
    this.correspondanceService.getInitialData().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.correspondanceService.getZakatCorresepondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.correspondanceService.getVatCorrespondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.correspondanceService.getEtCorrespondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.correspondanceService.getEpCorrespondanceList().subscribe(
      (response) => {
        this.formatResponseData(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatResponseData(response) {
    if (response.d.results.length > 0) {
      response.d.results.map((item) => {
        let correspondanceItem = {
          Cotxt: item.Descript,
          Cotyp: item.Cotyp,
          Fbnum: item.Fbnum,
          Cokey: item.Cokey,
          Ltrno: item.LetterNum,
          Txtdo: `${item.CoidtAr} - ${item.CoitmAr}`,
          Langu: item.Langz,
          Cdate: '',
          date: '',
          Vkont: item.Vkont,
        };

        if (item.Zzfav || item.Zzfav === '') {
          correspondanceItem['Zzfav'] = item.Zzfav;
        }
        moment.locale(this.lang);
        const date = parseInt(item.Cdate.replace(/\D/g, ''));

        const Cday =
          this.lang === 'en'
            ? moment(date).format('ddd')
            : correspondanceConstants.message.days.ar[moment(date).day()];

        const Cdate = `${Cday} ${moment(date).format('Do MMM YYYY')} ${moment(
          item.Coitm.replace(/\D/g, ''),
          'hhmmss'
        ).format('hh:mm a')}`;

        correspondanceItem.Cdate = Cdate;

        const day =
          this.lang === 'en'
            ? moment(correspondanceItem.Txtdo, 'YYYY/MM/DD - hh:mm').format(
                'ddd'
              )
            : correspondanceConstants.message.days.ar[
                moment(correspondanceItem.Txtdo, 'YYYY/MM/DD - hh:mm').day()
              ];

        correspondanceItem.date = `${day} ${moment(
          correspondanceItem.Txtdo,
          'YYYY/MM/DD - hh:mm'
        ).format('Do MMM YYYY hh:mm a')}`;

        this.correspondanceList = [
          ...this.correspondanceList,
          correspondanceItem,
        ];
      });
    }

    const list = this.correspondanceList.sort((a, b) => {
      const d1: any = moment(a.Cdate, 'Do MMM YYYY hh:mm a').valueOf();
      const d2: any = moment(b.Cdate, 'Do MMM YYYY hh:mm a').valueOf();
      return d2 - d1;
    });

    this.correspondanceList = list;
    this.filteredList = list;
    if (this.Cokey !== undefined) {
      this.onViewMessage(Number(this.indexValue), this.correspondanceList.filter((item) => item.Cokey === this.Cokey)[0]);
    }
  }

  // onSelectAll() {
  //   this.selectAll = !this.selectAll;

  //   if (this.selectAll) {
  //     let selectedMessages = [];

  //     this.messages.map((message, index) => {
  //       selectedMessages = [...selectedMessages, index];
  //     });

  //     this.selectedMessages = selectedMessages;
  //   } else {
  //     this.selectedMessages = [];
  //   }
  // }

  // onSelectMessage(index) {
  //   if (this.selectedMessages.indexOf(index) < 0) {
  //     this.selectedMessages = [...this.selectedMessages, index];
  //   } else {
  //     this.selectedMessages = this.selectedMessages.filter((i) => i !== index);
  //   }
  // }

  onFavoriteFilter() {
    this.viewMessage = null;
    this.viewMessageIndex = null;
    if (!this.setFavoriteFilter) {
      this.setFavoriteFilter = true;
      const list = this.correspondanceList.filter((item) => item.Zzfav === '1');
      this.filteredList = list;
    } else {
      this.setFavoriteFilter = false;
      this.filteredList = this.correspondanceList;
    }
  }

  onSearchFilter() {
    this.viewMessage = null;
    this.viewMessageIndex = null;
    if (this.searchFilter) {
      let arSearch;

      if (this.lang === 'ar') {
        arSearch = this.searchFilter
          .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => {
            return (d.charCodeAt(0) - 1632).toString();
          })
          .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => {
            return (d.charCodeAt(0) - 1776).toString();
          });
      }

      const title = this.correspondanceList.filter(
        (item) => item.Cotxt.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      if (this.lang === 'ar') {
      }

      const ltrNo = this.correspondanceList.filter(
        (item) =>
          item.Ltrno.search(
            new RegExp(this.lang === 'ar' ? arSearch : this.searchFilter, 'i')
          ) > -1
      );

      this.filteredList = [...title, ...ltrNo];
    } else {
      this.filteredList = this.correspondanceList;
    }
  }

  onFavoriteMessage(item) {
    this.correspondanceService.favoriteCorrespondance(item).subscribe(
      (response) => {
        const data = response['d'];

        const index = this.correspondanceList.findIndex(
          (listItem) => listItem.Cokey === data.Cokey
        );

        if (index > -1) {
          this.correspondanceList[index].Zzfav = data.Zzfav;
        }

        if (index === this.viewMessageIndex) {
          this.viewMessage.Zzfav = data.Zzfav;
        }

        if (this.setFavoriteFilter) {
          const list = this.correspondanceList.filter(
            (item) => item.Zzfav === '1'
          );

          let filterIndex;

          if (this.viewMessage) {
            filterIndex = list.findIndex(
              (listItem) => listItem.Cokey === this.viewMessage.Cokey
            );
          }

          if (filterIndex < 0) {
            this.viewMessage = null;
            this.viewMessageIndex = null;
          }

          this.filteredList = list;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onViewMessage(i, item) {
    this.viewMessageIndex = i;
    this.correspondanceService.getZakatCorrespondanceBody(item).subscribe(
      (response) => {
        let body = '';
        let Attfg = '';
        let Gpart = '';
        let Ltrno = '';
        let Hotline = '';

        if (response['d'].results && response['d'].results.length > 0) {
          response['d'].results.map((item) => {
            body += item.Tdline;
            Attfg += item.Attfg;
            Gpart = item.Gpart;
            Ltrno = item.Ltrno;
            Hotline = item.Hotline;
          });
        }

        this.viewMessage = {
          title: item.Cotxt,
          date:
            item.date === 'undefined Invalid date' ||
              item.date === 'Invalid date Invalid date'
              ? item.Cdate
              : item.date,
          Cotyp: item.Cotyp,
          Cokey: item.Cokey,
          body,
          Vkont: item.Vkont,
          Attfg,
          Gpart,
          Ltrno,
          Hotline,
        };

        if (item.Zzfav || item.Zzfav === '') {
          this.viewMessage['Zzfav'] = item.Zzfav;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDownloadAttachment(item) {
    if (item.Cotyp === 'RC03') {
      const link = document.createElement('a');
      link.setAttribute('target', '_self');
      link.setAttribute(
        'href',
        this.correspondanceService.downloadZakatCorrespondance(item)
      );
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (item.Cotyp === 'ZVT1') {
      const link = document.createElement('a');
      link.setAttribute('target', '_self');
      link.setAttribute(
        'href',
        this.correspondanceService.downloadVatCorrespondance(item)
      );
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (item.Cotyp === 'ZET1') {
      const link = document.createElement('a');
      link.setAttribute('target', '_self');
      link.setAttribute(
        'href',
        this.correspondanceService.downloadEtCorrespondance(item)
      );
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else if (item.Cotyp === 'EP02') {
      const link = document.createElement('a');
      link.setAttribute('target', '_self');
      link.setAttribute(
        'href',
        this.correspondanceService.downloadEpCorrespondance(item)
      );
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      const link = document.createElement('a');
      link.setAttribute('target', '_self');
      link.setAttribute(
        'href',
        this.correspondanceService.downloadCorrespondance(item)
      );
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
}
