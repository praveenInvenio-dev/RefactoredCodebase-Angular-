export const NewChangeFilingFrequencyConstants = {
    eng: {
        dir: "ltr",
        bc1: "Tax Management",
        bc2: "VAT Services",
        bc3: "VAT Filling Frequency",
        back: "Back",
        continue: "Continue",
        search:"Search",
        filter:"Filter",
        Type:"Type",
        Status:"Status",
        ApplicationNO:"Application NO",
        Apply:"Apply",
        fbnumtext:"FB Number",
        Reset:"Reset",
        Close:"Close",
        validate:"validate",
        IDNumber:"ID Number",
        NationalID:"National ID",
        IqamaID:"Iqama ID",
        GCCID:"GCC ID",
        Description:"Description",
        FbNumber:"FB Number",
        pleaseenterID:"Please Enter ID",
        pleaseenterdob:"Please Enter DOB",
        ValidIDNumber:"Valid ID Number",
        Sizembmax:"5MB max",
        Invalidfilesize:"Unable to load attachments",
        Successfullyuploadedthefile:"Successfully uploaded the file",
        gccvalidation:"GCC ID should be between 8-15 digits",
        invalidFormat: "Upload files with allowed extensions only",
        fileAlreayExists: "File with the same name already exists",
        sizetoobig:"File size should not be more than 5 MB",
        menu: [
            {
                title: "My Requests",
                subtitle: "",
                step: "",
                cards: "assets/image/cards.svg",
                table: "assets/image/cards.svg"
            },
            {
                title: "Frequency Details",
                subtitle:
                    "Complete the below details",
                step: "assets/image/1-st-change-filling.svg",
            },
            {
                title: "Attachments",
                subtitle: "Select the type of document",
                step: "assets/image/2-nd-change-filling.svg",
            },
            {
                title: "Declaration",
                subtitle: "I hereby certify that I am authorized to complete this form for the taxable person and that all information contained is correct",
                step: "assets/image/3-rd-change-filling.svg",
            },
            {
                title: "Summary",
                subtitle: "Review the below information",
                step: "assets/image/4-th-change-filling.svg",
            },{

            },{
                title: "Details",
                subtitle: "Detail information",
            }
        ],
        step1: {
            ChangeFillingFrequency: "Change Filling Frequency",
            VATFillingPeriod: "VAT Filling Period",
            InProcess: "In Process",
            CurrentFrequency: "Current Frequency",
            NewFrequency: "New Frequency",
            eff_date: "Effective Date",
            RequestDate: "Request Date",

        },
        step2: {
            Currentfrequency: "Current Frequency",
            Newfrequency: "New Frequency",
            Effactivedate: "Effective Date",
            condition: "I want to apply for an exception to file quarterly due to severe cash flow implications caused by monthly VAT collections."
        },
        step3: {
            Pleaseselectthetypeofdocument: "Please select the type of document",
            Attachment12MonthTaxableRevenue: "Attachment- 12 Month Taxable Revenue",
            Draganddropfiletouploaddocumentation: "Drag and drop file to upload documentation",
            Attachments: "Attachments",
            condition: `In case you have revenues below SAR 40M and want to request for quarterly filing kindly attach evidence that you have been filing for 2 years with a monthly Tax Period and your revenues during last 12 months.
            
            In case you want to request for an exception for quarterly filing, kindly  provide your previous 12 months average Days Sales Outstanding.`
        },
        step4: {
            IDType: "ID Type",
            IDNumber: "ID Number",
            ContectPersonName: "Contact Person Name",
            condition: "I hereby declare that the above mentioned information is true and correct to the best of my knowledge and belief"
        },
        step5: {
            FrequencyDetails: "Frequency Details",
            Edit: "Edit",
            Currentfrequency: "Current Frequency",
            NewFrequency: "New Frequency",
            Effactivedate: "Effective date",
            Attachments: "Attachments",
            Attachment12MonthTxableRevenue: "Attachment -12 Month Txable Revenue",
            Decleration: "Declaration",
            IDType: "ID Type",
            IDNumber: "ID Number",
            ContectPersonName: "Contact Person Name",
            Confirm: "Confirm"
        },
        step6: {
            Requestsent: "Request sent",
            YourVATFillingFrequencychangerequestissuccessfullysubmitted: "Your VAT Filling Frequency change request is successfully submitted",
            Name: "Name",
            RequestNumber: "Request Number",
            Date: "Date",
            Downloadconfirmation: "Download confirmation",
            GotoDashboard: "Go to Dashboard"
        },
        modal: {
            dob: "Date of Birth",
            dobPlaceholder: "DD-MM-YYYY",
        },
        instruction :{
            modalTitle:"Instructions",
            content1:"Check eligibility and review potential consequences of request",
            term1:"For taxpayers<40M SAR annual taxable revinues requesting monthly VAT Tax Period:",
            term2:"Taxpayer are eligible without providing further evidence reverting to quarterly Tax Period is again possible after having field 2 years with a monthly tax period with the last 12 month revenues being below SAR 40M",
            term3:"For taxpayer<40M SAR annual taxable requesting quarterly VAT Tax Period:",
            term4:"Taxpayer is required to provide evidence that he has been filing for 2 year with a monthly Tax Period and that revenues during last 12 month were below Riyal 40M",
            term5:"Exception:quarterly VAT tax period for taxpayers >40M SAR annual taxable revenues:Might be granted by GAZT if taxpayers provides evidence that average days sales outstanding for the previous 12 months have been significantly greater then VAT tax period and are hence severely affacting the taxpayer's cash flow.",
            content2:"Fill out request form and submit",
            term6:"Upload required documentation if taxpayer wants change to quarterly filing",
            checkLable:"I agree with these instructions and proceed further",
            Confirm: "Confirm"
        }

    },
    arb: {
        dir: "rtl",
        bc1: "إدارة الضريبة",
        bc2: "خدمات ضريبة القيمة المضافة",
        bc3: "فترة تقديم إقرار ضريبة القيمة المضافة",
        back: "رجوع",
        continue: "متابعة ",
        search:"بحث",
        filter:"عامل التصفية",
        Type:"النوع",
        Status:"الحالة",
        ApplicationNO:"رقم الطلب",
        Apply:"تطبيق",
        fbnumtext:"الرقم المرجعي للنموذج",
        Reset:"إعادة تعيين",
        Close:"إغلاق",
        validate:"التحقق",
        IDNumber:"رقم الهوية",
        NationalID:"الهوية الوطنية",
        IqamaID:"رقم الإقامة",
        GCCID:"هوية مواطني دول الخليج",
        Description:"الوصف",
        FbNumber:"الرقم المرجعي للنموذج",
        pleaseenterID:" الرجاء ادخال رقم الهوية",
        pleaseenterdob:" الرجاء ادخال تاريخ الميلاد",
        ValidIDNumber:"رقم الهوية صحيح",
        Sizembmax:"5MB الحد الأعلى",
        monthly:"شهرية",
        quarterly:"ربع سنوية",
        Invalidfilesize: "تعذر تحميل المرفقات",
        Successfullyuploadedthefile:"تم تحميل الملف بنجاح",
        gccvalidation:"رقم هوية الخليجيين يجب ان تكون من 8 الى 15 رقم",
        invalidFormat: "الرجاء استخدام صيغ الملفات المسموح بها فقط",
        fileAlreayExists: "يوجد ملف بنفس الاسم مرفق مسبقا",
        sizetoobig:"يجب أن يكون حجم الملف أقل من 5 ميجا بايت",
        menu: [
            {
                title: "طلباتي",
                subtitle: "",
                step: "",
                cards: "assets/image/cards.svg",
                table: "assets/image/table.svg"
            },
            {
                title: "طلب تغيير تكرار الدفع",
                subtitle:
                    "اكمل البيانات التالية",
                step: "assets/image/1-st-change-filling.svg",
            },
            {
                title: "المرفقات",
                subtitle: " الرجاء اختيار نوع المستند ",
                step: "assets/image/2-nd-change-filling.svg",
            },
            {
                title: "التعهد",
                subtitle: "أقر بموجب هذا بأنني مفوض لملء هذا النموذج للشخص الخاضع للضريبة وأن جميع المعلومات الواردة صحيحة",
                step: "assets/image/3-rd-change-filling.svg",
            },
            {
                title: "ملخص",
                subtitle: "مراجعة البيانات التالية",
                step: "assets/image/4-th-change-filling.svg",
            },{

            },{
                title: "التفاصيل",
                subtitle: "",
            }
        ],
        step1: {
            ChangeFillingFrequency: "تغيير فترة تقديم الإقرار",
            VATFillingPeriod: "تغيير فترة تقديم إقرار ضريبة القيمة المضافة",
            InProcess: "قيد المراجعة",
            CurrentFrequency: "فترة التقديم الحالية", 
            NewFrequency: "الفتره الجديدة",
            eff_date: "تاريخ الفعالية",
            RequestDate: "تاريخ الطلب",

        },
        step2: {
            Currentfrequency: "فترة التقديم الحالية",
            Newfrequency: "الفتره الجديدة",
            Effactivedate: "تاريخ الفعالية",
            condition: "أرغب في التقدم بطلب الحصول على استثناء لتقديم الإقرارات ربع سنوياً بسبب الآثار الشديدة على التدفق النقدي الناجمة عن التحصيل الشهري لضريبة القيمة المضافة"
        },
        step3: {
            Pleaseselectthetypeofdocument: " الرجاء اختيار نوع المستند اولا",
            Attachment12MonthTaxableRevenue: "Attachment- 12 Month Taxable Revenue",
            Draganddropfiletouploaddocumentation: "قم بسحب وإفلات الملف لتحميل الوثائق",
            Attachments: "المرفقات",
            condition: `في حال كانت إيراداتك تقل عن 40 مليون ريال وترغب في طلب تقديم الإقرارات ربع سنوياً، يرجى إرفاق الأدلة على تقديم إقراراتك من خلال الفترة الضريبية الشهرية لمدة سنتين، وكذلك تقديم دليل على إيراداتك خلال فترة الاثني عشر شهراً الأخيرة.

            في حال كنت ترغب في طلب استثناء لتقديم الإقرارات ربع سنوياً، يرجى تقديم متوسط أيام تحصيل المبيعات لفترة الـ 12 شهراً الماضية.
            `
        },
        step4: {
            IDType: "نوع الهوية",
            IDNumber: "رقم الهوية",
            ContectPersonName: "اسم جهة الاتصال",
            condition: "أتعهد بأن جميع المعلومات المذكورة في الأعلى حقيقية وصحيحة على حد علمي"
        },
        step5: {
            FrequencyDetails: "طلب تغيير تكرار الدفع",
            Edit: "تعديل",
            Currentfrequency: "فترة التقديم الحالية",
            NewFrequency: "الفتره الجديدة",
            Effactivedate: "تاريخ الفعالية",//"Effactive date",
            Attachments: "المرفقات  ",
            Attachment12MonthTxableRevenue: "Attachment -12 Month Txable Revenue",
            Decleration: "التعهد",
            IDType: "نوع الهوية",
            IDNumber: "رقم الهوية",
            ContectPersonName: "اسم جهة الاتصال",
            Confirm: "تأكيد"
        },
        step6: {
            Requestsent: "تم ارسال الطلب",
            YourVATFillingFrequencychangerequestissuccessfullysubmitted: "تم استلام طلب تغيير فترة ضريبة القيمة المضافة بنجاح",
            Name: "الاسم",
            RequestNumber: "رقم الطلب",
            Date: "التاريخ",
            Downloadconfirmation: "اشعار استلام",
            GotoDashboard: "الانتقال الى الشاشة الرئيسية"
        },
        modal: {
            dob: "تاريخ الميلاد",
            dobPlaceholder: "السنة - الشهر - اليوم",
        },
        instruction :{
            modalTitle:"التعليمات",
            content1:"على المكلف التحقق من أهليته لتقديم هذا الطلب ومراجعة الآثار المترتبة على ذلك حسب التالي :",
            term1:"للمكلفين الذين يطلبون تغيير فترة تقديم الإقرارات الضريبة من فترة ربع سنوية إلى فترة شهرية لضريبة القيمة المضافة:",
            term2:"سيكون الطلب متاحاً دون تقديم أية أدلة (مرفقات اختيارية)، كما يحق للمكلف الرجوع إلى فترة ربع سنوية بعد تقديم الإقرارات لمدة سنتين من خلال فترة ضريبية شهرية وأن تكون الإيرادات خلال الاثني عشر شهراً الأخيرة أقل من 40 مليون ريال.",
            term3:"للمكلفين الذين يطلبون تغيير فترة تقديم الإقرارات الضريبية من فترة شهرية إلى فترة ربع سنوية لضريبة القيمة المضافة:",
            term4:"يجب على المكلفين تقديم أدلة (مرفقات إلزامية) تثبت قيامهم بتقديم الإقرارات لمدة سنتين من خلال فترة ضريبية شهرية وأن الإيرادات خلال الاثني عشر شهراً الأخيرة كانت أقل من 40 مليون ريال",
            term5:"استثناء: يمكن للهيئة العامة للزكاة والدخل الموافقة على طلب الفترة الضريبية الربع سنوية للمكلفين الذين تتجاوز إيراداتهم السنوية الخاضعة للضريبة مبلغ 40 مليون ريال في حال قيام المكلف بتقديم دليل على أن متوسط أيام تحصيل المبيعات لفترة الاثني عشر شهراً الأخيرة أكبر بكثير من الفترة الضريبية، وبالتالي يؤثر ذلك بشدة على التدفق النقدي للمكلف.",
            content2:"املأ نموذج الطلب وقم بتسليمه",
            term6:"إرفاق الوثائق المطلوبة إذا كان المكلف يرغب في التغيير إلى تقديم الاقرارات الربع السنوية",
            checkLable:"أوافق على التعليمات والشروط والانتقال الى الخطوة التالية",
            Confirm: "تأكيد"
        }

    },

   
}

export const ApiConstants = {
    getHistoryData:"sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet",

    getDataLanding: "sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/UI_HDRSet",
  
    getDataTwo: "sap/opu/odata/SAP/ZDP_TPCV_UH_SRV/UI_HDRSet",
  
    getValidation: "sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet",

    postApiOne:"sap/opu/odata/SAP/ZDP_VAT_TPCV_SRV/UI_HDRSet",

    docUpload:"sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/",

    docDownload:"sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/"
  }


//   فترة التقديم الحالية
// شهرية

// فترة التقديم القادمة
// ربع سنوية



// filingf-ربع سنوية
  // currentf-//شهرية