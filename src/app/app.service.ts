import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private dataSource = new BehaviorSubject<any>("");
  data = this.dataSource.asObservable();

  private dataSource4 = new BehaviorSubject<any>("0");
  data4 = this.dataSource4.asObservable();

  private dataSource3 = new BehaviorSubject<any>("");
  data3 = this.dataSource3.asObservable();

  private dataSource1 = new BehaviorSubject<any>("Gregorian");
  data1 = this.dataSource1.asObservable();

  private dataSource5 = new BehaviorSubject<any>("0");
  data5 = this.dataSource5.asObservable();

  private dataSource6 = new BehaviorSubject<any>("0");
  data6 = this.dataSource6.asObservable();

  private dataSource7 = new BehaviorSubject<any>("");
  data7 = this.dataSource7.asObservable();

  
  private dataSource8 = new BehaviorSubject<any>("");
  data8 = this.dataSource8.asObservable();


  private dataSource9 = new BehaviorSubject<any>("");
  data9 = this.dataSource9.asObservable();

  private dataSource10 = new BehaviorSubject<any[]>([]);
  data10 = this.dataSource10.asObservable();

  private dataSource11 = new BehaviorSubject<any>("");
  data11 = this.dataSource11.asObservable();

  private dataSource12 = new BehaviorSubject<any[]>([]);
  data12 = this.dataSource12.asObservable();


  public cancelConsolidateStep2 = new BehaviorSubject<boolean>(false);
  public cancelConsolidateStep3 = new BehaviorSubject<boolean>(false);

  public ActiveFormat=new BehaviorSubject<string>("");

  lang: string;

  baseUrl = environment.url;
  private cityList: any;
  private countryList: any;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  logout() {
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
      this.baseUrl +
        "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/VRNHSet(Fbnumz='',PortalUsrz='',Langz='" +
        lng +
        "',Officerz='',Gpartz='',TxnTpz='04',Euser='',Fbguid='')?&$expand=ADDRESSSet,IBANSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,NOTESSet,QUESTIONSSet,QUESLISTSet,ELGBL_DOCSet&$format=json",
      httpOptions
    );
  }

  logoutMain() {
    let url =
      this.baseUrl + "sap/public/bc/icf/logoff?keepMYSAPSSO2Cookie=true";
    return this.http.get(url);
  }

  getUserInfo(tin) {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPFL_HEADERSet(Taxpayerz='"+ tin +
      "',Langz='" + lng +"',Euser='',Fbguid='null',Euser1='',Euser2='',Euser3='',Euser4='',Euser5='')?$expand=AccountSet,TPOC_DataSet&$format=json"
    );
  }

  getVatData() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/VRNHSet(Fbnumz=%27%27,PortalUsrz=%27%27,Langz=%27E%27,Officerz=%27%27,Gpartz=%27%27,TxnTpz=%2704%27,Euser=%27%27,Fbguid=%27%27)?&$expand=ADDRESSSet,IBANSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,NOTESSet,QUESTIONSSet,QUESLISTSet,ELGBL_DOCSet&$format=json&sap-language=" +
      this.lang;
    const httpOptions = {
      headers: new HttpHeaders({
        ichannel: "243",
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getData() {
    // return this.http.get("assets/data.json");
    return this.http.get("assets/data1.json");
  }

  getPhoneCode() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_DROPDOWN_SRV/CountryCodeSet?$filter=Spras%20eq%20%27" +
      this.lang +
      "%27";
    return this.http.get(url);
  }
  updatedDataSelection(data: any) {
    this.dataSource.next(data);
  }

  updatedDataSelection1(data1: any) {
    this.dataSource1.next(data1);
  }

  updatedDataSelection3(data3: any) {
    this.dataSource3.next(data3);
  }

  updatedDataSelection4(data4: any) {
    this.dataSource4.next(data4);
  }

  updatedDataSelection5(data5: any) {
    this.dataSource5.next(data5);
  }

  updatedDataSelection6(data6: any) {
    this.dataSource6.next(data6);
  }

  updatedDataSelection7(data7: any) {
    this.dataSource7.next(data7);
  }

  updatedDataSelection8(data8: any) {
    this.dataSource8.next(data8);
  }

  updatedDataSelection9(data9: any) {
    this.dataSource9.next(data9);
  }

  updatedDataSelection10(data10: any) {
    this.dataSource10.next(data10);
  }

  updatedDataSelection11(data11: any) {
    this.dataSource11.next(data11);
  }

  updatedDataSelection12(data12: any) {
    this.dataSource12.next(data12);
  }




  getOTP(obj) {
    let url =
      this.baseUrl + "sap/opu/odata/SAP/Z_ANGULAR_COMMON_SRV/OtpCodeSet?sap-language="+this.lang;
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    // YYYY-MM-DDT00:00:00
    // obj['Id'] = '1029573688'
    // obj['IdType'] = 'ZS0003'
    // obj['MobileNo'] = '00966576769870'
    // obj['BuDob'] = '2020-07-14T00:00:00'
    // if(val) {
    //   obj['MobileOtp'] = val,
    //   obj['Zsubmit'] = 'X'
    // }

    return this.http.post(url, obj, { headers });
  }

  getTaxpayerInfo() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='ZS0001',Idnum='1029573688',Country='',PassExpDt='2020528',TaxpDob='2020528')";
    return this.http.get(url);
  }

  getCityList(): Observable<any> {

    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }

    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_DROPDOWN_SRV/dropdown_headerSet(Spras=%27" +
      lng +
      "%27,Land1=%27SA%27,Bland=%27%27,Cityc=%27%27)?&$expand=country_dropdownSet,State_dropdownSet,city_dropdownSet&$format=json";
    // return this.http.get(url).pipe(
    //   tap((data: any) => {
    //     //save the returned data so we can re-use it later without making more HTTP calls
    //     this.cityList = data;
    //   })
    // );
    return this.http.get(url);
  }

  getCountry(): Observable<any> {

    if (this.cityList) {
      return of(this.cityList);
    }

    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }

    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_DROPDOWN_SRV/dropdown_headerSet(Spras=%27" +
      lng +
      "%27,Land1=%27%27,Bland=%27%27,Cityc=%27%27)?&$expand=country_dropdownSet,State_dropdownSet,city_dropdownSet&$format=json";
    return this.http.get(url).pipe(
      tap((data: any) => {
        //save the returned data so we can re-use it later without making more HTTP calls
        this.cityList = data;
      })
    );
  }

  getBranchList(): Observable<any> {
    if (this.countryList) {
      return of(this.countryList);
    }
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_BRANCH_DROPDOWN_SRV/branch_dropdownSet?$filter=Spras%20eq%20%27" +
      lng +
      "%27&$format=json";
    return this.http.get(url).pipe(
      tap((data: any) => {
        //save the returned data so we can re-use it later without making more HTTP calls
        this.countryList = data;
      })
    );
  }
}
