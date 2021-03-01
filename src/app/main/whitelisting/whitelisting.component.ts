import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  fillingFrequency,
  searchConstants,
  monthConstants,
  filterConstants,
} from "src/app/constants/whitelist.constant";
import { WhitelistingService } from "src/app/services/whitelisting.service";
import * as moment from "moment";
import { DashboardService } from "src/app/services/dashboard-service";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { FormControl } from "@angular/forms";
import { CommonValidation } from "src/app/constants/commonValidations";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { AppService } from "src/app/app.service";

declare var $: any;

@Component({
  selector: "app-whitelisting",
  templateUrl: "./whitelisting.component.html",
  styleUrls: ["./whitelisting.component.css"],
})
export class WhitelistingComponent implements OnInit {
  constructor(
    private router: Router,
    public whitelistingService: WhitelistingService,
    public dashboardService: DashboardService,
    public commonValid: CommonValidation,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    public appSrv: AppService
  ) {}

  months = monthConstants.eng;
  direction = "ltr";
  headerComponent = CalendarComponent;
  searchConstants;
  img1: string;
  img2: string;
  viewModel = false;
  searchFilter = "";
  instructionsAccepted = false;
  formOpened = false;
  whiteliting = false;

  isActive = 0;

  lang = fillingFrequency.eng;
  public layoutType = "grid";

  listOfWhiteListing: any = [];
  allWhiteLists: any = [];
  typesOfWhiteListing: any = [];
  selectedFormBundle: any = null;
  filterStatus = [];
  filterStatusValue: any = null;
  filterTypes = filterConstants.eng;
  filteredDate = new FormControl(null);

  datas = [
    {
      uuid: "1",
      request: "Request 1",
      requestId: "00089887879",
      requestNumber: "Quarter 4 - 2020",
      date: "09th Aug 2020",
      status: "Pending",
    },
    {
      uuid: "21",
      request: "Request 2",
      requestId: "00089887879",
      requestNumber: "Quarter 4 - 2020",
      date: "20th Aug 2020",
      status: "Pending",
    },
    {
      uuid: "3",
      request: "Request 3",
      requestId: "1234567890",
      requestNumber: "Quarter 4 - 2020",
      date: "18th Aug 2020",
      status: "Pending",
    },
  ];
  instructionsSubmitted = false;

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = fillingFrequency.arb;
      this.months = monthConstants.arb;
      this.filterTypes = filterConstants.arb;
      this.direction = "rtl";
    }
    this.img1 = "assets/image/table (1).svg";
    this.img2 = "assets/image/cards (1).svg";
    this.searchConstants = searchConstants;
    this.getDashboardData();
  }

  getDashboardData() {
    this.dashboardService.getDashboardData$().subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem("euser", response["d"]["Euser"]);
        localStorage.setItem("fbguid", response["d"]["Fbguid"]);
        this.getWhitelistingList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getWhitelistingList() {
    this.whitelistingService.getWhitelistingList().subscribe(
      (res) => {
        console.log(res);
        const assListSet = res["d"]["ASSLISTSet"]["results"];
        this.allWhiteLists = assListSet.filter(
          (asset) => asset["Fbtyp"] === "VCWL"
        );
        for (let i = 0; i < this.allWhiteLists.length; i++) {
          this.allWhiteLists[i]["createdDate"] = this.getDay(
            this.allWhiteLists[i]["Receipt"]
          );
          this.allWhiteLists[i]["statusMessage"] =
            this.allWhiteLists[i]["Fbust"] === "E0015"
              ? this.lang["pending"]
              : this.allWhiteLists[i]["Fbust"] === "E0045"
              ? this.lang["success"]
              : "";
          this.allWhiteLists[i]["title"] = this.lang.submitConsolidated;
        }
        this.listOfWhiteListing = [...this.allWhiteLists];
        const reqTypSet = res["d"]["REQTYPSet"]["results"];
        this.typesOfWhiteListing = reqTypSet.filter((reqType) => {
          return (
            reqType["Fbtyp"] === "CWAG" ||
            reqType["Fbtyp"] === "CWAP" ||
            reqType["Fbtyp"] === "CWLG" ||
            reqType["Fbtyp"] === "CWLP" ||
            reqType["Fbtyp"] === "CWSG" ||
            reqType["Fbtyp"] === "CWSP"
          );
        });
        for (let i = 0; i < this.typesOfWhiteListing["length"]; i++) {
          this.typesOfWhiteListing[i]["Fbtyp"] =
            "CRE_" + this.typesOfWhiteListing[i]["Fbtyp"];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newWhitelistRequest() {
    this.getModal("Instruction");
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }

  getDay(day) {
    if (!day) {
      return "";
    }
    const momentDate = moment(day).locale("en-us");
    let zeroAppend = "";
    if (momentDate.format("DD").charAt(0) === "0") {
      zeroAppend = "0";
    }
    if (localStorage.getItem("lang") === "ar") {
      return `${momentDate.format("DD")} ${
        this.months[momentDate.format("MM")]
      } ${momentDate.format("YYYY")} `;
    } else {
      return `${zeroAppend}${moment(day)
        .locale("en-us")
        .format("Do MMM YYYY")}`;
    }
  }

  changeView(type) {
    this.layoutType = type;
  }

  getModal(cardType) {
    localStorage.removeItem("agreeWhitelist");
    if (cardType === "Instruction") {
      this.isActive = 1;
      this.whiteliting = true;
      $("#Instruction").modal("show");
    } else {
      this.whiteliting = false;
    }
  }

  closeModal(cardType) {
    if (cardType === "Instruction") {
      this.instructionsSubmitted = false;
      this.whiteliting = false;
      $("#Instruction").modal("toggle");
      this.router.navigateByUrl("/mains/whitelisting").then();
    }
  }

  openForm(cardType) {
    if (cardType === "Instruction") {
      this.instructionsSubmitted = true;
      if (this.instructionsAccepted) {
        $("#Instruction").modal("toggle");
        // this.router.navigateByUrl(`/mains/${1}/whitelistingRequest`).then();
        this.formOpened = true;
      }
    }
  }

  openFormBundle(formBundle) {
    this.formOpened = true;
    this.selectedFormBundle = formBundle;
  }

  closeForm() {
    this.formOpened = false;
    this.selectedFormBundle = null;
    this.instructionsAccepted = false;
    this.instructionsSubmitted = false;
  }

  showFilter() {
    this.filteredDate.setValue(null);
    this.filterStatus = [];
    this.filterStatusValue = null;
    $("#filterModal").modal("show");
  }

  closeFilter() {
    $("#filterModal").modal("hide");
  }

  getStatusClass(status) {
    if (status === "E0045") {
      return "tag-success";
    } else if (status === "E0001" || status === "E0013") {
      return "tag-unsubmit";
    } else if (status === "E0018" || status === "E0043" || status === "E0051") {
      return "tag-danger";
    } else {
      return "tag-partial";
    }
  }

  applyFilter() {
    let allWhiteLists = [...this.allWhiteLists];
    // if (this.filterStatus.length > 0) {
    //   allWhiteLists = allWhiteLists.filter((whiteList) => {
    //     if (this.filterStatus.indexOf(whiteList["Fbust"]) > -1) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // }
    console.log(this.filterStatusValue);
    if (this.filterStatusValue !== null && this.filterStatusValue !== "all") {
      allWhiteLists = allWhiteLists.filter(
        (whiteList) => whiteList["Fbust"] === this.filterStatusValue
      );
    }
    if (this.filteredDate.value !== null) {
      let date = "";
      if (this.filteredDate["value"]["calendarName"] === "Islamic") {
        const convertedDate = this.commonValid.dateFormate(
          this.filteredDate["value"],
          "Gregorian"
        );
        date = this._dateAdapter.format(convertedDate, "DD-MM-YYYY");
      } else {
        date = this._dateAdapter.format(
          this.filteredDate["value"],
          "DD-MM-YYYY"
        );
      }
      allWhiteLists = allWhiteLists.filter((whitelist) => {
        if (!whitelist["Receipt"]) return false;
        console.log(
          date,
          moment(whitelist["Receipt"]).locale("en-us").format("DD-MM-YYYY")
        );
        if (
          moment(whitelist["Receipt"]).locale("en-us").format("DD-MM-YYYY") ===
          date
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    this.listOfWhiteListing = [...allWhiteLists];
    $("#filterModal").modal("hide");
  }

  toggleFilterStatus(statusType) {
    let statusIndex = this.filterStatus.indexOf(statusType);
    if (statusIndex < 0) {
      this.filterStatus.push(statusType);
    } else {
      this.filterStatus.splice(statusIndex, 1);
    }
  }
}
