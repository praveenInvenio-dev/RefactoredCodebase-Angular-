import { Component, OnDestroy, OnInit } from "@angular/core";
import { VATCertificateConstants } from "src/app/constants/VATCertificateConstants";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
import { Subscription } from "rxjs";
import { ReprintVatCertificateService } from "src/app/services/reprint-vat-certificate.service";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-reprint-vat-certificate",
  templateUrl: "./reprint-vat-certificate.component.html",
  styleUrls: ["./reprint-vat-certificate.component.css"],
})
export class ReprintVatCertificateComponent implements OnInit, OnDestroy {
  dir: String = "ltr";
  labels: any;
  RefundType: any;
  subscription: Subscription;
  rePrintVATForm: FormGroup;
  notification: any;
  //data
  tin: any;
  taxpayerName: any;
  vatAccount: any;
  certificateTypes: any;
  CertType: any;
  refNumber: any;
  reprintData: any;
  selectedCertType: any;
  isDataAvailable: boolean = false;

  constructor(
    public router: Router,
    private notificationService: NotificationService,
    public reprintVatCertificateService: ReprintVatCertificateService,
    private _formBuilder: FormBuilder,
    public appSrv: AppService
  ) { }

  ngOnInit(): void {
    let lang = localStorage.getItem("lang") === "ar" ? "ar" : "en";
    this.dir = lang === "ar" ? "rtl" : "ltr";
    this.labels = VATCertificateConstants[lang];
    this.rePrintVATForm = this._formBuilder.group({
      certificate_type: [this.selectedCertType, Validators.required],
    });

    this.getInitialData();
  }

  getInitialData() {
    this.reprintVatCertificateService.getInitialData().subscribe(
      (res) => {
        this.setInitialData(res);
        this.isDataAvailable = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setInitialData(res) {
    this.reprintData = res["d"];
    this.tin = res["d"].Tin;
    this.vatAccount = res["d"].VatAccount;
    this.refNumber = res["d"].RefNumber;
    this.certificateTypes = res["d"].CoTypeSet.results;
    this.selectedCertType = this.certificateTypes[0].Cokey;
    this.refNumber = this.certificateTypes[0].RefNumber;
    this.CertType = this.certificateTypes[0].Cotyp;
    this.formatName(res["d"]);
  }

  formatName(data) {
    let name_keys = [
      "NameFirst",
      "NameLast",
      "NameOrg1",
      "NameOrg2",
      "NameOrg3",
      "NameOrg4",
    ];
    let names = [];
    name_keys.forEach((el) => {
      if (data[el].trim() != "") {
        names.push(data[el]);
      }
    });
    this.taxpayerName = names.join(", ");
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }

  onCertTypeChange(e) {
    this.selectedCertType = e;
    this.certificateTypes.filter((el) => {
      if (el.Cokey == e) {
        this.refNumber = el.RefNumber;
        this.CertType = el.Cotyp;
      }
    });
  }

  downloadCertificate() {
    if (this.rePrintVATForm.valid) {
      this.reprintData.Cokey = this.selectedCertType;
      this.reprintData.CertType = this.CertType;
      this.reprintData.RefNumber = this.refNumber;
      this.reprintVatCertificateService
        .postReprintCertificate(this.reprintData)
        .subscribe(
          (res) => {
            let Cotyp = res["d"].CertType;
            let Cokey = res["d"].Cokey;
            this.reprintVatCertificateService
              .getInitialDatafordownload()
              .subscribe((res) => {
                this.reprintVatCertificateService.getDownloadCertificate(
                  Cokey,
                  Cotyp
                );
                this.setInitialData(res);
              });
          },
          (error) => {
            console.log(error);
          }
        );
      this.notification = {
        show: true,
        title: this.labels.notificationTitle,
        description: this.labels.notificationDescription,
      };
      this.notificationService.executeAction(this.notification);
    }
  }

  ngOnDestroy() {
    if (this.notification) {
      this.notification.show = false;
      this.notificationService.executeAction(this.notification);
    }
  }
}
