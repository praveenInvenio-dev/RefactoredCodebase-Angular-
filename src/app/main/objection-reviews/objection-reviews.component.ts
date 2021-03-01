import { Component, OnInit } from '@angular/core';
import { ObjectionReviewsConstants } from 'src/app/constants/ObjectionReviewsConstants';
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard-service";
import { ObjectionReviewsService } from 'src/app/services/objection-reviews.service'
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

declare var $: any;
@Component({
  selector: 'app-objection-reviews',
  templateUrl: './objection-reviews.component.html',
  styleUrls: ['./objection-reviews.component.css']
})
export class ObjectionReviewsComponent implements OnInit {

  lang = ObjectionReviewsConstants['eng']
  showNewObjection = false;
  isActive = 0;
  displayedObjections = "all";
  vatReviews: any = [];
  listView = false;
  searchFilter = "";
  isVatReviewAgree = false;
  isVatReviewAgreeSubmit = false;
  getFbnum = '';
  selectedStatus = "01";
  statusList = [];
  filteredVatReviews = []
  selectedStatusPrev = null;
  constructor(public dbService: DashboardService,
    public router: Router, public objService: ObjectionReviewsService, public notifierService: NotifierService, private activateroute: ActivatedRoute) { }




  ngOnInit(): void {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = ObjectionReviewsConstants['arb']
    }

    this.objService
      .getAllVatReviews()
      .subscribe(
        (vatReviews: any) => {
          console.log(vatReviews);

          this.statusList = vatReviews?.d.STATUSSet.results;

          if (vatReviews?.d.ASSLISTSet.results) {

            if (vatReviews.d.ASSLISTSet.results.length > 0) {
              for (let i = 0; i < vatReviews.d.ASSLISTSet.results.length; i++) {
                if (vatReviews.d.ASSLISTSet.results[i].Fbtyp === 'RAVT') {
                  vatReviews.d.ASSLISTSet.results[i].convertedDate = this.formatDate(vatReviews.d.ASSLISTSet.results[i].Receipt)
                  this.vatReviews.push(vatReviews.d.ASSLISTSet.results[i]);
                }
              }

              this.onApplyFilter();


            } else {
              this.vatReviews = []
            }
          }
        },
        (error) => {

        }
      );
      this.showNewObjection = this.objService.showNewObjection ? true : false;


  }




  onApplyFilter() {
    this.filteredVatReviews = this.vatReviews.filter((each) => {
      return each.Fbust == this.selectedStatus || this.selectedStatus == '01'
    });
    $("#filter").modal("hide");
  }

  onClickFilterIcon() {
    this.selectedStatusPrev = this.selectedStatus;
    $("#filter").modal("show");
  }


  onCloseFilter() {

    this.selectedStatus = this.selectedStatusPrev;
    $("#filter").modal("hide");

  }


  redirectApplication(typeOfApplication, each) {

    if (typeOfApplication == 'vat') {

      this.objService.getInitialDataVatReview(each.Fbnum).subscribe((res) => {
        this.router.navigate(["/mains/newvatreview"], {
          queryParams: { Fbnum: each.Fbnum, Status: each.FbustTxt },
        });
      }, (err) => {

        console.log(err);


        let errMsg = "";
        for (let i = 0; i < err.error.error.innererror.errordetails.length; i++) {
          if (err.error.error.innererror.errordetails[i]['code'].includes("ZD_RAVT")) {
            errMsg = errMsg + " " + err.error.error.innererror.errordetails[i]['message']
          }
        }

        this.notifierService.notify(
          "error",
          errMsg
        );
      })


    }

  }

  formatDate(date: String) {
    if (date != null) {
      const date1 = parseInt(date.replace(/\D/g, ''));

      return moment(date1).locale("en-us").format('Do MMM YYYY');
    }
    else {
      return ''
    }
  }


  selectObjection(type: string) {
    this.displayedObjections = type;
  }

  toggleListView(viewType: string) {
    this.listView = viewType === "list";
  }

  newObjection() {
    if (this.displayedObjections === "all") {
      this.showNewObjection = true;
    } else if (this.displayedObjections === "vat") {

      this.getModal('vatReviewCard');
    }
  }



  toggleNewObjection() {
    this.showNewObjection = !this.showNewObjection;
  }



  goTo(vatReview) {
    this.isVatReviewAgreeSubmit = true;
    if (this.isVatReviewAgree) {
      this.closeModal('vatReviewCard');
      this.router.navigate(["/mains/newvatreview"], {
        queryParams: { Fbnum: '', Status: '' },
      });
    }
  }

  getModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "zakatObjCard") {
      this.isActive = 1
      $("#zakatObjCard").modal("show");
    }
    else if (cardType === "vatReviewCard") {
      this.isActive = 2;
      //setting checkbox and btn click value to false
      this.isVatReviewAgree = false;
      this.isVatReviewAgreeSubmit = false;
      $("#vatReviewCard").modal("show");
    }
    else if (cardType === "withholdingTaxCard") {
      this.isActive = 4;
      $("#withholdingTaxCard").modal("show");
    }
  }

  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "zakatObjCard") {

      $("#zakatObjCard").modal("toggle");
    }
    else if (cardType === "vatReviewCard") {

      $("#vatReviewCard").modal("toggle");
    }
    else if (cardType === "withholdingTaxCard") {

      $("#withholdingTaxCard").modal("toggle");
    }

  }








  statusColor(status) {
    // console.log(status)

    let yellow = ["E0018", "E0015", "E0016", "E0071", "E0019", "E0021", "E0052", "E0053", "E0054", "E0041", "E0049", "E0050", "E0044", "E0061", "E0062", "E0063", "E0066", "E0067", "E0069", "E0083", "E0087"]
    let red = ["E0051", "E0043", "E0088"]
    let green = ["E0045", "E0048", "E0064", "E0065", "E0084", "E0085", "E0086"]
    let grey = ["E0013", "E0001", "E0018"]

    if (yellow.findIndex(each => status == each) != -1) {
      return "tag32 tag-partial";
    }


    else if (red.findIndex(each => status == each) != -1) {
      return "tag32 tag-danger";
    }


    else if (green.findIndex(each => status == each) != -1) {
      return "tag32 tag-success";
    }


    else if (grey.findIndex(each => status == each) != -1) {
      return "tag32  tag-unsubmit";
    }

    else {
      return "tag32 tag-unsubmit"
    }


  }

}
