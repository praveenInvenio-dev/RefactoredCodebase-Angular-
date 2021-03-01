import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { CalendarComponent } from "src/app/constants/calendar.component";
import {
  WhitelistConstants,
  searchConstants,
  validationList,
  monthConstants,
  hijriMonthConstants,
} from "src/app/constants/whitelist.constant";
import { CommonValidation } from "src/app/constants/commonValidations";
import { idType, transportCategory, whitelistCategories } from "./data";
import { WhitelistingService } from "src/app/services/whitelisting.service";
import { NotifierService } from "angular-notifier";
import { AppService } from "src/app/app.service";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import * as moment from "moment";

declare var $: any;
const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
let maxLength = 132;

@Component({
  selector: "app-new-white-list-request",
  templateUrl: "./new-white-list-request.component.html",
  styleUrls: ["./new-white-list-request.component.scss"],
})
export class NewWhiteListRequestComponent implements OnInit {
  @ViewChild("stepper") private myStepper: MatStepper;
  headerComponent = CalendarComponent;
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  typesOfWhiteListing: any = WhitelistConstants.eng.whitelistingTypes;
  @Input() formBundle: any = null;
  direction = "ltr";
  processActive = 1;
  requestTypeForm: FormGroup;
  businessInformationForm: FormGroup;
  declarationForm: FormGroup;
  CategoryForm: FormGroup;
  dtype: any;
  submitRequestType = "";
  englishMonths = monthConstants.eng;
  arabicMonths = hijriMonthConstants.eng;
  lang = WhitelistConstants.eng;
  searchConstants = searchConstants;
  minDate: any;
  showSubType: boolean;
  public showTab = 1;
  public requestType: any;
  mainAttachments: any = [];
  additionalAttachments: any = [];
  public getFilepath: Map<string, { value: string; path: string }> = new Map();
  public instructionsDeclarationAccepted = false;
  public createdWhitelist = true;
  public WhitelistPath = true;

  public changedStartDate: any;
  public changedEndDate: any;

  public filename: any;
  cardEnable: boolean;
  public categorySelected = false;
  public dependentCategories = [];

  file: any;
  data: any;
  files: any[] = [];
  tin = null;
  crNo = null;
  vatNo = null;
  retGuid = null;
  idMsg = "";
  dobMsg = "";
  id1 = new FormControl("", [Validators.required]);
  dob1 = new FormControl(null, [Validators.required]);
  isIdValidated = false;
  idValidatedName = "";
  idErr1 = false;
  dobErr = false;
  whitelistResponse: any = null;
  cancelWhitelistData: any = null;
  isTransportCategoryValidated = false;
  invalidTransportCategory = "";
  acknowledgement = null;
  displayAcknowledgement = false;
  selectedCancelCategories: any = [];
  cautionAcknowledgement = new FormControl(false);
  public transportCategory = transportCategory;
  public idType = idType;
  public whitelistCategories = whitelistCategories;

  public errorMessages = validationList;
  apiIdMsg = "";
  isExistingApplicationEditable = false;
  statusClass = "tag-partial";
  form2Submitted = false;
  form3Submitted = false;
  form3CancelSubmitted = false;
  form4Submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public commonValid: CommonValidation,
    public whitelistingService: WhitelistingService,
    public notifierService: NotifierService,
    public appSrv: AppService,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>
  ) {
    this.requestType = "New Whitelist Request";
  }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = WhitelistConstants.arb;
      this.typesOfWhiteListing = WhitelistConstants.arb.whitelistingTypes;
      this.englishMonths = monthConstants.arb;
      this.arabicMonths = hijriMonthConstants.arb;
      this.direction = "rtl";
    }
    this.appSrv.data1.subscribe((res) => {
      this.minDate = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(new Date()),
        res
      );
    });
    this.FormInIt();
    if (this.formBundle !== null) {
      this.getExistingData();
    } else {
      this.getInitData(localStorage.getItem("fbguid"), "");
    }
  }

  changesToDate(datePicker: any) {
    datePicker.close();
    this.appSrv.data1.subscribe((res) => {
      this.dtype = res;
      console.log(this.dtype, this.requestTypeForm.value.EndDate);
      if (this.requestTypeForm.value.EndDate !== null) {
        if (this.requestTypeForm.value.EndDate["calendarName"] !== this.dtype) {
          this.requestTypeForm.controls.EndDate.setValue(
            this.commonValid.dateFormate(
              this.requestTypeForm.value.EndDate,
              this.dtype
            )
          );
        }
      }
    });
  }

  changesFromDate(datePicker: any) {
    datePicker.close();
    this.appSrv.data1.subscribe((res) => {
      this.dtype = res;
      console.log(this.dtype, this.requestTypeForm.value.StartDate);
      if (this.requestTypeForm.value.StartDate !== null) {
        if (
          this.requestTypeForm.value.StartDate["calendarName"] !== this.dtype
        ) {
          this.requestTypeForm.controls.StartDate.setValue(
            this.commonValid.dateFormate(
              this.requestTypeForm.value.StartDate,
              this.dtype
            )
          );
        }
      }
    });
  }

  onInputChange() {
    $("#description").on("input focus keydown keyup", function (e) {
      var text = $(this).val();
      var lines = text.split(/(\r\n|\n|\r)/gm);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > maxLength) {
          lines[i] = lines[i].substring(0, maxLength) + "\n";
        }
      }
      $(this).val(lines.join(""));
    });
  }

  onIdSelect() {
    this.isIdValidated = false;
    this.declarationForm.controls.IdentificationNumber.setValue("");
    this.declarationForm.controls.contactPersonName.setValue("");
    this.idValidatedName = "";
    this.id1.reset();
    this.idErr1 = false;
    this.dobErr = false;
    this.dob1.reset();
    this.dob1.setValue(null);
    this.id1.setValue("");
    if (this.declarationForm.value.identityType !== "ZS0003") {
      $("#aftSelect").modal("show");
    }

    // }
  }

  validateTransportCategory() {
    this.isTransportCategoryValidated = false;
    this.invalidTransportCategory = "";
    this.getInitData(
      localStorage.getItem("fbguid"),
      this.requestTypeForm.value.transportCategory
    );
  }

  reset() {
    this.idErr1 = false;
    this.dobErr = false;
    this.isIdValidated = false;
    this.declarationForm.controls.identityType.setValue("");
    this.declarationForm.controls.IdentificationNumber.setValue("");
    this.idValidatedName = "";
  }

  getExistingData() {
    this.whitelistingService.getExistingData(this.formBundle).subscribe(
      (response) => {
        this.getInitData(
          response["d"]["Fbguid"],
          this.formBundle["TransactionType"]
        );
      },
      (error) => {}
    );
  }

  getInitData(fbguid, transactionType) {
    this.whitelistingService.getInitData(fbguid, transactionType).subscribe(
      (response: any) => {
        this.whitelistResponse = response["d"];
        this.tin = response["d"]["Gpart"];
        this.crNo = response["d"]["CrNo"];
        this.vatNo = response["d"]["RegId"];
        this.retGuid = response["d"]["ReturnId"];
        this.isTransportCategoryValidated = true;
        if (this.formBundle !== null || response?.d.Fbnumz !== "") {
          if (response?.d.Statusz) {
            this.isExistingApplicationEditable =
              response.d.Statusz === "IP017" ||
              response.d.Statusz === "E0013" ||
              response.d.Statusz === "E0018";
            const status = response.d.Statusz;
            if (status === "E0045") {
              this.statusClass = "tag-success";
            } else if (status === "E0001" || status === "E0013") {
              this.statusClass = "tag-unsubmit";
            } else if (
              status === "E0018" ||
              status === "E0043" ||
              status === "E0051"
            ) {
              this.statusClass = "tag-danger";
            } else {
              this.statusClass = "tag-partial";
            }
          }
          if (response?.d.DecCb === "X") {
            this.declarationForm.controls.instructionsDeclarationAccepted.setValue(
              true
            );
          }
          this.requestTypeForm.controls.transportCategory.setValue(
            response["d"]["TransType"]
          );
          this.mainAttachments = response["d"]["AttachmentSet"]["results"]
            ? [...response["d"]["AttachmentSet"]["results"]]
            : [];
          let startDate = null;
          if (response?.d.TpFdt) {
            console.log(response?.d.TpFdt);

            if (response.d.TpFdt) {
              startDate = this.commonValid.toJulianDate1(
                new Date(
                  moment(response["d"]["TpFdt"])
                    .locale("en-us")
                    .format("MM-DD-YYYY")
                )
              );
            }
            console.log(startDate);
          }
          this.requestTypeForm.controls.StartDate.setValue(startDate);
          let endDate = null;
          if (response?.d.TpTdt) {
            console.log(response?.d.TpTdt);

            if (response.d.TpTdt) {
              endDate = this.commonValid.toJulianDate1(
                new Date(
                  moment(response["d"]["TpTdt"])
                    .locale("en-us")
                    .format("MM-DD-YYYY")
                )
              );
            }
            console.log(endDate);
          }
          this.requestTypeForm.controls.EndDate.setValue(endDate);
          this.businessInformationForm.controls.textArea.setValue(
            response["d"]["NotesSet"]["results"]["0"]["Strline"]
          );
          this.businessInformationForm.controls.businessWebsite.setValue(
            response["d"]["BusLink"]
          );
          this.businessInformationForm.controls.businessOperation.setValue(
            response["d"]["BusYear"]
          );
          this.declarationForm.controls.identityType.setValue(
            response["d"]["DecidTy"]
          );
          this.declarationForm.controls.IdentificationNumber.setValue(
            response["d"]["DecidNo"]
          );
          this.declarationForm.controls.contactPersonName.setValue(
            response["d"]["CpName"]
          );
          this.idValidatedName = response["d"]["CpName"];
          if (this.formBundle !== null) {
            this.processActive = 5;
          }
        }
      },
      (error) => {
        let errorMsg = "";
        if (error?.error?.error?.innererror?.errordetails) {
          const messageArray = error["error"]["error"]["innererror"][
            "errordetails"
          ].map((err) => err.message);
          messageArray.splice(messageArray.length - 1, 1);
          errorMsg = messageArray.join(" ");
        }
        if (errorMsg !== "") {
          this.invalidTransportCategory = errorMsg;
          this.notifierService.notify("error", errorMsg);
        }
        if (this.formBundle !== null) {
          this.closeForm.emit();
        }
      }
    );
  }

  removeSpace() {
    let splitArray = this.id1.value.split(" ");
    this.id1.setValue(splitArray.join(""));
    this.apiIdMsg = "";
  }

  removeSpace2() {
    let splitArray = this.declarationForm.value.IdentificationNumber.split(" ");
    let combinedString: string = splitArray.join("");
    let constructedId = combinedString.replace(/[^0-9]/g, "");
    this.declarationForm.controls.IdentificationNumber.setValue(constructedId);
    this.declarationForm.controls.contactPersonName.setValue("");
    this.idValidatedName = "";
    this.isIdValidated = false;
  }

  initiateGCCIDValidation() {
    if (this.declarationForm.value.identityType === "ZS0003") {
      if (
        this.declarationForm.value.IdentificationNumber.length >= 8 &&
        this.declarationForm.value.IdentificationNumber.length <= 15
      ) {
        this.validateId(this.declarationForm.value.IdentificationNumber, "");
      }
    }
  }

  validId() {
    if (this.id1.value === "") {
      this.idErr1 = true;
      this.idMsg = this.lang["idMsg"];
      return "";
    } else {
      let idValidation = this.commonValid.IDtypeValidation(
        this.declarationForm.value.identityType,
        this.id1.value
      );
      this.idErr1 = idValidation.flag;
      this.idMsg = idValidation.msg;
      return "";
    }
    this.idErr1 = false;
    this.idMsg = "";
    return "";
  }

  validateID2() {
    this.idMsg = "";
    this.idErr1 = false;
    this.dobMsg = "";
    this.dobErr = false;
    this.apiIdMsg = "";
    if (this.id1.value.length === 0) {
      this.idErr1 = true;
      this.idMsg = this.lang["idMsg"];
    } else {
      let idValidation = this.commonValid.IDtypeValidation(
        this.declarationForm.value.identityType,
        this.id1.value
      );
      this.idErr1 = idValidation.flag;
      this.idMsg = idValidation.msg;
    }
    if (this.dob1.value === null) {
      this.dobErr = true;
      this.dobMsg = this.lang["dobMsg"];
    }
    if (!this.idErr1 && !this.dobErr) {
      let date = "";
      if (this.dob1.value["calendarName"] === "Islamic") {
        const convertedDate = this.commonValid.dateFormate(
          this.dob1.value,
          "Gregorian"
        );
        date = this._dateAdapter.format(convertedDate, "DD-MM-YYYY");
      } else {
        date = this._dateAdapter.format(this.dob1.value, "DD-MM-YYYY");
      }
      const modifiedDate = moment(date, "DD-MM-YYYY")
        .locale("en-us")
        .format("YYYYMMDD");
      this.validateId(this.id1.value, modifiedDate);
    }
  }

  isPdf(fileName) {
    const parseExt = fileName.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    return fileExt.toLowerCase() === "pdf";
  }

  getTransportCategory(transportCategory) {
    const transportCategoryIndex = this.typesOfWhiteListing.findIndex(
      (whitelistingType) => whitelistingType["Fbtyp"] === transportCategory
    );
    return transportCategoryIndex > -1
      ? this.typesOfWhiteListing[transportCategoryIndex]["FbtText"]
      : "";
  }

  getIdentityType(identityType) {
    const idTypeIndex = idType.findIndex((id) => id["Key"] === identityType);
    return idTypeIndex > -1
      ? idType[idTypeIndex]["Text"][this.direction === "ltr" ? "eng" : "arb"]
      : "";
  }

  getFormattedDate(date) {
    let constructedDate = "";
    if (date) {
      const formattedDate = this._dateAdapter.format(date, "DD-MM-YYYY");
      if (date["calendarName"] === "Islamic") {
        if (formattedDate) {
          const splitFormattedDate = formattedDate.split("-");
          let dateSuffix = "th";
          if (splitFormattedDate[0].charAt(1) === "1") {
            dateSuffix = "st";
          } else if (splitFormattedDate[0].charAt(1) === "2") {
            dateSuffix = "nd";
          } else if (splitFormattedDate[0].charAt(1) === "3") {
            dateSuffix = "rd";
          }
          constructedDate = `${splitFormattedDate[0]}${
            this.direction === "rtl" ? "" : dateSuffix
          } ${this.arabicMonths[splitFormattedDate[1]]} ${
            splitFormattedDate[2]
          }`;
        }
      } else if (date["calendarName"] === "Gregorian") {
        if (formattedDate) {
          const momentDate = moment(formattedDate, "DD-MM-YYYY").locale(
            "en-us"
          );
          let zeroAppend = "";
          if (momentDate.format("DD").charAt(0) === "0") {
            zeroAppend = "0";
          }
          constructedDate = `${this.direction === "rtl" ? "" : zeroAppend}${
            this.direction === "rtl"
              ? momentDate.format("DD")
              : momentDate.format("Do")
          } ${this.englishMonths[momentDate.format("MM")]} ${momentDate.format(
            "YYYY"
          )}`;
        }
      }
    }
    return constructedDate;
  }

  getCancelFormattedDate(date) {
    return date ? moment(date).locale("en-us").format("DD/MM/YY") : "";
  }

  validateId(idNum, dob) {
    this.isIdValidated = false;
    this.declarationForm.controls.contactPersonName.setValue("");
    this.whitelistingService
      .validateId(this.declarationForm.value.identityType, idNum, dob)
      .subscribe(
        (response) => {
          this.isIdValidated = true;
          this.declarationForm.controls.IdentificationNumber.setValue(idNum);
          this.declarationForm.controls.contactPersonName.setValue(
            response["d"]["FullName"]
          );
          this.idValidatedName = response["d"]["FullName"];
          if (this.declarationForm.value.identityType !== "ZS0003") {
            $("#aftSelect").modal("hide");
          }
        },
        (error) => {
          let errorMsg = "";
          if (error?.error?.error?.innererror?.errordetails) {
            const messageArray = error["error"]["error"]["innererror"][
              "errordetails"
            ].map((err) => err.message);
            messageArray.splice(messageArray.length - 1, 1);
            errorMsg = messageArray.join(" ");
          }
          if (errorMsg !== "") {
            if (dob) {
              this.idErr1 = true;
              this.apiIdMsg = errorMsg;
            }
            this.notifierService.notify("error", errorMsg);
          }
        }
      );
  }

  FormInIt() {
    this.requestTypeForm = this.fb.group({
      transportCategory: ["", Validators.compose([Validators.required])],
      fileUpload: this.file,
      StartDate: new FormControl(null, [Validators.required]),
      EndDate: new FormControl(null, [Validators.required]),
    });
    this.businessInformationForm = this.fb.group({
      textArea: [
        "",
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.pattern(nonWhitespaceRegExp),
        ],
      ],
      businessWebsite: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
          ),
        ]),
      ],
      businessOperation: ["", Validators.compose([Validators.required])],
    });

    this.declarationForm = this.fb.group({
      identityType: ["", Validators.compose([Validators.required])],
      IdentificationNumber: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      contactPersonName: [
        "",
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[\u0621-\u064Aa-zA-Z ]*$/),
        ],
      ],
      instructionsDeclarationAccepted: [false],
    });

    this.CategoryForm = this.fb.group({});
  }

  back() {
    if (this.formBundle !== null && this.processActive === 5) {
      this.closeForm.emit();
      return true;
    }
    if (this.formBundle !== null) {
      this.processActive = 5;
      return true;
    }
    if (this.processActive === 2) {
      this.WhitelistPath = true;
      this.processActive--;
    } else if (this.processActive > 1) {
      this.processActive--;
    } else if (this.processActive === 1) {
      // this.router.navigateByUrl('/mains/whitelisting').then();
      this.closeForm.emit();
    }
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }

  onSubmit(): void {
    this.processActive = this.formBundle ? 5 : 2;
  }

  onSubmit2(): void {
    // this.changedStartDate = this.commonValid.changeDate(
    //   this.requestTypeForm.value.StartDate.calendarStart
    // );
    // this.changedEndDate = this.commonValid.changeDate(
    //   this.requestTypeForm.value.EndDate.calendarEnd
    // );
    // const whitelistData = {
    //   requestType: this.requestType,
    //   transportCategory: this.requestTypeForm.get("transportCategory").value,
    //   fileUpload: this.file,
    //   FrmDate: this.changedStartDate,
    //   ToDate: this.changedEndDate,
    // };
    this.form2Submitted = true;
    if (
      this.requestTypeForm.controls.StartDate.valid &&
      this.requestTypeForm.controls.EndDate.valid &&
      this.requestTypeForm.controls.transportCategory.valid &&
      this.mainAttachments["length"] > 0 &&
      this.isTransportCategoryValidated
    ) {
      this.processActive = this.formBundle ? 5 : 3;
    }
  }

  onSubmitCancellation() {
    const whitelistData = {
      requestType: this.requestType,
    };
    this.whitelistingService.getCancelWhitelistData().subscribe(
      (response) => {
        this.cancelWhitelistData = response["d"];
        if (
          this.cancelWhitelistData["CwagWid"] !== "" ||
          this.cancelWhitelistData["CwapWid"] !== "" ||
          this.cancelWhitelistData["CwlgWid"] !== "" ||
          this.cancelWhitelistData["CwlpWid"] !== "" ||
          this.cancelWhitelistData["CwsgWid"] !== "" ||
          this.cancelWhitelistData["CwspWid"] !== ""
        ) {
          if (whitelistData) {
            this.processActive = 3;
            this.WhitelistPath = false;
          }
        } else {
          this.notifierService.notify("error", this.lang["noCancellation"]);
        }
      },
      (error) => {
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

  onSubmit3(): void {
    const businessInformation = {
      textArea: this.businessInformationForm.get("textArea").value,
      businessWebsite: this.businessInformationForm.get("businessWebsite")
        .value,
      businessOperation: this.businessInformationForm.get("businessOperation")
        .value,
    };
    this.form3Submitted = true;
    if (this.businessInformationForm.valid) {
      this.processActive = this.formBundle ? 5 : 4;
    }
  }

  onSubmitCategoryForm(): void {
    this.dependentCategories = [];
    this.whitelistCategories.forEach((element) => {
      if (element.selected) {
        this.dependentCategories.push(element);
      }
    });
    if (this.dependentCategories.length) {
      this.categorySelected = true;
    }
    this.form3CancelSubmitted = true;
    if (
      this.selectedCancelCategories.length > 0 &&
      this.cautionAcknowledgement.value
    )
      this.processActive = 4;
  }

  onSubmit4(): void {
    const declarationData = {
      identityType: this.declarationForm.get("identityType").value,
      IdentificationNumber: this.declarationForm.get("IdentificationNumber")
        .value,
      contactPersonName: this.declarationForm.get("contactPersonName").value,
      instructionsDeclarationAccepted: this.declarationForm.get(
        "instructionsDeclarationAccepted"
      ).value,
    };
    this.form4Submitted = true;
    if (
      this.declarationForm.controls.identityType.valid &&
      this.declarationForm.controls.IdentificationNumber.valid &&
      (this.idValidatedName !== "" ||
        this.declarationForm.controls.contactPersonName.valid) &&
      this.declarationForm.value.instructionsDeclarationAccepted
    ) {
      this.processActive = 5;
    }
  }

  getFormattedStartOrEndDate(date) {
    let constructedDate = new Date(date);
    var uDtYyyy = "";
    var year = null;
    var mth = null;
    var day = null;
    var month = null;
    var fDay = null;
    year = constructedDate.getFullYear();
    mth = constructedDate.getMonth();
    day = constructedDate.getDate();
    if (mth < 10) month = "0" + mth;
    else month = "" + mth;
    if (day < 10) fDay = "0" + day;
    else fDay = "" + day;

    var today = new Date();
    var hrs = today.getUTCHours();
    var min = today.getUTCMinutes() + 1;
    var sec = today.getUTCSeconds() + 1;

    var newDate = new Date(year, month, fDay, hrs, min, sec);
    newDate.setHours(hrs + 3);
    return newDate;
  }

  onSubmit5(): void {
    if (this.WhitelistPath) {
      this.whitelistResponse["Iagrfg"] = "X";
      let startDate = "";
      if (this.requestTypeForm.value.StartDate["calendarName"] === "Islamic") {
        const convertedDate = this.commonValid.dateFormate(
          this.requestTypeForm.value.StartDate,
          "Gregorian"
        );
        startDate = this._dateAdapter.format(convertedDate, "DD-MM-YYYY");
      } else {
        startDate = this._dateAdapter.format(
          this.requestTypeForm.value.StartDate,
          "DD-MM-YYYY"
        );
      }
      let startDateTime = null;
      if (startDate) {
        startDateTime = moment(startDate, "DD-MM-YYYY").valueOf();
      }
      startDateTime = this.getFormattedStartOrEndDate(startDateTime);
      this.whitelistResponse["TpFdt"] = `/Date(${startDateTime?.getTime()})/`;
      let endDate = "";
      if (this.requestTypeForm.value.EndDate["calendarName"] === "Islamic") {
        const convertedDate = this.commonValid.dateFormate(
          this.requestTypeForm.value.EndDate,
          "Gregorian"
        );
        endDate = this._dateAdapter.format(convertedDate, "DD-MM-YYYY");
      } else {
        endDate = this._dateAdapter.format(
          this.requestTypeForm.value.EndDate,
          "DD-MM-YYYY"
        );
      }
      let endDateTime = null;
      if (endDate) {
        endDateTime = moment(endDate, "DD-MM-YYYY").valueOf();
      }
      endDateTime = this.getFormattedStartOrEndDate(endDateTime);
      this.whitelistResponse["TpTdt"] = `/Date(${endDateTime?.getTime()})/`;
      this.whitelistResponse[
        "BusLink"
      ] = this.businessInformationForm.value.businessWebsite;
      this.whitelistResponse[
        "BusYear"
      ] = this.businessInformationForm.value.businessOperation;
      this.whitelistResponse[
        "DecidTy"
      ] = this.declarationForm.value.identityType;
      this.whitelistResponse[
        "DecidNo"
      ] = this.declarationForm.value.IdentificationNumber;
      this.whitelistResponse[
        "CpName"
      ] = this.declarationForm.value.contactPersonName;
      const notes = [];
      let count = 0;
      let start = 0;
      let metaNum = 2;
      let end;
      const el = this.businessInformationForm.value.textArea;
      for (let i = 0; i < el.length; i++) {
        const char = el.charAt(i);
        if (
          el.charAt(i) === "\n" ||
          el.charAt(i) === "\r" ||
          el.charAt(i) === "\r\n" ||
          i === el.length - 1
        ) {
          end = i;
          if (i === el.length - 1) {
            end = i + 1;
          }
          let tdline = el.substring(start, end);
          let metaNumConst =
            metaNum < 10
              ? `00${metaNum}`
              : metaNum < 100
              ? `0${metaNum}`
              : `${metaNum}`;
          const noteObj = {
            __metadata: {
              id: `https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_WL_M_SRV/NotesSet("${metaNumConst}")`,
              uri: `https://sapgatewayt.gazt.gov.sa/sap/opu/odata/SAP/ZDP_WL_M_SRV/NotesSet("${metaNumConst}")`,
              type: "ZDP_WL_M_SRV.Notes",
            },
            AttByz: "TP",
            ByGpartz: localStorage.getItem("gpart"),
            ByPusrz: "",
            DataVersionz: "00000",
            ElemNo: 0,
            Erfdtz: null,
            Erftmz: null,
            Erfusrz: "",
            Lineno: count,
            Namez: "",
            Noteno: "2",
            Notenoz: "2",
            Rcodez: "VCWL_CWBI",
            Refnamez: "",
            Tdformat: "",
            Tdline: tdline,
            XInvoicez: "",
            XObsoletez: "",
          };
          notes.push(noteObj);
          start = end + 1;
          count++;
          metaNum++;
        }
      }
      this.whitelistResponse["NotesSet"] = notes;
      this.whitelistResponse["DecCb"] = this.declarationForm.value
        .instructionsDeclarationAccepted
        ? "X"
        : "";
      this.whitelistResponse["Operationz"] = "01";
      this.whitelistResponse["UserTypz"] = "TP";
      this.whitelistingService
        .saveWhiteListing(this.whitelistResponse)
        .subscribe(
          (response) => {
            this.acknowledgement = response["d"];
            this.displayAcknowledgement = true;
            this.submitRequestType = "create";
          },
          (error) => {
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
    } else {
      for (let i = 0; i < this.selectedCancelCategories.length; i++) {
        switch (this.selectedCancelCategories[i]) {
          case "cwlp":
            this.cancelWhitelistData["CwlpCb"] = "X";
            break;
          case "cwlg":
            this.cancelWhitelistData["CwlgCb"] = "X";
            break;
          case "cwsp":
            this.cancelWhitelistData["CwspCb"] = "X";
            break;
          case "cwsg":
            this.cancelWhitelistData["CwsgCb"] = "X";
            break;
          case "cwap":
            this.cancelWhitelistData["CwapCb"] = "X";
            break;
          case "cwag":
            this.cancelWhitelistData["CwagCb"] = "X";
            break;
        }
        this.cancelWhitelistData["DecCb"] = "X";
        this.cancelWhitelistData["AckCb"] = this.cautionAcknowledgement.value
          ? "X"
          : "";
        this.cancelWhitelistData[
          "DecidTy"
        ] = this.declarationForm.value.identityType;
        this.cancelWhitelistData[
          "DecidNo"
        ] = this.declarationForm.value.IdentificationNumber;
        this.cancelWhitelistData[
          "CpName"
        ] = this.declarationForm.value.contactPersonName;
        this.cancelWhitelistData["Operationz"] = "01";
        this.cancelWhitelistData["UserTypz"] = "TP";
        this.whitelistingService
          .submitCancelWhitelist(this.cancelWhitelistData)
          .subscribe(
            (response) => {
              this.acknowledgement = response["d"];
              this.displayAcknowledgement = true;
              this.submitRequestType = "cancel";
            },
            (error) => {
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
    }
  }

  changeTab(tab: number): void {
    this.showTab = tab;

    if (this.showTab === 1) {
      this.requestType = "New Whitelist Request";
      this.WhitelistPath = true;
      this.createdWhitelist = true;
    }
    if (this.showTab === 2) {
      this.requestType = "Cancellation of Whitelisting";
      this.createdWhitelist = false;
      this.WhitelistPath = false;
    }
  }

  changeEvent(value: any): void {
    this.instructionsDeclarationAccepted = value;
    if (value === true) {
      localStorage.setItem("agreeWhitelist", "true");
    } else {
      localStorage.removeItem("agreeWhitelist");
    }
  }

  uploadFiles(files, attType) {
    files = [...files];
    switch (attType) {
      case "VCWL":
        document.getElementById("mainAttachments")["value"] = "";
        break;
      case "CWGA":
        document.getElementById("additionalAttachments")["value"] = "";
        break;
    }
    const formData = new FormData();
    let filename = "";
    let encodedFileName = "";
    for (var i = 0; i < 1; i++) {
      filename = files[i]["name"];
      const parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();
      parseExt.splice(parseExt.length - 1, 1);
      encodedFileName = encodeURI(parseExt.join(".")) + "." + fileExt;
      console.log(encodedFileName);
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
      if (files[i]["size"] > 5242880) {
        this.notifierService.notify("error", this.lang["filesizeMessage"]);
        return false;
      }
      if (attType === "VCWL") {
        if (this.mainAttachments.length === 10) {
          this.notifierService.notify("error", this.lang["maxNoOfFiles"]);
          return false;
        }
        const fileIndex = this.mainAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.lang["fileAlreayExists"]);
          return false;
        }
      } else if (attType === "CWGA") {
        if (this.additionalAttachments.length === 10) {
          this.notifierService.notify("error", this.lang["maxNoOfFiles"]);
          return false;
        }
        const fileIndex = this.additionalAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.lang["fileAlreayExists"]);
          return false;
        }
      }
      formData.append("fileUpload", files[i]);
    }
    this.whitelistingService
      .uploadFiles(formData, attType, encodedFileName, this.retGuid)
      .subscribe(
        (res) => {
          this.appendFile(res["d"], attType);
        },
        (err) => {}
      );
  }

  appendFile(file, attType) {
    if (attType === "VCWL") {
      this.mainAttachments.push(file);
    } else if (attType === "CWGA") {
      this.additionalAttachments.push(file);
    }
  }

  deleteAttachment(attType, doguid, index) {
    this.whitelistingService.deleteAttachment(attType, doguid).subscribe(
      (res) => {
        this.removeFile(attType, index);
      },
      (err) => {}
    );
  }

  removeFile(attType, index) {
    if (attType === "VCWL") {
      this.mainAttachments.splice(index, 1);
    } else if (attType === "CWGA") {
      this.additionalAttachments.splice(index, 1);
    }
  }

  setSourcePath(type: string) {
    this.getFilepath.set(type, { path: "", value: this.filename });
  }

  chanangeDateAdapter(origin: "from" | "to") {
    localStorage.removeItem("agreeWhitelist");

    let fromCalendarValue = this.requestTypeForm.controls.StartDate.value;
    let toCalendarValue = this.requestTypeForm.controls.EndDate.value;
    if (
      !this.requestTypeForm.value.StartDate ||
      !this.requestTypeForm.value.EndDate
    ) {
      return;
    }
    const fromCalendarName = this.requestTypeForm.value.StartDate.calendarName;
    const toCalendarName = this.requestTypeForm.value.EndDate.calendarName;
    if (fromCalendarName === toCalendarName) {
      return;
    }
    if (origin === "to") {
      if (this.requestTypeForm.controls.StartDate.value !== null) {
        fromCalendarValue = this.commonValid.dateFormate(
          fromCalendarValue,
          toCalendarName
        );

        this.requestTypeForm.controls.StartDate.setValue(fromCalendarValue);
      }
    } else {
      if (this.requestTypeForm.controls.EndDate.value != null) {
        toCalendarValue = this.commonValid.dateFormate(
          toCalendarValue,
          fromCalendarName
        );
        this.requestTypeForm.controls.EndDate.setValue(toCalendarValue);
      }
    }
  }

  onInputBlur() {
    const name = this.declarationForm.value.contactPersonName;
    this.declarationForm.controls.contactPersonName.setValue(name.trim());
  }

  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.declarationForm.controls.contactPersonName.setValue(name);
  }

  getButtonStatus(): boolean {
    if (
      this.declarationForm.controls.identityType.valid &&
      this.declarationForm.controls.IdentificationNumber.valid &&
      (this.idValidatedName !== "" ||
        this.declarationForm.controls.contactPersonName.valid) &&
      this.declarationForm.value.instructionsDeclarationAccepted
    ) {
      return false;
    } else {
      return true;
    }
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
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  getError(field: string, validations: string[]) {
    const control =
      this.businessInformationForm.get(field) ||
      this.declarationForm.get(field);

    if (!control || !control.dirty || !control.errors) {
      return false;
    }

    for (const validation of validations) {
      if (control.errors[validation]) {
        return this.errorMessages[field][validation][
          localStorage.getItem("lang") === "ar" ? "arb" : "eng"
        ];
      }
    }

    return false;
  }

  goToDeclaration() {
    this.processActive = 4;
  }

  goToBusinessInformation() {
    this.processActive = 3;
  }

  goToCategories() {
    this.processActive = 3;
  }

  goToWhitelist() {
    this.processActive = 2;
  }

  goToTaxpayer() {
    this.processActive = 1;
  }

  toggleCancelWhitelists(type) {
    const index = this.selectedCancelCategories.indexOf(type);
    if (index > -1) {
      this.selectedCancelCategories.splice(index, 1);
    } else {
      this.selectedCancelCategories.push(type);
    }
  }

  onChangeModule(categories) {
    let count = 0;
    categories.selected = !categories.selected;
    this.whitelistCategories.forEach((item) => {
      if (item.selected) {
        count++;
      }
      if (count > 0) {
        this.cardEnable = true;
      } else {
        this.cardEnable = false;
      }
    });
  }

  getValidation() {
    console.log(
      this.declarationForm.get("contactPersonName"),
      this.isIdValidated,
      this.idValidatedName
    );
    console.log(
      this.declarationForm.get("contactPersonName").touched &&
        (this.declarationForm.get("contactPersonName").invalid ||
          (this.isIdValidated && this.idValidatedName === ""))
    );
  }
}
