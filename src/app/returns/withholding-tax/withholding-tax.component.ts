import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, Form } from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { VatServiceService } from 'src/app/services/vat-service.service';
import { ReturnsService } from '../returns.service';
import { NotifierService } from 'angular-notifier';
import { CalendarComponent } from "src/app/constants/calendar.component";
import { withholdingconstants } from "src/app/returns/withholding-tax/withholding-tax.constants.model";
import { ActivatedRoute, Router } from '@angular/router';
import { toHijri } from 'hijri-converter';
import { AppService } from 'src/app/app.service';
import { CommonValidation } from 'src/app/constants/commonValidations';
import { environment } from "src/environments/environment";

import * as XLSX from 'xlsx'


declare var jQuery;
declare var $: any;

@Component({
  selector: 'app-withholding-tax',
  templateUrl: './withholding-tax.component.html',
  styleUrls: ['./withholding-tax.component.css']
})
export class WithholdingTaxComponent implements OnInit {

  headerComponent = CalendarComponent;
  @ViewChild('inputFile') myInputVariable: ElementRef;
  @ViewChild('inputFile1') myInputVariable1: ElementRef;
  @ViewChild('inputFile2') myInputVariable2: ElementRef;

  activeFormat = "Islamic"
  
  firstLoad: boolean = false;
  tilesView: boolean = true;
  withholdingDetailsScreen: boolean = false;
  withholdingDetailsScreenForm6: boolean = false;
  step: number = 1;
  withholdingsObject: any;
  withholdingDetailsObject: any;
  withholdingList: any = [];
  withholdingListDuplicte: any = [];
  searchText: any;
  fromDate: any = '';
  toDate: any = '';
  status: string = '';
  statusSet: any = [];
  countryList: any = [];
  taxRatesList: any = [];
  taxRateList: any = [];
  taxpayerDetails: any = [];
  //Form6taxPayerDetails: any = [];
  formSet: any = [];
  formDataSet: any = [];
  taxRateError: boolean = false;
  whtamountError: boolean = false;
  fillManually: boolean = true;
  withHoldingForm9: FormGroup;
  serviceType: any = [];
  attachmentError: boolean = false;
  fileSizeError: boolean = false;
  whtObj: any;

  totBeginingBalance: number;
  totServices: number;
  totYearPayments: number;
  totOtherPayments: number;
  totEndBalance: number;
  totPaymentAmount: number;
  totWithholdingAmnt: number;
  totFines: number;
  agree: boolean = false;
  serviceStarts: boolean = true;
  errorMessage: any;
  //withHoldingamountError:boolean = false;
  disableInputs: boolean = false;
  isAmendment: boolean = false;
  name: string;
  titleText:string="No file choosen";
  currentYear = new Date().getFullYear();
  StatusTpesSet = [
    {
      "fbTyp": [{
        "key": "All",
        "Text": ""
      }, {
        "key": "RGEX",
        "Text": "Excise Registration"
      },
      {
        "key": "RGEW",
        "Text": "Warehouse Application"
      }, {
        "key": "CNEW",
        "Text": "Warehouse Cancellation"
      }, {
        "key": "RGVT",
        "Text": "VAT Registration"
      }
      ],
      "statusSet": [{
        "key": "All",
        "Text": "All"
      },
      {
        "key": "E0013",
        "Text": "Save as Draft"
      }, {
        "key": "E0015",
        "Text": "For Officer Assignment"
      }, {
        "key": "E0016",
        "Text": "To be Approved by Officer"
      },
      {
        "key": "E0019",
        "Text": "To be Approved by TO after Clarification"
      }, {
        "key": "E0041",
        "Text": "To be Approved by Supervisor"
      }, {
        "key": "E0044",
        "Text": "In Clarification with Officer"
      },
      {
        "key": "E0052",
        "Text": "Approval-Supervisor Assignmentn"
      }, {
        "key": "E0053",
        "Text": "Reject - Supervisor Assignment"
      }, {
        "key": "E0054",
        "Text": "Canc/Void-SupervisorAssignment"
      },
      {
        "key": "E0049",
        "Text": "To Approved Rejection by Sup"
      }, {
        "key": "E0050",
        "Text": "To Approve Cancellation by Sup"
      }, {
        "key": "E0045",
        "Text": "Approved"
      },
      {
        "key": "E0018",
        "Text": "In Clarification with Taxpayer"
      },
      {
        "key": "E0089",
        "Text": "GSTC – Escalation In Process"
      },
      {
        "key": "E0090",
        "Text": "GSTC – Escalation Completed"
      }
      ],

      "ddValList": [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "01",
          "Text": "Forms for resubmission to GAZT"
        },
        {
          "Key": "03",
          "Text": "Saved as Draft with Taxpayer"
        },
        {
          "Key": "02",
          "Text": "Forms submitted and for GAZT approval"
        }
      ],

      "ddAppOList": [
        {
          "Key": "",
          "Text": ""
        },
        {
          "Key": "01",
          "Text": "Excise Tax Registration applications"
        },
        {
          "Key": "02",
          "Text": "Excise Tax Registration Change applications "
        },
        {
          "Key": "03",
          "Text": "Excise Tax Registration Cancellation applications"
        },
        {
          "Key": "04",
          "Text": "Warehouse Licence Renewal applications"
        }
      ],

      "appTyWH": [
        {
          "key": "",
          "Text": ""
        },
        {
          "key": "03",
          "Text": "Active Warehouse application"
        },
        {
          "key": "04",
          "Text": "Warehouses for Renewal"
        },
        {
          "key": "05",
          "Text": "Cancelled Warehouses"
        }
      ],

    }
  ]

  "Type" = [
    {
      "Key": "00",
      "Text": ""
    },
    {
      "Key": "01",
      "Text": "Rent"
    },
    {
      "Key": "02",
      "Text": "Royalty"
    },
    {
      "Key": "03",
      "Text": "Management Fee"
    },
    {
      "Key": "04",
      "Text": "Payments for Air tickets"
    },
    {
      "Key": "05",
      "Text": "Payments for Maritime"
    },
    {
      "Key": "06",
      "Text": "Payments for international telecommunications Services"
    },
    {
      "Key": "07",
      "Text": "Payments for Services to Head Office"
    },
    {
      "Key": "08",
      "Text": "Payments for Services to Associated Company"
    },
    {
      "Key": "09",
      "Text": "Dividends "
    },
    {
      "Key": "10",
      "Text": "Payments for Technical or Consulting Services"
    },
    {
      "Key": "11",
      "Text": "Payments for Loan Charges"
    },
    {
      "Key": "12",
      "Text": "Payments for Insurance or Reinsurance premium"
    },
    {
      "Key": "13",
      "Text": "Others"
    }
  ];
  "TypeAr" = [
    {
      "Key": "00",
      "Text": ""
    },
    {
      "Key": "01",
      "Text": "إيجار"
    },
    {
      "Key": "02",
      "Text": "أتاوة أو ريع"
    },
    {
      "Key": "03",
      "Text": "أتعاب إدارة"
    },
    {
      "Key": "04",
      "Text": "تذاكر طيران أو شحن جوي"
    },
    {
      "Key": "05",
      "Text": "تذاكر أو شحن بحري"
    },
    {
      "Key": "06",
      "Text": "خدمات اتصالات هاتفية دولية"
    },
    {
      "Key": "07",
      "Text": "خدمات مدفوعة للمركز الرئيسي"
    },
    {
      "Key": "08",
      "Text": "خدمات مدفوعة لشركة مرتبطة"
    },
    {
      "Key": "09",
      "Text": "أرباح موزعة"
    },
    {
      "Key": "10",
      "Text": "خدمات فنية أو استشارية"
    },
    {
      "Key": "11",
      "Text": "عوائد قروض"
    },
    {
      "Key": "12",
      "Text": "قسط تأمين إو إعادة تأمين"
    },
    {
      "Key": "13",
      "Text": "دفعات أخرى"
    }
  ];
  "Type09" = [
    {
      "Key": "00",
      "Text": ""
    },
    {
      "Key": "01",
      "Text": "Rent"
    },
    {
      "Key": "02",
      "Text": "Royalty"
    },
    {
      "Key": "03",
      "Text": "Management fee"
    },
    {
      "Key": "04",
      "Text": "Payments for air tickets or air freight"
    },
    {
      "Key": "05",
      "Text": "Payments for maritime  tickets or Freight"
    },
    {
      "Key": "06",
      "Text": "Payments for international telecommunications Services"
    },
    {
      "Key": "07",
      "Text": "Payments for services to a head-office"
    },
    {
      "Key": "08",
      "Text": "Payments for services to an associated company"
    },
    {
      "Key": "09",
      "Text": "Dividends "
    },
    {
      "Key": "10",
      "Text": "Payments for technical or consulting services"
    },
    {
      "Key": "11",
      "Text": "Payments for loan charges (proceeds)((interests)"
    },
    {
      "Key": "12",
      "Text": "Payments for insurance or reinsurance premiums"
    },
    {
      "Key": "13",
      "Text": "Other payments"
    }
  ];
  "TypeAr09" = [
    {
      "Key": "00",
      "Text": ""
    },
    {
      "Key": "01",
      "Text": "إيجار"
    },
    {
      "Key": "02",
      "Text": "أتاوة أو ريع"
    },
    {
      "Key": "03",
      "Text": "أتعاب إدارة"
    },
    {
      "Key": "04",
      "Text": "تذاكر طيران أو شحن جوي"
    },
    {
      "Key": "05",
      "Text": "تذاكر أو شحن بحري"
    },
    {
      "Key": "06",
      "Text": "خدمات اتصالات هاتفية دولية"
    },
    {
      "Key": "07",
      "Text": "خدمات مدفوعة للمركز الرئيسي"
    },
    {
      "Key": "08",
      "Text": "خدمات مدفوعة لشركة مرتبطة"
    },
    {
      "Key": "09",
      "Text": "أرباح موزعة"
    },
    {
      "Key": "10",
      "Text": "خدمات فنية أو استشارية"
    },
    {
      "Key": "11",
      "Text": "عوائد قروض"
    },
    {
      "Key": "12",
      "Text": "قسط تأمين إو إعادة تأمين"
    },
    {
      "Key": "13",
      "Text": "أي دفعات أخرى"
    }
  ];
  year_En =
    {
      "Year": [
        {
          "Key": "2000",
          "Text": ""
        },
        {
          "Key": "2007",
          "Text": "2007"
        },
        {
          "Key": "2008",
          "Text": "2008"
        },
        {
          "Key": "2009",
          "Text": "2009"
        },
        {
          "Key": "2010",
          "Text": "2010"
        },
        {
          "Key": "2011",
          "Text": "2011"
        },
        {
          "Key": "2012",
          "Text": "2012"
        },
        {
          "Key": "2013",
          "Text": "2013"
        },
        {
          "Key": "2014",
          "Text": "2014"
        },
        {
          "Key": "2015",
          "Text": "2015"
        },
        {
          "Key": "2016",
          "Text": "2016"
        },
        {
          "Key": "2017",
          "Text": "2017"
        },
        {
          "Key": "2018",
          "Text": "2018"
        },
        {
          "Key": "2019",
          "Text": "2019"
        },
        {
          "Key": "2020",
          "Text": "2020"
        },
        {
          "Key": "2021",
          "Text": "2021"
        },
        {
          "Key": "2022",
          "Text": "2022"
        },
        {
          "Key": "2023",
          "Text": "2023"
        },
        {
          "Key": "2024",
          "Text": "2024"
        }
      ]
    };
  month_En = {
    "Month": [
      {
        "Key": "00",
        "Text": ""
      },
      {
        "Key": "01",
        "Text": "01"
      },
      {
        "Key": "02",
        "Text": "02"
      },
      {
        "Key": "03",
        "Text": "03"
      },
      {
        "Key": "04",
        "Text": "04"
      },
      {
        "Key": "05",
        "Text": "05"
      },
      {
        "Key": "06",
        "Text": "06"
      },
      {
        "Key": "07",
        "Text": "07"
      },
      {
        "Key": "08",
        "Text": "08"
      },
      {
        "Key": "09",
        "Text": "09"
      },
      {
        "Key": "10",
        "Text": "10"
      },
      {
        "Key": "11",
        "Text": "11"
      },
      {
        "Key": "12",
        "Text": "12"
      }
    ]
  };
  year_H = {
    "Year": [
      {
        "Key": "2000",
        "Text": ""
      },
      {
        "Key": "1428",
        "Text": "1428"
      },
      {
        "Key": "1429",
        "Text": "1429"
      },
      {
        "Key": "1430",
        "Text": "1430"
      },
      {
        "Key": "1431",
        "Text": "1431"
      },
      {
        "Key": "1432",
        "Text": "1432"
      },
      {
        "Key": "1433",
        "Text": "1433"
      },
      {
        "Key": "1434",
        "Text": "1434"
      },
      {
        "Key": "1435",
        "Text": "1435"
      },
      {
        "Key": "1436",
        "Text": "1436"
      },
      {
        "Key": "1437",
        "Text": "1437"
      },
      {
        "Key": "1438",
        "Text": "1438"
      },
      {
        "Key": "1439",
        "Text": "1439"
      },
      {
        "Key": "1440",
        "Text": "1440"
      },
      {
        "Key": "1441",
        "Text": "1441"
      },
      {
        "Key": "1442",
        "Text": "1442"
      },
      {
        "Key": "1443",
        "Text": "1443"
      },
      {
        "Key": "1444",
        "Text": "1444"
      },
      {
        "Key": "1445",
        "Text": "1445"
      }
    ]
  };
  month_H = {
    "Month": [
      {
        "Key": "00",
        "Text": ""
      },
      {
        "Key": "01",
        "Text": "01"
      },
      {
        "Key": "02",
        "Text": "02"
      },
      {
        "Key": "03",
        "Text": "03"
      },
      {
        "Key": "04",
        "Text": "04"
      },
      {
        "Key": "05",
        "Text": "05"
      },
      {
        "Key": "06",
        "Text": "06"
      },
      {
        "Key": "07",
        "Text": "07"
      },
      {
        "Key": "08",
        "Text": "08"
      },
      {
        "Key": "09",
        "Text": "09"
      },
      {
        "Key": "10",
        "Text": "10"
      },
      {
        "Key": "11",
        "Text": "11"
      },
      {
        "Key": "12",
        "Text": "12"
      }
    ]
  };
  fields: FormArray;
  //AName: any;
  noOfFormsAdded: number = 1;

  //Added by hema for form6

  monthsYearsSet: any = [];
  calendarType: string = 'G';
  createdForm6Year: any = '';
  createdForm6Month: any = '';
  action: string = 'FillManually';
  withHoldingForm6: FormGroup;
  typeIndex: number;
  show: boolean = false;
  noOfAddedForms: number = 1;
  language: any;
  totalSchedulePayment: number = 0.00;
  totalWithHeldAmount: number = 0.00;
  notesAttached: string = '';
  attachedNotes: string = '';
  today: any = new Date();
  agreeForm6: boolean = false;
  newForm6: boolean = false;
  errorFile: boolean = false;
  startDate: any;
  endDate: any;
  errorForm6: boolean = false;
  lang: any;
  direction: string;
  fbGuid: string = "";
  fbTyp: string = "";
  retrunObjStatus: string = "";
  returnObjStatusTxt: string = "";
  periodStartDate: any;
  periodEndDate: any;
  downloadExcelbuttonTitle:any;
  baseUrl = environment.loginurl.split("irj")[0]+"/";
  taxpayerDetailsObject:any;


  //added by hema form6 ends
  constructor(
    private returnsService: ReturnsService, private vatService: VatServiceService,
    private fb: FormBuilder,
    //added by hema starts
    public notifierService: NotifierService,
    private activatedRoute: ActivatedRoute,
    //added by hema ends
    private appService: AppService,
    private commonValidation: CommonValidation,private router:Router
  ) {
    this.statusSet = this.StatusTpesSet["statusSet"];
    // if (this.language == 'ar') {
    //   moment.locale('ar-Sa');
    // }
    // else {
      moment.locale('en-Us');

    // }

    // this.serviceType = this.Type;
  }

  ngOnInit(): void {
    
    console.log("hijri",this.commonValidation.changeDate4(this.commonValidation.dateFormate(this.commonValidation.toJulianDate1(new Date()),"Islamic")).split('-')[0])
    $('[data-toggle="tooltip"]').tooltip('hide');
    // //For Tab Active    
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab", JSON.stringify("ضريبة الإستقطاع"));
    // } else {
    //   localStorage.setItem("ActiveTab", JSON.stringify("Withholding Tax"));
    // }
    // //For Tab Active end
    //Added by hema starts
    if (localStorage.getItem("lang") === "ar") {
      this.lang = withholdingconstants.langz.arb.newReturnsWHT;
      this.direction = withholdingconstants.langz.arb.dir;
    } else {
      this.lang = withholdingconstants.langz.eng.newReturnsWHT;
      this.direction = withholdingconstants.langz.eng.dir;
    }

    this.language = localStorage.getItem("lang");
    // if (this.language == 'ar') {
    //   moment.locale('ar-Sa');
    // }
    // else {
      moment.locale('en-Us');
      // alert(this.currentYear);
      
      if(this.language == 'ar'){
        this.titleText="لم تقم باختيار ملف";
        this.downloadExcelbuttonTitle = "تحميل بصيغة إكسل"
      }
      else {
        this.titleText="No file chosen"
        this.downloadExcelbuttonTitle = "Download Excel Format"
      }
    // }
    if (this.language != 'ar') {
      this.serviceType = this.Type09;
    }
    else if (this.language == 'ar') {
      this.serviceType = this.TypeAr09;
    }

    //Added by hema ends

    this.returnsService.ViewSubject.subscribe((data: boolean) => {
      this.tilesView = data;
    });

    if (this.language != 'ar') {
      this.Type = this.Type;
    }
    else if (this.language == 'ar') {
      this.Type = this.TypeAr;
    }

    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      this.fbGuid = params["Fbguid"] || "";
      this.fbTyp = params["Fbtyp"] || "";
      this.retrunObjStatus = params["Status"] || "";
      if (this.retrunObjStatus == "IP014") {
        if (this.language == 'ar') {
          this.returnObjStatusTxt = "فاتورة";
        }
        else {
          this.returnObjStatusTxt = "Billed";
        }

      }
      else if (this.retrunObjStatus == "IP011") {
        if (this.language == 'ar') {
          this.returnObjStatusTxt = "تم تقديمه";

        }
        else {
          this.returnObjStatusTxt = "Submitted";
        }
      }
      if (this.fbGuid) {
        this.GetUserDetails();
      }
    });
    // this.withHoldingForm9 = this.fb.group({
    //   "CompanyName":[,Validators.required],
    //   "Country":[,Validators.required],
    //   "typeOfService":[,Validators.required],
    //   "BeginningPeriodBalance":[0,[Validators.required,Validators.min(0)]],
    //   "ServicesperformedThisYear":[0,[Validators.required,Validators.min(0)]],
    //   "paidDuringtheYear":[0,[Validators.required,Validators.min(0)]],
    //   "otherSettlements":[0,[Validators.required,Validators.min(0)]],
    //   "endofPeriodBalance":[0,[Validators.required,Validators.min(0)]],
    //   "paymentAmount":[0,[Validators.required,Validators.min(0)]],
    //   "taxRate":[0,[Validators.required,Validators.min(0)]],
    //   "withHoldingTax":[0,[Validators.required,Validators.min(0)]],
    //   "fine":[0,[Validators.required,Validators.min(0)]]
    // })
    this.withHoldingForm9 = this.fb.group({
      fields: this.fb.array([])
    });

    //added by hema for form6 starts
    this.withHoldingForm6 = this.fb.group({
      "Types": this.fb.array([])
    });
    this.GetCountryList();
    //added by hema for form6 ends
  }
  //added by hema
  get Types(): FormArray {
    return this.withHoldingForm6.get('Types') as FormArray;
  }
  //added by hema ends

  //To return the new form9 form group
  AddForm9Form(i): FormGroup {
    return this.fb.group({
      "CompanyName": [, Validators.required],
      "Country": [, Validators.required],
      "typeOfService": [, Validators.required],
      "BeginningPeriodBalance": [0, [Validators.required, Validators.min(0)]],
      "ServicesperformedThisYear": [0, [Validators.required, Validators.min(0)]],
      "paidDuringtheYear": [0, [Validators.required, Validators.min(0)]],
      "otherSettlements": [0, [Validators.required, Validators.min(-9999999999999.99),Validators.max(99999999999999.99)]],
      "endofPeriodBalance": [0, [Validators.required]],
      "paymentAmount": [0, [Validators.required, Validators.min(0)]],
      "taxRate": [0, [Validators.required, Validators.min(0)]],
      "withHoldingTax": [0, [Validators.required, Validators.min(0)]],
      "fine": [0, [Validators.required, Validators.min(0)]],
      "minRate": [0],
      "maxRate": [0],
      "withholdingamountError": [false]
      // "withholdingamountError":[false]
    });
  }
  //To Add the form in form9
  OnAddForm(i) {
    this.fields = this.withHoldingForm9.get('fields') as FormArray;
    this.fields.push(this.AddForm9Form(i));
    console.log(this.fields);
  }
  //To get the fields form array in form9
  get FormsControls() {
    return this.withHoldingForm9.get('fields')['controls'];
  }
  //To delete the form in form9
  DeleteForm(i: number) {
    const control = this.withHoldingForm9.get('fields') as FormArray;
    console.log(control, i)
    if (i > 0) {
      control.removeAt(i);
    }
    // this.fields = this.withHoldingForm9.get('fields') as FormArray;
    // if(i > 1) {	
    //   this.fields.controls.removeAt(i);
    //   // (this.withholdingDetailsObject["WHT9_L0001Set"]["results"]).length-1;	
    //   this.Form9TotalCalculations();
    // }	
    else {
      this.ClearFormArray(this.fields);
      this.OnAddForm(i);
    }
    this.Form9TotalCalculations();
  }
  //To add the multiple forms in form9
  OnAddMultipleForms(i) {
    const fields = this.withHoldingForm9.get('fields') as FormArray;
    for (let j = 0; j < this.noOfFormsAdded; j++) {
      const forms = this.AddForm9Form((this.withHoldingForm9.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }

    jQuery("#addMultipleFormsModal").modal('hide');
    // jQuery('body').addClass('modalopen');

  }
//To calculate the form9 form calculations
  WithHoldingsCalculations() {
    console.log(this.withHoldingForm9);
    if (this.fields.status != "INVALID") {
      if (this.formDataSet['BeginBal'] > 0) {
        for (let i = 0; i < this.fields.controls.length; i++) {

          const field = this.withHoldingForm9.get('fields') as FormArray;
          field.controls[i].patchValue({ 'BeginningPeriodBalance': this.formDataSet['BeginBal'] });
          let endofPeriodBalance = ((+(this.fields.controls[i].value.BeginningPeriodBalance)) + (+(this.fields.controls[i].value.ServicesperformedThisYear)) + (-(this.fields.controls[i].value.paidDuringtheYear)) + (+(this.fields.controls[i].value.otherSettlements)))
          field.controls[i].patchValue({ 'endofPeriodBalance':parseFloat(endofPeriodBalance.toString()).toFixed(2) });

        }
        //   this.withHoldingForm9.controls['BeginningPeriodBalance'].setValue(this.formDataSet['BeginBal']);
        //   let endofPeriodBalance =  ((+(this.withHoldingForm9.value.BeginningPeriodBalance))+(+(this.withHoldingForm9.value.ServicesperformedThisYear))+(-(this.withHoldingForm9.value.paidDuringtheYear))+(+(this.withHoldingForm9.value.otherSettlements)))
        // this.withHoldingForm9.controls['endofPeriodBalance'].setValue(endofPeriodBalance);

      }
      else {
        for (let i = 0; i < this.fields.controls.length; i++) {
          console.log(this.fields.controls[i]);
          let endofPeriodBalance = ((+(this.fields.controls[i].value.BeginningPeriodBalance)) + (+(this.fields.controls[i].value.ServicesperformedThisYear)) + (-(this.fields.controls[i].value.paidDuringtheYear)) + (+(this.fields.controls[i].value.otherSettlements)))
          // this.fields.controls[i]['endofPeriodBalance'].setValue(endofPeriodBalance);
          const field = this.withHoldingForm9.get('fields') as FormArray;
          field.controls[i].patchValue({ 'endofPeriodBalance':parseFloat(endofPeriodBalance.toString()).toFixed(2) });
        }

        // let endofPeriodBalance =  ((+(this.withHoldingForm9.value.BeginningPeriodBalance))+(+(this.withHoldingForm9.value.ServicesperformedThisYear))+(-(this.withHoldingForm9.value.paidDuringtheYear))+(+(this.withHoldingForm9.value.otherSettlements)))
        // this.withHoldingForm9.controls['endofPeriodBalance'].setValue(endofPeriodBalance);
      }
      this.Form9TotalCalculations();
    }

  }
//To get the login user details
  GetUserDetails() {
    this.vatService.getVatData().subscribe(
      (res) => {
        console.log("resdata", res["d"]);
        this.withholdingsObject = res;
        //this.getWithHoldings(); 
        this.whtObj = { "Status": this.retrunObjStatus, "Euser": (this.retrunObjStatus) ? "0000000000000000000000" + this.withholdingsObject["d"]["Gpartz"] : '', "Fbguid": this.fbGuid, "Gpart": this.withholdingsObject["d"]["Gpartz"], "Fbtyp": this.fbTyp };
        this.GetWithHoldingTaxDetails(this.whtObj);
        console.log(this.whtObj.Status);
      },
    );
  }
//To get the list of returns
  GetWithHoldings() {
    console.log(this.withholdingsObject["d"]["Gpartz"]);
    this.returnsService.getWithHoldings(this.withholdingsObject["d"]["Gpartz"]).subscribe((data) => {
      console.log('Form9 Data', data)
      this.withholdingListDuplicte = data["d"]["listSet"]["results"];
      this.withholdingList = data["d"]["listSet"]["results"];

    })
  }

  //To filter the withholding returns

  FilterWithHoldings() {
    var startDate = moment(this.fromDate, "YYYY-MM-DD");
    var endDate = moment(this.toDate, "YYYY-MM-DD");
    if (this.status != 'All') {
      this.withholdingList = this.withholdingListDuplicte.filter((data) => {
        console.log(data);
        var fileddate = moment(moment(data["DueDtC"], 'DD/MM/YYYY'), 'YYYY-MM-DD');
        if ((this.fromDate.toString() != '') && (this.toDate.toString() != '')) {
          return (data["Status"].toString().toLowerCase() == this.status.toLowerCase()) && (fileddate.diff(startDate, 'days') > 0) && (endDate.diff(fileddate, 'days') > 0)
        }
        else if (this.status == '') {
          return (fileddate.diff(startDate, 'days') > 0) && (endDate.diff(fileddate, 'days') > 0)
        }
        else {
          return data["Status"].toString().toLowerCase() == this.status.toLowerCase()
        }
      })
    }

    else {
      //this.VatReturns = this.VatReturnsDuplicate;
      console.log(this.fromDate == '', this.toDate == '');
      this.withholdingList = this.withholdingListDuplicte.filter((data) => {
        var fileddate = moment(moment(data["DueDtC"], 'DD/MM/YYYY'), 'YYYY-MM-DD');
        if ((this.fromDate.toString() != '') && (this.toDate.toString() != '')) {
          return (fileddate.diff(startDate, 'days') > 0) && (endDate.diff(fileddate, 'days') > 0)
        }
        else {
          return data
        }
      })
    }

  }
//To get the return details along with country list
  GetTaxPayerDetails(withholdingsobj) {
    // this.serviceType = this.Type;

    console.log(withholdingsobj);

    this.returnsService.getCountryList().subscribe((data) => {
      console.log("Country List", data)
      this.countryList = data["d"]["results"];
    });
    this.returnsService.getTaxRates().subscribe((response) => {
      console.log("taxRates", response)
      this.taxRatesList = response["d"]["results"];
      this.taxRateList = response["d"]["results"];
    })
    if (withholdingsobj["Fbtyp"] == "WHT9") {
      this.returnsService.getWithholdingTaxpayerDetails(withholdingsobj["Fbguid"], withholdingsobj["Euser"]).subscribe((data) => {
        console.log("Taxpayer Details", data)

        this.withholdingDetailsObject = data["d"];
        this.taxpayerDetails = data["d"];
        if(this.taxpayerDetails.PeriodKey<1900)
        {
          this.currentYear=+(this.commonValidation.changeDate4(this.commonValidation.dateFormate(this.commonValidation.toJulianDate1(new Date()),"Islamic")).split('-')[0]);
        }
        else
        {
          this.currentYear=new Date().getFullYear();
        }
        this.taxpayerDetailsObject=this.taxpayerDetails;
        localStorage.setItem("ReturnObj",JSON.stringify(this.taxpayerDetails))        
        console.log("currentYear",this.currentYear);
        this.formSet = data["d"]["WHT9_FORMSet"]["results"][0] || [];
        console.log(this.formSet.AName.length);
        // if (this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
          moment.locale('en-Us');

        // }
        this.periodStartDate = this.formSet.APeriodFrom;
        this.periodEndDate = this.formSet.APeriodTo;
        console.log('Test Date', this.periodStartDate);
        if (this.formSet.ACalendarTp == "H" || this.taxpayerDetails.PeriodKey < 1900) {

          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }


        //this.periodStartDate = "\/Date=("+new Date((this.periodStartDate)).getTime()+")\/"//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,

        console.log('Test DAte', this.periodStartDate)


        // PymntDt:"\/Date("+new Date(().getTime(this.formSet.value.APeriodFrom)+")\/",//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,

        this.formDataSet = data["d"]["WHT9_L0001Set"]["results"] || [];
        console.log(withholdingsobj["Status"]);

        console.log(this.serviceStarts);
        this.disableInputs = false;
        if (withholdingsobj.Status == "IP014" || withholdingsobj.Status == "IP011") {
          this.step = 7;
          this.disableInputs = true;
          this.fields = this.withHoldingForm9.get('fields') as FormArray;
          console.log(this.fields);

        }
        this.FormsSet();
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
        }
        this.withholdingDetailsScreen = true;
        this.formSet["ADate"] = new Date()

        if(this.taxpayerDetails["NOTESSet"]["results"].length > 0) {
          for(let i=0;i<this.taxpayerDetails["Off_notesSet"]["results"].length;i++) {
            this.attachedNotes = this.attachedNotes+this.taxpayerDetails["Off_notesSet"]["results"][i].Strline;
          }
        }
        // setTimeout(() => {
        //   
        // },1000);
        console.log(this.serviceStarts);
      })
    }
    else if (withholdingsobj["Fbtyp"] == "WHTM") {

      this.returnsService.getForm6TaxpayerDetails(withholdingsobj["Fbguid"], withholdingsobj["Euser"]).subscribe((data) => {
        console.log("Taxpayer Details", data)
        this.withholdingsObject = data["d"];
        this.taxpayerDetails = data["d"];
        // if (this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
          moment.locale('en-Us');

        // }
        this.periodStartDate = this.taxpayerDetails.APeriodFrom;
        this.periodEndDate = this.taxpayerDetails.APeriodTo;

        if (this.taxpayerDetails.ACalendarTp == "H" || this.taxpayerDetails.AYear < 1900) {
          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }


        this.disableInputs = false;
        if (data["d"]["Status"] == "IP014" || data["d"]["Status"] == "IP011") {
          this.step = 8;
          this.OnRefresh();
          this.disableInputs = true;
        }
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
        }
        this.serviceStarts = false;

        //Added by hema starts
        //this.notesAttached=this.taxpayerDetails["Off_notesSet"]["results"][0] || "";
        this.SetForms();
        //Added by hema ends

      })

    }

  }
  //To patch the values in forms after get the details of form9
  FormsSet() {
    window.scrollTo(0, 0);
    // alert('hi');
    if (this.withholdingDetailsObject["WHT9_L0001Set"]["results"].length == 0) {
      // alert('if');
      let i;
      this.OnAddForm(i)
    }
    else {
      // alert('else');
      // this.ClearFormArray(this.fields);

      for (let j = 0; j < (this.withholdingDetailsObject["WHT9_L0001Set"]["results"]).length; j++) {
        console.log('one');
        console.log(2);

        let form = this.AddForm9Form(j + 1);
        const forms = this.withHoldingForm9.get('fields') as FormArray;
        forms.push(form);

        forms.controls[j].patchValue({ 'CompanyName': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['CompNm'] || '' });
        forms.controls[j].patchValue({ 'Country': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ContreyKey'] || '' });
        forms.controls[j].patchValue({ 'typeOfService': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ServcTyp'] || '' });
        forms.controls[j].patchValue({ 'BeginningPeriodBalance': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['BeginBal'] || "0.00" });
        forms.controls[j].patchValue({ 'ServicesperformedThisYear': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ServcPerf'] || "0.00" });
        forms.controls[j].patchValue({ 'paidDuringtheYear': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['SrvcPaid'] || "0.00" });
        forms.controls[j].patchValue({ 'otherSettlements': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['OthSettlement'] || "0.00" });
        forms.controls[j].patchValue({ 'endofPeriodBalance': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['EndBal'] || "0.00" });
        forms.controls[j].patchValue({ 'paymentAmount': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['TaxAmt'] || "0.00" });
        forms.controls[j].patchValue({ 'taxRate': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['TaxRt'] || "0.00" });
        forms.controls[j].patchValue({ 'withHoldingTax': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['WithhldTax'] || "0.00" });
        forms.controls[j].patchValue({ 'fine': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['Fine'] || "0.00" });


      }
      this.Form9TotalCalculations();
    }

  }
  //To get the Form6 and Form9 return details
  GetWithHoldingTaxDetails(withholdingsobj) {

    if (withholdingsobj["Fbtyp"] == "WHT9") {

      this.GetTaxPayerDetails(withholdingsobj);
      setTimeout(() => {
        this.serviceStarts = false;
      }, 1000);
      // this.Type = this.StatusTpesSet["Type"];
      this.withholdingDetailsScreen = true;
      window.scrollTo(0, 0)
      this.step = 1;

    }
    else if (withholdingsobj["Fbtyp"] == "WHTM") {
      this.GetTaxPayerDetails(withholdingsobj);
      setTimeout(() => {
        this.serviceStarts = false;
      }, 1000);
      this.withholdingDetailsScreenForm6 = true;
      window.scrollTo(0, 0)
      this.step = 1;
    }


  }
  //To reset the forms of form9
  FormReset() {
    this.withHoldingForm9.reset();
    this.ClearFormArray(this.fields);
  }
  //To verify TaxRate validations in form9
  Form9Validations() {

    for (let m = 0; m < this.fields.controls.length; m++) {

      let country = this.fields.controls[m].value.Country;
      let type = this.fields.controls[m].value.typeOfService;
      let rate = this.fields.controls[m].value.taxRate.toString();
      // if(this.fields.controls[m].value.taxRate == ""){
      //   this.taxRateError = true;
      // }
      // else {
      //   this.taxRateError = false;
      // }
      console.log(country);
      console.log(type);
      console.log(rate);
      console.log('Tax Rates',this.taxRateList);

      let Rates = this.taxRateList.filter((data) => {
        if (data["Country"] == country && data["PaymentTp"] == type) {
          // /alert('hi')
          return data;

        }
      })
      console.log(Rates)
      // console.log(Rates[0].MinRt);
      // if((+rate) < Rates[0].MinRt || (+rate) > Rates[0].MaxRt) {
      //   window.alert('minrate'+Rates[0].MinRt +Rates[0].MaxRt);
      // }
      // const control1= (this.withHoldingForm9[m].get('fields').controls)as FormArray;
      if(Rates!=[])
      {
        const control1 = (this.withHoldingForm9.get('fields') as FormArray).controls[m];
        control1.patchValue({ 'minRate': +((Rates[0].MinRt)) });
        console.log(+((Rates[0].MinRt)));
        control1.patchValue({ 'maxRate': +((Rates[0].MaxRt)) });
        console.log(+((Rates[0].MaxRt)));
        if((+rate) < (+((Rates[0].MinRt))) || (+rate) > (+((Rates[0].MaxRt))) ) {
          this.taxRateError = true;
        control1.get('taxRate').setValidators([Validators.min(+((Rates[0].MinRt)))]);
        control1.get('taxRate').setValidators([Validators.max(+(Rates[0].MaxRt))]);
        }
        else if(rate == "") {
          this.taxRateError = true;
        control1.get('taxRate').setValidators([Validators.min(+((Rates[0].MinRt)))]);
        control1.get('taxRate').setValidators([Validators.max(+(Rates[0].MaxRt))]);
        }
        else {
          control1.get('taxRate').clearValidators();
          this.taxRateError = false;
        }
      }
     
      
      
    }
  }
  //To calculate the totals in form9
  Form9TotalCalculations() {

    this.totBeginingBalance = 0;
    this.totServices = 0;
    this.totYearPayments = 0;
    this.totOtherPayments = 0;
    this.totEndBalance = 0;
    this.totPaymentAmount = 0;
    this.totWithholdingAmnt = 0;
    this.totFines = 0;


    // this.totBeginingBalance = this.totBeginingBalance+(+this.withHoldingForm9.value.BeginningPeriodBalance);
    // this.totServices = this.totServices+(+this.withHoldingForm9.value.ServicesperformedThisYear);
    // this.totYearPayments = this.totYearPayments+(+this.withHoldingForm9.value.paidDuringtheYear);
    // this.totOtherPayments = this.totOtherPayments+(+this.withHoldingForm9.value.otherSettlements);
    // this.totEndBalance = this.totEndBalance+(+this.withHoldingForm9.value.endofPeriodBalance);
    // this.totPaymentAmount = this.totPaymentAmount+(+this.withHoldingForm9.value.paymentAmount);
    // this.totWithholdingAmnt = this.totWithholdingAmnt+(+this.withHoldingForm9.value.withHoldingTax);
    // this.totFines = this.totFines+(+this.withHoldingForm9.value.fine);
    this.fields = this.withHoldingForm9.get('fields') as FormArray;

    for (let j = 0; j < this.fields.controls.length; j++) {

      const field = this.withHoldingForm9.get('fields') as FormArray;

      console.log(this.fields.controls[j].value.BeginningPeriodBalance);


      this.totBeginingBalance = this.totBeginingBalance + (+this.fields.controls[j].value.BeginningPeriodBalance);
      this.totServices = this.totServices + (+this.fields.controls[j].value.ServicesperformedThisYear);
      this.totYearPayments = this.totYearPayments + (+this.fields.controls[j].value.paidDuringtheYear);
      this.totOtherPayments = this.totOtherPayments + (+this.fields.controls[j].value.otherSettlements);
      this.totEndBalance = this.totEndBalance + (+this.fields.controls[j].value.endofPeriodBalance);
      this.totPaymentAmount = this.totPaymentAmount + (+this.fields.controls[j].value.paymentAmount);
      this.totWithholdingAmnt = this.totWithholdingAmnt + (+this.fields.controls[j].value.withHoldingTax);
      this.totFines = this.totFines + (+this.fields.controls[j].value.fine);

    }

  }
//After clicking on agree and terms conditions to enable the button wrote this method
  EnableButton(event) {
    if (event.target.checked) {
      this.agree = true;
    }
  }
  //To validate the input file type
  ValidateFile(name: String) {
    // alert(name);
    // let filesize = 1000;
    var ext = name.substring(name.lastIndexOf('.') + 1);


    if (ext.toLowerCase() == 'pdf') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'xls') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'xlsx') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'doc') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'docx') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'png') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'jpg') {
      this.attachmentError = false;
      return true;
    }
    else if (ext.toLowerCase() == 'jpeg') {
      this.attachmentError = false;
      return true;
    }
    else {
      this.attachmentError = true;
      if (this.attachmentError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "اختر ملفًا بملحق .XLS ، .XLSX ، .DOC ، .DOCX ، .PDF ، .JPG ، .JPEG ، .PNG"

        }
        else {
          this.errorMessage = "Choose only file with extension .XLS, .XLSX, .DOC, .DOCX, .PDF, .JPG, .JPEG &.PNG";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }
  }
  //For FOrm9 attachments upload
  FileUpload(event) {
    console.log(this.taxpayerDetails.AttDetSet);
    console.log(event.target);

    //console.log(this.taxpayerDetails.AttDetSet['results'][0]['RetGuid'],this.taxpayerDetails.AttDetSet['results'][0].Dotyp ||,this.taxpayerDetails.AttDetSet['results'][0].SchGuid,this.taxpayerDetails.AttDetSet['results'][0].Doguid ||  );
    const frmData = new FormData();
    let filename;
    let filesize;

    filename = event.target.files[0]["name"];

    filesize = event.target.files[0]["size"];
    const fsize = Math.round((filesize / 1024));

    if(fsize == 0){
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر";
        }
        else {
          this.errorMessage = "File Name, Doc Type, Ret.Guid and File Content cannot be blank in action N";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }else if (fsize > 1024) {
      // alert('File size Exceed');
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "اعلى حجم للملف هو 1MB";
        }
        else {
          this.errorMessage = "Maximum file size is 1MB";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }


    if (!this.ValidateFile(event.target.files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }


    frmData.append("fileUpload", event.target.files[0]);
    this.returnsService.SaveAttachments(this.formSet["CaseGuid"], filename, frmData).subscribe((data) => {
      console.log(data)
      // this.returnsService.SaveAttachment(this.taxpayerDetails.CaseGuid,filename,frmData).subscribe((data)=>{
      //   console.log(data);
      this.errorFile = false;
      let obj = {
        "DocUrl": data["d"]["DocUrl"],
        "Mimetype": data["d"]["Mimetype"],
        "RetGuid": data["d"]["RetGuid"],
        "Seqno": "",
        "DataVersion": "",
        "SchGuid": data["d"]["SchGuid"],
        "Dotyp": data["d"]["Dotyp"],
        "Srno": data["d"]["Srno"],
        "Doguid": data["d"]["Doguid"],
        "AttBy": "TP",
        "Filename": data["d"]["Filename"],
        "FileExtn": data["d"]["Filename"].toString().split('.')[data["d"]["Filename"].toString().split('.').length - 1],
        "Enbedit": "",
        "Enbdele": "",
        "Visedit": "",
        "Visdel": ""
      }
      console.log(obj);
      this.taxpayerDetails.AttDetSet["results"].push(obj);
      console.log(this.taxpayerDetails.AttDetSet["results"]);
      this.myInputVariable.nativeElement.value = '';
    },
      err => {
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
          this.myInputVariable.nativeElement.value = '';
        }
        this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"]);

      });

    this.step = 3;
  }
//When click on save as draft in form9 this method will fire
  SaveDraft() {

    this.withholdingDetailsObject["Save"] = "X";
    this.withholdingDetailsObject["UserType"] = "TP";
    this.withholdingDetailsObject["WHT9_FORMSet"]["results"][0]["ADate"] = "\/Date(" + new Date().getTime() + ")\/";
    if (this.step >= 2) {
      for (let k = 0; k < this.fields.controls.length; k++) {

        const fieldsarray = this.withHoldingForm9.get('fields') as FormArray;
        if (k > 0) {
          console.log(k)
          this.withholdingDetailsObject["WHT9_L0001Set"]["results"].push({});
        }

        console.log(fieldsarray);
        console.log(this.withholdingDetailsObject["WHT9_L0001Set"]["results"])

        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["CompNm"] = fieldsarray.value[k].CompanyName;
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["ContreyKey"] = fieldsarray.controls[k].value.Country.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["ServcTyp"] = fieldsarray.controls[k].value.typeOfService.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["BeginBal"] = fieldsarray.controls[k].value.BeginningPeriodBalance.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["ServcPerf"] = fieldsarray.controls[k].value.ServicesperformedThisYear.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["SrvcPaid"] = fieldsarray.controls[k].value.paidDuringtheYear.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["OthSettlement"] = fieldsarray.controls[k].value.otherSettlements.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["EndBal"] = fieldsarray.controls[k].value.endofPeriodBalance.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["TaxAmt"] = fieldsarray.controls[k].value.paymentAmount.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["TaxRt"] = fieldsarray.controls[k].value.taxRate.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["WithhldTax"] = fieldsarray.controls[k].value.withHoldingTax.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["Fine"] = fieldsarray.controls[k].value.fine.toString();
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["LineNo"] = k + 1;
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["RankingOrder"] = (99).toString();
        // this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["FormGuid"] = "005056B1365C1EEB86A119EE20EEA07E";
        // this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["DataVersion"] = "00001";
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["FormGuid"] = this.withholdingDetailsObject["WHT9_L0001Set"]["results"][0]["FormGuid"];
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["DataVersion"] = this.withholdingDetailsObject["WHT9_L0001Set"]["results"][0]["DataVersion"];


        this.Form9TotalCalculations();
      }


    }
    console.log("Save as Draft", this.withholdingDetailsObject);
    let Attachments = this.taxpayerDetails.AttDetSet["results"];
    this.withholdingDetailsObject.AttDetSet["results"] = []
    let obj = {
      // "Notes":this.notesAttached,
      // "Name":"",
      // "Date":new Date(),
      // "Time":new Date().getTime()


      AttByz: "TP",
      ByGpartz: this.withholdingsObject["Gpartz"],
      // DataVersionz: "00000",
      // ElemNo: 0,
      // Erfdtz: null,
      // Erftmz: null,
      // Erfusrz: "",
      // Lineno: 1,
      // Noteno: "2",
      // Notenoz: "2",
      // Rcodez: "WHTM_ST03",
      // Refnamez: "",
      // Tdformat: "",
      Tdline: this.attachedNotes
      // XInvoicez: "",
      // XObsoletez: "",
    }
    this.taxpayerDetails["Off_notesSet"]["results"].push(obj);
    this.returnsService.submitWithHoldingsForm9(this.withholdingDetailsObject).subscribe((data) => {
      console.log("return success", data);
      this.taxpayerDetails = data["d"];
      this.withholdingDetailsObject = data["d"];
      this.formSet = data["d"]["WHT9_FORMSet"]["results"][0] || [];
      this.taxpayerDetails.AttDetSet["results"] = Attachments;
      if(this.taxpayerDetails["NOTESSet"]["results"].length > 0) {
        for(let i=0;i<this.taxpayerDetails["Off_notesSet"]["results"].length;i++) {
          this.attachedNotes = this.attachedNotes+this.taxpayerDetails["Off_notesSet"]["results"][i].Strline;
        }
      }
      // this.taxpayerDetails["Off_notesSet"]["results"] =  this.attachedNotes;
      // this.WHTFormDetails();
      // if (this.language == 'ar') {
      //   moment.locale('ar-Sa');
      // }
      // else {
        moment.locale('en-Us');

      // }
      this.periodStartDate = this.formSet.APeriodFrom;
        this.periodEndDate = this.formSet.APeriodTo;
        console.log('Test Date', this.periodStartDate);
        if (this.formSet.ACalendarTp == "H" || this.taxpayerDetails.PeriodKey < 1900) {
          // alert('in')

          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }

      this.formDataSet = data["d"]["WHT9_L0001Set"]["results"] || [];
      this.taxpayerDetailsObject = JSON.parse(localStorage.getItem("ReturnObj"));
      // // this.GetUserDetails();
      // // this.getWithHoldings();
      // // this.FormReset();
      // let whtObj = { "Status": this.retrunObjStatus, "Euser": (this.retrunObjStatus) ? "0000000000000000000000" + this.withholdingsObject["d"]["Gpartz"] : '', "Fbguid": this.Fbguid, "Gpart": this.withholdingsObject["d"]["Gpartz"], "Fbtyp": this.Fbtyp };
      // this.GetTaxPayerDetails(whtObj);
      // setTimeout(() => {
      //   this.serviceStarts = false;
      // }, 1000);   
      jQuery("#SuccessModal").modal('show');
    })
  }
//When we click on submit button in form9 this method will fire and
  OnSubmit() {
    this.withholdingDetailsObject["Submit"] = "X";
    this.withholdingDetailsObject["UserType"] = "TP";
    this.withholdingDetailsObject["WHT9_FORMSet"]["results"][0]["ADate"] = "\/Date(" + new Date().getTime() + ")\/";

    // this.withholdingsObject["WHT9_L0001Set"]["results"]['CompNm'] = this.withHoldingForm9.value.CompanyName;
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['ContreyKey'] = this.withHoldingForm9.value.Country.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['Type'] = this.withHoldingForm9.value.typeOfService.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['BeginBal'] = this.withHoldingForm9.value.BeginningPeriodBalance.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['ServcPerf'] = this.withHoldingForm9.value.ServicesperformedThisYear.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['SrvcPaid'] = this.withHoldingForm9.value.paidDuringtheYear.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['OthSettlement'] = this.withHoldingForm9.value.otherSettlements.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['EndBal'] = this.withHoldingForm9.value.endofPeriodBalance.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['TaxAmt'] = this.withHoldingForm9.value.paymentAmount.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['TaxRt'] = this.withHoldingForm9.value.taxRate.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['WithhldTax'] = this.withHoldingForm9.value.withHoldingTax.toString();
    // this.withholdingsObject["WHT9_L0001Set"]["results"]['Fine'] = this.withHoldingForm9.value.fine.toString();
    for (let k = 0; k < this.fields.controls.length; k++) {

      const fieldsarray = this.withHoldingForm9.get('fields') as FormArray;
      if (k > 0) {
        console.log(k)
        this.withholdingDetailsObject["WHT9_L0001Set"]["results"].push({});
      }

      console.log(fieldsarray);
      console.log(this.withholdingDetailsObject["WHT9_L0001Set"]["results"])

      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["CompNm"] = fieldsarray.value[k].CompanyName;
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["ContreyKey"] = fieldsarray.controls[k].value.Country.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["ServcTyp"] = fieldsarray.controls[k].value.typeOfService.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["BeginBal"] = fieldsarray.controls[k].value.BeginningPeriodBalance.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["ServcPerf"] = fieldsarray.controls[k].value.ServicesperformedThisYear.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["SrvcPaid"] = fieldsarray.controls[k].value.paidDuringtheYear.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["OthSettlement"] = fieldsarray.controls[k].value.otherSettlements.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["EndBal"] = fieldsarray.controls[k].value.endofPeriodBalance.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["TaxAmt"] = fieldsarray.controls[k].value.paymentAmount.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["TaxRt"] = fieldsarray.controls[k].value.taxRate.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["WithhldTax"] = fieldsarray.controls[k].value.withHoldingTax.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["Fine"] = fieldsarray.controls[k].value.fine.toString();
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["LineNo"] = k + 1;
      // this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["FormGuid"] = "005056B1365C1EEB86A119EE20EEA07E";
      // this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["DataVersion"] = "00001";
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["FormGuid"] = this.withholdingDetailsObject["WHT9_L0001Set"]["results"][0]["FormGuid"];
      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["DataVersion"] = this.withholdingDetailsObject["WHT9_L0001Set"]["results"][0]["DataVersion"];

      this.withholdingDetailsObject["WHT9_L0001Set"]["results"][k]["RankingOrder"] = (99).toString();

    }
    let obj = {
      // "Notes":this.notesAttached,
      // "Name":"",
      // "Date":new Date(),
      // "Time":new Date().getTime()


      AttByz: "TP",
      ByGpartz: this.withholdingsObject["Gpartz"],
      // DataVersionz: "00000",
      // ElemNo: 0,
      // Erfdtz: null,
      // Erftmz: null,
      // Erfusrz: "",
      // Lineno: 1,
      // Noteno: "2",
      // Notenoz: "2",
      // Rcodez: "WHTM_ST03",
      // Refnamez: "",
      // Tdformat: "",
      Tdline: this.notesAttached
      // XInvoicez: "",
      // XObsoletez: "",
    }
    this.taxpayerDetails["Off_notesSet"]["results"].push(obj);

    console.log("Final submit", this.withholdingDetailsObject);
    this.returnsService.submitWithHoldingsForm9(this.withholdingDetailsObject).subscribe((data) => {
      console.log("return success", data);
      this.taxpayerDetails = data["d"];
      this.withholdingDetailsObject = data["d"];
      this.formSet = data["d"]["WHT9_FORMSet"]["results"][0] || [];
      console.log(this.formSet);
      // if (this.language == 'ar') {
      //   moment.locale('ar-Sa');
      // }
      // else {
        moment.locale('en-Us');

      // }
      this.periodStartDate = this.formSet.APeriodFrom;
        this.periodEndDate = this.formSet.APeriodTo;
        console.log('Test Date', this.periodStartDate);
        if (this.formSet.ACalendarTp == "H" || this.taxpayerDetails.PeriodKey < 1900) {
          // alert('in')

          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }

      this.formDataSet = data["d"]["WHT9_L0001Set"]["results"] || [];
      this.OnRefresh();
      this.FormReset();
      // this.getWithHoldings();

      setTimeout(() => {
        this.step = 6;
      }, 500);
    })

  }
  //To download the form9 acknowledgement we use this method
  DownloadAcknowledgement() {
    console.log(this.withholdingDetailsObject["Fbnum"])
    this.returnsService.DownloadAcknowledgement(this.withholdingDetailsObject["Fbnum"]).subscribe((data: any) => {
      FileSaver.saveAs(data, "Form9Acknowledgement.pdf");
    })
  }
  //To download the form9 form we use this method
  DownloadForm() {
    console.log(this.withholdingDetailsObject["Fbnum"])
    this.returnsService.onDownloadForm(this.withholdingDetailsObject["Fbnum"]).subscribe((data: any) => {
      FileSaver.saveAs(data, "Form9.pdf");
    })
  }
  //To validate the WHT amount in form9
  ValidateWhtAmount() {
    this.fields = this.withHoldingForm9.get('fields') as FormArray;
    for (let m = 0; m < this.fields.controls.length; m++) {
      let paymentAmount = this.fields.controls[m].value.paymentAmount.toString();
      let withHoldingTax = this.fields.controls[m].value.withHoldingTax.toString();
      // alert(withHoldingTax);
      // alert(paymentAmount);

      if ((+withHoldingTax) >= (+paymentAmount)) {
        // alert('hlo')
        
        const control3 = (this.withHoldingForm9.get('fields') as FormArray).controls[m];
        control3.patchValue({ 'withholdingamountError': true });
        this.whtamountError = true;
        console.log('WHTError',control3['withholdingamountError']);
        if (control3['withholdingamountError'] == true) {
          control3.patchValue({ 'withHoldingTax': 0.00 })

        }
      }
      else if ((+withHoldingTax) < (+paymentAmount)) {
        // alert('in')
        const control4 = (this.withHoldingForm9.get('fields') as FormArray).controls[m];
        control4.patchValue({ 'withholdingamountError': false });
        this.whtamountError = false;
        // this.fields.status == 'Valid';
      }
    }
  }
  //To validate the fields in form9
  ValidateForm() {
    this.fields = this.withHoldingForm9.get('fields') as FormArray;

    for (let l = 0; l < this.fields.controls.length; l++) {

      // for(let l=0;l<(this.withholdingDetailsObject["WHT9_L0001Set"]["results"]).length;l++) {

      const array = this.withHoldingForm9.get('fields') as FormArray;

      if (array.controls[l].value.BeginningPeriodBalance < 0 || array.controls[l].value.BeginningPeriodBalance > 99999999999999.99) {
        array.controls[l].patchValue({ 'BeginningPeriodBalance': "0.00" });
      }
      if (array.controls[l].value.ServicesperformedThisYear < 0 || array.controls[l].value.ServicesperformedThisYear > 99999999999999.99) {
        array.controls[l].patchValue({ 'ServicesperformedThisYear': "0.00" });
      }
      if (array.controls[l].value.paidDuringtheYear < 0 || array.controls[l].value.paidDuringtheYear > 99999999999999.99) {
        array.controls[l].patchValue({ 'paidDuringtheYear': "0.00" });
      }
      // if (array.controls[l].value.otherSettlements < 0 || array.controls[l].value.otherSettlements > 99999999999999.99) {
      //   array.controls[l].patchValue({ 'otherSettlements': "0.00" });
      // }
      if (array.controls[l].value.endofPeriodBalance < 0 || array.controls[l].value.endofPeriodBalance > 99999999999999.99) {
        array.controls[l].patchValue({ 'endofPeriodBalance': "0.00" });
      }
      if (array.controls[l].value.paymentAmount < 0 || array.controls[l].value.paymentAmount > 99999999999999.99) {
        array.controls[l].patchValue({ 'paymentAmount': "0.00" });
      }
      // if (array.controls[l].value.taxRate < 0 || array.controls[l].value.taxRate > 99.99) {

      //   array.controls[l].patchValue({ 'taxRate': "0.00" });
      // }
      if (array.controls[l].value.withHoldingTax < 0 || array.controls[l].value.withHoldingTax > 99999999999999.99) {
        array.controls[l].patchValue({ 'withHoldingTax': "0.00" });
      }
      if (array.controls[l].value.fine < 0 || array.controls[l].value.fine > 99999999999999.99) {
        array.controls[l].patchValue({ 'fine': "0.00" });
      }

      array.controls[l].patchValue({ 'BeginningPeriodBalance': (parseFloat(this.fields.controls[l].value.BeginningPeriodBalance).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'ServicesperformedThisYear': (parseFloat(this.fields.controls[l].value.ServicesperformedThisYear).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'paidDuringtheYear': (parseFloat(this.fields.controls[l].value.paidDuringtheYear).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'otherSettlements': (parseFloat(this.fields.controls[l].value.otherSettlements).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'endofPeriodBalance': (parseFloat(this.fields.controls[l].value.endofPeriodBalance).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'paymentAmount': (parseFloat(this.fields.controls[l].value.paymentAmount).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'taxRate': (parseFloat(this.fields.controls[l].value.taxRate).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'withHoldingTax': (parseFloat(this.fields.controls[l].value.withHoldingTax).toFixed(2)) || "0.00" });
      array.controls[l].patchValue({ 'fine': (parseFloat(this.fields.controls[l].value.fine).toFixed(2)) || "0.00" });
    }
    console.log(this.fields.status);

    if (this.fields.status != "INVALID") {
      this.WithHoldingsCalculations();
    }
  }
//To delete the attachment
  OnDeleteAttachement(obj) {
    this.returnsService.DeleteAttachement(obj['RetGuid'], obj['Dotyp'], obj['SchGuid'], obj['Srno'], obj['Doguid']).subscribe((data) => {
      console.log(data);
      this.taxpayerDetails.AttDetSet["results"] = this.taxpayerDetails.AttDetSet["results"].filter(data => {
        return data['Filename'] != obj['Filename']
      });
      if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
        this.errorFile = true;
      }
    }, err => {
      console.error();
    });
  }
//To allow decimal only inputs
  GlobalNumberAllow(event) {
    var rgx = /^[0-9]*\.?[0-9]*$/;

    if (rgx.test(event.target.value)) {
      return true;

    }
    else if (event.keyCode == 32) {
      return false;
    }
  }
  //To allow numbers only in inputs
  NumberAllow(event) {
    var rgx = /^[0-9]*/;
    if (rgx.test(event.target.value)) {
      return true;

    }
    else if (event.keyCode == 32) {
      return false;
    }
  }
  //To restrict the starting space in input
  SpaceValidator(event) {
    if (!event.target.value.length && event.keyCode == 32) {
      event.preventDefault();
    }
  }
  //To Cancel Form9 Drafted Return//
  CancelForm9Return() {
    this.withholdingDetailsObject["Save"] = "";
    this.withholdingDetailsObject["Submit"] = "";
    this.withholdingDetailsObject["UserType"] = "TP";
    this.withholdingDetailsObject["WHT9_FORMSet"]["results"][0]["ADate"] = "\/Date(" + new Date().getTime() + ")\/";
    this.withholdingDetailsObject["Xvoid"] = "X";
    this.returnsService.submitWithHoldingsForm9(this.withholdingDetailsObject).subscribe((data) => {
        console.log("Cancel success", data);
        this.taxpayerDetails = data["d"];
        this.withholdingDetailsObject = data["d"];
        this.formSet = data["d"]["WHT9_FORMSet"]["results"][0] || [];
        jQuery("#VoidModal1").modal("hide");
      this.router.navigateByUrl("/mains/returns/search");
    });

  }

 

  //Added by hema for from6 starts
  AddForm6() {
    // this.returnsService.GetMonthsYears(this.CalendarType).subscribe((data:any)=>{
    //   console.log(data[0]);
    //   this.monthsYearsSet=data;
    //   console.log(this.monthsYearsSet);
    //   jQuery("#AddForm6Modal").modal('show');
    // });   

  }
  CalendarTypeChange() {
    // this.returnsService.GetMonthsYears(this.CalendarType).subscribe((data)=>{
    //   this.monthsYearsSet=data;
    // });
    if (this.calendarType == 'G') {
      this.monthsYearsSet[0].Year = this.year_En;
      this.monthsYearsSet[1].Month = this.month_En;
    }
    else if (this.calendarType == 'H') {
      this.monthsYearsSet[0].Year = this.year_H;
      this.monthsYearsSet[1].Month = this.month_H;
    }
  }
  //To create the new form6 return 
  Form6Creation() {
    this.returnsService.Form6Creation(this.withholdingsObject["d"]['Gpartz'], this.createdForm6Year, this.createdForm6Month, this.calendarType, this.withholdingsObject["d"]["Euser"]).subscribe((data) => {
      console.log(data);
      jQuery("#AddForm6Modal").modal('hide');
      if (data[0]["d"]) {
        this.returnsService.getForm6TaxpayerDetails(data[0]["d"]["Guid"], this.withholdingsObject["d"]["Euser"]).subscribe((data) => {
          console.log("Taxpayer Details", data)
          this.withholdingsObject = data["d"];
          this.taxpayerDetails = data["d"];
          this.startDate = new Date(this.taxpayerDetails.AFiscalYear, this.taxpayerDetails.AMonth - 1, 1);
          this.endDate = new Date(this.taxpayerDetails.AFiscalYear, this.taxpayerDetails.AMonth, 0);
          console.log(this.startDate, this.endDate)
          this.withholdingDetailsScreenForm6 = true;
          this.FormsCreation();
        })

      }
    }, err => {
      console.log(err)
      console.log(err.error.error.innererror.errordetails[0].message)
      this.notifierService.notify(
        "error",
        err.error.error.innererror.errordetails[0].message
      );
    });
  }
  //To addforms in form6

  FormsCreation() {
    for (let i = 1; i < this.Type.length; i++) {
      let type = this.AddTypeForm(this.Type[i].Text, this.Type[i].Key);
      this.Types.push(type);
    }
    console.log(this.Types);
    this.newForm6 = true;
  }
  //To return the new form in schdule
  AddTypeForm(typeName, ScheduleType) {
    return this.fb.group({
      "TypeName": [typeName, Validators.required],
      "ActionType": ['FillManually', Validators.required],
      "TypeOfPayments": this.fb.array([]),
      "ScheduleApplicable": [false],
      "PaymentTotal": ['0.00', Validators.required],
      "WithheldTaxAmount": ['0.00', Validators.required],
      "ScheduleType": [ScheduleType]
    })
  }
  //To return the payment form group
  AddPayment(i, typeName) {
    return this.fb.group({
      "SerialNo": [i, Validators.required],
      "TypeOfPayment": [typeName, Validators.required],
      "RecipientName": [null, Validators.required],
      "Country": [null, Validators.required],
      "DateofPayment": [null, Validators.required],
      "CalendarType": ['G'],
      "PaymentTotal": ['0.00', Validators.required],
      "TaxRate": ['0.00', Validators.required],
      "Amountoftaxwithheld": ['0.00', Validators.required],
      "MinRate": [0],
      "MaxRate": [0],
      "MinDate":[null],
      "MaxDate":[null]
    });
  }
  //When we change the applicable value
  ScheduleApplicableChange(type, index, event) {
    if (event.target.checked) {
      this.typeIndex = index;
      this.Types.controls[index]['ScheduleApplicable'] = true;
      //this is for newly created things
      const TypeOfPayments = this.Types.controls[index].get('TypeOfPayments') as FormArray;
      console.log(TypeOfPayments.controls.length);
      if (this.newForm6 || TypeOfPayments.controls.length == 0) {
        let payment = this.AddPayment(1, type.value.TypeName);
        console.log(this.Types);
        // const TypeOfPayments=this.Types.controls[index].get('TypeOfPayments') as FormArray;
        TypeOfPayments.push(payment);
        this.DateChange(index,0);
        console.log(TypeOfPayments);
      }

      console.log(this.Types.controls[0].get('TypeOfPayments').value);
      setTimeout(() => {
        this.show = true;
        jQuery("#infoModal").modal('show');
      }, 500);
    }
    else {
      this.Types.controls[index].patchValue({ 'ScheduleApplicable': false });
      this.Types.controls[index].patchValue({ 'PaymentTotal': '0.00' });
      this.Types.controls[index].patchValue({ 'WithheldTaxAmount': '0.00' });
      const TypeOfPayments = this.Types.controls[index].get('TypeOfPayments') as FormArray;
      this.ClearFormArray(TypeOfPayments);
      this.AllSchedulePaymentsTotal();
    }

  }
//To clear the form array
  ClearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  //To add form in payments array
  AddForm(pi) {
    let payment = this.AddPayment((this.Types.controls[pi].get('TypeOfPayments') as FormArray).length + 1, this.Types.controls[pi].value.TypeName);
    console.log(this.Types);
    const TypeOfPayments = this.Types.controls[pi].get('TypeOfPayments') as FormArray;
    TypeOfPayments.push(payment);
  }
  //To delete form
  DeletePayment(childIndex, parentIndex) {
    const control = this.Types.controls[parentIndex].get('TypeOfPayments') as FormArray;
    console.log(control, childIndex)
    control.removeAt(childIndex);
    this.ScheduleTotalCalculation(parentIndex);
  }
  //To add the multiple forms in payments
  AddMultipleForms(pi) {
    const TypeOfPayments = this.Types.controls[pi].get('TypeOfPayments') as FormArray;
    for (let i = 0; i < this.noOfAddedForms; i++) {
      let payment = this.AddPayment((this.Types.controls[pi].get('TypeOfPayments') as FormArray).length + 1, this.Types.controls[pi].value.TypeName);
      TypeOfPayments.push(payment);
    }
    jQuery("#addMultipleFormsModalform6").modal('hide');
    // jQuery('#addMultipleFormsModal').on('show.bs.modal', function (e) {
    jQuery('body').addClass('modalopen');

    // })
  }
  //To add css when opening modal
  AddPopup() {
    jQuery('body').addClass('modalopen');
  }
  //To get the countries list
  GetCountryList() {
    this.returnsService.getCountryList().subscribe((data) => {
      console.log("Country List", data)
      this.countryList = data["d"]["results"];
    });
    this.returnsService.getTaxRates().subscribe((response) => {
      console.log("taxRates", response)
      this.taxRatesList = response["d"]["results"];
    })
  }
  //Payment according to country change
  PaymentCountryChange(parentIndex, childIndex) {
    const control = this.Types.controls[parentIndex].get('TypeOfPayments') as FormArray;
    console.log(this.Type.filter((data) => { return data.Text == this.Types.controls[parentIndex].value.TypeName }))
    let tp = this.Type.filter((data) => { return data.Text == this.Types.controls[parentIndex].value.TypeName })[0]['Key'];
    let trate;
    console.log(tp)
    for(let i = 0 ;i<control.controls.length;i++) {
      trate = control.controls[i].value.TaxRate.toString();
      if(trate == ''){
        this.taxRateError = true;
      }
      else {
        this.taxRateError = false;
      }

    }
    let minMaxRates = this.taxRatesList.filter(data => {
      if (data.PaymentTp == tp && data.Country == control.value[childIndex].Country) {
        return data
      }
    });
    const control1 = (this.Types.controls[parentIndex].get('TypeOfPayments') as FormArray).controls[childIndex];
    control1.patchValue({ 'MinRate': +((minMaxRates[0].MinRt)) });
    control1.patchValue({ 'MaxRate': +((minMaxRates[0].MaxRt)) });
    if((+trate) < (+((minMaxRates[0].MinRt))) || (+trate) > (+((minMaxRates[0].MaxRt))) ) {
    control1.get('TaxRate').setValidators([Validators.min(+((minMaxRates[0].MinRt)))]);
    control1.get('TaxRate').setValidators([Validators.max(+(minMaxRates[0].MaxRt))]);
    this.taxRateError = true;
    }
    else {
      control1.get('TaxRate').clearValidators();
      this.taxRateError = false;
    }
    
  }
  PaymentCalculation(pi, ci) {
    console.log('status', this.Types.status);
    this.ScheduleTotalCalculation(pi);
    if (this.Types.status != "INVALID") {
      
      this.TaxWithheldCalculation(pi, ci);
      
    }
  }
  //To calculate the with held calculation
  TaxWithheldCalculation(pi, ci) {
    const control2 = this.Types.controls[pi].get('TypeOfPayments') as FormArray;
    console.log(this.Type.filter((data) => { return data.Text == this.Types.controls[pi].value.TypeName }))
    let tp = this.Type.filter((data) => { return data.Text == this.Types.controls[ci].value.TypeName })[0]['Key'];
    let tRate;
    for(let i = 0 ;i<control2.controls.length;i++) {
      tRate = control2.controls[i].value.TaxRate.toString();
      if(tRate == ''){
        this.taxRateError = true;
      }
      else {
        this.taxRateError = false;
      }
    }
    console.log(tp)
    if (control2.value[ci].Country) {
      let minMaxRates = this.taxRatesList.filter(data => {
        if (data.PaymentTp == tp && data.Country == control2.value[ci].Country) {
          return data
        }
      });
      const control3 = (this.Types.controls[pi].get('TypeOfPayments') as FormArray).controls[ci];
      control3.patchValue({ 'MinRate': +((minMaxRates[0].MinRt)) });
      control3.patchValue({ 'MaxRate': +((minMaxRates[0].MaxRt)) });

      // control3.get('TaxRate').clearValidators();
      // console.log('one',control3)
      if((+tRate) < (+((minMaxRates[0].MinRt))) || (+tRate) > (+((minMaxRates[0].MaxRt))) ) {
        control3.get('TaxRate').setValidators([Validators.min(+((minMaxRates[0].MinRt)))]);
      control3.get('TaxRate').setValidators([Validators.max(+(minMaxRates[0].MaxRt))]);
      this.taxRateError = true;
      }
      else {
        control3.get('TaxRate').clearValidators();
        this.taxRateError = false;
      }
      
      // console.log('two',control3)
      
      const control1 = (this.Types.controls[pi].get('TypeOfPayments') as FormArray).controls[ci];
      if (control1.get('TaxRate').valid) {
        let taxWithheldValue = (((+(control1.get('PaymentTotal').value)) * (+(control1.get('TaxRate').value))) / 100)
        control1.patchValue({ 'Amountoftaxwithheld': +(parseFloat(taxWithheldValue.toString()).toFixed(2)) });
        this.ScheduleTotalCalculation(pi);
      }
      else {
        console.log("invalid tax rates");
        this.taxRateError = true;
        
      }
    }

  }
  //To calculate the totals in schedules
  ScheduleTotalCalculation(pi) {
    const control1 = this.Types.controls[pi];
    console.log(control1);
    control1.patchValue({ 'PaymentTotal': 0.00 });
    control1.patchValue({ 'WithheldTaxAmount': 0.00 });
    let paymentTotal = 0;
    let WithheldTaxAmount = 0;
    for (let i = 0; i < (control1.get('TypeOfPayments') as FormArray).controls.length; i++) {
      console.log((control1.get('TypeOfPayments') as FormArray).value[i]['PaymentTotal'])
      paymentTotal = paymentTotal + (+((control1.get('TypeOfPayments') as FormArray).value[i]['PaymentTotal']));
      WithheldTaxAmount = WithheldTaxAmount + (+((control1.get('TypeOfPayments') as FormArray).value[i]['Amountoftaxwithheld']));
    }
    console.log(paymentTotal, WithheldTaxAmount, control1)
    control1.patchValue({ 'PaymentTotal': +(parseFloat(paymentTotal.toString()).toFixed(2)) });
    control1.patchValue({ 'WithheldTaxAmount': +(parseFloat(WithheldTaxAmount.toString()).toFixed(2)) });
  }
  //To valida the date in schedule
  DateChange(pi, ci) {
    // if (this.language == 'ar') {
    //   moment.locale('ar-Sa')
    // }
    // else {
      moment.locale('en-Us');
    // }


    const control1 = this.Types.controls[pi];
    const control2 = (control1.get('TypeOfPayments') as FormArray).controls[ci];
    console.log(control2.value.DateofPayment)
   // control2.patchValue({ 'DateofPayment': control2.value.DateofPayment });
    control2.patchValue({ 'CalendarType': control2.value.DateofPayment["calendarName"] == "Gregorian"?"G":"H"});
    console.log((+this.commonValidation.changeDate2(control2.value.DateofPayment).toString().split('-')[0]));
    if(control2.value.CalendarType=='H')
    {
      let date=this.commonValidation.changeDate4(this.commonValidation.dateFormate(this.commonValidation.toJulianDate1(new Date(this.startDate)),"Islamic"));
      let date1=this.commonValidation.changeDate4(this.commonValidation.dateFormate(this.commonValidation.toJulianDate1(new Date(this.endDate)),"Islamic"));
      if (moment(this.commonValidation.changeDate4(control2.value.DateofPayment),'YYYY-MM-DD').diff(moment(date,'YYYY-MM-DD'),"days")<0 || moment(this.commonValidation.changeDate4(control2.value.DateofPayment),'YYYY-MM-DD').diff(moment(date1,'YYYY-MM-DD'),"days")>0) {
        control2.patchValue({ 'DateofPayment': '' });
      }

      control2.patchValue({ 'MinDate':new Date(date) });
      control2.patchValue({ 'MaxDate':new Date(date1) });
      
    }
    else
    {
      let date=this.commonValidation.changeDate2(this.commonValidation.toJulianDate1(new Date(this.startDate)));
      let date1=this.commonValidation.changeDate2(this.commonValidation.toJulianDate1(new Date(this.endDate)));
      if (date.toString().split('-')[1] != this.commonValidation.changeDate2(control2.value.DateofPayment).toString().split('-')[1] || date.toString().split('-')[0] != this.commonValidation.changeDate2(control2.value.DateofPayment).toString().split('-')[0]) {
        control2.patchValue({ 'DateofPayment': '' });
      }
      control2.patchValue({ 'MinDate':new Date(date) });
      control2.patchValue({ 'MaxDate':new Date(date1) });
    }
    //if(this.taxpayerDetails.AMonth.toString()!=control2.value.DateofPayment.calendarStart.month.toString() || this.taxpayerDetails.AFiscalYear.toString()!=control2.value.DateofPayment.calendarStart.year.toString())
    //this.taxpayerDetails.AMonth.toString() != control2.value.DateofPayment.toString().split('-')[1] || this.taxpayerDetails.AFiscalYear.toString() != control2.value.DateofPayment.toString().split('-')[0]
  
    // control2.patchValue({'DateofPayment':"2018-12-03"});
  }
  //To calculate the all total payments
  AllSchedulePaymentsTotal() {
    this.totalSchedulePayment = 0.00;
    this.totalWithHeldAmount = 0.00;
    console.log(this.Types)
    for (let i = 0; i < this.Types.value.length; i++) {
      this.totalSchedulePayment = this.totalSchedulePayment + (+this.Types.value[i].PaymentTotal);
      this.totalWithHeldAmount = this.totalWithHeldAmount + (+this.Types.value[i].WithheldTaxAmount);
    }
    // this.totalSchedulePayment = +(parseFloat(this.totalSchedulePayment.toString()).toFixed(2));
    console.log(this.totalSchedulePayment, this.totalWithHeldAmount)
    console.log(this.taxpayerDetails.Taxpayerz, this.taxpayerDetails.PeriodKeyz, this.taxpayerDetails.RegIdz, this.taxpayerDetails.Fbnumz, this.totalWithHeldAmount);
    this.GetExtraTaxCalculation(this.taxpayerDetails.Taxpayerz, this.taxpayerDetails.PeriodKeyz, this.taxpayerDetails.RegIdz, this.taxpayerDetails.Fbnum, this.totalWithHeldAmount);
    this.FormChecking();
  }
  //To get the form6 details
  WHTFormDetails() {
    if (this.fbTyp == "WHTM") {
      this.returnsService.getForm6TaxpayerDetails(this.taxpayerDetails["Fbguid"], this.taxpayerDetails["Euser"]).subscribe((data) => {
        console.log("Taxpayer Details", data)
        // this.withholdingsObject = data["d"];
        // this.taxpayerDetails = data["d"];
        this.taxpayerDetails.AttDetSet["results"] = data["d"]["AttDetSet"]["results"];

        // if (this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
          moment.locale('en-Us');

        // }
        this.periodStartDate = this.taxpayerDetails.APeriodFrom;
        this.periodEndDate = this.taxpayerDetails.APeriodTo;

        if (this.taxpayerDetails.ACalendarTp == "H" || this.taxpayerDetails.AYear < 1900) {
          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }
        // this.SetForms();
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
        }
      });
    }
    else if (this.fbTyp == "WHT9") {
      this.returnsService.getWithholdingTaxpayerDetails(this.taxpayerDetails["Fbguid"], this.taxpayerDetails["Euser"]).subscribe((data) => {

        console.log("Taxpayer Details", data)
        this.taxpayerDetails.AttDetSet["results"] = data["d"]["AttDetSet"]["results"];

        // this.withholdingDetailsObject = data["d"];
        // this.taxpayerDetails = data["d"];
        // this.formSet = data["d"]["WHT9_FORMSet"]["results"][0] || [];
        // if (this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
          moment.locale('en-Us');

        // }
        this.periodStartDate = this.formSet.APeriodFrom;
        this.periodEndDate = this.formSet.APeriodTo;
        console.log('Test Date', this.periodStartDate);
        // this.formSet.ACalendarTp == "H" || 
        if (this.taxpayerDetails.PeriodKey < 1900) {

          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }


        //this.periodStartDate = "\/Date=("+new Date((this.periodStartDate)).getTime()+")\/"//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,

        // console.log('Test DAte',this.periodStartDate)


        // PymntDt:"\/Date("+new Date(().getTime(this.formSet.value.APeriodFrom)+")\/",//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,

        // this.formDataSet = data["d"]["WHT9_L0001Set"]["results"] || [];
      });

    }
  }
  //To save the form6 when click on submit it will fire
  SaveForm6() {
    for (let i = 0; i < this.Types.value.length; i++) {
      if ((this.Types.controls[i].get('TypeOfPayments') as FormArray).length > 0) {
        let paymetsList: IPayment[] = [];
        for (let j = 0; j < (this.Types.controls[i].get('TypeOfPayments') as FormArray).length; j++) {
          // var payment:payment={
          //   PymntDtTp:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.CalendarType,
          //   Mandt: this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["Mandt"],
          //   FormGuid: this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["FormGuid"],
          //   DataVersion: this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["DataVersion"],
          //   LineNo:this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["LineNo"],
          //   RankingOrder:this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RankingOrder"],
          //   SrNo:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.SerialNo.toString(),
          //   RcipntNm:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.RecipientName.toString(),//this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RcipntNm"],
          //   TyPymnt:this.Types.controls[i].value.ScheduleType.toString(),//"01",//this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RcipntNm"],
          //   Country:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.Country,
          //   PymntDt:"\/Date("+new Date((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment).getTime()+")\/",//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,
          //   PymntTot:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.PaymentTotal.toString(),
          //   TaxRt:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.TaxRate.toString(),
          //   AmtWthld:(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.Amountoftaxwithheld.toString(),
          //   Waers:this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["Waers"]
          // };
          // if (this.language == 'ar') {
          //   moment.locale('ar-Sa');
          // }
          // else {
            moment.locale('en-Us');
          // }
          var payment: IPayment = {
            PymntDtTp: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.CalendarType,
            Mandt: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["Mandt"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["Mandt"] : "",
            FormGuid: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["FormGuid"],
            DataVersion: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["DataVersion"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["DataVersion"] : "",
            LineNo: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["LineNo"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["LineNo"] : 0,
            RankingOrder: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["RankingOrder"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["RankingOrder"] : "99",
            SrNo: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.SerialNo.toString(),
            RcipntNm: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.RecipientName.toString(),//this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RcipntNm"],
            TyPymnt: this.Types.controls[i].value.ScheduleType.toString(),//"01",//this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RcipntNm"],
            Country: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.Country,
          //  PymntDt: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment ? "\/Date(" + new Date((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment).getTime() + ")\/" : null,//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,
            PymntDt: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment ? this.commonValidation.changeDate1((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment) : null,
            PymntTot: parseFloat((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.PaymentTotal.toString()).toFixed(2),
            TaxRt: parseFloat((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.TaxRate.toString()).toFixed(2),
            AmtWthld: parseFloat((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.Amountoftaxwithheld.toString()).toFixed(2),
            Waers: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["Waers"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["Waers"] : ""
          };
          //this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"].push(payment);
          paymetsList.push(payment);
        }
        this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"] = [];
        this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"] = paymetsList;
        //this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"].splice(0,1);
      }

    }
    
    this.taxpayerDetails["Savez"] = "";
    this.taxpayerDetails["ASignDt"] = "\/Date(" + new Date().getTime() + ")\/";
    this.taxpayerDetails["ASignDt2"] = "\/Date(" + new Date().getTime() + ")\/";
    this.taxpayerDetails["AAgree"] = "X";
    this.taxpayerDetails["Submitz"] = "X";
    this.taxpayerDetails["ARentPaid"] = this.Types.controls[0].value.PaymentTotal.toString();
    this.taxpayerDetails["ARoyaltyPaid"] = this.Types.controls[1].value.PaymentTotal.toString();
    this.taxpayerDetails["AMgmtFeesPaid"] = this.Types.controls[2].value.PaymentTotal.toString();
    this.taxpayerDetails["AAirticketsPaid"] = this.Types.controls[3].value.PaymentTotal.toString();
    this.taxpayerDetails["AShipmentPaid"] = this.Types.controls[4].value.PaymentTotal.toString();
    this.taxpayerDetails["APhonePaid"] = this.Types.controls[5].value.PaymentTotal.toString();
    this.taxpayerDetails["AMainPaid"] = this.Types.controls[6].value.PaymentTotal.toString();
    this.taxpayerDetails["ACompanyPaid"] = this.Types.controls[7].value.PaymentTotal.toString();
    this.taxpayerDetails["ADividentsPaid"] = this.Types.controls[8].value.PaymentTotal.toString();
    this.taxpayerDetails["ATechnicalPaid"] = this.Types.controls[9].value.PaymentTotal.toString();
    this.taxpayerDetails["ALoansTax"] = this.Types.controls[10].value.PaymentTotal.toString();
    this.taxpayerDetails["APremiumPaid"] = this.Types.controls[11].value.PaymentTotal.toString();
    this.taxpayerDetails["AOtherPaymentsPaid"] = this.Types.controls[12].value.PaymentTotal.toString();
    this.taxpayerDetails["ARentTax"] = this.Types.controls[0].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ARoyaltyTax"] = this.Types.controls[1].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AMgmtFeesTax"] = this.Types.controls[2].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AAirticketsTax"] = this.Types.controls[3].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AShipmentTax"] = this.Types.controls[4].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["APhoneTax"] = this.Types.controls[5].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AMainPaidTax"] = this.Types.controls[6].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ACompanyPaidTax"] = this.Types.controls[7].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ADividentsTax"] = this.Types.controls[8].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ATechnicalTax"] = this.Types.controls[9].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ALoansTax"] = this.Types.controls[10].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["APremiumTax"] = this.Types.controls[11].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AOtherTax"] = this.Types.controls[12].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AMonthGrossTax"] = (parseFloat(this.totalWithHeldAmount.toString()).toFixed(2)).toString();
    this.taxpayerDetails["ASumTotalPayment"] = (parseFloat(this.totalSchedulePayment.toString()).toFixed(2)).toString();
    this.taxpayerDetails["AFinesOwedTax"] = parseFloat((this.totalWithHeldAmount + this.taxpayerDetails["ADemurrageTax"])).toFixed(2).toString();


    let obj = {
      // "Notes":this.notesAttached,
      // "Name":"",
      // "Date":new Date(),
      // "Time":new Date().getTime()


      AttByz: "TP",
      ByGpartz: this.withholdingsObject["Gpartz"],
      // DataVersionz: "00000",
      // ElemNo: 0,
      // Erfdtz: null,
      // Erftmz: null,
      // Erfusrz: "",
      // Lineno: 1,
      // Noteno: "2",
      // Notenoz: "2",
      // Rcodez: "WHTM_ST03",
      // Refnamez: "",
      // Tdformat: "",
      Tdline: this.notesAttached
      // XInvoicez: "",
      // XObsoletez: "",
    }
    this.taxpayerDetails["Off_notesSet"]["results"].push(obj);
    if(this.isAmendment) {
      if(this.taxpayerDetails == this.withholdingsObject) {
        jQuery("#AttachmentModal").modal('show');
        if(this.language == 'ar'){
          this.errorMessage = 'لايمكنك التقديم لعدم وجود تعديلات جديدة'
        }
        else{
          this.errorMessage = "No Changes made so cannot submit"
        }
      }
      else if(this.notesAttached == '') {
        jQuery("#AttachmentModal").modal('show');
        if(this.language == 'ar'){
          this.errorMessage = 'الرجاء إدخال أسباب التعديل على الخطوة بالضغط على ملاحظات'
        }
        else{
          this.errorMessage = "Please enter reason for change on current section using section notes"
        }
      }
      else {
        this.taxpayerDetails["SelfAmd"] = "X"
        this.returnsService.SaveForm6Details(this.taxpayerDetails).subscribe((data) => {
          this.taxpayerDetails = data["d"];
    
          // if (this.language == 'ar') {
          //   moment.locale('ar-Sa');
          // }
          // else {
            moment.locale('en-Us');
    
          // }
          this.periodStartDate = this.taxpayerDetails.APeriodFrom;
            this.periodEndDate = this.taxpayerDetails.APeriodTo;
    
            if (this.taxpayerDetails.ACalendarTp == "H" || this.taxpayerDetails.AYear < 1900) {
              this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
              this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
            }
            else {
              this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
              this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
            }
          if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
            this.errorFile = true;
          }
    
          this.step = 7;
          this.OnRefresh();
          this.ResetForms();
        },
        err => {
          this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"]);
        });
      }
    }
    else {

      this.returnsService.SaveForm6Details(this.taxpayerDetails).subscribe((data) => {
        this.taxpayerDetails = data["d"];
  
        // if (this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
          moment.locale('en-Us');
  
        // }
        this.periodStartDate = this.taxpayerDetails.APeriodFrom;
          this.periodEndDate = this.taxpayerDetails.APeriodTo;
  
          if (this.taxpayerDetails.ACalendarTp == "H" || this.taxpayerDetails.AYear < 1900) {
            this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
            this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          }
          else {
            this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
            this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          }
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
        }
  
        this.step = 7;
        this.OnRefresh();
        this.ResetForms();
      },
      err => {
        this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"]);
      });

    }
  }
  //To get the extra calculation
  GetExtraTaxCalculation(taxPayer, periodKey, regId, fbnum, grossTax) {
    this.returnsService.GetExtraTaxCalculation(taxPayer, periodKey, regId, fbnum, grossTax).subscribe((data) => {
      console.log("data", data);
      this.taxpayerDetails["ADemurrageTax"] = parseFloat(data["d"]["IntAmt"]).toFixed(2);
      this.taxpayerDetails["AFinesOwedTax"] = parseFloat((+(this.totalWithHeldAmount) + (+this.taxpayerDetails["ADemurrageTax"])).toString()).toFixed(2);
    });
  }
  //To save form6 schedule wise
  SaveSchedules() {
    for (let i = 0; i < this.Types.value.length; i++) {
      if ((this.Types.controls[i].get('TypeOfPayments') as FormArray).length > 0) {
        let paymentsList: IPayment[] = [];
        for (let j = 0; j < (this.Types.controls[i].get('TypeOfPayments') as FormArray).length; j++) {
          console.log(this.taxpayerDetails,i,j);
          console.log(this.Types.controls[i].value.ScheduleType);
          // if (this.language == 'ar') {
          //   moment.locale('ar-Sa');
          // }
          // else {
          //   moment.locale('en-Us');
          // }
        //  console.log(this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][j]["Mandt"]);
          moment.locale('en-Us');
          var payment: IPayment = {
            PymntDtTp: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.CalendarType,
           Mandt: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["Mandt"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["Mandt"] : "",
            FormGuid: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["FormGuid"],
            DataVersion: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["DataVersion"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["DataVersion"] : "",
            LineNo: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["LineNo"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["LineNo"] : 0,
            RankingOrder: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["RankingOrder"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["RankingOrder"] : "99",
            SrNo: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.SerialNo.toString(),
            RcipntNm: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.RecipientName.toString(),//this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RcipntNm"],
            TyPymnt: this.Types.controls[i].value.ScheduleType.toString(),//"01",//this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"][0]["RcipntNm"],
            Country: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.Country,
            //PymntDt: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment ? "\/Date(" + new Date((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment).getTime() + ")\/" : null,//(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment,
            PymntDt: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment ? this.commonValidation.changeDate1((this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.DateofPayment) : null,
            PymntTot: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.PaymentTotal.toString(),
            TaxRt: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.TaxRate.toString(),
            AmtWthld: (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].value.Amountoftaxwithheld.toString(),
            Waers: this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["Waers"] ? this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"][0]["Waers"] : ""
          };
          //this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"].push(payment);
          paymentsList.push(payment);
        }
        this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"] = [];
        this.taxpayerDetails["Sch_" + this.Types.controls[i].value.ScheduleType + "Set"]["results"] = paymentsList;
        //this.taxpayerDetails["Sch_"+this.Types.controls[i].value.ScheduleType+"Set"]["results"].splice(0,1);
      }

    }
    this.taxpayerDetails["ASignDt"] = "\/Date(" + new Date().getTime() + ")\/";
    this.taxpayerDetails["ASignDt2"] = "\/Date(" + new Date().getTime() + ")\/";
    this.taxpayerDetails["ARentPaid"] = this.Types.controls[0].value.PaymentTotal.toString();
    this.taxpayerDetails["ARoyaltyPaid"] = this.Types.controls[1].value.PaymentTotal.toString();
    this.taxpayerDetails["AMgmtFeesPaid"] = this.Types.controls[2].value.PaymentTotal.toString();
    this.taxpayerDetails["AAirticketsPaid"] = this.Types.controls[3].value.PaymentTotal.toString();
    this.taxpayerDetails["AShipmentPaid"] = this.Types.controls[4].value.PaymentTotal.toString();
    this.taxpayerDetails["APhonePaid"] = this.Types.controls[5].value.PaymentTotal.toString();
    this.taxpayerDetails["AMainPaid"] = this.Types.controls[6].value.PaymentTotal.toString();
    this.taxpayerDetails["ACompanyPaid"] = this.Types.controls[7].value.PaymentTotal.toString();
    this.taxpayerDetails["ADividentsPaid"] = this.Types.controls[8].value.PaymentTotal.toString();
    this.taxpayerDetails["ATechnicalPaid"] = this.Types.controls[9].value.PaymentTotal.toString();
    this.taxpayerDetails["ALoansTax"] = this.Types.controls[10].value.PaymentTotal.toString();
    this.taxpayerDetails["APremiumPaid"] = this.Types.controls[11].value.PaymentTotal.toString();
    this.taxpayerDetails["AOtherPaymentsPaid"] = this.Types.controls[12].value.PaymentTotal.toString();
    this.taxpayerDetails["ARentTax"] = this.Types.controls[0].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ARoyaltyTax"] = this.Types.controls[1].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AMgmtFeesTax"] = this.Types.controls[2].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AAirticketsTax"] = this.Types.controls[3].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AShipmentTax"] = this.Types.controls[4].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["APhoneTax"] = this.Types.controls[5].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AMainPaidTax"] = this.Types.controls[6].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ACompanyPaidTax"] = this.Types.controls[7].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ADividentsTax"] = this.Types.controls[8].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ATechnicalTax"] = this.Types.controls[9].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["ALoansTax"] = this.Types.controls[10].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["APremiumTax"] = this.Types.controls[11].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AOtherTax"] = this.Types.controls[12].value.WithheldTaxAmount.toString();
    this.taxpayerDetails["AMonthGrossTax"] = (parseFloat(this.totalWithHeldAmount.toString()).toFixed(2)).toString();
    this.taxpayerDetails["ASumTotalPayment"] = (parseFloat(this.totalSchedulePayment.toString()).toFixed(2)).toString();
    let attachmentsList = this.taxpayerDetails.AttDetSet["results"]
    this.taxpayerDetails.AttDetSet["results"] = []
    this.taxpayerDetails["Savez"] = "X";
    this.taxpayerDetails["AAgree"] = "X";
    this.returnsService.SaveForm6Details(this.taxpayerDetails).subscribe((data) => {
      console.log(data);
      this.taxpayerDetails = data["d"];
      // this.taxpayerDetails.AttDetSet["results"] = data["d"]["AttDetSet"]["results"];
      this.periodStartDate = this.taxpayerDetails.APeriodFrom;
        this.periodEndDate = this.taxpayerDetails.APeriodTo;

        if (this.taxpayerDetails.ACalendarTp == "H" || this.taxpayerDetails.AYear < 1900) {
          this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
          this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
        }
        else {
          this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
          this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');
        }
      // this.SetForms();
      this.Types.controls[0].patchValue({ 'PaymentTotal': this.taxpayerDetails["ARentPaid"] });
      this.Types.controls[1].patchValue({ 'PaymentTotal': this.taxpayerDetails["ARoyaltyPaid"] });
      this.Types.controls[2].patchValue({ 'PaymentTotal': this.taxpayerDetails["AMgmtFeesPaid"] });
      this.Types.controls[3].patchValue({ 'PaymentTotal': this.taxpayerDetails["AAirticketsPaid"] });
      this.Types.controls[4].patchValue({ 'PaymentTotal': this.taxpayerDetails["AShipmentPaid"] });
      this.Types.controls[5].patchValue({ 'PaymentTotal': this.taxpayerDetails["APhonePaid"] });
      this.Types.controls[6].patchValue({ 'PaymentTotal': this.taxpayerDetails["AMainPaid"] });
      this.Types.controls[7].patchValue({ 'PaymentTotal': this.taxpayerDetails["ACompanyPaid"] });
      this.Types.controls[8].patchValue({ 'PaymentTotal': this.taxpayerDetails["ADividentsPaid"] });
      this.Types.controls[9].patchValue({ 'PaymentTotal': this.taxpayerDetails["ATechnicalPaid"] });
      this.Types.controls[10].patchValue({ 'PaymentTotal': this.taxpayerDetails["ALoansTax"] });
      this.Types.controls[11].patchValue({ 'PaymentTotal': this.taxpayerDetails["APremiumPaid"] });
      this.Types.controls[12].patchValue({ 'PaymentTotal': this.taxpayerDetails["AOtherPaymentsPaid"] });
      this.Types.controls[0].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ARentTax"] });
      this.Types.controls[1].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ARoyaltyTax"] });
      this.Types.controls[2].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AMgmtFeesTax"] });
      this.Types.controls[3].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AAirticketsTax"] });
      this.Types.controls[4].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AShipmentTax"] });
      this.Types.controls[5].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["APhoneTax"] });
      this.Types.controls[6].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AMainPaidTax"] });
      this.Types.controls[7].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ACompanyPaidTax"] });
      this.Types.controls[8].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ADividentsTax"] });
      this.Types.controls[9].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ATechnicalTax"] });
      this.Types.controls[10].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ALoansTax"] });
      this.Types.controls[11].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["APremiumTax"] });
      this.Types.controls[12].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AOtherTax"] });
      console.log(this.Types);
      this.AllSchedulePaymentsTotal();
      // this.WHTFormDetails();
      this.taxpayerDetails.AttDetSet["results"] = attachmentsList
      jQuery("#SuccessModal").modal('show');
    })

    jQuery('body').removeClass('modalopen');

  }
  //To remove css of scroll
  ClsePopup() {
    this.GetTaxPayerDetails(this.whtObj);
    jQuery('body').removeClass('modalopen');
    setTimeout(() => {
      jQuery('#infoModal').modal('hide');
    },200);
    

  }
//To upload file in general attachments
  UploadGeneralAttachment(event) {
    console.log(this.taxpayerDetails.AttDetSet);
    const frmData = new FormData();
    let filename;
    let filesize;

    filesize = event.target.files[0]["size"];
    const fsize = Math.round((filesize / 1024));

    if (fsize > 1024) {
      // alert('File size Exceed');
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "اعلى حجم للملف هو 1MB";

        }
        else {
          this.errorMessage = "Maximum file size is 1MB";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }
    filename = event.target.files[0]["name"];
    if (!this.ValidateFile(event.target.files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }
    frmData.append("fileUpload", event.target.files[0]);
    this.returnsService.SaveAttachment(this.taxpayerDetails.CaseGuid, filename, frmData, 'RT06').subscribe((data) => {
      console.log(data);
      this.errorFile = false;
      let obj = {
        "DocUrl": data["d"]["DocUrl"],
        "Mimetype": data["d"]["Mimetype"],
        "RetGuid": data["d"]["RetGuid"],
        "Seqno": "",
        "DataVersion": "",
        "SchGuid": data["d"]["SchGuid"],
        "Dotyp": data["d"]["Dotyp"] || "RT06",
        "Srno": data["d"]["Srno"],
        "Doguid": data["d"]["Doguid"],
        "AttBy": "TP",
        "Filename": data["d"]["Filename"],
        "FileExtn": data["d"]["Filename"].toString().split('.')[data["d"]["Filename"].toString().split('.').length-1],
        "Enbedit": "",
        "Enbdele": "",
        "Visedit": "",
        "Visdel": ""
      }
      this.taxpayerDetails.AttDetSet["results"].push(obj);
      console.log(this.taxpayerDetails.AttDetSet["results"])
      this.myInputVariable1.nativeElement.value = '';
    },
      err => {
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
          this.myInputVariable1.nativeElement.value = '';
        }
        // this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"]);

      });
  }
  //To upload file in form6
  UploadFile(event) {
    console.log(this.taxpayerDetails.AttDetSet);

    //console.log(this.taxpayerDetails.AttDetSet['results'][0]['RetGuid'],this.taxpayerDetails.AttDetSet['results'][0].Dotyp ||,this.taxpayerDetails.AttDetSet['results'][0].SchGuid,this.taxpayerDetails.AttDetSet['results'][0].Doguid ||  );
    const frmData = new FormData();
    let filename;
    let filesize;

    filesize = event.target.files[0]["size"];
    const fsize = Math.round((filesize / 1024));

    if (fsize > 10240) {
      // alert('File size Exceed');
      this.fileSizeError = true;
      if (this.fileSizeError == true) {
        if (this.language == 'ar') {
          this.errorMessage = "اعلى حجم للملف هو 10MB"

        }
        else {
          this.errorMessage = "Maximum file size is 10MB";
        }
        jQuery("#AttachmentModal").modal('show');
        return false;
      }
    }

    filename = event.target.files[0]["name"];
    if (!this.ValidateFile(event.target.files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }
    frmData.append("fileUpload", event.target.files[0]);
    this.returnsService.SaveAttachment(this.taxpayerDetails.CaseGuid, filename, frmData, 'R06A').subscribe((data) => {
      console.log(data);
      this.errorFile = false;
      let obj = {
        "DocUrl": data["d"]["DocUrl"],
        "Mimetype": data["d"]["Mimetype"],
        "RetGuid": data["d"]["RetGuid"],
        "Seqno": "",
        "DataVersion": "",
        "SchGuid": data["d"]["SchGuid"],
        "Dotyp": data["d"]["Dotyp"] || "R06A",
        "Srno": data["d"]["Srno"],
        "Doguid": data["d"]["Doguid"],
        "AttBy": "TP",
        "Filename": data["d"]["Filename"],
        "FileExtn": data["d"]["Filename"].toString().split('.')[data["d"]["Filename"].toString().split('.').length-1],
        "Enbedit": "",
        "Enbdele": "",
        "Visedit": "",
        "Visdel": ""
      }
      // this.taxpayerDetails.AttDetSet["results"] = this.taxpayerDetails.AttDetSet["results"].filter(data => { return data.Dotyp != 'R06A' })
      this.taxpayerDetails.AttDetSet["results"].push(obj);
      console.log(this.taxpayerDetails.AttDetSet["results"])
      this.myInputVariable2.nativeElement.value = '';
    },
      err => {
        if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
          this.errorFile = true;
          this.myInputVariable2.nativeElement.value = '';
        }
        // this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"]);

      });
    // this.step=5;
  }
  //To save notes in form6
  SaveNotes() {
    console.log(this.notesAttached);
    let obj = {
      "ByGpartz": this.withholdingsObject["Gpartz"],
      "Notenoz": "001",
      "DataVersionz": "00000",
      "Refnamez": "",
      "Namez": this.taxpayerDetails.ATaxpayerNm,
      "Tdformat": "",
      "Sect": "MAIN FORM",
      "Tdline": "",
      "Strdt": moment(new Date()).format("YYYY/MM/DD"),//"2020/11/02",
      "XInvoicez": "",
      "Strtime": moment(new Date().getTime()).format("HH:MM:SS"),
      "XObsoletez": "",
      "Rcodez": "WHTM_ST03",
      "Strline": this.notesAttached,
      "Erfusrz": this.withholdingsObject["Gpartz"],
      "Erfdtz": "\/Date(" + new Date().getTime() + ")\/",
      "Erftmz": null,
      "AttByz": "TP",
      "Noteno": "000",
      "Lineno": 0,
      "ElemNo": 0
    }
    this.taxpayerDetails["Off_notesSet"]["results"].push(obj);
  }
  //when click on refresh button in ackowledgement screen
  OnRefresh() {
    this.returnsService.generateSadadNumber(this.taxpayerDetails.Fbnum).subscribe((data) => {
      console.log(data);
      this.taxpayerDetails.Sopbel = data["d"]["results"][0]["Sopbel"];
      // this.taxpayerDetails.AFinesOwedTax = data["d"]["results"][0]["Betrh"];
    });
  }
  //To download the form6 ackowledgement
  OnDownloadAcknowledgement() {
    console.log(this.taxpayerDetails.Fbnum);
    this.returnsService.DownloadAcknowledgement(this.taxpayerDetails.Fbnum).subscribe((data: any) => {
      console.log(data);
      FileSaver.saveAs(data, "Form6Acknowledgement.pdf");

    });
  }
  //To download the form6 form
  onDownloadForm6() {
    console.log(this.taxpayerDetails["Fbnum"]);
    // window.alert('hi');
    this.returnsService.onDownloadForm(this.taxpayerDetails.Fbnum).subscribe((data: any) => {
      FileSaver.saveAs(data, "Form6.pdf");
    })
  }
  //To patch the get values in form6
  SetForms() {
    this.agreeForm6 = this.taxpayerDetails.AAgree == "X" ? true : false;
    this.ClearFormArray(this.Types);
    for (let i = 1; i < this.Type.length; i++) {
      let type = this.AddTypeForm(this.Type[i].Text, this.Type[i].Key);
      this.Types.push(type);
      for (let j = 0; j < (this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"]).length; j++) {
        let payment = this.AddPayment(j + 1, this.Types.controls[i - 1].value.TypeName);
        const TypeOfPayments = this.Types.controls[i - 1].get('TypeOfPayments') as FormArray;
        TypeOfPayments.push(payment);
        (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'RecipientName': this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["RcipntNm"] });
        (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'Country': this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["Country"] });
        // this.taxpayerDetails["Sch_"+this.Type[i].Key+"Set"]["results"][j]["PymntDt"].toString().split('(')[1]
        // console.log((this.taxpayerDetails["Sch_"+this.Type[i].Key+"Set"]["results"][j]["PymntDt"].toString().replace('/(Date','')));
        // let date=(this.taxpayerDetails["Sch_"+this.Type[i].Key+"Set"]["results"][j]["PymntDt"].toString().replace('/(Date',''));
        // console.log(date);
        // console.log(moment(new Date(+(((this.taxpayerDetails["Sch_"+this.Type[i].Key+"Set"]["results"][j]["PymntDt"]).toString().replace(')','')).toString().replace('/Date(','')).toString().replace('/',''))).format('YYYY-MM-DD'));
        // if (this.language == 'ar') {
        //   moment.locale('ar-Sa');
        // }
        // else {
        //   moment.locale('en-Us');
        // }
        moment.locale('en-Us');
        if (this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDt"] != null) {
          let date;
          if (this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDtTp"] == "G") {
            date = moment(new Date(+(((this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDt"]).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
            console.log(date);
            date = this.commonValidation.toJulianDate1(new Date(date));
            //this.DateChangeHijri("Gregorian");
            //date = this.commonValidation.dateFormate(new Date(date), "Gregorian");
          }
          else if (this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDtTp"] == "H") {
            // let obj = (toHijri(+(moment(new Date(+(((this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDt"]).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date()).format('MM')), (+moment(new Date()).format('DD'))));
            // date=obj.hy+"-"+obj.hm+"-"+obj.hd;
            // console.log("phanio", date);
            date = moment(new Date(+(((this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDt"]).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
            date = this.commonValidation.toJulianDate1(new Date(date));
            date = this.commonValidation.dateFormate(date, "Islamic");
            //this.appService.updatedDataSelection1("Islamic");
            //this.DateChangeHijri("Islamic");
            //console.log("phanic", date);
          }

          (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'DateofPayment': date });
          //console.log('Date', moment(new Date(+(((this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDt"]).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD'));
        }
        else {
          (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'DateofPayment': "" });
        }

        (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'CalendarType': this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntDtTp"] });
        (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'PaymentTotal': this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["PymntTot"] });
        (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'TaxRate': this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["TaxRt"] });
        (this.Types.controls[i - 1].get('TypeOfPayments') as FormArray).controls[j].patchValue({ 'Amountoftaxwithheld': this.taxpayerDetails["Sch_" + this.Type[i].Key + "Set"]["results"][j]["AmtWthld"] });
      }

    }
    console.log(this.Types);
    this.Types.controls[0].value.PaymentTotal = this.taxpayerDetails["ARentPaid"];
    this.Types.controls[0].patchValue({ 'PaymentTotal': this.taxpayerDetails["ARentPaid"] });
    this.Types.controls[1].patchValue({ 'PaymentTotal': this.taxpayerDetails["ARoyaltyPaid"] });
    this.Types.controls[2].patchValue({ 'PaymentTotal': this.taxpayerDetails["AMgmtFeesPaid"] });
    this.Types.controls[3].patchValue({ 'PaymentTotal': this.taxpayerDetails["AAirticketsPaid"] });
    this.Types.controls[4].patchValue({ 'PaymentTotal': this.taxpayerDetails["AShipmentPaid"] });
    this.Types.controls[5].patchValue({ 'PaymentTotal': this.taxpayerDetails["APhonePaid"] });
    this.Types.controls[6].patchValue({ 'PaymentTotal': this.taxpayerDetails["AMainPaid"] });
    this.Types.controls[7].patchValue({ 'PaymentTotal': this.taxpayerDetails["ACompanyPaid"] });
    this.Types.controls[8].patchValue({ 'PaymentTotal': this.taxpayerDetails["ADividentsPaid"] });
    this.Types.controls[9].patchValue({ 'PaymentTotal': this.taxpayerDetails["ATechnicalPaid"] });
    this.Types.controls[10].patchValue({ 'PaymentTotal': this.taxpayerDetails["ALoansTax"] });
    this.Types.controls[11].patchValue({ 'PaymentTotal': this.taxpayerDetails["APremiumPaid"] });
    this.Types.controls[12].patchValue({ 'PaymentTotal': this.taxpayerDetails["AOtherPaymentsPaid"] });
    this.Types.controls[0].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ARentTax"] });
    this.Types.controls[1].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ARoyaltyTax"] });
    this.Types.controls[2].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AMgmtFeesTax"] });
    this.Types.controls[3].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AAirticketsTax"] });
    this.Types.controls[4].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AShipmentTax"] });
    this.Types.controls[5].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["APhoneTax"] });
    this.Types.controls[6].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AMainPaidTax"] });
    this.Types.controls[7].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ACompanyPaidTax"] });
    this.Types.controls[8].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ADividentsTax"] });
    this.Types.controls[9].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ATechnicalTax"] });
    this.Types.controls[10].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["ALoansTax"] });
    this.Types.controls[11].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["APremiumTax"] });
    this.Types.controls[12].patchValue({ 'WithheldTaxAmount': this.taxpayerDetails["AOtherTax"] });
    this.totalWithHeldAmount = +(this.taxpayerDetails["AMonthGrossTax"]);
    this.totalSchedulePayment = +(this.taxpayerDetails["ASumTotalPayment"]);
    for (let i = 0; i < this.Types.controls.length; i++) {
      if (this.Types.controls[i].value.PaymentTotal > 0 || this.Types.controls[i].value.WithheldTaxAmount > 0) {
        this.Types.controls[i].patchValue({ 'ScheduleApplicable': true });
      }
      else {
        this.Types.controls[i].patchValue({ 'ScheduleApplicable': false });
      }
    }
    // if (this.language == 'ar') {
    //   moment.locale('ar-Sa')
    // }
    // else {
      moment.locale('en-Us');
    // }
    this.startDate = new Date(this.taxpayerDetails.AFiscalYear, this.taxpayerDetails.AMonth - 1, 1);
    this.endDate = new Date(this.taxpayerDetails.AFiscalYear, this.taxpayerDetails.AMonth, 0);
    this.AllSchedulePaymentsTotal();
  }
  //To reset the forms in form6
  ResetForms() {
    this.withHoldingForm6.reset();
    this.ClearFormArray(this.Types);
    this.errorForm6 = false;
    this.errorFile = true;
  }
  //To enable the button after check terms and conditions
  EnableButton1(event) {
    if (event.target.checked) {
      this.agreeForm6 = true;
    }
    else {
      this.agreeForm6 = false;
    }
  }
  //To open info modal
  InfoModalOpen(pi) {
    this.typeIndex = pi;
    this.show = true;
    jQuery("#infoModal").modal('show');

  }
  //To delete the attachments in form6
  DeleteAttachement(obj) {
    this.returnsService.DeleteAttachement(obj['RetGuid'], obj['Dotyp'], obj['SchGuid'], obj['Srno'], obj['Doguid']).subscribe((data) => {
      console.log(data);
      this.taxpayerDetails.AttDetSet["results"] = this.taxpayerDetails.AttDetSet["results"].filter(data => {
        return data['Filename'] != obj['Filename']
      });
      console.log(this.taxpayerDetails.AttDetSet["results"].length);
      // if (this.taxpayerDetails.AttDetSet["results"].length < 1) {
      //   this.errorFile = true;
      // }
      let count = 0;
      this.errorFile = false;
      this.taxpayerDetails.AttDetSet["results"].forEach(element => {
        if (element.Dotyp == 'R06A') {
          count++;
        }

      });
      if (count == 0) {
        this.errorFile = true;
      }
    }, err => {
      console.error();
    });
  }
  //To check the status of a forms
  FormChecking() {
    console.log(this.withHoldingForm6)
    this.errorForm6 = false;
    let count = 0;
    for (let i = 0; i < this.Types.length; i++) {
      console.log(this.Types.controls[i].value.ScheduleApplicable);
      if (this.Types.controls[i].value.ScheduleApplicable == true) {
        const TypeOfPayments = this.Types.controls[i].get('TypeOfPayments') as FormArray;
        console.log(TypeOfPayments.value)
        if (TypeOfPayments.value.status == "INVALID") {
          count++;
        }
      }
    }
    if (count > 0) {
      this.errorForm6 = true;
    }
    console.log(this.errorForm6);
  }

  //added by hema form6 ends
  //To validate the forms in form6
  ValidateForms() {
    for (let i = 0; i < this.Types.controls.length; i++) {
      console.log(this.Types.controls[i].value.PaymentTotal);
      let TypeOfPayments = this.Types.controls[i].get('TypeOfPayments') as FormArray;
      // console.log('types',TypeOfPayments.controls.length);
      for(let j=0;j < TypeOfPayments.controls.length;j++){
        if(TypeOfPayments.controls[j].value.PaymentTotal < 0 || TypeOfPayments.controls[j].value.PaymentTotal > 99999999999999.99) {
          TypeOfPayments.controls[j].patchValue({'PaymentTotal': "0.00"});
        }
        // if(TypeOfPayments.controls[j].value.TaxRate < 0 || TypeOfPayments.controls[j].value.TaxRate > 99.99) {
        //   TypeOfPayments.controls[j].patchValue({'TaxRate': "0.00"});
        // }
        if(TypeOfPayments.controls[j].value.Amountoftaxwithheld < 0 || TypeOfPayments.controls[j].value.Amountoftaxwithheld > 99999999999999.99) {
          TypeOfPayments.controls[j].patchValue({'Amountoftaxwithheld': "0.00"});
        }

        TypeOfPayments.controls[j].patchValue({ 'PaymentTotal': parseFloat(TypeOfPayments.controls[j].value.PaymentTotal).toFixed(2) || "0.00" });
        TypeOfPayments.controls[j].patchValue({ 'Amountoftaxwithheld': parseFloat(TypeOfPayments.controls[j].value.Amountoftaxwithheld).toFixed(2) || "0.00" });
        TypeOfPayments.controls[j].patchValue({ 'TaxRate': parseFloat(TypeOfPayments.controls[j].value.TaxRate).toFixed(2) || "0.00" });
      }

      if (this.Types.controls[i].value.PaymentTotal < 0 || this.Types.controls[i].value.PaymentTotal > 99999999999999.99) {
        this.Types.controls[i].patchValue({ 'PaymentTotal': "0.00" });
      }
      if (this.Types.controls[i].value.WithheldTaxAmount < 0 || this.Types.controls[i].value.WithheldTaxAmount > 99999999999999.99) {
        this.Types.controls[i].patchValue({ 'WithheldTaxAmount': "0.00" });
      }
      // for(let j=0;j<TypeOfPayments.controls.length;j++) {
      //   TypeOfPayments.controls[j].patchValue({'PaymentTotal':parseFloat(TypeOfPayments.controls[j].value.PaymentToal).toFixed(2)});
      //   // this.Types.controls[i].patchValue({'PaymentTotal':parseFloat(this.Types.controls[i].value.PaymentTotal).toFixed(2)});
      //   //(this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[j].patchValue({'PaymentTotal':parseFloat(this.Types.controls[i].get('TypeOfPayments').value.PaymentTotal).toFixed(2)});
      //   //  (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[i].patchValue({'TaxRate':parseFloat(this.Types.controls[i].get('TypeOfPayments').value.TaxRate).toFixed(2)});
      //   // (this.Types.controls[i].get('TypeOfPayments') as FormArray).controls[i].patchValue({'Amountoftaxwithheld':parseFloat(this.Types.controls[i].get('TypeOfPayments').value.Amountoftaxwithheld).toFixed(2)});
      // }
      // this.Types.controls[i].patchValue({ 'TaxRate': parseFloat(this.Types.controls[i].value.TaxRate).toFixed(2) || "0.00" });
      this.Types.controls[i].patchValue({ 'PaymentTotal': parseFloat(this.Types.controls[i].value.PaymentTotal).toFixed(2) || "0.00" });

      this.Types.controls[i].patchValue({ 'WithheldTaxAmount': parseFloat(this.Types.controls[i].value.WithheldTaxAmount).toFixed(2) || "0.00" });
    }

  }
  DateChangeHijri(value) {
    this.appService.ActiveFormat.next(value);
  }
//Form9 amendment 
  Amendment(){
    this.returnsService.getForm9AmendDetails(this.withholdingDetailsObject["Fbnum"]).subscribe((data)=>{
    console.log("AmendData", data);
    this.disableInputs = false;
    this.step=1;
    });
  }
  CancelForm6Return()
  {
    this.taxpayerDetails["Savez"] = "";
    this.taxpayerDetails["Submitz"] = "";
    this.taxpayerDetails["Xvoidz"] = "X";
    this.returnsService.SaveForm6Details(this.taxpayerDetails).subscribe((data) => {
      this.taxpayerDetails = data["d"];
      jQuery("#VoidModal").modal("hide");
      this.router.navigateByUrl("/mains/returns/search"); 
      
    });
  }

  //Form6 Amendment
  OnAmend() {
    this.returnsService.getForm6AmendDetails(this.taxpayerDetails.Fbnum).subscribe((data)=>{
      console.log('Amended Data',data);
      if(data['d']['Amdflg'] == 'Y') {
        this.disableInputs = false;
        this.step = 1;
        this.isAmendment = true;
      }
    })
  }

  //Upload Excel Form-9 and Form-6 starts

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  fileData: any;
  cancelUpload: boolean = false;

  YearlyWithholdingUploadFile(event) {
    jQuery("#YearlyWithholdingConfirmation").modal('show');
    this.fileData = event;
  }

  YearlyWithholdingUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles =  ["اسم الشركة","الدولة","نوع الخدمة","رصيد بداية الفترة","المنفذ خلال العام","المدفوع خلال العام","تسويات ( أخرى )","رصيد أخر الفترة","المبلغ المسدد عنه الضريبة","نسبة ضريبة الإستقطاع","الضريبة المسددة","الغرامة"]
    }
    else {
      headerTitles =  ["Company Name", "Country", "Type of Service", "Beginning of Period Balance", "Services Performed during the year", "Paid during the Year", "Other Settlements", "End of Period Balance", "Payment Amount", "Tax Rate %", "Withholding Tax Amount", "Fine"];
    }
    
    this.onFileUpload(this.fileData, headerTitles, "Form9Schedule");
  }

  PaymentIndex:number;
  TypeOfPaymentsUploadFile(index, event) {
    jQuery("#TypeOfPaymentsConfirmation").modal('show');
    this.PaymentIndex = index;
    this.fileData = event;
  }

  TypeOfPaymentsUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["اسم المستفيد","البلد","تاريخ العقد","تاريخ الدفع","اجمالي الدفع","معدل الضريبة %","قيمة الاستقطاع"];
    }
    else {
      headerTitles = ["Receipt Name",	"Country", "Calendar Type", "Date of Payment", "Payment Total", "Tax Rate %", "Amount of Tax With Held"];
    }
    this.onFileUpload(this.fileData, headerTitles, "Form6Schedule");
  }

  file: any;
  arrayBuffer: any;
  filelist: any[] = [];
  onFileUpload(event, headerTitles, scheduleNo) {
    if (!this.cancelUpload) {
      this.file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      let headerArray = new Array();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary", cellDates: true, dateNF: 'mm-dd-yyyy;@' });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        //console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]); 
        for (let i = 0; i < (XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]).toString().split(',').length; i++) {
          headerArray.push((XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]).toString().split(',')[i]);
        }
        console.log("headerArray", headerArray);
        let data1 = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(data1);
        //console.log(moment(new Date(data1[0]['Date'])).format('MM-DD-YYYY'));
        // var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
        //     this.filelist = [];    
        //     console.log(this.filelist) 



        let count = 0;
        let ColumnsHeaderArray = headerTitles;
        console.log(headerArray.length, ColumnsHeaderArray.length)
        if (headerArray.length == ColumnsHeaderArray.length) {
          for (let i = 0; i < headerArray.length; i++) {
            console.log(typeof (headerArray[i]))
            if (headerArray[i].trimRight() != ColumnsHeaderArray[i].trimRight()) {
              count++;
              break;
            }
          }
        }
        else {
          count++;
        }


        for (let i = 0; i < data1.length; i++) {
          if (Object.keys(data1[i]).indexOf("__EMPTY") != -1) {
            count++;
            break;
          }
        }

        if (count == 0 && data1.length > 0) {
          let newData = [];
          let obj = {};
          for (let i = 0; i < data1.length; i++) {
            obj = {};
            //to validate the data in the row
            for (let j = 0; j < headerArray.length; j++) {
              
              if(this.language  == 'ar') {
                if(headerArray[j] == "اسم الشركة") {
                  obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : null;
                }
                else {
                  obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : 0;
                }
              }
              else {
                // alert('hi');
                if(headerArray[j] == "Company Name") {
                  // alert('hi');
                  obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : null;
                }
                else {
                  obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : 0;
                }
              }
              
            }
            newData.push(obj);

          }
          console.log("newData", newData)
          if (scheduleNo == "Form9Schedule") {
            // for(let i=0;i<this.formDataSet.length;i++)
            // {
            //   if((this.formDataSet[i].CompNm==null)  && this.formDataSet[i].ContreyKey==null && this.formDataSet[i].ServcTyp==null && this.formDataSet[i].BeginBal=="0.00")
            //   {
            //     console.log("formform")
            //     this.DeleteForm(i)
            //   }
              
            // }
            
            this.fields = this.withHoldingForm9.get('fields') as FormArray;
            this.clearFormArray(this.fields);
            for (let j = 0; j < (this.withholdingDetailsObject["WHT9_L0001Set"]["results"]).length; j++) {
              console.log('one');
              console.log(2);
      
              let form = this.AddForm9Form(j + 1);
              //const forms = this.withHoldingForm9.get('fields') as FormArray;
              if((this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['CompNm']!=null)  && (this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ContreyKey'] !=null) && (this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ServcTyp']!=null) && (this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['BeginBal']!="0.00"))
              {
                this.fields.push(form);      
              this.fields.controls[j].patchValue({ 'CompanyName': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['CompNm'] || '' });
              this.fields.controls[j].patchValue({ 'Country': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ContreyKey'] || '' });
              this.fields.controls[j].patchValue({ 'typeOfService': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ServcTyp'] || '' });
              this.fields.controls[j].patchValue({ 'BeginningPeriodBalance': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['BeginBal'] || "0.00" });
              this.fields.controls[j].patchValue({ 'ServicesperformedThisYear': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['ServcPerf'] || "0.00" });
              this.fields.controls[j].patchValue({ 'paidDuringtheYear': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['SrvcPaid'] || "0.00" });
              this.fields.controls[j].patchValue({ 'otherSettlements': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['OthSettlement'] || "0.00" });
              this.fields.controls[j].patchValue({ 'endofPeriodBalance': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['EndBal'] || "0.00" });
              this.fields.controls[j].patchValue({ 'paymentAmount': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['TaxAmt'] || "0.00" });
              this.fields.controls[j].patchValue({ 'taxRate': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['TaxRt'] || "0.00" });
              this.fields.controls[j].patchValue({ 'withHoldingTax': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['WithhldTax'] || "0.00" });
              this.fields.controls[j].patchValue({ 'fine': this.withholdingDetailsObject["WHT9_L0001Set"]["results"][j]['Fine'] || "0.00" });
              }
            }
              let count=0;
              if(this.fields.controls.length>0)
              {
                count=this.fields.controls.length;
              }
              console.log("count",count);
              for (let i = 0; i < newData.length; i++) {
                this.OnAddForm(i);
                if(this.language == 'ar') {
                  this.fields.controls[count+i].patchValue({ "CompanyName": newData[i]["اسم الشركة"] });
                  this.fields.controls[count+i].patchValue({ "Country": this.countryList.filter(d=> d['Landx'] == newData[i]["الدولة"])[0]['Land1'] });
                  this.fields.controls[count+i].patchValue({ "typeOfService": this.serviceType.filter(d=> d['Text'] == newData[i]["نوع الخدمة"])[0]['Key'] });
                  this.fields.controls[count+i].patchValue({ "BeginningPeriodBalance": newData[i]["رصيد بداية الفترة"] });
                  this.fields.controls[count+i].patchValue({ "ServicesperformedThisYear": newData[i]["المنفذ خلال العام"] });
                  this.fields.controls[count+i].patchValue({ "paidDuringtheYear": newData[i]["المدفوع خلال العام"] });
                  this.fields.controls[count+i].patchValue({ "otherSettlements": newData[i]["تسويات ( أخرى )"] });
                  this.fields.controls[count+i].patchValue({ "endofPeriodBalance": newData[i]["رصيد أخر الفترة"] });
                  this.fields.controls[count+i].patchValue({ "paymentAmount": newData[i]["المبلغ المسدد عنه الضريبة"] });
                  this.fields.controls[count+i].patchValue({ "taxRate": newData[i]["نسبة ضريبة الإستقطاع"] });
                  this.fields.controls[count+i].patchValue({ "withHoldingTax": newData[i]["الضريبة المسددة"] });
                  this.fields.controls[count+i].patchValue({ "fine": newData[i]["الغرامة"] });
                }
                else {
                  this.fields.controls[count+i].patchValue({ "CompanyName": newData[i]["Company Name"] });
                  this.fields.controls[count+i].patchValue({ "Country": this.countryList.filter(d=> d['Landx'] == newData[i]["Country"])[0]['Land1'] });
                  this.fields.controls[count+i].patchValue({ "typeOfService": this.serviceType.filter(d=> d['Text'] == newData[i]["Type of Service"])[0]['Key'] });
                  this.fields.controls[count+i].patchValue({ "BeginningPeriodBalance": newData[i]["Beginning of Period Balance"] });
                  this.fields.controls[count+i].patchValue({ "ServicesperformedThisYear": newData[i]["Services Performed during the year"] });
                  this.fields.controls[count+i].patchValue({ "paidDuringtheYear": newData[i]["Paid during the Year"] });
                  this.fields.controls[count+i].patchValue({ "otherSettlements": newData[i]["Other Settlements"] });
                  this.fields.controls[count+i].patchValue({ "endofPeriodBalance": newData[i]["End of Period Balance"] });
                  this.fields.controls[count+i].patchValue({ "paymentAmount": newData[i]["Payment Amount"] });
                  this.fields.controls[count+i].patchValue({ "taxRate": newData[i]["Tax Rate %"] });
                  this.fields.controls[count+i].patchValue({ "withHoldingTax": newData[i]["Withholding Tax Amount"] });
                  this.fields.controls[count+i].patchValue({ "fine": newData[i]["Fine"] });
                }
                this.Form9Validations();
              }
              this.WithHoldingsCalculations();
              this.ValidateWhtAmount();            
              this.ValidateForm();
              
            

          }else if (scheduleNo == "Form6Schedule") {
            const TypeOfPayments = this.Types.controls[this.PaymentIndex].get('TypeOfPayments') as FormArray;
            this.clearFormArray(TypeOfPayments);           
            for (let i = 0; i < newData.length; i++) {
              this.AddForm(this.typeIndex);
              if(this.language == 'ar') {
                TypeOfPayments.controls[i].patchValue({ "RecipientName": newData[i]["اسم المستفيد"] });
                TypeOfPayments.controls[i].patchValue({ "Country": this.countryList.filter(d => d['Landx'] == newData[i]["البلد"].trim())[0]['Land1'] });
                TypeOfPayments.controls[i].patchValue({ "CalendarType": newData[i]["تاريخ العقد"] == "Gregorian"?"G":"H" });
                let date = this.commonValidation.toJulianDate1(new Date(newData[i]["تاريخ العقد"]));
                TypeOfPayments.controls[i].patchValue({ "DateofPayment": newData[i]["تاريخ الدفع"] == "Gregorian"?date:this.commonValidation.dateFormate(date, "Islamic") });
                TypeOfPayments.controls[i].patchValue({ "PaymentTotal": newData[i]["اجمالي الدفع"] });
                TypeOfPayments.controls[i].patchValue({ "TaxRate": newData[i]["معدل الضريبة %"] });
                // TypeOfPayments.controls[i].patchValue({ "WithheldTaxAmount": newData[i]["قيمة الاستقطاع"] });
              }
              else {
                TypeOfPayments.controls[i].patchValue({ "RecipientName": newData[i]["Receipt Name"] });
                TypeOfPayments.controls[i].patchValue({ "Country": this.countryList.filter(d => d['Landx'] == newData[i]["Country"].trim())[0]['Land1'] });
                TypeOfPayments.controls[i].patchValue({ "CalendarType": newData[i]["Calendar Type"] == "Gregorian"?"G":"H" });
                let date = this.commonValidation.toJulianDate1(new Date(newData[i]["Date of Payment"]));
                TypeOfPayments.controls[i].patchValue({ "DateofPayment": newData[i]["Calendar Type"] == "Gregorian"?date:this.commonValidation.dateFormate(date, "Islamic") });
                TypeOfPayments.controls[i].patchValue({ "PaymentTotal": newData[i]["Payment Total"] });
                TypeOfPayments.controls[i].patchValue({ "TaxRate": newData[i]["Tax Rate %"] });
                // TypeOfPayments.controls[i].patchValue({ "WithheldTaxAmount": newData[i]["Tax Rate %"] });
                

              }
              this.PaymentCalculation(this.PaymentIndex, i);
              this.TaxWithheldCalculation(this.PaymentIndex, i);
              this.ValidateForms();
              this.AllSchedulePaymentsTotal();
            }
            this.action = "FillManually";
          }
        } else {
          jQuery("#toolTips").modal('show');
        }
      }
    } else {
      this.cancelUpload = false;
    }
    event.target.value = "";
  }

  // onFileUpload(event, headerTitles, scheduleNo) {
  //   if (!this.cancelUpload) {
  //     this.file = event.target.files[0];
  //     let fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(this.file);
  //     let headerArray = new Array();
  //     fileReader.onload = (e) => {
  //       this.arrayBuffer = fileReader.result;
  //       var data = new Uint8Array(this.arrayBuffer);
  //       var arr = new Array();
  //       for (var i = 0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);
  //       var bstr = arr.join("");
  //       var workbook = XLSX.read(bstr, { type: "binary", cellDates: true, dateNF: 'mm-dd-yyyy;@' });
  //       var first_sheet_name = workbook.SheetNames[0];
  //       var worksheet = workbook.Sheets[first_sheet_name];
  //       console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
  //       //console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]); 
  //       for (let i = 0; i < (XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]).toString().split(',').length; i++) {
  //         headerArray.push((XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]).toString().split(',')[i]);
  //       }
  //       console.log("headerArray", headerArray);
  //       let data1 = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  //       console.log(data1);
  //       //console.log(moment(new Date(data1[0]['Date'])).format('MM-DD-YYYY'));
  //       // var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
  //       //     this.filelist = [];    
  //       //     console.log(this.filelist) 



  //       let count = 0;
  //       let ColumnsHeaderArray = headerTitles;
  //       console.log(headerArray.length, ColumnsHeaderArray.length)
  //       if (headerArray.length == ColumnsHeaderArray.length) {
  //         for (let i = 0; i < headerArray.length; i++) {
  //           console.log(typeof (headerArray[i]))
  //           if (headerArray[i].trimRight() != ColumnsHeaderArray[i].trimRight()) {
  //             count++;
  //             break;
  //           }
  //         }
  //       }
  //       else {
  //         count++;
  //       }


  //       for (let i = 0; i < data1.length; i++) {
  //         if (Object.keys(data1[i]).indexOf("__EMPTY") != -1) {
  //           count++;
  //           break;
  //         }
  //       }

  //       if (count == 0 && data1.length > 0) {
  //         let newData = [];
  //         let obj = {};
  //         for (let i = 0; i < data1.length; i++) {
  //           obj = {};
  //           //to validate the data in the row
  //           for (let j = 0; j < headerArray.length; j++) {
              
  //             if(this.language  == 'ar') {
  //               if(headerArray[j] == "اسم الشركة") {
  //                 obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : null;
  //               }
  //               else {
  //                 obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : 0;
  //               }
  //             }
  //             else {
  //               // alert('hi');
  //               if(headerArray[j] == "Company Name") {
  //                 // alert('hi');
  //                 obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : null;
  //               }
  //               else {
  //                 obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : 0;
  //               }
  //             }
              
  //           }
  //           newData.push(obj);

  //         }
  //         console.log("newData", newData)
  //         if (scheduleNo == "Form9Schedule") {
  //           for (let i = 0; i < newData.length; i++) {
  //             // if(this.taxpayerDetails.PeriodKey == this.currentYear || ((!this.formDataSet[i].CompNm && !this.formDataSet[i].ContreyKey && !this.formDataSet[i].ServcTyp && !this.formDataSet[i].BeginBal))) {
               
  //             //   this.clearFormArray(this.fields);
  //             // }
  //             if(!this.formDataSet[i].CompNm && !this.formDataSet[i].ContreyKey && !this.formDataSet[i].ServcTyp && !this.formDataSet[i].BeginBal)
  //             {
  //               this.clearFormArray(this.fields);
  //             }
  //             //this.clearFormArray(this.fields);
  //               this.OnAddForm(i);
  //             if(this.language == 'ar') {
  //               this.fields.controls[i].patchValue({ "CompanyName": newData[i]["اسم الشركة"] });
  //               this.fields.controls[i].patchValue({ "Country": this.countryList.filter(d=> d['Landx'] == newData[i]["الدولة"])[0]['Land1'] });
  //               this.fields.controls[i].patchValue({ "typeOfService": this.serviceType.filter(d=> d['Text'] == newData[i]["نوع الخدمة"])[0]['Key'] });
  //               this.fields.controls[i].patchValue({ "BeginningPeriodBalance": newData[i]["رصيد بداية الفترة"] });
  //               this.fields.controls[i].patchValue({ "ServicesperformedThisYear": newData[i]["المنفذ خلال العام"] });
  //               this.fields.controls[i].patchValue({ "paidDuringtheYear": newData[i]["المدفوع خلال العام"] });
  //               this.fields.controls[i].patchValue({ "otherSettlements": newData[i]["تسويات ( أخرى )"] });
  //               this.fields.controls[i].patchValue({ "endofPeriodBalance": newData[i]["رصيد أخر الفترة"] });
  //               this.fields.controls[i].patchValue({ "paymentAmount": newData[i]["المبلغ المسدد عنه الضريبة"] });
  //               this.fields.controls[i].patchValue({ "taxRate": newData[i]["نسبة ضريبة الإستقطاع"] });
  //               this.fields.controls[i].patchValue({ "withHoldingTax": newData[i]["الضريبة المسددة"] });
  //               this.fields.controls[i].patchValue({ "fine": newData[i]["الغرامة"] });
  //             }
  //             else {
  //               this.fields.controls[i].patchValue({ "CompanyName": newData[i]["Company Name"] });
  //               this.fields.controls[i].patchValue({ "Country": this.countryList.filter(d=> d['Landx'] == newData[i]["Country"])[0]['Land1'] });
  //               this.fields.controls[i].patchValue({ "typeOfService": this.serviceType.filter(d=> d['Text'] == newData[i]["Type of Service"])[0]['Key'] });
  //               this.fields.controls[i].patchValue({ "BeginningPeriodBalance": newData[i]["Beginning of Period Balance"] });
  //               this.fields.controls[i].patchValue({ "ServicesperformedThisYear": newData[i]["Services Performed during the year"] });
  //               this.fields.controls[i].patchValue({ "paidDuringtheYear": newData[i]["Paid during the Year"] });
  //               this.fields.controls[i].patchValue({ "otherSettlements": newData[i]["Other Settlements"] });
  //               this.fields.controls[i].patchValue({ "endofPeriodBalance": newData[i]["End of Period Balance"] });
  //               this.fields.controls[i].patchValue({ "paymentAmount": newData[i]["Payment Amount"] });
  //               this.fields.controls[i].patchValue({ "taxRate": newData[i]["Tax Rate %"] });
  //               this.fields.controls[i].patchValue({ "withHoldingTax": newData[i]["Withholding Tax Amount"] });
  //               this.fields.controls[i].patchValue({ "fine": newData[i]["Fine"] });
  //             }
  //             this.Form9Validations();
              
              
  //           }
  //           this.WithHoldingsCalculations();
  //           this.ValidateWhtAmount();
            
  //           this.ValidateForm();

  //         }else if (scheduleNo == "Form6Schedule") {
  //           const TypeOfPayments = this.Types.controls[this.PaymentIndex].get('TypeOfPayments') as FormArray;
  //           this.clearFormArray(TypeOfPayments);
  //           for (let i = 0; i < newData.length; i++) {
  //             this.AddForm(this.typeIndex);
  //             if(this.language == 'ar') {
  //               TypeOfPayments.controls[i].patchValue({ "RecipientName": newData[i]["اسم المستفيد"] });
  //               TypeOfPayments.controls[i].patchValue({ "Country": this.countryList.filter(d => d['Landx'] == newData[i]["البلد"].trim())[0]['Land1'] });
  //               TypeOfPayments.controls[i].patchValue({ "CalendarType": newData[i]["تاريخ العقد"] == "Gregorian"?"G":"H" });
  //               let date = this.commonValidation.toJulianDate1(new Date(newData[i]["تاريخ العقد"]));
  //               TypeOfPayments.controls[i].patchValue({ "DateofPayment": newData[i]["تاريخ الدفع"] == "Gregorian"?date:this.commonValidation.dateFormate(date, "Islamic") });
  //               TypeOfPayments.controls[i].patchValue({ "PaymentTotal": newData[i]["اجمالي الدفع"] });
  //               TypeOfPayments.controls[i].patchValue({ "TaxRate": newData[i]["معدل الضريبة %"] });
  //               // TypeOfPayments.controls[i].patchValue({ "WithheldTaxAmount": newData[i]["قيمة الاستقطاع"] });
  //             }
  //             else {
  //               TypeOfPayments.controls[i].patchValue({ "RecipientName": newData[i]["Receipt Name"] });
  //               TypeOfPayments.controls[i].patchValue({ "Country": this.countryList.filter(d => d['Landx'] == newData[i]["Country"].trim())[0]['Land1'] });
  //               TypeOfPayments.controls[i].patchValue({ "CalendarType": newData[i]["Calendar Type"] == "Gregorian"?"G":"H" });
  //               let date = this.commonValidation.toJulianDate1(new Date(newData[i]["Date of Payment"]));
  //               TypeOfPayments.controls[i].patchValue({ "DateofPayment": newData[i]["Calendar Type"] == "Gregorian"?date:this.commonValidation.dateFormate(date, "Islamic") });
  //               TypeOfPayments.controls[i].patchValue({ "PaymentTotal": newData[i]["Payment Total"] });
  //               TypeOfPayments.controls[i].patchValue({ "TaxRate": newData[i]["Tax Rate %"] });
  //               // TypeOfPayments.controls[i].patchValue({ "WithheldTaxAmount": newData[i]["Tax Rate %"] });
                

  //             }
  //             this.PaymentCalculation(this.PaymentIndex, i);
  //             this.TaxWithheldCalculation(this.PaymentIndex, i);
  //             this.ValidateForms();
  //             this.AllSchedulePaymentsTotal();
  //           }
  //           this.action = "FillManually";
  //         }
  //       } else {
  //         jQuery("#toolTips").modal('show');
  //       }
  //     }
  //   } else {
  //     this.cancelUpload = false;
  //   }
  //   event.target.value = "";
  // }

  //Upload Excel Form-9 and Form-6 ends

  showTooltip() {
    console.log("sdsds");
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  //to save Notes in Form9
  SaveNotesForm9() {
    console.log(this.attachedNotes);
    let obj = {
      "ByGpartz": this.withholdingsObject["Gpartz"],
      "Notenoz": "001",
      "DataVersionz": "00000",
      "Refnamez": "",
      "Namez": this.formSet.ATaxpayernm,
      "Tdformat": "",
      "Sect": "MAIN FORM",
      "Tdline": "",
      "Strdt": moment(new Date()).format("YYYY/MM/DD"),//"2020/11/02",
      "XInvoicez": "",
      "Strtime": moment(new Date().getTime()).format("HH:MM:SS"),
      "XObsoletez": "",
      "Rcodez": "WHTM_ST03",
      "Strline": this.attachedNotes,
      "Erfusrz": this.withholdingsObject["Gpartz"],
      "Erfdtz": "\/Date(" + new Date().getTime() + ")\/",
      "Erftmz": null,
      "AttByz": "TP",
      "Noteno": "000",
      "Lineno": 0,
      "ElemNo": 0
    }
    this.taxpayerDetails["Off_notesSet"]["results"].push(obj);
  }
  
}

export interface IPayment {
  PymntDtTp: any;
  Mandt: any;
  FormGuid: any;
  DataVersion: any;
  LineNo: any;
  RankingOrder: any;
  SrNo: any;
  RcipntNm: any;
  TyPymnt: any;
  Country: any;
  PymntDt: any;
  PymntTot: any;
  TaxRt: any;
  AmtWthld: any;
  Waers: any;
}
