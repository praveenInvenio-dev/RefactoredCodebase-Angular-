export const stringConstants = {
  en: {
    main: {
      nav: {
        bc1: 'Tax Management',
        bc2: 'Zakat Services',
        bc3: 'Request for Income Tax Reduction Method',
        back: 'Back',
      },

      title: {
        report: 'Request for Income Tax Reduction',
        view: 'Request for Income Tax Reduction Detail',
      },

      search: 'Search',

      list: {
        new: 'New Request',
        fbnum: 'FB Number',
        date: 'Creation Date',
        fname: 'Form Name',
        status: 'Status',
      },

      filters: {
        title: 'Filter',
        label: 'Status',
        btn: 'Apply',
      },
    },

    add: {
      modal: {
        title: 'Instructions',
        content1: `Please fill the requested information for each step. The application cannot be successfully submitted until all of the mandatory fields have been completed.`,
        // content2:
        //   'Registered applicants should ensure that their existing taxpayer details are complete and up to date before registering for VAT.',
        content3:
          'Please refer to the FAQ section before filling out the application form.',
        agree: 'I agree with these conditions.',
        submit: 'Submit the consolidated accounts',
      },

      process: [
        {
          title: 'Request Details',
          subtitle: 'Complete the below Details',
          step: 'assets/image/3steps-1.svg',
        },
        {
          title: 'Attachments',
          subtitle: 'Complete the below Details',
          step: 'assets/image/3steps-2.svg',
        },
        // {
        //   title: 'Declaration',
        //   subtitle:
        //     'I hereby certify that I am authorized to complete this form for the taxable person and that all information contained is correct',
        //   step: 'assets/image/4-3.svg',
        // },
        {
          title: 'Summary',
          subtitle: 'Review the information below',
          step: 'assets/image/3steps-3.svg',
        },
      ],

      user: {
        title: 'User Details',
        name: 'Taxpayer Name',
        tin: 'TIN',
      },

      invoice: {
        title: 'Invoice',
        invoice: 'Invoice No.',
        period: 'Period',
        from: 'Period From',
        to: 'Period To',
        due: 'Due Date',
        amount: 'Amount',
        amountNew: 'Amount New',
      },

      errors: {
        minmax: 'New Amount must be greater than 0 and less than Amount',
        max: 'Please enter a positive numeric value not greater than',
      },

      remarks: 'Remarks',
      notes: 'Detail Description',
      attachment1: 'General Attachment 1',
      attachment2: 'General Attachment 2',
      uploadFile: 'Drag and drop file to upload documentation',
      maxSize: '10MB Max',
      caution: `Caution, you must adjust the settings of the scanner so that the compressed file size less than 10MB.`,
      caution1: `(choose only file with extension  .XLS,.XLSX,.DOC,.DOCX,.PDF,.JPG)`,

      declaration: {
        idType: 'ID type',
        idNum: 'ID Number',
        idError: 'GCC ID should be between 7-15 digits',
        name: 'Contact Person Name',
        dob: 'Date of Birth',
        natId: 'National ID',
        iqId: 'Iqama ID',
        gccId: 'GCC ID',
        agree:
          ' I hereby declare that the above mentioned information is true and correct to the best of my knowledge and belief',
        idMsg: 'Please Enter ID',
        dobMsg: 'Please Enter DOB',
        validate: 'Validate',
        close: 'Close',
      },

      edit: 'Edit',
      continue: 'Continue',
      confirm: 'Confirm',

      success: {
        title: 'New Application for Income Tax Reduction Method',
        sub:
          'GAZT acknowledges your Application for Income Tax Reduction Method',
        name: 'Name',
        appNo: 'Application Number',
        date: 'Date',
        message:
          'Please retain this number for future evidence and communication. GAZT will process your request and if needed contact you for any additional information. For further information, please contact help desk.',
        download: 'Download Confirmation',
        download2: 'Download Form',
      },

      fileErrors: {
        filesizeMessage: 'File size should not be more than 10 MB.',
        invalidFormat: 'Upload files with allowed extensions only',
        fileAlreayExists: 'File with the same name already exists',
        maxNoOfFiles: 'Maximum no. of 1 attachment can be uploaded.',
      },
    },
  },

  ar: {
    main: {
      nav: {
        bc1: 'إدارة الضريبة',
        bc2: 'خدمات الزكاة',
        bc3: 'طلب طريقة تخفيض ضريبة الدخل',
        back: 'رجوع',
      },

      title: {
        report: 'طلب طريقة تخفيض ضريبة الدخل',
        view: 'تفاصيل طلب تخفيض الدفعات المقدمة لضريبة الدخل',
      },

      search: 'بحث',

      list: {
        new: 'طلب جديد',
        fbnum: 'الرقم المرجعي للنموذج',
        date: 'تاريخ الطلب',
        fname: 'اسم النموذج',
        status: 'الحالة',
      },

      filters: {
        title: 'فلتر',
        label: 'الحالة',
        btn: 'تقديم',
      },
    },

    add: {
      modal: {
        title: 'التعليمات',
        content1: `يرجى ملء المعلومات المطلوبة لكل خطوة. لا يمكن تقديم الطلب بنجاح حتى يتم استكمال جميع الحقول الإلزامية. `,
        // content2:
        //   'يجب على المتقدمين المسجلين التأكد من أن تفاصيل المكلفين الحاليين كاملة ومحدثة قبل التسجيل في ضريبة القيمة المضافة.',
        content3: 'يرجى الرجوع إلى قسم الأسئلة الشائعة قبل ملء نموذج الطلب.',
        agree: 'أوافق على هذه الشروط.',
        submit: 'إرسال الحسابات الموحدة',
      },

      process: [
        {
          title: 'تفاصيل الطلب',
          subtitle: 'اكمل البيانات التالية',
          step: 'assets/image/3steps-1.svg',
        },
        {
          title: 'المرفقات',
          subtitle: 'اكمل البيانات التالية',
          step: 'assets/image/3steps-2.svg',
        },
        // {
        //   title: 'التعهد',
        //   subtitle:
        //     'أقر بموجب هذا بأنني مفوض لملء هذا النموذج للشخص الخاضع للضريبة وأن جميع المعلومات الواردة صحيحة',
        //   step: 'assets/image/4-3.svg',
        // },
        {
          title: 'ملخص',
          subtitle: 'مراجعة البيانات التالية',
          step: 'assets/image/3steps-3.svg',
        },
      ],

      user: {
        title: 'بيانات المستخدم',
        name: 'اسم المكلف',
        tin: 'الرقم المميز',
      },

      invoice: {
        title: 'الفاتورة',
        invoice: 'رقم الفاتورة.',
        period: 'الفترة',
        from: 'الفترة من',
        to: 'الفترة إلى',
        due: 'تاريخ الاستحقاق',
        amount: 'المبلغ',
        amountNew: 'المبلغ الجديد',
      },

      errors: {
        minmax: 'يجب أن يكون المبلغ الجديد أكبر من 0 وأقل من المبلغ',
        max: 'الرجاء إدخال قيمة رقمية موجبة لاتزيد عن',
      },

      remarks: 'الملاحظات',
      notes: 'تفاصيل الوصف',
      attachment1: 'مرفق عام 1',
      attachment2: 'المرفق العام 2',
      uploadFile: 'قم بسحب وإفلات الملف لتحميل الوثائق',
      maxSize: '10MB الحد الأعلى',
      caution: `تحذير ، يجب ضبط إعدادات الماسح الضوئي بحيث يقل حجم الملف المضغوط عن 10 ميغا بايت.`,
      caution1: `(اختر فقط ملفًا بامتداد.XLS,.XLSX,.DOC,.DOCX,.PDF,.JPG )`,

      declaration: {
        idType: 'نوع الهوية',
        idNum: 'رقم الهوية',
        idError:
          'يجب أن يتراوح رقم هوية مواطني دول مجلس التعاون الخليجي بين 7 إلى 15 رقمًا',
        name: 'اسم جهة الاتصال',
        dob: 'تاريخ الميلاد',
        natId: 'الهوية الوطنية',
        iqId: 'رقم الإقامة',
        gccId: 'هوية مواطني دول الخليج',
        agree:
          'أقر بموجبه أن المعلومات المذكورة أعلاه صحيحة وصحيحة على حد علمي',
        idMsg: 'الرجاء ادخال رقم الهوية',
        dobMsg: 'الرجاء ادخال تاريخ الميلاد',
        validate: 'التحقق',
        close: 'إغلاق',
      },

      edit: 'تعديل',
      continue: 'متابعة',
      confirm: 'تأكيد',

      success: {
        title: 'طلب جديد لطريقة تخفيض ضريبة الدخل',
        sub:
          'تقر الهيئة العامة للزكاة والدخل بطلبك للحصول على طريقة تخفيض ضريبة الدخل',
        name: 'الاسم',
        appNo: 'رقم الطلب',
        date: 'التاريخ',
        message:
          'يرجى الاحتفاظ بالرقم المرجعي لهذا الطلب وفي حال وجود أي استفسار يمكنك استخدام هذا الرقم المرجعي. سوف تقوم الهيئة بتقييم الطلب والرد عليكم وفي حالة نقص في البيانات سوف تعاود الهيئة الاتصال بك. لمزيد من المعلومات يمكنك زيارة فرع الهيئة.',
        download: 'تحميل التأكيد',
        download2: 'تحميل نموذج الطلب',
      },

      fileErrors: {
        filesizeMessage: '.MB حجم الملف لا يمكن ان يزيد عن 10',
        invalidFormat:
          '.XLS,.XLSX,.DOC,.DOCX,.PDF,.JPG :يجب ان تكون صيغة الملف من ضمن',
        fileAlreayExists: 'يوجد ملف بنفس الاسم بالفعل',
        maxNoOfFiles: 'الحد الأقصى لا. يمكن تحميل مرفق واحد.',
      },
    },
  },
};

export const apiConstants = {
  getListData: 'sap/opu/odata/SAP/ZDP_TP_DASHBOARD_SRV',
  getFormData: 'sap/opu/odata/SAP/Z_TP_NOTES_TP03_SRV',
  attachment: 'sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV',
  UserTypeValidation: 'sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/',
  acknowledgement: 'sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV',
  formDl: 'sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV',
};
