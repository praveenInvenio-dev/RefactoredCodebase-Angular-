import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { ReturnsService } from "../returns.service";
import { VatServiceService } from "src/app/services/vat-service.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { SuffixdatePipe } from "../suffixdate.pipe";
import * as moment from "moment";
import { Router, ActivatedRoute } from "@angular/router";
import { form12constants } from "src/app/returns/form12/form12constants.model";
import * as FileSaver from "file-saver";
import { toHijri } from "hijri-converter";
import { NotifierService } from "angular-notifier";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
// import { release } from 'os';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-form12",
  templateUrl: "./form12.component.html",
  styleUrls: ["./form12.component.css"],
})
export class Form12Component implements OnInit {
  enableonAmmendscreen: boolean = false;
  enableonsubmit: boolean = false;
  Form12DetailsScreen: boolean = true;
  confirm: boolean = false;
  releasestatus: string;
  searchText: any;
  lang: any;
  direction: string;
  step: number = 1;
  zacatList: any = [];
  zacattaxObject: any;
  form12ReleaseObject: any = [];
  form12List: any = [];
  form12ListObjMod: any = [];
  form12SubmitResponse: any = [];
  form12ButtonsList: any = [];
  form12ConfirmList: any = [];
  releaseObj: any = [];
  InvoiceSet: any = [];
  AttachmentSet: any = [];
  ThresholdSet: any = [];
  fbGuid: number;
  Euser: number;
  Form12Form: FormGroup;
  disableinput: string;
  form12ReturnList: any = [];
  language: any = [];
  invoiseSet: any = [];
  tokensList: any = [];
  totalSales: number;
  btnAmend: boolean = false;
  btnRelease: boolean = false;
  isFirst: boolean = true;
  invoice: boolean = false;
  periodStartDate: any;
  periodEndDate: any;
  errorMessage: any;
  form12DetailsDuplicate: any;
  isChecked: boolean = false;
  attachmentError: boolean = false;
  fileSizeError: boolean = false;
  attchmentMand: boolean = false;
  confirmObjection: boolean = false;
  invoiceData: any;
  url: any;
  constructor(
    private returnsService: ReturnsService,
    private vatService: VatServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip("hide");
    //For Tab Active
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab",JSON.stringify("الزكاة و ضريبة الدخل"));
    //   }else
    //   {
    //     localStorage.setItem("ActiveTab",JSON.stringify("Zakat & CIT"));
    //   }
    //For Tab Active end

    if (localStorage.getItem("lang") === "ar") {
      this.lang = form12constants.langz.arb.form12;
      this.direction = form12constants.langz.arb.dir;
    } else {
      this.lang = form12constants.langz.eng.form12;
      this.direction = form12constants.langz.eng.dir;
    }
    this.language = localStorage.getItem("lang");

    // if (this.language == 'ar') {
    //   moment.locale('ar-Sa');
    // }
    // else {
    moment.locale("en-Us");

    // }

    this.fbGuid = this.route.snapshot.params["fbGuild"];
    this.Euser = this.route.snapshot.params["euser"];
    this.Form12DetailsScreen = true;
    this.enableonAmmendscreen = false;
    this.enableonsubmit = false;
    this.step = 1;
    this.confirm = false;
    //  this.GetUserDetails();
    this.getForm12Details();
    // this.EnableButtons(this.form12ButtonsList);

    //  if(this.form12List.Statusz == "E0003")
    //  {
    //   this.btnRelease=true;
    //  }

    let datetime = new Date();
    this.Form12Form = this.fb.group({
      TotalVATSales1: [0, [Validators.required]],
      AverageNumberofLabour1: [0, [Validators.required]],
      ImportsValue1: [0, [Validators.required]],
      SalesfromPointofSales1: [0, [Validators.required]],
      ContactsfromETIMADSystem1: [0, [Validators.required]],
      ExportsValue1: [0, [Validators.required]],
      PurchaseValue1: [0, [Validators.required]],
      CapitalAmount1: [0, [Validators.required]],
      TotalVATSalesChange: [""],
      AverageNumberofLabourChange: [""],
      ImportsValueChange: [""],
      SalesfromPointofSalesChange: [""],
      ContactsfromETIMADSystemChange: [""],
      ExportsValueChange: [""],
      PurchaseValueChange: [""],
      CapitalAmountChange: [""],
    });
  }

  // SubmitDisabled:boolean=false;
  // error:boolean=false;
  // ChangeReasonValidate(OldVal,NewVal,ChangeReason){
  //   this.SubmitDisabled = (+NewVal)<(+OldVal)?(ChangeReason.length<=0?true: false): false;
  //   this.error = (ChangeReason.length<=0)&&((+NewVal)<(+OldVal))?true: false;
  // }

  // GetUserDetails() {
  //   this.vatService.getVatData().subscribe(
  //     (res) => {
  //       console.log("resdata", res["d"]);
  //       this.zacattaxObject = res;

  //     },
  //   );
  // }
  @ViewChild("inputFile") myInputVariable: ElementRef;
  //ErrorFile:boolean;
  setZ12V = [];
  setZ12L = [];
  setZ12I = [];
  setZ12S = [];
  setZ12D = [];
  setZ12E = [];
  setZ12P = [];
  setZ12C = [];
  AttachDelAllow: boolean = true;

  ValidateFile(name: String) {
    // alert(name);
    // let filesize = 1000;
    var ext = name.substring(name.lastIndexOf(".") + 1);
    if (ext.toLowerCase() == "pdf") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "xls") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "xlsx") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "doc") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "docx") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "png") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "jpg") {
      this.attachmentError = false;
      return true;
    } else if (ext.toLowerCase() == "jpeg") {
      this.attachmentError = false;
      return true;
    } else {
      this.attachmentError = true;
      if (this.attachmentError == true) {
        if (this.language == "ar") {
          this.errorMessage =
            "اختر ملفًا بملحق .XLS ، .XLSX ، .DOC ، .DOCX ، .PDF ، .JPG ، .JPEG ، .PNG";
        } else {
          this.errorMessage =
            "Choose only file with extension .XLS, .XLSX, .DOC, .DOCX, .PDF, .JPG, .JPEG &.PNG";
        }
        jQuery("#AttachmentModal").modal("show");
        return false;
      }
    }
  }

  FileUpload(event, doctyp) {
    //for (let i = 0; i < event.target.files.length; i++) {
    const frmData = new FormData();
    let filename;
    let filesize;
    filename = event.target.files[0]["name"];
    // alert(filename);
    filesize = event.target.files[0]["size"];

    let fileset = this.form12List.AttachSet["results"].filter(
      (x) => x.Dotyp == doctyp
    );
    if (fileset.length > 0) {
      console.log(
        "fileset",
        fileset.filter((name) => name.Filename == filename)
      );
      fileset = fileset.filter((name) => name.Filename == filename);
      // event.target.value = "";
      if (fileset.length == 1) {
        if (this.language == "ar") {
          this.errorMessage = "يوجد ملف بنفس الاسم مرفق مسبقا";
        } else {
          this.errorMessage = "File with the same name already exists";
        }

        jQuery("#AttachmentModal").modal("show");
        jQuery("body").addClass("modalopen");

        // setTimeout(function () {
        //   jQuery('#infoModal1').modal('hide');
        // }, 3000);
        return false;
      }
    }

    const fsize = Math.round(filesize / 1024);

    if (fsize == 0) {
      this.fileSizeError = true;
      event.target.value = "";
      if (this.fileSizeError == true) {
        if (this.language == "ar") {
          this.errorMessage =
            "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر";
        } else {
          this.errorMessage =
            "File Name, Doc Type, Ret.Guid and File Content cannot be blank in action N";
        }
        jQuery("#AttachmentModal").modal("show");
        jQuery("body").addClass("modalopen");
        return false;
      } else {
        this.fileSizeError = false;
      }
    } else if (fsize > 5120) {
      // alert('File size Exceed');
      this.fileSizeError = true;
      event.target.value = "";
      if (this.fileSizeError == true) {
        if (this.language == "ar") {
          this.errorMessage = "اعلى حجم للملف هو 5MB";
        } else {
          this.errorMessage = "Maximum file size is 5MB";
        }
        jQuery("#AttachmentModal").modal("show");
        jQuery("body").addClass("modalopen");
        return false;
      } else {
        this.fileSizeError = false;
      }
    }

    if (!this.ValidateFile(event.target.files[0].name)) {
      console.log("Selected file format is not supported");
      return false;
    }

    frmData.append("fileUpload", event.target.files[0]);
    this.returnsService
      .SaveAttachmentsForm12(
        this.form12List["FormGuid"],
        filename,
        frmData,
        doctyp
      )
      .subscribe(
        (data) => {
          //console.log(data)

          let obj = {
            AttBy: "TP",
            ByPusr: "",
            DataVersion: "00000",
            DocUrl: data["d"]["DocUrl"],
            Doguid: data["d"]["Doguid"],
            Dotyp: doctyp,
            Erfdt: "/Date(" + new Date().getTime() + ")/",
            Erftm:
              "PT" +
              new Date().getHours() +
              "H" +
              new Date().getMinutes() +
              "M" +
              new Date().getSeconds() +
              "S",
            FileExtn: data["d"]["Filename"].toString().split(".")[
              data["d"]["Filename"].toString().split(".").length - 1
            ],
            Filename: data["d"]["Filename"],
            Mimetype: "",
            OutletRef: "",
            RetGuid: data["d"]["RetGuid"],
            SchGuid: "",
            Seqno: "000001",
            Srno: this.form12List.AttachSet["results"].length,
          };
          this.form12List.AttachSet["results"].push(obj);
          event.target.value = "";
          if (this.myInputVariable != undefined) {
            this.myInputVariable.nativeElement.value = "";
          }
          // this.myInputVariable.nativeElement.value = '';
          this.AttachmentSets();
        },
        (err) => {
          console.error(err);
          // this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"]);
          // this.myInputVariable.nativeElement.value = '';
        }
      );
    //}
  }
  DeleteAttachement(obj) {
    this.returnsService
      .DeleteAttachementsForm12(obj["Srno"], obj["Doguid"], obj["Dotyp"])
      .subscribe(
        (data) => {
          //console.log(data);
          this.form12List.AttachSet["results"] = this.form12List.AttachSet[
            "results"
          ].filter((data) => {
            return data["Filename"] != obj["Filename"];
          });
          this.AttachmentSets();
        },
        (err) => {
          console.error(err);
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
        }
      );
  }

  AttachmentSets() {
    this.setZ12V =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12V") ||
      [];
    this.setZ12L =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12L") ||
      [];
    this.setZ12I =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12I") ||
      [];
    this.setZ12S =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12S") ||
      [];
    this.setZ12D =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12D") ||
      [];
    this.setZ12E =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12E") ||
      [];
    this.setZ12P =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12P") ||
      [];
    this.setZ12C =
      this.form12List.AttachSet["results"].filter((x) => x.Dotyp == "Z12C") ||
      [];
  }

  getArabicFormat(data) {
    let datz = "";
    let value = data;
    let year = "";
    let mnth = "";
    let day = "";
    let d = new Date(value);
    year = d.getFullYear().toString();

    //value = value.substring(value.indexOf("/") + 1);
    if (d.getMonth() + 1 < 10) mnth = "0" + (d.getMonth() + 1);
    else mnth = (d.getMonth() + 1).toString();
    //value = value.substring(value.indexOf("/") + 1);
    if (d.getDate() < 10) day = "0" + d.getDate();
    else day = d.getDate().toString();
  }
  getEnglishFormat(data) {
    let datz = "";
    let value = data;
    let year = "";
    let mnth = "";
    let day = "";
    let d = new Date(value);
    year = d.getFullYear().toString();

    //value = value.substring(value.indexOf("/") + 1);
    if (d.getMonth() + 1 < 10) mnth = "0" + (d.getMonth() + 1);
    else mnth = (d.getMonth() + 1).toString();
    //value = value.substring(value.indexOf("/") + 1);
    if (d.getDate() < 10) day = "0" + d.getDate();
    else day = d.getDate().toString();

    console.log("values", year, mnth, day);
  }

  getForm12Details() {
    this.returnsService
      .getForm12Details(this.fbGuid, this.Euser)
      .subscribe((data) => {
        this.form12List = data["d"];
        this.form12DetailsDuplicate = data["d"];
        this.form12ReleaseObject = data["d"];
        console.log("this.form12List", this.form12List);
        moment.locale("en-Us");

        // }
        this.periodStartDate = this.form12List.Abrzu;
        this.periodEndDate = this.form12List.Abrzo;
        if (this.form12List.Persl < 1900) {
          this.periodStartDate = toHijri(
            +moment(
              new Date(
                +this.periodStartDate
                  .toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("YYYY"),
            +moment(
              new Date(
                new Date(
                  +this.periodStartDate
                    .toString()
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              )
            ).format("MM"),
            +moment(
              new Date(
                new Date(
                  +this.periodStartDate
                    .toString()
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              )
            ).format("DD")
          );
          this.periodEndDate = toHijri(
            +moment(
              new Date(
                +this.periodEndDate
                  .toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("YYYY"),
            +moment(
              new Date(
                +this.periodEndDate
                  .toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("MM"),
            +moment(
              new Date(
                +this.periodEndDate
                  .toString()
                  .replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ).format("DD")
          );
          console.log("Dates", this.periodStartDate, this.periodEndDate);
          this.periodStartDate = this.periodStartDate;
          this.periodEndDate = this.periodEndDate;
        } else {
          this.periodStartDate = moment(
            new Date(
              +this.periodStartDate
                .toString()
                .replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");

          this.periodEndDate = moment(
            new Date(
              +this.periodEndDate
                .toString()
                .replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
        }
        this.getForm12Buttons(this.form12ReleaseObject);
      });
  }
  getForm12Buttons(obj) {
    this.returnsService
      .getForm12ButtonsDetails(obj.Fbnum, obj.Statusz)
      .subscribe((data) => {
        this.form12ButtonsList = data["d"]["UI_BtnSet"]["results"];
        console.log("form12ButtonsList buttonsssssss", this.form12ButtonsList);
        this.EnableButtons(this.form12ButtonsList);
      });
    // console.log("bbbbbbbbbbbbbbbbbb",this.form12ButtonsList)
  }

  EnableButtons(btnObj) {
    console.log("tertdtetetetetetetwe", btnObj);
    for (let i = 0; i < btnObj.length; i++) {
      console.log("button", btnObj[i].Button);
      if (btnObj[i].Button == 22) {
        if (this.isFirst) {
          this.btnAmend = true;
          this.btnRelease = false;
        }
      } else if (btnObj[i].Button == 54) {
        if (this.isFirst) {
          this.btnRelease = true;
          this.btnAmend = false;
        }
      } else if (btnObj[i].Button == 53) {
        if (this.isFirst) {
          this.invoice = true;
        }
      }
    }
  }

  releaseForm12(form12ListObj) {
    this.releaseObj = form12ListObj;
    console.log("releaseObj", this.releaseObj);
    jQuery("#ConfirmModal").modal("show");
  }
  release() {
    this.enableonAmmendscreen = false;
    this.enableonsubmit = false;
    this.Form12DetailsScreen = true;
    this.releaseObj["Operationz"] = "59";
    this.releaseObj["UserTypz"] = "TP";
    this.form12ListObjMod = this.releaseObj;
    let InvoiceSet = this.form12ListObjMod["InvoiceSet"]["results"] || [];
    for (let i = 0; i < InvoiceSet.length; i++) {
      this.form12ListObjMod["InvoiceSet"]["results"][i]["Disamt"] = parseFloat(
        this.form12ListObjMod["InvoiceSet"]["results"][i]["Disamt"]
      ).toFixed(2);
      this.form12ListObjMod["InvoiceSet"]["results"][i]["Sdisamt"] = parseFloat(
        this.form12ListObjMod["InvoiceSet"]["results"][i]["Sdisamt"]
      ).toFixed(2);
      this.form12ListObjMod["InvoiceSet"]["results"][i]["Stotamt"] = parseFloat(
        this.form12ListObjMod["InvoiceSet"]["results"][i]["Stotamt"]
      ).toFixed(2);
      this.form12ListObjMod["InvoiceSet"]["results"][i][
        "Sundisamt"
      ] = parseFloat(
        this.form12ListObjMod["InvoiceSet"]["results"][i]["Sundisamt"]
      ).toFixed(2);
      this.form12ListObjMod["InvoiceSet"]["results"][i]["Totamt"] = parseFloat(
        this.form12ListObjMod["InvoiceSet"]["results"][i]["Totamt"]
      ).toFixed(2);
      this.form12ListObjMod["InvoiceSet"]["results"][i][
        "Undisamt"
      ] = parseFloat(
        this.form12ListObjMod["InvoiceSet"]["results"][i]["Undisamt"]
      ).toFixed(2);
    }
    console.log("form12ListObjMod", this.form12ListObjMod);

    this.returnsService.Form12ReleaseDetails(this.form12ListObjMod).subscribe(
      (data) => {
        this.form12List = data["d"];
        console.log("this.form12Listreleaseee", this.form12List);
        this.step = 2;
        this.btnRelease = false;
        this.btnAmend = true;
        this.releasestatus = "E0003";
        this.getForm12Details();
        setTimeout(() => {
          if (this.language == "ar") {
            //this.errorMessage = 'تم تصدير الإقرار بنجاح';
            this.notifierService.notify("success", "تم تصدير الإقرار بنجاح");
          } else {
            //this.errorMessage = "Released Successfully";
            this.notifierService.notify("success", "Released Successfully");
          }
        }, 500);
      },
      (err) => {
        console.error(err);
        this.step = 1;
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }

  ConfirmRelease() {
    jQuery("#ConfirmModal").modal("hide");
    this.release();
    //jQuery("#AttachmentModal").modal('show')

    // setTimeout(function () {
    //   jQuery('#infoModal1').modal('hide');
    // }, 1000);
  }
  ammendForm12(form12ListObj) {
    this.enableonsubmit = false;
    this.enableonAmmendscreen = true;
    this.Form12DetailsScreen = false;
    this.btnAmend = false;
    this.step = 3;
    this.isChecked = false;
    console.log("ammendForm12 form12ListObj", form12ListObj);
    this.totalSales = form12ListObj.TvtslI;
    if (this.totalSales < 187500) {
      this.Form12Form.get("TotalVATSales1").disable();
      this.Form12Form.get("TotalVATSalesChange").disable();
    }
    this.Form12Form.controls["TotalVATSales1"].setValue(
      parseFloat(form12ListObj["TvtslI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["TotalVATSalesChange"].setValue(
      form12ListObj["TvtslResn"]
    );
    if (form12ListObj.TvtslI > 187500) {
      this.Form12Form.get("AverageNumberofLabour1").disable();
      this.Form12Form.get("AverageNumberofLabourChange").disable();
    }
    this.Form12Form.controls["AverageNumberofLabour1"].setValue(
      parseFloat(form12ListObj["LabnoI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["AverageNumberofLabourChange"].setValue(
      form12ListObj["LabnoResn"]
    );

    if (form12ListObj.TvtslI > 187500) {
      this.Form12Form.get("ImportsValue1").disable();
      this.Form12Form.get("ImportsValueChange").disable();
    }
    this.Form12Form.controls["ImportsValue1"].setValue(
      parseFloat(form12ListObj["ImpvalI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["ImportsValueChange"].setValue(
      form12ListObj["ImpvalResn"]
    );
    if (form12ListObj.TvtslI > 187500) {
      this.Form12Form.get("SalesfromPointofSales1").disable();
      this.Form12Form.get("SalesfromPointofSalesChange").disable();
    }
    this.Form12Form.controls["SalesfromPointofSales1"].setValue(
      parseFloat(form12ListObj["PtoslI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["SalesfromPointofSalesChange"].setValue(
      form12ListObj["PtoslResn"]
    );
    if (form12ListObj.TvtslI > 187500) {
      this.Form12Form.get("ContactsfromETIMADSystem1").disable();
      this.Form12Form.get("ContactsfromETIMADSystemChange").disable();
    }
    this.Form12Form.controls["ContactsfromETIMADSystem1"].setValue(
      parseFloat(form12ListObj["EtimadI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["ContactsfromETIMADSystemChange"].setValue(
      form12ListObj["EtimadResn"]
    );
    if (form12ListObj.TvtslI > 187500) {
      this.Form12Form.get("ExportsValue1").disable();
      this.Form12Form.get("ExportsValueChange").disable();
    }
    this.Form12Form.controls["ExportsValue1"].setValue(
      parseFloat(form12ListObj["ExamtI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["ExportsValueChange"].setValue(
      form12ListObj["ExamtResn"]
    );
    if (form12ListObj.TvtslI > 187500) {
      this.Form12Form.get("PurchaseValue1").disable();
      this.Form12Form.get("PurchaseValueChange").disable();
    }
    this.Form12Form.controls["PurchaseValue1"].setValue(
      parseFloat(form12ListObj["PramtI"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["PurchaseValueChange"].setValue(
      form12ListObj["PramtResn"]
    );
    // if (form12ListObj.TvtslI > 187500) {
    //   this.Form12Form.get('CapitalAmount1').disable();
    //   this.Form12Form.get('CapitalAmountChange').disable();
    // }
    this.Form12Form.controls["CapitalAmount1"].setValue(
      parseFloat(form12ListObj["Cpamt"] || 0.0).toFixed(2)
    );
    this.Form12Form.controls["CapitalAmountChange"].setValue(
      form12ListObj["CpamtResn"]
    );
  }
  submitForm12() {
    console.log(this.form12DetailsDuplicate);
    if (this.form12DetailsDuplicate.TvtslI > 187500) {
      if (
        this.Form12Form.value.TotalVATSales1 ==
          this.form12DetailsDuplicate.TvtslI &&
        this.Form12Form.value.CapitalAmount1 ==
          this.form12DetailsDuplicate.Cpamt
      ) {
        jQuery("#infoModal1").modal("show");
        setTimeout(function () {
          jQuery("#infoModal1").modal("hide");
        }, 1000);
        if (this.language == "ar") {
          this.errorMessage = "لم يتم اي تغييرات ، لا يمكن إصدار الإقرار";
        } else {
          this.errorMessage = "No changes made, Form cannot be submitted";
        }
      } else if (this.isChecked == false) {
        jQuery("#infoModal1").modal("show");
        setTimeout(function () {
          jQuery("#infoModal1").modal("hide");
        }, 1000);
        if (this.language == "ar") {
          this.errorMessage = "يرجى اختيار مربع إخلاء المسؤولية قبل التقديم";
        } else {
          this.errorMessage =
            "Please select the disclaimer checkbox before submit.";
        }
      } else {
        this.step = 4;
        this.btnAmend = false;
        this.enableonsubmit = true;
        this.enableonAmmendscreen = false;
        this.Form12DetailsScreen = false;
        this.AttachDelAllow = false;
        this.isFirst = false;

        this.form12List["TvtslI"] = parseFloat(
          this.Form12Form.value.TotalVATSales1 || 0.0
        ).toFixed(2);
        this.form12List["LabnoI"] = parseFloat(
          this.Form12Form.value.AverageNumberofLabour1 || 0.0
        ).toFixed(2);
        this.form12List["ImpvalI"] = parseFloat(
          this.Form12Form.value.ImportsValue1 || 0.0
        ).toFixed(2);
        this.form12List["PtoslI"] = parseFloat(
          this.Form12Form.value.SalesfromPointofSales1 || 0.0
        ).toFixed(2);
        this.form12List["EtimadI"] = parseFloat(
          this.Form12Form.value.ContactsfromETIMADSystem1 || 0.0
        ).toFixed(2);
        this.form12List["ExamtI"] = parseFloat(
          this.Form12Form.value.ExportsValue1 || 0.0
        ).toFixed(2);
        this.form12List["PramtI"] = parseFloat(
          this.Form12Form.value.PurchaseValue1 || 0.0
        ).toFixed(2);
        this.form12List["Cpamt"] = parseFloat(
          this.Form12Form.value.CapitalAmount1 || 0.0
        ).toFixed(2);

        this.form12List[
          "TvtslResn"
        ] = this.Form12Form.value.TotalVATSalesChange;
        this.form12List[
          "LabnoResn"
        ] = this.Form12Form.value.AverageNumberofLabourChange;
        this.form12List[
          "ImpvalResn"
        ] = this.Form12Form.value.ImportsValueChange;
        this.form12List[
          "PtoslResn"
        ] = this.Form12Form.value.SalesfromPointofSalesChange;
        this.form12List[
          "EtimadResn"
        ] = this.Form12Form.value.ContactsfromETIMADSystemChange;
        this.form12List["ExamtResn"] = this.Form12Form.value.ExportsValueChange;
        this.form12List[
          "PramtResn"
        ] = this.Form12Form.value.PurchaseValueChange;
        this.form12List[
          "CpamtResn"
        ] = this.Form12Form.value.CapitalAmountChange;

        this.form12List["Operationz"] = "05";
        this.form12List["UserTypz"] = "TP";
        this.returnsService
          .Form12ammendDetails(this.form12List)
          .subscribe((data) => {
            this.form12SubmitResponse = data["d"];
            // this.getForm12DetailsOnRefresh();
            console.log("this.form12SubmitResponse", this.form12SubmitResponse);
          });
      }
    } else if (this.form12DetailsDuplicate.TvtslI < 187500) {
      if (
        this.Form12Form.value.AverageNumberofLabour1 ==
          this.form12DetailsDuplicate.LabnoI &&
        this.Form12Form.value.ImportsValue1 ==
          this.form12DetailsDuplicate.ImpvalI &&
        this.Form12Form.value.SalesfromPointofSales1 ==
          this.form12DetailsDuplicate.PtoslI &&
        this.Form12Form.value.ContactsfromETIMADSystem1 ==
          this.form12DetailsDuplicate.EtimadI &&
        this.Form12Form.value.ExportsValue1 ==
          this.form12DetailsDuplicate.ExamtI &&
        this.Form12Form.value.PurchaseValue1 ==
          this.form12DetailsDuplicate.PramtI &&
        this.Form12Form.value.CapitalAmount1 ==
          this.form12DetailsDuplicate.Cpamt
      ) {
        jQuery("#infoModal1").modal("show");
        setTimeout(function () {
          jQuery("#infoModal1").modal("hide");
        }, 1000);
        if (this.language == "ar") {
          this.errorMessage = "لم يتم اي تغييرات ، لا يمكن إصدار الإقرار";
        } else {
          this.errorMessage = "No changes made, Form cannot be submitted";
        }
      } else if (this.isChecked == false) {
        jQuery("#infoModal1").modal("show");
        setTimeout(function () {
          jQuery("#infoModal1").modal("hide");
        }, 1000);
        if (this.language == "ar") {
          this.errorMessage = "يرجى اختيار مربع إخلاء المسؤولية قبل التقديم";
        } else {
          this.errorMessage =
            "Please select the disclaimer checkbox before submit.";
        }
      } else {
        this.step = 4;
        this.btnAmend = false;
        this.enableonsubmit = true;
        this.enableonAmmendscreen = false;
        this.Form12DetailsScreen = false;
        this.AttachDelAllow = false;
        this.isFirst = false;

        this.form12List["TvtslI"] = parseFloat(
          this.Form12Form.value.TotalVATSales1 || 0.0
        ).toFixed(2);
        this.form12List["LabnoI"] = parseFloat(
          this.Form12Form.value.AverageNumberofLabour1 || 0.0
        ).toFixed(2);
        this.form12List["ImpvalI"] = parseFloat(
          this.Form12Form.value.ImportsValue1 || 0.0
        ).toFixed(2);
        this.form12List["PtoslI"] = parseFloat(
          this.Form12Form.value.SalesfromPointofSales1 || 0.0
        ).toFixed(2);
        this.form12List["EtimadI"] = parseFloat(
          this.Form12Form.value.ContactsfromETIMADSystem1 || 0.0
        ).toFixed(2);
        this.form12List["ExamtI"] = parseFloat(
          this.Form12Form.value.ExportsValue1 || 0.0
        ).toFixed(2);
        this.form12List["PramtI"] = parseFloat(
          this.Form12Form.value.PurchaseValue1 || 0.0
        ).toFixed(2);
        this.form12List["Cpamt"] = parseFloat(
          this.Form12Form.value.CapitalAmount1 || 0.0
        ).toFixed(2);

        this.form12List[
          "TvtslResn"
        ] = this.Form12Form.value.TotalVATSalesChange;
        this.form12List[
          "LabnoResn"
        ] = this.Form12Form.value.AverageNumberofLabourChange;
        this.form12List[
          "ImpvalResn"
        ] = this.Form12Form.value.ImportsValueChange;
        this.form12List[
          "PtoslResn"
        ] = this.Form12Form.value.SalesfromPointofSalesChange;
        this.form12List[
          "EtimadResn"
        ] = this.Form12Form.value.ContactsfromETIMADSystemChange;
        this.form12List["ExamtResn"] = this.Form12Form.value.ExportsValueChange;
        this.form12List[
          "PramtResn"
        ] = this.Form12Form.value.PurchaseValueChange;
        this.form12List[
          "CpamtResn"
        ] = this.Form12Form.value.CapitalAmountChange;

        this.form12List["Operationz"] = "05";
        this.form12List["UserTypz"] = "TP";
        this.returnsService
          .Form12ammendDetails(this.form12List)
          .subscribe((data) => {
            this.form12SubmitResponse = data["d"];
            // this.getForm12DetailsOnRefresh();
            console.log("this.form12SubmitResponse", this.form12SubmitResponse);
          });
      }
    }

    //   else {
    //   this.step = 4;
    //   this.btnAmend = false;
    // this.enableonsubmit = true;
    // this.enableonAmmendscreen = false;
    // this.Form12DetailsScreen = false;
    // this.AttachDelAllow = false;
    // this.isFirst = false;

    // this.form12List["TvtslI"] = parseFloat(this.Form12Form.value.TotalVATSales1 || 0.00).toFixed(2);
    // this.form12List["LabnoI"] = parseFloat(this.Form12Form.value.AverageNumberofLabour1 || 0.00).toFixed(2);
    // this.form12List["ImpvalI"] = parseFloat(this.Form12Form.value.ImportsValue1 || 0.00).toFixed(2);
    // this.form12List["PtoslI"] = parseFloat(this.Form12Form.value.SalesfromPointofSales1 || 0.00).toFixed(2);
    // this.form12List["EtimadI"] = parseFloat(this.Form12Form.value.ContactsfromETIMADSystem1 || 0.00).toFixed(2);
    // this.form12List["ExamtI"] = parseFloat(this.Form12Form.value.ExportsValue1 || 0.00).toFixed(2);
    // this.form12List["PramtI"] = parseFloat(this.Form12Form.value.PurchaseValue1 || 0.00).toFixed(2);
    // this.form12List["Cpamt"] = parseFloat(this.Form12Form.value.CapitalAmount1 || 0.00).toFixed(2);

    // this.form12List["TvtslResn"] = this.Form12Form.value.TotalVATSalesChange;
    // this.form12List["LabnoResn"] = this.Form12Form.value.AverageNumberofLabourChange;
    // this.form12List["ImpvalResn"] = this.Form12Form.value.ImportsValueChange;
    // this.form12List["PtoslResn"] = this.Form12Form.value.SalesfromPointofSalesChange;
    // this.form12List["EtimadResn"] = this.Form12Form.value.ContactsfromETIMADSystemChange;
    // this.form12List["ExamtResn"] = this.Form12Form.value.ExportsValueChange;
    // this.form12List["PramtResn"] = this.Form12Form.value.PurchaseValueChange;
    // this.form12List["CpamtResn"] = this.Form12Form.value.CapitalAmountChange;

    // this.form12List["Operationz"] = "05";
    // this.form12List["UserTypz"] = "TP";
    //   this.returnsService.Form12ammendDetails(this.form12List).subscribe((data) => {
    //     this.form12SubmitResponse = data["d"];
    //     this.getForm12Details();
    //     console.log("this.form12SubmitResponse", this.form12SubmitResponse)

    //   });

    // }
  }

  getForm12DetailsOnRefresh() {
    this.returnsService
      .getForm12DetailsafterReresh(
        this.form12SubmitResponse.Fbnum,
        this.fbGuid,
        this.Euser,
        "C"
      )
      .subscribe((data) => {
        console.log("Latest Data", data);
        this.form12List = data["d"];
        this.form12DetailsDuplicate = data["d"];
        console.log(this.invoiseSet.length);
        //  this.invoiseSet = data["d"]["InvoiceSet"]["results"][0];
      });
  }

  confirmForm12(form12SubmitListobj) {
    console.log("obj", form12SubmitListobj);

    if (+this.form12DetailsDuplicate.Zkamt > +form12SubmitListobj.Zkamt) {
      // alert('if');
      jQuery("#objectionModal").modal("show");
      if (this.language == "ar") {
        this.errorMessage =
          "عزيزي المكلف، عند احتساب التعديلات وجد أن تعديلاتكم لا تتطابق مع ما تم حسابه بواسطة الهيئة العامة للزكاة والدخل، في حال الرغبة بالاستمرار، سيتم إنشاء طلب اعتراض لكم لدى الهيئة العامة للزكاة والدخل";
      } else {
        this.errorMessage =
          "Dear taxpayer, based on the submitted amendments system found that your amendments do not match what was calculated by GAZT, if you wish to continue, an objection request will be created in GAZT";
      }
    } else {
      // alert('else');
      jQuery("#objectionModal").modal("hide");
      this.confirm = true;
      this.btnAmend = false;
      form12SubmitListobj["Operationz"] = "01";
      form12SubmitListobj["UserTypz"] = "TP";
      this.returnsService
        .Form12SubmitDetails(form12SubmitListobj)
        .subscribe((data) => {
          this.form12ConfirmList = data["d"];
          this.form12List = data["d"];
          console.log("final data", this.form12List);
          //  this.invoiseSet = this.form12ConfirmList["InvoiceSet"]["results"][0];
          this.getForm12DetailsOnRefresh();
        });
    }
  }

  //For Confirmation on Objection Case
  ConfirmSubmit(form12SubmitListobj) {
    console.log(form12SubmitListobj);
    this.confirmObjection = true;
    form12SubmitListobj["Operationz"] = "66";
    form12SubmitListobj["UserTypz"] = "TP";
    form12SubmitListobj["ObjFlag"] = "X";
    this.returnsService
      .Form12SubmitDetails(form12SubmitListobj)
      .subscribe((data) => {
        this.form12ConfirmList = data["d"];
        this.form12List = data["d"];
        // this.invoiseSet = data["d"]["InvoiceSet"]["results"][0];
        this.getForm12DetailsOnRefresh();
      });
  }

  cancel() {
    this.step = 2;
    this.btnAmend = true;
    this.isFirst = true;
    this.Form12DetailsScreen = true;
    this.enableonsubmit = false;
    this.enableonAmmendscreen = false;
    this.AttachDelAllow = true;
    this.getForm12Details();
  }

  onRefresh() {
    this.returnsService
      .getForm12DetailsafterReresh(
        this.form12SubmitResponse.Fbnum,
        this.fbGuid,
        this.Euser,
        "I"
      )
      .subscribe((data) => {
        console.log("Latest Data", data);
        this.invoiseSet = data["d"]["InvoiceSet"]["results"][0];
      });
    setTimeout(() => {
      // this.confirm = true;
      // this.confirmObjection = true;
    }, 500);
  }

  // generateSadadNumber(fbnum) {
  //   this.returnsService.generateSadadNumber(fbnum).subscribe((data) => {
  //     this.invoiseSet = data["d"]["results"][0];
  //     // this.invoiseSet["Sopbel"] = data["d"]["results"][0]["Sopbel"];
  //     console.log("invoiseSet", this.invoiseSet);
  //   });
  // }
  onDownloadInvoice() {
    this.returnsService
      .getTokens(this.form12List.Fbnum, this.form12List.Gpart)
      .subscribe((data) => {
        this.tokensList = data["d"];
        console.log("tokensList", this.tokensList);
        this.downLoad(this.tokensList.Cotyp, this.tokensList.Cokey);
      });
  }

  downLoad(Cokey, Cotyp) {
    // this.returnsService.DownloadInvoice(this.tokensList.Cotyp, this.tokensList.Cokey).subscribe((data: any) => {
    //   console.log('data', data);
    //   this.invoiceData = data;
    //   FileSaver.saveAs(data, this.form12List.Fbnum + '.pdf');
    // });
    const requestOptions: Object = {
      responseType: "blob",
    };

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.url +
        "sap/opu/odata/SAP/ZDP_IT_CORRES_SRV/corr_dataSet(Cokey='" +
        this.tokensList.Cokey +
        "',Cotyp='" +
        this.tokensList.Cotyp +
        "')/$value"
    );
  }

  goBack() {
    window.location.href = "http://localhost:4200/#/mains/returns/zakatcit";
  }

  GlobalNumberAllow(event) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    if (rgx.test(event.target.value)) {
      return true;
    } else if (event.keyCode == 32) {
      return false;
    }
  }
  // RestrictSpace(event) {
  //   if(event.keyCode==32)
  //  {
  //    return false;
  //  }
  // }
  SpaceValidator(event) {
    if (!event.target.value.length && event.keyCode == 32) {
      event.preventDefault();
    }
  }
  validateForm() {
    if (this.form12List["TvtslI"] > 187500) {
      this.Form12Form.controls["TotalVATSales1"].setValue(
        parseFloat(this.Form12Form.value.TotalVATSales1).toFixed(2)
      );
    } else if (this.form12List["TvtslI"] < 187500) {
      this.Form12Form.controls["AverageNumberofLabour1"].setValue(
        parseFloat(this.Form12Form.value.AverageNumberofLabour1).toFixed(2)
      );
      this.Form12Form.controls["ImportsValue1"].setValue(
        parseFloat(this.Form12Form.value.ImportsValue1).toFixed(2)
      );
      this.Form12Form.controls["SalesfromPointofSales1"].setValue(
        parseFloat(this.Form12Form.value.SalesfromPointofSales1).toFixed(2)
      );
      this.Form12Form.controls["ContactsfromETIMADSystem1"].setValue(
        parseFloat(this.Form12Form.value.ContactsfromETIMADSystem1).toFixed(2)
      );
      this.Form12Form.controls["ExportsValue1"].setValue(
        parseFloat(this.Form12Form.value.ExportsValue1).toFixed(2)
      );
      this.Form12Form.controls["PurchaseValue1"].setValue(
        parseFloat(this.Form12Form.value.PurchaseValue1).toFixed(2)
      );
      this.Form12Form.controls["CapitalAmount1"].setValue(
        parseFloat(this.Form12Form.value.CapitalAmount1).toFixed(2)
      );
    }
  }

  onChecked(event) {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }
}
