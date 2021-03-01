import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiConstants } from 'src/app/constants/loss-of-excise-goods.constants';

@Injectable({
  providedIn: 'root',
})
export class LossExciseGoodsService {
  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'A';
    } else {
      this.lang = 'E';
    }
  }

  getInitialData() {
    const url = `${apiConstants.getInitialData}/WISet(Lang='${
      this.lang
    }',Officer='',Gpart='${localStorage.getItem('gpart')}',Euser='${
      localStorage.AuthEuser ? localStorage.getItem('AuthEuser') : ''
    }',Flag='L',Fbguid='${
      localStorage.AuthFbguid ? localStorage.getItem('AuthFbguid') : ''
    }')?&$expand=STATUSSet,WI_DTLSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getFormData(formGuid = '', movDoc = '') {
    const url = `${
      apiConstants.getFormData
    }/ETLG_HDRSet(FormGuid='${formGuid}',Fbnumx='',PortalUsrx='',EmoveDoc='${movDoc}',MmPri='',Langx='${
      this.lang
    }',Officerx='',Euser='${
      localStorage.AuthEuser ? localStorage.getItem('AuthEuser') : ''
    }',Gpartx='${localStorage.getItem(
      'gpart'
    )}')?&$expand=ETLG_ITMSet,NOTESSet,ATTACHSet,ETLG_WNSet,ETLG_TCSet,ETLG_PTSet,ETLG_MOVSet,ETLG_PERDSet,ETLG_PTMOVSet,ETLG_TCMOVSet,ETLG_TCPRDSet,ETLG_UOMSet,ETLG_UOM_SSet,ETLG_PDPRDSet,ETLG_ETTBSet&&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  uploadFile(data, file) {
    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'X',
      Slug: data.name,
    };

    const url = `${apiConstants.attachment}/AttachSet(OutletRef='',RetGuid='${data.returnId}',Flag='N',Dotyp='LGA2',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language="${data.lang}"`;

    return this.http.post(this.baseUrl + url, file, {
      headers,
    });
  }

  deleteFile(doguid) {
    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'X',
    };

    const url = `${apiConstants.attachment}/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='LGA2',SchGuid='',Srno=1,Doguid='${doguid}',AttBy='TP')/$value`;

    return this.http.delete(this.baseUrl + url, {
      headers,
    });
  }

  submitForm(data) {
    const url = `${apiConstants.getFormData}/ETLG_HDRSet`;

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
    const url = `${apiConstants.formDl}/cover_formSet(Fbnum='${fbnum}',Utype='')/$value`;

    return this.http.get(this.baseUrl + url, { responseType: 'blob' });
  }
}
