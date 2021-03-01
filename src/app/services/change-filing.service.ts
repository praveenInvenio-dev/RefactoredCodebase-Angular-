import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "src/app/constants/newChangeFilingConstant";
const httpOptions = {
  headers: new HttpHeaders({
    ichannel: "243",
  }),
};

@Injectable({
  providedIn: "root",
})
export class ChangeFilingService {
  baseUrl = environment.url;
  lang: string;
  tin;
  lang1: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lang1 = "A";
    } else {
      this.lang = "EN";
      this.lang1 = "E";
    }
    this.tin = localStorage.getItem("gpart");
  }

  geturlsforfile(){
    return this.baseUrl;
  }

  changefilingHistorydata() {
    // "+this.tin+" https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(TaxType='VT',AudTin='',Gpart='3311656701',Lang='E',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet
    let url =
      this.baseUrl +
      ApiConstants.getHistoryData +
      "(TaxType='VT',AudTin='',Gpart='" +
      this.tin +
      "',Lang='" +
      this.lang1 +
      "',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet";
    return this.http.get(url, httpOptions);
  }

  changeFilingLandingData(fbnum) {
    fbnum ? fbnum : "";
    let url =
      this.baseUrl +
      ApiConstants.getDataLanding +
      "(Fbnumz='" +
      fbnum +
      "',PortalUsrz='',Langz='" +
      this.lang1 +
      "',Operationz='',Gpartz='" +
      this.tin +
      "',Euser='',UserTypz='',Fbguid='')?&$expand=EffDateSet,UI_BTNSet,NOTESSet,ATTACHSet,ATT_TYPSet,QuesListSet";

    return this.http.get(url, httpOptions);
  }

  api2() {
    let url =
      this.baseUrl +
      ApiConstants.getDataTwo +
      "(Fbtypz='',UserTypz='',TransactionTypez='',Lang='" +
      this.lang1 +
      "',Gpart='" +
      this.tin +
      "',Status='')?&$expand=UI_BTNSet,ATT_TYPSet,EffDateSet";
    return this.http.get(url, httpOptions);
  }

  submitChangeFilingData(data) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + ApiConstants.postApiOne;
    return this.http.post(url, data, {
      headers,
    });
  }
  // " +
  //       this.tin +
  //       "
  validationService(obj, date) {
    return this.http.get(
      this.baseUrl +
        ApiConstants.getValidation +
        "(Tin='',Idtype='" +
        obj.type +
        "',Idnum='" +
        obj.idNumber +
        "',Country='',PassExpDt='" +
        date +
        "',TaxpDob='" +
        date +
        "')"
    );
  }

  attachmentSubmit(obj, obj2, file, obj3) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: file,
    };
    return this.http.post(
      this.baseUrl +
        ApiConstants.docUpload +
        "/AttachSet(OutletRef='',RetGuid='" +
        obj +
        "',Flag='N',Dotyp='" +
        obj2 +
        "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet",
      obj3,
      {
        headers,
      }
    );
  }

  deleteDoc(dotyp, doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
        ApiConstants.docUpload +
        "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
        dotyp +
        "',SchGuid='',Srno=1,Doguid='" +
        doguid +
        "',AttBy='TP')/$value",
      { headers }
    );
  }
}
