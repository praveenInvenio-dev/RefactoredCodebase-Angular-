import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiConstants } from 'src/app/constants/VATCertificateConstants';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReprintVatCertificateService {

  baseUrl: any = environment.url;
  lang: any;
  Data: Observable<{}>;
  constructor(private http: HttpClient) {
    this.lang = (localStorage.getItem("lang") === 'ar') ? 'AR' : 'EN';
  }

  getInitialData() {
    const url = `${apiConstants.getInitalData}/HeaderSet(Tin='${localStorage.getItem('gpart')}',Langu='${this.lang}')?$expand=CoTypeSet&$format=json`;
    return this.http.get(this.baseUrl + url);
  }

  postReprintCertificate(data) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    const url = `${apiConstants.getInitalData}/HeaderSet`;
    return this.http.post(this.baseUrl + url, data, { headers });
  }

  getInitialDatafordownload() {
    const url = `${apiConstants.getInitalData}/HeaderSet(Tin='${localStorage.getItem('gpart')}',Langu='${this.lang}')?$expand=CoTypeSet&$format=json`;
    return this.http.get(this.baseUrl + url);
  }

  getDownloadCertificate(Cokey, Cotyp) {
    const url = `${apiConstants.getdownloadCertificate}/corr_dataSet(Cokey='${Cokey}',Cotyp='${Cotyp}')/$value`;
    const link = document.createElement('a');
    link.setAttribute('target', '_self');
    link.setAttribute(
      'href',
      this.baseUrl + url
    );
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
