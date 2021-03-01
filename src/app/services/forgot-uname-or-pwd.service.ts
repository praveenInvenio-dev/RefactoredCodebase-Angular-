import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ForgotUNameOrPwdService {
  getTins(email: any) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_GET_TIN_DATA_SRV/HeaderSet?$filter=Email eq '"+email+"'&$format=json";
    return this.http.get(url);
  }

  lang: string;
  baseUrl = environment.url;
  date = moment().format('YYYY-MM-DDTHH:mm:ss');
  AType = 1;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }

  generateOTP(tin) {
    this.getLanguage();
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet(Tin='" + tin + "',EmailId='',TpType='',MobileNo='',SubType='',Idnumber='',Otp='',NewPwd='',RdBt='P',Dob=datetime'" + this.date + "',Langu='" + this.lang + "')?$format=json";
    return this.http.get(url);
  }
  getLanguage() {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }
  getData() {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_PUSR_SIGNUP_SRV/signup_headerSet?filter=" + this.AType + "&$format=json";
    return this.http.get(url);
  }
  getUserDetails(userType, userId) {
    this.getLanguage();
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet(Tin='',EmailId='',TpType='" + userType + "',MobileNo='',SubType='ZS0001',Idnumber='" + userId + "',Otp='',NewPwd='',RdBt='U',Dob=datetime'" + this.date + "',Langu='" + this.lang + "')?$format=json";
    return this.http.get(url);
  }
  validateOTP(otpObj: any) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    // let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet?$format=json";
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet";
    return this.http.post(url, otpObj, { headers });
  }
  createPWD(createPWDObj: any) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    // let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet?$format=json ";
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet";
    return this.http.post(url, createPWDObj, { headers });
  }
  postUserDetails(userobj: any) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    // let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet?$format=json ";//?$format=json
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_FRGT_USRNM_PWD_SRV/HeaderSet";//?$format=json
    return this.http.post(url, userobj, { headers });
  }

  changePWD(changePWDObj:any) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/ChangePasswordSet(Email='" +changePWDObj['Email']+"', PasswordOld='" +changePWDObj['PasswordOld']+"', PasswordNew='" +changePWDObj['PasswordNew']+"', Partner='" +changePWDObj['Partner']+"',PasswordConf='" +changePWDObj['PasswordConf']+"' ?$format=json";
    return this.http.get(url);
  }

  updatePWD(changePWDObj:any) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/ChangePasswordSet(Email='" +changePWDObj['Email']+"',PasswordOld='" +changePWDObj['PasswordOld']+"',PasswordNew='" +changePWDObj['PasswordNew']+"',Partner='" +changePWDObj['Partner']+"',PasswordConf='" +changePWDObj['PasswordConf']+"',Euser1='',Euser2='',Euser3='',Euser4='',Euser5='')";
    return this.http.get(url);
  }



}
