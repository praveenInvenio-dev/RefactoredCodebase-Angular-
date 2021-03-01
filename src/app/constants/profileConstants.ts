export const ProfileConstants = {
  TPOC_DataSet: {
    TPOC_DataSet: {
      results: [
        {
          Action: "",
          DataVersion: "",
          MobileNo: "",
          Taxpayer: "",
          NamePoc: "",
          Zvalid: "",
          ZdesPoc: "",
          NameLast: "",
          SmtpAddr: "",
          NameFirst: "",
          TelNumber: "",
          NameOrg1: "",
          TelExtens: "",
        },
      ],
    },
    Taxpayer: "3311626997",
  },

  updateMobileMenuEng: [
    {
      t1: "Update Mobile Number",
      t2: "Complete the below details",
    },
    {
      t1: "Verification Code",
      t2: "Please enter the verification code sent to your mobile",
    },
  ],

  updateMobileMenuArb: [
    {
      t1: "تغيير رقم الجوال",
      t2: "أكمل التفاصيل أدناه",
    },
    {
      t1: "رمز التحقق",
      t2: "الرجاء ادخال رمز التحقق المرسل الى جوالك",
    },
  ],

  updateEmailMenuEng: [
    {
      t1: "Update Email",
      t2: "Complete the below details",
    },
    {
      t1: "Update Email",
      t2: "Complete the below details",
    },
    {
      t1: "Verification Code",
      t2: "Please enter the verification code sent to your email",
    },
  ],

  updateEmailMenuArb: [
    {
      t1: "تغيير البريد الإلكتروني",
      t2: "أكمل التفاصيل أدناه",
    },
    {
      t1: "تغيير البريد الإلكتروني",
      t2: "أكمل التفاصيل أدناه",
    },
    {
      t1: "رمز التحقق",
      t2: "الرجاء ادخال رمز التحقق المرسل الى جوالك",
    },
  ],
  changePwdMenuEng: [
    {
      t1: "Verification Code",
      t2: "Please enter the verification code sent to your mobile",
    },
    {
      t1: "Change Password",
      t2: "Create a secure password",
    },
    {
      t1: "Change Password",
      t2: "Your new password has been set up successfully",
    },
    {
      s1: {
        t1: "Mobile Number xxxxxx"
      }
    }
  ],

  changePwdMenuArb: [
    {
      t1: "رمز التحقق",
      t2: "الرجاء ادخال رمز التحقق المرسل الى جوالك",
    },
    {
      t1: "تغيير كلمة المرور",
      t2: "إنشاء كلمة مرور آمنة ",
    },
    {
      t1: "تغيير كلمة المرور",
      t2: "تم تحديث كلمة المرور الجديدة بنجاح ",
    },
    {
      s1: {
        t1: "رقم الجوال xxxxxx"
      }
    },
  ],

  updateMobilePayload: {
    __metadata: {
      id:
        "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPFL_HEADERSet(Euser1='00000000000000000000',Euser='',Euser2='00000000000000000000',Euser3='00000000000000000000',Euser4='00000000000000000000',Fbguid='',Euser5='00000000000000000000',Taxpayerz='3311619272',Langz='E')",
      uri:
        "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_TP_PROFILE_N_SRV/TPFL_HEADERSet(Euser1='00000000000000000000',Euser='',Euser2='00000000000000000000',Euser3='00000000000000000000',Euser4='00000000000000000000',Fbguid='',Euser5='00000000000000000000',Taxpayerz='3311619272',Langz='E')",
      type: "Z_TP_PROFILE_N_SRV.TPFL_HEADER",
    },
    UserId: "",
    Auditorz: "",
    PrevEmail: "",
    PreviousPwd: "",
    MobileCountry: "",
    Euser1: "00000000000000000000",
    TpType: "",
    VerifyEmail: "",
    Euser: "",
    Euser2: "00000000000000000000",
    VerifyMobile: "",
    Euser3: "00000000000000000000",
    TypeChk: "",
    Euser4: "00000000000000000000",
    Fbguid: "",
    Euser5: "00000000000000000000",
    Taxpayerz: "",
    RegIdz: "",
    PeriodKeyz: "",
    Submitz: "",
    Savez: "",
    Fbnumz: "",
    Langz: "E",
    PortalUsrz: "",
    Monthz: "00",
    OfficerUidz: "",
    Approvez: "",
    Rejectz: "",
    CreateTxAssesz: "",
    Xvoidz: "",
    AmdRsnz: "",
    ObjSubmitz: "",
    Dmodez: "",
    SkipBillingz: "",
    Partner: "",
    NameChk: "",
    NameFirst: "",
    NameLast: "",
    NameOrg1: "",
    ActnmChk: "",
    Actnm: "",
    EmailChk: "",
    Email: "",
    EmailLoginCd: "",
    MobileChk: "",
    Mobile: "",
    MobileLoginCd: "",
    PasswordChk: "",
    PasswordOld: "",
    PasswordNew: "",
    Edit: "",
    Cancel: "",
    Conf: "",
  },

  externalURLs: {
    userMngmnt: "",
    vatDetails: "sap/bc/ui5_ui5/sap/zvatr/index.html?sap-client=val1&sap-ui-language=val2&uPar8=05&uPar1=val3&Euser=val4&fGUID=val5&tSys=val6&TxnTp=CHG_RGVT",
    exciseDetails: "sap/bc/ui5_ui5/sap/zereg/index.html?sap-client=val1&sap-ui-language=val2&uPar1=val3&uPar8=02&Euser=val4&fGUID=val5&tSys=val6&TxnTp=CHG_RGEX",
    zakatDetails: "sap/bc/ui5_ui5/sap/znreg_change/index.html?sap-client=val1&tSys=val2&sap-ui-language=val3&tPar2=val4&tPar1=val5&regType=2&pType=TP",
    exciseDereg: "sap/bc/ui5_ui5/sap/zdu_dgex/index.html?sap-client=val1&sap-ui-language=val2&uPar1=val3&Euser=val4&tCL=val5&fGUID=val6&tSys=val7&eFlag=O",
    vatDereg: "sap/bc/ui5_ui5/sap/zvatdereg/index.html?sap-client=val1&sap-ui-language=val2&uPar1=val3&Euser=val4&fGUID=val5&tSys=val6&TxnTp=",
    tinDereg: "sap/bc/ui5_ui5/sap/zuibdreg/index.html?sap-client=val1&tPayer=val2&sap-ui-language=val3&pPTIN=X&pPPermit=&pPOutlet=&System=val4",
    outletDereg: "sap/bc/ui5_ui5/sap/zuibdreg/index.html?sap-client=val1&tPayer=val2&sap-ui-language=val3&pPTIN=&pPPermit=&pPOutlet=X&System=val4",
    licenseDereg: "sap/bc/ui5_ui5/sap/zuibdreg/index.html?sap-client=val1&tPayer=val2&sap-ui-language=val3&pPTIN=&pPPermit=X&pPOutlet=&System=",
    usrAdmin: "sap/bc/ui5_ui5/sap/zuseradmin/index.html?sap-client=val1&sap-ui-language=val2&Euser=val3&fGUID=val4&calType=val5",
    taskAllctn: "sap/bc/ui5_ui5/sap/ztaskallocation/index.html?sap-client=val1&sap-ui-language=val2&Euser=val3&fGUID=val4&calType=val5",
    vatEligible: "sap/bc/ui5_ui5/sap/zdu_eprg_reg/index.html?sap-client=val1&sap-ui-language=val2&uPar1=val3&tMail=val4&uPar8=&Euser=val5&fGUID=val6&tSys=val7&TxnTp=CHG_VTEP"
  }
};
