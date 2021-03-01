import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { NotifierService } from "angular-notifier";
import { AuditorService } from "../auditor.service";
import { employeeconstants } from "./employee-constants.model";
declare var $;
export let browserRefresh = false;
@Component({
  selector: "app-employee-info",
  templateUrl: "./employee-info.component.html",
  styleUrls: ["./employee-info.component.css"],
})
export class EmployeeInfoComponent implements OnInit {
  @ViewChild("delTaskAllocatedMember", { static: false })
  delTaskAllocatedMember: ElementRef;
  @ViewChild("confirmModal", { static: false }) confirmModal: ElementRef;
  @ViewChild("collapseExample", { static: false }) collapse: ElementRef;
  @ViewChild("ActiveEmpExample", { static: false })
  activeEmpcollapse: ElementRef;
  @ViewChild("inActiveEmpExample", { static: false })
  inActiveEmpcollapse: ElementRef;
  @ViewChild("ErrorModal", { static: false }) ErrorModal: ElementRef;
  @ViewChild("branchValidation", { static: false })
  branchValidation: ElementRef;
  @ViewChild("branchListModal", { static: false }) branchListModal: ElementRef;
  @ViewChild("delinkPopup", { static: false }) delinkPopup: ElementRef;

  // StringPattern = "[a-zA-Z \s]*$";
  StringPattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  ContactNoPattern = "[5][0-9]{8}";
  EmailPattern = "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{0,1})+$";
  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  BranchList: any[] = [];
  WholeData: any;
  employeeList: any;
  EmployeeFormGroup: FormGroup = new FormGroup({});
  isBranchAdmin = false;
  branch: any;
  branchName: any;
  addrnumber: any;
  deletedEmpList: any;
  activeEmployeeList: any;
  Type: any;
  DeleteConfirmation: boolean = false;
  AddressGuid: any;
  isAll: boolean = false;
  isActive: boolean = false;
  isInActive: boolean = false;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  branchAdmin: any;
  isSuccess: boolean = false;
  isError: boolean = false;
  isDelSuccess: boolean = false;
  isDelError: boolean = false;
  isReactiveSuccess: boolean = false;
  isReactiveError: boolean = false;
  supervisorBranchList: any;
  supervisorObj: any;
  taskAllocationList: any;
  userNo: any;
  empName: any;
  empBranchName: any;
  lang: any;
  direction: string;
  EMPName: any;
  isLogin: boolean = false;
  errMsg: any;
  isGridView: boolean = true;
  isListView: boolean = false;
  empObj: any;
  isadminBranch: boolean = false;
  totalList: any;
  branchSelection: any;
  allocationList: any = [];
  taskList: any;
  isTaskSuccess: boolean = false;
  isTaskError: boolean = false;
  linkedList: any = [];
  nonLinkedList: any = [];
  sLinkedList: any = [];
  isTaskAllocation: boolean = false;
  isTaskDlink: boolean = false;
  isTaskDlinkError: boolean = false;
  remarks: any;
  errorString: any;
  updateEmployeeObj: any;
  isValidNumber: boolean = false;
  searchTerm: any;
  errorMsg: any;
  cardClick: any;
  taskObj: any;
  value: boolean = false;
  isCreateSuccess: boolean = false;
  isUpdateSuccess: boolean = false;
  isEnabledUpdate: boolean = false;
  istaskchange: boolean = false;
  isConfirmError: boolean = false;
  isNumberExist: boolean = false;
  selectedBranchObj: any;
  isbranchSelected: boolean = false;
  success = employeeconstants.langz.eng.employee.step2.isDelSuccess.t2;
  arSuccess = employeeconstants.langz.arb.employee.step2.isDelSuccess.t2;
  EmployeeInfoModel = new EmployeeInfoModel();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auditorService: AuditorService,
    public notifierService: NotifierService
  ) {
    this.GPartz = localStorage.getItem("gpart");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = employeeconstants.langz.arb.employee;
      this.direction = employeeconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = employeeconstants.langz.eng.employee;
      this.direction = employeeconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.isDelSuccess = false;
    this.isDelError = false;
    $(document).click(function (e) {
      $(".collapse").collapse("hide");
    });
    this.stepsChecking();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.userInfo();
        this.isAll = true;
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }

    return this.Step;
  }
  changeView(type) {
    if (type == "list") {
      this.searchTerm = "";
      this.isListView = true;
      this.isGridView = false;
    } else {
      this.searchTerm = "";
      this.isGridView = true;
      this.isListView = false;
    }
  }
  isRandomclick() {
    $("#collapseExample").modal("hide");
  }
  usersList(type) {
    if (type == "All") {
      //  this.userInfo();
      this.employeeList = this.activeEmployeeList.concat(this.deletedEmpList);
      this.isAll = true;
      this.isActive = false;
      this.isInActive = false;
    } else if (type == "Active") {
      this.employeeList = this.activeEmployeeList;
      this.isAll = false;
      this.isActive = true;
      this.isInActive = false;
    } else {
      this.employeeList = this.deletedEmpList;
      this.isActive = false;
      this.isInActive = true;
      this.isAll = false;
    }
  }

  /* Step - 1 starts here */
  userInfo() {
    this.updateEmployeeObj = {};
    let activeUsersList = this.auditorService.getUserList(this.GPartz);
    let delUsersList = this.auditorService.getUserDeletedList(this.GPartz);
    forkJoin([activeUsersList, delUsersList]).subscribe((results) => {
      console.log("Emp-list", results[0]["d"]);
      this.WholeData = results[0]["d"];
      this.activeEmployeeList = results[0]["d"].ZAUDEMP_itemSet["results"];
      console.log("active-list", this.activeEmployeeList);
      this.BranchList = results[0]["d"].ZDD_BRANCHSet["results"];
      this.deletedEmpList = results[1]["d"]["results"];
      this.deletedEmpList.forEach((element) => {
        element.Delete = "X";
      });
      console.log("inactive-list", this.deletedEmpList);
      this.employeeList = this.activeEmployeeList.concat(this.deletedEmpList);
      if (this.searchTerm) {
        if (this.isAll == true) {
          var result = this.employeeList.filter((item) =>
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
          this.employeeList = result;
        } else if (this.isActive == true) {
          var result = this.activeEmployeeList.filter((item) =>
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
          this.employeeList = result;
        } else if (this.isInActive == true) {
          var result = this.deletedEmpList.filter((item) =>
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
          this.employeeList = result;
        }
      }
      this.totalList = this.employeeList;
      console.log("List-Emp", this.employeeList);
    });
  }
  homeSearch() {
    this.userInfo();
  }

  back() {
    this.isAll = true;
    this.isActive = false;
    this.isInActive = false;
    this.isReactiveSuccess = false;
    this.isReactiveError = false;
    this.istaskchange = false;
    this.employeeList = this.totalList;
    this.Step = 1;
  }
  /* Step - 1 ends here */

  /* Step - 2 starts here */
  modifyingCodeToTELAndFAXNumber(value) {
    if (value !== "" && value !== undefined && value !== null) {
      let setNumber = value.slice(5);
      return setNumber;
    } else {
      return "";
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

  userFormControls() {
    this.EmployeeFormGroup = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern(this.StringPattern),
      ]),
      branch: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(this.ContactNoPattern),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.EmailPattern),
      ]),
      isBranchAdmin: new FormControl(""),
    });
  }

  setUserFormControls(userObj) {
    let empName;
    let empBranch;
    let empTel;
    let empEmail;
    let empLogin;
    this.AddressGuid = userObj.AddressGuid;
    if (this.Type == "Update") {
      empName = userObj !== undefined ? userObj.Name : "";
      empBranch = userObj !== undefined ? userObj.Addrnumber : "";
      empTel =
        userObj !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(userObj.Mobileno)
          : "";
      empEmail = userObj !== undefined ? userObj.Emailid : "";
    } else {
      empName = userObj !== undefined ? userObj.Name : "";
      empBranch = userObj !== undefined ? userObj.Addrnumber : "";
      empTel =
        userObj !== undefined
          ? this.modifyingCodeToTELAndFAXNumber(userObj.Mobileno)
          : "";
      empEmail = userObj !== undefined ? userObj.Emailid : "";
    }
    if (userObj.Isbranchadmin == "X") {
      this.isBranchAdmin = true;
    } else {
      this.isBranchAdmin = false;
    }
    this.EmployeeFormGroup = new FormGroup({
      name: new FormControl(empName, [
        Validators.required,
        Validators.pattern(this.StringPattern),
      ]),
      branch: new FormControl(empBranch, [Validators.required]),
      phoneNumber: new FormControl(empTel, [
        Validators.required,
        Validators.pattern(this.ContactNoPattern),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      email: new FormControl(empEmail, [
        Validators.required,
        Validators.pattern(this.EmailPattern),
      ]),
      isBranchAdmin: new FormControl(this.isBranchAdmin),
    });
    this.EmployeeFormGroup.controls["email"].disable({ onlySelf: true });
  }

  isBranchAdminChange(value) {
    if (value == true) {
      this.branchAdmin = "X";
    } else {
      this.branchAdmin = "";
    }
    return this.branchAdmin;
  }

  onBranchSelection(value) {
    this.isEnabledUpdate = true;
    let empForm = this.EmployeeFormGroup.getRawValue();
    if (
      empForm.name != null &&
      empForm.name != undefined &&
      empForm.name != "" &&
      empForm.email != null &&
      empForm.email != undefined &&
      empForm.email != "" &&
      empForm.phoneNumber != null &&
      empForm.phoneNumber != undefined &&
      empForm.phoneNumber != ""
    ) {
      if (value !== undefined) {
        this.isbranchSelected = true;
        let branch = this.BranchList.filter((tt) => tt.Addrnumber == value);
        this.branchName = branch[0].Branch;
        this.branchSelection = this.activeEmployeeList.filter(
          (tt) => tt.Addrnumber == value && tt.Isbranchadmin !== ""
        );
        if (this.branchSelection.length == 0) {
          this.isbranchSelected = false;
          this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(true);
          this.EmployeeFormGroup.controls["isBranchAdmin"].disable({
            onlySelf: true,
          });
        }
      }
      console.log("branch-selected", value);
    } else {
      this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(false);
      this.EmployeeFormGroup.controls["isBranchAdmin"].enable({
        onlySelf: true,
      });
    }
  }

  enableBranch() {
    this.isbranchSelected = false;
    this.isadminBranch = true;
    $("#ErrorModal").modal("hide");
    this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(true);
  }

  updateEnableBranch(obj) {
    this.auditorService.patchUserDetails(obj, obj.UserNo).subscribe(
      (data) => {
        if (data) {
          console.log(data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(true);
  }
  disableBranch() {
    this.isbranchSelected = false;
    this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(false);
    this.EmployeeFormGroup.controls["isBranchAdmin"].enable({ onlySelf: true });
    $("#ErrorModal").modal("hide");
  }
  /* Step - 2 ends here */

  /* Step - 3 starts here */

  userInfoDetails() {
    const EmployeeForm = this.EmployeeFormGroup.getRawValue();
    this.EmployeeInfoModel.Name = EmployeeForm.name;
    this.EmployeeInfoModel.Branch = this.branchName;
    this.EmployeeInfoModel.AddrNumber = EmployeeForm.branch;
    this.EmployeeInfoModel.PhoneNumber = this.addingCodeToTELAndFAXNumber(
      EmployeeForm.phoneNumber
    );
    this.EmployeeInfoModel.Email = EmployeeForm.email;
    this.EmployeeInfoModel.IsBranchAdmin = this.isBranchAdminChange(
      EmployeeForm.isBranchAdmin
    );
  }

  employeeDetailsObj() {
    let addressGuid;
    if (this.Type == "Update" || this.Type == "Delete") {
      addressGuid = this.AddressGuid;
    } else {
      addressGuid = " ";
    }
    let empObj = {
      Name: this.EmployeeInfoModel.Name,
      Emailid: this.EmployeeInfoModel.Email,
      Mobileno: this.EmployeeInfoModel.PhoneNumber,
      Addrnumber: this.EmployeeInfoModel.AddrNumber,
      Branch: this.EmployeeInfoModel.Branch,
      AddressGuid: addressGuid,
      Delete: this.Type == "Delete" ? "X" : " ",
      UserNo: this.userNo,
      Login: this.isLogin == true ? "X" : " ",
      Isbranchadmin: this.EmployeeInfoModel.IsBranchAdmin,
    };
    return empObj;
  }

  saveEmployee() {
    this.userInfoDetails();
    const emplDetails = this.employeeDetailsObj();

    if (this.Type == "Update") {
      this.auditorService.patchUserDetails(emplDetails, this.userNo).subscribe(
        (data) => {
          this.isCreateSuccess = false;
          this.isSuccess = true;
          this.isUpdateSuccess = true;
          this.userInfo();
        },
        (error) => {
          this.isError = true;
          console.log("err", error);
        }
      );
    } else if (this.Type == "Delete" && this.DeleteConfirmation == true) {
      this.auditorService.patchUserDetails(emplDetails, this.userNo).subscribe(
        (data) => {
          if (this.cardClick == "delFromDet") {
            this.isDelSuccess = true;
          } else {
            if (this.Language == "E") {
              this.notifierService.notify("success", this.success);
            } else {
              this.notifierService.notify("success", this.arSuccess);
            }
          }
          this.userInfo();
        },
        (error) => {
          if (
            error.error.error.innererror.errordetails[0].message != "" &&
            error.error.error.innererror.errordetails != undefined
          ) {
            if (this.Language == "A") {
              this.errMsg =
                "عزيزي المستخدم, الرجاء إعادة تعيين الحالات المرتبطة بالموظف الى موظف اخر قبل حذفه";
            } else {
              this.errMsg =
                "Dear User, Please re-assign the selected employee’s cases to another employee before deleting the employee";
            }
            if (this.cardClick == "delFromDet") {
              $("#delTaskAllocatedMember").modal("show");
            } else {
              this.notifierService.notify("warning", this.errMsg);
            }
          }
        }
      );
    } else if (this.Type == "reActive") {
      this.auditorService.saveUserDetails(emplDetails).subscribe(
        (data) => {
          this.isReactiveSuccess = true;
          this.userInfo();
        },
        (error) => {
          this.isReactiveError = true;
          console.log("err", error);
        }
      );
    } else {
      if (this.isadminBranch == true) {
        this.empObj = {
          Name: this.selectedBranchObj.Name,
          Emailid: this.selectedBranchObj.Emailid,
          Mobileno: this.selectedBranchObj.Mobileno,
          Addrnumber: this.selectedBranchObj.Addrnumber,
          Branch: this.selectedBranchObj.Branch,
          AddressGuid: this.selectedBranchObj.AddressGuid,
          Delete: this.Type == "Delete" ? "X" : " ",
          UserNo: this.selectedBranchObj.UserNo,
          Login: " ",
          Isbranchadmin: "",
        };
        let empForm = this.EmployeeFormGroup.getRawValue();
        if (
          empForm.name != null &&
          empForm.name != undefined &&
          empForm.name != "" &&
          empForm.email != null &&
          empForm.email != undefined &&
          empForm.email != "" &&
          empForm.phoneNumber != null &&
          empForm.phoneNumber != undefined &&
          empForm.phoneNumber != ""
        ) {
          this.updateEnableBranch(this.empObj);
        }
      }
      this.auditorService.saveUserDetails(emplDetails).subscribe(
        (data) => {
          this.isUpdateSuccess = false;
          this.isSuccess = true;
          this.isCreateSuccess = true;
          this.userInfo();
        },
        (error) => {
          this.isError = true;
          console.log("err", error);
        }
      );
    }
  }
  delClose() {
    this.isDelSuccess = false;
    this.isDelError = false;
    this.Step = 1;
  }
  /* Step - 3 ends here */

  userType(type, userObj, cardClick) {
    this.isNumberExist = false;
    console.log("empName", userObj);
    if (userObj.Delete == "X" && cardClick == "cardClick") {
      type = "reActive";
    }
    this.Type = type;
    this.cardClick = cardClick;
    this.isEnabledUpdate = false;
    this.updateEmployeeObj = userObj;
    if (cardClick != undefined) {
      if (type == "Task") {
        if (cardClick == "taskAllocateFromDet") {
          this.empName = this.updateEmployeeObj.Name;
          this.empBranchName = this.updateEmployeeObj.Branch;
          this.userNo = this.updateEmployeeObj.UserNo;
          this.isSuccess = false;
          this.isError = false;
          this.isReactiveSuccess = false;
          this.isReactiveError = false;
          this.isTaskSuccess = false;
          this.isTaskError = false;
          this.isTaskDlink = false;
          this.isConfirmError = false;
          this.isTaskSuccess = false;
          this.getTaskAllocationList();
          this.step3();
        } else {
          this.empName = userObj.Name;
          this.empBranchName = userObj.Branch;
          this.userNo = userObj.UserNo;
          this.isSuccess = false;
          this.isError = false;
          this.isReactiveSuccess = false;
          this.isReactiveError = false;
          this.isTaskSuccess = false;
          this.isTaskError = false;
          this.isTaskDlink = false;
          this.isConfirmError = false;
          this.isTaskSuccess = false;
          this.getTaskAllocationList();
          this.step3();
        }
      } else if (type == "Update") {
        if (cardClick == "cardClick") {
          this.updateEmployee(userObj);
        } else {
          this.updateEmployee(userObj);
        }
      } else if (type == "Delete") {
        if (cardClick == "delFromDet") {
          this.delEmployee(userObj);
        } else {
          this.delEmployee(userObj);
        }
      } else if (type == "Add") {
        this.isValidNumber = false;
        this.isSuccess = false;
        this.isError = false;
        this.isUpdate = false;
        this.isAdd = true;
        this.isBranchAdmin = false;
        this.isReactiveSuccess = false;
        this.isReactiveError = false;
        this.isTaskSuccess = false;
        this.isTaskError = false;
        this.isDelSuccess = false;
        this.isDelError = false;
        this.userFormControls();
        this.step2();
      } else {
        if (cardClick == "reActiveFromDet") {
          this.reactiveEmployee(userObj);
        } else {
          this.reactiveEmployee(userObj);
          return;
        }
      }
    }
  }

  updateEmployee(userObj) {
    this.branchName = userObj.Branch;
    this.addrnumber = userObj.Addrnumber;
    this.userNo = userObj.UserNo;
    this.branchAdmin = userObj.Isbranchadmin;
    this.isAdd = false;
    this.isUpdate = true;
    this.isSuccess = false;
    this.isError = false;
    this.isReactiveSuccess = false;
    this.isReactiveError = false;
    this.isTaskSuccess = false;
    this.isTaskError = false;
    this.isDelSuccess = false;
    this.isDelError = false;
    this.setUserFormControls(userObj);
    this.step2();
    if (userObj.Delete == "X") {
      this.isAdd = true;
      this.isUpdate = false;
    }
  }
  delEmployee(userObj) {
    $("#confirmModalAll").modal("show");
    this.branchName = userObj.Branch;
    this.addrnumber = userObj.Addrnumber;
    this.userNo = userObj.UserNo;
    this.empName = userObj.Name;
    this.branchAdmin = userObj.Isbranchadmin;
    this.setUserFormControls(userObj);
  }
  reactiveEmployee(userObj) {
    this.isSuccess = false;
    this.isError = false;
    this.isReactiveSuccess = false;
    this.isReactiveError = false;
    this.isTaskSuccess = false;
    this.isTaskError = false;
    this.branchName = userObj.Branch;
    this.userNo = userObj.UserNo;
    this.isUpdate = false;
    this.isAdd = true;
    this.isLogin = true;
    this.setUserFormControls(userObj);
    this.step2();
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
  isEnabled() {
    if (this.EmployeeFormGroup.value.name != "") {
      this.isEnabledUpdate = true;
    } else {
      this.isEnabledUpdate = false;
    }
  }
  isNumberValid() {
    let value = this.EmployeeFormGroup.value.phoneNumber[0];
    let leng = this.EmployeeFormGroup.value.phoneNumber.length;
    if (value !== "" && value !== undefined) {
      if (value == "5") {
        this.isValidNumber = false;
        this.isEnabledUpdate = true;
        if (leng == 9) {
          this.isEnabledUpdate = true;
        } else {
          this.isEnabledUpdate = false;
        }
      } else {
        this.isValidNumber = true;
        this.isEnabledUpdate = false;
      }
    } else {
      this.isValidNumber = false;
      this.isEnabledUpdate = true;
    }
    if (this.Type == "reActive") {
      let validNumber = this.activeEmployeeList.filter(
        (num) =>
          num.Mobileno == "00966" + this.EmployeeFormGroup.value.phoneNumber
      );
      if (validNumber.length > 0) {
        this.isNumberExist = true;
      } else {
        this.isNumberExist = false;
      }
    }
  }
  isSwitchChange(value) {
    this.isEnabledUpdate = true;
    let empForm = this.EmployeeFormGroup.getRawValue();
    if (
      empForm.name != null &&
      empForm.name != undefined &&
      empForm.name != "" &&
      empForm.email != null &&
      empForm.email != undefined &&
      empForm.email != "" &&
      empForm.phoneNumber != null &&
      empForm.phoneNumber != undefined &&
      empForm.phoneNumber != ""
    ) {
      if (this.Type == "Update" && this.addrnumber && value == true) {
        let branch = this.activeEmployeeList.filter(
          (tt) =>
            tt.Addrnumber == this.addrnumber &&
            tt.Isbranchadmin == "X" &&
            tt.Addrnumber == empForm.branch
        );
        if (branch.length > 0) {
          this.EMPName = branch[0].Name;
          $("#branchValidation").modal("show");
          console.log(branch);
        }
      } else {
        if (this.activeEmployeeList != null) {
          this.supervisorBranchList = this.activeEmployeeList.filter(
            (tt) =>
              tt.Addrnumber == this.addrnumber && tt.UserNo !== this.userNo
          );
          if (this.supervisorBranchList.length > 0) {
            if (this.isbranchSelected) {
              this.isbranchSelected = false;
              $("#branchListModal").modal("show");
              console.log(this.supervisorBranchList);
            }
          } else {
            if (this.branchSelection.length > 0) {
              this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(false);
              this.EmployeeFormGroup.controls["isBranchAdmin"].enable({
                onlySelf: true,
              });
              this.selectedBranchObj = this.branchSelection[0];
              $("#ErrorModal").modal("show");
            }
          }
        }
      }
    } else {
      this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(false);
      this.EmployeeFormGroup.controls["isBranchAdmin"].enable({
        onlySelf: true,
      });
    }
  }
  isBranchOk() {
    $("#branchValidation").modal("hide");
    this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(false);
  }

  supervisorSelectChange(obj) {
    console.log(obj);
    this.supervisorObj = obj;
  }

  supervisorSave() {
    let obj = {
      Name: this.supervisorObj.Name,
      Emailid: this.supervisorObj.Emailid,
      Mobileno: this.supervisorObj.Mobileno,
      Addrnumber: this.supervisorObj.Addrnumber,
      Branch: this.supervisorObj.Branch,
      AddressGuid: this.supervisorObj.AddressGuid,
      Delete: this.Type == "Delete" ? "X" : " ",
      UserNo: this.supervisorObj.UserNo,
      Login: " ",
      Isbranchadmin: "X",
    };
    this.auditorService.patchUserDetails(obj, obj.UserNo).subscribe(
      (data) => {
        $("#branchListModal").modal("hide");
        this.back1();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  supervisorCancel() {
    this.isbranchSelected = false;
    $("#branchListModal").modal("hide");
    this.EmployeeFormGroup.controls["isBranchAdmin"].setValue(true);
  }
  deactiveMember() {
    this.DeleteConfirmation = true;
    this.saveEmployee();
    this.close();
  }
  isDelTaskAllocatedMember() {
    $("#delTaskAllocatedMember").modal("hide");
  }
  isDelTaskAllocatedMemberClose() {
    $("#delTaskAllocatedMember").modal("hide");
  }
  close() {
    $("#confirmModalAll").modal("hide");
  }

  getTaskAllocationList() {
    this.auditorService.getTaskList(this.GPartz).subscribe((data) => {
      if (data) {
        this.taskList = data["d"];
        console.log("data", data["d"]);
        this.linkedList = data["d"].ZAUD_TAXP_LINKEDSet["results"];
        this.nonLinkedList = data["d"].ZAUD_TAXP_NLINKEDSet["results"];
        if (this.linkedList.length > 0) {
          let linkedList = this.linkedList.filter(
            (tt) => tt.TaemTin == this.userNo
          );
          this.taskAllocationList = linkedList.concat(this.nonLinkedList);
          this.taskAllocationList = this.taskAllocationList.filter((task) => {
            let remarksList = task.Remarks.split("-");
            task["TaxPayerTin"] = remarksList[0];
            task["TaxPayerName"] = remarksList[1];
            return task;
          });
          console.log("task-list", this.taskAllocationList);
        }
      }
    });
  }

  taskAllocationChange(value, obj) {
    this.istaskchange = true;
    this.isConfirmError = false;
    this.isTaskDlink = false;
    this.isTaskSuccess = false;
    this.taskObj = obj;
    this.value = value;
    if (value == true) {
      this.isTaskDlinkError = false;
    } else {
      this.istaskchange = false;
      let linkedList = this.linkedList.filter(
        (tt) => tt.TaemTin == this.taskObj.TaemTin
      );
      if (linkedList.length > 0) {
        $("#delinkPopup").modal("show");
        this.remarks = obj.Remarks;
      }
    }
  }

  linkedTaskAllocation() {
    if (this.istaskchange == false) {
      this.isConfirmError = true;
      this.isTaskDlink = false;
      this.isTaskSuccess = false;
      this.isTaskError = false;
    } else {
      let object = {
        Activties: this.taskObj.Activties,
        Addrnumber: this.taskObj.Addrnumber,
        AudCompanyN: this.taskObj.AudCompanyN,
        AudName: this.taskObj.AudName,
        AuditorTin: this.taskObj.AuditorTin,
        FrmDate: this.taskObj.FrmDate,
        Remarks: this.taskObj.Remarks,
        TaemTin: this.value == true ? this.userNo : "",
        TaxpayerTin: this.taskObj.TaxpayerTin,
        Taxtp: this.taskObj.Taxtp,
        ToDate: this.taskObj.ToDate,
        Tptxt: this.taskObj.Tptxt,
      };
      this.allocationList.push(object);
      this.isTaskDlink = false;
      this.isConfirmError = false;
      this.isTaskSuccess = false;
      this.isTaskError = false;
      this.isConfirmError = false;
      this.linktaskallocation();
    }
  }

  linktaskallocation() {
    this.taskList.Bpkind = "TAUD";
    this.taskList.ZAUD_BranchSet = [];
    this.taskList.ZAUD_TAXP_LINKEDSet = [];
    this.taskList.ZAUD_TAXP_NLINKEDSet = [];
    this.taskList.ZHO_TAEMSet = [];
    this.taskList.ZSUBOFFICE_TAEMSet = [];
    this.taskList.ZAUD_TAXP_S_LINKEDSet = this.allocationList;
    console.log("s-list", this.taskList);

    this.auditorService.saveLinkedList(this.taskList).subscribe(
      (data) => {
        if (data) {
          this.istaskchange = false;
          this.sLinkedList = data["d"].ZAUD_TAXP_S_LINKEDSet["results"];
          for (let i = 0; this.sLinkedList.length > i; i++) {
            if (this.sLinkedList[i].TaemTin != "") {
              this.isTaskDlink = false;
              this.isConfirmError = false;
              this.isTaskSuccess = true;
            } else {
              this.isTaskSuccess = false;
              this.isTaskDlink = true;
              this.isConfirmError = false;
            }
          }
        }
        this.getTaskAllocationList();
        console.log("save-linked", data);
      },
      (error) => {
        this.errorString = "";
        this.notifierService.hideOldest();
        if (error.error.error.innererror.errordetails.length >= 2) {
          for (
            var i = 0;
            i < error.error.error.innererror.errordetails.length - 1;
            i++
          ) {
            this.errorString =
              this.errorString +
              error.error.error.innererror.errordetails[i].message;
          }
        } else {
          this.errorString =
            error.error.error.innererror.errordetails[0].message;
        }
        this.isTaskError = true;
        console.log("error-linked", error);
      }
    );
  }
  dlinkTaxpayer() {
    this.istaskchange = true;
    this.linkedTaskAllocation();
    $("#delinkPopup").modal("hide");
  }
  cancelTaxpayer() {
    this.getTaskAllocationList();
    $("#delinkPopup").modal("hide");
  }
  taskDlinkClose() {
    this.isTaskDlink = false;
  }
  taskSuccessClose() {
    this.isTaskSuccess = false;
  }
  taskErrorClose() {
    this.isTaskError = false;
  }
  taskDlinkErrorClose() {
    this.isTaskDlinkError = false;
  }
  taskConfirmErrorClose() {
    this.isConfirmError = false;
  }
  back1() {
    this.Step = 1;
    this.isSuccess = false;
    this.isError = false;
    this.isTaskSuccess = false;
    this.isTaskError = false;
    this.istaskchange = false;
    this.stepsChecking();
  }

  back2() {
    this.Step = 2;
  }

  step2() {
    this.Step = 2;
  }

  step3() {
    this.Step = 3;
  }
}

export class EmployeeInfoModel {
  Name: string;
  Branch: string;
  AddrNumber: number;
  PhoneNumber: any;
  Email: string;
  IsBranchAdmin: boolean;
}
