import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiConstants } from "../constants/CommitmentConstants";

@Injectable({
  providedIn: "root",
})
export class CommitmentsService {
  lang: string;
  baseUrl = environment.url;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "A";
    } else {
      this.lang = "E";
    }
  }

  getCalendarData(fromDate, toDate) {
    const url = `${
      ApiConstants.getCalendarData
    }?$filter=Gpart eq '${localStorage.getItem(
      "gpart"
    )}' and FromDt eq datetime'${fromDate}' and ToDt eq datetime'${toDate}' and Language eq '${
      this.lang
    }'`;
    return this.http.get(this.baseUrl + url);
  }

  getBillsData() {
    const url = `${
      ApiConstants.getBillsData
    }?$filter=Fbguid eq '${localStorage.getItem(
      "fbguid"
    )}' and Euser eq '${localStorage.getItem("euser")}'`;
    return this.http.get(this.baseUrl + url);
  }

  getEncryptedTins() {
    const url = `${
      ApiConstants.getEncryptedTins
    }/EP_USERSet(Gpart='${localStorage.getItem("gpart")}')`;
    return this.http.get(this.baseUrl + url);
  }

  getDashboardData(euser1, euser2, euser3, euser4, euser5) {
    const url = `${ApiConstants.getDashboardData}/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='EN',Euser1='${euser1}',Euser2='${euser2}',Euser3='${euser3}',Euser4='${euser4}',Euser5='${euser5}',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet`;
    return this.http.get(this.baseUrl + url);
  }

  getUnsubmittedReturn() {
    const url = `${
      ApiConstants.getUnsubmittedReturn
    }UnSubmittedReturnSet?$filter=Langz eq '${
      this.lang
    }' and Gpartz eq '${localStorage.getItem("gpart")}'`;

    return this.http.get(this.baseUrl + url);
  }
}
