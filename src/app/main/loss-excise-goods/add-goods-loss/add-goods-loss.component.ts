import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

import { CalendarComponent } from 'src/app/constants/calendar.component';
import { AppService } from 'src/app/app.service';

import { stringConstants } from '../../../constants/loss-of-excise-goods.constants';
import { LossExciseGoodsService } from 'src/app/services/loss-excise-goods.service';

declare var $: any;
const nonWhitespaceRegExp: RegExp = new RegExp('\\S');
let maxLength = 132;

@Component({
  selector: 'app-add-goods-loss',
  templateUrl: './add-goods-loss.component.html',
  styleUrls: ['./add-goods-loss.component.css'],
})
export class AddGoodsLossComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  lang: string;

  stringConstants;

  headerComponent = CalendarComponent;

  formData;

  formStep = 0;

  date = new Date();

  formTotal = {
    units: 0,
    rsp: '',
    et: '',
  };

  maxUnits;

  validError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private lossExciseGoodsService: LossExciseGoodsService,
    public router: Router,
    public decimalPipe: DecimalPipe,
    private notifierService: NotifierService,
    public appSrv: AppService
  ) {
    moment.locale('en');
  }

  ngOnInit(): void {
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'AR';
      this.stringConstants = stringConstants.ar;
      moment.locale('ar');
    } else {
      this.lang = 'EN';
      this.stringConstants = stringConstants.en;
      moment.locale('en');
    }

    this.getInitialData();
    this.formReset();
  }

  getInitialData() {
    this.lossExciseGoodsService.getFormData().subscribe(
      (response) => {
        this.formData = {
          name: response['d'].McName1,
          fin: response['d'].Psobkey,
          Fbnum: response['d'].Fbnumx,
          productList: response['d'].ETLG_PTSet.results,
          unitList: response['d'].ETLG_UOM_SSet.results,
          unitSet: response['d'].ETLG_UOMSet.results,
          movementDoc: response['d'].ETLG_MOVSet.results,
          movementPeriod: response['d'].ETLG_PERDSet.results,
          returnId: response['d'].ReturnIdx,
        };

        let warehouse = [];

        response['d'].ETLG_WNSet.results.map((wh) => {
          let warehouseItem = {
            Whno: '',
            GoodsNo: [],
          };

          const index = warehouse.findIndex((item) => wh.Whno === item.Whno);

          if (index < 0) {
            warehouseItem.Whno = wh.Whno;
            warehouseItem.GoodsNo = [...warehouseItem.GoodsNo, wh.GoodsNo];
            warehouse = [...warehouse, warehouseItem];
          } else if (index > -1) {
            warehouse[index].GoodsNo = [
              ...warehouse[index].GoodsNo,
              wh.GoodsNo,
            ];
          }
        });

        this.formData['warehouse'] = warehouse;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addGoodsLoss = this.formBuilder.group({
    loss: this.formBuilder.group({
      irreversibleLoss: ['', Validators.required],
      lossType: ['', Validators.required],
    }),
    warehouseSuspension: this.formBuilder.array([this.warehouseSusForm()]),
    movementSuspension: this.formBuilder.group({
      lossDate: [null, Validators.required],
      movementDoc: ['', Validators.required],
      movementPeriod: [''],
      movSusGoods: this.formBuilder.array([]),
    }),
    reason: ['', Validators.required],
    evidenceFiles: this.formBuilder.array([]),
    decleration: [false, Validators.requiredTrue],
  });

  warehouseSusForm() {
    return this.formBuilder.group({
      plannedDate: [null, Validators.required],
      warehouseNo: ['', Validators.required],
      productList: [[]],
      productType: ['', Validators.required],
      productDescription: ['', Validators.required],
      unitList: [[]],
      unitMeasure: ['', Validators.required],
      units: ['', [Validators.required, Validators.max(99999999999999)]],
      rsp: ['', [Validators.required, Validators.max(99999999999.99)]],
      totalRsp: [0, Validators.required],
      totalEt: [0, Validators.required],
    });
  }

  warehouseSuspension = this.addGoodsLoss.get(
    'warehouseSuspension'
  ) as FormArray;

  movSusGoods = this.addGoodsLoss.controls['movementSuspension'].get(
    'movSusGoods'
  ) as FormArray;

  evidenceFiles = this.addGoodsLoss.get('evidenceFiles') as FormArray;

  irreversibleLoss(value) {
    if (value === 'no') {
      this.formReset();

      this.addGoodsLoss.patchValue({
        loss: { irreversibleLoss: value },
      });

      this.addGoodsLoss.patchValue({
        loss: { lossType: 'warehouse' },
      });
      // this.warehouseSuspension.reset();
    } else {
      this.formReset();

      this.addGoodsLoss.patchValue({
        loss: { irreversibleLoss: value },
      });

      this.addGoodsLoss.patchValue({
        loss: { lossType: '' },
      });
    }
  }

  lossType(value) {
    this.addGoodsLoss.patchValue({
      loss: { lossType: value },
    });
    this.formReset();
  }

  formReset() {
    this.validError = false;
    this.warehouseSuspension.clear();
    this.warehouseSuspension.push(this.warehouseSusForm());
    this.movSusGoods.clear();
    this.addGoodsLoss.controls['movementSuspension'].reset();
    this.resetFormTotal();
  }

  dupeValidation(i) {
    for (
      let index = 0;
      index < this.warehouseSuspension.controls.length;
      index++
    ) {
      const dateObj = this.warehouseSuspension.controls[i].value.plannedDate
        .calendarStart;
      const date = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;

      const controlDateObj = this.warehouseSuspension.controls[index].value
        .plannedDate.calendarStart;
      const controlDate = `${controlDateObj.year}-${controlDateObj.month}-${controlDateObj.day}`;

      if (
        i !== index &&
        date === controlDate &&
        this.warehouseSuspension.controls[i].value.warehouseNo ===
          this.warehouseSuspension.controls[index].value.warehouseNo &&
        this.warehouseSuspension.controls[i].value.productType ===
          this.warehouseSuspension.controls[index].value.productType
      ) {
        this.warehouseSuspension.controls[i].get('plannedDate').setErrors({
          invalid: true,
        });
        this.warehouseSuspension.controls[i].get('warehouseNo').setErrors({
          invalid: true,
        });
        this.warehouseSuspension.controls[i].get('productType').setErrors({
          invalid: true,
        });

        break;
      } else {
        this.warehouseSuspension.controls[i].get('plannedDate').setErrors(null);
        this.warehouseSuspension.controls[i].get('warehouseNo').setErrors(null);
        this.warehouseSuspension.controls[i].get('productType').setErrors(null);
      }
    }
  }

  addWareHouseSuspension() {
    this.validError = false;
    this.warehouseSuspension.push(this.warehouseSusForm());
  }

  deleteWarehouseSuspension(i) {
    this.warehouseSuspension.removeAt(i);
    this.calculateFormTotal();
  }

  setProductList(i) {
    const index = this.formData.warehouse.findIndex(
      (wh) => wh.Whno === this.warehouseSuspension.controls[i].value.warehouseNo
    );

    this.warehouseSuspension.controls[i].patchValue({
      productList: this.formData.productList.filter(
        (product) =>
          this.formData.warehouse[index].GoodsNo.indexOf(product.GoodsNo) > -1
      ),
    });
  }

  setUnitList(i) {
    if (this.warehouseSuspension.controls[i].value.productType === '001') {
      this.warehouseSuspension.controls[i].patchValue({
        unitList: this.formData.unitList.filter(
          (unit) =>
            unit.Msehi !== 'CAN' && unit.Msehi !== 'L' && unit.Msehi !== 'GL'
        ),
      });
    } else {
      this.warehouseSuspension.controls[i].patchValue({
        unitList: this.formData.unitList.filter(
          (unit) =>
            unit.Msehi === 'CAN' || unit.Msehi === 'L' || unit.Msehi === 'GL'
        ),
      });
    }
  }

  calculateTotal(i) {
    if (this.addGoodsLoss.controls['loss'].value.lossType === 'warehouse') {
      this.warehouseSuspension.controls[i].patchValue({
        totalRsp:
          this.warehouseSuspension.controls[i].value.units &&
          this.warehouseSuspension.controls[i].value.rsp
            ? (
                this.warehouseSuspension.controls[i].value.units *
                this.warehouseSuspension.controls[i].value.rsp
              )
                .toFixed(2)
                .toLocaleString()
            : '0',
      });

      this.warehouseSuspension.controls[i].patchValue({
        totalEt:
          this.warehouseSuspension.controls[i].value.productType === '003'
            ? (this.warehouseSuspension.controls[i].value.totalRsp / 3)
                .toFixed(2)
                .toLocaleString()
            : (this.warehouseSuspension.controls[i].value.totalRsp / 2)
                .toFixed(2)
                .toLocaleString(),
      });

      this.calculateFormTotal();
    } else if (
      this.addGoodsLoss.controls['loss'].value.lossType === 'movement'
    ) {
      this.movSusGoods.controls[i].patchValue({
        TotalRsp: (
          this.movSusGoods.controls[i].value.PUnit *
          this.movSusGoods.controls[i].value.RspUnit
        )
          .toFixed(2)
          .toLocaleString(),
      });

      this.movSusGoods.controls[i].patchValue({
        ExciseTax:
          this.movSusGoods.controls[i].value.ProdType === '003'
            ? (this.movSusGoods.controls[i].value.TotalRsp / 3)
                .toFixed(2)
                .toLocaleString()
            : (this.movSusGoods.controls[i].value.TotalRsp / 2)
                .toFixed(2)
                .toLocaleString(),
      });

      this.calculateFormTotal();
    }
  }

  calculateFormTotal() {
    let formTotal = {
      units: 0,
      rsp: 0,
      et: 0,
    };

    if (this.addGoodsLoss.controls['loss'].value.lossType === 'warehouse') {
      this.warehouseSuspension.controls.map((item) => {
        formTotal.units += parseInt(item.value.units);
        formTotal.rsp += parseFloat(item.value.totalRsp);
        formTotal.et += parseFloat(item.value.totalEt);
      });
    } else if (
      this.addGoodsLoss.controls['loss'].value.lossType === 'movement'
    ) {
      this.movSusGoods.controls.map((item) => {
        formTotal.units += parseInt(item.value.PUnit);
        formTotal.rsp += parseFloat(item.value.TotalRsp);
        formTotal.et += parseFloat(item.value.ExciseTax);
      });
    }

    this.formTotal.units = formTotal.units;
    this.formTotal.rsp = formTotal.rsp.toFixed(2).toLocaleString();
    this.formTotal.et = formTotal.et.toFixed(2).toLocaleString();
  }

  resetFormTotal() {
    this.formTotal = {
      units: 0,
      rsp: '',
      et: '',
    };
  }

  getMovSusData() {
    this.movSusGoods.clear();
    this.lossExciseGoodsService
      .getFormData(
        '',
        this.addGoodsLoss.controls['movementSuspension'].value.movementDoc
      )
      .subscribe(
        (res) => {
          res['d'].ETLG_ITMSet.results.map((item) => {
            const itemSet = this.formBuilder.group(item);

            // itemSet.patchValue({ PUnit: '', TotalRsp: '', ExciseTax: '' });

            for (const control in itemSet.controls) {
              if (control === 'PUnit') {
                itemSet
                  .get(control)
                  .setValidators([
                    Validators.required,
                    Validators.max(parseInt(itemSet.get(control).value)),
                  ]);

                itemSet
                  .get(control)
                  .setValue(parseInt(itemSet.get(control).value));

                this.maxUnits = parseInt(itemSet.get(control).value);
              }
              // else {
              //   itemSet.get(control).setValidators([Validators.required]);
              // }
            }

            const value = itemSet.value;

            itemSet.patchValue({
              ExciseTax:
                value.ProdType === '003'
                  ? (parseFloat(value.TotalRsp) / 3).toFixed(2)
                  : (parseFloat(value.TotalRsp) / 2).toFixed(2),
            });

            this.movSusGoods.push(itemSet);
            this.calculateFormTotal();
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getGoodsIndex(item) {
    return this.formData.productList.findIndex(
      (product) => product.GoodsNo === item.ProdType
    );
  }

  getUnitIndex(item) {
    return this.formData.unitSet.findIndex((unit) => unit.Msehi === item.Mins);
  }

  onInputChange() {
    $('#reason').on('input focus keydown keyup', function (e) {
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

  uploadFile(data) {
    let files = [...data];

    if (this.evidenceFiles.controls.length > 5 || files.length > 5) {
      this.notifierService.notify(
        'error',
        this.stringConstants.add.fileErrors.maxNoOfFiles
      );
      this.fileInput.nativeElement.value = '';
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
          fileExt !== 'jpeg' &&
          fileExt !== 'jpg' &&
          fileExt !== 'pdf' &&
          fileExt !== 'xls' &&
          fileExt !== 'xlsx'
        ) {
          this.notifierService.notify(
            'error',
            this.stringConstants.add.fileErrors.invalidFormat
          );
          this.fileInput.nativeElement.value = '';
          console.log('debug');
          return false;
        }
        if (file.size > 2097152) {
          this.notifierService.notify(
            'error',
            this.stringConstants.add.fileErrors.filesizeMessage
          );
          this.fileInput.nativeElement.value = '';
          return false;
        }
        if (this.evidenceFiles.controls.length === 5) {
          this.notifierService.notify(
            'error',
            this.stringConstants.add.fileErrors.maxNoOfFiles
          );
          this.fileInput.nativeElement.value = '';
          return false;
        }
        const fileIndex = this.evidenceFiles.controls.findIndex(
          (file) => fileName === file.value.name
        );
        if (fileIndex > -1) {
          this.notifierService.notify(
            'error',
            this.stringConstants.add.fileErrors.fileAlreayExists
          );
          this.fileInput.nativeElement.value = '';
          return false;
        }

        let data = {
          name: fileName,
          returnId: this.formData.returnId,
          lang: this.lang,
        };

        this.lossExciseGoodsService.uploadFile(data, fileData).subscribe(
          (response) => {
            this.evidenceFiles.push(
              this.formBuilder.group({
                name: [file.name],
                type: fileExt,
                size: [(file.size * 0.000001).toFixed(2)],
                doguid: response['d'].Doguid,
              })
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

    this.fileInput.nativeElement.value = '';
  }

  deleteFile(i) {
    this.lossExciseGoodsService
      .deleteFile(this.evidenceFiles.controls[i].value.doguid)
      .subscribe(
        (response) => {
          this.evidenceFiles.removeAt(i);
          this.fileInput.nativeElement.value = '';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  formSubmit() {
    let data = {
      Euser: '00000000000000000000',
      EvStatus: '',
      DmodeFlg: '',
      InspA: '0',
      Fbnumx: '',
      McName1: this.formData.name,
      OffA: '0',
      SupA: '',
      OfficerTx: '',
      Caltp: '',
      McName2: '',
      StepNumber: '',
      PortalUsrx: '',
      StepNumberx: '',
      Officerx: '',
      Statusx: '',
      UserTypx: 'TP',
      TxnTpx: '',
      Formprocx: '',
      Mandt: '',
      FormGuid: '',
      MmPri: '',
      Begda: null,
      Ertime: 'P00DT00H00M00S',
      TransType:
        this.addGoodsLoss.value.loss.irreversibleLoss === 'yes'
          ? 'LOSS_YES'
          : this.addGoodsLoss.value.loss.irreversibleLoss === 'no'
          ? 'LOSS_NO'
          : null,
      Gpart: '',
      ReturnId: '',
      Gpartx: localStorage.getItem('gpart'),
      Psobkey: this.formData.fin,
      Langx: this.lang,
      DataVersion: '00000',
      ReturnIdx: this.formData.returnId,
      Decla: '1',
      IrrLoss:
        this.addGoodsLoss.value.loss.irreversibleLoss === 'yes'
          ? '1'
          : this.addGoodsLoss.value.loss.irreversibleLoss === 'no'
          ? '2'
          : null,
      TypeLoss:
        this.addGoodsLoss.value.loss.lossType === 'warehouse'
          ? '1'
          : this.addGoodsLoss.value.loss.lossType === 'movement'
          ? '2'
          : null,
      ETLG_ITMSet: [],

      Comments: '',

      NOTESSet: [],
      Operationx: '01',
    };

    if (this.addGoodsLoss.value.loss.lossType === 'warehouse') {
      this.warehouseSuspension.controls.map((goods) => {
        const dateObj = goods.value.plannedDate.calendarStart;
        const date = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;

        data['IrrLossDate'] = `/Date(${moment(date, 'YYYY-MM-DD').valueOf()})/`;

        let item = {
          DataVersion: '00001',
          IrrLossDate: `/Date(${moment(date, 'YYYY-MM-DD').valueOf()})/`,
          WaNum: goods.value.warehouseNo,
          ProdType: goods.value.productType,
          ProDesc: goods.value.productDescription,
          Mandt: '210',
          Mins: goods.value.unitMeasure,
          PUnit: goods.value.units.toString(),
          RspUnit: goods.value.rsp.toString(),
          TotalRsp: goods.value.totalRsp.toString(),
          ExciseTax: goods.value.totalEt.toString(),
        };

        data.ETLG_ITMSet = [...data.ETLG_ITMSet, item];
      });
    } else if (this.addGoodsLoss.value.loss.lossType === 'movement') {
      let dateObj = this.addGoodsLoss.value.movementSuspension.lossDate
        .calendarStart;
      const date = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;

      data['IrrLossDate'] = `/Date(${moment(date, 'YYYY-MM-DD').valueOf()})/`;

      data['EmoveDoc'] = this.addGoodsLoss.value.movementSuspension.movementDoc;

      data['MmPri'] = this.addGoodsLoss.value.movementSuspension.movementPeriod
        ? this.addGoodsLoss.value.movementSuspension.movementPeriod
        : '';

      this.movSusGoods.controls.map((control) => {
        control.patchValue({
          PUnit: parseFloat(control.value.PUnit).toFixed(2),
        });
      });

      data.ETLG_ITMSet = this.movSusGoods.value;
    }

    const notes = [];
    let count = 0;
    let start = 0;
    // let metaNum = 2;
    let end;
    const el = this.addGoodsLoss.value.reason;
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
        // let metaNumConst =
        //   metaNum < 10
        //     ? `00${metaNum}`
        //     : metaNum < 100
        //     ? `0${metaNum}`
        //     : `${metaNum}`;
        const noteObj = {
          // __metadata: {
          //   id: `https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_WL_M_SRV/NotesSet("${metaNumConst}")`,
          //   uri: `https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_WL_M_SRV/NotesSet("${metaNumConst}")`,
          //   type: 'ZDP_WL_M_SRV.Notes',
          // },
          AttByz: 'TP',
          ByGpartz: localStorage.getItem('gpart'),
          ByPusrz: '',
          DataVersionz: '00000',
          ElemNo: 0,
          Erfusrz: '',
          Lineno: count,
          Namez: '',
          Noteno: '4',
          Notenoz: '4',
          Rcodez: 'ETLG_TP01',
          Refnamez: '',
          Tdformat: '',
          Tdline: tdline,
          XInvoicez: '',
          XObsoletez: '',
        };
        notes.push(noteObj);
        start = end + 1;
        count++;
        // metaNum++;
      }
    }

    data.NOTESSet = notes;

    this.lossExciseGoodsService.submitForm(data).subscribe(
      (response) => {
        this.formData['fbnum'] = response['d'].Fbnumx;

        const date = parseInt(response['d'].Begda.replace(/\D/g, ''));
        this.formData['appDate'] = moment(date).format('Do MMMM YYYY');

        this.formStep = 3;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadAck() {
    this.lossExciseGoodsService.downloadAck(this.formData.fbnum).subscribe(
      (res) => {
        FileSaver.saveAs(res, this.formData.fbnum + '_ack.pdf');
      },
      (err) => console.log(err)
    );
  }

  downloadForm() {
    this.lossExciseGoodsService.downloadForm(this.formData.fbnum).subscribe(
      (res) => {
        FileSaver.saveAs(res, this.formData.fbnum + '_form.pdf');
      },
      (err) => console.log(err)
    );
  }

  nextStep() {
    this.validError = false;

    if (this.formStep === 0) {
      // if (this.addGoodsLoss.controls['loss'].value.lossType === 'warehouse') {
      //   this.dupeValidation()
      // }

      if (
        this.addGoodsLoss.controls['loss'].value.lossType === 'warehouse' &&
        this.warehouseSuspension.invalid
      ) {
        this.validError = true;
      } else if (
        this.addGoodsLoss.controls['loss'].value.lossType === 'movement' &&
        this.addGoodsLoss.controls['movementSuspension'].invalid
      ) {
        this.validError = true;
      } else {
        this.formStep++;
      }
    } else if (this.formStep === 1) {
      if (
        this.addGoodsLoss.controls['reason'].invalid ||
        this.evidenceFiles.controls.length < 1 ||
        this.addGoodsLoss.controls['decleration'].invalid
      ) {
        this.validError = true;
      } else {
        this.formStep++;
      }
    }
  }

  prevStep() {
    if (this.formStep > 0) {
      this.formStep--;
    } else if (this.formStep === 0) {
      this.formReset();
      this.router.navigate(['/mains/lossexcisegoods']);
    }
  }

  goToStep(value) {
    this.formStep = value;
  }

  backTo(process): void {
    this.router.navigate(['/mains/tax']);
    if (process === '28') {
      this.appSrv.updatedDataSelection9('002');
      this.appSrv.updatedDataSelection11(process);
    } else {
      this.appSrv.updatedDataSelection9(process);
    }
  }
}
