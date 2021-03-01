export const sukukBondsConstants = {
  eng: {
    dir: "ltr",
    bc1: "Refunds",
    bc2: "Sukuk & Bonds",
    bc3: "New Sukuk & Bonds",
    back: "Back",
    continue: "Continue",
    confirm: "Confirm",
    refund: "Refunds",
    edit: "Edit",
    filesizeMessage: "File size should not be more than 10 MB.",
    zeroFilesizeMessage: "Unable to load attachments",
    invalidFormat: "Upload files with allowed extensions only",
    fileAlreayExists: "File with the same name already exists",
    maxNoOfFiles: "Maximum no. of 10 attachments can be uploaded.",
    ibanLengthError:
      "IBAN should start with ‘SA’ and followed by 22 numeric values only",
    invalidIban: "Invalid IBAN",
    downloadForm: "Download Form",
    max: "Max",
    menu: [
      {
        title: "Request Details",
        subtitle: "Complete the below details",
        step: "assets/image/4steps-1.svg",
      },
      {
        title: "Account Details",
        subtitle: "Complete the below details",
        step: "assets/image/4steps-2.svg",
      },
      {
        title: "Attachments",
        subtitle: "Complete the below details",
        step: "assets/image/4steps-3.svg",
      },
      {
        title: "Summary",
        subtitle: "Review the information below",
        step: "assets/image/4steps-4.svg",
      },
    ],

    // Request Details form

    requestDetailsForm: {
      periodSelection: "Period Selection",
      period: "Period",
      information: "Information",
      zakatBaseInvestment: "Zakat Base Before Deduction Investment",
      zakatNetProfit: "Zakat Net Adjusted Profit",
      citNetProfit: "CIT Net Adjusted Profit",
      totalProfit: "Total of Profit (Gross)",
      zakatPaid: "Zakat Paid (before differences)",
      citPaid: "CIT Paid (before differences)",
      noOfDays: "Number of Days in The Financial Year",
      returnPeriod: "Return Period",
      saudiProfit: "Saudi % in Profit",
      nonSaudi: "Non-Saudi %",
      zakatPercent: "Zakat % (as per the return)",
      minimumZakat: "Minimum Zakat Base",
      ninNumber: "NIN Number",
      totalInvestment:
        "Total Value of Investment in Govermment Sukuk & Bonds issued in SAR",
      totalReturn: "Total Return on Investment in Govermment Sukuk & Bonds",
      investmentDetails: "Investments Details",
      sukukBondName: "Sukuk & Bond Name",
      valueOfInvestment: "Value of Investment",
      returnOnInvestment: "Return on Investment",
      addInvestmentDetail: "Add Investment Detail",
      validationError: "Fill all the input fields before proceeding",
      selectBond: "Select Bond",
      selectYear: "Select Year",
      zakatBaseAfterDeduction:
        "Zakat Base after deducting investment in Sukuk/Bonds",
      refundableCIT: "Refundable CIT amount",
      refundableZakat: "Refundable Zakat amount",
    },

    // Account Details form

    accountDetailsForm: {
      addIBAN: "Add IBAN",
      ibanAccountNumber: "IBAN Account Number",
      ibanLinkedIdType: "IBAN Linked ID Type",
      ibanLinkedIdNumber: "IBAN Linked ID Number",
      note:
        "I hereby confirm that I will pay any outstanding liabilities and submit all due returns in GAZT before submitting the refund request or GAZT will offset the outstanding liabilities from my Sukuk and Bonds amount before the refund paid",
    },

    // attachments form

    attachmentsForm: {
      attachAccountantCetification: "Attach Chartered Accountant Certification",
      attachInvestmentStatement:
        "Attach Investment Account Statement from Tadawul",
      otherSupportDoc: "Other Supported Document",
      dragAndDropFile: "Drag and drop file to upload documentation",
    },

    // Summary form

    summaryForm: {
      information: "Information",
      investmentDetails: "Investments Details",
      sukukBondName: "Sukuk & Bond Name",
      valueOfInvestment: "Value of Investment",
      returnOnInvestment: "Return on Investment",
      accountDetails: "Account Details",
      ibanAccountNumber: "IBAN Account Number",
      ibanLinkedIdType: "IBAN Linked ID Type",
      ibanLinkedIdNumber: "IBAN Linked ID Number",
      attachments: "Attachments",
      attachAccountantCetification: "Attach Chartered Accountant Certification",
      attachInvestmentStatement:
        "Attach Investment Account Statement from Tadawul",
      otherSupportDoc: "Other Supported Document",
    },

    // Sucess Screen form

    successScreenForm: {
      sukukBondsRefund: "Sukuk & Bonds Refund",
      requestSuccessful: "Your Sukuk & Bonds Refund request is successful",
      dashboard: "Go to Dashboard",
      referenceNumber: "Reference Number",
    },

    // card modal

    sukukBondsCard: {
      modalTitle: "Instructions",

      content:
        "GAZT has the right to audit and amend any credit balance that is requested to be refunded before allow the taxpayer to refund his credit balance. Taxpayer has the right to withdraw his verified credit balance after the taxpayer pays his remaining liabilities or after GAZT offset the taxpayer remaining liabilities.",

      agree: "I agree with these conditions.",
    },
  },
  arb: {
    dir: "rtl",
    bc1: "الاستردادات",
    bc2: "الصكوك والسندات",
    bc3: "الصكوك والسندات جديدة",
    back: "رجوع",
    continue: "متابعة",
    confirm: "تأكيد",
    refund: "الاستردادات",
    edit: "تعديل",
    filesizeMessage: "يجب أن يكون حجم الملف أقل من 10 ميجا بايت.",
    zeroFilesizeMessage: "تعذر تحميل المرفقات",
    invalidFormat:
      "DOC, DOCX, JPEG, JPG, PDF, XLS and XLSX  الرجاء إرفاق ملف من الامتدادت التالية فقط",
    fileAlreayExists: "يوجد ملف بنفس الاسم مرفق مسبقا",
    maxNoOfFiles: "لا يمكن تحميل أكثر من 10 مرفقات",
    ibanLengthError: "يجب أن يبدأ الآيبان ب 'SA' ويتبعه 22 رقماٌ فقط",
    invalidIban: "رقم الآيبان غير صحيح",
    downloadForm: "تحميل نموذج الطلب",
    max: "الحد الأعلى",
    menu: [
      {
        title: "تفاصيل الطلب",
        subtitle: "اكمل البيانات التالية",
        step: "assets/image/4steps-1.svg",
      },
      {
        title: "تفاصيل الحساب",
        subtitle: "اكمل البيانات التالية",
        step: "assets/image/4steps-2.svg",
      },
      {
        title: "المرفقات",
        subtitle: "اكمل البيانات التالية",
        step: "assets/image/4steps-3.svg",
      },
      {
        title: "ملخص",
        subtitle: "مراجعة البيانات التالية",
        step: "assets/image/4steps-4.svg",
      },
    ],

    // Request Details form

    requestDetailsForm: {
      periodSelection: "تحديد الفترة",
      period: "الفترة",
      information: "المعلومات",
      zakatBaseInvestment: "الوعاء الزكوي قبل الحسم",
      zakatNetProfit: "صافي الربح المعدل الزكوي",
      citNetProfit: "صافي الربح المعدل الضريبي",
      totalProfit: "اجمالي الربح",
      zakatPaid: "نسبة الزكاة",
      citPaid: "الضريبة المدفوعة",
      noOfDays: "عدد الأيام في السنة المالية",
      returnPeriod: "فترة الإقرار",
      saudiProfit: "نسبة السعودي",
      nonSaudi: "نسبة الأجنبي",
      zakatPercent: "نسبة الزكاة",
      minimumZakat: "الحد الأدنى للوعاء",
      ninNumber: "NIN رقم",
      totalInvestment:
        "إجمالي قيمة الاستثمار في الصكوك والسندات الحكومية الصادرة بالريال السعودي",
      totalReturn: "إجمالي العائد على الاستثمار في الصكوك والسندات الحكومية",
      investmentDetails: "تفاصيل الاستثمار",
      sukukBondName: "اسم الصك او السند",
      valueOfInvestment: "قيمة الاستثمار",
      returnOnInvestment: "عائد الاستثمار",
      addInvestmentDetail: "ادخل تفاصيل الاستثمار",
      validationError: "الرجاء اكمال البيانات للمتابعة",
      selectBond: "Select Bond",
      selectYear: "Select Year",
      zakatBaseAfterDeduction: "الوعاء الزكوي بعد الحسم",
      refundableCIT: "قيمة الضريبة المستردة",
      refundableZakat: "قيمة الزكاة المستردة",
    },

    // Account Details form

    accountDetailsForm: {
      addIBAN: "إضافة آيبان",
      ibanAccountNumber: "رقم الحساب البنكي الآيبان",
      ibanLinkedIdType: "نوع الهوية المرتبطة بحساب الآيبان",
      ibanLinkedIdNumber: "رقم الهوية المرتبطة بحساب الآيبان",
      note:
        "أتعهد بأن اقوم بسداد جميع التزاماتي المالية وتقديم جميع الاقرارات المستحقة لدى الهيئة قبل تقديم طلب الاسترداد وأني قد فوضت الهيئة بخصم أي مستحقات قائمة من رصيدي لدى الهيئة قبل الاسترداد.",
    },

    // attachments form

    attachmentsForm: {
      attachAccountantCetification: "إرفاق شهادة المحاسب القانوني",
      attachInvestmentStatement: "كشف حساب بالاستثمارات من تداول",
      otherSupportDoc: "مرفقات أخرى",
      dragAndDropFile: "قم بسحب وإفلات الملف لتحميل الوثائق",
    },

    // Summary form

    summaryForm: {
      information: "المعلومات",
      investmentDetails: "تفاصيل الاستثمار",
      sukukBondName: "اسم الصك او السند",
      valueOfInvestment: "قيمة الاستثمار",
      returnOnInvestment: "عائد الاستثمار",
      accountDetails: "تفاصيل الحساب",
      ibanAccountNumber: "رقم الحساب البنكي الآيبان",
      ibanLinkedIdType: "نوع الهوية المرتبطة بحساب الآيبان",
      ibanLinkedIdNumber: "رقم الهوية المرتبطة بحساب الآيبان",
      attachments: "المرفقات",
      attachAccountantCetification: "إرفاق شهادة المحاسب القانوني",
      attachInvestmentStatement: "كشف حساب بالاستثمارات من تداول",
      otherSupportDoc: "مرفقات أخرى",
    },

    // Sucess Screen form

    successScreenForm: {
      sukukBondsRefund: "إسترداد الصكوك والمستندات",
      requestSuccessful: "تم استلام طلب استرداد الصكوك والسندات بنجاح",
      dashboard: "الانتقال الى الشاشة الرئيسية",
      referenceNumber: "الرقم المرجعي",
    },

    // card modal

    sukukBondsCard: {
      modalTitle: "التعليمات",

      content:
        "للهيئة الحق في فتح أي حالة فحص أو إعادة تقييم للمبالغ الدائنة وذلك للتحقق منها وتعديلها قبل السماح باسترداد المبلغ الدائن. يحق للمكلف بالاسترداد المباشر للمبالغ الدائنة المتحقق منها بعد سداد باقي التزامات المكلف الأخرى او قيام الهيئة بالمقاصة من رصيد المكلف الدائن",

      agree: "أوافق على هذه الشروط",
    },
  },
};
export const ApiConstants = {
  getInitialData: "sap/opu/odata/SAP/zdp_refund_req_srv",

  getFormTwoData: "sap/opu/odata/SAP/zdp_zref_uh_srv",

  getFormFourData: "sap/opu/odata/SAP/zdp_check_iban_srv",

  postDetails: "sap/opu/odata/SAP/zdp_refund_req_srv",

  getRefundDetails: "sap/opu/odata/SAP/zdp_zref_wi_srv",

  getYearSelection: "sap/opu/odata/SAP/zdp_zref_wi_srv",

  getEncryptedTins: "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV",

  getDashboardData: "sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV",

  attachment: "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV",
  validateIban: "sap/opu/odata/SAP/ZDP_CHECK_IBAN_SRV",
  downloadForm: "sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/",
};
