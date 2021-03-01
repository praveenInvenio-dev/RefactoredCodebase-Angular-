import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BillsService {
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }
  baseUrl: string = environment.url;

  getBills() {
    let tin = localStorage.getItem("gpart");
    let Fbguid = "";

    let url =
      this.baseUrl +
      "/sap/opu/odata/SAP/ZDP_MYBILLS_SRV/MyBillsSet?$filter=Fbguid eq '" +
      Fbguid +
      "'and Euser eq '" +
      tin +
      "'&saml2=enabled&$format=json&sap-language=" +
      this.lang;
    // console.log('url bills ->',url);
    return this.http.get(url);
  }

  getReturns(tin) {
    let url =
      this.baseUrl +
      "/sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/ICR_LISTSet?$filter=Gpart eq '" +
      tin +
      "' and Lang eq '" +
      this.lang +
      "'&$format=json";
    // console.log('url bills ->',url);
    return this.http.get(url);
  }
}
