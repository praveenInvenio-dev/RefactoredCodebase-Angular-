import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ExciseServiceService {
  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }

  // ET REG - API's - START
  getETData(gPart) {
    // return this.http.get('assets/data.json');
    // return this.http.get('assets/error.json');
    // return this.http.get('assets/rejectResponse.json');
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/ZDP_ERNW_SRV/ERNHSet(Fbguid='',Fbnumz='',PortalUsrz='',Langz='" +
        this.lang +
        "',Operationz='02',Officerz='',Gpartz='" +
        gPart +
        "',Euser='',TxnTpz='CRE_RGEX')?&$expand=ADDRESSSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,GOODTYPESSet,NOTESSet,WAREHOUSEDTLSet,CRDTLSet&$format=json"
    );
  }

  getBtnSet(gPart) {
    let url =
      "sap/opu/odata/SAP/ZDP_ERGT_SRV/ERGX_HDRSet(Fbtypz='',Fbnum='',Lang='" +
      this.lang +
      "',Officer='',Gpart='" +
      gPart +
      "',Status='E0001',TxnTp='CRE_RGEX')?&$expand=BTNSet,GDTYPESet,crddSet,ATT_CRSet&$format=json";
    return this.http.get(this.baseUrl + url);
    // return this.http.get('assets/btnSetResponse.json');
  }

  submitExciseData(exciseObj) {
    exciseObj.Operationz = "01";
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_ERNW_SRV/ERNHSet",
      exciseObj,
      { headers }
    );
    // return this.http.get('assets/data.json');
  }

  getBankLogo(val) {
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_BNKLOGO_ANG_SRV/BankLogoSet?$filter=Langz eq '" + this.lang + "' and Bnkcd eq '" + val + "'")
  }

  // ET API's - END
}
