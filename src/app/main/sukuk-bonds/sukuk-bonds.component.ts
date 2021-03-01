import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CalendarComponent } from "src/app/constants/calendar.component";

import {
  sukukBondsConstants,
  ApiConstants,
} from "src/app/constants/sukuk-bonds-constants";
import { SukukBondsService } from "src/app/services/sukuk-bonds.service";
import { NotifierService } from "angular-notifier";
import { CommonValidation } from "src/app/constants/commonValidations";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

declare var $: any;
@Component({
  selector: "app-sukuk-bonds",
  templateUrl: "./sukuk-bonds.component.html",
  styleUrls: ["./sukuk-bonds.component.css"],
})
export class SukukBondsComponent implements OnInit, OnDestroy {
  lang: any = sukukBondsConstants.eng;
  headerComponent = CalendarComponent;
  optionActive = 1;
  bondsSubmitted = false;
  isActive = 0;
  showMe: boolean = false;
  open: boolean = true;
  infoOpen = true;
  data;
  requestDetails: any;
  ibanNumber = new FormControl(null, [Validators.required]);
  accountDetails: any;
  isResSuccess = false;
  sukukBondName: any = [];
  investmentDetails: any = [];
  instructionsAccepted = false;
  years: any = [];
  closedInvestment = [];
  closedInvestmentSummary = [];
  certificatesAttachments: any = [];
  tadawulAttachments: any = [];
  otherAttachments: any = [];
  overAllInfo: any;
  selectedYear = new FormControl("");
  retGuid = null;
  ibanAccount = null;
  ibanLinkedType = new FormControl(null, [Validators.required]);
  ibanLinkedText = null;
  ibanLinkedNumber = new FormControl(null, [Validators.required]);
  formTwoAccepted = false;
  addIban = false;
  newIban = new FormControl(null, [
    Validators.required,
    Validators.maxLength(24),
    Validators.minLength(24),
  ]);
  newIbanApiError = false;
  newIbanError = "";
  ibanList: any = [];
  fbNumz = null;
  ninNumber = null;
  form1Validation: boolean = false;
  zakatBaseAfterDeduction = 0.0;
  refundableCIT = 0.0;
  refundableZakat = 0.0;
  paramSubscription: Subscription = null;
  existingApplication = false;
  baseurl = environment.url;

  constructor(
    private _formBuilder: FormBuilder,
    public sukukBondsService: SukukBondsService,
    public notifierService: NotifierService,
    public commonValidations: CommonValidation,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = sukukBondsConstants.arb;
    }
    this.getModal("sukukBondsCard");

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      if (params.period) {
        this.selectedYear.setValue(params.period);
        this.existingApplication = true;
      }
    });

    // this.getRefundDetails();

    this.getEncryptedTins();

    // this.getInitialData();

    // this.getFormFourData();

    // this.getYearSelection(selectedYear);

    // this.postDetails();

    // this.notifierService.notify('info', 'this is a info message');
    // this.notifierService.notify('warning', 'this is a info message');
    // this.notifierService.notify('success', 'this is a info message');
    // this.notifierService.notify('error', 'this is a info message');
  }

  getInitialData() {
    this.sukukBondsService.getInitialData(this.selectedYear.value).subscribe(
      (res: any) => {
        console.log(res);
        this.overAllInfo = res;

        this.requestDetails = res["d"];
        this.sukukBondName = res["d"]["BondsSet"]["results"];
        this.investmentDetails = res["d"]["InvestmentsSet"]["results"];
        if (this.existingApplication) {
          this.ibanNumber.setValue(res?.d.Iban);
          this.ibanLinkedNumber.setValue(res?.d.Idnumber);
          this.ibanLinkedType.setValue(res?.d.Type);
          this.ninNumber = res?.d.NinNumber;
          this.zakatBaseAfterDeduction =
            this.requestDetails?.SbForm11 !== "X"
              ? parseFloat(res?.d.ZkatBaseAded)
              : 0.0;
          this.refundableCIT = parseFloat(res?.d.RefCit);
          this.refundableZakat =
            this.requestDetails?.SbForm11 !== "X"
              ? parseFloat(res?.d.RefZakt)
              : 0.0;
          if (res?.d.Fbnumz !== "") {
            this.optionActive = 4;
          }
          const attachmentSet = res?.d.attachmentsSet.results
            ? res?.d.attachmentsSet.results
            : [];
          for (let i = 0; i < attachmentSet.length; i++) {
            const docType = attachmentSet[i]["Dotyp"];
            if (docType === "ZSBA") {
              this.certificatesAttachments.push(attachmentSet[i]);
            } else if (docType === "ZSBB") {
              this.tadawulAttachments.push(attachmentSet[i]);
            } else if (docType === "ZSBC") {
              this.otherAttachments.push(attachmentSet[i]);
            }
          }
        }
        this.getFormTwoData(res["d"]["Statusz"], res["d"]["Fbnumz"]);
        this.isResSuccess = true;
        this.retGuid = res["d"]["ReturnIdz"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleInformationBox() {
    this.showMe = true;
  }

  openClose() {
    this.open = !this.open;
  }

  infoOpenClose() {
    this.infoOpen = !this.infoOpen;
  }

  goToStep(step) {
    this.optionActive = step;
  }

  getUrl(fbnum) {
    if (fbnum) {
      return (
        this.baseurl +
        ApiConstants.downloadForm +
        "cover_formSet(Fbnum='" +
        fbnum +
        "')/$value"
      );
    } else {
      return "";
    }
  }

  toggleInvestmentDropdown(index) {
    let investmentIndex = this.closedInvestment.indexOf(index);

    if (investmentIndex > -1) {
      this.closedInvestment.splice(investmentIndex, 1);
    } else {
      this.closedInvestment.push(index);
    }
  }

  toggleInvestmentDropdownSummary(index) {
    let investmentIndex = this.closedInvestmentSummary.indexOf(index);

    if (investmentIndex > -1) {
      this.closedInvestmentSummary.splice(investmentIndex, 1);
    } else {
      this.closedInvestmentSummary.push(index);
    }
  }

  deleteInvestmentDetail(index) {
    let investmentIndex = this.closedInvestment.indexOf(index);

    if (investmentIndex > -1) {
      this.closedInvestment.splice(investmentIndex, 1);
    }
    this.investmentDetails.splice(index, 1);
  }

  getFormTwoData(status, fbnum) {
    this.sukukBondsService.getFormTwoData(status, fbnum).subscribe(
      (res) => {
        console.log(res);

        // this.ibanNumber = res["d"]["BankDetSet"]["results"][0];
        this.ibanList = res["d"]["BankDetSet"]["results"];
        this.accountDetails = res["d"]["IDTypeSet"]["results"];

        this.data = res;
        this.isResSuccess = true;
        if (this.existingApplication && this.requestDetails?.Fbnumz !== "") {
          this.onLinkedIdNumberChanged();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFormFourData() {
    this.sukukBondsService.getFormFourData().subscribe(
      (res) => {
        console.log(res);

        this.data = res;
        this.isResSuccess = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getRefundDetails() {
    this.sukukBondsService.getRefundDetails().subscribe(
      (res) => {
        console.log(res);

        this.data = res;
        this.isResSuccess = true;
        this.years = res["d"]["YearSetSet"]["results"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getYearSelection(year) {
    this.showMe = false;
    //  this.selectedYear;
    console.log(year);
    this.sukukBondsService.getYearSelection(year).subscribe(
      (res) => {
        console.log(res);

        // this.data = res;
        this.isResSuccess = true;
        this.toggleInformationBox();
        this.getInitialData();
      },
      (error) => {
        console.log(error);
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

  getEncryptedTins() {
    this.sukukBondsService.getEncryptedTins().subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("euser1", res["d"]["Val1"]);
        localStorage.setItem("euser2", res["d"]["Val2"]);
        localStorage.setItem("euser3", res["d"]["Val3"]);
        localStorage.setItem("euser4", res["d"]["Val4"]);
        localStorage.setItem("euser5", res["d"]["Val5"]);
        this.getDashboardData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDashboardData() {
    this.sukukBondsService.getDashboardData().subscribe(
      (res) => {
        console.log(res);

        localStorage.setItem("euser", res["d"]["Euser"]);
        localStorage.setItem("fbguid", res["d"]["Fbguid"]);

        this.getRefundDetails();
        if (this.selectedYear.value) {
          this.toggleInformationBox();
          this.getInitialData();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTotalInv() {
    let totalInv = 0.0;
    for (let i = 0; i < this.investmentDetails.length; i++) {
      totalInv += parseFloat(
        parseFloat(
          this.investmentDetails[i]["InvValue"]
            ? this.investmentDetails[i]["InvValue"]
            : 0
        ).toFixed(2)
      );
    }
    return totalInv;
  }

  getTotalReturn() {
    let totalReturn = 0.0;
    for (let i = 0; i < this.investmentDetails.length; i++) {
      totalReturn += parseFloat(
        parseFloat(
          this.investmentDetails[i]["InvReturn"]
            ? this.investmentDetails[i]["InvReturn"]
            : 0
        ).toFixed(2)
      );
    }
    return totalReturn;
  }

  addInvestmentDetails() {
    this.investmentDetails = [
      ...this.investmentDetails,
      {
        BondNo: "",
        DataVersion: "00000",
        DelFlg: "",
        Fbnum: "",
        FormGuid: "",
        InvReturn: "0.00",
        InvValue: "0.00",
        LineNo: 0,
        RankingOrder: "00",
        ReturnId: "",
        TimestampCh: null,
        TimestampCr: null,
        Waers: "",
      },
    ];
  }

  postDetails() {
    console.log("Trying to post a user");
    console.log(this.overAllInfo);
    this.overAllInfo.d.AgreeFg = this.instructionsAccepted ? "X" : "";
    this.overAllInfo.d.IbanCheckbox = this.addIban ? "X" : "";
    this.overAllInfo.d.InvestmentsSet = this.investmentDetails;
    this.overAllInfo.d.TotInv = this.getTotalInv().toString();
    this.overAllInfo.d.TotReturn = this.getTotalReturn().toString();
    this.overAllInfo.d.ZkatBaseAded = this.zakatBaseAfterDeduction.toString();
    this.overAllInfo.d.RefCit = this.refundableCIT.toString();
    this.overAllInfo.d.RefZakt = this.refundableZakat.toString();
    this.overAllInfo.d.OfficerRefund = this.zakatBaseAfterDeduction.toString();
    this.overAllInfo.d.OfficerRefCit = this.refundableCIT.toString();
    this.overAllInfo.d.OfficerRefZakt = this.refundableZakat.toString();
    const creditAmount =
      parseFloat(this.refundableCIT.toString()) +
      parseFloat(this.refundableZakat.toString());
    this.overAllInfo.d.CreAmount = creditAmount.toString();
    this.overAllInfo.d.NinNumber = this.ninNumber;
    this.overAllInfo.d.Iban = this.addIban
      ? this.newIban["value"]
      : this.ibanNumber.value;
    this.overAllInfo.d.Type = this.ibanLinkedType.value;
    this.overAllInfo.d.Idnumber = this.ibanLinkedNumber.value;
    this.overAllInfo.d.BondsSet = [];
    // this.overAllInfo.d.attachmentsSet['results'] = [...this.certificatesAttachments, ...this.tadawulAttachments, ...this.otherAttachments];
    this.overAllInfo.d.attachmentsSet = [];
    this.overAllInfo.d.Operationz = "01";
    this.overAllInfo.d.ConfFg = this.formTwoAccepted ? "X" : "";
    // this.overAllInfo.d.Fbguidz = localStorage.getItem("fbguid");
    // this.overAllInfo.d.Euserz = localStorage.getItem("euser");
    console.log(this.overAllInfo);
    this.sukukBondsService.postDetails(this.overAllInfo).subscribe(
      (res) => {
        console.log(res);
        this.bondsSubmitted = true;
        this.fbNumz = res["d"]["Fbnumz"];
      },
      (error) => {
        console.log(error);
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

  isPdf(fileName) {
    const parseExt = fileName.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    return fileExt.toLowerCase() === "pdf";
  }

  uploadFiles(files, attType) {
    files = [...files];
    console.log(files);
    switch (attType) {
      case "ZSBA":
        console.log(document.getElementById("accountantCertification"));
        document.getElementById("accountantCertification")["value"] = "";
        break;
      case "ZSBB":
        console.log(document.getElementById("accountantCertification"));
        document.getElementById("accountStatement")["value"] = "";
        break;
      case "ZSBC":
        console.log(document.getElementById("accountantCertification"));
        document.getElementById("otherDocuments")["value"] = "";
        break;
    }
    const formData = new FormData();
    let filename;
    for (var i = 0; i < 1; i++) {
      filename = files[i]["name"];
      const parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();
      console.log(fileExt);
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
        return false;
      }
      if (files[i]["size"] === 0) {
        this.notifierService.notify("error", this.lang["zeroFilesizeMessage"]);
        return false;
      }
      if (files[i]["size"] > 10485760) {
        this.notifierService.notify("error", this.lang["filesizeMessage"]);
        return false;
      }
      if (attType === "ZSBA") {
        if (this.certificatesAttachments.length === 10) {
          this.notifierService.notify("error", this.lang["maxNoOfFiles"]);
          return false;
        }
        const fileIndex = this.certificatesAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.lang["fileAlreayExists"]);
          return false;
        }
      } else if (attType === "ZSBB") {
        if (this.tadawulAttachments.length === 10) {
          this.notifierService.notify("error", this.lang["maxNoOfFiles"]);
          return false;
        }
        const fileIndex = this.tadawulAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.lang["fileAlreayExists"]);
          return false;
        }
      } else if (attType === "ZSBC") {
        if (this.otherAttachments.length === 10) {
          this.notifierService.notify("error", this.lang["maxNoOfFiles"]);
          return false;
        }
        const fileIndex = this.otherAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.lang["fileAlreayExists"]);
          return false;
        }
      }
      formData.append("fileUpload", files[i]);
    }
    this.sukukBondsService
      .uploadFiles(formData, attType, filename, this.retGuid)
      .subscribe(
        (res) => {
          console.log(res);
          this.appendFile(res["d"], attType);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  appendFile(file, attType) {
    if (attType === "ZSBA") {
      this.certificatesAttachments.push(file);
    } else if (attType === "ZSBB") {
      this.tadawulAttachments.push(file);
    } else if (attType === "ZSBC") {
      this.otherAttachments.push(file);
    }
  }

  deleteAttachment(attType, doguid, index) {
    this.sukukBondsService.deleteAttachment(attType, doguid).subscribe(
      (res) => {
        console.log(res);
        this.removeFile(attType, index);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeFile(attType, index) {
    if (attType === "ZSBA") {
      this.certificatesAttachments.splice(index, 1);
    } else if (attType === "ZSBB") {
      this.tadawulAttachments.splice(index, 1);
    } else if (attType === "ZSBC") {
      this.otherAttachments.splice(index, 1);
    }
  }

  onLinkedIdNumberChanged() {
    const ibandIndex = this.accountDetails.findIndex(
      (account) => account["Type"] === this.ibanLinkedType.value
    );
    this.ibanLinkedNumber.setValue(this.accountDetails[ibandIndex]["Idnumber"]);
    this.ibanLinkedText = this.accountDetails[ibandIndex]["Text"];
    console.log(this.accountDetails);
  }

  getBondSetData(bondNo) {
    return this.sukukBondName[
      this.sukukBondName.findIndex((bond) => bond["SrNo"] === bondNo)
    ]["Zdesc"];
  }

  onSubmit() {
    this.form1Validation = false;

    let validation = false;

    if (this.ninNumber) {
      this.investmentDetails.map((investment) => {
        if (
          investment.BondNo &&
          investment.InvValue > 0 &&
          investment.InvReturn > 0
        ) {
          validation = true;
        } else {
          validation = false;
        }
      });
    }

    if (validation) {
      this.optionActive = 2;
    } else {
      this.form1Validation = true;
    }
  }

  onSubmit2() {
    this.optionActive = 3;
  }

  onSubmit3() {
    this.optionActive = 4;
  }

  onSubmit4() {
    // this.bondsSubmitted = true;
    this.postDetails();
  }

  onSubmit5() {
    this.optionActive = 6;
  }

  back() {
    if (
      (this.existingApplication && this.requestDetails?.Fbnumz !== "") ||
      this.optionActive === 1
    ) {
      this.router.navigate(["/mains/refundslanding"]);
    } else if (this.optionActive > 1) this.optionActive--;
  }

  refundsRedirect() {
    this.router.navigate(["/mains/refundslanding"]);
  }

  dashboardRedirect() {
    this.router.navigate(["/mains/dashboard"]);
  }

  // card modal opening and closing

  getModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "sukukBondsCard") {
      this.isActive = 1;
      $("#sukukBondsCard").modal("show");
    }
  }

  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "sukukBondsCard") {
      if (this.instructionsAccepted) {
        $("#sukukBondsCard").modal("toggle");
      } else {
        $("#sukukBondsCard").modal("toggle");
        this.router.navigate(["/mains/refundslanding"]);
      }
    }
  }

  spaceValidator = (event: any) => {
    let value = event.target.value.split(" ");
    event.target.value = value.join("");
    let ibanValid = this.commonValidations.validateibn(event.target.value);
    this.newIbanError = ibanValid["msg"];
    this.newIbanApiError = false;
    console.log(ibanValid);
    if (!ibanValid.flag) {
      this.sukukBondsService.validateIban(event.target.value).subscribe(
        (respnse) => {
          this.newIbanApiError = false;
          console.log(respnse);
        },
        (error) => {
          console.log(error);
          this.newIbanApiError = true;
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
  };

  validateNumbers() {
    for (let i = 0; i < this.investmentDetails.length; i++) {
      const investment = this.investmentDetails[i];
      if (investment.InvValue) {
        investment.InvValue = parseFloat(investment.InvValue).toFixed(2);
      } else {
        investment.InvValue = parseFloat("0.00").toFixed(2);
      }
      if (investment.InvReturn) {
        investment.InvReturn = parseFloat(investment.InvReturn).toFixed(2);
      } else {
        investment.InvReturn = parseFloat("0.00").toFixed(2);
      }
      this.investmentDetails[i] = investment;
    }
  }

  /* To calculate Zakat Base After Deduction */
  generateZakatBaseAfterDeduction() {
    if (this.requestDetails?.SbForm11 !== "X") {
      let calculatedAmount =
        this.requestDetails?.ZkatBaseBded - this.getTotalInv();
      if (calculatedAmount <= this.requestDetails?.MinZkatBase) {
        this.zakatBaseAfterDeduction = this.requestDetails?.MinZkatBase;
      } else {
        this.zakatBaseAfterDeduction = calculatedAmount;
      }
    }

    if (
      this.requestDetails?.TaxpayerTp === "M" ||
      this.requestDetails?.TaxpayerTp === "F"
    ) {
      this.generateRefundableCIT();
    }
    if (
      (this.requestDetails?.TaxpayerTp === "M" ||
        this.requestDetails?.TaxpayerTp === "S") &&
      this.requestDetails?.SbForm11 !== "X"
    ) {
      this.generateRefundableZakat();
    }
  }

  /* To calculate Refundable CIT */
  generateRefundableCIT() {
    if (this.requestDetails?.SumTaxdiff > 0) {
      const totalReturn = this.getTotalReturn();
      const calculatedCIT =
        (this.requestDetails?.CitNetProfit / this.requestDetails?.TotProfit) *
        totalReturn *
        (this.requestDetails?.NssaudiSharePrft / 100) *
        (20 / 100);
      this.refundableCIT =
        calculatedCIT <= this.requestDetails?.CitBdiff
          ? calculatedCIT.toFixed(2)
          : this.requestDetails?.CitBdiff;
    }
  }

  /* To calculate Refundable Zakat */
  generateRefundableZakat() {
    const totalReturn = this.getTotalReturn();
    if (
      this.requestDetails?.ZkatBaseBded <= this.requestDetails?.MinZkatBase &&
      this.zakatBaseAfterDeduction <= this.requestDetails?.MinZkatBase
    ) {
      const calculatedZakat =
        (this.requestDetails?.ZkatNetProfit / this.requestDetails?.TotProfit) *
        totalReturn *
        (this.requestDetails?.SaudiSharePrft / 100) *
        this.requestDetails?.ZakatPercen;
      this.refundableZakat =
        calculatedZakat <= this.requestDetails?.ZkatBdiff
          ? calculatedZakat.toFixed(2)
          : this.requestDetails?.ZkatBdiff;
    } else if (
      this.requestDetails?.ZkatBaseBded > this.requestDetails?.MinZkatBase &&
      this.zakatBaseAfterDeduction <= this.requestDetails?.MinZkatBase
    ) {
      const calculatedZakat =
        (this.requestDetails?.ZkatBaseBded -
          this.zakatBaseAfterDeduction *
            (this.requestDetails?.SaudiShareCaptl / 100) -
          (this.requestDetails?.ZkatNetProfit /
            this.requestDetails?.TotProfit) *
            totalReturn *
            (this.requestDetails?.SaudiSharePrft / 100)) *
        this.requestDetails?.ZakatPercen;
      this.refundableZakat =
        calculatedZakat <= this.requestDetails?.ZkatBdiff
          ? calculatedZakat.toFixed(2)
          : this.requestDetails?.ZkatBdiff;
    } else if (
      this.requestDetails?.ZkatBaseBded > this.requestDetails?.MinZkatBase &&
      this.zakatBaseAfterDeduction > this.requestDetails?.MinZkatBase
    ) {
      const calculatedZakat =
        (this.requestDetails?.ZkatBaseBded - this.zakatBaseAfterDeduction) *
        this.requestDetails?.ZakatPercen;
      this.refundableZakat =
        calculatedZakat <= this.requestDetails?.ZkatBdiff
          ? calculatedZakat.toFixed(2)
          : this.requestDetails?.ZkatBdiff;
    }
  }

  bc2Click() {
    if (!this.existingApplication || this.requestDetails?.Fbnumz === "") {
      this.router.navigate(["/mains/refundslanding/sukuk"]);
    }
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
