import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";
import { SignupService } from "src/app/services/signup.service";
import { VatServiceService } from "src/app/services/vat-service.service";

@Component({
  selector: "app-attachment",
  templateUrl: "./attachment.component.html",
  styleUrls: ["./attachment.component.css"],
})
export class AttachmentComponent implements OnInit {
  @Input("numsAttachment") numsAttachment: number;
  lang: any;
  attchTile = "";
  attchId = 0;
  numAttachment = 2;
  fileNames: any[];
  returnId = "005056B1365C1EDB9AC17EDAE103F81B";
  docType = "SU01";
  filez = [];
  files = [];
  dir = "ltr";
  data: any;
  size = 10;
  attach = {};
  lang1;
  sizeError: any;
  constructor(
    public notifierService: NotifierService,
    public appSrv: AppService,
    public signupService: SignupService,
    public vatService: VatServiceService
  ) {
    this.appSrv.data10.subscribe((res) => {
      console.log("subject", res);
      this.data = res;
      this.docType = this.data.docType;
      this.returnId = this.data.caseid;
      this.attchTile = this.data.title;
      //this.numAttachment = this.data.numsattach;
      this.attchId = this.data.id;
      console.log("subjectssss", this.data.title);
      //   console.log("sdkjfksdhflksdf",this.id, this.docTypes, this.numsAttachment, this.title, this.caseId, this.attchId)
    });
  }

  ngOnInit(): void {
    // this.docType = this.docTypes
    // this.returnId = this.caseId
    // this.attchTile = this.title
    // this.numAttachment = this.numsAttachment
    //console.log("sdkjfksdhflksdf",this.id, this.docTypes, this.numsAttachment, this.title, this.caseId, this.attchId)
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.tinDereg;
      this.lang1 = constants.langz.arb.attachment;
      this.dir = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.tinDereg;
      this.lang1 = constants.langz.eng.attachment;
      this.dir = constants.langz.eng.dir;
    }

    for (var i = 0; i < this.numAttachment; i++) {
      let obj = {
        at: [],
      };
      this.filez.push(obj);
    }

    for (var i = 0; i < this.numAttachment; i++) {
      let obj = {
        name: "",
        size: 0,
      };
      this.files.push(obj);
    }
  }

  uploadFiles(file, id, index) {
    const frmData = new FormData();
    let filename;
    filename = file["name"];
    let fileNameStr = new String(filename);
    if (fileNameStr.length > 95) {
      this.notifierService.notify("error", this.lang.err.fileNameError);
      return;
    }
    frmData.append("fileUpload", file);
    // }
    const parseExt = filename.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (
      fileExt !== "doc" &&
      fileExt !== "docx" &&
      fileExt !== "jpeg" &&
      fileExt !== "jpg" &&
      fileExt !== "pdf" &&
      fileExt !== "xls" &&
      fileExt !== "xlsx"
    ) {
      this.notifierService.notify("error", this.lang.err.fileType);
      return;
    }
    if (file.size > 10485760) {
      //   this.notifierService.notify("error", this.lang.err.fileError);
      return;
    }
    this.vatService
      .attachmentSubmit(this.returnId, this.docType, filename, file)
      .subscribe(
        (res) => {
          console.log("resupload", res);
          this.appSrv.updatedDataSelection12(this.files);
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
          this.deleteAttachments(id, index);
        }
      );
  }

  uploadFile(event, id) {
    if (this.filez[id].at.length >= 5) {
      this.notifierService.notify("error", this.lang.err.fileNum);
      return;
    } else {
      const element = event[0];
      const parseExt = element.name.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();

      if (
        fileExt !== "doc" &&
        fileExt !== "docx" &&
        fileExt !== "jpeg" &&
        fileExt !== "jpg" &&
        fileExt !== "pdf" &&
        fileExt !== "xls" &&
        fileExt !== "xlsx"
      ) {
        this.notifierService.notify("error", this.lang.err.fileType);
        return;
      }
      if (this.dir !== "rtl") {
        this.sizeError = this.lang1.txt6 + this.size + " MB";
      } else {
        this.sizeError = this.lang1.txt7;
      }
      if (element.size > 10000000) {
        this.notifierService.notify("error", this.sizeError);
        return;
      }

      if (element.size <= 0) {
        this.notifierService.notify("error", this.lang.err.fileType2);
        return;
      }

      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        console.log(element);
        this.files[id].name = element.name;
        this.files[id].size = element.size / 1000000;
      }

      let obj = {
        id: 0,
        filenames: {},
      };
      obj.id = id;
      obj.filenames = this.files[id];
      this.saveAttchement(id, this.files[id].name, this.files[id].size);
      let index = this.filez[id].at.length - 1;
      this.uploadFiles(event[0], id, index);
    }
  }

  saveAttchement(id, name, size, url?) {
    let obj = {
      id: 0,
      name: "",
      size: "",
      url: "",
    };
    obj.id = 0;
    obj.name = name;
    obj.size = size;
    obj.url = url;
    this.filez[id].at.push(obj);
  }

  deleteAttachments(id, index) {
    this.filez[id].at.splice(index, 1);

    console.log(this.filez[id].at.length);
    if (this.filez[id].at.length === 0) {
      this.files[id].name = "";
      this.files[id].size = 0;
    } else {
      this.files[id].name = this.filez[id].at[
        this.filez[id].at.length - 1
      ].name;
    }

    this.appSrv.updatedDataSelection12(this.files);
  }
}
