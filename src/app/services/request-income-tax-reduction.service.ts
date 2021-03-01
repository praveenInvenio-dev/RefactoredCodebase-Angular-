import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiConstants } from 'src/app/constants/request-income-tax-reduction.constants';

@Injectable({
  providedIn: 'root',
})
export class RequestIncomeTaxReductionService {
  baseUrl = environment.url;

  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'A';
    } else {
      this.lang = 'E';
    }
  }

  getListData(userData) {
    const url = `${apiConstants.getListData}/HeaderSet(CallServ='TP03',HostName='',Zuser='${userData.Zuser}',Bpnum='',Auditor='',Lang='${this.lang}',Euser1='${userData.Euser}',Euser2='null',Euser3='null',Euser4='null',Euser5='null',Fbguid='${userData.Fbguid}')?$expand=ListSet,AuthServSet`;

    return this.http.get(this.baseUrl + url);
  }

  getFormData(fbnum = '') {
    const url = `${
      apiConstants.getFormData
    }/znotes_tp03Set(Auditorz='',Taxpayerz='${localStorage.getItem(
      'gpart'
    )}',RegIdz='',Submitz='',Savez='',Fbnumz='${fbnum}',Langz='${
      this.lang
    }',UserTin='')?$expand=payment_tp03Set,znotesSet,AttDetSet`;

    return this.http.get(this.baseUrl + url);
  }

  uploadFile(data, file) {
    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'X',
      Slug: data.name,
    };

    const url = `${apiConstants.attachment}/AttachSet(RetGuid='${data.formId}',Flag='N',Dotyp='${data.type}',SchGuid='',Srno=1,Doguid='',AttBy='TP',OutletRef='')/AttachMedSet`;

    return this.http.post(this.baseUrl + url, file, {
      headers,
    });
  }

  deleteFile(data) {
    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'X',
    };

    const url = `${apiConstants.attachment}/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='${data.type}',SchGuid='',Srno=1,Doguid='${data.doguid}',AttBy='TP')/$value`;

    return this.http.delete(this.baseUrl + url, {
      headers,
    });
  }

  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
        apiConstants.UserTypeValidation +
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

  getSubmitData() {
    const url = `${apiConstants.getFormData}/`;

    return this.http.get(this.baseUrl + url);
  }

  submitForm(data) {
    const url = `${apiConstants.getFormData}/znotes_tp03Set`;

    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'X',
    };

    return this.http.post(this.baseUrl + url, data, { headers });
  }

  downloadAck(fbnum) {
    const url = `${apiConstants.acknowledgement}/Ack_letterSet(Fbnum='${fbnum}')/$value`;

    return this.http.get(this.baseUrl + url, { responseType: 'blob' });
  }

  downloadForm(fbnum) {
    const url = `${apiConstants.formDl}/cover_formSet(Fbnum='${fbnum}')/$value`;

    return this.http.get(this.baseUrl + url, { responseType: 'blob' });
  }
}
