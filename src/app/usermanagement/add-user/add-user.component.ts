import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "src/app/services/user-management.service";
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import * as moment from "moment";
import { toHijri, toGregorian } from "hijri-converter";
import { assUserConstants } from "./../../constants/addUser.constants";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  direction = "ltr";
  d_set: any;
  IDArray: any = [];
  formGroupValidator = false;
  isIDNumberValid = false;
  isIDNumberApiFailed = false;
  //Date picker vars
  minDate;
  maxDate;

  headerComponent = CalendarComponent;
  addUserConstants = assUserConstants;
  usrCreatesuccess: any;
  constructor(
    public UserManagementService: UserManagementService,
    private router: Router,
    public notifierService: NotifierService
  ) {}
  uid: any;

  //Var to get branch from localstorage
  branchSet: any;
  name_v = false;

  // Arabic messages for some vars like mobile
  pleaseEnterMobile =
    localStorage["lang"] == "ar"
      ? assUserConstants.pleaseEnterMobile["arb"]
      : assUserConstants.pleaseEnterMobile["eng"];
  mobNoShouldStartWithFive =
    localStorage["lang"] == "ar"
      ? assUserConstants.mobileShouldStartwith5["arb"]
      : assUserConstants.mobileShouldStartwith5["eng"];
  invalidEmail =
    localStorage["lang"] == "ar"
      ? assUserConstants.invalidEmail["arb"]
      : assUserConstants.invalidEmail["eng"];
  pleaseEnterEmail =
    localStorage["lang"] == "ar"
      ? assUserConstants.pleaseEnterEmail["arb"]
      : assUserConstants.pleaseEnterEmail["eng"];

  ngOnInit(): void {
    //Get todays date
    var today = new Date();
    var dd: any = String(today.getDate()).padStart(2, "0");
    var mm: any = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    this.maxDate = new Date(yyyy, mm, dd);
    console.log(this.maxDate);
    console.log(this.form.value);
    this.form.controls.dob.setValue(null);
    this.usrCreatesuccess =
      localStorage["lang"] == "ar"
        ? assUserConstants.userSuccessfullyCreate["arb"]
        : assUserConstants.userSuccessfullyCreate["eng"];
    // Handle language
    if (localStorage["lang"] === "ar") {
      console.log("lang is arabic");
      this.direction = "rtl";
      //userSuccessfullyCreate
      //this.usrCreatesuccess= localStorage['lang'] == 'ar' ? assUserConstants.userSuccessfullyCreate['arb'] : assUserConstants.userSuccessfullyCreate['eng']
      // this.usrCreatesuccess = userManagementConstants.arb.userSuccessfullyCreate;
      console.log(this.usrCreatesuccess);
    } else {
      console.log("lang is en");
      // this.usrCreatesuccess= localStorage['lang'] == 'ar' ? assUserConstants.userSuccessfullyCreate['arb'] : assUserConstants.userSuccessfullyCreate['eng']
      // this.usrCreatesuccess = userManagementConstants.eng.userSuccessfullyCreate;
      console.log(this.usrCreatesuccess);
    }
    //Get branch data- call api
    this.branchAPI();
    console.log(localStorage["Branch"]);
    // this.branchSet =  JSON.parse(localStorage.getItem["Branch"])

    console.log(this.branchSet);
    console.log(toGregorian(1441, 5, 6));
    console.log(toHijri(2020, 1, 1));
    let greg_date = toGregorian(1441, 5, 6);

    console.log(
      moment(new Date(greg_date.gy, greg_date.gm - 1, greg_date.gd)).valueOf()
    );
    console.log(moment("2020-01-01").locale("en").valueOf());

    moment.locale();
    this.uid = localStorage["gpart"];

    //Get ID set old
    this.d_set = JSON.stringify(localStorage["Id_Set"]);
    console.log(this.d_set);
    this.IDArray = this.d_set.split(",");
    console.log(this.IDArray);
    // Get ID set new
    this.getUserManagementIdSet();
  }

  // idSetNew:any
  idSetNew: any;
  getUserManagementIdSet() {
    let i = localStorage["gpart"];
    this.UserManagementService.getInitialData(i).subscribe(
      (res) => {
        console.log(res);
        this.idSetNew = res["d"]["IdSet"]["results"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToUserManagement() {
    console.log("routing to... usermngm");
    this.router.navigate(["mains/usermanagement"]);
  }

  //New branch var
  new_branch = [];
  branchAPI() {
    console.log("Entered branch ai");
    let a = localStorage["fn"];
    console.log(a);
    let b = localStorage["eu"];
    console.log(b);

    this.UserManagementService.getTaskAllocAllUsers(a, b).subscribe(
      (res) => {
        console.log(res);
        this.new_branch = res["d"]["AllBranchesSet"]["results"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onChangeDOB(e) {
    console.log(e);
  }

  // constant for usrCreatesuccess

  submit() {
    console.log(this.form);
    if (this.form.valid && this.isIDNumberValid) {
      console.log("valid form..");
      this.formGroupValidator = false;
      //uid=gpart
      //this.form.controls['phone'].setValue("00966"+this.form.value.phone);
      const data = this.form.value;
      data["phone"] = "00966" + this.form.value.phone;
      console.log(data, this.new_branch[data["branch"]]);
      data["branchName"] = this.new_branch[data["branch"]]["BranchNm"];
      data["branchNo"] = this.new_branch[data["branch"]]["BranchNo"];
      console.log(data);
      this.UserManagementService.postUserDetails(data, this.uid).subscribe(
        (res) => {
          this.notifierService.notify("success", this.usrCreatesuccess);
          console.log("routing");
          console.log(res);
          setTimeout(() => {
            console.log(this.router);
            this.router.navigate(["mains/usermanagement"]);
          }, 3000);
        },
        (err) => {
          console.log(err);
          console.log(
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
        }
      );
    } else {
      console.log("invalid form..");
      this.formGroupValidator = true;
    }
  }

  form = new FormGroup({
    idNo: new FormControl("", [Validators.required]),
    idType: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    branch: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^5[0-9]{8}$/),
    ]),
    email: new FormControl("", [
      Validators.email,
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]),
  });

  // Lenght validator for id
  spaceValidator = (event: any) => {
    let value = /^[0-9]*$/.test(event.target.value);
    console.log(value);
    if (!value) {
      event.target.value = event.target.value.slice(0, -1);
    }
    this.ValidateUserIDandDob();
  };

  numberValidator(event) {
    this.form.controls["phone"].setValue(
      event.target.value.replace(/[^0-9]/g, "")
    );
    //  event.target.value = event.target.replace(/[^0-9]/g, "")
  }

  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.form.controls["name"].setValue(name);
    // this.form.controls['name'].setValue(event.target.value.replace(/[^a-z A-Z /s]/g, ""))
    // event.target.value = event.target.replace(/[^a-z A-Z /s]/g, "")
  }

  selectIdType() {
    this.form.controls.idNo.setValue("");
    this.form.controls.dob.setValue(null);
    this.form.controls.name.setValue("");
  }

  isValidCheck() {
    if (
      this.form.value.idType === "ZTPAU3" &&
      this.form.value.idNo.length > 6 &&
      this.form.value.idNo.length < 15
    ) {
      this.isIDNumberValid = true;
    } else {
      this.isIDNumberValid = false;
    }
  }
  navigateToProfile() {
    this.router.navigate(["/mains/profile"]);
  }
  navigateToUsermanagement() {
    this.router.navigate(["/mains/usermanagement"]);
  }

  // Validate tin , dob and idtype
  ValidateUserIDandDob() {
    let dob = "";
    this.isIDNumberValid = false;
    console.log("I'm here", this.form);
    if (!this.form.value.dob || !this.form.value.idType) {
      return false;
    }
    console.log(this.form.value.idType);
    console.log(this.form.value.idNo.length);
    console.log(
      ((this.form.value.idType === "ZTPAU1" ||
        this.form.value.idType === "ZTPAU2") &&
        this.form.value.idNo?.length !== 10) ||
        (this.form.value.idType === "ZTPAU3" &&
          (this.form.value.idNo.length < 7 || this.form.value.idNo.length > 14))
    );
    if (
      ((this.form.value.idType === "ZTPAU1" ||
        this.form.value.idType === "ZTPAU2") &&
        this.form.value.idNo?.length !== 10) ||
      (this.form.value.idType === "ZTPAU3" &&
        (this.form.value.idNo.length < 7 || this.form.value.idNo.length > 14))
    ) {
      return false;
    } else if (
      this.form.value.idType === "ZTPAU1" &&
      this.form.value.idNo.charAt(0) !== "1"
    ) {
      return false;
    } else if (
      this.form.value.idType === "ZTPAU2" &&
      this.form.value.idNo.charAt(0) !== "2"
    ) {
      return false;
    }
    if (this.form.value["dob"]["calendarName"] === "Islamic") {
      const gre_date = toGregorian(
        this.form.value["dob"]["calendarStart"]["year"],
        this.form.value["dob"]["calendarStart"]["month"],
        this.form.value["dob"]["calendarStart"]["day"]
      );
      dob = moment(
        new Date(gre_date["gy"], gre_date["gm"] - 1, gre_date["gd"])
      ).format("YYYYMMDD");
    } else {
      dob = moment(
        new Date(
          this.form.value["dob"]["calendarStart"]["year"],
          this.form.value["dob"]["calendarStart"]["month"] - 1,
          this.form.value["dob"]["calendarStart"]["day"]
        )
      ).format("YYYYMMDD");
    }
    this.UserManagementService.ValidateTinAndDob(
      this.form.value.idType,
      this.form.value.idNo,
      dob
    ).subscribe(
      (res) => {
        console.log(res);
        this.isIDNumberValid = true;
        this.isIDNumberApiFailed = false;
        let v = res["d"]["Adrnr"];
        if (v === "V") {
          this.name_v = false;
        } else {
          this.name_v = true;
          let name = `${res["d"]["Name1"]} ${res["d"]["FatherName"]} ${res["d"]["FamilyName"]}`; // construct name
          console.log(name);
          this.form.controls.name.setValue(name);
        }
      },
      (err) => {
        console.log(err);
        this.isIDNumberApiFailed = true;
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }
}
