import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestDisbandConstants } from '../request-disband-vatgroup/request-disband-constants.model'
import { VatServicesService } from '../vat-services.service';
import { NotifierService } from 'angular-notifier';
declare var jQuery;

@Component({
  selector: 'app-request-disband-vatgroup',
  templateUrl: './request-disband-vatgroup.component.html',
  styleUrls: ['./request-disband-vatgroup.component.css']
})
export class RequestDisbandVatgroupComponent implements OnInit {
  Direction: string;
  direction: string;
  lang: any;
  Language: string;
  submitted = false;
  CurrentDate = new Date();
  StringPattern = "[a-zA-Z \s]*$";
  NumberPattern = "^[0-9]*$";
  ContactNoPattern = "[5][0-9]{8}";
  attachmentsFormGroup: FormGroup;
  disBandFormGroup: FormGroup;
  step: number = 0;
  GPartz: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private vatServices: VatServicesService, private notifierService: NotifierService) {
    this.GPartz = localStorage.getItem('gpart');
    if (localStorage.getItem("lang") === "ar") {
      this.lang = RequestDisbandConstants.langz.arb.requestdisband;
      this.direction = RequestDisbandConstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = RequestDisbandConstants.langz.eng.requestdisband;
      this.direction = RequestDisbandConstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }

    this.disBandFormGroup = new FormGroup({
      IDType: new FormControl([Validators.required]),
      IDNumber: new FormControl([Validators.required, Validators.pattern(this.NumberPattern), Validators.minLength(8), Validators.maxLength(15)]),
      date: new FormControl(this.CurrentDate),
      attachControls: this.formBuilder.array([]),
      personName: new FormControl([Validators.required, Validators.pattern(this.StringPattern)]),
      AggrePurchase: new FormControl([""]),
      AggreSupply: new FormControl([""])
    });
  
  }

  get f() { return this.disBandFormGroup.controls; }

  ngOnInit(): void {
    this.getDisbandVatDisplayData();
  }

  goBack() {
    switch (this.step) {
      case 0:
        this.router.navigate(["mains/tax"]);
        break;
      case 1:
        this.step = 0
        break;
      case 2:
        this.step = 1
        break;
      case 3:
        this.step = 2
        break;
      case 4:
        this.step = 3
        break;
    }
  }

  onContinue() {
    switch (this.step) {
      case 0:
        this.conditionsCheck();
        break;
      case 1:
        this.step = 2
        break;
      case 2:
        this.step = 3
        break;
      case 3:
        this.step = 4
        break;
      case 4:
        this.step = 5
        break;
    }
  }

  disbandData: any = [];
  getDisbandVatDisplayData() {
    this.vatServices.getDisbandVatDisplayData(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        this.disbandData = data["d"]["ASSLISTSet"]["results"];
        console.log("this.disbandData :", this.disbandData);
      }
    }, (error) => {
      var errorString = "";
      this.notifierService.hideOldest();
      if (error.error.error.innererror.errordetails.length >= 2) {
        for (var i = 0; i < error.error.error.innererror.errordetails.length - 1; i++) {
          errorString = errorString + error.error.error.innererror.errordetails[i].message
        }
      }
      else {
        errorString = error.error.error.innererror.errordetails[0].message
      }
      this.notifierService.notify(
        "error",
        errorString
      );
    });
  }

  isAgree: boolean = false;
  reqTinsList: any = [];
  conditionsCheck() {
    this.getSuppliePurchaseList();
    this.getDisbandHeaderSet();
    this.vatServices.getDisbandData(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        this.reqTinsList = data["d"]["TABLESet"]["results"];
        this.ElgibleSuppliePurchaseList.forEach(ele => {
          if(ele.Key == data["d"]["AggrePurchase"])
          {
            this.disBandFormGroup.patchValue({ AggrePurchase : ele.Text });
          }
          if(ele.Key == data["d"]["AggreSupply"])
          {
            this.disBandFormGroup.patchValue({ AggreSupply : ele.Text });
          }
        });
        jQuery("#infoModal").modal('show');
      }
    }, (error) => {
      var errorString = "";
      this.notifierService.hideOldest();
      if (error.error.error.innererror.errordetails.length >= 2) {
        for (var i = 0; i < error.error.error.innererror.errordetails.length - 1; i++) {
          errorString = errorString + error.error.error.innererror.errordetails[i].message
        }
      }
      else {
        errorString = error.error.error.innererror.errordetails[0].message
      }
      this.notifierService.notify(
        "error",
        errorString
      );
      console.log('error', error);
    });
  }

  getDisbandHeaderSet() {
    this.vatServices.getDisbandHeaderSet(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log("this.disbandData :", this.disbandData);
      }
    }, (error) => {
      var errorString = "";
      this.notifierService.hideOldest();
      if (error.error.error.innererror.errordetails.length >= 2) {
        for (var i = 0; i < error.error.error.innererror.errordetails.length - 1; i++) {
          errorString = errorString + error.error.error.innererror.errordetails[i].message
        }
      }
      else {
        errorString = error.error.error.innererror.errordetails[0].message
      }
      this.notifierService.notify(
        "error",
        errorString
      );
    });
  }

  acceptTermsandConditions() {
    jQuery("#infoModal").modal('hide');
    this.step = 1;
  }

  ElgibleSuppliePurchaseList: any = [];
  getSuppliePurchaseList() {
    if (this.Language == 'A') {
      this.ElgibleSuppliePurchaseList = [
        {
          "Key": "00",
          "Text": ""
        },
        {
          "Key": "01",
          "Text": "أقل من 187,500 ريال سعودي"
        },
        {
          "Key": "02",
          "Text": "أكثر من 187,500 حتى 375,000 ريال سعودي"
        },
        {
          "Key": "03",
          "Text": "أكثر من 375,000 حتى 1,000,000 ريال سعودي"
        },
        {
          "Key": "04",
          "Text": "أكثر من 1,000,000 حتى 40,000,000 ريال سعودي"
        },
        {
          "Key": "05",
          "Text": "أكثر من 40,000,000 ريال سعودي"
        }
      ]
    }
    else {
      this.ElgibleSuppliePurchaseList = [
        {
          "Key": "00",
          "Text": ""
        },
        {
          "Key": "01",
          "Text": "Less than SAR 187,500"
        },
        {
          "Key": "02",
          "Text": "Between SAR 187,500 and SAR 375,000"
        },
        {
          "Key": "03",
          "Text": "Between SAR 375,000 and SAR 1,000,000"
        },
        {
          "Key": "04",
          "Text": "Between SAR 1,000,000 and SAR 40,000,000"
        },
        {
          "Key": "05",
          "Text": "Greater than SAR 40,000,000"
        }
      ]
    }
  }

}