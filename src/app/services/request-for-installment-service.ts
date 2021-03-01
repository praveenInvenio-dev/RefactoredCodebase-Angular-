import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { apiconstants } from "../constants/apiConstants";
import { N } from '@angular/cdk/keycodes';

@Injectable({
    providedIn: "root",
})
export class RequestForInstallmentService {
    baseUrl = environment.url;
    lang: string;
    tin;
    lang1: string;

    constructor(private http: HttpClient) {
        if (localStorage.getItem("lang") === "ar") {
            this.lang = "AR";
            this.lang1 = "A";
        } else {
            this.lang = "EN";
            this.lang1 = "E";
        }
        this.tin = localStorage.getItem("gpart");
    }

    getEUSERDetails(tin) {
        let url = this.baseUrl + "/sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='" + tin + "')";
        return this.http.get(url);
    }

    getFbguidDetails(res) {
        console.log('getFbguidDetails', res);
        let url = this.baseUrl + "/sap/opu/odata/SAP/ZTAXPAYERDBNEW_SRV/HeaderSet(Taxtp='',Zuser='null',Bpnum='',Auditor='',Lang='" + this.lang + "',Euser1='" + res.Val1 + "',Euser2='" + res.Val2 + "',Euser3='" + res.Val3 + "',Euser4='" + res.Val4 + "',Euser5='" + res.Val5 + "',Fbguid='null',HostName='TSTDG1AS1.MYGAZT.GOV.SA')?$expand=MainTileSet,SubTileSet,ReturnDataSet,MsgCPMASet";
        return this.http.get(url);
    }


    getInstalmentForRequest(callServ, fbgUid, Euser, Zuser) {
        console.log("fbgUidservi", fbgUid);
        //console.log('fbgUidservi', fbgUid);
        ///sap/opu/odata/SAP/ZDP_IPRF_M_SRV/iprfhdrSet(Tin='',Euser='00000001000008325428',Langz='EN',Fbguid='005056B1F8FB1EEABBA468551C609CF8',Fbnum='',FormMode='N')?$expand=AttachSet%2cNotesSet%2cFnDtlSet
        // let url = this.baseUrl + "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/iprfhdrSet(Tin='" + tin + "',Euser='" + Euser + "',Langz='EN',Fbguid='" + fbgUid + "',Fbnum='',FormMode='N')?$expand=AttachSet%2cNotesSet%2cFnDtlSet";
        console.log("details.Euser2", Zuser);
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_WI_SRV/HdrSet(CallServ='" + callServ + "',HostName='',Zuser='" +
            Zuser +
            "',Bpnum='',Auditor='null',Lang='" + this.lang + "',Euser1='" +
            Euser +
            "',Euser2='',Euser3='',Euser4='',Euser5='',Fbguid='" +
            fbgUid +
            "',UserTin='',Fbnum='',UserTyp='TP')?$expand=WorklistSet,AuthServSet,EvtNotif12Set,EvtNotif1Set,RevokeListSet&sap-language=" + this.lang + "";

        return this.http.get(url);
    }

    getType() {
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_UH_SRV/InsRequestSet?$skip=0&$top=100&$format=json&sap-language='" + this.lang + "'";
        return this.http.get(url);
    }

    getZaktDetail(fbNum, fbgUid, Euser, formMode) {
        let url = "";
        if (formMode === "S") {
            url =
                this.baseUrl +
                "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/iprfhdrSet(Tin='" +
                this.tin +
                "',Euser='" +
                Euser +
                "',Langz='" + this.lang + "',Fbguid='" +
                fbgUid +
                "',Fbnum='" +
                fbNum +
                "',FormMode='" +
                formMode +
                "')?$expand=AttachSet%2cNotesSet%2cFnDtlSet&sap-language=" + this.lang + "";
        } else {
            url =
                this.baseUrl +
                "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/iprfhdrSet(Tin='" +
                this.tin +
                "',Euser='" +
                Euser +
                "',Langz='" + this.lang + "',Fbguid='" +
                fbgUid +
                "',Fbnum='" +
                fbNum +
                "',FormMode='N')?$expand=AttachSet%2cNotesSet%2cFnDtlSet&sap-language=" + this.lang + "";
        }
        // let url = this.baseUrl + "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/invDtlsSet?$filter=Tin eq '" + tin + "'and Fbnum eq '" + fbNum + "'and Langz eq '" + this.lang + "' and InstReqFor eq '" + type + "'";
        return this.http.get(url);
    }

    getZakatBillDetails(fbNum, instReq) {
        // const type = "01"
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/invDtlsSet?$filter=Tin eq '" +
            this.tin +
            "'and Fbnum eq '" +
            fbNum +
            "' and Langz eq '" +
            this.lang +
            "' and InstReqFor eq '" +
            instReq +
            "'";
        return this.http.get(url);
    }

    getCommittmentsPayentsOverDue(tin) {
        let url =
            this.baseUrl +
            "sap/opu/odata/SAP/ZDSM_TAXPAYER_SRV/PaymentOverdueSet?$filter=Langz eq '" +
            this.lang +
            "' and Gpartz eq '" +
            tin +
            "'&sap-language='" + this.lang + "'&$format=json";
        return this.http.get(url);
    }

    onClickRevokeButton(fbNum) {
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/RevChkSet(Fbnum='" +
            fbNum +
            "')?&sap-language=" + this.lang + "";
        return this.http.get(url);
    }

    sendOtpForRevoke(obj) {
        // const code = "23322";
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/OtpSendCheckSet?$filter=Fbnum eq '" +
            obj.fbNum +
            "' and Code eq '" +
            obj.code +
            "' and Tin eq '" +
            obj.tin +
            "'";
        return this.http.get(url);
    }

    getFinDetails(fbNum) {
        console.log("fbNum", fbNum);
        // const code = "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/FnDtlSet?$filter=Fbnum%20eq%20%2785000000692%27%20and%20Lang%20eq%20%27EN%27";
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/FnDtlSet?$filter=Fbnum eq '" +
            fbNum +
            "' and Lang eq '" +
            this.lang +
            "'";
        return this.http.get(url);
    }

    getReasons(taxTy) {
        // console.log('fbNum', fbNum);
        // const code = "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/FnDtlSet?$filter=Fbnum%20eq%20%2785000000692%27%20and%20Lang%20eq%20%27EN%27";
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_UH_SRV/InsRsnSet?$skip=0&$top=100&$filter=TaxTy eq '" + taxTy + "'&sap-language=" + this.lang + " ";
        return this.http.get(url);
    }

    postInstalmentRequest(postObj) {
        const headers = {
            Accept: "application/json",
            "X-Requested-With": "X",
            ichannel: "243",
        };
        return this.http.post(
            this.baseUrl + "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/iprfhdrSet?sap-language=" + this.lang + "",
            postObj,
            {
                headers,
            }
        );
    }

    // RetGuid='005056B1F8FB1EEABBA4761E08783D01',Flag='N',Dotyp='ZIP2',SchGuid='',Srno=1,Doguid='',AttBy='TP',OutletRef=''
    attachmentSubmit(obj, obj2, file, obj3) {
        const headers = {
            Accept: "application/json",
            "X-Requested-With": "X",
            Slug: file,
        };
        return this.http.post(
            this.baseUrl +
            "/sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachSet(OutletRef='',RetGuid='" +
            obj +
            "',Flag='N',Dotyp='" +
            obj2 +
            "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
            this.lang,
            obj3,
            {
                headers,
            }
        );
    }

    downloadAcknowledgement(fbNum) {
        const requestOptions: Object = {
            /* other options here */
            responseType: "blob",
        };
        return this.http.get(
            this.baseUrl + apiconstants.AckDownload + fbNum + "')/$value?sap-language='" + this.lang + "'",
            requestOptions
        );
    }

    deleteAttachment(RetGuid, Doguid) {
        //console.log('valuesss', obj1);
        const headers = {
            Accept: "application/json",
            "X-Requested-With": "X",
        };

        return this.http.delete(
            this.baseUrl +
            "/sap/opu/odata/SAP/Z_SAVE_ATTACH_SRV/AttachMedSet(OutletRef='',RetGuid='" +
            RetGuid +
            "',Flag='N',Dotyp='',SchGuid='',Srno=1,Doguid='" +
            Doguid +
            "',AttBy='TP')/$value?&sap-language=" + this.lang + "",
            { headers }
        );
    }

    getFrequencies() {
        let url =
            this.baseUrl +
            "/sap/opu/odata/SAP/ZDP_IPRF_UH_SRV/PayFQSet?skip=0&$top=100&$format=json&sap-language=" + this.lang + "";
        return this.http.get(url);
    }

    downloadForm(fbNum) {
        const requestOptions: Object = {
            /* other options here */
            responseType: "blob",
        };
        return this.http.get(
            this.baseUrl + "/sap/opu/odata/SAP/ZDP_IPRF_M_SRV/cover_formSet(Fbnum='" + fbNum + "')/$value",
            requestOptions
        );
    }

    userFillApi(obj) {
        const url = this.baseUrl + "/sap/opu/odata/SAP/ZDP_IPRF_WI_SRV/UserFillSet(Euser1='',Fbguid='',Fbtyp='',Fbnum='" + obj.fbNum + "',Gpart='" + this.tin + "',Lang='" + this.lang + "',Persl='',Status='" + obj.status + "',TaxOffUid='')"
        return this.http.get(url);
    }
}
