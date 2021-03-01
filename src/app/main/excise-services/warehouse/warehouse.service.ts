import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiconstants } from 'src/app/constants/apiConstants';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  /* cancel warehouse service starts */
  getWarehouseList(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_CNEW_WHLT_SRV/NWHISet(Fbnum='',Officer='',Gpart='" + GPartz + "',UserTyp='TP',Euser='',Lang='" + Language + "',Fbguid='')?&$expand=ACT_WHLISTSet,DRAFT_WHLISTSet,UserListSet&$format=json";
    return this.http.get(url);
  }

  getWholeData(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_CNEW_UH_SRV/UI_HDRSet(Formproc='ZTAX_WH_CANCEL',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='E0001',TxnTp='CRE_CNEW')?&$expand=UserListSet,UI_BTNSet";
    return this.http.get(url);
  }
  getWholeData1(GPartz, Language,Fbnum,status) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_CNEW_UH_SRV/UI_HDRSet(Formproc='ZTAX_WH_CANCEL',Fbnum='"+Fbnum+"',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='"+status+"',TxnTp='CRE_CNEW')?&$expand=UserListSet,UI_BTNSet";
    return this.http.get(url);
  }

  validateWarehouseNo(GPartz, Language, WhNo,FbNumber) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_CNEW_TP_M_SRV/CNEW_HDRSet(Fbguid='',Fbnumz='" + FbNumber + "',PortalUsrz='',Langz='" + Language + "',Officerz='',Gpartz='" + GPartz + "',UserTypz='',Euser='',TxnTpz='',Whno='" + WhNo + "')?&$expand=ATTACHSet,NOTESSet&$format=json";
    return this.http.get(url);
  }

  validateIdNo(IdType, IdNo, CurrentDate) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='" + IdType + "',Idnum='" + IdNo + "',Country='',PassExpDt='" + CurrentDate + "',TaxpDob='')";
    return this.http.get(url);
  }

  saveWarehouseDetails(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_CNEW_TP_M_SRV/CNEW_HDRSet";
    return this.http.post(url, resData, { headers });
  }
  /* cancel warehouse service ends */

  /* modify warehouse service starts */
  getWarehouseDetails(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ITEH_SAVEAPP_CHGREN_SRV/HDRSet(Lang='" + Language + "',Gpart='" + GPartz + "',Euser='',Fbguid='',TxnTp='CHG_RGEW')?&$expand=ITM_SAVEDSet";
    return this.http.get(url);
  }

  getWarehouseLicense(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ITEH_SAVEAPP_SRV/WHLISTSet?$filter=Euser eq '' and Fbguid eq '' and Fbnum eq '' and Gpart eq '" + GPartz + "' and Officer eq '' and Operation eq '' and PortalUsr eq '' and TxnTp eq 'CHG_RGEW' and Lang eq '" + Language + "' ";
    return this.http.get(url);
  }

  fetchWarehouseNoDetails(GPartz, Language, WhNo) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHCHG_NW_SRV/WH_HEADERSET(Fbguid='',Fbnumz='',PortalUsrz='',Langz='" + Language + "',Operationz='',Officerz='',Gpartz='" + GPartz + "',Euser='',TxnTpz='',Whno='" + WhNo + "')?&$expand=ATTACHSet,NOTESSet,WH_ADDRESSSet,WH_BANKGTSet,WH_CONTACT_DTLSet,WH_CONTACTPSet,WH_EREGGOODSSet,WH_EREGGOODSSet,WH_GOODSDTLSet,AddQuesSet&$format=json";
    return this.http.get(url);
  }

  validateWarehouseNoDetails(GPartz, Language, Fbguid, Fbnum) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHCHG_NW_SRV/WH_HEADERSET(Fbguid='" + Fbguid + "',Fbnumz='" + Fbnum + "',PortalUsrz='',Langz='" + Language + "',Operationz='',Officerz='',Gpartz='" + GPartz + "',Euser='',TxnTpz='',Whno='')?&$expand=ATTACHSet,NOTESSet,WH_ADDRESSSet,WH_BANKGTSet,WH_CONTACT_DTLSet,WH_CONTACTPSet,WH_EREGGOODSSet,WH_EREGGOODSSet,WH_GOODSDTLSet,AddQuesSet&$format=json";
    return this.http.get(url);
  }

  getWarehouseDropDownList(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHFH_SRV/WHNH_HDRSet(Fbtypz='',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='E0008',TxnTp='')?&$expand=BTNSet,DropGoodsSet,districtSet,citySet,UserListSet,GDTAXRATESet,UnitMSet,COUNTRYSet,TITLESet,ERGD_VALIDSet";
    return this.http.get(url);
  }

  getBankDetails(GPartz, Language, WhNo) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHOLD_DATA_NW_SRV/WH_HEADERSET(Fbguid='',Fbnumz='',PortalUsrz='',Langz='" + Language + "',Operationz='',Officerz='',Gpartz='" + GPartz + "',Euser='',TxnTpz='CHG_RGEW',Whno='" + WhNo + "',Statusz='E0008',ChgWhBg='R',ChgWhDm='',ChgWhId='',ChgWhMi='',ChgWhOi='',ChgWhPrd='')?&$expand=WH_ADDRESSSet,WH_BANKGTSet,WH_CONTACT_DTLSet,WH_CONTACTPSet,WH_EREGGOODSSet,WH_GOODSDTLSet&$format=json";
    return this.http.get(url);
  }

  modifyWarehouseDetails(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHCHG_NW_SRV/WH_HEADERSET";
    return this.http.post(url, resData, { headers });
  }
  /* modify warehouse service ends */

  /* register warehouse service starts */
  getDraftedWHInfo(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ITEH_SAVEAPP_SRV/HDRSet(Lang='" + Language + "',Gpart='" + GPartz + "',Euser='',Fbguid='')?&$expand=ITM_SAVEDSet&$format=json";
    return this.http.get(url);
  }

  getWHInformation(GPartz, Language, Fbguid, Fbnum) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHNW_SRV/WH_HEADERSET(Fbguid='" + Fbguid + "',Fbnumz='" + Fbnum + "',PortalUsrz='',Langz='" + Language + "',Operationz='',Officerz='',Gpartz='" + GPartz + "',Euser='',TxnTpz='CRE_RGEW')?&$expand=ATTACHSet,NOTESSet,WH_ADDRESSSet,WH_BANKGTSet,WH_CONTACT_DTLSet,WH_CONTACTPSet,WH_EREGGOODSSet,WH_EREGGOODSSet,WH_GOODSDTLSet,AddQuesSet&$format=json";
    return this.http.get(url);
  }

  getWHInformation2(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHFH_SRV/WHNH_HDRSet(Fbtypz='',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='E0008',TxnTp='CRE_RGEW')?&$expand=BTNSet,DropGoodsSet,districtSet,citySet,UserListSet,GDTAXRATESet,UnitMSet,COUNTRYSet,TITLESet,ERGD_VALIDSet&$format=json";
    return this.http.get(url);
  }

  getWHIDOwnerInfo(IdType, IdNo, CurrentDate) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='" + IdType + "',Idnum='" + IdNo + "',Country='',PassExpDt='" + CurrentDate + "',TaxpDob='')";
    return this.http.get(url);
  }

  getWHIDManagerInfo(IdType, IdNo, CurrentDate) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='" + IdType + "',Idnum='" + IdNo + "',Country='',PassExpDt='" + CurrentDate + "',TaxpDob='')";
    return this.http.get(url);
  }

  getWHIDDeclarationInfo(IdType, IdNo, CurrentDate) {
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='" + IdType + "',Idnum='" + IdNo + "',Country='',PassExpDt='" + CurrentDate + "',TaxpDob='')";
    return this.http.get(url);
  }

  saveWHAttachmentOwnerDetails(ReturnId, DocType, FileName, FormData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: FileName,
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(OutletRef='',RetGuid='" + ReturnId + "',Flag='N',Dotyp='" + DocType + "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, FormData, { headers });
  }

  saveWHAttachmentDimensionsDetails(ReturnId, DocType, FileName, FormData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: FileName,
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(OutletRef='',RetGuid='" + ReturnId + "',Flag='N',Dotyp='" + DocType + "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, FormData, { headers });
  }

  saveWHDetails(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHNW_SRV/WH_HEADERSET";
    return this.http.post(url, resData, { headers });
  }

  commonAttachmentDetails(ReturnId, DocType, FileName, FormData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      Slug: FileName,
    };
    let url = this.baseUrl + apiconstants.Attachment + "/AttachSet(OutletRef='',RetGuid='" + ReturnId + "',Flag='N',Dotyp='" + DocType + "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, FormData, { headers });
  }
  /* register warehouse service ends */

  /* display warehouse service starts */
  warehouseDetailsListInfo(Gpartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_INDRT_TDWI_SRV/WISet(TaxType='',Lang='" + Language + "',Gpart='" + Gpartz + "',UserTyp='',Euser='',Flag='W',Fbguid='')?&$expand=stutusSet,WI_TASKSet&$format=json";
    return this.http.get(url);
  }

  warehouseDraftInfo(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ITEH_SAVEAPP_SRV/HDRSet(Lang='" + Language + "',Gpart='" + GPartz + "',Euser='',Fbguid='')?&$expand=ITM_SAVEDSet";
    return this.http.get(url);
  }

  warehouseDetailsInfo(Gpartz, Language, Fbguid, Fbnum, Euser) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHNW_SRV/WH_HEADERSET(Fbguid='" + Fbguid + "',Fbnumz='" + Fbnum + "',PortalUsrz='',Langz='" + Language + "',Operationz='',Officerz='',Gpartz='" + Gpartz + "',Euser='" + Euser + "',TxnTpz='CRE_RGEW')?&$expand=ATTACHSet,NOTESSet,WH_ADDRESSSet,WH_BANKGTSet,WH_CONTACT_DTLSet,WH_CONTACTPSet,WH_EREGGOODSSet,WH_EREGGOODSSet,WH_GOODSDTLSet,AddQuesSet&$format=json";
    return this.http.get(url);
  }

  warehouseDropdownInfo(Gpartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHFH_SRV/WHNH_HDRSet(Fbtypz='',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + Gpartz + "',Status='E0046',TxnTp='CRE_RGEW')?&$expand=BTNSet,DropGoodsSet,districtSet,citySet,UserListSet,GDTAXRATESet,UnitMSet,COUNTRYSet,TITLESet,ERGD_VALIDSet";
    return this.http.get(url);
  }
  /* display warehouse service ends */

  /* request reactivation service starts */
  revocationView(Gpartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WH_REVOC_SRV/HeaderSet(Fbguid='',Fbnumz='',Langz='" + Language + "',Officerz='',Gpartz='" + Gpartz + "',Euser='')?&$expand=addressSet,ATTACHSet,NOTESSet,WHLISTSet&$format=json";
    return this.http.get(url);
  }

  revocationUISet(Gpartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WH_REVOC_UH_SRV_01/UI_HDRSet(Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + Gpartz + "',Status='E0008',TxnTp='CRE_ETWR',Formproc='')?&$expand=UI_BTNSet,UserListSet";
    return this.http.get(url);
  }

  revocationListSet(Whno) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_LISTDATA_REVOC_SRV/HeaderSet(Whno='" + Whno + "',Fbnumz='',Statusz='E0008')?&$expand=addressSet,NOTESSet&$format=json";
    return this.http.get(url);
  }

  saveRevocationDataSet(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WH_REVOC_SRV/HeaderSet";
    return this.http.post(url, resData, { headers });
  }
  /* request reactivation service ends */

  /* Renewal warehouse service starts */
  RenewalWarehouseDetails(resData) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHRNW_NW_SRV/WH_HEADERSET";
    return this.http.post(url, resData, { headers });
  }
  getCrno(crno) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHNW_SRV/OwnDetSet(WoCrNo='" + crno + "',WoTin='')&$format=json";
    return this.http.get(url);
  }
  getWHInformation3(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ITEH_SAVEAPP_CHGREN_SRV/HDRSet(Lang='" + Language + "',Gpart='" + GPartz + "',Euser='',Fbguid='',TxnTp='REN_RGEW')?&$expand=ITM_SAVEDSet&$format=json";
    return this.http.get(url);
  }
  getWHInformation4(GPartz, Language, whno, Fbguid) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHRNW_NW_SRV/WH_HEADERSET(Fbguid='" + Fbguid + "',Fbnumz='',PortalUsrz='',Langz='" + Language + "',Operationz='',Officerz='',Gpartz='" + GPartz + "',Euser='',TxnTpz='',Whno='" + whno + "')?&$expand=ATTACHSet,NOTESSet,WH_ADDRESSSet,WH_BANKGTSet,WH_CONTACT_DTLSet,WH_CONTACTPSet,WH_EREGGOODSSet,WH_EREGGOODSSet,WH_GOODSDTLSet,AddQuesSet&$format=json";
    return this.http.get(url);
  }
  getWHInformation5(GPartz, Language, status) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_WHFH_SRV/WHNH_HDRSet(Fbtypz='',Fbnum='',Lang='" + Language + "',Officer='',Gpart='" + GPartz + "',Status='" + status + "',TxnTp='')?&$expand=BTNSet,DropGoodsSet,districtSet,citySet,UserListSet,GDTAXRATESet,UnitMSet,COUNTRYSet,TITLESet,ERGD_VALIDSet&$format=json";
    return this.http.get(url);
  }
  getWHInformationfresh(GPartz, Language) {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_ITEH_SAVEAPP_SRV/WHLISTSet?$filter=Euser eq '' and Fbguid eq '' and Fbnum eq '' and Gpart eq '" + GPartz + "' and Officer eq '' and Operation eq '' and PortalUsr eq '' and TxnTp eq 'REN_RGEW' and Lang eq '" + Language + "' ";
    return this.http.get(url);
  }
  downloadfilledform(fbnum) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='" + fbnum + "')/$value";
    return this.http.get(url, requestOptions);
  }
  acknowledgementform(fbnum) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/Z_GET_COVERFORM_SRV/cover_formSet(Fbnum='" + fbnum + "',Utype='')/$value";
    return this.http.get(url, requestOptions);
  }
  deletefiledocument(RetGuid, Doguid, DocType) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X"
    };
    return this.http.delete(this.baseUrl + "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachMedSet(OutletRef='',RetGuid='" + RetGuid + "',Flag='N',Dotyp='" + DocType + "',SchGuid='',Srno=1,Doguid='" + Doguid + "',AttBy='TP')/$value", { headers });
  }
  downloadAttachments(Doguid, Dotyp) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    let url = this.baseUrl + "sap/opu/odata/sap/zdgw_attach_download_srv/attachSet(Doguid='" + Doguid + "',Dotyp='" + Dotyp + "')/$value";
    return this.http.get(url, requestOptions);
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
  }  /* Renewal warehouse service ends */

}
