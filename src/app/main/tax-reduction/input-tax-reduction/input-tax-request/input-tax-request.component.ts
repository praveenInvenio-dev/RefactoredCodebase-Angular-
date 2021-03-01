import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { LoaderService } from 'src/app/loader/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AppService } from 'src/app/app.service';
import {
  RequestInputTaxService,
  SupportedPages,
} from 'src/app/services/request-input-tax.service';
import { TncComponent, TncOutputData } from '../../tnc/tnc.component';
import { InputTaxReductionConstants } from '../input-tax-reduction.constants';
import {
  ApplicationSubmitAPI,
  InputTaxApplicationExisting,
} from '../input-tax.model';
import { TaxReductionConstants } from '../tax-reduction.constants';
import {
  InputTaxRequestFile,
  InputTaxRequestFileField,
  InputTaxRequestStep1Form,
  InputTaxRequestStep2Form,
  InputTaxRequestStep3Form,
  iValidationStatus,
} from './input-tax-request.forms';
import { CommonValidation } from 'src/app/constants/commonValidations';
import * as FileSaver from 'file-saver';

enum Steps {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4',
}
declare var $: any;
@Component({
  selector: 'app-input-tax-request',
  templateUrl: './input-tax-request.component.html',
  styleUrls: ['./input-tax-request.component.css'],
})
export class InputTaxRequestComponent implements OnInit {
  constructor(
    public appSrv: AppService,
    private dialog: MatDialog,
    private constInfo: TaxReductionConstants,
    public inputConstInfo: InputTaxReductionConstants,
    private router: Router,
    private route: ActivatedRoute,
    private inputTaxServ: RequestInputTaxService,
    private loadService: LoaderService,
    private notifierService: NotifierService,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    private fb: FormBuilder,
    public commonValid: CommonValidation
  ) {}

  readonly page: string = SupportedPages.Input;
  readonly stepSequence: Steps[] = [
    Steps.step1,
    Steps.step2,
    Steps.step3,
    Steps.step4,
  ];

  public disable = false;
  public errorShow = false;

  lang: 'en' | 'ar';
  translation: any;
  pageTranslation: any;
  currentStep: Steps;
  submitComplete = false;
  fields = {
    step1: new InputTaxRequestStep1Form(this.constInfo),
    step2: new InputTaxRequestStep2Form(),
    step3: new InputTaxRequestStep3Form(),
  };
  rawData: any = null;
  disableCurrentInputFields = {
    taxable: false,
    exempt: false,
  };
  isNewApplication = true;
  submitApplicationInfo = {
    name: '',
    requestNumber: null,
    date: '',
  };
  notesLength: string = `0/${this.getNotesMaxLength()}`;

  // Boilerplate attributes
  calendarComponent = CalendarComponent;
  public taxInput: any;
  public dateError: any;
  public errormessage: any;
  public taxablePurchasePercent: any;
  isViewOnly = false;
  // Uncomment to integrate notification
  // private notification: any;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  attachIndex: number = 0;
  attachReadOnly: boolean = false;
  attachNameError: boolean = false;

  declarationForm = this.fb.group({
    idType: ['', Validators.required],
    idNum: ['', Validators.required],
    name: ['', Validators.required],
    checkTerm: ['', Validators.requiredTrue],
  });

  idMsg = '';
  dobMsg = '';
  id1 = new FormControl('', [Validators.required]);
  dob1 = new FormControl(null, [Validators.required]);
  isIdValidated = false;
  idValidatedName = '';
  idErr1 = false;
  dobErr = false;
  apiIdMsg = '';
  minDate: any;

  currentDate: any;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en';
    moment.locale(this.lang);
    this.isViewOnly = false;
    this.translation = this.constInfo.translation[this.lang];
    this.pageTranslation = this.translation[this.page];
    this.inputTaxServ.ready().then(() => {
      this.route.params.subscribe((params) => {
        this.isNewApplication = params.id === 'new';
        if (this.isNewApplication) {
          this.getApplicationData(params.id, Steps.step1);
        } else {
          this.getApplicationData(params.id, Steps.step4);
          this.isViewOnly = true;
        }
      });
    });
    this.appSrv.data1.subscribe((res) => {
      this.minDate = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
    });
  }

  private getApplicationData(applicationId: string, step) {
    this.inputTaxServ.getDataForApplication(applicationId).subscribe(
      (data) => {
        this.updateFormData(data);
        this.currentStep = step;
        if (step === Steps.step1) {
          this.openTncDialog()
            .afterClosed()
            .subscribe((result: TncOutputData) => {
              if (!result || result.closed || !result.agreed) {
                // Either it is closed using X icon OR the checkbox was not selected
                this.onBackClick();
                return;
              }
            });
        }
        this.currentDate = moment().format('DD-MM-YYYY');
      },
      (err) => {
        console.error(
          '[Input Tax] Error in getting data for new application',
          err
        );
        this.showError(err);

        // setTimeout(() => {
        this.router.navigate(['/mains/inputtaxdeduction']);
        // }, 3000);
      }
    );
  }

  private updateFormData(data: InputTaxApplicationExisting) {
    this.rawData = data._raw;
    this.updateStep1FormData(data);
    this.updateStep2FormData(data);
    this.updateStep3FormData(data);
  }

  private updateStep1FormData(data: InputTaxApplicationExisting) {
    const fields = this.fields.step1.formFields;

    fields.effectiveDate.from.setValue(data.effectiveDate.from);
    fields.effectiveDate.to.setValue(data.effectiveDate.to);

    fields.currentDeduction.taxablePurchaseName.setValue(
      data.current.taxable.name
    );
    this.disableCurrentInputFields.taxable =
      data.current.taxable.name.length > 0;

    fields.currentDeduction.taxablePurchasePercent.setValue(
      data.current.taxable.percent.toFixed(2)
    );
    fields.currentDeduction.exemptPurchaseName.setValue(
      data.current.exempt.name
    );
    this.disableCurrentInputFields.exempt = data.current.exempt.name.length > 0;

    fields.currentDeduction.exemptPurchasePercent.setValue(
      data.current.exempt.percent.toFixed(2)
    );
    this.onBlurKey(
      fields.currentDeduction.taxablePurchasePercent,
      fields.currentDeduction.exemptPurchasePercent
    );

    fields.proposedDeduction.taxablePurchaseName.setValue(
      data.proposed.taxable.name
    );
    fields.proposedDeduction.taxablePurchasePercent.setValue(
      data.proposed.taxable.percent.toFixed(2)
    );
    fields.proposedDeduction.exemptPurchaseName.setValue(
      data.proposed.exempt.name
    );

    if (data.proposed.exempt.percent < 1) {
      data.proposed.exempt.percent = 100;
    }

    fields.proposedDeduction.exemptPurchasePercent.setValue(
      data.proposed.exempt.percent.toFixed(2)
    );
    // this.onBlur(
    //   fields.proposedDeduction.taxablePurchasePercent,
    //   fields.proposedDeduction.exemptPurchasePercent
    // );
    fields.notes.setValue(data.notes);
  }

  private updateStep2FormData(data: InputTaxApplicationExisting) {
    const attachmentFields = this.fields.step2.formFields.attachments;
    attachmentFields.map((attachmentObj) => {
      attachmentObj.ReturnIdz = data.ReturnIdz;
      return attachmentObj;
    });

    for (let attachRes of data.attachments) {
      if (attachRes.rawData.Srno < attachmentFields.length) {
        const fileObj = new InputTaxRequestFile();
        fileObj.file = {
          name: attachRes.name,
          size: attachRes.size,
        };
        fileObj.submissionResponse = attachRes.rawData;
        attachmentFields[attachRes.rawData.Srno].files.push(fileObj);
      }
    }
  }

  private updateStep3FormData(data: InputTaxApplicationExisting) {
    const fields = this.fields.step3.formFields;
    if (data.idType) {
      fields.idType.setValue(
        this.pageTranslation.step3.idTypeDropdown.filter((item) => {
          return item.value === data.idType;
        })[0]
      );
    }
    fields.idNumber.setValue(data.idNumber);
    fields.contactPerson.setValue(data.contactPersonName);
  }

  private openTncDialog() {
    return this.dialog.open(TncComponent, {
      data: {
        translation: this.translation,
        page: this.page,
      },
      width: '708px',
      direction: this.translation.direction,
      panelClass: 'tnc-dialog-container',
      disableClose: true,
    });
  }
  bredCrumbClick(breadCrumbIndex) {
    console.log('Breadcrumbs Index', breadCrumbIndex);
    if (breadCrumbIndex == 0) {
      this.taxClicked();
    }
    if (breadCrumbIndex == 1) {
      this.vatServicesClicked();
    }
  }
  vatServicesClicked() {
    this.appSrv.updatedDataSelection9('001');
    this.router.navigate(['/mains/tax']);
  }
  taxClicked() {
    this.appSrv.updatedDataSelection9('');
    this.router.navigate(['/mains/tax']);
  }
  onEffectiveDateChange(origin: 'to' | 'from') {
    this.dateError = '';
    if (!(this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter)) {
      return;
    }

    if (
      !this.fields.step1.formFields.effectiveDate.from.value ||
      !this.fields.step1.formFields.effectiveDate.to.value
    ) {
      return;
    }

    const fromInput = this.fields.step1.formFields.effectiveDate.from;
    const toInput = this.fields.step1.formFields.effectiveDate.to;

    let minCalendarValue = fromInput.value;
    let maxCalendarValue = toInput.value;

    if (minCalendarValue.calendarName === maxCalendarValue.calendarName) {
      return;
    }

    if (origin === 'from') {
      maxCalendarValue = this._dateAdapter.convertCalendar(
        maxCalendarValue,
        minCalendarValue.calendarName
      );

      toInput.setValue(maxCalendarValue);
    } else {
      minCalendarValue = this._dateAdapter.convertCalendar(
        minCalendarValue,
        maxCalendarValue.calendarName
      );
      fromInput.setValue(minCalendarValue);
    }
  }

  validateDate() {
    let validationStatus = this.fields.step1.validateDate();

    if (!validationStatus.status) {
      this.dateError = validationStatus.message;
    } else {
      this.dateError = '';
    }
  }

  getNotesMaxLength() {
    return this.constInfo.MAX_NOTES_LENGTH;
  }

  onNotesKeyup(event) {
    const notesField = this.fields.step1.formFields.notes;
    const notesValue = notesField.value || '';
    const previousLength = notesValue.length;
    const cursorPos = event.target.selectionEnd;
    const lineSep = notesValue.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
    const newlineSuffix = notesValue.match(new RegExp(`(${lineSep}){1,}$`));
    const finalStrList = notesValue
      .split(lineSep)
      .reduce((lines: string[], line: string) => {
        const substrList = [];
        for (let index = 0; index < line.length; ) {
          substrList.push(
            line.substr(index, this.constInfo.MAX_NOTES_LINE_LENGTH)
          );
          index += this.constInfo.MAX_NOTES_LINE_LENGTH;
        }
        return [...lines, ...substrList];
      }, []);
    notesField.setValue(
      finalStrList.join(lineSep) + (newlineSuffix ? newlineSuffix[0] : '')
    );
    event.target.selectionEnd =
      cursorPos + (notesField.value.length - previousLength);
    this.notesLength = `${notesField.value.length}/${this.getNotesMaxLength()}`;
  }

  getStepIndicatorImg() {
    switch (this.currentStep) {
      case Steps.step1:
        return 'assets/image/1-st.svg';
      case Steps.step2:
        return 'assets/image/2-nd.svg';
      case Steps.step3:
        return 'assets/image/3-rd.svg';
      case Steps.step4:
        return 'assets/image/4-th.svg';
    }
  }

  onAttachmentNameKeyup(field: FormControl) {
    if (
      field.value &&
      field.value.length > this.constInfo.MAX_ATTACHMENT_NAME_LENGTH
    ) {
      field.setValue(
        field.value.slice(0, this.constInfo.MAX_ATTACHMENT_NAME_LENGTH)
      );
    }
  }

  validateAttachmentName(field: InputTaxRequestFileField) {
    if (!field.getAttachmentName()) {
      this.notifierService.notify(
        'error',
        this.pageTranslation.step2.error.attachmentName
      );
      // this.attachNameError = true
      return false;
    }

    this.attachNameError = false;
    return true;
  }

  private validateFile(field: InputTaxRequestFileField, file: File) {
    if (!file) {
      console.log('[Input tax] No file selected');
      return false;
    }

    const ext = field.getFileExtension(file);

    if (!field.getAttachmentName()) {
      this.notifierService.notify(
        'error',
        this.pageTranslation.step2.error.attachmentName
      );

      return false;
    }

    if (this.getAllowedFileTypes().indexOf(ext) === -1) {
      this.notifierService.notify(
        'error',
        this.pageTranslation.step2.error.attachmentType
      );

      return false;
    }

    if (file.size === 0) {
      this.notifierService.notify(
        'error',
        this.pageTranslation.step2.error.attachmentSizeZero
      );
      return false;
    }

    if (file.size > this.constInfo.ALLOWED_FILE_SIZE) {
      this.notifierService.notify(
        'error',
        this.pageTranslation.step2.error.attachmentSize
      );

      return false;
    }

    if (field.files.length > 0) {
      const fileIndex = field.files.findIndex(
        (attachment) => file.name === attachment.getFileName()
      );

      if (fileIndex > -1) {
        this.notifierService.notify(
          'error',
          this.pageTranslation.step2.error.attachmentDupe
        );

        return false;
      }
    }

    return true;
  }

  uploadFiles(field: InputTaxRequestFileField, files: File[]) {
    this.loadService.show();

    if (
      files.length + field.files.length >
      this.constInfo.MAX_ATTACHMENTS_PER_FIELD
    ) {
      this.loadService.hide();
      this.notifierService.notify(
        'error',
        this.pageTranslation.step2.error.maxNumberAttachments
      );
      this.fileInput.nativeElement.value = '';
      return;
    }

    for (let file of files) {
      if (!this.validateFile(field, file)) {
        this.loadService.hide();
        this.fileInput.nativeElement.value = '';
        return;
      }
    }

    const fileUploadRequests = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('fileUpload', file);

      fileUploadRequests.push(
        this.inputTaxServ.uploadAttachment({
          attachmentName: field.getAttachmentName(),
          name: file.name,
          returnIdz: field.ReturnIdz,
          data: formData,
        })
      );
    }

    forkJoin(fileUploadRequests).subscribe(
      (resList: any[]) => {
        // Set attributes required for form submission
        resList.forEach((res, index) => {
          const reqFileObj = new InputTaxRequestFile();
          const file = files[index];
          reqFileObj.file = {
            name: file.name,
            size: file.size,
          };
          reqFileObj.submissionResponse = res.d;
          field.files.push(reqFileObj);
        });
        this.fileInput.nativeElement.value = '';
        this.loadService.hide();
      },
      (err) => {
        this.fileInput.nativeElement.value = '';
        this.loadService.hide();
        console.error('[Input tax] Error in uploading file ', err);
        this.showError(err);
      }
    );

    // this.fileInput.nativeElement.value = '';
  }

  getAllowedFileTypes() {
    return this.constInfo.ALLOWED_FILE_EXTENSIONS.map((x) => '.' + x).join(',');
  }

  getMaxFileSizeText() {
    return (
      (this.constInfo.ALLOWED_FILE_SIZE / (1024 * 1024)).toFixed(0) +
      'MB ' +
      this.translation.max
    );
  }

  onBackClick() {
    const stepIndex = this.stepSequence.indexOf(this.currentStep);
    if (
      stepIndex === 0 ||
      (!this.isNewApplication && this.currentStep === Steps.step4)
    ) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.currentStep = this.stepSequence[stepIndex - 1];
    }
  }

  validateCurrentPage(): iValidationStatus {
    switch (this.currentStep) {
      case Steps.step1:
        return this.fields.step1.validate(this.translation.validationError);
      case Steps.step2:
        return this.fields.step2.validate(this.translation.validationError);
      // case Steps.step3:
      //   return this.fields.step3.validate(this.translation.validationError);
      default:
        return {
          status: true,
          message: '',
        };
    }
  }

  onStep3InputChange() {
    this.fields.step3.formFields.declarationCheckbox.setValue(null);
  }
  // nameValidator(event) {
  //   let name = event.target.value;
  //   name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, '');
  //   name = name.replace(/[\s]{2,}/g, ' ');
  //   this.fields.step3.formFields.contactPerson.setValue(name);
  // }
  private getDeclarationAPIData() {
    const step3FormFields = this.fields.step3.formFields;
    if (
      !step3FormFields.idNumber.value ||
      !step3FormFields.idType.value ||
      (step3FormFields.idType.value.value !== 'ZS0003' &&
        !this.fields.step3.getDob())
    ) {
      return null;
    }
    return {
      idNumber: step3FormFields.idNumber.value,
      idType: step3FormFields.idType.value.value,
      dateOfBirth: this.fields.step3.getDob(),
    };
  }

  onBlurKey(taxInput: FormControl, exemptInput: FormControl) {
    this.taxInput = '';
    // taxInput.setValue(parseFloat(taxInput.value).toFixed(2));
    exemptInput.setValue((100 - parseFloat(taxInput.value)).toFixed(2));
    if (taxInput.value > 100.0 || taxInput.value == 0.0) {
      this.taxInput = 'Taxable Purchases should be between 0 % to 100%';
      exemptInput.setValue('00.00');
    }
  }

  onContinueClick() {
    const stepIndex = this.stepSequence.indexOf(this.currentStep);
    // console.log('Request input tax data so far', this.fields);
    if (this.currentStep === 'step4') {
      this.onSubmit();
    } else {
      this.moveToNextStep(this.validateCurrentPage(), stepIndex);
    }
  }

  private moveToNextStep(
    validationStatus: iValidationStatus,
    stepIndex: number
  ) {
    if (validationStatus.status) {
      this.currentStep = this.stepSequence[stepIndex + 1];
    } else {
      this.errormessage = validationStatus.message;
      this.notifierService.notify('error', this.errormessage);
    }
  }

  private onSubmit() {
    this.loadService.show();
    this.inputTaxServ
      .submitApplication(this.getPreparedDataFromForm())
      .subscribe(
        (res: ApplicationSubmitAPI) => {
          this.submitComplete = true;
          this.currentStep = null;
          this.submitApplicationInfo = {
            name: res.Cnpr,
            requestNumber: res.Fbnumz,
            date: moment().format('Do MMM YYYY'),
          };
          this.loadService.hide();
        },
        (err) => {
          this.loadService.hide();
          console.error('[Input tax] Error in uploading file ', err);
          this.showError(err);
        }
      );
  }

  private showError(err) {
    const error = this.inputTaxServ.handleError(err);
    const errorMessage = error.message || '' + err;
    // Uncomment for notification
    // this.notification = {
    //   show: true,
    //   title: this.pageTranslation.processTitle,
    //   description: errorMessage,
    // };
    // this.notificationService.executeAction(this.notification);
    this.notifierService.notify('error', errorMessage);
  }

  private getPreparedDataFromForm(): InputTaxApplicationExisting {
    const step1FormFields = this.fields.step1.formFields;
    // const step3FormFields = this.fields.step3.formFields;
    return {
      Inschk: '1',
      effectiveDate: {
        from: this.fields.step1.getEffectiveDate('from'),
        to: this.fields.step1.getEffectiveDate('to'),
      },
      current: {
        taxable: {
          name: step1FormFields.currentDeduction.taxablePurchaseName.value,
          percent:
            step1FormFields.currentDeduction.taxablePurchasePercent.value,
        },
        exempt: {
          name: step1FormFields.currentDeduction.exemptPurchaseName.value,
          percent: step1FormFields.currentDeduction.exemptPurchasePercent.value,
        },
      },
      proposed: {
        taxable: {
          name: step1FormFields.proposedDeduction.taxablePurchaseName.value,
          percent:
            step1FormFields.proposedDeduction.taxablePurchasePercent.value,
        },
        exempt: {
          name: step1FormFields.proposedDeduction.exemptPurchaseName.value,
          percent:
            step1FormFields.proposedDeduction.exemptPurchasePercent.value,
        },
      },
      attachments: this.fields.step2.getAttachmentsList(),
      newAttachmentsResponse: this.fields.step2.getAttachmentSubmissionResponseList(),
      notes: step1FormFields.notes.value,
      idType: this.declarationForm.value.idType,
      idNumber: this.declarationForm.value.idNum,
      contactPersonName: this.declarationForm.value.name,
      _raw: this.rawData,
    };
  }

  getButtonStatus() {
    const stepField = this.fields.step1.formFields;
    switch (this.currentStep) {
      case Steps.step1:
        return (
          stepField.currentDeduction.taxablePurchaseName.value &&
          this.fields.step1.getEffectiveDateForSummary(this.lang) &&
          stepField.currentDeduction.taxablePurchaseName.value &&
          stepField.currentDeduction.taxablePurchasePercent.value &&
          stepField.currentDeduction.taxablePurchasePercent.value !== 'NaN' &&
          stepField.currentDeduction.taxablePurchasePercent.value !== '0.00' &&
          stepField.currentDeduction.exemptPurchaseName.value &&
          stepField.currentDeduction.exemptPurchasePercent.value &&
          stepField.currentDeduction.exemptPurchasePercent.value !== 'NaN' &&
          stepField.proposedDeduction.taxablePurchaseName.value &&
          stepField.proposedDeduction.taxablePurchasePercent.value &&
          stepField.proposedDeduction.taxablePurchasePercent.value !== 'NaN' &&
          stepField.proposedDeduction.taxablePurchasePercent.value !== '0.00' &&
          stepField.proposedDeduction.exemptPurchaseName.value &&
          stepField.proposedDeduction.exemptPurchasePercent.value &&
          stepField.proposedDeduction.exemptPurchasePercent.value !== 'NaN' &&
          stepField.notes.value
        );
      case Steps.step2:
        let valid = 0;

        this.fields.step2.formFields.attachments.map((attachment) => {
          if (attachment.files.length > 0) {
            valid++;
          }
        });

        if (this.fields.step2.formFields.attachments.length === valid) {
          return true;
        } else {
          return false;
        }
      case Steps.step3:
        return this.declarationForm.valid;
      default:
        return true;
    }
  }

  onEditClick(stepIndex: number) {
    this.currentStep = this.stepSequence[stepIndex];
  }

  onDeleteAttachmentRow(field: InputTaxRequestFileField, i) {
    if (field.files.length > 0) {
      field.files.map((file, index) => {
        this.onDeleteAttachmentClick(field, index);
      });
    }

    this.attachIndex = 0;
    this.fields.step2.deleteAttachments(i);
  }

  onDeleteAttachmentClick(field: InputTaxRequestFileField, index: number) {
    this.loadService.show();
    this.inputTaxServ
      .deleteAttachment({
        serialNumber: field.files[index].submissionResponse.Srno,
        docGuid: field.files[index].submissionResponse.Doguid,
        retGuid: field.files[index].submissionResponse.RetGuid,
        outletRef: field.files[index].submissionResponse.OutletRef,
      })
      .subscribe(
        (res) => {
          field.files.splice(index, 1);
          this.loadService.hide();
        },
        (err) => {
          this.loadService.hide();
          console.error('[Input tax] Error in deleting attachment', err);
          this.showError(err);
        }
      );
  }

  onGotoDashboardClick() {
    this.router.navigate(['/mains/dashboard']);
  }

  restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }

    if (e === null) {
      return false;
    }

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  onBlur(
    taxablePurchaseInput: FormControl,
    taxablePurchasePercentInput: FormControl
  ) {
    this.taxablePurchasePercent = '';
    // taxablePurchaseInput.setValue(
    //   parseFloat(taxablePurchaseInput.value).toFixed(2)
    // );
    taxablePurchasePercentInput.setValue(
      (100 - parseFloat(taxablePurchaseInput.value)).toFixed(2)
    );
    if (
      taxablePurchaseInput.value > 100.0 ||
      taxablePurchaseInput.value == 0.0
    ) {
      this.taxablePurchasePercent =
        'Taxable Purchases should be between 0 to 100%';
      taxablePurchasePercentInput.setValue('00.00');
    }
  }

  closeModal(cardType) {
    if (cardType === 'Instruction') {
      $('#Instruction').modal('toggle');
      this.fields.step3.formFields.idType.setValue(null);
      this.errorShow = false;
    } else if (cardType === 'Attachments') {
      $('#Attachments').modal('toggle');
    }
  }

  openForm(cardType, index = 0, readOnly = false) {
    if (cardType === 'Instruction') {
      $('#Instruction').modal('toggle');
    } else if (cardType === 'Attachments') {
      this.attachIndex = index;
      this.attachReadOnly = readOnly;
      $('#Attachments').modal('toggle');
    }
  }

  getModal() {
    return this.fields.step3.formFields.idNumber && this.fields.step3.getDob();
  }

  openModal(cardType) {
    if (cardType === 'Instruction') {
      $('#Instruction').modal('show');
    }
  }

  clickModal() {
    if (this.fields.step3.formFields.idType.value?.value !== 'ZS0003') {
      this.openModal('Instruction');
      this.errorShow = true;
    } else {
      this.disable = false;
      this.errorShow = false;
      this.fields.step3.formFields.idNumber.setValue(null);
      this.fields.step3.formFields.contactPerson.setValue(null);
      this.fields.step3.isDeclarationValidated = true;
      return false;
    }
  }

  downloadAttachment(file) {
    FileSaver.saveAs(file.submissionResponse.DocUrl, file.getUiFileName());

    // const link = document.createElement('a');
    // link.setAttribute('target', '_self');
    // link.setAttribute('href', file.submissionResponse.DocUrl);
    // link.setAttribute('download', file.getUiFileName());
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }

  debug(data) {
    console.log(data);
  }

  // Declaration

  onIdSelect() {
    this.isIdValidated = false;
    this.declarationForm.controls.idNum.setValue('');
    this.declarationForm.controls.name.setValue('');
    this.idValidatedName = '';
    this.id1.reset();
    this.idErr1 = false;
    this.dobErr = false;
    this.dob1.reset();
    this.dob1.setValue(null);
    this.id1.setValue('');
    if (this.declarationForm.value.idType !== 'ZS0003') {
      $('#aftSelect').modal('show');
    }

    // }
  }

  removeSpace() {
    let splitArray = this.id1.value.split(' ');
    this.id1.setValue(splitArray.join(''));
    this.apiIdMsg = '';
  }

  removeSpace2() {
    let splitArray = this.declarationForm.value.idNum.split(' ');
    let combinedString: string = splitArray.join('');
    let constructedId = combinedString.replace(/[^0-9]/g, '');
    this.declarationForm.controls.idNum.setValue(constructedId);
    this.declarationForm.controls.name.setValue('');
    this.idValidatedName = '';
    this.isIdValidated = false;
  }

  initiateGCCIDValidation() {
    if (this.declarationForm.value.idType === 'ZS0003') {
      if (
        this.declarationForm.value.idNum.length >= 8 &&
        this.declarationForm.value.idNum.length <= 15
      ) {
        this.validateId(this.declarationForm.value.idNum, '');
      }
    }
  }

  validateId(idNum, dob) {
    this.isIdValidated = false;
    this.declarationForm.controls.name.setValue('');
    this.inputTaxServ
      .validateId(this.declarationForm.value.idType, idNum, dob)
      .subscribe(
        (response) => {
          this.isIdValidated = true;
          this.declarationForm.controls.idNum.setValue(idNum);
          this.declarationForm.controls.name.setValue(
            response['d']['FullName']
          );
          this.idValidatedName = response['d']['FullName'];
          if (this.declarationForm.value.idType !== 'ZS0003') {
            $('#aftSelect').modal('hide');
          }
        },
        (error) => {
          let errorMsg = '';
          if (error?.error?.error?.innererror?.errordetails) {
            const messageArray = error['error']['error']['innererror'][
              'errordetails'
            ].map((err) => err.message);
            messageArray.splice(messageArray.length - 1, 1);
            errorMsg = messageArray.join(' ');
          }
          if (errorMsg !== '') {
            if (dob) {
              this.idErr1 = true;
              this.apiIdMsg = errorMsg;
            }
            this.notifierService.notify('error', errorMsg);
          }
        }
      );
  }

  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, '');
    name = name.replace(/[\s]{2,}/g, ' ');
    this.declarationForm.controls.name.setValue(name);
  }

  onInputBlur() {
    const name = this.declarationForm.value.name;
    this.declarationForm.controls.name.setValue(name.trim());
  }

  validId() {
    if (this.id1.value === '') {
      this.idErr1 = true;
      this.idMsg = this.pageTranslation.step3.idMsg;
      return '';
    } else {
      let idValidation = this.commonValid.IDtypeValidation(
        this.declarationForm.value.idType,
        this.id1.value
      );
      console.log(idValidation);
      this.idErr1 = idValidation.flag;
      this.idMsg = idValidation.msg;
      return '';
    }
  }

  validateID2() {
    this.idMsg = '';
    this.idErr1 = false;
    this.dobMsg = '';
    this.dobErr = false;
    this.apiIdMsg = '';
    if (this.id1.value.length === 0) {
      this.idErr1 = true;
      this.idMsg = this.pageTranslation.step3.idMsg;
    } else {
      let idValidation = this.commonValid.IDtypeValidation(
        this.declarationForm.value.idType,
        this.id1.value
      );
      this.idErr1 = idValidation.flag;
      this.idMsg = idValidation.msg;
    }
    if (this.dob1.value === null) {
      this.dobErr = true;
      this.dobMsg = this.pageTranslation.step3.dobMsg;
    }
    if (!this.idErr1 && !this.dobErr) {
      let date = '';
      if (this.dob1.value['calendarName'] === 'Islamic') {
        const convertedDate = this.commonValid.dateFormate(
          this.dob1.value,
          'Gregorian'
        );
        date = this._dateAdapter.format(convertedDate, 'DD-MM-YYYY');
      } else {
        date = this._dateAdapter.format(this.dob1.value, 'DD-MM-YYYY');
      }
      const modifiedDate = moment(date, 'DD-MM-YYYY')
        .locale('en-us')
        .format('YYYYMMDD');
      this.validateId(this.id1.value, modifiedDate);
    }
  }

  reset() {
    this.idErr1 = false;
    this.dobErr = false;
    this.isIdValidated = false;
    this.declarationForm.controls.idType.setValue('');
    this.declarationForm.controls.idNum.setValue('');
    this.idValidatedName = '';
  }

  getIdType() {
    const index = this.pageTranslation.step3.idTypeDropdown.findIndex(
      (id) => id.value === this.declarationForm.value.idType
    );

    return this.pageTranslation.step3.idTypeDropdown[index].text;
  }

  downloadAck() {
    this.inputTaxServ
      .downloadAck(this.submitApplicationInfo.requestNumber)
      .subscribe(
        (res) => {
          FileSaver.saveAs(
            res,
            this.submitApplicationInfo.requestNumber + '_ack.pdf'
          );
        },
        (err) => console.log(err)
      );
  }

  downloadForm() {
    this.inputTaxServ
      .downloadForm(this.submitApplicationInfo.requestNumber)
      .subscribe(
        (res) => {
          FileSaver.saveAs(
            res,
            this.submitApplicationInfo.requestNumber + '_form.pdf'
          );
        },
        (err) => console.log(err)
      );
  }
}
