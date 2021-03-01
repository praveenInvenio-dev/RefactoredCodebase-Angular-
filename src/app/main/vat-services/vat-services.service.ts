import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiconstants } from 'src/app/constants/apiConstants';

@Injectable({
  providedIn: 'root'
})
export class VatServicesService {

  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  /* vat deregistration service starts here */
  getWholeData(GPartz, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_NW_DREG_SRV/HeaderSet(FormGuid='',Fbnumx='',Gpartx='"+ GPartz +"',Langx='"+ Language +"',Officerx='',PortalUsrx='',Euser='',ReviewFg=false)?$expand=AddressSet,AttdetSet,NotesSet,QuesListSet";
    return this.http.get(url);
  }

  getReasonsData(Language, TxnTyp) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_NW_DREG_SRV/GetReasonSet?$filter=TxnTp eq '"+ TxnTyp +"' and Lang eq '"+ Language +"' ";
    return this.http.get(url);
  }

  getICRDate(GPartz, ReqTyp, UserTyp) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_NW_DREG_SRV/GetLastICRDtSet?$filter=Gpartx eq '"+ GPartz +"' and UserTypx eq '"+ UserTyp +"' and TxnTpx eq 'ZVAT_SUSP' and Reqtp eq '"+ ReqTyp +"' ";
    return this.http.get(url);
  }

  getSuspensionDetails(GPartz, StartDate, EndDate) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_NW_DREG_SRV/GetSuspensionDetailSet?$filter=Gpart eq '"+ GPartz +"' and StartDate eq datetime'"+ StartDate +"' and EndDate eq datetime'"+ EndDate +"' ";
    return this.http.get(url);
  }

  getAttachmentDropDownDetails(GPartz, Language, TxnTyp, Status) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VDRUH_SRV/VR_UI_HDRSet(Fbnum='',Lang='"+ Language +"',Officer='',Gpart='"+ GPartz +"',Status='"+ Status +"',TxnTp='"+ TxnTyp +"',Formproc='ZTAX_VT_REG')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet";
    return this.http.get(url);
  }

  postAttachmentDetails(ReturnId, DocType, FileName, FormData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: FileName,
    };
    let url = this.baseUrl + apiconstants.Attachment + "/AttachSet(OutletRef='',RetGuid='" + ReturnId + "',Flag='N',Dotyp='" + DocType + "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, FormData, {headers});
  }

  validateIdNo(IdType, IdNo, CurrentDate) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='"+ IdType +"',Idnum='"+ IdNo +"',Country='',PassExpDt='"+ CurrentDate +"',TaxpDob='')";
    return this.http.get(url);
  }

  saveVatServicesDetails(resData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_NW_DREG_SRV/HeaderSet";
    return this.http.post(url, resData, {headers});
  }

  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
      apiconstants.UserTypeValidation +
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
  downloadfilledform(fbnum) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='" + fbnum + "')/$value";
    return this.http.get(url, requestOptions);
  }
  /* vat deregistration service ends here */
  
  /* vat registration amend service starts here */
  listOfAllVatRegisterAmend(GPartz, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(TaxType='VT',AudTin='',Gpart='"+ GPartz +"',Lang='"+ Language +"',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet";
    return this.http.get(url);
  }
  
  requestCreateVRNHSET(GPartz, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_AMD_SRV/VRNHSet(Euser='',Fbguid='',Fbnumz='',Gpart='"+ GPartz +"',Langz='"+ Language +"',Officerz='',PortalUsrz='',TxnTpz='CHG_VTGR')?&$expand=ATTDETSet,NOTESSet,TABLESet,EFFDATESet,ELGBL_DOCSet,QUESLISTSet&$format=json";
    return this.http.get(url);
  }
  
  requestCreateVRUIHDRSET(GPartz, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VGR_UH_AMDDIS_SRV/VR_UI_HDRSet(Fbnum='',Lang='"+ Language +"',Officer='',Gpart='"+ GPartz +"',Status='E0001',TxnTp='CHG_VTGR',Formproc='ZTAX_VT_REG',UserTyp='')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet";
    return this.http.get(url);
  }
  requestCreateVRUIHDRSET_VAT_Group(GPart, Language,Statusz) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VGR_UH_SRV/VR_UI_HDRSet(Fbnum='',Lang='"+ Language +"',Officer='',Gpart='"+GPart+"',Status='"+Statusz+"',TxnTp='CRE_VTGR',Formproc='ZTAX_VT_REG',UserTyp='')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet";
    return this.http.get(url);
  }
  requestOneMemberGroup(GPartz, IvPartner) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_AMD_SRV/BPDTLSet(Gpart='"+ GPartz +"',Fbnum='',IvPartner='"+ IvPartner +"')";
    return this.http.get(url);
  }

  validateIdNoTaxpayer(IdType, IdNo, CurrentDate) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='"+ IdType +"',Idnum='"+ IdNo +"',Country='',PassExpDt='"+ CurrentDate +"',TaxpDob='')";
    return this.http.get(url);
  }

  validateIdNoTaxpayer1(gpart,IdType, IdNo, CurrentDate) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='"+gpart+"',Idtype='"+ IdType +"',Idnum='"+ IdNo +"',Country='',PassExpDt='"+ CurrentDate +"',TaxpDob='')";
    return this.http.get(url);
  }
  saveDateVatAmendRegisterDetails(resData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_AMD_SRV/VRNHSet";
    return this.http.post(url, resData, {headers});
  }

  saveVatAmendRegisterDetails(resData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_AMD_SRV/VRNHSet";
    return this.http.post(url, resData, {headers});
  }
  /* vat registration amend service ends here */

  /* vat group registration service starts here */
  getVatGroupWholeData(GPart, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(TaxType='VT',AudTin='',Gpart='"+ GPart +"',Lang='"+ Language +"',UserTin='')?$expand=ASSLISTSet,STATUSSet,REQTYPSet&$format=json";
    return this.http.get(url);
  }
  getCreateRequestFormData(GPart, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_REG_SRV/VRNHSet(Euser='',Fbguid='',Fbnumz='',Gpart='"+ GPart +"',Langz='"+ Language +"',Officerz='',PortalUsrz='',TxnTpz='CRE_VTGR',ReviewFg=false)?&$expand=ATTDETSet,NOTESSet,TABLESet,EFFDATESet,ELGBL_DOCSet,QUESLISTSet&$format=json";
    return this.http.get(url);
  }
  getAddMemberetailsByTin(GPart, Partner) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_REG_SRV/BPDTLSet(Gpart='"+ GPart +"',Fbnum='',IvPartner='"+ Partner +"')";
    return this.http.get(url);
  }
  getGetDateInfo(GPart) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_REG_SRV/VRNHSet(TxnTpz='CRE_VTGR',ReviewFg=false,PortalUsrz='',Officerz='',Langz='EN',Gpart='"+ GPart +"',Fbnumz='',Fbguid='',Euser='00000000000000000000')";
    return this.http.get(url);
  }
  getContactData(Idtype, Idnum, date) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='"+ Idtype +"',Idnum='"+ Idnum +"',Country='',PassExpDt='',TaxpDob='')";
    return this.http.get(url);
  }
  saveVatGroupData(resData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_REG_SRV/VRNHSet";
    return this.http.post(url, resData, {headers});
  }
  /* vat group registration service ends here */
  
  /* vat eligible person display service starts here */
  getVatDisplaySRVData1(GPart, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_SRV/VTEP_HEADERSet(Fbnumz='',PortalUsrz='NSHASTRY-C@GAZT.GOV.SA',Langz='"+ Language +"',Officerz='',Gpartz='"+ GPart +"',TxnTpz='DIS_VTEP',Euser='',FormGuid='')?&$expand=VTEP_ATTSet,VTCP_ATTSet,ATTACHMENTSet,VTCPSet,NOTESet&$format=json";
    return this.http.get(url);
  }

  getVatDisplaySRVData2(GPart, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_UH_SRV/VTEP_HDRSet(Fbtypz='VTEP',Fbnum='',Lang='"+ Language +"',Officer='',Gpart='"+ GPart +"',Status='E0045',TxnTp='DIS_VTEP',Formproc='ZTAX_VT_REG')?&$expand=VTEP_BTNSet,PROVINCESet,CITYSet,ELG_CATESet,QUESLISTSet&$format=json";
    return this.http.get(url);
  }

  getVatDisplaySRVData3(Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_UH_SRV/SUPT_DOCSet?$filter=Lang eq '"+ Language +"' and EpCode eq '001'";
    return this.http.get(url);
  }
  /* vat eligible person display service ends here */

  /* Disband Vat Group Regestration Start */
  getDisbandVatDisplayData(GPart,Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(TaxType='VT',AudTin='',Gpart='"+ GPart +"',Lang='"+ Language +"',UserTin='')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet";
    return this.http.get(url);
  }
  getDisbandData(GPart,Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VAT_GRP_AMD_SRV/VRNHSet(Euser='',Fbguid='',Fbnumz='',Gpart='"+ GPart +"',Langz='"+ Language +"',Officerz='',PortalUsrz='',TxnTpz='DRG_VTGR')?&$expand=ATTDETSet,NOTESSet,TABLESet,EFFDATESet,ELGBL_DOCSet,QUESLISTSet&$format=json";
    return this.http.get(url);
  }
  getDisbandHeaderSet(GPart,Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VGR_UH_AMDDIS_SRV/VR_UI_HDRSet(Fbnum='',Lang='"+ Language +"',Officer='',Gpart='"+ GPart +"',Status='',TxnTp='DRG_VTGR',Formproc='ZTAX_VT_REG',UserTyp='')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet";
    return this.http.get(url);
  }
  /* Disband Vat Group Regestration End */

  /* vat eligible person change service starts here */
  getVatChangeZDPSRVData(GPart, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_SRV/VTEP_HEADERSet(Fbnumz='',PortalUsrz='MUDERANI-C@GAZT.GOV.SA',Langz='"+ Language +"',Officerz='',Gpartz='"+ GPart +"',TxnTpz='CHG_VTEP',Euser='',FormGuid='')?&$expand=VTEP_ATTSet,VTCP_ATTSet,ATTACHMENTSet,VTCPSet,NOTESet&$format=json";
    return this.http.get(url);
  }

  getVatChangeUHVTEPSRVData(GPart, Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_UH_SRV/VTEP_HDRSet(Fbtypz='VTEP',Fbnum='',Lang='"+ Language +"',Officer='',Gpart='"+ GPart +"',Status='E0001',TxnTp='CHG_VTEP',Formproc='ZTAX_VT_REG')?&$expand=VTEP_BTNSet,PROVINCESet,CITYSet,ELG_CATESet,QUESLISTSet&$format=json";
    return this.http.get(url);
  }

  getVatChangeUHSUPTSRVData(Language) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_UH_SRV/SUPT_DOCSet?$filter=Lang eq '"+ Language +"' and EpCode eq '001'";
    return this.http.get(url);
  }

  getVatChangeAttachSave(ReturnId, DocType, FileName, FormData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: FileName,
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(OutletRef='',RetGuid='"+ ReturnId +"',Flag='N',Dotyp='"+ DocType +"',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, FormData, {headers});
  }

  getVatChangeSave(resData) 
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_SRV/VTEP_HEADERSet";
    return this.http.post(url, resData, {headers});
  }

  getVatChangeDraftData() 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_VTEP_SRV/";
    return this.http.get(url);
  }

  getVatChangeIbanData(Iban) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/ZDP_CHECK_IBAN_SRV/HEADERSet(Iban='"+ Iban +"')";
    return this.http.get(url);
  }

  getVatChangeFbnumData(Fbnum) 
  {
    let url = this.baseUrl+"sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"+ Fbnum +"')/$value";
    return this.http.get(url);
  }
  /* vat eligible person change service ends here */

  deleteAttachment(dotyp, doguid ,usertype) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
    return this.http.delete(
      this.baseUrl +"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='"+dotyp+"',SchGuid='',Srno=1,Doguid='"+doguid+"',AttBy='"+usertype+"')/$value",
      { headers }
    );
  }
}
