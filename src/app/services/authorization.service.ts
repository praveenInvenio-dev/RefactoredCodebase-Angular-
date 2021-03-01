import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {AuthorizeAPIConstants} from "src/app/constants/AuthorizationConstants";
import { map,flatMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl = environment.url;
  lang: string;
  lang1: string;
  tin;
  Fbguid;
  Euser;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lang1 = "A";

    } else {
      this.lang = "EN";
      this.lang1 = "E";

    }
    this.tin = localStorage.getItem("gpart");  

    this.getEncryptionDetails(this.tin ).subscribe((res) => {
   //   console.log("getEncryptionDetails",res)
      let Val1 = res["d"]["Val1"]
      let Val2 = res["d"]["Val2"]
      let Val3 = res["d"]["Val3"]
      let Val4 = res["d"]["Val4"]
      let Val5 = res["d"]["Val5"]
      this.getTaxpayerDashboard( Val1,Val2,Val3,Val4,Val5).subscribe((res) => {
      //  console.log("getTaxPayerDetails",res)
        localStorage.setItem("AuthEuser",res["d"]["Euser"]);
        localStorage.setItem("AuthFbguid",res["d"]["Fbguid"]); 
        this.setIds();

    })
  })
   }
   setIds(){
    this.Fbguid = localStorage.getItem("AuthFbguid")
    this.Euser = localStorage.getItem("AuthEuser")
   }

   getAuthorations(tin) {
     this.setIds();
     if(!this.Euser || !this.Fbguid){
     //  console.log("inside getAuthorations STEP1")

       return this.getEncryptionDetails(this.tin ).pipe(
        flatMap((res) => {
      //    console.log("First pipe",res)
      //    console.log("getEncryptionDetails",res)
          let Val1 = res["d"]["Val1"]
          let Val2 = res["d"]["Val2"]
          let Val3 = res["d"]["Val3"]
          let Val4 = res["d"]["Val4"]
          let Val5 = res["d"]["Val5"]
          return  this.getTaxpayerDashboard( Val1,Val2,Val3,Val4,Val5)
        }),
        flatMap((res) => {
        //  console.log("second pipe",res)
          localStorage.setItem("AuthEuser",res["d"]["Euser"]);
          localStorage.setItem("AuthFbguid",res["d"]["Fbguid"]); 
          this.setIds();  
        //  console.log("third pipe",res)
           
          let url =  this.baseUrl+AuthorizeAPIConstants.AuthorizationRequests+`(AuditorTin='',TaxpayerTin='',Fbguid='${this.Fbguid}',Euser='${this.Euser}',Lang='${this.lang}')?&$expand=ActivitiesSet,ActivityDetailSet,RetYearSet,TaxTypSet,ETServiceSet&$format=json`;
          //let url =  this.baseUrl+AuthorizeAPIConstants.AuthorizationRequests+`(AuditorTin='',TaxpayerTin='',Fbguid='',Euser='',Lang='${this.lang}')?&$expand=ActivitiesSet,ActivityDetailSet,RetYearSet,TaxTypSet,ETServiceSet&$format=json`;
          return this.http.get(url);        
        // returns an Observable of type Z
        }))

        }
      
    else{
      let url =  this.baseUrl+AuthorizeAPIConstants.AuthorizationRequests+`(AuditorTin='',TaxpayerTin='',Fbguid='${this.Fbguid}',Euser='${this.Euser}',Lang='${this.lang}')?&$expand=ActivitiesSet,ActivityDetailSet,RetYearSet,TaxTypSet,ETServiceSet&$format=json`;
      //let url =  this.baseUrl+AuthorizeAPIConstants.AuthorizationRequests+`(AuditorTin='',TaxpayerTin='',Fbguid='',Euser='',Lang='${this.lang}')?&$expand=ActivitiesSet,ActivityDetailSet,RetYearSet,TaxTypSet,ETServiceSet&$format=json`;
      return this.http.get(url);
    }      
  }
  
  addAuthorizationRequest(formdata){
   // exciseObj.Operationz = "01";
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
      
    };
    return this.http.post(
      this.baseUrl + AuthorizeAPIConstants.AuthorizationAddRequest,
      formdata,
      { headers }
    );
    
  }
  //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='3311655726')
  getEncryptionDetails(Gpart){
    let url =  this.baseUrl+AuthorizeAPIConstants.AuthorizationEncryptDetails+`(Gpart='${Gpart}')`;
    return this.http.get(url);

  }
  //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='EN',Euser1='00000000000001090437',Euser2='00000000001000093144',Euser3='00000001000000099403',Euser4='00000010000000099828',Euser5='00001000000000098960',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet
  getTaxpayerDashboard(val1,val2,val3,val4,val5){
    let url = this.baseUrl+AuthorizeAPIConstants.AuthorizationTaxPayerDashboard+`(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='${this.lang}',Euser1='${val1}',Euser2='${val2}',Euser3='${val3}',Euser4='${val4}',Euser5='${val5}',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet`
    return this.http.get(url);

    //tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='EN',Euser1='00000000000001090437',Euser2='00000000001000093144',Euser3='00000001000000099403',Euser4='00000010000000099828',Euser5='00001000000000098960',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet

  }
  getAuditorNames(){
    let url =  this.baseUrl+AuthorizeAPIConstants.AuditorNameSet+"?&$format=json";
    return this.http.get(url);
  }
  getAuditorNameByTin(tin){
  //  console.log("inside getAuditorNameByTin service")
    //let url = "https://sapgatewayqa.gazt.gov.sa/sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/ZAUDEMP_HDRSet"

    let url =  this.baseUrl+AuthorizeAPIConstants.AuthorizationNameRequest
   +`(UserNo='${tin}',Login='',Addrnumber='',Euser='',Fbguid='')?&$expand=ZAUDEMP_itemSet,ZDD_BRANCHSet`;
    return this.http.get(url);
  }
  deleteAuthorization(body,taxpayerTin,auditorTin){
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.put(
      this.baseUrl + AuthorizeAPIConstants.AuthorizationDeleteRequest+`(TaxpayerTin='${taxpayerTin}',AuditorTin='${auditorTin}')`,
      body,
      { headers }
    );
    
  }
}
