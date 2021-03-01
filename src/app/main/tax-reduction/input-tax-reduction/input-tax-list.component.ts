import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import {
  RequestInputTaxService,
  SupportedPages,
} from 'src/app/services/request-input-tax.service';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { DateAdapter } from '@angular/material/core';
import { InputTaxReductionConstants } from './input-tax-reduction.constants';
import { InputTaxApplicationBasic } from './input-tax.model';
import { AppService } from 'src/app/app.service';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { NotifierService } from 'angular-notifier';

declare var $: any;

@Component({
  selector: 'app-input-tax-list',
  templateUrl: './input-tax-list.component.html',
  styleUrls: ['./input-tax-list.component.css'],
})
export class InputTaxListComponent implements OnInit {
  readonly page: string = SupportedPages.Input;
  headerComponent = CalendarComponent;
  lang: string;
  translation: any;
  pageTranslation: any;
  listPageTranslation: any;
  filteredDate = new FormControl(null);
  filterStatus = [];
  watchItemListResponsedata: any;
  filterTypes = [];
  filterStatusValue = null;
  isCardLayout: boolean = true;
  existingApplications: InputTaxApplicationBasic[] = [];
  searchBox = new FormControl();

  constructor(
    public appSrv: AppService,
    private router: Router,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    public inputConstInfo: InputTaxReductionConstants,
    public commonValid: CommonValidation,
    private inputTaxServ: RequestInputTaxService,
    public notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.translation = this.inputTaxServ.translation;
    this.pageTranslation = this.translation[this.page];
    this.listPageTranslation = this.pageTranslation.listPage;

    this.inputTaxServ.ready().then(() => {
      this.inputTaxServ.getPreviousApplications().subscribe(
        (res) => {
          this.watchItemListResponsedata = res;
          const results = res.d.ASSLISTSet.results;
          const finalResults: InputTaxApplicationBasic[] = [];
          for (let result of results) {
            // Filter result.Fbtyp is to be used for filtering this data and show only result.Fbtyp": "TPFV",
            if (result.Fbtyp !== 'TPFV') {
              continue;
            }

            result.Receipt = moment(+result.Receipt.match(/\d+/)[0]);
            // TODO: Integrate result.FbtText for subheading in cards (aka description)
            // FYI: STATUSSet is used to populate different status in which these applications could be in. To be used in filter popup, maybe?
            // FYI: REQTYPSet is used to populate different application types in which these applications could be in. To be used
            //      in filter popup, maybe?
            // TODO: For handling error, iterate over the innererror object and combine the error message string

            finalResults.push(result);
          }
          this.filterTypes = res.d.STATUSSet.results;

          this.existingApplications = finalResults;
          this.inputTaxServ.dataList$.next(this.existingApplications);
        },
        (err) => {
          const errorObj = this.inputTaxServ.handleError(err);
          console.error(
            '[Input tax] Error in getting previous applications',
            errorObj.message
          );
        }
      );
    });
  }
  showFilter() {
    this.filteredDate.setValue(null);
    this.filterStatus = [];
    this.filterStatusValue = null;
    $('#filterModal').modal('show');
  }

  closeFilter() {
    $('#filterModal').modal('hide');
  }
  applyFilter() {
    let tempList = this.watchItemListResponsedata.d.ASSLISTSet.results;

    console.log(this.filterStatusValue);
    if (this.filterStatusValue !== null && this.filterStatusValue !== 'all') {
      tempList = tempList.filter(
        (tempList) => tempList['Fbust'] === this.filterStatusValue
      );
    }
    if (this.filteredDate.value !== null) {
      let date = '';
      if (this.filteredDate['value']['calendarName'] === 'Islamic') {
        const convertedDate = this.commonValid.dateFormate(
          this.filteredDate['value'],
          'Gregorian'
        );
        date = this._dateAdapter.format(convertedDate, 'DD-MM-YYYY');
      } else {
        date = this._dateAdapter.format(
          this.filteredDate['value'],
          'DD-MM-YYYY'
        );
      }
      tempList = tempList.filter((whitelist) => {
        if (!whitelist['Receipt']) return false;
        console.log(
          date,
          moment(whitelist['Receipt']).locale('en-us').format('DD-MM-YYYY')
        );
        if (
          moment(whitelist['Receipt']).locale('en-us').format('DD-MM-YYYY') ===
          date
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    const results = tempList;
    const finalResults: InputTaxApplicationBasic[] = [];
    for (let result of results) {
      if (result.Fbtyp !== 'TPFV') {
        continue;
      }

      // result.Receipt = moment(+result.Receipt.match(/\d+/)[0]);
      finalResults.push(result);
    }
    this.existingApplications = finalResults;
    this.inputTaxServ.dataList$.next(this.existingApplications);
    console.log('Final Result', finalResults);
    $('#filterModal').modal('hide');
  }
  bredCrumbClick(breadCrumbIndex) {
    console.log('Breadcrumbs Index', breadCrumbIndex);
    if (breadCrumbIndex == 0) {
      this.taxClicked();
    }
    if (breadCrumbIndex == 1) {
      this.vatServicesClicked();
    }
  }
  vatServicesClicked() {
    this.appSrv.updatedDataSelection9('001');
    this.router.navigate(['/mains/tax']);
  }
  taxClicked() {
    this.appSrv.updatedDataSelection9('');
    this.router.navigate(['/mains/tax']);
  }
  onSearch() {
    let searchKeyword = this.searchBox.value;

    this.inputTaxServ.dataList$.next(
      this.existingApplications.filter((data) => {
        if (!searchKeyword) {
          return true;
        }

        searchKeyword = searchKeyword.toLowerCase();

        for (let key in data) {
          let val = data[key];
          if (moment.isMoment(val)) {
            val = data[key].format('Do MMM YYYY');
          } else {
            val = '' + val;
          }
          val = val.toLowerCase();

          if (val.indexOf(searchKeyword) >= 0) {
            return true;
          }
        }
        return false;
      })
    );
  }

  onLayoutViewClick(isCardView) {
    this.isCardLayout = isCardView;
  }
}
