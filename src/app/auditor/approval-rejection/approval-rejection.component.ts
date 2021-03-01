import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuditorService } from "../auditor.service";
import * as moment from "moment";
import { approvalRejectionconstants } from "./approval-rejectionconstants.model";

declare var $;
@Component({
  selector: "app-approval-rejection",
  templateUrl: "./approval-rejection.component.html",
  styleUrls: ["./approval-rejection.component.css"],
})
export class ApprovalRejectionComponent implements OnInit {
  moment: any = moment;
  WorkItemsList: any;
  AuditorTin: any;
  fromDate: any;
  toDate: any;
  WorkItemDetails: any;
  Step: any = 1;
  data: any;
  rejectMsg: boolean = false;
  approveMsg: boolean = false;
  Language: string;
  Direction: string;
  GPartz: string;
  reason: any;
  showrejectMsg: boolean = false;
  listOfAuthorization: any;
  otherServicesList: any;
  formatToDate: string;
  formatFromDate: string;
  showButtons: boolean = false;
  ZakatList: any = [];
  VatList: any = [];
  ETList: any = [];
  lang: any;
  direction: string;
  TINNumber: any;
  TaxpName: any;
  CurrentStatus: any;
  SelectedItemType: string;
  StatusList: any = [];
  selectedStatus: string;
  DataList: any;
  ApproveWorkItemsList: any = [];
  RejectedWorkItemsList: any = [];
  PendingWorkItemsList: any = [];
  WorkItemsFilteredList: any;
  searchTerm: any;
  isGridView: boolean = true;
  isListView: boolean = false;
  AUDTin: any;
  TaxTp: any;
  errorMsg: any;
  errorDisplayMsg: any;
  StatusCode: any;
  reasonError: any;
  listOfActivitySet: any;
  // IsResonErrormsg:any;

  constructor(private router: Router, private auditorService: AuditorService) {
    moment.locale("en-Us");
    this.GPartz = localStorage.getItem("gpart");
    // if (localStorage.getItem("lang") === "ar") {
    //   this.Direction = "rtl";
    //   this.Language = "A";
    // } else {
    //   this.Direction = "ltr";
    //   this.Language = "E";
    // }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = approvalRejectionconstants.langz.arb.approvalRejection;
      this.direction = approvalRejectionconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = approvalRejectionconstants.langz.eng.approvalRejection;
      this.direction = approvalRejectionconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    moment.locale("en-Us");
    this.filterList();
    this.stepsChecking();
  }

  filterList() {
    if (this.Language == "E") {
      this.StatusList = ["All", "Approved", "Rejected", "Pending"];
    } else {
      this.StatusList = ["موافقة", "الجميع", "تم رفض", "معلق"];
    }
  }
  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.getWorkItems();
        break;
      case 2:
        // this.getWorkItemDetails();
        break;
    }
    return this.Step;
  }

  changeView(type) {
    if (type == "list") {
      this.isListView = true;
      this.isGridView = false;
    } else {
      this.isGridView = true;
      this.isListView = false;
    }
  }

  goToStep2(selecteditem) {
    console.log(selecteditem);
    this.reasonError = true;
    //  this.IsResonErrormsg=false;
    this.WorkItemDetails = [];
    this.listOfAuthorization = [];
    this.otherServicesList = [];
    this.showButtons = false;
    moment.locale("en-Us");
    this.TINNumber = selecteditem.TaxpayerTin;
    this.AUDTin = selecteditem.AuditorTin;
    this.TaxTp = selecteditem.Taxtp;
    this.TaxpName = selecteditem.AudName;
    this.CurrentStatus = selecteditem.Status;
    this.StatusCode = selecteditem.StatusCode;
    if (selecteditem.Taxtp == "03") {
      this.SelectedItemType = "VAT";
    }
    if (selecteditem.Taxtp == "05") {
      this.SelectedItemType = "Zakat & CIT";
    }
    if (selecteditem.Taxtp == "07") {
      this.SelectedItemType = "Excise Tax";
    }
    this.formatFromDate = moment(selecteditem.FrmDate).format("DD/MM/YYYY");
    this.formatToDate = moment(selecteditem.ToDate).format("DD/MM/YYYY");
    console.log(this.formatFromDate);
    this.Step = 2;
    this.auditorService
      .getWorkItemDetails(
        selecteditem.TaxpayerTin,
        this.GPartz,
        moment(selecteditem.FrmDate).format("YYYY-MM-DDT00:00:00"),
        moment(selecteditem.ToDate).format("YYYY-MM-DDT00:00:00"),
        selecteditem.Taxtp
      )
      .subscribe(
        (data) => {
          if (data) {
            console.log("button-list-data", data["d"]);
            this.WorkItemDetails = data["d"];
            if (this.WorkItemDetails.Pending == "X") {
              this.showButtons = true;
            }
            this.otherServicesList = data["d"].ServicesSet.results;
            console.log("other-serviceList", this.otherServicesList);
            this.listOfActivitySet = data["d"].ZAUD_APPACTVITYSet.results;
            let filterData = this.listOfActivitySet.filter(
              (tt) => tt.Request !== ""
            );
            this.listOfActivitySet = filterData;
            for (let i = 0; this.listOfActivitySet.length > i; i++) {
              for (let j = 0; this.otherServicesList.length > j; j++) {
                if (this.otherServicesList[j] !== undefined) {
                  if (
                    this.listOfActivitySet[i].Request ==
                    this.otherServicesList[j].Fbtyp
                  ) {
                    this.listOfActivitySet[i].Text = this.otherServicesList[
                      j
                    ].Zdesc;
                  }
                }
              }
            }

            console.log("other services", this.listOfActivitySet);
            this.listOfAuthorization = data["d"].ZTAXP_RET_YEARSet.results;
          }
        },
        (error) => {
          console.log("err", error);
          this.errorDisplayMsg = error.error["error"].message.value;
          //  this.errorMsg = true;
        }
      );
  }
  approveFromStep1(selecteditem) {
    this.goToStep2(selecteditem);
    setTimeout(() => {
      // this.approve(selecteditem);
      moment.locale("en-Us");
      let resData = {
        Approve: "X",
        AudName: selecteditem.AudName,
        AuditorTin: selecteditem.AuditorTin,
        DateType: selecteditem.DateType,
        FrmDate: selecteditem.FrmDate,
        Reject: "",
        Remarks: "",
        TaxpayerTin: selecteditem.TaxpayerTin,
        Taxtp: selecteditem.Taxtp,
        ToDate: selecteditem.ToDate,
      };
      this.auditorService
        .rejectWorkItem(
          resData,
          moment(selecteditem.FrmDate).format("YYYY-MM-DDT00:00:00"),
          moment(selecteditem.ToDate).format("YYYY-MM-DDT00:00:00")
        )
        .subscribe(
          (data) => {
            if (data) {
              console.log("button-list-data", data["d"]);
            }
            this.approveMsg = true;
          },
          (error) => {
            console.log("err", error);
            this.errorMsg = true;
          }
        );

      setTimeout(() => {
        this.back();
      }, 8000);
      this.getWorkItems();
    }, 5000);
  }
  rejectFromStep1(selecteditem) {
    this.goToStep2(selecteditem);

    setTimeout(() => {
      $("#reject").modal("show");
    }, 3000);
  }
  homeSearch(searchterm) {
    this.auditorService.getWorkItemsList(this.GPartz, this.Language).subscribe(
      (data) => {
        if (data) {
          console.log("button-list-data", data["d"]);
          this.DataList = data["d"].results;
        }
      },
      (error) => {
        console.log("err", error);
      }
    );
    this.ZakatList = [];
    this.VatList = [];
    this.ETList = [];
    setTimeout(() => {
      var result = this.DataList.filter((item) =>
        Object.keys(item).some(
          (k) =>
            item[k] != null &&
            item[k].toString().toLowerCase().includes(searchterm.toLowerCase())
        )
      );
      console.log(result);
      this.WorkItemsList = result;
      if (this.WorkItemsList != undefined) {
        this.WorkItemsList.forEach((element) => {
          if (element.Taxtp == "05") {
            this.ZakatList.push(element);
          }
          if (element.Taxtp == "03") {
            this.VatList.push(element);
          }
          if (element.Taxtp == "07") {
            this.ETList.push(element);
          }
        });
      }
    }, 2000);
  }
  search(status) {
    this.WorkItemsList = [];
    this.ZakatList = [];
    this.VatList = [];
    this.ETList = [];
    console.log(status);
    this.auditorService.getWorkItemsList(this.GPartz, this.Language).subscribe(
      (data) => {
        if (data) {
          console.log("button-list-data", data["d"]);
          this.DataList = data["d"].results;
          if (this.Language == "E") {
            moment.locale("en-Us");
            if (this.DataList != undefined) {
              this.DataList.forEach((element) => {
                if (status == element.Status) {
                  this.WorkItemsList.push(element);
                }
                if (status == "All") {
                  this.WorkItemsList = this.DataList;
                }
              });
            }
            if (this.WorkItemsList != undefined) {
              this.WorkItemsList.forEach((element) => {
                if (element.Taxtp == "05") {
                  this.ZakatList.push(element);
                }
                if (element.Taxtp == "03") {
                  this.VatList.push(element);
                }
                if (element.Taxtp == "07") {
                  this.ETList.push(element);
                }
              });
            }
            console.log("vatlist", this.VatList);
            moment.locale("en-Us");
          } else {
            if (this.DataList != undefined) {
              this.DataList.forEach((element) => {
                if (status == element.Status) {
                  this.WorkItemsList.push(element);
                }
                if (status == "الجميع") {
                  this.WorkItemsList = this.DataList;
                }
              });
            }
            if (this.WorkItemsList != undefined) {
              this.WorkItemsList.forEach((element) => {
                if (element.Taxtp == "05") {
                  this.ZakatList.push(element);
                }
                if (element.Taxtp == "03") {
                  this.VatList.push(element);
                }
                if (element.Taxtp == "07") {
                  this.ETList.push(element);
                }
              });
            }
            console.log("vatlist", this.VatList);
            moment.locale("en-Us");
          }

          $("#filter").modal("hide");
        }
      },
      (error) => {
        console.log("err", error);
      }
    );
  }
  clear() {
    this.selectedStatus = "";
    this.Step = 1;
    this.stepsChecking();
  }
  back() {
    this.approveMsg = false;
    this.showrejectMsg = false;
    this.errorMsg = false;
    this.Step = 1;
    this.stepsChecking();
  }

  back1() {
    this.approveMsg = false;
    this.showrejectMsg = false;
    this.errorMsg = false;
    this.Step = 1;
    this.stepsChecking();
  }

  getWorkItems() {
    this.ZakatList = [];
    this.VatList = [];
    this.ETList = [];
    this.auditorService.getWorkItemsList(this.GPartz, this.Language).subscribe(
      (data) => {
        if (data) {
          console.log("button-list-data", data["d"]);
          this.WorkItemsList = data["d"].results;
          moment.locale("en-Us");
          if (this.WorkItemsList != undefined) {
            this.WorkItemsList.forEach((element) => {
              if (element.Taxtp == "05") {
                this.ZakatList.push(element);
              }
              if (element.Taxtp == "03") {
                this.VatList.push(element);
              }
              if (element.Taxtp == "07") {
                this.ETList.push(element);
              }
            });
          }
          moment.locale("en-Us");
        }
      },
      (error) => {
        console.log("err", error);
      }
    );
  }
  reasonChange(val) {
    console.log("value", val);
    let value = val.length;
    if (value !== undefined && value !== "") {
      if (value > 132) {
        this.reasonError = true;
      } else {
        this.reasonError = false;
      }
    } else {
      this.reasonError = false;
    }
  }
  // SaveNotes()
  // {
  //   let linebreaks = (this.reason.split(/\n/g));//.match(/\n/g)||[]);
  //   let count=0;
  //   for(let i=0;i<linebreaks.length;i++)
  //   {
  //     if(linebreaks[i].length>132)
  //     {
  //       count++;
  //     }
  //   }
  //   if(count>0)
  //   {
  //     this.reasonError=true;

  //   }
  // }
  // SubmitNotes()
  // {
  //   let linebreaks = (this.reason.split(/\n/g));//.match(/\n/g)||[]);
  //   let notesSet=[];
  //   let noteno='1';

  // }
  reject(workitem) {
    moment.locale("en-Us");
    this.rejectMsg = false;
    if (this.reason != undefined && this.reason != "") {
      let resData = {
        Approve: "",
        AudName: workitem.AudName,
        AuditorTin: this.AUDTin,
        DateType: workitem.DateType,
        FrmDate: workitem.FrmDate,
        Reject: "X",
        Remarks: this.reason,
        TaxpayerTin: this.TINNumber,
        Taxtp: this.TaxTp,
        ToDate: workitem.ToDate,
      };
      this.auditorService
        .rejectWorkItem(
          resData,
          moment(workitem.FrmDate).format("YYYY-MM-DDT00:00:00"),
          moment(workitem.ToDate).format("YYYY-MM-DDT00:00:00")
        )
        .subscribe(
          (data) => {
            if (data) {
              console.log("button-list-data", data["d"]);
            }
            this.showrejectMsg = true;
          },
          (error) => {
            console.log("err", error);
            this.errorMsg = true;
          }
        );
      $("#reject").modal("hide");
      this.rejectMsg = false;
      setTimeout(() => {
        this.back();
      }, 8000);
      this.getWorkItems();
    } else {
      this.rejectMsg = true;
    }
  }

  approve(workitem) {
    moment.locale("en-Us");
    let resData = {
      Approve: "X",
      AudName: workitem.AudName,
      AuditorTin: workitem.AuditorTin,
      DateType: workitem.DateType,
      FrmDate: workitem.FrmDate,
      Reject: "",
      Remarks: "",
      TaxpayerTin: workitem.TaxpayerTin,
      Taxtp: workitem.Taxtp,
      ToDate: workitem.ToDate,
    };
    this.auditorService
      .rejectWorkItem(
        resData,
        moment(workitem.FrmDate).format("YYYY-MM-DDT00:00:00"),
        moment(workitem.ToDate).format("YYYY-MM-DDT00:00:00")
      )
      .subscribe(
        (data) => {
          if (data) {
            console.log("button-list-data", data["d"]);
          }
          this.approveMsg = true;
        },
        (error) => {
          console.log("err", error);
          this.errorMsg = true;
        }
      );

    setTimeout(() => {
      this.back();
    }, 8000);
  }

  // Checklength(event){
  //    if(this.reason.length>132){
  //     this.reasonError = true;
  //   //  this.IsResonErrormsg=true;
  //    }
  //    else if(this.reason.length==0){
  //     this.reasonError = true;
  //   //  this.IsResonErrormsg=false;
  //    }
  //    else{
  //     this.reasonError = false;
  //  //   this.IsResonErrormsg=false;
  //    }
  // }
}
