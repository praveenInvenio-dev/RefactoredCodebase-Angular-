import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { DeferralVatPaymentConstant } from 'src/app/constants/DeferralVatPaymentConstatnts';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import { environment } from "src/environments/environment";
import { CommonValidation } from "src/app/constants/commonValidations";
import { DeferralVatPaymentService } from 'src/app/services/deferral-vat-payment.service';
import * as moment from 'moment';
import { LoaderService } from '../../loader/loader.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DashboardService } from 'src/app/services/dashboard-service';
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";




declare var $: any;
const nonWhitespaceRegExp: RegExp = new RegExp("^[^.\\s]");
const quickRatio: RegExp = new RegExp("^(\\d{0,2}(\\.\\d{1,2})?|100(\\.00?)?)$")
let maxLength = 132;

@Component({
  selector: 'app-deferral-vat-payment',
  templateUrl: './deferral-vat-payment.component.html',
  styleUrls: ['./deferral-vat-payment.component.css']
})
export class DeferralVatPaymentComponent implements OnInit {


  headerComponent = CalendarComponent;
  baseUrl = environment.url;

  lang: any = DeferralVatPaymentConstant.eng;
  showSuccess = false;
  showTerms = false;
  mainPage = false;
  showApp = false;
  optionActive = 0;
  langX: String;
  langSingle: String;
  listData = {};
  data;
  id1 = "";
  idErr1 = false;
  idErr;
  idMsg;
  dob1: any;
  dobErr = false;
  dobMsg = "";
  Inschk = "true";
  notes = [];
  selectedStatus = "01";
  formType = "def";
  isAgree = false;
  successData;
  currentDate;
  layoutType = 'grid';
  searchText = "";
  isIdValidated = false;
  count = 0;
  reqTiles = [];
  Fbnum;
  showIdNumError = false;
  showSearch = true;
  showListHeader = true;
  companyType: any = "";
  filteredIndustries: any;
  qv1: any = "";
  qv2: any = "";
  qv3: any = "";
  qv4: any = "";
  qv5: any = "";
  sector = "";
  industry = "";
  ack1: any = "";
  ack2: any = "";
  effectiveDate = "";
  companyTypeTitle = "";
  sectorSummary = "";
  industrySummary = "";
  effectivePeriod = "";
  dateData: any = {};
  begdaPost = "";
  enddaPost = "";
  efdaPost = "";
  fg1: FormGroup;
  fg2: FormGroup;
  fg3: FormGroup;
  fg4: FormGroup;

  fg5: FormGroup;
  dbData: any = null;
  fbguidData: any = {};
  today = new Date();
  isSubmit = true;
  statusCode = '';
  statusText = '';
  continueIns = false;
  selectedCreationDate: any = "null";

  constructor(private router: Router, private _formBuilder: FormBuilder, public appSrv: AppService, public loaderService: LoaderService, public service: DeferralVatPaymentService, public dbservice: DashboardService, private http: HttpClient, public notifierService: NotifierService, public commonValid: CommonValidation) {
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
      this.lang = DeferralVatPaymentConstant.arb;
    }


    this.dbservice.getDashboardData$().subscribe((res) => {
      console.log(res);
      this.dbData = res;
      this.getInitData();
    }, (err) => {
      console.log(err)
    });




    this.currentDate = moment(new Date()).locale("en-us").format('YYYY/MM/DD')


  }




  getInitData() {
    this.service.getInitialListData().subscribe((res) => {
      console.log("initial List Data")
      console.log(res);

      this.listData = res;
      this.reqTiles = this.listData['d']['ASSLISTSet']['results'];
      //get the count of Cards to be shown : 
      this.count = -1;
      for (let i = 0; i < this.reqTiles.length; i++) {

        let each = this.reqTiles[i]
        if ((each.Fbust == this.selectedStatus || this.selectedStatus == '01') && (each.Fbtyp == 'TPAV')) {

          this.count = this.count + 1;

          this.reqTiles[i].convertedDate = this.formatDate(each.Receipt)

        }
      }

      this.mainPage = true;
    }, (err) => {
      console.log(err);
    })

  }

  onSubmit() {
    // if (this.fg1.valid) {
    //   this.setAttachment(this.data['d']["ATTACHSet"]["results"]);


    //   this.optionActive = 2
    //   console.log("2");
    // }

    if (this.fg1.invalid) {
      this.isSubmit = false;
      return;
    }
    else {
      this.isSubmit = true;
    }
    this.optionActive = 2

    if (this.fg1.controls.companyType.value == "1") {
      this.companyTypeTitle = this.lang['f1']['tile1']
    }
    if (this.fg1.controls.companyType.value == "2") {
      this.companyTypeTitle = this.lang['f1']['tile2']
    }
    if (this.fg1.controls.companyType.value == "3") {
      this.companyTypeTitle = this.lang['f1']['tile3']
    }


    let getSector = this.data['d']['SECTORSet']['results']
    for (let i = 0; i < getSector.length; i++) {
      if (this.fg1.controls.selectedSector.value === getSector[i].SectorCd) {
        this.sectorSummary = getSector[i].Description
      }
    }

    let getIndustry = this.data['d']['INDUSTRYSet']['results']
    for (let i = 0; i < getIndustry.length; i++) {
      if (this.fg1.controls.selectedIndustry.value === getIndustry[i].IndustryCd) {
        this.industrySummary = getIndustry[i].Description
      }
    }


  }


  onSubmit2() {
    if (this.fg2.invalid) {
      this.isSubmit = false;
      return;
    }
    else {
      this.isSubmit = true;
    }
    this.optionActive = 3
    console.log("3");

    let getEffectivePeriod = this.data['d']['EffPrdSet']['results']
    for (let i = 0; i < getEffectivePeriod.length; i++) {
      if (this.fg2.controls.effectiveDate.value === getEffectivePeriod[i].Persl) {
        this.effectivePeriod = getEffectivePeriod[i].Txt50
      }
    }




  }

  onSubmit3() {

    // if (this.fg3.invalid) {
    //   this.isSubmit = false;
    //   return;
    // }
    // else {
    //   this.isSubmit = true;
    // }


    this.optionActive = 4
    console.log("4");

  }

  onSubmit4() {
    if (this.fg4.invalid || !this.isIdValidated) {
      this.isSubmit = false;
      return;
    }
    else {
      this.isSubmit = true;
    }

    this.optionActive = 5;
    console.log("5");

  }


  onSubmit5() {


    let obj =
    {
      "__metadata": {
        "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPAV_M_SRV/TPAV_HDRSet(Fbnumx='',PortalUsrx='',Langx='EN',Officerx='',Gpartx='3300105114',TxnTpx='',FormGuid='',Persl='',Euser='00000000000000000000')",
        "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPAV_M_SRV/TPAV_HDRSet(Fbnumx='',PortalUsrx='',Langx='EN',Officerx='',Gpartx='3300105114',TxnTpx='',FormGuid='',Persl='',Euser='00000000000000000000')",
        "type": "ZDP_TPAV_M_SRV.TPAV_HDR"
      },
      "Ack1": "1",
      "EffectiveDate": this.efdaPost,
      "McName1": this.data['d']['McName1'],
      "GrpNoI": this.fg1.controls.selectedIndustry.value,
      "GrpNoS": this.fg1.controls.selectedSector.value,
      "Mandtx": "",
      "Ack2": "1",
      "Fbnumx": this.data['d']['Fbnumx'],
      "PortalUsrx": "",
      "Langx": this.langX,
      "Operationx": "01",
      "StepNumberx": "3",
      "ReturnIdx": this.data['d']['ReturnIdx'],
      "Officerx": "",
      "Gpartx": localStorage.getItem('gpart'),
      "Statusx": this.data['d']['Statusx'],
      "UserTypx": this.data['d']['UserTypx'],
      "TxnTpx": "",
      "Formprocx": this.data['d']['Formprocx'],
      "OfficerTx": "",
      "SrcAppx": "",
      "Periodkeyx": "",
      "Begdax": null,
      "Enddax": null,
      "Mandt": "",
      "FormGuid": this.fbguidData['d']['Fbguid'],
      "DataVersion": this.data['d']['DataVersion'],
      "ReturnId": "",
      "TimestampCr": null,
      "TimestampCh": null,
      "Persl": this.fg2.controls.effectiveDate.value,
      "Decfg": "1",
      "Decname": this.fg4.controls.name.value,
      "Decdesignation": "",
      "Decdate": null,
      "DecidTy": this.fg4.controls.idType.value,
      "DecidNo": this.fg4.controls.idNum.value,
      "StepNumber": "03",
      "Begda": this.begdaPost,
      "TransType": "CRE_TPAV",
      "Gpart": "",
      "Attchk": "",
      "Iagrfg": "1",
      "PleSpecify": this.fg1.controls.extra.value,
      "QrYear1": this.data['d']['QrYear1'],
      "QrYear2": this.data['d']['QrYear2'],
      "QrYear3": this.data['d']['QrYear3'],
      "QrYear4": this.data['d']['QrYear4'],
      "QrYear5": this.data['d']['QrYear5'],
      "QrValue1": this.fg1.controls.v1.value,
      "QrValue2": this.fg1.controls.v2.value,
      "QrValue3": this.fg1.controls.v3.value,
      "QrValue4": this.fg1.controls.v4.value,
      "QrValue5": this.fg1.controls.v5.value,
      "Rb1": this.fg1.controls.companyType.value,
      "Endda": this.enddaPost,
      "CanDate": null,
      "DmodeFlg": "",
      "EvStatus": "",
      "Euser": this.dbData['d']['Euser'],
      "NOTESSet": [

      ],
      "INDUSTRYSet": [],
      "SECTORSet": [],
      "ATTACHSet": [],
      "ATT_TYPSet": [],
      "EffPrdSet": [],
      "ATT_TYP1Set": this.data['d']['ATT_TYP1Set']['results'],
      "QUESLISTSet": {
        "results": []
      }
    }




    this.service.submitData(obj).subscribe((res) => {
      console.log(res)
      this.successData = res['d']
      this.showSuccess = true;
    }, (err) => { console.log(err) })

  }

  isPdf(fileName) {

    return false;

    //    const parseExt = fileName.split(".");
    // const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    // return fileExt.toLowerCase() === 'pdf';
  }


  initData() {
    this.companyType = '';

    this.fg1 = this._formBuilder.group({
      companyType: [this.companyType, Validators.required],
      selectedSector: [this.sector, Validators.required],
      selectedIndustry: [this.industry, Validators.required],
      extra: [""],
      v1: [this.qv1, [Validators.required, Validators.minLength(1), Validators.pattern(quickRatio)]],
      v2: [this.qv2, [Validators.required, Validators.minLength(1), Validators.pattern(quickRatio)]],
      v3: [this.qv3, [Validators.required, Validators.minLength(1), Validators.pattern(quickRatio)]],
      v4: [this.qv4, [Validators.required, Validators.minLength(1), Validators.pattern(quickRatio)]],
      v5: [this.qv5, [Validators.required, Validators.minLength(1), Validators.pattern(quickRatio)]],

    });
    this.fg2 = this._formBuilder.group({

      ack1: [this.ack1, Validators.requiredTrue],
      ack2: [this.ack2, Validators.requiredTrue],
      periodFrom: [""],
      periodTo: [""],
      effectiveDate: [this.effectiveDate, Validators.required]
    });
    this.fg3 = this._formBuilder.group({
      doc: this._formBuilder.array([]),
    });
    this.fg4 = this._formBuilder.group({
      idType: ["", Validators.required],
      idNum: ["", Validators.required],
      name: ["", [Validators.required, Validators.pattern(nonWhitespaceRegExp), Validators.maxLength(80)]],
      term: ["", Validators.requiredTrue],
    });

    this.fg5 = this._formBuilder.group({

    });








  }



  addRequest(Fbnum) {
    this.continueIns = true;

    if (this.isAgree) {
      this.isAgree = true;
      $("#terms").modal("toggle");
      this.mainPage = false;
      this.showApp = true;
      this.optionActive = 1;
      this.continueIns = false
    }


  }




  startProcess(Fbnum, statusCode, statusText) {
    this.statusCode = statusCode;
    this.statusText = statusText
    this.showLoader()

    this.showTerms = true;
    this.Fbnum = Fbnum;
    this.isAgree = false;




    console.log("start Process")

    // this.closeModal('terms')

    this.service.getFbguid(this.Fbnum, this.dbData).subscribe((res) => {
      this.fbguidData = res;

      this.service.getInitialData(this.Fbnum, this.dbData, res).subscribe((res) => {

        console.log(res)

        this.data = res;

        this.isSubmit = true;

        this.initData();

        if (this.data['d']['Rb1'] && this.data['d']['Rb1'] == "1") {
          this.fg1.controls.companyType.setValue("1");
          this.companyType = "1";
          this.companyTypeTitle = this.lang['f1']['tile1']
        }
        if (this.data['d']['Rb1'] && this.data['d']['Rb1'] == "2") {
          this.fg1.controls.companyType.setValue("2");
          this.companyType = "2";
          this.companyTypeTitle = this.lang['f1']['tile2']
        }
        if (this.data['d']['Rb1'] && this.data['d']['Rb1'] == "3") {
          this.fg1.controls.companyType.setValue("3");
          this.companyType = "3";
          this.companyTypeTitle = this.lang['f1']['tile3']

          this.fg1.controls['extra'].setValidators([Validators.required, Validators.pattern(nonWhitespaceRegExp), Validators.minLength(1), Validators.maxLength(200)]);

          this.fg1.controls['extra'].updateValueAndValidity();



        }





        this.fg1.controls.extra.setValue(this.data['d']['PleSpecify']);



        this.fg1.controls.selectedSector.setValue(this.data['d']['GrpNoS']);
        this.sector = this.data['d']['GrpNoS']


        this.filterIndustries()

        this.fg1.controls.selectedIndustry.setValue(this.data['d']['GrpNoI']);
        this.industry = this.data['d']['GrpNoI']

        let getSector = this.data['d']['SECTORSet']['results']
        for (let i = 0; i < getSector.length; i++) {
          if (this.fg1.controls.selectedSector.value === this.sector) {
            this.sectorSummary = getSector[i].Description
          }
        }

        let getIndustry = this.data['d']['INDUSTRYSet']['results']
        for (let i = 0; i < getIndustry.length; i++) {
          if (this.fg1.controls.selectedIndustry.value === this.industry) {
            this.industrySummary = getIndustry[i].Description
          }
        }




        this.setAttachment(this.data['d']["ATTACHSet"]["results"]);


        this.fg1.controls.v1.setValue(this.data['d']['QrValue1'])
        this.fg1.controls.v2.setValue(this.data['d']['QrValue2'])
        this.fg1.controls.v3.setValue(this.data['d']['QrValue3'])
        this.fg1.controls.v4.setValue(this.data['d']['QrValue4'])
        this.fg1.controls.v5.setValue(this.data['d']['QrValue5'])
        this.qv1 = this.data['d']['QrValue1'];
        this.qv2 = this.data['d']['QrValue2'];
        this.qv3 = this.data['d']['QrValue3'];
        this.qv4 = this.data['d']['QrValue4'];
        this.qv5 = this.data['d']['QrValue5'];



        let ack1 = this.data['d']['Ack1'] == '1' ? true : false;
        let ack2 = this.data['d']['Ack2'] == '1' ? true : false;
        this.fg2.controls.ack1.setValue(ack1);
        this.fg2.controls.ack2.setValue(ack2);
        this.ack1 = ack1;
        this.ack2 = ack2;


        this.fg2.controls.effectiveDate.setValue(this.data['d']['Persl'])
        this.effectiveDate = this.data['d']['Persl']

        if (this.data['d'].EffectiveDate != null) {
          const date1 = parseInt(this.data['d'].EffectiveDate.replace(/\D/g, ''));
          const Cdate1 = moment(date1).locale("en-us").format('YYYY/MM/DD');
          this.fg2.controls.periodFrom.setValue(Cdate1)
          this.begdaPost = this.data['d'].Begda;

        }
        if (this.data['d'].Endda != null) {
          const date2 = parseInt(this.data['d'].Endda.replace(/\D/g, ''));
          const Cdate2 = moment(date2).locale("en-us").format('YYYY/MM/DD');
          this.fg2.controls.periodTo.setValue(Cdate2);
          this.enddaPost = this.data['d'].Endda;

        }

        this.efdaPost = this.data['d']['EffectiveDate']

        this.fg4.controls.idType.setValue(this.data['d']['DecidTy']);
        this.fg4.controls.idNum.setValue(this.data['d']['DecidNo']);
        this.fg4.controls.name.setValue(this.data['d']['Decname']);

        if (this.data['d']['DecidTy'].length > 0 && this.data['d']['DecidNo'].length > 0) {
          this.isIdValidated = true;
        }





        if (this.Fbnum == '') {
          $("#terms").modal("show");
        }
        else {

          this.mainPage = false;
          this.showApp = true;
          this.optionActive = 6;

        }
        this.hideLoader();



        //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_UH_SRV/UI_HDRSet(Fbnum='',Lang='E',Officer='',Gpart='3060000044',Status='E0001',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet

        const url = `sap/opu/odata/SAP/ZDP_TPAV_UH_SRV/UI_HDRSet(Fbnum='',Lang='${this.langSingle}',Officer='',Gpart='${localStorage.getItem("gpart")}',Status='',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet&$format=json`

        this.http.get(this.baseUrl + url).subscribe((res) => {
          console.log(res)

        }, (err) => {
          console.log(err)

        })

      }, (err) => {
        console.log(err);
        this.hideLoader();

        let errMsg = "";
        for (let i = 0; i < err.error.error.innererror.errordetails.length; i++) {
          if (err.error.error.innererror.errordetails[i]['code'].includes("ZD_TPAV")) {
            errMsg = errMsg + " " + err.error.error.innererror.errordetails[i]['message']
          }
        }

        this.notifierService.notify(
          "error",
          errMsg
        );
      })
    }, (err) => { console.log(err) })
  }


  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }

  back() {
    if (this.optionActive > 1 && this.optionActive < 6) {
      this.optionActive--;
      return;
    }

    if (this.optionActive == 1) {

      // $("#terms").modal("toggle");
      this.mainPage = true;
      this.showApp = false;
      this.optionActive--;
      return;

    }
    if (this.mainPage && !this.showApp) {


      this.backTo('001');
      return;
    }
    if (this.optionActive == 6) {

      // $("#terms").modal("toggle");
      this.mainPage = true;
      this.showApp = false;
      this.optionActive = 0;
      return;

    }

  }



  formatDate(date: String) {
    if (date != null) {
      const date1 = parseInt(date.replace(/\D/g, ''));

      return moment(date1).locale("en-us").format('Do MMM YYYY');
    }
    else {
      return ''
    }
  }



  onClickFilterIcon() {
    $("#filter").modal("show");

  }



  onApplyFilter() {
    this.filterStatus();
    $("#filter").modal("toggle");
  }




  getEffectiveDate() {
    this.showLoader()
    this.service.getEffectiveDate(this.Fbnum, this.fg2.controls.effectiveDate.value, this.fbguidData['d']['Fbguid'], this.dbData['d']['Euser']).subscribe((res) => {
      this.hideLoader();
      this.dateData = res;


      if (this.dateData['d'].EffectiveDate != null) {
        const date1 = parseInt(this.dateData['d'].EffectiveDate.replace(/\D/g, ''));
        const Cdate1 = moment(date1).locale("en-us").format('YYYY/MM/DD');
        this.fg2.controls.periodFrom.setValue(Cdate1)
        this.begdaPost = this.dateData['d'].Begda;


      }
      if (this.dateData['d'].Endda != null) {
        const date2 = parseInt(this.dateData['d'].Endda.replace(/\D/g, ''));
        const Cdate2 = moment(date2).locale("en-us").format('YYYY/MM/DD');
        this.fg2.controls.periodTo.setValue(Cdate2)
        this.enddaPost = this.dateData['d'].Endda;

      }

      this.efdaPost = this.dateData['d'].EffectiveDate


    }, (err) => {

      this.hideLoader();
      let errMsg = "";
      for (let i = 0; i < err.error.error.innererror.errordetails.length; i++) {
        if (err.error.error.innererror.errordetails[i]['code'].includes("ZD_TPAV")) {
          errMsg = errMsg + " " + err.error.error.innererror.errordetails[i]['message']
        }
      }

      this.notifierService.notify(
        "error",
        errMsg
      );
    })
  }





  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "terms") {
      this.isAgree = false
      $("#terms").modal("toggle");
    }

    if (cardType === "filter") {

      $("#filter").modal("toggle");
    }

  }

  onIdNumChange() {

    if (this.fg4.controls.idType.value == "ZS0003" && (this.fg4.controls.idNum.value.length < 7 || this.fg4.controls.idNum.value.length > 15)) {
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
    this.fg4.controls.idNum.setValue("");
    this.fg4.controls.name.setValue('');
    this.dob1 = undefined;
    this.id1 = undefined;
    if (this.fg4.controls.idType.value != "ZS0003") {
      $("#aftSelect").modal("show");

    }

    // }
  }


  onDobChange() {
    if (this.dob1 === undefined && this.fg4.controls.idType.value != "ZS0003") {
      // this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;
      this.dobMsg = this.lang['dobMsg'];
    }
    else {
      this.dobErr = false;
    }
  }

  onIdinputChange() {
    this.IDtypeValidation1(this.id1);
    // if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0002" && this.id1[0]!=2) {
    //   this.idErr1 = true;
    //   this.idMsg = "Enter a valid Iqama ID";
    // }else{
    //   this.idErr1 = false;
    //   this.idMsg = "";
    // }
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
      if (this.fg4.controls.idType.value == "ZS0001" || this.fg4.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
      }


    }



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
      if (this.fg4.controls.idType.value == "ZS0001" || this.fg4.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
      }
    }


    if (this.dob1 === undefined && this.fg4.controls.idType.value != "ZS0003") {
      //this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;
      this.dobMsg = this.lang['dobMsg'];
    } else {
      this.dobErr = false;
      if (this.fg4.controls.idType.value == "ZS0001" || this.fg4.controls.idType.value == "ZS0002") {
        this.IDtypeValidation1(this.id1);
        d = this.dob1;
        // if (d.day < 10) {
        //   d.day = d.day;
        // }
        // if (d.month < 10) {
        //   d.month = d.month;
        // }
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
        type: this.fg4.value.idType,
        idNumber: this.id1,
      };
      if (!this.idErr1) {

        console.log(currentdate);
        this.service.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            // this.tinErr = false;
            console.log("res", res);
            // this.iddErr = false;
            this.fg4.controls["idNum"].setValue(
              res["d"]["Idnum"]
            );


            if ('FullName' in res['d'] && res['d']['FullName'] != "") {

              this.fg4.controls["name"].setValue(
                res["d"]["FullName"]
              );
            }
            else if ('Name1' in res['d'] && res['d']['Name1'] != "") {
              this.fg4.controls["name"].setValue(
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
      this.fg4.value.idType,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }


  reset() {
    if (this.isIdValidated == false) {
      this.fg4.controls.idType.setValue("")
    }

    this.idErr1 = false;
    this.dobErr = false;
  }
  filterStatus() { }



  downloadAck() {
    // /sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='90000000231')/$value
    const url = `sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='${this.successData['Fbnumx']}')/$value`
    // const url = `${ApiConstants.getRejectedForms}/HeaderSet(Langx='${this.langX}',Gpartx='${localStorage.getItem('gpart')}',TxnTpx='${this.data['d']['TxnTpx']}',Fbustx='${this.data['d']['Fbustx']}',Fbstax='${this.data['d']['Fbstax']}',UserTypx='${this.btnData['d']['UserTyp']}',RvRsn='${this.vatReviewFormGroup2.controls.selectedReason.value}',RvSubRsn='${this.vatReviewFormGroup2.controls.selectedSubReason.value}',Fbnumx='${this.data['d']['Fbnumx']}',Sopbel='${this.data['d']['SecurityDtl'].Sopbel}',Formprocx='ZTAX_VT_REV')?$expand=RejectedFormSet`;

    // this.http.get(this.baseUrl + url, { observe: 'response' }).subscribe((res) => {
    //   this.hideLoader();

    console.log(this.baseUrl + url)
    window.open(this.baseUrl + url, '_self');
    //   // this.downloadFile()
    //   // console.log(res.headers.get());

    // }, (err) => {
    //   this.hideLoader();
    //   this.rejectedFormSetMsg = err['error']['error']['innererror']['errordetails'][0].message;
    //   this.notifierService.notify(
    //     "error",
    //     this.rejectedFormSetMsg
    //   );
    //   console.log(err);
    // });
  }


  downloadAck1() {

    const url = `sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='${this.Fbnum}')/$value`

    console.log(this.baseUrl + url)
    window.open(this.baseUrl + url, '_self');



  }

  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }

  changeLayoutType(type) {

    // type == grid or table 
    this.layoutType = type;

  }


  step(stepToDisplay) {
    this.optionActive = stepToDisplay;
  }


  getControls() {
    let control = <FormArray>this.fg3.controls.doc;
    console.log(control)
    console.log(control.value)
    return control.value

    // console.log((this.vatReviewFormGroup3.get('doc') as FormArray).controls)
    // return (this.vatReviewFormGroup3.get('doc') as FormArray).controls;
  }




  // formatBytes(x) {

  //   const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   let l = 0, n = parseInt(x, 10) || 0;

  //   while (n >= 1024 && ++l) {
  //     n = n / 1024;
  //   }
  //   //include a decimal point and a tenths-place digit if presenting 
  //   //less than ten of KB or greater units
  //   return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  // }




  statusColor(status) {
    // console.log(status)
    let yellow = ["E0061", "E0052", "E0044", "E0041", "E0016", "E0015"]
    let red = ["E0051", "E0043"]
    let green = ["E0045"]
    let grey = ["E0018", "E0013"]

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

  // onSearchFocusIn() {
  //   this.showSearch = false;
  // }

  // onSearchFocusOut() {
  //   this.showSearch = true;
  // }

  onSearchFocusIn() {
    console.log("focusIN")
    console.log(this.searchText.length)

    if (this.searchText.length > 0) {
      this.showSearch = false;
    }
    else {
      this.showSearch = true
    }
  }

  onSearchFocusOut() {
    console.log("focusout")
    this.showSearch = true;
  }

  onSearchHover() {

    if (this.searchText.length == 0) {
      this.showSearch = true
    } else {
      this.showSearch = false;
    }
  }

  companyTypeSelect(type) {
    this.companyType = type;
    this.fg1.controls.companyType.setValue(type);

    if (this.fg1.controls.companyType.value == "3") {
      this.fg1.controls['extra'].setValidators([Validators.required, Validators.pattern(nonWhitespaceRegExp), Validators.minLength(1)]);

      this.fg1.controls['extra'].updateValueAndValidity();

    } else {

      this.fg1.controls['extra'].clearValidators();
      this.fg1.controls['extra'].updateValueAndValidity();

    }




  }


  filterIndustries() {
    // (this.data['d']['GrpNoI'] && this.data['d']['GrpNoI'] != "")
    this.fg1.controls.selectedIndustry.setValue("");
    this.filteredIndustries = this.data['d']['INDUSTRYSet']['results'].filter(i => i.SectorCd == this.fg1.controls.selectedSector.value);
  }

  changeStatus() {
    let reqTiles = this.listData['d']['ASSLISTSet']['results'];
    //get the count of Cards to be shown : 
    let count = 0;
    for (let i = 0; i < reqTiles.length; i++) {

      let each = reqTiles[i]
      if ((each.Fbust == this.selectedStatus || this.selectedStatus == '01') && (each.Fbtyp == 'TPAV')) {
        console.log("in changed Status")
        console.log(this.selectedStatus)
        count = 1;
        break;

      }
    }

    if (count == 1) {
      this.showListHeader = true;
    }
    else {
      this.showListHeader = false;
    }

  }


  // changeCreationDate(){

  //   let reqTiles = this.reqTiles;
  //   //get the count of Cards to be shown : 
  //   let count = 0;
  //   for (let i = 0; i < reqTiles.length; i++) {

  //     let each = reqTiles[i]
  //     if ((each.Fbust == this.selectedStatus || this.selectedStatus == '01') && (each.Fbtyp == 'TPAV')) {
  //       console.log("in changed Status")
  //       console.log(this.selectedStatus)
  //       count = 1;
  //       break;

  //     }
  //   }

  //   // if (count == 1) {
  //   //   this.showListHeader = true;
  //   // }
  //   // else {
  //   //   this.showListHeader = false;
  //   // }

  // }


  // nameValidator(event) {
  //   let name = event.target.value;
  //   name = name.replace(/[^a-zA-Z\u0600-\u06FF ][^\sa-zA-Z\u0600-\u06FF ]*$/g, "");
  //   name = name.replace(/[\s]{2,}/g, " ");
  //   var regex;
  //   // regex = /[دجحخ هعغفقثصضذطكمنتالبيسشظزوةىلارؤءئإلإلأأ؟آلآ]|\.|\s/;
  //   regex = /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/
  //   this.fg4.controls.name.setValue(name);
  // }

  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.fg4.controls.name.setValue(name);
  }


  setAttachment(value) {
    let control = <FormArray>this.fg3.controls.doc;
    for (var i = 0; i < value.length; i++) {
      control.push(
        this._formBuilder.group({
          ext: value[i]['FileExtn'].toLowerCase(),
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


  uploadFile(res, fileSize, type) {

    console.log(type)

    let obj = {
      name: res['d']['Filename'],
      size: fileSize,
      id: type,
      flag: true,
      url: res["d"]["DocUrl"],
      did: res["d"]["Doguid"]
    };

    let control = <FormArray>this.fg3.controls.doc;

    control.push(this._formBuilder.group(obj));

    console.log(this.fg3.controls.doc);



  }


  attachRequired() {
    let countTPAA = 0;
    let countTPAB = 0;
    let countTPAC = 0;
    let control = <FormArray>this.fg3.controls.doc;
    for (let i = 0; i < control.value.length; i++) {
      if (control.value[i].id == 'TPAA') {
        countTPAA = 1;

      }
      if (control.value[i].id == 'TPAB') {
        countTPAB = 1;

      }
      if (control.value[i].id == 'TPAC') {
        countTPAC = 1;
      }


    }

    if (countTPAA == 1 && countTPAB == 1 && countTPAC == 1) {
      return true
    }
    else {
      return false
    }

  }


  attachRequiredMultiple(type) {
    let countTPAA = 0;
    let countTPAB = 0;
    let countTPAC = 0;
    let control = <FormArray>this.fg3.controls.doc;
    for (let i = 0; i < control.value.length; i++) {
      if (control.value[i].id == 'TPAA') {
        countTPAA = countTPAA + 1;

      }
      if (control.value[i].id == 'TPAB') {
        countTPAB = countTPAB + 1;

      }
      if (control.value[i].id == 'TPAC') {
        countTPAC = countTPAC + 1;
      }


    }

    if (type == "TPAA") {
      return countTPAA
    }
    if (type == "TPAB") {
      return countTPAB
    }
    if (type == "TPAC") {
      return countTPAC
    }

  }

  uploadFiles(e, type) {
    this.showLoader();
    if (e[0].size == 0) {
      this.hideLoader();
      this.notifierService.notify(
        "error",
        this.lang.Invalidfilesize
      );
      return
    }
    let control = <FormArray>this.fg3.controls.doc;
    const frmData = new FormData();
    let filename;
    let size;

    for (var i = 0; i < 1; i++) {
      console.log(e[i])
      if (e[i] == undefined) {
        this.hideLoader()
        return false
      }
      filename = e[i]['name'];
      const parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();

      if (filename.length > 100) {
        this.notifierService.notify("error", this.lang['fileNameLarge']);
        this.hideLoader();

        return false;
      }

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
      if (fileIndex > -1) {
        // this.notifierService.notify("error", this.lang['fileAlreayExists']);
        // this.hideLoader();

        // return false;
      }


      let countTPAA = 0;
      let countTPAB = 0;
      let countTPAC = 0;

      if (fileIndex != -1) {
        for (let i = 0; i < control.value.length; i++) {
          if (type == "TPAA" && (control.value[i].id == 'TPAA' && control.value[i].name == filename)) {
            countTPAA = countTPAA + 1;

          }
          if (type == "TPAB" && (control.value[i].id == 'TPAB' && control.value[i].name == filename)) {
            countTPAB = countTPAB + 1;

          }
          if (type == "TPAC" && (control.value[i].id == 'TPAC' && control.value[i].name == filename)) {
            countTPAC = countTPAC + 1;

          }


        }
      }
      if (fileIndex != -1 && (countTPAA >= 1 || countTPAB >= 1 || countTPAC >= 1)) {
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

    let splitedFilename = filename.split('.');
    let encodedFilename = encodeURI(splitedFilename[0]) + "." + splitedFilename[1]

    this.service
      .attachmentSubmit(
        this.data['d']['ReturnIdx'],
        // control.controls[idd].value.id,
        type,
        encodedFilename,
        frmData
      )
      .subscribe(
        (res) => {
          console.log("upload", res);


          this.uploadFile(res, size, type);
          this.hideLoader();
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

  deleteAttachmentFromSer(dotyp, doguid, index) {
    this.service.deleteAttachment(dotyp, doguid).subscribe((res) => {
      console.log("delete", res);
      let control = <FormArray>this.fg3.controls.doc;
      control.removeAt(index);
    }, (err) => {
      console.log("err in delete attachement");

    });
  }


  convertToDecimal(valueId) {



    if (valueId == 'v1' && (this.fg1.controls.v1.value.length > 0 && this.fg1.controls.v1.value.length < 4) && (!isNaN(this.fg1.controls.v1.value))) {

      this.fg1.controls.v1.setValue(parseFloat(this.fg1.controls.v1.value).toFixed(2))
    }
    if (valueId == 'v2' && (this.fg1.controls.v2.value.length > 0 && this.fg1.controls.v2.value.length < 4) && (!isNaN(this.fg1.controls.v2.value))) {
      this.fg1.controls.v2.setValue(parseFloat(this.fg1.controls.v2.value).toFixed(2))
    }
    if (valueId == 'v3' && (this.fg1.controls.v3.value.length > 0 && this.fg1.controls.v3.value.length < 4) && (!isNaN(this.fg1.controls.v3.value))) {
      this.fg1.controls.v3.setValue(parseFloat(this.fg1.controls.v3.value).toFixed(2))
    }
    if (valueId == 'v4' && (this.fg1.controls.v4.value.length > 0 && this.fg1.controls.v4.value.length < 4) && (!isNaN(this.fg1.controls.v4.value))) {
      this.fg1.controls.v4.setValue(parseFloat(this.fg1.controls.v4.value).toFixed(2))
    }
    if (valueId == 'v5' && (this.fg1.controls.v5.value.length > 0 && this.fg1.controls.v5.value.length < 4) && (!isNaN(this.fg1.controls.v5.value))) {
      this.fg1.controls.v5.setValue(parseFloat(this.fg1.controls.v5.value).toFixed(2))
    }
  }



  // /^[\u0621-\u064Aa-zA-Z ]*$/
}
