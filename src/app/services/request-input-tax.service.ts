import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { InputTaxReductionConstants } from '../main/tax-reduction/input-tax-reduction/input-tax-reduction.constants';
import {
  ApplicationSubmitAPI,
  InputTaxApplicationAPI,
  InputTaxApplicationBasic,
  InputTaxApplicationExisting,
  InputTaxAttachmentDeletionInput,
  InputTaxDeclarationValidationInput,
} from '../main/tax-reduction/input-tax-reduction/input-tax.model';
import { TaxReductionConstants } from '../main/tax-reduction/input-tax-reduction/tax-reduction.constants';
import { AccountStatementService } from './account-statement.service';

export enum SupportedPages {
  Input = 'input',
  Income = 'income',
}

const ADDITIONAL_HEADERS = {
  Accept: 'application/json',
  'X-Requested-With': 'X',
};

export class RequestInputErrors {
  isError: boolean;
  error_code: string;
  message: string;
  private innerErrorObj: {
    code: string;
    message: string;
    propertyref: string;
    severity: string;
    target: string;
  }[];

  constructor(errResponse: HttpErrorResponse) {
    this.isError = false;
    if (!errResponse.error) {
      return;
    }

    this.isError = true;
    if (!errResponse.error.error) {
      this.message = errResponse.error;
      return;
    }

    errResponse = errResponse.error;

    this.error_code = errResponse.error.code;
    this.message = errResponse.error.message.value;

    if (
      errResponse.error.innererror &&
      errResponse.error.innererror.errordetails &&
      errResponse.error.innererror.errordetails.length > 1
    ) {
      this.innerErrorObj = errResponse.error.innererror.errordetails;
      this.message = '';
      for (let item of this.innerErrorObj.slice(0, -1)) {
        this.message += item.message;
      }
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class RequestInputTaxService {
  baseUrl = environment.url;
  lang: 'ar' | 'en';
  shortLang: 'A' | 'E';
  defaultCalendarType: 'H' | 'G';
  translation: any = {};

  // Shared data
  dataList$ = new BehaviorSubject<InputTaxApplicationBasic[]>([]);

  constructor(
    private http: HttpClient,
    private accService: AccountStatementService,
    private constInfo: TaxReductionConstants,
    private inputTaxConstInfo: InputTaxReductionConstants
  ) {
    this.lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en';
    this.translation = this.constInfo.translation[this.lang];

    if (this.lang === 'en') {
      this.shortLang = 'E';
      this.defaultCalendarType = 'G';
    } else {
      this.shortLang = 'A';
      this.defaultCalendarType = 'H';
    }
  }

  ready() {
    return this.accService.ready();
  }

  get tin() {
    return this.accService.tin;
  }

  get fbGuid() {
    return this.accService.FbGuid;
  }

  get eUser() {
    return this.accService.EUser;
  }

  get userType() {
    // TODO: Identify how to get user type
    return 'TP'; //Tax payer
  }

  get docType() {
    return 'TPFB';
  }

  handleError(errResponse: HttpErrorResponse) {
    return new RequestInputErrors(errResponse);
  }

  getPreviousApplications() {
    const url =
      this.baseUrl +
      '/sap/opu/odata/SAP/ZDP_ITAP_SRV/HEADERSet(' +
      `TaxType='VT',` + // Static
      `AudTin='',` + // Static
      `Gpart='${this.tin}',` +
      `Lang='${this.shortLang}',` +
      `UserTin=''` + // Static
      ')?&$expand=ASSLISTSet,STATUSSet,REQTYPSet';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  private getFbguid(applicationId: string, isNew: boolean) {
    if (isNew) {
      return of(this.fbGuid);
    }
    const url =
      this.baseUrl +
      'sap/opu/odata/SAP/ZDP_ITAP_SRV/TPFILLSet(' +
      `Euser1='${localStorage.getItem('euser')}',` +
      `Fbguid='',` +
      `Fbnum='${applicationId}',` +
      `Fbtyp='${this.inputTaxConstInfo.APPLICATION_TYPE}',` +
      `Gpart='${this.tin}',` +
      `Lang='${this.lang.toUpperCase()}',` +
      `Persl='',` +
      `Status='${this.inputTaxConstInfo.STATUS_TO_CODE_MAP.BILLED}',` +
      `Dispflag='')`;

    return this.http.get(url).pipe(map((res: any) => res.d.Fbguid));
  }

  getDataForApplication(applicationId: string) {
    const isNewApplication = applicationId === 'new';
    return this.getFbguid(applicationId, isNewApplication).pipe(
      switchMap((fbGuid) => {
        const url =
          this.baseUrl +
          'sap/opu/odata/SAP/ZDP_TPFV_M_SRV/HeaderSet(' +
          `Fbnumz='',` +
          `PortalUsrz='',` + // Static
          `Langz='${this.shortLang}',` +
          `Officerz='',` + // Static. Maybe required when going through apporval workflow.
          `Gpartz='${this.tin}',` +
          `UserTypz='${this.userType}',` + // Get the user type and use it here. Possible value could be "TP" (tax payer)
          `TxnTpz='',` + // Static
          `Euser='${this.eUser}',` +
          `Fbguid='${fbGuid}',` +
          `ReviewFg=false` +
          ')?&$expand=AttdetSet,NotesSet,QUESTIONSSet,QUESLISTSet&$format=json';
        return this.http.get<InputTaxApplicationExisting>(url).pipe(
          map((res: any) => {
            return InputTaxModelUtil.getApplicationFromAPI(res.d);
          })
        );
      })
    );
  }

  uploadAttachment(uploadData: {
    attachmentName: string;
    name: string;
    returnIdz: string;
    data: FormData;
  }) {
    const headers = {
      ...ADDITIONAL_HEADERS,
      Slug: uploadData.name,
    };
    const url =
      this.baseUrl +
      'sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachSet(' +
      `OutletRef='${uploadData.attachmentName}',` + // TODO: Validate that the name of the attachments are different
      `RetGuid='${uploadData.returnIdz}',` +
      `Flag='N',` + // Static
      `Dotyp='${this.docType}',` + // Static
      `SchGuid='',` + // Static
      `Srno=1,` + // Static
      `Doguid='',` + // Static
      `AttBy='${this.userType}'` + // Get the user type and use it here. Possible value could be "TP" (tax payer)
      ')/AttachMedSet';
    return this.http.post(url, uploadData.data, {
      headers: headers,
    });
  }

  deleteAttachment(data: InputTaxAttachmentDeletionInput) {
    const url =
      this.baseUrl +
      'sap/opu/odata/SAP/ZDP_INDTAX_ATT_SRV/AttachMedSet(' +
      `OutletRef='',` +
      `RetGuid='',` +
      `Flag='N',` +
      `Dotyp='${InputTaxModelUtil.Constants.Dotyp}',` +
      `SchGuid='',` +
      `Srno=${data.serialNumber},` +
      `Doguid='${data.docGuid}',` +
      `AttBy='${this.userType}'` +
      ')/$value';

    return this.http.delete(url, { headers: ADDITIONAL_HEADERS });
  }

  // validateId(data: InputTaxDeclarationValidationInput) {
  //   const url =
  //     this.baseUrl +
  //     '/sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(' +
  //     `Tin='',` +
  //     `Idtype='${data.idType}',` +
  //     `Idnum='${data.idNumber}',` +
  //     `Country='',` +
  //     `PassExpDt='${moment().locale('en').format('YYYYMMDD')}',` +
  //     `TaxpDob='${
  //       data.dateOfBirth ? data.dateOfBirth.locale('en').format('YYYYMMDD') : ''
  //     }'` +
  //     ')';

  //   return this.http.get(url).pipe(
  //     map((res: any) => {
  //       return res.d.FullName;
  //     })
  //   );
  // }

  validateId(idType, idNum, dob) {
    const url = `/sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/taxpayer_nameSet(Tin='',Idtype='${idType}',Idnum='${idNum}',Country='',PassExpDt='',TaxpDob='${dob}')`;

    return this.http.get(this.baseUrl + url);
  }

  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
        'sap/opu/odata/SAP/Z_REG_GET_TAXPAYER_SRV/' +
        "taxpayer_nameSet(Tin='',Idtype='" +
        obj.type +
        "',Idnum='" +
        obj.idNumber +
        "',Country='',PassExpDt='" +
        date +
        "',TaxpDob='" +
        date +
        "')?sap-language=" +
        this.lang
    );
  }

  submitApplication(data: InputTaxApplicationExisting) {
    console.log('[Input tax] Got this data for form ', data);
    console.log(
      '[Input tax] Sending this data for submission ',
      InputTaxModelUtil.getApplicationDataForAPI(data, this)
    );

    const apiData = InputTaxModelUtil.getApplicationDataForAPI(data, this);
    const url = this.baseUrl + 'sap/opu/odata/SAP/ZDP_TPFV_M_SRV/HeaderSet';

    return this.http
      .post<ApplicationSubmitAPI>(url, apiData, { headers: ADDITIONAL_HEADERS })
      .pipe(map((res: any) => res.d));
  }

  downloadAck(fbnum) {
    const url = `sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='${fbnum}')/$value`;

    return this.http.get(this.baseUrl + url, { responseType: 'blob' });
  }

  downloadForm(fbnum) {
    const url = `sap/opu/odata/SAP/Z_GET_COVER_FORM_SRV/cover_formSet(Fbnum='${fbnum}')/$value`;

    return this.http.get(this.baseUrl + url, { responseType: 'blob' });
  }
}

class InputTaxModelUtil {
  static Constants = {
    Operation: '01',
    StepNumber: '03',
    Caltp: 'G',
    Decchk1: '1',
    Inschk: '1',
    DataVersionz: '00000',
    Noteno: '1',
    ElemNo: 0,
    Notenoz: '1',
    Rcodez: 'TPFV_BOX',
    // Erftmz: "PT13H28M31S",
    Dotyp: 'TPFB',
    ErftmList: ['PT19H27M34S', 'PT19H27M49S'],
    SeqnoList: ['000001', '000002'],
    // Trtp: "CRE_TPFV",
  };

  static getDateObj(info: string): moment.Moment {
    if (!info) {
      return null;
    }
    return moment(+info.match(/\d+/)[0]);
  }

  static getAPIDateString(dt: moment.Moment) {
    if (!dt) {
      return null;
    }

    return `/Date(${dt.valueOf()})/`;
  }

  static getApplicationFromAPI(
    data: InputTaxApplicationAPI
  ): InputTaxApplicationExisting {
    const attachmentsFromAPI = data.AttdetSet.results;
    const attachments = [];
    for (let attachment of attachmentsFromAPI) {
      attachments.push({
        name: attachment.Filename,
        size: 0,
        rawData: attachment,
      });
    }
    return {
      Inschk: data.Inschk,
      effectiveDate: {
        from: this.getDateObj(data.Edtfr),
        to: this.getDateObj(data.Edtto),
      },
      current: {
        taxable: {
          name: data.Cptp,
          percent: +data.Ctpp,
        },
        exempt: {
          name: data.Cpep,
          percent: +data.Cepp,
        },
      },
      proposed: {
        taxable: {
          name: data.Pcptp,
          percent: +data.Pctpp,
        },
        exempt: {
          name: data.Pcpep,
          percent: +data.Pcepp,
        },
      },
      notes: data.NotesSet.results.reduce((noteStr, noteObj) => {
        return noteStr + noteObj.Strline;
      }, ''),
      idType: data.Idtp,
      idNumber: data.Idno,
      contactPersonName: data.Cnpr,
      attachments: attachments,
      newAttachmentsResponse: [],
      ReturnIdz: data.ReturnIdz,
      _raw: data,
    };
  }

  static getApplicationDataForAPI(
    data: InputTaxApplicationExisting,
    inputTaxServ: RequestInputTaxService
  ): InputTaxApplicationAPI {
    const Constants = InputTaxModelUtil.Constants;
    const rawData = data._raw;
    rawData.Caltp = Constants.Caltp;
    rawData.Operationz = Constants.Operation;
    rawData.StepNumberz = Constants.StepNumber;
    rawData.UserTypz = inputTaxServ.userType;
    rawData.Gpartz = inputTaxServ.tin;
    rawData.Decchk1 = Constants.Decchk1;
    rawData.Trtp = ''; //Constants.Trtp;

    rawData.Edtfr = InputTaxModelUtil.getAPIDateString(data.effectiveDate.from);
    rawData.Edtto = InputTaxModelUtil.getAPIDateString(data.effectiveDate.to);
    rawData.Inschk = data.Inschk;

    rawData.Cpep = data.current.exempt.name;
    rawData.Cepp = '' + parseFloat('' + data.current.exempt.percent).toFixed(2);
    rawData.Cptp = data.current.taxable.name;
    rawData.Ctpp =
      '' + parseFloat('' + data.current.taxable.percent).toFixed(2);

    rawData.Pcptp = data.proposed.taxable.name;
    rawData.Pctpp =
      '' + parseFloat('' + data.proposed.taxable.percent).toFixed(2);
    rawData.Pcpep = data.proposed.exempt.name;
    rawData.Pcepp =
      '' + parseFloat('' + data.proposed.exempt.percent).toFixed(2);

    rawData.Idtp = data.idType;
    rawData.Idno = '' + data.idNumber;
    rawData.Cnpr = data.contactPersonName;
    rawData.NotesSet = data.notes
      .replace(/\r/g, '')
      .split('\n')
      .map((note, index) => {
        return {
          __metadata: {
            id:
              inputTaxServ.baseUrl +
              "sap/opu/odata/SAP/ZDP_TPFV_M_SRV/NotesSet('001')",
            uri:
              inputTaxServ.baseUrl +
              "sap/opu/odata/SAP/ZDP_TPFV_M_SRV/NotesSet('001')",
            type: 'ZDP_TPFV_M_SRV.Notes',
          },
          AttByz: inputTaxServ.userType,
          ByGpartz: inputTaxServ.tin,
          // ByPusrz: "", // Not to be sent but might come in response
          DataVersionz: Constants.DataVersionz,
          ElemNo: Constants.ElemNo,
          Erfdtz: null,
          // Erftmz: Constants.Erftmz, // Not to be sent but might come in response
          Erfusrz: '',
          Lineno: index + 1,
          // Namez: inputTaxServ.userName, // Not to be sent but might come in response
          Noteno: Constants.Noteno,
          Notenoz: Constants.Notenoz,
          Rcodez: Constants.Rcodez,
          Refnamez: '', // Confirmed with Gargi
          // Sect: "", // Not to be sent but might come in response
          // Strdt: currentTimestamp.format("YYYY/MM/DD"), // Not to be sent but might come in response
          // Strline: data.notes, // Not to be sent but might come in response
          // Strtime: currentTimestamp.format("hh:mm:ss"), // Not to be sent but might come in response
          Tdformat: '',
          Tdline: note,
          XInvoicez: '',
          XObsoletez: '',
        };
      });
    rawData.AttdetSet = [];
    rawData.QUESLISTSet = [];
    rawData.QUESTIONSSet = [];
    rawData.Statusz = ''; // TODO: Get this from functional team.
    rawData.StepNumberz = '01';
    rawData.__metadata = {
      id:
        inputTaxServ.baseUrl +
        `sap/opu/odata/SAP/ZDP_TPFV_M_SRV/HeaderSet(ReviewFg=false,Fbguid='',Fbnumz='',PortalUsrz='',Langz='EN',Officerz='',Gpartz='${inputTaxServ.tin}',UserTypz='',TxnTpz='',Euser='')`,
      uri:
        inputTaxServ.baseUrl +
        `sap/opu/odata/SAP/ZDP_TPFV_M_SRV/HeaderSet(ReviewFg=false,Fbguid='',Fbnumz='',PortalUsrz='',Langz='EN',Officerz='',Gpartz='${inputTaxServ.tin}',UserTypz='',TxnTpz='',Euser='')`,
      type: 'ZDP_TPFV_M_SRV.Header',
    };
    return rawData;
  }
}
