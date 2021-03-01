import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TinDeregistrationService {
  lang: string;
  lng: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lng = "A";
    } else {
      this.lang = "EN";
      this.lng = "E";
    }
  }
  baseUrl: string = environment.url;

  getReasons(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_DREGRESN_SRV/ZDS_DETSet(Partner='" +
      tin +
      "',Spars='" +
      this.lng +
      "')?&$expand=REASONSet";
    return this.http.get(url);
  }

  getDetails(type, tin, approve?, reject?) {
    if (!approve) approve = "";
    if (!reject) reject = "";
    let url =
      this.baseUrl +
      "sap/opu/odata/sap/Z_DEREGISTRATION_NEW_SRV/DRG_HeaderSet(Auditorz='',ADegister='" +
      type +
      "',Taxpayerz='" +
      tin +
      "',FormGuid='',RegIdz='',PeriodKeyz='',Submitz='',Savez='',Fbnumz='',Langz='',OfficerUidz='',Approvez='" +
      approve +
      "',Rejectz='" +
      reject +
      "',CreateTxAssesz='')?&$expand=AttDetSet,Off_notesSet,OutletSet,PermitSet,returnSet,Permit_TableSet";
    return this.http.get(url);
  }

  getActivity(obj) {
    let tin = localStorage.getItem("gpart");
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ACTIVITY_DROPDOWN_SRV/ZDD_ACTIVITYSet(Gpart='" +
      tin +
      "',Actno='" +
      obj.outnm +
      "',Type='" +
      obj.type +
      "',Idnumber='" +
      obj.idNum +
      "',Langu='" +
      this.lng +
      "')?&$expand=ZDD_ACTIVITY_TBLSet";
    return this.http.get(url);
  }

  postAttachment(returnId, dId, file, obj) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(RetGuid='" +
      returnId +
      "',Flag='N',Dotyp='" +
      dId +
      "',SchGuid='',Srno=1,Doguid='',AttBy='TP',OutletRef='')/AttachMedSet ";

    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: encodeURI(file),
    };
    return this.http.post(url, obj, {
      headers,
    });
  }

  postDetails(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    let url =
      this.baseUrl + "sap/opu/odata/sap/Z_DEREGISTRATION_NEW_SRV/DRG_HeaderSet";
    return this.http.post(url, obj, { headers });
  }
}
