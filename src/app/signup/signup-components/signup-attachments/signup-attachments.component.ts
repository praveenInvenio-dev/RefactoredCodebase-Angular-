import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AppService } from 'src/app/app.service';
import { SignupService } from 'src/app/services/signup.service';
import { attachmentConstants } from './signup-attachments.constants';
declare var jQuery: any;

@Component({
  selector: 'signup-attachments',
  templateUrl: './signup-attachments.component.html',
  styleUrls: ['./signup-attachments.component.css']
})
export class SignupAttachmentsComponent implements OnInit {
  lang: any = {};
  direction: string = "ltr";
  @Input() attachmentsList: FormArray;
  @Input() viewType: string = "inline"; //modal or inline    
  @Input() ReturnIdx: string = "";
  @Output() onFileUploadSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFileDeleteSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Input() hideCloseButton: boolean = false;
  @Input() modalId: string = "attachmentsModal";
  constructor(private _formBuilder: FormBuilder, private signupService: SignupService, public notifierService: NotifierService) { }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = attachmentConstants.langz.arb.attachment;
      this.direction = attachmentConstants.langz.arb.dir;
    } else {
      this.lang = attachmentConstants.langz.eng.attachment;
      this.direction = attachmentConstants.langz.eng.dir;
    }
  }

  attachmentObj = {
    fileObject: null,
    Dotyp: null,
    formControl: null,
    displayLabel: null,
    atttchedFilesCount: 0,
    OutletRef: null,
    FileExtn: null,
    uniqueDocTypeRef: null,
    maxLimit: 5
  };

  setAttachmentObject(attachmentObj) {
    this.attachmentObj = attachmentObj;
    let atttchedFilesCount = this.getAttachmentsCount(this.attachmentObj.uniqueDocTypeRef);
    this.attachmentObj.atttchedFilesCount = atttchedFilesCount;
    if (this.attachmentObj.formControl) {
      if (!atttchedFilesCount) {
        this.attachmentObj.formControl.reset();
        this.attachmentObj.formControl.markAsPristine();
        this.attachmentObj.formControl.markAsUntouched();
        this.attachmentObj.formControl.updateValueAndValidity();
      }
      // else {
      //   this.attachmentObj.formControl.setValue(this.attachmentObj.Dotyp);
      // }
    }

  }

  show() {
    if (this.viewType == "modal") {
      jQuery("#attachmentsModal").modal('show');
    }
  }
  hide(id) {
    this.closeModal(id);
    this.onClose.emit(this.attachmentsList);
  }

  onFileDrop(files) {
    console.log("onFileDrop", files);
    this.attachmentObj.fileObject = files['0'];
    this.attachmentObj.FileExtn = this.getFileExtenstion(files['0']);
    this.addAttachment(this.attachmentObj);
  }
  onFileSelect(event) {
    this.attachmentObj.fileObject = event.target.files[0];
    this.attachmentObj.FileExtn = this.getFileExtenstion(event.target.files[0]);
    console.log("onFileSelect", this.attachmentObj);
    this.addAttachment(this.attachmentObj);
  }

  //file: File = null, Dotyp: string = '', ReturnIdx: string = '', OutletRef: string = '', control: FormControl = null
  addAttachment(attachmentObj) {

    let file = attachmentObj.fileObject;
    const fileExt = attachmentObj.FileExtn; //this.getFileExtenstion(file);
    if (!file) {
      return true;
    } else if (fileExt !== 'doc' && fileExt !== 'docx' && fileExt !== 'jpeg' && fileExt !== 'jpg' && fileExt !== 'pdf' && fileExt !== 'xls' && fileExt !== 'xlsx') {
      this.notifierService.notify('error', this.lang.err.fileTypeError);
      return true;
    } else if (file && file.size == 0) {
      this.notifierService.notify("error", this.lang.err.minFileSizeError);
      return true;
    } else if (file && file.size > 10485760) {
      this.notifierService.notify("error", this.lang.err.fileSizeError);
      return true;
    }

    console.log("addAttachment", this.attachmentObj);

    const formDataObj = new FormData();
    formDataObj.append("fileUpload", file);
    this.signupService.attachmentSubmit(attachmentObj.ReturnIdx, attachmentObj.Dotyp, file["name"] || '', file, attachmentObj.OutletRef).subscribe((response) => {
      console.log("File upload response", response);
      response['d']['Dotyp'] = attachmentObj.Dotyp;
      response["d"]["OutletRef"] = attachmentObj.OutletRef;
      response["d"]["FileExtn"] = attachmentObj.FileExtn;
      response["d"]["uniqueDocTypeRef"] = attachmentObj.uniqueDocTypeRef;
      let fileFormObj = this.getFileForm();
      fileFormObj.patchValue(response["d"]);
      this.attachmentsList.push(fileFormObj);
      if (!attachmentObj.formControl.value) {
        attachmentObj.formControl.setValue(file["name"] || "");
      }
      this.attachmentObj.atttchedFilesCount = this.getAttachmentsCount(attachmentObj.uniqueDocTypeRef);
      this.onFileUploadSuccess.emit(this.attachmentsList);
    }, (err) => {
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    });
  }

  getFileExtenstion(file) {
    const parseExt = file["name"].split(".");
    const FileExtn = parseExt[parseExt.length - 1].toLowerCase();
    return FileExtn || "";
  }
  deleteAttachment(Dotyp, Doguid) {
    this.signupService.deleteAttachment(Dotyp, Doguid).subscribe((res) => {
      const control = <FormArray>this.attachmentsList;
      let attIndex = control.value.findIndex(attachmentObj => attachmentObj.Doguid == Doguid);
      control.removeAt(attIndex);
      this.attachmentObj.atttchedFilesCount = this.getAttachmentsCount(this.attachmentObj.uniqueDocTypeRef);
      if (this.attachmentObj.atttchedFilesCount == 0) {
        this.attachmentObj.formControl.reset();
      }
      this.onFileDeleteSuccess.emit(this.attachmentsList);
    });
  }

  getAttachmentsCount(uniqueDocTypeRef) {
    let attachmentsList = this.attachmentsList.value;
    let attchmentsCount = attachmentsList.filter((attachment) => {
      if (attachment.uniqueDocTypeRef == uniqueDocTypeRef) {
        return true;
      }
    }).length;
    return attchmentsCount;
  }

  closeModal(id) {
    jQuery("#" + id).modal('hide');
    setTimeout(() => {
      if (jQuery('.modal:visible').length) {
        jQuery('body').addClass('modal-open');
      }
    }, 500);
    this.onClose.emit(this.attachmentsList);
  }

  getFileForm() {
    let fileForm = this._formBuilder.group({
      "__metadata": this._formBuilder.group({
        "id": [''],
        "uri": [''],
        "type": [''],
        "content_type": [''],
        "media_src": ['']
      }),
      "ZfileSize": [''],
      "Dotyp": [''],
      "OutletRef": [''],
      "RetGuid": [''],
      "SchGuid": [''],
      "Srno": [0],
      "AttBy": [''],
      "Doguid": [''],
      "Filename": [''],
      "Mimetype": [''],
      "DocUrl": [''],
      "Flag": [''],
      "FileExtn": [""],
      "uniqueDocTypeRef": ['']
    });
    return fileForm;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////


}
