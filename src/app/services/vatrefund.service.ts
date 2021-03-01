import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ApiConstants } from "src/app/constants/VATrefundConstant";
const httpOptions = {
  headers: new HttpHeaders({
    ichannel: "243",
  }),
};
@Injectable({
  providedIn: 'root'
})
export class VatrefundService {
  baseUrl = environment.url;
  lang: string;
  tin;
  lang1: string;

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
  

  landingData(){
    let url = this.baseUrl + ApiConstants.landingData+"(Euser='',Fbnumx='',FormGuid='',Formprocx='ZTAX_VAT_MAISC_PROC',Gpartx='"+this.tin+"',Langx='"+this.lang+"',Officerx='',TxnTpx='')?$expand=AttdetSet,BankDtlSet,NotesSet";
    // let url = this.baseUrl + ApiConstants.landingData+"(Euser='00000000001000164611',Fbnumx='',FormGuid='005056B1365C1EEAB6E0F7222AF68000',Formprocx='ZTAX_VAT_MAISC_PROC',Gpartx='',Langx='"+this.lang+"',Officerx='',TxnTpx='')?$expand=AttdetSet,BankDtlSet,NotesSet";
    return this.http.get(url,httpOptions);
  }

  loadData(){
    // let url = this.baseUrl + ApiConstants.loadData+"(Fbnum='',Lang='"+this.lang1+"',Officer='',Gpart='"+this.tin+"',Status='',TxnTp='CRE_VTRF',Formproc='ZTAX_VAT_MAISC_PROC')?&$expand=VR_UI_BTNSet,IBANSet";
    let url = this.baseUrl + ApiConstants.loadData+"(Fbnum='',Lang='"+this.lang1+"',Officer='',Gpart='"+this.tin+"',Status='E0001',TxnTp='CRE_VTRF',Formproc='ZTAX_VAT_MAISC_PROC')?&$expand=VR_UI_BTNSet,IBANSet";

    return this.http.get(url,httpOptions);
  }

  fetchID(decid){
    let url = this.baseUrl + ApiConstants.fetchID +"$filter=Partner eq '"+this.tin+"' and Type eq '"+decid+"'";
    return this.http.get(url,httpOptions);
  }

  saveData(data){
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + ApiConstants.saveData ;
    return this.http.post(url, data, {
      headers,
    });
  }

  validateIBN(iban){
    let url = this.baseUrl + ApiConstants.validateIBN +"(Iban='"+iban+"')"
    return this.http.get(url,httpOptions);
  }

  // getButton(){
  //   let url = this.baseUrl + ApiConstants.getButton +"(Fbnum='87000001184',Lang='E',Officer='',Gpart='3300064977',Status='E0013',TxnTp='CRE_VTRF',Formproc='ZTAX_VAT_MAISC_PROC')?&$expand=VR_UI_BTNSet,IBANSet2";
  //   return this.http.get(url,httpOptions);
  // }

  applicationList(){
    // let url = this.baseUrl + ApiConstants.applicationList +"(TaxType='VT',Lang='E',Gpart='3311664755',Euser='00000000001000164611',Flag='W',Fbguid='005056B1365C1EDB93CBAAE0347AA4DF')?&$expand=STATUSSet,WI_DTLSet,VatRef_HeaderSet,VatRef_SubItemsSet";
    let url = this.baseUrl + ApiConstants.applicationList +"(TaxType='VT',Lang='"+this.lang1+"',Gpart='"+this.tin+"',Euser='',Flag='W',Fbguid='')?&$expand=STATUSSet,WI_DTLSet,VatRef_HeaderSet,VatRef_SubItemsSet";
    // let url = this.baseUrl + ApiConstants.applicationList +"(TaxType='VT',Lang='"+this.lang1+"',Gpart='3300064977',Euser='00000000000001080714',Flag='W',Fbguid='005056B1365C1EEAB6F7C810F1B61AEE')?&$expand=STATUSSet,WI_DTLSet,VatRef_HeaderSet,VatRef_SubItemsSet";
    return this.http.get(url,httpOptions);
  }

  carddetail(fbguid,euser){
    // let url = this.baseUrl + ApiConstants.landingData+"(Euser='',Fbnumx='',FormGuid='"+fbguid+"',Formprocx='ZTAX_VAT_MAISC_PROC',Gpartx='',Langx='"+this.lang+"',Officerx='',TxnTpx='')?$expand=AttdetSet,BankDtlSet,NotesSet";
    let url = this.baseUrl + ApiConstants.landingData+"(Euser='"+euser+"',Fbnumx='',FormGuid='"+fbguid+"',Formprocx='ZTAX_VAT_MAISC_PROC',Gpartx='',Langx='"+this.lang+"',Officerx='',TxnTpx='')?$expand=AttdetSet,BankDtlSet,NotesSet";
    return this.http.get(url,httpOptions);
  }

  getAmountString(amount, numDecimal: number = 2) {
    // Returns ${amount} in Indian format with exactly ${numDecimal} decimal places

    return (+amount).toLocaleString("en-US", {
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal,
    });
  }

}
