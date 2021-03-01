import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';

import { AppService } from 'src/app/app.service';
import { DashboardService } from 'src/app/services/dashboard-service';
import { RequestIncomeTaxReductionService } from 'src/app/services/request-income-tax-reduction.service';
import { stringConstants } from 'src/app/constants/request-income-tax-reduction.constants';

@Component({
  selector: 'app-it-reduction-list',
  templateUrl: './it-reduction-list.component.html',
  styleUrls: ['./it-reduction-list.component.css'],
})
export class ItReductionListComponent implements OnInit {
  lang: string;

  stringConstants;

  list;

  tableView: boolean = false;

  searchFilter: string = '';

  filteredList;

  statusList;

  statusFilter: any[] = [];

  view: boolean = false;

  userData;

  formData;

  constructor(
    public router: Router,
    public decimalPipe: DecimalPipe,
    private itReductionService: RequestIncomeTaxReductionService,
    private dashboardService: DashboardService,
    public appSrv: AppService
  ) {
    if (localStorage.getItem('lang') === 'ar') {
      moment.locale('ar');
    } else {
      moment.locale('en');
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'ar';
      this.stringConstants = stringConstants.ar;
    } else {
      this.lang = 'en';
      this.stringConstants = stringConstants.en;
    }

    this.getDashboardData();
  }

  getDashboardData() {
    this.dashboardService.getDashboardData$().subscribe(
      (res) => {
        this.userData = res['d'];
        this.getListData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getListData() {
    this.itReductionService.getListData(this.userData).subscribe(
      (res) => {
        let list = res['d'].ListSet.results;

        list.map((item) => {
          item.CrdtText = moment(item.CrdtText, 'YYYY/MM/DD').format(
            'YYYY/MM/DD'
          );
        });

        this.list = list;
        this.filteredList = list;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewToggle(value) {
    this.tableView = value;
  }

  addNewReq() {
    this.router.navigate(['/mains/requestincometaxreduction/add']);
  }

  onSearchFilter() {
    if (this.searchFilter) {
      this.resetStatusFilter();

      const nameFilter = this.list.filter(
        (item) => item.FbtText.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      const formFilter = this.list.filter(
        (item) => item.Fbnum.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      const statusFilter = this.list.filter(
        (item) => item.StatText.search(new RegExp(this.searchFilter, 'i')) > -1
      );

      const list = [...nameFilter, ...formFilter, ...statusFilter];

      this.filteredList = [...new Set(list)];
    } else {
      this.filteredList = this.list;
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

  applyStatusFilter() {
    if (this.statusFilter.length > 0) {
      let list = [];

      this.list.map((item) => {
        const index = this.statusFilter.findIndex(
          (filter) => filter.Estat === item.Status
        );

        if (index > -1) {
          list = [...list, item];
        }
      });

      this.filteredList = list;
    } else {
      this.filteredList = this.list;
    }
  }

  resetStatusFilter() {
    this.statusFilter = [];
  }

  viewForm(fbnum, status) {
    this.itReductionService.getFormData(fbnum).subscribe(
      (response) => {
        this.view = true;

        this.formData = response['d'];

        let notes = '';

        if (this.formData.znotesSet.results.length > 0) {
          this.formData.znotesSet.results.map((note) => {
            notes += note.Tdline;
          });
        }

        this.formData['znotesSet'] = notes;

        this.formData.StatText = status;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  back() {
    if (this.view) {
      this.view = false;
      this.formData = {};
    } else {
      this.backTo('003');
    }
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(['/mains/tax']);
  }
}
