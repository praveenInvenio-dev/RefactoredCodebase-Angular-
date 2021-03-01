import { FormControl, Validators } from '@angular/forms';
import { CalendarDate } from 'jdnconvertiblecalendar';
import * as moment from 'moment';
import { InputTaxAttachmentAPIResponse } from '../input-tax.model';
import { TaxReductionConstants } from '../tax-reduction.constants';
const nonWhitespaceRegExp: RegExp = new RegExp('\\S');
export interface iValidationStatus {
  status: boolean;
  message: string;
}

interface iValidationErrorMessages {
  required: string;
  effectiveDateRange: string;
  notesEmptyError: string;
  fileNotUploaded: string;
  declarationNotChecked: string;
  invalidDeclaration: string;
  effectiveDateRangeInvalid: string;
  effectiveDateRangeInPast: string;
  invalidIdNumber: string;
}

interface iInputTaxRequestForm {
  formFields: any;
  validate(
    validationErrorMessages: iValidationErrorMessages
  ): iValidationStatus;
}

class InputTaxRequestFormMixin {
  formFields: any; // This is overwritten when used

  getValues(fieldInfo: any = null) {
    const obj = {};
    if (!(fieldInfo instanceof Object)) {
      return fieldInfo;
    }
    for (let key in fieldInfo) {
      if (!fieldInfo.hasOwnProperty(key)) {
        continue;
      }
      if (fieldInfo[key] instanceof FormControl) {
        obj[key] = fieldInfo[key].value;
        if (obj[key] instanceof Object) {
          obj[key] = JSON.stringify(obj[key]);
        }
      } else {
        obj[key] = this.getValues(fieldInfo[key]);
      }
    }
    return obj;
  }

  isValid(fieldInfo: any = null, parent = true): boolean {
    if (fieldInfo === null && parent === true) {
      fieldInfo = this.formFields;
    }

    if (!(fieldInfo instanceof Object)) {
      return true;
    }

    for (let key in fieldInfo) {
      if (fieldInfo[key] instanceof FormControl) {
        if (fieldInfo[key].valid === false) {
          console.error(`Field ${key} is not valid`, fieldInfo[key]);
          return false;
        }
      } else {
        let status = this.isValid(fieldInfo[key], false);
        if (!status) {
          return false;
        }
      }
    }
    return true;
  }
}

export class InputTaxRequestStep1Form
  extends InputTaxRequestFormMixin
  implements iInputTaxRequestForm {
  constructor(private translationInfoConstant: TaxReductionConstants) {
    super();
  }
  formFields = {
    effectiveDate: {
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
    },
    currentDeduction: {
      taxablePurchaseName: new FormControl(null, [Validators.required]),
      taxablePurchasePercent: new FormControl(null, [Validators.required]),
      exemptPurchaseName: new FormControl(null, [Validators.required]),
      exemptPurchasePercent: new FormControl(null, [Validators.required]),
    },
    proposedDeduction: {
      taxablePurchaseName: new FormControl(null, [Validators.required]),
      taxablePurchasePercent: new FormControl(null, [Validators.required]),
      exemptPurchaseName: new FormControl(null, [Validators.required]),
      exemptPurchasePercent: new FormControl(null, [Validators.required]),
    },
    notes: new FormControl(
      null,
      Validators.compose([Validators.required, Validators.maxLength(1000)])
    ),
  };

  getEffectiveDate(target: 'from' | 'to'): moment.Moment {
    let fieldValue = this.formFields.effectiveDate.to.value;
    if (target === 'from') {
      fieldValue = this.formFields.effectiveDate.from.value;
    }

    if (!fieldValue) {
      return null;
    }

    if (moment.isMoment(fieldValue)) {
      return fieldValue;
    }

    return moment(
      new Date(
        (<CalendarDate>fieldValue.calendarStart).year,
        (<CalendarDate>fieldValue.calendarStart).month - 1,
        (<CalendarDate>fieldValue.calendarStart).day
      )
    );
  }

  getEffectiveDateForSummary(lang: 'en' | 'ar') {
    let from = '';
    let to = '';

    let dt = this.getEffectiveDate('from');
    if (dt) {
      from = dt.locale(lang).format('Do MMM YYYY');
    }

    dt = this.getEffectiveDate('to');
    if (dt) {
      to = dt.locale(lang).format('Do MMM YYYY');
    }

    return { from, to };
  }

  getNotesForSummary() {
    return ('' + this.formFields.notes.value).replace(/\n/g, '<br />');
  }

  validateDate() {
    // Effective from < effective to
    if (
      this.getEffectiveDate('from') &&
      this.getEffectiveDate('to') &&
      this.getEffectiveDate('from') >= this.getEffectiveDate('to')
    ) {
      let errorMessage =
        localStorage.getItem('lang') === 'ar'
          ? this.translationInfoConstant.translation.ar
              .fromDateShouldNotBeGreaterThanToDate
          : this.translationInfoConstant.translation.en
              .fromDateShouldNotBeGreaterThanToDate;
      return {
        status: false,
        message: errorMessage,
      };
    }

    if (this.getEffectiveDate('from') < moment()) {
      let errorMessage =
        localStorage.getItem('lang') === 'ar'
          ? this.translationInfoConstant.translation.ar.Pleaseenterfuturedate
          : this.translationInfoConstant.translation.en.Pleaseenterfuturedate;
      return {
        status: false,
        // message: validationErrorMessages.effectiveDateRangeInPast,
        message: errorMessage,
      };
    }
    const fromDt = this.getEffectiveDate('from');
    const toDt = this.getEffectiveDate('to');
    if (
      fromDt.date() !== 1 ||
      toDt.date() !== toDt.clone().endOf('month').date()
    ) {
      let errorMessage = '';
      if (fromDt.date() !== 1) {
        errorMessage =
          localStorage.getItem('lang') === 'ar'
            ? this.translationInfoConstant.translation.ar
                .pleaseSelectFirstDayOfMonth
            : this.translationInfoConstant.translation.en
                .pleaseSelectFirstDayOfMonth;
        return {
          status: false,
          message: errorMessage,
        };
      } else {
        errorMessage =
          localStorage.getItem('lang') === 'ar'
            ? this.translationInfoConstant.translation.ar
                .pleaseSelectEndDayOfMonth
            : this.translationInfoConstant.translation.en
                .pleaseSelectEndDayOfMonth;
        return {
          status: false,
          message: errorMessage,
        };
      }
    }
  }

  validate(
    validationErrorMessages: iValidationErrorMessages
  ): iValidationStatus {
    // Check with default validators
    if (!this.isValid()) {
      return {
        status: false,
        message: validationErrorMessages.required,
      };
    }

    // Effective from < effective to
    if (this.getEffectiveDate('from') >= this.getEffectiveDate('to')) {
      let errorMessage =
        localStorage.getItem('lang') === 'ar'
          ? this.translationInfoConstant.translation.ar
              .fromDateShouldNotBeGreaterThanToDate
          : this.translationInfoConstant.translation.en
              .fromDateShouldNotBeGreaterThanToDate;
      return {
        status: false,
        message: errorMessage,
      };
    }

    if (this.getEffectiveDate('from') < moment()) {
      let errorMessage =
        localStorage.getItem('lang') === 'ar'
          ? this.translationInfoConstant.translation.ar.Pleaseenterfuturedate
          : this.translationInfoConstant.translation.en.Pleaseenterfuturedate;
      return {
        status: false,
        // message: validationErrorMessages.effectiveDateRangeInPast,
        message: errorMessage,
      };
    }
    const fromDt = this.getEffectiveDate('from');
    const toDt = this.getEffectiveDate('to');
    if (
      fromDt.date() !== 1 ||
      toDt.date() !== toDt.clone().endOf('month').date()
    ) {
      let errorMessage = '';
      if (fromDt.date() !== 1) {
        errorMessage =
          localStorage.getItem('lang') === 'ar'
            ? this.translationInfoConstant.translation.ar
                .pleaseSelectFirstDayOfMonth
            : this.translationInfoConstant.translation.en
                .pleaseSelectFirstDayOfMonth;
        return {
          status: false,
          message: errorMessage,
        };
      } else {
        errorMessage =
          localStorage.getItem('lang') === 'ar'
            ? this.translationInfoConstant.translation.ar
                .pleaseSelectEndDayOfMonth
            : this.translationInfoConstant.translation.en
                .pleaseSelectEndDayOfMonth;
        return {
          status: false,
          message: errorMessage,
        };
      }
    }

    if ((this.formFields.notes.value || '').trim().length === 0) {
      return {
        status: false,
        message: validationErrorMessages.notesEmptyError,
      };
    }

    return {
      status: true,
      message: '',
    };
  }
}

export class InputTaxRequestFile {
  submissionResponse: InputTaxAttachmentAPIResponse = null;
  file: {
    name: string;
    size: number;
  } = null;

  getFileName() {
    return this.getUiFileName() || null;
  }

  getUiFileName() {
    return (this.file && this.file.name) || null;
  }

  getFileSize() {
    return (this.file && this.file.size) || 0;
  }

  getFileUrl() {
    return (this.submissionResponse && this.submissionResponse.DocUrl) || '';
  }
}

export class InputTaxRequestFileField {
  name = new FormControl(null, [Validators.required]);
  files: InputTaxRequestFile[] = [];
  ReturnIdz: string = '';

  getAttachmentName() {
    return this.name.value;
  }

  getFileExtension(file: File) {
    // Make sure to perform validation on null
    const uploadFilename = file.name;
    const parts = uploadFilename.split('.');
    if (parts.length === 1) {
      return null;
    } else {
      return '.' + parts[parts.length - 1].toLowerCase();
    }
  }
}

export class InputTaxRequestStep2Form
  extends InputTaxRequestFormMixin
  implements iInputTaxRequestForm {
  formFields: {
    attachments: InputTaxRequestFileField[];
  } = {
    attachments: [new InputTaxRequestFileField()],
  };

  addAttachments() {
    this.formFields.attachments = [
      ...this.formFields.attachments,
      new InputTaxRequestFileField(),
    ];
  }

  deleteAttachments(i) {
    let attachments = this.formFields.attachments;
    attachments.splice(i, 1);
    this.formFields.attachments = attachments;
  }

  validate(
    validationErrorMessages: iValidationErrorMessages
  ): iValidationStatus {
    if (!this.isValid()) {
      return {
        status: false,
        message: validationErrorMessages.required,
      };
    }

    if (
      this.formFields.attachments.reduce((totalLength, obj) => {
        return totalLength + obj.files.length;
      }, 0) === 0
    ) {
      return {
        status: false,
        message: validationErrorMessages.fileNotUploaded,
      };
    }

    return {
      status: true,
      message: '',
    };
  }

  getAttachmentsList() {
    // Returns info of type InputTaxApplicationExisting.attachments
    // Required when submitting the application
    return this.formFields.attachments.reduce((attachList, attachment) => {
      return [
        ...attachList,
        ...attachment.files.map((fileObj) => {
          return {
            name: fileObj.getFileName(),
            size: fileObj.getFileSize(),
            rawData: fileObj.submissionResponse,
          };
        }),
      ];
    }, []);
  }

  getAttachmentSubmissionResponseList() {
    return this.formFields.attachments.reduce((attachList, attachment) => {
      return [
        ...attachList,
        ...attachment.files.map((fileObj) => fileObj.submissionResponse),
      ];
    }, []);
  }

  getAttachmentsForSummary() {
    return this.formFields.attachments.map((attachment) => {
      return {
        attachmentName: attachment.getAttachmentName(),
        files: attachment.files.map((fileObj) => {
          return {
            name: fileObj.getFileName(),
            size: fileObj.getFileSize(),
            fileUrl: fileObj.getFileUrl(),
          };
        }),
      };
    });
  }
}

export class InputTaxRequestStep3Form
  extends InputTaxRequestFormMixin
  implements iInputTaxRequestForm {
  formFields = {
    idType: new FormControl(null, [Validators.required]),
    idNumber: new FormControl(null, [Validators.required]),
    contactPerson: new FormControl(null, [
      Validators.required,
      Validators.pattern(nonWhitespaceRegExp),
    ]),
    declarationCheckbox: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(),
  };
  isDeclarationValidated = false;

  getDob() {
    let fieldValue = this.formFields.dateOfBirth.value;
    if (!fieldValue) {
      return null;
    }

    return moment(
      new Date(
        (<CalendarDate>fieldValue.calendarStart).year,
        (<CalendarDate>fieldValue.calendarStart).month - 1,
        (<CalendarDate>fieldValue.calendarStart).day
      )
    );
  }

  getIdTypeForSummary() {
    return (
      (this.formFields.idType.value && this.formFields.idType.value.text) || ''
    );
  }

  getDobForSummary(lang) {
    const dob = this.getDob();
    return dob ? dob.locale(lang).format('Do MMM YYYY') : '';
  }

  isIdNumberSemanticValid() {
    const idNumber = '' + (this.formFields.idNumber.value || '');
    switch (this.formFields.idType.value.value) {
      case 'ZS0001':
        return idNumber[0] === '1' && idNumber.length === 10;
      case 'ZS0002':
        return idNumber[0] === '2' && idNumber.length === 10;
      case 'ZS0003':
        return idNumber.length >= 7 && idNumber.length <= 15;
      default:
        return false;
    }
  }

  validate(
    validationErrorMessages: iValidationErrorMessages
  ): iValidationStatus {
    if (!this.isValid()) {
      return {
        status: false,
        message: validationErrorMessages.required,
      };
    }

    if (
      !this.formFields.declarationCheckbox.value ||
      this.formFields.declarationCheckbox.invalid
    ) {
      return {
        status: false,
        message: validationErrorMessages.declarationNotChecked,
      };
    }

    if (!this.isDeclarationValidated) {
      return {
        status: false,
        message: validationErrorMessages.required,
      };
    }

    if (!this.isIdNumberSemanticValid()) {
      return {
        status: false,
        message: validationErrorMessages.invalidIdNumber,
      };
    }

    return {
      status: true,
      message: '',
    };
  }
}
