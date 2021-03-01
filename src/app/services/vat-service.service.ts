import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { apiconstants } from "../constants/apiConstants";
import { type } from 'os';

@Injectable({
  providedIn: "root",
})
export class VatServiceService {
  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  getVatTermsAndConditions() {
    return this.http.get(
      this.baseUrl +
        apiconstants.TermsNConditions +
        "(Langz='" +
        this.lang +
        "',Fbtyp='ETRG')?$format=json"
    );
  }

  

  getSignupTermsAndConditions(type) {
    return this.http.get(
      this.baseUrl +
        apiconstants.TermsNConditions +
        "(Langz='" +
        this.lang +
        "',Fbtyp='"+type+"')?$format=json"
    );
  }

  getVatTermsAndConditions1() {
    return this.http.get(
      this.baseUrl +
        apiconstants.TermsNConditions +
        "(Langz='" +
        this.lang +
        "',Fbtyp='VTRG')?$format=json"
    );
  }

  getIBNValidation(ibn) {
    return this.http.get(
      this.baseUrl +
        apiconstants.IBNValidation +
        "HEADERSet(Iban='" +
        ibn +
        "')?sap-language=" +
        this.lang
    );
  }

  getList() {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    let url =
      "sap/opu/odata/SAP/ZDP_VRUH_SRV/VR_UI_HDRSet(Fbnum='',Lang='" +
      lng +
      "',Officer='',Gpart='" +
      localStorage.getItem("gpart") +
      "',Status='E0001',TxnTp='CRE_RGVT',Formproc='ZTAX_VT_REG')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet&$format=json";
    return this.http.get(this.baseUrl + url);
  }

  getVatData() {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    const httpOptions = {
      headers: new HttpHeaders({
        ichannel: "243",
      }),
    };

    return this.http.get(
       this.baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/VRNHSet(Fbnumz='',PortalUsrz='',Langz='" +
        lng +
        "',Officerz='',Gpartz='',TxnTpz='04',Euser='',Fbguid='')?&$expand=ADDRESSSet,IBANSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,NOTESSet,QUESTIONSSet,QUESLISTSet,ELGBL_DOCSet&$format=json",
      httpOptions
    );
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

  getUserByTin(tin) {
    return this.http.get(
      this.baseUrl +
        apiconstants.UserTypeValidation +
        "taxpayer_nameSet(Tin='" +
        tin +
        "',Idtype='',Idnum='',Country='',PassExpDt='',TaxpDob='')?sap-language=" +
        this.lang
    );
  }

  submitVat(obj) {
    // let headers = new Headers();
    // headers.append("Accept", "application/json");
    // headers.append("X-Requested-With","X");

    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    // const httpOptions = new HttpHeaders()
    //   .set("Accept", "application/json")
    //   .set("X-Requested-With", "X"); ichannel: "243",
    //this.http.post<any>('https://jsonplaceholder.typicode.com/posts', obj, { headers })
    return this.http.post(this.baseUrl + apiconstants.SubmitVAT, obj, {
      headers,
    });
  }

  getVatElegibilityType(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(this.baseUrl + apiconstants.SubmitVAT, obj, {
      headers,
    });
  }

  downloadAttachment(url) {
    const requestOptions: Object = {
      /* other options here */
      responseType: "blob",
    };
    return this.http.get(url, requestOptions);
  }

  attachmentSubmit(obj, obj2, file, obj3) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: encodeURI(file),
    };
    return this.http.post(
      this.baseUrl +
        apiconstants.Attachment +
        "/AttachSet(OutletRef='',RetGuid='" +
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

  deleteAttachment(obj1, obj2) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
        apiconstants.Attachment +
        "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
        obj1 +
        "',SchGuid='',Srno=1,Doguid='" +
        obj2 +
        "',AttBy='TP')/$value",
      { headers }
    );
  }

  getdatz() {
    let url =
      "sap/opu/odata/SAP/ZDP_ERNW_SRV/ERNHSet(Fbguid='',Fbnumz='',PortalUsrz='',Langz='E',Operationz='02',Officerz='',Gpartz='',Euser='',TxnTpz='CHG_RGEX')?&$expand=ADDRESSSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,GOODTYPESSet,NOTESSet,WAREHOUSEDTLSet,CRDTLSet&$format=json";
    return this.http.get(this.baseUrl + url);
  }

  getAckDownload(fb) {
    const requestOptions: Object = {
      /* other options here */
      responseType: "blob",
    };
    return this.http.get(
      this.baseUrl + apiconstants.AckDownload + fb + "')/$value?sap-lang="+this.lang,
      requestOptions
    );
  }

  getBankLogo(val) {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_BNKLOGO_ANG_SRV/BankLogoSet?$filter=Langz eq '" + lng + "' and Bnkcd eq '" + val + "'")
  }

  deleteAttachmentDereg(Doguid, RetGuid) {
    //console.log('valuesss', obj1);
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
        this.baseUrl +
        "sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachMedSet(OutletRef='',RetGuid='" +
        RetGuid +
        "',Flag='N',Dotyp='',SchGuid='',Srno=1,Doguid='" +
        Doguid +
        "',AttBy='TP')/$value",
        { headers }
    );
  }
}
