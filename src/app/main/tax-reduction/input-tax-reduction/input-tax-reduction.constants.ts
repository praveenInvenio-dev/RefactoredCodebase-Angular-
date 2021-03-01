import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputTaxReductionConstants {
  translation = {
    en: {
      processTitle: 'Input Tax Deduction',
      tncAgreeCheckboxText:
        'I agree with these Instructions and conditions and proceed further.',
      tncButton: 'Change Deduction Method',
      tncContent: `1. Please fill the requested information for each step. The application cannot be successfully submitted until all of the mandatory fields have been completed.

      2. Please note that GAZT reserves the right to validate the implied split between taxable and exempt purchases and will only approve the input tax deduction method.
      
      3. Please refer to the FAQ section before filling out the application form.`,
      breadcrumb: [
        {
          // TODO: Update the links
          link: '../tax',
          text: 'Tax Management',
          active: false,
        },
        {
          link: '../vatServices',
          text: 'VAT Services',
          active: false,
        },
        {
          link: '',
          text: 'Change Input Tax Deduction Method',
          active: true,
        },
      ],
      listPage: {
        requestNumber: 'Request Number',
        creationDate: 'Creation Date',
        newRequest: 'New request',
        description: 'Description',
        requestName: 'Request Name',
        status: 'Status',
      },
      submissionPage: {
        requestSentHeading: 'Request Sent',
        requestSentSubHeading:
          'Your Input Tax Deduction Method change request is submitted successfully.',
        name: 'Name',
        requestNumber: 'Request Number',
        date: 'Date',
        gotoDashboard: 'Go to Dashboard',
        download: 'Download Acknowledgement',
        download2: 'Download Form',
      },
      step1: {
        heading: 'Input Tax Deduction Method',
        subHeading: 'Complete the below details',
        effectiveDateHeading: 'Effective Date for input tax deduction method',
        effectiveDateSubHeading: 'Effective Date',
        taxSuppliesPlaceholder: 'Taxable supplies',
        exemptSuppliesPlaceholder: 'Exempt supplies',
        currentDeductionHeading:
          'Current input tax deduction method for appropriation of non-attributable input tax',
        taxPurchaseName: 'Proxy for Taxable Purchases',
        taxPurchasePercent: 'Taxable Purchases',
        exemptPurchaseName: 'Proxy for Exempt Purchases',
        exemptPurchasePercent: 'Exempt Purchases',
        deductionSideNote:
          'Corresponding split between taxable and exempt purchase (in %)',
        proposedDeductionHeading:
          'Proposed input tax deduction method for appropiation of non-attributable input tax',
        notesHeading: 'Notes to explain the rational behind proposed method',
        notes: 'Rational explanation of proposed method',
        error: {
          taxablePurchaseName: 'Please provide Taxable Purchase Name',
          exemptPurchaseName: 'Please provide Exempt Purchases Name',
          notes: 'Please Provide Notes',
        },
      },
      step2: {
        heading: 'Attachments',
        subHeading:
          'Please note that submission of attachments to evidence the applicability of proposed method is mandatory',
        attachmentName: 'Attachment name',
        addAttachment: 'Add Attachments',
        addAttachmentType: 'Add Attachment Type',
        attachmentNo: 'No. of attachments',
        dragAndDrop: 'Drag and drop file to upload documentation',
        fileMax: '5MB Max',
        error: {
          attachmentName: 'Attachment name is mandatory',
          maxNumberAttachments: 'Max 5 attachments are allowed per field',
          attachmentType: 'Attachment of the type is not allowed',
          attachmentSize: 'Attachment size is not allowed',
          attachmentSizeZero: 'Unable to load attachments',
          attachmentDupe: 'File with the same name already exists',
        },
        caution: `Caution, you must adjust the settings of the scanner so that the compressed file size less than 5MB.`,
        caution1: `(choose only file with extension  .XLS,.XLSX,.DOC,.DOCX,.PDF,.JPG)`,
        success: {
          uploadSuccessful: 'Attachment is uploaded successfully',
        },
      },
      step3: {
        heading: 'Declaration',
        subHeading:
          'I hereby certify that I am authorized to complete this form for the taxable person and that all information contained is correct',
        idType: 'ID Type',
        idNumber: 'ID Number',
        contactPerson: 'Contact Person Name',
        dateOfBirth: 'Date of Birth',
        validate: 'Validate',
        declaration:
          'I hereby declare that the above mentioned information is true and correct to the best of my knowledge and belief',
        idTypeDropdown: [
          {
            value: 'ZS0001',
            text: 'National ID',
          },
          {
            value: 'ZS0002',
            text: 'Iqama ID',
          },
          {
            value: 'ZS0003',
            text: 'GCC ID',
          },
        ],
        error: {
          idNumber: 'Please Provide ID Number',
          contactPerson: {
            pattern: 'Contact person name should be only Character.',
            required: 'Please provide Contact Person Name',
          },
        },
        idMsg: 'Please Enter ID',
        dobMsg: 'Please Enter DOB',
        idError: 'GCC ID should be between 8-15 digits',
        close: 'Close',
      },
      step4: {
        heading: 'Summary',
        subHeading: 'Review the below information',
        effectiveDate: 'Effective Date for Input Tax Deduction Method',
        effectiveFrom: 'Effective Date From',
        effectiveTo: 'Effective Date To',
        current: 'Current Input Tax Deduction Method',
        proposed: 'Proposed Input Tax Deduction Method',
        proxyTaxable: 'Proxy for Taxable Purchases',
        proxyExempt: 'Proxy for Exempt Purchases',
        taxable: 'Taxable Purchases',
        exempt: 'Exempt Purchases',
        // currentTaxablePurchase: 'Current proxy for Taxable Purchases',
        // currentTaxablePurchasePercent: 'Current Taxable Purchases',
        // currentExemptPurchase: 'Current proxy for Exempt Purchases',
        // currentExemptPurchasePercent: 'Current Exempt Purchases',
        // proposedTaxablePurchase: 'New proposed proxy for Taxable Purchases',
        // proposedTaxablePurchasePercent: 'New proposed Taxable Purchases',
        // proposedExemptPurchase: 'New proposed proxy for Exempt Purchases',
        // proposedExemptPurchasePercent: 'New proposed Exempt Purchases',
        attachmentSubheading: 'Copy of New input applicability',
        dateOfSubmission: 'Date of Submission',
        notes: 'Rational explanation of proposed method',
      },
    },

    ar: {
      processTitle: 'Input Tax Deduction',
      tncAgreeCheckboxText:
        'أوافق على هذه التعليمات والشروط والانتقال الى الخطوة التالية',
      tncButton: 'تغيير طريقة الخصم النسبي',
      tncContent: `يرجى تعبئة المعلومات المطلوبة لكل خطوة. لا يمكن تقديم الطلب بنجاح حتى يتم الانتهاء من جميع الحقول الإلزامية.

      المترتبة إذا رأت الهيئة أن الطريقة التي وافقت عليها لا تعكس بدقة استخدام الشخص الخاضع للضريبة للسلع والخدمات.`,
      breadcrumb: [
        {
          // TODO: Update the links
          link: '../tax',
          text: 'إدارة الضريبة',
          active: false,
        },
        {
          link: '../vatServices',
          text: 'خدمات ضريبة القيمة المضافة',
          active: false,
        },
        {
          link: '',
          text: 'تغيير طريقة الخصم النسبي لضريبة المدخلات',
          active: true,
        },
      ],
      listPage: {
        requestNumber: 'رقم الطلب',
        creationDate: 'تاريخ الطلب',
        newRequest: 'طلب جديد',
        description: 'الوصف',
        requestName: 'اسم الطلب',
        status: 'الحالة',
      },
      submissionPage: {
        requestSentHeading: 'تم ارسال الطلب',
        requestSentSubHeading:
          'تم إرسال طلب تغيير طريقة خصم ضريبة المدخلات بنجاح.',
        name: 'الاسم',
        requestNumber: 'رقم الطلب',
        date: 'التاريخ',
        gotoDashboard: 'الانتقال الى الشاشة الرئيسية',
        download: 'تحميل اشعار استلام',
        download2: 'تحميل نموذج الطلب',
      },
      step1: {
        heading: 'طريقة خصم ضريبة المدخلات',
        subHeading: 'أكمل التفاصيل أدناه',
        effectiveDateHeading:
          'تاريخ استخدام طريقة الخصم النسبي لضريبة للمدخلات',
        effectiveDateSubHeading: 'تاريخ الاستخدام',
        taxSuppliesPlaceholder: 'التوريدات الخاضعة للضريبة',
        exemptSuppliesPlaceholder: 'التوريدات المعفاة',
        currentDeductionHeading:
          'طريقة خصم ضريبة المدخلات المستخدمة حاليا لتحديد ضريبة المدخلات الغير مخصصة',
        taxPurchaseName: 'وكيل للمشتريات الخاضعة للضريبة',
        taxPurchasePercent: 'المشتريات الخاضعة للضريبة',
        exemptPurchaseName: 'الوكيل للمشتريات المعفاة',
        exemptPurchasePercent: 'التوريدات المعفاة',
        deductionSideNote:
          'القسمة المقابلة بين الشراء الخاضع للضريبة والمشتريات المعفاة (٪)',
        proposedDeductionHeading:
          'الطريقة المقترحة لخصم ضريبة المدخلات لاقتسام ضريبة المدخلات غير المخصصة',
        notesHeading: 'الرجاء ذكر أسباب وشرح طريقة حساب الخصم النسبي المقترحة',
        notes: 'شرح منطقي للطريقة المقترحة',
        error: {
          taxablePurchaseName: 'الرجاء إدخال وكيل للمشتريات الخاضعة للضريبة',
          exemptPurchaseName: 'الرجاء إدخال وكيل للمشتريات الخاضعة للضريبة',
          notes: 'الرجاء ذكر الأسباب',
        },
      },
      step2: {
        heading: 'المرفقات',
        subHeading:
          'يرجى ملاحظة أن تقديم المرفقات لإثبات إمكانية تطبيق الطريقة المقترحة إلزامي',
        attachmentName: 'اسم المرفق',
        addAttachment: 'إضافة المرفقات',
        addAttachmentType: 'اضف نوع المرفق',
        attachmentNo: 'عدد المرفقات',
        dragAndDrop: 'سحب وإفلات الملف لتحميل الوثيقة',
        fileMax: '5 ميغا بايت كحد أقصى',
        error: {
          attachmentName: 'المرفقات إلزامية',
          maxNumberAttachments: 'يمكن رفع خمسة ملفات فقط كحد اقصى',
          attachmentType:
            ' الرجاء إختيار فقط الملفات بصيغة Doc, Docx, Jpg, PDF, Xlsx, Xls. الحد الأقصى للإرفاق هو 5 مرفقات',
          attachmentSize: 'حجم الملف يحب أن يكون أقل من 5MB',
          attachmentSizeZero: 'Unable to load attachments',
          attachmentDupe: 'يوجد ملف بنفس النص مرفق مسبقا',
        },
        caution: `تحذير ، يجب ضبط إعدادات الماسح الضوئي بحيث يقل حجم الملف المضغوط عن 5 ميغا بايت.`,
        caution1: `(اختر فقط ملفًا بامتداد.XLS,.XLSX,.DOC,.DOCX,.PDF,.JPG )`,
        success: {
          uploadSuccessful: 'Attachment is uploaded successfully',
        },
      },
      step3: {
        heading: 'التعهد',
        subHeading:
          'أقر بموجب هذا بأنني مفوض لملء هذا النموذج للشخص الخاضع للضريبة وأن جميع المعلومات الواردة صحيحة',
        idType: 'نوع الهوية',
        idNumber: 'رقم الهوية',
        contactPerson: 'اسم جهة الاتصال',
        dateOfBirth: 'تاريخ الميلاد',
        validate: 'التحقق',
        declaration:
          'أقر بموجبه أن المعلومات المذكورة أعلاه صحيحة وصحيحة على حد علمي',
        idTypeDropdown: [
          {
            value: 'ZS0001',
            text: 'الهوية الوطنية',
          },
          {
            value: 'ZS0002',
            text: 'رقم الإقامة',
          },
          {
            value: 'ZS0003',
            text: 'هوية مواطني دول الخليج',
          },
        ],
        error: {
          idNumber: 'Please Provide ID Number',
          contactPerson: {
            pattern: 'Contact person name should be only Character.',
            required: 'الرجاء ادخال اسم جهة الاتصال',
          },
        },
        idMsg: 'الرجاء ادخال رقم الهوية',
        dobMsg: 'الرجاء ادخال تاريخ الميلاد',
        idError:
          'يجب أن يتراوح رقم هوية مواطني دول مجلس التعاون الخليجي بين 8 إلى 15 رقمًا',
        close: 'إغلاق',
      },
      step4: {
        heading: 'ملخص',
        subHeading: 'مراجعة البيانات التالية',
        effectiveDate: 'تاريخ استخدام طريقة الخصم النسبي لضريبة للمدخلات',
        effectiveFrom: 'تاريخ السريان من',
        effectiveTo: 'تاريخ السريان حتى',
        current: 'طريقة خصم ضريبة المدخلات الحالية',
        proposed: 'طريقة خصم ضريبة المدخلات المقترحة',
        proxyTaxable: 'وكيل للمشتريات الخاضعة للضريبة',
        proxyExempt: 'الوكيل للمشتريات المعفاة',
        taxable: 'المشتريات الخاضعة للضريبة',
        exempt: 'المشتريات المعفاة',
        // currentTaxablePurchase: 'Current proxy for Taxable Purchases',
        // currentTaxablePurchasePercent: 'Current Taxable Purchases',
        // currentExemptPurchase: 'Current proxy for Exempt Purchases',
        // currentExemptPurchasePercent: 'Current Exempt Purchases',
        // proposedTaxablePurchase: 'New proposed proxy for Taxable Purchases',
        // proposedTaxablePurchasePercent: 'New proposed Taxable Purchases',
        // proposedExemptPurchase: 'New proposed proxy for Exempt Purchases',
        // proposedExemptPurchasePercent: 'New proposed Exempt Purchases',
        attachmentSubheading: 'Copy of New input applicability',
        dateOfSubmission: 'تاريخ التقديم',
        notes: 'شرح منطقي للطريقة المقترحة',
      },
    },
  };

  readonly APPLICATION_TYPE = 'TPFV';
  readonly STATUS_TO_CODE_MAP = {
    BILLED: 'E0045',
  };
}
