import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "../constants/ObjectionReviewsConstants"

@Injectable({
  providedIn: 'root'
})
export class ObjectionReviewsService {

  lang: string;
  langSingle: string;
  baseUrl = environment.url;
  showNewObjection: boolean = false;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.langSingle = "A";
    } else {
      this.lang = "EN";
      this.langSingle = "E";

    }
  }


  getAllVatReviews() {
    //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(TaxType='VT',AudTin='',Gpart='3311655996',Lang='E',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet

    const url = `${ApiConstants.getAllVatReviews}HEADERSet(TaxType='VT',AudTin='',Gpart='${localStorage.getItem('gpart')}',Lang='${this.langSingle}',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet`
    return this.http.get(this.baseUrl + url);

  }


  getInitialDataVatReview(Fbnum) {

    // /sap/opu/odata/SAP/ZDP_VAT_NW_REV_SRV/HeaderSet(FormGuid='005056B1CB171EEAB4E40B0650201DF7',Fbnumx='',Gpartx='',Langx='E',Officerx='',PortalUsrx='',Euserx='00001000000005310443',Appfg='N')?$expand=AddressSet,AttdetSet,NotesSet,QuesListSet,ReasonSet,IdDetailSet,MainReasonSet,SecurityDtl

    // 70000001700
    const url = `${ApiConstants.getInitialDataVatReview}/HeaderSet(FormGuid='',Fbnumx='${Fbnum}',Gpartx='${localStorage.getItem("gpart")}',Langx='${this.lang}',Officerx='',PortalUsrx='',Euserx='00001000000005310443',Appfg='N')?$expand=AddressSet,AttdetSet,NotesSet,QuesListSet,ReasonSet,IdDetailSet,MainReasonSet,SecurityDtl&$format=json`;

    return this.http.get(this.baseUrl + url);

    // let url =
    //   "/sap/opu/odata/SAP/ZDP_VRUH_SRV/VR_UI_HDRSet(Fbnum='',Lang='" +
    //   this.lang +
    //   "',Officer='',Gpart='" +
    //   localStorage.getItem("gpart") +
    //   "',Status='E0001',TxnTp='CRE_RGVT',Formproc='ZTAX_VT_REG')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet&$format=json";
    // return this.http.get(this.baseUrl + url);
  }




}

//   getAllSukukRefunds(euser, fbguid) {
//     const url = `${ApiConstants.getAllSukukRefunds}HdrSet(Euser='${euser}',Fbguid='${fbguid}')?$expand=YearSetSet,Hdr_WISet`;
//     return this.http.get(this.baseUrl + url);
//   }
// }
