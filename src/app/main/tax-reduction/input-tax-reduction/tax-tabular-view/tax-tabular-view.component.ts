import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  RequestInputTaxService,
  SupportedPages,
} from 'src/app/services/request-input-tax.service';
import { InputTaxApplicationBasic } from '../input-tax.model';
import { TaxTabularDataSource } from './tax-tabular.datasource';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tax-tabular-view',
  templateUrl: './tax-tabular-view.component.html',
  styleUrls: ['./tax-tabular-view.component.css'],
})
export class TaxTabularViewComponent implements OnInit, OnDestroy {
  dataList: InputTaxApplicationBasic[];

  translation: any;
  pageTranslation: any;
  dataSource: TaxTabularDataSource = new TaxTabularDataSource([]);

  dataSub: Subscription;

  headerInfoList = [
    {
      id: 'FbtText',
      translationId: 'description',
    },
    {
      id: 'Receipt',
      translationId: 'creationDate',
    },
    {
      id: 'Fbnum',
      translationId: 'requestNumber',
    },
    {
      id: 'FbustTxt',
      translationId: 'status',
    },
  ];

  constructor(
    private inputTaxServ: RequestInputTaxService,
    private router: Router,
    private route: ActivatedRoute,
    public notifierService: NotifierService
  ) {
    this.translation = this.inputTaxServ.translation;
    this.pageTranslation = this.translation[SupportedPages.Input].listPage;
  }

  ngOnInit(): void {
    this.dataSub = this.inputTaxServ.dataList$.subscribe((data) => {
      this.dataList = data;
      this.dataSource = new TaxTabularDataSource(data);
    });
  }
  isListViewVisible() {
    if (this.dataSource != null && this.dataSource != undefined) {
      if (this.dataSource.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getCreationDate(obj: moment.Moment) {
    return obj.locale(this.inputTaxServ.lang).format('DD-MM-YYYY');
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  getHeaderIds() {
    return this.headerInfoList.map((info) => info.id);
  }

  onStatementClick(row) {
    this.inputTaxServ.getDataForApplication(row.Fbnum).subscribe(
      (data) => {
        this.router.navigate([row.Fbnum], {
          relativeTo: this.route,
        });
      },
      (err) => {
        console.error(
          '[Input Tax] Error in getting data for new application',
          err
        );
        this.notifierService.notify(
          'error',
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  onNewRequestClick() {
    this.inputTaxServ.getDataForApplication('new').subscribe(
      (data) => {
        this.router.navigate(['new'], {
          relativeTo: this.route,
        });
      },
      (err) => {
        console.error(
          '[Input Tax] Error in getting data for new application',
          err
        );
        this.notifierService.notify(
          'error',
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }
}
