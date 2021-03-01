import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "src/app/constants/vatInstallmentPlanConstants";

@Injectable({
  providedIn: "root",
})
export class VatInstallmentPlanService {
  baseUrl = environment.url;
  lang: string;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }

  getInitialData(formGuid, euser) {
    const url = `${
      ApiConstants.getInitialData
    }/VTIA_HEADERSet(FormGuid='${formGuid}',Euser='${euser}',Gpartz='${localStorage.getItem(
      "gpart"
    )}',Langz='${
      this.lang
    }',Officerz='',PortalUsrz='',TxnTpz='')?$expand=VTIASet,VTISSet,NOTESSet,ATTACHMENTSet,VTADSet&$format=json`;

    return this.http.get(this.baseUrl + url);
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

  submitData(obj) {
    // obj.Operationz = "10";
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_VTIA_SRV/VTIA_HEADERSet",
      obj,
      { headers }
    );
  }

  getExistingData(euser, fbguid, fbNum, status) {
    const url = `${
      ApiConstants.getExistingData
    }/TPFILLSet(Euser1='${euser}',Fbguid='${fbguid}',Fbnum='${fbNum}',Fbtyp='VTIA',Gpart='${localStorage.getItem(
      "gpart"
    )}',Lang='${
      this.lang === "A" ? "AR" : "EN"
    }',Persl='',Status='${status}',Dispflag='')`;

    return this.http.get(this.baseUrl + url);
  }

  getVATInstalmentPlans() {
    const url = `${
      ApiConstants.getVATInstalmentPlans
    }HEADERSet(TaxType='VT',AudTin='',Gpart='${localStorage.getItem(
      "gpart"
    )}',Lang='${
      this.lang
    }',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet`;

    return this.http.get(this.baseUrl + url);
  }

  getScheduledInstallmentPlan(formGuid, euser, opbel) {
    const url = `${ApiConstants.getScheduledInstallmentPlan}VTIA_HEADERSet(FormGuid='${formGuid}',Euser='${euser}',Gpart='',Langz='${this.lang}',Opbel='${opbel}')?$expand=VTIA_IADTSet,VTIA_IAHDSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }
}
