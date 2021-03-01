import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  RequestInputTaxService,
  SupportedPages,
} from 'src/app/services/request-input-tax.service';
import { InputTaxApplicationBasic } from '../input-tax.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tax-card-view',
  templateUrl: './tax-card-view.component.html',
  styleUrls: ['./tax-card-view.component.css'],
})
export class TaxCardViewComponent implements OnInit, OnDestroy {
  dataList: InputTaxApplicationBasic[];

  translation: any;
  pageTranslation: any;

  dataSub: Subscription;

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
    });
  }

  getCreationDate(obj: moment.Moment) {
    return obj.locale(this.inputTaxServ.lang).format('DD-MM-YYYY');
  }

  onNewApplicationClick(applicationID: string = 'new') {
    this.inputTaxServ.getDataForApplication(applicationID).subscribe(
      (data) => {
        this.router.navigate([applicationID], {
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

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
