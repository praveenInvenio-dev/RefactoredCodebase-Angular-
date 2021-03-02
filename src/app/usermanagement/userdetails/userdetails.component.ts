import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
declare var $: any;
import { UserManagementService } from "src/app/services/user-management.service";
import { NotifierService } from "angular-notifier";
import { AppService } from "src/app/app.service";
import { userManagementConstants } from "src/app/constants/userDetails.constants";

@Component({
  selector: "app-userdetails",
  templateUrl: "./userdetails.component.html",
  styleUrls: ["./userdetails.component.css"],
})
export class UserdetailsComponent implements OnInit {
  taxPayerName = null;
  tin = localStorage.getItem("gpart");
  linkedTaxPayerArray: any = [];

  // Vars

  userManagementConstants = userManagementConstants; // Import constants into var
  direction = "ltr"; // Set initial directin for lang

  queryParam;
  queryParamName;
  queryParamBranch = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public UserManagementService: UserManagementService,
    public notifierService: NotifierService,
    public appSrv: AppService
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      console.log(data);
      this.queryParam = data["page"];
      this.queryParamName = data["name"];
      this.queryParamBranch = data["branch"];
      //branch

      // Get taxpayer name
      this.appSrv.data3.subscribe((value) => {
        console.log(value);
        this.taxPayerName = value;
      });

      console.log(this.queryParamName);
    });
  }

  goToUserManagement() {
    this.router.navigate(["/mains/usermanagement"]);
  }

  activateButtonVar;
  deactivateBUttonVar;

  ngOnInit(): void {
    // Get all task alloc users

    this.getUserDetails();
    if (localStorage["lang"] === "ar") {
      console.log("lang is arabic");
      this.direction = "rtl";
    } else {
      this.direction == "ltr";
      // this.deactivateBUttonVar = localStorage['lang'] == 'ar' ? userManagementConstants['Deactivate']['arb']: userManagementConstants['Deactivate']['eng']
    }
    this.activateButtonVar =
      localStorage["lang"] == "ar"
        ? userManagementConstants["Activate"]["arb"]
        : userManagementConstants["Activate"]["eng"];
    this.deactivateBUttonVar =
      localStorage["lang"] == "ar"
        ? userManagementConstants["Deactivate"]["arb"]
        : userManagementConstants["Deactivate"]["eng"];
  }

  gotoTaskAlloc(authUsri, name) {
    this.router.navigate(["/mains/taskallocation"], {
      queryParams: { page: authUsri, name: this.queryParamName },
    });
  }

  gotoEditUser() {
    this.router.navigate(["/mains/edituser"], {
      queryParams: { page: this.queryParam, name: this.queryParamName },
    });
  }

  //close
  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "sukukBondsCard") {
      $("#sukukBondsCard").modal("toggle");
    }
  }

  // Show modal
  isActive;
  getModal(event, cardType) {
    // console.log(' $("#aftsubmit").modal("show");');
    console.log(this.showTaskAlloc);
    if (!this.showTaskAlloc) {
      this.modalConfirm();
      return false;
    }
    console.log(this.showTaskAlloc);
    if (cardType === "sukukBondsCard") {
      this.isActive = 1;
      ($("#sukukBondsCard") as any).modal("show");

      // console.log(this.getUserResponseDisplayVar[this.selectedUserIndex]['Name'])
    }
  }

  color; // user data variable - active users list
  color2; // Inactive users list

  showTaskAlloc = false;
  branchName = null;
  // Get details of user by authusrtin
  getUserDetails() {
    this.UserManagementService.getInitialData(localStorage["gpart"]).subscribe(
      (res) => {
        console.log(res);
        let userSet = res["d"]["UserSet"]["results"];

        // add a key to userSet called status: active
        for (let i = 0; i < userSet.length; i++) {
          // Add key here
          userSet[i]["status"] = "true";
        }
        console.log(userSet);
        let userbranchset = res["d"]["UserBranchSet"]["results"];
        this.branchName = userbranchset[0]["BranchNm"];

        let indexFound = userSet.findIndex(
          (user) => user["AuthUsrno"] === this.queryParam
        );
        console.log(indexFound);
        if (indexFound !== -1) {
          this.showTaskAlloc = true;
          this.color = userSet[indexFound];
          console.log(this.color);
          // this.branchName = userSet[indexFound]['Branch']
          // Call api req for linked sets info
          this.UserManagementService.getTaskAllocAllUsers(
            localStorage["fn"],
            localStorage["eu"]
          ).subscribe(
            (res) => {
              console.log(res);
              let newEditUser = res["d"]["UserSet"]["results"]; // New user set using api no 9
              this.linkedTaxPayerArray = newEditUser.filter(
                (user) => user["AuthUsrno"] === this.queryParam
              );
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.showTaskAlloc = false;
          console.log("Not found" + this.showTaskAlloc);
          //Get list of deleted users
          this.UserManagementService.getDeletedUsers().subscribe(
            (res) => {
              console.log(res);
              let inactiveUserSet = res["d"]["results"];
              for (let i = 0; i < inactiveUserSet.length; i++) {
                inactiveUserSet[i]["status"] = false;
              }
              console.log(inactiveUserSet);
              let deactivatedIndexFound = inactiveUserSet.findIndex(
                (user) => user["AuthUsrno"] === this.queryParam
              );
              console.log(deactivatedIndexFound);
              if (deactivatedIndexFound !== -1) {
                this.color2 = inactiveUserSet[deactivatedIndexFound];
              } else {
                //Else not possible as user will be found here if not in active users list
              }
              console.log(this.color2);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Confirm activate or deactivate
  modalConfirm() {
    console.log(this.color, this.color2);

    if (!this.showTaskAlloc) {
      this.activateUser(
        this.color2["AuthUsrno"],
        this.color2["IdType"],
        this.color2["IdNumber"],
        this.color2["Mobileno"],
        this.color2["Name"]
      );
    } else {
      this.deleteUser(
        this.color["AuthUsrno"],
        this.color["IdNumber"],
        this.color["Emailid"],
        this.color["UserNo"],
        this.color["BranchNo"]
      );
    }
  }

  //Activate deleted user
  activateUser(i, j, k, l, m) {
    console.log("activating user..");

    this.UserManagementService.addDeletedUser(i, j, k, l, m).subscribe(
      (res) => {
        console.log("the res for activate is" + res);

        this.closeModal("sukukBondsCard");
        this.notifierService.notify(
          "success",
          localStorage["lang"] == "ar"
            ? userManagementConstants["userSuccessfullyActivated"]["ar"]
            : userManagementConstants["userSuccessfullyActivated"]["eng"]
        );
        this.getUserDetails();
      },
      (err) => {
        console.log(err);
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }
  navigateToProfile() {
    this.router.navigate(["/mains/profile"]);
  }
  navigateToUsermanagement() {
    this.router.navigate(["/mains/usermanagement"]);
  }
  // Delete user function
  deleteUser(authId, IdNumber, Emailid, UserNo, BranchNo) {
    console.log("deleting user...");

    this.UserManagementService.deActivateUser(
      authId,
      IdNumber,
      Emailid,
      UserNo,
      BranchNo
    ).subscribe(
      (res) => {
        console.log(res);
        //call get api here again to update list
        this.closeModal("sukukBondsCard");

        this.notifierService.notify(
          "success",
          localStorage["lang"] == "ar"
            ? this.userManagementConstants["userSuccessfullyDeleted"]["arb"]
            : this.userManagementConstants["userSuccessfullyDeleted"]["eng"]
        );
        this.getUserDetails();
      },
      (err) => {
        console.log(err);
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
      }
    );
  }
}
