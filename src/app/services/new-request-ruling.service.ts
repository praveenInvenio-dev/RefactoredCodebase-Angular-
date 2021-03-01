import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "src/app/constants/NewRequestRulingConstant";

@Injectable({
  providedIn: "root",
})
export class NewRequestRulingService {
  baseUrl = environment.url;
  lang: string;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }

  getInitialListData() {
    //  https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(,AudTin='',Gpart='3060000044',Lang='E',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet

    const url = `${ApiConstants.getInitialListData
      }/HEADERSet(TaxType='VT',AudTin='',Gpart='${localStorage.getItem(
        "gpart"
      )}',Lang='${this.lang
      }',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }



  getFbguid(Fbnum, dbData) {
    // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPAV_M_SRV/TPAV_HDRSet(FormGuid='005056B1365C1EDB8B9A72C5C18EB08B',Fbnumx='',PortalUsrx='',Langx='E',Officerx='',Euser='00000000001000116117',Gpartx='null',Persl='',TxnTpx='CRE_TPAV')?&$expand=NOTESSet,ATTACHSet,EffPrdSet,ATT_TYPSet,ATT_TYP1Set,SECTORSet,QUESLISTSet,INDUSTRYSet&&$format=json

    const url = `${ApiConstants.getFbguid}/TPFILLSet(Euser1='${dbData['d']['Euser']}',Fbguid='undefined',Fbnum='${Fbnum}',Fbtyp='TPAV',Gpart='${localStorage.getItem('gpart')}',Lang='${this.lang}',Persl='',Status='',Dispflag='')`
    return this.http.get(this.baseUrl + url);

  }

  //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_UH_SRV/UI_HDRSet(Fbnum='',Lang='E',Officer='',Gpart='3060000044',Status='E0001',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet
  getInitialData(Fbnum, dbData, fbguidData) {
    //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_M_SRV/HeaderSet(Fbguid='005056B1365C1EEB82A9AB768249B2AF',Fbnumz='',Langz='E',Officerz='',Gpartz='',Euser='00000001000000097389')?&$expand=ATTACHSet,NOTESSet,QuesListSet&$format=json

    const url = `${ApiConstants.getInitialData
      }/HeaderSet(Fbguid='${fbguidData['d']['Fbguid']}',Fbnumz='${Fbnum}',Langz='${this.lang
      }',Officerz='',Gpartz='${localStorage.getItem(
        "gpart"
      )}',Euser='${dbData['d']['Euser']}')?&$expand=ATTACHSet,NOTESSet,QuesListSet&$format=json`;
    return this.http.get(this.baseUrl + url);
  }

  attachmentSubmit(obj, obj2, file, obj3) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: file,
    };
    return this.http.post(
      this.baseUrl +
      ApiConstants.Attachment +
      "/AttachSet(OutletRef='" +
      file.substring(0, file.lastIndexOf(".")) +
      "',RetGuid='" +
      obj +
      "',Flag='N',Dotyp='" +
      obj2 +
      "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
      this.lang,
      obj3,
      {
        headers,
      }
    );
  }

  deleteAttachment(dotyp, doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
      ApiConstants.Attachment +
      "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
      dotyp +
      "',SchGuid='',Srno=1,Doguid='" +
      doguid +
      "',AttBy='TP')/$value",
      { headers }
    );
  }

  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
      ApiConstants.UserTypeValidation +
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

  submitData(taxRulingObj) {
    taxRulingObj.Operationz = "01";
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_TPEV_M_SRV/HeaderSet",
      taxRulingObj,
      { headers }
    );
  }

  getButtonSet(url) {
    return this.http.get(this.baseUrl + url);
  }
}
