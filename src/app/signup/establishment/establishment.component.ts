import { AppService } from 'src/app/app.service';
import {
  Component,
  OnInit,
  HostListener,
  DoCheck,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { constants } from "src/app/constants/constants.model";
import { interval, Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VatServiceService } from 'src/app/services/vat-service.service';
import { NotifierService } from 'angular-notifier';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { Router } from '@angular/router';
import { IndividualDto } from '../individuals-sign-up/individuals-sign-up.component';
import { SignupService } from 'src/app/services/signup.service';
import { Establishment } from 'src/app/dto/establishment/establishment';
import { IdSet } from 'src/app/dto/establishment/id-set';

declare var $: any;
@Component({
  selector: "app-establishment",
  templateUrl: "./establishment.component.html",
  styleUrls: ["./establishment.component.css"]
})
export class EstablishmentComponent implements OnInit {
  headerComponent = CalendarComponent;
  optionActive;
  defaultValue: number = 1;
  showIDFields: boolean = false;
  showPassprtSection: boolean = false;
  showOne: boolean = false;
  showTwo: boolean = false;
  counter: number = 60;
  counterSubscription: Subscription;
  idTypes = [];
  panelOpenState: boolean;
  radio3;

  // facilityInfoForm: FormGroup;
  submitted: boolean;
  submitted1: boolean;
  codes;
  name = '';

  // show

  lang;

  show: boolean = false;
  innerWidth: number;
  showVerification: boolean = false;
  // dto = new IndividualDto();
  dto = new IndividualDto();
  dto1 = [];
  currentTab: any;
  tpinfo: any;
  indErr: any;
  dobErr1: boolean;
  dateMsg: any;

  startDate; // create Gregorian calendar date from given Julian Day Number
  enddate;
  datz: any;
  dobErr: boolean;
  idErr: boolean;
  idMsg: string;
  showGcc: boolean = false;
  IDErrz: any;
  idTErr: boolean = false;
  resendObj: any;
  otpRespObj: Object;
  otpRespObj1: Object;
  mErr: boolean = false;
  caseuid: any;
  nameErr1: boolean = false;
  nameErr2: boolean = false;
  nameErr3: boolean = false;
  nameErr4: boolean = false;
  nameErr5: boolean = false;
  nameErr6: boolean = false;
  nameErr7: boolean = false;
  nameErr8: boolean = false;
  nameErr9: boolean = false;
  nameErr10: boolean = false;
  zMsg: any;
  uMsg: any;
  msMsg: any;
  eMsg: any;
  ceMsg: any;
  showc1: boolean;
  showc2: boolean;
  dMsg: any;
  sMsg: any;
  bMsg: any;
  nameMsg: any;
  cityMsg: any;
  maxLength = 10;

  pssprtNum: any = '';
  // issueCity: any = '';


  pssprtAttchmnt: any = '';

  pssprtNumErr: boolean;
  // issueCityErr: boolean;
  issueDateErr: boolean;
  expiryDateErr: boolean;
  pssprtAttchmntErr: boolean;
  paasportDetailsError: boolean = true;
  issueDateFutureErr: boolean;
  issueDateDOBErr: boolean;
  expiryDatePastErr: boolean;



  retryCount = 1;
  resend: boolean;
  enableResendButton: boolean;
  cncode = "966";
  mobile: String = "";
  dataErr: boolean;
  dataMsg: any;




  showContactInfo: boolean;

  branchDetailsForm: FormGroup;
  activityDetailsForm: FormGroup;
  addressDetailsForm: FormGroup;

  activityType = 'cr';
  branches: any;

  permLegalDD = ['A branch of non-resident company', 'Construction Sites', 'Installation', 'A Fixed Base', 'A Non-resident partner'];
  nonPermLegalDD = [
    'Derived from an activity which occurs in KSA',
    'Derived from immovable property located in the kingdom',
    'Derived from the disposal of shares or a partnership in a resident company',
    'Derived from lease of movable properties used in the kingdom',
    'Derived from the sales or license for use of industrial or intellectual properties used in the kingdom.',
    'Dividends, management or director’s fees paid by a resident company',
    'Amounts paid against services rendered to the company’s head office or to an affiliated company',
    'Amounts paid by a resident against services performed in whole or in part in the kingdom',
    'Amounts for exploitation of natural resource in the kingdom'
  ];

  facilityValid: boolean;
  facilityBranchValid: boolean;
  facilityFinancialValid: boolean;


  branchErr: boolean;
  resStatusErr: boolean;
  legalEntityErr: boolean;
  compStatusErr: boolean;


  accountingErr: boolean;
  capitalErr: boolean;
  calendarTypeErr: boolean;
  endDayErr: boolean;
  endMonthErr: boolean;
  commencementDateErr: boolean;
  taxableDateErr: boolean;
  IsGCC: boolean;
  cityList = [];
  returnId: any;


  cemail: any;

  Password: any;
  Agree: boolean;



  establishmentdto = new Establishment();


  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth);
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['branchName', 'crLicense', 'city', 'type', 'update', 'delete'];
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router, public commonVaidation: CommonValidation, private formBuilder: FormBuilder,
    public appSrv: AppService, public vatService: VatServiceService, public notifierService: NotifierService,
    public commonValid: CommonValidation,
    public signupService: SignupService) { }

  ngOnInit(): void {
    console.log('dto ->', this.establishmentdto);
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb;
    } else {
      this.lang = constants.langz.eng;
    }

    this.appSrv.getPhoneCode().subscribe(res => {
      console.log(res);
      this.codes = res['d']['results'];
      console.log(this.codes);
    });

    this.optionActive = 1;


    this.appSrv.getData().subscribe(res => {
      console.log("Mock :: ", res);
      this.dataSource = new MatTableDataSource(<any>res['data']);
    });
    this.loadDefaults();
    this.initialiseIdset();

  }
  initialiseIdset() {
    let idset = new IdSet();
    this.establishmentdto.idSet.push(idset);
    this.establishmentdto.idSet.push(idset);
    console.log("Id set length ::" + this.establishmentdto.idSet.length);
  }
  setPassportDefaultValues() {
    this.establishmentdto.idSet[1].Type = "FS0002";
  }
  loadDefaults() {
    this.getPhoneCode();
    this.getDateInfo();
    this.getBranchList();
    this.getCityList();
  }
  getCityList() {
    this.appSrv.getCityList().subscribe((res) => {
      this.cityList = res["d"]["city_dropdownSet"]["results"];
      this.cityList.shift();
      this.cityList.forEach((ele) => {
        ele.CityName = ele.CityName.toUpperCase();
      });
      console.log("this.city", this.cityList);
    });
  }
  getBranchList() {
    this.appSrv.getBranchList().subscribe(res => {
      console.log(res);
      this.branches = res['d']['results'];
      console.log(this.branches);
    });
  }
  getDateInfo() {
    this.appSrv.data1.subscribe(
      (res) => {
        console.log("test1", res);
        this.datz = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate(new Date("2020-10-24")),
          res
        );
        this.startDate = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate(new Date("1900-01-01")),
          res
        );
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - 1);
        this.enddate = this.commonVaidation.dateFormate(
          this.commonVaidation.toJulianDate(dateObj),
          res
        );
        const tst = this.commonVaidation.dateFormate(this.startDate, res);
        this.establishmentdto.Birthdt = null;
        console.log("sds", tst);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }
  getPhoneCode() {
    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.codes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
      console.log("countru", this.codes);
    });
  }


  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }



  // get f1() {
  //   return this.facilityInfoForm.controls;
  // }



  onSubmit1() {
    console.log(this.establishmentdto.Birthdt);
    if (this.establishmentdto.idSet[0].Type === "ZS0002" || this.establishmentdto.idSet[0].Type === "ZS0003") {
      this.validatePassportDetails();
    }
    this.setGCCFlag();
    // if (this.showContactInfo) {
    //   this.validateContactInfo();
    // }
    this.establishmentdto.idSet[0].Type === "" ||
      this.establishmentdto.idSet[0].Type === undefined
      ? (this.idTErr = true)
      : (this.idTErr = false);
    this.establishmentdto.idSet[0].Idnumber === "" ||
      this.establishmentdto.idSet[0].Idnumber === undefined
      ? (this.idErr = true)
      : (this.idErr = false);
    this.establishmentdto.Birthdt === "" || this.establishmentdto.Birthdt === null
      ? (this.dobErr = true)
      : (this.dobErr = false);

    this.IDtypeValidation1();

    // if (this.establishmentdto.PortalUsrx !== this.cemail) {
    //   this.nameErr10 = true;
    //   this.ceMsg = "Email and Confirm Email should be same";
    // }


    if (this.idTErr || this.idErr || this.dobErr || this.dobErr1) {

    } else {
      if (this.establishmentdto.idSet[0].Type === "ZS0003") {
        let id = "ZS0018";
        let obj3 = {
          type: id,
          idNumber: this.establishmentdto.idSet[0].Idnumber,
        };
        let d = this.establishmentdto.Birthdt["calendarStart"];
        if (d.day < 10) {
          d.day = d.day;
        }
        if (d.month < 10) {
          d.month = d.month;
        }
        let day = "";
        let mnth = "";
        if (d.day < 10) day = "0" + d.day;
        else day = d.day;
        if (d.month < 10) mnth = "0" + d.month;
        else mnth = d.month;
        let currentdate = d.year + "" + mnth + "" + day;
        console.log("date", currentdate);
        this.vatService.getUserValidation(obj3, currentdate).subscribe(
          (res) => {
            this.tpinfo = res["d"];
            if (res["d"]["Tin"] !== "") {
              this.notifierService.notify(
                "error",
                this.lang.individual.indErr.e17
              );
            } else {
              this.setTPValues(res);
              if (this.mobile == "") {
                this.notifierService.hideOldest();
                this.notifierService.notify(
                  "error",
                  this.lang.establishment.err.e10
                );
                // return;
              }
              this.NextStep(2);
            }
          },
          (err) => {
            console.log(err.error);
            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );

      } else {
        let obj = {};
        obj["IdType"] = this.establishmentdto.idSet[0].Type;
        obj["Id"] = this.establishmentdto.idSet[0].Idnumber;
        obj["OtpType"] = "001";
        obj["BuDob"] = this.commonVaidation.changeDate(
          this.establishmentdto.Birthdt["calendarStart"]
        );

        if (obj["IdType"] === "ZS0003") {
          if (
            this.establishmentdto.Mobno === "" ||
            this.establishmentdto.Mobno === undefined
          ) {
            this.mErr = true;
          } else {
            obj["MobileNo"] = this.establishmentdto.Mobno;
            this.mErr = false;
            this.getOTP(obj);
          }
        } else {
          let obj2 = this.commonVaidation.IDtypeValidation(
            this.establishmentdto.idSet[0].Type,
            this.establishmentdto.idSet[0].Idnumber
          );

          if (obj2.flag) {
            this.idErr = true;
            this.idMsg = obj2.msg;
          } else {
            this.idErr = false;
            let id;
            if (this.establishmentdto.idSet[0].Type === "ZS0001") id = "ZS0015";
            if (this.establishmentdto.idSet[0].Type === "ZS0002") id = "ZS0017";
            if (this.establishmentdto.idSet[0].Type === "ZS0003") id = "ZS0018";
            let obj3 = {
              type: id,
              idNumber: this.establishmentdto.idSet[0].Idnumber,
            };
            let d = this.establishmentdto.Birthdt["calendarStart"];
            if (d.day < 10) {
              d.day = d.day;
            }
            if (d.month < 10) {
              d.month = d.month;
            }
            let day = "";
            let mnth = "";
            if (d.day < 10) day = "0" + d.day;
            else day = d.day;
            if (d.month < 10) mnth = "0" + d.month;
            else mnth = d.month;
            let currentdate = d.year + "" + mnth + "" + day;
            console.log("date", currentdate);
            this.vatService.getUserValidation(obj3, currentdate).subscribe(
              (res) => {
                this.tpinfo = res["d"];
                console.log('this.tpinfo ->' + this.tpinfo);
                if (res["d"]["Tin"] !== "") {
                  this.notifierService.notify(
                    "error",

                    // res["d"]["Tin"] +
                    this.lang.individual.indErr.e17
                  );
                  // this.NextStep(2);//MUST DELETE
                } else {
                  this.setTPValues(res);
                  if (this.mobile == "") {
                    this.notifierService.hideOldest();
                    this.notifierService.notify(
                      "error",
                      this.lang.establishment.err.e10
                    );
                    // return; // MUST ENABLE
                  }
                  if (!this.showContactInfo) {
                    this.getOTP(obj);
                  } else {
                    if (this.validateContactDetails()) {
                      alert("please fill all the mandatory details");
                      return;
                    }
                    this.NextStep(2);
                  }
                  // this.notifierService.notify("success", this.lang.individual.indErr.e18);
                }
              },
              (err) => {
                // this.NextStep(2);//MUST DELETE
                console.log(err.error);
                this.notifierService.notify(
                  "error",
                  err.error.error.innererror.errordetails[0].message
                );
              }
            );
          }
        }
      }
    }
  }
  validateContactDetails() {
    let isError = false;
    let contactArray = [this.establishmentdto.NameFirst, this.establishmentdto.NameLast, this.cncode, this.establishmentdto.Mobno, this.establishmentdto.PortalUsrx, this.cemail];
    if (this.establishmentdto.idSet[0].Type === 'ZS0003' || this.establishmentdto.idSet[0].Type === 'ZS0002') {
      contactArray = [this.establishmentdto.NameFirst, this.establishmentdto.NameLast, this.cncode, this.establishmentdto.Mobno, this.establishmentdto.PortalUsrx, this.cemail, this.establishmentdto.idSet[1].Idnumber, this.establishmentdto.idSet[1].Country, this.establishmentdto.idSet[1].ValidDateFrom, this.establishmentdto.idSet[1].ValidDateTo, this.pssprtAttchmnt];
    }
    for (let i = 0; i < contactArray.length; i++) {
      if (this.isEmpty(contactArray[i])) {
        isError = true;
        break;
      }
    }
    return isError;
    // if (this.isEmpty(this.Name)) {
    //   return true;
    // }
    // if (this.isEmpty(this.establishmentdto.NameLast)) {
    //   return true;
    // }
    // if (this.isEmpty(this.cncode)) {
    //   return true;
    // }
    // if (this.isEmpty(this.establishmentdto.Mobno)) {
    //   return true;
    // }
    // if (this.isEmpty(this.establishmentdto.PortalUsrx)) {
    //   return true;
    // }
    // if (this.isEmpty(this.cemail)) {
    //   return true;
    // }
    // if (this.establishmentdto.idSet[0].Type === 'ZS0003' || this.establishmentdto.idSet[0].Type === 'ZS0002') {
    //   if (this.isEmpty(this.establishmentdto.idSet[1].Idnumber)) {
    //     return true;
    //   }
    //   if (this.isEmpty(this.establishmentdto.idSet[1].Country)) {
    //     return true;
    //   }
    //   if (this.isEmpty(this.establishmentdto.idSet[1].ValidDateFrom)) {
    //     return true;
    //   }
    //   if (this.isEmpty(this.establishmentdto.idSet[1].ValidDateTo)) {
    //     return true;
    //   }
    //   if (this.isEmpty(this.pssprtAttchmnt)) {
    //     return true;
    //   }
    // }

    // return false;
  }
  isEmpty(fieldValue: any) {
    if (fieldValue === "" || fieldValue === undefined || fieldValue === null) {
      return true;
    }
    return false;
  }
  setTPValues(res: Object) {
    if (this.isEmpty(this.establishmentdto.Gpart))
      this.establishmentdto.Gpart = res["d"]["Tin"];
    if (this.isEmpty(this.mobile))
      this.mobile = res["d"]["Mobile"];
    if (this.isEmpty(this.establishmentdto.idSet[1].ValidDateTo))
      this.establishmentdto.idSet[1].ValidDateTo = res["d"]["PassExpDt"];
    if (this.isEmpty(this.establishmentdto.NameFirst))
      this.name = res["d"]["Name1"];
    if (this.isEmpty(this.establishmentdto.NameLast))
      this.establishmentdto.NameLast = res["d"]["Name2"];
    if (this.isEmpty(this.establishmentdto.PortalUsrx))
      this.establishmentdto.PortalUsrx = res["d"]["Email"];
  }
  setGCCFlag() {
    if (this.establishmentdto.idSet[0].Type === "ZS0003") {
      this.IsGCC = true;
    } else {
      this.IsGCC = false;
    }
  }
  validateContactInfo() {
    let list: number[] = [1, 8, 9, 10];
    for (let i = 0; i < list.length; i++) {
      this.validate(list[i]);
    }
  }
  validatePassportDetails() {

    let err = false;
    if (this.establishmentdto.idSet[1].Idnumber == '') {
      this.pssprtNumErr = true;
      err = true;
    } else {
      this.pssprtNumErr = false;
    }

    // if (this.issueCity == '') {
    //   this.issueCityErr = true;
    //   err = true;
    // } else {
    //   this.issueCityErr = false;
    // }

    if (this.establishmentdto.idSet[1].ValidDateFrom == '') {
      this.issueDateErr = true;
      err = true;
    } else if (this.establishmentdto.idSet[1].ValidDateFrom > new Date()) {
      this.issueDateFutureErr = true;
      err = true;
    } else if (this.establishmentdto.idSet[1].ValidDateFrom > this.establishmentdto.Birthdt) {
      this.issueDateDOBErr = true;
      err = true;
    } else {
      this.issueDateErr = false;
      this.issueDateFutureErr = false;
      this.issueDateDOBErr = false;
    }

    if (this.establishmentdto.idSet[1].ValidDateTo == '') {
      this.expiryDateErr = true;
      err = true;
    } else if (this.establishmentdto.idSet[1].ValidDateTo < new Date()) {
      this.expiryDatePastErr = true;
      err = true;
    } else {
      this.expiryDatePastErr = false;
      this.expiryDateErr = false;
    }

    if (this.pssprtAttchmnt == '') {
      this.pssprtAttchmntErr = true;
      err = true;
    } else {
      this.pssprtAttchmntErr = false;
    }
    if (err) {
      return;
    }

    this.paasportDetailsError = false;

  }

  onReset() {
    this.submitted = false;
  }

  NextStep(id) {
    this.currentTab = id;
    this.optionActive = id;
    if (this.optionActive === 2) {
      this.showOne = true;
      if (this.establishmentdto.idSet[0].Type.toString() === "ZS0003") {
        this.dto1.push(this.dto);
        //this.open();
        this.pushData();
      } else {
        this.getAddress(
          this.establishmentdto.idSet[0].Type,
          this.establishmentdto.idSet[0].Idnumber
        );
        // this.appSrv.getTaxpayerInfo().subscribe((res) => {
        //   console.log("Individual Component - TAX:: ", res);
        //   this.establishmentdto.Gpart = res["d"]["Tin"];
        //   if (this.establishmentdto.Gpart != "") {

        //   }
        // });
      }
    }
    if (this.optionActive === 3) {
      this.showTwo = true;
    }

    this.defaultCss(id);
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  submit(val) {
    // this.show = true;//MUST DELETE
    this.Password = val;
    this.Agree = true;

    // let obj1 = {
    //   day: new Date().getDate(),
    //   month: new Date().getMonth() + 1,
    //   year: new Date().getFullYear(),
    // };
    // let obj = {
    //   City: this.establishmentdto.idSet[1].Country,
    //   IdType: this.establishmentdto.idSet[0].Type,
    //   establishmentdto.idSet.Idnumber: this.establishmentdto.idSet[0].Idnumber,
    //   Email: this.establishmentdto.PortalUsrx,
    //   BuildingNo: this.BuildingNo,
    //   Agree: this.Agree,
    //   Floor: this.UnitNo,
    //   Mobile: "00" + this.cncode + this.establishmentdto.Mobno,
    //   Name: this.Name,
    //   Neighborhood: this.DistrictName,
    //   Password: this.Password,
    //   PostalCd: this.Zipcode,
    //   StreetNm: this.StreetName,
    //   CaseGuid: this.caseuid,
    //   establishmentdto.Birthdt: this.commonVaidation.changeDate(
    //     this.establishmentdto.Birthdt["calendarStart"]
    //   ),
    //   AgreeDt: this.commonVaidation.changeDate(obj1),
    //   Region: "01",
    //   Country: "SA",
    // };
    // this.signupService.submit(obj).subscribe(
    //   (res) => {
    //     this.show = true;
    //     console.log("result", res);
    //   },
    //   (err) => {
    //     this.show = true;//MUST DELETE
    //     // this.notifierService.notify(
    //     //   "error",
    //     //   err.error.error.innererror.errordetails[0].message
    //     // );//MUST ENABLE
    //   }
    // );
  }

  // ngDoCheck(): void {
  //   if (this.counter === 58 && this.showVerification) {
  //     this.counterSubscription.unsubscribe();
  //     this.showVerification = false;
  //     this.NextStep(2);
  //   }
  // }

  showFileds() {
    this.showVerification = true;
    // this.counterSubscription = interval(1000).subscribe((count) => {
    //     console.log((this.counter = this.counter - 1));
    //   });
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onChange(val) {
    console.log(val);
    this.establishmentdto.NameFirst = val;
  }

  validateOTP(otp) {
    console.log(otp);
    this.showVerification = false;
    this.NextStep(2);
  }

  resendOTP() {
    if (this.retryCount < 5) {
      console.log("Resend OTP req :: ", this.resendObj);
      this.resend = false;
      this.retryCount = this.retryCount + 1;
      this.appSrv.getOTP(this.resendObj).subscribe(
        (res) => {
          console.log("Resend OTP Res :: ", res);
          this.enableResendButton = false;
          this.otpRespObj = res["d"];
          this.resend = true;
          this.notifierService.notify("success", this.lang.individual.indErr.e19);
          // this.counter = 60;
          // this.counterSubscription = interval(1000).subscribe((count) => {
          //   console.log((this.counter = this.counter - 1));
          // });
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    } else {
      // TO BE DONE -> SHOW MSG TO USER STATING THAT RETRY ATTEMPTS EXCEEDED - REDIRECT HIM TO SCREEN 1
      this.notifierService.notify("error", "Maximun attempts reached");
      this.router.navigate(["main/dashboard"]);
    }
  }

  getOTPFromUser(otp) {
    console.log("getOTPFromUser :: " + otp, otp.length);
    if (this.optionActive === 2) {
      if (otp.length == 4) {
        // this.otpRespObj["MobileOtp"] = otp;
        // this.otpRespObj["Zsubmit"] = "X";
        // // this.counterSubscription.unsubscribe();
        // this.getOTP(this.otpRespObj);
        this.getOtp2(this.dto, otp);
      }
    } else {
      if (otp.length == 4) {
        this.otpRespObj["MobileOtp"] = otp;
        this.otpRespObj["Zsubmit"] = "X";
        // this.counterSubscription.unsubscribe();
        this.getOTP(this.otpRespObj);
      }
    }
  }
  backClick(id) {

    if (id === 2) {
      if (this.establishmentdto.idSet[0].Type === "ZS0001") {
        this.lang.dir === "rtl"
          ? (this.establishmentdto.idSet[0].Type = "الهوية الوطنية")
          : (this.establishmentdto.idSet[0].Type = "National ID");
      }
      if (this.establishmentdto.idSet[0].Type === "ZS0002") {
        this.lang.dir === "rtl"
          ? (this.establishmentdto.idSet[0].Type = "الإقامة")
          : (this.establishmentdto.idSet[0].Type = "Iqama ID");
      }
      if (this.establishmentdto.idSet[0].Type === "ZS0003") {
        this.lang.dir === "rtl"
          ? (this.establishmentdto.idSet[0].Type = "هوية مواطني دول الخليج")
          : (this.establishmentdto.idSet[0].Type = "GCC ID");
      }
    }

    console.log("value", id, this.establishmentdto.idSet[0].Type);
    if (id <= this.currentTab && !this.show) {
      this.optionActive = id;
    }
  }

  getdateErr() {
    let dateObj = new Date();
    console.log(dateObj.toLocaleDateString("ar-EG"));
    dateObj.setDate(dateObj.getDate() - 1);
    if (
      new Date(
        this.establishmentdto.Birthdt["calendarStart"].year +
        "-" +
        this.establishmentdto.Birthdt["calendarStart"].month +
        "-" +
        this.establishmentdto.Birthdt["calendarStart"].day
      ) > dateObj
    ) {
      this.dobErr1 = true;
      this.dateMsg = this.lang.individual.indErr.e21;
    } else {
      this.dobErr1 = false;
      this.dateMsg = "";
    }
  }
  validateDOB() {
    if (this.establishmentdto.Birthdt !== null) this.dobErr = false;
    console.log(this.establishmentdto.Birthdt);
  }

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
  }

  checkGcc(val) {
    // this.establishmentdto.idSet[0].Idnumber = "";
    this.idErr = false;
    console.log("value", val);
    if (val === "ZS0002" || val === "ZS0003") {
      this.setPassportDefaultValues();
      this.showGcc = true;
    } else {
      this.showGcc = false;
    }
  }

  hideContactInfo() {
    this.showContactInfo = false;
  }
  IDtypeValidation1() {
    if (this.establishmentdto.idSet[0].Type === "ZS0003") {
      if (this.commonValid.isNumber(this.establishmentdto.idSet[0].Idnumber)) {
        if (
          this.establishmentdto.idSet[0].Idnumber.length < 7 ||
          this.establishmentdto.idSet[0].Idnumber.length > 15
        ) {
          this.idErr = true;
          this.idMsg = this.lang.vatError.e19;
        } else {
          this.idErr = false;
        }
      } else {
        this.idErr = true;
        this.idMsg = this.lang.vatError.e20;
      }
    } else {
      let obj = {
        flag: false,
        msg: "",
      };
      obj = this.commonValid.IDtypeValidation(
        this.establishmentdto.idSet[0].Type,
        this.establishmentdto.idSet[0].Idnumber
      );
      this.idErr = obj.flag;
      this.idMsg = obj.msg;
    }
  }
  getOTP(obj) {
    this.resendObj = obj;
    console.log("obj", obj);
    this.appSrv.getOTP(obj).subscribe(
      (res) => {
        console.log("Response ::", res);
        this.otpRespObj = res["d"];
        this.otpRespObj1 = res["d"];
        this.caseuid = res["d"]["CaseGuid"];
        this.showVerification = true;
        if (res["d"]["Zvalidate"]) {
          this.showVerification = false;
          if (this.establishmentdto.idSet[0].Type.toString() === "ZS0003") {
            this.NextStep(2);
          } else
            this.showContactInfo = true;
        } else {
          if (obj.MobileOtp === undefined) {
            // this.counterSubscription = interval(1000).subscribe((count) => {
            //   console.log((this.counter = this.counter - 1));
            // });
            this.notifierService.notify("success", this.lang.individual.indErr.e19);
          } else {
            this.notifierService.notify("error", this.lang.individual.indErr.e20);
          }
        }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  validate(n) {
    let val = this.dto;
    if (n === 1) {
      if (val.Name.toString() === "") {
        this.nameErr1 = false;
        //this.nameMsg = "Please Enter Name";
      } else {
        let a = this.commonVaidation.isArabic(val.Name.toString());
        a ? (this.nameErr1 = false) : (this.nameErr1 = true);
        if (this.nameErr1) this.nameMsg = this.lang.individual.indErr.e1;
        console.log(/^[A-Za-z -_]+$/.test(val.Name.toString()), a);
      }
    }
    if (n === 2) {
      this.nameErr2 = this.commonVaidation.isAlphanumeric(
        val.CityName.toString()
      );
      if (this.nameErr2) this.cityMsg = this.lang.individual.indErr.e2;
    }
    if (n === 3) {
      this.nameErr3 = this.commonVaidation.isAlphanumeric(
        val.DistrictName.toString()
      );
      if (this.nameErr3) this.dMsg = this.lang.individual.indErr.e2;
    }
    if (n === 4) {
      this.nameErr4 = this.commonVaidation.isAlphanumeric(
        val.StreetName.toString()
      );
      if (this.nameErr4) this.sMsg = this.lang.individual.indErr.e2;
    }
    if (n === 5) {
      if (val.Zipcode.toString() === "") this.nameErr5 = false;
      else {
        let a = this.commonVaidation.isNumber(val.Zipcode.toString());
        a ? (this.nameErr5 = false) : (this.nameErr5 = true);
        if (this.nameErr5) this.zMsg = this.lang.individual.indErr.e3;
      }
    }
    if (n === 6) {
      if (val.BuildingNo.toString() === "") this.nameErr6 = false;
      else {
        let a = this.commonVaidation.isNumber(val.BuildingNo.toString());
        a ? (this.nameErr6 = false) : (this.nameErr6 = true);
        if (this.nameErr6) this.bMsg = this.lang.individual.indErr.e3;
      }
    }
    if (n === 7) {
      if (val.UnitNo.toString() === "") this.nameErr7 = false;
      else {
        let a = this.commonVaidation.isNumber(val.UnitNo.toString());
        a ? (this.nameErr7 = false) : (this.nameErr7 = true);
        if (this.nameErr7) this.uMsg = this.lang.individual.indErr.e3;
      }
    }

    if (n === 8) {
      if (val.MobileNo.toString() === "") this.nameErr8 = false;
      else {
        let n = val.MobileNo.substring(0, 1);
        if (n === "0") {
          this.nameErr8 = true;
          this.msMsg = this.lang.individual.indErr.e22;
        } else {
          let a = this.commonVaidation.isNumber(val.MobileNo.toString());
          a ? (this.nameErr8 = false) : (this.nameErr8 = true);
          if (this.nameErr8) this.msMsg = this.lang.individual.indErr.e3;
          else {
            // if (val.MobileNo.length === 9) this.nameErr8 = false;
            // else {
            //   this.nameErr8 = true;
            //   this.msMsg = "Please Enter 9 Digits";
            // }
          }
        }
      }
    }
    if (n === 9) {
      if (val.email.toString() === "") this.nameErr9 = false;
      else {
        let a = this.commonVaidation.isEmailValid(val.email.toString());
        a ? (this.nameErr9 = false) : (this.nameErr9 = true);
        if (this.nameErr9) this.eMsg = this.lang.individual.indErr.e16;
      }
    }
    if (n === 10) {
      if (val.cemail.toString() === "") this.nameErr10 = false;
      else {
        let a = this.commonVaidation.isEmailValid(val.cemail.toString());
        a ? (this.nameErr10 = false) : (this.nameErr10 = true);
        if (this.nameErr10) this.ceMsg = this.lang.individual.indErr.e16;
        else {
          if (val.cemail.toLowerCase() !== val.email.toLowerCase()) {
            this.nameErr10 = true;
            this.ceMsg = this.lang.individual.indErr.e13;
          }
        }
      }
    }
    if (
      this.nameErr1 ||
      this.nameErr2 ||
      this.nameErr3 ||
      this.nameErr4 ||
      this.nameErr5 ||
      this.nameErr6 ||
      this.nameErr7
    )
      this.showc1 = true;
    else this.showc1 = false;

    if (this.nameErr8 || this.nameErr9 || this.nameErr10) this.showc2 = true;
    else this.showc2 = false;
  }
  getOtp2(value, otp) {
    console.log("value", value);
    let obj = {};

    if (
      this.establishmentdto.idSet[0].Type === "National ID" ||
      this.establishmentdto.idSet[0].Type === "الهوية الوطنية"
    ) {
      this.establishmentdto.idSet[0].Type = "ZS0001";
    }
    if (
      this.establishmentdto.idSet[0].Type === "Iqama ID" ||
      this.establishmentdto.idSet[0].Type === "الإقامة"
    ) {
      this.establishmentdto.idSet[0].Type = "ZS0002";
    }
    if (
      this.establishmentdto.idSet[0].Type === "GCC ID" ||
      this.establishmentdto.idSet[0].Type === "هوية مواطني دول الخليج"
    ) {
      this.establishmentdto.idSet[0].Type = "ZS0003";
    }
    obj["IdType"] = this.establishmentdto.idSet[0].Type;
    obj["Id"] = value.IdNumber;
    obj["OtpType"] = "001";
    // obj["BuDob"] = value.changeDate(
    //   value.establishmentdto.Birthdt["calendarStart"]
    // );
    obj["MobileNo"] = "00" + this.cncode + value.MobileNo;
    if (this.establishmentdto.idSet[0].Type === "ZS0003") {
      obj["CommMobNo"] = "";
      obj["OtpVer"] = "";
      obj["CommMobileOtp"] = "";
      obj["MobileOtp"] = otp;
    } else {
      obj["CommMobNo"] = "00" + this.cncode + value.MobileNo;
      obj["OtpVer"] = "1";
      obj["CommMobileOtp"] = otp;
    }
    // obj["CommMobNo"] = "00" + this.cncode + value.MobileNo;
    //   obj["OtpVer"] = "1";
    if (otp != "") obj["Zsubmit"] = "X";
    obj["CommMobileOtp"] = otp;
    obj["CaseGuid"] = this.caseuid;
    console.log("value", obj, this.dto);
    this.resendObj = obj;
    this.appSrv.getOTP(obj).subscribe(
      (res) => {
        this.showVerification = true;
        this.caseuid = res["d"]["CaseGuid"];
        console.log("res", res);
        if (res["d"]["Zvalidate"]) {
          this.showVerification = false;
          this.NextStep(3);
        } else {
          if (obj["CommMobileOtp"] === "") {
            // this.counterSubscription = interval(1000).subscribe((count) => {
            //   console.log((this.counter = this.counter - 1));
            // });
            this.notifierService.notify("success", this.lang.individual.indErr.e19);
          } else {
            this.notifierService.notify("error", this.lang.individual.indErr.e20);
          }
        }
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
        if (err.error.error.innererror.errordetails[0].message === undefined) {
          this.notifierService.notify("error", "OTP Service Error.");
        }
      }
    );
  }

  pushData() {
    // console.log(this.dto);

    // let count = 0;
    // this.dto = new IndividualDto();

    // if (this.dto1.length <= 0) {
    //   if (this.establishmentdto.idSet[0].Type === "ZS0001") {
    //     this.establishmentdto.idSet[0].Type = "National ID";
    //   }
    //   if (this.establishmentdto.idSet[0].Type === "ZS0002") {
    //     this.establishmentdto.idSet[0].Type = "Iqama ID";
    //   }
    //   if (this.establishmentdto.idSet[0].Type === "ZS0003") {
    //     this.establishmentdto.idSet[0].Type = "GCC ID";
    //   }

    //   // this.Name = "";
    //   // this.establishmentdto.PortalUsrx = "";
    // } else {
    //   this.dto1.forEach((item) => {
    //     if (item.IdType === "ZS0003") {
    //       this.dto = item;
    //       if (this.establishmentdto.idSet[0].Type === "ZS0001") {
    //         this.lang.dir === "rtl"
    //           ? (this.establishmentdto.idSet[0].Type = "الهوية الوطنية")
    //           : (this.establishmentdto.idSet[0].Type = "National ID");
    //       }
    //       if (this.establishmentdto.idSet[0].Type === "ZS0002") {
    //         this.lang.dir === "rtl"
    //           ? (this.establishmentdto.idSet[0].Type = "الإقامة")
    //           : (this.establishmentdto.idSet[0].Type = "Iqama ID");
    //       }
    //       if (this.establishmentdto.idSet[0].Type === "ZS0003") {
    //         this.lang.dir === "rtl"
    //           ? (this.establishmentdto.idSet[0].Type = "هوية مواطني دول الخليج")
    //           : (this.establishmentdto.idSet[0].Type = "GCC ID");
    //       }
    //       this.Name = "";
    //       this.establishmentdto.PortalUsrx = "";
    //     }
    //     if (item.flag) {
    //       // this.dto = value;
    //       count++;
    //       this.dto = item;
    //       if (this.establishmentdto.idSet[0].Type === "ZS0001") {
    //         this.lang.dir === "rtl"
    //           ? (this.establishmentdto.idSet[0].Type = "الهوية الوطنية")
    //           : (this.establishmentdto.idSet[0].Type = "National ID");
    //       }
    //       if (this.establishmentdto.idSet[0].Type === "ZS0002") {
    //         this.lang.dir === "rtl"
    //           ? (this.establishmentdto.idSet[0].Type = "الإقامة")
    //           : (this.establishmentdto.idSet[0].Type = "Iqama ID");
    //       }
    //       if (this.establishmentdto.idSet[0].Type === "ZS0003") {
    //         this.lang.dir === "rtl"
    //           ? (this.establishmentdto.idSet[0].Type = "هوية مواطني دول الخليج")
    //           : (this.establishmentdto.idSet[0].Type = "GCC ID");
    //       }

    //       // this.Name = this.tpinfo["Name1"] + this.tpinfo["Name2"];
    //       // this.establishmentdto.PortalUsrx = "";
    //     } else {
    //       this.dataErr = true;
    //       this.dataMsg = this.lang.vatError.e14;
    //     }
    //   });

    //   if (count > 1) {
    //     this.dataErr = true;
    //     this.dataMsg = this.lang.vatError.e15;
    //   } else if (count === 0) {
    //     this.dataErr = true;
    //     this.dataMsg = this.lang.vatError.e14;
    //   } else {
    //     this.dataErr = false;
    //     $("#address").modal("hide");
    //   }
    // }
  }

  getAddress(type, id) {
    this.signupService.getAddress(type, id).subscribe(
      (res) => {
        console.log("Address", res);
        //this.individualDto = res["d"]["results"][0];
        if (res["d"]["results"].length === 1) {
          this.dto1 = [];
          res["d"]["results"].forEach((element) => {
            element["flag"] = true;

            this.dto1.push(element);
          });
          this.pushData();
        } else {
          res["d"]["results"].forEach((element) => {
            element["flag"] = false;
            this.dto1.push(element);
          });
          this.open();
        }

        // this.dto1[1]=  this.dto1[0]
        // for(var i=0;i<2;i++){
        //   let obj={
        //     flag:false,
        //     name:''
        //   }
        //   if(i==0){
        //     obj.flag = true;
        //     obj.name = i+"name";
        //    this.dto1.push(obj)
        //   }else{
        //     obj.flag = false;
        //     obj.name = i+"name";
        //    this.dto1.push(obj)
        //   }
        // }

        console.log("asasas", this.dto1);
        //this.open();
      },
      (err) => {
        if (
          err.error.error.innererror.errordetails[0].message ===
          "An exception was raised"
        ) {
        } else {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }

        this.pushData();
      }
    );
  }
  open() {
    $("#address").modal("show");
  }

  getMaxLength(val) {
    this.maxLength = val;
    if (this.establishmentdto.Mobno.length < this.maxLength) {
    } else this.establishmentdto.Mobno = "";
  }
  onSubmit2() {
    this.validateFacilityInfo();
    this.validateFacilityBrachInfo();
    this.validateFacilityFinancialInfo();
    this.NextStep(3);
  }


  validateFacilityInfo() {
    if (this.establishmentdto.Augrp == undefined) {
      this.branchErr = true;
      return;
    }
    if (this.establishmentdto.Tpresidence == undefined) {
      this.resStatusErr = true;
      return;
    }

    if (this.establishmentdto.Tpresidence == '3') {
      if (this.establishmentdto.Orgnonresident == undefined) {
        this.legalEntityErr = true;
        return;
      } else if (this.establishmentdto.Orgnonresidentactivity == undefined) {
        this.compStatusErr = true;
        return;
      }
    }
    this.facilityValid = true;

  }
  validateFacilityBrachInfo() {
    this.facilityBranchValid = true;
    // return;
  }
  validateFacilityFinancialInfo() {
    if (this.isEmpty(this.establishmentdto.Accmethod)) {
      this.accountingErr = true;
      return;
    }

    if (this.isEmpty(this.establishmentdto.Fdcalender)) {
      this.calendarTypeErr = true;
      return;
    }

    if (this.isEmpty(this.establishmentdto.Fdday)) {
      this.endDayErr = true;
      return;
    }
    if (this.isEmpty(this.establishmentdto.Fdmonth)) {
      this.endMonthErr = true;
      return;
    }

    if (this.isEmpty(this.establishmentdto.Commdt)) {
      this.commencementDateErr = true;
      return;
    }
    if (this.isEmpty(this.establishmentdto.Fdenddt)) {
      this.taxableDateErr = true;
      return;
    }

    this.facilityFinancialValid = true;
    // return;
  }

  validateCity(city) {
    city !== "" ? (this.nameErr2 = false) : (this.nameErr2 = true);
    console.log(this.nameErr2);
    this.cityMsg = this.lang.individual.indErr.e5;
  }

  uploadFiles(file, idd) {

    const frmData = new FormData();
    let filename;
    // for (var i = 0; i < this.myFiles.length; i++) {
    filename = file["name"];
    frmData.append("fileUpload", file);
    // }
    if (file.size > 5242880) {
      this.notifierService.notify('error', this.lang.errorMsgs.fileError);
      return;
    }

    //   this.vatService
    //     .attachmentSubmit(
    //       this.returnId,
    //       control.controls[idd].value.id,
    //       filename,
    //       frmData
    //     )
    //     .subscribe(
    //       (res) => {
    //         console.log("upload", res);
    //         control.controls[idd]["controls"].name.setValue(filename);
    //         control.controls[idd]["controls"].flag.setValue(true);
    //         control.controls[idd]["controls"].url.setValue(res["d"]["DocUrl"]);
    //         control.controls[idd]["controls"].did.setValue(res["d"]["Doguid"]);
    //         //control.controls[idd].value.id
    //         this.notifierService.notify(
    //           "success",
    //           this.lang.successMsg
    //         );
    //         for (var i in this.vatThirdFormGroup.controls.doc.value) {
    //           if (this.vatThirdFormGroup.controls.doc.value[i]["id"] != "" && this.vatThirdFormGroup.controls.doc.value[i]["name"] == "") {
    //             this.disableContinue = true;
    //             break;
    //           } else {
    //             this.disableContinue = false;
    //           }
    //         }
    //       },
    //       (err) => {
    //         this.notifierService.notify(
    //           "error",
    //           err.error.error.innererror.errordetails[0].message
    //         );
    //         this.disableContinue = true;
    //       }
    //     );
  }
}
