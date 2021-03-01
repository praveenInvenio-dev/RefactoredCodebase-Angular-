import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }
  baseUrl: string = environment.url;

  getprofileDetails() {
    let tin = localStorage.getItem("gpart");
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPFL_HEADERSet(Taxpayerz='"+ tin +
      "',Langz='" + this.lang +"',Euser='',Fbguid='null',Euser1='',Euser2='',Euser3='',Euser4='',Euser5='')?$expand=AccountSet,TPOC_DataSet&$format=json"

    return this.http.get(url);
  }

  addDelPOC(obj){
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(this.baseUrl + "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPOC_HeaderSet", obj, {
      headers,
    });

  }

  updateMobile(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    obj.Langz = this.lang;
    return this.http.post(this.baseUrl + "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPFL_HEADERSet", obj, {
      headers,
    });
  }

  updateEmail(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    obj.Langz = this.lang;
    return this.http.post(this.baseUrl + "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPFL_HEADERSet", obj, {
      headers,
    });
  }

}
