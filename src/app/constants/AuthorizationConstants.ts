export const AuthorizeConstants = {
    langz: {
      eng: {
            dir: "ltr",
            authorize1: {
            type:"Tax Management",
            addnewUser:"Add Authorization",
            title: "Authorization Service",
            selectOne: "Please Select Any One Option",
            back: "Back",
            Status:"Status",
            continue: "Continue", 
            Submitted:"Submitted",
            Pending:"Pending",
            Rejected:"Rejected", 
            return: "Return",
            objection: "Objections",
            year: "Year",                
        },
        authorize2: {
            title: "Add Authorization",
            title2:"Accounting Offices & Services Provider’s",
            title3:"Authorized Period",
            listViewTin:"Accounting Offices & Services Provider's TIN",
            listViewName:"Accounting Offices & Services Provider's Name",
            subtitles:{
                t1:"Complete the below details",
                tin:"TIN",
                name:"Auditor’s Name",
                taxtype:"Tax Type",
                startdate:"Start and end of Authorization Date"

            },
            labels:{
                label1:"Select the Search Method for Services Provider",
                label2:"TIN",
                label3:"Name"
            },
            list:{
                header:"List of Services",
              
            },
            button:"Request Authorization"
                    
        },
        authorize3: {
            title: " Authorization Details",
            title2:"Accounting Offices & Services Provider’s",                    
            title3: "TIN",
            authCompany:"Talal Abu Ghazaleh & Partners Company",
            zaktcit:"Zakat & CIT",
                     serviceRequest:{
                        header:" Service Request",
                        number:"Request Number",
                        type:" Taxpayer Type",
                        time:"Period",
                        approvalDate:"Auditor Approval Date",
                        list:"Authorized Services"
                    },
                    edit:"Edit",
                    delete:"Delete",
                    confirm: "Confirm",
                    close: "Close",
                    yes: "Yes",
                    no: "No",
                    deleteConfirm:"Are you sure want to cancel authorization request ?",
                    ok:"OK",
                    cancel:"Cancel"
                                 

        },
        authErrors:{
            tinError3:"TIN Number is Required",
            tinError1: "TIN Number should start with 1",
            tinError2: "TIN Should Contain 10 numbers/digits",
            tinError4:  "TIN Number Should be Numeric",
            namReq: "Name is Required",
            minDate: "End Date Should Not be Less than Start Date",
            typeError1:"Type is Required",
            date1Err1:"Date Should be greater than Current Date",
            servicesErr:"Please select at least one service type", 
            datReq1: "Date is Required",
            datReq2: "Date is Required",
            dateReq: "Date Should be greater than Current Date",
            successReq:"Successfully submitted the Authorization request",
            t5:"From",
            t6:"To",
            editErr:"Dear Taxpayer, you cannot edit the privileges of the request till the auditor approve or reject the request. You can delete the request and re-submit it again",
            deleted:"Successfully deleted the Authorization request",
            inValidTinErr:"Business partner does not exist"

        }
    },
      arb: {
                dir: "rtl",
                authorize1: {
                    type:"إدارة الضرائب",
                    addnewUser:"إضافة تفويض",
                    title: "خدمة فوض",
                    selectOne: "الرجاء قم باختيار واحد",
                    Status: "الحالة",
                    back: "رجوع",
                    continue: "متابعة",
                    Submitted:"مقدمة",
                    Pending:"معلق",
                    Rejected:"مرفوض",
                    return: "الاقرارات",
                    objection: "الإعتراضات",
                    year: "السنة"                      
                },
                authorize2: {
                    title: "إضافة تفويض",
                    title2:"مكاتب المحاسبة ومقدمي الخدمات",
                    title3:"فترة التفويض",
                    listViewTin:"الرقم المميز لمقدم الخدمة",
                    listViewName:"اسم مقدم الخدمة",
                    subtitles:{
                        t1:"اكمل البيانات التالية",
                        tin:"الرقم المميز",
                        name:"الاسم",
                        taxtype:"نوع الضريبة",
                        startdate:"تاريخ بداية ونهاية التفويض"
      
                    },
                    labels:{
                        label1:"اختيار طريقة البحث عن مقدم الخدمة",
                        label2:"الرقم المميز",
                        label3:"الاسم"
                    },
                    list:{
                        header:"قائمة الخدمات",
                    },
                    button:"طلب تفويض"
                            
                },
                authorize3: {
                    title: "تفاصيل التفويض",
                    title2:" مكاتب المحاسبة ومقدمي الخدمات",                      
                    title3:"الرقم المميز",
                    authCompany:"شركة طلال أبو غزاله وشركاه",
                    zaktcit:"الزكاة وضريبة الدخل",
                    serviceRequest:{
                        header:"طلب خدمة",
                        number:"رقم الطلب",
                        type:"نوع المكلف",
                        time:"الفترة",
                        approvalDate:"تاريخ قبول الخدمة",
                        list:"الخدمات المفوضة"
                    },
                    edit:"تعديل",
                    delete:"حذف",
                    confirm: "تأكيد",
                    yes: "نعم",
                    no: "لا",
                    close: "إغلاق",
                    deleteConfirm:"هل تريد إلغاء طلب التفويض ؟",
                    ok:"موافق",
                    cancel:"إلغاء"
                            
                },
                authErrors:{
                    tinError3: "الرقم المميز مطلوب",
                    tinError1: "الرقم المميز يجب ان يبدأ ب1",
                    tinError2: "رقم الهوية الوطنية يجب أن يتكون من 10 أرقام .",
                    namReq: "يرجى ادخال الاسم",
                    tinError4:  "رقم المميز يجب ان يحتوي على ارقام فقط",
                    minDate: "تاريخ النهاية يجب ان يكون اقل من تاريخ البداية",
                    typeError1:"يرجى اختيار النوع",
                    date1Err1: "يجب ألا يكون التاريخ أقل من التاريخ الحالي",
                    servicesErr:"الرجاء تحديد نوع خدمة واحده على الأقل",
                    datReq1: "التاريخ مطلوب.",
                    datReq2: "يرجى ادخال تاريخ النهاية",
                    dateReq: "يجب ألا يكون التاريخ أقل من التاريخ الحالي",
                    successReq:"Successfully submitted the Authorization request",
                    t5:"من",
                    t6:"إلى",
                    editErr:"عزيزي المكلف, لا يمكن تغيير الصلاحيات المقدمة الى المحاسب حتى يتم الموافقة أو الرفض للطلب. يمكنك حذف الطلب كاملا وإعادة تقديمه",
                    deleted:"Successfully deleted the Authorization request",
                    inValidTinErr:"شريك الأعمال غير موجود"

                }
        }
    }
} 
export const AuthorizeAPIConstants = {
    AuthorizationRequests: "sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/HeaderSet",
    AuditorNameSet: "sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/AuditorNMSet",
    AuthorizationAddRequest: "sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/HeaderSet",
    AuthorizationDeleteRequest: "sap/opu/odata/SAP/ZAUD_LINK_SRV/ZAUD_LINKSet", 
    AuthorizationNameRequest:"sap/opu/odata/SAP/ZAUDEMP_GETUPDATE_SRV/ZAUDEMP_HDRSet",
    AuthorizationEncryptDetails:"sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet",
    AuthorizationTaxPayerDashboard:"sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet"
    //https://sapgatewayqa.gazt.gov.sa/sap/opu/odata/SAP/ZAUD_LINK_SRV/ZAUD_LINKSet(TaxpayerTin='3102435239',AuditorTin='1000000350')
    //location: https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/HeaderSet
}
