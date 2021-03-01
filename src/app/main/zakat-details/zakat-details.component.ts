import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { ChartType } from "chart.js";
import * as FileSaver from 'file-saver';
import {
  Color,
  Label,
  MultiDataSet,
  PluginServiceGlobalRegistrationAndOptions,
  ThemeService,
} from "ng2-charts";
import { interval, Subscription } from "rxjs";
import { isEmpty } from "rxjs/operators";
import { CommonValidation } from "src/app/constants/commonValidations";
import { InstallmentPlan } from "src/app/constants/InstallmentPlan";
import { LoaderService } from "src/app/loader/loader.service";
import { RequestForInstallmentService } from "src/app/services/request-for-installment-service";
import { NgbdModalContent } from '../request-installment/check-notification.dialog';
import { ErrorMessageModal } from "../request-installment/error.message.modal";

declare var $: any;

@Component({
  selector: "app-zakat-details",
  templateUrl: "./zakat-details.component.html",
  styleUrls: ["./zakat-details.component.css"],
})
export class ZakatDetailsComponent implements OnInit {
  @ViewChild("e1") public e1;
  @ViewChild("e2") public e2;
  @ViewChild("e3") public e3;
  @ViewChild("e4") public e4;
  otp = [];
  counterDisplay;
  counterSubscription: Subscription;
  counter: number = 120;

  bills: any;
  tin: string;
  installmentDetails: any;
  PymntFrequency: string;
  invoiceDetails: any = {};
  fbNum: any;
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  //doughnutChartData: MultiDataSet = [];
  unpaidAmt: any;
  zakatBillDetails: any;
  status: string;
  Euser: string;
  TotAmt: string;
  totPercentage: number;
  dpPercentage: number;
  iprPostData: any = {};
  paidAmt: number;
  nextInsAmt = 0;
  totInsAmt: number;
  dueDate: string;
  paidPercent: number;
  insPercent: number;
  totalInsAmt: number = 0;
  insAmt: any;
  dir: string;
  lang: any;
  file1: any;
  file2: any;
  revokeClicked: boolean = false;
  showVerification: boolean = false;
  showDetails: boolean = true;
  OtpSuccess: boolean = false;
  enableResendButton: boolean;
  resendFlag: any;
  payload: any;
  retryCount: number = 0;
  obj = {};
  Fbust: string;
  newStatus: string;
  color: string;
  notes: string = '';
  Notes: boolean;
  statusText: string;
  submitted: boolean = false;
  mobile: any;


  constructor(
    private requestService: RequestForInstallmentService,
    private route: ActivatedRoute,
    private commonVaidation: CommonValidation,
    private loaderService: LoaderService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tin = localStorage.getItem("gpart");
    this.fbNum = this.route.snapshot.queryParamMap.get("fbNum");
    this.status = this.route.snapshot.queryParamMap.get("status");
    this.Euser = this.route.snapshot.queryParamMap.get("Euser");
    this.Fbust = this.route.snapshot.queryParamMap.get("ipStatus");
    this.statusText = this.route.snapshot.queryParamMap.get("statusText");


    //this.TotAmt = "20,00.00 SAR"
    this.obj = { fbNum: this.fbNum, code: "", tin: this.tin };
    if (localStorage.getItem("lang") === "ar") {
      this.lang = InstallmentPlan.langz.arb;
      this.dir = InstallmentPlan.langz.arb.dir;
    } else {
      this.lang = InstallmentPlan.langz.eng;
      this.dir = InstallmentPlan.langz.eng.dir;
    }
    //data.subscribe((data) => {
    // })

    this.billDetails();
    //this.billDetails();
  }

  // this.billDetails()

  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }

  // (Euser1='00000000000000000000',Fbguid='',Fbnum='085000001005',Fbtyp='IPRA',
  // Gpart='3102472809',Lang='EN',Persl='',Status='E0045',TaxOffUid='')
  async billDetails() {
    this.loaderService.show();
    const sendParam = {
      fbNum: this.fbNum,
      status: this.status,
    };
    this.requestService.userFillApi(sendParam).subscribe((res) => {
      this.requestService
        .getZaktDetail(this.fbNum, res['d'].Fbguid, res['d'].Euser, "S")
        .subscribe(
          (res) => {
            console.log('invoiceDetails', res['d']);
            this.invoiceDetails = res["d"];
            this.getZakatBillDetail();
          },
          (err) => {
            console.log(err);
          }
        );
    })
  }


  backNotes() {
    this.notes = "";
    this.submitted = false;
    this.Notes = false;
    this.showDetails = true;
  }

  closeDialog() {
    this.counter = 120;
    this.counterSubscription.unsubscribe();
  }

  closeModal() {
    $("#revokeOption").modal("hide");
  }

  async getPostDataForInstalment() {
    this.invoiceDetails.insPlanSet = [];
    this.invoiceDetails.invDtlsSet = this.zakatBillDetails;
    this.invoiceDetails.Operation = "51";
    this.invoiceDetails.UserTyp = "TP";
    this.invoiceDetails.StepNumber = "03";

    this.requestService.postInstalmentRequest(this.invoiceDetails).subscribe(
      (res) => {
        this.iprPostData = res["d"];
        if (this.invoiceDetails.InsDtOff !== null) {
          this.invoiceDetails.InsDtOff =
            this.commonVaidation.getDateFormated(this.invoiceDetails.InsDtOff) +
            "";
        }

        this.mobile = this.iprPostData.MobNo.substr(-4);
        if (
          this.Fbust === "IP017" && this.iprPostData.Status === "E0013"
        ) {
          this.newStatus =
            localStorage.lang === "ar" ? "مسودة" : "Draft";
          this.color = "#d99a29";
        }

        if (
          (this.Fbust === "IP011" && this.iprPostData.Status === "E0055") || (this.Fbust === "IP021" &&
            "E0015")
        ) {
          this.newStatus =
            localStorage.lang === "ar" ? "مقدمة" : "Submitted";
          this.color = "#d99a29";
        }
        if (
          (this.Fbust === "IP011" && this.iprPostData.Status === "E0018") || (this.Fbust === "IP017" &&
            this.iprPostData.Status === "E0018")
        ) {
          this.newStatus =
            localStorage.lang === "ar" ? "مطلوب بيانات اضافية" : "Additional Information Required";
          this.color = "#d99a29";
        }
        if (this.Fbust === "IP020" || this.statusText === 'Revoked' || this.statusText === 'منقوض' || this.statusText === 'Revoked - Failure to pay Instalments' || this.statusText === 'تم الإلغاء - عدم دفع الأقساط') {
          this.newStatus =
            localStorage.lang === "ar" ? "تم إلغائها" : "Cancelled";
          this.color = "#FF0000";
        }
        if (
          (this.Fbust === "IP021" && this.iprPostData.Status ===
            ("E0016" ||
              "E0019" ||
              "E0041" ||
              "E0044" ||
              "E0049" ||
              "E0050" ||
              "E0052" ||
              "E0053" ||
              "E0054" ||
              "E0058" ||
              "E0062" ||
              "E0063"))
        ) {
          this.newStatus =
            localStorage.lang === "ar" ? "قيد المراجعة" : "In Process";
          this.color = "#aa0c19";
        }
        if (
          (this.Fbust === "IP014" &&
            this.iprPostData.Status === "E0045" && (this.statusText !== 'Revoked' && this.statusText !== 'منقوض' && this.statusText !== 'Revoked - Failure to pay Instalments' && this.statusText !== 'تم الإلغاء - عدم دفع الأقساط'))
        ) {
          this.newStatus =
            localStorage.lang === "ar"
              ? "موافقة"
              : "Approved";
          this.color = "#006450";
        }


        if (this.iprPostData.insPlanSet.results) {
          this.calculatePaidAmount();
        }
        if (this.invoiceDetails.PaymtDt !== null) {
          this.iprPostData.PaymtDt =
            this.commonVaidation.getDateFormated(this.iprPostData.PaymtDt) + "";
        }

        if (this.iprPostData.insPlanSet.results) {
          this.calculatePaidAmount();
        }
        if (this.invoiceDetails.PaymtDt !== null) {
          this.iprPostData.PaymtDt =
            this.commonVaidation.getDateFormated(this.iprPostData.PaymtDt) + "";
        }

        if (this.iprPostData.PymntFreq === "01") {
          this.PymntFrequency = "Monthly";
        } else if (this.iprPostData.PymntFreq === "02") {
          this.PymntFrequency = "Quaterly";
        } else if (this.iprPostData.PymntFreq === "03") {
          this.PymntFrequency = "Half Yearly";
        } else if (this.iprPostData.PymntFreq === "04") {
          this.PymntFrequency = "Yearly";
        } else {
          this.PymntFrequency = " ";
        }
      },
      (err) => {
        const modalRef = this.modalService.open(ErrorMessageModal);
        modalRef.componentInstance.data = err.error.error.message.value;
      }
    );
  }

  async getZakatBillDetail() {
    this.requestService
      .getZakatBillDetails(this.fbNum, this.invoiceDetails.InstReqFor)
      .subscribe(
        async (res) => {
          this.zakatBillDetails = res["d"].results;
          await this.getPostDataForInstalment();
          this.totPercentage = Number(
            (this.invoiceDetails.TotAmt * 100) / this.invoiceDetails.TotAmt
          );
          this.dpPercentage = Number(
            (this.invoiceDetails.DpAmt * 100) / this.invoiceDetails.TotAmt
          );

        },
        (err) => {
          console.log("err", err.error.error.message.value);
          const modalRef = this.modalService.open(ErrorMessageModal);
          modalRef.componentInstance.data = err.error.error.message.value;
        }
      );
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

  calculatePaidAmount() {
    let paidInsAmt = 0;

    for (let i = 0; i < this.iprPostData.insPlanSet.results.length; i++) {

      this.insAmt = this.iprPostData.insPlanSet.results[i].InsAmt;
      if (this.iprPostData.insPlanSet.results[i].InsStatus === "01") {
        paidInsAmt += Number(
          this.iprPostData.insPlanSet.results[i].InsAmt
        );
      }
      if (this.iprPostData.insPlanSet.results[i].InsStatus === "02") {
        // console.log('indexOf', this.iprPostData.insPlanSet.results.indexOf(this.iprPostData.insPlanSet.results[i].DueDt));
        this.dueDate =
          this.commonVaidation.getDateFormated(
            this.iprPostData.insPlanSet.results[i].DueDt
          ) + "";
        this.nextInsAmt = this.iprPostData.insPlanSet.results[i].InsAmt;
        break;
      }
    }
    for (let i = 0; i < this.iprPostData.insPlanSet.results.length; i++) {
      this.totalInsAmt += Number(this.iprPostData.insPlanSet.results[i].InsAmt);
    }
    if (
      this.iprPostData.AttachSet["results"] &&
      this.iprPostData.AttachSet["results"].length > 0
    ) {
      this.file1 = this.iprPostData.AttachSet.results[0].Filename;
      this.file2 = this.iprPostData.AttachSet.results[1].Filename;
    }

    this.loaderService.hide();
    // E0058 E0055
    if ((this.iprPostData.Status === 'E0055' && this.Fbust === 'IP011') || (this.iprPostData.Status === 'E0013' && this.Fbust === 'IP017') || (this.Fbust === 'IP020' && (this.iprPostData.Status === 'E0051' || 'E0058' || 'E0055')) || (this.iprPostData.Status === 'E0051' && this.Fbust === 'IP020') || (this.iprPostData.Status === 'E0045' && this.Fbust === 'IP014')) {
      this.paidAmt = Number(this.iprPostData.DpAmt) + Number(paidInsAmt);
    } else {
      this.paidAmt = Number(paidInsAmt);
    }
    this.doughnutChartLabels = [
      this.paidAmt.toString() + "SAR",
      this.nextInsAmt.toString() + "SAR",
    ];
    // this.doughnutChartLabels.push(this.nextInsAmt.toString());

    this.paidPercent = Number(
      (Number(this.paidAmt) / Number(this.iprPostData.TotAmt)) * 100
    );
    this.insPercent = Number(
      (Number(this.insAmt) / Number(this.iprPostData.TotAmt)) * 100
    );
    const totPercent = 100 - Number(this.paidPercent + this.insPercent);

    this.doughnutChartData = [[this.paidPercent, this.insPercent, totPercent]];
  }


  getOTPFromUser(otp) {
    if (otp.length == 4) {
      this.validateOTP(otp);
      this.e1.nativeElement.value = "";
      this.e2.nativeElement.value = "";
      this.e3.nativeElement.value = "";
      this.e4.nativeElement.value = "";
      for (let i = 0; i < otp.length; i++) this.otp.pop();
    }
  }

  async displayForm() {
    const modalRef = this.modalService.open(NgbdModalContent, {
      size: "lg",
    });
    modalRef.componentInstance.data = this.iprPostData.insPlanSet.results;
  }


  validateOTP(otp) {
    this.obj["code"] = otp;
    if (this.retryCount < 3) {
      this.retryCount = this.retryCount + 1;
      this.iprPostData.AttachSet = [];
      this.iprPostData.FnDtlSet = [];
      this.iprPostData.insPlanSet = [];
      this.iprPostData.invDtlsSet = [];
      this.iprPostData.Operation = "69";
      this.iprPostData.NotesSet.results.push({ 'Tdline': this.notes });
      // this.iprPostData.NotesSet.results[0].Tdline = this.notes;
      this.iprPostData.PaymtDt = null;
      this.requestService.sendOtpForRevoke(this.obj).subscribe(
        (res) => {
          if (res["d"].results[0].Error === "") {
            this.requestService.postInstalmentRequest(this.iprPostData).subscribe(
              (res) => {
                this.OtpSuccess = true;
                this.Notes = false;
                this.showDetails = false;
                this.counter = 0;
                $("#myModal").modal("hide");
              },
              (err) => {
                this.counter = 0;
                this.notifierService.notify(
                  "error",
                  err.error.error.innererror.errordetails[0].message
                );
              }
            );
          } else {
            this.notifierService.notify("error", this.lang.zakatSc.verifyError);
          }
        },
        (err) => {
          this.counter = 0;
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    } else {
      this.counter = 0;
      this.counterSubscription.unsubscribe();
      $("#myModal").modal("hide");
      this.router.navigate(["/mains/installmentplan"])
    }

  }

  resendOTP() {
    // console.log('this.obj', this.obj);
    this.obj["code"] = '';
    this.requestService.sendOtpForRevoke(this.obj).subscribe(
      (res) => {
        this.resendFlag = true;
        this.enableResendButton = false;
        //this.counter = 120;
        // this.startTimeInterval();
        this.resetOTPValues();
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  ngDoCheck(): void {
    if (this.counter === 0) {
      this.counterSubscription.unsubscribe();
      this.enableResendButton = true;
    }
    if (this.resendFlag) {
      this.resendFlag = false;
      this.counter = 120;
      this.enableResendButton = false;
      this.otp = [];
      this.startTimeInterval();
    }
  }

  resetOTPValues() {
    this.e1.nativeElement.value = '';
    this.e2.nativeElement.value = '';
    this.e3.nativeElement.value = '';
    this.e4.nativeElement.value = '';
  }

  openOtpModel() {
    this.submitted = true;
    if (this.notes !== '') {
      this.requestService.sendOtpForRevoke(this.obj).subscribe(
        (res) => {
          $("#myModal").modal("show");
          this.startTimeInterval();
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    } else {
      this.notifierService.notify("error", this.lang.zakatSc.eNotesMis);
    }
    // this.revokeClicked = false
    // this.showDetails = false;
    // this.showVerification = true;
  }

  startTimeInterval() {
    setTimeout(() => {
      $("#e1Id").focus();
    }, 1);
    this.counterSubscription = interval(1000).subscribe((count) => {
      console.log((this.counter = this.counter - 1));
      this.transform();
    })
  }

  keyUpEvent(event, index) {
    var x = event.which || event.keycode;
    this.otp[index - 1] = event.target.value;
    let nextInput = event.srcElement.nextElementSibling;
    if (index <= 3 && nextInput !== null) {
      if ((x >= 48 && x <= 57) || /[0-9]/.test(event.target.value)) {
        nextInput.focus();
      } else {
        event.currentTarget.value = "";
      }
    }

    if (index == 4) {
      this.e1.nativeElement.focus();
    }
    this.getOTPFromUser(this.otp.join(""));
    // console.log(event);
    console.log(index);
  }

  transform() {
    const minutes: number = Math.floor(this.counter / 60);
    const seconds = this.counter - minutes * 60;
    let secDisplay = seconds + "";
    if (seconds < 10) {
      secDisplay = "0" + seconds;
    }
    this.counterDisplay = minutes + ":" + secDisplay;
  }

  openDetails() {
    this.notes = "";
    this.Notes = false;
    this.showDetails = true;
    this.OtpSuccess = false;
  }

  revokeInvoice(fbNum) {
    $("#revokeOption").modal("hide");
    this.requestService.onClickRevokeButton(fbNum).subscribe(
      (res) => {
        console.log("response from click", res);
        const obj = { fbNum: fbNum };
        const result = res["d"];
        this.Notes = true;
        this.showDetails = false;
        // }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  downloadAck(fbNum) {
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

  reSubmit() {
    this.iprPostData.Operation = '01';
    this.requestService.postInstalmentRequest(this.iprPostData).subscribe((res) => {

    }, (err) => {

    })
  }

  //doughnutChartData: MultiDataSet = [[55, 5, 40]];
  public lineChartColors: Color[] = [
    {
      backgroundColor: ["#00674e", "#95d600", "#ebebeb"],
    },
  ];

  public lineChartLegend: Chart;
  public douChartLegend = true;

  chartOptions: any = {
    cutoutPercentage: 90,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontSize: 10,
        usePointStyle: true,
      },
    },
  };
  doughnutChartType: ChartType = "doughnut";
  doughnutChartLegend = true;
}
