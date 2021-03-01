import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuditorService {
  baseUrl = environment.url;
  tin: any;
  lang: string;
  lang1: string;
  UserInfoValues: any;
  AuditorData: any;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lang1 = "A";
    } else {
      this.lang = "EN";
      this.lang1 = "E";
    }
    this.tin = localStorage.getItem("gpart");
  }

  getEuserDet() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='')";
    return this.http.get(url);
  }
  getAuditorDashboard() {
    console.log("auditor dashboard called");
    return this.http
      .get(
        this.baseUrl +
          "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='')"
      )
      .pipe(
        switchMap((res) => {
          this.UserInfoValues = res;
          return this.http
            .get(
              this.baseUrl +
                "sap/opu/odata/SAP/ZOTHERDASHBOARD_SRV/zusedetSet(User='null',Utype='Audi',Branch='null'," +
                "Euser1='" +
                res["d"].Val1 +
                "',Euser2='" +
                res["d"].Val2 +
                "',Euser3='" +
                res["d"].Val3 +
                "',Euser4='" +
                res["d"].Val4 +
                "',Euser5='" +
                res["d"].Val5 +
                "',HostName='tstdg1as1.mygazt.gov.sa')"
            )
            .pipe(
              map((returnedData: any) => {
                //save the returned data so we can re-use it later without making more HTTP calls
                this.AuditorData = returnedData;
                localStorage.setItem("gpart", returnedData["d"]["Bpnum"]);
              })
            );
        })
      );
  }

  /* Branch service starts here */
  getBranchZHDRSet(GPart) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZBRANCH_GETUPDATE_C_SRV/ZBRANCH_HDRSet?$filter=UserNo eq '" +
      GPart +
      "' and Login eq 'X' and Euser eq '' and Fbguid eq '' &sap-language=" +
      this.lang +
      "";
    return this.http.get(url);
  }

  getBranchZAUDEMPHDRSet(GPart) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/ZAUDEMP_HDRSet(UserNo='" +
      GPart +
      "',Login='X',Addrnumber='',Euser='',Fbguid='')?&$expand=ZAUDEMP_itemSet,ZDD_BRANCHSet&sap-language=" +
      this.lang +
      "";
    return this.http.get(url);
  }

  updateBranchZHDRSet(resData, GPart) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZBRANCH_GETUPDATE_C_SRV/ZBRANCH_HDRSet(UserNo='" +
      GPart +
      "',Login='X',Euser='',Fbguid='')";
    return this.http.put(url, resData, { headers });
  }

  saveBranchZHDRSet(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/ZBRANCH_GETUPDATE_C_SRV/ZBRANCH_HDRSet";
    return this.http.post(url, resData, { headers });
  }
  /* Branch service ends here */

  /* Approval-rejection services starts here */

  getWorkItemsList(AuditorTin, Language) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUD_REQUESTS_SRV/ZAUD_REQSet?$filter=AuditorTin eq '" +
      AuditorTin +
      "' and Lang eq '" +
      Language +
      "' &sap-language=" +
      this.lang +
      "";
    return this.http.get(url);
  }

  getWorkItemDetails(TaxpayerTin, AuditorTin, FrmDate, ToDate, Taxtp) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUD_APPROVAL_SRV/ZAUD_APPSet(TaxpayerTin='" +
      TaxpayerTin +
      "',AuditorTin='" +
      AuditorTin +
      "',FrmDate=datetime'" +
      FrmDate +
      "',ToDate=datetime'" +
      ToDate +
      "',Taxtp='" +
      Taxtp +
      "')?&$expand=ZAUD_APPACTVITYSet,ZTAXP_RET_YEARSet,ServicesSet&sap-language=" +
      this.lang +
      "";
    return this.http.get(url);
  }

  rejectWorkItem(resData, FrmDate, ToDate) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };

    //let url = this.baseUrl+"sap/opu/odata/SAP/ZAUD_APPROVAL_SRV/ZAUD_APPSet";
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUD_APPROVAL_SRV/ZAUD_APPSet(TaxpayerTin='" +
      resData.TaxpayerTin +
      "',AuditorTin='" +
      resData.AuditorTin +
      "',FrmDate=datetime'" +
      FrmDate +
      "',ToDate=datetime'" +
      ToDate +
      "',Taxtp='" +
      resData.Taxtp +
      "')";

    return this.http.put(url, resData, { headers });
  }
  /* Approval-rejection services Ends here */

  /* employee services starts here */
  getUserList(GPartz) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/ZAUDEMP_HDRSet(UserNo='" +
      GPartz +
      "',Login='X',Addrnumber='',Euser='',Fbguid='')?&$expand=ZAUDEMP_itemSet,ZDD_BRANCHSet";
    return this.http.get(url);
  }

  getUserDeletedList(GPartz) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/AuddelSet?$filter=UserNo eq '" +
      GPartz +
      "'";
    return this.http.get(url);
  }

  saveUserDetails(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/ZAUDEMP_HDRSet";
    return this.http.post(url, resData, { headers });
  }

  patchUserDetails(resData, GPartz) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/ZAUDEMP_HDRSet(UserNo='" +
      GPartz +
      "',Login='',Addrnumber='',Euser='',Fbguid='')";
    return this.http.put(url, resData, { headers });
  }
  /* employee services ends here */

  /* Task Allocation services starts here */

  getTaskList(GPartz) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUDEMP_TAXP_MAPPING_SRV/ZAUD_HDRSet(AuditorTin='" +
      GPartz +
      "',Bpkind='TAUD',Euser='',Fbguid='')?&$expand=ZHO_TAEMSet,ZSUBOFFICE_TAEMSet,ZAUD_TAXP_LINKEDSet,ZAUD_TAXP_S_LINKEDSet,ZAUD_TAXP_NLINKEDSet,ZAUD_BranchSet";
    return this.http.get(url);
  }

  getLinkedList() {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZAUDEMP_TAXP_MAPPING_SRV";
    return this.http.get(url);
  }
  saveLinkedList(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/ZAUDEMP_TAXP_MAPPING_SRV/ZAUD_HDRSet";
    return this.http.post(url, resData, { headers });
  }
  cancelLinkedList(audTin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUDEMP_TAXP_MAPPING_SRV/ZAUD_HDRSet(AuditorTin='" +
      audTin +
      "',Bpkind='TAUD',Euser='',Fbguid='')?&$expand=ZHO_TAEMSet,ZSUBOFFICE_TAEMSet,ZAUD_TAXP_LINKEDSet,ZAUD_TAXP_S_LINKEDSet,ZAUD_TAXP_NLINKEDSet,ZAUD_BranchSet";
    return this.http.get(url);
  }
  getDeletedLinkedList() {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZAUDEMP_TAXP_MAPPING_SRV";
    return this.http.get(url);
  }
  /* Task Allocation services end here */

  /* TaxPayer services end here */

  getEuserDetails(val1, val2, val3, val4, val5) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZOTHERDASHBOARD_SRV/zusedetSet(User='',Utype='Audi',Branch='null',Euser1='" +
      val1 +
      "',Euser2='" +
      val2 +
      "',Euser3='" +
      val3 +
      "',Euser4='" +
      val4 +
      "',Euser5='" +
      val5 +
      "',HostName='tstdg1as1.mygazt.gov.sa')";
    return this.http.get(url);
  }
  getTaxpayerActivitiesList(gpart, val) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZSEARCH_SRV/zsearchSet?$filter=FName eq '' and LName eq '' and Tin eq '' and MNum eq '' and CrNo eq '' and LicenseNo eq '' and Type eq '' and SmtpAddr eq '' and Bpkind eq 'TAUD' and Euser eq '" +
      val +
      "' and Utype eq 'Audi' and Bpno eq '" +
      gpart +
      "' and Branch eq ''";
    return this.http.get(url);
  }

  getSearchResults(data, gpart) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZSEARCH_SRV/zsearchSet?$filter=FName eq '" +
      data.FName +
      "' and LName eq '' and Tin eq '" +
      data.Tin +
      "' and MNum eq '" +
      data.MNum +
      "' and CrNo eq '' and LicenseNo eq '" +
      data.LicenseNo +
      "' and Type eq '' and SmtpAddr eq '" +
      data.SmtpAddr +
      "' and Bpkind eq 'TAUD' and Euser eq '' and Utype eq 'Audi' and Bpno eq '" +
      gpart +
      "' and Branch eq ''";
    return this.http.get(url);
  }

  getTaxpayerDetails(taxTin, AudiTin, taxtp) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZAUD_NAV_TP_DASHBPARD_SRV/ZAUD_APPSet(Taxtp='" +
      taxtp +
      "',TaxpayerTin='" +
      taxTin +
      "',AuditorTin='" +
      AudiTin +
      "',TaemTin='',Action='NAV')?&$expand=ZAUD_APPACTVITYSet,ZTAXP_RET_YEARSet,ServicesSet";
    return this.http.get(url);
  }

  manageActivity(taxtp, fbguid, val1) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet(Taxtp='" +
      taxtp +
      "',Zuser='null',Bpnum='',Auditor='',Lang='EN',Euser1='" +
      val1 +
      "',Euser2='null',Euser3='null',Euser4='null',Euser5='null',Fbguid='" +
      fbguid +
      "',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet";
    return this.http.get(url);
  }
  /* TaxPayer services end here */
}
