import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { apiconstants } from "../constants/apiConstants";
import { Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  updateNotifications(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_TP_NOTIFICATIONS_SRV/NotifItemSet";
    return this.http.post(url, obj, { headers });
  }
  getNotifications(tinnum): Observable<any> {
    console.log("getNotifications called");
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_TP_NOTIFICATIONS_SRV/NotifItemSet?$filter=Taxpayer  eq '" +
      tinnum +
      "' and Lang eq'" +
      this.lang1 +
      "'&$format=json";
    return this.http.get(url);
  }

  getInboxNotifications(tinnum): Observable<any> {
    console.log("getNotifications called");
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_TP_NOTIFICATIONS_SRV/NotifInboxSet?$filter=Taxpayer  eq '" +
      tinnum +
      "' and Lang eq'" +
      this.lang1 +
      "'&$format=json";
    return this.http.get(url);
  }
  baseUrl = environment.url;
  lang: string;
  tin;
  lang1: string;

  private myData: any;
  public encryptedValues: any;

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

  getBills(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDP_MYBILLS_SRV/MyBillsSet?$filter=Fbguid eq ''  and Euser eq '" +
      tin +
      "'&sap-language=" +
      this.lang +
      "&$format=json";
    return this.http.get(url);
  }

  getBillReturnsCount(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/HEADERSet?$filter=Tin eq '" +
      tin +
      "'&sap-language=" +
      this.lang +
      "&$format=json";
    return this.http.get(url);
  }

  getReturnsCount(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/ICR_LISTSet?$filter=Gpart eq '" +
      tin +
      "' and Lang eq '" +
      this.lang +
      "'&$format=json";
    return this.http.get(url);
  }

  getCommittmentsUnsubmitted(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/UnSubmittedReturnSet?$filter=Langz eq '" +
      this.lang1 +
      "' and Gpartz eq '" +
      tin +
      "'&sap-language=" +
      this.lang1 +
      "&$format=json";
    return this.http.get(url);
  }

  getCommittmentsPayentsOverDue(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/PaymentOverdueSet?$filter=Langz eq '" +
      this.lang1 +
      "' and Gpartz eq '" +
      tin +
      "'&sap-language=" +
      this.lang1 +
      "&$format=json";
    return this.http.get(url);
  }

  getQickAction(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_QUICK_ACTION_SRV/HeaderSet(Lang='" +
      this.lang +
      "',Gpart='" +
      tin +
      "')?$expand=ActionItemSet,ActionItemFavSet&$format=json";
    return this.http.get(url);
  }

  postQickAction(tin, obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/Z_ANGULAR_QUICK_ACTION_SRV/HeaderSet";
    return this.http.post(url, obj, { headers });
  }

  getUserInfo(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='" +
      tin +
      "')";
    return this.http.get(url);
  }

  getDashboardData$(): Observable<any> {
    //if we already got the data, just return that
    if (this.myData) {
      return of(this.myData);
    }
    if (this.tin === null) {
      this.tin = localStorage.getItem("gpart");
    }
    return this.http
      .get(
        this.baseUrl +
          "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='1234567890')"
      )
      .pipe(
        switchMap((res) => {
          localStorage.setItem("tpType", res["d"]["UserTyp"] );
          if (res["d"]["UserTyp"] === "TA") {
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
                  "',HostName='SAPGATEWAYQA.GAZT.GOV.SA')"
              )
              .pipe(
                tap((returnedData: any) => {
                  //save the returned data so we can re-use it later without making more HTTP calls
                  this.myData = returnedData;
                  localStorage.setItem("gpart", returnedData["d"]["Bpnum"]);
                })
              );
          } else {
            this.encryptedValues = res;
            return this.http
              .get(
                this.baseUrl +
                  "sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='" +
                  this.lang +
                  "'," +
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
                  "',Fbguid='null',HostName='SAPGATEWAYQA.GAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet"
              )
              .pipe(
                tap((returnedData: any) => {
                  //save the returned data so we can re-use it later without making more HTTP calls
                  this.myData = returnedData;
                  localStorage.setItem("gpart", returnedData["d"]["Bpnum"]);
                })
              );
          }
        })
      );
  }

  getEncryptedValues(): Observable<any> {
    if (this.encryptedValues) {
      return of(this.encryptedValues);
    }
    return this.http
      .get(
        this.baseUrl +
          "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='1234567890')"
      )
      .pipe(
        tap((data: any) => {
          //save the returned data so we can re-use it later without making more HTTP calls
          this.encryptedValues = data;
        })
      );
  }

  getProfileStatus(obj) {
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/Z_TP_IDENTIFY_SRV/TP_HeaderSet(Euser1='" +
        obj.Val1 +
        "',Euser2='" +
        obj.Val2 +
        "',Euser3='" +
        obj.Val3 +
        "',Euser4='" +
        obj.Val4 +
        "',Euser5='" +
        obj.Val5 +
        "')"
    );
  }
  getRegistrationStatus(obj) {
    return this.http.get(
      this.baseUrl + "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_HeaderSet(IdType='',Id='',OtpType='',CommMobNo='',CommMobileOtp='',Euser='',Fbguid='',Gpartx='" + obj.Gpartx + "',Langx='" +
      (this.lang=="EN"?"E":"A") + "',Operationx='',PortalUsrx='" + obj.PortalUsrx +
      "',Srcidentifyx='',StepNumberx='01',Fbnumx='',Fbstax='',Fbustx='')?&$expand=Nreg_ActivitySet,Nreg_AddressSet,Nreg_ContactSet,Nreg_CpersonSet,Nreg_IdSet,Nreg_OutletSet,Nreg_ShareholderSet,Nreg_FormEdit,Nreg_BtnSet,off_notesSet,AttDetSet,Nreg_MSGSet");
  }
}
