import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { stringConstants } from '../../../constants/loss-of-excise-goods.constants';
import { LossExciseGoodsService } from 'src/app/services/loss-excise-goods.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-report-excise-goods',
  templateUrl: './report-excise-goods.component.html',
  styleUrls: ['./report-excise-goods.component.css'],
})
export class ReportExciseGoodsComponent implements OnInit {
  lang: string;

  stringConstants;

  list;

  tableView: boolean = false;

  searchFilter: string = '';

  filteredList;

  statusList;

  statusFilter: any[] = [];

  activeStatusFilter: any[] = [];

  view: boolean = false;

  formData;

  formTotal = {
    units: 0,
    rsp: '',
    et: '',
  };

  constructor(
    private lossExciseGoodsService: LossExciseGoodsService,
    public router: Router,
    public decimalPipe: DecimalPipe,
    public appSrv: AppService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'ar';
      this.stringConstants = stringConstants.ar;
    } else {
      this.lang = 'en';
      this.stringConstants = stringConstants.en;
    }

    this.getInitialData();
  }

  getInitialData() {
    this.lossExciseGoodsService.getInitialData().subscribe(
      (response) => {
        this.statusList = response['d'].STATUSSet.results;

        let list = response['d'].WI_DTLSet.results.filter(
          (item) =>
            this.statusList.findIndex(
              (filter) => filter.Estat === item.Status
            ) > -1
        );

        list.map((item) => {
          const index = this.statusList.findIndex(
            (status) => status.Estat === item.Status
          );

          if (index > -1) {
            item.StatusTxt = this.statusList[index].Txt30;
          }
        });

        this.list = list;
        this.filteredList = list;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewToggle(value) {
    this.tableView = value;
  }

  addNewLoss() {
    this.router.navigate(['/mains/lossexcisegoods/add']);
  }

  onSearchFilter() {
    this.activeStatusFilter = this.statusFilter;

    if (this.searchFilter) {
      const nameFilter = this.list.filter(
        (item) => item.FbtText.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      const formFilter = this.list.filter(
        (item) => item.Fbnum.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      const statusFilter = this.list.filter(
        (item) => item.StatusTxt.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      const list = [...nameFilter, ...formFilter, ...statusFilter];

      let newList = [];

      if (this.activeStatusFilter.length > 0) {
        list.map((item) => {
          const index = this.statusFilter.findIndex(
            (filter) => filter.Estat === item.Status
          );

          if (index > -1) {
            newList = [...newList, item];
          }
        });

        this.filteredList = [...new Set(newList)];
      } else {
        this.filteredList = [...new Set(list)];
      }
    } else {
      let newList = [];

      if (this.activeStatusFilter.length > 0) {
        this.list.map((item) => {
          const index = this.statusFilter.findIndex(
            (filter) => filter.Estat === item.Status
          );

          if (index > -1) {
            newList = [...newList, item];
          }
        });

        this.filteredList = [...new Set(newList)];
      } else {
        this.filteredList = this.list;
      }
    }
  }

  resetSearchFilter() {
    this.searchFilter = '';
    this.onSearchFilter();
  }

  onStatusFilter(status) {
    if (this.statusFilter.indexOf(status) < 0) {
      this.statusFilter = [...this.statusFilter, status];
    } else {
      this.statusFilter = this.statusFilter.filter((value) => value !== status);
    }
  }

  // applyStatusFilter() {
  //   this.activeStatusFilter = this.statusFilter;
  //   if (this.activeStatusFilter.length > 0) {
  //     let list = [];

  //     const mainList = this.searchFilter ? this.filteredList : this.list;

  //     mainList.map((item) => {
  //       const index = this.statusFilter.findIndex(
  //         (filter) => filter.Estat === item.Status
  //       );

  //       if (index > -1) {
  //         list = [...list, item];
  //       }
  //     });

  //     this.filteredList = list;
  //   } else {
  //     this.filteredList = this.list;
  //   }
  // }

  setStatusFilter() {
    this.statusFilter = this.activeStatusFilter;
  }

  resetStatusFilter() {
    this.statusFilter = [];
  }

  viewForm(data) {
    this.lossExciseGoodsService.getFormData(data).subscribe(
      (response) => {
        this.view = true;

        let formData = {
          name: response['d'].McName1,
          fin: response['d'].Psobkey,
          irrLoss: response['d'].IrrLoss === '1' ? 'Yes' : 'No',
          lossType: response['d'].TypeLoss,
          whItems: response['d'].ETLG_ITMSet.results,
          attachments: response['d'].ATTACHSet.results,
          status: response['d'].Statusx,
          statusTxt: '',
        };

        const index = this.statusList.findIndex(
          (status) => status.Estat === formData.status
        );

        if (index > -1) {
          formData.statusTxt = this.statusList[index].Txt30;
        }

        let notes = '';
        response['d'].NOTESSet.results.map((note) => {
          notes += note.Strline;
        });

        formData['notes'] = notes;

        this.formData = formData;

        this.calculateFormTotal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateFormTotal() {
    let formTotal = {
      units: 0,
      rsp: 0,
      et: 0,
    };

    this.formData.whItems.map((item) => {
      formTotal.units += parseInt(item.PUnit);
      formTotal.rsp += parseFloat(item.TotalRsp);
      formTotal.et += parseFloat(item.ExciseTax);
    });

    this.formTotal.units = formTotal.units;
    this.formTotal.rsp = formTotal.rsp.toFixed(2);
    this.formTotal.et = formTotal.et.toFixed(2);
  }

  back() {
    if (this.view) {
      this.view = false;
      this.formData = {};
    }
  }

  backTo(process): void {
    this.router.navigate(['/mains/tax']);
    if (process === '28') {
      this.appSrv.updatedDataSelection9('002');
      this.appSrv.updatedDataSelection11(process);
    } else {
      this.appSrv.updatedDataSelection9(process);
    }
  }
}
