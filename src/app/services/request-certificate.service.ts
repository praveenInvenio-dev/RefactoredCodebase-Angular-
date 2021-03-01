import { SubmittedBillData } from './../model/request-certificate.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RequestCertificateService {
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
 
  getListOfSubmitedCertificateRequest() {
    let tin = localStorage.getItem("gpart");
  
    let Fbguid = "";
    let url = this.baseUrl +"sap/opu/odata/SAP/ZDP_TP_DASHBOARD_SRV/HeaderSet(CallServ='TP07',HostName='',Zuser='',Bpnum='"+tin+"',Auditor='',Lang='"+this.langEorA+"',Euser1='00000000000000000000',Euser2='null',Euser3='null',Euser4='null',Euser5='null',Fbguid='')?$expand=ListSet,AuthServSet";
     
    return this.http.get(url);
  }

  attachmentSubmit(obj, obj2, file, obj3) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: file,
    };
    return this.http.post(
      this.baseUrl +
      "/sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(OutletRef='',RetGuid='" +
      obj +
      "',Flag='N',Dotyp='" +
      obj2 +
      "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
      this.lang,
      obj3,
      {
          headers,
      }
  );
  }




  
  deleteAttachment(dotyp, doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
      "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV" +
      "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
      dotyp +
      "',SchGuid='',Srno=1,Doguid='" +
      doguid +
      "',AttBy='TP')/$value",
      { headers }
    );
  }

 getDataForRequestingCertificate()
 {
 
  let tin = localStorage.getItem("gpart");
    let url=this.baseUrl+"sap/opu/odata/SAP/Z_TP_NOTES_TP07_SRV/znotes_tp07Set(Auditorz='',Taxpayerz='"
    +tin+
    "',RegIdz='',Submitz='',Savez='',Fbnumz='',Langz='"
    +this.langEorA+
    "',UserTin='')?&$expand=znotesSet,AttDetSet";
    return this.http.get(url);
 
  }
//


getTaxYearValidationForCertificate(Pkey)
{
  let tin = localStorage.getItem("gpart");
 //let tin = localStorage.getItem("gpart");
   let url=this.baseUrl+"sap/opu/odata/SAP/Z_TP_NOTES_TP07_SRV/TP07_LockSet(Gpart='"+tin+"',Certype='TP07_1',Pkey='"+Pkey+"')"
   return this.http.get(url);

 }
//

  getValueForCertificateTypeDropDown()
  {
    let tin = localStorage.getItem("gpart");
    let FbtypEq="TP07";
    let url= this.baseUrl+"sap/opu/odata/SAP/Z_TP_NOTES_TP07_SRV/zvaluesSet?$filter=Taxpy%20eq%20%27"+tin+"%27%20and%20Fbtyp%20eq%20%27"+FbtypEq+"%27"
    return this.http.get(url);
  }
  getTaxYearDropDown(certificateTypeKey:string)
  {
    let tin = localStorage.getItem("gpart");
    let FbtypEq="TP07";
    let url= this.baseUrl+"sap/opu/odata/SAP/Z_TP_NOTES_TP07_SRV/zvalues_keySet?$filter=Taxpy%20eq%20%27"+tin+"%27%20and%20Fbtyp%20eq%20%27"+certificateTypeKey+"%27";
    return this.http.get(url);
  }
  getAlreadySubmittedRequestDetails(listItem)
  {
    let tin = localStorage.getItem("gpart");
    let FbtypEq="TP07";
    let url= this.baseUrl+"sap/opu/odata/SAP/ZDP_ITAP_SRV/TPFILLSet(Euser1='"+listItem.Euser+"',Fbguid='',Fbnum='"+listItem.Fbnum+"',Fbtyp='"+listItem.Fbtyp+"',Gpart='"+tin+"',Lang='"+this.lang+"',Persl='',Status='"+listItem.Fbsta+"',Dispflag='')";
    return this.http.get(url); 
  }
  getSubmittedReqAttachmentDetails(fbNum)
  {
    let tin = localStorage.getItem("gpart");
    let FbtypEq="TP07";
    let url= this.baseUrl+"sap/opu/odata/SAP/Z_TP_NOTES_TP07_SRV/znotes_tp07Set(Auditorz='',Taxpayerz='"+tin+"',RegIdz='',Submitz='',Savez='',Fbnumz='"+fbNum+"',Langz='"+this.langEorA+"',UserTin='')?&$expand=znotesSet,AttDetSet";
    return this.http.get(url); 
    
  }
  submitRequestForCertificate( DataToSbmitRequest)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let tin = localStorage.getItem("gpart");
    let FbtypEq="TP07";
    let url= this.baseUrl+"sap/opu/odata/SAP/Z_TP_NOTES_TP07_SRV/znotes_tp07Set";
    console.log(DataToSbmitRequest);
    DataToSbmitRequest.Langz=this.langEorA;
    DataToSbmitRequest.Savez='X';
    DataToSbmitRequest.Submitz='X'
    DataToSbmitRequest.Taxpayerz=tin;
    return this.http.post(url,DataToSbmitRequest, { headers });
  }
 
  

}
