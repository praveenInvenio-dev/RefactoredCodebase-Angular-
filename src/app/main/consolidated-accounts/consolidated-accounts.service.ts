import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsolidatedAccountsService {

  baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  getCCADetailsList(Language, Gpartz)
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_TP_DASHBOARD_SRV/HeaderSet(CallServ='ZHCD',HostName='',Zuser='null',Bpnum='"+ Gpartz +"',Auditor='',Lang='"+ Language +"',Euser1='null',Euser2='null',Euser3='null',Euser4='null',Euser5='null',Fbguid='null')?$expand=ListSet,AuthServSet";
    return this.http.get(url);
  }

  getWholeDetails(Gpartz)
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_ZHCL_DELINKING_SRV/zhcd_headerSet(Taxpayerz='"+ Gpartz +"',Fbnumz='',UserTin='')?&$expand=zhcd_childSet,AttDetSet";
    return this.http.get(url);
  }

  postAttachmentDetails(filename, formData, refId, docType, caseGuid)
  {
    console.log('ob', formData);
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      slug: filename,
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(RetGuid='"+ caseGuid +"',OutletRef='"+ refId +"',Flag='N',Dotyp='"+ docType +"',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    //let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(OutletRef='"+ refId +"',RetGuid='"+ caseGuid +"',Flag='N',Dotyp='"+ docType +"',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, formData, {headers});
  }

  saveCancelConsolidatedDetails(resData)
  {
    console.log('res', resData);
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_ZHCL_DELINKING_SRV/zhcd_headerSet";
    return this.http.post(url, resData, {headers});
  }
  
}
