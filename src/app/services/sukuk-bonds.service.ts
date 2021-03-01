import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "src/app/constants/sukuk-bonds-constants";

@Injectable({
  providedIn: "root",
})
export class SukukBondsService {
  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  getInitialData(year) {
    // /sap/opu/odata/SAP/ZDP_REFUND_REQ_SRV/HeaderSet
    // (Euserz='00000000000001087415',Fbguidz='005056B1365C1EDB80E04C0732A9F68B',Langz='EN',Periodkeyz='2019')?$expand=InvestmentsSet,
    // BondsSet,attachmentsSet,NotesSet,OffsetSet,ReturnMsgSet

    // Fbguid=Fbguid from portal ,Euser=euser from portal,langz=language from portal,periodkey =selected from workitem application

    const url = `${
      ApiConstants.getInitialData
    }/HeaderSet(Euserz='${localStorage.getItem(
      "euser"
    )}',Fbguidz='${localStorage.getItem("fbguid")}',Langz='${
      this.lang
    }',Periodkeyz='${year}')?$expand=InvestmentsSet,BondsSet,attachmentsSet,NotesSet,OffsetSet,ReturnMsgSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getFormTwoData(status, fbnum) {
    // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_ZREF_UH_SRV/UI_HDRSet(Fbnum='',Lang='',Operation='',Gpart='3311655726',Status='E0001',UserTyp='TP',Periodkey='',Fbtypz='ZREF',TransactionTypez='CRE_SBRF')?$expand=UI_BTNSet,BankDetSet,IDTypeSet,pri_dpSet

    // gpart=Gpart from model,status =status from model,usertype = usertype from portal,fbtypz="zref', TransactionTypez=transaction types from model

    const url = `${
      ApiConstants.getFormTwoData
    }/UI_HDRSet(Fbnum='${fbnum}',Lang='${
      this.lang
    }',Operation='',Gpart='${localStorage.getItem(
      "gpart"
    )}',Status='${status}',UserTyp='TP',Periodkey='',Fbtypz='ZREF',TransactionTypez='CRE_SBRF')?$expand=UI_BTNSet,BankDetSet,IDTypeSet,pri_dpSet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getFormFourData() {
    // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_CHECK_IBAN_SRV/HEADERSet(Iban='SA3440000000002407003381')

    // iban=entered iban by user

    const url = `${ApiConstants.getFormFourData}/HEADERSet(Iban='')&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getRefundDetails() {
    // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_ZREF_WI_SRV/HdrSet(Euser='00000000001000090051',Fbguid='005056B1365C1EEB80C9813E0FD11522')?$expand=YearSetSet,Hdr_WISet

    // Euser='euser from dashboard ',Fbguid='fbguid from dashboard'

    const url = `${
      ApiConstants.getRefundDetails
    }/HdrSet(Euser='${localStorage.getItem(
      "euser"
    )}',Fbguid='${localStorage.getItem(
      "fbguid"
    )}')?$expand=YearSetSet,Hdr_WISet&$format=json`;

    return this.http.get(this.baseUrl + url);
  }

  getYearSelection(year) {
    // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_ZREF_WI_SRV/YearSetSet(Gpart='3311655726',Persl='2019')

    // gpart =gpart from model, persl=year from chossen dropdown

    const url = `${
      ApiConstants.getYearSelection
    }/YearSetSet(Gpart='${localStorage.getItem("gpart")}',Persl='${year}')`;

    return this.http.get(this.baseUrl + url);
  }

  postDetails(data) {
    console.log(data);
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    const url = `${ApiConstants.postDetails}/HeaderSet`;
    return this.http.post(this.baseUrl + url, data, { headers });
  }

  getEncryptedTins() {
    const url = `${
      ApiConstants.getEncryptedTins
    }/EP_USERSet(Gpart='${localStorage.getItem("gpart")}')`;

    return this.http.get(this.baseUrl + url);
  }

  getDashboardData() {
    const url = `${
      ApiConstants.getDashboardData
    }/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='EN',Euser1='${localStorage.getItem(
      "euser1"
    )}',Euser2='${localStorage.getItem(
      "euser2"
    )}',Euser3='${localStorage.getItem(
      "euser3"
    )}',Euser4='${localStorage.getItem(
      "euser4"
    )}',Euser5='${localStorage.getItem(
      "euser5"
    )}',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet`;

    return this.http.get(this.baseUrl + url);
  }

  uploadFiles(formData, attType, filename, retGuid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: filename,
    };
    return this.http.post(
      this.baseUrl +
        ApiConstants.attachment +
        "/AttachSet(OutletRef='',RetGuid='" +
        retGuid +
        "',Flag='N',Dotyp='" +
        attType +
        "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
        this.lang,
      formData,
      {
        headers,
      }
    );
  }

  deleteAttachment(attType, doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
        ApiConstants.attachment +
        "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
        attType +
        "',SchGuid='',Srno=1,Doguid='" +
        doguid +
        "',AttBy='TP')/$value",
      { headers }
    );
  }

  validateIban(iban) {
    const url = `${ApiConstants.validateIban}/HEADERSet(Iban='${iban}')`;
    return this.http.get(this.baseUrl + url);
  }
}
