import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {RFCRAPIConstants} from "src/app/constants/RequestForContractRelease";
import { map,flatMap } from "rxjs/operators";
import { apiconstants } from "../constants/apiConstants";

@Injectable({
  providedIn: 'root'
})
export class RequestForContractReleaseFormService {
  baseUrl = environment.url;
  lang: string;
  lang1: string;
  tin;
  Fbguid;
  Euser;
  Zuser;


  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lang1 = "A";

    } else {
      this.lang = "EN";
      this.lang1 = "E";

    }
    console.log("localStorage lang is",this.lang,this.lang1)

    this.tin = localStorage.getItem("gpart");  
   }
 
   getContractReleaseRequests(Fbguid,Euser,Zuser) {
        let url =  this.baseUrl+RFCRAPIConstants.RFCRDashboard+`(CallServ='DCON',HostName='',Zuser='${Zuser}',Bpnum='',Auditor='',Lang='${this.lang1}',Euser1='${Euser}',Euser2='null',Euser3='null',Euser4='null',Euser5='null',Fbguid='${Fbguid}')?$expand=ListSet,AuthServSet&$format=json`;  
        return this.http.get(url);
         
 
  }
  getOnCreateContractReleaseApp(Gpart){
    
    let url =  this.baseUrl+RFCRAPIConstants.RFCRCreateNewApp+`(Auditorz='',Taxpayerz='${Gpart}',RegIdz='',Submitz='',Savez='',Fbnumz='',Langz='${this.lang1}',PeriodKeyz='',UserTin='')?$expand=znotesSet,AttDetSet&$format=json`;
    return this.http.get(url);

  }
  getEUSERDetails(Gpart){
    let url =  this.baseUrl+RFCRAPIConstants.RFCREncryptDetails+`(Gpart='${Gpart}')`;
    return this.http.get(url);

  }
    //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='EN',Euser1='00000000000001090437',Euser2='00000000001000093144',Euser3='00000001000000099403',Euser4='00000010000000099828',Euser5='00001000000000098960',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet
    getFbguidDetails(res){
      let Val1 = res["Val1"]
      let Val2 = res["Val2"]
      let Val3 = res["Val3"]
      let Val4 = res["Val4"]
      let Val5 = res["Val5"]
      let url = this.baseUrl+RFCRAPIConstants.RFCRTaxPayerDashboard+`(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='${this.lang1}',Euser1='${Val1}',Euser2='${Val2}',Euser3='${Val3}',Euser4='${Val4}',Euser5='${Val5}',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet`
      return this.http.get(url);  
    }
  getContractReleaseAppOpenStep1(reqNum,status,type) {
      console.log("called service using reqNum",reqNum);
      
    let url =  this.baseUrl+RFCRAPIConstants.RFCROpenAppl+`(Euser1='00000000000000000000',Fbguid='',Fbnum='${reqNum}',Fbtyp='${type}',Gpart='${this.tin}',Lang='${this.lang}',Persl='',Status='${status}',Dispflag='')`;
    return this.http.get(url);
  }
  getContractReleaseAppOpenStep2(reqNum) {
    console.log("called  service using tin");
    
    let url =  this.baseUrl+RFCRAPIConstants.RFCROpenApp2+`(Auditorz='',Taxpayerz='${this.tin}',RegIdz='',Submitz='',Savez='',Fbnumz='${reqNum}',Langz='${this.lang1}',PeriodKeyz='',UserTin='')?$expand=znotesSet,AttDetSet&$format=json`;
    return this.http.get(url);
  }
  addContractReleaseRequest(formdata){
    // exciseObj.Operationz = "01";
     const headers = {
       Accept: "application/json",
       "X-Requested-With": "X",
     };
     return this.http.post(
       this.baseUrl + RFCRAPIConstants.RFCRPost,
       formdata,
       { headers }
     );
     
   }
   attachmentSubmit(formData, attType, filename, retGuid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: filename,
    };
    // console.log(this.baseUrl +
    //   RFCRAPIConstants.RFCRFileUpload +
    //     "(OutletRef='',RetGuid='" +
    //     retGuid +
    //     "',Flag='N',Dotyp='" +
    //     attType +
    //     "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
    //     this.lang,formData
    //     )
    return this.http.post(
        this.baseUrl +
      RFCRAPIConstants.RFCRFileUpload +
        "(OutletRef='',RetGuid='" +
        retGuid +
        "',Flag='N',Dotyp='" +
        attType +
        "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
        this.lang,formData,
      {
        headers,
      }
    );
  }
   deleteAttachment(attType, doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
      RFCRAPIConstants.RFCRFileDelete +
        "(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
        attType +
        "',SchGuid='',Srno=1,Doguid='" +
        doguid +
        "',AttBy='TP')/$value",
      { headers }
    );
  }
 
  printAttachment(fbnum) {
    const requestOptions: Object = {
      /* other options here */
      responseType: "blob",
    };

    return this.http.get(
      this.baseUrl +
      RFCRAPIConstants.RFCRDownload +
        "(Fbnum='"+fbnum+"')/$value"
     ,requestOptions
    );
  }
  getConfirmation(fbnum) {
    const requestOptions: Object = {
      /* other options here */
      responseType: "blob",
    };

    return this.http.get(
      this.baseUrl +
      RFCRAPIConstants.RFCRGetConfirm +
      "(Fbnum='" + fbnum + "')/$value",requestOptions
    );
   
  }


}
