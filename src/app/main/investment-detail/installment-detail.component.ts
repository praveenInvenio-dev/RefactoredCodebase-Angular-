import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { InstallmentPlan } from "src/app/constants/InstallmentPlan";
import { Location } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestForInstallmentService } from "src/app/services/request-for-installment-service";
import { NotifierService } from "angular-notifier";
import * as FileSaver from "file-saver";
import { NgbdModalContent } from "../request-installment/check-notification.dialog";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoaderService } from "src/app/loader/loader.service";

// import * as $ from 'jquery'
declare var $: any;

@Component({
  selector: "app-installment-detail",
  templateUrl: "./installment-detail.component.html",
  styleUrls: ["./installment-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class InstallmentDetailComponent implements OnInit {
  impOrExp: any;
  lang;
  files1: any = [];
  files2: any = [];
  dir: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  hideBackbtn: boolean = true;
  arr: any;
  Year: any = {};
  bills: any;
  installmentAgreementGroup: FormGroup;
  gridsize: number;
  gridsize2: number;
  minFreq: number;
  maxFreq: number;
  tin: any;
  acOrIn: any;
  zakatDetails: any;
  bnkStatementFile: File;
  finStatementFile: File;
  inOrAc: [number];
  selectedTotAmount: number = 0;
  freqDetails: any;
  fbNum: any;
  excelOrManual: any;
  manual: boolean = true;
  minInstall: string = "1";
  maxInstall: string = "36";
  selectedIndexs: [];
  selectedFrequency: any;
  periodicInstall: number = 0;
  Euser: string;
  fbgUid: string;
  instalmentType: any;
  highlightedBatch = [];
  highlightedRequestType = [];
  freqRequestType = [];
  postDataForInstalment: any;
  postOneInstalmentRequest: any;
  finDetails = {};
  finalData: any;
  applicationReference: any;
  submitted: boolean = false;
  attachMentValue: any;
  fileName = "";
  fileName2 = "";
  file_name1 = "";
  file_name2 = "";
  insInter: number;
  sliderDisabled = true;
  tickInterval: number;
  typeFormGroup: FormGroup;
  showSubType: boolean = false;
  showType: boolean = true;
  typeValue: any;
  reqResonFor: any;
  prft1;
  prft2;
  prft3;
  cashBank1;
  cashBank2;
  cashBank3;
  sadadNum: any;
  dpAmount: any;
  tab: string;
  tooltip2 = "";
  tooltip1 = "";
  insReq: any;
  dueDate: any;
  instructionsAccepted: boolean;

  constructor(
    private location: Location,
    private _formBuilder: FormBuilder,
    private router: Router,
    private activateroute: ActivatedRoute,
    private requestService: RequestForInstallmentService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private loaderService: LoaderService,
    public commonValidation: CommonValidation
  ) {}

  @ViewChild("stepper") private myStepper: MatStepper;

  totalStepsCount: number;
  flag: boolean = false;
  flag2: boolean = false;
  ngOnInit(): void {
    this.fbgUid = this.activateroute.snapshot.queryParamMap.get("fbgUid");
    this.Euser = this.activateroute.snapshot.queryParamMap.get("Euser");
    this.tab = this.activateroute.snapshot.queryParamMap.get("tab");
    this.fbNum = "";

    // this.typeFormGroup = this._formBuilder.group({
    //   selectType: ['', Validators.required]
    // });

    this.firstFormGroup = this._formBuilder.group({
      selectRequestType: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});

    this.installmentAgreementGroup = this._formBuilder.group({
      reasonForReq: ["", Validators.required],
      gridsize: ["", Validators.required],
      gridsize2: ["", Validators.required],
      selectFreq: ["", Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      Year1: ["", Validators.required],
      Year2: ["", Validators.required],
      Year3: ["", Validators.required],
      CashBankY1: ["", Validators.required],
      CashBankY2: ["", Validators.required],
      CashBankY3: ["", Validators.required],
      StiY1: ["", Validators.required],
      StiY2: ["", Validators.required],
      StiY3: ["", Validators.required],
      DebitorsY1: ["", Validators.required],
      DebitorsY2: ["", Validators.required],
      DebitorsY3: ["", Validators.required],
      InventoryY1: ["", Validators.required],
      InventoryY2: ["", Validators.required],
      InventoryY3: ["", Validators.required],
      TcAssetsY1: ["", Validators.required],
      TcAssetsY2: ["", Validators.required],
      TcAssetsY3: ["", Validators.required],
      ZakatY1: ["", Validators.required],
      ZakatY2: ["", Validators.required],
      ZakatY3: ["", Validators.required],
      TcLiabltyY1: ["", Validators.required],
      TcLiabltyY2: ["", Validators.required],
      TcLiabltyY3: ["", Validators.required],
      RevenueY1: ["", Validators.required],
      RevenueY2: ["", Validators.required],
      RevenueY3: ["", Validators.required],
      NetIncomeY1: ["", Validators.required],
      NetIncomeY2: ["", Validators.required],
      NetIncomeY3: ["", Validators.required],
      NcFlowY1: ["", Validators.required],
      NcFlowY2: ["", Validators.required],
      NcFlowY3: ["", Validators.required],
      ProfitRatioY1: ["", Validators.required],
      ProfitRatioY2: ["", Validators.required],
      ProfitRatioY3: ["", Validators.required],
      CashRatioY1: ["", Validators.required],
      CashRatioY2: ["", Validators.required],
      CashRatioY3: ["", Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({});
    this.fifthFormGroup = this._formBuilder.group({});
    this.minFreq = 1;
    if (localStorage.getItem("lang") === "ar") {
      this.lang = InstallmentPlan.langz.arb;
      this.dir = InstallmentPlan.langz.arb.dir;
    } else {
      this.lang = InstallmentPlan.langz.eng;
      this.dir = InstallmentPlan.langz.eng.dir;
    }

    this.tooltip1 = this.lang.screen2.tooltip1;
    this.tooltip2 = this.lang.screen2.tooltip2;

    this.tin = localStorage.getItem("gpart");
    this.excelOrManual = 1;
    //this.getInstallmentDetails();
    this.getType();
    this.getFrequency();
    this.getInstallmentRequestObject();
  }

  get fC() {
    return this.installmentAgreementGroup.controls;
  }
  get firstControl() {
    return this.firstFormGroup.controls;
  }
  get thirdControl() {
    return this.thirdFormGroup.controls;
  }
  get typeControl() {
    return this.thirdFormGroup.controls;
  }

  getFormattedAmount(amount) {
    if (amount) {
      const floatNumber = parseFloat(amount);
      if (isNaN(floatNumber)) {
        return "";
      } else {
        return floatNumber.toFixed(2);
      }
    } else {
      return "";
    }
  }

  getNumber(amount) {
    let num = parseFloat(amount);
    return num.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // normalNumbers(type){
  //   if(type === 'CashBankY1' && this.thirdControl.Cas)
  // }

  validateNumbers() {
    if (this.thirdControl.CashBankY1.value) {
      this.thirdControl.CashBankY1.setValue(
        parseFloat(this.thirdControl.CashBankY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.CashBankY2.value) {
      this.thirdControl.CashBankY2.setValue(
        parseFloat(this.thirdControl.CashBankY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.CashBankY3.value) {
      this.thirdControl.CashBankY3.setValue(
        parseFloat(this.thirdControl.CashBankY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.StiY1.value) {
      this.thirdControl.StiY1.setValue(
        parseFloat(this.thirdControl.StiY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.StiY2.value) {
      this.thirdControl.StiY2.setValue(
        parseFloat(this.thirdControl.StiY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.StiY3.value) {
      this.thirdControl.StiY3.setValue(
        parseFloat(this.thirdControl.StiY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.DebitorsY1.value) {
      this.thirdControl.DebitorsY1.setValue(
        parseFloat(this.thirdControl.DebitorsY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.DebitorsY2.value) {
      this.thirdControl.DebitorsY2.setValue(
        parseFloat(this.thirdControl.DebitorsY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.DebitorsY3.value) {
      this.thirdControl.DebitorsY3.setValue(
        parseFloat(this.thirdControl.DebitorsY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.InventoryY1.value) {
      this.thirdControl.InventoryY1.setValue(
        parseFloat(this.thirdControl.InventoryY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.InventoryY2.value) {
      this.thirdControl.InventoryY2.setValue(
        parseFloat(this.thirdControl.InventoryY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.InventoryY3.value) {
      this.thirdControl.InventoryY3.setValue(
        parseFloat(this.thirdControl.InventoryY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.TcAssetsY1.value) {
      this.thirdControl.TcAssetsY1.setValue(
        parseFloat(this.thirdControl.TcAssetsY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.TcAssetsY2.value) {
      this.thirdControl.TcAssetsY2.setValue(
        parseFloat(this.thirdControl.TcAssetsY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.TcAssetsY3.value) {
      this.thirdControl.TcAssetsY3.setValue(
        parseFloat(this.thirdControl.TcAssetsY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.ZakatY1.value) {
      this.thirdControl.ZakatY1.setValue(
        parseFloat(this.thirdControl.ZakatY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.ZakatY2.value) {
      this.thirdControl.ZakatY2.setValue(
        parseFloat(this.thirdControl.ZakatY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.ZakatY3.value) {
      this.thirdControl.ZakatY3.setValue(
        parseFloat(this.thirdControl.ZakatY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.TcLiabltyY1.value) {
      this.thirdControl.TcLiabltyY1.setValue(
        parseFloat(this.thirdControl.TcLiabltyY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.TcLiabltyY2.value) {
      this.thirdControl.TcLiabltyY2.setValue(
        parseFloat(this.thirdControl.TcLiabltyY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.TcLiabltyY3.value) {
      this.thirdControl.TcLiabltyY3.setValue(
        parseFloat(this.thirdControl.TcLiabltyY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.RevenueY1.value) {
      this.thirdControl.RevenueY1.setValue(
        parseFloat(this.thirdControl.RevenueY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.RevenueY2.value) {
      this.thirdControl.RevenueY2.setValue(
        parseFloat(this.thirdControl.RevenueY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.RevenueY3.value) {
      this.thirdControl.RevenueY3.setValue(
        parseFloat(this.thirdControl.RevenueY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.NetIncomeY1.value) {
      this.thirdControl.NetIncomeY1.setValue(
        parseFloat(this.thirdControl.NetIncomeY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.NetIncomeY2.value) {
      this.thirdControl.NetIncomeY2.setValue(
        parseFloat(this.thirdControl.NetIncomeY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.NetIncomeY3.value) {
      this.thirdControl.NetIncomeY3.setValue(
        parseFloat(this.thirdControl.NetIncomeY3.value).toFixed(2)
      );
    }
    if (this.thirdControl.NcFlowY1.value) {
      this.thirdControl.NcFlowY1.setValue(
        parseFloat(this.thirdControl.NcFlowY1.value).toFixed(2)
      );
    }
    if (this.thirdControl.NcFlowY2.value) {
      this.thirdControl.NcFlowY2.setValue(
        parseFloat(this.thirdControl.NcFlowY2.value).toFixed(2)
      );
    }
    if (this.thirdControl.NcFlowY3.value) {
      this.thirdControl.NcFlowY3.setValue(
        parseFloat(this.thirdControl.NcFlowY3.value).toFixed(2)
      );
    }
  }

  GlobalNumberAllow(event) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return rgx.test(event.target.value);
  }

  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }

  closeModal(str) {
    console.log("instructionsAccepted", this.instructionsAccepted);
    if (str === "cnf") {
      $("#filingterms").modal("hide");
    } else {
      $("#filingterms").modal("hide");
      this.router.navigate(["/mains/installmentplan"]);
    }
  }

  getInstallmentRequestObject() {
    $("#filingterms").modal("show");
    this.requestService
      .getZaktDetail(this.fbNum, this.fbgUid, this.Euser, "N")
      .subscribe(
        (res) => {
          this.postDataForInstalment = res["d"];
        },
        (err) => {}
      );
  }

  async getReasons() {
    this.requestService
      .getReasons(this.firstControl.selectRequestType.value)
      .subscribe(
        (res) => {
          console.log("response gotInsta", res);
          this.reqResonFor = res["d"].results;
          // this.fC.gridsize.setValue(this.minFreq);
          // this.selectedFrequency = this.minFreq;
          // this.updateInstallment(this.fC.gridsize2.value);
        },
        (err) => {}
      );
  }

  callFunc() {
    if (
      this.thirdControl.NetIncomeY1.value !== "" &&
      this.thirdControl.RevenueY1.value !== "" &&
      this.thirdControl.NetIncomeY1.value !== "0" &&
      this.thirdControl.RevenueY1.value !== "0" &&
      this.thirdControl.NetIncomeY1.value !== "0.00" &&
      this.thirdControl.RevenueY1.value !== "0.00"
    ) {
      this.prft1 = (
        Math.round(
          (Number(this.thirdControl.NetIncomeY1.value) /
            Number(this.thirdControl.RevenueY1.value)) *
            100
        ) / 100
      ).toString();
    } else {
      this.prft1 = "0";
    }
    if (
      this.thirdControl.NetIncomeY2.value !== "" &&
      this.thirdControl.RevenueY2.value !== "" &&
      this.thirdControl.NetIncomeY2.value !== "0" &&
      this.thirdControl.RevenueY2.value !== "0" &&
      this.thirdControl.NetIncomeY2.value !== "0.00" &&
      this.thirdControl.RevenueY2.value !== "0.00"
    ) {
      this.prft2 = (
        Math.round(
          (Number(this.thirdControl.NetIncomeY2.value) /
            Number(this.thirdControl.RevenueY2.value)) *
            100
        ) / 100
      ).toString();
    } else {
      this.prft2 = "0";
    }
    if (
      this.thirdControl.NetIncomeY3.value !== "" &&
      this.thirdControl.RevenueY3.value !== "" &&
      this.thirdControl.NetIncomeY3.value !== "0" &&
      this.thirdControl.RevenueY3.value !== "0" &&
      this.thirdControl.NetIncomeY3.value !== "0.00" &&
      this.thirdControl.RevenueY3.value !== "0.00"
    ) {
      this.prft3 = (
        Math.round(
          (Number(this.thirdControl.NetIncomeY3.value) /
            Number(this.thirdControl.RevenueY3.value)) *
            100
        ) / 100
      ).toString();
    } else {
      this.prft3 = "0";
    }
  }

  onUp() {
    if (
      this.thirdControl.CashBankY1.value !== "" &&
      this.thirdControl.StiY1.value !== "" &&
      this.thirdControl.TcLiabltyY1.value !== "" &&
      this.thirdControl.TcLiabltyY1.value !== "0" &&
      this.thirdControl.TcLiabltyY1.value !== "0.00"
    ) {
      this.cashBank1 = (
        Math.round(
          ((Number(this.thirdControl.CashBankY1.value) +
            Number(this.thirdControl.StiY1.value)) /
            this.thirdControl.TcLiabltyY1.value) *
            100
        ) / 100
      ).toString();
    } else {
      this.cashBank1 = "0";
    }

    if (
      this.thirdControl.CashBankY2.value !== "" &&
      this.thirdControl.StiY2.value !== "" &&
      this.thirdControl.TcLiabltyY2.value !== "" &&
      this.thirdControl.TcLiabltyY2.value !== "0" &&
      this.thirdControl.TcLiabltyY2.value !== "0.00"
    ) {
      this.cashBank2 = (
        Math.round(
          ((Number(this.thirdControl.CashBankY2.value) +
            Number(this.thirdControl.StiY2.value)) /
            this.thirdControl.TcLiabltyY2.value) *
            100
        ) / 100
      ).toString();
    } else {
      this.cashBank2 = "0";
    }

    if (
      this.thirdControl.CashBankY3.value !== "" &&
      this.thirdControl.StiY3.value !== "" &&
      this.thirdControl.TcLiabltyY3.value !== "" &&
      this.thirdControl.TcLiabltyY3.value !== "0" &&
      this.thirdControl.TcLiabltyY3.value !== "0.00"
    ) {
      this.cashBank3 = (
        Math.round(
          ((Number(this.thirdControl.CashBankY3.value) +
            Number(this.thirdControl.StiY3.value)) /
            this.thirdControl.TcLiabltyY3.value) *
            100
        ) / 100
      ).toString();
    } else {
      this.cashBank3 = "0";
    }

    // if (!this.thirdControl.CashBankY1.value.isEmpty() && !this.thirdControl.StiY1.value.isEmpty() && !this.thirdControl.TcLiabltyY1.value.isEmpty()) {
    // }
    // if (!this.thirdControl.CashBankY2.value.isEmpty() && !this.thirdControl.StiY2.value.isEmpty() && !this.thirdControl.TcLiabltyY2.value.isEmpty()) {
    // }
    // if (!this.thirdControl.CashBankY3.value.isEmpty() && !this.thirdControl.StiY3.value.isEmpty() && !this.thirdControl.TcLiabltyY3.value.isEmpty()) {
    // }
  }

  getFrequency() {
    this.requestService.getFrequencies().subscribe(
      (res) => {
        this.freqDetails = res["d"].results;
        if (localStorage.getItem("lang") === "ar") {
          this.freqDetails = [
            {
              Lang: "",
              PymntFreq: "01",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "شهري",
            },
            {
              Lang: "",
              PymntFreq: "02",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "ربع سنوي",
            },
            {
              Lang: "",
              PymntFreq: "03",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "نصف سنوي",
            },
            {
              Lang: "",
              PymntFreq: "04",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "سنويا",
            },
          ];
        } else {
          this.freqDetails = [
            {
              Lang: "",
              PymntFreq: "01",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "Monthly",
            },
            {
              Lang: "",
              PymntFreq: "02",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "Quarterly",
            },
            {
              Lang: "",
              PymntFreq: "03",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "Half Yearly",
            },
            {
              Lang: "",
              PymntFreq: "04",
              PlanDur: "01",
              UserTy: "",
              PymntFreqTxt: "Yearly",
            },
          ];
        }
      },
      (err) => {
        console.log("type", err);
      }
    );
  }

  getType() {
    console.log("this.tab", this.tab);
    if (this.tab === "Zakat & CIT") {
      this.showSubType = true;
      this.showType = false;
    }
    this.requestService.getType().subscribe(
      (res) => {
        this.instalmentType = res["d"].results;
        this.instalmentType = this.instalmentType.filter(
          (freq) => freq.TaxTy !== ""
        );
        if (localStorage.getItem("lang") === "ar") {
          this.instalmentType = [
            {
              TaxTy: "01",
              TaxTyTxt: "الزكاة",
            },
            {
              TaxTy: "02",
              TaxTyTxt: "ضريبة الدخل",
            },
          ];
        } else {
          this.instalmentType = [
            {
              TaxTy: "01",
              TaxTyTxt: "Zakat",
            },
            {
              TaxTy: "02",
              TaxTyTxt: "Income Tax",
            },
          ];
        }
        console.log("tah", this.instalmentType);
      },
      (err) => {
        console.log("type", err);
      }
    );
  }

  // handleBankStatementFileInput(files: FileList) {
  //   this.bnkStatementFile = files.item(0);
  //   console.log('qwerty', this.bnkStatementFile);
  // }

  // handleFinanceStatementFileInput(files: FileList) {
  //   this.finStatementFile = files.item(0);
  //   console.log('qwerty', this.finStatementFile);
  // }

  uploadFiles(files, attType) {
    files = [...files];
    console.log(files);
    const formData = new FormData();
    let filename;
    for (var i = 0; i < 1; i++) {
      filename = files[i]["name"];
      const parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();
      console.log("parseExt", parseExt[0].length);
      if (parseExt[0].length > 100) {
        this.notifierService.notify(
          "error",
          this.lang.screen1["attFileNmSize"]
        );
        return false;
      }
      if (
        fileExt !== "doc" &&
        fileExt !== "docx" &&
        fileExt !== "jpg" &&
        fileExt !== "pdf" &&
        fileExt !== "xls" &&
        fileExt !== "xlsx"
      ) {
        console.log("error invalid format");
        this.notifierService.notify(
          "error",
          this.lang.screen1["invalidFormat"]
        );
        return false;
      }
      if (files[i]["size"] > 5242880) {
        this.notifierService.notify(
          "error",
          this.lang.screen1["filesizeMessage"]
        );
        return false;
      }
      if (attType === "ZIP2") {
        if (this.files1.length === 10) {
          this.notifierService.notify(
            "error",
            this.lang.screen1["maxNoOfFiles"]
          );
          return false;
        }

        this.flag = true;
        const fileIndex = this.files1.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.flag = false;
          this.notifierService.notify(
            "error",
            this.lang.screen1["fileAlreayExists"]
          );
          return false;
        }
      } else {
        this.flag2 = true;
        if (this.files2.length === 10) {
          this.notifierService.notify(
            "error",
            this.lang.screen1["maxNoOfFiles"]
          );
          return false;
        }

        const fileIndex = this.files2.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify(
            "error",
            this.lang.screen1["fileAlreayExists"]
          );
          this.flag2 = false;
          return false;
        }
      }

      //console.log('formdddd', formData);
      console.log("formdddd", files[i]);
      formData.append("fileUpload", files[i]);
    }

    // returnId, docType, fileName, formdata
    console.log("formData", formData);
    this.requestService
      .attachmentSubmit(
        this.postDataForInstalment.ReturnId,
        attType,
        filename,
        formData
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.appendFile(res["d"], attType);
        },
        (err) => {
          if (attType === "ZIP2") {
            this.flag = false;
          } else {
            this.flag2 = false;
          }
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }

  appendFile(file, attType) {
    let obj = {
      name: file.Filename,
      id: file.Dotyp,
      flag: true,
      retGuid: file.RetGuid,
      did: file.Doguid,
    };
    if (attType === "ZIP2") {
      this.files1.push(file);
      console.log("this.files1", this.files1);
      this.file_name1 = this.files1[0].Filename;
    } else {
      this.files2.push(file);
      this.file_name2 = this.files2[0].Filename;
      console.log("this.files1", this.files2);
    }
  }

  uploadFile(res, fileSize, doTyp) {
    let obj = {
      name: res["d"]["Filename"],
      size: fileSize,
      id: doTyp,
      flag: true,
      url: res["d"]["DocUrl"],
      did: res["d"]["Doguid"],
    };
    // let control = <FormArray>this.vatReviewFormGroup3.controls.doc;

    // control.push(this._formBuilder.group(obj));

    // console.log(this.vatReviewFormGroup3.controls.doc);
    console.log("fileName usjsjsj", this.thirdControl.supportingDocName);
    this.thirdControl.supportingDocName.setValue("");
    // this.vatReviewFormGroup5.controls.supportingDocName.setValue("");
  }

  deleteAttachments(file, attType, index) {
    console.log("qwerty", file);
    this.requestService
      .deleteAttachment(this.postDataForInstalment.ReturnId, this.files1)
      .subscribe(
        (res) => {
          console.log(res);
          this.removeFile(attType, index);
        },
        (err) => {
          if (attType === "ZIP2") {
            this.flag = false;
          } else {
            this.flag2 = false;
          }
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }

  removeFile(attType, index) {
    console.log("aaassasas", attType);
    console.log("aaassasas", index);
    if (attType === "ZIP2") {
      this.flag = false;
      this.files1.splice(index, 1);
    } else {
      this.flag2 = false;
      this.files2.splice(index, 1);
    }
  }

  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goBack(stepper: MatStepper) {
    if (stepper.selectedIndex === 0) {
      $("#filingterms").modal("hide");
      this.router.navigate(["/mains/installmentplan"]);
    } else {
      stepper.previous();
    }
  }

  updateSetting(event) {
    this.selectedFrequency = event.value;
    this.updateInstallment(this.installmentAgreementGroup.value["gridsize2"]);
  }

  goToType(stepper: MatStepper, type) {
    this.typeValue = type;
    if (type === "2") {
      this.showSubType = false;
      this.router.navigate(["/mains/vatinstallmentplan"]);
      return;
    } else {
      this.showSubType = true;
    }
  }

  clearData() {
    this.submitted = false;
    this.periodicInstall = 0;
    this.flag = false;
    this.flag2 = false;
    this.files1 = [];
    this.files2 = [];
    this.secondFormGroup = this._formBuilder.group({});

    this.installmentAgreementGroup = this._formBuilder.group({
      reasonForReq: ["", Validators.required],
      gridsize: ["", Validators.required],
      gridsize2: ["", Validators.required],
      selectFreq: ["", Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      Year1: ["", Validators.required],
      Year2: ["", Validators.required],
      Year3: ["", Validators.required],
      CashBankY1: ["", Validators.required],
      CashBankY2: ["", Validators.required],
      CashBankY3: ["", Validators.required],
      StiY1: ["", Validators.required],
      StiY2: ["", Validators.required],
      StiY3: ["", Validators.required],
      DebitorsY1: ["", Validators.required],
      DebitorsY2: ["", Validators.required],
      DebitorsY3: ["", Validators.required],
      InventoryY1: ["", Validators.required],
      InventoryY2: ["", Validators.required],
      InventoryY3: ["", Validators.required],
      TcAssetsY1: ["", Validators.required],
      TcAssetsY2: ["", Validators.required],
      TcAssetsY3: ["", Validators.required],
      ZakatY1: ["", Validators.required],
      ZakatY2: ["", Validators.required],
      ZakatY3: ["", Validators.required],
      TcLiabltyY1: ["", Validators.required],
      TcLiabltyY2: ["", Validators.required],
      TcLiabltyY3: ["", Validators.required],
      RevenueY1: ["", Validators.required],
      RevenueY2: ["", Validators.required],
      RevenueY3: ["", Validators.required],
      NetIncomeY1: ["", Validators.required],
      NetIncomeY2: ["", Validators.required],
      NetIncomeY3: ["", Validators.required],
      NcFlowY1: ["", Validators.required],
      NcFlowY2: ["", Validators.required],
      NcFlowY3: ["", Validators.required],
      ProfitRatioY1: ["", Validators.required],
      ProfitRatioY2: ["", Validators.required],
      ProfitRatioY3: ["", Validators.required],
      CashRatioY1: ["", Validators.required],
      CashRatioY2: ["", Validators.required],
      CashRatioY3: ["", Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({});
    this.fifthFormGroup = this._formBuilder.group({});
  }

  async goToBills(stepper: MatStepper, value) {
    this.firstFormGroup.controls["selectRequestType"].setValue(value);
    this.clearData();
    await this.getReasons();
    await this.ZakatBillDetails(value, stepper);
  }

  async goInstallAgreement(stepper: MatStepper) {
    console.log("firstControl", this.firstControl.selectRequestType);
    if (this.highlightedBatch.length !== 0) {
      this.fC.gridsize2.setValue(this.minInstall);
      this.updateInstallment(this.fC.gridsize2.value);
      stepper.next();
    }
  }

  goToAttachment(stepper: MatStepper) {
    this.submitted = true;
    //this.fbNum = this.highlightedBatch[0].Fbnum;
    if (this.installmentAgreementGroup.valid) {
      this.submitted = false;
      stepper.next();
    }
    // console.log('install', this.installmentAgreementGroup.value);
  }

  async displayForm() {
    this.postDataForInstalment.Operation = "51";
    this.postDataForInstalment.StepNumber = "03";
    const dpAmt = this.installmentAgreementGroup.value["gridsize2"];
    const totAmt = this.selectedTotAmount;
    this.postDataForInstalment.DpAmt = dpAmt.toString();
    this.postDataForInstalment.TotAmt = totAmt.toString();
    this.postDataForInstalment.PymntFreq = this.installmentAgreementGroup.value[
      "selectFreq"
    ];
    this.postDataForInstalment.PlanDur = this.installmentAgreementGroup.value[
      "gridsize"
    ].toString();
    this.postDataForInstalment.InstReqFor = this.firstFormGroup.value[
      "selectRequestType"
    ];
    this.postDataForInstalment.OffPlanDur = "";
    this.postDataForInstalment.OffPymntFreq = "";
    this.postDataForInstalment.InstReqReason = this.fC.reasonForReq.value.ReaReqInst;
    this.postDataForInstalment.Euser = this.Euser;
    this.postDataForInstalment.Fbguid = this.fbgUid;
    this.postDataForInstalment.invDtlsSet = this.highlightedBatch;
    this.postDataForInstalment.FnDtlSet = [];
    this.postDataForInstalment.AttachSet = [];
    this.postDataForInstalment.insPlan_OffSet = [];
    this.postDataForInstalment.insPlanSet = [];
    this.postDataForInstalment.retmsgSet = [];
    await this.postIntalmentmentRequestFirst();
  }

  async postIntalmentmentRequestFirst() {
    this.requestService
      .postInstalmentRequest(this.postDataForInstalment)
      .subscribe(
        (res) => {
          this.postOneInstalmentRequest = res["d"];
          const modalRef = this.modalService.open(NgbdModalContent, {
            size: "lg",
          });
          modalRef.componentInstance.data = this.postOneInstalmentRequest.insPlanSet.results;
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }

  async goForward(stepper: MatStepper, value?: string) {
    if (this.files1.length === 0) {
      this.notifierService.notify(
        "error",
        this.lang.screen1.attachBankStatement
      );
      return;
    }
    if (this.files2.length === 0) {
      this.notifierService.notify(
        "error",
        this.lang.screen1.attachFinStatement
      );
      return;
    }
    //this.finDetails['ReturnId'] = this.postDataForInstalment.ReturnId;
    for (let i = 0; i < this.highlightedBatch.length; i++) {
      this.highlightedBatch[0].InstReqFor = this.firstFormGroup.value[
        "selectRequestType"
      ];
    }
    this.submitted = true;
    console.log("gotoSummaryScreen", this.thirdFormGroup);
    //this.thirdFormGroup.pro
    if (this.thirdFormGroup.valid) {
      this.postDataForInstalment.Operation = "51";
      this.postDataForInstalment.StepNumber = "03";
      const dpAmt = this.installmentAgreementGroup.value["gridsize2"];
      const totAmt = this.selectedTotAmount;
      this.postDataForInstalment.DpAmt = dpAmt.toString();
      this.postDataForInstalment.TotAmt = totAmt.toString();
      this.postDataForInstalment.PymntFreq = this.installmentAgreementGroup.value[
        "selectFreq"
      ];
      this.postDataForInstalment.PlanDur = this.installmentAgreementGroup.value[
        "gridsize"
      ].toString();
      this.postDataForInstalment.InstReqFor = this.firstFormGroup.value[
        "selectRequestType"
      ];
      this.postDataForInstalment.InstReqReason = "01";

      this.postDataForInstalment.Euser = this.Euser;
      this.postDataForInstalment.Fbguid = this.fbgUid;
      this.postDataForInstalment.invDtlsSet = this.highlightedBatch;
      this.postDataForInstalment.FnDtlSet = [];
      this.postDataForInstalment.AttachSet = [];
      this.postDataForInstalment.insPlan_OffSet = [];
      this.postDataForInstalment.insPlanSet = [];
      this.postDataForInstalment.retmsgSet = [];
      this.requestService
        .postInstalmentRequest(this.postDataForInstalment)
        .subscribe(
          (res) => {
            this.postOneInstalmentRequest = res["d"];
            stepper.next();
          },
          (err) => {
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
    }
  }

  async submitRequest(stepper: MatStepper) {
    if (stepper.selectedIndex === 4) {
      this.hideBackbtn = false;
    }
    const { ...financeDetails } = this.thirdFormGroup.value;
    financeDetails["ReturnId"] = this.postDataForInstalment.ReturnId;
    financeDetails["FormGuid"] = this.fbgUid;
    financeDetails["DataVersion"] = "00001";
    financeDetails["LineNo"] = 1;
    financeDetails["RankingOrder"] = "00";
    console.log("finObbbbbbb", financeDetails);
    this.postOneInstalmentRequest.FnDtlSet = [financeDetails];
    this.postOneInstalmentRequest.Operation = "58";
    this.postOneInstalmentRequest.StepNumber = "04";
    this.postOneInstalmentRequest.DecCb = "X";
    // this.postOneInstalmentRequest.Status = "E0001";
    this.postOneInstalmentRequest.UserTyp = "TP";
    this.requestService
      .postInstalmentRequest(this.postOneInstalmentRequest)
      .subscribe(
        (res) => {
          this.finalData = res["d"];
          this.applicationReference = this.finalData.Fbnum;
          this.sadadNum = this.finalData.Sopbel;
          this.dpAmount = this.finalData.DpAmt;
          this.insReq = this.finalData.InstReqFor;
          stepper.next();
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
  }

  async ZakatBillDetails(type, stepper) {
    this.highlightedBatch = [];
    this.selectedTotAmount = 0;
    this.requestService.getZakatBillDetails(this.fbNum, type).subscribe(
      (res) => {
        this.zakatDetails = res["d"].results;
        if (this.zakatDetails && this.zakatDetails.length > 0) {
          for (let i = 0; i < this.zakatDetails.length; i++) {
            if (this.zakatDetails[i].InvCb === "X") {
              this.highlightedBatch.push(this.zakatDetails[i]);
              this.selectedTotAmount += Number(this.zakatDetails[i].DueAmt);
            }
          }
          this.minInstall = ((this.selectedTotAmount * 20) / 100).toFixed(2);
          this.maxInstall = this.selectedTotAmount.toFixed(2);
          this.insInter = Number(this.selectedTotAmount) / 6;
          //console.log('(Number(this.selectedTotAmount) / 4)', (Number(this.selectedTotAmount) / 4))
          stepper.next();
        } else {
          this.notifierService.notify("error", this.lang.screen2.invmsg);
        }

        // console.log("thisInterval", this.zakatDetails);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0].message
        );
      }
    );
  }

  selectBills(value) {
    //this.selectedTotAmount = 0;
    if (value.InvCbDeflt === "X") {
      return false;
    } else {
      if (this.highlightedBatch.indexOf(value) === -1) {
        value.InvCb = "X";
        this.highlightedBatch.push(value);
        this.selectedTotAmount += Number(value.DueAmt);
        this.minInstall = ((this.selectedTotAmount * 20) / 100).toFixed(2);
        this.maxInstall = this.selectedTotAmount.toFixed(2);
        console.log(
          "(Number(this.selectedTotAmount) / 4)",
          Number(this.selectedTotAmount) / 4
        );
        this.insInter = Number(this.selectedTotAmount) / 6;
        this.updateInstallment(this.fC.gridsize2.value);
      } else {
        const _index = this.highlightedBatch.indexOf(value);
        this.highlightedBatch.splice(_index, 1);
        this.selectedTotAmount -= Number(value.DueAmt);
        this.minInstall = ((this.selectedTotAmount * 20) / 100).toFixed(2);
        this.maxInstall = this.selectedTotAmount.toFixed(2);
        this.insInter = Number(this.selectedTotAmount) / 6;
        this.updateInstallment(this.fC.gridsize2.value);
      }
    }
    console.log("thisssssss", this.insInter);
  }

  updateInstallment(value) {
    console.log("valueeeeeeeeeee", value);
    this.periodicInstall = Number(
      (Number(this.maxInstall) - value) / this.selectedFrequency
    );
    console.log("valueeeeeeeeeee", this.periodicInstall);
  }

  openContent() {
    this.location.back();
  }

  editBill(stepper: MatStepper, index) {
    //stepper.previous()
    stepper.selectedIndex = index;
  }

  getImpExp(value) {
    this.impOrExp = value;
  }

  downloadForm(fbNum) {
    this.requestService.downloadForm(fbNum).subscribe(
      (res: any) => {
        console.log("res", res);
        FileSaver.saveAs(res, "form" + fbNum + ".pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  selectFrequency(value) {
    console.log(this.installmentAgreementGroup.controls);
    this.installmentAgreementGroup.controls["selectFreq"].setValue(value);
    this.sliderDisabled = false;
    this.fC.gridsize.setValue(this.minFreq);
    this.selectedFrequency = this.fC.gridsize.value;
    this.updateInstallment(this.fC.gridsize2.value);
    // console.log('freq', value);
    // if (this.freqRequestType.indexOf(value) === -1) {
    //   const _index = this.freqRequestType.indexOf(value);
    //   this.freqRequestType.splice(_index, 1);
    //   this.freqRequestType.push(value);
    // }
    if (value === "01") {
      this.maxFreq = 36;
      this.tickInterval = 9;
    } else if (value === "02") {
      this.maxFreq = 12;
      this.tickInterval = 3;
    } else if (value === "03") {
      this.maxFreq = 6;
      this.tickInterval = 2;
    } else if (value === "04") {
      this.maxFreq = 3;
      this.tickInterval = 1;
    } else {
      this.maxFreq = 0;
    }
  }

  downloadConfirmation(fbNum) {
    this.requestService.downloadAcknowledgement(fbNum).subscribe(
      (res: any) => {
        console.log("res", res);
        FileSaver.saveAs(res, "" + fbNum + ".pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }
}
