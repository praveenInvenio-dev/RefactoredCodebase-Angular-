import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "src/app/constants/NewVatReviewConstants";

@Injectable({
  providedIn: 'root'
})
export class NewVatReviewService {

  baseUrl = environment.url;
  lang: string;
  constructor(private http: HttpClient) {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }





  getFbguid(Fbnum, dbData) {
    // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPAV_M_SRV/TPAV_HDRSet(FormGuid='005056B1365C1EDB8B9A72C5C18EB08B',Fbnumx='',PortalUsrx='',Langx='E',Officerx='',Euser='00000000001000116117',Gpartx='null',Persl='',TxnTpx='CRE_TPAV')?&$expand=NOTESSet,ATTACHSet,EffPrdSet,ATT_TYPSet,ATT_TYP1Set,SECTORSet,QUESLISTSet,INDUSTRYSet&&$format=json

    console.log(decodeURI(Fbnum));
    const url = `${ApiConstants.getFbguid}/TPFILLSet(Euser1='${dbData['d']['Euser']}',Fbguid='undefined',Fbnum='${Fbnum}',Fbtyp='RAVT',Gpart='${localStorage.getItem('gpart')}',Lang='${this.lang}',Persl='',Status='',Dispflag='')`
    return this.http.get(this.baseUrl + url);

  }

  getFbguidForApplication(Fbguid, Fbtyp, Fbnum, dbData) {
    const url = `${ApiConstants.getFbguid}/TPFILLSet(Euser1='${dbData['d']['Euser']}',Fbguid='${Fbguid}',Fbnum='${Fbnum}',Fbtyp='${Fbtyp}',Gpart='${localStorage.getItem('gpart')}',Lang='${this.lang}',Persl='',Status='E0043',Dispflag='D')`
    return this.http.get(this.baseUrl + url);

  }



  getInitialData(Fbnum, dbData, fbguidData) {

    // /sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/HeaderSet(FormGuid='005056B1CB171EEAB4E40B0650201DF7',Fbnumx='',Gpartx='',Langx='E',Officerx='',PortalUsrx='',Euserx='00001000000005310443',Appfg='N')?$expand=AddressSet,AttdetSet,NotesSet,QuesListSet,ReasonSet,IdDetailSet,MainReasonSet,SecurityDtl

    // 70000001700
    const url = `${ApiConstants.getInitialData}/HeaderSet(FormGuid='${fbguidData['d']['Fbguid']}',Fbnumx='${Fbnum}',Gpartx='${localStorage.getItem("gpart")}',Langx='${this.lang}',Officerx='',PortalUsrx='',Euserx='${dbData['d']['Euser']}',Appfg='N')?$expand=AddressSet,AttdetSet,NotesSet,QuesListSet,ReasonSet,IdDetailSet,MainReasonSet,SecurityDtl&$format=json`;

    return this.http.get(this.baseUrl + url);

    // let url =
    //   "/sap/opu/odata/SAP/ZDP_VRUH_SRV/VR_UI_HDRSet(Fbnum='',Lang='" +
    //   this.lang +
    //   "',Officer='',Gpart='" +
    //   localStorage.getItem("gpart") +
    //   "',Status='E0001',TxnTp='CRE_RGVT',Formproc='ZTAX_VT_REG')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet&$format=json";
    // return this.http.get(this.baseUrl + url);
  }



  getRejForms(url) {

    return this.http.get(this.baseUrl + url)

  }


  getButtonSet(url) {

    return this.http.get(this.baseUrl + url)

  }

  getBillDetailSet(url) {

    return this.http.get(this.baseUrl + url)

  }


  getSadad(url) {

    return this.http.get(this.baseUrl + url)

  }



  getSecAmt(url) {

    return this.http.get(this.baseUrl + url)

  }




  attachmentSubmit(obj, obj2, file, obj3) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: file,
    };
    return this.http.post(
      this.baseUrl +
      ApiConstants.Attachment +
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


  deleteAttachment(dotyp, doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
      ApiConstants.Attachment +
      "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
      dotyp +
      "',SchGuid='',Srno=1,Doguid='" +
      doguid +
      "',AttBy='TP')/$value",
      { headers }
    );
  }


  formatAmount(amount: String) {
    console.log(amount);

    if (amount == "" || amount == "0.00") {
      return "0.00m";
    }

    else {
      let formattedAmount = amount.replace(/,/gi, "");
      return parseFloat(formattedAmount) + "m";
    }

  }


  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
      ApiConstants.UserTypeValidation +
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


  submitVatReviewData(vatReviewObj) {

    console.log(vatReviewObj);

    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/HeaderSet",
      vatReviewObj,
      { headers }
    );

  }



}
