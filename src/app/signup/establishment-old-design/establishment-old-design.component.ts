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

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-establishment-old-design',
  templateUrl: './establishment-old-design.component.html',
  styleUrls: ['./establishment-old-design.component.css']
})
export class EstablishmentOldDesignComponent implements OnInit {
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
  firstFormGroup: FormGroup;
  estbForm: FormGroup;
  facilityInfoForm: FormGroup;
  submitted: boolean;
  submitted1: boolean;
  codes;
  name = '';

  // show

  lang;
  direction;
  show: boolean = false;
  innerWidth: number;
  showVerification: boolean = false;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth);
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['branchName', 'crLicense', 'city', 'type', 'update', 'delete'];
  dataSource: MatTableDataSource<any>;

  constructor(private formBuilder: FormBuilder,
    public appSrv: AppService) { }

  ngOnInit(): void {

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.establishment;
      this.direction = constants.langz.arb.dir;
      this.idTypes = constants.langz.arb.idTypes;
    } else {
      this.lang = constants.langz.eng.establishment;
      this.direction = constants.langz.eng.dir;
      this.idTypes = constants.langz.eng.idTypes;
    }

    this.appSrv.getPhoneCode().subscribe(res => {
      console.log(res);
      this.codes = res['d']['results'];
      console.log(this.codes);
    });

    this.optionActive = 1;
    this.buildForm();

    this.facilityInfoForm = this.formBuilder.group({
      tin: [null],
      branch: [null],
      resStatus: [null],
      legalEntity: [null],
      compStatus: [null],
      financialInfo: this.formBuilder.group({
        accounting: [null],
        calendarType: [null],
        endDay: [null],
        endMonth: [null],
        commencementDate: [null],
        taxableDate: [null]
      })
    });

    this.appSrv.getData().subscribe(res => {
      console.log("Mock :: ", res);
      this.dataSource = new MatTableDataSource(<any>res['data']);
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  buildForm() {
    this.estbForm = this.formBuilder.group({
      idType: [null],
      idNum: [null],
      dob: [null],
      fname: [null],
      lname: [null],
      passportForm: this.formBuilder.group({
        pssprtNum: [null],
        issueCity: [null],
        issueDate: [null],
        expiryDate: [null],
        pssprtAttchmnt: [null]
      }),
      contactForm: this.formBuilder.group({
        mobile: [null],
        email: [null],
        cnfrmEmail: [null]
      })
    });
    console.log(this.estbForm.controls);
  }

  get f() {
    return this.estbForm.controls;
  }
  get f1() {
    return this.facilityInfoForm.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.estbForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.estbForm.value);
    // stop here if form is invalid
    if (this.estbForm.invalid) {
      return;
    }
    // display form values on success
    // this.NextStep(2);
  }

  onSubmit1() {
    this.submitted1 = true;
    console.log(this.facilityInfoForm.value);
    if (this.facilityInfoForm.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.estbForm.reset();
  }

  NextStep(id) {
    this.optionActive = id;
    if (this.optionActive === 2) {
      this.showOne = true;
    }
    if (this.optionActive === 3) {
      this.showTwo = true;
    }

    this.defaultCss(id);
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  submit() {
    this.show = true;
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
    this.name = val;
  }

  validateOTP(otp) {
    console.log(otp);
    this.showVerification = false;
    this.NextStep(2);
  }

  resendOTP() {
    console.log("In Resend OTP Method");
  }

}
