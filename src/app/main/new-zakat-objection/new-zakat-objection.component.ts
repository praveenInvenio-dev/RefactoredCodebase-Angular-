import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import { ZakatObjectionConstants } from "src/app/constants/ZakatObjectionConstants";
import { ZakatObjectionService } from "src/app/services/zakat-objection.service";

@Component({
  selector: "app-new-zakat-objection",
  templateUrl: "./new-zakat-objection.component.html",
  styleUrls: ["./new-zakat-objection.component.css"],
})
export class NewZakatObjectionComponent implements OnInit {
  lang = ZakatObjectionConstants["en"];
  processActive = 1;
  objectionSubmitted = false;
  objectionDetails: any;
  returns = new FormArray([]);
  closedReturns = [];
  paymentType = "";
  bankGuaranteeAttachments = [];
  mainAttachments = [];
  retGuid = null;

  constructor(
    public zakatObjectionService: ZakatObjectionService,
    public notifierService: NotifierService,
    public _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar")
      this.lang = ZakatObjectionConstants["ar"];
    this.getObjectionDetails();
    this.addReturn();
  }

  getObjectionDetails() {
    this.zakatObjectionService.getObjectionDetail().subscribe(
      (res) => {
        console.log(res);
        this.objectionDetails = res["d"];
        this.retGuid = this.objectionDetails["CaseGuid"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addReturn() {
    this.returns.push(
      this._formBuilder.group({
        refNumber: [null, Validators.required],
        assessmentYear: [""],
        period: [""],
        currency: [""],
      })
    );
  }

  getReferenceNumberDetails(index) {
    this.zakatObjectionService
      .getReferenceNumberDetails(this.returns.value[index]["refNumber"])
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          let errorMsg = "";
          if (error?.error?.error?.innererror?.errordetails) {
            const messageArray = error["error"]["error"]["innererror"][
              "errordetails"
            ].map((err) => err.message);
            messageArray.splice(messageArray.length - 1, 1);
            console.log(messageArray);
            errorMsg = messageArray.join(" ");
          }
          if (errorMsg !== "") {
            this.notifierService.notify("error", errorMsg);
          }
        }
      );
  }

  fetchPaymentDetails(fbNum, paymentType) {
    this.zakatObjectionService
      .fetchPaymentDetails(fbNum, paymentType)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          let errorMsg = "";
          if (error?.error?.error?.innererror?.errordetails) {
            const messageArray = error["error"]["error"]["innererror"][
              "errordetails"
            ].map((err) => err.message);
            messageArray.splice(messageArray.length - 1, 1);
            console.log(messageArray);
            errorMsg = messageArray.join(" ");
          }
          if (errorMsg !== "") {
            this.notifierService.notify("error", errorMsg);
          }
        }
      );
  }

  removeReturn(index) {
    const returnIndex = this.closedReturns.indexOf(index);
    if (returnIndex >= 0) {
      this.closedReturns.splice(returnIndex, 1);
    }
    this.returns.removeAt(index);
  }

  toggleReturn(index) {
    const returnIndex = this.closedReturns.indexOf(index);
    if (returnIndex < 0) {
      this.closedReturns.push(index);
    } else {
      this.closedReturns.splice(returnIndex, 1);
    }
  }

  onSubmit() {
    this.processActive = 2;
  }
  onSubmit2() {
    this.processActive = 3;
  }
  onSubmit3() {
    this.processActive = 4;
  }
  onSubmit4() {
    this.processActive = 5;
  }
  onSubmit5() {
    this.processActive = 6;
  }
  onSubmit6() {
    this.processActive = 7;
  }
  onSubmit7() {
    this.processActive = 8;
  }
  onSubmit8() {
    this.objectionSubmitted = true;
  }
  back() {
    if (this.processActive > 1) this.processActive--;
  }

  changePaymentType(paymentType) {
    this.paymentType = paymentType;
  }

  uploadFiles(files, attType) {
    files = [...files];
    console.log(files);
    switch (attType) {
      case "OB20":
        console.log(document.getElementById("mainAttachments"));
        document.getElementById("mainAttachments")["value"] = "";
        break;
      case "ZOBG":
        console.log(document.getElementById("bankGuaranteeAttachments"));
        document.getElementById("bankGuaranteeAttachments")["value"] = "";
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
      if (attType === "OB20") {
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
      } else if (attType === "ZOBG") {
        if (this.bankGuaranteeAttachments.length === 10) {
          this.notifierService.notify("error", this.lang["maxNoOfFiles"]);
          return false;
        }
        const fileIndex = this.bankGuaranteeAttachments.findIndex(
          (file) => filename === file["Filename"]
        );
        if (fileIndex > -1) {
          this.notifierService.notify("error", this.lang["fileAlreayExists"]);
          return false;
        }
      }
      formData.append("fileUpload", files[i]);
    }
    this.zakatObjectionService
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
    if (attType === "OB20") {
      this.mainAttachments.push(file);
    } else if (attType === "ZOBG") {
      this.bankGuaranteeAttachments.push(file);
    }
  }

  deleteAttachment(attType, doguid, index) {
    this.zakatObjectionService.deleteAttachment(attType, doguid).subscribe(
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
    if (attType === "OB20") {
      this.mainAttachments.splice(index, 1);
    } else if (attType === "ZOBG") {
      this.bankGuaranteeAttachments.splice(index, 1);
    }
  }
}
