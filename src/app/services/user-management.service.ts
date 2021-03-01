import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import {
  ApiConstants,
} from "src/app/constants/userManagement.constants";
import { toGregorian } from "hijri-converter";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class UserManagementService {
  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") == "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  // Validate Tin and DOB before usermanagement add user submit
  ValidateTinAndDob(idType, idNum, TaxpDob) {
    const url = `${ApiConstants.validateIdAndDob}/taxpayer_nameSet(Tin='',Idtype='${idType}',Idnum='${idNum}',Country='',PassExpDt='${TaxpDob}',TaxpDob='${TaxpDob}')`;
    const headers = {
      ichannel: "",
    };
    return this.http.get(this.baseUrl + url, { headers });
  }

  authorizeData(activitiesSet, userData) {
    const url = `${ApiConstants.getTaskAllocByTaxType}/HeaderDetailSet`;
    const data = {
      Taxtp: userData["Taxtp"],
      BranchNo: userData["BranchNo"],
      BranchNm: userData["BranchNm"],
      AuthusrTin: userData["AuthusrTin"],
      AuthusrName: userData["AuthusrName"],
      TaxpayerTin: localStorage["gpart"],
      UpdateFlag: userData["AuthSeqNo"] === "" ? "" : "X",
      EmailId: "",
      ActivitiesSet: activitiesSet,
    };
    if (userData["AuthSeqNo"] !== "") {
      data["AuthSeqNo"] = userData["AuthSeqNo"];
    }
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    return this.http.post(this.baseUrl + url, data, { headers });
  }

  getInitialData(userName) {

    let uid = `${userName}`;
    const url = `${ApiConstants.getUserDetails}/HeaderSet(UserNo='${uid}',Addrnumber='',Fbguid='${localStorage["fn"]}',Euser='${localStorage["eu"]}',Login='',Lang='${this.lang}')?$expand=UserSet,UserBranchSet,IdSet`;
    return this.http.get(this.baseUrl + url);
  }

  getDeletedUsers() {
    let url = `${ApiConstants.getDeletedUsers}/DeletedUserSet?$filter=UserNo eq '${localStorage["gpart"]}'`;
    return this.http.get(this.baseUrl + url);
  }

  addDeletedUser(authUsrno, idType, idNumber, mobileno, name) {
    //Url
    let url = `${ApiConstants.getDeletedUsers}/HeaderSet`;
    let id = localStorage["gpart"];
    //Data
    let data = {
      Login: "X",
      AuthUsrno: `${authUsrno}`,
      IdType: `${idType}`,
      IdNumber: `${idNumber}`,
      Lang: this.lang,
      Name: `${name}`,
      Mobileno: `${mobileno}`,
      UserNo: `${id}`,
    };
    // Declare hearder
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    return this.http.post(this.baseUrl + url, data, { headers });
  }

  postUserDetails(postData, uid) {
    let dob_temp: number;
    if (postData["dob"]["calendarName"] === "Islamic") {
      const gre_date = toGregorian(
        postData["dob"]["calendarStart"]["year"],
        postData["dob"]["calendarStart"]["month"],
        postData["dob"]["calendarStart"]["day"]
      );
      dob_temp = moment(
        new Date(gre_date["gy"], gre_date["gm"] - 1, gre_date["gd"])
      ).valueOf();
    } else {
      dob_temp = moment(
        new Date(
          postData["dob"]["calendarStart"]["year"],
          postData["dob"]["calendarStart"]["month"] - 1,
          postData["dob"]["calendarStart"]["day"]
        )
      ).valueOf();
    }

    const data = {
      Login: "",
      AuthUsrno: "",
      IdType: postData["idType"],
      IdNumber: postData["idNo"],
      Name: postData["name"],
      Dob: `/Date(${dob_temp})/`,
      Emailid: postData["email"],
      Mobileno: postData["phone"],
      Branch: postData["branchName"],
      BranchNo: postData["branchNo"],
      UserNo: `${uid}`,
      Lang: this.lang,
    };
    // const data = {"Login":"","AuthUsrno":"","IdType":"ZTPAU3","IdNumber":"473668946387463","Name":"ddddddd","Dob": "/Date(1594012913000)/","Emailid":"jfjfjfjf@gmai.com","Mobileno":"00966547474747","Branch":"Testb","BranchNo":"000","UserNo":"3300052872","Lang":"EN"}

    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    const url = `${ApiConstants.getUserDetails}/HeaderSet`;
    return this.http.post(this.baseUrl + url, data, { headers });
  }

  // Task allocation get services by tax type. Thiss does not give objectioncb etx
  getDetailsByBranch(taxType) {

    const url = `${
      ApiConstants.getTaskAllocByTaxType
    }/HeaderDetailSet(AuthSeqNo='',AuthusrTin='',TaxpayerTin='${
      localStorage["gpart"]
    }',Taxtp='${taxType}',Lang='${
      localStorage["lang"] === "ar" ? "AR" : "EN"
    }')?$expand=ReturnsSet%2CServicesSet`;
    return this.http.get(this.baseUrl + url);
  }

  getFbgUid() {
    // const url=`${ApiConstants.getUrlForFbgUid}/EP_USERSet(Gpart=${localStorage["gpart"]})`
    // return this.http.get(this.baseUrl+url)

    // const url = `https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='${localStorage["gpart"]}')`
    const url = `${ApiConstants.getUrlForFbgUid}/EP_USERSet(Gpart='${localStorage["gpart"]}')`
    //3300052872
    return this.http.get(this.baseUrl + url)
  }

  getFbgUid2(euser1,euser2,euser3, euser4, euser5) {
    const url = `${
      ApiConstants.getUrlForFbgUid2
    }/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='${
      localStorage.getItem("lang") == "ar" ? "AR" : "EN"
    }',Euser1='${euser1}',Euser2='${euser2}',Euser3='${euser3}',Euser4='${euser4}',Euser5='${euser5}',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet`;

    return this.http.get(this.baseUrl + url);
  }

  getEditUserApi(userData, taxtype) {
    const url = `${
      ApiConstants.getTaskAllocByTaxType
    }/HeaderDetailSet(AuthSeqNo='${userData["AuthSeqNo"]}',AuthusrTin='${
      userData["AuthUsrno"]
    }',TaxpayerTin='${localStorage["gpart"]}',Taxtp='${
      taxtype["Taxtp"]
    }',Lang='${
      localStorage.getItem("lang") == "ar" ? "AR" : "EN"
    }')?$expand=ReturnsSet%2CServicesSet`;
    return this.http.get(this.baseUrl + url);
  }

  deActivateUser(authId, IdNumber, emailid, userNo, branchNo) {
    const data = {
      UserNo: userNo,
      AuthUsrno: authId,
      Emailid: emailid,
      BranchNo: branchNo,
      DeleteUsr: "X",
      IdNumber: IdNumber,
    };
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    const url = `${ApiConstants.getUserDetails}/HeaderSet(UserNo='',Addrnumber='',Fbguid='',Euser='',Login='',Lang='${
      localStorage.getItem("lang") == "ar" ? "AR" : "EN"
    }')`;
    return this.http.put(this.baseUrl + url, data, { headers });
  }

  // Task allocation: Get list of users and dropdown
  // This api get both authuserid and authseq id when provided with fbguid
  // Row number 9 api
  getTaskAllocAllUsers(fbguid, euser) {
    const data = {
      Addrnumber: "",
      Fbguid: fbguid,
      Euser: euser,
      Login: "",
      Lang: "EN",
    };
    const url = `${
      ApiConstants.getTaskAllocByTaxType
    }/HeaderSet(UserNo='',Addrnumber='',Fbguid='${data["Fbguid"]}',Euser='${
      data["Euser"]
    }',Login='',Lang='${
      localStorage.getItem("lang") == "ar" ? "AR" : "EN"
    }')?$expand=UserSet,AllBranchesSet,TaxTypSet`;

    // const url = `${ApiConstants.getTaskAllocByTaxType}/HeaderSet(UserNo='',Addrnumber='',Fbguid='005056B1365C1EDB838BCEDAD0D237D9',Euser='00000001000000097902',Login='',Lang='EN')?$expand=UserSet,AllBranchesSet,TaxTypSet`

    return this.http.get(this.baseUrl + url);
  }

  // Update user API
  updateUser(postUserData){
    const url = `${ApiConstants.getUserDetails}/HeaderSet(UserNo='',Addrnumber='',Fbguid='',Euser='',Login='',Lang='${localStorage['lang'] == 'ar' ? 'AR' : 'EN' }')`
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    return this.http.put(this.baseUrl + url, postUserData, { headers });
  }
}
