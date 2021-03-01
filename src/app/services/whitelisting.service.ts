import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiConstants } from "../constants/whitelist.constant";

@Injectable({
  providedIn: "root",
})
export class WhitelistingService {
  baseUrl = environment.url;
  lang: string;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }

  getWhitelistingList() {
    const url = `${
      ApiConstants.getWhitelistingList
    }HEADERSet(TaxType='VT',AudTin='',Gpart='${localStorage.getItem(
      "gpart"
    )}',Lang='${
      this.lang
    }',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet`;

    return this.http.get(this.baseUrl + url);
  }

  getInitData(fbguid, transactionType) {
    const url = `${
      ApiConstants.getInitData
    }HdrSet(Fbnumz='',PortalUsrz='',Langz='${
      this.lang
    }',Officerz='',Gpart='',TxnTpz='${transactionType}',Euser='${localStorage.getItem(
      "euser"
    )}',Fbguid='${fbguid}')?&$expand=AttachmentSet,NotesSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getExistingData(formBundle) {
    const url = `${
      ApiConstants.getExistingData
    }TPFILLSet(Euser1='${localStorage.getItem("euser")}',Fbguid='${
      formBundle.Fbguid
    }',Fbnum='${formBundle.Fbnum}',Fbtyp='VCWL',Gpart='${localStorage.getItem(
      "gpart"
    )}',Lang='${this.lang === "E" ? "EN" : "AR"}',Persl='',Status='${
      formBundle.Fbust
    }',Dispflag='')`;

    return this.http.get(this.baseUrl + url);
  }

  validateId(idType, idNum, dob) {
    const url = `${ApiConstants.validateId}taxpayer_nameSet(Tin='',Idtype='${idType}',Idnum='${idNum}',Country='',PassExpDt='',TaxpDob='${dob}')`;

    return this.http.get(this.baseUrl + url);
  }

  saveWhiteListing(data) {
    const url = `${ApiConstants.saveWhiteListing}HdrSet`;

    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.post(this.baseUrl + url, data, { headers });
  }

  uploadFiles(formData, attType, filename, retGuid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: filename,
    };
    return this.http.post(
      this.baseUrl +
        ApiConstants.attachment +
        "/AttachSet(OutletRef='',RetGuid='" +
        retGuid +
        "',Flag='N',Dotyp='" +
        attType +
        "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
        this.lang,
      formData,
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
        ApiConstants.attachment +
        "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
        attType +
        "',SchGuid='',Srno=1,Doguid='" +
        doguid +
        "',AttBy='TP')/$value",
      { headers }
    );
  }

  getCancelWhitelistData() {
    const url = `${
      ApiConstants.cancelWhitelistData
    }HdrSet(Fbnumz='',PortalUsrz='',Langz='${
      this.lang
    }',Officerz='',Gpart='',TxnTpz='CAN_VCWL',Euser='${localStorage.getItem(
      "euser"
    )}',Fbguid='${localStorage.getItem(
      "fbguid"
    )}')?&$expand=NotesSet&$format=json`;
    return this.http.get(this.baseUrl + url);
  }

  submitCancelWhitelist(data) {
    const url = `${ApiConstants.cancelWhitelistData}HdrSet`;
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    return this.http.post(this.baseUrl + url, data, { headers });
  }
}
