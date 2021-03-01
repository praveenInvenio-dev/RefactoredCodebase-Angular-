import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import * as FileSaver from 'file-saver';

import { AppService } from 'src/app/app.service';
import { stringConstants } from 'src/app/constants/request-income-tax-reduction.constants';
import { RequestIncomeTaxReductionService } from 'src/app/services/request-income-tax-reduction.service';
import { CommonValidation } from 'src/app/constants/commonValidations';

declare var $: any;
let maxLength = 132;

const now = new Date();

export interface IDate {
  year: number;
  month: number;
  day: number;
}
@Component({
  selector: 'app-request-income-tax-reduction',
  templateUrl: './request-income-tax-reduction.component.html',
  styleUrls: ['./request-income-tax-reduction.component.scss'],
})
export class RequestIncomeTaxReductionComponent implements OnInit {
  lang: any;
  // addTaxService = addTaxService;
  direction = 'ltr';
  // Form: FormGroup;
  // attachmentForm: FormGroup;
  // declarationForm: FormGroup;
  // headerComponent = CalendarComponent;
  // changeFreFormGroup3: FormGroup;
  // certificatesAttachments: any = [];
  // public getFilepath: Map<string, { value: string; path: string }> = new Map();
  // public name: any;
  // public dobValue: any;

  processActive = 0;
  isActive = 0;
  instructionsAccepted = false;
  // instructionsDeclarationAccepted = false;
  // uploadFlag = false;
  // fileUploadData = false;
  // getapi2res: any = '';

  // idType = [
  //   {
  //     id: 1,
  //     type: 'National ID',
  //   },
  //   {
  //     id: 2,
  //     type: 'PAN',
  //   },
  //   {
  //     id: 3,
  //     type: 'XYZ',
  //   },
  //   {
  //     id: 4,
  //     type: 'ABC',
  //   },
  // ];

  // formGroupValidator = false;
  instructionAgree = false;
  // public todayDate: any;
  // public calendarStart: any;
  // public endValue: any;
  // public startValue: any;
  // public filename: any;

  // file: any;
  // data: any;
  // files: any[] = [];
  textAreaLength = '';
  maxChars = 1000;
  // chars = 0;

  // get startDate() {
  //   return this.Form.get('startDate');
  // }

  // get endDate() {
  //   return this.Form.get('endDate');
  // }

  // get fileUpload() {
  //   return this.attachmentForm.get('fileUpload');
  // }

  // get textArea() {
  //   return this.attachmentForm.get('textArea');
  // }

  // ZS Variables/Form

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('fileInput2', { static: false }) fileInput2: ElementRef;

  stringConstants: any;

  formData;

  requestReductionForm = this.fb.group({
    payments: this.fb.array([]),
    reason: ['', Validators.required],
    notes: ['', Validators.required],
    attachment1: this.fb.array([]),
    attachment2: this.fb.array([]),
    declaration: this.fb.group({
      idType: ['', Validators.required],
      idNum: ['', Validators.required],
      name: ['', Validators.required],
      checkTerm: ['', Validators.requiredTrue],
    }),
  });

  payments = this.requestReductionForm.get('payments') as FormArray;

  attachment1 = this.requestReductionForm.get('attachment1') as FormArray;

  attachment2 = this.requestReductionForm.get('attachment2') as FormArray;

  validError: boolean = false;
  isIdValidated = false;
  dob1;
  id1 = '';
  showIdNumError;
  canEditContact = true;
  idErr1 = false;
  idMsg;
  dobErr = false;
  dobMsg = '';

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private itReductionService: RequestIncomeTaxReductionService,
    public commonValid: CommonValidation,
    public appSrv: AppService
  ) {
    if (localStorage.getItem('lang') === 'ar') {
      moment.locale('ar');
    } else {
      moment.locale('en');
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'ar';
      this.direction = 'rtl';
      this.stringConstants = stringConstants.ar;
    } else {
      this.lang = 'en';
      this.direction = 'ltr';
      this.stringConstants = stringConstants.en;
    }

    this.getFormData();
    // this.FormInIt();

    // this.todayDate = {
    //   year: now.getFullYear(),
    //   month: now.getMonth() + 1,
    //   day: now.getDate(),
    // };

    // this.startDate.valueChanges.subscribe((res) => {
    //   this.calendarStart = res.calendarStart;
    //   if (this.endDate.value?.calendarEnd && this.calendarStart) {
    //     if (this.calendarStart.year > this.endDate.value.calendarEnd.year) {
    //       this.endDate.setValue(null);
    //     } else {
    //       if (this.calendarStart.month > this.endDate.value.calendarEnd.month) {
    //         this.endDate.setValue(null);
    //       } else {
    //         if (this.calendarStart.day > this.endDate.value.calendarEnd.day) {
    //           this.endDate.setValue(null);
    //         }
    //       }
    //     }
    //   }
    // });
  }

  getFormData() {
    this.itReductionService.getFormData().subscribe(
      (res) => {
        this.getModal('Instruction');

        this.formData = res['d'];

        res['d'].payment_tp03Set.results.map((item) => {
          const itemSet = this.fb.group(item);

          for (const control in itemSet.controls) {
            if (
              control === 'APeriodFrom' ||
              control === 'APeriodTo' ||
              control === 'ADueDt'
            ) {
              itemSet.get(control).setValue(
                moment(
                  parseInt(itemSet.get(control).value.replace(/\D/g, ''))
                ).format('YYYY/MM/DD')
                // .format('DD-MM-YYYY')
              );
            }

            if (control === 'ANewAmount') {
              itemSet
                .get(control)
                .setValidators([
                  Validators.required,
                  Validators.min(1),
                  Validators.max(
                    parseFloat(itemSet.controls.AAmount.value) - 0.01
                  ),
                ]);

              itemSet
                .get(control)
                .setValue(parseFloat(itemSet.get(control).value));
            }
          }

          this.payments.push(itemSet);
        });
      },
      (err) => {
        this.notifierService.notify(
          'error',
          err.error.error.innererror.errordetails[0].message
        );

        setTimeout(() => {
          this.router.navigate(['/mains/requestincometaxreduction']);
        }, 3000);
      }
    );
  }

  back() {
    if (this.processActive > 0) {
      this.processActive--;
    } else if (this.processActive === 0) {
      this.router.navigateByUrl('/mains/requestincometaxreduction').then();
    }
  }

  onInputChange() {
    $('#textAreaLength').on('input focus keydown keyup', function (e) {
      var text = $(this).val();
      var lines = text.split(/(\r\n|\n|\r)/gm);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > maxLength) {
          lines[i] = lines[i].substring(0, maxLength) + '\n';
        }
      }
      $(this).val(lines.join(''));
    });
  }

  uploadFile(data, type) {
    let files = [...data];

    if (
      (type === 'N03A' && this.attachment1.controls.length >= 1) ||
      files.length > 1
    ) {
      this.notifierService.notify(
        'error',
        this.stringConstants.add.fileErrors.maxNoOfFiles
      );
      this.fileInput.nativeElement.value = '';
      return false;
    } else if (
      (type === 'N03B' && this.attachment2.controls.length >= 1) ||
      files.length > 1
    ) {
      this.notifierService.notify(
        'error',
        this.stringConstants.add.fileErrors.maxNoOfFiles
      );
      this.fileInput2.nativeElement.value = '';
      return false;
    } else if (files.length > 0) {
      for (let file of files) {
        let fileData = new FormData();
        fileData.append('fileUpload', file);

        let fileName = file.name;

        const parseExt = fileName.split('.');
        const fileExt = parseExt[parseExt.length - 1].toLowerCase();

        if (
          fileExt !== 'doc' &&
          fileExt !== 'docx' &&
          fileExt !== 'jpg' &&
          fileExt !== 'pdf' &&
          fileExt !== 'xls' &&
          fileExt !== 'xlsx'
        ) {
          this.notifierService.notify(
            'error',
            this.stringConstants.add.fileErrors.invalidFormat
          );

          if (type === 'N03A') {
            this.fileInput.nativeElement.value = '';
          } else if (type === 'N03B') {
            this.fileInput2.nativeElement.value = '';
          }
          return false;
        }
        if (file.size > 10485760) {
          this.notifierService.notify(
            'error',
            this.stringConstants.add.fileErrors.filesizeMessage
          );
          if (type === 'N03A') {
            this.fileInput.nativeElement.value = '';
          } else if (type === 'N03B') {
            this.fileInput2.nativeElement.value = '';
          }
          return false;
        }

        const fileIndex =
          type === 'N03A'
            ? this.attachment1.controls.findIndex(
                (file) => fileName === file.value.name
              )
            : this.attachment2.controls.findIndex(
                (file) => fileName === file.value.name
              );
        if (fileIndex > -1) {
          this.notifierService.notify('error', 'fileAlreayExists');
          if (type === 'N03A') {
            this.fileInput.nativeElement.value = '';
          } else if (type === 'N03B') {
            this.fileInput2.nativeElement.value = '';
          }
          return false;
        }

        let data = {
          name: fileName,
          type,
          formId: this.formData.CaseGuid,
          lang: this.lang,
        };

        this.itReductionService.uploadFile(data, fileData).subscribe(
          (response) => {
            if (data.type === 'N03A') {
              this.attachment1.push(
                this.fb.group({
                  name: [file.name],
                  type: fileExt,
                  size: [(file.size * 0.000001).toFixed(2)],
                  doguid: response['d'].Doguid,
                })
              );
            } else if (data.type === 'N03B') {
              this.attachment2.push(
                this.fb.group({
                  name: [file.name],
                  type: fileExt,
                  size: [(file.size * 0.000001).toFixed(2)],
                  doguid: response['d'].Doguid,
                })
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

    if (type === 'N03A') {
      this.fileInput.nativeElement.value = '';
    } else if (type === 'N03B') {
      this.fileInput2.nativeElement.value = '';
    }
  }

  deleteFile(i, type) {
    const data = {
      doguid:
        type === 'N03A'
          ? this.attachment1.controls[i].value.doguid
          : this.attachment2.controls[i].value.doguid,
      type,
    };

    this.itReductionService.deleteFile(data).subscribe(
      (response) => {
        if (data.type === 'N03A') {
          this.attachment1.removeAt(i);
          this.fileInput.nativeElement.value = '';
        } else if (data.type === 'N03B') {
          this.attachment2.removeAt(i);
          this.fileInput2.nativeElement.value = '';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onIdSelect() {
    console.log('id select');
    this.isIdValidated = false;
    this.requestReductionForm.controls.declaration.patchValue({
      idNum: '',
    });
    this.dob1 = undefined;
    this.id1 = undefined;
    if (
      this.requestReductionForm.controls.declaration.value.idType != 'ZS0003'
    ) {
      $('#aftSelect').modal('show');
    }
  }

  onIdNumChange() {
    if (
      this.requestReductionForm.controls.declaration.value.idType == 'ZS0003' &&
      (this.requestReductionForm.controls.declaration.value.idNum.length < 7 ||
        this.requestReductionForm.controls.declaration.value.idNum.length > 15)
    ) {
      this.showIdNumError = true;
      this.isIdValidated = false;
    } else {
      this.showIdNumError = false;
      this.isIdValidated = true;
    }
  }

  validateID2() {
    let d;
    let currentdate;
    if (
      this.id1 === undefined ||
      this.id1 === '' ||
      this.id1.trim().length == 0
    ) {
      this.idErr1 = true;
      this.idMsg = this.stringConstants.add.declaration.idMsg;
    } else if (
      this.dob1 === undefined &&
      this.requestReductionForm.controls.declaration.value.idType != 'ZS0003'
    ) {
      this.idErr1 = false;
      this.dobErr = true;
      this.dobMsg = this.stringConstants.add.declaration.dobMsg;
    } else {
      this.dobErr = false;
      if (
        this.requestReductionForm.controls.declaration.value.idType ==
          'ZS0001' ||
        this.requestReductionForm.controls.declaration.value.idType == 'ZS0002'
      ) {
        this.IDtypeValidation1(this.id1);
        d = this.dob1;
        currentdate =
          d.calendarStart.year.toString() +
          ('0' + d.calendarStart.month.toString()).slice(-2) +
          ('0' + d.calendarStart.day.toString()).slice(-2);
      } else {
        d = new Date();
        let year = d.getFullYear().toString();
        let month = ('0' + (d.getMonth() + 1).toString()).slice(-2);
        let day = ('0' + d.getDate().toString()).slice(-2);

        currentdate = year + month + day;
      }

      let obj = {
        type: this.requestReductionForm.controls.declaration.value.idType,
        idNumber: this.id1,
      };
      if (!this.idErr1) {
        this.itReductionService.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            this.requestReductionForm.controls.declaration.patchValue({
              idNum: res['d']['Idnum'],
            });

            if ('FullName' in res['d']) {
              this.requestReductionForm.controls.declaration.patchValue({
                name: res['d']['FullName'],
              });

              if (
                res['d']['FullName'] &&
                res['d']['FullName'].trim().length > 0
              ) {
                this.canEditContact = false;
              }
            } else if ('Name1' in res['d']) {
              this.requestReductionForm.controls.declaration.patchValue({
                name: res['d']['Name1'] + ' ' + res['d']['Name2'],
              });

              if (res['d']['Name1'] && res['d']['Name1'].trim().length > 0) {
                this.canEditContact = false;
              }
            } else {
              this.canEditContact = true;
            }

            $('#aftSelect').modal('hide');
            this.isIdValidated = true;
          },
          (err) => {
            console.log(err);
            this.isIdValidated = false;

            this.notifierService.notify(
              'error',
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      }
    }
  }

  IDtypeValidation1(idNum) {
    let obj = this.commonValid.IDtypeValidation(
      this.requestReductionForm.controls.declaration.value.idType,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }

  reset() {
    this.idErr1 = false;
    this.dobErr = false;
  }

  onSubmit(): void {
    if (this.payments.invalid) {
      this.validError = true;
    } else {
      this.validError = false;
      this.processActive++;
    }
  }

  onSubmit2() {
    if (
      this.attachment1.controls.length < 1 ||
      this.attachment2.controls.length < 1
    ) {
      this.validError = true;
    } else {
      this.validError = false;
      this.processActive++;
    }
  }

  onSubmit3() {
    // if (this.requestReductionForm.controls['declaration'].valid) {
    //   this.processActive++;
    //   this.validError = false;
    // } else {
    //   this.validError = true;
    // }

    this.processActive++;
  }

  onSubmit4() {
    this.formData.payment_tp03Set.results = this.payments.value;

    this.formData.payment_tp03Set.results.map((payment) => {
      let dateFrom = payment.APeriodFrom;
      let dateTo = payment.APeriodTo;
      let dueDate = payment.ADueDt;

      payment.APeriodFrom = `/Date(${moment(
        dateFrom,
        'YYYY-MM-DD'
      ).valueOf()})/`;
      payment.APeriodTo = `/Date(${moment(dateTo, 'YYYY-MM-DD').valueOf()})/`;
      payment.ADueDt = `/Date(${moment(dueDate, 'YYYY-MM-DD').valueOf()})/`;
    });

    this.formData.AComments = this.requestReductionForm.controls.reason.value;

    this.formData.ADoc2 = '1';
    this.formData.ADoc3 = '1';
    this.formData.Savez = 'X';
    this.formData.Submitz = 'X';
    this.formData.Status = 'IP017';

    const notes = [];
    let count = 1;
    let start = 0;
    let end;
    const el = this.requestReductionForm.value.notes;

    for (let i = 0; i < el.length; i++) {
      const char = el.charAt(i);
      if (
        el.charAt(i) === '\n' ||
        el.charAt(i) === '\r' ||
        el.charAt(i) === '\r\n' ||
        i === el.length - 1
      ) {
        end = i;

        if (i === el.length - 1) {
          end = i + 1;
        }

        let tdline = el.substring(start, end);

        const noteObj = {
          AttByz: 'TP',
          ElemNo: 0,
          Erfusrz: '',
          Lineno: count,
          Noteno: '001',
          Notenoz: '001',
          Rcodez: 'TP03_NOTE',
          Refnamez: '',
          Tdformat: '',
          Tdline: tdline,
          XInvoicez: '',
          XObsoletez: '',
        };
        notes.push(noteObj);
        start = end + 1;
        count++;
      }
    }

    this.formData.znotesSet.results = notes;

    this.itReductionService.submitForm(this.formData).subscribe(
      (res) => {
        this.formData = res['d'];

        this.formData.AReceiveDt = moment(
          parseInt(this.formData.AReceiveDt.replace(/\D/g, ''))
        ).format('Do MMMM YYYY');
        this.processActive++;
      },
      (err) => console.log(err)
    );
  }

  getModal(cardType) {
    localStorage.removeItem('agree');
    if (cardType === 'Instruction') {
      this.isActive = 1;
      $('#Instruction').modal('show');
    }
  }

  closeModal(cardType) {
    if (cardType === 'Instruction') {
      $('#Instruction').modal('toggle');
      this.router.navigateByUrl('/mains/requestincometaxreduction').then();
    }
  }

  openForm(cardType) {
    if (cardType === 'Instruction') {
      $('#Instruction').modal('toggle');
      this.instructionAgree = true;
    }
  }

  goToStep(step) {
    this.processActive = step;
  }

  downloadAck() {
    this.itReductionService.downloadAck(this.formData.Fbnum).subscribe(
      (res) => {
        FileSaver.saveAs(res, this.formData.Fbnum + '_ack.pdf');
      },
      (err) => console.log(err)
    );
  }

  downloadForm() {
    this.itReductionService.downloadForm(this.formData.Fbnum).subscribe(
      (res) => {
        FileSaver.saveAs(res, this.formData.Fbnum + '_form.pdf');
      },
      (err) => console.log(err)
    );
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(['/mains/tax']);
  }
}
