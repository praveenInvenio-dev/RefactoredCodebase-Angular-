
export const apiConstants = {
    getInitalData: 'sap/opu/odata/SAP/ZDP_REPRINT_SRV',
    getdownloadCertificate:'sap/opu/odata/SAP/ZDP_IT_CORRES_SRV'
}

export const VATCertificateConstants = {

    en: {
        breadcrumb: {
            TaxManagement: "Tax Management",
            VATServices: "VAT Services",
            VATCertificate: "VAT Certificate",
            Back: "Back",
        },
        taxPayerDetails: {
            taxPayerDetails: "Taxpayer Details",
            TIN: "TIN",
            Name: "Name",
            VATAC: "VAT Account",
            ReferenceNumber: "Reference Number",
        },
        CertificateType: "Certificate Type",
        DownloadCertificate: "Download Certificate",
        declaration: "Please ensure that you have updated your relevant taxpayer details at TIN otherwise they will not be reflected in the new VAT certificate.",
        notificationTitle: "VAT Certificate",
        notificationDescription: "Your VAT Certificate has been downloaded successfully"
    },
    ar: {
        breadcrumb: {
            TaxManagement: "إدارة الضرائب",
            VATServices: "خدمات ضريبة القيمة المضافة",
            VATCertificate: "شهادة ضريبة القيمة المضافة",
            Back: "رجوع",
        },
        taxPayerDetails: {
            taxPayerDetails: "تفاصيل المكلف",
            TIN: "الرقم المميز",
            Name: "اسم",
            VATAC: "الرقم الضريبي",
            ReferenceNumber: "الرقم المرجعي",
        },
        CertificateType: "نوع الشهادة",
        DownloadCertificate: "تحميل الشهادة",
        declaration: "يرجى التأكد من تحديث بيانات المكلف ذات الصلة بالرقم المميز لتظهر فى الشهادة الجديدة",
        notificationTitle: "شهادة ضريبة القيمة المضافة",
        notificationDescription: "تم تنزيل شهادة ضريبة القيمة المضافة الخاصة بك بنجاح"
    }
}