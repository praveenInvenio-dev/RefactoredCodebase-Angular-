import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { apiconstants } from 'src/app/constants/apiConstants';

@Injectable({
  providedIn: 'root'
})
export class ExciseTaxServicesService {

  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  /* Excise tax deregistration starts here */
  getTaxDegisterHDRSet(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_DGEX_M_SRV/HDRSet(Fbguid='',Fbnumz='',Langz='" + Language + "',Officerz='',Gpartz='" + GPartz + "',UserTypz='',Euser='',Psobkey='')?&$expand=ATTACHSet,NOTESSet,WH_ITMSet&$format=json";
    return this.http.get(url);
  }

  getTaxDerigisterUISet(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_DGEX_UH_SRV/UI_HDRSet(Formproc='ZTAX_WH_CANCEL',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='',TxnTp='')?&$expand=UserListSet,UI_BTNSet,UI_DD_RESNSet";
    return this.http.get(url);
  }

  getTaxDerigisterIDType(Idtype, Idnum, PassExpDt) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='" + Idtype + "',Idnum='" + Idnum + "',Country='',PassExpDt='" + PassExpDt + "',TaxpDob='2020922')";
    return this.http.get(url);
  }

  saveDerigisterDetails(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_DGEX_M_SRV/HDRSet";
    return this.http.post(url, resData, { headers });
  }
  

  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
      apiconstants.UserTypeValidation +
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
  /* Excise tax deregistration ends here */

  /*Display amendent Excise Registration service starts */
  SaveDisplayamendent(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ERNW_SRV/ERNHSet";
    return this.http.post(url, resData, { headers });
  }
  getDisplayamendent(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ERNW_SRV/ERNHSet(Fbguid='',Fbnumz='',PortalUsrz='',Langz='" + Language + "',Operationz='02',Officerz='',Gpartz='" + GPartz + "',Euser='',TxnTpz='CHG_RGEX')?&$expand=ADDRESSSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,GOODTYPESSet,NOTESSet,WAREHOUSEDTLSet,CRDTLSet&$format=json";
    return this.http.get(url);
  }
  getDisplayamendent1(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ERGT_SRV/ERGX_HDRSet(Fbtypz='',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='E0001',TxnTp='CHG_RGEX')?&$expand=BTNSet,GDTYPESet,crddSet,ATT_CRSet&$format=json";
    return this.http.get(url);
  }
  acknowledgmentdownload(fbnum) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='" + fbnum + "')/$value";
    return this.http.get(url, requestOptions);
  }
  /* Display amendent Excise Registration service ends */

}
