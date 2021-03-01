import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { NewChangeFilingFrequencyConstants } from 'src/app/constants/newChangeFilingConstant';
import { ChangeFilingService } from 'src/app/services/change-filing.service'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NotifierService } from "angular-notifier";
import { CommonValidation } from "src/app/constants/commonValidations";
import { AppService } from "src/app/app.service";
import { CalendarComponent } from "src/app/constants/calendar.component";
import * as moment from "moment";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { ActivatedRoute, Router } from "@angular/router";
// import * as $ from 'jquery'
declare var $: any;

@Component({
  selector: 'app-new-change-filing-frequency',
  templateUrl: './new-change-filing-frequency.component.html',
  styleUrls: ['./new-change-filing-frequency.component.css']
})
export class NewChangeFilingFrequencyComponent implements OnInit {
  historyList: any = "";
  landingdata: any = "";
  returnIdx: any = "";
  getapi2res: any = "";
  baseUrl = environment.url;
  langX: string;
  langSingle: string;
  lang: any = NewChangeFilingFrequencyConstants.eng;
  changeFilingObject: any = "";
  viewSel: any = 'listview';
  cardSelected: any = -1;
  selEffDate: any = "";
  selIdType: any = "";
  searchText: any = "";
  typeDocText: any = "";
  historyCardData: any = "";
  name: any = "";
  no: any = "";
  stepNo: any = "";
  TempATT_TYPSet = [];
  uploadFlag = false;
  typeFilter: any = "";
  statusFilter: any = "";
  filtData: any = "";
  isIdValidated = false;
  showIdNumError = false;
  today:any="";
  //
  retypeData: any = '';
  statusData: any = '';
  chipSelected: any = -1;
  StchipSelected: any = -1;
  // attachrequired:any="";
  hideattach:any="";
  tpNamess:any="";
  // 
  idErr;
  idMsg;
  idErr1 = false;
  dobErr = false;
  id1:any = "";
  dob1: any;
  dobMsg = "";
  img1 = "assets/image/table (1).svg"
  img2 = "assets/image/cards (1).svg"
  instructionsAccepted = false;
  instructionsSubmitted: boolean = false;
  nameError=false;
  isSubmit=true;
// 5 file upload
checkFileData={
  ZTPA:{
    count:0,
    name:[],
    type:"ZTPA",
    tname:"Previous 2 Years Monthly Returns",
  },
  ZTPB:{
    count:0,
    name:[],
    type:"ZTPB",
    tname:"Previous 12 Months Taxable Revenue",
  },
  ZTPC:{
    count:0,
    name:[],
    type:"ZTPC",
    tname:"Other Documents",
  }
}

  // 
  optionActive = 1;
  changeFreFormGroup1: FormGroup;
  changeFreFormGroup2: FormGroup;
  changeFreFormGroup3: FormGroup;
  changeFreFormGroup4: FormGroup;
  changeFreFormGroup5: FormGroup;
  changeFreFormGroup6: FormGroup;
  changeFreFormGroup7: FormGroup;

  filesSubmitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private ChangeFilingService: ChangeFilingService,
    private http: HttpClient,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    public appSrv: AppService,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    private routers: ActivatedRoute,
    private router: Router,
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
    // this.appSrv.data1.subscribe((res) => {
    //   this.today = this.commonValid.dateFormate(
    //     this.commonValid.toJulianDate(new Date()),
    //     res
    //   );
    //   this._dateAdapter.format(this.today, "YYYY-MM-DD")
    // });
    if (localStorage.getItem("lang") === "ar") {
      this.lang = NewChangeFilingFrequencyConstants.arb;
    }
    this.tpNamess=localStorage.getItem("name")
    this.changeFreFormGroup1 = this._formBuilder.group({
      searchText: [""],
    })
    this.changeFreFormGroup2 = this._formBuilder.group({
      Persl: ["", Validators.required],
      Iagrfg: ["", Validators.requiredTrue]
    })
    this.changeFreFormGroup3 = this._formBuilder.group({
      docType: [""],
      doc: this._formBuilder.array([]),
      // supportingDocName: [""],
    })
    this.changeFreFormGroup4 = this._formBuilder.group({
      DecidTy: ["", Validators.required],
      DecidNo: ["", Validators.required],
      Decname: ["", Validators.required],
      Decfg: ["", Validators.requiredTrue]
    })

    this.changeFreFormGroup5 = this._formBuilder.group({

    })
    this.changeFreFormGroup6 = this._formBuilder.group({

    })

    this.changeFreFormGroup7 = this._formBuilder.group({

    })
    this.getInitialData();
    this.getButtons();
  }



  onSubmit1() {
    
    this.getLandingData("");

  }
  onSubmit2() {

    if (this.changeFreFormGroup2.invalid) {
      this.isSubmit = false;
      return;
    }
    else {
      this.isSubmit = true;
    }
    if ((this.changeFilingObject['d']['CureentF'] =="Monthly" || this.changeFilingObject['d']['CureentF'] =="شهرية")  && (this.changeFilingObject['d']['FilingF'] == "ربع سنوية" || this.changeFilingObject['d']['FilingF'] =="Quarterly" )) {
      this.hideattach="yes"
      this.optionActive = 3;
    }else{
      this.optionActive = 4;
    }
    // this.changeFilingObject["d"]["UserTypz"] = "TP";
    // this.changeFilingObject["d"]["CPersl"] = this.changeFreFormGroup2.value.Persl.Persl;
    // this.changeFilingObject["d"]["Iagrfg"] = this.changeFreFormGroup2.value.Iagrfg ? "1" : "0";
    // this.submitChangeFiling(3,"05","00");
    
  }

  private validateFilesToUpload(): void {
    const object = this.getapi2res.d.ATT_TYPSet.results;
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (element.DmsTp === 'ZTPA' && this.checkFileData.ZTPA.count === 0) {
          this.getapi2res.d.ATT_TYPSet.results[key].err = true;
        }
        if (element.DmsTp === 'ZTPB' && this.checkFileData.ZTPB.count === 0) {
          this.getapi2res.d.ATT_TYPSet.results[key].err = true;
        }
        if (element.DmsTp === 'ZTPA' && this.checkFileData.ZTPA.count > 0) {
          this.getapi2res.d.ATT_TYPSet.results[key].err = false;
        }
        if (element.DmsTp === 'ZTPB' && this.checkFileData.ZTPB.count > 0) {
          this.getapi2res.d.ATT_TYPSet.results[key].err = false;
        }
      }
    }
  }

  onSubmit3() {
    if (this.cardSelected === 2) {
      this.getapi2res.d.ATT_TYPSet.results.map((r) => r.err = false);
      this.optionActive = 4;
      return;
    }       
    if (this.getCheck() && (this.cardSelected === 0 || this.cardSelected === 1)) {
      this.filesSubmitted = true;
      this.validateFilesToUpload();
      return;
    }
    if (!this.getCheck() && (this.cardSelected === 0 || this.cardSelected === 1)) {
      this.optionActive = 4;
      return;
    }
    if (this.cardSelected === -1 && this.getCheck()) {
      this.filesSubmitted = true;
      this.validateFilesToUpload();
      return;
    }
    if (!this.getCheck() && this.cardSelected === -1) {
      this.optionActive = 4;
      return;
    }
  }
  
  onSubmit4() {
    if (this.changeFreFormGroup4.invalid) {
      this.isSubmit = false;
      return;
    }
    else {
      this.isSubmit = true;
    }
    let decidd=this.changeFreFormGroup4.value.DecidNo;
    console.log(decidd.toString());
    this.changeFilingObject["d"]["UserTypz"] = "TP";
    this.changeFilingObject["d"]["Persl"] = this.changeFreFormGroup2.value.Persl.Persl;
    this.changeFilingObject["d"]["DecidTy"] = this.changeFreFormGroup4.value.DecidTy;
    this.changeFilingObject["d"]["DecidNo"] = decidd;//.toString();
    this.changeFilingObject["d"]["Decname"] = this.changeFreFormGroup4.value.Decname;
    this.changeFilingObject["d"]["Decdate"] = "/Date(" + Date.now() + ")/";
    // bug 
    // this.changeFilingObject["d"]["CPersl"] = this.changeFreFormGroup2.value.Persl.Persl;
    // this.submitChangeFiling(5,"05","01");
    this.optionActive = 5
  }
  onSubmit5() {
    console.log(this.changeFreFormGroup3.controls.doc.value);
    let attsetdta=[];
    if (this.checkFileData.ZTPA.count>0){
      let attsetObj={
        "DmsTp":this.checkFileData.ZTPA.type,
        "Txt50":this.checkFileData.ZTPA.tname,
        "__metadata":{
          "id":this.ChangeFilingService.geturlsforfile()+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+this.checkFileData.ZTPA.count+"')",
          "uri":this.ChangeFilingService.geturlsforfile()+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+this.checkFileData.ZTPA.count+"')",
          "type":"ZDP_VAT_TPCV_SRV.ATT_TYP"
        }
      }
      attsetdta.push(attsetObj)
    }
    if(this.checkFileData.ZTPB.count>0){
      let attsetObj={
        "DmsTp":this.checkFileData.ZTPB.type,
        "Txt50":this.checkFileData.ZTPB.tname,
        "__metadata":{
          "id":this.ChangeFilingService.geturlsforfile()+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+this.checkFileData.ZTPB.count+"')",
          "uri":this.ChangeFilingService.geturlsforfile()+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+this.checkFileData.ZTPB.count+"')",
          "type":"ZDP_VAT_TPCV_SRV.ATT_TYP"
        }
      }
      attsetdta.push(attsetObj)
    }

    if(this.checkFileData.ZTPC.count>0){
      let attsetObj={
        "DmsTp":this.checkFileData.ZTPC.type,
        "Txt50":this.checkFileData.ZTPC.tname,
        "__metadata":{
          "id":this.ChangeFilingService.geturlsforfile()+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+this.checkFileData.ZTPC.count+"')",
          "uri":this.ChangeFilingService.geturlsforfile()+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+this.checkFileData.ZTPC.count+"')",
          "type":"ZDP_VAT_TPCV_SRV.ATT_TYP"
        }
      }
      attsetdta.push(attsetObj)
    }
    
    // for(var i=0; i<this.changeFreFormGroup3.controls.doc.value.length;i++){
    //   let attsetObj={
    //     "DmsTp":this.changeFreFormGroup3.controls.doc.value[i].actTy,
    //     "Txt50":this.changeFreFormGroup3.controls.doc.value[i].Txt50,
    //     "__metadata":{
    //       "id":this.ChangeFilingService.geturlsforfile+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+i+"')",
    //       "uri":this.ChangeFilingService.geturlsforfile+"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/ATT_TYPSet('"+i+"')",
    //       "type":"ZDP_VAT_TPCV_SRV.ATT_TYP"
    //     }
    //   }
    //   attsetdta.push(attsetObj)
    // }
    this.changeFilingObject.d.ATT_TYPSet=attsetdta;
    console.log(this.changeFilingObject);
    this.submitChangeFiling();
  }


  submitChangeFiling() {
    // this.changeFilingObject["d"]["Operationz"] = "05";
    this.changeFilingObject["d"]["Iagrfg"] = "1" ;
    this.changeFilingObject["d"]["Decfg"] = "1";
    this.changeFilingObject["d"]["Reqfg"]="1";
    this.changeFilingObject["d"]["Operationz"] = "01";
    this.changeFilingObject["d"]["StepNumber"] = "02";
    this.changeFilingObject["d"]["StepNumberz"] = "02";
    console.log("this.changeFilingObject ->", JSON.stringify(this.changeFilingObject));
    this.ChangeFilingService.submitChangeFilingData(this.changeFilingObject).subscribe(
      (res) => {
        this.name = res["d"]["Decname"];
        this.no = res["d"]["Fbnumz"];
        this.optionActive = 6;
        // this.changeFilingObject["d"]["Operationz"] = "01";
        // this.changeFilingObject["d"]["StepNumber"] = "02";
        // this.changeFilingObject["d"]["Fbnumz"] = this.no;
        // console.log("this.changeFilingObject Final->", JSON.stringify(this.changeFilingObject));
        // this.ChangeFilingService.submitChangeFilingData(this.changeFilingObject).subscribe(
        //   (res) => {
        //     this.optionActive = 6;
        //   });
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );


  }

  onSubmit6() {

  }

  openSelectedCard(fbnum) {
    console.log(fbnum)
    this.cardData(fbnum);
  }


  // get data 
  getInitialData() {
    let lookup1 = {};
    let result1 = [];
    let lookup2 = {};
    let result2 = [];
    // this.filtData=this.historyList.d.ASSLISTSet.results;
    this.ChangeFilingService.changefilingHistorydata().subscribe(
      (res) => {
        this.historyList = res;
        this.filtData = this.historyList.d.ASSLISTSet.results.filter(data => {
          return data.Fbtyp == "TPCV"
        })
        // this.historyList.d.ASSLISTSet.results;
        for (var item, i = 0; item = this.historyList.d.REQTYPSet.results[i++];) {
          var txt = item.FbtText;
          if(txt!="" || txt!=null){
          if (!(txt in lookup1)) {
            lookup1[txt] = 1;
            result1.push(txt);
          }
        }
        }
        this.retypeData = result1;
        for (var item, i = 0; item = this.historyList.d.STATUSSet.results[i++];) {
          var txt = item.Txt30;
          if(txt!="" || txt!=null){
          if (!(txt in lookup2)) {
            lookup2[txt] = 1;
            result2.push(txt);
          }
        }
        }
        this.statusData = result2;
      })
  }

  getLandingData(fbnum) {
    // this.landingdata = { "d": { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/UI_HDRSet(Fbnumz='',PortalUsrz='',Langz='EN',Operationz='',Gpartz='3311656701',Euser='',UserTypz='',Fbguid='')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/UI_HDRSet(Fbnumz='',PortalUsrz='',Langz='EN',Operationz='',Gpartz='3311656701',Euser='',UserTypz='',Fbguid='')", "type": "ZDP_VAT_TPCV_SRV.UI_HDR" }, "Attchk": "Q", "CPersl": "18JA", "Fbnumz": "", "Iagrfg": "", "Reqfg": "", "StepNumber": "00", "Begda": null, "PortalUsrz": "", "Langz": "EN", "TransType": "CRE_TPCV", "Gpart": "", "Operationz": "", "Fbtyp": "", "StepNumberz": "00", "Fbust": "", "ReturnIdz": "005056B1365C1EDB81C17826457F22E8", "Officerz": "", "UserTyp": "", "Gpartz": "3311656701", "TransactionType": "", "EditFg": "", "Statusz": "", "Euser": "", "UserTypz": "", "Fbguid": "", "TxnTpz": "", "DmodeFlg": "", "Formprocz": "ZTAX_VAT_MAISC_PROC", "EvStatus": "", "OfficerTz": "", "SrcAppz": "", "Mandt": "", "FormGuid": "", "DataVersion": "00000", "ReturnId": "", "CureentF": "Monthly", "FilingF": "Quarterly", "Persl": "", "Decfg": "", "Decname": "", "Decdesignation": "", "Decdate": null, "DecidTy": "", "DecidNo": "", "EffDateSet": { "results": [] }, "UI_BTNSet": { "results": [] }, "NOTESSet": { "results": [] }, "ATTACHSet": { "results": [] }, "ATT_TYPSet": { "results": [] }, "QuesListSet": { "results": [] } } }
    // this.optionActive = 2;
    this.ChangeFilingService.changeFilingLandingData(fbnum).subscribe(
      (res) => {
        $('#changefilingterms').modal('show');
        this.landingdata = res;
        this.returnIdx = this.landingdata["d"]["ReturnIdz"];
        this.changeFilingObject = this.landingdata;
      }, (err) => {
        console.log(err);
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      })
  }

  cardData(fbnum) {
    this.historyCardData = this.filtData.filter(data => {
      return data.Fbnum == fbnum
    })
    console.log(this.historyCardData);
    this.optionActive = 7;
  }

  isPdf(fileName) {
    const parseExt = fileName.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    return fileExt.toLowerCase() === 'pdf';
  }

  getButtons() {
    // this.getapi2res = { "d": { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_HDRSet(Fbtypz='TPCV',UserTypz='',TransactionTypez='',Lang='',Gpart='',Status='')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_HDRSet(Fbtypz='TPCV',UserTypz='',TransactionTypez='',Lang='',Gpart='',Status='')", "type": "ZDP_TPCV_UH_SRV.UI_HDR" }, "Mandtz": "", "Fbtypz": "TPCV", "Fbustz": "E0001", "UserTypz": "", "TransactionTypez": "", "EditFgz": "X", "Mandt": "", "Fbnum": "", "PortalUsr": "", "Lang": "", "Operation": "", "StepNumber": "00", "Officer": "", "Gpart": "", "Status": "", "UserTyp": "TP", "TxnTp": "", "Formproc": "", "OfficerT": "", "SrcApp": "", "DestCheck": "", "UI_BTNSet": { "results": [{ "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "type": "ZDP_TPCV_UH_SRV.UI_BTN" }, "Mandt": "210", "Fbtyp": "TPCV", "Fbust": "E0001", "Button": "05", "TransactionType": "CRE_TPCV", "UserTyp": "" }, { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "type": "ZDP_TPCV_UH_SRV.UI_BTN" }, "Mandt": "210", "Fbtyp": "TPCV", "Fbust": "E0001", "Button": "06", "TransactionType": "CRE_TPCV", "UserTyp": "" }, { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "type": "ZDP_TPCV_UH_SRV.UI_BTN" }, "Mandt": "210", "Fbtyp": "TPCV", "Fbust": "E0001", "Button": "08", "TransactionType": "CRE_TPCV", "UserTyp": "" }, { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_BTNSet('TPCV')", "type": "ZDP_TPCV_UH_SRV.UI_BTN" }, "Mandt": "210", "Fbtyp": "TPCV", "Fbust": "E0001", "Button": "15", "TransactionType": "CRE_TPCV", "UserTyp": "" }] }, "EffDateSet": { "results": [{ "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/EffDateSet('21JA')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/EffDateSet('21JA')", "type": "ZDP_TPCV_UH_SRV.EffDate" }, "Mandt": "210", "Spras": "EN", "Persl": "21JA", "Txt50": "January 2021" }, { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/EffDateSet('21AP')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/EffDateSet('21AP')", "type": "ZDP_TPCV_UH_SRV.EffDate" }, "Mandt": "210", "Spras": "EN", "Persl": "21AP", "Txt50": "April 2021" }] }, "ATT_TYPSet": { "results": [{ "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/ATT_TYPSet('')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/ATT_TYPSet('')", "type": "ZDP_TPCV_UH_SRV.ATT_TYP" }, "Mandt": "", "Spras": "", "Fbtyp": "", "TxnTp": "", "DmsTp": "ZTPA", "StartDt": null, "EndDt": null, "Txt50": "Previous 2 Years Monthly Returns" }, { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/ATT_TYPSet('')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/ATT_TYPSet('')", "type": "ZDP_TPCV_UH_SRV.ATT_TYP" }, "Mandt": "", "Spras": "", "Fbtyp": "", "TxnTp": "", "DmsTp": "ZTPB", "StartDt": null, "EndDt": null, "Txt50": "Previous 12 Months Taxable Revenue" }, { "__metadata": { "id": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/ATT_TYPSet('')", "uri": "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/ATT_TYPSet('')", "type": "ZDP_TPCV_UH_SRV.ATT_TYP" }, "Mandt": "", "Spras": "", "Fbtyp": "", "TxnTp": "", "DmsTp": "ZTPC", "StartDt": null, "EndDt": null, "Txt50": "Other Documents" }] } } }
    this.ChangeFilingService.api2().subscribe(
      (res) => {
        this.getapi2res = res;
        for (let i = 0; i < this.getapi2res.d.ATT_TYPSet.results.length; i++) {
          this.getapi2res.d.ATT_TYPSet.results[i].stat = false;
          this.getapi2res.d.ATT_TYPSet.results[i].err = false;
        }
        console.log(res);
      },
      (err) => { }
    );

  }

  uploadFile(res, fileSize,actTy,Txt50,filename) {
    let obj = {
      name: res['d']['Filename'],
      size: fileSize,
      id: res['d']['Dotyp'],
      flag: true,
      url: res["d"]["DocUrl"],
      did: res["d"]["Doguid"],
      cardSelected: this.cardSelected,
      actTy:actTy,
      Txt50:Txt50,
      filename:filename
    };
    let control = <FormArray>this.changeFreFormGroup3.controls.doc;
    if(actTy=="ZTPA"){
      this.checkFileData.ZTPA.count++;
      this.checkFileData.ZTPA.name.push(filename);
      if(this.checkFileData.ZTPA.count==5){
        this.uploadFlag = false;
        this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].stat = true;
      }
    }else if(actTy=="ZTPB"){
      this.checkFileData.ZTPB.count++;
      this.checkFileData.ZTPB.name.push(filename);
      if(this.checkFileData.ZTPB.count==5){
        this.uploadFlag = false;
        this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].stat = true;
      }
    }else if(actTy=="ZTPC"){
      this.checkFileData.ZTPC.count++;
      this.checkFileData.ZTPC.name.push(filename);
      if(this.checkFileData.ZTPC.count==5){
        this.uploadFlag = false;
        this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].stat = true;
      }
    }
    
    document.getElementById("filingAttach")["value"] = "";
    control.push(this._formBuilder.group(obj));
  }

  uploadFiles(e) {
    console.log(document.getElementById("filingAttach")["value"]);
    let control = <FormArray>this.changeFreFormGroup3.controls.doc;
    const frmData = new FormData();
    let filename;
    let size;
    for (var i = 0; i < 1; i++) {
      filename = e[i]["name"];
      if(e[i].size==0 || e[i].size>5242880){
        this.notifierService.notify(
          "error",
          this.lang.sizetoobig
        );
        return 
      }
      if(this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].DmsTp=="ZTPA"){
         if(this.checkFileData.ZTPA.name.indexOf(filename)!=-1){
          this.notifierService.notify(
            "error",
            this.lang.fileAlreayExists
          );
          document.getElementById("filingAttach")["value"] = "";
          return
         }
      }
      if(this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].DmsTp=="ZTPB"){
        if(this.checkFileData.ZTPB.name.indexOf(filename)!=-1){
         this.notifierService.notify(
           "error",
           this.lang.fileAlreayExists
         );
         document.getElementById("filingAttach")["value"] = "";
         return
        }
     }
     if(this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].DmsTp=="ZTPC"){
      if(this.checkFileData.ZTPC.name.indexOf(filename)!=-1){
       this.notifierService.notify(
         "error",
         this.lang.fileAlreayExists
       );
       document.getElementById("filingAttach")["value"] = "";
       return
      }
    } 
      const parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();
      console.log(fileExt);
      if (
        fileExt !== "doc" &&
        fileExt !== "docx" &&
        fileExt !== "jpeg" &&
        fileExt !== "jpg" &&
        fileExt !== "pdf" &&
        fileExt !== "xls" &&
        fileExt !== "xlsx"
      ) {
        this.notifierService.notify("error", this.lang.invalidFormat);
        return false;
      }

      // filename = e[i]['name'];
      size = e[i].size / 1024;
      frmData.append("fileUpload", e[i]);
    }
    console.log("res", filename, e[i]);
    console.log(control);
    this.ChangeFilingService
      .attachmentSubmit(
        this.returnIdx,
        this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].DmsTp,
        filename,
        frmData
      )
      .subscribe(
        (res) => {
          console.log("upload", res);
          this.uploadFile(res, size,this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].DmsTp,this.getapi2res.d.ATT_TYPSet.results[this.cardSelected].Txt50,filename);
          this.filesSubmitted = !this.getCheck() ? false : true; 
          this.validateFilesToUpload();
        },
        (err) => {
          console.log(err);
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
          this.filesSubmitted = !this.getCheck() ? false : true;
          this.validateFilesToUpload();
        }
      );

  }

deleteAttachmentFromSer(dotyp, doguid, index) {
    let item = this.changeFreFormGroup3.controls.doc.value[index].cardSelected;
    let actTy= this.changeFreFormGroup3.controls.doc.value[index].actTy;
    let filename=this.changeFreFormGroup3.controls.doc.value[index].filename;
    this.ChangeFilingService.deleteDoc(dotyp, doguid).subscribe((res) => {
      console.log("delete", res);
      let control = <FormArray>this.changeFreFormGroup3.controls.doc;
      if(actTy=="ZTPA"){
        this.checkFileData.ZTPA.count--;
        let Nameindex=this.checkFileData.ZTPA.name.indexOf(filename);
        this.checkFileData.ZTPA.name.splice(Nameindex,1);
      }
      if(actTy=="ZTPB"){
        this.checkFileData.ZTPB.count--;
        let Nameindex=this.checkFileData.ZTPB.name.indexOf(filename);
        this.checkFileData.ZTPB.name.splice(Nameindex,1);
      }
      if(actTy=="ZTPC"){
        this.checkFileData.ZTPC.count--;
        let Nameindex=this.checkFileData.ZTPC.name.indexOf(filename);
        this.checkFileData.ZTPC.name.splice(Nameindex,1);
      }
      this.uploadFlag = true;
      this.getapi2res.d.ATT_TYPSet.results[item].stat = false;
      control.removeAt(index);
      this.filesSubmitted = !this.getCheck() ? false : true;
      this.validateFilesToUpload();
    }, (err) => {
      console.log("err in delete attachement");
      this.filesSubmitted = !this.getCheck() ? false : true;
      this.validateFilesToUpload();
    });
  }

  // edit functionality
  editFrequencyDetails() {
    this.optionActive = 2

  }
  editAttachments() {
    this.optionActive = 3
  }
  editDecleration() {
    this.optionActive = 4
  }
  back() {
    this.cardSelected = -1;
    if (this.optionActive == 7) {
      this.optionActive = 1;
    } else if(this.optionActive == 1){
      this.backTo('001')
    }else {
      if ((this.changeFilingObject['d']['FilingF'] =="Monthly" || this.changeFilingObject['d']['FilingF'] =="شهرية")  && (this.changeFilingObject['d']['CureentF'] == "ربع سنوية" || this.changeFilingObject['d']['CureentF'] =="Quarterly" )) {
      // if ((this.changeFilingObject['d']['CureentF'] !="Monthly" || this.changeFilingObject['d']['CureentF'] !="شهرية")  && (this.changeFilingObject['d']['FilingF'] != "ربع سنوية" || this.changeFilingObject['d']['FilingF'] !="Quarterly" )) {
        if(this.optionActive ==4){
          this.optionActive = 2;
        }else{
          if (this.optionActive == 1){
            this.backTo('001')
          } else{
            this.optionActive--;
          }
        }
        
      }else{
        if (this.optionActive == 1){
          this.backTo('001')
        } else{
          this.optionActive--;
        }
      }
      
    }

  }
  // Form one handlers
  tableView() {
    this.viewSel = "tableview";
    this.img2 = "assets/image/cards-gray.svg";
    this.img1 = "assets/image/table.svg"
  }

  listview() {
    this.viewSel = "listview"
    this.img1 = "assets/image/table-gray.svg"
    this.img2 = "assets/image/cards.svg"
  }

  typeDocHandler(item: any, i: number) {
    // if(!this.attachrequired){
    //   return;
    // }else{
      if (this.getapi2res.d.ATT_TYPSet.results[i].stat) {
        this.uploadFlag = false
      } else {
        this.uploadFlag = true
      }
      if (item && item.DmsTp === 'ZTPC') {
        this.filesSubmitted = false;
        this.getapi2res.d.ATT_TYPSet.results.map((r) => r.err = false);
      }
      this.cardSelected = i;
      this.typeDocText = this.getapi2res.d.ATT_TYPSet.results[i].Txt50;
      // this.filesSubmitted = this.getCheck();
  }

  downloadCnf(no) {

    window.open(this.baseUrl + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='" + no + "')/$value", '_self');

  }


  getseleffDate(arg) {
    this.selEffDate = arg;
  }

  // onIdSelect() {
  //   if (this.changeFreFormGroup4.controls["DecidTy"].value != "ZS0003") {
  //     $("#aftSelect").modal("show");
  //   }
  // }

  getIDtype() {
    if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0001") {
      return this.lang.NationalID;
    } else if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0002") {
      return this.lang.IqamaID;
    } else {
      return this.lang.GCCID;
    }
  }

  // valiateNameinput(event){
  //   var regex = new RegExp("[a-zA-Z\ ]+$");
  //   var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  //       if (!regex.test(key)) {
  //         event.preventDefault();
  //         return false;
  //       }
  // }

  onIdinputChange(){
    this.IDtypeValidation1(this.id1);
    // if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0002" && this.id1[0]!=2) {
    //   this.idErr1 = true;
    //   this.idMsg = "Enter a valid Iqama ID";
    // }else{
    //   this.idErr1 = false;
    //   this.idMsg = "";
    // }
  }

  onIdNumChange() {
    // if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0002" && this.changeFreFormGroup4.controls.DecidNo.value[0]!=2) {
    //   this.showIdNumError = true;
    //   this.isIdValidated = false;
    // }
    if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0003" && (this.changeFreFormGroup4.controls.DecidNo.value.length < 8 || this.changeFreFormGroup4.controls.DecidNo.value.length > 15)) {
      this.showIdNumError = true;
      this.isIdValidated = false;
    }
    else {
      this.showIdNumError = false;
      this.isIdValidated = true;
    }
    // if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0003" && (this.changeFreFormGroup4.controls.DecidNo.value.length < 7 || this.changeFreFormGroup4.controls.DecidNo.value.length > 15)) {
    //   this.showIdNumError = true;
    //   this.isIdValidated = false;
    // }
    // else {
    //   this.showIdNumError = false;
    //   this.isIdValidated = true;
    // }

  }

  // onNameFileldChange(){
  //   console.log(this.changeFreFormGroup4.controls.Decname);
  //   if(this.changeFreFormGroup4.controls.Decname.status=="VALID"){
  //     this.nameError=false;
  //   }else{
  //     this.nameError=true;
  //   }

  // }

  onIdSelect() {
    this.isIdValidated = false;
    this.changeFreFormGroup4.controls.DecidNo.setValue("");
    this.changeFreFormGroup4.controls.Decname.setValue("");
    this.dob1 = undefined;
    this.id1 = "";
    if (this.changeFreFormGroup4.controls["DecidTy"].value != "ZS0003") {
      $("#aftSelect").modal("show");
    }
    // this.isIdValidated = false;
    // this.changeFreFormGroup4.controls.DecidNo.setValue("");
    // this.dob1 = undefined;
    // this.id1 = undefined;
    // if (this.changeFreFormGroup4.controls.DecidTy.value != "ZS0003") {
    //   $("#aftSelect").modal("show");

    // }
  }

  onDateChange(datePicker: any): void {
    if (!this.dob1) {
      this.dobErr = true;
    } else {
      this.dobErr = false;
    }
    datePicker.close();
  }

  validateID2() {
    let d;
    let currentdate;
    if ((this.dob1 === undefined || this.changeFreFormGroup4.controls.DecidTy.value != "ZS0003") && this.id1 == "") {
      this.idErr1 = true;
      this.idMsg =this.lang.pleaseenterID;
      this.dobErr = true;
      this.dobMsg = this.lang.pleaseenterdob;
      return;
    };
    if (this.id1 == "") {      
      this.idErr1 = true;
      // this.idMsg = this.vatErr.e5;
      this.idMsg =this.lang.pleaseenterID;
    } else if (this.dob1 === undefined && this.changeFreFormGroup4.controls.DecidTy.value != "ZS0003") {
      this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;
      this.dobMsg = this.lang.pleaseenterdob;
    } else {
      this.dobErr = false;
      if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0001" || this.changeFreFormGroup4.controls.DecidTy.value == "ZS0002") {
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
        type: this.changeFreFormGroup4.value.DecidTy,
        idNumber: this.id1,
      };
      if (!this.idErr1) {

        console.log(currentdate);
        this.ChangeFilingService.validationService(obj, currentdate).subscribe(
          (res) => {
            // this.tinErr = false;
            console.log("res", res);
            // this.iddErr = false;
            this.changeFreFormGroup4.controls["DecidNo"].setValue(
              res["d"]["Idnum"]
            );


            if (res['d']['FullName']!="") {

              this.changeFreFormGroup4.controls["Decname"].setValue(
                res["d"]["FullName"]
              );
            }else{
              this.changeFreFormGroup4.controls["Decname"].setValue(
                res["d"]["Name1"] + " " + res["d"]["Name2"]
              );

            }

            $("#aftSelect").modal("hide");

            //this.vatFormThirdGroup.get("Decname").disable();
            // this.notifierService.notify("success", this.lang.ValidIDNumber);
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
      this.changeFreFormGroup4.value.DecidTy,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }
  reset() {
    this.idErr1 = false;
    this.dobErr = false;
    this.instructionsSubmitted = false;
    this.changeFreFormGroup4.controls.DecidTy.setValue("");
    this.changeFreFormGroup4.controls.DecidNo.setValue("");
    this.changeFreFormGroup4.controls.Decname.setValue("");
    this.filesSubmitted = false;
  }
monthname(mon){
  let monthNamefull;
  switch(mon){
    case 0:
      monthNamefull=this.langSingle=="A"?"يناير": "January"
    break;
    case 1:
      monthNamefull=this.langSingle=="A"?"فبراير": "February"
    break;
    case 2:
      monthNamefull=this.langSingle=="A"?"مارس": "March"
    break;
    case 3:
      monthNamefull=this.langSingle=="A"?"ابريل": "April"
    break;
    case 4:
      monthNamefull=this.langSingle=="A"?"مايو": "May"
    break;
    case 5:
      monthNamefull=this.langSingle=="A"?"يونيو": "June"
    break;
    case 6:
      monthNamefull=this.langSingle=="A"?"يوليو": "July"
    break;
    case 7:
      monthNamefull=this.langSingle=="A"?"أغسطس": "August"
    break;
    case 8:
      monthNamefull=this.langSingle=="A"?"سبتمبر": "September"
    break;
    case 9:
      monthNamefull=this.langSingle=="A"?"أكتوبر": "October"
    break;
    case 10:
      monthNamefull=this.langSingle=="A"?"نوفمبر": "November"
    break;
    case 11:
      monthNamefull=this.langSingle=="A"?"ديسمبر": "December"
    break;
  }
  return monthNamefull;
}

getfulldate(dat){
  if(dat==1 || dat==21 || dat==31){
    return dat+"st"
  }else if(dat==2 || dat==22){
    return dat+"nd";
  }else if(dat==3){
    return dat+"rd";
  }else{
    return dat+"th";
  }
}


  getDatefn() {
    let dateval=this.getfulldate(new Date().getDate());
    let monthval=this.monthname(new Date().getMonth());
    let yearval= new Date().getFullYear();

    return dateval +" "+monthval+" "+yearval;
  }

  statusColor(status) {
    // console.log(status)
    let yellow = ["E0061", "E0052", "E0044", "E0041", "E0016", "E0015"]
    let red = ["E0051", "E0043"]
    let green = ["E0045"]
    let grey = ["E0018", "E0013"]

    if (yellow.findIndex(each => status == each) != -1) {
      return "tag-partial";
    }


    else if (red.findIndex(each => status == each) != -1) {
      return "tag-danger";
    }


    else if (green.findIndex(each => status == each) != -1) {
      return "tag-success";
    }


    else if (grey.findIndex(each => status == each) != -1) {
      return "tag-unsubmit";
    }

    else {
      return "tag32 tag-unsubmit"
    }


  }
  getMonthly(arg){
    if(this.langSingle=="x"){
      if(arg=="شهرية"){
        return "شهرية"
      }else{
        return ""
      }
    }else{
      if(arg=="Monthly"){
        return "Monthly"
      }else{
        return "";
      }
    }
    
   
  }
  getquarterly(arg){
    if(this.langSingle=="A"){
      if(arg=="ربع سنوية"){
        return "ربع سنوية"
      }else{
        return ""
      }
    }else{
      if(arg=="Quarterly"){
        return "Quarterly"
      }else{
        return ""
      }
    }
  }
  
  getCheck() {
    if ((this.changeFilingObject['d']['CureentF'] =="Monthly" || this.changeFilingObject['d']['CureentF'] =="شهرية")  && (this.changeFilingObject['d']['FilingF'] == "ربع سنوية" || this.changeFilingObject['d']['FilingF'] =="Quarterly" )) {
      // if (this.getapi2res.d.ATT_TYPSet.results[0].stat == true && this.getapi2res.d.ATT_TYPSet.results[1].stat == true) {
      if(this.checkFileData.ZTPA.count>0 && this.checkFileData.ZTPB.count>0){
      return false;
      } else {
        return true
      }
    } else {
      return false
    }
    //    this.changeFreFormGroup3.get('doc')['controls'].length==0){

    // }
  }
  // instruction

  closeModal(arg) {
    if (arg === "cnf" && !this.instructionsAccepted) {
      this.instructionsSubmitted = true;
      return;
    }
    $('#changefilingterms').modal('toggle');
    if (arg == "cnf" && this.instructionsAccepted) {
      this.optionActive = 2;
      this.instructionsSubmitted = false;
    }
  }
  onFilterClick() {
    $('#myModal').modal('show');
  }

  changeType(i) {
    if (this.chipSelected === i)
      this.chipSelected = -1;
    else
      this.chipSelected = i;
    this.typeFilter = this.retypeData[i]
  }

  changestatus(i) {
    if (this.StchipSelected === i)
      this.StchipSelected = -1;
    else
      this.StchipSelected = i;
    this.statusFilter = this.statusData[i]
  }

  closepopup(arg) {
    $('#myModal').modal('toggle');
  }

  filterList() {
    console.log(this.typeFilter, this.statusFilter)
    this.filtData = "";
    $('#myModal').modal('toggle');
    if (this.typeFilter && this.typeFilter != "") {
      this.filtData = this.historyList.d.ASSLISTSet.results.filter(data => {
        return data.FbtText == this.typeFilter
      })
    } else {
      this.filtData = this.historyList.d.ASSLISTSet.results;
    }
    if (this.statusFilter != "" || this.statusFilter != "All") {
      this.filtData = this.filtData.filter(data => {
        return data.FbustTxt == this.statusFilter
      })
    }
    console.log(this.filtData);
  }
  resetFil() {
    $('#myModal').modal('toggle');
    this.typeFilter = "";
    this.statusFilter = "";
    this.chipSelected = -1;
    this.StchipSelected = -1;
    this.retypeData[0]
    this.statusData[0]
    this.filtData = this.historyList.d.ASSLISTSet.results.filter(data => {
      return data.Fbtyp == "TPCV"
    })
    // this.historyList.d.ASSLISTSet.results;
  }

  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.changeFreFormGroup4.controls.Decname.setValue(name);
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
}
}


