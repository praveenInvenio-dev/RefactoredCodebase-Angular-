import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {
  baseUrl = environment.url;
  lang: string;
  language: string;
  public ViewSubject = new BehaviorSubject<Boolean>(true);


  constructor(private http: HttpClient) { 
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.language ="A";
    } else {
      this.lang = "EN";
      this.language = "E";
    }
  }
  
  getVats(Fbnum,Gpart,Euser,Fbguid)
  {
    let url=this.baseUrl+"sap/opu/odata/SAP/ZDP_VATR_WI_SRV/ICR_HDRSet(Fbnum='',Lang='"+this.lang+"',Gpart='"+Gpart+"',Euser='"+Euser+"',Fbguid='"+Fbguid+"',UserTin='')?&$expand=ICR_LISTSet,ICR_STATUSSet&$format=json";
    return this.http.get(url);
  }
  getTaxPayerDetails(Euser,Fbguid)
  {
    let url=this.baseUrl+"sap/opu/odata/SAP/ZDP_VATR_M_SRV/HDRSet(Periodkeyz='',Fbnumz='',Langz='"+this.lang+"',Officerz='',Gpartz='',Euser='"+Euser+"',Fbguid='"+Fbguid+"')?&$expand=ADRSet,ATTACHSet,CFSet,IBANSet,NOTESSet,VATR_MSGSet,VATPERITEMSet&$format=json";
    return this.http.get(url);
  }
  getReturnDetails(Gpart,Status,TxnTp,Periodkey)
  {
    let url=this.baseUrl+"sap/opu/odata/SAP/ZDP_VATR_UH_SRV/UI_HDRSet(Fbnum='',Lang='"+this.lang+"',Operation='',Gpart='"+Gpart+"',Status='"+Status+"',TxnTp='"+TxnTp+"',Formproc='',Periodkey='"+Periodkey+"')?&$expand=IBANSet,IGRTSet,ITUDSet,UI_BTNSet,VATRSet,VTTHSet&$format=json";
    return this.http.get(url);
  }
  getIbanDetails(bankcode) {
    let url = this.baseUrl+"sap/opu/odata/sap/ZDP_BNKLOGO_ANG_SRV/BankLogoSet?$filter=Bnkcd eq '" + bankcode + "' and Langz eq '" + this.lang + "'";
    return this.http.get(url);
  }
  getPenalityDetails(obj)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url=this.baseUrl+"sap/opu/odata/SAP/ZDP_VATR_M_SRV/HDRSet";
    console.log(obj);
    return this.http.post(url,obj,{headers})
    
  }
  saveIBANAccount(ibanNumber)
  {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_CHECK_IBAN_SRV/HEADERSet(Iban='"+ibanNumber+"')");
  }
  generateSadadNumber(fbnum)
  {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_SADAD_SRV/SadadSet?$filter=Langu eq '" + this.lang + "' and Fbnum eq '"+ fbnum +"'&$format=json");
  }

  DownloadAcknowledgement(fbnum) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"+fbnum+"')/$value",requestOptions);
  }

  DownloadForm(fbnum,Utype) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_COVERFORM_SRV/cover_formSet(Fbnum='"+fbnum+"',Utype='')/$value",requestOptions)
  }
  getExciseTaxs(gpart,Euser)
  {   
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_IT_ICR_SRV/ICR_HDRSet(TaxType='',Fbnum='',Lang='"+this.lang+"',Gpart='"+gpart+"',Euser='"+Euser+"',Fbguid='',Begda=datetime'2000-01-01T00:00',Endda=datetime'9999-01-01T00:00',UserTin='')?&$expand=ICR_LISTSet,ICR_STATUSSet&$format=json");
  }
  //sowjanya
  getZacatCitTaxs(Bpnum,Euser)
  {   
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_TAX01RET_WI_SRV/HeaderSet(Bpnum='"+Bpnum+"',Auditor='',Lang='"+this.lang+"',UserTin='')?&$expand=listSet&$format=json");
  }
  getForm12Details(fbGuid,Euser)
  {   
    return this.http.get(this.baseUrl+"sap/opu/odata/sap/ZDP_FZ12_SRV/HeaderSet(Fbnumz='',Langz='"+this.lang+"',Gpartz='',Euser='"+Euser+"',Fbguid='"+fbGuid+"',Invflg='',Fsource='TP')?$expand=ReasonSet,AttachSet,ThresholdSet,InvoiceSet&$format=json");
  }
  getForm12DetailsafterReresh(fbnum,fbGuid,Euser,Invflg)
  {   
    return this.http.get(this.baseUrl+"sap/opu/odata/sap/ZDP_FZ12_SRV/HeaderSet(Fbnumz='"+fbnum+"',Langz='"+this.lang+"',Gpartz='',Euser='"+Euser+"',Fbguid='"+fbGuid+"',Invflg='"+Invflg+"',Fsource='TP')?$expand=InvoiceSet&$format=json");
  }
  getExciseTaxDetails(Euser,fbguid)
  {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_ER_RET_SRV/ERNHSet(Fbnumz='',PortalUsrz='',Langz='"+this.lang+"',Officerz='',Gpartz='',TxnTpz='',Euser='"+Euser+"',FormGuid='"+fbguid+"',Operationz='')?&$expand=ER_ADDSet,ET_ITEMSet,WD_TRTYPSet,ATTDETSet,NOTESSet,RATESSet&$format=json");
  }
  getExciseReturnDetails(fbnum,Gpart,Status,Formproc) {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_ERET_UH_SRV/ERET_HDSet(Fbnum='"+fbnum+"',PortalUsr='',Lang='E',Officer='',Gpart='"+Gpart+"',Status='"+Status+"',TxnTp='',Formproc='"+Formproc+"')?&$expand=ERET_BTNSet&$format=json");
  }
  getExciseTaxPenalityCalculation(fbnum,amt,Persl,gpart,SrcApp)
  {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_SIMULATE_PENALTY_SRV/HEADERSet(Fbnum='"+fbnum+"',Betrw="+amt+"m,Persl='"+Persl+"',Gpart='"+gpart+"',SrcApp='"+SrcApp+"',Fbtyp='EXTR')");
  }
  SubmitET(obj)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/ZDP_ER_RET_SRV/ERNHSet",obj,{headers});
  }

  /* APIS For Form9*/
  getWithHoldings(Bpnum) {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_TAX01RET_WI_SRV/HeaderSet(Bpnum='"+Bpnum+"',Auditor='',Lang='',UserTin='')?&$expand=listSet");
  }

  getCountryList() {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_FETCH_COUNTRY_TAXRT_SRV/CntrySet?$filter=Spras eq '" + this.language + "' ");
  }

  getReturnTaxpayer() {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDGW_GET_TAXTP_LIST_SRV/taxtypeSet?$filter=Partner eq ''&$format=json");
  }

  getTaxRates() {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_TAXRT_SRV/TaxRateSet?$filter= Mandt eq '' ");
  }
  getWithholdingTaxpayerDetails(Fbguid,Euser){
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_FORM9_WHT_SRV/Wht_importSet(Auditor='',Taxpayer='',RegId='',PeriodKey='',Submit='',Save='',Lang='" +this.language+ "',Fbnum='',OfficerUid='',Approve='',Reject='',CreateTxAsses='',Fbguid='"+Fbguid+"',Euser='"+Euser+"',ObjSubmit='')?&$expand=AttDetSet,Off_notesSet,WHT9_FORMSet,WHT9_L0001Set&$format=json");
  }
  getUibuttons(Fbnum) {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/rbtnSet?$filter=Fbnum eq '" +Fbnum+ "' and UserTyp eq 'TP' and Fbust eq '' &$format=json");
  }
  onDownloadForm(fbnum) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/cover_formSet(Fbnum='"+fbnum+"')/$value",requestOptions)
  }

  getForm9AmendDetails(Fbnum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+Fbnum+"',Lang='',Taxpayer='',OfficerUid='',Pflag='')?&$expand=retmsgSet,msgtxtSet");
  }
  // getBusyindicator(Partner) {
  //   return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_BUSY_INDICATOR_SRV/ZBUSYINDSet(Partner='"+Partner+"')");
  // }

  /*APIS For Form6*/
  // getFrom6CountryList() {

  //   return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_FETCH_COUNTRY_TAXRT_SRV/CntrySet?$filter= Spras eq '" + this.lang + "' ");

  // }
  getForm6TaxpayerDetails(Fbguid,Euser) {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_RET_F06_WHTM_SRV/WHTM_HeaderSet(Taxpayerz='',RegIdz='',PeriodKeyz='',Fbnumz='',Monthz='',CreateTxAssesz='',Rejectz='',Approvez='',OfficerUidz='',Auditorz='',Submitz='',Langz='" +this.language+ "',Euser='"+Euser+"',Fbguid='"+Fbguid+"',Savez='',ObjSubmitz='',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?&$expand=Sch_01Set,Sch_02Set,Sch_03Set,Sch_04Set,Sch_05Set,Sch_06Set,Sch_07Set,Sch_08Set,Sch_09Set,Sch_10Set,Sch_11Set,Sch_12Set,Sch_13Set,Off_notesSet,AttDetSet&format=json");

  }
  submitWithHoldingsForm9(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };

    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_FORM9_WHT_SRV/Wht_importSet",obj,{headers});

  }
  SaveAttachments(RetGuid,flname,frmData)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      Slug: flname
    };
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='ZA09',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet",frmData,{headers});
  }
  DeleteAttachements(RetGuid,Dotyp,SchGuid,Srno,Doguid)
  {  
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
       
    return this.http.delete(this.baseUrl+"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachMedSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='"+SchGuid+"',Srno="+Srno+",Doguid='"+Doguid+"',AttBy='TP')/$value",{headers});
  }

  //added by phani for form12 starts
  SaveAttachmentsForm12(RetGuid,flname,frmData,Dotyp)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      Slug: flname
    };
    return this.http.post(this.baseUrl+"/sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='',Srno=1,Doguid='',AttBy='TP',OutletRef='')/AttachMedSet",frmData,{headers});
  }
  DeleteAttachementsForm12(Srno,Doguid,Dotyp)
  {  
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
       
    return this.http.delete(this.baseUrl+"/sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachMedSet(RetGuid='',Flag='N',Dotyp='"+Dotyp+"',SchGuid='',Srno="+Srno+",Doguid='"+Doguid+"',AttBy='TP',OutletRef='')/$value",{headers});
  }

  //added by phani for form12 ends

//added by hema form6 starts
  GetMonthsYears(CalendarType)
  {
    let request1=this.http.get(this.baseUrl+'sap/bc/ui5_ui5/sap/zd_tax01ret_wi/~20191028154504~/json/Wht_year_'+this.lang+'_'+CalendarType+'.json');
    let request2=this.http.get(this.baseUrl+'sap/bc/ui5_ui5/sap/zd_tax01ret_wi/~20181021152205~/json/Wht_mth_'+this.lang+'_'+CalendarType+'.json');
    return forkJoin([request1, request2]); 
    
  }
  Form6Creation(Gpart,Year,Month,caltype,Euser)
  {
    let request1=this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_CALENDER_WHT_SRV/calenderSet(Gpart='"+Gpart+"',Vtref='',Persl='"+Year+"',Month='"+Month+"',Caltyp='"+caltype+"',Euser='"+Euser+"',AudBp='')");
    let request2=this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_CHECK_SCREEN_SRV/IscreenSet(Fbtyp='WHTM',XestimatedFb='',Taxpayer='"+Gpart+"',PeriodKey='"+Year+"',Month='"+Month+"')");
    return forkJoin([request1,request2]);
    //https://sapgatewayqa.gazt.gov.sa/sap/opu/odata/SAP/Z_CHECK_SCREEN_SRV/IscreenSet(Fbtyp='WHTM',XestimatedFb='',Taxpayer='3102290383',PeriodKey='2008',Month='07')
    //return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_CALENDER_WHT_SRV/calenderSet(Gpart='"+Gpart+"',Vtref='',Persl='"+Year+"',Month='"+Month+"',Caltyp='"+caltype+"',Euser='"+Euser+"',AudBp='')");
  }
  GetExtraTaxCalculation(Taxpayer,PeriodKeyz,RegIdz,Fbnumz,AMonthGrossTax)
  {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_SIMULATE_INTEREST_SRV/z_simulateSet(Taxpayer='"+Taxpayer+"',Fbtyp='WHTM',PeriodKey='"+PeriodKeyz+"',RegId='"+RegIdz+"',Workmode='',Fbnum='"+Fbnumz+"',InterestAmt="+AMonthGrossTax+"m,PenaltyAmt="+AMonthGrossTax+"m,RevenueAmt=0.00m)");
  }
  SaveForm6Details(obj)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };

    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_RET_F06_WHTM_SRV/WHTM_HeaderSet",obj,{headers});

  }
  SaveAttachment(RetGuid,flname,frmData,Dotyp)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      Slug: flname
    };
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet",frmData,{headers});
  }
  DeleteAttachement(RetGuid,Dotyp,SchGuid,Srno,Doguid)
  {  
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };
       
    return this.http.delete(this.baseUrl+"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachMedSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='"+SchGuid+"',Srno="+Srno+",Doguid='"+Doguid+"',AttBy='TP')/$value",{headers});
  }

  SaveGeneralAttachments(RetGuid,flname,frmData,Dotyp)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      Slug: flname
    };
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet",frmData,{headers});
  }
  
  //added by hema form6 ends
  //API for form6 amendment Starts //
  getForm6AmendDetails(fbnum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+fbnum+"',Lang='',Taxpayer='',OfficerUid='',Pflag='')?&$expand=retmsgSet,msgtxtSet");
  }
  

  //Added by Bhargavi For Form 11 Starts//
  GetFrom11TaxpayerDetails(Euser,Fbguid) {
    let lng;   
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    } 
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDGW_ZI11_SRV/HeaderSet(Fbnumz='',Langz='"+lng+"',Operationz='',Officerz='',Gpartz='',Euser='"+Euser+"',Fbguid='"+Fbguid+"',OfficerTz='',Perslz='',AmendFg='',SrcAppz='')?$expand=Sch1101Set,Sch1102Set,Sch1103BSet,Sch1103Set,Sch1104Set,Sch1105Set,Sch1106Set,Sch1107Set,Sch1108Set,Sch1109Set,Sch1110Set,Sch1111Set,Sch1112Set,Sch1113Set,Sch1114Set,Sch1115Set,Sch1116Set,Sch1117Set,Sch1118Set,Sch1119Set,Sch1120Set,AttDetSet,Off_notesSet&format=Json")
  }
  GetUiButtons(Gpart) {
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDPGW_ZI11_UH_SRV/UI_HDRSet(Lang='"+this.lang+"',Officer='',Fbnum='',Gpart='"+Gpart+"',Status='E0001',UserTyp='TP',Endda='')?&$expand=UI_BTNSet,DropdownSet,CountrySet,BondsSet,CBCR_DDSet,URLSet")

  }

  Form12ammendDetails(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };

    return this.http.post(this.baseUrl+"sap/opu/odata/sap/ZDP_FZ12_SRV/HeaderSet",obj,{headers});

  }

 Form12SubmitDetails(obj) {
    const headers = {
      Accept:   "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };

    return this.http.post(this.baseUrl+"sap/opu/odata/sap/ZDP_FZ12_SRV/HeaderSet",obj,{headers});

  }

  getForm12ButtonsDetails(Fbnum,status)
  {   
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_FZ12_BS_SRV/UI_HdrSet(Fbtypz='FZ12',UserTypz='TP',Fbnum='"+Fbnum+"',Gpart='',Status='"+status+"',TxnTp='',Formproc='FZ12',Lang='"+this.lang+"',Officer='')?&$expand=UI_BtnSet&$format=json");
  }

  Form12ReleaseDetails(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243"
  //     ,
  //     "DataServiceVersion": "2.0",
	// "MaxDataServiceVersion": "2.0",
	// "sap-contextid-accept": "header"
    };
    return this.http.post(this.baseUrl +"sap/opu/odata/sap/ZDP_FZ12_SRV/HeaderSet", obj, { headers });
  }

  getBasicInformation(fbGuid,Euser) {
     return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/Z_RET_F05_ZKTE_SRV/ZKTE_HEADERSet(Auditorz='',Taxpayerz='',RegIdz='',PeriodKeyz='',Submitz='',Savez='',Fbnumz='',Langz='E',OfficerUidz='',ObjSubmitz='',Approvez='',Rejectz='',CreateTxAssesz='',Euser='"+Euser+"',Fbguid='"+fbGuid+"')?&$expand=GEN_SUB_SCH,GP03_2Set,GP03_3Set,GP03_4Set,GP03_5Set,GP03_6Set,GP03_7Set,GP03_8Set,GP06_1Set,GP06_2Set,GP06_3Set,MAIN_ACTIVITYSet,SCH_GP01,SCH_GP02,SCH_GP03,SCH_GP04,SCH_GP05,SCH_GP06,SCH_GP07,SCH_GP08,SCH_GP09,SCH_GP10,SCH_GP11,SCH_GP12,SUB_SCH_CAPITALSet,SCH_200Set,SCH_800Set,SCH_GP3S1Set,SCH_GP3S2Set,AttDetSet,LONG_TEXTSet");
   
  }

  DownloadInvoice(Cotyp,Cokey) {
    const requestOptions: Object = {
      responseType: "blob"
    };
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDP_IT_CORRES_SRV/corr_dataSet(Cokey='"+Cokey+"',Cotyp='"+Cotyp+"')/$value",requestOptions)
  }

  getTokens(fbnum,gpartz){
    return this.http.get(this.baseUrl+"sap/opu/odata/sap/ZDP_FZ12_SRV/PdfSet(Fbnumz='"+fbnum+"',Langz='"+this.lang+"',Gpartz='"+gpartz+"')")
  }
  // getForm10Details(fbGuid,Euser)
  // {   
  //   return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDGW_ZI10_SRV/HEADERSet(Euser='"+Euser+"',Fbguid='"+fbGuid+"',Perslz='',Officerz='',Langz='"+this.lang+"',AmendFg='',SrcAppz='')?&$expand=Item1001Set,Item1002Set,Item1003Set,Item1004Set,Item1005Set,Item1006Set,Item1007Set,Item1008Set,Item1009Set,Item1010Set,Item1011Set,Item1012Set,Item1013Set,Item1014Set,Item1015Set,Item1016Set,Item1017Set,Item1018Set,Item1019Set,Item1020Set,Item1021,Item1022Set,Item1023Set,Item1024Set,AttDetSet,Off_notesSet");
  // }

   // Hema starts for Form11 	
   getCountriesDropdown(fbnum,Gpart,EndDt)	
   {   
     let lng;   
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }  	
     return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDPGW_ZI11_UH_SRV/UI_HDRSet(Lang='"+lng+"',Officer='',Fbnum='"+fbnum+"',Gpart='"+Gpart+"',Status='E0013',UserTyp='TP',Endda=datetime'2017-12-31T00:00:00')?&$expand=UI_BTNSet,DropdownSet,CountrySet,BondsSet,CBCR_DDSet,URLSet&$format=json");	
   }	
   SaveForm11Data(obj)	
   {	
     const headers = {	
       Accept: "application/json",	
       "X-Requested-With": "X",	
       ichannel: "243",	
     };	
     return this.http.post(this.baseUrl+"sap/opu/odata/SAP/ZDGW_ZI11_SRV/HeaderSet",obj,{headers});	
   }	
   SaveForm11Attachments(flname,RetGuid,frmData,dotype)	
   {	
     const headers = {	
       Accept: "application/json",	
       "X-Requested-With": "X",	
       ichannel: "243",	
       Slug: flname	
     };        	
     return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+dotype+"',SchGuid='',Srno=1,Doguid='',AttBy='TP',OutletRef='')/AttachMedSet",frmData,{headers});	
   }	
   DownloadFormFormat(fbNum)	
   {	
     const requestOptions: Object = {	
       responseType: "blob"	
     };	
     return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDGW_GET_COVERFORM_SRV/cover_formSet(Fbnum='"+fbNum+"')/$value",requestOptions);	
   }	
   DownloadForm11Invoice(fbNum)	
   {	
     const requestOptions: Object = {	
       responseType: "blob"	
     };	
     return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"+fbNum+"')/$value",requestOptions);	
   }	
   DeleteForm11Attachements(RetGuid,Dotyp,SchGuid,Srno,Doguid)	
   {  	
     const headers = {	
       Accept: "application/json",	
       "X-Requested-With": "X"	
     };	
          
     return this.http.delete(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachMedSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='"+SchGuid+"',Srno="+Srno+",Doguid='"+Doguid+"',AttBy='TP')/$value",{headers});	
   }	
   GetSavedAttachments()	
   {	
     return this.http.get(this.baseUrl+'sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/');	
   }	
   // Hema ends for Form11
   //API For Form4 Amendment 
  getForm11AmendDetails(fbnum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+fbnum+"',Lang='',Taxpayer='',OfficerUid='',Pflag='')?&$expand=retmsgSet,msgtxtSet");
  }

   //  for form4 services	
   getForm4Details(Euser,Fbguid) {  	
     let lang=this.lang=='AR'?'A':'E';
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_RET1_FO4_ITXE_SRV/ITXE_HEADERSet(Auditorz='',Taxpayerz='',RegIdz='',PeriodKeyz='',Fbnumz='',Langz='"+lang+"',ObjSubmitz='',Submitz='',Savez='',OfficerUidz='',Approvez='',Rejectz='',CreateTxAssesz='',Euser='"+Euser+"',Fbguid='"+Fbguid+"')?&$expand=Sch1_199Set,Sch1_499Set,Off_notesSet,AttDetSet,Sch1_405Set,Sch1_600Set,Sch1_700");	
  }	
  ValidateTIN(TIN,TP,Regid,periodKey)	
  {	
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_NAME_SRV/BP_NameSet(Tin='"+TIN+"',Taxpayer='"+TP+"',RegIdz='"+Regid+"',PeriodKeyz='"+periodKey+"',)");	
  }	
  SubmitForm4(obj)	
  {	
    const headers = {	
      Accept: "application/json",	
      "X-Requested-With": "X",	
      ichannel: "243",	
    };	
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_RET1_FO4_ITXE_SRV/ITXE_HEADERSet",obj,{headers});	
  }	
  DownloadForm4Form(fbnum) {	
    const requestOptions: Object = {	
      responseType: "blob"	
    };                           	
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/cover_formSet(Fbnum='"+fbnum+"')/$value",requestOptions)	
  }	
  CalculateFineAmount(Taxpayer,Fbtyp,PeriodKey,RegId,Fbnum,InterestAmt,PenaltyAmt,RevenueAmt)	
  {	
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_SIMULATE_INTEREST_SRV/z_simulateSet(Taxpayer='"+Taxpayer+"',Fbtyp='"+Fbtyp+"',PeriodKey='"+PeriodKey+"',RegId='"+RegId+"',Workmode='',Fbnum='"+Fbnum+"',InterestAmt="+InterestAmt+"m,PenaltyAmt="+PenaltyAmt+"m,RevenueAmt="+RevenueAmt+"m)");	
  }
  //API For Form4 Amendment 
  getForm4AmendDetails(fbnum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+fbnum+"',Lang='',Taxpayer='',OfficerUid='',Pflag='')?&$expand=retmsgSet,msgtxtSet");
  }

  //  for form4 services ends 

  //sowjanya form5	
  submitForm5(obj) {	
    const headers = {	
      Accept: "application/json",	
      "X-Requested-With": "X",	
      ichannel: "243",	
    };	
  
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_RET_F05_ZKTE_SRV/ZKTE_HEADERSet",obj,{headers});	
  
  }	
  getDropdownData(langz) {	
    return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_F05_DROPDOWN_SRV/HeaderSet(Langu='"+langz+"',Country='SA')?&$expand=zcitySet,zmain_descSet,zsub_desc_A60Set,zsub_desc_A61Set,zsub_desc_A62Set,URLSet,MSGSet,GOVCODESet");	
    
 }	
 ShowIndivisualActivityDetails(fbnum){	
  return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_ZKTE_SUMMARY_SRV/HeadSet(Fbnum='"+fbnum+"',Flag='X')?$expand=headsumSet,SadadSet,SchGP01Set,SchGP02Set,SchGP03Set,SchGP04Set,SchGP05Set,SchGP06Set,SchGP07Set,SchGP08Set,SchGP09Set,SchGP10Set,SchGP11Set,SchGP12Set");	
 }	
 getButtons(fbust,Cflag) {	
  https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_F05_DROPDOWN_SRV/BTNSet(Fbust='IP014',UserTyp='TP',Cflag='N')	
    
  // return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_F05_DROPDOWN_SRV/BTNSet(Fbust='"+fbust+"',UserTyp='TP',Cflag='"+Cflag+"')");	

  return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_F05_DROPDOWN_SRV/BTNSet?$filter=Fbust='"+fbust+"',Cflag='"+Cflag+"' ,UserTyp='TP'");	
  
}	
DownloadInvoiceForm5(fbnum) {	
const requestOptions: Object = {	
  responseType: "blob"	
};	
return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"+fbnum+"')/$value",requestOptions)	
}	
geZakatCalculatedAmount(RegIdz,PeriodKeyz,ZakatAmt) {	
return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_ZAKAT_AMT_SRV/zakat_amtSet(Vtref='"+RegIdz+"',Persl='"+PeriodKeyz+"',ZakatAmt="+ZakatAmt+"m"+",PnlAmt=0.00m)");	
// return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_ZAKAT_AMT_SRV/zakat_amtSet(Vtref='330001439500005',Persl='H29L',ZakatAmt=26455178.44m,PnlAmt=0.00m)");	

}

getTinNameBytinNo(tin,Key) {	
  return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_CONT_NAME_SRV/cont_nameSet(Partner='"+tin+"',Year='1432',Key='"+Key+"',Idnumber='')");	
  
}	
getTinName(tinNo,Gpartz,RegIdz,PeriodKeyz) {	
return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_NAME_SRV/BP_NameSet(Tin='"+tinNo+"',Taxpayer='"+Gpartz+"',RegIdz='"+RegIdz+"',PeriodKeyz='"+PeriodKeyz+"')");	
}	

//added by phani
getForm5AmendDetails(fbnum){
  return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+fbnum+"',Lang='',Taxpayer='',OfficerUid='',Pflag='')?&$expand=retmsgSet,msgtxtSet");
}

//  sowjanya form5 end

      
getReturns(tin) {
  let url =
    this.baseUrl +
    "/sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/ICR_LISTSet?$filter=Gpart eq '" +
    tin +
    "' and Lang eq '" +
    this.lang +
    "'&$format=json";
  // console.log('url bills ->',url);
  return this.http.get(url);
}

getBills() {
  let tin = localStorage.getItem("gpart");
  let Fbguid = "";
  let url =
    this.baseUrl +
    "/sap/opu/odata/SAP/ZDP_MYBILLS_SRV/MyBillsSet?$filter=Fbguid eq '" +
    Fbguid +
    "'and Euser eq '" +
    tin +
    "'&saml2=enabled&$format=json&sap-language=" +
    this.lang;
  // console.log('url bills ->',url);
  return this.http.get(url);
}

getUserDetails() {
  let lng;
  if (this.lang === "AR") {
    lng = "A";
  } else {
    lng = "E";
  }
  const httpOptions = {
    headers: new HttpHeaders({
      ichannel: "243",
    }),
  };

  return this.http.get(
     this.baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/VRNHSet(Fbnumz='',PortalUsrz='',Langz='" +
      lng +
      "',Officerz='',Gpartz='',TxnTpz='04',Euser='',Fbguid='')?&$expand=ADDRESSSet,IBANSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,NOTESSet,QUESTIONSSet,QUESLISTSet,ELGBL_DOCSet&$format=json",
    httpOptions
  );
}

// /* Form 4 API's Start here */ 
// getForm4Details(Euser,Fbguid) {
//   alert('hi');
//   return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_RET1_FO4_ITXE_SRV/ITXE_HEADERSet(Auditorz='',Taxpayerz='',RegIdz='',PeriodKeyz='',Fbnumz='',Langz='E',ObjSubmitz='',Submitz='',Savez='',OfficerUidz='',Approvez='',Rejectz='',CreateTxAssesz='',Euser='"+Euser+"',Fbguid='"+Fbguid+"')?&$expand=Sch1_199Set,Sch1_499Set,Off_notesSet,AttDetSet,Sch1_405Set,Sch1_600Set,Sch1_700&format=json");

// }





  //Form2 services Starts
    //Added by hema
    GetForm2Details(Euser,Fbguid)
    {
      return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_RET_F02_ZKTN_SRV/zktn_headerSet(Auditorz='',Taxpayerz='',RegIdz='',PeriodKeyz='',Submitz='',Savez='',Fbnumz='',OfficerUidz='',Approvez='',Rejectz='',CreateTxAssesz='',Langz='E',ObjSubmitz='',Euser='"+Euser+"',Fbguid='"+Fbguid+"')?&$expand=Sch_20101Set,Sch_20102Set,Sch_20204Set,Sch_20206Set,Sch_20208Set,Sch_20209Set,Sch_20299Set,Sch_20401,Sch_20499Set,Sch_20699Set,Sch_20701Set,Sch_20702Set,Sch_20704Set,Sch_20799Set,AttDetSet,Off_notesSet");
    }
    GetIdTypes()
    {
      return this.http.get(this.baseUrl+"sap/bc/ui5_ui5/sap/zret_form2/~20180905222251~/20206_EN.json");
    }
    SaveForm2(obj)
    {
      const headers = {
        Accept:   "application/json",
        "X-Requested-With": "X",
        ichannel: "243",
      };
    
      return this.http.post(this.baseUrl+"/sap/opu/odata/sap/Z_RET_F02_ZKTN_SRV/zktn_headerSet",obj,{headers});
    }
    //Ended by hema
    //Added by saraswathi
    //Ended by saraswathi
    //Added by phani
    GetCrTinFin(CrTinFin,IDvalue){
      return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_RET8_CO_TAXPAYER_ADDR_SRV/zcrtinfinSet(IvCrtinfin='"+CrTinFin+"',IvDropdown='"+IDvalue+"')");
    }

    //Ended by phani
  //Form2 services ends

  //sowjanya excise trans returns

getPeronalDetails(TPNo, Email, lang)
{   
  return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/ZDP_PR_NW_dd_SRV/HDRSet(Taxpayerz='"+TPNo+"',Emailz='"+Email+"',Lang='"+lang+"')?&$expand=ITEM_typeSet,ITem_descSet,Met_typeSet,UnitMeasureSet,Excel_DataSet,MasterListSet&$format=json");
}

getPeronalDetails2(TPNo, Email)
{   
  return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/ZDP_PR_NW_SRV/HDRSet(Taxpayerz='"+TPNo+"',Emailz='"+Email+"')?&$expand=GOOD_TYPSet,notesSet,Good_SSBSet,Good_TABSet&$format=json");
}

getPaymentHisotry(TPNo)
{   
  return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/ZDP_PR_NW_SRV/PAY_HISTSet?$filter=Gpart eq '"+TPNo+"'");
}

latePaymentPnalty(TPNo, TotalExcise)
{   
  return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/ZDP_PR_NW_SRV/zpenaltySet(Gpart='"+TPNo+"',TotalExcise="+TotalExcise+"m)");
}


SubmitExciseTransData(obj)
{   
  const headers = {
    Accept:   "application/json",
    "X-Requested-With": "X",
    ichannel: "243",
  };

  return this.http.post(this.baseUrl+"/sap/opu/odata/SAP/ZDP_PR_NW_SRV/HDRSet",obj,{headers});
}


DownloadInvoiceExciseTrans(fbnum) {	
const requestOptions: Object = {	
  responseType: "blob"	
};	
// return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_CORR_DETAILS_SRV/zcorrdataSet(Fbnum='"+fbnum+"')/$value",requestOptions)	
return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/Z_GET_CORR_DETAILS_SRV/zcorrdataSet(Fbnum='" + fbnum +"')",requestOptions)	

}	

downloadcokeyCotyp(cokey,cotyp){
  return this.http.get(this.baseUrl+"/sap/opu/odata/SAP/Z_TP_CORRES_SRV/corr_dataSet(Cokey='" + cokey + "',Cotyp='" + cotyp +"')/$value");

}
//phani start
SaveETReturnsAttachment(RetGuid, flname,frmData,Dotyp)	
   {	
     const headers = {	
       Accept: "application/json",	
       "X-Requested-With": "X",	
       ichannel: "243",	
       Slug: flname	
     };        	
     return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(OutletRef='',RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+Dotyp+"',SchGuid='',Srno=1,Doguid='',AttBy='X')/AttachMedSet",frmData,{headers});	
   }

DeleteETReturnsAttachement(Dotyp,Srno,Doguid)	
   {  	
     const headers = {	
       Accept: "application/json",	
       "X-Requested-With": "X"	
     };	
          
     return this.http.delete(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='"+Dotyp+"',SchGuid='',Srno="+Srno+",Doguid='"+Doguid+"',AttBy='X')/$value",{headers});
   }
//phani end



//sowjanya excise trans returns end
//form3 start
// sowjany Form3  stgart

GetForm3Details(Euser,Fbguid)
{   
  return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_RET_F03_ITXN_SRV/ITXN_HeaderSet(Auditorz='',Taxpayerz='',RegIdz='',PeriodKeyz='',Submitz='',Savez='',Langz='E',Fbnumz='',OfficerUidz='',Approvez='',Rejectz='',CreateTxAssesz='',Fbguid='"+Fbguid+"',Euser='"+Euser+"',ObjSubmitz='',Caldate='')?&$expand=Sch1_102Set,Sch1_203Set,Sch1_299Set,Sch1_499Set,Sch1_502Set,Sch4_401,Sch0_101Set,Off_notesSet,AttDetSet");
} 
DownloadInvoiceForm3(fbnum) { 
  const requestOptions: Object = {  
    responseType: "blob"  
  };  
return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='"+fbnum+"')/$value",requestOptions)  
 
}
//sowjanya form3 end
//purna start
getForm3Download(Fbnumz) {    
  const requestOptions: Object = {
    responseType: "blob"
  };
  return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/cover_formSet(Fbnum='" + Fbnumz + "')/$value", requestOptions);    
}
GetTaxpayerName(tin,taxPayer,regIdz,periodKeyz){
  return this.http.get(this.baseUrl+"sap/opu/odata/SAP/Z_GET_NAME_SRV/BP_NameSet(Tin='"+tin+"',Taxpayer='"+taxPayer+"',RegIdz='"+regIdz+"',PeriodKeyz='"+periodKeyz+"')");

}
SubmitForm3(obj){
  const headers = {
    Accept: "application/json",
    "X-Requested-With": "X",
    ichannel: "243"
  };
  return this.http.post(this.baseUrl + "sap/opu/odata/SAP/Z_RET_F03_ITXN_SRV/ITXN_HeaderSet", obj, { headers });
}
//purna end
//form3 end
//form 10 start
  // getForm10Details(fbGuid,Euser)
  // { 
  // return this.http.get(this.baseUrl+"sap/opu/odata/SAP/ZDGW_ZI10_SRV/HEADERSet(Euser='"+Euser+"',Fbguid='"+fbGuid+"',Perslz='',Officerz='',Langz='"+this.lang+"',AmendFg='',SrcAppz='')?&$expand=Item1001Set,Item1002Set,Item1003Set,Item1004Set,Item1005Set,Item1006Set,Item1007Set,Item1008Set,Item1009Set,Item1010Set,Item1011Set,Item1012Set,Item1013Set,Item1014Set,Item1015Set,Item1016Set,Item1017Set,Item1018Set,Item1019Set,Item1020Set,Item1021,Item1022Set,Item1023Set,Item1024Set,AttDetSet,Off_notesSet");
  // }
  getForm10Details(fbGuid, Euser) {
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDGW_ZI10_SRV/HEADERSet(Euser='" + Euser + "',Fbguid='" + fbGuid + "',Perslz='',Officerz='',Langz='" + this.lang + "',AmendFg='',SrcAppz='')?&$expand=Item1001Set,Item1002Set,Item1003Set,Item1004Set,Item1005Set,Item1006Set,Item1007Set,Item1008Set,Item1009Set,Item1010Set,Item1011Set,Item1012Set,Item1013Set,Item1014Set,Item1015Set,Item1016Set,Item1017Set,Item1018Set,Item1019Set,Item1020Set,Item1021,Item1022Set,Item1023Set,Item1024Set,AttDetSet,Off_notesSet");
  }

  getServiceForm10Details(fbGuid, Euser) {
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDPGW_ZI10_UH_srv/UI_HDRSet(Lang='" + this.lang + "',Officer='',Gpart='" + fbGuid + "',Status='E0013',UserTyp='TP',Fbnum='" + Euser + "')?&$expand=UI_BTNSet,DropdownSet,CountrySet,CBCR_DDSet,URLSet")

  }

  getForm10SelectedKey(idnumber, Gpart) {
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDGW_IDDETAILS_SRV/zdId_detailsSet(IdType='TIN',IdNumber='" + idnumber + "',Gpart='" + Gpart + "',Annex11Fg='')");
  }

  
  //purna

  getForm10Download(Fbnumz) {    
    const requestOptions: Object = {
      responseType: "blob"
    };
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDGW_GET_COVERFORM_SRV/cover_formSet(Fbnum='" + Fbnumz + "')/$value", requestOptions);    
  }
  getForm10DownloadACK(Fbnumz) {    
    const requestOptions: Object = {
      responseType: "blob"
    };
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/cover_formSet(Fbnum='" + Fbnumz + "')/$value", requestOptions);    
  }  getDetailsByTIN(tinNumber, gPartNumber) {
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDGW_IDDETAILS_SRV/zdId_detailsSet(IdType='TIN',IdNumber='" + tinNumber + "',Gpart='" + gPartNumber + "',Annex11Fg='')");
  }
  getForm10Amend(Fbnum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDPGW_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+Fbnum+"',Lang='',Gpart='',Pflag='',Officer='',SrcApp='')?&$expand=retmsgSet,msgtxtSet");
    
  }
  submitForm10(obj){
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243"
    };
    return this.http.post(this.baseUrl + "sap/opu/odata/SAP/zdgw_zi10_srv/HEADERSet", obj, { headers });
  }
  //end purna
  //form 10 end
  //form 8 start
  //purna start
  getForm8TaxpayerDetails(fbGuid, euser) {
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_RET_F08_ITZC_SRV/itzc_headerSet(Auditorz='',Taxpayerz='',RegIdz='',PeriodKeyz='',Fbnumz='',Euser='"+euser+"',Fbguid='"+fbGuid  +"',Submitz='',Savez='',OfficerUidz='',Approvez='',Rejectz='',CreateTxAssesz='',Langz='E',ObjSubmitz='')?&$expand=Sch_10101Set,Sch_10103,Sch_10204Set,Sch_19ASet,Sch_10205Set,Sch_10206Set,Sch_10207Set,Sch_10504Set,Sch_10506Set,Sch_10508Set,Sch_10510Set,Sch_11002,Sch_12001,Sch_11501,Sch_11710,Sch_12003,Sch_10807Set,Sch_10809Set,Sch_10814Set,Sch_10815Set,Sch_10822Set,Sch_11016Set,Sch_11800Set,Sch_11902Set,Sch_11904Set,Sch_11905Set,Sch_11906Set,Sch_11907Set,Sch_12005Set,Sch_40700,Sch_13307Set,Sch_13705Set,AttDetSet,Sch_11002,Sch_11706Set,Off_notesSet,XbrlPdfSet");
  }
  getForm8ACKDetails(fbNum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/SadadSet?$filter=Langu eq 'E' and Fbnum eq '"+fbNum+"'");      
  }
  getForm8AmendDetails(fbNum){
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/rbtnSet?$filter=Fbnum eq '"+fbNum+"' and UserTyp eq 'TP' and Fbust eq 'IP014'");  
  }
  postForm8AmendData(form8Data){
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243"
    };
    return this.http.post(this.baseUrl + "sap/opu/odata/SAP/Z_RET_F08_ITZC_SRV/itzc_headerSet", form8Data, { headers });
  }
  getForm8AmendReturnService(fbNum,pFlag){    
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/ZDP_SELFAMD_RET_SRV/HeaderSet(Fbnum='"+fbNum+"',Lang='',Taxpayer='',OfficerUid='',Pflag='"+pFlag+"')?&$expand=retmsgSet,msgtxtSet");  
  }
  validateIDnumbersForm8(IvIdnumber,ivTin,IvFin,ivFbtyp,ivPartner){    
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_RET8_CO_TAXPAYER_ADDR_SRV/ZFINSet(IvFin='"+IvFin+"',IvIdnumber='"+IvIdnumber+"',IvVktyp='"+ivFbtyp+"',IvTin='"+ivTin+"',IvFbtyp='ITZC',IvPartner='"+ivPartner+"')");  
  }
  getPartnerCalculatedDetailsForm8(partner,regId,periodKey,netItax,iFixedType,ivSaudishare,ivNonsaudishare){    
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_PARTNER_REL_SHARE_SRV/z_partnerSet(Partner='"+partner+"',RegId='"+regId+"',PeriodKey='"+periodKey+"',NetItax="+netItax+",IFixedType='"+iFixedType+"',IvSaudishare='"+ivSaudishare+"',IvNonsaudishare='"+ivNonsaudishare+"')");  
  }
  getSimulateINSTCalculatedDetailsForm8(taxpayer,fbtyp,periodKey,regId,fbNum,interestAmt,penaltyAmt,revenueAmt){    
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_SIMULATE_INTEREST_SRV/z_simulateSet(Taxpayer='"+taxpayer+"',Fbtyp='"+fbtyp+"',PeriodKey='"+periodKey+"',RegId='"+periodKey+"',Workmode='',Fbnum='"+fbNum+"',InterestAmt="+interestAmt+",PenaltyAmt="+penaltyAmt+",RevenueAmt="+revenueAmt+")");  
  }
  //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_GET_ZAKAT_AMT_SRV/zakat_amtSet(Vtref='330004870800005',Persl='2012',ZakatAmt=63396.00m,PnlAmt=63396.00m)
  getZakatCalculatedDetailsForm8(vtRef,persl,zakatAmt,pnlAmt){    
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_GET_ZAKAT_AMT_SRV/zakat_amtSet(Vtref='"+vtRef+"',Persl='"+persl+"',ZakatAmt="+zakatAmt+",PnlAmt="+pnlAmt+")");  
  }
  SaveForm8Attachments(flname,RetGuid,frmData,doctype)
  {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      Slug: flname
    };
    return this.http.post(this.baseUrl+"sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(RetGuid='"+RetGuid+"',Flag='N',Dotyp='"+doctype+"',SchGuid='',Srno=1,Doguid='',AttBy='TP',OutletRef='')/AttachMedSet",frmData,{headers});
  }
  validateIDnumbersForm8v1(ivTin,IvVktyp,ivPartner){    
    return this.http.get(this.baseUrl + "sap/opu/odata/SAP/Z_RET8_CO_TAXPAYER_ADDR_SRV/ZFINSet(IvFin='',IvIdnumber='',IvVktyp='"+IvVktyp+"',IvTin='"+ivTin+"',IvFbtyp='ITZC',IvPartner='"+ivPartner+"')");  
  }
  //purna end
  //form 8 end
}
