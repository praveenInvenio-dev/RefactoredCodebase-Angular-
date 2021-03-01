import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiConstants } from "../constants/ZakatObjectionConstants";

@Injectable({
  providedIn: "root",
})
export class ZakatObjectionService {
  lang: string;
  baseUrl = environment.url;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }
  getObjectionDetail() {
    const url = `${
      ApiConstants["getObjectionData"]
    }(Taxpayerz='${localStorage.getItem(
      "gpart"
    )}',Fbnumz='',Langz='',Auditorz='',Euser='',Fbguid='')?&$expand=ZNOB_ObjSet,Off_notesSet,AttDetSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getReferenceNumberDetails(refNumber) {
    const url = `${
      ApiConstants.getReferenceNumberDetails
    }(Taxpayerz='${localStorage.getItem(
      "gpart"
    )}',Fbnumz='${refNumber}',Euser='00000000000000000000',Aud='X',Sectp='C')`;
    return this.http.get(this.baseUrl + url);
  }

  saveObjection(objectionData) {
    const url = `${ApiConstants.saveObjection}`;
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    return this.http.post(this.baseUrl + url, objectionData, { headers });
  }

  fetchPaymentDetails(fbNum, paymentType) {
    const url = `${ApiConstants.fetchPaymentDetails}(Revam=0.00d,Fbnum='${fbNum}',Disam=0.00d,Sectp='${paymentType}')`;
    return this.http.get(this.baseUrl + url);
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
}
