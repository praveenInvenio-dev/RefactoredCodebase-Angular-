export const WhitelistConstants = {
  eng: {
    dir: "ltr",
    bc1: "Tax Management",
    bc2: "VAT Services",
    bc3: "New Whitelist Request",
    bc4: "Cancellation of Whitelisting",
    back: "Back",
    heading1: " Effective Date for Input Tax Deduction Method",
    heading2: "Current Input Tax Deduction Method",
    heading3: "Proposed Input Tax Deduction Method",
    zeroFilesizeMessage: "Unable to load attachments",
    filesizeMessage: "File size should not be more than 5 MB.",
    invalidFormat: "Upload files with allowed extensions only",
    fileAlreayExists: "File with the same name already exists",
    maxNoOfFiles: "Maximum no. of 10 attachments can be uploaded.",
    idMsg: "Please Enter ID",
    dobMsg: "Please Enter DOB",
    success: "Success",
    pending: "Pending",
    confirm: "Confirm",
    from: "From",
    to: "To",
    noCancellation: "Dear Taxpayer, No application found for cancellation !!",
    whitelistingId: "Whitelisting ID",
    whitelistRemoval: "Whitelist Categories for Removal",
    gccValidation:
      "Invalid GCC Id,Minimum length is 8 and Maximum length is 15.",
    modal: {
      idNumber: "ID Number",
      dob: "Date of Birth",
      validate: "Validate",
      close: "Close",
      dobPlaceholder: "DD-MM-YYYY",
    },
    process_addWhitelist: [
      {
        title: "Taxpayer Details",
        subtitle: "Complete below details",
        step: "assets/image/5-1.svg",
      },
      {
        title: "Whitelist Request",
        subtitle: "Complete below Details",
        step: "assets/image/5-2.svg",
      },
      {
        title: "Business Information",
        subtitle: "Complete below details",
        step: "assets/image/5-3.svg",
      },
      {
        title: "Declaration",
        subtitle:
          "I hereby certify that I am authorized to complete this form for the taxable person and that all information contained is correct",
        step: "assets/image/5-4.svg",
      },
      {
        title: "Summary",
        subtitle: "Review the below information",
        step: "assets/image/5-5.svg",
      },
    ],
    process_cancelWhitelist: [
      {
        title: "Taxpayer Details",
        subtitle: "Complete below details",
        step: "assets/image/5-1.svg",
      },
      {
        title: "Whitelist Request",
        subtitle: "Complete below Details",
        step: "assets/image/5-2.svg",
      },
      {
        title: "Whitelist Categories for Removal",
        subtitle:
          "Categories for removal from zero-rate status as international transport provider",
        step: "assets/image/5-3.svg",
      },
      {
        title: "Declaration",
        subtitle:
          "I hereby certify that I am authorized to complete this form for the taxable person and that all information contained is correct",
        step: "assets/image/5-4.svg",
      },
      {
        title: "Summary",
        subtitle: "Review the below information",
        step: "assets/image/5-5.svg",
      },
    ],
    cancelRequest: "Cancellation of Whitelisting",
    newRequest: "New Whitelist Request",
    requestType: "Select a Request Type",
    transportCategory: "Transport category",
    caution:
      "Providing the following information may assist you in providing evidence that your business conducts an economic activity with transportation industry.",
    caution1: "- Revenues (e.g.annual report, sales data, invoices)",
    caution2: "- Offered transport services(e.g. offer list, website)",
    caution3: "- Trip undertaken (e.g.logbooks, timetable)",
    information: "Information",
    Declarationagree:
      "I hereby declare that the above mentioned information is true and correct to the best of my knowledge and belief",
    acknowledgements: "Acknowledgements",
    cautionacknowledgements:
      "Once removed, you will not be able to zero-rate international means of transport of the corresponding category anymore",
    cancelWhitelistCategories: {
      cwlp: "International means of transport \u2013 Land/Passengers",
      cwlg: "International means of transport \u2013 Land/Goods",
      cwsp: "International means of transport \u2013 Sea/Passengers",
      cwsg: "International means of transport \u2013 Sea/Goods",
      cwap: "International means of transport \u2013 Air/Passengers",
      cwag: "International means of transport \u2013 Air/Goods",
      removalDate: "Removal Date",
      expiryDate: "Expiry Date",
    },
    whitelistingTypes: [
      {
        Fbtyp: "CRE_CWAG",
        FbtText: "International means of transport \u2013 Air/Goods",
      },
      {
        Fbtyp: "CRE_CWAP",
        FbtText: "International means of transport \u2013 Air/Passengers",
      },
      {
        Fbtyp: "CRE_CWLG",
        FbtText: "International means of transport \u2013 Land/Goods",
      },
      {
        Fbtyp: "CRE_CWLP",
        FbtText: "International means of transport \u2013 Land/Passengers",
      },
      {
        Fbtyp: "CRE_CWSG",
        FbtText: "International means of transport \u2013 Sea/Goods",
      },
      {
        Fbtyp: "CRE_CWSP",
        FbtText: "International means of transport \u2013 Sea/Passengers",
      },
    ],
  },
  arb: {
    dir: "rtl",
    bc1: "إدارة الضريبة",
    bc2: "خدمات ضريبة القيمة المضافة",
    bc3: "التسجيل في القائمة البيضاء",
    bc4: "إلغاء التسجيل في القائمة البيضاء",
    back: "رجوع",
    heading1: " Effective Date for Input Tax Deduction Method",
    heading2: "Current Input Tax Deduction Method",
    heading3: "Proposed Input Tax Deduction Method",
    zeroFilesizeMessage: "تعذر تحميل المرفقات",
    filesizeMessage: "يجب أن يكون حجم الملف أقل من 5 ميجا بايت.",
    invalidFormat: "الرجاء استخدام صيغ الملفات المسموح بها فقط",
    fileAlreayExists: "يوجد ملف بنفس الاسم مرفق مسبقا",
    maxNoOfFiles: "لا يمكن تحميل أكثر من 10 مرفقات",
    idMsg: " الرجاء ادخال رقم الهوية",
    dobMsg: " الرجاء ادخال تاريخ الميلاد",
    success: "Success",
    pending: "Pending",
    confirm: "تأكيد",
    from: "من",
    to: "إلى ",
    noCancellation: "عزيزي المكلف: لا يوجد لديك طلبات ليتم إلغائها",
    whitelistingId: "رقم الطلب",
    whitelistRemoval: "إلغاء التسجيل في القائمة البيضاء",
    gccValidation:
      "رقم الهوية التابعة لدول الخليج غير صحيح، يجب ألا يقل رقم الهوية عن 8 أرقام وألا يزيد عن 15.",
    modal: {
      idNumber: "رقم الهوية",
      dob: "تاريخ الميلاد",
      validate: "التحقق",
      close: "إغلاق",
      dobPlaceholder: "السنة - الشهر - اليوم",
    },
    process_addWhitelist: [
      {
        title: "تفاصيل المكلف",
        subtitle: "أكمل البيانات التالية",
        step: "assets/image/5-1.svg",
      },
      {
        title: "التسجيل في القائمة البيضاء",
        subtitle: "أكمل البيانات التالية",
        step: "assets/image/5-2.svg",
      },
      {
        title: "بيانات المنشأة",
        subtitle: "أكمل البيانات التالية",
        step: "assets/image/5-3.svg",
      },
      {
        title: "تعهد",
        subtitle:
          "أشهد بموجب هذا التعهد بأنني مخول لاستكمال هذا النموذج نيابة عن الشخص الخاضع للضريبة وأن جميع المعلومات الواردة صحيحة",
        step: "assets/image/5-4.svg",
      },
      {
        title: "ملخص",
        subtitle: "مراجعة البيانات التالية",
        step: "assets/image/5-5.svg",
      },
    ],
    process_cancelWhitelist: [
      {
        title: "تفاصيل المكلف",
        subtitle: "أكمل البيانات التالية",
        step: "assets/image/5-1.svg",
      },
      {
        title: "التسجيل في القائمة البيضاء",
        subtitle: "أكمل البيانات التالية",
        step: "assets/image/5-2.svg",
      },
      {
        title: "إلغاء التسجيل في القائمة البيضاء",
        subtitle: "الفئات المطلوب إزالتها من حالة القائمة البيضاء",
        step: "assets/image/5-3.svg",
      },
      {
        title: "تعهد",
        subtitle:
          "أشهد بموجب هذا التعهد بأنني مخول لاستكمال هذا النموذج نيابة عن الشخص الخاضع للضريبة وأن جميع المعلومات الواردة صحيحة",
        step: "assets/image/5-4.svg",
      },
      {
        title: "ملخص",
        subtitle: "مراجعة البيانات التالية",
        step: "assets/image/5-5.svg",
      },
    ],
    cancelRequest: "إلغاء التسجيل في القائمة البيضاء",
    newRequest: "التسجيل في القائمة البيضاء",
    requestType: "اختر نوع الطلب",
    transportCategory: "فئة النقل",
    caution:
      "تزويدكم للمعلومات التالية يمكن أن يخدم كدليل على أن منشأتكم تقوم بمزاولة نشاط اقتصادي في مجال النقل ",
    caution1: "- الإيرادات (مثال: التقرير السنوي، بيان المبيعات، الفواتير)",
    caution2: "- خدمات النقل القدمة (مثال: قائمة العروض، الموقع الالكتروني)",
    caution3: "- الرحلات التي تقوم بها (مثال: الجدول الزمني)",
    information: "المعلومات",
    Declarationagree: "أقر بأن المعلومات المذكورة أعلاه صحيحة وحقيقية ",
    acknowledgements: "إقرارات",
    cautionacknowledgements:
      "فور تطبيق الإزالة، لن تتمكن من تطبيق الضريبة الصفرية على وسائل النقل الدولية الخاصة بتلك الفئة. ",
    cancelWhitelistCategories: {
      cwlp: "وسائل النقل البرية الخاصة بالركاب",
      cwlg: "وسائل النقل البرية الخاصة بالسلع",
      cwsp: "وسائل النقل البحرية الخاصة بالركاب",
      cwsg: "وسائل النقل البحرية الخاصة بالسلع",
      cwap: "وسائل النقل الجوية الخاصة بالركاب",
      cwag: "وسائل النقل الجوية الخاصة بالسلع",
      removalDate: "تاريخ الإزالة",
      expiryDate: "تاريخ إنتهاء الصلاحية",
    },
    whitelistingTypes: [
      {
        Fbtyp: "CRE_CWAG",
        FbtText: "وسائل النقل الجوية الخاصة بالسلع",
      },
      {
        Fbtyp: "CRE_CWAP",
        FbtText: "وسائل النقل الجوية الخاصة بالركاب",
      },
      {
        Fbtyp: "CRE_CWLG",
        FbtText: "وسائل النقل البرية الخاصة بالسلع",
      },
      {
        Fbtyp: "CRE_CWLP",
        FbtText: "وسائل النقل البرية الخاصة بالركاب",
      },
      {
        Fbtyp: "CRE_CWSG",
        FbtText: "وسائل النقل البحرية الخاصة بالسلع",
      },
      {
        Fbtyp: "CRE_CWSP",
        FbtText: "وسائل النقل البحرية الخاصة بالركاب",
      },
    ],
  },
};

export const fillingFrequency = {
  eng: {
    dir: "ltr",
    bc1: "Tax Management",
    bc2: "VAT Services",
    bc3: "Whitelisting",
    back: "Back",
    title: "My Requests",
    titleAfterModal: "Whitelisting",
    success: "Success",
    pending: "Pending",
    newWhitelistRequest: "New Whitelist Request",
    requestNumber: "Request Number",
    requestDate: "Creation Date",
    requestName: "Request Name",
    request: "Request 1",
    modalTitle: "Instructions",
    agree: "I agree with these conditions.",
    contentLine1:
      "Companies with zero-rate status may import certain means of transport at a zero-rated VAT rate. To benefit from this regulation, the taxpayer needs to apply for such status for the applicable means of transport.",
    contentLine2: `The zero-rate status turns into effect when the application is approved.`,
    contentLine3: `As Zero VAT will be collected on Zero rated imports, I consent that 0 VAT will be refunded for such imports.`,
    contentLine4: `If Approved, the whitelist flag will be for the sooner of the two: one year or expiry of certificate provided.`,
    chooseADate: "Choose a date",
    submitConsolidated: "New Whitelisting Request",
    filter: {
      title: "Filter",
      status: "Status",
      success: "Success",
      pending: "Pending",
      apply: "Apply",
      date: "Date",
    },
  },
  arb: {
    dir: "ltr",
    bc1: "إدارة الضريبة",
    bc2: "خدمات ضريبة القيمة المضافة",
    bc3: "القائمة البيضاء ",
    back: "رجوع",
    title: "My Requests",
    titleAfterModal: "القائمة البيضاء ",
    success: "Success",
    pending: "Pending",
    newWhitelistRequest: "التسجيل في القائمة البيضاء",
    currentFrequency: "Current Frequency",
    requestNumber: "رقم الطلب",
    requestDate: "تاريخ الطلب",
    requestName: "اسم الطلب",
    request: "Request 1",
    modalTitle: "تعليمات",
    agree: "أوافق على تلك الشروط وأرغب في المتابعة",
    contentLine1: `يمكن أن تقوم الشركات ذات الحالة الضريبية الصفرية باستيراد بعض وسائل المواصلات بضريبة قيمة مضافة بقيمة صفر. وللاستفادة من هذه القاعدة، على المكلف التقدم لطلب تطبيق تلك الحالة على وسائل المواصلات المعنية.`,
    contentLine2: `يتم تفعيل حالة الضريبة الصفرية فور الموافقة على الطلب.`,
    contentLine3: `حيث أنهلن يتم تحصيل ضريبة قيمة مضافة على الواردات الخاضعة للضريبة بنسبة صفر، أوافق على عدم استرداد أي ضريبة قيمة مضافة عن تلك الواردات.`,
    contentLine4: `في حال تمت الموافقة، ستمنح علامة القائمة البيضاء الى حين تحقق الأقرب من الحالات التالية: مرور عام كامل أو إنتهاء صلاحية الشهادة`,
    chooseADate: "اختر التاريخ",
    submitConsolidated: "التسجيل في القائمة البيضاء",
    filter: {
      title: "فلتر",
      status: "الحالة",
      success: "Success",
      pending: "Pending",
      apply: "تقديم",
      date: "التاريخ",
    },
  },
};
export const searchConstants = {
  filters: {
    search: {
      eng: "Search",
      arb: " بحث",
    },
    empty: {
      eng: "No results were found",
      arb: "لم يتم العثور على نتائج",
    },
  },
  taxpayer: {
    eng: "Taxpayer Details",
    arb: "تفاصيل المكلف",
  },
  tin: {
    eng: "TIN",
    arb: "بيانات المكلف",
  },
  crNumber: {
    eng: "CR Number ",
    arb: "رقم السجل التجاري",
  },
  vatNumber: {
    eng: "VAT Number ",
    arb: "رقم ضريبة القيمة المضافة",
  },
  continue: {
    eng: "Continue ",
    arb: "متابعة",
  },
  textArea: {
    eng: "Max 500 characters allowed ",
    arb: "Max 500 characters allowed",
  },
  transportCategory: {
    eng: "Transport Category",
    arb: "فئة النقل",
  },
  dragAndDropFile: {
    eng: "Drag and drop file to upload documentation",
    arb: "سحب وإفلات الملف لتحميل الوثيقة",
  },
  document: {
    eng: "Supporting documents",
    arb: "الوثائق الثبوتية",
  },
  duration: {
    eng: "Requested duration of whitelist status",
    arb: "المدة المطلوبة لحالة القائمة البيضاء",
  },
  dates: {
    eng: "Dates",
    arb: "التاريخ",
  },
  description: {
    eng: "Description of business activities",
    arb: "وصف أنشطة المنشأة",
  },
  businessWebsite: {
    eng: "Link to website of business",
    arb: "رابط الموقع الالكتروني الخاص بالمنشأة",
  },
  operation: {
    eng: "Years business in operation",
    arb: "عدد سنوات عمل المنشأة",
  },
  IdTypeTitle: {
    eng: "ID Type",
    arb: "نوع الهوية",
  },
  IdentificationNumber: {
    eng: "ID Number",
    arb: "رقم الهوية",
  },
  contactPersonName: {
    eng: "Contact Person Name",
    arb: "اسم شخص الاتصال",
  },
  edit: {
    eng: "Edit",
    arb: "تعديل",
  },
  whitelist: {
    eng: "Whitelist Request",
    arb: "التسجيل في القائمة البيضاء",
  },
  requestsType: {
    eng: "Request Type",
    arb: "تصنيف القائمة البيضاء",
  },
  supportingfile: {
    eng: "Supporting file",
    arb: "الوثائق الثبوتية",
  },
  businessInformation: {
    eng: "Business Information",
    arb: "بيانات المنشأة",
  },
  declaration: {
    eng: "Declaration",
    arb: "تعهد",
  },
  ReferenceNumber: {
    arb: "رقم الطلب",
    eng: "Request Number",
  },
  ReferenceDate: {
    arb: "التاريخ",
    eng: "Date",
  },
  requestSent: {
    arb: "تم ارسال الطلب",
    eng: "Request Sent",
  },
  YourWhitelistingrequest: {
    arb: "تم استلام طلب التسجيل في القائمة البيضاء بنجاح",
    eng: "Your Whitelisting request is submitted successfully",
  },
  yourwhitelistCancelRequest: {
    arb: "تم استلام طلب إلغاء تسجيل في القائمة البيضاء بنجاح",
    eng: "Your Whitelisting cancellation request is submitted successfully",
  },
  ReferenceName: {
    arb: "الاسم ",
    eng: "Name",
  },
  GoToDashBoard: {
    arb: "الانتقال الى الشاشة الرئيسية",
    eng: "Go to Dashboard",
  },
  downloadConfirmation: {
    arb: "Download Confirmation",
    eng: "Download Confirmation",
  },
  mobileNumber: {
    arb: "رقم الجوال",
    eng: "Mobile Number",
  },
  email: {
    arb: "البريد الالكتروني",
    eng: "Email",
  },
};

export const validationList = {
  businessWebsite: {
    required: {
      eng: "Please provide valid website",
      arb: "الرجاء ادخال رابط صحيح للمنشأة",
    },
    pattern: {
      eng: "Please provide valid website",
      arb: "الرجاء ادخال رابط صحيح للمنشأة",
    },
  },
  contactPersonName: {
    pattern: {
      eng: "Contact person name should be only Character.",
      arb: "Contact person name should be only Character.",
    },
    required: {
      eng: "Please provide Contact Person Name",
      arb: "الرجاء ادخال اسم جهة الاتصال",
    },
  },
};

export const monthConstants = {
  eng: {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  },
  arb: {
    "01": "يناير",
    "02": "فبراير",
    "03": "مارس",
    "04": "ابريل",
    "05": "مايو",
    "06": "يونيو",
    "07": "يوليو",
    "08": "أغسطس",
    "09": "سبتمبر",
    "10": "أكتوبر",
    "11": "نوفمبر",
    "12": "ديسمبر",
  },
};

export const hijriMonthConstants = {
  eng: {
    "01": "Muharram",
    "02": "Ṣafar",
    "03": "Rabīʿ I",
    "04": "Rabīʿ II",
    "05": "Jumādā I",
    "06": "Jumādā II",
    "07": "Rajab",
    "08": "Shaʿbān",
    "09": "Ramaḍān",
    "10": "Shawwāl",
    "11": "Dhūʿl-Qiʿdah",
    "12": "Dhūʿl-Ḥijjah",
  },
  arb: {
    "01": "يناير",
    "02": "فبراير",
    "03": "مارس",
    "04": "أبريل",
    "05": "مايو",
    "06": "يونيو",
    "07": "يوليو",
    "08": "أغسطس",
    "09": "سبتمبر",
    "10": "أكتوبر",
    "11": "نوفمبر",
    "12": "ديسمبر",
  },
};

export const filterConstants = {
  eng: [
    {
      key: "all",
      value: "All",
    },
    {
      key: "E0001",
      value: "To be filled",
    },
    {
      key: "E0013",
      value: "In Draft",
    },
    {
      key: "E0015",
      value: "For Officer Assignment (Pool)",
    },
    {
      key: "E0016",
      value: "To be Approved by Officer",
    },
    {
      key: "E0018",
      value: "In Clarification with Taxpayer",
    },
    {
      key: "E0019",
      value: "Officer approve addition. info",
    },
    {
      key: "E0041",
      value: "To be Approved by Supervisor",
    },
    {
      key: "E0043",
      value: "Canc/void by Supervisor (Obsol",
    },
    {
      key: "E0044",
      value: "In Clarification with Officer",
    },
    {
      key: "E0045",
      value: "Billed",
    },
    {
      key: "E0049",
      value: "To Approved Rejection by Sup",
    },
    {
      key: "E0050",
      value: "To Approve Cancellation by Sup",
    },
    {
      key: "E0051",
      value: "Void Draft Application",
    },
    {
      key: "E0052",
      value: "Approve - Supervisor Assignment",
    },
    {
      key: "E0053",
      value: "Reject - Supervisor Assignment",
    },
    {
      key: "E0054",
      value: "Canc/Void-SupervisorAssignment",
    },
  ],
  arb: [
    {
      key: "all",
      value: "الكل",
    },
    {
      key: "E0001",
      value: "جاهز للتعبئة",
    },
    {
      key: "E0013",
      value: "محفوظ كمسودة",
    },
    {
      key: "E0015",
      value: "في انتظار تعيين الموظف",
    },
    {
      key: "E0016",
      value: "للإعتماد من قبل الموظف",
    },
    {
      key: "E0018",
      value: "مرفوض-مع المكلف لإعادة التقديم",
    },
    {
      key: "E0019",
      value: "اعتماد الموظف بعد إعادةالتقديم",
    },
    {
      key: "E0041",
      value: "في انتظار اعتماد المشرف",
    },
    {
      key: "E0043",
      value: "تم إلغاء الطلب من قبل المشرف",
    },
    {
      key: "E0044",
      value: "مع الموظف لتقديم النواقص",
    },
    {
      key: "E0045",
      value: "مفوترة",
    },
    {
      key: "E0049",
      value: "لإعتماد الرفض من قبل المشرف",
    },
    {
      key: "E0050",
      value: "لإعتماد الإلغاء من قبل المشرف",
    },
    {
      key: "E0051",
      value: "تم إلغاء الطلب المحفوظ كمسودة",
    },
    {
      key: "E0052",
      value: "في انتظار اعتماد موافقة الموظف",
    },
    {
      key: "E0053",
      value: "في انتظار اعتماد رفض الموظف",
    },
    {
      key: "E0054",
      value: "في انتظار اعتماد إلغاء الموظف",
    },
  ],
};

export const ApiConstants = {
  getWhitelistingList: "sap/opu/odata/SAP/ZDP_ITAP_SRV/",
  getInitData: "sap/opu/odata/SAP/ZDP_WL_M_SRV/",
  validateId: "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/",
  saveWhiteListing: "sap/opu/odata/SAP/ZDP_WL_M_SRV/",
  attachment: "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV",
  getExistingData: "sap/opu/odata/SAP/ZDP_ITAP_SRV/",
  cancelWhitelistData: "sap/opu/odata/SAP/ZDP_WL_C_SRV/",
};
