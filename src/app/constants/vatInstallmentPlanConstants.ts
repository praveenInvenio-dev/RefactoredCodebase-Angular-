export const VatInstallmentPlanConstant = {
  eng: {
    dir: "ltr",
    bc1: "Installment Plans",
    bc2: "Request Installment Plan",
    back: "Back",
    continue: "Continue",
    edit: "Edit",
    confirm: "Confirm",
    mbMax: "5 MB Max",
    filesizeMessage: "File size should not be more than 5 MB.",
    invalidFormat: "Upload files with allowed extensions only",
    fileAlreayExists: "File with the same name already exists",
    fileNameLarge: "File name must not exceed 100 characters",
    Invalidfilesize: "Invalid file size",
    attachInstructions1: "File size should be less than 5 MB.",
    attachInstructions2:
      "Choose only file with extension Doc, Docx, Jpg, PDF, xlsx, xls.",
    sar: "SAR",
    displayAgreementSchedulePlan: "Display Agreement Schedule Plan",
    menu: [
      {
        title: "Taxpayer Details",
        subtitle: "Taxpayer Information",
        step: "assets/image/5-1.svg",
      },

      {
        title: "Select Bills",
        subtitle:
          "Please select the SADAD bills you wish to include in the installment agreement.",
        step: "assets/image/5-2.svg",
      },

      {
        title: "Installment Agreement",
        subtitle: "Set up your instalment plan details.",
        step: "assets/image/5-3.svg",
      },
      {
        title: "Attachments (Optional)",
        subtitle: "Provide the supporting documents",
        step: "assets/image/5-4.svg",
      },
      {
        title: "Summary",
        subtitle: "Review the below information",
        step: "assets/image/5-5.svg",
      },
    ],
    list: {
      applicationNumber: "Application Number",
      reportDate: "Report Date",
      status: "Status",
    },
    f1: {
      title: "Taxpayer Details",
      taxpayerDetails: "Taxpayer Details",
      tin: "TIN",
      name: "Name",
      accountNumber: "VAT Account Number",
      address: "Address",
      dueAmount: "Amount Due",
      term:
        "Kindly confirm that the above information is correct before proceeding.",
    },
    f2: {
      title: "Select Bills",
      caption: "Amendment by GAZT",
      sadNumber: "SADAD Number",
      tax_period: "Tax Period",
      vat: "VAT",
      amt: "Total Amount",
    },
    f3: {
      title: "Instalment Agreement",
      freq: "Frequency",
      monthly: "Monthly",
      sch: "Instalment Schedule",
      label1: "Number of Instalments",
      label2: "Down Payment Amount",
      min: "Min",
      max: "Max",
      two: "2",
      twelve: "12",
      label3: "Penalties",
      label4: "Total Amount Due",
      label5: "Display Instalment Details",
      label6: "Generate Installment schedule",
      m1: "Due Date",
      m2: "Number Of Months",
      m3: "Monthly Installment",
      m4: "Total Amount Paid",
      m5: "Total Amount Remaining",
      total: "Total",
    },
    f4: {
      title: "Attachments",
      attachment: "Attachments",
      drag: "Drag and drop file to upload documentation",
      attachments: "Attachments",
    },
    f5: {
      bills: "Bills",
      bill: "Bill",
      billType: "Bill Type",
      amt: "Amount",
    },
    termsModal: {
      title: "Instructions",
      subtitle:
        "Kindly read the below instructions before completing the installment agreement form:",
      i1: "Please fill the requested information for each step.",

      i2:
        "The application cannot be successfully until all of the mandatory fields have been completed.",

      i3:
        "Taxpayers should ensure that their existing taxpayer details are completed and up to date before submitting their installment agreement form.",

      i4:
        "Please refer to the FAQ section before filling out the installment agreement form.",

      agree: "I declare that I have read and understood the above instruction.",
      btnTitle: "Vat Installment Plan",
    },

    modal: {
      close: "Close",
    },
    success: {
      title: "Request Instalment Plan",
      name: "Name",
      applicationNumber: "Application Number",
      date: "Receipt Date",
      acknowledgement: "Download Confirmation",
      redirect: "Go to Dashboard",
      message: "Your VAT Instalment Plan is successfully submitted",
    },

    conditionsModal: {
      title: "Terms & Conditions",
      listOfConditions: [
        "It is assumed that taxpayer has read and understood the Kingdom of Saudi Arbia's VAT Law and Regulations and all the information provided is, to the best of the taxpayer's knowledge, true, correct and complete.",
        "GAZT holds the right to request and obtain any financial or administrative information and records of the taxpayer and their business to cross check and verify the information provided in this request.",
        "GAZT holds the right to audit a business in order to verify that this request is valid, if proven otherwise, this may result in levy if fines as per the Kingdom of Saudi Arabia's VAT Law and Regulations.",
        "This request does NOT guarantee an approval of installment agreement. You will be advised of GAZT's decision in later correspondences.",
        "Note that once this installment agreement is approved and goes into effect, taxpayers are obligated to make payements according to the installment schedule, regardless of any future decisions resulting from GAZT review / audit.",
        "Taxpayers will not be able to submit self-amendments for tax returns covered under the installment plan while the installment agreement is active.",
      ],
      declaration:
        "I certify that the information given in this request is, to the best of my knowledge, true, correct and complete in every respect. I am the person who is required to file this request or i am authorized to sign on behalf of that person.",
    },

    agreementSchedulePlanModal: {
      installmentAgreementNum: "Installment Agreement No.",
      dueDate: "Due Date",
      noOfMonths: "Number Of Months",
      monthlyInstallment: "Monthly Installment",
      totalAmountPaid: "Total Amount Paid",
      amountRemaining: "Amount Remaining",
      paymentStatus: "Payment Status",
    },
  },

  arb: {
    dir: "rtl",
    bc1: "خطط التقسيط",
    bc2: "طلب خطة التقسيط",
    back: "رجوع",
    continue: "متابعة",
    edit: "تعديل",
    confirm: "تأكيد",
    mbMax: "5 MB الحد الأعلى",
    filesizeMessage: "يجب أن يكون حجم الملف أقل من 5 ميجا بايت.",
    invalidFormat: "الرجاء استخدام صيغ الملفات المسموح بها فقط",
    fileAlreayExists: "يوجد ملف بنفس الاسم مرفق مسبقا",
    fileNameLarge: "يجب ألا يزيد طول اسم الملف عن 100",
    Invalidfilesize: "حجم الملف غير صالح",
    attachInstructions1: "يجب أن يكون حجم الملف أقل من 5 ميغابايت.",
    attachInstructions2: "الصيغ المسموحة Doc, Docx, Jpg, PDF, xlsx, xls",
    sar: "ريال سعودي",
    displayAgreementSchedulePlan: "عرض خطة جدول الاتفاقية",
    menu: [
      {
        title: "تفاصيل المكلف",
        subtitle: "بيانات المكلف",
        step: "assets/image/5-1.svg",
      },

      {
        title: "اختر الفاتورة",
        subtitle:
          "يرجى تحديد فواتير سداد التي ترغب في تضمينها في اتفاقية التقسيط.",
        step: "assets/image/5-2.svg",
      },

      {
        title: "اتفاقية التقسيط",
        subtitle: "إعداد تفاصيل خطة التقسيط",
        step: "assets/image/5-3.svg",
      },
      {
        title: "المرفقات (اختياري)",
        subtitle: "تقديم المستندات الداعمة",
        step: "assets/image/5-4.svg",
      },
      {
        title: "ملخص",
        subtitle: "مراجعة البيانات التالية",
        step: "assets/image/5-5.svg",
      },
    ],
    list: {
      applicationNumber: "رقم الطلب",
      reportDate: "تاريخ التقرير",
      status: "الحالة",
    },
    f1: {
      title: "تفاصيل المكلف",
      taxpayerDetails: "تفاصيل المكلف",
      tin: "الرقم المميز",
      name: "الاسم",
      accountNumber: "رقم حساب ضريبة القيمة المضافة",
      address: "العنوان",
      dueAmount: "المبلغ المستحق",
      term: "يرجى التأكد من صحة المعلومات المذكورة أعلاه قبل المتابعة",
    },
    f2: {
      title: "اختر الفاتورة",
      caption: "تم التعديل من قبل الهيئة",
      sadNumber: "رقم فاتورة سداد",
      tax_period: "الفترة",
      vat: "ضريبة القيمة المضافة",
      amt: "المبلغ الإجمالي",
    },
    f3: {
      title: "اتفاقية التقسيط",
      freq: "التكرار",
      monthly: "شهري",
      sch: "جدول الأقساط",
      label1: "عدد الأقساط",
      label2: "مبلغ الدفعة المقدمة",
      min: "الحد الأدنى",
      max: "الحد الأعلى",
      two: "2",
      twelve: "12",
      label3: "الغرامات",
      label4: "إجمالي المبلغ المستحق",
      label5: "عرض تفاصيل القسط",
      label6: "إنشاء جدول التقسيط",
      m1: "تاريخ الاستحقاق",
      m2: "عدد الأشهر",
      m3: "القسط الشهري",
      m4: "إجمالي المبلغ المدفوع",
      m5: "مجموع المبلغ المتبقي",
      total: "المجموع",
    },
    f4: {
      title: "المرفقات",
      attachment: "المرفقات",
      drag: "سحب وإفلات الملف لتحميل الوثيقة",
      attachments: "المرفقات",
    },
    f5: {
      bills: "الفواتير",
      bill: "الفواتير",
      billType: "نوع الفاتورة",
      amt: "المبلغ",
    },
    termsModal: {
      title: "التعليمات",
      subtitle:
        "يرجى قراءة التعليمات التالية قبل إكمال نموذج طلب اتفاقية التقسيط:",
      i1: "يرجى ملء المعلومات التالية لكل خطوة",

      i2: "لايمكن تقديم الطلب بنجاح حتى يتم الانتهاء من جميع الحقول الإلزامية",

      i3:
        "يجب على المكلفين التأكد من أن تفاصيل المكلفين الحالية كاملة ومحدثة قبل تقديم نموذج اتفاقية التقسيط",

      i4: "يرجى الرجوع إلى قسم الأسئلة الشائعة قبل ملء نموذج اتفاقية التقسيط.",

      agree: "أقر بأنني قد قرأت وفهمت التعليمات المذكورة أعلاه.",
      btnTitle: "خطة تقسيط ضريبة القيمة المضافة",
    },

    modal: {
      close: "إغلاق",
    },
    success: {
      title: "طلب خطة تقسيط",
      name: "الاسم",
      applicationNumber: "رقم الطلب",
      date: "تاريخ الاستلام",
      acknowledgement: "تحميل التأكيد",
      redirect: "الانتقال الى الشاشة الرئيسية",
      message: "تم تقديم خطة تقسيط ضريبة القيمة المضافة بنجاح",
    },

    conditionsModal: {
      title: "الشروط والأحكام",
      listOfConditions: [
        "يفترض أن يكون المكلفين قد قاموا بقراءة وفهم نظام ولوائح ضريبة القيمة المضافة في المملكة وجميع المعلومات المقدمة حقيقية وصحيحة وكاملة على حد علم المكلفين.",
        "تحتفظ الهيئة العامة للزكاة والدخل بحق طلب الحصول على أي معلومات مالية أو ادارية والحصول على سجلات المكلفين وأعمالهم للمراجعة والتحقق من المعلومات المقدمة في طلب التقسيط.",
        "• تحتفظ الهيئة العامة للزكاة والدخل بحق فتح ملف تدقيق من أجل التحقق من نموذج طلب اتفاقية التقسيط وأي نماذج سابقة بحد أقصى 5 سنوات مما يؤدي الى فرض غرامات وفقا لنظام ولوائح ضريبة القيمة المضافة في المملكة",
        "هذا الطلب لا يضمن الموافقة على اتفاقية التقسيط. سيتم إعلامك بقرار الهيئة العامة للزكاة والدخل في المراسلات اللاحقة",
        "تجدر الإشارة إلى أنه بمجرد الموافقة على اتفاقية التقسيط هذه وسريان مفعولها، فإن المكلفين ملزمون بدفع الأقساط وفقا لجدول التقسيط، بغض النظر عن أي قرارات مستقبلية ناتجة عن مراجعة / تدقيق الهيئة العامة للزكاة والدخل",
        "لن يكون بمقدور المكلفين تقديم التعديلات الذاتية للإقرارات الضريبية المشمولة في خطة التقسيط طالما أن اتفاقية التقسيط نشطة",
      ],
      declaration:
        "أتعهد بأن المعلومات الواردة في طلب اتفاقية التقسيط حقيقية وصحيحة وكاملة من جميع النواحي على حد علمي , وأنني الشخص الذي قام بطلب اتفاقية التقسيط أو أنني مخول بالتوقيع نيابة عن هذا الشخص",
    },

    agreementSchedulePlanModal: {
      installmentAgreementNum: "اتفاقية التقسيط رقم",
      dueDate: "تاريخ الاستحقاق",
      noOfMonths: "عدد الأشهر",
      monthlyInstallment: "القسط الشهري",
      totalAmountPaid: "إجمالي المبلغ المدفوع",
      amountRemaining: "المبلغ المتبقي",
      paymentStatus: "حالة الدفع",
    },
  },
};

export const ApiConstants = {
  getInitialListData: "sap/opu/odata/SAP/ZDP_ITAP_SRV",
  getInitialData: "sap/opu/odata/SAP/ZDP_VTIA_SRV",
  Attachment: "sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV",
  UserTypeValidation: "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/",
  getExistingData: "sap/opu/odata/SAP/ZDP_ITAP_SRV/",
  getVATInstalmentPlans: "sap/opu/odata/SAP/ZDP_ITAP_SRV/",
  getScheduledInstallmentPlan: "sap/opu/odata/SAP/ZDP_VTIA_DISPLAY_SRV/",
};
