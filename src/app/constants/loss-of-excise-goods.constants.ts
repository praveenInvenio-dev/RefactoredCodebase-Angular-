export const stringConstants = {
  en: {
    report: {
      nav: {
        back: 'Back',
        paths: [
          'Tax Management',
          'Excise Tax Services',
          'Request for Register\\ Display Warehouses',
          'Report on the loss of Excise Goods',
        ],
      },

      title: {
        report: 'Report on the loss of Excise Goods',
        view: 'Report on the loss of Excise Goods Detail',
      },

      search: 'Search',

      list: {
        new: 'New Application for Loss of Excise Goods',
        fbnum: 'FB Number',
        businessName: 'Business Name',
        status: 'Status',
        fname: 'Form Name',
      },

      filters: {
        title: 'Filter',
        label: 'Status',
        btn: 'Apply',
      },
    },

    add: {
      nav: {
        paths: [
          'Tax Management',
          'Excise Tax Services',
          'Request for Register\\ Display Warehouses',
          'Report on the loss of Excise Goods',
          'New Application for Loss of Excise Goods',
        ],
      },

      title: {
        main: ['Loss of Goods Details', 'Declaration & Attachments', 'Summary'],
        sub: [
          'Complete the below Details',
          'I hereby certify that I am authorized to complete this form for the taxable person and that all information contained is correct',
          'Review the below information',
        ],
      },

      steps: [
        'assets/images/excise-goods/step-1.svg',
        'assets/images/excise-goods/step-2.svg',
        'assets/images/excise-goods/step-3.svg',
      ],

      form: {
        warehouse: 'Warehouse',
        fin: 'FIN',
        name: 'Taxpayer Name',

        irrLoss: {
          label: 'Did the irreversible loss of excise goods occur or not yet?',
          yes: 'Yes',
          no: 'No',
        },

        lossType: {
          label: 'Type of Loss',
          warehouse: 'Goods under suspension in Tax Warehouse',
          movement: 'Goods Movement under Suspension',
        },

        whSus: {
          title: 'Goods under suspension in Tax Warehouse',
          lossDate: 'Date of Loss Occurred',
          plannedDate: 'Planned Date of Destroying Goods',
          whNo: 'Warehouse Number',
          prodType: 'Product Type',
          prodDesc: 'Product Description',
          unitM: 'Unit of Measure',
          units: 'Units',
          rsp: 'RSP including Excise Tax per Unit',
          totalRsp: 'Total RSP',
          totalEt: 'Total Excise Tax',
          add: 'Add New Goods under Suspension in Tax Warehouse',
        },

        movSus: {
          title: 'Goods Movement under Suspension',
          date: 'Date for the irrevrsible loss of Excise goods',
          doc: 'Excise movement document number',
          period: 'Monthly movement declaration period',
          tariffCode: 'Tariff Code',
          tariffDesc: 'Tariff Description',
          brand: 'Brand',
        },

        currency: 'SAR',

        total: {
          title: 'Total',
          units: 'Total Units',
          rsp: 'Total RSP',
          et: 'Total Excise Tax',
        },

        decla: {
          reason:
            'Please mention the reasons for the irrecoverable loss of the goods',
          files: {
            label:
              'Please update the evidence that supports that the total destruction or irrecoverable loss was caused beyond the License Intention',
            add: 'Drag and drop file to upload documentation',
            max: '2MB Max',
          },
          text:
            'I declare that all the information and evidence provided in this form is correct and that the total loss of goods was caused beyond my intention. If the information and evidence provided is not sufficient or incorrect, the Authority holds the right to consider the Excise goods as being released for consumption.',
        },

        errors: {
          invalid: 'Invalid Entry',
          max: 'Please enter a positive numeric value not greater than',
        },
      },

      summary: {
        edit: 'Edit',
        loss: 'Loss Information',
        decla: {
          title: 'Declaration & Attachments',
          reason: 'Reasons for irrecoverable loss of the goods',
          attachments: 'Attachments',
        },
      },

      btn: {
        continue: 'Continue',
        confirm: 'Confirm',
      },

      success: {
        title: 'New Application for Loss of Excise Goods',
        sub: 'GAZT acknowledges your ET Application for Loss of Goods',
        name: 'Name',
        appNo: 'Application Number',
        date: 'Date',
        message:
          'Please retain this number for future evidence and communication. GAZT will process your request and if needed contact you for any additional information. For further information, please contact help desk.',
        download: 'Download Confirmation',
        download2: 'Download Form',
      },

      fileErrors: {
        filesizeMessage: 'File size should not be more than 2 MB.',
        invalidFormat: 'Upload files with allowed extensions only',
        fileAlreayExists: 'File with the same name already exists',
        maxNoOfFiles: 'Maximum no. of 5 attachments can be uploaded.',
      },
    },
  },

  ar: {
    report: {
      nav: {
        back: 'رجوع',
        paths: [
          'إدارة الضريبة',
          'خدمات الضرائب الانتقائية',
          'التسجيل/  عرض المستودعات',
          'الإبلاغ عن فقدان السلع الانتقائية',
        ],
      },

      title: {
        report: 'الإبلاغ عن فقدان السلع الانتقائية',
        view: 'تفاصيل الإبلاغ عن فقدان السلع الانتقائية',
      },

      search: 'بحث',

      list: {
        new: 'بلاغ جديد عن فقدان سلع إنتقائية',
        fbnum: 'الرقم المرجعي للنموذج',
        businessName: 'اسم المكلف',
        status: 'الحالة',
        fname: 'اسم النموذج',
      },

      filters: {
        title: 'فلتر',
        label: 'الحالة',
        btn: 'تقديم',
      },
    },

    add: {
      nav: {
        paths: [
          'إدارة الضريبة',
          'التسجيل في ضريبة السع الانتقائية',
          'التسجيل/  عرض المستودعات',
          'الإبلاغ عن فقدان السلع الانتقائية',
          'بلاغ جديد عن فقدان سلع إنتقائية',
        ],
      },

      title: {
        main: ['تفاصيل السلع المفقودة', 'التعهد و المرفقات', 'ملخص'],
        sub: [
          'اكمل البيانات التالية',
          'أقر بموجب هذا بأنني مفوض لملء هذا النموذج للشخص الخاضع للضريبة وأن جميع المعلومات الواردة صحيحة',
          'مراجعة البيانات التالية',
        ],
      },

      steps: [
        'assets/images/excise-goods/step-1.svg',
        'assets/images/excise-goods/step-2.svg',
        'assets/images/excise-goods/step-3.svg',
      ],

      form: {
        warehouse: 'المستودعات',
        fin: 'الرقم الضريبي',
        name: 'اسم المكلف',

        irrLoss: {
          label: 'هل تم فقدان السلع الإنتقائية؟',
          yes: 'نعم',
          no: 'لا',
        },

        lossType: {
          label: 'موقع فقدان او اتلاف السلع',
          warehouse: 'في المستودع الضريبي تحت التعليق',
          movement: 'خلال نقل السلع تحت التعليق',
        },

        whSus: {
          title: 'في المستودع الضريبي تحت التعليق',
          lossDate: 'تاريخ فقدان او خسارة السلع',
          plannedDate: 'خلال نقل السلع تحت التعليق',
          whNo: 'رقم المستودع الضريبي',
          prodType: 'نوع السلعة',
          prodDesc: 'وصف السلع',
          unitM: 'وحدة القياس',
          units: 'الوحدات',
          rsp: 'سعر البيع بالتجزئة لكل وحدة شامل الضريبة (ر.س.)',
          totalRsp: 'اجمالي سعر البيع بالتجزئة شامل الضريبة (ر.س.)',
          totalEt: 'اجمالي الضريبة الإنتقائية (ر.س.)',
          add: 'إضافة سلع أخرى في المستودع الضريبي تحت التعليق',
        },

        movSus: {
          title: 'خلال نقل السلع تحت التعليق',
          date: 'تاريخ فقدان او خسارة السلع',
          doc: 'رقم مستند نقل السلع',
          period: 'فترة بيان النقل الشهري',
          tariffCode: 'بند التعرفة',
          tariffDesc: 'الوصف',
          brand: 'العلامة التجارية',
        },

        currency: 'ريال سعودي',

        total: {
          title: 'المجموع',
          units: 'اجمالي الوحدات',
          rsp: 'اجمالي سعر البيع بالتجزئة شامل الضريبة (ر.س.)',
          et: 'اجمالي الضريبة الإنتقائية (ر.س.)',
        },

        decla: {
          reason: 'يرجى ذكر أسباب فقدان او خسارة السلع الإنتقائية',
          files: {
            label:
              'الرجاء ارفاق الأدلة المساندة لإثبات ان فقدان او خسارة السلع الإنتقائية حدثت خارج عن إرادة حامل الرخصة',
            add: 'قم بسحب وإفلات الملف لتحميل الوثائق',
            max: '2 ميغا بايت كحد أقصى',
          },
          text:
            'أتعهد بأن جميع المعلومات والأدلة المقدمة في هذا النموذج صحيحة وأن الخسارة الإجمالية للسلع حدثت خارج إرادتنا. تحتفظ الهيئة بالحق في اعتبار أن السلع الانتقائية تم الإفراج عنها للاستهلاك، إذا كانت المعلومات والأدلة المقدمة غير كافية أو غير صحيحة.',
        },

        errors: {
          invalid: 'إدخال غير صالح',
          max: 'الرجاء إدخال قيمة رقمية موجبة لاتزيد عن',
        },
      },

      summary: {
        edit: 'تعديل',
        loss: 'بيانات المفقودات',
        decla: {
          title: 'التعهد و المرفقات',
          reason: 'أسباب فقدان او خسارة السلع الإنتقائية',
          attachments: 'المرفقات',
        },
      },

      btn: {
        continue: 'متابعة',
        confirm: 'تأكيد',
      },

      success: {
        title: 'بلاغ جديد عن فقدان سلع إنتقائية',
        sub: 'تم تسليم طلب التسجيل الخاص بكم',
        name: 'الاسم',
        appNo: 'رقم الطلب',
        date: 'التاريخ',
        message:
          'يرجى الاحتفاظ بالرقم المرجعي لهذا الطلب وفي حال وجود أي استفسار يمكنك استخدام هذا الرقم المرجعي. سوف تقوم الهيئة بتقييم الطلب والرد عليكم وفي حالة نقص في البيانات سوف تعاود الهيئة الاتصال بك. لمزيد من المعلومات يمكنك زيارة فرع الهيئة.',
        download: 'تحميل التأكيد',
        download2: 'تحميل نموذج الطلب',
      },

      fileErrors: {
        filesizeMessage: '.MB حجم الملف لا يمكن ان يزيد عن 2',
        invalidFormat:
          'Doc, Docx, Jpg, PDF, xlsx, xls :يجب ان تكون صيغة الملف من ضمن',
        fileAlreayExists: 'يوجد ملف بنفس الاسم بالفعل',
        maxNoOfFiles: 'يمكن رفع خمسة ملفات فقط كحد اقصى',
      },
    },
  },
};

export const apiConstants = {
  getInitialData: 'sap/opu/odata/SAP/ZDP_ERGM_WI_SRV',
  getFormData: 'sap/opu/odata/SAP/ZDP_ETLG_M_SRV',
  attachment: 'sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV',
  acknowledgement: 'sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV',
  formDl: 'sap/opu/odata/SAP/Z_GET_COVERFORM_SRV',
};
