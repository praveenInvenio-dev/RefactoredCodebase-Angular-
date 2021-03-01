import { Component, OnInit } from '@angular/core';
import { AuditorService } from '../auditor.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { taxpayeractivityconstants } from "./taxpayer-activity-constants.model";


declare var $;
@Component({
  selector: 'app-taxpayer-activity',
  templateUrl: './taxpayer-activity.component.html',
  styleUrls: ['./taxpayer-activity.component.css']
})
export class TaxpayerActivityComponent implements OnInit {
  TaxpayerFormGroup: FormGroup = new FormGroup({});
  taxpayerActivityList: any;
  Step: any = 1;
  GPartz: string;
  Direction: string;
  Language: string;
  taxpayerActivityData: any;
  taxpayerDetails: any;
  listOfServices: any;
  requestsList: any;
  taxpayerEmail: any;
  taxpayerCrNum: any;
  taxpayerMobile: any;
  taxpayerCalenderType: any;
  taxpayerPeriod: string;
  tilesData: any;
  taxpayerType: any;
  fbGuid: any;
  noData: boolean;
  eUser: any;
  dashboardData: any;
  currentEUser: any;
  searchText: any;
  IsGridView: boolean = true;
  IsListView: boolean = false;
  lang: any;
  direction: string;
  

  constructor(private taxpayerActivityService: AuditorService) {
    moment.locale('en-Us');
    this.GPartz = localStorage.getItem('gpart');
    // if (localStorage.getItem("lang") === "ar") {
    //   this.Direction = "rtl";
    //   this.Language = "A";
    // } else {
    //   this.Direction = "ltr";
    //   this.Language = "E";
    // }
    if (localStorage.getItem("lang") === "ar") {
      this.lang = taxpayeractivityconstants.langz.arb.taxpayeractivity;
      this.direction = taxpayeractivityconstants.langz.arb.dir;
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = taxpayeractivityconstants.langz.eng.taxpayeractivity;
      this.direction = taxpayeractivityconstants.langz.eng.dir;
      this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.getAuditorDashboardDetails();
    this.taxPayerControls();
    moment.locale('en-Us');
  }
  getAuditorDashboardDetails() {
    this.taxpayerActivityService.getEuserDet().subscribe((data) => {
      this.dashboardData = data["d"];
      console.log('dash-data', this.dashboardData)
      this.getTaxpayerActivities();
      this.getTaxpayerActivitiesList(this.dashboardData.Val1);
    })
  }
  taxPayerControls() {
    this.TaxpayerFormGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      tinNumber: new FormControl(''),
      crNumber: new FormControl(''),
      mobileNum: new FormControl(''),
      emailId: new FormControl('')
    });
  }
 
  back() {
    this.Step = 1;
  }
  gotoStep2(activity) {
    this.Step = 2;
    this.taxpayerMobile = activity.MNum;
    this.taxpayerEmail = activity.SmtpAddr;
    this.taxpayerCrNum = activity.CrNo;
    this.taxpayerCalenderType = activity.DateType;
    this.taxpayerType = activity.Tptxt;
    this.fbGuid = activity.Fbguid;
    this.currentEUser = activity.Euser;
    console.log('data',activity);
    moment.locale('en-Us');
    this.taxpayerPeriod = 'From' + ' ' + moment(activity.FrmDate).format("YYYY-MM-DD") + ' ' + 'to' + ' ' + moment(activity.FrmDate).format("YYYY-MM-DD");
    this.taxpayerActivityService.getTaxpayerDetails(activity.Tin, this.GPartz, activity.Taxtp).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.taxpayerDetails = data["d"];
        this.listOfServices = data["d"].ZTAXP_RET_YEARSet.results;
        this.requestsList = data["d"].ServicesSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
  }
  getTaxpayerActivities() {
    this.taxpayerActivityService.getEuserDetails(this.dashboardData.Val1, this.dashboardData.Val2, this.dashboardData.Val3, this.dashboardData.Val4, this.dashboardData.Val5).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.taxpayerActivityData = data["d"].Euser;
      }
    }, (error) => {
      console.log('err', error);
    });
  }


  getTaxpayerActivitiesList(val) {
    this.taxpayerActivityService.getTaxpayerActivitiesList(this.GPartz, val).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.taxpayerActivityList = data["d"].results;
        // this.search();
      }
    }, (error) => {
      console.log('err', error);
    });

  }
  backToStep2() {
    this.Step = 2;
  }
  manageActivity() {
    this.Step = 3;
    this.taxpayerActivityService.manageActivity(this.taxpayerDetails.Taxtp, this.fbGuid, this.currentEUser).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        this.tilesData = data["d"].results;
      }
    }, (error) => {
      console.log('err', error);
    });

  }
  clear() {
    this.TaxpayerFormGroup.reset();
  }
  search() {
    let tinNum;
    let mobileNo;
    let email;
    let crNo;
    let fname;
    let lname;
    if (this.TaxpayerFormGroup.controls.tinNumber.value != "" && this.TaxpayerFormGroup.controls.tinNumber.value != undefined) {
      tinNum = this.TaxpayerFormGroup.controls.tinNumber.value;
    } else {
      tinNum = '';
    }
    if (this.TaxpayerFormGroup.controls.mobileNum.value != "" && this.TaxpayerFormGroup.controls.mobileNum.value != undefined) {
      mobileNo = this.TaxpayerFormGroup.controls.mobileNum.value;
    } else {
      mobileNo = '';
    }
    if (this.TaxpayerFormGroup.controls.emailId.value != "" && this.TaxpayerFormGroup.controls.emailId.value != undefined) {
      email = this.TaxpayerFormGroup.controls.emailId.value;
    } else {
      email = '';

    }
    if (this.TaxpayerFormGroup.controls.crNumber.value != "" && this.TaxpayerFormGroup.controls.crNumber.value != undefined) {
      crNo = this.TaxpayerFormGroup.controls.crNumber.value;
    } else {
      crNo = '';
    }
    if (this.TaxpayerFormGroup.controls.firstName.value != "" && this.TaxpayerFormGroup.controls.firstName.value != undefined) {
      fname = this.TaxpayerFormGroup.controls.firstName.value;
    } else {
      fname = '';
    }
    if (this.TaxpayerFormGroup.controls.lastName.value != "" && this.TaxpayerFormGroup.controls.lastName.value != undefined) {
      lname = this.TaxpayerFormGroup.controls.firstName.value;
    } else {
      lname = '';
    }

    const searchObj = {
      Tin: tinNum,
      MNum: mobileNo,
      SmtpAddr: email,
      LicenseNo: crNo,
      FName: fname,
      LName: lname
    }
    console.log(searchObj);
    this.taxpayerActivityService.getSearchResults(searchObj, this.GPartz).subscribe(data => {
      if (data) {
        console.log('button-list-data', data["d"]);
        let searchResults;
        searchResults = data["d"].results;
        $('#filter').modal('hide');
        if (searchResults.length == 0) {
          $('#nodate').modal('show');
        }
        if (searchResults.length > 0) {
          this.taxpayerActivityList = searchResults;

        }
        if(this.searchText) {
          var result = this.taxpayerActivityList.filter(item =>
            Object.keys(item).some(k => item[k] != null &&
              item[k].toString().toLowerCase()
                .includes(this.searchText.toLowerCase()))
          );
          console.log(result);
          this.taxpayerActivityList = result;
        } 
       // this.TaxpayerFormGroup.reset();
      }
    }, (error) => {
      console.log('err', error);
    });
   
  }

 
  close() {
    $('#nodate').modal('hide');
  }
  /*method for change list and grid view*/
  changeView(type) {
    if (type == 'list') {
      this.searchText ="";
      this.IsListView = true;
      this.IsGridView = false;
      let val;
      this.getTaxpayerActivitiesList(val)
    } else {
      this.searchText ="";
      this.IsGridView = true;
      this.IsListView = false;
      let val;
      this.getTaxpayerActivitiesList(val)
    }
  }
}

