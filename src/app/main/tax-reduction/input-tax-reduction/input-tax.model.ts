import * as moment from "moment";

export interface InputTaxApplicationBasic {
  FbText: string; // Heading of the request
  Fbnum: string; // Request number
  Fbust: string; // Status for backend use
  FbustTxt: string; // Status to be shown in the UI
  Receipt: moment.Moment; // Creation date of the request
  FbtText: string; // Description/Subheading of the application
}

export interface InputTaxDeclarationValidationInput {
  idType: string;
  idNumber: string;
  dateOfBirth: moment.Moment;
}

export interface InputTaxAttachmentDeletionInput {
  serialNumber: number;
  docGuid: string;
  retGuid: string;
  outletRef: string;
}

export interface InputTaxApplicationExisting {
  Inschk: "" | "1"; // Whether the TnC checkbox is marked or not
  effectiveDate: {
    from: moment.Moment | null; // "Effective date from" if there is any existing application
    to: moment.Moment | null; // "Effective date to" if there is any existing application
  };
  current: {
    taxable: {
      name: string;
      percent: number;
    };
    exempt: {
      name: string;
      percent: number;
    };
  };
  proposed: {
    taxable: {
      name: string;
      percent: number;
    };
    exempt: {
      name: string;
      percent: number;
    };
  };

  attachments: {
    name: string;
    size: number;
    rawData: any;
  }[];
  newAttachmentsResponse: InputTaxAttachmentAPIResponse[];

  notes: string;

  idType: string;
  idNumber: string;
  contactPersonName: string;
  ReturnIdz?: string;
  _raw?: any;
}

export interface InputTaxAttachmentAPIResponse {
  __metadata: any;
  ZfileSize: "0.28";
  Dotyp: "";
  OutletRef: "";
  RetGuid: "005056B1365C1EEB8BF91ACE4AC34153";
  SchGuid: "";
  Srno: 0;
  AttBy: "";
  Doguid: "005056B1365C1EEB8BF9549935F44170";
  Filename: "Filename.pdf";
  Mimetype: "multipart/form-data";
  DocUrl: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/sap/zdgw_attach_download_srv/attachSet(Doguid='005056B1365C1EEB8BF9549935F44170',Dotyp='TPFB')/$value";
  Flag: "";
}

export interface InputTaxApplicationAPI {
  Caltp: "G"; // Static
  ReviewFg: boolean; // TODO: How to get it from the URI - check with functional team
  Remark: ""; // Static
  Fbguid: ""; // Static
  Idno: "8797979798798798"; // Declaration ID number
  Mandtz: ""; // TODO: The client that we login. Check with functional team.
  Fbnumz: "84000000491"; // Pass it as empty. Backend will fill this detail after creation
  PortalUsrz: ""; // Static
  Langz: "EN";
  Operationz: "01"; // Operations = 02- Approve , 03-Reject , 04- Void , Submit - 01 , Save - 05
  StepNumberz: "03"; // Static
  ReturnIdz: "005056B1365C1EDB87857182811D3C2C"; // dynamic The attachment RetGuid generated for each application
  Officerz: ""; // Dynamic. Blank in case of TP.
  Gpartz: "3000074788"; // TIN
  Statusz: "E0015"; // Static since we are submitting the application
  UserTypz: "TP";
  TxnTpz: ""; //
  Formprocz: ""; // In case of TP it is blank
  OfficerTz: ""; // In case of TP it is blank
  SrcAppz: ""; // Static
  Fbnum: ""; // Static
  Gpart: ""; // Static
  Inschk: "1"; // Dynamic - Based on instruction checkbox is selected or not
  Edtfr: "/Date(1606780800000)/";
  Edtto: "/Date(1609372800000)/";
  Cptp: "Taxable supplies";
  Cpep: "Exempt supplies";
  Ctpp: "30.00";
  Cepp: "70.00";
  Pcptp: "purh";
  Pcpep: "Ex";
  Pctpp: "35.00";
  Pcepp: "65.00";
  Cdtfr: null; // Static
  Cdtto: null; // Static
  Decchk1: "1"; // Declaration checkbox
  Decchk2: ""; // If this is set to 1 /Ctpp field will be non-editable. Not required when sending the request to backend
  Idtp: "ZS0003"; // Declaration ID's key
  Cnpr: "Gargi"; // Contact person name
  Trtp: "";
  Stpno: "00";
  Mandt: "";
  FormGuid: "";
  DataVersion: "00000";
  LineNo: 0;
  RankingOrder: "00";
  Euser: "";
  DmodeFlg: "";
  EvStatus: "";
  AttdetSet: {
    results: [
      {
        AttBy: "TP";
        ByPusr: "";
        DataVersion: "00000";
        DocUrl: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/sap/zdgw_attach_download_srv/attachSet(Doguid='005056B1365C1EDB8B9BF3DE896691AC',Dotyp='TPFB')/$value";
        Doguid: "005056B1365C1EDB8B9BF3DE896691AC";
        Dotyp: "TPFB";
        Enbdele: "";
        Enbedit: "";
        Erfdt: "/Date(1606003200000)/";
        Erftm: "PT19H27M34S";
        FileExtn: "PDF";
        Filename: "zi05.pdf";
        Mimetype: "";
        OutletRef: "Att 1";
        RetGuid: "005056B1365C1EDB8B9BEDF1603391AB";
        SchGuid: "";
        Seqno: "000001";
        Srno: 0;
        Visdel: "";
        Visedit: "";
      }
    ];
  };
  NotesSet: {
    results: [
      {
        Notenoz: "001"; // dynamic but for requesting workflow it will always be 001
        Refnamez: "FMCA_TRM_NOTE_005056B1365C1EDB87859F9904629C5D"; // dynamic calculation logic to be shared.
        XInvoicez: ""; // static Empty
        XObsoletez: ""; // static Empty
        Rcodez: "TPFV_BOX"; // static
        Erfusrz: "3000074788"; // Gpart/ TIN number
        Erfdtz: "/Date(1604188800000)/"; // static - null
        Erftmz: "PT13H28M31S"; // static
        AttByz: "TP"; // dynamic but for requesting workflow it will be always TP (tax payer)
        ByPusrz: ""; // static
        ByGpartz: "3000074788"; // Gpart/ TIN
        DataVersionz: "00000"; // static 00000
        Namez: "محمد الدوسري"; // Tax payer's name
        Noteno: "000"; // Dynamic but for requesting workflow it will be always be 000
        Lineno: 0; // Dynamic but for requesting workflow it will be always be 0
        ElemNo: 0; // Static
        Tdformat: ""; // Static
        Tdline: ""; // Static
        Sect: ""; // Static
        Strdt: "2020/11/01"; // System date when the note was added
        Strtime: "13:28:31"; // System time when the note was added
        Strline: "test kjk"; // This is the note's text by user.
      }
    ];
  };
  QUESLISTSet: { results: [] };
  QUESTIONSSet: { results: [] };
}

export interface ApplicationSubmitAPI {
  Caltp: "G";
  ReviewFg: false;
  Remark: "";
  Fbguid: "";
  Idno: "2343543";
  Mandtz: "";
  Fbnumz: "84000000506";
  PortalUsrz: "";
  Langz: "EN";
  Operationz: "01";
  StepNumberz: "01";
  ReturnIdz: "005056B1365C1EDB91BE4F1F9FEFF775";
  Officerz: "";
  Gpartz: "3300052872";
  Statusz: "E0015";
  UserTypz: "TP";
  TxnTpz: "";
  Formprocz: "";
  OfficerTz: "";
  SrcAppz: "";
  Fbnum: "";
  Gpart: "";
  Inschk: "1";
  Edtfr: "/Date(1609372800000)/";
  Edtto: "/Date(1611964800000)/";
  Cptp: "Taxable supplies";
  Cpep: "Exempt supplies";
  Ctpp: "50.00";
  Cepp: "50.00";
  Pcptp: "dfegtr";
  Pcpep: "gergtvd";
  Pctpp: "5.00";
  Pcepp: "95.00";
  Cdtfr: null;
  Cdtto: null;
  Decchk1: "1";
  Decchk2: "";
  Idtp: "ZS0003";
  Cnpr: "regtwgt";
  Trtp: "";
  Stpno: "00";
  Mandt: "";
  FormGuid: "";
  DataVersion: "00000";
  LineNo: 0;
  RankingOrder: "00";
  Euser: "";
  DmodeFlg: "";
  EvStatus: "";
  AttdetSet: {
    results: [
      {
        __metadata: {
          id: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPFV_M_SRV/AttdetSet('005056B1365C1EDB91A8076A8B2303DC')";
          uri: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPFV_M_SRV/AttdetSet('005056B1365C1EDB91A8076A8B2303DC')";
          type: "ZDP_TPFV_M_SRV.Attdet";
        };
        RetGuid: "005056B1365C1EDB91A8076A8B2303DC";
        Seqno: "000001";
        SchGuid: "";
        Dotyp: "TPFB";
        Srno: 0;
        Doguid: "005056B1365C1EDB91A8707D833B442B";
        AttBy: "TP";
        Filename: "file1.xlsx";
        FileExtn: "XLSX";
        Mimetype: "";
        ByPusr: "";
        Erfdt: "/Date(1608681600000)/";
        Erftm: "PT20H23M04S";
        DataVersion: "00000";
        DocUrl: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/sap/zdgw_attach_download_srv/attachSet(Doguid='005056B1365C1EDB91A8707D833B442B',Dotyp='TPFB')/$value";
        OutletRef: "file1.xlsx";
        Enbedit: "";
        Enbdele: "";
        Visedit: "";
        Visdel: "";
      },
      {
        __metadata: {
          id: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPFV_M_SRV/AttdetSet('005056B1365C1EDB91A8076A8B2303DC')";
          uri: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPFV_M_SRV/AttdetSet('005056B1365C1EDB91A8076A8B2303DC')";
          type: "ZDP_TPFV_M_SRV.Attdet";
        };
        RetGuid: "005056B1365C1EDB91A8076A8B2303DC";
        Seqno: "000002";
        SchGuid: "";
        Dotyp: "TPFB";
        Srno: 0;
        Doguid: "005056B1365C1EDB91A870FC2848042B";
        AttBy: "TP";
        Filename: "file2.xlsx";
        FileExtn: "XLSX";
        Mimetype: "";
        ByPusr: "";
        Erfdt: "/Date(1608681600000)/";
        Erftm: "PT20H23M11S";
        DataVersion: "00000";
        DocUrl: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/sap/zdgw_attach_download_srv/attachSet(Doguid='005056B1365C1EDB91A870FC2848042B',Dotyp='TPFB')/$value";
        OutletRef: "file2.xlsx";
        Enbedit: "";
        Enbdele: "";
        Visedit: "";
        Visdel: "";
      }
    ];
  };
  NotesSet: {
    results: [
      {
        __metadata: {
          id: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPFV_M_SRV/NotesSet('001')";
          uri: "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPFV_M_SRV/NotesSet('001')";
          type: "ZDP_TPFV_M_SRV.Notes";
        };
        Notenoz: "001";
        Refnamez: "FMCA_TRM_NOTE_005056B1365C1EDB91BE52149136F777";
        XInvoicez: "";
        XObsoletez: "";
        Rcodez: "TPFV_BOX";
        Erfusrz: "3300052872";
        Erfdtz: "/Date(1608768000000)/";
        Erftmz: "PT17H16M07S";
        AttByz: "TP";
        ByPusrz: "";
        ByGpartz: "3300052872";
        DataVersionz: "00000";
        Namez: "";
        Noteno: "000";
        Lineno: 0;
        ElemNo: 0;
        Tdformat: "";
        Tdline: "";
        Sect: "";
        Strdt: "2020/12/24";
        Strtime: "17:16:07";
        Strline: "fervre";
      }
    ];
  };
  QUESLISTSet: { results: [] };
  QUESTIONSSet: { results: [] };
}
