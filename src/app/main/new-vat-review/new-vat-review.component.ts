import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { NewVatReviewConstants, ApiConstants } from 'src/app/constants/NewVatReviewConstants';
import { NewVatReviewService } from 'src/app/services/new-vat-review.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NotifierService } from "angular-notifier";
import { CommonValidation } from "src/app/constants/commonValidations";
import { LoaderService } from '../../loader/loader.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from 'src/app/services/dashboard-service';
import { distinctUntilChanged } from 'rxjs/operators';
import { ObjectionReviewsService } from 'src/app/services/objection-reviews.service';


declare var $: any;
// const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
const nonWhitespaceRegExp: RegExp = new RegExp("^[^.\\s]");

let maxLength = 132;
// const amountValueRegExp: RegExp = new RegExp("^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0)$")

@Component({
  selector: 'app-new-vat-review',
  templateUrl: './new-vat-review.component.html',
  styleUrls: ['./new-vat-review.component.css']
})
export class NewVatReviewComponent implements OnInit {
  amountValue;
  DecFlg1: any = "";
  DecFlg2: any = "";
  baseUrl = environment.url;
  btnData;
  checkBank: any = "";
  checkCash: any = "";
  data;
  dob1: any;
  dobErr = false;
  dobMsg = "";
  fileNames: any = [];
  files: any = [];
  filteredSubReasons: any;
  id1 = "";
  idErr1 = false;
  idErr;
  idMsg;
  idNum: any = "";
  idType: any = "";
  isFormValid = true;
  isResSuccess = false;
  lang: any = NewVatReviewConstants.eng;
  langSingle: string;
  langX: string;
  myFiles: string[] = [];
  name: any = "";
  optionActive = 1;
  periodFrom: any = "";
  periodTo: any = "";
  rejectedFormSet;
  rejectedFormSetErr: boolean = false;
  rejectedFormSetMsg;
  returnIdx: any;
  secAmount: any = "0.00";
  securityType: any = "";
  selectedReason = "";
  selectedSubReason = "";
  showPaymentMethod = false;
  showReviewDetails = false;
  showSuccess = false;
  taxPaid: any = "";
  taxPeriod: any = "";
  totalTaxLiability: any = "";
  caseRef;
  billDetailData;
  persl;
  abrzu;
  abrzo;
  sadadNumber: any = "";
  enableRefresh = false;
  generateSadad = false;
  decdt;
  dateFrom;
  dateTo;
  notes = [];
  Fbustx;
  successData;
  showIdNumError = false;
  isIdValidated = false;
  isPenaltyReason = false;
  canEditContact = true;
  Fbnumx = '';
  Statusx = ''
  securityNumber = ''
  getFbnum = ''
  isApplicationEditable = true;
  getStatus = '';
  dbData: any = null;
  fbguidData: any = null;
  today = new Date();
  isSubmit = true;
  RejFb = '';
  isReasonPopupConfirmed = false;

  headerComponent = CalendarComponent;

  vatReviewFormGroup: FormGroup;
  vatReviewFormGroup2: FormGroup;
  vatReviewFormGroup3: FormGroup;
  vatReviewFormGroup4: FormGroup;
  vatReviewFormGroup5: FormGroup;
  vatReviewFormGroup6: FormGroup;
  vatReviewFormGroup7: FormGroup;
  reviewDetailFormGroup: FormGroup;
  appFbguid: any;
  appFbtyp: any;
  appFbnum: any;

  Opbel = "";
  reasonPopupText: string;
  isShowReasonpopup: boolean = false;
  isAlert = false;
  url: any;
  disableSadadParams: boolean = false;
  showBillModal: boolean = false;


  constructor(private _formBuilder: FormBuilder, public router: Router, public loaderService: LoaderService, private activateroute: ActivatedRoute, public dbservice: DashboardService, public vatReviewService: NewVatReviewService, private http: HttpClient, public notifierService: NotifierService, public commonValid: CommonValidation,
    public objService: ObjectionReviewsService
  ) {

    if (localStorage.getItem("lang") === "ar") {
      this.langX = "AR";
      this.langSingle = "A";
    } else {
      this.langX = "EN";
      this.langSingle = "E";
    }


  }

  ngOnInit(): void {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = NewVatReviewConstants.arb;
    }


    if (this.activateroute.snapshot.queryParamMap.has('Fbnum')) {
      console.log("yes")
    }

    this.getFbnum = this.activateroute.snapshot.queryParamMap.has('Fbnum') ? this.activateroute.snapshot.queryParamMap.get("Fbnum") : ' ';

    this.getStatus = this.activateroute.snapshot.queryParamMap.has('Status') ? this.activateroute.snapshot.queryParamMap.get("Status") : ' ';

    console.log(this.getFbnum);
    console.log(this.getStatus);

    this.dbservice.getDashboardData$().subscribe((res) => {
      console.log(res);
      this.dbData = res;
      this.getInitialData();

    }, (err) => {
      console.log(err)
    });





  }

  initForms() {
    this.vatReviewFormGroup = this._formBuilder.group({

    });
    this.vatReviewFormGroup2 = this._formBuilder.group({

      selectedReason: ["", Validators.required],
      selectedSubReason: ["", Validators.required],
      referenceNumber: ["", Validators.required],
      decisionDate: ["", Validators.required],


    })
    this.vatReviewFormGroup3 = this._formBuilder.group({
      docType: [""],
      doc: this._formBuilder.array([]),
      supportingDocName: [""],
      reviewDetailNote: ["", [Validators.required, Validators.pattern(nonWhitespaceRegExp), Validators.maxLength(1006)]]
    });
    this.vatReviewFormGroup4 = this._formBuilder.group({
      taxPeriod: [""],
      periodFrom: [""],
      periodTo: [""],
      totalTaxLiability: ["0.00"],
      taxPaid: ["0.00"],
      penaltyAmount: [""],
      amountType: [""],
      amountValue: ["0.00", Validators.required],
      disputeDetailNote: [""]

    });
    this.vatReviewFormGroup5 = this._formBuilder.group({
      secAmount: [this.secAmount],
      securityType: [this.securityType, Validators.required],
      checkCash: [this.checkCash, Validators.requiredTrue],
      checkBank: [this.checkBank, Validators.requiredTrue],
      docType: [""],
      doc: this._formBuilder.array([]),
      supportingDocName: [""]

    });
    this.vatReviewFormGroup6 = this._formBuilder.group({

      idType: ["", Validators.required],
      idNum: ["", Validators.required],
      name: ["", [Validators.required, Validators.pattern(nonWhitespaceRegExp), Validators.maxLength(80)]],
      checkTerm: ["", Validators.requiredTrue]

    });

    this.vatReviewFormGroup7 = this._formBuilder.group({

    })
    this.reviewDetailFormGroup = this._formBuilder.group({

    })
  }

  goBackToNewObjectionReview(action: boolean) {
    this.objService.showNewObjection = action;    
    this.router.navigate(['/mains/objectionreviews']);
  }

  showAllStep() {

    //if assessment   , penalty  , or  inspection penalty   to show the steps 
    if (["VTAS", "VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

  showBill() {
    //if assessment   , penalty  , or  inspection penalty   to show the steps 
    if (["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) != -1) {
      return true;
    }
    else {
      return false;
    }
  }


  convertDate(date) {
    let tempDate = parseInt(date.replace(/\D/g, ''));
    return moment(tempDate).locale("en-us").format('YYYY/MM/DD');
  }

  getInitialData() {

    this.initForms();
    //setting initial data when submitted application / new application getting opened 
    this.vatReviewService.getFbguid(this.getFbnum, this.dbData).subscribe((res) => {
      this.fbguidData = res;
      this.vatReviewService.getInitialData(this.getFbnum, this.dbData, this.fbguidData).subscribe((res) => {
        console.log("in get InitialData");
        console.log(res);
        this.data = res;
        this.Fbnumx = res['d']['Fbnumx'];
        this.Statusx = res['d']['Statusx']

        //Set fg2 value 

        this.vatReviewFormGroup2.controls.selectedReason.setValue(this.data['d']['RvRsn']);
        // this.filteredSubReasons = this.data['d']['ReasonSet']['results'].filter(i => i.ProcCd == this.vatReviewFormGroup2.controls.selectedReason.value);
        this.vatReviewFormGroup2.controls.selectedSubReason.setValue(this.data['d']['RvSubRsn']);
        //set reference number  ( for penalties/ inspection penalties  value is SecurityDtl Opbel  else RejFb )


        if (this.data['d']['DecDt'] != null && this.data['d']['DecDt'] != '') {

          let tempDecisionDate = this.convertDate(this.data['d']['DecDt']);
          console.log(tempDecisionDate);
          this.vatReviewFormGroup2.controls.decisionDate.setValue(tempDecisionDate);
        } else {
          this.vatReviewFormGroup2.controls.decisionDate.setValue('');
        }


        //set fg3 values : 
        this.setAttachment(this.data['d']["AttdetSet"]["results"]);
        let noteSetArray = this.data['d']['NotesSet']['results'];
        for (let i = 0; i < noteSetArray.length; i++) {
          if (noteSetArray[i]['Rcodez'] == "RAVT_BOX") {
            this.vatReviewFormGroup3.controls.reviewDetailNote.setValue(noteSetArray[i]['Strline']
            );
          }
          if (noteSetArray[i]['Rcodez'] == "RAVT_SDCAS") {

            this.vatReviewFormGroup4.controls.disputeDetailNote.setValue(noteSetArray[i]['Strline']);
          }

        }

        console.log(this.vatReviewFormGroup4.controls.disputeDetailNote.value)

        //setfg4 values : 
        this.vatReviewFormGroup4.controls.taxPeriod.setValue(this.data['d']['SecurityDtl']['Perslt']);

        if (this.data['d']['SecurityDtl']['Abrzu'] != null && this.data['d']['SecurityDtl']['Abrzu'] != '') {

          let tempPeriodFrom = this.convertDate(this.data['d']['SecurityDtl']['Abrzu']);

          this.vatReviewFormGroup4.controls.periodFrom.setValue(tempPeriodFrom);
        } else {
          this.vatReviewFormGroup4.controls.periodFrom.setValue("");
        }

        if (this.data['d']['SecurityDtl']['Abrzo'] != null && this.data['d']['SecurityDtl']['Abrzo'] != '') {

          let tempPeriodTo = this.convertDate(this.data['d']['SecurityDtl']['Abrzo']);

          this.vatReviewFormGroup4.controls.periodTo.setValue(tempPeriodTo);
        } else {
          this.vatReviewFormGroup4.controls.periodTo.setValue("");
        }




        this.vatReviewFormGroup4.controls.totalTaxLiability.setValue(this.data['d']['SecurityDtl']['Liaamt']);
        this.vatReviewFormGroup4.controls.taxPaid.setValue(this.data['d']['SecurityDtl']['Clramt']);
        if (this.data['d']['SecurityDtl']['Penamount']) {
          this.vatReviewFormGroup4.controls.penaltyAmount.setValue(parseFloat(this.data['d']['SecurityDtl']['Penamount']).toFixed(2));
        } else {
          this.vatReviewFormGroup4.controls.penaltyAmount.setValue(this.data['d']['SecurityDtl']['Penamount']);

        }
        //type of amount full or partial
        let amountType = this.data['d']['SecurityDtl']['Amttp'] == "" ? "F" : this.data['d']['SecurityDtl']['Amttp'];
        this.vatReviewFormGroup4.controls.amountType.setValue(amountType);
        this.vatReviewFormGroup4.controls.amountValue.setValue(this.data['d']['SecurityDtl']['Disamt']);



        //set fg5 value


        this.vatReviewFormGroup5.controls.secAmount.setValue(this.data['d']['SecurityDtl']['Secamt']);
        if (this.vatReviewFormGroup5.controls.secAmount.value !== "0.000" && this.vatReviewFormGroup5.controls.secAmount.value !== "0.00") {
          this.showPaymentMethod = true;
        } else {
          this.showPaymentMethod = false;
        }
        this.vatReviewFormGroup5.controls.securityType.setValue(this.data['d']['SecurityDtl']['Sectp']);
        let checkCash = this.data['d']['SecurityDtl']['ChkCash'] == 'X' ? true : false;
        let checkBank = this.data['d']['SecurityDtl']['ChkBank'] == 'X' ? true : false;
        this.vatReviewFormGroup5.controls.checkCash.setValue(checkCash);
        this.vatReviewFormGroup5.controls.checkBank.setValue(checkBank);

        // let DecFlg1 = this.data['d']['DecFlg1'] == true ? true : false;
        // let DecFlg2 = this.data['d']['DecFlg1'] == true ? true : false;

        //set fg6 value

        this.vatReviewFormGroup6.controls.idType.setValue(this.data['d']['IdType'])
        this.vatReviewFormGroup6.controls.idNum.setValue(this.data['d']['DecIdNo'])
        if (this.data['d']['IdType'].length > 0 && this.data['d']['DecIdNo'].length > 0) {
          this.isIdValidated = true;
        }
        this.vatReviewFormGroup6.controls.name.setValue(this.data['d']['Decnm'])

        this.returnIdx = this.data["d"]["ReturnIdx"];

        this.securityNumber = this.data['d']['SecurityDtl']['Security'];
        this.sadadNumber = this.data['d']['SecurityDtl']['Sopbel'];


        if (this.vatReviewFormGroup5.controls.securityType.value == 'C' && this.securityNumber != "" && this.sadadNumber == "") {
          //means refresh button should be enabled
          this.enableRefresh = true;
          // this.generateSadad = true;

        }
        else if (this.vatReviewFormGroup5.controls.securityType.value == 'C' && this.securityNumber == "" && this.sadadNumber == "") {
          this.enableRefresh = false;
          // this.generateSadad = false;
        }

        if (this.getFbnum != '') {

          let getReason = this.data['d']['MainReasonSet']['results']
          for (let i = 0; i < getReason.length; i++) {
            if (this.vatReviewFormGroup2.controls.selectedReason.value === getReason[i].ProcCd) {
              this.selectedReason = getReason[i].TypeT
            }
          }

          let getSubReason = this.data['d']['ReasonSet']['results']
          for (let i = 0; i < getSubReason.length; i++) {
            if (this.vatReviewFormGroup2.controls.selectedSubReason.value === getSubReason[i].Code) {
              this.selectedSubReason = getSubReason[i].SubtypT
            }
          }

        }


        const url = `${ApiConstants.getButtonCodes}/VR_UI_HDRSet(Fbnum='${this.data['d']['Fbnumx']}',Lang='${this.langSingle}',Officer='',Gpart='${localStorage.getItem('gpart')}',Status='${this.data['d']['Statusx']}',TxnTp='${this.data['d']['TxnTpx']}',Formproc='ZTAX_VT_REV')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet,ReasonSet&$format=json`;


        this.vatReviewService.getButtonSet(url).subscribe((res) => {


          console.log("in getBtndata");
          this.isResSuccess = true;

          this.btnData = res;
          if (this.btnData['d']['EditFgz'] == 'X') {
            this.isApplicationEditable = true;

            if (this.showAllStep() && this.securityNumber) {
              this.disableSadadParams = true;
            }


          }
          else {
            this.isApplicationEditable = false;

          }


          if (this.getFbnum != "") {
            if (this.isApplicationEditable) {
              this.optionActive = 1;
            }
            else {
              this.optionActive = 7;
            }
          }

          console.log(res);

          this.getRejectedForms();



        }, (err) => {
          console.log("error in getting btnData")
          console.log(err)
        });


      }, (err) => {

        console.log("error in getting initial Data")
        console.log(err);

      });
    }, (err) => {
      console.log(err);
    });
  }


  viewApplication() {
    this.showLoader();
    if (this.data['d']['Statusx'] == 'E0001') {

    }
    else {
      this.appFbguid = this.data['d']['ReturnIdx']
      this.appFbnum = this.data['d']['RejFb']

      if (this.vatReviewFormGroup2.controls.selectedReason.value === "VTRD") {

        if (this.vatReviewFormGroup2.controls.selectedSubReason.value === "0010") {

          this.appFbtyp = "RGVT";

        }

        else if (this.vatReviewFormGroup2.controls.selectedSubReason.value == "0011") {

          this.appFbtyp = "DGVT";

        }

        else if (this.vatReviewFormGroup2.controls.selectedSubReason.value == "0012") {

          this.appFbtyp = "DGVT";

        }

      }
      else if (this.vatReviewFormGroup2.controls.selectedReason.value === "VTGR") {

        this.appFbtyp = "VTGR";

      }
      else if (this.vatReviewFormGroup2.controls.selectedReason.value === "VTIN") {

        this.appFbtyp = "TPFV";

      }
      else if (this.vatReviewFormGroup2.controls.selectedReason.value === "TPFV") {

        this.appFbtyp = "TPFV";

      }
      else if (this.vatReviewFormGroup2.controls.selectedReason.value === "VTAS") {

        this.appFbtyp = "VATR";

      }
      else if (this.vatReviewFormGroup2.controls.selectedReason.value === "VTPN") {

        this.appFbtyp = "VTPN";

      }
      else if (this.vatReviewFormGroup2.controls.selectedReason.value === "VTPC") {

        this.appFbtyp = "VTPC";

      }

    }


    console.log(this.appFbguid)
    console.log(this.appFbtyp)
    console.log(this.appFbnum)

    this.vatReviewService.getFbguidForApplication(this.appFbguid, this.appFbtyp, this.appFbnum, this.dbData).subscribe((res) => {
      let Fbguid;
      let Fbtyp;
      let dispBSP;
      let dispBSPTxn;
      if (res['d']) {

        Fbguid = res['d']['Fbguid']
        Fbtyp = res['d']['Fbtyp']

        switch (Fbtyp) {

          case "RGVT":

            dispBSP = "zvatr";

            dispBSPTxn = "DIS_RGVT";

            break;

          case "DGVT":

            if (this.vatReviewFormGroup2.controls.selectedSubReason.value == "0011") {

              dispBSP = "zvatdereg";

              dispBSPTxn = "VT_DREG";

            }

            else if (this.vatReviewFormGroup2.controls.selectedSubReason.value == "0012") {

              dispBSP = "zvatdereg";

              dispBSPTxn = "VT_SUSP";

            }

            break;

          case "VTGR":

            dispBSP = "zvatgrp_reg";

            dispBSPTxn = "CRE_VTGR";

            break;

          case "TPFV":

            dispBSP = "zdu_tpfv";

            dispBSPTxn = "CRE_TPFV";

            break;

          case "VATR":

            dispBSP = "zdu_vatr";

            dispBSPTxn = "";

            break;

        }
      }

      //call the Iframe Api 

      let protocol = this.dbData['d']['Protocol']

      let host = "://" + this.dbData['d']['SystemName']

      let port = this.dbData['d']['PortNo'].length > 0 ? ":" + this.dbData['d']['PortNo'] : "";

      let domainName = protocol + host + port;

      let client = this.dbData['d']['Client']


      if (dispBSP == "zdu_vatr") {

        this.url = `${domainName}/sap/bc/ui5_ui5/sap/${dispBSP}/index.html?sap-client=${client}&sap-ui-language=${this.langX}&uPar4=''&uPar1=${localStorage.getItem('gpart')}&uPar8=06&fGUID=${Fbguid}&TxnTp=${dispBSPTxn}&ReviewFg=true&Euser=${this.dbData['d']['Euser']}&tSys=${domainName}`
        console.log(this.url)
      }
      else {
        this.url = `${domainName}/sap/bc/ui5_ui5/sap/${dispBSP}/index.html?sap-client=${client}&sap-ui-language=${this.langX}&uPar1=${localStorage.getItem('gpart')}&uPar8=06&fGUID=${Fbguid}&TxnTp=${dispBSPTxn}&ReviewFg=true&Euser=${this.dbData['d']['Euser']}&tSys=${domainName}`
        console.log(this.url)
      }


      let el = <HTMLIFrameElement>document.getElementById("iframe");
      el.src = this.url;
      // this.WaitForIFrame(el);

      this.showLoader();

      //  document.write('<iframe height="450"  allowTransparency="true" frameborder="0" scrolling="yes" style="width:100%;" src="' + url + '" type= "text/javascript"></iframe>')
      // this.hideLoader();

    }, (err) => {
      this.hideLoader();
    })
  }


  myLoadEvent() {

    if (this.url) {
      this.hideLoader()
      $('#ApplicationIframe').modal("show");
    }
  }



  validateNumbers() {

    if (this.vatReviewFormGroup4.controls.amountValue.value) {
      this.vatReviewFormGroup4.controls.amountValue.setValue(parseFloat(this.vatReviewFormGroup4.controls.amountValue.value).toFixed(2));
    } else {
      this.vatReviewFormGroup4.controls.amountValue.setValue(parseFloat('0.00').toFixed(2));
    }


  }
  // WaitForIFrame(iframe) {
  //   console.log(iframe.readyState)
  //   if (iframe.readyState != "complete") {
  //     this.showLoader();
  //     this.WaitForIFrame(iframe);
  //   }
  //   else {
  //     this.hideLoader();
  //     $('#ApplicationIframe').modal("show");
  //   }
  // }

  isForm5Valid() {

    if (this.showPaymentMethod && this.vatReviewFormGroup5.controls.securityType.value === 'B' && this.vatReviewFormGroup5.controls.checkBank.value == true && this.vatReviewFormGroup5.controls.checkCash.value == true) {
      return true;
    }

    if (this.showPaymentMethod && this.vatReviewFormGroup5.controls.securityType.value === 'C' && this.vatReviewFormGroup5.controls.checkCash.value == true && this.sadadNumber && this.sadadNumber.trim().length > 0) {
      console.log(this.vatReviewFormGroup5.controls.checkCash.value)
      return true;
    }

    if (!this.showPaymentMethod) {
      return true;
    }

  }

  onSubmit() {

    this.optionActive = 2
  }

  onSubmit2() {


    if (this.vatReviewFormGroup2.valid && this.isShowReasonpopup && !this.isReasonPopupConfirmed) {
      this.showReasonPopup();
      return;
    }

    if (this.isAlert) {
      this.showReasonPopup();
      return;
    }

    this.isSubmit = false;

    if (this.vatReviewFormGroup2.valid) {

      let getReason = this.data['d']['MainReasonSet']['results']
      for (let i = 0; i < getReason.length; i++) {
        if (this.vatReviewFormGroup2.controls.selectedReason.value === getReason[i].ProcCd) {
          this.selectedReason = getReason[i].TypeT
        }
      }

      let getSubReason = this.data['d']['ReasonSet']['results']
      for (let i = 0; i < getSubReason.length; i++) {
        if (this.vatReviewFormGroup2.controls.selectedSubReason.value === getSubReason[i].Code) {
          this.selectedSubReason = getSubReason[i].SubtypT
        }
      }


      // setting penalty amount in question Value

      ["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) != -1 ? this.isPenaltyReason = true : false;



      ///Vat Review Form Group 4 :: 

      // this.vatReviewFormGroup4.get('disputeDetailNote').valueChanges.subscribe(val => {
      console.log("Hi")
      if (["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) == -1) {
        this.vatReviewFormGroup4.controls['disputeDetailNote'].setValidators([Validators.required, Validators.pattern(nonWhitespaceRegExp), Validators.maxLength(1006)]);

        this.vatReviewFormGroup4.controls['disputeDetailNote'].updateValueAndValidity();

      } else {

        this.vatReviewFormGroup4.controls['disputeDetailNote'].clearValidators();
        this.vatReviewFormGroup4.controls['disputeDetailNote'].updateValueAndValidity();

      }
      // });


      // this.vatReviewFormGroup4.get('amountType').valueChanges.subscribe(val => {
      if (["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) == -1) {
        this.vatReviewFormGroup4.controls['amountType'].setValidators([Validators.required]);

        this.vatReviewFormGroup4.controls['amountType'].updateValueAndValidity();

      } else {

        this.vatReviewFormGroup4.controls['amountType'].clearValidators();
        this.vatReviewFormGroup4.controls['amountType'].updateValueAndValidity();

      }
      // });






      this.isFormValid = true;
      // this.setAttachment(this.data['d']["AttdetSet"]["results"]);


      this.optionActive = 3;
      this.isSubmit = true;
      this.isFormValid = false;

    }

    else {
      this.isFormValid = false;
    }
  }

  onSubmit3() {

    this.isSubmit = false;
    if (this.vatReviewFormGroup3.valid) {
      this.isSubmit = true;
      console.log(this.vatReviewFormGroup2.controls.selectedReason.value);
      console.log(["VTAS", "VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value))
      if (["VTAS", "VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) == -1) {
        // this.optionActive = 6;
        this.onSubmit5();
      }
      else {
        this.optionActive = 4;
      }

    }
  }

  onSubmit4() {

    this.isSubmit = false;

    if (this.vatReviewFormGroup4.valid) {
      this.isSubmit = true;
      if (!this.disableSadadParams) {
        this.showLoader();

        this.getSecurityAmount().subscribe((res) => {
          this.hideLoader()
          console.log("in get SecurityAmount");
          console.log(res);
          console.log("in form 5");

          if (res['d']['Secamt'] !== "0.000" && res['d']['Secamt'] !== "0.00") {
            this.showPaymentMethod = true;
          } else {
            this.showPaymentMethod = false;
          }

          this.vatReviewFormGroup5.controls.secAmount.setValue(res['d']['Secamt']);
          this.secAmount = res['d']['Secamt']

          if (this.data['d']['SecurityDtl']['Sectp'] != "") {
            this.vatReviewFormGroup5.controls.securityType.setValue(this.data['d']['SecurityDtl']['Sectp']);
          }
          this.optionActive = 5

        }, (err) => {
          this.hideLoader()
          console.log("err in get SecurityAmount");
          console.log(err);


          this.notifierService.notify(
            "error",
            err['error']['error']['innererror']['errordetails'][0].message
          );


        });
      } else {
        this.optionActive = 5;
      }
    }
  }

  onSubmit5() {
    this.isSubmit = false;
    if (!this.isForm5Valid() || (this.vatReviewFormGroup5.controls.securityType.value == 'B' && !this.getAttachmentCount())) {


    } else {
      this.isSubmit = true;
      this.optionActive = 6
    }


  }

  onSubmit6() {
    if (this.vatReviewFormGroup6.invalid || !this.isIdValidated) {
      this.isSubmit = false;
      return;
    }
    else {
      this.isSubmit = true;
    }

    this.vatReviewFormGroup7 = this._formBuilder.group({

    })

    this.optionActive = 7
  }

  onSubmit7() {
    this.saveData(false);

    // this.showSuccess = true;
  }

  back() {

    if (this.isApplicationEditable === false) {
      console.log("application not editable")
      this.router.navigate(["/mains/objectionreviews"]);

    } else {

      if (this.optionActive > 1) {
        console.log("option active", this.optionActive)

        if (this.optionActive == 6 && !this.showAllStep()) {
          console.log("option active", this.optionActive)

          this.optionActive = this.optionActive - 3;
        }
        else {
          // if (this.optionActive == 5 && ((this.sadadNumber && this.sadadNumber.trim().length > 0) && (this.securityNumber && this.securityNumber.trim().length > 0))) {
          //   this.optionActive = 5;
          //   console.log("option active", this.optionActive)

          // }
          // else if (this.optionActive == 5 && !this.sadadNumber && this.securityNumber) {
          //   this.router.navigate(["/mains/objectionreviews"])
          // }
          // else {
          this.optionActive--;
          console.log("option active", this.optionActive)

          //   }
        }
      } else {
        console.log("option active", this.optionActive)

        this.router.navigate(["/mains/objectionreviews"]);
      }

    }

  }






  filterSubReasons() {
    this.vatReviewFormGroup2.controls.selectedSubReason.setValue("");
    this.vatReviewFormGroup2.controls.decisionDate.setValue("");
    this.vatReviewFormGroup2.controls.referenceNumber.setValue("");
    this.billDetailData = undefined;
    console.log(this.vatReviewFormGroup2);
    this.filteredSubReasons = this.data['d']['ReasonSet']['results'].filter(i => i.ProcCd == this.vatReviewFormGroup2.controls.selectedReason.value);
  }

  downloadFile() {
    let link = document.createElement("a");
    link.download = "filename";
    link.href = "assets/images/user-image.png";
    link.click();
  }



  getRejectedForms() {

    this.showLoader();
    this.vatReviewFormGroup2.controls.decisionDate.setValue("");
    this.billDetailData = undefined;

    this.vatReviewFormGroup2.controls.referenceNumber.setValue("");

    const url = `${ApiConstants.getRejectedForms}/HeaderSet(Langx='${this.langX}',Gpartx='${localStorage.getItem('gpart')}',TxnTpx='${this.data['d']['TxnTpx']}',Fbustx='${this.data['d']['Fbustx']}',Fbstax='${this.data['d']['Fbstax']}',UserTypx='${this.btnData['d']['UserTyp']}',RvRsn='${this.vatReviewFormGroup2.controls.selectedReason.value}',RvSubRsn='${this.vatReviewFormGroup2.controls.selectedSubReason.value}',Fbnumx='${this.data['d']['Fbnumx']}',Sopbel='${this.data['d']['SecurityDtl'].Sopbel}',Formprocx='ZTAX_VT_REV')?$expand=RejectedFormSet`;

    this.vatReviewService.getRejForms(url).subscribe((res) => {
      this.hideLoader();
      console.log("in getRejected forms");
      this.rejectedFormSetErr = false;

      this.rejectedFormSet = res;

      if (this.showBill() && this.getFbnum != '') {
        this.vatReviewFormGroup2.controls.referenceNumber.setValue(this.data['d']['SecurityDtl']['Opbel'])
      } else {
        this.vatReviewFormGroup2.controls.referenceNumber.setValue(this.data['d']['RejFb'])
      }

      this.Fbustx = res['d']['Fbustx'];


      let tempArr = this.rejectedFormSet['d']['RejectedFormSet']['results'];



      for (let i = 0; i < tempArr.length; i++) {


        if ((["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) != -1 && tempArr[i]['Opbel'] == this.vatReviewFormGroup2.controls.referenceNumber.value) || (["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) == -1 && tempArr[i]['Fbnum'] == this.vatReviewFormGroup2.controls.referenceNumber.value)) {



          if (tempArr[i]['Abrzu'] != null) {
            const date1 = parseInt(tempArr[i]['Abrzu'].replace(/\D/g, ''));


            const Cdate1 = moment(date1).locale("en-us").format('YYYY/MM/DD');
            // this.abrzu = moment(date1).locale("en-us").format("YYYY-MM-DD[T]HH:mm:ss");
            this.abrzu = moment(date1).toISOString().split('.')[0];
            this.vatReviewFormGroup4.controls.periodFrom.setValue(Cdate1)

          } else {
            this.abrzu = null;
          }

          if (tempArr[i]['Abrzo'] != null) {
            const date2 = parseInt(tempArr[i]['Abrzo'].replace(/\D/g, ''));

            const Cdate2 = moment(date2).locale("en-us").format('YYYY/MM/DD');
            // this.abrzo = moment(date2 ).locale("en-us").format("YYYY-MM-DD[T]HH:mm:ss");
            this.abrzo = moment(date2).toISOString().split('.')[0];
            this.vatReviewFormGroup4.controls.periodTo.setValue(Cdate2)


          }
          else {
            this.abrzo = null;
          }


          if (tempArr[i]['DecDt'] != null && tempArr[i]['DecDt'] != '') {

            let tempDecisionDate = this.convertDate(tempArr[i]['DecDt']);
            console.log(tempDecisionDate);
            this.vatReviewFormGroup2.controls.decisionDate.setValue(tempDecisionDate);
          } else {
            this.vatReviewFormGroup2.controls.decisionDate.setValue('');
          }


          if (tempArr[i]['Penamount']) {

            this.vatReviewFormGroup4.controls.penaltyAmount.setValue(parseFloat(tempArr[i]['Penamount']).toFixed(2))

          } else {

            this.vatReviewFormGroup4.controls.penaltyAmount.setValue(tempArr[i]['Penamount'])
          }

          this.vatReviewFormGroup4.controls.taxPaid.setValue(tempArr[i]['Clramt'])
          this.vatReviewFormGroup4.controls.totalTaxLiability.setValue(tempArr[i]['Liaamt'])



          this.caseRef = tempArr[i]['CaseRef']
          this.persl = tempArr[i]['Persl']
          this.amountValue = tempArr[i]['Liaamt']
          this.decdt = tempArr[i]['DecDt']
          this.dateFrom = tempArr[i]['DateFrm']
          this.dateTo = tempArr[i]['DateTo']

          this.appFbguid = tempArr[i]['CaseGuid'];
          this.appFbnum = tempArr[i]['Fbnum'];
          this.appFbtyp = tempArr[i]['Fbtyp']

          //setting RejFb ---   
          this.RejFb = tempArr[i]['Fbnum'];
          this.Opbel = this.showBill() ? tempArr[i]['Opbel'] : ''

          break;
        }


      }






      console.log(res);

    }, (err) => {
      this.hideLoader();
      this.rejectedFormSet = undefined;
      this.billDetailData = undefined;
      this.vatReviewFormGroup2.controls.referenceNumber.setValue("");
      this.vatReviewFormGroup2.controls.decisionDate.setValue("");

      console.log("err in getRejected forms");
      this.rejectedFormSetErr = true;
      this.rejectedFormSetMsg = err['error']['error']['innererror']['errordetails'][0].message;
      this.notifierService.notify(
        "error",
        this.rejectedFormSetMsg
      );
      console.log(err);



    });

  }




  formatDate(date) {
    const date1 = parseInt(date.replace(/\D/g, ''));

    return moment(date1).locale("en-us").format('YYYY/MM/DD');

  }

  setNextValues() {

    let filterArray1 = this.rejectedFormSet['d']['RejectedFormSet']['results'];

    console.log(filterArray1)

    for (let i = 0; i < filterArray1.length; i++) {

      // ["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) == -1 ? each.Fbnum : each.Opbel
      const date3 = parseInt(filterArray1[i]['DecDt'].replace(/\D/g, ''));

      const Cdate3 = moment(date3).locale("en-us").format('YYYY/MM/DD');


      this.vatReviewFormGroup2.controls.decisionDate.setValue(Cdate3);
      if ((["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) != -1 && filterArray1[i]['Opbel'] == this.vatReviewFormGroup2.controls.referenceNumber.value) || (["VTPC", "VTPN"].indexOf(this.vatReviewFormGroup2.controls.selectedReason.value) == -1 && filterArray1[i]['Fbnum'] == this.vatReviewFormGroup2.controls.referenceNumber.value)) {

        if (filterArray1[i]['Abrzu'] != null) {
          const date1 = parseInt(filterArray1[i]['Abrzu'].replace(/\D/g, ''));


          const Cdate1 = moment(date1).locale("en-us").format('YYYY/MM/DD');
          // this.abrzu = moment(date1).locale("en-us").format("YYYY-MM-DD[T]HH:mm:ss");
          this.abrzu = moment(date1).toISOString().split('.')[0];
          this.vatReviewFormGroup4.controls.periodFrom.setValue(Cdate1)

        } else {
          this.abrzu = null;
        }

        if (filterArray1[i]['Abrzo'] != null) {
          const date2 = parseInt(filterArray1[i]['Abrzo'].replace(/\D/g, ''));

          const Cdate2 = moment(date2).locale("en-us").format('YYYY/MM/DD');
          // this.abrzo = moment(date2 ).locale("en-us").format("YYYY-MM-DD[T]HH:mm:ss");
          this.abrzo = moment(date2).toISOString().split('.')[0];
          this.vatReviewFormGroup4.controls.periodTo.setValue(Cdate2)


        }
        else {
          this.abrzo = null;
        }
        // const date3 = parseInt(filterArray1[i]['DecDt'].replace(/\D/g, ''));

        // const Cdate3 = moment(date3).locale("en-us").format('YYYY/MM/DD');


        // this.vatReviewFormGroup2.controls.decisionDate.setValue(Cdate3);

        if (filterArray1[i]['Penamount']) {
          this.vatReviewFormGroup4.controls.penaltyAmount.setValue(parseFloat(filterArray1[i]['Penamount']).toFixed(2))

        } else {
          this.vatReviewFormGroup4.controls.penaltyAmount.setValue(filterArray1[i]['Penamount'])
        }

        this.vatReviewFormGroup4.controls.taxPeriod.setValue(filterArray1[i]['Perslt'])
        // this.vatReviewFormGroup4.controls.periodFrom.setValue(Cdate1)
        // this.vatReviewFormGroup4.controls.periodTo.setValue(Cdate2)
        this.vatReviewFormGroup4.controls.totalTaxLiability.setValue(filterArray1[i]['Liaamt'])
        this.vatReviewFormGroup4.controls.taxPaid.setValue(filterArray1[i]['Clramt'])
        this.vatReviewFormGroup4.controls.amountValue.setValue(filterArray1[i]['Liaamt'])
        this.caseRef = filterArray1[i]['CaseRef']
        this.persl = filterArray1[i]['Persl']
        this.amountValue = filterArray1[i]['Liaamt']
        this.decdt = filterArray1[i]['DecDt']
        this.dateFrom = filterArray1[i]['DateFrm']
        this.dateTo = filterArray1[i]['DateTo']
        this.appFbguid = filterArray1[i]['CaseGuid'];
        this.appFbnum = filterArray1[i]['Fbnum'];
        this.appFbtyp = filterArray1[i]['Fbtyp'];
        this.RejFb = filterArray1[i]['Fbnum'];
        this.Opbel = this.showBill() ? filterArray1[i]['Opbel'] : ''
        // console.log(moment().valueOf( ))

        this.isShowReasonpopup = false;
        this.isAlert = false;

        if (this.rejectedFormSet['d']['UserTypx'] = "TP" && this.rejectedFormSet['d']['Fbustx'] == "E0001") {


          if (this.vatReviewFormGroup2.controls.selectedReason.value == "VTAS") {

            this.isReasonPopupConfirmed = false;

            this.reasonPopupText = this.lang['assessPopup'];
            this.isShowReasonpopup = true;
            this.showReasonPopup();

          }
          else if (filterArray1[i]['Fbtyp'] == 'VTPC' || filterArray1[i]['Fbtyp'] == 'VTPN') {
            this.isReasonPopupConfirmed = false;

            if (filterArray1[i]['Pentyp'] == 'R') {
              this.isShowReasonpopup = true;

              this.reasonPopupText = this.lang['penaltyPopup']
              this.showReasonPopup();

            }
            else if (filterArray1[i]['Msgflg'] == "X" && filterArray1[i]['Msgtxt'].trim().length > 0) {
              this.isShowReasonpopup = true;

              this.reasonPopupText = filterArray1[i]['Msgtxt']
              this.isAlert = true;
              this.showReasonPopup();


            }


          }



        }



        break;
      }


    }




  }

  showSadadPopup() {
    // this.generateSadad = true;
    $('#sadadConfirmation').modal("show");
  }

  showReasonPopup() {
    // this.generateSadad = true;
    $('#ReasonConfirmation').modal("show");
  }
  confirmReasonPopup() {

    $('#ReasonConfirmation').modal("hide");

    this.isReasonPopupConfirmed = true;

  }

  generateSadadBill(isRefresh: boolean) {




    this.showLoader()
    // /sap/opu/odata/SAP/ZDP_GEN_SADAD_SRV/GetSADADSet(Fbnum='90000003100',Gpart='3102285153',Disamt=125000m,Liaamt=125000m,Sectp='C',Abrzu=datetime'2018-04-01T00:00:00',Abrzo=datetime'2018-04-30T00:00:00',Flag=true,Secamt=125000m,Security='100000002498',Persl='18AP')
    const url = `sap/opu/odata/SAP/ZDP_GEN_SADAD_SRV/GetSADADSet(Fbnum='${this.Fbnumx}',Gpart='${localStorage.getItem('gpart')}',Disamt=${this.vatReviewService.formatAmount(this.vatReviewFormGroup4.controls.amountValue.value)},Liaamt=${this.vatReviewService.formatAmount(this.vatReviewFormGroup4.controls.totalTaxLiability.value)},Sectp='${this.vatReviewFormGroup5.controls.securityType.value}',Abrzu=datetime'${this.abrzu}',Abrzo=datetime'${this.abrzo}',Flag=${isRefresh},Secamt=${this.vatReviewService.formatAmount(this.vatReviewFormGroup5.controls.secAmount.value)},Security='${this.securityNumber}',Persl='${this.persl}')?$format=json`

    this.vatReviewService.getSadad(url).subscribe((res) => {
      this.disableSadadParams = true;
      this.hideLoader()
      console.log("in generateSadadBill");
      if (res['d']['Sopbel '] !== "" && res['d']['Sopbel'].length !== 0) {
        this.sadadNumber = res['d']['Sopbel'];
        this.securityNumber = res['d']['Security']
        this.enableRefresh = false;
      } else {
        this.securityNumber = res['d']['Security']
        console.log("enable Refresh")

        this.enableRefresh = true;
      }

      if (!isRefresh) {
        //if only clicked on generate sadad number than save the data again
        //true Means  we are saving data for draft , as operation 5
        this.saveData(true);
      }




      console.log(res);
    }, (err) => {
      this.hideLoader()

      console.log("error in  generateSadadBill")
      console.log(err)
      this.notifierService.notify(
        "error",
        err['error']['error']['message']['value']
      );
    });

  }

  uploadFile(res, fileSize, doTyp) {

    let obj = {
      name: res['d']['Filename'],
      size: fileSize,
      id: doTyp,
      flag: true,
      url: res["d"]["DocUrl"],
      did: res["d"]["Doguid"]

    };

    let control = <FormArray>this.vatReviewFormGroup3.controls.doc;

    control.push(this._formBuilder.group(obj));

    console.log(this.vatReviewFormGroup3.controls.doc);

    this.vatReviewFormGroup3.controls.supportingDocName.setValue("");
    this.vatReviewFormGroup5.controls.supportingDocName.setValue("");

  }




  setAttachment(value) {
    let control = <FormArray>this.vatReviewFormGroup3.controls.doc;
    for (var i = 0; i < value.length; i++) {
      control.push(
        this._formBuilder.group({
          id: value[i].Dotyp,
          name: value[i].Filename,
          url: value[i].DocUrl,
          flag: true,
          did: value[i].Doguid,
        })
      );
    }
    console.log(control.value);
  }



  uploadFiles(e, docType) {
    //doctype =1 , 2 == supportdoc, bank guarntee doc


    console.log(docType)
    console.log(this.vatReviewFormGroup3.controls.supportingDocName.value)
    console.log(this.vatReviewFormGroup5.controls.supportingDocName.value)


    if ((docType == 1 && this.vatReviewFormGroup3.controls.supportingDocName.value != "") || (docType == 2 && this.vatReviewFormGroup5.controls.supportingDocName.value != "")) {

      this.showLoader()
      let control = <FormArray>this.vatReviewFormGroup3.controls.doc;
      const frmData = new FormData();
      let filename;
      let size;
      for (var i = 0; i < 1; i++) {

        if (e[i] == undefined) {
          this.hideLoader()
          return false
        }

        const parseExt = e[i]['name'].split(".");
        const fileExt = parseExt[parseExt.length - 1].toLowerCase();
        if (docType == 1) {
          filename = this.vatReviewFormGroup3.controls.supportingDocName.value + "." + fileExt;
        }
        else {
          filename = this.vatReviewFormGroup5.controls.supportingDocName.value + "." + fileExt;

        }

        // filename = e[i]['name'];

        if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
          this.notifierService.notify("error", this.lang['invalidFormat']);
          this.hideLoader();

          return false;
        }
        if (e[i]['size'] > 5242880) {
          this.notifierService.notify("error", this.lang['filesizeMessage']);
          this.hideLoader();

          return false;
        }
        console.log(control.value)
        const fileIndex = control.value.findIndex(file => filename === file['name']);
        console.log(fileIndex)
        if (fileIndex != -1) {
          console.log(control.value[fileIndex].id)
          console.log(docType)
        }

        let countRaga = 0;
        let countRvbt = 0;
        if (fileIndex != -1) {
          for (let i = 0; i < control.value.length; i++) {
            if (docType == 1 && (control.value[i].id == 'RAGA' && control.value[i].name == filename)) {
              countRaga = 1;
              break;
            }
            if (docType == 2 && (control.value[i].id == 'RVBT' && control.value[i].name == filename)) {
              countRvbt = 1;
              break;
            }


          }
        }
        if (fileIndex != -1 && (countRaga == 1 || countRvbt == 1)) {
          this.notifierService.notify("error", this.lang['fileAlreayExists']);
          this.hideLoader();

          return false;
        }



        size = e[i].size / 10000;
        frmData.append("fileUpload", e[i]);
      }
      console.log("res", filename, e[i]);
      console.log(control);
      // console.log(idd);

      let doTyp = docType == 1 ? "RAGA" : "RVBT";

      let splitFileName = filename.split('.')
      let encodedFileName = encodeURI(splitFileName[0]) + '.' + splitFileName[1]

      this.vatReviewService
        .attachmentSubmit(
          this.returnIdx,
          // control.controls[idd].value.id,
          doTyp,
          encodedFileName,
          frmData
        )
        .subscribe(
          (res) => {
            console.log("upload", res);


            this.uploadFile(res, size, doTyp);
            this.hideLoader()
            // control.controls[idd]["controls"].name.setValue(filename);

            //control.controls[idd].value.id
            // this.notifierService.notify(
            //   "success",
            //   "Successfully uploaded the file"
            // );
          },
          (err) => {
            this.hideLoader()

            this.notifierService.notify(
              "error",
              err['error']['error']['innererror']['errordetails'][0].message
            );
          }
        );

    }

    else {
      console.log("set name of file");
    }

  }


  isPdf(fileName) {
    const parseExt = fileName.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    return fileExt.toLowerCase() === 'pdf';
  }

  amountTypeSelect(type) {

    this.vatReviewFormGroup4.controls.amountValue.setValue(this.amountValue);
    this.vatReviewFormGroup4.controls.amountType.setValue(type);

  }


  getSecurityAmount() {
    const url = `${ApiConstants.getSecurityAmount}/GetSecurityAmountSet(Disamt=${this.vatReviewService.formatAmount(this.vatReviewFormGroup4.controls.amountValue.value)},Liaamt=${this.vatReviewService.formatAmount(this.vatReviewFormGroup4.controls.totalTaxLiability.value)},Clramt=${this.vatReviewService.formatAmount(this.vatReviewFormGroup4.controls.taxPaid.value)},Amttp='${this.vatReviewFormGroup4.controls.amountType.value}')`;





    // const url = `${ApiConstants.getSecurityAmount}/GetSecurityAmountSet(Disamt=1,Liaamt=1,Clramt=1,Amttp='P')`;


    return this.vatReviewService.getSecAmt(url);
  }





  securityTypeSelect(type) {
    this.securityType = type;
    this.vatReviewFormGroup5.controls.securityType.setValue(type);


  }




  deleteAttachmentFromSer(dotyp, doguid, index) {
    this.vatReviewService.deleteAttachment(dotyp, doguid).subscribe((res) => {
      console.log("delete", res);
      let control = <FormArray>this.vatReviewFormGroup3.controls.doc;
      control.removeAt(index);
    }, (err) => {
      console.log("err in delete attachement");

    });
  }

  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.vatReviewFormGroup6.controls.name.setValue(name);
  }


  onDobChange() {
    if (this.dob1 === undefined && this.vatReviewFormGroup6.controls.idType.value != "ZS0003") {
      // this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;
      this.dobMsg = this.lang['dobMsg'];
    }
    else {
      this.dobErr = false;
    }
  }


  idValidationOnBlur() {
    let d;
    let currentdate;
    if (this.id1 === undefined || (this.id1 === "" || this.id1.trim().length == 0)) {
      this.idErr1 = true;
      // this.idMsg = this.vatErr.e5;
      this.idMsg = this.lang['idMsg'];
    }
    else {
      if (this.vatReviewFormGroup6.controls.idType.value == "ZS0001" || this.vatReviewFormGroup6.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
      }
    }
  }

  onIdinputChange() {
    this.IDtypeValidation1(this.id1);
  }


  onIdNumChange() {

    if (this.vatReviewFormGroup6.controls.idType.value == "ZS0003" && (this.vatReviewFormGroup6.controls.idNum.value.length < 7 || this.vatReviewFormGroup6.controls.idNum.value.length > 15)) {
      this.showIdNumError = true;
      this.isIdValidated = false;
    }
    else {
      this.showIdNumError = false;
      this.isIdValidated = true;
    }

  }


  onIdSelect() {
    // if (this.vatReviewFormGroup6.controls.idType.value == "ZS0001" || this.vatReviewFormGroup6.controls.idType.value == "ZS0002") {
    this.isIdValidated = false;
    this.vatReviewFormGroup6.controls.idNum.setValue("");
    this.vatReviewFormGroup6.controls.name.setValue('');
    this.dob1 = undefined;
    this.id1 = undefined;
    if (this.vatReviewFormGroup6.controls.idType.value != "ZS0003") {
      $("#aftSelect").modal("show");

    }

    // }
  }

  validateID2() {
    let d;
    let currentdate;
    if (this.id1 === undefined || (this.id1 === "" || this.id1.trim().length == 0)) {
      this.idErr1 = true;
      // this.idMsg = this.vatErr.e5;
      this.idMsg = this.lang['idMsg'];

    }


    else {
      if (this.vatReviewFormGroup6.controls.idType.value == "ZS0001" || this.vatReviewFormGroup6.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
      }
    }


    if (this.dob1 === undefined && this.vatReviewFormGroup6.controls.idType.value != "ZS0003") {
      this.dobErr = true;

      this.dobMsg = this.lang['dobMsg'];
    } else {
      this.dobErr = false;
      if (this.vatReviewFormGroup6.controls.idType.value == "ZS0001" || this.vatReviewFormGroup6.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
        d = this.dob1;

        console.log(d);
        currentdate = (d.calendarStart.year).toString() + ('0' + (d.calendarStart.month).toString()).slice(-2) + ('0' + (d.calendarStart.day).toString()).slice(-2);
        console.log(currentdate);
      }
      else {
        d = new Date();
        console.log(d);
        let year = (d.getFullYear()).toString();
        let month = ('0' + (d.getMonth() + 1).toString()).slice(-2);
        let day = ('0' + (d.getDate()).toString()).slice(-2);

        // let dateNow= new Date() ;
        currentdate = year + month + day;
        console.log(currentdate);
      }

      console.log(currentdate);

      let obj = {
        type: this.vatReviewFormGroup6.value.idType,
        idNumber: this.id1,
      };
      if (!this.idErr1) {

        console.log(currentdate);
        this.vatReviewService.getUserValidation(obj, currentdate).subscribe(
          (res) => {

            console.log("res", res);

            this.vatReviewFormGroup6.controls["idNum"].setValue(
              res["d"]["Idnum"]
            );


            if ('FullName' in res['d'] && res['d']['FullName'] != "") {

              this.vatReviewFormGroup6.controls["name"].setValue(
                res["d"]["FullName"]
              );
            }
            else if ('Name1' in res['d'] && res['d']['Name1'] != "") {
              this.vatReviewFormGroup6.controls["name"].setValue(
                res["d"]["Name1"] + " " + res["d"]["Name2"]
              );

            }

            $("#aftSelect").modal("hide");

            // //this.vatFormThirdGroup.get("Decname").disable();
            // this.notifierService.notify("success", "Valid ID Number");

            this.isIdValidated = true;
          },
          (err) => {
            console.log(err);
            this.isIdValidated = false;

            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      }
    }
  }

  IDtypeValidation1(idNum) {
    let obj = this.commonValid.IDtypeValidation(
      this.vatReviewFormGroup6.value.idType,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }


  // reset() {
  //   this.idErr1 = false;
  //   this.dobErr = false;
  // }
  reset() {
    if (this.isIdValidated == false) {
      this.vatReviewFormGroup6.controls.idType.setValue("")
    }

    this.idErr1 = false;
    this.dobErr = false;
  }

  viewBill() {
    this.showBillModal = true;

    if (this.caseRef != undefined && this.caseRef != "") {
      this.showLoader();

      const url = `sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/BillDtlSet?$filter=Opbel eq '${this.vatReviewFormGroup2.controls.referenceNumber.value}' and Vtre2 eq '${this.caseRef}'`
      this.vatReviewService.getBillDetailSet(url).subscribe((res) => {
        this.hideLoader();

        console.log("in getBillDetailSet");
        this.billDetailData = res['d'];

        // if (this.billDetailData['results'].length > 0) {
        //   if (this.billDetailData['results'][0].Betrh) {
        //     this.vatReviewFormGroup4.controls.penaltyAmount.setValue(parseFloat(this.billDetailData['results'][0].Betrh).toFixed(2))

        //   } else {
        //     this.vatReviewFormGroup4.controls.penaltyAmount.setValue(this.billDetailData['results'][0].Betrh)
        //   }
        // }
        console.log(res);
        if (true) {

          $("#viewBill").modal("show");
        }


      }, (err) => {
        this.hideLoader();

        console.log("error in getting billDetailSet")
        console.log(err)
      });


    }


  }




  getControls() {
    let control = <FormArray>this.vatReviewFormGroup3.controls.doc;
    // console.log(control)
    // console.log(control.value)
    return control.value

    // console.log((this.vatReviewFormGroup3.get('doc') as FormArray).controls)
    // return (this.vatReviewFormGroup3.get('doc') as FormArray).controls;
  }


  step(stepNo) {
    this.optionActive = stepNo;
  }


  setNotesetValue() {

  }

  saveData(getSadadNumber) {
    this.notes = [];
    let count = 1;
    let start = 0;
    let end = 0;
    console.log(this.vatReviewFormGroup3.controls.reviewDetailNote.value)
    let el = this.vatReviewFormGroup3.controls.reviewDetailNote.value;
    for (let i = 0; i < el.length; i++) {
      if (el.charAt(i) === "\n" || el.charAt(i) === "\r" || el.charAt(i) === "\r\n") {
        end = i;
        let tdline = el.substring(start, end);
        let noteObj =
        {
          __metadata: {
            id: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
            uri: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
            type: 'ZDP_VAT_NW_REV_SRV.NOTES'
          },
          Notenoz: '2',
          Refnamez: '',
          XInvoicez: '',
          XObsoletez: '',
          Rcodez: 'RAVT_BOX',
          Erfusrz: '',
          Erfdtz: null,
          Erftmz: null,
          AttByz: 'TP',
          ByPusrz: '',
          ByGpartz: localStorage.getItem('gpart'),
          DataVersionz: '00000',
          Namez: '',
          Noteno: '2',
          Lineno: count,
          ElemNo: 0,
          Tdformat: '',
          Tdline: tdline,

        }


        this.notes.push(noteObj)
        start = end + 1;
        count++;
      }
    }


    console.log("start", start)
    console.log("count", count)
    console.log("elLength", el.length)



    if (start < el.length) {


      let tdline = el.substring(start, el.length);
      let noteObj =
      {
        __metadata: {
          id: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
          uri: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
          type: 'ZDP_VAT_NW_REV_SRV.NOTES'
        },
        Notenoz: '2',
        Refnamez: '',
        XInvoicez: '',
        XObsoletez: '',
        Rcodez: 'RAVT_BOX',
        Erfusrz: '',
        Erfdtz: null,
        Erftmz: null,
        AttByz: 'TP',
        ByPusrz: '',
        ByGpartz: localStorage.getItem('gpart'),
        DataVersionz: '00000',
        Namez: '',
        Noteno: '2',
        Lineno: count,
        ElemNo: 0,
        Tdformat: '',
        Tdline: tdline,
      }


      this.notes.push(noteObj)


    }


    let count1 = 1;
    let start1 = 0;
    let end1;
    console.log(this.vatReviewFormGroup4.controls.disputeDetailNote.value)
    const el1 = this.vatReviewFormGroup4.controls.disputeDetailNote.value;
    for (let i = 0; i < el1.length; i++) {
      if (el1.charAt(i) === "\n" || el1.charAt(i) === "\r" || el1.charAt(i) === "\r\n") {
        end1 = i;
        let tdline = el1.substring(start1, end1);
        let noteObj =
        {
          __metadata: {
            id: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
            uri: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
            type: 'ZDP_VAT_NW_REV_SRV.NOTES'
          },
          Notenoz: '3',
          Refnamez: '',
          XInvoicez: '',
          XObsoletez: '',
          Rcodez: 'RAVT_SDCAS',
          Erfusrz: '',
          Erfdtz: null,
          Erftmz: null,
          AttByz: 'TP',
          ByPusrz: '',
          ByGpartz: localStorage.getItem('gpart'),
          DataVersionz: '00000',
          Namez: '',
          Noteno: '3',
          Lineno: count1,
          ElemNo: 0,
          Tdformat: '',
          Tdline: tdline,
        }


        this.notes.push(noteObj)

        start1 = end1 + 1;
        count1++;



      }
    }


    if (start1 < el1.length) {


      let tdline = el1.substring(start1, el1.length);
      let noteObj =
      {
        __metadata: {
          id: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
          uri: 'https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/NotesSet("001")',
          type: 'ZDP_VAT_NW_REV_SRV.NOTES'
        },
        Notenoz: '3',
        Refnamez: '',
        XInvoicez: '',
        XObsoletez: '',
        Rcodez: 'RAVT_SDCAS',
        Erfusrz: '',
        Erfdtz: null,
        Erftmz: null,
        AttByz: 'TP',
        ByPusrz: '',
        ByGpartz: localStorage.getItem('gpart'),
        DataVersionz: '00000',
        Namez: '',
        Noteno: '3',
        Lineno: count1,
        ElemNo: 0,
        Tdformat: '',
        Tdline: tdline,
      }


      this.notes.push(noteObj)


    }

    let checkCashParam = this.vatReviewFormGroup5.controls.checkCash.value != true ? '' : 'X';
    let checkBankParam = this.vatReviewFormGroup5.controls.checkBank.value != true ? '' : 'X';

    let currentDate = moment(new Date()).valueOf();
    console.log(this.notes);
    // /Date(1519776000000)/


    let vatReviewData = { ...this.data['d'] };
    vatReviewData['AgreeFg'] = true,
      vatReviewData['DateFrm'] = this.dateFrom,
      vatReviewData['DateFrmOld'] = this.dateFrom,
      vatReviewData['DateTo'] = this.dateTo,
      vatReviewData['DateToOld'] = this.dateTo,
      vatReviewData['DecDt'] = this.decdt,
      vatReviewData['Persl'] = this.persl,
      vatReviewData['CalTyp'] = '1',
      vatReviewData['DecFlg1'] = true,
      vatReviewData['DecFlg2'] = false,
      vatReviewData['DecIdNo'] = this.vatReviewFormGroup6.controls.idNum.value,
      vatReviewData['Declarationdt'] = `/Date(${currentDate})/`,
      vatReviewData['Decnm'] = this.vatReviewFormGroup6.controls.name.value,
      vatReviewData['Fbnumx'] = this.Fbnumx,
      vatReviewData['Fbustx'] = !getSadadNumber && this.vatReviewFormGroup5.controls.securityType.value == 'C' ? this.Statusx : this.Fbustx,
      vatReviewData['Gpartx'] = localStorage.getItem('gpart'),
      vatReviewData['IdType'] = this.vatReviewFormGroup6.controls.idType.value,
      vatReviewData['Langx'] = this.langX,
      vatReviewData['Operationx'] = getSadadNumber ? '05' : '01',
      vatReviewData['RejFb'] = this.RejFb,
      vatReviewData['RvRsn'] = this.vatReviewFormGroup2.controls.selectedReason.value,
      vatReviewData['RvSubRsn'] = this.vatReviewFormGroup2.controls.selectedSubReason.value,
      vatReviewData['Statusx'] = !getSadadNumber && this.vatReviewFormGroup5.controls.securityType.value == 'C' ? this.Statusx : this.data['d']['Statusx'],
      vatReviewData['StepNumberx'] = '05',
      vatReviewData['UserTypx'] = 'TP',
      vatReviewData['ReasonSet'] = [],
      vatReviewData['AddressSet'] = [],
      vatReviewData['NotesSet'] = this.notes,
      vatReviewData['QuesListSet'] = [],
      vatReviewData['AttdetSet'] = [],
      vatReviewData['IdDetailSet'] = [],
      vatReviewData['MainReasonSet'] = [],
      vatReviewData['SecurityDtl']
    vatReviewData['SecurityDtl']['Amttp'] = this.vatReviewFormGroup4.controls.amountType.value,
      vatReviewData['SecurityDtl']['CaseRef'] = this.caseRef,
      vatReviewData['SecurityDtl']['Clramt'] = this.vatReviewFormGroup4.controls.taxPaid.value,
      vatReviewData['SecurityDtl']['Secamt'] = this.vatReviewFormGroup5.controls.secAmount.value,
      vatReviewData['SecurityDtl']['Gpart'] = localStorage.getItem('gpart'),
      vatReviewData['SecurityDtl']['Security'] = this.securityNumber,
      vatReviewData['SecurityDtl']['ChkCash'] = checkCashParam,
      vatReviewData['SecurityDtl']['Abrzu'] = this.abrzu,
      vatReviewData['SecurityDtl']['ChkBank'] = checkBankParam,
      vatReviewData['SecurityDtl']['Abrzo'] = this.abrzo,
      vatReviewData['SecurityDtl']['Disamt'] = this.vatReviewFormGroup4.controls.amountValue.value,
      vatReviewData['SecurityDtl']['Liaamt'] = this.vatReviewFormGroup4.controls.totalTaxLiability.value,
      vatReviewData['SecurityDtl']['Sectp'] = this.vatReviewFormGroup5.controls.securityType.value,
      vatReviewData['SecurityDtl']['Sopbel'] = this.sadadNumber,
      vatReviewData['SecurityDtl']['Perslt'] = this.vatReviewFormGroup4.controls.taxPeriod.value,
      vatReviewData['SecurityDtl']['Opbel'] = this.Opbel;
    vatReviewData['SecurityDtl']['Penamount'] = this.vatReviewFormGroup4.controls.penaltyAmount.value;

    // let vatReviewData =
    // {
    //   __metadata: {
    //     id: 'https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/HeaderSet(Appfg="N",Euserx="00000000000000000000",Fbnumx="",FormGuid="",Gpartx="3311655775",Langx="EN",Officerx="",PortalUsrx="")',
    //     uri: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/HeaderSet(Appfg='N',Euserx='00000000000000000000',Fbnumx='',FormGuid='',Gpartx='3311655775',Langx='EN',Officerx='',PortalUsrx='')",
    //     type: 'ZDP_VAT_NW_REV_SRV.Header'
    //   },
    //   Golivefg: this.data['d']['Golivefg'],
    //   Actnm: this.data['d']['Actnm'],
    //   Skipst5covid19: this.data['d']['Skipst5covid19'],
    //   Cr385fg: this.data['d']['Cr385fg'],
    //   DecDt: this.decdt,
    //   Appfg: 'N',
    //   Persl: '18AP',
    //   Actno: this.data['d']['Actno'],
    //   AgreeFg: true,
    //   Branchx: this.data['d']['Branchx'],
    //   CalTyp: '1',
    //   CrNo: this.data['d']['CrNo'],
    //   DataVersion: this.data['d']['DataVersion'],
    //   DateFrm: this.dateFrom,
    //   DateFrmOld: this.dateFrom,
    //   DateTo: this.dateTo,
    //   DateToOld: this.dateTo,
    //   PeriodKey: '',
    //   DecFlg1: true,
    //   DecFlg2: false,
    //   DecIdNo: this.vatReviewFormGroup6.controls.idNum.value,
    //   Declarationdt: `/Date(${currentDate})/`,
    //   Decnm: this.vatReviewFormGroup6.controls.name.value,
    //   Euserx: '00000000000000000000',
    //   Evstatus: '',
    //   Fbnumx: this.Fbnumx,
    //   Fbstax: '',
    //   Fbustx: !getSadadNumber && this.vatReviewFormGroup5.controls.securityType.value == 'C' ? this.Statusx : this.Fbustx,
    //   FormGuid: '',
    //   Formprocx: '',
    //   Forwardx: '',
    //   FullName: this.data['d']['FullName'],
    //   Gpartx: localStorage.getItem('gpart'),
    //   Iban: '',
    //   IdType: this.vatReviewFormGroup6.controls.idType.value,
    //   Langx: this.langX,
    //   Officerx: '',
    //   Operationx: getSadadNumber ? '05' : '01',
    //   PortalUsrx: '',
    //   RejFb: this.vatReviewFormGroup2.controls.referenceNumber.value,
    //   ReturnIdx: this.data['d']['ReturnIdx'],
    //   RvRsn: this.vatReviewFormGroup2.controls.selectedReason.value,
    //   RvSubRsn: this.vatReviewFormGroup2.controls.selectedSubReason.value,
    //   Srcidentifyx: '',
    //   Statusx: !getSadadNumber && this.vatReviewFormGroup5.controls.securityType.value == 'C' ? this.Statusx : this.data['d']['Statusx'],
    //   StepNumberx: '05',
    //   TxnTpx: '',
    //   UserTypx: 'TP',
    //   ReasonSet: [],
    //   AddressSet: [],
    //   NotesSet: this.notes,
    //   QuesListSet: [],
    //   AttdetSet: [],
    //   IdDetailSet: [],
    //   MainReasonSet: [],
    //   SecurityDtl: {
    //     __metadata: {
    //       id: 'https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/SecurityDtlSet()',
    //       uri: 'https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/SecurityDtlSet()',
    //       type: 'ZDP_VAT_NW_REV_SRV.SecurityDtl'
    //     },
    //     Amttp: this.vatReviewFormGroup4.controls.amountType.value,
    //     //hardcoded
    //     PenamtI: '0.00',
    //     Rvdsc: '',
    //     SeczeroFlg: '',
    //     Opbel: '',
    //     PenamtR: '0.00',
    //     Extfg: '',
    //     Penamount: '0.00',
    //     CaseRef: this.caseRef,
    //     Exmfg: '',
    //     Pentp: '',
    //     Crpnl: '0.00',
    //     Penamt: '0.00',
    //     Lfpnl: '0.00',
    //     Vatamt: '0.00',
    //     Clramt: this.vatReviewFormGroup4.controls.totalTaxLiability.value,
    //     Dueamt: '0.00',
    //     FormGuid: '',
    //     Secamt: this.vatReviewFormGroup5.controls.secAmount.value,
    //     Gpart: localStorage.getItem('gpart'),
    //     Security: this.securityNumber,
    //     ChkCash: checkCashParam,
    //     DataVersion: '00000',
    //     Abrzu: this.abrzu,
    //     ChkBank: checkBankParam,
    //     Abrzo: this.abrzo,
    //     Disamt: this.vatReviewFormGroup4.controls.amountValue.value,
    //     Liaamt: this.vatReviewFormGroup4.controls.totalTaxLiability.value,
    //     Sectp: this.vatReviewFormGroup5.controls.securityType.value,
    //     Bnkid: '',
    //     BnkValto: null,
    //     BnkValfm: null,
    //     Bkext: '',
    //     Sopbel: this.sadadNumber,
    //     Perslt: this.vatReviewFormGroup4.controls.taxPeriod.value,
    //   }
    // }

    this.showLoader();

    if (!getSadadNumber) {
      this.vatReviewService.submitVatReviewData(vatReviewData).subscribe((res) => {
        console.log(res);
        this.hideLoader();
        this.successData = res['d'];
        this.showSuccess = true;
      }, (err) => {
        console.log(err);
        this.hideLoader();


        this.notifierService.notify(
          "error",
          err['error']['error']['innererror']['errordetails'][0].message
        );


      })
    }

    if (getSadadNumber) {


      this.vatReviewService.submitVatReviewData(vatReviewData).subscribe((res) => {
        console.log(res);
        this.Fbnumx = res['d']['Fbnumx']
        this.Statusx = res['d']['Statusx']
        if (!this.enableRefresh) {
          // refresh is not enabled  than saving the data and calling generate sadad bil and again saving the data in genetatesadadbill()
          //else  on refresh button directly calling the generateSadadBill(true api);
          this.generateSadadBill(false)
        }
        // this.hideLoader();

        // this.showSuccess = true;
      }, (err) => {
        console.log(err);
        this.hideLoader();
      })

    }

  }



  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }





  downloadAck() {
    // /sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='90000000231')/$value
    const url = `sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='${this.successData['Fbnumx']}')/$value`


    console.log(this.baseUrl + url)
    window.open(this.baseUrl + url, '_self');

  }



  getAttachmentCount() {
    let control = <FormArray>this.vatReviewFormGroup3.controls.doc;
    for (let i = 0; i < control.value.length; i++) {

      if (control.value[i].id == 'RVBT') {
        return true;

      }


    }

    return false;

  }


  onInputChange(textArea) {

    // let val1 = this.vatReviewFormGroup3.controls.reviewDetailNote.value
    if (textArea == 't1') {

      $('#t1').on('input focus keydown keyup', function (e) {

        // if (val1.length >= 1006) {
        //   if (e.keyCode !== 8) {
        //     e.preventDefault();
        //   }

        // }

        var text = $(this).val();
        var lines = text.split(/(\r\n|\n|\r)/gm);
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].length > maxLength) {
            lines[i] = lines[i].substring(0, maxLength) + "\n";
          }
        }
        $(this).val(lines.join(''));
      });




    }
    if (textArea == 't2') {
      $('#t2').on('input focus keydown keyup', function () {
        var text = $(this).val();
        var lines = text.split(/(\r\n|\n|\r)/gm);
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].length > maxLength) {
            lines[i] = lines[i].substring(0, maxLength) + "\n";
          }
        }
        $(this).val(lines.join(''));
      });
    }
  }


  parseNumber(val) {
    return parseFloat(val).toFixed(2)
  }




  statusColor(status) {
    // console.log(status)

    let yellow = ["E0018", "E0015", "E0016", "E0071", "E0019", "E0021", "E0052", "E0053", "E0054", "E0041", "E0049", "E0050", "E0044", "E0061", "E0062", "E0063", "E0066", "E0067", "E0069", "E0083", "E0087"]
    let red = ["E0051", "E0043", "E0088"]
    let green = ["E0045", "E0048", "E0064", "E0065", "E0084", "E0085", "E0086"]
    let grey = ["E0013", "E0001", "E0018"]

    if (yellow.findIndex(each => status == each) != -1) {
      return "tag32 tag-partial";
    }


    else if (red.findIndex(each => status == each) != -1) {
      return "tag32 tag-danger";
    }


    else if (green.findIndex(each => status == each) != -1) {
      return "tag32 tag-success";
    }


    else if (grey.findIndex(each => status == each) != -1) {
      return "tag32  tag-unsubmit";
    }

    else {
      return "tag32 tag-unsubmit"
    }


  }





}