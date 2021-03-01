import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StatementListConstants {
  readonly ALL_TRANSACTION_TYPE_IDS = ["04", "08"];
  readonly TXN_TYPE_GROUPS = {
    direct: "D",
    indirect: "I",
  };
  readonly TXN_LIST_MAP = {
    ...["01", "02", "03", "04"].reduce((map, id) => {
      map[id] = this.TXN_TYPE_GROUPS.direct;
      return map;
    }, {}),
    ...["06", "07", "08", "09"].reduce((map, id) => {
      map[id] = this.TXN_TYPE_GROUPS.indirect;
      return map;
    }, {}),
  };

  public CommonData = {
    en: {
      direction: "ltr",
    },
    ar: {
      direction: "rtl",
    },
  };

  public StatementFilename = {
    en: {
      csv: "Taxpayer_Account_statement_  _1.csv",
    },
    ar: {
      csv: "اسم ملف CSV الخاص بالتقرير.csv",
    },
  };

  public tableInfo = {
    headers: [
      // List of translation ID and the attribute used to store the info for table
      {
        translationId: "tableDescription",
        id: "desc",
      },
      {
        translationId: "sadadNumber",
        id: "sadad_number",
      },
      {
        translationId: "tableAmount",
        id: "amount",
      },
      {
        translationId: "tableBalance",
        id: "balance",
      },
      {
        translationId: "fbnum",
        id: "fb_number",
      },
      {
        translationId: "Status",
        id: "status",
      },
    ],
  };

  private backupTranslation = {
    en: {
      notfound: "There are no financial transactions",
      sar: "SAR",
      taxty: "Tax Type",
      fbnum: "FB Number",
      sadadbill: "SADAD Bill Number",
      taxp: "Tax Period",
      duedt: "Due Date",
      billdesc: "Bill Description",
      billam: "Bill Amount",
      Status: "Status",
      openbal: "Opening Balance",
      closeBalEx: "Closing Balance",
      downloadEx: "Download as CSV",
      downloadpdf: "Download as PDF",
    },
    ar: {
      notfound: "لا يوجد عمليات مالية مسجلة",
      sar: "ريال سعودي",
      taxty: "نوع الضريبة",
      fbnum: "الرقم المرجعي للنموذج",
      sadadbill: "رقم فاتورة سداد",
      taxp: "الفترة الضريبية",
      duedt: "تاريخ الاستحقاق",
      billdesc: "وصف الفاتورة",
      billam: "قيمة الفاتورة",
      Status: "الحالة",
      openbal: "الرصيد الافتتاحي",
      closeBalEx: "رصيد الإغلاق",
      downloadEx: "تنزيل كـ CSV",
      downloadpdf: "تنزيل كـ PDF",
    },
  };

  public translation = {
    en: {
      ...this.backupTranslation.en,
      search: "Search",
      tableHeader: "Account Statements",
      back: "Back",
      tableDescription: "Description",
      type: "Type",
      tableAmount: "Credit / Debit",
      tableBalance: "Balance",
      sadadNumber: "SADAD Number",
      filterHeader: "Filter",
      filterStatementAmount: "Statement Amount",
      filterStatementDate: "Statement Date",
      filterStatementPeriod: "Statement Period",
      filterFiscalYear: "Fiscal Year",
      filterApplyButton: "Apply",
      from: "From",
      to: "To",
      downloadHeader: "Download Statement",
      downloadSubheading: "Select a date range and download the Statement",
      totalCredit: "Total Credit",
      totalDebit: "Total Debit",
      totalBalance: "Total Balance",
      taxCategoryBreadcrumb: "Tax Category",
      directTaxBreadcrumb: "Direct tax",
      indirectTaxBreadcrumb: "Indirect tax",
      detailsBreadcrumb: "Statement Details",
      dateOfReg: "Date of Registration",
      taxablePeriod: "Taxable Period",
      invoice: "Invoice",
      txnDate: "Transaction Date",
      validationError: {
        invalidDateRange: "Date range cannot be greater than 1 year",
        fromGreaterThanTo: "From date should not be greater than To date.",
      },
      taxTypeViewMap: {
        "01": "Zakat",
        "02": "Income Tax",
        "03": "Witholding Tax",
        "04": "All Statements",

        "06": "VAT",
        "07": "Excise Tax",
        "09": "Customs",
        "08": "All Statements",
      },
    },
    ar: {
      ...this.backupTranslation.ar,
      search: "بحث",
      back: "رجوع",
      tableHeader: "كشف الحساب",
      tableDescription: "الوصف",
      tableAmount: "دائن / مدين",
      sadadNumber: "رقم فاتورة سداد",
      type: "النوع",
      tableBalance: "الرصيد",
      filterHeader: "تصفية",
      filterStatementAmount: "مبلغ العملية",
      filterStatementDate: "تاريخ كشف الحساب",
      filterStatementPeriod: "فترة العملية",
      filterFiscalYear: "السنة المالية",
      filterApplyButton: "تطبيق",
      from: "من",
      to: "إلى",
      downloadHeader: "تنزيل الكشف",
      downloadSubheading: "الرجاء تحديد الفترة لتنزيل الكشف",
      totalCredit: "إجمالي الائتمان",
      totalDebit: "إجمالي الخصم",
      totalBalance: "إجمالي الرصيد",
      taxCategoryBreadcrumb: "نوع الضريبة",
      directTaxBreadcrumb: "الضرائب المباشرة",
      indirectTaxBreadcrumb: "الضرائب غير المباشرة",
      detailsBreadcrumb: "تفاصيل العملية",
      dateOfReg: "تاريخ التسجيل",
      taxablePeriod: "الفترة الخاضعة للضريبة",
      invoice: "الفاتورة",
      txnDate: "تاريخ العملية",
      validationError: {
        invalidDateRange:
          "يجب ألا يتجاوز النطاق بين تاريخ البدء وتاريخ الانتهاء سنة واحدة",
        fromGreaterThanTo: "تاريخ بداية البحث يجب ان يكون قبل تاريخ نهاية البحث",
      },
      taxTypeViewMap: {
        "01": "الزكاة",
        "02": "ضريبة الدخل",
        "03": "ضريبة الاستقطاع",
        "04": "جميع العمليات",

        "06": "ضريبة القيمة المضافة",
        "07": "ضريبة السلع الإنتقائية",
        "09": "الجمارك",
        "08": "جميع العمليات",
      },
    },
  };

  constructor() {}
}

@Injectable({
  providedIn: "root",
})
export class FilterDialogConstants {
  public translation = this.statementListConst.translation;

  constructor(public statementListConst: StatementListConstants) {}
}
