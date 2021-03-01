import { environment } from "src/environments/environment";
const baseUrl = environment.url;
const sapClient = environment.sapclient;
export const VATConstants = {
  menu: [
    {
      title: "TIN Status",
      t2: "إقرارات ضريبة القيمة المضافة",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },

    {
      title: "User Management",
      t2: "User Management",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Returns of Zakat/ Income tax",
      t2: "Returns of Zakat/ Income tax",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },

    {
      title: "Edit Zakat Registration",
      t2: "Edit Zakat Registration",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },

    {
      title: "Authorization Services",
      t2: "Authorization Services",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Account Statement",
      t2: "Account Statement",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Field Inspection Cases",
      t2: "Field Inspection Cases",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Request for ZakatIncome Tax Instalment Plan",
      t2: "Request for ZakatIncome Tax Instalment Plan",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Deregistration",
      t2: "Deregistration",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Deregister for TIN",
      t2: "Deregister for TIN",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/user.svg",
      flag: false,
      icon2: "assets/images/VAT_1.png",
    },
    {
      title: "Deregister for Outlet/ Outlets",
      t2: "الشهادات الضريبية",
      url:
        baseUrl +
        "sap/bc/ui5_ui5/sap/zuip_corrmain/index.html??sap-client=" +
        sapClient +
        "&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=" +
        baseUrl +
        "&?clientfg=" +
        sapClient +
        "&UserTin=",
      icon: "assets/image/password.svg",
      flag: false,
      icon2: "assets/images/patent1.png",
    },
  ],
  QUESTIONSSet: [
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 1,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "001",
      QoptNo: "011",
      QoptTxt: "Less than 187,500 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 2,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "001",
      QoptNo: "012",
      QoptTxt: "Greater than 187,500 until 375,000 SAR",
      QoptAns: "1",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 3,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "001",
      QoptNo: "013",
      QoptTxt: "Greater than 375,000 until 1,000,000 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 4,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "001",
      QoptNo: "014",
      QoptTxt: "Greater than 1,000,000 until 40,000,000 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('001')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 5,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "001",
      QoptNo: "015",
      QoptTxt: "Greater than 40,000,000 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 6,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "002",
      QoptNo: "021",
      QoptTxt: "Less than 187,500 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 7,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "002",
      QoptNo: "022",
      QoptTxt: "Greater than 187,500 until 375,000 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 8,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "002",
      QoptNo: "023",
      QoptTxt: "Greater than 375,000 until 1,000,000 SAR",
      QoptAns: "1",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 9,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "002",
      QoptNo: "024",
      QoptTxt: "Greater than 1,000,000 until 40,000,000 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('002')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 10,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "002",
      QoptNo: "025",
      QoptTxt: "Greater than 40,000,000 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('003')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('003')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 11,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "003",
      QoptNo: "031",
      QoptTxt: "Less than 187,500 SAR",
      QoptAns: "0",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('003')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('003')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 12,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "003",
      QoptNo: "032",
      QoptTxt: "Greater than or equal to 187,500 SAR",
      QoptAns: "1",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('004')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('004')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 13,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "004",
      QoptNo: "041",
      QoptTxt: "Less than 187,500 SAR",
      QoptAns: "1",
    },
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('004')",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/QUESTIONSSet('004')",
        type: "ZDP_VAT_NW_RG_SRV.QUESTIONS",
      },
      Mandt: "210",
      FormGuid: "005056B1365C1EDAADC545A9F7A6AF9C",
      DataVersion: "00001",
      LineNo: 14,
      RankingOrder: "99",
      ResidencyTy: "R",
      QueNo: "004",
      QoptNo: "042",
      QoptTxt: "Greater than or equal to 187,500 SAR",
      QoptAns: "0",
    },
  ],
  CONTACT_PERSONSet: [
    {
      __metadata: {
        id:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/CONTACT_PERSONSet(0)",
        uri:
          baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/CONTACT_PERSONSet(0)",
        type: "ZDP_VAT_NW_RG_SRV.CONTACT_PERSON",
      },
      TransactionType: "",
      FormGuid: "",
      DataVersion: "00000",
      LineNo: 0,
      RankingOrder: "00",
      Srcidentify: "T002",
      Gpart: "",
      Enddt: null,
      Contacttp: "",
      Defaultfg: false,
      Startdt: null,
      Firstnm: "",
      Lastnm: "",
      Relationtp: "",
      Fathernm: "",
      Grandfathernm: "",
      Familynm: "",
      Dobdt: null,
      StartdtC: "",
      Type: "",
      Idnumber: "",
      Title: "",
      Initials: "",
    },
  ],
  CONTACTDTSet: [
    {
      __metadata: {
        id: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/CONTACTDTSet(0)",
        uri: baseUrl + "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/CONTACTDTSet(0)",
        type: "ZDP_VAT_NW_RG_SRV.CONTACTDT",
      },
      TransactionType: "",
      FormGuid: "",
      DataVersion: "00000",
      LineNo: 0,
      RankingOrder: "00",
      Srcidentify: "T002",
      Consnumber: "000",
      Begda: null,
      Endda: null,
      TelNumber: "",
      R3User: "",
      SmtpAddr: "",
      MobNumber: "",
    },
  ],

  IBANSet: [
    {
      __metadata: {
        id:
          baseUrl +
          "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/IBANSet('SA3020000003230358769901')",
        type: "ZDP_VAT_NW_RG_SRV.IBAN",
        uri:
          baseUrl +
          "sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/IBANSet('SA3020000003230358769901')",
      },
      Partner: "",
      Bkvid: "",
      Iban: "",
    },
  ],

  dashMenu: [
    {
      name: "Dashboard",
      arb: "لوحة البيانات",
      active: true,
      path: "/mains/dashboard",
    },
    {
      name: "Commitments",
      arb: "الالتزامات",
      active: false,
      path: "/mains/commitments",
    },
    {
      name: "Tax Management",
      arb: "إدارة الضرائب",
      active: false,
      path: "/mains/tax",
    },
    {
      name: "Returns",
      arb: "الإقرارات",
      active: false,
      path: "/mains/returns",
    },
    {
      name: "Bills",
      arb: "الفواتير",
      active: false,
      path: "/mains/bills",
    },
    {
      name: "Refunds",
      arb: "استرداد المدفوعات",
      active: false,
      path: "#",
    },
    {
      name: "Account Statements",
      arb: "كشف الحساب",
      active: false,
      path: "/mains/accountstatement",
    },
    {
      name: "Instalment Plan",
      arb: "طلب خطة تقسيط",
      active: false,
      path: "/mains/installmentplan",
    },
    {
      name: "Objections & Reviews",
      arb: "الاعتراضات والمراجعات",
      active: false,
      path: "/mains/sukukbonds",
    },
  ],

  ETdashMenu: [
    {
      name: "Dashboard",
      arb: "لوحة البيانات",
      active: true,
      path: "/mains/dashboard",
    },

    {
      name: "Tax Management",
      arb: "إدارة الضرائب",
      active: false,
      path: "/mains/tax",
    },

    {
      name: "Bills",
      arb: "الفواتير",
      active: false,
      path: "/mains/bills",
    },
    {
      name: "Account Statements",
      arb: "كشف الحساب",
      active: false,
      path: "/mains/accountstatement",
    },
  ],

  ETdashMenuArb: [
    {
      name: "لوحة البيانات",
      active: true,
      path: "/mains/dashboard",
    },

    {
      name: "إدارة الضرائب",
      active: false,
      path: "/mains/tax",
    },

    {
      name: "الفواتير",
      active: false,
      path: "/mains/bills",
    },
    {
      name: "كشف الحساب",
      active: false,
      path: "/mains/accountstatement",
    },
  ],

  dashMenuAuditor: [
    {
      name: "Dashboard",
      arb: "لوحة البيانات",
      active: true,
      path: "/mains/dashboard",
    },
    {
      name: "Branch Adminstration",
      arb: "الالتزامات",
      active: false,
      path: "/mains/auditor/branchInfo",
    },
    {
      name: "Employee Adminstration",
      arb: "إدارة الضرائب",
      active: false,
      path: "/mains/auditor/userInfo",
    },
    {
      name: "Approvals & Rejections",
      arb: "الإقرارات",
      active: false,
      path: "/mains/auditor/approvalRejection",
    },
    {
      name: "Taxpayer Activities",
      arb: "استرداد المدفوعات",
      active: false,
      path: "/mains/auditor/taxPayer",
    },
  ],

  dashMenuAuditorArb: [
    {
      name: "لوحة البيانات",
      arb: "لوحة البيانات",
      active: true,
      path: "/mains/dashboard",
    },
    {
      name: "إدارة الفروع",
      arb: "الالتزامات",
      active: false,
      path: "/mains/auditor/branchInfo",
    },
    {
      name: "إدارة الموظفين",
      arb: "إدارة الضرائب",
      active: false,
      path: "/mains/auditor/userInfo",
    },
    {
      name: "الموافقات والرفض",
      arb: "الإقرارات",
      active: false,
      path: "/mains/auditor/approvalRejection",
    },
    {
      name: "نشاطات المكلف",
      arb: "استرداد المدفوعات",
      active: false,
      path: "/mains/auditor/taxPayer",
    },
  ],

  menuExcise: [
    {
      t1: "Taxpayer Details",
      t2:
        "Commercial Registrations to be registered for Excise Tax and related IBAN Number",
      t3: "assets/image/1-st.svg",
    },
    {
      t1: "Excise Tax Details",
      t2: "Complete the below details",
      t3: "assets/image/2-nd.svg",
    },
    {
      t1: "Declaration",
      t2: "Complete below details",
      t3: "assets/image/3-rd.svg",
    },
    {
      t1: "Summary",
      t2: "Review the below information",
      t3: "assets/image/4-th.svg",
    },
  ],
  menuVATEng: [
    {
      t1: "Taxpayer Details",
      t2: "Complete the below details",
      t3: "assets/image/1-st-vat.svg",
    },
    {
      t1: "Financial Information",
      t2: "Complete the below details",
      t3: "assets/image/2-nd-vat.svg",
    },
    {
      t1: "Attachments",
      t2: "Attachments are mandatory for Non-Eligible Taxpayers",
      t3: "assets/image/3-rd-vat.svg",
    },
    {
      t1: "Financial Representative",
      t2: "Complete the financial representative details",
      t3: "assets/image/4-th-vat.svg",
    },
    {
      t1: "Declaration",
      t2: "Complete the below details",
      t3: "assets/image/5-th-vat.svg",
    },
    {
      t1: "Summary",
      t2: "Review the below information",
      t3: "assets/image/6-th-vat.svg",
    },
  ],
  menuForgot: [
    {
      t1: "Verification Code",
      t2: "Please enter the verification code sent to your mobile",
    },
    {
      t1: "Password",
      t2: "Create a secure password",
    },
    {
      t1: "Recover Password",
      t2: "Your new password has been set up successfully",
    },
    {
      t1: "Recover Username",
      t2:
        "Your username has been sent to the registered email adress and mobile number.",
    },
  ],
  menuForgotSuccess: [
    {
      t1: "Recover Username",
      t2:
        "Your username has been sent to the registered email adress and mobile number.",
    },
    {
      t1: "Recover Password",
      t2: "Your new password has been set up successfully",
    },
  ],
  menuVATArb: [
    {
      t1: "تفاصيل المكلف ",
      t2: "أكمل التفاصيل أدناه",
      t3: "assets/image/1-st-vat.svg",
    },
    {
      t1: "معلومات مالية",
      t2: "أكمل التفاصيل أدناه",
      t3: "assets/image/2-nd-vat.svg",
    },
    {
      t1: "المرفقات",
      t2: "المرفقات إلزامية للمكلفين الغير خاضعين",
      t3: "assets/image/3-rd-vat.svg",
    },
    {
      t1: "الممثل المالي",
      t2: "أكمل تفاصيل الممثل المالي",
      t3: "assets/image/4-th-vat.svg",
    },
    {
      t1: "التعهد",
      t2: "أكمل التفاصيل أدناه",
      t3: "assets/image/5-th-vat.svg",
    },
    {
      t1: "ملخص",
      t2: "الرجاء مراجعة المعلومات التالية",
      t3: "assets/image/6-th-vat.svg",
    },
  ],

  vatEligibilityEng: {
    N: "Not Eligible",
    V: "Voluntary Registration",
    S: "Mandatory Registration – Small/Medium Taxpayer Group",
    M: "Mandatory Registration – Small/Medium Taxpayer Group",
    L: "Mandatory Registration – Large Taxpayer Group",
  },

  vatEligibilityArb: {
    N: "غير خاضع",
    V: "تسجيل إختياري",
    S: "تسجيل إلزامي - منشآت صغيرة/ متوسطة",
    M: "تسجيل إلزامي - منشآت صغيرة/ متوسطة",
    L: "تسجيل إلزامي - كبار المكلفين",
  },

  tinDeregistrationEng: [
    {
      t1: "Reason",
      t2: "Select reason for Deregistration",
      t3: "assets/image/components-steps-positive-5-1-st.svg",
    },
    {
      t1: "De-registration Details",
      t2: "Review the outlets that will be deregistered",
      t3: "assets/image/components-steps-positive-5-2-nd.svg",
    },
    {
      t1: "Attachments",
      t2: "Provide the supporting documents",
      t3: "assets/image/components-steps-positive-5-3-rd.svg",
    },
    {
      t1: "Declaration",
      t2: "Complete below Details",
      t3: "assets/image/components-steps-positive-5-4-th.svg",
    },
    {
      t1: "Summary",
      t2: "Review the below information",
      t3: "assets/image/components-steps-positive-5-5-th.svg",
    },
  ],

  tinDeregistrationArb: [
    {
      t1: "السبب",
      t2: "حدد سبب ايقاف التسجيل",
      t3: "assets/image/components-steps-positive-5-1-st.svg",
    },
    {
      t1: "تفاصيل الايقاف ",
      t2: "مراجعة الفروع التي سيتم الغاء تسجيلها",
      t3: "assets/image/components-steps-positive-5-2-nd.svg",
    },
    {
      t1: "المرفقات",
      t2: " يرجى تقديم نسخة من الوثائق التالية",
      t3: "assets/image/components-steps-positive-5-3-rd.svg",
    },
    {
      t1: "التعهد",
      t2: "الرجاء إكمال البيانات التالية",
      t3: "assets/image/components-steps-positive-5-4-th.svg",
    },
    {
      t1: "ملخص",
      t2: "الرجاء مراجعة البيانات التالية",
      t3: "assets/image/components-steps-positive-5-5-th.svg",
    },
  ],

  billsReturn: {
    vat: "VAT",
    et: "Excise Tax",
    zakat: "Zakat & CIT",
    withholding: "Withholding Tax",
    vatelig: "",
  },
  billsReturnArb: {
    vat: "ضريبة القيمة المضافة",
    et: "ضريبة السلع الانتقائية",
    zakat: "الزكاة و ضريبة الدخل",
    withholding: "ضريبة الإستقطاع",
    vatelig: "",
  },
  outletDeregistration: [
    {
      t1: "De-register Outlet",
      t2: "Select one of the following Outlets",
    },
    {
      t1: "De-registration Details",
      t2: "Select one of the following options",
    },
    {
      t1: "Attachments",
      t2: "Please provide a copy of following documents",
    },
    {
      t1: "Declaration",
      t2: "Complete below Details",
    },
    {
      t1: "Summary",
      t2: "Review the below information",
    },
  ],
  outletDeregistrationArb: [
    {
      t1: "إلغاء تسجيل فرع",
      t2: "الرجاء اختيار احد الفروع التالية",
    },
    {
      t1: "تفاصيل الغاء التسجيل ",
      t2: "الرجاء اختيار احدي الخيارات التالية للفرع",
    },
    {
      t1: "المرفقات",
      t2: " يرجى تقديم نسخة من الوثائق التالية",
    },
    {
      t1: "التعهد",
      t2: "الرجاء إكمال البيانات التالية",
    },
    {
      t1: "ملخص",
      t2: "الرجاء مراجعة البيانات التالية",
    },
  ],
  deregReasons: [
    {
      name: "Close all Outlets",
      flag: false,
      id: "1",
    },
    {
      name: "Transfer all Outlets to a single Transferee",
      flag: false,
      id: "2",
    },
    {
      name: "Close/Transfer Outlets Individually",
      flag: false,
      id: "3",
    },
  ],

  deregReasonsArb: [
    {
      name: " إغلاق الفرع",
      flag: false,
      id: "1",
    },
    {
      name: " نقل ملكية الفرع لمكلف آخر",
      flag: false,
      id: "2",
    },
    {
      name: " إغلاق / نقل ملكية الترخيص لمكلف آخر",
      flag: false,
      id: "3",
    },
  ],

  deregReasons2: [
    {
      name: "Close the Outlet",
      name1: " إغلاق الفرع",
      flag: false,
    },
    {
      name: "Transfer the Outlet to a single Transferee",
      name1: "نقل ملكية الفرع لمكلف آخر",
      flag: false,
    },
    {
      name: "Close/Transfer Outlet permits individually",
      name1: " إغلاق / نقل ملكية الترخيص لمكلف آخر",
      flag: false,
    },
  ],

  deregReasons2Arb: [
    {
      name: " إغلاق الفرع",
      flag: false,
    },
    {
      name: "نقل ملكية الفرع لمكلف آخر",
      flag: false,
    },
    {
      name: " إغلاق / نقل ملكية الترخيص لمكلف آخر",
      flag: false,
    },
  ],

  outletDeregReasons: [
    {
      name: "Close the Outlet",
      flag: false,
      id: "1",
    },
    {
      name: "Transfer the Outlet to a single Transferee",
      flag: false,
      id: "2",
    },
    {
      name: "Close/Transfer Outlet permits individually",
      flag: false,
      id: "3",
    },
  ],

  outletDeregReasonsArb: [
    {
      name: " إغلاق الفرع",
      flag: false,
      id: "1",
    },
    {
      name: "نقل ملكية الفرع لمكلف آخر",
      flag: false,
      id: "2",
    },
    {
      name: " إغلاق / نقل ملكية الترخيص لمكلف آخر",
      flag: false,
      id: "3",
    },
  ],
  licenseList: [
    {
      code: "90701",
      name: "Communications and Information Technology Commission",
    },
    {
      code: "90702",
      name: "Ministry of Commerce",
    },
    {
      code: "90703",
      name: "Ministry of Health",
    },
    {
      code: "90704",
      name: "Ministry of Media",
    },
    {
      code: "90705",
      name: "Ministry of Environment Water & Agriculture",
    },
    {
      code: "90706",
      name: "Ministry of Municipal and Rural Affairs",
    },
    {
      code: "90707",
      name: "Ministry of Education",
    },
    {
      code: "90708",
      name: "Technical and Vocational Training Corporation",
    },
    {
      code: "90709",
      name: "Ministry of Human Resources and Social Development",
    },
    {
      code: "907010",
      name: "Ministry of Islamic Affairs Dawah and Guidance",
    },
    {
      code: "90711",
      name: "Ministry of Hajj and Umrah",
    },
    {
      code: "90712",
      name: "Ministry of Investment",
    },
    {
      code: "90713",
      name: "Saudi Electricity Company",
    },
    {
      code: "90714",
      name: "Saudi Arabian Monetary Agency",
    },
    {
      code: "90715",
      name: "General Authority of Civil Aviation",
    },
    {
      code: "90716",
      name: "Ministry of Interior",
    },
    {
      code: "90717",
      name: "Ministry of Transportation",
    },
    {
      code: "90719",
      name: "Same Government Agency",
    },
    {
      code: "90721",
      name: "Municipality",
    },
    {
      code: "90722",
      name: "Saudi Organization for Certified public Accountants",
    },
    {
      code: "90723",
      name: "Ministry of Tourism",
    },
    {
      code: "90725",
      name: "Ministry Of Justice",
    },
    {
      code: "90729",
      name: "Saudi Council of Engineers",
    },
    {
      code: "90724",
      name: "Ministry of Industry and Mineral Resources",
    },
    {
      code: "90740",
      name: "Ministry of Sports",
    },
    {
      code: "90731",
      name: "Saudi Wildlife Authority",
    },
    {
      code: "90732",
      name: "Saudi Authority for Industrial Cities and Technology Zones",
    },
    {
      code: "90733",
      name: "The General Authority of Meteorology and Environmental",
    },
    {
      code: "90735",
      name: "Saudi Food and Drug Authority",
    },
    {
      code: "90736",
      name: "Saudi Ports Authority",
    },
    {
      code: "90706",
      name: "",
    },
    {
      code: "90737",
      name: "Capital Markets Authority",
    },
    {
      code: "90738",
      name: "Electricity & CoGeneration Regulatory Authority",
    },
    {
      code: "90739",
      name: "Ministry of Housing",
    },
    {
      code: "90741",
      name: "Ministry of Energy",
    },
    {
      code: "90718",
      name: "Other",
    },
  ],

  licenseListArb: [
    {
      code: "90701",
      name: "هيئة الاتصالات وتقنية المعلومات",
    },
    {
      code: "90702",
      name: "وزارة التجارة",
    },
    {
      code: "90703",
      name: "وزارة الصحة",
    },
    {
      code: "90704",
      name: "وزارة الإعلام",
    },
    {
      code: "90705",
      name: "وزارة البيئة والمياه والزراعة",
    },
    {
      code: "90706",
      name: "وزارة الشؤون البلدية والقروية",
    },
    {
      code: "90707",
      name: "وزارة التعليم",
    },
    {
      code: "90708",
      name: "المؤسسة العامة للتدريب التقني والمهني",
    },
    {
      code: "90709",
      name: "وزارة الموارد البشرية والتنمية الاجتماعية",
    },
    {
      code: "907010",
      name: "وزارة الشؤون الإسلامية والأوقاف والدعوة والإرشاد",
    },
    {
      code: "90711",
      name: "وزارة الحج والعمرة",
    },
    {
      code: "90712",
      name: "وزارة الاستثمار",
    },
    {
      code: "90713",
      name: "الشركة السعودية للكهرباء",
    },
    {
      code: "90714",
      name: "مؤسسة النقد العربي السعودي",
    },
    {
      code: "90715",
      name: "الهيئة العامة للطيران المدني",
    },
    {
      code: "90716",
      name: "وزارة الداخلية",
    },
    {
      code: "90717",
      name: "وزارة النقل",
    },
    {
      code: "90719",
      name: "نفس الجهة الحكومية",
    },
    {
      code: "90721",
      name: "الأمانات",
    },
    {
      code: "90722",
      name: "الهيئة السعودية للمحاسبين القانونيين",
    },
    {
      code: "90723",
      name: "وزارة السياحة",
    },
    {
      code: "90725",
      name: "وزارة العدل",
    },
    {
      code: "90729",
      name: "الهيئة السعودية للمهندسين",
    },
    {
      code: "90724",
      name: "وزارة الصناعة والثروة المعدنية",
    },
    {
      code: "90740",
      name: "وزارة الرياضة",
    },
    {
      code: "90731",
      name: "الهيئة السعودية للحياة الفطرية",
    },
    {
      code: "90732",
      name: "الهيئة السعودية للمدن الصناعية ومناطق التقنية",
    },
    {
      code: "90733",
      name: "الهيئة العامة للأرصاد وحماية البيئة",
    },
    {
      code: "90735",
      name: "الهيئة العامة للغذاء والدواء",
    },
    {
      code: "90736",
      name: "الهيئة العامة للموانئ",
    },
    {
      code: "90737",
      name: "هيئة السوق المالية",
    },
    {
      code: "90738",
      name: "هيئة تنظيم الكهرباء والإنتاج المزدوج",
    },
    {
      code: "90739",
      name: "وزارة الأسكان",
    },
    {
      code: "90741",
      name: "وزارة الطاقة",
    },
    {
      code: "90718",
      name: "أخرى",
      id: "3",
    },
  ],
};
