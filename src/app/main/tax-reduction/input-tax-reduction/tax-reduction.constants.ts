import { Injectable } from "@angular/core";
import { InputTaxReductionConstants } from "./input-tax-reduction.constants";

@Injectable({
  providedIn: "root",
})
export class TaxReductionConstants {
  constructor(private inputTaxConst: InputTaxReductionConstants) {}

  translation = {
    en: {
      input: {
        ...this.inputTaxConst.translation.en,
      },
      filter: {
        title: "Filter",
        status: "Status",
        success: "Success",
        pending: "Pending",
        apply: "Apply",
        date: "Date",
      },
      inputTaxDeductionmMethod:"Input Tax Deduction Method",
      toDateShouldBeGreaterThanFromDate:"To date should be greater than from date",
      Pleaseenterfuturedate :"Please enter future date",
      pleaseSelectFirstDayOfMonth: "Please select first day of the month",
      pleaseSelectEndDayOfMonth: "Please select end day of the month",
      fromDateShouldNotBeGreaterThanToDate:"From date should not be greater than to date",
      direction: "ltr",
      tncHeading: "Instructions",
      from: "From",
      search: "Search",
      to: "To",
      back: "Back",
      continueButton: "Continue",
      edit: "Edit",
      confirmButton: "Confirm",
      dragNDrop: "Drag and drop file to upload documentation",
      max: "max",
      validationError: {
        required: "Some information of the form is not valid",
        effectiveDateRange: "From and to effective date are not valid",
        notesEmptyError: "Empty notes is not allowed",
        fileNotUploaded: "Attachments are not added",
        declarationNotChecked: "Accept the declaration before proceeding",
        invalidDeclaration: "ID number and date of birth didn't match",
        effectiveDateRangeInvalid: "Invalid effective date range provided",
        effectiveDateRangeInPast: "Effective date range cannot be in past",
        invalidIdNumber: "Please enter valid ID number",
      },
    },
    ar: {
      input: {
        ...this.inputTaxConst.translation.ar,
      },
      filter: {
        title: "فلتر",
        status: "الحالة",
        success: "Success",
        pending: "Pending",
        apply: "تقديم",
        date: "التاريخ",
      },
      inputTaxDeductionmMethod: " طريقة الخصم النسبي لضريبة المدخلات  ",
      Pleaseenterfuturedate :"الرجاء إدخال تاريخ في المستقبل",
      direction: "rtl",
      tncHeading: "تعليمات",
      from: "من",
      search: "البحث",
      to: "ل",
      back: "عودة",
      continueButton: "مواصله",
      edit: "تحرير",
      confirmButton: "تاكيد",
      dragNDrop: "سحب وإسقاط ملف لتحميل الوثائق",
      pleaseSelectFirstDayOfMonth: "الرجاء اختيار اليوم الأول في الشهر",
      pleaseSelectEndDayOfMonth: "الرجاء اختيار اليوم الأخير في الشهر ",
      toDateShouldBeGreaterThanFromDate:"يجب ان يكون تاريخ الإنتهاء اكبر من تاريخ البدء ",
      fromDateShouldNotBeGreaterThanToDate:"يجب ان يكون تاريخ الانتهاء أكبر من تاريخ البدء",

    },
  };

  readonly ALLOWED_FILE_EXTENSIONS = ["doc", "docx", "pdf", "xls", "xlsx"];
  readonly ALLOWED_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  readonly MAX_NOTES_LENGTH = 1000;
  readonly MAX_NOTES_LINE_LENGTH = 132;
  readonly MAX_ATTACHMENT_NAME_LENGTH = 50;
  readonly MAX_ATTACHMENTS_PER_FIELD = 10;
}
