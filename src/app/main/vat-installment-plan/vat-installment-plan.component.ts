import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import {
  VatInstallmentPlanConstant,
  ApiConstants,
} from "src/app/constants/vatInstallmentPlanConstants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import { environment } from "src/environments/environment";
import { CommonValidation } from "src/app/constants/commonValidations";
import { VatInstallmentPlanService } from "src/app/services/vat-installment-plan.service";
import * as moment from "moment";
import { LoaderService } from "../../loader/loader.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SchPlanModal } from "./sch-plan.dialog";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard-service";
import { Subscription } from "rxjs";

declare var $: any;
const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
// const nonWhitespaceRegExp: RegExp = new RegExp("^[^.\\s]");
let maxLength = 132;

@Component({
  selector: "app-vat-installment-plan",
  templateUrl: "./vat-installment-plan.component.html",
  styleUrls: ["./vat-installment-plan.component.css"],
})
export class VatInstallmentPlanComponent implements OnInit, OnDestroy {
  headerComponent = CalendarComponent;
  baseUrl = environment.url;
  lang: any = VatInstallmentPlanConstant.eng;
  langX: String;
  langSingle: String;
  isAgree = false;
  showSuccess = false;
  optionActive = 0;
  data = {};
  showApp = false;
  highlightedBatch = [];
  selectedTotAmount: number = 0;
  sliderDisabled = false;
  periodicInstall: number = 0;
  gridsize: any = 2;
  planData = {};
  postData = {};
  installmentPlanGenerated = false;
  submitData = {};
  currentDate;

  fg1: FormGroup;
  fg2: FormGroup;
  fg3: FormGroup;
  fg4: FormGroup;
  fg5: FormGroup;
  instructionSubmitted = false;
  formSubmit = false;
  installmentSchedule: any = [];
  queryParamSubscription: Subscription = null;
  fbStatus = null;
  fbNum = null;
  euser = null;
  fbguid = null;
  isDeclarationAgreed = false;
  opbel = "";
  installmentAgreementNum = "";
  scheduleInstallmentPlan = [];

  constructor(
    private _formBuilder: FormBuilder,
    public loaderService: LoaderService,
    public service: VatInstallmentPlanService,
    private http: HttpClient,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    private modalService: NgbModal,
    public router: Router,
    public dashboardService: DashboardService,
    public route: ActivatedRoute
  ) {
    if (localStorage.getItem("lang") === "ar") {
      this.langX = "AR";
      this.langSingle = "A";
    } else {
      this.langX = "EN";
      this.langSingle = "E";
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = VatInstallmentPlanConstant.arb;
    }

    this.currentDate = moment(new Date()).locale("en-us").format("DD/MM/YYYY");
    this.initData();
    this.queryParamSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        console.log(params);
        this.fbNum = params.fbNum ? params.fbNum : null;
        this.fbStatus = params.fbStatus ? params.fbStatus : null;
        this.showLoader();
        this.dashboardService.getDashboardData$().subscribe(
          (res: any) => {
            this.hideLoader();
            console.log(res);
            if (res?.d.Euser) {
              this.euser = res?.d.Euser ? res.d.Euser : null;
              this.fbguid = res?.d.Fbguid ? res.d.Fbguid : null;
              if (this.fbNum) {
                this.getExistingData();
              } else {
                // $("#terms").modal("show");
                this.getInitialData();
              }
            }
          },
          (error) => {
            this.hideLoader();
          }
        );
      }
    );
  }

  initData() {
    this.fg1 = this._formBuilder.group({
      check1: ["", Validators.requiredTrue],
    });

    this.fg2 = this._formBuilder.group({});

    this.fg3 = this._formBuilder.group({
      selectFreq: [true, Validators.requiredTrue],
      gridsize: [this.gridsize, Validators.required],
      gridsize2: ["", Validators.required],
    });

    this.fg4 = this._formBuilder.group({
      docType: [""],
      doc: this._formBuilder.array([]),
    });

    console.log(this.fg4.get("doc"));

    this.fg5 = this._formBuilder.group({});
  }

  onSubmit() {
    this.formSubmit = true;
    if (this.fg1.valid) {
      const vatDetails = this.data["VTIASet"]["results"];
      for (let i = 0; i < vatDetails.length; i++) {
        if (vatDetails[i].Xsele === "X") {
          this.highlightedBatch.push(vatDetails[i]);
          this.selectedTotAmount += Number(vatDetails[i].Betrh);
        }
      }

      this.formSubmit = false;
      this.optionActive = 2;
    }
  }

  onSubmit2() {
    console.log("onSubmit2");
    console.log(this.highlightedBatch.length);
    this.formSubmit = true;
    if (this.highlightedBatch.length > 0) {
      this.formSubmit = false;
      this.optionActive = 3;
    }
  }

  onSubmit3() {
    this.formSubmit = true;
    if (this.installmentPlanGenerated) {
      this.formSubmit = false;
      this.optionActive = 4;
    }
  }

  onSubmit4() {
    this.optionActive = 5;
  }

  startProcess() {
    this.instructionSubmitted = true;
    if (this.isAgree) {
      this.isAgree = true;
      $("#terms").modal("hide");
    }
  }

  getExistingData() {
    this.showLoader();
    this.service
      .getExistingData(this.euser, this.fbguid, this.fbNum, this.fbStatus)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.hideLoader();
          if (res?.d.Fbguid) {
            this.euser = res?.d.Euser ? res.d.Euser : null;
            this.fbguid = res?.d.Fbguid ? res.d.Fbguid : null;
            this.getInitialData();
          }
        },
        (error) => {
          console.log(error);
          this.hideLoader();
        }
      );
  }

  getInitialData() {
    this.showLoader();
    this.service.getInitialData(this.fbguid, this.euser).subscribe(
      (res: any) => {
        console.log("get InitialData");
        this.data = res["d"];
        this.planData = res["d"];
        this.postData = res["d"];
        this.setAttachment(this.data["ATTACHMENTSet"]["results"]);
        this.hideLoader();
        const vatDetails = this.data["VTIASet"]["results"];
        for (let i = 0; i < vatDetails.length; i++) {
          if (vatDetails[i].Xsele === "X") {
            this.highlightedBatch.push(vatDetails[i]);
            this.selectedTotAmount += Number(vatDetails[i].Betrh);
          }
        }
        this.fg3.controls.gridsize.setValue(parseInt(res?.d.Noofinstallment));
        if (this.fg3.value.gridsize === 0) {
          this.fg3.controls.gridsize.setValue(2);
        }
        if (this.fbNum) {
          this.optionActive = 5;
          this.installmentSchedule = res?.d.VTISSet.results
            ? res?.d.VTISSet.results
            : [];
          if (this.planData["Statusz"] === "E0045") {
            this.getScheduledInstallmentPlan();
          }
        } else {
          $("#terms").modal("show");
          this.optionActive = 1;
        }
        this.showApp = true;
      },
      (error) => {
        this.hideLoader();
        console.log("err in get Initial Data");
        let errorMsg = "";
        if (error?.error?.error?.innererror?.errordetails) {
          const messageArray = error["error"]["error"]["innererror"][
            "errordetails"
          ].map((err) => err.message);
          messageArray.splice(messageArray.length - 1, 1);
          errorMsg = messageArray.join(" ");
        }
        if (errorMsg !== "") {
          this.notifierService.notify("error", errorMsg);
        }
        setTimeout(() => {
          this.router.navigate(["/mains/installmentplan"]);
        }, 5000);
      }
    );
  }

  getScheduledInstallmentPlan() {
    this.showLoader();
    this.service
      .getScheduledInstallmentPlan(this.fbguid, this.euser, this.opbel)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.hideLoader();
          if (this.opbel === "") {
            const opbelSet = res?.d?.VTIA_IAHDSet?.results
              ? res?.d?.VTIA_IAHDSet?.results
              : [];
            let fbIndex = opbelSet.findIndex(
              (opbelItem: any) => opbelItem.Fbnum === this.fbNum
            );
            if (fbIndex > -1) {
              this.opbel = opbelSet[fbIndex]["Opbel"];
              this.installmentAgreementNum = opbelSet[fbIndex]["AgreementNo"];
              this.getScheduledInstallmentPlan();
            }
          } else {
            this.scheduleInstallmentPlan = res?.d?.VTIA_IADTSet?.results
              ? res?.d?.VTIA_IADTSet?.results
              : [];
            console.log(this.scheduleInstallmentPlan);
          }
        },
        (error) => {
          this.hideLoader();
          let errorMsg = "";
          if (error?.error?.error?.innererror?.errordetails) {
            const messageArray = error["error"]["error"]["innererror"][
              "errordetails"
            ].map((err) => err.message);
            messageArray.splice(messageArray.length - 1, 1);
            errorMsg = messageArray.join(" ");
          }
          if (errorMsg !== "") {
            this.notifierService.notify("error", errorMsg);
          }
        }
      );
  }

  selectBills(value) {
    this.showLoader();
    this.installmentPlanGenerated = false;
    this.fg3.controls.gridsize.setValue(2);
    //this.selectedTotAmount = 0;
    // if (value.InvCbDeflt === "X") {
    //   return false;
    // } else {
    if (this.highlightedBatch.indexOf(value) === -1) {
      value.Xsele = "X";
      this.highlightedBatch.push(value);
      this.selectedTotAmount += Number(value.Betrh);
      this.selectedTotAmount = parseFloat(this.selectedTotAmount.toFixed(2));

      console.log(this.selectedTotAmount);
      this.hideLoader();
    } else {
      const _index = this.highlightedBatch.indexOf(value);
      value.Xsele = "";
      this.highlightedBatch.splice(_index, 1);
      this.selectedTotAmount -= Number(value.Betrh);
      this.selectedTotAmount = parseFloat(this.selectedTotAmount.toFixed(2));
      this.hideLoader();
      console.log(this.selectedTotAmount);
    }
    // }
  }

  updateSetting(event) {
    this.installmentPlanGenerated = false;
    this.updateInstallment("1");
  }

  updateInstallment(value) {
    console.log("valueeeeeeeeeee", value);
    // this.periodicInstall = Number(
    //   (Number(this.maxInstall) - value) / this.selectedFrequency
    // );
  }

  generateSch() {
    this.showLoader();

    console.log(this.selectedTotAmount);

    console.log(this.selectedTotAmount.toString());

    let gridsize = this.fg3.controls.gridsize.value.toString();

    this.postData["Noofinstallment"] = ("0" + gridsize).slice(-2);
    this.postData["Operationz"] = "10";
    this.postData["Xstep1Conf"] = "1";
    this.postData["Xstep2Conf"] = "1";
    this.postData["Totliablityamt"] = this.selectedTotAmount.toString();
    this.postData["StepNumberz"] = "3";

    this.service.submitData(this.postData).subscribe(
      (res: any) => {
        this.planData = res["d"];
        this.hideLoader();
        this.installmentPlanGenerated = true;
        this.installmentSchedule = res?.d.VTISSet.results
          ? res?.d.VTISSet.results
          : [];
        this.displayInstallmentSchedule();
      },
      (err) => {
        this.hideLoader();
        console.log("err");
      }
    );
  }

  displayInstallmentSchedule() {
    const modalRef = this.modalService.open(SchPlanModal, {
      size: "lg",
    });
    modalRef.componentInstance.data = this.installmentSchedule;
  }

  displayAgreementSchedulePlan() {
    const modalRef = this.modalService.open(SchPlanModal, {
      size: "lg",
    });
    modalRef.componentInstance.installmentAgreementNum = this.installmentAgreementNum;
    modalRef.componentInstance.data = this.scheduleInstallmentPlan;
  }

  initiateConditionsModal() {
    $("#conditions").modal("show");
  }

  preSubmitRequest() {
    this.formSubmit = true;
    if (this.isDeclarationAgreed) {
      this.formSubmit = false;
      $("#conditions").modal("hide");
      this.submitRequest();
    }
  }

  submitRequest() {
    this.showLoader();
    let submitData = this.planData;
    console.log(this.selectedTotAmount);

    console.log(this.selectedTotAmount.toString());

    let Operationz = this.planData["Statusz"] === "E0044" ? "07" : "01";
    let gridsize = this.fg3.controls.gridsize.value.toString();

    submitData["Noofinstallment"] = ("0" + gridsize).slice(-2);
    submitData["Operationz"] = Operationz;
    submitData["Xstep1Conf"] = "1";
    submitData["Xstep2Conf"] = "1";
    submitData["Totliablityamt"] = this.selectedTotAmount.toString();
    submitData["StepNumberz"] = "4";
    submitData["Decflg"] = "1";

    this.service.submitData(submitData).subscribe(
      (res) => {
        console.log(res);
        this.showSuccess = true;
        this.submitData = res["d"];
        this.hideLoader();
      },
      (err) => {
        this.hideLoader();
        console.log("err");
      }
    );
  }

  setAttachment(value) {
    let control = <FormArray>this.fg4.controls.doc;
    for (var i = 0; i < value.length; i++) {
      control.push(
        this._formBuilder.group({
          ext: value[i]["FileExtn"].toLowerCase(),
          id: value[i].Dotyp,
          name: value[i].Filename,
          url: value[i].DocUrl,
          flag: true,
          did: value[i].Doguid,
        })
      );
    }
    console.log(control.value);
  }

  uploadFile(res, fileSize) {
    let obj = {
      name: res["d"]["Filename"],
      size: fileSize,
      id: "ZVTA",
      flag: true,
      url: res["d"]["DocUrl"],
      did: res["d"]["Doguid"],
    };

    let control = <FormArray>this.fg4.controls.doc;

    control.push(this._formBuilder.group(obj));

    console.log(this.fg4.controls.doc);
  }

  uploadFiles(e) {
    this.showLoader();

    if (e[0].size == 0) {
      this.hideLoader();
      this.notifierService.notify("error", this.lang.Invalidfilesize);
      return;
    }

    let control = <FormArray>this.fg4.controls.doc;
    const frmData = new FormData();
    let filename;
    let size;
    let encodedFileName = "";

    for (var i = 0; i < 1; i++) {
      console.log(e[i]);
      if (e[i] == undefined) {
        this.hideLoader();
        return false;
      }
      filename = e[i]["name"];
      const parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();
      parseExt.splice(parseExt.length - 1, 1);
      encodedFileName = encodeURI(parseExt.join(".")) + "." + fileExt;
      console.log(encodedFileName);

      if (filename.length > 100) {
        this.notifierService.notify("error", this.lang["fileNameLarge"]);
        this.hideLoader();

        return false;
      }

      if (
        fileExt !== "doc" &&
        fileExt !== "docx" &&
        fileExt !== "jpeg" &&
        fileExt !== "jpg" &&
        fileExt !== "pdf" &&
        fileExt !== "xls" &&
        fileExt !== "xlsx"
      ) {
        this.notifierService.notify("error", this.lang["invalidFormat"]);
        this.hideLoader();

        return false;
      }
      if (e[i]["size"] > 5242880) {
        this.notifierService.notify("error", this.lang["filesizeMessage"]);
        this.hideLoader();

        return false;
      }
      console.log(control.value);
      const fileIndex = control.value.findIndex(
        (file) => filename === file["name"]
      );
      if (fileIndex > -1) {
        this.notifierService.notify("error", this.lang["fileAlreayExists"]);
        this.hideLoader();

        return false;
      }

      size = e[i].size / 10000;
      frmData.append("fileUpload", e[i]);
    }
    console.log("res", filename, e[i]);
    console.log(control);
    // console.log(idd);

    this.service
      .attachmentSubmit(
        this.data["ReturnIdz"],
        // control.controls[idd].value.id,
        "ZVTA",
        encodedFileName,
        frmData
      )
      .subscribe(
        (res) => {
          console.log("upload", res);

          this.uploadFile(res, size);
          this.hideLoader();
          // control.controls[idd]["controls"].name.setValue(filename);

          //control.controls[idd].value.id
          // this.notifierService.notify(
          //   "success",
          //   "Successfully uploaded the file"
          // );
        },
        (err) => {
          this.hideLoader();
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0].message
          );
        }
      );
  }

  deleteAttachmentFromSer(dotyp, doguid, index) {
    this.service.deleteAttachment(dotyp, doguid).subscribe(
      (res) => {
        console.log("delete", res);
        let control = <FormArray>this.fg4.controls.doc;
        control.removeAt(index);
      },
      (err) => {
        console.log("err in delete attachement");
      }
    );
  }

  getControls() {
    let control = <FormArray>this.fg4.controls.doc;
    return control.value;
  }

  getFormattedAmount(amount) {
    if (amount) {
      const floatNumber = parseFloat(amount);
      if (isNaN(floatNumber)) {
        return 0.0;
      } else {
        return floatNumber.toFixed(2);
      }
    } else {
      return 0.0;
    }
  }

  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "terms") {
      this.isAgree = false;
      this.instructionSubmitted = false;
      $("#terms").modal("toggle");
      this.router.navigate(["/mains/installmentplan"]);
    } else if (cardType === "conditions") {
      this.isDeclarationAgreed = false;
      this.formSubmit = false;
      $("#conditions").modal("hide");
    }

    // if (cardType === "filter") {

    //   $("#filter").modal("toggle");
    // }
  }

  back() {
    if (this.fbNum === null) {
      this.formSubmit = false;
      if (this.optionActive >= 1) this.optionActive--;

      if (this.optionActive == 0) {
        this.router.navigate(["/mains/installmentplan"]);
      }
    } else {
      this.router.navigate(["/mains/installmentplan"]);
    }
  }

  downloadAck() {
    // /sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='90000000231')/$value
    const url = `sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='${this.submitData["Fbnumz"]}')/$value`;

    console.log(this.baseUrl + url);
    window.open(this.baseUrl + url, "_self");
  }

  step(stepToDisplay) {
    this.optionActive = stepToDisplay;
  }

  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }

  ngOnDestroy() {
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }
}
