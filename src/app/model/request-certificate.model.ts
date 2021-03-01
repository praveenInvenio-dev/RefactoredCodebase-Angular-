export class RequestCertificate {
}



    export class Metadata {
        id: string;
        uri: string;
        type: string;
    }

    export class ZnotesSet {
        results: any[];
    }

    export class AttDetSet {
        results: any[];
    }

    export class D {
        __metadata: Metadata;
        AAgree: string;
        AAgreeDt?: any;
        AAgreeTm: string;
        AAppBy: string;
        AAppDt?: any;
        ABranch: string;
        ABranchCd: string;
        ACertificateNum: string;
        ACertificateTp: string;
        ACheck: string;
        ACokey: string;
        AComments: string;
        ADoc1: string;
        ADoc2: string;
        ADoc3: string;
        ADocOther: string;
        AFbnum: string;
        AGpart: string;
        APeriod: string;
        AReceiveBy: string;
        AReceiveDt: Date;
        Auditorz: string;
        CaseGuid: string;
        CertTpDes: string;
        Fbnum: string;
        Fbnumz: string;
        FormGuid: string;
        Fresubflg: string;
        Langz: string;
        LegacyDocNo: string;
        Mandt: string;
        Mandtz: string;
        PeriodDes: string;
        PeriodKeyz: string;
        RegIdz: string;
        Rejectz: string;
        Savez: string;
        Status: string;
        Submitz: string;
        Taxpayerz: string;
        Textnote: string;
        UserTin: string;
        znotesSet: ZnotesSet;
        AttDetSet: AttDetSet;
    }

    export class SubmittedBillData {
        d: D;
    }
    export class DropDownItem {
        __metadata: Metadata;
        Taxpy: string;
        Fbtyp: string;
        DropdwonFg: string;
        TransactionType: string;
        TrantypeText: string;
    }



    export class SubmitedCertificateListObject {
        __metadata: Metadata;
        Fbnum: string;
        Objstatus: string;
        Fbsta: string;
        StatText: string;
        Fbtyp: string;
        FbtText: string;
        Erfdate: Date;
        Erftime: string;
        Persl: string;
        TaxPeriod: string;
        DueDt: Date;
        Due: string;
        Abrzu: Date;
        Abrzo: Date;
        Incotyp: string;
        Incotext: string;
        Flag: string;
        CalendrTyp: string;
        PrcBy: string;
        Grp: string;
        CrdtText: string;
        Euser: string;
        Fbguid: string;
    }
    export class TaxyearDropDown {
        __metadata: Metadata;
        Taxpy: string;
        Fbtyp: string;
        DropdwonFg: string;
        Persl: string;
        Txt50: string;
    }
