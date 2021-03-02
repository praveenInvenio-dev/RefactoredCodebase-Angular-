import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserManagementService } from "src/app/services/user-management.service";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { taskAllocConstants } from "src/app/constants/taskAllocation.constants";

@Component({
  selector: "app-task-allocation",
  templateUrl: "./task-allocation.component.html",
  styleUrls: ["./task-allocation.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class TaskAllocationComponent implements OnInit {
  direction = "ltr";
  queryParam = "";
  queryParamName = "";
  pageBranchName: any = {};
  userAuthIndex: number;
  taxTypesList: any = [];
  authSeqNo = "";
  showId1 = true;
  showId2 = true;
  taxTraker = 0;
  branchList;
  // Create activated route to get query params
  constructor(
    private activatedRoute: ActivatedRoute,
    public UserManagementService: UserManagementService,
    private router: Router,
    public notifierService: NotifierService
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      console.log(data);
      this.queryParam = data["page"];
      this.queryParamName = data["name"];

      console.log(this.queryParamName);
    });
  }

  taskAllocConstants = taskAllocConstants;
  //
  //Fiscal Year task alloc years data - List of Returns & Objections
  fiscalYearDetails = [];
  // List of Services
  listOfServices = [];
  // New task alloc get edit user vars
  newEditUser = [];

  ngOnInit(): void {
    // this.authorizeReturns()
    if (localStorage["lang"] === "ar") {
      console.log("lang is arabic");
      this.direction = "rtl";
    }
    // this.getTaskAllocDetailsByTaxType()
    // this.taskAllocEditUser()
    this.getTaskAllocUSerInfo(); // Get users + authid + auth seq
  }

  // Get Tax tp
  getTaxType(index) {
    this.taxTraker = index;
    this.userAuthIndex = this.newEditUser.findIndex(
      (user) =>
        user["AuthUsrno"] === this.queryParam &&
        user["Taxtp"] === this.taxTypesList[this.taxTraker]["Taxtp"]
    );
    if (this.userAuthIndex < 0) {
      this.authSeqNo = "";
      this.getEditUserByTaxType2(this.taxTypesList[index]["Taxtp"]);
    } else {
      this.authSeqNo = this.newEditUser[this.userAuthIndex]["AuthSeqNo"];
      this.getEditUserByTaxType(index);
    }
  }

  // Make Activities array
  activities: any = [];

  toggleIcon(id) {
    if (id === "id1") {
      this.showId1 = !this.showId1;
      console.log(this.showId1);
    }
    if (id === "id2") {
      this.showId2 = !this.showId2;
      console.log(id);
    }
  }

  // get not found edit user by tax type 2
  getEditUserByTaxType2(taxType) {
    this.UserManagementService.getDetailsByBranch(taxType).subscribe(
      (res) => {
        console.log(res);
        this.editGetVar = res;

        this.fiscalYearDetails = res["d"]["ReturnsSet"]["results"]; // objections array
        this.listOfServices = res["d"]["ServicesSet"]["results"]; // services array
        //Construct activity set
        for (let i = 0; i < this.fiscalYearDetails.length; i++) {
          this.x[i] = {
            AuthusrTin: this.editGetVar["d"]["AuthusrTin"],
            Fbtyp: "",
            Objection: this.fiscalYearDetails[i]["ObjectionCb"],
            Persl: this.fiscalYearDetails[i]["Persl"],
            Request: "",
            ReturnYr: this.fiscalYearDetails[i]["ReturnCb"],
          };
        }
        // Construct activitty set for for services
        //EnableCb is to enable services or disable
        console.log("creating the service..");
        for (let i = 0; i < this.listOfServices.length; i++) {
          this.y[i] = {
            AuthusrTin: this.editGetVar["d"]["AuthusrTin"],
            Fbtyp: this.listOfServices[i]["Fbtyp"],
            Objection: "",
            Persl: "",
            Request: this.listOfServices[i]["Request"] == undefined ? "" : "X",
            ReturnYr: "",
          };
        }
        console.log(this.y);
        console.log(this.listOfServices);
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

  usersArray: any = [];
  //  getuser details using fbguuid =? userset and tax types
  getTaskAllocUSerInfo() {
    console.log("getting task alloc user with auth seq and authusrid");
    this.UserManagementService.getTaskAllocAllUsers(
      localStorage["fn"],
      localStorage["eu"]
    ).subscribe(
      (res) => {
        console.log(res);
        this.newEditUser = res["d"]["UserSet"]["results"]; // New user set using api no 9
        this.taxTypesList = res["d"]["TaxTypSet"]["results"];
        console.log(this.taxTypesList);
        console.log(this.newEditUser);
        this.userAuthIndex = this.newEditUser.findIndex(
          (user) =>
            user["AuthUsrno"] === this.queryParam &&
            user["Taxtp"] === this.taxTypesList[this.taxTraker]["Taxtp"]
        );

        // Variable to check if index of authurno not is present in get users suign fbguid
        this.pageBranchName = res["d"]["AllBranchesSet"]["results"][0]; // Branch name + all details
        // Branch list
        this.branchList = res["d"]["AllBranchesSet"]["results"];
        this.usersArray = res["d"]["UserSet"]["results"];
        console.log(this.pageBranchName);

        if (this.userAuthIndex < 0) {
          this.authSeqNo = "";
          console.log("Not fouund");
          this.getEditUserByTaxType2(
            this.taxTypesList[this.taxTraker]["Taxtp"]
          );
        } else {
          this.authSeqNo = this.newEditUser[this.userAuthIndex]["AuthSeqNo"];
          // debugger
          this.getEditUserByTaxType(this.taxTraker);
        }

        console.log(this.newEditUser);
      },
      (err) => {
        console.log("The task alloc get user is" + err);
      }
    );
  }

  // Post services activity set
  PostUpdateTaskAllocServices(fbtype) {
    console.log("Posting activity set..");
  }

  x: any = []; // var for activity set construction
  y: any = []; // var for service set construction
  // Authorize returns
  authorizeReturns(p, type) {
    console.log(p);
    console.log(this.x[p]);
    let temp_var = this.x;
    console.log(type);
    if (type === "return") {
      if (this.fiscalYearDetails[p]["ReturnCb"] !== "") {
        this.notifictionStatus = false;
        console.log("not blank");
        this.fiscalYearDetails[p]["ReturnCb"] = "";
        // this.UserManagementService.authorizeData(temp_var).subscribe(res => {console.log(res),err => console.log(err)})
      } else {
        console.log(" blank");
        this.fiscalYearDetails[p]["ReturnCb"] = "X";
        this.notifictionStatus = true;
      }
    } else {
      if (this.fiscalYearDetails[p]["ObjectionCb"] !== "") {
        console.log("not blank");
        this.fiscalYearDetails[p]["ObjectionCb"] = "";
        this.notifictionStatus = false;

        // this.UserManagementService.authorizeData(temp_var).subscribe(res => {console.log(res),err => console.log(err)})
      } else {
        console.log(" blank");
        this.fiscalYearDetails[p]["ObjectionCb"] = "X";
        this.notifictionStatus = true;
      }
    }
    console.log(this.fiscalYearDetails);
    let filtered_array = this.fiscalYearDetails.filter((authorizedReturn) => {
      return (
        authorizedReturn["ReturnCb"] === "X" ||
        authorizedReturn["ObjectionCb"] === "X"
      );
    });
    let filteredServicesArray = this.listOfServices.filter((authServices) => {
      return authServices["EnableCb"] == "X";
    });

    const rebuildServiceArray = [];

    for (let i = 0; i < filtered_array.length; i++) {
      if (filtered_array[i]["ObjectionCb"] === "X") {
        rebuildServiceArray.push({
          AuthusrTin: this.queryParam,
          Fbtyp: "",
          Objection: filtered_array[i]["ObjectionCb"],
          Persl: filtered_array[i]["Persl"],
          Request: "",
          ReturnYr: "",
        });
      }
      if (filtered_array[i]["ReturnCb"] === "X") {
        rebuildServiceArray.push({
          AuthusrTin: this.queryParam,
          Fbtyp: "",
          Objection: "",
          Persl: filtered_array[i]["Persl"],
          Request: "",
          ReturnYr: filtered_array[i]["ReturnCb"],
        });
      }
    }
    for (let i = 0; i < filteredServicesArray.length; i++) {
      rebuildServiceArray.push({
        AuthusrTin: this.queryParam,
        Fbtyp: filteredServicesArray[i]["Fbtyp"],
        Objection: "",
        Persl: "",
        Request: "X",
        ReturnYr: "",
      });
    }
    console.log(rebuildServiceArray);
    console.log("the combined activity set is");
    console.log(filtered_array);
    console.log("ddd" + filtered_array);
    this.UserManagementService.authorizeData(rebuildServiceArray, {
      Taxtp: this.taxTypesList[this.taxTraker]["Taxtp"],
      BranchNo: this.pageBranchName["BranchNo"],
      BranchNm: this.pageBranchName["BranchNm"],
      AuthusrTin: this.queryParam,
      AuthusrName: this.queryParamName,
      AuthSeqNo: this.authSeqNo,
    }).subscribe(
      (res) => {
        if (this.notifictionStatus == false) {
          this.notifierService.notify(
            "success",
            localStorage["lang"] == "ar"
              ? taskAllocConstants["taskSuccessfullyDelinked"]["arb"]
              : taskAllocConstants["taskSuccessfullyDelinked"]["eng"]
          );
        } else if (this.notifictionStatus == true) {
          this.notifierService.notify(
            "success",
            localStorage["lang"] == "ar"
              ? taskAllocConstants["taskSuccessAssigned"]["arb"]
              : taskAllocConstants["taskSuccessAssigned"]["eng"]
          );
        }

        console.log(res);
        // this.authSeqNo = res["d"]["AuthSeqNo"]
        this.getTaskAllocUSerInfo();
      },
      (err) => {
        console.log(err);
        // console.log(err["error"]["error"]["innererror"]["errordetails"][0]["message"])
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
        if (type === "return") {
          if (this.fiscalYearDetails[p]["ReturnCb"] !== "") {
            console.log("not blank");
            this.fiscalYearDetails[p]["ReturnCb"] = "";
            // this.UserManagementService.authorizeData(temp_var).subscribe(res => {console.log(res),err => console.log(err)})
          } else {
            console.log(" blank");
            this.fiscalYearDetails[p]["ReturnCb"] = "X";
          }
        } else {
          if (this.fiscalYearDetails[p]["ObjectionCb"] !== "") {
            console.log("not blank");
            this.fiscalYearDetails[p]["ObjectionCb"] = "";
            // this.UserManagementService.authorizeData(temp_var).subscribe(res => {console.log(res),err => console.log(err)})
          } else {
            console.log(" blank");
            this.fiscalYearDetails[p]["ObjectionCb"] = "X";
          }
        }
      }
    );
  }

  notificationIndex; // Store index of cliked toggle
  notifictionStatus = null;
  // Authoruze services
  authServcies(p) {
    let temp_var = this.y;
    console.log(p, temp_var, this.y);
    if (this.listOfServices[p]["EnableCb"] != "") {
      this.notifictionStatus = false;
      console.log("not blank");
      this.listOfServices[p]["EnableCb"] = "";
    } else {
      this.listOfServices[p]["EnableCb"] = "X";
      this.notifictionStatus = true;
    }

    let filteredServicesArray = this.listOfServices.filter((authServices) => {
      return authServices["EnableCb"] == "X";
    });

    let filtered_array = this.fiscalYearDetails.filter((authorizedReturn) => {
      return (
        authorizedReturn["ReturnCb"] === "X" ||
        authorizedReturn["ObjectionCb"] === "X"
      );
    });
    const rebuildServiceArray = [];
    for (let i = 0; i < filtered_array.length; i++) {
      if (filtered_array[i]["ObjectionCb"] === "X") {
        rebuildServiceArray.push({
          AuthusrTin: this.queryParam,
          Fbtyp: "",
          Objection: filtered_array[i]["ObjectionCb"],
          Persl: filtered_array[i]["Persl"],
          Request: "",
          ReturnYr: "",
        });
      }
      if (filtered_array[i]["ReturnCb"] === "X") {
        rebuildServiceArray.push({
          AuthusrTin: this.queryParam,
          Fbtyp: "",
          Objection: "",
          Persl: filtered_array[i]["Persl"],
          Request: "",
          ReturnYr: filtered_array[i]["ReturnCb"],
        });
      }
    }
    for (let i = 0; i < filteredServicesArray.length; i++) {
      rebuildServiceArray.push({
        AuthusrTin: this.queryParam,
        Fbtyp: filteredServicesArray[i]["Fbtyp"],
        Objection: "",
        Persl: "",
        Request: "X",
        ReturnYr: "",
      });
    }
    console.log(rebuildServiceArray);

    this.UserManagementService.authorizeData(rebuildServiceArray, {
      Taxtp: this.taxTypesList[this.taxTraker]["Taxtp"],
      BranchNo: this.pageBranchName["BranchNo"],
      BranchNm: this.pageBranchName["BranchNm"],
      AuthusrTin: this.queryParam,
      AuthusrName: this.queryParamName,
      AuthSeqNo: this.authSeqNo,
    }).subscribe(
      (res) => {
        if (this.notifictionStatus == false) {
          this.notifierService.notify(
            "success",
            localStorage["lang"] == "ar"
              ? taskAllocConstants["taskSuccessfullyDelinked"]["arb"]
              : taskAllocConstants["taskSuccessfullyDelinked"]["eng"]
          );
        } else {
          this.notifierService.notify(
            "success",
            localStorage["lang"] == "ar"
              ? taskAllocConstants["taskSuccessAssigned"]["arb"]
              : taskAllocConstants["taskSuccessAssigned"]["eng"]
          );
        }

        console.log(res);
        // this.authSeqNo = res["d"]["AuthSeqNo"]
        this.getTaskAllocUSerInfo();
      },
      (err) => {
        console.log(err);
        this.notifierService.notify(
          "error",
          err["error"]["error"]["innererror"]["errordetails"][0]["message"]
        );
        if (this.listOfServices[p]["EnableCb"] != "") {
          console.log("not blank");
          this.listOfServices[p]["EnableCb"] = "";
        } else {
          this.listOfServices[p]["EnableCb"] = "X";
        }
      }
    );
  }

  // Edit user get res store var
  editGetVar: any = [];
  // Get user tax type
  getEditUserByTaxType(taxTypeIndex) {
    this.taxTraker = taxTypeIndex;
    console.log("getting other taxes");
    this.UserManagementService.getEditUserApi(
      this.newEditUser[this.userAuthIndex],
      this.taxTypesList[taxTypeIndex]
    ).subscribe(
      (res) => {
        console.log(res);
        this.editGetVar = res;
        this.queryParamName = res["d"]["AuthusrName"]; //AuthusrName
        this.fiscalYearDetails = res["d"]["ReturnsSet"]["results"]; // objections array
        this.listOfServices = res["d"]["ServicesSet"]["results"]; // services array
        //Construct activity set
        for (let i = 0; i < this.fiscalYearDetails.length; i++) {
          this.x[i] = {
            AuthusrTin: this.editGetVar["d"]["AuthusrTin"],
            Fbtyp: "",
            Objection: this.fiscalYearDetails[i]["ObjectionCb"],
            Persl: this.fiscalYearDetails[i]["Persl"],
            Request: "",
            ReturnYr: this.fiscalYearDetails[i]["ReturnCb"],
          };
        }
        console.log(this.x);
        console.log(this.fiscalYearDetails);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goBackToUserManagement() {
    this.router.navigate(["/mains/usermanagement"]);
  }
  navigateToProfile() {
    this.router.navigate(["/mains/profile"]);
  }
  navigateToUsermanagement() {
    this.router.navigate(["/mains/usermanagement"]);
  }
}
