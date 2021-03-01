import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { apiconstants } from "../constants/apiConstants";
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from "@angular/platform-browser-dynamic";

@Injectable({
  providedIn: "root",
})
export class SignupService {
  baseUrl = environment.url;
  lang: string;
  lng: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lng = "A";
    } else {
      this.lang = "EN";
      this.lng = "E";
    }
  }

  getAddress(type, id) {
    return this.http.get(
      this.baseUrl +
        apiconstants.AddressSet +
        "$filter=IdType eq '" +
        type +
        "' and IdNumber eq '" +
        id +
        "' and Tin eq '' and TpType eq 'I'"
    );
  }
  submit(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };

    return this.http.post(this.baseUrl + apiconstants.individualSubmit, obj, {
      headers,
    });
  }

  getCaseGuid() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_PUSR_SIGNUP_SRV/signup_headerSet?$filter=AType%20eq%20%271%27";
    return this.http.get(url);
  }

  getCompanyValidation(obj) {
    return this.http.get(
      this.baseUrl +
        apiconstants.UserTypeValidation +
        "taxpayer_nameSet(Tin='',Idtype='" +
        obj.type +
        "',Idnum='" +
        obj.idNumber +
        "',Country='',PassExpDt='',TaxpDob='')?sap-language=" +
        this.lang
    );
  }

  getGovernment() {
    let url =
      this.baseUrl + "sap/opu/odata/SAP/Z_PUSR_SIGNUP_SRV/signup_headerSet";
    return this.http.get(url);
  }

  // https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_NEW_REGISTRATON_SRV/Nreg_HeaderSet

  postGovernment(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/Z_PUSR_SIGNUP_SRV/signup_headerSet";
    return this.http.post(url, obj, { headers });
  }

  postAuditor(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/Z_PUSR_SIGNUP_SRV/signup_headerSet";
    return this.http.post(url, obj, { headers });
  }
  //Company api
  getBranches() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_BRANCH_DROPDOWN_SRV/branch_dropdownSet?$filter=Spras%20eq%20%27" +
      this.lng +
      "%27";
    return this.http.get(url);
  }

  getTaxpayerInfo(tin) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_NEW_REGISTRATON_SRV/Nreg_HeaderSet(Euser='',Fbguid='',Gpartx='" +
      tin +
      "',Langx='" +
      this.lng +
      "',Operationx='',PortalUsrx='',Srcidentifyx='',StepNumberx='01',Fbnumx='',Fbstax='',Fbustx='')?&$expand=Nreg_ActivitySet,Nreg_AddressSet,Nreg_ContactSet,Nreg_CpersonSet,Nreg_IdSet,Nreg_OutletSet,Nreg_ShareholderSet,Nreg_FormEdit,Nreg_BtnSet,off_notesSet,AttDetSet,Nreg_MSGSet" +
      this.lng +
      "%27";
    return this.http.get(url);
  }

  getNationality() {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_NATIOANALITY_SRV/nationalitySet?$filter=ANationality%20eq%20%27SAUDI%27%20and%20Spras%20eq%20%27" +
      this.lng +
      "%27";
    return this.http.get(url);
  }

  getCompanyData(id) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_HeaderSet(IdType='ZS0005',Id='" +
      id +
      "',OtpType='002',CommMobNo='',CommMobileOtp='',Euser='',Fbguid='',Gpartx='',Langx='E',Operationx='',PortalUsrx='',Srcidentifyx='',StepNumberx='01',Fbnumx='',Fbstax='',Fbustx='')?&$expand=Nreg_ActivitySet,Nreg_AddressSet,Nreg_ContactSet,Nreg_CpersonSet,Nreg_IdSet,Nreg_OutletSet,Nreg_ShareholderSet,Nreg_FormEdit,Nreg_BtnSet,off_notesSet,AttDetSet,Nreg_MSGSet";
    return this.http.get(url);
  }

  attachmentApi(guid, doctype, obj3, file) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: file,
    };

    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV_01/AttachSet(RetGuid='" +
      guid +
      "',OutletRef='',Flag='N',Dotyp='" +
      doctype +
      "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet";
    return this.http.post(url, obj3, {
      headers,
    });
  }

  getNewRegSet(obj) {
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_HeaderSet(IdType='',Id='" +
        obj.id +
        "',OtpType=''," +
        "CommMobNo='" +
        obj.mobile +
        "',CommMobileOtp='" +
        obj.otp +
        "',Euser='',Fbguid='',Gpartx='" +
        obj.tin +
        "',Langx='" +
        this.lng +
        "',Operationx='',PortalUsrx='" +
        obj.email +
        "',Srcidentifyx='',StepNumberx='01',Fbnumx='',Fbstax='',Fbustx='')?&$expand=Nreg_ActivitySet,Nreg_AddressSet,Nreg_ContactSet," +
        "Nreg_CpersonSet,Nreg_IdSet,Nreg_OutletSet,Nreg_ShareholderSet,Nreg_FormEdit,Nreg_BtnSet,off_notesSet,AttDetSet,Nreg_MSGSet"
    );
  }
  getUpdatedRegSet(regObj) {
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_HeaderSet(IdType='" +
        regObj.IdType +
        "',Id='" +
        regObj.Id +
        "',OtpType='" +
        regObj.OtpType +
        "'," +
        "CommMobNo='" +
        regObj.CommMobNo +
        "',CommMobileOtp='" +
        regObj.CommMobileOtp +
        "',Euser='" +
        regObj.Euser +
        "',Fbguid='" +
        regObj.Fbguid +
        "',Gpartx='" +
        regObj.Gpartx +
        "',Langx='" +
        this.lng +
        "',Operationx='" +
        regObj.Operationx +
        "',PortalUsrx='" +
        regObj.PortalUsrx +
        "',Srcidentifyx='" +
        regObj.Srcidentifyx +
        "',StepNumberx='" +
        regObj.StepNumberx +
        "',Fbnumx='" +
        regObj.Fbnumx +
        "',Fbstax='" +
        regObj.Fbstax +
        "',Fbustx='" +
        regObj.Fbustx +
        "')?&$expand=Nreg_ActivitySet,Nreg_AddressSet,Nreg_ContactSet," +
        "Nreg_CpersonSet,Nreg_IdSet,Nreg_OutletSet,Nreg_ShareholderSet,Nreg_FormEdit,Nreg_BtnSet,off_notesSet,AttDetSet,Nreg_MSGSet"
    );
  }

  getGroupActivity() {
    return this.http.get(
      this.baseUrl +
        "/sap/opu/odata/sap/Z_REG_ACTIVITY_SRV/act_headerSet(Spras='" +
        this.lng +
        "',IndSector='')?&$expand=act_groupSet,act_subgroupSet,activitySet"
    );
  }

  validateCR(val) {
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/Z_NREG_CR_VALDATE_SRV/validatecrSet(Crnum='" +
        val +
        "')"
    );
  }

  attachmentSubmit(obj, obj2, file, obj3, outlet?) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: encodeURI(file),
    };
    return this.http.post(
      this.baseUrl + // "sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(OutletRef='" +
        apiconstants.Attachment +
        "/AttachSet(OutletRef='" +
        outlet +
        "',RetGuid='" +
        obj +
        "',Flag='N',Dotyp='" +
        obj2 +
        "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
        this.lang,
      obj3,
      {
        headers,
      }
    );
  }

  postNewRegSet(req) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_HeaderSet";
    return this.http.post(url, req, { headers });
  }

  getFiscalDate(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl + "sap/opu/odata/SAP/Z_NREG_FD_MAX_DATE_SRV/fd_end_dateSet";
    return this.http.post(url, obj, { headers });
  }
  getCompanyDetails(companyID: number) {
    return this.http.get(
      this.baseUrl +
        apiconstants.UserTypeValidation +
        "taxpayer_nameSet(Tin='',Idtype='ZS0005',Idnum='" +
        companyID +
        "',Country='',PassExpDt='',TaxpDob='')?sap-language=" +
        this.lang
    );
  }
  getIssueByList(lang) {
    let issueByListEng = [
      {
        key: 90701,
        text: "Communications and Information Technology Commission",
      },
      {
        key: 90702,
        text: "Ministry of Commerce",
      },
      {
        key: 90703,
        text: "Ministry of Health",
      },
      {
        key: 90704,
        text: "Ministry of Media",
      },
      {
        key: 90705,
        text: "Ministry of Environment Water & Agriculture",
      },
      {
        key: 90706,
        text: "Ministry of Municipal and Rural Affairs",
      },
      {
        key: 90707,
        text: "Ministry of Education",
      },
      {
        key: 90708,
        text: "Technical and Vocational Training Corporation",
      },
      {
        key: 90709,
        text: "Ministry of Human Resources and Social Development",
      },
      {
        key: 90710,
        text: "Ministry of Islamic Affairs Dawah and Guidance",
      },
      {
        key: 90711,
        text: "Ministry of Hajj and Umrah",
      },
      {
        key: 90712,
        text: "Ministry of Investment",
      },
      {
        key: 90713,
        text: "Saudi Electricity Company",
      },
      {
        key: 90714,
        text: "Saudi Arabian Monetary Agency",
      },
      {
        key: 90715,
        text: "General Authority of Civil Aviation",
      },
      {
        key: 90716,
        text: "Ministry of Interior",
      },
      {
        key: 90717,
        text: "Ministry of Transportation",
      },
      {
        key: 90719,
        text: "Same Government Agency",
      },
      {
        key: 90721,
        text: "Municipality",
      },
      {
        key: 90722,
        text: "Saudi Organization for Certified public Accountants",
      },
      {
        key: 90723,
        text: "Ministry of Tourism",
      },
      {
        key: 90725,
        text: "Ministry Of Justice",
      },
      {
        key: 90729,
        text: "Saudi Council of Engineers",
      },
      {
        key: 90724,
        text: "Ministry of Industry and Mineral Resources",
      },
      {
        key: 90740,
        text: "Ministry of Sports",
      },
      {
        key: 90731,
        text: "Saudi Wildlife Authority",
      },
      {
        key: 90732,
        text: "Saudi Authority for Industrial Cities and Technology Zones",
      },
      {
        key: 90733,
        text:
          "The General Authority of Meteorology and Environmental Protection",
      },
      {
        key: 90735,
        text: "Saudi Food and Drug Authority",
      },
      {
        key: 90736,
        text: "Saudi Ports Authority",
      },
      {
        key: 90737,
        text: "Capital Markets Authority",
      },
      {
        key: 90738,
        text: "Electricity & CoGeneration Regulatory Authority",
      },
      {
        key: 90739,
        text: "Ministry of Housing",
      },
      {
        key: 90741,
        text: "Ministry of Energy",
      },
      {
        key: 90718,
        text: "Other",
      },
    ];

    let issueByListArb = [
      {
        key: 90701,
        text: "هيئة الاتصالات وتقنية المعلومات",
      },
      {
        key: 90702,
        text: "وزارة التجارة",
      },
      {
        key: 90703,
        text: "وزارة الصحة",
      },
      {
        key: 90704,
        text: "	وزارة الإعلام",
      },
      {
        key: 90705,
        text: "	وزارة البيئة والمياه والزراعة",
      },
      {
        key: 90706,
        text: "	وزارة الشؤون البلدية والقروية",
      },
      {
        key: 90707,
        text: "	وزارة التعليم",
      },
      {
        key: 90708,
        text: "	المؤسسة العامة للتدريب التقني والمهني",
      },
      {
        key: 90709,
        text: "	وزارة الموارد البشرية والتنمية الاجتماعية",
      },
      {
        key: 90710,
        text: "	وزارة الشؤون الإسلامية والأوقاف والدعوة والإرشاد",
      },
      {
        key: 90711,
        text: "	وزارة الحج والعمرة",
      },
      {
        key: 90712,
        text: "	وزارة الاستثمار",
      },
      {
        key: 90713,
        text: "	الشركة السعودية للكهرباء",
      },
      {
        key: 90714,
        text: "	مؤسسة النقد العربي السعودي",
      },
      {
        key: 90715,
        text: "	الهيئة العامة للطيران المدني",
      },
      {
        key: 90716,
        text: "	وزارة الداخلية",
      },
      {
        key: 90717,
        text: "	وزارة النقل",
      },
      {
        key: 90719,
        text: "	نفس الجهة الحكومية",
      },
      {
        key: 90721,
        text: "	الأمانات",
      },
      {
        key: 90722,
        text: "	الهيئة السعودية للمحاسبين القانونيين",
      },
      {
        key: 90723,
        text: "	وزارة السياحة",
      },
      {
        key: 90725,
        text: "	وزارة العدل",
      },
      {
        key: 90729,
        text: "	الهيئة السعودية للمهندسين",
      },
      {
        key: 90724,
        text: "	وزارة الصناعة والثروة المعدنية",
      },
      {
        key: 90740,
        text: "	وزارة الرياضة",
      },
      {
        key: 90731,
        text: "	الهيئة السعودية للحياة الفطرية",
      },
      {
        key: 90732,
        text: "	الهيئة السعودية للمدن الصناعية ومناطق التقنية",
      },
      {
        key: 90733,
        text: "	الهيئة العامة للأرصاد وحماية البيئة",
      },
      {
        key: 90735,
        text: "الهيئة العامة للغذاء والدواء",
      },
      {
        key: 90736,
        text: "	الهيئة العامة للموانئ",
      },
      {
        key: 90737,
        text: "	هيئة السوق المالية",
      },
      {
        key: 90738,
        text: "	هيئة تنظيم الكهرباء والإنتاج المزدوج",
      },
      {
        key: 90739,
        text: "	وزارة الأسكان",
      },
      {
        key: 90741,
        text: "	وزارة الطاقة",
      },
      {
        key: 90718,
        text: "	أخرى",
      },
    ];
    console.log("getissueByList", lang);
    return lang == "ar" ? issueByListArb : issueByListEng;
  }
  getTINDetails(tin) {
    return this.http.get(
      this.baseUrl +
        apiconstants.UserTypeValidation +
        "taxpayer_nameSet(Tin='" +
        tin +
        "',Idtype='',Idnum='',Country='',PassExpDt='',TaxpDob='')?sap-language=" +
        this.lang
    );
  }

  getIdTypesList(lang) {
    let idTypesListArb = [
      {
        name: "هوية وطنية",
        value: "ZS0001",
      },
      { name: "هوية مقيم", value: "ZS0002" },
      { name: "هوية خليجية", value: "ZS0003" },
      { name: "رقم الجواز", value: "FS0002" },
    ];

    let idTypesEng = [
      {
        name: "National ID",
        value: "ZS0001",
      },
      { name: "Iqama ID", value: "ZS0002" },
      { name: "GCC ID", value: "ZS0003" },
      { name: "Passport", value: "FS0002" },
    ];

    return lang == "ar" ? idTypesListArb : idTypesEng;
  }

  deleteOutlet(obj) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_OutletSet(Fbnumx='" +
      obj.fbNum +
      "',Actno='" +
      obj.actnm +
      "',PortalUsrx='" +
      obj.email +
      "',Gpartx='')";
    return this.http.delete(url, { headers });
  }

  deleteShareholder(sholderObj) {
    //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_ANGULAR_REGISTRATON_SRV/Nreg_ShareholderSet(FormGuid='005056B1365C1EEAB4CE7954D7B8E009',Shno='001')

    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ANGULAR_REGISTRATION_SRV/Nreg_ShareholderSet(FormGuid='" +
      sholderObj.fbNum +
      "',Shno='" +
      sholderObj.shNo +
      "')";
    return this.http.delete(url, { headers });
  }

  getTaxPayerDetails(
    Tin = "",
    Idtype = "",
    Idnum = "",
    Country = "",
    PassExpDt = "",
    TaxpDob = ""
  ) {
    return this.http.get(
      this.baseUrl +
        apiconstants.UserTypeValidation +
        "taxpayer_nameSet(Tin='" +
        Tin +
        "',Idtype='" +
        Idtype +
        "',Idnum='" +
        Idnum +
        "',Country='" +
        Country +
        "',PassExpDt='" +
        PassExpDt +
        "',TaxpDob='" +
        TaxpDob +
        "')?sap-language=" +
        this.lang
    );
  }

  getShIdeTypesList(lang) {
    let idTypesEng = [
      {
        Key: "ZS0001",
        Text: "National ID",
      },
      {
        Key: "ZS0002",
        Text: "Iqama ID",
      },
      {
        Key: "ZS0003",
        Text: "GCC ID",
      },
      {
        Key: "ZS0012",
        Text: "GCC Company Id",
      },
      {
        Key: "ZS0005",
        Text: "Company ID",
      },
      {
        Key: "FS0002",
        Text: "Passport Number",
      },
      {
        Key: "ZS0011",
        Text: "TIN in your country",
      },
    ];
    let idTypesListArb = [
      {
        Key: "ZS0001",
        Text: "رقم الهوية الوطنية",
      },
      {
        Key: "ZS0002",
        Text: "رقم الإقامة",
      },
      {
        Key: "ZS0003",
        Text: "رقم هوية مواطني دول الخليج",
      },
      {
        Key: "ZS0012",
        Text: "رقم الشركة الخليجية",
      },
      {
        Key: "ZS0005",
        Text: "رقم الشركة",
      },

      {
        Key: "FS0002",
        Text: "رقم الجواز",
      },
      {
        Key: "ZS0011",
        Text: "الرقم المميز في بلدك",
      },
    ];
    return lang == "ar" ? idTypesListArb : idTypesEng;
  }

  getShareHolderTypesList(lang) {
    let shtListEng = [
      {
        key: "MC01",
        text: "Member Of Consortium",
      },
    ];
    let shtListArb = [
      {
        key: "MC01",
        text: "عضو محاصة",
      },
    ];
    return lang == "ar" ? shtListArb : shtListEng;
  }

  getShareHolderTypesListForCompany(lang) {
    let shtListEng = [
      {
        key: "SH01",
        text: "Founding Partner",
      },
      {
        key: "SH02",
        text: "Shareholder Partner",
      },
      {
        key: "SH03",
        text: "Solidarity Partner",
      },
      {
        key: "SH04",
        text: "Testator Partner",
      },
    ];
    let shtListArb = [
      {
        key: "SH01",
        text: "مساهم مؤسس",
      },
      {
        key: "SH02",
        text: "مساهم",
      },
      {
        key: "SH03",
        text: "مساهم بالتضامن",
      },
      {
        key: "SH04",
        text: "مساهم بالتوصية",
      },
    ];
    return lang == "ar" ? shtListArb : shtListEng;
  }
  deleteAttachment(Dotyp, Doguid) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
    };

    return this.http.delete(
      this.baseUrl +
        apiconstants.Attachment +
        "/AttachMedSet(OutletRef='',RetGuid='',Flag='N',Dotyp='" +
        Dotyp +
        "',SchGuid='',Srno=1,Doguid='" +
        Doguid +
        "',AttBy='TP')/$value",
      { headers }
    );
  }
  downloadAttachment(url) {
    const requestOptions: Object = {
      /* other options here */
      responseType: "blob",
    };
    return this.http.get(url, requestOptions);
  }

  getTypeOfSharePercentageDetails(Bpkind: string = "", Idtype: string = "") {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_REG_SHAREHOLDER_ENTITY_SRV/shareentitySet(Bpkind='" +
      Bpkind +
      "',Idtype='" +
      Idtype +
      "')";
    return this.http.get(url, { headers });
  }
  getRequestSet(obj) {
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/ZDP_RGEN_M_SRV/RGEN_HDRSet(Fbnumz='',PortalUsrz='',Langz='E',Officerz='',Gpartz='',UserTypz='',TxnTpz='')?&$expand=RGEN_ATTACHSet,NotesSet&$format=json"
    );
  }

  getNationality1() {
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_RGEN_M_SRV/NationalitySet";
    return this.http.get(url);
  }

  getETTaxPayerDetails(
    Tin = "",
    Idtype = "",
    Idnum = "",
    Country = "",
    PassExpDt = "",
    TaxpDob = ""
  ) {
    return this.http.get(
      this.baseUrl +
        "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SIGNUP_SRV/taxpayer_nameSet(Tin='" +
        Tin +
        "',Idtype='" +
        Idtype +
        "',Idnum='" +
        Idnum +
        "',Country='" +
        Country +
        "',PassExpDt='" +
        PassExpDt +
        "',TaxpDob='" +
        TaxpDob +
        "')?sap-language=" +
        this.lang
    );
  }
  postRequestSet(req) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };
    let url = this.baseUrl + "sap/opu/odata/SAP/ZDP_RGEN_M_SRV/RGEN_HDRSet";
    return this.http.post(url, req, { headers });
  }

  getNewVATSignUpSet(obj) {
    return this.http.get(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_EPRG_SRV/signup_headerSet(Type='" + obj.id + "')");
  }

  postNewVATSignSet(req) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      ichannel: "243",
    };    
    return this.http.post(
      this.baseUrl +
      "sap/opu/odata/SAP/ZDP_EPRG_SRV/signup_headerSet?sap-language=" +
      this.lang,
      req,
      {
        headers,
      }
    );
  }

  getAttachmentList(epCode = ''){
    return this.http.get(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_VTEP_UH_SRV/SUPT_DOCSet?$filter=Lang eq '" + this.lang + "' and EpCode eq '" + epCode + "'");
    }

  getLegalPersonCategory() {
    return this.http.get(
     this.baseUrl + "sap/opu/odata/SAP/ZDP_VTEP_UH_SRV/VTEP_HDRSet(Fbtypz='VTEP',Fbnum='',Lang='" + this.lang + "',Officer='',Gpart='',Status='',TxnTp='CRE_VTEP',Formproc='ZTAX_VT_REG')?&$expand=VTEP_BTNSet,PROVINCESet,CITYSet,ELG_CATESet,QUESLISTSet&$format=json");    
    }

  getVATRegSet(emailId){
    return this.http.get(
      this.baseUrl + "sap/opu/odata/SAP/ZDP_VTEP_SRV/VTEP_HEADERSet(Fbnumz='',PortalUsrz='',Lang='"+this.lang+"',Officerz='',Gpartz='',TxnTpz='CRE_VTEP',Euser='00000001000000215301',FormGuid='005056B1365C1EEB9DBFFF4FBACA29F2')?&$expand=VTEP_ATTSet,VTCP_ATTSet,ATTACHMENTSet,VTCPSet,NOTESet&$format=json");
    }

    IBANValidation(IBANNo){
      return this.http.get(
        this.baseUrl + "sap/opu/odata/SAP/ZDP_CHECK_IBAN_SRV/HEADERSet(Iban='"+IBANNo+"')");
      }
  
}
