export const apiConstants = {
  getInitialData: 'sap/opu/odata/SAP/ZDP_CORR_TAB_SRV',
  zakatCorrespondanceList: 'sap/opu/odata/SAP/Z_TP_CORRES_SRV',
  vatCorrespondanceList: 'sap/opu/odata/SAP/ZDP_IT_CORRES_SRV',
  etCorrespondanceList: 'sap/opu/odata/SAP/ZDP_IT_CORRES_SRV',
  epCorrespondanceList: 'sap/opu/odata/SAP/ZD_VTEP_CORRES_SRV',
  zakatCorrespondanceBody: 'sap/opu/odata/SAP/Z_TP_GET_CORR_BODY_SRV',
  downloadZakatCorrespondance: 'sap/opu/odata/SAP/Z_TP_CORRES_SRV',
  downloadVatCorrespondance: 'sap/opu/odata/SAP/ZDP_IT_CORRES_SRV',
  downloadEtCorrespondance: 'sap/opu/odata/SAP/ZDP_IT_CORRES_SRV',
  downloadEpCorrespondance: 'sap/opu/odata/SAP/ZDP_IT_CORRES_SRV',
  favoriteCorrespondance: 'sap/opu/odata/SAP/Z_TP_CORRES_SRV',
};

export const correspondanceConstants = {
  filters: {
    favorite: {
      en: 'Favourite',
      ar: 'المفضلة',
    },
    search: {
      en: 'Search',
      ar: ' بحث',
    },
    empty: {
      en: 'No results were found',
      ar: 'لم يتم العثور على نتائج',
    },
  },
  message: {
    empty: {
      en: 'Select one message from the left column to read it',
      ar: 'اختر رسالة من القائمة لقراءتها',
    },
    days: {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ar: [
        'الأحد',
        'الاثنين',
        'الثلاثاء',
        'الأربعاء',
        'الخميس',
        'الجمعة',
        'السبت',
      ],
    },
  },
  download: {
    en: 'Download',
    ar: 'تحميل ملف',
  },

  footer: {
    tin: {
      en: 'TIN',
      ar: 'الرقم المميز',
    },
    refNo: {
      en: 'Reference Number',
      ar: 'الرقم المرجعي',
    },
    info: {
      en: 'For more information, Please contact us via',
      ar: 'لمزيد من المعلومات، يرجى التواصل معنا عبر الوسائل التالية',
    },
    web: {
      en: 'Website',
      ar: 'الموقع الالكتروني',
    },
    call: {
      en: 'Call Center',
      ar: 'مركز الاتصال الموحد',
    },
    email: {
      en: 'Email',
      ar: 'البريد الالكتروني',
    },
    regards: {
      en: 'Kind Regards.',
      ar: 'مع خالص التحية،',
    },
    gazt: {
      en: 'The General Authority for Zakat and Tax',
      ar: 'الهيئة العامة للزكاة والدخل',
    },
  },
};
