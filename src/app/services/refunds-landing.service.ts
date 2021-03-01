import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "../constants/refunds-landing.constants";

@Injectable({
  providedIn: "root",
})
export class RefundsLandingService {
  lang: string;
  baseUrl = environment.url;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  getAllSukukRefunds(euser, fbguid) {
    const url = `${ApiConstants.getAllSukukRefunds}HdrSet(Euser='${euser}',Fbguid='${fbguid}')?$expand=YearSetSet,Hdr_WISet`;
    return this.http.get(this.baseUrl + url);
  }
}
