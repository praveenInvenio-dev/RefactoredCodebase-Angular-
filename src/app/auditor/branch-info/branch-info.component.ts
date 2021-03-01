import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuditorService } from "../auditor.service";
import { NotifierService } from "angular-notifier";
import { BranchInfoconstants } from "./branch-infoconstants.model";

declare var $;
@Component({
  selector: "app-branch-info",
  templateUrl: "./branch-info.component.html",
  styleUrls: ["./branch-info.component.css"],
})
export class BranchInfoComponent implements OnInit {
  @ViewChild("confirmModal", { static: false }) confirmModal: ElementRef;

  // StringPattern = "[a-zA-Z \s]*$";
  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  ContactNoPattern = "[1][0-9]{8}";
  lang: any;
  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  BranchList: any;
  WholeDataList: any;
  FilterBranchTypeData: any;
  BranchType: any;
  Type: any;
  BranchEditDetails: any;
  BranchDeleteDetails: any;
  BranchViewDetails: any;
  EmpList: any;
  DeleteConfirmation: boolean = false;
  IsSuccess: boolean = false;
  IsError: boolean = false;
  IsBranchAdd: boolean = false;
  IsBranchUpdate: boolean = false;
  IsBranchDelete: boolean = false;
  IsMainBranchDelete: boolean = false;
  IsSubBranchDelete: boolean = false;

  IsGridView: boolean = true;
  IsListView: boolean = false;

  BranchFormGroup: FormGroup = new FormGroup({});
  BranchModelData = new BranchModel();
  direction: string;
  searchTerm: any;
  isValidNumber: boolean = false;
  isValidNumberForFax: boolean = false;
  constructor(
    private router: Router,
    private auditorService: AuditorService,
    private notifierService: NotifierService
  ) {
    this.GPartz = localStorage.getItem("gpart");
    if (localStorage.getItem("lang") === "ar") {
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.Direction = "ltr";
      this.Language = "E";
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = BranchInfoconstants.langz.arb;
      this.direction = BranchInfoconstants.langz.arb.dir;
    } else {
      this.lang = BranchInfoconstants.langz.eng;
      this.direction = BranchInfoconstants.langz.eng.dir;
    }
  }

  ngOnInit() {
    this.branchTypeList();
    this.stepsChecking();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.branchInfo();
        break;
      case 2:
        break;
      default:
        break;
    }

    return this.Step;
  }

  branchTypeList() {
    if (this.Language == "A") {
      this.BranchList = {
        branchType: [
          {
            Key: "01",
            Text: "رئيسي",
          },
          {
            Key: "02",
            Text: "فرعي",
          },
          {
            Key: "03",
            Text: "",
          },
        ],
      };
    } else {
      this.BranchList = {
        branchType: [
          {
            Key: "01",
            Text: "Main",
          },
          {
            Key: "02",
            Text: "Sub",
          },
          {
            Key: "03",
            Text: "",
          },
        ],
      };
    }
    this.BranchList = this.BranchList.branchType;
  }

  changeView(type) {
    if (type == "list") {
      this.searchTerm = "";
      this.IsListView = true;
      this.IsGridView = false;
    } else {
      this.searchTerm = "";
      this.IsGridView = true;
      this.IsListView = false;
    }
  }

  /* Step - 1 starts here */
  branchInfo() {
    this.auditorService.getBranchZHDRSet(this.GPartz).subscribe(
      (data) => {
        if (data) {
          console.log("branch-list", data["d"]);
          this.WholeDataList = data["d"].results;
          this.FilterBranchTypeData = data["d"].results;
          if (this.searchTerm) {
            var result = this.WholeDataList.filter((item) =>
              Object.keys(item).some(
                (k) =>
                  item[k] != null &&
                  item[k]
                    .toString()
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase())
              )
            );
            console.log(result);
            this.WholeDataList = result;
          }
        }
      },
      (error) => {
        console.log("err", error);
      }
    );

    this.auditorService.getBranchZAUDEMPHDRSet(this.GPartz).subscribe(
      (data) => {
        if (data) {
          console.log("branch-demp-list", data["d"]);
          this.EmpList = data["d"].ZAUDEMP_itemSet.results;
        }
      },
      (error) => {
        console.log("err", error);
      }
    );
  }

  homeSearch() {
    this.branchInfo();
  }

  /* Step - 1 ends here */

  /* Step - 2 starts here */
  branchFormControls() {
    this.BranchFormGroup = new FormGroup({
      type: new FormControl("", [Validators.required]),
      name: new FormControl("", [
        Validators.required,
        Validators.pattern(this.StringPattern),
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(this.ContactNoPattern),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      faxNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(this.ContactNoPattern),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
    });

    let branchType = this.FilterBranchTypeData.filter(
      (x) => x.BranchType == this.BranchList[0].Text
    );
    if (branchType.length > 0) {
      this.BranchFormGroup.controls["type"].setValue(this.BranchList[1].Text);
      this.BranchFormGroup.controls["type"].disable({ onlySelf: true });
    } else {
      this.BranchFormGroup.controls["type"].setValue("");
      this.BranchFormGroup.controls["type"].enable({ onlySelf: true });
    }
  }

  setBranchFormControls() {
    let branchType;
    let branchName;
    let branchTel;
    let branchFax;
    if (this.Type == "Update") {
      branchType =
        this.BranchEditDetails !== undefined
          ? this.BranchEditDetails.BranchType
          : "";
      branchName =
        this.BranchEditDetails !== undefined
          ? this.BranchEditDetails.BranchName
          : "";
      branchTel =
        this.BranchEditDetails !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(this.BranchEditDetails.Telno)
          : "";
      branchFax =
        this.BranchEditDetails !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(this.BranchEditDetails.Faxno)
          : "";
    } else if (this.Type == "View") {
      branchType =
        this.BranchViewDetails !== undefined
          ? this.BranchViewDetails.BranchType
          : "";
      branchName =
        this.BranchViewDetails !== undefined
          ? this.BranchViewDetails.BranchName
          : "";
      branchTel =
        this.BranchViewDetails !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(this.BranchViewDetails.Telno)
          : "";
      branchFax =
        this.BranchViewDetails !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(this.BranchViewDetails.Faxno)
          : "";
    } else {
      branchType =
        this.BranchDeleteDetails !== undefined
          ? this.BranchDeleteDetails.BranchType
          : "";
      branchName =
        this.BranchDeleteDetails !== undefined
          ? this.BranchDeleteDetails.BranchName
          : "";
      branchTel =
        this.BranchDeleteDetails !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(this.BranchDeleteDetails.Telno)
          : "";
      branchFax =
        this.BranchDeleteDetails !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(this.BranchDeleteDetails.Faxno)
          : "";
    }
    this.BranchFormGroup = new FormGroup({
      type: new FormControl(branchType, [Validators.required]),
      name: new FormControl(branchName, [
        Validators.required,
        Validators.pattern(this.StringPattern),
      ]),
      phoneNumber: new FormControl(branchTel, [
        Validators.required,
        Validators.pattern(this.ContactNoPattern),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      faxNumber: new FormControl(branchFax, [
        Validators.required,
        Validators.pattern(this.ContactNoPattern),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
    });
    this.BranchFormGroup.controls["type"].disable({ onlySelf: true });
    this.BranchFormGroup.controls["name"].disable({ onlySelf: true });
  }

  isNumberKey(event) {
    let charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 32
    ) {
      return false;
    }
  }
  isNumberValid() {
    let value = this.BranchFormGroup.value.phoneNumber[0];
    if (value !== "" && value !== undefined) {
      if (value == "1") {
        this.isValidNumber = false;
      } else {
        this.isValidNumber = true;
      }
    } else {
      this.isValidNumber = false;
    }
  }
  isNumberValidForFax() {
    let value = this.BranchFormGroup.value.faxNumber[0];
    if (value !== "" && value !== undefined) {
      if (value == "1") {
        this.isValidNumberForFax = false;
      } else {
        this.isValidNumberForFax = true;
      }
    } else {
      this.isValidNumberForFax = false;
    }
  }
  branchInfoModelData() {
    const formValues = this.BranchFormGroup.getRawValue();
    this.BranchModelData.Type = formValues.type;
    this.BranchModelData.Name = formValues.name;
    this.BranchModelData.TelNo = this.addingCodeToTELAndFAXNumber(
      formValues.phoneNumber
    );
    this.BranchModelData.FaxNo = this.addingCodeToTELAndFAXNumber(
      formValues.faxNumber
    );
  }

  resModelData() {
    let addressGuid;
    if (this.Type == "Update" && this.BranchEditDetails !== undefined) {
      addressGuid = this.BranchEditDetails.AddressGuid;
    } else if (this.Type == "View" && this.BranchViewDetails !== undefined) {
      addressGuid = this.BranchViewDetails.AddressGuid;
    } else if (
      this.Type == "Delete" &&
      this.BranchDeleteDetails !== undefined
    ) {
      addressGuid = this.BranchDeleteDetails.AddressGuid;
    } else {
      addressGuid = " ";
    }
    const branchObj = {
      BranchType: this.BranchModelData.Type,
      BranchName: this.BranchModelData.Name,
      Telno: this.BranchModelData.TelNo,
      Faxno: this.BranchModelData.FaxNo,
      AddressGuid: addressGuid,
      Login: " ",
      Delete:
        this.Type == "Delete" && this.BranchDeleteDetails !== undefined
          ? "X"
          : " ",
      UserNo: this.GPartz,
    };
    let branchData = branchObj;
    return branchData;
  }

  continueSecondScreen() {
    this.branchInfoModelData();
    let branchInfoData = this.resModelData();
    console.log("model-data", this.BranchModelData);
    console.log("push-data", branchInfoData);

    if (
      this.Type == "Update" ||
      this.Type == "View" ||
      (this.Type == "Delete" && this.DeleteConfirmation == true)
    ) {
      this.auditorService
        .updateBranchZHDRSet(branchInfoData, this.GPartz)
        .subscribe(
          (data) => {
            this.IsSuccess = true;
            if (
              this.Step == 1 &&
              this.IsBranchDelete == true &&
              this.Type == "Delete"
            ) {
              this.notifierService.notify(
                "success",
                `${this.lang.step2.brdeletesucc}`
              );
              setTimeout(() => {
                this.back1();
              }, 5000);
            }
            console.log("update-branch", data);
          },
          (error) => {
            this.IsError = true;
            if (
              this.Step == 1 &&
              this.IsBranchDelete == true &&
              this.Type == "Delete"
            ) {
              this.notifierService.notify(
                "warning",
                `${this.lang.step2.brdeletefailed}`
              );
              setTimeout(() => {
                this.back1();
              }, 5000);
            }
            console.log("err", error);
          }
        );
    } else {
      this.auditorService.saveBranchZHDRSet(branchInfoData).subscribe(
        (data) => {
          this.IsSuccess = true;
          console.log("add-branch", data);
        },
        (error) => {
          this.IsError = true;
          console.log("err", error);
        }
      );
    }
  }
  /* Step - 2 ends here */

  branchType(type, branchData) {
    this.Type = type;
    if (type == "Update") {
      this.IsBranchAdd = false;
      this.IsBranchDelete = false;
      this.IsBranchUpdate = true;
      this.BranchEditDetails = branchData;
      this.setBranchFormControls();
      this.step2();
    } else if (type == "Delete") {
      this.IsBranchAdd = false;
      this.IsBranchUpdate = true;
      this.IsBranchDelete = true;
      this.BranchDeleteDetails = branchData;
      $("#confirmModal").modal("show");
      this.setBranchFormControls();
    } else if (type == "View") {
      this.IsBranchAdd = false;
      this.IsBranchUpdate = true;
      this.IsBranchDelete = true;
      this.BranchViewDetails = branchData;
      this.setBranchFormControls();
      this.step2();
    } else {
      this.IsBranchUpdate = false;
      this.IsBranchDelete = false;
      this.IsBranchAdd = true;
      this.branchFormControls();
      this.step2();
    }
  }

  addingCodeToTELAndFAXNumber(value) {
    if (value !== "" && value !== undefined && value !== null) {
      let setNumber = `00966${value}`;
      return setNumber;
    } else {
      return "";
    }
  }

  modifyingCodeToTELAndFAXNumber(value) {
    if (value !== "" && value !== undefined && value !== null) {
      let setNumber = value.slice(5);
      return setNumber;
    } else {
      return "";
    }
  }

  branchDeletion() {
    this.Type = "Delete";
    this.BranchDeleteDetails = this.BranchViewDetails;
    $("#confirmModal").modal("show");
  }

  deactiveMember() {
    this.close();
    if (this.BranchDeleteDetails !== undefined) {
      if (
        this.Language == "E" &&
        this.BranchDeleteDetails.BranchType == "Main"
      ) {
        this.IsMainBranchDelete = true;
        if (this.Step == 1 && this.IsMainBranchDelete == true) {
          this.notifierService.notify(
            "warning",
            `${this.lang.step1.mainBranchDeleteMsg}`
          );
          setTimeout(() => {
            this.back1();
          }, 5000);
        }
      } else if (
        this.Language == "A" &&
        this.BranchDeleteDetails.BranchType == "رئيسي"
      ) {
        this.IsMainBranchDelete = true;
        if (this.Step == 1 && this.IsMainBranchDelete == true) {
          this.notifierService.notify(
            "warning",
            `${this.lang.step1.mainBranchDeleteMsg}`
          );
          setTimeout(() => {
            this.back1();
          }, 5000);
        }
      } else {
        let FilterEmpDataList = this.EmpList.filter(
          (x) => x.Branch == this.BranchDeleteDetails.BranchName
        );
        console.log("FilterEmpDataList", FilterEmpDataList);
        if (FilterEmpDataList.length == 0) {
          this.DeleteConfirmation = true;
          this.continueSecondScreen();
        } else {
          this.IsSubBranchDelete = true;
          if (this.Step == 1 && this.IsSubBranchDelete == true) {
            this.notifierService.notify(
              "warning",
              `${this.lang.step1.subBranchDeleteMsg}`
            );
            setTimeout(() => {
              this.back1();
            }, 5000);
          }
        }
      }
    }
  }

  close() {
    $("#confirmModal").modal("hide");
  }

  back1() {
    this.Step = 1;
    this.IsSuccess = false;
    this.IsError = false;
    this.IsMainBranchDelete = false;
    this.IsSubBranchDelete = false;
    this.stepsChecking();
  }

  step2() {
    this.Step = 2;
  }
}

export class BranchModel {
  Type: string;
  Name: string;
  TelNo: string;
  FaxNo: string;
}
