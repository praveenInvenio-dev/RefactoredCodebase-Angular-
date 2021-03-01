import { Component, OnInit, Host, ViewChild, ElementRef } from '@angular/core';
import { ReturnsService } from '../returns.service';
import { VatServiceService } from 'src/app/services/vat-service.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as FileSaver from "file-saver";
import { NotifierService } from 'angular-notifier';
import { excisetaxconstants } from "src/app/returns/excise-tax/excise-taxconstants.model";
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

declare var jQuery;
declare var $:any;


@Component({
  selector: 'app-excise-tax',
  templateUrl: './excise-tax.component.html',
  styleUrls: ['./excise-tax.component.css']
})
export class ExciseTaxComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;
  ErrorFile: boolean = false;
  tilesView: boolean = true;
  ExciseDetailsScreen: boolean = false;
  step: number = 1;
  disableInputs: boolean = false;
  exciseTaxsList: any = [];
  excisetaxObject: any;
  ExciseDetailsObj: any;
  taxPayerDetails: any;
  StatusesSet: any = [];
  WareHousesset: any = [];
  AddressSet: any = [];
  fromdate: any = '';
  todate: any = '';
  today: any = new Date();
  status: string = '';
  exciseTaxsListDuplicte: any = [];
  searchText: any;
  ExciseTaxForm: FormGroup;
  ItemsSet: any = [];
  ratesSet: any = [];
  GrandTotalOfRSPValue: number;
  ItemsSetDuplicate: any[] = [];
  lang: any;
  disableButtons: boolean = false;
  direction: string;
  Fbguid: string = "";
  RetrunObjStatus: string = "";
  ReturnObjStatusTxt: string = "";
  language: any;
  activeFormat: any;
  voidReturn: boolean = false;
  attachmentError:boolean = false;
  errorMessage:any;
  fileSizeError: boolean = false;
  Acknowledgementurl:any;
  Formurl:any
  constructor(
    private returnsService: ReturnsService, private vatService: VatServiceService, private fb: FormBuilder, public notifierService: NotifierService, private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip('hide');
    // //For Tab Active    
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab", JSON.stringify("ضريبة السلع الانتقائية"));
    // } else {
    //   localStorage.setItem("ActiveTab", JSON.stringify("Excise Tax"));
    // }
    // //For Tab Active end
    setTimeout(() => {

      if (localStorage.getItem("lang") === "ar") {
        this.lang = excisetaxconstants.langz.arb.newReturnsET;
        this.direction = excisetaxconstants.langz.arb.dir;
      } else {
        this.lang = excisetaxconstants.langz.eng.newReturnsET;
        this.direction = excisetaxconstants.langz.eng.dir;
      }
      this.returnsService.ViewSubject.subscribe((data: boolean) => {
        this.tilesView = data;
      });
      this.language = localStorage.getItem("lang");
      if (this.language == 'ar') {
        moment.locale('ar-Sa');
      }
      else {
        moment.locale('en-Us');

      }


      //this.GetUserDetails();
      this.activatedRoute.params.subscribe((params) => {
        console.log("params", params);
        this.Fbguid = params["Fbguid"] || "";
        this.RetrunObjStatus = params["Status"];
        if (this.RetrunObjStatus == "E0055") {
          if (this.language == 'ar') {
            this.ReturnObjStatusTxt = "تم تقديمه";
          }
          else {

            this.ReturnObjStatusTxt = "Submitted";
          }
        }
        else if (this.RetrunObjStatus == "E0045") {
          if (this.language == 'ar') {
            this.ReturnObjStatusTxt = "فاتورة";
          }
          else {
            this.ReturnObjStatusTxt = "Billed";
          }
        }
        else if (this.RetrunObjStatus == "E0006") {
          if (this.language == 'ar') {
            this.ReturnObjStatusTxt = "معدل";
          }
          else {
            this.ReturnObjStatusTxt = "Amended";
          }
        }
        if (this.Fbguid) {
          this.GetUserDetails();
        }
      });
    }, 500);
  }
  GetUserDetails() {
    this.vatService.getVatData().subscribe(
      (res) => {
        console.log("resdata", res["d"]);
        this.excisetaxObject = res;
        //this.getExciseTaxs();
        this.getExciseTaxDetails({ "Status": this.RetrunObjStatus, "Euser": "0000000000000000000000" + this.excisetaxObject["d"]["Gpartz"], "Fbguid": this.Fbguid, "Gpart": this.excisetaxObject["d"]["Gpartz"] });
      },
    );
  }
  getExciseTaxs() {
    console.log(this.excisetaxObject["d"]["Gpartz"], this.excisetaxObject["d"]["Euser"]);
    this.returnsService.getExciseTaxs(this.excisetaxObject["d"]["Gpartz"], this.excisetaxObject["d"]["Euser"]).subscribe((data) => {
      this.exciseTaxsListDuplicte = data["d"]["ICR_LISTSet"]["results"] || [];
      this.exciseTaxsList = data["d"]["ICR_LISTSet"]["results"] || [];
      this.StatusesSet = data["d"]["ICR_STATUSSet"]["results"] || [];
      console.log(this.StatusesSet);

      // let selectedET=this.exciseTaxsList.filter((etReturn)=>{
      //   console.log("vatReturn",etReturn,etReturn.Fbguid==this.Fbguid)
      //   if(etReturn.Fbguid==this.Fbguid){
      //     return true;
      //   }

      // });

      // console.log("selectedET",selectedET);
      // if(selectedET.length>0){
      //   this.getExciseTaxDetails(selectedET[0]);
      // }
    })
  }
  FilterVats() {
    var startDate = moment(this.fromdate, "YYYY-MM-DD");
    var endDate = moment(this.todate, "YYYY-MM-DD");
    if (this.status != 'All') {
      this.exciseTaxsList = this.exciseTaxsListDuplicte.filter((data) => {
        console.log(data);
        var fileddate = moment(moment(data["Txt50"], 'DD/MM/YYYY'), 'YYYY-MM-DD');
        if ((this.fromdate.toString() != '') && (this.todate.toString() != '')) {
          return (data["StatusTxt"].toString().toLowerCase() == this.status.toLowerCase()) && (fileddate.diff(startDate, 'days') > 0) && (endDate.diff(fileddate, 'days') > 0)
        }
        else if (this.status == '') {
          return (fileddate.diff(startDate, 'days') > 0) && (endDate.diff(fileddate, 'days') > 0)
        }
        else {
          return data["StatusTxt"].toString().toLowerCase() == this.status.toLowerCase()
        }
      })
    }

    else {
      this.exciseTaxsList = this.exciseTaxsListDuplicte;
    }
    this.fromdate = '';
    this.todate = '';
    this.status = '';


  }
  getTaxpayerDetails(excisetaxobj) {
    console.log(excisetaxobj);
    this.returnsService.getExciseTaxDetails(excisetaxobj["Euser"], excisetaxobj["Fbguid"]).subscribe((data) => {
      console.log("Taxpayers", data);
      this.ExciseDetailsObj = data['d'];
      this.taxPayerDetails = data['d'];
      console.log("this.taxPayerDetails", this.taxPayerDetails);
      this.WareHousesset = data['d']["WD_TRTYPSet"]["results"] || [];//this.ExciseDetailsObj["WD_TRTYPSet"]["results"] || [];
      this.AddressSet = data['d']["ER_ADDSet"]["results"]['0'] || [];//this.ExciseDetailsObj["ER_ADDSet"]["results"]['0'] || [];
      this.ItemsSet = this.ExciseDetailsObj["ET_ITEMSet"]["results"] || [];
      let itemsSet = data['d']["ET_ITEMSet"]["results"] || [];//this.ItemsSet;
      this.ratesSet = data['d']["RATESSet"]['results'] || [];//this.ExciseDetailsObj["RATESSet"]['results'] || [];

      console.log(this.ratesSet);
      console.log(itemsSet.length);
      this.ItemsSetDuplicate = [];
      for (let i = 0; i < itemsSet.length; i++) {
        this.ItemsSetDuplicate.push({});
        this.ItemsSetDuplicate[this.ItemsSetDuplicate.length - 1]["Whfnm"] = itemsSet[i]["Whfnm"];
        this.ItemsSetDuplicate[this.ItemsSetDuplicate.length - 1]["Items"] = [];
        this.ItemsSetDuplicate[this.ItemsSetDuplicate.length - 1].Items.push(itemsSet[i]);
        itemsSet.splice(i, 1);
        for (let j = 0; j < itemsSet.length; j++) {
          if (this.ItemsSetDuplicate[this.ItemsSetDuplicate.length - 1]["Whfnm"] == itemsSet[j]["Whfnm"]) {
            this.ItemsSetDuplicate[this.ItemsSetDuplicate.length - 1]["Items"].push(itemsSet[j]);
            itemsSet.splice(j, 1);
            j--;

          }
        }
        i--;
      }
      this.taxPayerDetails["Decdt"] = this.today;
      this.taxPayerDetails["ET_ITEMSet"] = [];
      for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
        for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {
          this.ItemsSetDuplicate[j]["Items"][k]["RSPError"] = false;
          this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"] = false;
          this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"] = false;

          this.taxPayerDetails["ET_ITEMSet"].push(this.ItemsSetDuplicate[j]["Items"][k]);
        }
      }
      this.CalculateFinalETValues(0);
    })

    this.disableButtons = false;
  }
  getExciseTaxDetails(excisetaxobj) {
    this.getTaxpayerDetails(excisetaxobj);
    this.ExciseDetailsScreen = true;
    this.step = 1;
    window.scrollTo(0, 0)
    this.disableInputs = false;
    this.voidReturn = false;
    if (excisetaxobj["Status"] == "E0045" || excisetaxobj["Status"] == "E0055" || excisetaxobj["Status"] == "E0006") {
      this.step = 7;
      this.disableInputs = true;
      console.log(this.disableInputs);
    }
  }
  getExciseReturnDetails(excisetaxobj, Formproc) {
    this.returnsService.getExciseReturnDetails(excisetaxobj["Fbnum"], excisetaxobj["Gpart"], excisetaxobj["Status"], Formproc).subscribe((data) => {
      console.log('Returns', data);
    })
  }
  CalculateETTAXOnGoods(rspValue, indexofParent, GoodsTy, indexOfChild) {

    rspValue = rspValue.toString().split('.')[1] == undefined ? rspValue + ".00" : rspValue;
    rspValue = parseFloat(rspValue).toFixed(2);
    if (rspValue < 0 || rspValue > 999999999999.99) {
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["RSPError"] = true;
      console.log(this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["RSPError"]);
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["Rsptot"] = parseFloat("0").toFixed(2);
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["Ettax"] = parseFloat("0").toFixed(2)
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["RSPError"] = false;
      this.ValidateForms();
      this.CalculateFinalETValues(indexofParent);
    }
    else {
      console.log(GoodsTy)
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["RSPError"] = false;
      this.ValidateForms();
      let rateValue = this.ratesSet.filter((data) => {
        if (data["GoodsNo"] == GoodsTy.toString()) {
          return +(data["Rates"])
        }
      })
      console.log(rateValue)
      rateValue = +(rateValue[0]["Rates"])
      console.log(rateValue)
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["Rsptot"] = parseFloat(rspValue).toFixed(2);
      this.ItemsSetDuplicate[indexofParent]["Items"][indexOfChild]["Ettax"] = parseFloat(((((rspValue / (100 + rateValue)) * 100) * rateValue) / 100).toString()).toFixed(2);
      this.CalculateFinalETValues(indexofParent);
      // this.SubTotalCalculation(indexofParent);
    }

  }
  InputDeductionValidation(deduAmount, indexparent, indexchild) {

    deduAmount = deduAmount.toString().split('.')[1] == undefined ? deduAmount + ".00" : deduAmount;
    deduAmount = parseFloat(deduAmount).toFixed(2);
    // alert(deduAmount);
    if (deduAmount < 0 || deduAmount > 999999999999.99)
    // if(deduAmount.toString().split('.')[0].length<=0 || deduAmount.toString().split('.')[0].length>=13)
    {
      this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["EtdedError"] = true;


      this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["Etded"] = "0.00";
      this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["EtdedError"] = false;
      this.ValidateForms();
      this.CalculateFinalETValues(indexparent);
    }
    else {
      console.log(deduAmount, indexparent);
      this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["EtdedError"] = false;
      this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["Etded"] = deduAmount;
      console.log(this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["Etded"]);
      if ((+this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["Ettax"]) < (deduAmount)) {
        this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["EtdedAmountError"] = true;

        //commented by hema as per GQA issue SCRD-2970 starts
        // this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["Etded"]="0.00";
        // this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["EtdedAmountError"]=false;
        //commented by hema as per GQA issue SCRD-2970 ends
        this.ValidateForms();
      }
      else {
        this.ItemsSetDuplicate[indexparent]["Items"][indexchild]["EtdedAmountError"] = false;
        this.ValidateForms();
      }

      this.CalculateFinalETValues(indexparent);
    }


  }
  CalculateFinalETValues(indexparent) {

    this.GrandTotalOfRSPValue = 0.00;
    this.taxPayerDetails.Ettax = 0.00;
    this.taxPayerDetails.Etded = 0.00;
    // for(let i=0;i<this.ItemsSet.length;i++)
    // {
    //   this.GrandTotalOfRSPValue=this.GrandTotalOfRSPValue+(+this.ItemsSet[i]["Rsptot"]);
    //   this.taxPayerDetails.Ettax=this.taxPayerDetails.Ettax+(+this.ItemsSet[i]["Ettax"]);
    //   this.taxPayerDetails.Etded=this.taxPayerDetails.Etded+(+this.ItemsSet[i]["Etded"]);
    // }
    for (let i = 0; i < this.ItemsSetDuplicate.length; i++) {
      for (let j = 0; j < this.ItemsSetDuplicate[i]["Items"].length; j++) {
        this.GrandTotalOfRSPValue = this.GrandTotalOfRSPValue + (+this.ItemsSetDuplicate[i]["Items"][j]["Rsptot"]);
        this.taxPayerDetails.Ettax = this.taxPayerDetails.Ettax + (+this.ItemsSetDuplicate[i]["Items"][j]["Ettax"]);
        this.taxPayerDetails.Etded = this.taxPayerDetails.Etded + (+this.ItemsSetDuplicate[i]["Items"][j]["Etded"]);
      }
    }
    this.taxPayerDetails.Etnet = this.taxPayerDetails.Ettax - this.taxPayerDetails.Etded;
    this.LateFilingPenalityCalculation();
    this.SubTotalCalculation(indexparent);
    // this.ValidateForms()

  }
  LateFilingPenalityCalculation() {
    console.log(this.taxPayerDetails);
    this.returnsService.getExciseTaxPenalityCalculation(this.taxPayerDetails["Fbnum"], this.taxPayerDetails["Etnet"], this.taxPayerDetails["Persl"], this.taxPayerDetails["Gpart"], this.taxPayerDetails["SrcAppz"]).subscribe((data) => {
      this.taxPayerDetails["Etlfp"] = data["d"]["Lfp"];
      this.taxPayerDetails["Etlpp"] = data["d"]["Lpp"];
      this.taxPayerDetails.Etadv = (((+this.taxPayerDetails.Etnet) + (+this.taxPayerDetails.Etlfp) + (+this.taxPayerDetails.Etlpp) + (-this.taxPayerDetails.Appcr)));
      this.taxPayerDetails.Etpay = this.taxPayerDetails.Etadv;
    },
      (err) => {
        this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"])
      });
  }
  ZeroRatedmodal(event) {
    if (event.target.checked) {
      jQuery("#zeroRated").modal('show')
    }
    else {
      this.taxPayerDetails["Zeroretfg"] = "";
      // event.target.checked = false;
      // this.taxPayerDetails["Zeroretfg"] = false;
    }
  }
  ZeroChange() {
    this.taxPayerDetails["Zeroretfg"] = "X";
    for (let i = 0; i < this.ItemsSetDuplicate.length; i++) {
      for (let j = 0; j < this.ItemsSetDuplicate[i]["Items"].length; j++) {
        this.ItemsSetDuplicate[i]["Items"][j]["Rspsubtot"] = 0.00;
        this.ItemsSetDuplicate[i]["Items"][j]["Ettaxsub"] = 0.00;
        this.ItemsSetDuplicate[i]["Items"][j]["Etdedsub"] = 0.00;
        this.ItemsSetDuplicate[i]["Items"][j]["Rsptot"] = 0.00;
        this.ItemsSetDuplicate[i]["Items"][j]["Ettax"] = 0.00;
        this.ItemsSetDuplicate[i]["Items"][j]["Etded"] = 0.00;
      }
    }
    this.CalculateFinalETValues(0);
  }
  SubTotalCalculation(indexofParent) {
    this.ItemsSetDuplicate[indexofParent]["Items"][0]["Rspsubtot"] = 0.00;
    this.ItemsSetDuplicate[indexofParent]["Items"][0]["Ettaxsub"] = 0.00;
    this.ItemsSetDuplicate[indexofParent]["Items"][0]["Etdedsub"] = 0.00;
    for (let i = 0; i < this.ItemsSetDuplicate[indexofParent]["Items"].length; i++) {
      this.ItemsSetDuplicate[indexofParent]["Items"][0]["Rspsubtot"] = this.ItemsSetDuplicate[indexofParent]["Items"][0]["Rspsubtot"] + (+this.ItemsSetDuplicate[indexofParent]["Items"][i]["Rsptot"]);
      this.ItemsSetDuplicate[indexofParent]["Items"][0]["Ettaxsub"] = this.ItemsSetDuplicate[indexofParent]["Items"][0]["Ettaxsub"] + (+this.ItemsSetDuplicate[indexofParent]["Items"][i]["Ettax"]);
      this.ItemsSetDuplicate[indexofParent]["Items"][0]["Etdedsub"] = this.ItemsSetDuplicate[indexofParent]["Items"][0]["Etdedsub"] + (+this.ItemsSetDuplicate[indexofParent]["Items"][i]["Etded"])
    }
  }
  ValidateForms() {

    let count = 0;
    for (let i = 0; i < this.ItemsSetDuplicate.length; i++) {
      for (let j = 0; j < this.ItemsSetDuplicate[i]["Items"].length; j++) {
        console.log("Rsp", this.ItemsSetDuplicate[i]["Items"][j]["RSPError"]);
        if (this.ItemsSetDuplicate[i]["Items"][j]["RSPError"] == true || this.ItemsSetDuplicate[i]["Items"][j]["EtdedError"] == true || this.ItemsSetDuplicate[i]["Items"][j]["EtdedAmountError"] == true) {
          count++
        }
      }
    }
    if (count > 0) {
      this.disableButtons = true;
    }
    else {
      this.disableButtons = false;
    }
  }
  SubmitET() {

    this.taxPayerDetails["ET_ITEMSet"] = [];
    console.log(this.taxPayerDetails["ET_ITEMSet"].length)
    let count = 0;
    for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
      for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {

        if (this.ItemsSetDuplicate[j]["Items"][k]["RSPError"] == true || this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"] == true || this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"] == true) {
          count++;
        }

      }
    }
    if (count == 0) {
      for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
        for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {
          delete this.ItemsSetDuplicate[j]["Items"][k]["RSPError"]
          delete this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"]
          delete this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"]
          this.ItemsSetDuplicate[j]["Items"][k]["Etdedsub"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Etdedsub"].toString()).toFixed(2);
          this.ItemsSetDuplicate[j]["Items"][k]["Ettax"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Ettax"].toString()).toFixed(2);
          this.ItemsSetDuplicate[j]["Items"][k]["Ettaxsub"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Ettaxsub"].toString()).toFixed(2);
          this.ItemsSetDuplicate[j]["Items"][k]["Rspsubtot"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Rspsubtot"].toString()).toFixed(2);
          this.taxPayerDetails["ET_ITEMSet"].push(this.ItemsSetDuplicate[j]["Items"][k]);
        }
      }
      this.taxPayerDetails["ET_ITEMSet"] = this.taxPayerDetails["ET_ITEMSet"];//{"results":this.taxPayerDetails["ET_ITEMSet"]};
      this.taxPayerDetails["Operationz"] = "01";
      this.taxPayerDetails["Decfg"] = "X";
      this.taxPayerDetails["Decdt"] = "\/Date(" + new Date().getTime() + ")\/";//"\/Date(1494892800000)\/";//new Date().toLocaleDateString();
      console.log("this.taxPayerDetails", this.taxPayerDetails);
      this.taxPayerDetails["Etadv"] = parseFloat(this.taxPayerDetails["Etadv"].toString()).toFixed(2);
      this.taxPayerDetails["Etded"] = parseFloat(this.taxPayerDetails["Etded"].toString()).toFixed(2);
      this.taxPayerDetails["Etnet"] = parseFloat(this.taxPayerDetails["Etnet"].toString()).toFixed(2);
      this.taxPayerDetails["Etpay"] = parseFloat(this.taxPayerDetails["Etpay"].toString()).toFixed(2);
      this.taxPayerDetails["Ettax"] = parseFloat(this.taxPayerDetails["Ettax"].toString()).toFixed(2);
      this.taxPayerDetails["AppcrVr"] = parseFloat(this.taxPayerDetails["AppcrVr"]).toFixed(2);
      this.returnsService.SubmitET(this.taxPayerDetails).subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        if (data["d"]["Sopbel"] == "" || data["d"]["Sopbel"] != "ZERO" || data["d"]["Sopbel"] != "Not Applicable") {
          this.generateSadadNumber(data["d"]["Fbnumz"]);
        }
        this.step = 5;
      },
        (err) => {
          this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"])
        });
    }
    else {
      this.notifierService.notify(
        "error",
        "Error in form"
      );
      console.log("Error in form");
    }

  }
  SaveAsDraftET() {
    console.log(this.taxPayerDetails["ET_ITEMSet"].length)
    let count = 0;
    for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
      for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {

        if (this.ItemsSetDuplicate[j]["Items"][k]["RSPError"] == true || this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"] == true || this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"] == true) {
          count++;
        }

      }
    }
    if (count == 0) {
      this.taxPayerDetails["ET_ITEMSet"] = [];
      for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
        for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {
          delete this.ItemsSetDuplicate[j]["Items"][k]["RSPError"]
          delete this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"]
          delete this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"]
          this.ItemsSetDuplicate[j]["Items"][k]["Etdedsub"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Etdedsub"].toString()).toFixed(2);;
          this.ItemsSetDuplicate[j]["Items"][k]["Ettax"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Ettax"].toString()).toFixed(2);;
          this.ItemsSetDuplicate[j]["Items"][k]["Ettaxsub"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Ettaxsub"].toString()).toFixed(2);;
          this.ItemsSetDuplicate[j]["Items"][k]["Rspsubtot"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Rspsubtot"].toString()).toFixed(2);;
          this.taxPayerDetails["ET_ITEMSet"].push(this.ItemsSetDuplicate[j]["Items"][k]);
        }
      }
      console.log(this.taxPayerDetails["ET_ITEMSet"])
      this.taxPayerDetails["Operationz"] = "05";
      this.taxPayerDetails["Whfg"] = "X";
      //this.taxPayerDetails["Decfg"]="X";    
      // this.taxPayerDetails["Decdt"]=new Date();

      this.taxPayerDetails["ET_ITEMSet"] = this.taxPayerDetails["ET_ITEMSet"];
      //added new
      this.taxPayerDetails["Decdt"] = "\/Date(" + new Date().getTime() + ")\/";
      this.taxPayerDetails["Etadv"] = parseFloat(this.taxPayerDetails["Etadv"].toString()).toFixed(2);
      this.taxPayerDetails["Etded"] = parseFloat(this.taxPayerDetails["Etded"].toString()).toFixed(2);
      this.taxPayerDetails["Etnet"] = parseFloat(this.taxPayerDetails["Etnet"].toString()).toFixed(2);
      this.taxPayerDetails["Etpay"] = parseFloat(this.taxPayerDetails["Etpay"].toString()).toFixed(2);
      this.taxPayerDetails["Ettax"] = parseFloat(this.taxPayerDetails["Ettax"].toString()).toFixed(2);
      console.log("taxPayerDetails", this.taxPayerDetails);
      this.returnsService.SubmitET(this.taxPayerDetails).subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        jQuery("#SuccessModal").modal('show');
        // this.getExciseTaxs();
        // this.ExciseDetailsScreen=false;
      },
        (err) => {
          this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"])
        });
    }
    else {
      this.notifierService.notify(
        "error",
        "Error in form"
      );
      console.log("Error in Form");
    }
  }
  onDownloadAcknowledgement() {
    console.log(this.taxPayerDetails["Fbnumz"])
    // this.returnsService.DownloadAcknowledgement(this.taxPayerDetails["Fbnumz"]).subscribe((data: any) => {
    //   FileSaver.saveAs(data, "ETAcknowledgement.pdf");
    
    // })
    this.Acknowledgementurl= this.sanitizer.bypassSecurityTrustResourceUrl(environment.url + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"+this.taxPayerDetails.Fbnumz+"')/$value");
  }
  onDownloadForm() {
    console.log(this.taxPayerDetails["Fbnumz"])
    // this.returnsService.DownloadForm(this.taxPayerDetails["Fbnumz"], '').subscribe((data: any) => {
    //   FileSaver.saveAs(data, "ETForm.pdf");
    // })
    this.Formurl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.url + "sap/opu/odata/SAP/Z_GET_COVERFORM_SRV/cover_formSet(Fbnum='"+this.taxPayerDetails.Fbnumz+"',Utype='')/$value");
  }
  onChecked(event) {
    if (event.target.checked) {
      this.taxPayerDetails.Decfg = "X";
    }
    else {
      this.taxPayerDetails.Decfg = "";
    }
  }
  generateSadadNumber(fbnum) {
    this.returnsService.generateSadadNumber(fbnum).subscribe((data) => {
      console.log(data);
      this.taxPayerDetails.Sopbel = data["d"]["results"][0]["Sopbel"];
      console.log("Sopbel", this.taxPayerDetails.Sopbel);

    });
  }
  onRefresh() {
    console.log("refresh", this.taxPayerDetails["Fbnumz"])
    if (this.taxPayerDetails["Sopbel"] == "") {
      this.generateSadadNumber(this.taxPayerDetails["Fbnumz"]);
    }
    setTimeout(() => {
      this.step = 5;
    }, 500);

  }
  GlobalNumberAllow(event) {

    var rgx = /^[0-9]*\.?[0-9]*$/;
    return rgx.test(event.target.value);


  }
  // RestrictSpace(event) {
  //   if(event.keyCode==32)
  //    {
  //      return false;
  //    }
  // }
  SpaceValidator(event) {
    if (!event.target.value.length && event.keyCode == 32) {
      event.preventDefault();
    }
  }
  openModal() {
    if (this.taxPayerDetails.Etpay == "0.00") {
      jQuery("#infoModal1").modal('show')
      window.scrollTo(0, 0)
      setTimeout(function () {
        jQuery('#infoModal1').modal('hide');
      }, 1000);
      this.step = 2;
    }
  }
  Amendment() {
    this.step = 1;
    window.scrollTo(0, 0)
    this.disableInputs = false;
    this.voidReturn = false;
  }
  CancelReturn() {
    let count = 0;
    for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
      for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {

        if (this.ItemsSetDuplicate[j]["Items"][k]["RSPError"] == true || this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"] == true || this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"] == true) {
          count++;
        }

      }
    }
    if (count == 0) {
      this.taxPayerDetails["ET_ITEMSet"] = [];
      for (let j = 0; j < this.ItemsSetDuplicate.length; j++) {
        for (let k = 0; k < this.ItemsSetDuplicate[j]["Items"].length; k++) {
          delete this.ItemsSetDuplicate[j]["Items"][k]["RSPError"]
          delete this.ItemsSetDuplicate[j]["Items"][k]["EtdedError"]
          delete this.ItemsSetDuplicate[j]["Items"][k]["EtdedAmountError"]
          this.ItemsSetDuplicate[j]["Items"][k]["Etdedsub"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Etdedsub"].toString()).toFixed(2);;
          this.ItemsSetDuplicate[j]["Items"][k]["Ettax"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Ettax"].toString()).toFixed(2);;
          this.ItemsSetDuplicate[j]["Items"][k]["Ettaxsub"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Ettaxsub"].toString()).toFixed(2);;
          this.ItemsSetDuplicate[j]["Items"][k]["Rspsubtot"] = parseFloat(this.ItemsSetDuplicate[j]["Items"][k]["Rspsubtot"].toString()).toFixed(2);;
          this.taxPayerDetails["ET_ITEMSet"].push(this.ItemsSetDuplicate[j]["Items"][k]);
        }
      }
      console.log(this.taxPayerDetails["ET_ITEMSet"])
    
    this.taxPayerDetails["ET_ITEMSet"] = this.taxPayerDetails["ET_ITEMSet"];
    this.taxPayerDetails["UserTypz"]="TP";
    this.taxPayerDetails["Operationz"] = "04";
    this.taxPayerDetails["Decfg"] = "";
    this.taxPayerDetails["Decdt"] = "\/Date(" + new Date().getTime() + ")\/";
    this.taxPayerDetails["Etadv"] = parseFloat(this.taxPayerDetails["Etadv"].toString()).toFixed(2);
    this.taxPayerDetails["Etded"] = parseFloat(this.taxPayerDetails["Etded"].toString()).toFixed(2);
    this.taxPayerDetails["Etnet"] = parseFloat(this.taxPayerDetails["Etnet"].toString()).toFixed(2);
    this.taxPayerDetails["Etpay"] = parseFloat(this.taxPayerDetails["Etpay"].toString()).toFixed(2);
    this.taxPayerDetails["Ettax"] = parseFloat(this.taxPayerDetails["Ettax"].toString()).toFixed(2);
    
    console.log('tp', this.taxPayerDetails);
    this.returnsService.SubmitET(this.taxPayerDetails).subscribe((data) => {
      console.log('cancel data', data);
      this.taxPayerDetails = data["d"];
      this.disableInputs = true;
      this.voidReturn = true;
      jQuery("#VoidModal").modal('hide');
      jQuery("#voidSuccessModal").modal('show');
      window.scrollTo(0, 0)
    setTimeout(function() {
      jQuery('#voidSuccessModal').modal('hide');
  }, 1000);

    });
  }
  }
  ValidateFile(name: String) {
    // alert(name);
    // let filesize = 1000;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'xls') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'xlsx') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'doc') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'docx') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'png') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'jpg') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'jpeg') {
      this.attachmentError = false;
      return true;
    }
    else {
      this.attachmentError = true;
      if (this.attachmentError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "اختر ملفًا بملحق .XLS ، .XLSX ، .DOC ، .DOCX ، .PDF ، .JPG ، .JPEG ، .PNG"

        }
        else {
          this.errorMessage = "Choose only file with extension .XLS, .XLSX, .DOC, .DOCX, .PDF, .JPG, .JPEG &.PNG";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }
  }

  FileUpload(event)
  {
    console.log(this.taxPayerDetails.ATTDETSet);
    //console.log(this.taxpayerDetails.AttDetSet['results'][0]['RetGuid'],this.taxpayerDetails.AttDetSet['results'][0].Dotyp ||,this.taxpayerDetails.AttDetSet['results'][0].SchGuid,this.taxpayerDetails.AttDetSet['results'][0].Doguid ||  );
    const frmData = new FormData();
    let filename;
    let filesize;

      filename = event.target.files[0]["name"];
      filesize = event.target.files[0]["size"];


      let fileset = this.taxPayerDetails.ATTDETSet["results"].filter(x=>x.Filename == filename);
      if(fileset.length > 0){
        console.log('fileset',fileset.filter(name=>name.Filename == filename));
        fileset = fileset.filter(name=>name.Filename == filename);
        // event.target.value = "";
        if(fileset.length == 1){
          if (this.language == 'ar') {
            this.errorMessage = "يوجد ملف بنفس الاسم مرفق مسبقا";
            event.target.value = "";
          }
          else {
            this.errorMessage = "File with the same name already exists";
          }
          
          jQuery("#AttachmentModal").modal('show');
          jQuery('body').addClass('modalopen');
          
          // setTimeout(function () {
          //   jQuery('#infoModal1').modal('hide');
          // }, 3000);
          return false;
        }
      }

      const fsize = Math.round((filesize / 1024));

    if(fsize == 0){
      this.fileSizeError = true;
      event.target.value = "";
      if (this.fileSizeError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر";
        }
        else {
          this.errorMessage = "File Name, Doc Type, Ret.Guid and File Content cannot be blank in action N";
        }
        jQuery("#AttachmentModal").modal('show');
        // jQuery('body').addClass('modalopen');
        return false;
      }
      else{
        this.fileSizeError = false;
      }
    }else if (fsize > 2048) {
     // alert('File size Exceed');
      this.fileSizeError = true;
      event.target.value = "";
      if (this.fileSizeError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "اعلى حجم للملف هو 2MB";
        }
        else {
          this.errorMessage = "Maximum file size is 2MB";
        }
        jQuery("#AttachmentModal").modal('show');
        // jQuery('body').addClass('modalopen');
        return false;
      }
      else {
        this.fileSizeError = false;
      }
    }

    if (!this.ValidateFile(event.target.files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }

      frmData.append("fileUpload", event.target.files[0]);
      this.returnsService.SaveGeneralAttachments(this.taxPayerDetails["ReturnIdz"],filename,frmData,'ETA0').subscribe((data)=>{    
    //   console.log(data);
    this.ErrorFile = false;
      let obj={
        "DocUrl":data["d"]["DocUrl"],
        "Mimetype":data["d"]["Mimetype"],
        "RetGuid":this.taxPayerDetails["ReturnIdz"],
        "Seqno":"",
        "DataVersion":"",
        "SchGuid":data["d"]["SchGuid"],
        "Dotyp":'VTA0',
        "Srno":data["d"]["Srno"],
        "Doguid":data["d"]["Doguid"],
        "AttBy":"TP",
        "Filename":data["d"]["Filename"],
        "FileExtn":data["d"]["Filename"].toString().split('.')[data["d"]["Filename"].toString().split('.').length-1],
        "Enbedit":"",
        "Enbdele":"",
        "Visedit":"",
        "Visdel":""
      }
      console.log(obj);
      this.taxPayerDetails.ATTDETSet["results"].push(obj);
      console.log(this.taxPayerDetails.ATTDETSet["results"]);
      this.myInputVariable.nativeElement.value = '';
      event.target.value = "";
    },(err)=>{	
      console.error(err);	
      this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"])});
    
  }
  DeleteAttachement(obj)
  {
    this.returnsService.DeleteAttachement('undefined',obj['Dotyp'],obj['SchGuid'],obj['Srno'],obj['Doguid']).subscribe((data)=>{
      console.log(data);  
      this.taxPayerDetails.ATTDETSet["results"]=this.taxPayerDetails.ATTDETSet["results"].filter(data=>{
        return data['Filename']!= obj['Filename']
      });
      if(this.taxPayerDetails.ATTDETSet["results"].length<1)	
      {	
        this.ErrorFile=true;	
      }
    },err=>{
      console.error();
    });
  }

}
