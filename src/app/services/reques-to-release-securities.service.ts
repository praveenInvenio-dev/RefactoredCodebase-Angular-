import { ApiConstantsReleaseSecurity } from './../constants/request-release-to-securities';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequesToReleaseSecuritiesService {
  lang: string;
  langEorA:string;
  baseUrl: string = environment.url;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.langEorA="A";
    } else {
      this.lang = "EN";
      this.langEorA="E";
    }
  }
  getRequestedSecuritiesList()
  {
    let tin = localStorage.getItem("gpart");
    let url1= this.baseUrl +  "sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(TaxType='VT',AudTin='',Gpart='"+tin+"',Lang='"+this.langEorA+"',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet";
   
   console.log("++++++TIN",tin);
    return this.http.get(url1);
  }

  getDataToRequestedSecurities()
  {
    let tin = localStorage.getItem("gpart");
   let url1= this.baseUrl + "sap/opu/odata/SAP/ZDP_SWVT_M_SRV/HeaderSet(Fbguid='',Fbnumz='',Langz='"+this.langEorA+"',Officerz='',Gpartz='"+tin+"',Euser='')?&$expand=ATTACHSet,NOTESSet,QuesListSet,AddressSet,IBANSet,SecRefSet&$format=json";
    return this.http.get(url1);
  }
  getDataToRequestedSecuritiesWorkItem(fbguide)
  {
    let tin = localStorage.getItem("gpart");
   let url1= this.baseUrl + "sap/opu/odata/SAP/ZDP_SWVT_M_SRV/HeaderSet(Fbguid='"+fbguide+"',Fbnumz='',Langz='"+this.langEorA+"',Officerz='',Gpartz='"+tin+"',Euser='')?&$expand=ATTACHSet,NOTESSet,QuesListSet,AddressSet,IBANSet,SecRefSet&$format=json";
    return this.http.get(url1);
  }
  //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_SWVT_UH_SRV/UI_HDRSet(Fbnum='63000000064',Lang='E',Officer='',Gpart='3000102299',Status='E0085',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet
  getUIControlInfo(fbNum,status)
  {
    let tin = localStorage.getItem("gpart");
   let url1= this.baseUrl + "sap/opu/odata/SAP/ZDP_SWVT_UH_SRV/UI_HDRSet(Fbnum='"+fbNum+"',Lang='"+this.langEorA+"',Officer='',Gpart='"+tin+"',Status='"+status+"',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet&$format=json";
  //  const headers = {
  //   Accept: "application/atom+xml,application/atomsvc+xml,application/xml",
   
  // };{ headers: headers}
   return this.http.get(url1);
  }

  getDataForCorrespondingReferenceNumber(referenceNumber)
  {
    
    let url1= this.baseUrl + "sap/opu/odata/SAP/ZDP_SWVT_M_SRV/getSecDetailsSet(Refno='"+referenceNumber+"')";
    return this.http.get(url1);
  }
 
  getUserValidation(obj, date) {
  return this.http.get(
    this.baseUrl +
    ApiConstantsReleaseSecurity.UserTypeValidation +
    "taxpayer_nameSet(Tin='',Idtype='" +
    obj.type +
    "',Idnum='" +
    obj.idNumber +
    "',Country='',PassExpDt='" +
    date +
    "',TaxpDob='" +
    date +
    "')?sap-language=" +
    this.lang
  );
}
getInitialStatusDataForWorkItem(fbnum,status)
{
  let tin = localStorage.getItem("gpart");
  let url1= this.baseUrl + "sap/opu/odata/SAP/ZDP_ITAP_SRV/TPFILLSet(Euser1='',Fbguid='',Fbnum='"+fbnum+"',Fbtyp='SWVT',Gpart='"+tin+"',Lang='"+this.lang+"',Persl='',Status='"+status+"',Dispflag='')";
   return this.http.get(url1);

}


getSubmitApi()
{
  let url1= this.baseUrl+"sap/opu/odata/SAP/ZDP_SWVT_M_SRV/";
 return this.http.get(url1); 

}
submitRequestForReleaseSecurities( DataToSbmitRequest,OprationID)
{
  const headers = {
    Accept: "application/json",
    "X-Requested-With": "X",
    ichannel: "243",
  };
  DataToSbmitRequest.d.Operationz=OprationID;
  DataToSbmitRequest.d.SecRefSet= DataToSbmitRequest.d.SecRefSet.results;
  DataToSbmitRequest.d.IBANSet= DataToSbmitRequest.d.IBANSet.results;
  DataToSbmitRequest.d.NOTESSet= DataToSbmitRequest.d.NOTESSet.results;
  DataToSbmitRequest.d.QuesListSet= DataToSbmitRequest.d.QuesListSet.results;
  DataToSbmitRequest.d.ATTACHSet= DataToSbmitRequest.d.ATTACHSet.results;
  let tin = localStorage.getItem("gpart");
  let FbtypEq = "TP07";
  let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_SWVT_M_SRV/";
  let url1 = this.baseUrl+"sap/opu/odata/SAP/ZDP_SWVT_M_SRV/HeaderSet";
  return this.http.post(url1,DataToSbmitRequest.d, { headers });
}

getBankLogo(val) {
  return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_BNKLOGO_ANG_SRV/BankLogoSet?$filter=Langz eq '" + this.langEorA + "' and Bnkcd eq '" + val + "'")
}

}

