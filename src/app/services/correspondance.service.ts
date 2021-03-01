import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiConstants } from 'src/app/constants/correspondanceConstants';

@Injectable({
  providedIn: 'root',
})
export class CorrespondanceService {
  baseUrl = environment.url;
  lang: string;
  date = new Date().toISOString().split('.')[0];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'AR';
    } else {
      this.lang = 'EN';
    }
  }

  getInitialData() {
    const url = `${
      apiConstants.getInitialData
    }/HeaderSet(Gpart='${localStorage.getItem(
      'gpart'
    )}',Aud='',UserTin='',Taxtp='')`;

    return this.http.get(this.baseUrl + url);
  }

  getZakatCorresepondanceList() {
    const url = `${
      apiConstants.zakatCorrespondanceList
    }/Corr_detSet?$filter=Gpartz eq '${localStorage.getItem(
      'gpart'
    )}' and Langz eq '${
      this.lang
    }' and Usertin eq '' and Begdaz eq datetime'2007-01-01T00:00' and Enddaz eq datetime'${
      this.date
    }' and ObligFlagz eq '' and Auditor eq ''`;

    return this.http.get(this.baseUrl + url);
  }

  getZakatCorrespondanceBody(data) {
    const url = `${apiConstants.zakatCorrespondanceBody}/CorrespondanceTextSet?$filter=Cotyp eq '${data.Cotyp}' and Fbnum eq '${data.Fbnum}' and Cokey eq '${data.Cokey}' and Ltrno eq '${data.Ltrno}'and Txtdo eq '${data.Txtdo}'and Langu eq '${this.lang}'`;

    return this.http.get(this.baseUrl + url);
  }

  downloadZakatCorrespondance(data) {
    const url = `${apiConstants.downloadZakatCorrespondance}/corr_dataSet(Cokey='${data.Cokey}',Cotyp='${data.Cotyp}')/$value`;

    return this.baseUrl + url;
  }

  favoriteCorrespondance(data) {
    const postData = {
      Cotyp: data.Cotyp,
      Cokey: data.Cokey,
      Gpart: localStorage.getItem('gpart'),
      Vkont: data.Vkont,
      Begdaz: this.date,
      Enddaz: this.date,
      Zzfav: data.Zzfav === '1' ? '0' : '1',
    };

    const url = `${apiConstants.favoriteCorrespondance}/Corr_detSet`;

    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'X',
    };

    return this.http.post(this.baseUrl + url, postData, { headers });
  }

  getVatCorrespondanceList() {
    const url = `${
      apiConstants.vatCorrespondanceList
    }/Corr_detSet?$filter=Gpartz eq '${localStorage.getItem(
      'gpart'
    )}' and Langz eq '${
      this.lang
    }' and Begdaz eq datetime'2007-01-01T00:00' and Enddaz eq datetime'${
      this.date
    }' and ObligFlagz eq 'I' and Auditor eq 'null' and TaxtpFg eq 'VAT' and UserTin eq ''`;

    return this.http.get(this.baseUrl + url);
  }

  downloadVatCorrespondance(data) {
    const url = `${apiConstants.downloadVatCorrespondance}/corr_dataSet(Cokey='${data.Cokey}',Cotyp='${data.Cotyp}')/$value`;

    return this.baseUrl + url;
  }

  getEtCorrespondanceList() {
    const url = `${
      apiConstants.etCorrespondanceList
    }/Corr_detSet?$filter=Gpartz eq '${localStorage.getItem(
      'gpart'
    )}' and Langz eq '${
      this.lang
    }' and Begdaz eq datetime'2007-01-01T00:00' and Enddaz eq datetime'${
      this.date
    }' and ObligFlagz eq 'I' and Auditor eq 'null' and TaxtpFg eq 'ET' and UserTin eq ''`;

    return this.http.get(this.baseUrl + url);
  }

  downloadEtCorrespondance(data) {
    const url = `${apiConstants.downloadEtCorrespondance}/corr_dataSet(Cokey='${data.Cokey}',Cotyp='${data.Cotyp}')/$value`;

    return this.baseUrl + url;
  }

  getEpCorrespondanceList() {
    const url = `${
      apiConstants.etCorrespondanceList
    }/HEADERSet(Gpart='${localStorage.getItem('gpart')}',PortalUser='',Lang='${
      this.lang === 'AR' ? 'A' : 'E'
    }')?&$expand=CORR_LISTSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  downloadEpCorrespondance(data) {
    const url = `${apiConstants.downloadEpCorrespondance}/corr_dataSet(Cokey='${data.Cokey}',Cotyp='${data.Cotyp}')/$value`;

    return this.baseUrl + url;
  }

  downloadCorrespondance(data) {
    console.log(data);
    const url = `${apiConstants.downloadEpCorrespondance}/corr_dataSet(Cokey='${data.Cokey}',Cotyp='${data.Cotyp}')/$value`;

    return this.baseUrl + url;
  }
}
