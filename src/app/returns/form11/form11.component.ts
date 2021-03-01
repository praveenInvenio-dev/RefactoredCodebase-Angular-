import { Component, Input, OnInit, ElementRef, ViewChild } from "@angular/core";
import { VatServiceService } from "src/app/services/vat-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ReturnsService } from "../returns.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { startWith, map, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import * as moment from "moment";
// import { toHijri, toGregorian } from "hijri-converter";
import * as FileSaver from "file-saver";
import { NotifierService } from "angular-notifier";
import * as XLSX from "xlsx";
import { AppService } from "src/app/app.service";
import { CalendarSelectorComponent } from "src/app/constants/calendarselector.component";
import { CommonValidation } from "src/app/constants/commonValidations";
import { form11constants } from "src/app/returns/form11/form11constants.model";
import { environment } from "src/environments/environment";
import { toHijri } from "hijri-converter";
declare var jQuery;
declare var $: any;

@Component({
  selector: "app-form11",
  templateUrl: "./form11.component.html",
  styleUrls: ["./form11.component.css"],
})
export class Form11Component implements OnInit {
  headerComponent = CalendarSelectorComponent;
  baseUrl = environment.loginurl.split("irj")[0] + "/";
  chartFile: boolean = false;
  legalDocCount: any[] = [];
  ZakatFileCount: any[] = [];
  ChartedFileCount: any[] = [];
  FinancialFileCount: any[] = [];
  @ViewChild("inputFile") myInputVariable: ElementRef;
  @ViewChild("inputFile1") myInputVariable1: ElementRef;
  @ViewChild("inputCharteredFile") myinputCharteredFile: ElementRef;
  @ViewChild("inputFinancialStatement") myinputFinancialStatement: ElementRef;
  options: User[] = [{ name: "Mary" }, { name: "Shelley" }, { name: "Igor" }];
  filteredOptions: Observable<User[]>[] = [];
  myForm: FormGroup;
  isReady: boolean = false;

  filteredCountries: Observable<ICountry[]>[] = [];

  // @Input()zacattaxobj: any;
  Form11DetailsScreen: boolean = true;
  taxPayerDetails: any = [];
  searchText: any;
  lang: any;
  direction: string;
  step: number = 1;
  agree: boolean = false;
  Fbguid: number;
  Euser: number;
  GainLossForm: FormGroup;
  NoOfAddedForms: number = 0;
  IncomeFromBankingForm: FormGroup;
  CostOfRevenueBankingForm: FormGroup;
  CostOfRevenueFinancingForm: FormGroup;
  CostOfRevenueForm: FormGroup;
  ProvisionMadeDuringForm: FormGroup;
  RoyalityTechnicalServicesForm: FormGroup;
  OtherExpensesForm: FormGroup;
  DepreciationDifferencesForm: FormGroup;
  AdjustmentToNetProfitForm: FormGroup;
  IncomeFromLoansForm: FormGroup;
  AdjustedCarriedCITLosessForm: FormGroup;
  CapitalZakatForm: FormGroup;
  EquityEqualantFundResourceForm: FormGroup;
  LongTermEquivalentForm: FormGroup;
  LongTermDebtsEquivalentForm: FormGroup;
  InvestmentsGovernmentSukukForm: FormGroup;
  TransactionDetailsForm: FormGroup;
  MainActivityRevenue: any = 0.0;
  totalOtherRevenues: any = 0.0;
  TotRevenue: any = 0.0;
  CostOfRevenueModalApplicable: boolean = false;
  countrySet: ICountry[];
  InternaExternalSet: any[] = [];
  transactionsSet: any[] = [];
  JurisdictionSet: any[] = [];
  TransactionNatureSet: any[] = [];
  TPMethodsSet: any[] = [];
  TaxJuridictionSet: any[] = [];
  InternalExternalSet: any[] = [];
  RelatedPartiesYesForm: FormGroup;
  ShareHoldersDetailsForm: FormGroup;
  periodStartDate: any;
  periodEndDate: any;
  userObject: any = [];
  RetrunObjStatus: string = "";
  ReturnObjStatusTxt: string = "";
  UpeFyeDis: any;
  FeFyeDis: any;
  disableInputs: boolean = false;
  isAmendment: boolean = false;

  AddressSet = [
    {
      ShortKey: "I",
      Text: "Internal",
    },
    {
      ShortKey: "E",
      Text: "External",
    },
  ];
  DepositTermSet = [
    {
      ShortKey: "",
      Value: "",
    },
    {
      ShortKey: "LT90",
      Value: "Less than 90 days",
    },
    {
      ShortKey: "MT90",
      Value: "More than 90 days",
    },
  ];
  CostOfRevenuesOptions: ["Banking", "Financial Activities"];
  SelectedCostOfRevenueOptions = "";
  IdTypes = [
    { key: "National ID", value: "National ID" },
    { key: "Iqama", value: "Iqama" },
    { key: "TIN", value: "TIN" },
    { key: "CR", value: "CR" },
    { key: "Other", value: "Other" },
  ];
  AdjustmentsNetProfitsSet = [
    {
      Key: "All payments to partners, including salaries and benefits",
      value: "All payments to partners, including salaries and benefits",
    },
    {
      Key:
        "Head office management fees and other head office estimated loaded expenses",
      value:
        "Head office management fees and other head office estimated loaded expenses",
    },
    {
      Key: "Social insurance paid abroad",
      value: "Social insurance paid abroad",
    },
    {
      Key: "Pension fund contributions in excess of the tax-allowable amount",
      value: "Pension fund contributions in excess of the tax-allowable amount",
    },
    { Key: "Entertainment expenses", value: "Entertainment expenses" },
    {
      Key: "School fees exceed tax-allowable amount",
      value: "School fees exceed tax-allowable amount",
    },
    {
      Key: "Inadmissible fines and penalties",
      value: "Inadmissible fines and penalties",
    },
    { Key: "Unallowable donations", value: "Unallowable donations" },
    {
      Key: "Income taxes and Zakat loaded on expenses",
      value: "Income taxes and Zakat loaded on expenses",
    },
    {
      Key: "Employees social insurance and social fund contributions",
      value: "Employees social insurance and social fund contributions",
    },
    {
      Key:
        "Adjustment to arms length price of costs for materials, services etc. from related parties",
      value:
        "Adjustment to arms length price of costs for materials, services etc. from related parties",
    },
    {
      Key: "Expenses unrelated to operational activities",
      value: "Expenses unrelated to operational activities",
    },
    { Key: "Inadmissible bad debts", value: "Inadmissible bad debts" },
    { Key: "Other", value: "Other" },
  ];
  UpeFye: any;
  FeFye: any;
  GainLossFormChange: boolean = false;
  IncomeFromBankingFormChange: boolean = false;
  IncomeFromLonasFormChange: boolean = false;
  CostOfRevenueBankingFormChange: boolean = false;
  CostOfRevenueFinancingFormChange: boolean = false;
  ProvisionMadeDuringFormChange: boolean = false;
  RoyalityTechnicalServicesFormChange: boolean = false;
  OtherExpensesFormChange: boolean = false;
  AdjustmentToNetProfitFormChange: boolean = false;
  CapitalZakatFormChange: boolean = false;
  EquityEqualantFundResourceFormChange: boolean = false;
  LongTermEquivalentFormChange: boolean = false;
  LongTermDebtsEquivalentFormChange: boolean = false;
  InvestmentsGovernmentSukukFormChange: boolean = false;
  notApplicableAction: string = "";
  language: any;
  totalBsAssets: any = 0;
  totalBeAssets: any = 0;
  totalBSLiabilities: any = 0;
  totalBeLiabilities: any = 0;

  taxCalculationStepShow: boolean = false;
  zakatCalculationStepShow: boolean = false;

  constructor(
    private from11Service: ReturnsService,
    private vatService: VatServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public notifierService: NotifierService,
    private appService: AppService,
    private CommonValidation: CommonValidation
  ) {
    this.createForm();

    this.GainLossForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      TotalSellingAmount: [0.0],
      TotalCost: [0.0],
      TotalProfitLoss: [0.0],
      GainLossSecurities: this.fb.array([]),
    });
    this.IncomeFromBankingForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      TotalAmount: [0.0],
      OtherRevenues: this.fb.array([]),
    });
    this.CostOfRevenueBankingForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      TotalAmount: [0.0],
      BankRevenues: this.fb.array([]),
    });
    this.CostOfRevenueFinancingForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      TotalAmount: [0.0],
      FinanceRevenues: this.fb.array([]),
    });
    this.ProvisionMadeDuringForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      TotalAmount: [0.0],
      BeginingBalance: [0.0],
      ProvisionsCreatedDuringThisYear: [0.0],
      UtilizedDuringThisPeriod: [0.0],
      Settlements: [0.0],
      EndingBalance: [0.0],
      Provisions: this.fb.array([]),
    });
    this.RoyalityTechnicalServicesForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      ChargedToAccount: [0.0],
      PaidDuringYear: [0.0],
      RoyalityTechnicalSecurities: this.fb.array([]),
    });
    this.OtherExpensesForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      Amount: [0.0],
      OtherExpenses: this.fb.array([]),
    });
    this.DepreciationDifferencesForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      LandGroupValueAtPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      LandCostOfPreviousYearAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      LandCostOfCurrentAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      LandFiftyPercentCostCurrentPreviousAdditions: [0.0],
      LandCompensationDepreciationDuringPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      LandCompensationDepreciationDuringCurrentYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      LandFiftyPercentDuringPreviousCurrentYear: [0.0],
      LandRemainingValueGroup: [0.0],
      LandDepreciationAmortizationRatio: [
        0.0,
        [Validators.min(0.0), Validators.max(0.0)],
      ],
      LandDepreciationAmortizationValue: [0.0],
      LandRemainingValueAtEndCurrentYear: [0.0],
      LandMaintananceCostOfGroup: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.0),
          Validators.max(999999999999.99),
        ],
      ],
      LandMaintancesExpenseExceedfourPercent: [0.0],
      LandRemainingGroupAtEndOfCurrentYear: [0.0],
      MinimumLandValue: [0.0],
      MaximumLandValue: [0.0],

      FirstGroupValueAtPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FirstCostOfPreviousYearAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FirstCostOfCurrentAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FirstFiftyPercentCostCurrentPreviousAdditions: [0.0],
      FirstCompensationDepreciationDuringPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FirstCompensationDepreciationDuringCurrentYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FirstFiftyPercentDuringPreviousCurrentYear: [0.0],
      FirstRemainingValueGroup: [0.0],
      FirstDepreciationAmortizationRatio: [
        0.0,
        [Validators.min(5.0), Validators.max(5.0)],
      ],
      FirstDepreciationAmortizationValue: [0.0],
      FirstRemainingValueAtEndCurrentYear: [0.0],
      FirstMaintananceCostOfGroup: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.0),
          Validators.max(999999999999.99),
        ],
      ],
      FirstMaintancesExpenseExceedfourPercent: [0.0],
      FirstRemainingGroupAtEndOfCurrentYear: [0.0],
      MinimumFirstValue: [0.0],
      MaximumFirstValue: [0.0],

      SecondGroupValueAtPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      SecondCostOfPreviousYearAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      SecondCostOfCurrentAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      SecondFiftyPercentCostCurrentPreviousAdditions: [0.0],
      SecondCompensationDepreciationDuringPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      SecondCompensationDepreciationDuringCurrentYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      SecondFiftyPercentDuringPreviousCurrentYear: [0.0],
      SecondRemainingValueGroup: [0.0],
      SecondDepreciationAmortizationRatio: [
        0.0,
        [Validators.min(10.0), Validators.max(10.0)],
      ], //
      SecondDepreciationAmortizationValue: [0.0],
      SecondRemainingValueAtEndCurrentYear: [0.0],
      SecondMaintananceCostOfGroup: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.0),
          Validators.max(999999999999.99),
        ],
      ],
      SecondMaintancesExpenseExceedfourPercent: [0.0],
      SecondRemainingGroupAtEndOfCurrentYear: [0.0],
      MinimumSecondValue: [0.0],
      MaximumSecondValue: [0.0],

      ThirdGroupValueAtPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      ThirdCostOfPreviousYearAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      ThirdCostOfCurrentAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      ThirdFiftyPercentCostCurrentPreviousAdditions: [0.0],
      ThirdCompensationDepreciationDuringPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      ThirdCompensationDepreciationDuringCurrentYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      ThirdFiftyPercentDuringPreviousCurrentYear: [0.0],
      ThirdRemainingValueGroup: [0.0],
      ThirdDepreciationAmortizationRatio: [
        0.0,
        [Validators.min(25.0), Validators.max(25.0)],
      ],
      ThirdDepreciationAmortizationValue: [0.0],
      ThirdRemainingValueAtEndCurrentYear: [0.0],
      ThirdMaintananceCostOfGroup: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.0),
          Validators.max(999999999999.99),
        ],
      ],
      ThirdMaintancesExpenseExceedfourPercent: [0.0],
      ThirdRemainingGroupAtEndOfCurrentYear: [0.0],
      MinimumThirdValue: [0.0],
      MaximumThirdValue: [0.0],

      FourthGroupValueAtPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FourthCostOfPreviousYearAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FourthCostOfCurrentAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FourthFiftyPercentCostCurrentPreviousAdditions: [0.0],
      FourthCompensationDepreciationDuringPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FourthCompensationDepreciationDuringCurrentYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FourthFiftyPercentDuringPreviousCurrentYear: [0.0],
      FourthRemainingValueGroup: [0.0],
      FourthDepreciationAmortizationRatio: [
        0.0,
        [Validators.min(20.0), Validators.max(20.0)],
      ],
      FourthDepreciationAmortizationValue: [0.0],
      FourthRemainingValueAtEndCurrentYear: [0.0],
      FourthMaintananceCostOfGroup: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.0),
          Validators.max(999999999999.99),
        ],
      ],
      FourthMaintancesExpenseExceedfourPercent: [0.0],
      FourthRemainingGroupAtEndOfCurrentYear: [0.0],
      MinimumFourthValue: [0.0],
      MaximumFourthValue: [0.0],

      FifthGroupValueAtPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FifthCostOfPreviousYearAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FifthCostOfCurrentAdditions: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FifthFiftyPercentCostCurrentPreviousAdditions: [0.0],
      FifthCompensationDepreciationDuringPreviousYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FifthCompensationDepreciationDuringCurrentYear: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      FifthFiftyPercentDuringPreviousCurrentYear: [0.0],
      FifthRemainingValueGroup: [0.0],
      FifthDepreciationAmortizationRatio: [
        0.0,
        [Validators.min(10.0), Validators.max(10.0)],
      ],
      FifthDepreciationAmortizationValue: [0.0],
      FifthRemainingValueAtEndCurrentYear: [0.0],
      FifthMaintananceCostOfGroup: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.0),
          Validators.max(999999999999.99),
        ],
      ],
      FifthMaintancesExpenseExceedfourPercent: [0.0],
      FifthRemainingGroupAtEndOfCurrentYear: [0.0],
      MinimumFifthValue: [0.0],
      MaximumFifthValue: [0.0],

      TotalGroupValueAtPreviousYear: [0.0],
      TotalCostOfPreviousYearAdditions: [0.0],
      TotalCostOfCurrentAdditions: [0.0],
      TotalFiftyPercentCostCurrentPreviousAdditions: [0.0],
      TotalCompensationDepreciationDuringPreviousYear: [0.0],
      TotalCompensationDepreciationDuringCurrentYear: [0.0],
      TotalFiftyPercentDuringPreviousCurrentYear: [0.0],
      TotalRemainingValueGroup: [0.0],
      TotalDepreciationAmortizationValue: [0.0],
      TotalRemainingValueAtEndCurrentYear: [0.0],
      TotalMaintananceCostOfGroup: [0.0],
      TotalMaintancesExpenseExceedfourPercent: [0.0],
      TotalRemainingGroupAtEndOfCurrentYear: [0.0],
    });
    this.AdjustmentToNetProfitForm = this.fb.group({
      Schedule: [false],
      FillType: ["Manual"],
      Amount: [0.0],
      AdjustmentNetProfits: this.fb.array([]),
    });
    this.IncomeFromLoansForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      TotalRevenueValue: [0.0, Validators.required],
      Incomefromloansinterest: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      Taxableincomeexcludingtheincomefromtheloansinterests: [
        0.0,
        Validators.required,
      ],
      Allowabledeductedexpensesunderthetaxlaw: [0.0, Validators.required],
      Expensesfromloansinterests: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      Allowabledeductedexpensesunderthetaxlawexcludingtheexpensesfromloansinterests: [
        0.0,
        Validators.required,
      ],
      TheresultdiffAB: [0.0, Validators.required],
      TheResultDiffFiftyPercent: [0.0, Validators.required],
      Addtheincomefromtheloansinterests: [0.0, Validators.required],
      IncomefromloansinterestSumFiftyPercent: [0.0, Validators.required],
      loansinterests: [0.0, Validators.required],
      loansinterestsinexcess: [0.0, Validators.required],
      "Non-SaudisharefromLoaninterest": [0.0, Validators.required],
    });
    this.AdjustedCarriedCITLosessForm = this.fb.group({
      Schedule: [false],
      AdjustedCarriedFwdLosses: [
        0.0,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      AdjustedDeclaredNetProfit: [
        0.0,
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
      LossesDeductedDuringYear: [0.0, Validators.required],
      EndOfYearBalance: [0.0, Validators.required],
      Total: [0.0],
    });
    this.CapitalZakatForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      FillType: ["Manual"],
      Capitals: this.fb.array([]),
      TotalBeginOfPeriodBalance: [0.0],
      TotalAmountDedFromCapDurCurrent: [0.0],
      TotalAddToTheCapitalDuringYear: [0.0],
      TotalEOPBalance: [0.0],
      TotalUtilizeNonZakat: [0.0],
      TotalUtilizeZakat: [0.0],
      TotalCapSubZakat: [0.0],
    });
    this.EquityEqualantFundResourceForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      FillType: ["Manual"],
      EquityEqualantFunds: this.fb.array([]),
    });
    this.LongTermEquivalentForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      AmountDueIn: [0.0],
      FillType: ["Manual"],
      LongTermLoans: this.fb.array([]),
    });
    this.LongTermDebtsEquivalentForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      AmountDueIn: [0.0],
      FillType: ["Manual"],
      LongTermDebts: this.fb.array([]),
    });
    this.InvestmentsGovernmentSukukForm = this.fb.group({
      Schedule: [false],
      Amount: [0.0],
      AmountDueIn: [0.0],
      FillType: ["Manual"],
      Sukuks: this.fb.array([]),
    });

    this.TransactionDetailsForm = this.fb.group({
      PartyTransactionsSet: this.fb.array([]),
    });
    this.RelatedPartiesYesForm = this.fb.group({
      RelatedPartiesSet: this.fb.array([]),
    });
    this.ShareHoldersDetailsForm = this.fb.group({
      ShareholdersSet: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.appService.ActiveFormat.next("Islamic");
    $('[data-toggle="tooltip"]').tooltip("hide");

    //For Tab Active
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab", JSON.stringify("الزكاة و ضريبة الدخل"));
    // } else {
    //   localStorage.setItem("ActiveTab", JSON.stringify("Zakat & CIT"));
    // }
    //For Tab Active end
    moment.locale("en-Us");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = form11constants.langz.arb.form11;
      this.direction = form11constants.langz.arb.dir;
    } else {
      this.lang = form11constants.langz.eng.form11;
      this.direction = form11constants.langz.eng.dir;
    }
    moment.locale("en-Us");
    // console.log(toHijri(2020,11,25))
    // console.log(toGregorian(1442,4,10))
    // console.log(toHijri(+(moment(new Date()).format('YYYY')),+(moment(new Date()).format('MM')),(+moment(new Date()).format('DD'))));
    // this.Fbguid =  this.route.snapshot.params["Fbguid"];
    // this.Euser = this.route.snapshot.params["Euser"];
    this.language = localStorage.getItem("lang");
    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      this.Fbguid = params["fbGuid"] || "";
      // this.RetrunObjStatus = params["Status"] || "";
      this.RetrunObjStatus = params["Status"];
      console.log("Status", this.RetrunObjStatus);
      if (this.RetrunObjStatus == "IP014") {
        if (this.language == "ar") {
          this.ReturnObjStatusTxt = "فاتورة";
        } else {
          this.ReturnObjStatusTxt = "Billed";
        }
      }
      this.Euser = params["euser"] || "";
      console.log(this.Fbguid);
      console.log(this.Euser);
      if (this.Fbguid && this.Euser) {
        this.GetUserDetails();
        this.GetTaxpayerDetails();
      }
    });

    // this.GetTaxpayerDetails();
  }

  GetUserDetails() {
    this.vatService.getVatData().subscribe((res) => {
      console.log("resdata", res["d"]);
      this.userObject = res;
      console.log("this.userObject", this.userObject);
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      date: [{ value: "", disabled: true }, [Validators.required]],
      notes: [""],
      items: this.initItems(),
    });
  }
  initItems() {
    var formArray = this.fb.array([]);

    for (let i = 0; i < 2; i++) {
      formArray.push(
        this.fb.group({
          name: ["", [Validators.required]],
          age: ["", [Validators.required]],
        })
      );
    }
    return formArray;
  }

  GetTaxpayerDetails() {
    this.from11Service
      .GetFrom11TaxpayerDetails(this.Euser, this.Fbguid)
      .subscribe((data) => {
        console.log("TaxpayerDetails", data);
        moment.locale("en-Us");
        this.taxPayerDetails = data["d"] || [];
        console.log("taxPayerDetails", this.taxPayerDetails);
        // this.GainLossForm.patchValue({'Schedule':this.taxPayerDetails.RGainloss=="X"?true:false});
        // this.GainLossForm.patchValue({'TotalSellingAmount':this.taxPayerDetails.GainSellingSec});
        // this.IncomeFromBankingForm.patchValue({'Schedule':this.taxPayerDetails.ROtherrev=="X"?true:false});
        // this.IncomeFromBankingForm.patchValue({'TotalAmount':this.taxPayerDetails.OtherRev || 0});
        // this.CostOfRevenueBankingForm.patchValue({'Schedule':this.taxPayerDetails.RCostmain=="X"?true:false});
        // this.CostOfRevenueBankingForm.patchValue({'TotalAmount':this.taxPayerDetails.CostMain});
        // this.CostOfRevenueFinancingForm.patchValue({'Schedule':this.taxPayerDetails.RCostmain=="X"?true:false});
        // this.CostOfRevenueFinancingForm.patchValue({'TotalAmount':this.taxPayerDetails.CostMain});
        // this.ProvisionMadeDuringForm.patchValue({'Schedule':this.taxPayerDetails.RProvisionyr=="X"?true:false});
        // this.RoyalityTechnicalServicesForm.patchValue({'Schedule':this.taxPayerDetails.RRoyalser=="X"?true:false});
        // this.OtherExpensesForm.patchValue({'Schedule':this.taxPayerDetails.ROtherexp=="X"?true:false});
        // this.DepreciationDifferencesForm.patchValue({'Schedule':this.taxPayerDetails.RDepriciation=="X"?true:false});
        // this.ProvisionMadeDuringForm.patchValue({'Schedule':this.taxPayerDetails.RProvisionyr=="X"?true:false});
        // this.AdjustmentToNetProfitForm.patchValue({'Schedule':this.taxPayerDetails.RNetprofit=="X"?true:false});
        // this.IncomeFromLoansForm.patchValue({'Schedule':this.taxPayerDetails.RLoanthold=="X"?true:false});
        // this.AdjustedCarriedCITLosessForm.patchValue({'Schedule':this.taxPayerDetails.RNssharecap25=="X"?true:false});
        // this.CapitalZakatForm.patchValue({'Schedule':this.taxPayerDetails.RCapital=="X"?true:false});
        // this.EquityEqualantFundResourceForm.patchValue({'Schedule':this.taxPayerDetails.REquity=="X"?true:false});
        // this.LongTermEquivalentForm.patchValue({'Schedule':this.taxPayerDetails.RLongloan=="X"?true:false});
        // this.LongTermDebtsEquivalentForm.patchValue({'Schedule':this.taxPayerDetails.RLonddebit=="X"?true:false});
        // this.InvestmentsGovernmentSukukForm.patchValue({'Schedule':this.taxPayerDetails.RInvdebit=="X"?true:false});
        // this.periodStartDate=moment(new Date(+(((this.taxPayerDetails.Abrzu.replace(')','')).toString().replace('/Date(','')).toString().replace('/','')))).format('DD/MM/YYYY');
        // this.periodEndDate=moment(new Date(+(((this.taxPayerDetails.Abrzo.replace(')','')).toString().replace('/Date(','')).toString().replace('/','')))).format('DD/MM/YYYY');
        moment.locale("en-Us");
        if (this.taxPayerDetails.CalTyp == "G") {
          this.periodStartDate = moment(
            new Date(
              +this.taxPayerDetails.Abrzu.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
          this.periodEndDate = moment(
            new Date(
              +this.taxPayerDetails.Abrzo.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
        } else {
          this.periodStartDate = this.CommonValidation.changeDate5(
            this.CommonValidation.dateFormate(
              this.CommonValidation.toJulianDate1(
                new Date(
                  +this.taxPayerDetails.Abrzu.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ),
              "Islamic"
            )
          );
          this.periodEndDate = this.CommonValidation.changeDate5(
            this.CommonValidation.dateFormate(
              this.CommonValidation.toJulianDate1(
                new Date(
                  +this.taxPayerDetails.Abrzo.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ),
              "Islamic"
            )
          );
        }
        console.log(this.periodEndDate, this.periodStartDate);
        this.getCountriesDropdown();
        setTimeout(() => {
          this.legalDocCount = [];
          this.ZakatFileCount = [];
          this.ChartedFileCount = [];
          this.FinancialFileCount = [];

          this.legalDocCount = this.taxPayerDetails.AttDetSet["results"].filter(
            (data) => {
              return data.Dotyp == "R11E";
            }
          );
          console.log("files", this.legalDocCount);
          this.ZakatFileCount = this.taxPayerDetails.AttDetSet[
            "results"
          ].filter((data) => {
            return data.Dotyp == "R11F";
          });
          this.ChartedFileCount = this.taxPayerDetails.AttDetSet[
            "results"
          ].filter((data) => {
            return data.Dotyp == "R11C";
          });
          this.FinancialFileCount = this.taxPayerDetails.AttDetSet[
            "results"
          ].filter((data) => {
            return data.Dotyp == "R11D";
          });
          console.log("files", this.ZakatFileCount);
          console.log("files", this.ChartedFileCount);
          console.log("files", this.FinancialFileCount);

          if (
            +this.taxPayerDetails.SaudiShareCaptl.split(".")[0] != 0 &&
            +this.taxPayerDetails.NonSaudiShareCaptl.split(".")[0] != 0 &&
            +this.taxPayerDetails.SaudiSharePrft.split(".")[0] != 0 &&
            +this.taxPayerDetails.NonSaudiSharePrft.split(".")[0] != 0
          ) {
            this.zakatCalculationStepShow = true;
            this.taxCalculationStepShow = true;
          } else if (
            +this.taxPayerDetails.SaudiShareCaptl.split(".")[0] == 0 ||
            +this.taxPayerDetails.SaudiSharePrft.split(".")[0] == 0
          ) {
            this.taxCalculationStepShow = true;
            this.zakatCalculationStepShow = false;
          } else if (
            +this.taxPayerDetails.NonSaudiShareCaptl.split(".")[0] == 0 ||
            +this.taxPayerDetails.NonSaudiSharePrft.split(".")[0] == 0
          ) {
            this.taxCalculationStepShow = false;
            this.zakatCalculationStepShow = true;
          }

          if (this.taxPayerDetails.AgreeFg == "") {
            jQuery("#infoModal").modal("show");
          }

          this.SetFormDetails();
          this.CalculateTotals();
          if (
            (data["d"]["Statusz"] == "E0045" && !this.isAmendment) ||
            (data["d"]["Statusz"] == "E0055" && !this.isAmendment) ||
            (data["d"]["Statusz"] == "E0006" && !this.isAmendment)
          ) {
            this.step = 10;
          }
        }, 1000);
      });
  }
  enableButton(event) {
    if (event.target.checked) {
      this.agree = true;
    }
  }

  ScheduleApplicable(event) {
    if (event.target.checked) {
      this.GainLossForm.patchValue({ Schedule: true });
      this.GainLossFormChange = true;
      // this.taxPayerDetails.RGainloss='X';
      jQuery("#scheduleModal").modal("show");
    } else {
      this.notApplicableAction = "gainLossForm";
      //this.GainLossForm.patchValue({'Schedule':true});
      //jQuery("#switch01").prop('checked',true);
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  ScheduleIncomeRevenueApplicable(event) {
    if (event.target.checked) {
      this.IncomeFromBankingForm.patchValue({ Schedule: true });
      this.IncomeFromBankingFormChange = true;
      //this.taxPayerDetails.ROtherrev='X';
      jQuery("#scheduleRevenueModal").modal("show");
    } else {
      this.notApplicableAction = "IncomeFromBanking";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  AddGainLossSecurity() {
    return this.fb.group({
      Company: [null, Validators.required],
      SellingAmount: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
      Cost: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(99999999999.99),
        ],
      ],
      ProfitLoss: ["0.00"],
    });
  }
  AddRevenueForm() {
    return this.fb.group({
      Statement: [null, Validators.required],
      Amount: [
        "0.00",
        [
          Validators.required,
          Validators.min(0),
          Validators.max(99999999999.99),
        ],
      ],
    });
  }
  AddBankRevenueForm() {
    return this.fb.group({
      Statement: [null, Validators.required],
      Address: [null, Validators.required],
      DepositTerm: [""],
      Value: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddFinanceRevenueForm() {
    return this.fb.group({
      Statement: [null, Validators.required],
      Amount: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddProvisionRevenueForm() {
    return this.fb.group({
      ProvisionType: [null, Validators.required],
      BeginingBalance: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      ProvisionCreditDuringTheYear: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      UtilizedDuringPeriod: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      Settlements: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
      EndingBalance: ["0.00", Validators.required],
    });
  }
  AddRoyalityTechnicalSecurity() {
    return this.fb.group({
      IdType: [null, Validators.required],
      IdNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      BeneficiaryName: [null, [Validators.required, Validators.maxLength(150)]],
      InterExternal: [null, Validators.required],
      Country: [null, Validators.required],
      ServiceType: [null, [Validators.required, Validators.maxLength(150)]],
      ChargedToTheAccounts: [
        null,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      PaidDuringTheYear: [
        null,
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddOtherExpenses() {
    return this.fb.group({
      Statement: [null, Validators.required],
      Amount: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddAdjustmentNetProfits() {
    return this.fb.group({
      Adjustment: [null, Validators.required],
      Statement: [null],
      Amount: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddCapitals() {
    moment.locale("en-Us");
    return this.fb.group({
      AdditionSource: ["I", Validators.required],
      BeginOfPeriodBalance: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
      AmountDedFromCapDurCurrent: [
        "0.00",
        [Validators.required, Validators.min(0.0)],
      ],
      AddToTheCapitalDuringYear: [
        "0.00",
        [Validators.required, Validators.min(0.0)],
      ],
      EOPBalance: ["0.00"],
      UtilizeNonZakat: ["0.00"],
      UtilizeZakat: ["0.00"],

      DOCapAdd: [
        moment(),
        [
          Validators.required,
          Validators.max(this.periodEndDate),
          Validators.min(this.periodStartDate),
        ],
      ],
      DOEOFinYea: [moment()],
      NoDays: [0],
      CapSubZakat: [0],
    });
  }
  AddEquityEqualantFunds() {
    return this.fb.group({
      Statement: [null, [Validators.required, Validators.maxLength(150)]],
      Amount: [
        "0.00",
        [
          Validators.required,
          Validators.min(-99999999999.99),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddLongTermLoans() {
    return this.fb.group({
      DebtType: [null, Validators.required],
      LocalForeign: [null, Validators.required],
      DueInYearDays: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      DueAfterYearDays: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddLongTermDebts() {
    return this.fb.group({
      DebtType: [null, Validators.required],
      LocalForeign: [null, Validators.required],
      DueInYearDays: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      DueAfterYearDays: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddSukuks() {
    return this.fb.group({
      NameOfSukuk: [null, Validators.required],
      MaturityDate: [null, Validators.required],
      DueInYearDays: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
      DueAfterYearDays: [
        "0.00",
        [
          Validators.required,
          Validators.min(0.0),
          Validators.max(999999999999.99),
        ],
      ],
    });
  }
  AddPartyTransactions() {
    return this.fb.group({
      Transaction: [null, Validators.required],
      Description: [null, Validators.required],
      NameOfRelatedParty: [null, Validators.required],
      Jurisdiction: [null, Validators.required],
      TransactionNature: [null, Validators.required],
      Amount: ["0.00", Validators.required],
      TPMethod: [null, Validators.required],
    });
  }
  AddRelatedPartiesSet() {
    return this.fb.group({
      TransactionDescription: [null, Validators.required],
      CounterParty: [null, Validators.required],
      Jurisdiction: [null, Validators.required],
    });
  }
  AddShareholdersSet() {
    return this.fb.group({
      ShareHoldersName: [null, Validators.required],
      Jurisdiction: [null, Validators.required],
      OwnerShipPercentage: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }
  get GainLossSecurities(): FormArray {
    return this.GainLossForm.get("GainLossSecurities") as FormArray;
  }
  get OtherRevenues(): FormArray {
    return this.IncomeFromBankingForm.get("OtherRevenues") as FormArray;
  }
  get BankRevenues(): FormArray {
    return this.CostOfRevenueBankingForm.get("BankRevenues") as FormArray;
  }
  get FinanceRevenues(): FormArray {
    return this.CostOfRevenueFinancingForm.get("FinanceRevenues") as FormArray;
  }
  get Provisions(): FormArray {
    return this.ProvisionMadeDuringForm.get("Provisions") as FormArray;
  }
  get RoyalityTechnicalSecurities(): FormArray {
    return this.RoyalityTechnicalServicesForm.get(
      "RoyalityTechnicalSecurities"
    ) as FormArray;
  }
  get OtherExpenses(): FormArray {
    return this.OtherExpensesForm.get("OtherExpenses") as FormArray;
  }
  get AdjustmentNetProfits(): FormArray {
    return this.AdjustmentToNetProfitForm.get(
      "AdjustmentNetProfits"
    ) as FormArray;
  }
  get Capitals(): FormArray {
    return this.CapitalZakatForm.get("Capitals") as FormArray;
  }
  get EquityEqualantFunds(): FormArray {
    return this.EquityEqualantFundResourceForm.get(
      "EquityEqualantFunds"
    ) as FormArray;
  }
  get LongTermLoans(): FormArray {
    return this.LongTermEquivalentForm.get("LongTermLoans") as FormArray;
  }
  get LongTermDebts(): FormArray {
    return this.LongTermDebtsEquivalentForm.get("LongTermDebts") as FormArray;
  }
  get Sukuks(): FormArray {
    return this.InvestmentsGovernmentSukukForm.get("Sukuks") as FormArray;
  }
  get PartyTransactionsSet(): FormArray {
    return this.TransactionDetailsForm.get("PartyTransactionsSet") as FormArray;
  }
  get RelatedPartiesSet(): FormArray {
    return this.RelatedPartiesYesForm.get("RelatedPartiesSet") as FormArray;
  }
  get ShareholdersSet(): FormArray {
    return this.ShareHoldersDetailsForm.get("ShareholdersSet") as FormArray;
  }
  DeleteGainLossSecurity(pi) {
    const control = this.GainLossForm.get("GainLossSecurities") as FormArray;
    control.removeAt(pi);
    this.TotalsCalculation();
  }
  DeleteOtherRevenue(pi) {
    const control = this.IncomeFromBankingForm.get(
      "OtherRevenues"
    ) as FormArray;
    control.removeAt(pi);
    this.totalOtherRevenues();
  }
  DeleteBankingRevenueRow(pi) {
    if (pi > 5) {
      const control = this.CostOfRevenueBankingForm.get(
        "BankRevenues"
      ) as FormArray;
      control.removeAt(pi);
      this.TotalBankingRevenueCalculation();
    }
  }
  DeleteFinancingRevenueRow(pi) {
    const control = this.CostOfRevenueFinancingForm.get(
      "FinanceRevenues"
    ) as FormArray;
    control.removeAt(pi);
    this.TotalFinanceRevenueCalculation();
  }
  DeleteProvisionRow(pi) {
    const control = this.ProvisionMadeDuringForm.get("Provisions") as FormArray;
    control.removeAt(pi);
    this.TotalProvisionEndingCalculation();
  }
  DeleteRoyalityTechnicalSecuritiesRow(pi) {
    const control = this.RoyalityTechnicalServicesForm.get(
      "RoyalityTechnicalSecurities"
    ) as FormArray;
    control.removeAt(pi);
    this.TotalsRoyalityCalculations();
  }
  DeleteOtherExpensesRow(pi) {
    const control = this.OtherExpensesForm.get("OtherExpenses") as FormArray;
    control.removeAt(pi);
    this.OtherExpensesTotalCalculation();
  }
  DeleteAdjustmentNetProfits(pi) {
    const control = this.AdjustmentToNetProfitForm.get(
      "AdjustmentNetProfits"
    ) as FormArray;
    control.removeAt(pi);
    this.AdjustmentNetProfitTotalCalculation();
  }
  DeleteCapital(pi) {
    const control = this.CapitalZakatForm.get("Capitals") as FormArray;
    control.removeAt(pi);
    this.CapitalTotalsCalculation();
  }
  DeleteEquityEqualantFunds(pi) {
    const control = this.EquityEqualantFundResourceForm.get(
      "EquityEqualantFunds"
    ) as FormArray;
    control.removeAt(pi);
    this.TotalEquityFundsCalculations();
  }
  DeleteLongTermLoans(pi) {
    const control = this.LongTermEquivalentForm.get(
      "LongTermLoans"
    ) as FormArray;
    control.removeAt(pi);
    this.TotalLongTermCalculations();
  }
  DeleteLongTermDebts(pi) {
    const control = this.LongTermDebtsEquivalentForm.get(
      "LongTermDebts"
    ) as FormArray;
    control.removeAt(pi);
    this.TotalLongTermDebtCalculations();
  }
  DeleteSukuks(pi) {
    const control = this.InvestmentsGovernmentSukukForm.get(
      "Sukuks"
    ) as FormArray;
    control.removeAt(pi);
    this.TotalSukuksCalculations();
  }
  DeletePartyTransaction(pi) {
    const control = this.TransactionDetailsForm.get(
      "PartyTransactionsSet"
    ) as FormArray;
    control.removeAt(pi);
  }
  DeleteTransaction(pi) {
    const control = this.RelatedPartiesYesForm.get(
      "RelatedPartiesSet"
    ) as FormArray;
    control.removeAt(pi);
  }
  DeleteShareholdersSet(pi) {
    const control = this.ShareHoldersDetailsForm.get(
      "ShareholdersSet"
    ) as FormArray;
    control.removeAt(pi);
  }
  AddRow() {
    this.GainLossFormChange = true;
    let type = this.AddGainLossSecurity();
    this.GainLossSecurities.push(type);
    console.log(this.GainLossSecurities);
  }
  AddRevenueRow() {
    this.IncomeFromBankingFormChange = true;
    let revenueForm = this.AddRevenueForm();
    this.OtherRevenues.push(revenueForm);
  }
  AddBankRevenueRow() {
    this.CostOfRevenueBankingFormChange = true;
    let bankRevenueRowForm = this.AddBankRevenueForm();
    this.BankRevenues.push(bankRevenueRowForm);
  }
  AddFinanceRevenueRow() {
    this.CostOfRevenueFinancingFormChange = true;
    let FinanceRevenueRowForm = this.AddFinanceRevenueForm();
    this.FinanceRevenues.push(FinanceRevenueRowForm);
  }
  AddProvisionRevenueRow() {
    this.ProvisionMadeDuringFormChange = true;
    let ProvisionRevenueRowForm = this.AddProvisionRevenueForm();
    this.Provisions.push(ProvisionRevenueRowForm);
    console.log(this.Provisions);
  }
  AddTechnicalSecurityRow() {
    this.RoyalityTechnicalServicesFormChange = true;
    let TechnicalSecurityRowForm = this.AddRoyalityTechnicalSecurity();
    this.RoyalityTechnicalSecurities.push(TechnicalSecurityRowForm);
    console.log(this.RoyalityTechnicalSecurities.controls.length);
    this.ManageNameControl(
      this.RoyalityTechnicalSecurities.controls.length - 1
    );
  }
  AddOtherExpensesRow() {
    this.OtherExpensesFormChange = true;
    let otherExpensesRow = this.AddOtherExpenses();
    this.OtherExpenses.push(otherExpensesRow);
  }
  AddAdjustmentNetProfitRow() {
    this.AdjustmentToNetProfitFormChange = true;
    let adjustmentNetProfitRow = this.AddAdjustmentNetProfits();
    this.AdjustmentNetProfits.push(adjustmentNetProfitRow);
  }
  AddCapitalsRow() {
    this.CapitalZakatFormChange = true;
    let CapitalRow = this.AddCapitals();
    this.Capitals.push(CapitalRow);
  }
  AddEquityFundRow() {
    this.EquityEqualantFundResourceFormChange = true;
    let EquityFundRow = this.AddEquityEqualantFunds();
    this.EquityEqualantFunds.push(EquityFundRow);
  }
  AddLongTermRow() {
    this.LongTermEquivalentFormChange = true;
    let LongTermRow = this.AddLongTermLoans();
    this.LongTermLoans.push(LongTermRow);
  }
  AddLongTermDebtRow() {
    this.LongTermDebtsEquivalentFormChange = true;
    let LongTermRow = this.AddLongTermDebts();
    this.LongTermDebts.push(LongTermRow);
  }
  AddSukukRow() {
    this.InvestmentsGovernmentSukukFormChange = true;
    let SukukRow = this.AddSukuks();
    this.Sukuks.push(SukukRow);
  }
  AddTransactionRow() {
    let transactionRow = this.AddPartyTransactions();
    this.PartyTransactionsSet.push(transactionRow);
  }
  AddRelatedPartiesRow() {
    let PartiesRow = this.AddRelatedPartiesSet();
    this.RelatedPartiesSet.push(PartiesRow);
  }
  AddShareholdersSetRow() {
    let shareholderSetRow = this.AddShareholdersSet();
    this.ShareholdersSet.push(shareholderSetRow);
  }
  TotalsCalculation() {
    this.GainLossForm.value.TotalCost = 0.0;
    this.GainLossForm.value.TotalSellingAmount = 0.0;
    this.GainLossForm.value.TotalProfitLoss = 0.0;
    let sellingAmount = 0;
    let totalCost = 0;
    let totalProfitLoss = 0;
    for (let i = 0; i < this.GainLossSecurities.controls.length; i++) {
      sellingAmount =
        sellingAmount +
        +this.GainLossSecurities.controls[i].value.SellingAmount;
      totalCost = totalCost + +this.GainLossSecurities.controls[i].value.Cost;
      totalProfitLoss =
        totalProfitLoss + +this.GainLossSecurities.controls[i].value.ProfitLoss;
      // this.GainLossForm.patchValue({'TotalSellingAmount':(+this.GainLossForm.value.TotalSellingAmount)+(+this.GainLossSecurities.controls[i].value.SellingAmount)});
      // this.GainLossForm.patchValue({'TotalCost':(+this.GainLossForm.value.TotalCost)+(+this.GainLossSecurities.controls[i].value.Cost)});
      // this.GainLossForm.patchValue({'TotalProfitLoss':(+this.GainLossForm.value.TotalProfitLoss)+(+this.GainLossSecurities.controls[i].value.ProfitLoss)});
    }
    // console.log(this.GainLossForm.value.TotalSellingAmount);
    // console.log(this.GainLossForm.value.TotalCost);
    // console.log(this.GainLossForm.value.TotalProfitLoss);
    this.GainLossForm.patchValue({
      TotalSellingAmount: parseFloat(sellingAmount.toString()).toFixed(2),
    });
    this.GainLossForm.patchValue({
      TotalCost: parseFloat(totalCost.toString()).toFixed(2),
    });
    this.GainLossForm.patchValue({
      TotalProfitLoss: parseFloat(totalProfitLoss.toString()).toFixed(2),
    });
    this.taxPayerDetails.GainSellingSec = this.GainLossForm.value.TotalSellingAmount;
    this.CalculateTotals();
  }
  TotalCITCalculations() {
    this.AdjustedCarriedCITLosessForm.patchValue({
      AdjustedDeclaredNetProfit: parseFloat(
        this.AdjustedCarriedCITLosessForm.value.AdjustedDeclaredNetProfit
      ).toFixed(2),
    });
    this.AdjustedCarriedCITLosessForm.patchValue({
      AdjustedCarriedFwdLosses: parseFloat(
        this.AdjustedCarriedCITLosessForm.value.AdjustedCarriedFwdLosses
      ).toFixed(2),
    });
    if (
      (+this.AdjustedCarriedCITLosessForm.value.AdjustedDeclaredNetProfit *
        25) /
        100 <
      +this.AdjustedCarriedCITLosessForm.value.AdjustedCarriedFwdLosses
    ) {
      this.AdjustedCarriedCITLosessForm.patchValue({
        LossesDeductedDuringYear:
          (+this.AdjustedCarriedCITLosessForm.value.AdjustedDeclaredNetProfit *
            25) /
          100,
      });
    } else {
      this.AdjustedCarriedCITLosessForm.patchValue({
        LossesDeductedDuringYear: +this.AdjustedCarriedCITLosessForm.value
          .AdjustedCarriedFwdLosses,
      });
    }
    this.AdjustedCarriedCITLosessForm.patchValue({
      EndOfYearBalance: parseFloat(
        (
          +this.AdjustedCarriedCITLosessForm.value.AdjustedCarriedFwdLosses -
          +this.AdjustedCarriedCITLosessForm.value.LossesDeductedDuringYear
        ).toString()
      ).toFixed(2),
    });
    console.log(
      "hihihihihi",
      this.AdjustedCarriedCITLosessForm.value.LossesDeductedDuringYear
    );
    this.taxPayerDetails.NonSaudiCarryFwd = parseFloat(
      this.AdjustedCarriedCITLosessForm.value.LossesDeductedDuringYear
    ).toFixed(2);
    console.log(
      "this.taxPayerDetails.NonSaudiCarryFwd",
      this.taxPayerDetails.NonSaudiCarryFwd
    );
    this.CalculateTotals();
  }
  TotalEquityFundsCalculations() {
    this.EquityEqualantFundResourceForm.patchValue({ Amount: 0.0 });
    for (let i = 0; i < this.EquityEqualantFunds.controls.length; i++) {
      this.EquityEqualantFunds.controls[i].patchValue({
        Amount: parseFloat(
          this.EquityEqualantFunds.controls[i].value.Amount
        ).toFixed(2),
      });
      this.EquityEqualantFundResourceForm.patchValue({
        Amount: parseFloat(
          this.EquityEqualantFundResourceForm.value.Amount +
            +this.EquityEqualantFunds.controls[i].value.Amount
        ).toFixed(2),
      });
    }
    this.taxPayerDetails.EquIntFunds = this.EquityEqualantFundResourceForm.value.Amount.toString();
    this.CalculateTotals();
  }
  TotalLongTermCalculations() {
    this.LongTermEquivalentForm.patchValue({ Amount: 0.0 });
    this.LongTermEquivalentForm.patchValue({ AmountDueIn: 0.0 });
    for (let i = 0; i < this.LongTermLoans.controls.length; i++) {
      this.LongTermEquivalentForm.patchValue({
        Amount: parseFloat(
          this.LongTermEquivalentForm.value.Amount +
            +this.LongTermLoans.controls[i].value.DueAfterYearDays
        ).toFixed(2),
      });
      this.LongTermEquivalentForm.patchValue({
        AmountDueIn: parseFloat(
          this.LongTermEquivalentForm.value.AmountDueIn +
            +this.LongTermLoans.controls[i].value.DueInYearDays
        ).toFixed(2),
      });
    }
    this.taxPayerDetails.LongTermLoan = this.LongTermEquivalentForm.value.Amount.toString();
    this.CalculateTotals();
  }
  TotalLongTermDebtCalculations() {
    this.LongTermDebtsEquivalentForm.patchValue({ Amount: 0.0 });
    this.LongTermDebtsEquivalentForm.patchValue({ AmountDueIn: 0.0 });
    for (let i = 0; i < this.LongTermDebts.controls.length; i++) {
      this.LongTermDebts.controls[i].patchValue({
        DueAfterYearDays: parseFloat(
          this.LongTermDebts.controls[i].value.DueAfterYearDays
        ).toFixed(2),
      });
      this.LongTermDebts.controls[i].patchValue({
        DueInYearDays: parseFloat(
          this.LongTermDebts.controls[i].value.DueInYearDays
        ).toFixed(2),
      });
      this.LongTermDebtsEquivalentForm.patchValue({
        Amount: parseFloat(
          (
            +this.LongTermDebtsEquivalentForm.value.Amount +
            +this.LongTermDebts.controls[i].value.DueAfterYearDays
          ).toString()
        ).toFixed(2),
      });
      this.LongTermDebtsEquivalentForm.patchValue({
        AmountDueIn: parseFloat(
          +this.LongTermDebtsEquivalentForm.value.AmountDueIn +
            (+this.LongTermDebts.controls[i].value.DueInYearDays).toFixed(2)
        ),
      });
    }
    this.taxPayerDetails.LongTermDebt = this.LongTermDebtsEquivalentForm.value.Amount.toString();
    this.CalculateTotals();
  }
  TotalSukuksCalculations() {
    this.InvestmentsGovernmentSukukForm.value.Amount = 0.0;
    this.InvestmentsGovernmentSukukForm.value.AmountDueIn = 0.0;
    let amountDueIn = 0;
    let amount = 0;
    for (let i = 0; i < this.Sukuks.controls.length; i++) {
      this.Sukuks.controls[i].patchValue({
        DueInYearDays: parseFloat(
          this.Sukuks.controls[i].value.DueInYearDays
        ).toFixed(2),
      });
      this.Sukuks.controls[i].patchValue({
        DueAfterYearDays: parseFloat(
          this.Sukuks.controls[i].value.DueAfterYearDays
        ).toFixed(2),
      });
      amountDueIn = amountDueIn + +this.Sukuks.controls[i].value.DueInYearDays;
      amount = amount + +this.Sukuks.controls[i].value.DueAfterYearDays;
    }
    console.log("amountDueIn", amountDueIn);
    this.InvestmentsGovernmentSukukForm.patchValue({
      Amount: parseFloat(amount.toString()).toFixed(2),
    });
    this.InvestmentsGovernmentSukukForm.patchValue({
      AmountDueIn: parseFloat(amountDueIn.toString()).toFixed(2),
    });
    this.taxPayerDetails.InvDebtGovBear = parseFloat(
      this.InvestmentsGovernmentSukukForm.value.AmountDueIn.toString()
    ).toFixed(2);
    this.CalculateTotals();
  }
  ProfitLossCalculation(pi) {
    this.GainLossSecurities.controls[pi].patchValue({
      SellingAmount: parseFloat(
        this.GainLossSecurities.controls[pi].value.SellingAmount || 0
      ).toFixed(2),
    });
    this.GainLossSecurities.controls[pi].patchValue({
      Cost: parseFloat(
        this.GainLossSecurities.controls[pi].value.Cost || 0
      ).toFixed(2),
    });
    this.GainLossSecurities.controls[pi].patchValue({
      ProfitLoss: parseFloat(
        (
          +this.GainLossSecurities.controls[pi].value.SellingAmount -
          +this.GainLossSecurities.controls[pi].value.Cost
        ).toString()
      ).toFixed(2),
    });
    this.TotalsCalculation();
  }
  clearFormArrayClose() {
    const GainLossSecurities = this.GainLossForm.get(
      "GainLossSecurities"
    ) as FormArray;
    this.clearFormArray(GainLossSecurities);
    this.SetFormDetails();
    //this.GainLossForm.patchValue({'Schedule':false});
    jQuery("#CloseModal").modal("hide");
    jQuery("#scheduleModal").modal("hide");
    jQuery("body").removeClass("modalopen");
    jQuery("#CloseModal").modal("hide");
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
  AddMultipleForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }

  AddMultipleRevenueForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRevenueRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleBankingRevenueForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddBankRevenueRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleBankingRevenueFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleFinancingRevenueForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddFinanceRevenueRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleFinancingRevenueFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleProvisionRevenueForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddProvisionRevenueRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleProvisionsRevenueFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleRoyalityTechnicalSecurities() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddTechnicalSecurityRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleRoyalityTechnicalSecuritiesFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleOtherExpenses() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddOtherExpensesRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleOtherExpensesFormsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleAdjustmentNetProfits() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddAdjustmentNetProfitRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleAdjustmentNetProfitRowsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleCapitals() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddCapitalsRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleCapitalsRowsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleEquities() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddEquityFundRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleEquityFundsRowsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleLongTerms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddLongTermRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleLongTermRowsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleLongTermDebts() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddLongTermDebtRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleLongTermDebtsRowsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  AddMultipleSukuks() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddSukukRow();
    }
    this.NoOfAddedForms = 0;
    jQuery("#addMultipleSukuksRowsModal").modal("hide");
    jQuery("body").addClass("modalopen");
  }
  clearRevenueFormArrayClose() {
    const control = this.IncomeFromBankingForm.get(
      "OtherRevenues"
    ) as FormArray;
    this.clearFormArray(control);
    this.IncomeFromBankingForm.patchValue({ TotalAmount: 0.0 });
    this.SetFormDetails();
    jQuery("#CloseRevenueModal").modal("hide");
    jQuery("#scheduleRevenueModal").modal("hide");
    //this.IncomeFromBankingForm.patchValue({ 'Schedule': false });
    jQuery("body").removeClass("modalopen");
  }
  clearBankingRevenueFormArrayClose() {
    const control = this.CostOfRevenueBankingForm.get(
      "BankRevenues"
    ) as FormArray;
    this.clearFormArray(control);
    this.CostOfRevenueBankingForm.value.TotalAmount = 0.0;
    this.taxPayerDetails.RCostmain = "";
    this.taxPayerDetails.RCostMan = "";
    this.CostOfRevenueModalApplicable = false;
    this.SelectedCostOfRevenueOptions = "";
    this.SetFormDetails();
    jQuery("#CloseBankingRevenueModal").modal("hide");
    jQuery("#CostOfRevenueOptionsModal").modal("hide");
    jQuery("#CostOfBankingModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  clearFinancingRevenueFormArrayClose() {
    const control = this.CostOfRevenueFinancingForm.get(
      "FinanceRevenues"
    ) as FormArray;
    this.clearFormArray(control);
    this.CostOfRevenueFinancingForm.value.TotalAmount = 0.0;
    this.taxPayerDetails.RCostmain = "";
    this.taxPayerDetails.RCostMan = "";
    this.CostOfRevenueModalApplicable = false;
    this.SelectedCostOfRevenueOptions = "";
    this.SetFormDetails();
    jQuery("#CloseFinancingRevenueModal").modal("hide");
    jQuery("#CostOfRevenueOptionsModal").modal("hide");
    jQuery("#CostOfFinancingModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  clearProvisionRevenueFormArrayClose() {
    const control = this.ProvisionMadeDuringForm.get("Provisions") as FormArray;
    this.clearFormArray(control);
    this.ProvisionMadeDuringForm.value.TotalAmount = 0.0;
    this.SetFormDetails();
    jQuery("#CloseProvisionRevenueModal").modal("hide");
    jQuery("#ProvisionsMadeDuringPeriodModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearRoyalityTechnicalSecurityFormArrayClose() {
    const control = this.RoyalityTechnicalServicesForm.get(
      "RoyalityTechnicalSecurities"
    ) as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseRoyalitySecurityModal").modal("hide");
    jQuery("#RoyalityTechnicalSecurityModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearOtherExpensesClose() {
    const control = this.OtherExpensesForm.get("OtherExpenses") as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseOtherExpensesModal").modal("hide");
    jQuery("#OtherExpensesModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearDepreciationClose() {
    this.SetFormDetails();
    // this.taxPayerDetails.RDepriciation = '';
    // this.DepreciationDifferencesForm.patchValue({ 'Schedule': false });
    // this.DepreciationDifferencesForm.reset();
    // this.taxPayerDetails.DepDiff = "0.00";
    jQuery("#CloseDepreciationFormsModal").modal("hide");
    // jQuery('#switchd02').prop('checked', false);
    jQuery("#DepreciationDifferenceModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearAdjustmentNetProfitsClose() {
    const control = this.AdjustmentToNetProfitForm.get(
      "AdjustmentNetProfits"
    ) as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseAdjustmentNetProfitsModal").modal("hide");
    jQuery("#AdjustmentToNetProfitModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearAdjustCITClose() {
    this.SetFormDetails();
    jQuery("#CloseAdjustedCITFormsModal").modal("hide");
    jQuery("#NonSaudiCurrentYearModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearCapitalClose() {
    const control = this.CapitalZakatForm.get("Capitals") as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseCapitalsModal").modal("hide");
    jQuery("#CapitalZakatModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearEquityFundClose() {
    const control = this.EquityEqualantFundResourceForm.get(
      "EquityEqualantFunds"
    ) as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseEquityEqualentModal").modal("hide");
    jQuery("#EquityFundsModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearLongTermLoansClose() {
    const control = this.LongTermEquivalentForm.get(
      "LongTermLoans"
    ) as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseLongTermEquivalentModal").modal("hide");
    jQuery("#LongTermModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearLongTermDebtsClose() {
    const control = this.LongTermDebtsEquivalentForm.get(
      "LongTermDebts"
    ) as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseLongTermDebtEquivalentModal").modal("hide");
    jQuery("#LongTermDebtsModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearSukuksClose() {
    const control = this.InvestmentsGovernmentSukukForm.get(
      "Sukuks"
    ) as FormArray;
    this.clearFormArray(control);
    this.SetFormDetails();
    jQuery("#CloseSukukModal").modal("hide");
    jQuery("#SukuksModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }
  ClearIncomeFromModalChange() {
    this.GetTaxpayerDetails();
    jQuery("#CloseIncomeFromLoansModal").modal("hide");
    jQuery("#IncomeFromLoansModal").modal("hide");
    jQuery("body").removeClass("modalopen");
  }

  TotalRevenueCalculation() {
    this.IncomeFromBankingForm.patchValue({ TotalAmount: 0.0 });
    let total = 0;
    for (let i = 0; i < this.OtherRevenues.controls.length; i++) {
      this.OtherRevenues.controls[i].patchValue({
        Amount: parseFloat(
          this.OtherRevenues.controls[i].value.Amount || 0
        ).toFixed(2),
      });
      total = total + +this.OtherRevenues.controls[i].value.Amount;
    }
    console.log("total", total);
    this.IncomeFromBankingForm.patchValue({ TotalAmount: total.toFixed(2) });
    this.taxPayerDetails.OtherRev = this.IncomeFromBankingForm.value.TotalAmount;
    console.log(
      "this.IncomeFromBankingForm.value.TotalAmount",
      this.IncomeFromBankingForm.value.TotalAmount
    );
    this.CalculateTotals();
  }
  TotalBankingRevenueCalculation() {
    this.taxPayerDetails.CostMain = 0;
    this.CostOfRevenueBankingForm.value.TotalAmount = 0.0;
    let amount = 0;
    for (let i = 0; i < this.BankRevenues.controls.length; i++) {
      this.BankRevenues.controls[i].patchValue({
        Value: parseFloat(
          this.BankRevenues.controls[i].value.Value || 0
        ).toFixed(2),
      });
      amount = amount + +this.BankRevenues.controls[i].value.Value;
    }
    this.CostOfRevenueBankingForm.patchValue({
      TotalAmount: parseFloat(amount.toString()).toFixed(2),
    });
    console.log(this.CostOfRevenueBankingForm.value.TotalAmount);
    this.taxPayerDetails.CostMain = parseFloat(
      this.CostOfRevenueBankingForm.value.TotalAmount
    ).toFixed(2);
  }
  TotalFinanceRevenueCalculation() {
    this.taxPayerDetails.CostMain = 0;
    this.CostOfRevenueFinancingForm.value.TotalAmount = 0.0;
    let amount = 0;
    for (let i = 0; i < this.FinanceRevenues.controls.length; i++) {
      this.FinanceRevenues.controls[i].patchValue({
        Amount: parseFloat(
          this.FinanceRevenues.controls[i].value.Amount || 0
        ).toFixed(2),
      });
      amount = amount + +this.FinanceRevenues.controls[i].value.Amount;
    }
    this.CostOfRevenueFinancingForm.patchValue({ TotalAmount: amount });
    console.log(this.CostOfRevenueFinancingForm.value.TotalAmount);
    this.taxPayerDetails.CostMain = parseFloat(
      this.CostOfRevenueFinancingForm.value.TotalAmount
    ).toFixed(2);
  }
  TotalsRoyalityCalculations() {
    this.RoyalityTechnicalServicesForm.patchValue({ ChargedToAccount: 0.0 });
    this.RoyalityTechnicalServicesForm.patchValue({ PaidDuringYear: 0.0 });
    let chargedAccount = 0;
    let PaidDuringYear = 0;
    for (let i = 0; i < this.RoyalityTechnicalSecurities.controls.length; i++) {
      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        ChargedToTheAccounts: parseFloat(
          this.RoyalityTechnicalSecurities.controls[i].value
            .ChargedToTheAccounts || 0
        ).toFixed(2),
      });
      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        PaidDuringTheYear: parseFloat(
          this.RoyalityTechnicalSecurities.controls[i].value
            .PaidDuringTheYear || 0
        ).toFixed(2),
      });
      chargedAccount =
        chargedAccount +
        +this.RoyalityTechnicalSecurities.controls[i].value
          .ChargedToTheAccounts;
      PaidDuringYear =
        PaidDuringYear +
        +this.RoyalityTechnicalSecurities.controls[i].value.PaidDuringTheYear;
    }
    console.log(chargedAccount, PaidDuringYear);
    this.RoyalityTechnicalServicesForm.patchValue({
      ChargedToAccount: parseFloat(chargedAccount.toString()).toFixed(2),
    });
    this.RoyalityTechnicalServicesForm.patchValue({
      PaidDuringYear: parseFloat(PaidDuringYear.toString()).toFixed(2),
    });
    this.taxPayerDetails.ProfessionalFee = this.RoyalityTechnicalServicesForm.value.ChargedToAccount;

    this.CalculateTotals();
  }
  OtherExpensesTotalCalculation() {
    this.OtherExpensesForm.patchValue({ Amount: 0.0 });
    let amount = 0;
    for (let i = 0; i < this.OtherExpenses.controls.length; i++) {
      this.OtherExpenses.controls[i].patchValue({
        Amount: parseFloat(
          this.OtherExpenses.controls[i].value.Amount || 0
        ).toFixed(2),
      });
      amount = amount + +this.OtherExpenses.controls[i].value.Amount;
    }
    this.OtherExpensesForm.patchValue({
      Amount: parseFloat(amount.toString()).toFixed(2),
    });
    this.taxPayerDetails.OtherExp = this.OtherExpensesForm.value.Amount.toString();
  }
  AdjustmentNetProfitTotalCalculation() {
    this.AdjustmentToNetProfitForm.value.Amount = 0.0;
    let amount = 0.0;
    for (let i = 0; i < this.AdjustmentNetProfits.controls.length; i++) {
      this.AdjustmentNetProfits.controls[i].patchValue({
        Amount: parseFloat(
          this.AdjustmentNetProfits.controls[i].value.Amount || 0
        ).toFixed(2),
      });
      amount = amount + +this.AdjustmentNetProfits.controls[i].value.Amount;
    }
    this.AdjustmentToNetProfitForm.patchValue({
      Amount: parseFloat(amount.toString()).toFixed(2),
    });
    this.taxPayerDetails.AdjNetProfit = parseFloat(
      (
        (this.AdjustmentToNetProfitForm.value.Amount *
          this.taxPayerDetails.WtNonSaudiSharePrft) /
        100
      ).toString()
    ).toFixed(2);
  }
  CapitalZakatCalculation(pi) {
    moment.locale("en-US");
    this.Capitals.controls[pi].patchValue({
      BeginOfPeriodBalance: parseFloat(
        this.Capitals.controls[pi].value.BeginOfPeriodBalance || 0
      ).toFixed(2),
    });
    this.Capitals.controls[pi].patchValue({
      AmountDedFromCapDurCurrent: parseFloat(
        this.Capitals.controls[pi].value.AmountDedFromCapDurCurrent || 0
      ).toFixed(2),
    });
    this.Capitals.controls[pi].patchValue({
      AddToTheCapitalDuringYear: parseFloat(
        this.Capitals.controls[pi].value.AddToTheCapitalDuringYear || 0
      ).toFixed(2),
    });

    if (this.taxPayerDetails.CalTyp == "G") {
      this.Capitals.controls[pi].patchValue({
        DOEOFinYea: moment(
          new Date(
            +this.taxPayerDetails.Abrzo.replace(")", "")
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD-MM-YYYY"),
      });
    } else {
      this.Capitals.controls[pi].patchValue({
        DOEOFinYea: this.CommonValidation.changeDate6(
          this.CommonValidation.dateFormate(
            this.CommonValidation.toJulianDate1(
              new Date(
                +this.taxPayerDetails.Abrzo.replace(")", "")
                  .toString()
                  .replace("/Date(", "")
                  .toString()
                  .replace("/", "")
              )
            ),
            "Islamic"
          )
        ),
      });
    }

    if (this.Capitals.controls[pi].value.AdditionSource == "I") {
      this.Capitals.controls[pi].patchValue({ UtilizeNonZakat: 0.0 });
      this.Capitals.controls[pi].patchValue({
        CapSubZakat: parseFloat(
          (
            +this.Capitals.controls[pi].value.DOEOFinYea.split("-")[0] -
            +this.periodStartDate.split("/")[0] +
            1
          ).toString()
        ).toFixed(2),
      });
    } else if (this.Capitals.controls[pi].value.AdditionSource == "E") {
      this.Capitals.controls[pi]
        .get("UtilizeNonZakat")
        .setValidators([
          Validators.min(0),
          Validators.max(
            +this.Capitals.controls[pi].value.AddToTheCapitalDuringYear
          ),
        ]);
      this.Capitals.controls[pi].patchValue({
        CapSubZakat: parseFloat(
          (
            +this.Capitals.controls[pi].value.BeginOfPeriodBalance -
              +this.Capitals.controls[pi].value.AmountDedFromCapDurCurrent +
              +this.Capitals.controls[pi].value.UtilizeNonZakat +
              +this.Capitals.controls[pi].value.UtilizeZakat *
                +this.Capitals.controls[pi].value.NoDays || 0
          ).toString()
        ).toFixed(2),
      });
    }
    this.Capitals.controls[pi].patchValue({
      EOPBalance: parseFloat(
        (
          +this.Capitals.controls[pi].value.BeginOfPeriodBalance -
            +this.Capitals.controls[pi].value.AmountDedFromCapDurCurrent +
            +this.Capitals.controls[pi].value.AddToTheCapitalDuringYear || 0
        ).toString()
      ).toFixed(2),
    });
    //this.Capitals.controls[pi].patchValue({'DOCapAdd':new Date()});
    //periodStartDate
    this.Capitals.controls[pi].patchValue({
      UtilizeZakat:
        +this.Capitals.controls[pi].value.AddToTheCapitalDuringYear -
        +this.Capitals.controls[pi].value.UtilizeNonZakat,
    });
    //this.Capitals.controls[pi].patchValue({'DOEOFinYea':new Date()});
    //console.log(this.Capitals.controls[pi].value.DOCapAdd.split('-'), this.Capitals.controls[pi].value.DOEOFinYea.split('-'))
    console.log(this.Capitals.controls[pi].value.DOCapAdd);
    if (this.Capitals.controls[pi].value.DOCapAdd != "") {
      let date;

      if (this.taxPayerDetails.CalTyp == "G") {
        date = this.CommonValidation.changeDate2(
          this.Capitals.controls[pi].value.DOCapAdd
        );
      } else {
        date = this.CommonValidation.changeDate4(
          this.Capitals.controls[pi].value.DOCapAdd
        );
      }

      // console.log(date);
      // console.log(this.Capitals.controls[pi].value.DOEOFinYea);
      // console.log(moment(this.Capitals.controls[pi].value.DOEOFinYea,'DD-MM-YYYY').diff(moment(date,'YYYY-MM-DD'),"days") )
      //console.log((((+((date).split('-')[2])) + (+(this.Capitals.controls[pi].value.DOEOFinYea).split('-')[0])) + 1));
      this.Capitals.controls[pi].patchValue({
        NoDays:
          moment(
            this.Capitals.controls[pi].value.DOEOFinYea,
            "DD-MM-YYYY"
          ).diff(moment(date, "YYYY-MM-DD"), "days") + 1 || "0",
      });
    }

    this.CapitalTotalsCalculation();
  }
  CapitalTotalsCalculation() {
    this.CapitalZakatForm.patchValue({ TotalBeginOfPeriodBalance: 0.0 });
    this.CapitalZakatForm.patchValue({ TotalAmountDedFromCapDurCurrent: 0.0 });
    this.CapitalZakatForm.patchValue({ TotalAddToTheCapitalDuringYear: 0.0 });
    this.CapitalZakatForm.patchValue({ TotalEOPBalance: 0.0 });
    this.CapitalZakatForm.patchValue({ TotalUtilizeNonZakat: 0.0 });
    this.CapitalZakatForm.patchValue({ TotalUtilizeZakat: 0.0 });
    this.CapitalZakatForm.patchValue({ TotalCapSubZakat: 0.0 });

    for (let i = 0; i < this.Capitals.controls.length; i++) {
      this.CapitalZakatForm.patchValue({
        TotalBeginOfPeriodBalance:
          this.CapitalZakatForm.value.TotalBeginOfPeriodBalance +
          +this.Capitals.controls[i].value.BeginOfPeriodBalance,
      });
      this.CapitalZakatForm.patchValue({
        TotalAmountDedFromCapDurCurrent:
          this.CapitalZakatForm.value.TotalAmountDedFromCapDurCurrent +
          +this.Capitals.controls[i].value.AmountDedFromCapDurCurrent,
      });
      this.CapitalZakatForm.patchValue({
        TotalAddToTheCapitalDuringYear:
          this.CapitalZakatForm.value.TotalAddToTheCapitalDuringYear +
          +this.Capitals.controls[i].value.AddToTheCapitalDuringYear,
      });
      this.CapitalZakatForm.patchValue({
        TotalEOPBalance:
          this.CapitalZakatForm.value.TotalEOPBalance +
          +this.Capitals.controls[i].value.EOPBalance,
      });
      this.CapitalZakatForm.patchValue({
        TotalUtilizeNonZakat:
          this.CapitalZakatForm.value.TotalUtilizeNonZakat +
          +this.Capitals.controls[i].value.UtilizeNonZakat,
      });
      this.CapitalZakatForm.patchValue({
        TotalUtilizeZakat:
          this.CapitalZakatForm.value.TotalUtilizeZakat +
          +this.Capitals.controls[i].value.UtilizeZakat,
      });
      this.CapitalZakatForm.patchValue({
        TotalCapSubZakat:
          this.CapitalZakatForm.value.TotalCapSubZakat +
          +this.Capitals.controls[i].value.CapSubZakat,
      });
    }
    this.taxPayerDetails.Capital = parseFloat(
      this.CapitalZakatForm.value.TotalCapSubZakat.toString() || 0
    ).toFixed(2);
  }
  EquityFundTotalCalculation() {
    this.EquityEqualantFundResourceForm.value.Amount = 0.0;
    let amount = 0;
    for (let i = 0; i < this.EquityEqualantFunds.controls.length; i++) {
      amount = amount + +this.EquityEqualantFunds.controls[i].value.Amount;
    }
    this.EquityEqualantFundResourceForm.patchValue({
      Amount: parseFloat(amount.toString()).toFixed(2),
    });
  }
  CostOfRevenuesModal(value) {
    if (value) {
      jQuery("#CostOfRevenueOptionsModal").modal("show");
    } else {
      this.notApplicableAction = "BankingFinancial";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  ProvisionModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RProvisionyr='X';
      this.ProvisionMadeDuringForm.patchValue({ Schedule: true });
      this.ProvisionMadeDuringFormChange = true;
      jQuery("#ProvisionsMadeDuringPeriodModal").modal("show");
    } else {
      this.notApplicableAction = "ProvisionForm";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  RoyalityTechnicalModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RRoyalser='X';
      this.RoyalityTechnicalServicesForm.patchValue({ Schedule: true });
      this.RoyalityTechnicalServicesFormChange = true;
      jQuery("#RoyalityTechnicalSecurityModal").modal("show");
    } else {
      this.notApplicableAction = "RoyalityTechnical";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  OtherExpensesModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.ROtherexp='X';
      this.OtherExpensesForm.patchValue({ Schedule: true });
      this.OtherExpensesFormChange = true;
      jQuery("#OtherExpensesModal").modal("show");
    } else {
      this.notApplicableAction = "OtherExpenses";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  DepreciationDifferencesModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RDepriciation='X';
      this.DepreciationDifferencesForm.patchValue({ Schedule: true });
      jQuery("#DepreciationDifferenceModal").modal("show");
    } else {
      this.notApplicableAction = "DepreciationDifference";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  AdjustmentToNetProfitModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RNetprofit='X';
      this.AdjustmentToNetProfitForm.patchValue({ Schedule: true });
      this.AdjustmentToNetProfitFormChange = true;
      jQuery("#AdjustmentToNetProfitModal").modal("show");
    } else {
      this.notApplicableAction = "AdjustmentToNetProfitForm";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  IncomeFromLoansModalChange(event) {
    if (event.target.checked) {
      this.taxPayerDetails.RLoanthold = "X";
      this.IncomeFromLoansForm.patchValue({ Schedule: true });
      this.IncomeFromLonasFormChange = true;
      jQuery("#IncomeFromLoansModal").modal("show");
    } else {
      this.notApplicableAction = "IncomeFromLoans";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  NonSaudiCurrentYearModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RNssharecap25='X';
      this.AdjustedCarriedCITLosessForm.patchValue({ Schedule: true });
      jQuery("#NonSaudiCurrentYearModal").modal("show");
    } else {
      this.notApplicableAction = "NonSaudiCurrentYearForm";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  CapitalZakatModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RCapital='X';
      this.CapitalZakatForm.patchValue({ Schedule: true });
      this.CapitalZakatFormChange = true;
      jQuery("#CapitalZakatModal").modal("show");
    } else {
      this.notApplicableAction = "CapitalZakatForm";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  EquityModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.REquity='X';
      this.EquityEqualantFundResourceForm.patchValue({ Schedule: true });
      this.EquityEqualantFundResourceFormChange = true;
      jQuery("#EquityFundsModal").modal("show");
    } else {
      this.notApplicableAction = "EquityFunds";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  LongTermModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RLongloan='X';
      this.LongTermEquivalentForm.patchValue({ Schedule: true });
      this.LongTermEquivalentFormChange = true;
      jQuery("#LongTermModal").modal("show");
    } else {
      this.notApplicableAction = "LongTerm";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  LongTermDebtsModalChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RLonddebit='X';
      this.LongTermDebtsEquivalentForm.patchValue({ Schedule: true });
      this.LongTermDebtsEquivalentFormChange = true;
      jQuery("#LongTermDebtsModal").modal("show");
    } else {
      this.notApplicableAction = "LongTermDebts";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  GovernmentSukuksChange(event) {
    if (event.target.checked) {
      //this.taxPayerDetails.RInvdebit='X';
      this.InvestmentsGovernmentSukukForm.patchValue({ Schedule: true });
      this.InvestmentsGovernmentSukukFormChange = true;
      jQuery("#SukuksModal").modal("show");
    } else {
      this.notApplicableAction = "Sukuks";
      jQuery("#NotApplicableForm").modal("show");
    }
  }
  CostOfRevenueOptionsApply() {
    if (this.SelectedCostOfRevenueOptions == "Banking") {
      //this.AddBankRevenueRow();
      this.CostOfRevenueBankingFormChange = true;
      jQuery("#CostOfBankingModal").modal("show");
    } else if (this.SelectedCostOfRevenueOptions == "FinancialActivities") {
      //this.AddFinanceRevenueRow();
      this.CostOfRevenueFinancingFormChange = true;
      jQuery("#CostOfFinancingModal").modal("show");
    }
  }
  EndingBalanceCalculation(pi) {
    this.Provisions.controls[pi].patchValue({
      BeginingBalance: parseFloat(
        this.Provisions.controls[pi].value.BeginingBalance || 0
      ).toFixed(2),
    });
    this.Provisions.controls[pi].patchValue({
      ProvisionCreditDuringTheYear: parseFloat(
        this.Provisions.controls[pi].value.ProvisionCreditDuringTheYear || 0
      ).toFixed(2),
    });
    this.Provisions.controls[pi].patchValue({
      UtilizedDuringPeriod: parseFloat(
        this.Provisions.controls[pi].value.UtilizedDuringPeriod || 0
      ).toFixed(2),
    });
    this.Provisions.controls[pi].patchValue({
      Settlements: parseFloat(
        this.Provisions.controls[pi].value.Settlements || 0
      ).toFixed(2),
    });
    console.log(
      +this.Provisions.controls[pi].value.BeginingBalance +
        +this.Provisions.controls[pi].value.ProvisionCreditDuringTheYear -
        +this.Provisions.controls[pi].value.UtilizedDuringPeriod +
        +this.Provisions.controls[pi].value.Settlements
    );
    this.Provisions.controls[pi].patchValue({
      EndingBalance: parseFloat(
        (
          +this.Provisions.controls[pi].value.BeginingBalance +
            +this.Provisions.controls[pi].value.ProvisionCreditDuringTheYear -
            +this.Provisions.controls[pi].value.UtilizedDuringPeriod +
            +this.Provisions.controls[pi].value.Settlements || 0
        ).toString()
      ).toFixed(2),
    });
    this.TotalProvisionEndingCalculation();
  }
  TotalProvisionEndingCalculation() {
    this.ProvisionMadeDuringForm.patchValue({ BeginingBalance: 0.0 });
    this.ProvisionMadeDuringForm.patchValue({
      ProvisionsCreatedDuringThisYear: 0.0,
    });
    this.ProvisionMadeDuringForm.patchValue({ UtilizedDuringThisPeriod: 0.0 });
    this.ProvisionMadeDuringForm.patchValue({ Settlements: 0.0 });
    this.ProvisionMadeDuringForm.patchValue({ EndingBalance: 0.0 });
    for (let i = 0; i < this.Provisions.controls.length; i++) {
      this.ProvisionMadeDuringForm.patchValue({
        BeginingBalance:
          this.ProvisionMadeDuringForm.value.BeginingBalance +
          (+this.Provisions.controls[i].value.BeginingBalance || 0),
      });
      this.ProvisionMadeDuringForm.patchValue({
        ProvisionsCreatedDuringThisYear:
          this.ProvisionMadeDuringForm.value.ProvisionsCreatedDuringThisYear +
          (+this.Provisions.controls[i].value.ProvisionCreditDuringTheYear ||
            0),
      });
      this.ProvisionMadeDuringForm.patchValue({
        UtilizedDuringThisPeriod:
          this.ProvisionMadeDuringForm.value.UtilizedDuringThisPeriod +
          (+this.Provisions.controls[i].value.UtilizedDuringPeriod || 0),
      });
      this.ProvisionMadeDuringForm.patchValue({
        Settlements:
          this.ProvisionMadeDuringForm.value.Settlements +
          (+this.Provisions.controls[i].value.Settlements || 0),
      });
      this.ProvisionMadeDuringForm.patchValue({
        EndingBalance:
          this.ProvisionMadeDuringForm.value.EndingBalance +
          (+this.Provisions.controls[i].value.EndingBalance || 0),
      });
    }
    this.taxPayerDetails.ProvMadePer = this.ProvisionMadeDuringForm.value.ProvisionsCreatedDuringThisYear.toString();
    this.CalculateTotals();
  }
  getCountriesDropdown() {
    this.from11Service
      .getCountriesDropdown(
        this.taxPayerDetails.Fbnumz,
        this.taxPayerDetails.Gpartz,
        this.taxPayerDetails.EndDt
      )
      .subscribe((data: any) => {
        this.AddressSet = data["d"]["DropdownSet"]["results"].filter((data) => {
          return data.FieldNm == "ADDR_TP" && data.FormNoNm == "ZDGD_1103";
        });
        this.DepositTermSet = data["d"]["DropdownSet"]["results"].filter(
          (data) => {
            return (
              data.FieldNm == "DEPOSIT_TERM" && data.FormNoNm == "ZDGD_1103"
            );
          }
        );
        this.IdTypes = data["d"]["DropdownSet"]["results"].filter((data) => {
          return data.FieldNm == "ID_TP" && data.FormNoNm == "ZDGD_1105";
        });
        this.countrySet = data["d"]["CountrySet"]["results"];
        // this.filteredCountries=data["d"]["CountrySet"]["results"];
        //this.ManageNameControl(0);
        // this.ManageNameControl(1);
        this.isReady = true;
        this.AdjustmentsNetProfitsSet = data["d"]["DropdownSet"][
          "results"
        ].filter((data) => {
          return data.FieldNm == "ADJUSTMENT" && data.FormNoNm == "ZDGD_1108";
        });
        this.InternaExternalSet = data["d"]["DropdownSet"]["results"].filter(
          (data) => {
            return (
              data.FieldNm == "RESIDENCE_TP" && data.FormNoNm == "ZDGD_1115"
            );
          }
        );
        this.transactionsSet = data["d"]["CBCR_DDSet"]["results"].filter(
          (data) => {
            return data.DrdwTy == "TXN";
          }
        );
        this.JurisdictionSet = data["d"]["CBCR_DDSet"]["results"].filter(
          (data) => {
            return data.DrdwTy == "JUR";
          }
        );
        this.TransactionNatureSet = data["d"]["CBCR_DDSet"]["results"].filter(
          (data) => {
            return data.DrdwTy == "AMT";
          }
        );
        this.TPMethodsSet = data["d"]["CBCR_DDSet"]["results"].filter(
          (data) => {
            return data.DrdwTy == "MTH";
          }
        );
        this.TaxJuridictionSet = data["d"]["CBCR_DDSet"]["results"].filter(
          (data) => {
            return data.DrdwTy == "JUR";
          }
        );
        console.log("hi", data["d"]);
        this.InternalExternalSet = data["d"]["BondsSet"]["results"];
        console.log(this.InternaExternalSet);

        console.log(this.transactionsSet); //Key : SeqNr Text : Descr
        console.log(this.AdjustmentsNetProfitsSet);
        console.log(this.countrySet);

        console.log("add", this.AddressSet);

        //  FieldNm == "ADDR_TP" && FormNoNm == "ZDGD_1103"
      });
  }
  AddressChange(event, index) {
    if (event.target.value == "I") {
      this.RoyalityTechnicalSecurities.controls[index].patchValue({
        Country: "SA",
      });
    } else if (event.target.value == "E") {
      this.RoyalityTechnicalSecurities.controls[index].patchValue({
        Country: "",
      });
    }
  }
  DepreciationsDifferentiationCalculations(formNumber) {
    this.DepreciationDifferencesForm.patchValue({
      LandGroupValueAtPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCostOfPreviousYearAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .LandCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCostOfCurrentAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value.LandCostOfCurrentAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .LandCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .LandCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      LandMaintananceCostOfGroup: parseFloat(
        (
          this.DepreciationDifferencesForm.value.LandMaintananceCostOfGroup || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstGroupValueAtPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FirstGroupValueAtPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCostOfPreviousYearAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FirstCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCostOfCurrentAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value.FirstCostOfCurrentAdditions ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FirstCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FirstCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstMaintananceCostOfGroup: parseFloat(
        (
          this.DepreciationDifferencesForm.value.FirstMaintananceCostOfGroup ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondGroupValueAtPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .SecondGroupValueAtPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCostOfPreviousYearAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .SecondCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCostOfCurrentAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value.SecondCostOfCurrentAdditions ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .SecondCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .SecondCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondMaintananceCostOfGroup: parseFloat(
        (
          this.DepreciationDifferencesForm.value.SecondMaintananceCostOfGroup ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdGroupValueAtPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .ThirdGroupValueAtPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCostOfPreviousYearAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .ThirdCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCostOfCurrentAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value.ThirdCostOfCurrentAdditions ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .ThirdCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .ThirdCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdMaintananceCostOfGroup: parseFloat(
        (
          this.DepreciationDifferencesForm.value.ThirdMaintananceCostOfGroup ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthGroupValueAtPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FourthGroupValueAtPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCostOfPreviousYearAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FourthCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCostOfCurrentAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value.FourthCostOfCurrentAdditions ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FourthCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FourthCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthMaintananceCostOfGroup: parseFloat(
        (
          this.DepreciationDifferencesForm.value.FourthMaintananceCostOfGroup ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthGroupValueAtPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FifthGroupValueAtPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCostOfPreviousYearAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FifthCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCostOfCurrentAdditions: parseFloat(
        (
          this.DepreciationDifferencesForm.value.FifthCostOfCurrentAdditions ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FifthCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          this.DepreciationDifferencesForm.value
            .FifthCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthMaintananceCostOfGroup: parseFloat(
        (
          this.DepreciationDifferencesForm.value.FifthMaintananceCostOfGroup ||
          0
        ).toString()
      ).toFixed(2),
    });
    if (formNumber == 0) {
      this.DepreciationDifferencesForm.patchValue({
        LandFiftyPercentCostCurrentPreviousAdditions: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .LandCostOfPreviousYearAdditions +
              +this.DepreciationDifferencesForm.value
                .LandCostOfCurrentAdditions) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        LandFiftyPercentDuringPreviousCurrentYear: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .LandCompensationDepreciationDuringPreviousYear +
              +this.DepreciationDifferencesForm.value
                .LandCompensationDepreciationDuringCurrentYear) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      // this.DepreciationDifferencesForm.get('LandFiftyPercentDuringPreviousCurrentYear').setValidators([Validators.min((+this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.LandFiftyPercentCostCurrentPreviousAdditions)), Validators.max((+this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.LandFiftyPercentCostCurrentPreviousAdditions))]);
      this.DepreciationDifferencesForm.patchValue({
        MinimumLandValue:
          +this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .LandFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        MaximumLandValue:
          +this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .LandFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        LandRemainingValueGroup:
          +this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .LandFiftyPercentCostCurrentPreviousAdditions -
            +this.DepreciationDifferencesForm.value
              .LandFiftyPercentDuringPreviousCurrentYear <
          0
            ? 0.0
            : parseFloat(
                (
                  +this.DepreciationDifferencesForm.value
                    .LandGroupValueAtPreviousYear +
                    +this.DepreciationDifferencesForm.value
                      .LandFiftyPercentCostCurrentPreviousAdditions -
                    +this.DepreciationDifferencesForm.value
                      .LandFiftyPercentDuringPreviousCurrentYear || 0
                ).toString()
              ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        LandDepreciationAmortizationValue: parseFloat(
          (
            (+this.DepreciationDifferencesForm.value.LandRemainingValueGroup *
              +this.DepreciationDifferencesForm.value
                .LandDepreciationAmortizationRatio) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        LandRemainingValueAtEndCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value.LandRemainingValueGroup -
              +this.DepreciationDifferencesForm.value
                .LandDepreciationAmortizationValue || 0
          ).toString()
        ).toFixed(2),
      });
      if (
        +this.DepreciationDifferencesForm.value.LandMaintananceCostOfGroup >
        (+this.DepreciationDifferencesForm.value
          .LandRemainingValueAtEndCurrentYear *
          4) /
          100
      ) {
        this.DepreciationDifferencesForm.patchValue({
          LandMaintancesExpenseExceedfourPercent: parseFloat(
            (
              +this.DepreciationDifferencesForm.value
                .LandMaintananceCostOfGroup -
                (+this.DepreciationDifferencesForm.value
                  .LandRemainingValueAtEndCurrentYear *
                  4) /
                  100 || 0
            ).toString()
          ).toFixed(2),
        });
      } else {
        this.DepreciationDifferencesForm.patchValue({
          LandMaintancesExpenseExceedfourPercent: "0.00",
        });
      }
      this.DepreciationDifferencesForm.patchValue({
        LandRemainingGroupAtEndOfCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value
              .LandRemainingValueAtEndCurrentYear +
              +this.DepreciationDifferencesForm.value
                .LandMaintancesExpenseExceedfourPercent || 0
          ).toString()
        ).toFixed(2),
      });
    } else if (formNumber == 1) {
      this.DepreciationDifferencesForm.patchValue({
        FirstFiftyPercentCostCurrentPreviousAdditions: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .FirstCostOfPreviousYearAdditions +
              +this.DepreciationDifferencesForm.value
                .FirstCostOfCurrentAdditions) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FirstFiftyPercentDuringPreviousCurrentYear: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .FirstCompensationDepreciationDuringPreviousYear +
              +this.DepreciationDifferencesForm.value
                .FirstCompensationDepreciationDuringCurrentYear) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      // this.DepreciationDifferencesForm.get('FirstFiftyPercentDuringPreviousCurrentYear').setValidators([Validators.min((+this.DepreciationDifferencesForm.value.FirstGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.FirstFiftyPercentCostCurrentPreviousAdditions)), Validators.max((+this.DepreciationDifferencesForm.value.FirstGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.FirstFiftyPercentCostCurrentPreviousAdditions))]);
      this.DepreciationDifferencesForm.patchValue({
        MinimumFirstValue:
          +this.DepreciationDifferencesForm.value
            .FirstGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .FirstFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        MaximumFirstValue:
          +this.DepreciationDifferencesForm.value
            .FirstGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .FirstFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        FirstRemainingValueGroup:
          +this.DepreciationDifferencesForm.value
            .FirstGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FirstFiftyPercentCostCurrentPreviousAdditions -
            +this.DepreciationDifferencesForm.value
              .FirstFiftyPercentDuringPreviousCurrentYear <
          0
            ? 0.0
            : parseFloat(
                (
                  +this.DepreciationDifferencesForm.value
                    .FirstGroupValueAtPreviousYear +
                    +this.DepreciationDifferencesForm.value
                      .FirstFiftyPercentCostCurrentPreviousAdditions -
                    +this.DepreciationDifferencesForm.value
                      .FirstFiftyPercentDuringPreviousCurrentYear || 0
                ).toString()
              ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FirstDepreciationAmortizationValue: parseFloat(
          (
            (+this.DepreciationDifferencesForm.value.FirstRemainingValueGroup *
              +this.DepreciationDifferencesForm.value
                .FirstDepreciationAmortizationRatio) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FirstRemainingValueAtEndCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value.FirstRemainingValueGroup -
              +this.DepreciationDifferencesForm.value
                .FirstDepreciationAmortizationValue || 0
          ).toString()
        ).toFixed(2),
      });
      if (
        +this.DepreciationDifferencesForm.value.FirstMaintananceCostOfGroup >
        (+this.DepreciationDifferencesForm.value
          .FirstRemainingValueAtEndCurrentYear *
          4) /
          100
      ) {
        this.DepreciationDifferencesForm.patchValue({
          FirstMaintancesExpenseExceedfourPercent: parseFloat(
            (
              +this.DepreciationDifferencesForm.value
                .FirstMaintananceCostOfGroup -
                (+this.DepreciationDifferencesForm.value
                  .FirstRemainingValueAtEndCurrentYear *
                  4) /
                  100 || 0
            ).toString()
          ).toFixed(2),
        });
      } else {
        this.DepreciationDifferencesForm.patchValue({
          FirstMaintancesExpenseExceedfourPercent: "0.00",
        });
      }
      this.DepreciationDifferencesForm.patchValue({
        FirstRemainingGroupAtEndOfCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value
              .FirstRemainingValueAtEndCurrentYear +
              +this.DepreciationDifferencesForm.value
                .FirstMaintancesExpenseExceedfourPercent || 0
          ).toString()
        ).toFixed(2),
      });
    } else if (formNumber == 2) {
      this.DepreciationDifferencesForm.patchValue({
        SecondFiftyPercentCostCurrentPreviousAdditions: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .SecondCostOfPreviousYearAdditions +
              +this.DepreciationDifferencesForm.value
                .SecondCostOfCurrentAdditions) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        SecondFiftyPercentDuringPreviousCurrentYear: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .SecondCompensationDepreciationDuringPreviousYear +
              +this.DepreciationDifferencesForm.value
                .SecondCompensationDepreciationDuringCurrentYear) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      // this.DepreciationDifferencesForm.get('SecondFiftyPercentDuringPreviousCurrentYear').setValidators([Validators.min((+this.DepreciationDifferencesForm.value.SecondGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.SecondFiftyPercentCostCurrentPreviousAdditions)), Validators.max((+this.DepreciationDifferencesForm.value.SecondGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.SecondFiftyPercentCostCurrentPreviousAdditions))]);

      this.DepreciationDifferencesForm.patchValue({
        MinimumSecondValue:
          +this.DepreciationDifferencesForm.value
            .SecondGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .SecondFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        MaximumSecondValue:
          +this.DepreciationDifferencesForm.value
            .SecondGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .SecondFiftyPercentCostCurrentPreviousAdditions,
      });

      this.DepreciationDifferencesForm.patchValue({
        SecondRemainingValueGroup:
          +this.DepreciationDifferencesForm.value
            .SecondGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .SecondFiftyPercentCostCurrentPreviousAdditions -
            +this.DepreciationDifferencesForm.value
              .SecondFiftyPercentDuringPreviousCurrentYear <
          0
            ? 0.0
            : parseFloat(
                (
                  +this.DepreciationDifferencesForm.value
                    .SecondGroupValueAtPreviousYear +
                    +this.DepreciationDifferencesForm.value
                      .SecondFiftyPercentCostCurrentPreviousAdditions -
                    +this.DepreciationDifferencesForm.value
                      .SecondFiftyPercentDuringPreviousCurrentYear || 0
                ).toString()
              ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        SecondDepreciationAmortizationValue: parseFloat(
          (
            (+this.DepreciationDifferencesForm.value.SecondRemainingValueGroup *
              +this.DepreciationDifferencesForm.value
                .SecondDepreciationAmortizationRatio) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        SecondRemainingValueAtEndCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value.SecondRemainingValueGroup -
              +this.DepreciationDifferencesForm.value
                .SecondDepreciationAmortizationValue || 0
          ).toString()
        ).toFixed(2),
      });
      if (
        +this.DepreciationDifferencesForm.value.SecondMaintananceCostOfGroup >
        (+this.DepreciationDifferencesForm.value
          .SecondRemainingValueAtEndCurrentYear *
          4) /
          100
      ) {
        this.DepreciationDifferencesForm.patchValue({
          SecondMaintancesExpenseExceedfourPercent: parseFloat(
            (
              +this.DepreciationDifferencesForm.value
                .SecondMaintananceCostOfGroup -
                (+this.DepreciationDifferencesForm.value
                  .SecondRemainingValueAtEndCurrentYear *
                  4) /
                  100 || 0
            ).toString()
          ).toFixed(2),
        });
      } else {
        this.DepreciationDifferencesForm.patchValue({
          SecondMaintancesExpenseExceedfourPercent: "0.00",
        });
      }
      this.DepreciationDifferencesForm.patchValue({
        SecondRemainingGroupAtEndOfCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value
              .SecondRemainingValueAtEndCurrentYear +
              +this.DepreciationDifferencesForm.value
                .SecondMaintancesExpenseExceedfourPercent || 0
          ).toString()
        ).toFixed(2),
      });
    } else if (formNumber == 3) {
      this.DepreciationDifferencesForm.patchValue({
        ThirdFiftyPercentCostCurrentPreviousAdditions: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .ThirdCostOfPreviousYearAdditions +
              +this.DepreciationDifferencesForm.value
                .ThirdCostOfCurrentAdditions) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        ThirdFiftyPercentDuringPreviousCurrentYear: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .ThirdCompensationDepreciationDuringPreviousYear +
              +this.DepreciationDifferencesForm.value
                .ThirdCompensationDepreciationDuringCurrentYear) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      // this.DepreciationDifferencesForm.get('ThirdFiftyPercentDuringPreviousCurrentYear').setValidators([Validators.min((+this.DepreciationDifferencesForm.value.ThirdGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.ThirdFiftyPercentCostCurrentPreviousAdditions)), Validators.max((+this.DepreciationDifferencesForm.value.ThirdGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.ThirdFiftyPercentCostCurrentPreviousAdditions))]);

      this.DepreciationDifferencesForm.patchValue({
        MinimumThirdValue:
          +this.DepreciationDifferencesForm.value
            .ThirdGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .ThirdFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        MaximumThirdValue:
          +this.DepreciationDifferencesForm.value
            .ThirdGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .ThirdFiftyPercentCostCurrentPreviousAdditions,
      });

      this.DepreciationDifferencesForm.patchValue({
        ThirdRemainingValueGroup:
          +this.DepreciationDifferencesForm.value
            .ThirdGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .ThirdFiftyPercentCostCurrentPreviousAdditions -
            +this.DepreciationDifferencesForm.value
              .ThirdFiftyPercentDuringPreviousCurrentYear <
          0
            ? 0.0
            : parseFloat(
                (
                  +this.DepreciationDifferencesForm.value
                    .ThirdGroupValueAtPreviousYear +
                    +this.DepreciationDifferencesForm.value
                      .ThirdFiftyPercentCostCurrentPreviousAdditions -
                    +this.DepreciationDifferencesForm.value
                      .ThirdFiftyPercentDuringPreviousCurrentYear || 0
                ).toString()
              ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        ThirdDepreciationAmortizationValue: parseFloat(
          (
            (+this.DepreciationDifferencesForm.value.ThirdRemainingValueGroup *
              +this.DepreciationDifferencesForm.value
                .ThirdDepreciationAmortizationRatio) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        ThirdRemainingValueAtEndCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value.ThirdRemainingValueGroup -
              +this.DepreciationDifferencesForm.value
                .ThirdDepreciationAmortizationValue || 0
          ).toString()
        ).toFixed(2),
      });
      if (
        +this.DepreciationDifferencesForm.value.ThirdMaintananceCostOfGroup >
        (+this.DepreciationDifferencesForm.value
          .ThirdRemainingValueAtEndCurrentYear *
          4) /
          100
      ) {
        this.DepreciationDifferencesForm.patchValue({
          ThirdMaintancesExpenseExceedfourPercent: parseFloat(
            (
              +this.DepreciationDifferencesForm.value
                .ThirdMaintananceCostOfGroup -
                (+this.DepreciationDifferencesForm.value
                  .ThirdRemainingValueAtEndCurrentYear *
                  4) /
                  100 || 0
            ).toString()
          ).toFixed(2),
        });
      } else {
        this.DepreciationDifferencesForm.patchValue({
          ThirdMaintancesExpenseExceedfourPercent: "0.00",
        });
      }
      this.DepreciationDifferencesForm.patchValue({
        ThirdRemainingGroupAtEndOfCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value
              .ThirdRemainingValueAtEndCurrentYear +
              +this.DepreciationDifferencesForm.value
                .ThirdMaintancesExpenseExceedfourPercent || 0
          ).toString()
        ).toFixed(2),
      });
    } else if (formNumber == 4) {
      this.DepreciationDifferencesForm.patchValue({
        FourthFiftyPercentCostCurrentPreviousAdditions: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .FourthCostOfPreviousYearAdditions +
              +this.DepreciationDifferencesForm.value
                .FourthCostOfCurrentAdditions) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FourthFiftyPercentDuringPreviousCurrentYear: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .FourthCompensationDepreciationDuringPreviousYear +
              +this.DepreciationDifferencesForm.value
                .FourthCompensationDepreciationDuringCurrentYear) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      // this.DepreciationDifferencesForm.get('FourthFiftyPercentDuringPreviousCurrentYear').setValidators([Validators.min((+this.DepreciationDifferencesForm.value.FourthGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.FourthFiftyPercentCostCurrentPreviousAdditions)), Validators.max((+this.DepreciationDifferencesForm.value.FourthGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.FourthFiftyPercentCostCurrentPreviousAdditions))]);

      this.DepreciationDifferencesForm.patchValue({
        MinimumFourthValue:
          +this.DepreciationDifferencesForm.value
            .FourthGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .FourthFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        MaximumFourthValue:
          +this.DepreciationDifferencesForm.value
            .FourthGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .FourthFiftyPercentCostCurrentPreviousAdditions,
      });

      this.DepreciationDifferencesForm.patchValue({
        FourthRemainingValueGroup:
          +this.DepreciationDifferencesForm.value
            .FourthGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FourthFiftyPercentCostCurrentPreviousAdditions -
            +this.DepreciationDifferencesForm.value
              .FourthFiftyPercentDuringPreviousCurrentYear <
          0
            ? 0.0
            : parseFloat(
                (
                  +this.DepreciationDifferencesForm.value
                    .FourthGroupValueAtPreviousYear +
                    +this.DepreciationDifferencesForm.value
                      .FourthFiftyPercentCostCurrentPreviousAdditions -
                    +this.DepreciationDifferencesForm.value
                      .FourthFiftyPercentDuringPreviousCurrentYear || 0
                ).toString()
              ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FourthDepreciationAmortizationValue: parseFloat(
          (
            (+this.DepreciationDifferencesForm.value.FourthRemainingValueGroup *
              +this.DepreciationDifferencesForm.value
                .FourthDepreciationAmortizationRatio) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FourthRemainingValueAtEndCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value.FourthRemainingValueGroup -
              +this.DepreciationDifferencesForm.value
                .FourthDepreciationAmortizationValue || 0
          ).toString()
        ).toFixed(2),
      });
      if (
        +this.DepreciationDifferencesForm.value.FourthMaintananceCostOfGroup >
        (+this.DepreciationDifferencesForm.value
          .FourthRemainingValueAtEndCurrentYear *
          4) /
          100
      ) {
        this.DepreciationDifferencesForm.patchValue({
          FourthMaintancesExpenseExceedfourPercent: parseFloat(
            (
              +this.DepreciationDifferencesForm.value
                .FourthMaintananceCostOfGroup -
                (+this.DepreciationDifferencesForm.value
                  .FourthRemainingValueAtEndCurrentYear *
                  4) /
                  100 || 0
            ).toString()
          ).toFixed(2),
        });
      } else {
        this.DepreciationDifferencesForm.patchValue({
          FourthMaintancesExpenseExceedfourPercent: "0.00",
        });
      }
      this.DepreciationDifferencesForm.patchValue({
        FourthRemainingGroupAtEndOfCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value
              .FourthRemainingValueAtEndCurrentYear +
              +this.DepreciationDifferencesForm.value
                .FourthMaintancesExpenseExceedfourPercent || 0
          ).toString()
        ).toFixed(2),
      });
    } else if (formNumber == 5) {
      this.DepreciationDifferencesForm.patchValue({
        FifthFiftyPercentCostCurrentPreviousAdditions: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .FifthCostOfPreviousYearAdditions +
              +this.DepreciationDifferencesForm.value
                .FifthCostOfCurrentAdditions) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FifthFiftyPercentDuringPreviousCurrentYear: parseFloat(
          (
            ((+this.DepreciationDifferencesForm.value
              .FifthCompensationDepreciationDuringPreviousYear +
              +this.DepreciationDifferencesForm.value
                .FifthCompensationDepreciationDuringCurrentYear) *
              50) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      // this.DepreciationDifferencesForm.get('FifthFiftyPercentDuringPreviousCurrentYear').setValidators([Validators.min((+this.DepreciationDifferencesForm.value.FifthGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.FifthFiftyPercentCostCurrentPreviousAdditions)), Validators.max((+this.DepreciationDifferencesForm.value.FifthGroupValueAtPreviousYear) + (+this.DepreciationDifferencesForm.value.FifthFiftyPercentCostCurrentPreviousAdditions))]);

      this.DepreciationDifferencesForm.patchValue({
        MinimumFifthValue:
          +this.DepreciationDifferencesForm.value
            .FifthGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .FifthFiftyPercentCostCurrentPreviousAdditions,
      });
      this.DepreciationDifferencesForm.patchValue({
        MaximumFifthValue:
          +this.DepreciationDifferencesForm.value
            .FifthGroupValueAtPreviousYear +
          +this.DepreciationDifferencesForm.value
            .FifthFiftyPercentCostCurrentPreviousAdditions,
      });

      this.DepreciationDifferencesForm.patchValue({
        FifthRemainingValueGroup:
          +this.DepreciationDifferencesForm.value
            .FifthGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FifthFiftyPercentCostCurrentPreviousAdditions -
            +this.DepreciationDifferencesForm.value
              .FifthFiftyPercentDuringPreviousCurrentYear <
          0
            ? "0.00"
            : parseFloat(
                (
                  +this.DepreciationDifferencesForm.value
                    .FifthGroupValueAtPreviousYear +
                    +this.DepreciationDifferencesForm.value
                      .FifthFiftyPercentCostCurrentPreviousAdditions -
                    +this.DepreciationDifferencesForm.value
                      .FifthFiftyPercentDuringPreviousCurrentYear || 0
                ).toString()
              ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FifthDepreciationAmortizationValue: parseFloat(
          (
            (+this.DepreciationDifferencesForm.value.FifthRemainingValueGroup *
              +this.DepreciationDifferencesForm.value
                .FifthDepreciationAmortizationRatio) /
              100 || 0
          ).toString()
        ).toFixed(2),
      });
      this.DepreciationDifferencesForm.patchValue({
        FifthRemainingValueAtEndCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value.FifthRemainingValueGroup -
              +this.DepreciationDifferencesForm.value
                .FifthDepreciationAmortizationValue || 0
          ).toString()
        ).toFixed(2),
      });
      if (
        +this.DepreciationDifferencesForm.value.FifthMaintananceCostOfGroup >
        (+this.DepreciationDifferencesForm.value
          .FifthRemainingValueAtEndCurrentYear *
          4) /
          100
      ) {
        this.DepreciationDifferencesForm.patchValue({
          FifthMaintancesExpenseExceedfourPercent: parseFloat(
            (
              +this.DepreciationDifferencesForm.value
                .FifthMaintananceCostOfGroup -
                (+this.DepreciationDifferencesForm.value
                  .FifthRemainingValueAtEndCurrentYear *
                  4) /
                  100 || 0
            ).toString()
          ).toFixed(2),
        });
      } else {
        this.DepreciationDifferencesForm.patchValue({
          FifthMaintancesExpenseExceedfourPercent: "0.00",
        });
      }
      this.DepreciationDifferencesForm.patchValue({
        FifthRemainingGroupAtEndOfCurrentYear: parseFloat(
          (
            +this.DepreciationDifferencesForm.value
              .FifthRemainingValueAtEndCurrentYear +
              +this.DepreciationDifferencesForm.value
                .FifthMaintancesExpenseExceedfourPercent || 0
          ).toString()
        ).toFixed(2),
      });
    }
    this.DepreciationDifferenceTotalCalculations();
  }
  DepreciationDifferenceTotalCalculations() {
    this.DepreciationDifferencesForm.patchValue({
      TotalGroupValueAtPreviousYear: parseFloat(
        (
          +this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FirstGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .SecondGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .ThirdGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FourthGroupValueAtPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FifthGroupValueAtPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCostOfPreviousYearAdditions: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandCostOfPreviousYearAdditions +
            +this.DepreciationDifferencesForm.value
              .FirstCostOfPreviousYearAdditions +
            +this.DepreciationDifferencesForm.value
              .SecondCostOfPreviousYearAdditions +
            +this.DepreciationDifferencesForm.value
              .ThirdCostOfPreviousYearAdditions +
            +this.DepreciationDifferencesForm.value
              .FourthCostOfPreviousYearAdditions +
            +this.DepreciationDifferencesForm.value
              .FifthCostOfPreviousYearAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCostOfCurrentAdditions: parseFloat(
        (
          +this.DepreciationDifferencesForm.value.LandCostOfCurrentAdditions +
            +this.DepreciationDifferencesForm.value
              .FirstCostOfCurrentAdditions +
            +this.DepreciationDifferencesForm.value
              .SecondCostOfCurrentAdditions +
            +this.DepreciationDifferencesForm.value
              .ThirdCostOfCurrentAdditions +
            +this.DepreciationDifferencesForm.value
              .FourthCostOfCurrentAdditions +
            +this.DepreciationDifferencesForm.value
              .FifthCostOfCurrentAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalFiftyPercentCostCurrentPreviousAdditions: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandFiftyPercentCostCurrentPreviousAdditions +
            +this.DepreciationDifferencesForm.value
              .FirstFiftyPercentCostCurrentPreviousAdditions +
            +this.DepreciationDifferencesForm.value
              .SecondFiftyPercentCostCurrentPreviousAdditions +
            +this.DepreciationDifferencesForm.value
              .ThirdFiftyPercentCostCurrentPreviousAdditions +
            +this.DepreciationDifferencesForm.value
              .FourthFiftyPercentCostCurrentPreviousAdditions +
            +this.DepreciationDifferencesForm.value
              .FifthFiftyPercentCostCurrentPreviousAdditions || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCompensationDepreciationDuringPreviousYear: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandCompensationDepreciationDuringPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FirstCompensationDepreciationDuringPreviousYear +
            +this.DepreciationDifferencesForm.value
              .SecondCompensationDepreciationDuringPreviousYear +
            +this.DepreciationDifferencesForm.value
              .ThirdCompensationDepreciationDuringPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FourthCompensationDepreciationDuringPreviousYear +
            +this.DepreciationDifferencesForm.value
              .FifthCompensationDepreciationDuringPreviousYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCompensationDepreciationDuringCurrentYear: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandCompensationDepreciationDuringCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FirstCompensationDepreciationDuringCurrentYear +
            +this.DepreciationDifferencesForm.value
              .SecondCompensationDepreciationDuringCurrentYear +
            +this.DepreciationDifferencesForm.value
              .ThirdCompensationDepreciationDuringCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FourthCompensationDepreciationDuringCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FifthCompensationDepreciationDuringCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalFiftyPercentDuringPreviousCurrentYear: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandFiftyPercentDuringPreviousCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FirstFiftyPercentDuringPreviousCurrentYear +
            +this.DepreciationDifferencesForm.value
              .SecondFiftyPercentDuringPreviousCurrentYear +
            +this.DepreciationDifferencesForm.value
              .ThirdFiftyPercentDuringPreviousCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FourthFiftyPercentDuringPreviousCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FifthFiftyPercentDuringPreviousCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalRemainingValueGroup: parseFloat(
        (
          +this.DepreciationDifferencesForm.value.LandRemainingValueGroup +
            +this.DepreciationDifferencesForm.value.FirstRemainingValueGroup +
            +this.DepreciationDifferencesForm.value.SecondRemainingValueGroup +
            +this.DepreciationDifferencesForm.value.ThirdRemainingValueGroup +
            +this.DepreciationDifferencesForm.value.FourthRemainingValueGroup +
            +this.DepreciationDifferencesForm.value.FifthRemainingValueGroup ||
          0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalDepreciationAmortizationValue: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandDepreciationAmortizationValue +
            +this.DepreciationDifferencesForm.value
              .FirstDepreciationAmortizationValue +
            +this.DepreciationDifferencesForm.value
              .SecondDepreciationAmortizationValue +
            +this.DepreciationDifferencesForm.value
              .ThirdDepreciationAmortizationValue +
            +this.DepreciationDifferencesForm.value
              .FourthDepreciationAmortizationValue +
            +this.DepreciationDifferencesForm.value
              .FifthDepreciationAmortizationValue || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalRemainingValueAtEndCurrentYear: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandRemainingValueAtEndCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FirstRemainingValueAtEndCurrentYear +
            +this.DepreciationDifferencesForm.value
              .SecondRemainingValueAtEndCurrentYear +
            +this.DepreciationDifferencesForm.value
              .ThirdRemainingValueAtEndCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FourthRemainingValueAtEndCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FifthRemainingValueAtEndCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalMaintananceCostOfGroup: parseFloat(
        (
          +this.DepreciationDifferencesForm.value.LandMaintananceCostOfGroup +
            +this.DepreciationDifferencesForm.value
              .FirstMaintananceCostOfGroup +
            +this.DepreciationDifferencesForm.value
              .SecondMaintananceCostOfGroup +
            +this.DepreciationDifferencesForm.value
              .ThirdMaintananceCostOfGroup +
            +this.DepreciationDifferencesForm.value
              .FourthMaintananceCostOfGroup +
            +this.DepreciationDifferencesForm.value
              .FifthMaintananceCostOfGroup || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalMaintancesExpenseExceedfourPercent: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandMaintancesExpenseExceedfourPercent +
            +this.DepreciationDifferencesForm.value
              .FirstMaintancesExpenseExceedfourPercent +
            +this.DepreciationDifferencesForm.value
              .SecondMaintancesExpenseExceedfourPercent +
            +this.DepreciationDifferencesForm.value
              .ThirdMaintancesExpenseExceedfourPercent +
            +this.DepreciationDifferencesForm.value
              .FourthMaintancesExpenseExceedfourPercent +
            +this.DepreciationDifferencesForm.value
              .FifthMaintancesExpenseExceedfourPercent || 0
        ).toString()
      ).toFixed(2),
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalRemainingGroupAtEndOfCurrentYear: parseFloat(
        (
          +this.DepreciationDifferencesForm.value
            .LandRemainingGroupAtEndOfCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FirstRemainingGroupAtEndOfCurrentYear +
            +this.DepreciationDifferencesForm.value
              .SecondRemainingGroupAtEndOfCurrentYear +
            +this.DepreciationDifferencesForm.value
              .ThirdRemainingGroupAtEndOfCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FourthRemainingGroupAtEndOfCurrentYear +
            +this.DepreciationDifferencesForm.value
              .FifthRemainingGroupAtEndOfCurrentYear || 0
        ).toString()
      ).toFixed(2),
    });
  }
  GlobalNumberAllow(event) {
    console.log(event.target.value);
    // var rgx = /^[0-9]*\.?[0-9]*$/;
    var rgx = /^\d{0,14}(\.\d{0,2})?$/;
    // console.log((event.target.value).toString().replace(/,/g ,''));
    // console.log(rgx.test((event.target.value).toString().replace(/,/g ,'')))
    // return rgx.test((event.target.value).toString().replace(/,/g ,''));
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }

  GlobalNumberAllow12(event) {
    console.log(event.target.value);
    // var rgx = /^[0-9]*\.?[0-9]*$/;
    var rgx = /^[-]?\d{0,12}(\.\d{0,2})?$/;
    // console.log((event.target.value).toString().replace(/,/g ,''));
    // console.log(rgx.test((event.target.value).toString().replace(/,/g ,'')))
    // return rgx.test((event.target.value).toString().replace(/,/g ,''));
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }

  GlobalNumberAllow1(event) {
    console.log(event.target.value);
    // var rgx = /^[0-9]*\.?[0-9]*$/;
    var rgx = /^\d{0,14}(\.\d{0,2})?$/;
    // console.log((event.target.value).toString().replace(/,/g ,''));
    // console.log(rgx.test((event.target.value).toString().replace(/,/g ,'')))
    // return rgx.test((event.target.value).toString().replace(/,/g ,''));
    console.log(event.target.value);
    if (event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 39) {
      if (!event.target.value.length) {
        return event.preventDefault();
      } else {
        if (rgx.test(event.target.value.toString().replace(/,/g, ""))) {
          return true;
        } else {
          return event.preventDefault();
        }
      }
    } else if (event.keyCode < 48 || event.keyCode > 57) {
      return event.preventDefault();
    }
  }
  GlobalNumberAllow3(event) {
    // console.log(event.target.value)
    // // var rgx = /^[0-9]*\.?[0-9]*$/;
    // var rgx = /^\d{0,12}(\.\d{0,2})?$/;
    // // console.log((event.target.value).toString().replace(/,/g ,''));
    // // console.log(rgx.test((event.target.value).toString().replace(/,/g ,'')))
    // // return rgx.test((event.target.value).toString().replace(/,/g ,''));
    // console.log(event.target.value);
    // if (event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 39) {
    //   if(!event.target.value.length)
    //   {
    //     return event.preventDefault();
    //   }
    //   else{
    //     if(rgx.test((event.target.value).toString().replace(/,/g, '')))
    //     {
    //       return true;
    //     }
    //     else
    //     {
    //       return event.preventDefault();
    //     }
    //   }
    // }
    // else if ((event.keyCode < 48 || event.keyCode > 57) ) {
    //   return event.preventDefault();
    // }
    console.log(event.target.value);
    // var rgx = /^[0-9]*\.?[0-9]*$/;
    var rgx = /^\d{0,12}(\.\d{0,2})?$/;
    // console.log((event.target.value).toString().replace(/,/g ,''));
    // console.log(rgx.test((event.target.value).toString().replace(/,/g ,'')))
    // return rgx.test((event.target.value).toString().replace(/,/g ,''));
    console.log(event.target.value);
    if (event.keyCode == 8) {
      return true;
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }
  GlobalNumberAllow2(event) {
    console.log(event.target.value);
    // var rgx = /^[0-9]*\.?[0-9]*$/;
    var rgx = /^\d{0,255}?$/;
    console.log(event.target.value);
    if (event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 39) {
      if (!event.target.value.length) {
        return event.preventDefault();
      } else {
        if (rgx.test(event.target.value.toString().replace(/,/g, ""))) {
          return true;
        } else {
          return event.preventDefault();
        }
      }
    } else if (event.keyCode < 48 || event.keyCode > 57) {
      return event.preventDefault();
    }
  }
  SetFormDetails() {
    this.MainActivityRevenue = this.taxPayerDetails.RevMain;
    this.GainLossForm.value.Schedule =
      this.taxPayerDetails.RGainloss == "X" ? true : false;
    this.GainLossForm.value.TotalProfitLoss = this.taxPayerDetails.GainSellingSec;
    this.clearFormArray(this.GainLossSecurities);
    this.clearFormArray(this.OtherRevenues);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1101Set["results"].length;
      i++
    ) {
      this.AddRow();
      this.GainLossSecurities.controls[i].patchValue({
        Company: this.taxPayerDetails.Sch1101Set["results"][i]["CompNm"],
      });
      this.GainLossSecurities.controls[i].patchValue({
        SellingAmount: this.taxPayerDetails.Sch1101Set["results"][i]["SellAmt"],
      });
      this.GainLossSecurities.controls[i].patchValue({
        Cost: this.taxPayerDetails.Sch1101Set["results"][i]["Cost"],
      });
      this.GainLossSecurities.controls[i].patchValue({
        ProfitLoss: this.taxPayerDetails.Sch1101Set["results"][i]["ProfitAmt"],
      });
    }
    this.TotalsCalculation();
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1102Set["results"].length;
      i++
    ) {
      this.AddRevenueRow();
      this.OtherRevenues.controls[i].patchValue({
        Statement: this.taxPayerDetails.Sch1102Set["results"][i]["Statement"],
      });
      this.OtherRevenues.controls[i].patchValue({
        Amount: this.taxPayerDetails.Sch1102Set["results"][i]["Amt"],
      });
    }
    this.TotalRevenueCalculation();
    this.totalOtherRevenues =
      this.GainLossForm.value.TotalProfitLoss +
      this.IncomeFromBankingForm.value.TotalAmount;
    this.TotRevenue = parseFloat(
      this.MainActivityRevenue + +this.totalOtherRevenues
    ).toFixed(2);
    this.CostOfRevenueModalApplicable =
      this.taxPayerDetails.RCostmain == "X" ? true : false;
    // this.SelectedCostOfRevenueOptions = this.taxPayerDetails.RCostMan == 'F' ? 'FinancialActivities' : '';
    // this.SelectedCostOfRevenueOptions = this.taxPayerDetails.RCostMan == 'B' ? 'Banking' : '';
    if (this.taxPayerDetails.RCostMan == "F") {
      this.SelectedCostOfRevenueOptions = "FinancialActivities";
    } else if (this.taxPayerDetails.RCostMan == "B") {
      this.SelectedCostOfRevenueOptions = "Banking";
    } else {
      this.SelectedCostOfRevenueOptions = "";
    }
    console.log("this.taxPayerDetails.RCostMan", this.taxPayerDetails.RCostMan);
    console.log(
      "SelectedCostOfRevenueOptions",
      this.SelectedCostOfRevenueOptions
    );

    if (this.taxPayerDetails.RCostMan == "") {
      this.clearFormArray(this.BankRevenues);
      this.clearFormArray(this.FinanceRevenues);
      this.SelectedCostOfRevenueOptions = "";
      for (
        let i = 0;
        i < this.taxPayerDetails.Sch1103Set["results"].length;
        i++
      ) {
        this.AddBankRevenueRow();
        this.BankRevenues.controls[i].patchValue({
          Statement: this.taxPayerDetails.Sch1103Set["results"][i]["Statement"],
        });
        this.BankRevenues.controls[i].patchValue({
          Address: this.taxPayerDetails.Sch1103Set["results"][i]["AddrTp"],
        });
        this.BankRevenues.controls[i].patchValue({
          DepositTerm: this.taxPayerDetails.Sch1103Set["results"][i][
            "DepositTerm"
          ],
        });
        this.BankRevenues.controls[i].patchValue({
          Value: this.taxPayerDetails.Sch1103Set["results"][i]["ValueAmt"],
        });
      }
      this.TotalBankingRevenueCalculation();
      for (
        let i = 0;
        i < this.taxPayerDetails.Sch1103BSet["results"].length;
        i++
      ) {
        this.AddFinanceRevenueRow();
        this.FinanceRevenues.controls[i].patchValue({
          Statement: this.taxPayerDetails.Sch1103BSet["results"][i][
            "Statement"
          ],
        });
        this.FinanceRevenues.controls[i].patchValue({
          Amount: this.taxPayerDetails.Sch1103BSet["results"][i]["Amt"],
        });
      }
      this.TotalFinanceRevenueCalculation();
    }
    if (
      this.SelectedCostOfRevenueOptions == "Banking" ||
      this.taxPayerDetails.RCostMan == "B"
    ) {
      this.clearFormArray(this.BankRevenues);
      for (
        let i = 0;
        i < this.taxPayerDetails.Sch1103Set["results"].length;
        i++
      ) {
        this.AddBankRevenueRow();
        this.BankRevenues.controls[i].patchValue({
          Statement: this.taxPayerDetails.Sch1103Set["results"][i]["Statement"],
        });
        this.BankRevenues.controls[i].patchValue({
          Address: this.taxPayerDetails.Sch1103Set["results"][i]["AddrTp"],
        });
        this.BankRevenues.controls[i].patchValue({
          DepositTerm: this.taxPayerDetails.Sch1103Set["results"][i][
            "DepositTerm"
          ],
        });
        this.BankRevenues.controls[i].patchValue({
          Value: this.taxPayerDetails.Sch1103Set["results"][i]["ValueAmt"],
        });
      }
      this.TotalBankingRevenueCalculation();
    } else if (
      this.SelectedCostOfRevenueOptions == "FinancialActivities" ||
      this.taxPayerDetails.RCostMan == "F"
    ) {
      this.clearFormArray(this.FinanceRevenues);
      for (
        let i = 0;
        i < this.taxPayerDetails.Sch1103BSet["results"].length;
        i++
      ) {
        this.AddFinanceRevenueRow();
        this.FinanceRevenues.controls[i].patchValue({
          Statement: this.taxPayerDetails.Sch1103BSet["results"][i][
            "Statement"
          ],
        });
        this.FinanceRevenues.controls[i].patchValue({
          Amount: this.taxPayerDetails.Sch1103BSet["results"][i]["Amt"],
        });
      }
      this.TotalFinanceRevenueCalculation();
    }

    this.clearFormArray(this.Provisions);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1104Set["results"].length;
      i++
    ) {
      this.AddProvisionRevenueRow();
      this.Provisions.controls[i].patchValue({
        ProvisionType: this.taxPayerDetails.Sch1104Set["results"][i][
          "ProvisionTp"
        ],
      });
      this.Provisions.controls[i].patchValue({
        BeginingBalance: this.taxPayerDetails.Sch1104Set["results"][i][
          "BegbalAmt"
        ],
      });
      this.Provisions.controls[i].patchValue({
        ProvisionCreditDuringTheYear: this.taxPayerDetails.Sch1104Set[
          "results"
        ][i]["ProvisionAmt"],
      });
      this.Provisions.controls[i].patchValue({
        UtilizedDuringPeriod: this.taxPayerDetails.Sch1104Set["results"][i][
          "UtilisedAmt"
        ],
      });
      this.Provisions.controls[i].patchValue({
        Settlements: this.taxPayerDetails.Sch1104Set["results"][i][
          "SettlementAmt"
        ],
      });
      this.Provisions.controls[i].patchValue({
        EndingBalance: this.taxPayerDetails.Sch1104Set["results"][i][
          "EndbalAmt"
        ],
      });
    }
    this.TotalProvisionEndingCalculation();
    this.clearFormArray(this.RoyalityTechnicalSecurities);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1105Set["results"].length;
      i++
    ) {
      this.AddTechnicalSecurityRow();
      console.log(
        "this.taxPayerDetails.Sch1105Set['results'][i]['IdTp']",
        this.taxPayerDetails.Sch1105Set["results"][i]["IdTp"]
      );
      if (this.taxPayerDetails.Sch1105Set["results"][i]["IdTp"] != "") {
        this.RoyalityTechnicalSecurities.controls[i].patchValue({
          IdType: this.taxPayerDetails.Sch1105Set["results"][i]["IdTp"],
        });
      }
      if (
        this.taxPayerDetails.Sch1105Set["results"][i]["AddrTp"] != "" &&
        this.taxPayerDetails.Sch1105Set["results"][i]["Country"] != ""
      ) {
        this.RoyalityTechnicalSecurities.controls[i].patchValue({
          InterExternal: this.taxPayerDetails.Sch1105Set["results"][i][
            "AddrTp"
          ],
        });
        if (this.taxPayerDetails.Sch1105Set["results"][i]["AddrTp"] == "I") {
          this.RoyalityTechnicalSecurities.controls[i].patchValue({
            Country: this.taxPayerDetails.Sch1105Set["results"][i]["Country"],
          });
        } else {
          this.SetCountry(
            i,
            this.taxPayerDetails.Sch1105Set["results"][i]["Country"]
          );
        }
      }

      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        IdNumber: this.taxPayerDetails.Sch1105Set["results"][i]["IdNo"],
      });
      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        BeneficiaryName: this.taxPayerDetails.Sch1105Set["results"][i][
          "BenificiaryNm"
        ],
      });
      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        ServiceType: this.taxPayerDetails.Sch1105Set["results"][i]["ServiceTp"],
      });
      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        ChargedToTheAccounts: this.taxPayerDetails.Sch1105Set["results"][i][
          "ChargedAmt"
        ],
      });
      this.RoyalityTechnicalSecurities.controls[i].patchValue({
        PaidDuringTheYear: this.taxPayerDetails.Sch1105Set["results"][i][
          "PaidAmt"
        ],
      });
    }
    this.TotalsRoyalityCalculations();
    this.clearFormArray(this.OtherExpenses);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1106Set["results"].length;
      i++
    ) {
      this.AddOtherExpensesRow();
      this.OtherExpenses.controls[i].patchValue({
        Statement: this.taxPayerDetails.Sch1106Set["results"][i]["Statement"],
      });
      this.OtherExpenses.controls[i].patchValue({
        Amount: this.taxPayerDetails.Sch1106Set["results"][i]["Amt"],
      });
    }
    this.OtherExpensesTotalCalculation();

    this.DepreciationDifferencesForm.patchValue({
      LandGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["AGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ACostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set["results"][0][
        "ACostCyrAddition"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["ATotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["AComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["AComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["ATotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "AGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandDepreciationAmortizationRatio: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ADepAmotRatio"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ADepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ARemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "AGrpMaintCost"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["AMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      LandRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["AGrpCyr"],
    });

    this.DepreciationDifferencesForm.patchValue({
      FirstGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BCostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BCostCyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["BTotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["BComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["BComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["BTotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "BGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstDepreciationAmortizationRatio: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BDepAmotRatio"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BDepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BRemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BGrpMaintCost"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FirstRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["BGrpCyr"],
    });

    this.DepreciationDifferencesForm.patchValue({
      SecondGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CCostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CCostCyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["CTotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["CComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["CComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["CTotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "CGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondDepreciationAmortizationRatio: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CDepAmotRatio"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CDepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CRemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CGrpMaintCost"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      SecondRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["CGrpCyr"],
    });

    this.DepreciationDifferencesForm.patchValue({
      ThirdGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DCostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DCostCyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["DTotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["DComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["DComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["DTotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "DGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdDepreciationAmortizationRatio: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DDepAmotRatio"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DDepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DRemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DGrpMaintCost"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      ThirdRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["DGrpCyr"],
    });

    this.DepreciationDifferencesForm.patchValue({
      FourthGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["EGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ECostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ECostCyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["ETotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["EComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["EComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["ETotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "EGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthDepreciationAmortizationRatio: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["EDepAmotRatio"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["EDepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["ERemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["EGrpMaintCost"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["EMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FourthRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["EGrpCyr"],
    });

    this.DepreciationDifferencesForm.patchValue({
      FifthGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FCostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FCostCyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["FTotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["FComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["FComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["FTotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "FGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthDepreciationAmortizationRatio: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FDepAmotRatio"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FDepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FRemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FGrpMaintCost"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      FifthRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["FGrpCyr"],
    });

    this.DepreciationDifferencesForm.patchValue({
      TotalGroupValueAtPreviousYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotGrpvalEod"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCostOfPreviousYearAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotCostPyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCostOfCurrentAdditions: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotCostCyrAddition"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalFiftyPercentCostCurrentPreviousAdditions: this.taxPayerDetails
        .Sch1107Set["results"][0]["TotTotCost50Pcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCompensationDepreciationDuringPreviousYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["TotComesAssetPyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalCompensationDepreciationDuringCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["TotComesAssetCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalFiftyPercentDuringPreviousCurrentYear: this.taxPayerDetails
        .Sch1107Set["results"][0]["TotTotCost50AssetPcyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalRemainingValueGroup: this.taxPayerDetails.Sch1107Set["results"][0][
        "TotGrpRem"
      ],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalDepreciationAmortizationValue: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotDepAmotValue"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalRemainingValueAtEndCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotRemValueCyr"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalMaintananceCostOfGroup: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotGrpMaintCost"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalMaintancesExpenseExceedfourPercent: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotMaint4exp"],
    });
    this.DepreciationDifferencesForm.patchValue({
      TotalRemainingGroupAtEndOfCurrentYear: this.taxPayerDetails.Sch1107Set[
        "results"
      ][0]["TotGrpCyr"],
    });

    this.clearFormArray(this.AdjustmentNetProfits);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1108Set["results"].length;
      i++
    ) {
      this.AddAdjustmentNetProfitRow();
      this.AdjustmentNetProfits.controls[i].patchValue({
        Adjustment: this.taxPayerDetails.Sch1108Set["results"][i]["Adjustment"],
      });
      this.AdjustmentNetProfits.controls[i].patchValue({
        Statement: this.taxPayerDetails.Sch1108Set["results"][i]["Statement"],
      });
      this.AdjustmentNetProfits.controls[i].patchValue({
        Amount: this.taxPayerDetails.Sch1108Set["results"][i]["Amt"],
      });
    }
    this.AdjustmentNetProfitTotalCalculation();
    this.AdjustedCarriedCITLosessForm.patchValue({
      AdjustedCarriedFwdLosses: this.taxPayerDetails.Sch1110Set["results"][0][
        "CarryforAmt"
      ],
    });
    this.AdjustedCarriedCITLosessForm.patchValue({
      AdjustedDeclaredNetProfit: this.taxPayerDetails.Sch1110Set["results"][0][
        "DecprofitAmt"
      ],
    });
    this.AdjustedCarriedCITLosessForm.patchValue({
      LossesDeductedDuringYear: this.taxPayerDetails.Sch1110Set["results"][0][
        "LosscuryrAmt"
      ],
    });
    this.AdjustedCarriedCITLosessForm.patchValue({
      EndOfYearBalance: this.taxPayerDetails.Sch1110Set["results"][0][
        "EndofyearAmt"
      ],
    });
    //this.AdjustedCarriedCITLosessForm.patchValue({"Total":this.taxPayerDetails.Sch1110Set["results"][0]["Amt"]});

    this.clearFormArray(this.Capitals);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1111Set["results"].length;
      i++
    ) {
      this.AddCapitalsRow();
      this.Capitals.controls[i].patchValue({
        AdditionSource:
          this.taxPayerDetails.Sch1111Set["results"][i]["Capsource"] || "I",
      });
      this.Capitals.controls[i].patchValue({
        BeginOfPeriodBalance: this.taxPayerDetails.Sch1111Set["results"][i][
          "BegperiodAmt"
        ],
      });
      this.Capitals.controls[i].patchValue({
        AmountDedFromCapDurCurrent: this.taxPayerDetails.Sch1111Set["results"][
          i
        ]["DedperiodAmt"],
      });
      this.Capitals.controls[i].patchValue({
        AddToTheCapitalDuringYear: this.taxPayerDetails.Sch1111Set["results"][
          i
        ]["CapcuryrAmt"],
      });
      this.Capitals.controls[i].patchValue({
        EOPBalance: this.taxPayerDetails.Sch1111Set["results"][i][
          "EndperiodAmt"
        ],
      });
      this.Capitals.controls[i].patchValue({
        UtilizeNonZakat: this.taxPayerDetails.Sch1111Set["results"][i][
          "UtilizednzakatAmt"
        ],
      });
      this.Capitals.controls[i].patchValue({
        UtilizeZakat: this.taxPayerDetails.Sch1111Set["results"][i][
          "UtilizedzakatAmt"
        ],
      });
      //this.Capitals.controls[i].patchValue({ 'DOCapAdd': this.taxPayerDetails.Sch1111Set["results"][i]['CapitalDt'] != null ? moment(new Date(+((this.taxPayerDetails.Sch1111Set["results"][i]['CapitalDt'].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD') : "" });
      this.Capitals.controls[i].patchValue({
        DOEOFinYea:
          this.taxPayerDetails.Sch1111Set["results"][i]["YearendDt"] != null
            ? moment(
                new Date(
                  +this.taxPayerDetails.Sch1111Set["results"][i]["YearendDt"]
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("DD-MM-YYYY")
            : "",
      });
      this.Capitals.controls[i].patchValue({
        NoDays:
          this.taxPayerDetails.Sch1111Set["results"][i]["NumberDays"] || "0",
      });
      this.Capitals.controls[i].patchValue({
        CapSubZakat: this.taxPayerDetails.Sch1111Set["results"][i][
          "CapzakatAmt"
        ],
      });

      if (this.taxPayerDetails.CalTyp == "G") {
        this.Capitals.controls[i].patchValue({
          DOCapAdd:
            this.taxPayerDetails.Sch1111Set["results"][i]["CapitalDt"] != null
              ? this.CommonValidation.toJulianDate1(
                  new Date(
                    moment(
                      new Date(
                        +this.taxPayerDetails.Sch1111Set["results"][i][
                          "CapitalDt"
                        ]
                          .replace(")", "")
                          .toString()
                          .replace("/Date(", "")
                          .toString()
                          .replace("/", "")
                      )
                    ).format("YYYY-MM-DD")
                  )
                )
              : "",
        });
      } else {
        let date;
        if (
          this.taxPayerDetails.Sch1111Set["results"][i]["CapitalDt"] != null
        ) {
          date = moment(
            new Date(
              +this.taxPayerDetails.Sch1111Set["results"][i]["CapitalDt"]
                .replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("YYYY-MM-DD");
          date = this.CommonValidation.toJulianDate1(new Date(date));
          date = this.CommonValidation.dateFormate(date, "Islamic");
        }
        let date1;
        date1 = this.CommonValidation.toJulianDate1(
          new Date(moment(new Date()).format("YYYY-MM-DD"))
        );
        console.log(date1);
        date1 = this.CommonValidation.dateFormate(date1, "Islamic");
        this.Capitals.controls[i].patchValue({
          DOCapAdd:
            this.taxPayerDetails.Sch1111Set["results"][i]["CapitalDt"] != null
              ? date
              : date1,
        });
      }
      console.log(this.Capitals.controls[i]);
      this.CapitalZakatCalculation(i);
    }
    this.CapitalTotalsCalculation();

    this.clearFormArray(this.EquityEqualantFunds);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1112Set["results"].length;
      i++
    ) {
      this.AddEquityFundRow();
      this.EquityEqualantFunds.controls[i].patchValue({
        Statement: this.taxPayerDetails.Sch1112Set["results"][i]["Statement"],
      });
      this.EquityEqualantFunds.controls[i].patchValue({
        Amount: this.taxPayerDetails.Sch1112Set["results"][i]["Amt"],
      });
    }
    this.TotalEquityFundsCalculations();

    this.clearFormArray(this.LongTermLoans);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1114Set["results"].length;
      i++
    ) {
      this.AddLongTermRow();
      this.LongTermLoans.controls[i].patchValue({
        DebtType: this.taxPayerDetails.Sch1114Set["results"][i]["LoanTp"],
      });
      this.LongTermLoans.controls[i].patchValue({
        LocalForeign: this.taxPayerDetails.Sch1114Set["results"][i][
          "ResidenceTp"
        ],
      });
      this.LongTermLoans.controls[i].patchValue({
        DueInYearDays: this.taxPayerDetails.Sch1114Set["results"][i][
          "Duein365Amt"
        ],
      });
      this.LongTermLoans.controls[i].patchValue({
        DueAfterYearDays: this.taxPayerDetails.Sch1114Set["results"][i][
          "DueafterAmt"
        ],
      });
    }
    this.TotalLongTermCalculations();
    this.clearFormArray(this.LongTermDebts);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1115Set["results"].length;
      i++
    ) {
      this.AddLongTermDebtRow();
      this.LongTermDebts.controls[i].patchValue({
        DebtType: this.taxPayerDetails.Sch1115Set["results"][i]["DebitTp"],
      });
      this.LongTermDebts.controls[i].patchValue({
        LocalForeign: this.taxPayerDetails.Sch1115Set["results"][i][
          "ResidenceTp"
        ],
      });
      this.LongTermDebts.controls[i].patchValue({
        DueInYearDays: this.taxPayerDetails.Sch1115Set["results"][i][
          "Duein365Amt"
        ],
      });
      this.LongTermDebts.controls[i].patchValue({
        DueAfterYearDays: this.taxPayerDetails.Sch1115Set["results"][i][
          "DueafterAmt"
        ],
      });
    }
    this.TotalLongTermDebtCalculations();

    this.clearFormArray(this.PartyTransactionsSet);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1118Set["results"].length;
      i++
    ) {
      this.AddTransactionRow();
      this.PartyTransactionsSet.controls[i].patchValue({
        Transaction: this.taxPayerDetails.Sch1118Set["results"][i][
          "Transactions"
        ],
      });
      this.PartyTransactionsSet.controls[i].patchValue({
        Description: this.taxPayerDetails.Sch1118Set["results"][i][
          "Tdescription"
        ],
      });
      this.PartyTransactionsSet.controls[i].patchValue({
        NameOfRelatedParty: this.taxPayerDetails.Sch1118Set["results"][i][
          "PartyName"
        ],
      });
      this.PartyTransactionsSet.controls[i].patchValue({
        Jurisdiction: this.taxPayerDetails.Sch1118Set["results"][i][
          "Jurisdiction"
        ],
      });
      this.PartyTransactionsSet.controls[i].patchValue({
        TransactionNature: this.taxPayerDetails.Sch1118Set["results"][i][
          "AmtFg"
        ],
      });
      this.PartyTransactionsSet.controls[i].patchValue({
        Amount: this.taxPayerDetails.Sch1118Set["results"][i]["Amt"],
      });
      this.PartyTransactionsSet.controls[i].patchValue({
        TPMethod: this.taxPayerDetails.Sch1118Set["results"][i]["TpMethod"],
      });
    }

    this.clearFormArray(this.RelatedPartiesSet);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1119Set["results"].length;
      i++
    ) {
      this.AddRelatedPartiesRow();
      this.RelatedPartiesSet.controls[i].patchValue({
        TransactionDescription: this.taxPayerDetails.Sch1119Set["results"][i][
          "FocDescriptions"
        ],
      });
      this.RelatedPartiesSet.controls[i].patchValue({
        CounterParty: this.taxPayerDetails.Sch1119Set["results"][i][
          "Counterparty"
        ],
      });
      this.RelatedPartiesSet.controls[i].patchValue({
        Jurisdiction: this.taxPayerDetails.Sch1119Set["results"][i][
          "Jurisdiction"
        ],
      });
    }
    this.clearFormArray(this.ShareholdersSet);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1120Set["results"].length;
      i++
    ) {
      this.AddShareholdersSetRow();
      this.ShareholdersSet.controls[i].patchValue({
        ShareHoldersName: this.taxPayerDetails.Sch1120Set["results"][i][
          "ShName"
        ],
      });
      this.ShareholdersSet.controls[i].patchValue({
        Jurisdiction: this.taxPayerDetails.Sch1120Set["results"][i][
          "Jurisdiction"
        ],
      });
      this.ShareholdersSet.controls[i].patchValue({
        OwnerShipPercentage: this.taxPayerDetails.Sch1120Set["results"][i][
          "Ownership"
        ],
      });
    }

    this.clearFormArray(this.Sukuks);
    for (
      let i = 0;
      i < this.taxPayerDetails.Sch1113Set["results"].length;
      i++
    ) {
      this.AddSukukRow();
      this.Sukuks.controls[i].patchValue({
        NameOfSukuk: this.taxPayerDetails.Sch1113Set["results"][i]["BondsNm"],
      });
      this.InternalExternalChange(i);
      //this.Sukuks.controls[i].patchValue({'MaturityDate':this.taxPayerDetails.Sch1113Set["results"][i]["MaturityDt"]});
      this.Sukuks.controls[i].patchValue({
        DueInYearDays: this.taxPayerDetails.Sch1113Set["results"][i][
          "Duein365Amt"
        ],
      });
      this.Sukuks.controls[i].patchValue({
        DueAfterYearDays: this.taxPayerDetails.Sch1113Set["results"][i][
          "DueafterAmt"
        ],
      });
    }
    this.TotalSukuksCalculations();
    this.GainLossForm.patchValue({
      Schedule: this.taxPayerDetails.RGainloss == "X" ? true : false,
    });
    this.GainLossForm.patchValue({
      TotalSellingAmount: this.taxPayerDetails.GainSellingSec,
    });
    this.IncomeFromBankingForm.patchValue({
      Schedule: this.taxPayerDetails.ROtherrev == "X" ? true : false,
    });
    this.IncomeFromBankingForm.patchValue({
      TotalAmount: this.taxPayerDetails.OtherRev || 0,
    });
    this.CostOfRevenueBankingForm.patchValue({
      Schedule: this.taxPayerDetails.RCostmain == "X" ? true : false,
    });
    this.CostOfRevenueBankingForm.patchValue({
      TotalAmount: this.taxPayerDetails.CostMain,
    });
    this.CostOfRevenueFinancingForm.patchValue({
      Schedule: this.taxPayerDetails.RCostmain == "X" ? true : false,
    });
    this.CostOfRevenueFinancingForm.patchValue({
      TotalAmount: this.taxPayerDetails.CostMain,
    });
    this.ProvisionMadeDuringForm.patchValue({
      Schedule: this.taxPayerDetails.RProvisionyr == "X" ? true : false,
    });
    this.RoyalityTechnicalServicesForm.patchValue({
      Schedule: this.taxPayerDetails.RRoyalser == "X" ? true : false,
    });
    this.OtherExpensesForm.patchValue({
      Schedule: this.taxPayerDetails.ROtherexp == "X" ? true : false,
    });
    this.DepreciationDifferencesForm.patchValue({
      Schedule: this.taxPayerDetails.RDepriciation == "X" ? true : false,
    });
    this.ProvisionMadeDuringForm.patchValue({
      Schedule: this.taxPayerDetails.RProvisionyr == "X" ? true : false,
    });
    this.AdjustmentToNetProfitForm.patchValue({
      Schedule: this.taxPayerDetails.RNetprofit == "X" ? true : false,
    });
    this.IncomeFromLoansForm.patchValue({
      Schedule: this.taxPayerDetails.RLoanthold == "X" ? true : false,
    });
    this.AdjustedCarriedCITLosessForm.patchValue({
      Schedule: this.taxPayerDetails.RNssharecap25 == "X" ? true : false,
    });
    this.CapitalZakatForm.patchValue({
      Schedule: this.taxPayerDetails.RCapital == "X" ? true : false,
    });
    this.EquityEqualantFundResourceForm.patchValue({
      Schedule: this.taxPayerDetails.REquity == "X" ? true : false,
    });
    this.LongTermEquivalentForm.patchValue({
      Schedule: this.taxPayerDetails.RLongloan == "X" ? true : false,
    });
    this.LongTermDebtsEquivalentForm.patchValue({
      Schedule: this.taxPayerDetails.RLonddebit == "X" ? true : false,
    });
    this.InvestmentsGovernmentSukukForm.patchValue({
      Schedule: this.taxPayerDetails.RInvdebit == "X" ? true : false,
    });
    moment.locale("en-Us");
    if (this.taxPayerDetails.CalTyp == "G") {
      this.periodStartDate = moment(
        new Date(
          +this.taxPayerDetails.Abrzu.replace(")", "")
            .toString()
            .replace("/Date(", "")
            .toString()
            .replace("/", "")
        )
      ).format("DD/MM/YYYY");
      this.periodEndDate = moment(
        new Date(
          +this.taxPayerDetails.Abrzo.replace(")", "")
            .toString()
            .replace("/Date(", "")
            .toString()
            .replace("/", "")
        )
      ).format("DD/MM/YYYY");
    } else {
      this.periodStartDate = this.CommonValidation.changeDate5(
        this.CommonValidation.dateFormate(
          this.CommonValidation.toJulianDate1(
            new Date(
              +this.taxPayerDetails.Abrzu.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ),
          "Islamic"
        )
      );
      this.periodEndDate = this.CommonValidation.changeDate5(
        this.CommonValidation.dateFormate(
          this.CommonValidation.toJulianDate1(
            new Date(
              +this.taxPayerDetails.Abrzo.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ),
          "Islamic"
        )
      );
    }

    this.GainLossFormChange = false;
    this.IncomeFromBankingFormChange = false;
    this.IncomeFromLonasFormChange = false;
    this.CostOfRevenueBankingFormChange = false;
    this.CostOfRevenueFinancingFormChange = false;
    this.ProvisionMadeDuringFormChange = false;
    this.RoyalityTechnicalServicesFormChange = false;
    this.OtherExpensesFormChange = false;
    this.AdjustmentToNetProfitFormChange = false;
    this.CapitalZakatFormChange = false;
    this.EquityEqualantFundResourceFormChange = false;
    this.LongTermEquivalentFormChange = false;
    this.LongTermDebtsEquivalentFormChange = false;
    this.InvestmentsGovernmentSukukFormChange = false;

    if (this.taxPayerDetails.Sch1116Set["results"][0].FeFye != null) {
      let date = moment(
        new Date(
          +this.taxPayerDetails.Sch1116Set["results"][0].FeFye.replace(")", "")
            .toString()
            .replace("/Date(", "")
            .toString()
            .replace("/", "")
        )
      ).format("YYYY-MM-DD");
      this.FeFye = this.CommonValidation.toJulianDate1(new Date(date));
      if (this.taxPayerDetails.CalTyp == "H") {
        this.FeFye = this.CommonValidation.dateFormate(this.FeFye, "Islamic");
      }
    }

    if (this.taxPayerDetails.Sch1116Set["results"][0].UpeFye != null) {
      let date = moment(
        new Date(
          +this.taxPayerDetails.Sch1116Set["results"][0].UpeFye.replace(")", "")
            .toString()
            .replace("/Date(", "")
            .toString()
            .replace("/", "")
        )
      ).format("YYYY-MM-DD");
      this.UpeFye = this.CommonValidation.toJulianDate1(new Date(date));
      if (this.taxPayerDetails.CalTyp == "H") {
        this.UpeFye = this.CommonValidation.dateFormate(this.UpeFye, "Islamic");
      }
    }

    if (!this.taxPayerDetails.Sch1116Set["results"][0].UpeFye) {
      this.UpeFye = this.CommonValidation.toJulianDate1(new Date());
      if (this.taxPayerDetails.CalTyp == "H") {
        this.UpeFye = this.CommonValidation.dateFormate(
          this.CommonValidation.toJulianDate1(new Date()),
          "Islamic"
        );
      }
    }
    if (!this.taxPayerDetails.Sch1116Set["results"][0].FeFye) {
      this.FeFye = this.CommonValidation.toJulianDate1(new Date());
      if (this.taxPayerDetails.CalTyp == "H") {
        this.FeFye = this.CommonValidation.dateFormate(
          this.CommonValidation.toJulianDate1(new Date()),
          "Islamic"
        );
      }
    }

    this.UpeFyeDis =
      this.taxPayerDetails.Sch1116Set["results"][0].UpeFye != null
        ? moment(
            new Date(
              +this.taxPayerDetails.Sch1116Set["results"][0].UpeFye.replace(
                ")",
                ""
              )
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY")
        : moment(new Date()).format("DD/MM/YYYY");
    this.FeFyeDis =
      this.taxPayerDetails.Sch1116Set["results"][0].FeFye != null
        ? moment(
            new Date(
              +this.taxPayerDetails.Sch1116Set["results"][0].FeFye.replace(
                ")",
                ""
              )
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY")
        : moment(new Date()).format("DD/MM/YYYY");
    console.log(this.UpeFyeDis, this.FeFyeDis);
  }
  CalculateTotals() {
    this.ValidatePatterns();
    this.taxPayerDetails.OtherEmpBen = parseFloat(
      this.taxPayerDetails.OtherEmpBen || 0
    ).toFixed(2);
    this.taxPayerDetails.NonSaudiCompShare = parseFloat(
      this.taxPayerDetails.NonSaudiCompShare || 0
    ).toFixed(2);
    this.taxPayerDetails.NonSaudiCaptlShare = parseFloat(
      this.taxPayerDetails.NonSaudiCaptlShare || 0
    ).toFixed(2);
    this.taxPayerDetails.DiffPriceGoodsServices = parseFloat(
      this.taxPayerDetails.DiffPriceGoodsServices || 0
    ).toFixed(2);
    this.taxPayerDetails.TotAdd = parseFloat(
      this.taxPayerDetails.TotAdd || 0
    ).toFixed(2);
    this.taxPayerDetails.NsCompShareProfit = parseFloat(
      this.taxPayerDetails.NsCompShareProfit || 0
    ).toFixed(2);
    this.taxPayerDetails.TotDeduct = parseFloat(
      this.taxPayerDetails.TotDeduct || 0
    ).toFixed(2);
    this.taxPayerDetails.TotAdj = parseFloat(
      this.taxPayerDetails.TotAdj || 0
    ).toFixed(2);
    this.taxPayerDetails.NetProfitExemp = parseFloat(
      this.taxPayerDetails.NetProfitExemp || 0
    ).toFixed(2);
    this.taxPayerDetails.NsNetLossAsset = parseFloat(
      this.taxPayerDetails.NsNetLossAsset || 0
    ).toFixed(2);
    this.taxPayerDetails.NetAdjProfit = parseFloat(
      this.taxPayerDetails.NetAdjProfit || 0
    ).toFixed(2);
    this.taxPayerDetails.TaxAmt = parseFloat(
      this.taxPayerDetails.TaxAmt || 0
    ).toFixed(2);
    this.taxPayerDetails.NetFxdAssets = parseFloat(
      this.taxPayerDetails.NetFxdAssets || 0
    ).toFixed(2);
    this.taxPayerDetails.RealEstTranMortgage = parseFloat(
      this.taxPayerDetails.RealEstTranMortgage || 0
    ).toFixed(2);
    this.taxPayerDetails.InvLocalComp = parseFloat(
      this.taxPayerDetails.InvLocalComp || 0
    ).toFixed(2);
    this.taxPayerDetails.InvOutsiteComp = parseFloat(
      this.taxPayerDetails.InvOutsiteComp || 0
    ).toFixed(2);
    this.taxPayerDetails.PosValLongTermDer = parseFloat(
      this.taxPayerDetails.PosValLongTermDer || 0
    ).toFixed(2);
    this.taxPayerDetails.LegDepSama = parseFloat(
      this.taxPayerDetails.LegDepSama || 0
    ).toFixed(2);
    this.taxPayerDetails.NonZakatAssetTot = parseFloat(
      this.taxPayerDetails.NonZakatAssetTot || 0
    ).toFixed(2);
    this.taxPayerDetails.AssetFinStmtTot = parseFloat(
      this.taxPayerDetails.AssetFinStmtTot || 0
    ).toFixed(2);
    this.taxPayerDetails.GrossProftFy = parseFloat(
      this.taxPayerDetails.GrossProftFy || 0
    ).toFixed(2);

    this.totalOtherRevenues = parseFloat(
      (
        +this.GainLossForm.value.TotalProfitLoss +
          +this.IncomeFromBankingForm.value.TotalAmount || 0
      ).toString()
    ).toFixed(2);
    this.TotRevenue = parseFloat(
      (+this.totalOtherRevenues + +this.MainActivityRevenue || 0).toString()
    ).toFixed(2);
    this.taxPayerDetails.CostExpTot = parseFloat(
      (
        (+this.taxPayerDetails.CostMain || 0) +
          (+this.taxPayerDetails.SalHouseAllowance || 0) +
          (+this.taxPayerDetails.BookDep || 0) +
          (+this.taxPayerDetails.SocGosiSaudi || 0) +
          (+this.taxPayerDetails.SocGosiForeigner || 0) +
          (+this.taxPayerDetails.RepMaintenanceExp || 0) +
          (+this.taxPayerDetails.ProvMadePer || 0) +
          (+this.taxPayerDetails.Donations || 0) +
          (+this.taxPayerDetails.ProfessionalFee || 0) +
          (+this.taxPayerDetails.OtherExp || 0) +
          (+this.taxPayerDetails.ZakatExponPrd || 0) +
          +this.taxPayerDetails.OtherEmpBen || 0
      ).toString()
    ).toFixed(2);
    //this.taxPayerDetails.NetProfit = parseFloat(((+this.totalOtherRevenues) + (+this.taxPayerDetails.CostExpTot)).toString()).toFixed(2);
    this.taxPayerDetails.NetProfit = parseFloat(
      (
        +this.totalOtherRevenues +
          +this.MainActivityRevenue -
          +this.taxPayerDetails.CostExpTot || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BsTotCurrAsset = "0.00";
    this.taxPayerDetails.BeTotCurrAsset = "0.00";
    this.taxPayerDetails.BsTotCurrAsset = parseFloat(
      (
        +this.taxPayerDetails.BsCashInhand +
          +this.taxPayerDetails.BsShortTmInvs +
          +this.taxPayerDetails.BsAccRecDebit +
          +this.taxPayerDetails.BsMecInventory +
          +this.taxPayerDetails.BsAccRevenue +
          +this.taxPayerDetails.BsPrapaidExp +
          +this.taxPayerDetails.BsDue +
          +this.taxPayerDetails.BsCurrAsset || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BeTotCurrAsset = parseFloat(
      (
        +this.taxPayerDetails.BeCashInhand +
          +this.taxPayerDetails.BeShortTmInvs +
          +this.taxPayerDetails.BeAccRecDebit +
          +this.taxPayerDetails.BeMecInventory +
          +this.taxPayerDetails.BeAccRevenue +
          +this.taxPayerDetails.BePrapaidExp +
          +this.taxPayerDetails.BeDue +
          +this.taxPayerDetails.BeCurrAsset || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BsTotNcurrAsset = parseFloat(
      (
        +this.taxPayerDetails.BsLongtermInves +
          +this.taxPayerDetails.BsNetproperty +
          +this.taxPayerDetails.BsWip +
          +this.taxPayerDetails.BsEstablish +
          +this.taxPayerDetails.BsNonasset || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BeTotNcurrAsset = parseFloat(
      (
        +this.taxPayerDetails.BeLongtermInves +
          +this.taxPayerDetails.BeNetproperty +
          +this.taxPayerDetails.BeWip +
          +this.taxPayerDetails.BeEstablish +
          +this.taxPayerDetails.BeNonasset || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BsTotintasset = parseFloat(
      (
        +this.taxPayerDetails.BsPatent + +this.taxPayerDetails.BsGoodwill || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BeTotintasset = parseFloat(
      (
        +this.taxPayerDetails.BePatent + +this.taxPayerDetails.BeGoodwill || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BsTotLiabilities = parseFloat(
      (
        +this.taxPayerDetails.BsLiabShorttrmPay +
          +this.taxPayerDetails.BsLiabPay +
          +this.taxPayerDetails.BsLiabAcc +
          +this.taxPayerDetails.BsLiabDiv +
          +this.taxPayerDetails.BsLiabAccper +
          +this.taxPayerDetails.BsLiabShortLoan +
          +this.taxPayerDetails.BsLiabPayParties || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BeTotLiabilities = parseFloat(
      (
        +this.taxPayerDetails.BeLiabShorttrmPay +
          +this.taxPayerDetails.BeLiabPay +
          +this.taxPayerDetails.BeLiabAcc +
          +this.taxPayerDetails.BeLiabDiv +
          +this.taxPayerDetails.BeLiabAccper +
          +this.taxPayerDetails.BeLiabShortLoan +
          +this.taxPayerDetails.BeLiabPayParties || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BsTotNonliabilities = parseFloat(
      (
        +this.taxPayerDetails.BsNliabLongLoan +
          +this.taxPayerDetails.BsNliabLongtrmPay +
          +this.taxPayerDetails.BsNliabOth +
          +this.taxPayerDetails.BsNliabCurPartners +
          +this.taxPayerDetails.BsNliabPayParties || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BeTotNonliabilities = parseFloat(
      (
        +this.taxPayerDetails.BeNliabLongLoan +
          +this.taxPayerDetails.BeNliabLongtrmPay +
          +this.taxPayerDetails.BeNliabOth +
          +this.taxPayerDetails.BeNliabCurPartners +
          +this.taxPayerDetails.BeNliabPayParties || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BsTotshare = parseFloat(
      (
        +this.taxPayerDetails.BsCapital +
          +this.taxPayerDetails.BsReserves +
          +this.taxPayerDetails.BsLiabRet +
          +this.taxPayerDetails.BsOther || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.BeTotshare = parseFloat(
      (
        +this.taxPayerDetails.BeCapital +
          +this.taxPayerDetails.BeReserves +
          +this.taxPayerDetails.BeLiabRet +
          +this.taxPayerDetails.BeOther || 0
      ).toString()
    ).toFixed(2);

    this.totalBsAssets = parseFloat(
      (
        +this.taxPayerDetails.BsTotCurrAsset +
        +this.taxPayerDetails.BsTotNcurrAsset +
        +this.taxPayerDetails.BsTotintasset
      ).toString()
    ).toFixed(2);
    this.totalBeAssets = parseFloat(
      (
        +this.taxPayerDetails.BeTotCurrAsset +
        +this.taxPayerDetails.BeTotNcurrAsset +
        +this.taxPayerDetails.BeTotintasset
      ).toString()
    ).toFixed(2);
    this.totalBSLiabilities = parseFloat(
      (
        +this.taxPayerDetails.BsTotNonliabilities +
        +this.taxPayerDetails.BsTotshare +
        +this.taxPayerDetails.BsTotLiabilities
      ).toString()
    ).toFixed(2);
    this.totalBeLiabilities = parseFloat(
      (
        +this.taxPayerDetails.BeTotLiabilities +
        +this.taxPayerDetails.BeTotNonliabilities +
        +this.taxPayerDetails.BeTotshare
      ).toString()
    ).toFixed(2);

    this.taxPayerDetails.Sch1109Set.results[0].TaxableIncmEx = parseFloat(
      (
        this.TotRevenue -
          this.taxPayerDetails.Sch1109Set.results[0].IncmLoanInt || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].DedExp = parseFloat(
      (
        +this.taxPayerDetails.CostExpTot -
          (+this.taxPayerDetails.DepDiff +
            +this.taxPayerDetails.MainteanceCostThold +
            +this.taxPayerDetails.ProvExpAccPeriod +
            +this.taxPayerDetails.AdjNetProfit +
            +this.taxPayerDetails.NonSaudiCompShare +
            +this.taxPayerDetails.NonSaudiCaptlShare +
            +this.taxPayerDetails.DiffPriceGoodsServices) || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].DedExpEx = parseFloat(
      (
        this.taxPayerDetails.Sch1109Set.results[0].DedExp -
          this.taxPayerDetails.Sch1109Set.results[0].ExpLoan || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].Results = parseFloat(
      (
        this.taxPayerDetails.Sch1109Set.results[0].TaxableIncmEx -
          this.taxPayerDetails.Sch1109Set.results[0].DedExpEx || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].Result50 = parseFloat(
      (
        (this.taxPayerDetails.Sch1109Set.results[0].Results * 50) / 100 || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].AddIncmLoanInt = parseFloat(
      (this.taxPayerDetails.Sch1109Set.results[0].IncmLoanInt || 0).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].IncmLoanInt50 = parseFloat(
      (
        +this.taxPayerDetails.Sch1109Set.results[0].Result50 +
          +this.taxPayerDetails.Sch1109Set.results[0].AddIncmLoanInt || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc = parseFloat(
      (this.taxPayerDetails.Sch1109Set.results[0].ExpLoan || 0).toString()
    ).toFixed(2);

    this.taxPayerDetails.LoanChargeThold = parseFloat(
      (this.taxPayerDetails.Sch1109Set.results[0].NsLiLegalTh || 0).toString()
    ).toFixed(2);

    if (
      +this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc -
        +this.taxPayerDetails.Sch1109Set.results[0].IncmLoanInt50 >
      this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc
    ) {
      this.taxPayerDetails.Sch1109Set.results[0].LiExpLimit = parseFloat(
        (this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc || 0).toString()
      ).toFixed(2);
    } else {
      if (
        +this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc -
          +this.taxPayerDetails.Sch1109Set.results[0].IncmLoanInt50 >
        0
      ) {
        this.taxPayerDetails.Sch1109Set.results[0].LiExpLimit = parseFloat(
          (
            +this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc -
              +this.taxPayerDetails.Sch1109Set.results[0].IncmLoanInt50 || 0
          ).toString()
        ).toFixed(2);
      } else {
        this.taxPayerDetails.Sch1109Set.results[0].LiExpLimit = parseFloat(
          "0"
        ).toFixed(2);
      }
    }

    this.taxPayerDetails.Sch1109Set.results[0].NsLiLegalTh = parseFloat(
      (
        (this.taxPayerDetails.Sch1109Set.results[0].LiLoadAcc *
          this.taxPayerDetails.WtNonSaudiSharePrft) /
          100 || 0
      ).toString()
    ).toFixed(2);

    if (this.DepreciationDifferencesForm.value.Schedule) {
      this.taxPayerDetails.DepDiff = (
        (+this.taxPayerDetails.BookDep -
          +this.DepreciationDifferencesForm.value
            .TotalDepreciationAmortizationValue) *
        (+this.taxPayerDetails.WtNonSaudiSharePrft / 100)
      ).toString();
      console.log(this.taxPayerDetails.DepDiff);
    } else {
      //this.taxPayerDetails.DepDiff=((this.taxPayerDetails.BookDep * this.taxPayerDetails.WtNonSaudiSharePrft)/100).toString();
      this.taxPayerDetails.DepDiff = "0.00";
    }

    this.taxPayerDetails.MainteanceCostThold = parseFloat(
      (
        (this.DepreciationDifferencesForm.value
          .TotalMaintancesExpenseExceedfourPercent *
          this.taxPayerDetails.WtNonSaudiSharePrft) /
          100 || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.ProvExpAccPeriod = parseFloat(
      (
        (this.ProvisionMadeDuringForm.value.ProvisionsCreatedDuringThisYear *
          this.taxPayerDetails.WtNonSaudiSharePrft) /
          100 || 0
      ).toString()
    ).toFixed(2);

    this.taxPayerDetails.TotAdd = parseFloat(
      (
        +this.taxPayerDetails.DepDiff +
          +this.taxPayerDetails.MainteanceCostThold +
          +this.taxPayerDetails.ProvExpAccPeriod +
          +this.taxPayerDetails.AdjNetProfit +
          +this.taxPayerDetails.LoanChargeThold +
          +this.taxPayerDetails.NonSaudiCompShare +
          +this.taxPayerDetails.NonSaudiCaptlShare +
          +this.taxPayerDetails.DiffPriceGoodsServices || 0
      ).toString()
    ).toFixed(2);
    //this.taxPayerDetails.NonSaudiCarryFwd = parseFloat(((((+this.ProvisionMadeDuringForm.value.ProvisionsCreatedDuringThisYear) * (+this.taxPayerDetails.WtNonSaudiSharePrft)) / 100) || 0).toString()).toFixed(2);
    this.taxPayerDetails.NonSaudiUtiProv = parseFloat(
      (
        (+this.ProvisionMadeDuringForm.value.ProvisionsCreatedDuringThisYear *
          +this.taxPayerDetails.WtNonSaudiSharePrft) /
          100 || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.TotDeduct = parseFloat(
      (
        +this.taxPayerDetails.NonSaudiUtiProv +
          +this.taxPayerDetails.NonSaudiRealCapital +
          +this.taxPayerDetails.NonSaudiCarryFwd +
          +this.taxPayerDetails.NsCompShareProfit || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.TotAdj = parseFloat(
      (
        +this.taxPayerDetails.TotAdd - +this.taxPayerDetails.TotDeduct || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.NetProfitExemp = parseFloat(
      (
        +this.taxPayerDetails.NonSaudiNetProfit +
          +this.taxPayerDetails.TotAdj || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.NetAdjProfit = parseFloat(
      (
        +this.taxPayerDetails.NetProfitExemp +
          +this.taxPayerDetails.NsNetLossAsset || 0
      ).toString()
    ).toFixed(2);

    this.taxPayerDetails.TaxAmt =
      +this.taxPayerDetails.NetAdjProfit >= 0
        ? parseFloat(
            ((+this.taxPayerDetails.NetAdjProfit * 20) / 100 || 0).toString()
          ).toFixed(2)
        : "0.00";
    this.taxPayerDetails.TotFundSrc = parseFloat(
      (
        +this.taxPayerDetails.Capital +
          +this.taxPayerDetails.EquIntFunds +
          +this.taxPayerDetails.LongTermLoan +
          +this.taxPayerDetails.NegValLongTermDer || 0
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.NonZakatAssetTot = parseFloat(
      (
        +this.taxPayerDetails.NetFxdAssets +
          +this.taxPayerDetails.RealEstTranMortgage +
          +this.taxPayerDetails.InvLocalComp +
          +this.taxPayerDetails.InvOutsiteComp +
          +this.taxPayerDetails.LongTermDebt +
          +this.taxPayerDetails.InvDebtGovBear +
          +this.taxPayerDetails.PosValLongTermDer +
          +this.taxPayerDetails.LegDepSama || 0
      ).toString()
    ).toFixed(2);

    //Added by hema to calculate minimum and maximum zakat calculations
    if (+this.taxPayerDetails.NetProfitBook > 0) {
      this.taxPayerDetails.MinZakatBase = parseFloat(
        (this.taxPayerDetails.NetProfitBook * 4).toString()
      ).toFixed(2);
      this.taxPayerDetails.MinZakatBase =
        this.taxPayerDetails.MinZakatBase < 0
          ? 0
          : this.taxPayerDetails.MinZakatBase;
      this.taxPayerDetails.MaxZakatBase = parseFloat(
        (this.taxPayerDetails.NetProfitBook * 8).toString()
      ).toFixed(2);
      this.taxPayerDetails.MaxZakatBase =
        this.taxPayerDetails.MaxZakatBase < 0
          ? 0
          : this.taxPayerDetails.MaxZakatBase;
      this.ZakatCalculation();
    } else {
      this.taxPayerDetails.MinZakatBase = parseFloat(
        (((this.taxPayerDetails.GrossProftFy * 10) / 100) * 4).toString()
      ).toFixed(2);
      this.taxPayerDetails.MinZakatBase =
        this.taxPayerDetails.MinZakatBase < 0
          ? 0
          : this.taxPayerDetails.MinZakatBase;
      this.taxPayerDetails.MaxZakatBase = parseFloat(
        (((this.taxPayerDetails.GrossProftFy * 10) / 100) * 8).toString()
      ).toFixed(2);
      this.taxPayerDetails.MaxZakatBase =
        this.taxPayerDetails.MaxZakatBase < 0
          ? 0
          : this.taxPayerDetails.MaxZakatBase;
      this.ZakatCalculation();
    }

    console.log(
      "this.taxPayerDetails.NetProfit",
      this.taxPayerDetails.NetProfit,
      ((+this.taxPayerDetails.WtNonSaudiShareCaptl.split(".")[0] || 0) +
        (+this.taxPayerDetails.WtNonSaudiSharePrft.split(".")[0] || 0)) /
        2 /
        100
    );

    this.taxPayerDetails.NonSaudiNetProfit = parseFloat(
      (
        +this.taxPayerDetails.NetProfit *
        (((+this.taxPayerDetails.WtNonSaudiShareCaptl.split(".")[0] || 0) +
          (+this.taxPayerDetails.WtNonSaudiSharePrft.split(".")[0] || 0)) /
          2 /
          100)
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.LoanChargeThold = parseFloat(
      (
        (+this.taxPayerDetails.Sch1109Set.results[0].NsLiLegalTh *
          +this.taxPayerDetails.WtNonSaudiSharePrft) /
        100
      ).toString()
    ).toFixed(2);
  }
  // ValidatePatterns() {
  //   this.MainActivityRevenue = this.MainActivityRevenue?parseFloat(this.MainActivityRevenue.toString()).toFixed(2):"0.00";
  //   this.taxPayerDetails.SalHouseAllowance = this.taxPayerDetails.SalHouseAllowance?parseFloat(this.taxPayerDetails.SalHouseAllowance).toFixed(2):"0.00";
  //   this.taxPayerDetails.BookDep = this.taxPayerDetails.BookDep?parseFloat(this.taxPayerDetails.BookDep).toFixed(2):"0.00";
  //   this.taxPayerDetails.SocGosiSaudi = this.taxPayerDetails.SocGosiSaudi?parseFloat(this.taxPayerDetails.SocGosiSaudi).toFixed(2):"0.00";
  //   this.taxPayerDetails.SocGosiForeigner = this.taxPayerDetails.SocGosiForeigner?parseFloat(this.taxPayerDetails.SocGosiForeigner).toFixed(2):"0.00";
  //   this.taxPayerDetails.RepMaintenanceExp = this.taxPayerDetails.RepMaintenanceExp?parseFloat(this.taxPayerDetails.RepMaintenanceExp).toFixed(2):"0.00";
  //   this.taxPayerDetails.ProvMadePer = this.taxPayerDetails.ProvMadePer?parseFloat(this.taxPayerDetails.ProvMadePer).toFixed(2):"0.00";
  //   this.taxPayerDetails.Donations = this.taxPayerDetails.Donations?parseFloat(this.taxPayerDetails.Donations).toFixed(2):"0.00";
  //   this.taxPayerDetails.ZakatExponPrd = this.taxPayerDetails.ZakatExponPrd?parseFloat(this.taxPayerDetails.ZakatExponPrd).toFixed(2):"0.00";
  //   this.taxPayerDetails.DepDiff = parseFloat(this.taxPayerDetails.DepDiff).toFixed(2);
  //   this.taxPayerDetails.MainteanceCostThold = parseFloat(this.taxPayerDetails.MainteanceCostThold).toFixed(2);
  //   this.taxPayerDetails.ProvExpAccPeriod = parseFloat(this.taxPayerDetails.ProvExpAccPeriod).toFixed(2);
  //   this.taxPayerDetails.AdjNetProfit = parseFloat(this.taxPayerDetails.AdjNetProfit).toFixed(2);
  //   this.taxPayerDetails.LoanChargeThold = parseFloat(this.taxPayerDetails.LoanChargeThold).toFixed(2);
  //   this.taxPayerDetails.NonSaudiCompShare = this.taxPayerDetails.NonSaudiCompShare?parseFloat(this.taxPayerDetails.NonSaudiCompShare).toFixed(2):"0.00";
  //   this.taxPayerDetails.NonSaudiCaptlShare = this.taxPayerDetails.NonSaudiCaptlShare?parseFloat(this.taxPayerDetails.NonSaudiCaptlShare).toFixed(2):"0.00";
  //   this.taxPayerDetails.DiffPriceGoodsServices = this.taxPayerDetails.DiffPriceGoodsServices?parseFloat(this.taxPayerDetails.DiffPriceGoodsServices).toFixed(2):"0.00";
  //   this.taxPayerDetails.TotAdd = parseFloat(this.taxPayerDetails.TotAdd).toFixed(2);
  //   this.taxPayerDetails.NonSaudiUtiProv = parseFloat(this.taxPayerDetails.NonSaudiUtiProv).toFixed(2);
  //   this.taxPayerDetails.NonSaudiRealCapital = parseFloat(this.taxPayerDetails.NonSaudiRealCapital).toFixed(2);
  //   this.taxPayerDetails.NonSaudiCarryFwd = parseFloat(this.taxPayerDetails.NonSaudiCarryFwd).toFixed(2);
  //   this.taxPayerDetails.NsCompShareProfit = this.taxPayerDetails.NsCompShareProfit?parseFloat(this.taxPayerDetails.NsCompShareProfit).toFixed(2):"0.00";
  //   this.taxPayerDetails.TotDeduct = parseFloat(this.taxPayerDetails.TotDeduct).toFixed(2);
  //   this.taxPayerDetails.TotAdj = parseFloat(this.taxPayerDetails.TotAdj).toFixed(2);
  //   this.taxPayerDetails.NetProfitExemp = parseFloat(this.taxPayerDetails.NetProfitExemp).toFixed(2);
  //   this.taxPayerDetails.NsNetLossAsset = this.taxPayerDetails.NsNetLossAsset?parseFloat(this.taxPayerDetails.NsNetLossAsset).toFixed(2):"0.00";
  //   this.taxPayerDetails.NetAdjProfit = parseFloat(this.taxPayerDetails.NetAdjProfit).toFixed(2);
  //   this.taxPayerDetails.TaxAmt = parseFloat(this.taxPayerDetails.TaxAmt).toFixed(2);
  //   this.taxPayerDetails.Capital = parseFloat(this.taxPayerDetails.Capital).toFixed(2);
  //   this.taxPayerDetails.EquIntFunds = parseFloat(this.taxPayerDetails.EquIntFunds).toFixed(2);
  //   this.taxPayerDetails.LongTermLoan = parseFloat(this.taxPayerDetails.LongTermLoan).toFixed(2);
  //   this.taxPayerDetails.NegValLongTermDer = this.taxPayerDetails.NegValLongTermDer?parseFloat(this.taxPayerDetails.NegValLongTermDer).toFixed(2):"0.00";
  //   this.taxPayerDetails.TotFundSrc = parseFloat(this.taxPayerDetails.TotFundSrc).toFixed(2);
  //   this.taxPayerDetails.NetFxdAssets = this.taxPayerDetails.NetFxdAssets?parseFloat(this.taxPayerDetails.NetFxdAssets).toFixed(2):"0.00";
  //   this.taxPayerDetails.RealEstTranMortgage = this.taxPayerDetails.RealEstTranMortgage?parseFloat(this.taxPayerDetails.RealEstTranMortgage).toFixed(2):"0.00";
  //   this.taxPayerDetails.InvLocalComp = this.taxPayerDetails.InvLocalComp?parseFloat(this.taxPayerDetails.InvLocalComp).toFixed(2):"0.00";
  //   this.taxPayerDetails.InvOutsiteComp = this.taxPayerDetails.InvOutsiteComp?parseFloat(this.taxPayerDetails.InvOutsiteComp).toFixed(2):"0.00";
  //   this.taxPayerDetails.LongTermDebt = parseFloat(this.taxPayerDetails.LongTermDebt).toFixed(2);
  //   this.taxPayerDetails.InvDebtGovBear = parseFloat(this.taxPayerDetails.InvDebtGovBear).toFixed(2);
  //   this.taxPayerDetails.PosValLongTermDer = this.taxPayerDetails.PosValLongTermDer?parseFloat(this.taxPayerDetails.PosValLongTermDer).toFixed(2):"0.00";
  //   this.taxPayerDetails.LegDepSama = this.taxPayerDetails.LegDepSama?parseFloat(this.taxPayerDetails.LegDepSama).toFixed(2):"0.00";
  //   this.taxPayerDetails.NonZakatAssetTot = parseFloat(this.taxPayerDetails.NonZakatAssetTot).toFixed(2);
  //   this.taxPayerDetails.ZakatAssetTot = parseFloat(this.taxPayerDetails.ZakatAssetTot).toFixed(2);
  //   this.taxPayerDetails.AssetFinStmtTot = this.taxPayerDetails.AssetFinStmtTot?parseFloat(this.taxPayerDetails.AssetFinStmtTot).toFixed(2):"0.00";
  //   this.taxPayerDetails.PerZakatAssetTot = parseFloat(this.taxPayerDetails.PerZakatAssetTot).toFixed(2);
  //   this.taxPayerDetails.ZakatBaseMinMax = parseFloat(this.taxPayerDetails.ZakatBaseMinMax).toFixed(2);
  //   this.taxPayerDetails.NetProfitBook = parseFloat(this.taxPayerDetails.NetProfitBook).toFixed(2);
  //   this.taxPayerDetails.GrossProftFy = this.taxPayerDetails.GrossProftFy?parseFloat(this.taxPayerDetails.GrossProftFy).toFixed(2):"0.00";
  //   this.taxPayerDetails.MinZakatBase = parseFloat(this.taxPayerDetails.MinZakatBase).toFixed(2);
  //   this.taxPayerDetails.MaxZakatBase = parseFloat(this.taxPayerDetails.MaxZakatBase).toFixed(2);
  //   this.taxPayerDetails.SaudiShareZakat = parseFloat(this.taxPayerDetails.SaudiShareZakat).toFixed(2);
  //   this.taxPayerDetails.ZakatAmtOutInv = this.taxPayerDetails.ZakatAmtOutInv?parseFloat(this.taxPayerDetails.ZakatAmtOutInv).toFixed(2):"0.00";
  //   this.taxPayerDetails.ZakatAmt = parseFloat(this.taxPayerDetails.ZakatAmt).toFixed(2);
  //   this.taxPayerDetails.ZakatPayTot = parseFloat(this.taxPayerDetails.ZakatPayTot).toFixed(2);

  //   this.taxPayerDetails.BsCashInhand = parseFloat(this.taxPayerDetails.BsCashInhand).toFixed(2);
  //   this.taxPayerDetails.BeCashInhand = parseFloat(this.taxPayerDetails.BeCashInhand).toFixed(2);
  //   this.taxPayerDetails.BsShortTmInvs = parseFloat(this.taxPayerDetails.BsShortTmInvs).toFixed(2);
  //   this.taxPayerDetails.BeShortTmInvs = parseFloat(this.taxPayerDetails.BeShortTmInvs).toFixed(2);
  //   this.taxPayerDetails.BsAccRecDebit = parseFloat(this.taxPayerDetails.BsAccRecDebit).toFixed(2);
  //   this.taxPayerDetails.BsAccRecDebit = parseFloat(this.taxPayerDetails.BeAccRecDebit).toFixed(2);

  //   this.taxPayerDetails.BsMecInventory = parseFloat(this.taxPayerDetails.BsMecInventory).toFixed(2);
  //   this.taxPayerDetails.BeMecInventory = parseFloat(this.taxPayerDetails.BeMecInventory).toFixed(2);

  //   this.taxPayerDetails.BsAccRevenue = parseFloat(this.taxPayerDetails.BsAccRevenue).toFixed(2);
  //   this.taxPayerDetails.BeAccRevenue = parseFloat(this.taxPayerDetails.BeAccRevenue).toFixed(2);

  //   this.taxPayerDetails.BsPrapaidExp = parseFloat(this.taxPayerDetails.BsPrapaidExp).toFixed(2);
  //   this.taxPayerDetails.BePrapaidExp = parseFloat(this.taxPayerDetails.BePrapaidExp).toFixed(2);

  //   this.taxPayerDetails.BsDue = parseFloat(this.taxPayerDetails.BsDue).toFixed(2);
  //   this.taxPayerDetails.BeDue = parseFloat(this.taxPayerDetails.BeDue).toFixed(2);

  //   this.taxPayerDetails.BsCurrAsset = parseFloat(this.taxPayerDetails.BsCurrAsset).toFixed(2);
  //   this.taxPayerDetails.BeCurrAsset = parseFloat(this.taxPayerDetails.BeCurrAsset).toFixed(2);

  //   this.taxPayerDetails.BsTotCurrAsset = parseFloat(this.taxPayerDetails.BsTotCurrAsset).toFixed(2);
  //   this.taxPayerDetails.BeTotCurrAsset = parseFloat(this.taxPayerDetails.BeTotCurrAsset).toFixed(2);

  //   this.taxPayerDetails.BsLongtermInves = parseFloat(this.taxPayerDetails.BsLongtermInves).toFixed(2);
  //   this.taxPayerDetails.BeLongtermInves = parseFloat(this.taxPayerDetails.BeLongtermInves).toFixed(2);

  //   this.taxPayerDetails.BsNetproperty = parseFloat(this.taxPayerDetails.BsNetproperty).toFixed(2);
  //   this.taxPayerDetails.BeNetproperty = parseFloat(this.taxPayerDetails.BeNetproperty).toFixed(2);

  //   this.taxPayerDetails.BsWip = parseFloat(this.taxPayerDetails.BsWip).toFixed(2);
  //   this.taxPayerDetails.BeWip = parseFloat(this.taxPayerDetails.BeWip).toFixed(2);

  //   this.taxPayerDetails.BsEstablish = parseFloat(this.taxPayerDetails.BsEstablish).toFixed(2);
  //   this.taxPayerDetails.BeEstablish = parseFloat(this.taxPayerDetails.BeEstablish).toFixed(2);

  //   this.taxPayerDetails.BsNonasset = parseFloat(this.taxPayerDetails.BsNonasset).toFixed(2);
  //   this.taxPayerDetails.BeNonasset = parseFloat(this.taxPayerDetails.BeNonasset).toFixed(2);

  //   this.taxPayerDetails.BsTotNcurrAsset = parseFloat(this.taxPayerDetails.BsTotNcurrAsset).toFixed(2);
  //   this.taxPayerDetails.BeTotNcurrAsset = parseFloat(this.taxPayerDetails.BeTotNcurrAsset).toFixed(2);

  //   this.taxPayerDetails.BsPatent = parseFloat(this.taxPayerDetails.BsPatent).toFixed(2);
  //   this.taxPayerDetails.BePatent = parseFloat(this.taxPayerDetails.BePatent).toFixed(2);

  //   this.taxPayerDetails.BsGoodwill = parseFloat(this.taxPayerDetails.BsGoodwill).toFixed(2);
  //   this.taxPayerDetails.BeGoodwill = parseFloat(this.taxPayerDetails.BeGoodwill).toFixed(2);

  //   this.taxPayerDetails.BsTotintasset = parseFloat(this.taxPayerDetails.BsTotintasset).toFixed(2);
  //   this.taxPayerDetails.BeTotintasset = parseFloat(this.taxPayerDetails.BeTotintasset).toFixed(2);

  //   this.taxPayerDetails.BsLiabShorttrmPay = parseFloat(this.taxPayerDetails.BsLiabShorttrmPay).toFixed(2);
  //   this.taxPayerDetails.BeLiabShorttrmPay = parseFloat(this.taxPayerDetails.BeLiabShorttrmPay).toFixed(2);

  //   this.taxPayerDetails.BsLiabPay = parseFloat(this.taxPayerDetails.BsLiabPay).toFixed(2);
  //   this.taxPayerDetails.BeLiabPay = parseFloat(this.taxPayerDetails.BeLiabPay).toFixed(2);

  //   this.taxPayerDetails.BsLiabAcc = parseFloat(this.taxPayerDetails.BsLiabAcc).toFixed(2);
  //   this.taxPayerDetails.BeLiabAcc = parseFloat(this.taxPayerDetails.BeLiabAcc).toFixed(2);

  //   this.taxPayerDetails.BsLiabDiv = parseFloat(this.taxPayerDetails.BsLiabDiv).toFixed(2);
  //   this.taxPayerDetails.BeLiabDiv = parseFloat(this.taxPayerDetails.BeLiabDiv).toFixed(2);

  //   this.taxPayerDetails.BsLiabAccper = parseFloat(this.taxPayerDetails.BsLiabAccper).toFixed(2);
  //   this.taxPayerDetails.BeLiabAccper = parseFloat(this.taxPayerDetails.BeLiabAccper).toFixed(2);

  //   this.taxPayerDetails.BsLiabShortLoan = parseFloat(this.taxPayerDetails.BsLiabShortLoan).toFixed(2);
  //   this.taxPayerDetails.BeLiabShortLoan = parseFloat(this.taxPayerDetails.BeLiabShortLoan).toFixed(2);

  //   this.taxPayerDetails.BsLiabPayParties = parseFloat(this.taxPayerDetails.BsLiabPayParties).toFixed(2);
  //   this.taxPayerDetails.BeLiabPayParties = parseFloat(this.taxPayerDetails.BeLiabPayParties).toFixed(2);

  //   this.taxPayerDetails.BsTotLiabilities = parseFloat(this.taxPayerDetails.BsTotLiabilities).toFixed(2);
  //   this.taxPayerDetails.BeTotLiabilities = parseFloat(this.taxPayerDetails.BeTotLiabilities).toFixed(2);

  //   this.taxPayerDetails.BsNliabLongLoan = parseFloat(this.taxPayerDetails.BsNliabLongLoan).toFixed(2);
  //   this.taxPayerDetails.BeNliabLongLoan = parseFloat(this.taxPayerDetails.BeNliabLongLoan).toFixed(2);

  //   this.taxPayerDetails.BsNliabLongtrmPay = parseFloat(this.taxPayerDetails.BsNliabLongtrmPay).toFixed(2);
  //   this.taxPayerDetails.BeNliabLongtrmPay = parseFloat(this.taxPayerDetails.BeNliabLongtrmPay).toFixed(2);

  //   this.taxPayerDetails.BsNliabOth = parseFloat(this.taxPayerDetails.BsNliabOth).toFixed(2);
  //   this.taxPayerDetails.BeNliabOth = parseFloat(this.taxPayerDetails.BeNliabOth).toFixed(2);

  //   this.taxPayerDetails.BsNliabCurPartners = parseFloat(this.taxPayerDetails.BsNliabCurPartners).toFixed(2);
  //   this.taxPayerDetails.BeNliabCurPartners = parseFloat(this.taxPayerDetails.BeNliabCurPartners).toFixed(2);

  //   this.taxPayerDetails.BsNliabPayParties = parseFloat(this.taxPayerDetails.BsNliabPayParties).toFixed(2);
  //   this.taxPayerDetails.BeNliabPayParties = parseFloat(this.taxPayerDetails.BeNliabPayParties).toFixed(2);

  //   this.taxPayerDetails.BsTotNonliabilities = parseFloat(this.taxPayerDetails.BsTotNonliabilities).toFixed(2);
  //   this.taxPayerDetails.BeTotNonliabilities = parseFloat(this.taxPayerDetails.BeTotNonliabilities).toFixed(2);

  //   this.taxPayerDetails.BsCapital = parseFloat(this.taxPayerDetails.BsCapital).toFixed(2);
  //   this.taxPayerDetails.BeCapital = parseFloat(this.taxPayerDetails.BeCapital).toFixed(2);

  //   this.taxPayerDetails.BsReserves = parseFloat(this.taxPayerDetails.BsReserves).toFixed(2);
  //   this.taxPayerDetails.BeReserves = parseFloat(this.taxPayerDetails.BeReserves).toFixed(2);

  //   this.taxPayerDetails.BsLiabRet = parseFloat(this.taxPayerDetails.BsLiabRet).toFixed(2);
  //   this.taxPayerDetails.BeLiabRet = parseFloat(this.taxPayerDetails.BeLiabRet).toFixed(2);

  //   this.taxPayerDetails.BsOther = parseFloat(this.taxPayerDetails.BsOther).toFixed(2);
  //   this.taxPayerDetails.BeOther = parseFloat(this.taxPayerDetails.BeOther).toFixed(2);

  //   this.taxPayerDetails.BsTotshare = parseFloat(this.taxPayerDetails.BsTotshare).toFixed(2);
  //   this.taxPayerDetails.BeTotshare = parseFloat(this.taxPayerDetails.BeTotshare).toFixed(2);

  //   this.taxPayerDetails.NetProfit = parseFloat(this.taxPayerDetails.NetProfit).toFixed(2);
  //   this.taxPayerDetails.Sch1117Set.results[0].Revenue = parseFloat(this.taxPayerDetails.Sch1117Set.results[0].Revenue).toFixed(2);
  //   this.taxPayerDetails.Sch1117Set.results[0].Expense = parseFloat(this.taxPayerDetails.Sch1117Set.results[0].Expense).toFixed(2);
  //   this.taxPayerDetails.Sch1117Set.results[0].NetAmount = parseFloat(this.taxPayerDetails.Sch1117Set.results[0].NetAmount).toFixed(2);

  // }

  ValidatePatterns() {
    this.MainActivityRevenue = this.MainActivityRevenue
      ? parseFloat((this.MainActivityRevenue || 0).toString()).toFixed(2)
      : "0.00";
    this.taxPayerDetails.SalHouseAllowance = this.taxPayerDetails
      .SalHouseAllowance
      ? parseFloat(this.taxPayerDetails.SalHouseAllowance || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.BookDep = this.taxPayerDetails.BookDep
      ? parseFloat(this.taxPayerDetails.BookDep || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.SocGosiSaudi = this.taxPayerDetails.SocGosiSaudi
      ? parseFloat(this.taxPayerDetails.SocGosiSaudi || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.SocGosiForeigner = this.taxPayerDetails
      .SocGosiForeigner
      ? parseFloat(this.taxPayerDetails.SocGosiForeigner || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.RepMaintenanceExp = this.taxPayerDetails
      .RepMaintenanceExp
      ? parseFloat(this.taxPayerDetails.RepMaintenanceExp || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.ProvMadePer = this.taxPayerDetails.ProvMadePer
      ? parseFloat(this.taxPayerDetails.ProvMadePer || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.Donations = this.taxPayerDetails.Donations
      ? parseFloat(this.taxPayerDetails.Donations || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.ZakatExponPrd = this.taxPayerDetails.ZakatExponPrd
      ? parseFloat(this.taxPayerDetails.ZakatExponPrd || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.DepDiff = parseFloat(
      this.taxPayerDetails.DepDiff || 0
    ).toFixed(2);
    this.taxPayerDetails.MainteanceCostThold = parseFloat(
      this.taxPayerDetails.MainteanceCostThold || 0
    ).toFixed(2);
    this.taxPayerDetails.ProvExpAccPeriod = parseFloat(
      this.taxPayerDetails.ProvExpAccPeriod || 0
    ).toFixed(2);
    this.taxPayerDetails.AdjNetProfit = parseFloat(
      this.taxPayerDetails.AdjNetProfit || 0
    ).toFixed(2);
    this.taxPayerDetails.LoanChargeThold = parseFloat(
      this.taxPayerDetails.LoanChargeThold || 0
    ).toFixed(2);
    this.taxPayerDetails.NonSaudiCompShare = this.taxPayerDetails
      .NonSaudiCompShare
      ? parseFloat(this.taxPayerDetails.NonSaudiCompShare || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.NonSaudiCaptlShare = this.taxPayerDetails
      .NonSaudiCaptlShare
      ? parseFloat(this.taxPayerDetails.NonSaudiCaptlShare || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.DiffPriceGoodsServices = this.taxPayerDetails
      .DiffPriceGoodsServices
      ? parseFloat(this.taxPayerDetails.DiffPriceGoodsServices || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.TotAdd = parseFloat(
      this.taxPayerDetails.TotAdd || 0
    ).toFixed(2);
    this.taxPayerDetails.NonSaudiUtiProv = parseFloat(
      this.taxPayerDetails.NonSaudiUtiProv || 0
    ).toFixed(2);
    this.taxPayerDetails.NonSaudiRealCapital = parseFloat(
      this.taxPayerDetails.NonSaudiRealCapital || 0
    ).toFixed(2);
    this.taxPayerDetails.NonSaudiCarryFwd = parseFloat(
      this.taxPayerDetails.NonSaudiCarryFwd || 0
    ).toFixed(2);
    this.taxPayerDetails.NsCompShareProfit = this.taxPayerDetails
      .NsCompShareProfit
      ? parseFloat(this.taxPayerDetails.NsCompShareProfit || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.TotDeduct = parseFloat(
      this.taxPayerDetails.TotDeduct || 0
    ).toFixed(2);
    this.taxPayerDetails.TotAdj = parseFloat(
      this.taxPayerDetails.TotAdj || 0
    ).toFixed(2);
    this.taxPayerDetails.NetProfitExemp = parseFloat(
      this.taxPayerDetails.NetProfitExemp || 0
    ).toFixed(2);
    this.taxPayerDetails.NsNetLossAsset = this.taxPayerDetails.NsNetLossAsset
      ? parseFloat(this.taxPayerDetails.NsNetLossAsset || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.NetAdjProfit = parseFloat(
      this.taxPayerDetails.NetAdjProfit || 0
    ).toFixed(2);
    this.taxPayerDetails.TaxAmt = parseFloat(
      this.taxPayerDetails.TaxAmt || 0
    ).toFixed(2);
    this.taxPayerDetails.Capital = parseFloat(
      this.taxPayerDetails.Capital || 0
    ).toFixed(2);
    this.taxPayerDetails.EquIntFunds = parseFloat(
      this.taxPayerDetails.EquIntFunds || 0
    ).toFixed(2);
    this.taxPayerDetails.LongTermLoan = parseFloat(
      this.taxPayerDetails.LongTermLoan || 0
    ).toFixed(2);
    this.taxPayerDetails.NegValLongTermDer = this.taxPayerDetails
      .NegValLongTermDer
      ? parseFloat(this.taxPayerDetails.NegValLongTermDer || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.TotFundSrc = parseFloat(
      this.taxPayerDetails.TotFundSrc || 0
    ).toFixed(2);
    this.taxPayerDetails.NetFxdAssets = this.taxPayerDetails.NetFxdAssets
      ? parseFloat(this.taxPayerDetails.NetFxdAssets || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.RealEstTranMortgage = this.taxPayerDetails
      .RealEstTranMortgage
      ? parseFloat(this.taxPayerDetails.RealEstTranMortgage || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.InvLocalComp = this.taxPayerDetails.InvLocalComp
      ? parseFloat(this.taxPayerDetails.InvLocalComp || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.InvOutsiteComp = this.taxPayerDetails.InvOutsiteComp
      ? parseFloat(this.taxPayerDetails.InvOutsiteComp || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.LongTermDebt = parseFloat(
      this.taxPayerDetails.LongTermDebt || 0
    ).toFixed(2);
    this.taxPayerDetails.InvDebtGovBear = parseFloat(
      this.taxPayerDetails.InvDebtGovBear || 0
    ).toFixed(2);
    this.taxPayerDetails.PosValLongTermDer = this.taxPayerDetails
      .PosValLongTermDer
      ? parseFloat(this.taxPayerDetails.PosValLongTermDer || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.LegDepSama = this.taxPayerDetails.LegDepSama
      ? parseFloat(this.taxPayerDetails.LegDepSama || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.NonZakatAssetTot = parseFloat(
      this.taxPayerDetails.NonZakatAssetTot || 0
    ).toFixed(2);
    this.taxPayerDetails.ZakatAssetTot = parseFloat(
      this.taxPayerDetails.ZakatAssetTot || 0
    ).toFixed(2);
    this.taxPayerDetails.AssetFinStmtTot = this.taxPayerDetails.AssetFinStmtTot
      ? parseFloat(this.taxPayerDetails.AssetFinStmtTot || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.PerZakatAssetTot = parseFloat(
      this.taxPayerDetails.PerZakatAssetTot || 0
    ).toFixed(2);
    this.taxPayerDetails.ZakatBaseMinMax = parseFloat(
      this.taxPayerDetails.ZakatBaseMinMax || 0
    ).toFixed(2);
    this.taxPayerDetails.NetProfitBook = parseFloat(
      this.taxPayerDetails.NetProfitBook || 0
    ).toFixed(2);
    this.taxPayerDetails.GrossProftFy = this.taxPayerDetails.GrossProftFy
      ? parseFloat(this.taxPayerDetails.GrossProftFy || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.MinZakatBase = parseFloat(
      this.taxPayerDetails.MinZakatBase || 0
    ).toFixed(2);
    this.taxPayerDetails.MaxZakatBase = parseFloat(
      this.taxPayerDetails.MaxZakatBase || 0
    ).toFixed(2);
    this.taxPayerDetails.SaudiShareZakat = parseFloat(
      this.taxPayerDetails.SaudiShareZakat || 0
    ).toFixed(2);
    this.taxPayerDetails.ZakatAmtOutInv = this.taxPayerDetails.ZakatAmtOutInv
      ? parseFloat(this.taxPayerDetails.ZakatAmtOutInv || 0).toFixed(2)
      : "0.00";
    this.taxPayerDetails.ZakatAmt = parseFloat(
      this.taxPayerDetails.ZakatAmt || 0
    ).toFixed(2);
    this.taxPayerDetails.ZakatPayTot = parseFloat(
      this.taxPayerDetails.ZakatPayTot || 0
    ).toFixed(2);

    this.taxPayerDetails.BsCashInhand = parseFloat(
      this.taxPayerDetails.BsCashInhand || 0
    ).toFixed(2);
    this.taxPayerDetails.BeCashInhand = parseFloat(
      this.taxPayerDetails.BeCashInhand || 0
    ).toFixed(2);
    this.taxPayerDetails.BsShortTmInvs = parseFloat(
      this.taxPayerDetails.BsShortTmInvs || 0
    ).toFixed(2);
    this.taxPayerDetails.BeShortTmInvs = parseFloat(
      this.taxPayerDetails.BeShortTmInvs || 0
    ).toFixed(2);
    this.taxPayerDetails.BsAccRecDebit = parseFloat(
      this.taxPayerDetails.BsAccRecDebit || 0
    ).toFixed(2);
    this.taxPayerDetails.BeAccRecDebit = parseFloat(
      this.taxPayerDetails.BeAccRecDebit || 0
    ).toFixed(2);

    this.taxPayerDetails.BsMecInventory = parseFloat(
      this.taxPayerDetails.BsMecInventory || 0
    ).toFixed(2);
    this.taxPayerDetails.BeMecInventory = parseFloat(
      this.taxPayerDetails.BeMecInventory || 0
    ).toFixed(2);

    this.taxPayerDetails.BsAccRevenue = parseFloat(
      this.taxPayerDetails.BsAccRevenue || 0
    ).toFixed(2);
    this.taxPayerDetails.BeAccRevenue = parseFloat(
      this.taxPayerDetails.BeAccRevenue || 0
    ).toFixed(2);

    this.taxPayerDetails.BsPrapaidExp = parseFloat(
      this.taxPayerDetails.BsPrapaidExp || 0
    ).toFixed(2);
    this.taxPayerDetails.BePrapaidExp = parseFloat(
      this.taxPayerDetails.BePrapaidExp || 0
    ).toFixed(2);

    this.taxPayerDetails.BsDue = parseFloat(
      this.taxPayerDetails.BsDue || 0
    ).toFixed(2);
    this.taxPayerDetails.BeDue = parseFloat(
      this.taxPayerDetails.BeDue || 0
    ).toFixed(2);

    this.taxPayerDetails.BsCurrAsset = parseFloat(
      this.taxPayerDetails.BsCurrAsset || 0
    ).toFixed(2);
    this.taxPayerDetails.BeCurrAsset = parseFloat(
      this.taxPayerDetails.BeCurrAsset || 0
    ).toFixed(2);

    this.taxPayerDetails.BsTotCurrAsset = parseFloat(
      this.taxPayerDetails.BsTotCurrAsset || 0
    ).toFixed(2);
    this.taxPayerDetails.BeTotCurrAsset = parseFloat(
      this.taxPayerDetails.BeTotCurrAsset || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLongtermInves = parseFloat(
      this.taxPayerDetails.BsLongtermInves || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLongtermInves = parseFloat(
      this.taxPayerDetails.BeLongtermInves || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNetproperty = parseFloat(
      this.taxPayerDetails.BsNetproperty || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNetproperty = parseFloat(
      this.taxPayerDetails.BeNetproperty || 0
    ).toFixed(2);

    this.taxPayerDetails.BsWip = parseFloat(
      this.taxPayerDetails.BsWip || 0
    ).toFixed(2);
    this.taxPayerDetails.BeWip = parseFloat(
      this.taxPayerDetails.BeWip || 0
    ).toFixed(2);

    this.taxPayerDetails.BsEstablish = parseFloat(
      this.taxPayerDetails.BsEstablish || 0
    ).toFixed(2);
    this.taxPayerDetails.BeEstablish = parseFloat(
      this.taxPayerDetails.BeEstablish || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNonasset = parseFloat(
      this.taxPayerDetails.BsNonasset || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNonasset = parseFloat(
      this.taxPayerDetails.BeNonasset || 0
    ).toFixed(2);

    this.taxPayerDetails.BsTotNcurrAsset = parseFloat(
      this.taxPayerDetails.BsTotNcurrAsset || 0
    ).toFixed(2);
    this.taxPayerDetails.BeTotNcurrAsset = parseFloat(
      this.taxPayerDetails.BeTotNcurrAsset || 0
    ).toFixed(2);

    this.taxPayerDetails.BsPatent = parseFloat(
      this.taxPayerDetails.BsPatent || 0
    ).toFixed(2);
    this.taxPayerDetails.BePatent = parseFloat(
      this.taxPayerDetails.BePatent || 0
    ).toFixed(2);

    this.taxPayerDetails.BsGoodwill = parseFloat(
      this.taxPayerDetails.BsGoodwill || 0
    ).toFixed(2);
    this.taxPayerDetails.BeGoodwill = parseFloat(
      this.taxPayerDetails.BeGoodwill || 0
    ).toFixed(2);

    this.taxPayerDetails.BsTotintasset = parseFloat(
      this.taxPayerDetails.BsTotintasset || 0
    ).toFixed(2);
    this.taxPayerDetails.BeTotintasset = parseFloat(
      this.taxPayerDetails.BeTotintasset || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabShorttrmPay = parseFloat(
      this.taxPayerDetails.BsLiabShorttrmPay || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabShorttrmPay = parseFloat(
      this.taxPayerDetails.BeLiabShorttrmPay || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabPay = parseFloat(
      this.taxPayerDetails.BsLiabPay || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabPay = parseFloat(
      this.taxPayerDetails.BeLiabPay || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabAcc = parseFloat(
      this.taxPayerDetails.BsLiabAcc || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabAcc = parseFloat(
      this.taxPayerDetails.BeLiabAcc || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabDiv = parseFloat(
      this.taxPayerDetails.BsLiabDiv || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabDiv = parseFloat(
      this.taxPayerDetails.BeLiabDiv || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabAccper = parseFloat(
      this.taxPayerDetails.BsLiabAccper || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabAccper = parseFloat(
      this.taxPayerDetails.BeLiabAccper || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabShortLoan = parseFloat(
      this.taxPayerDetails.BsLiabShortLoan || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabShortLoan = parseFloat(
      this.taxPayerDetails.BeLiabShortLoan || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabPayParties = parseFloat(
      this.taxPayerDetails.BsLiabPayParties || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabPayParties = parseFloat(
      this.taxPayerDetails.BeLiabPayParties || 0
    ).toFixed(2);

    this.taxPayerDetails.BsTotLiabilities = parseFloat(
      this.taxPayerDetails.BsTotLiabilities || 0
    ).toFixed(2);
    this.taxPayerDetails.BeTotLiabilities = parseFloat(
      this.taxPayerDetails.BeTotLiabilities || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNliabLongLoan = parseFloat(
      this.taxPayerDetails.BsNliabLongLoan || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNliabLongLoan = parseFloat(
      this.taxPayerDetails.BeNliabLongLoan || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNliabLongtrmPay = parseFloat(
      this.taxPayerDetails.BsNliabLongtrmPay || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNliabLongtrmPay = parseFloat(
      this.taxPayerDetails.BeNliabLongtrmPay || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNliabOth = parseFloat(
      this.taxPayerDetails.BsNliabOth || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNliabOth = parseFloat(
      this.taxPayerDetails.BeNliabOth || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNliabCurPartners = parseFloat(
      this.taxPayerDetails.BsNliabCurPartners || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNliabCurPartners = parseFloat(
      this.taxPayerDetails.BeNliabCurPartners || 0
    ).toFixed(2);

    this.taxPayerDetails.BsNliabPayParties = parseFloat(
      this.taxPayerDetails.BsNliabPayParties || 0
    ).toFixed(2);
    this.taxPayerDetails.BeNliabPayParties = parseFloat(
      this.taxPayerDetails.BeNliabPayParties || 0
    ).toFixed(2);

    this.taxPayerDetails.BsTotNonliabilities = parseFloat(
      this.taxPayerDetails.BsTotNonliabilities || 0
    ).toFixed(2);
    this.taxPayerDetails.BeTotNonliabilities = parseFloat(
      this.taxPayerDetails.BeTotNonliabilities || 0
    ).toFixed(2);

    this.taxPayerDetails.BsCapital = parseFloat(
      this.taxPayerDetails.BsCapital || 0
    ).toFixed(2);
    this.taxPayerDetails.BeCapital = parseFloat(
      this.taxPayerDetails.BeCapital || 0
    ).toFixed(2);

    this.taxPayerDetails.BsReserves = parseFloat(
      this.taxPayerDetails.BsReserves || 0
    ).toFixed(2);
    this.taxPayerDetails.BeReserves = parseFloat(
      this.taxPayerDetails.BeReserves || 0
    ).toFixed(2);

    this.taxPayerDetails.BsLiabRet = parseFloat(
      this.taxPayerDetails.BsLiabRet || 0
    ).toFixed(2);
    this.taxPayerDetails.BeLiabRet = parseFloat(
      this.taxPayerDetails.BeLiabRet || 0
    ).toFixed(2);

    this.taxPayerDetails.BsOther = parseFloat(
      this.taxPayerDetails.BsOther || 0
    ).toFixed(2);
    this.taxPayerDetails.BeOther = parseFloat(
      this.taxPayerDetails.BeOther || 0
    ).toFixed(2);

    this.taxPayerDetails.BsTotshare = parseFloat(
      this.taxPayerDetails.BsTotshare || 0
    ).toFixed(2);
    this.taxPayerDetails.BeTotshare = parseFloat(
      this.taxPayerDetails.BeTotshare || 0
    ).toFixed(2);

    this.taxPayerDetails.NetProfit = parseFloat(
      this.taxPayerDetails.NetProfit || 0
    ).toFixed(2);
    this.taxPayerDetails.Sch1117Set.results[0].Revenue = parseFloat(
      this.taxPayerDetails.Sch1117Set.results[0].Revenue || 0
    ).toFixed(2);
    this.taxPayerDetails.Sch1117Set.results[0].Expense = parseFloat(
      this.taxPayerDetails.Sch1117Set.results[0].Expense || 0
    ).toFixed(2);
    this.taxPayerDetails.Sch1117Set.results[0].NetAmount = parseFloat(
      this.taxPayerDetails.Sch1117Set.results[0].NetAmount || 0
    ).toFixed(2);
  }
  ManageNameControl(index: number) {
    console.log("this.countrySet)", this.countrySet);
    if (this.countrySet) {
      var arrayControl = this.RoyalityTechnicalServicesForm.get(
        "RoyalityTechnicalSecurities"
      ) as FormArray;
      this.filteredCountries[index] = arrayControl
        .at(index)
        .get("Country")
        .valueChanges.pipe(
          startWith<string | ICountry>(""),
          map((value) => (typeof value === "string" ? value : value.Land1)),
          map((name) => (name ? this._filter(name) : this.countrySet.slice()))
        );

      console.log(
        " this.filteredCountries[index]",
        this.filteredCountries[index]
      );
    }
  }
  displayFn(country?: ICountry): string | undefined {
    return country ? country.Land1 : undefined;
  }
  private _filter(Land1: string): ICountry[] {
    const filterValue = Land1.toLowerCase();
    return this.countrySet.filter((option) => {
      option.Land1.toLowerCase().indexOf(filterValue) === 0;
    });
  }
  SaveGainLossForm11Data() {
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1101Set["results"] = [];
    this.taxPayerDetails.RGainloss = "X";
    for (let i = 0; i < this.GainLossSecurities.controls.length; i++) {
      this.taxPayerDetails.Sch1101Set["results"].push({});
      this.taxPayerDetails.Sch1101Set["results"][i][
        "CompNm"
      ] = this.GainLossSecurities.controls[i].value.Company;
      this.taxPayerDetails.Sch1101Set["results"][i][
        "SellAmt"
      ] = this.GainLossSecurities.controls[i].value.SellingAmount;
      this.taxPayerDetails.Sch1101Set["results"][i][
        "Cost"
      ] = this.GainLossSecurities.controls[i].value.Cost;
      this.taxPayerDetails.Sch1101Set["results"][i][
        "ProfitAmt"
      ] = this.GainLossSecurities.controls[i].value.ProfitLoss.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = parseFloat(
      (this.taxPayerDetails.NetProfit || 0).toString()
    ).toFixed(2);
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        moment.locale("en-Us");
        if (this.taxPayerDetails.CalTyp == "G") {
          this.periodStartDate = moment(
            new Date(
              +this.taxPayerDetails.Abrzu.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
          this.periodEndDate = moment(
            new Date(
              +this.taxPayerDetails.Abrzo.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD/MM/YYYY");
        } else {
          this.periodStartDate = this.CommonValidation.changeDate5(
            this.CommonValidation.dateFormate(
              this.CommonValidation.toJulianDate1(
                new Date(
                  +this.taxPayerDetails.Abrzu.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ),
              "Islamic"
            )
          );
          this.periodEndDate = this.CommonValidation.changeDate5(
            this.CommonValidation.dateFormate(
              this.CommonValidation.toJulianDate1(
                new Date(
                  +this.taxPayerDetails.Abrzo.replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ),
              "Islamic"
            )
          );
        }
        console.log(this.periodEndDate, this.periodStartDate);
        this.SetFormDetails();
        jQuery("#scheduleModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveOtherRevenue() {
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1102Set["results"] = [];
    this.taxPayerDetails.ROtherrev = "X";
    for (let i = 0; i < this.OtherRevenues.controls.length; i++) {
      this.taxPayerDetails.Sch1102Set["results"].push({});
      this.taxPayerDetails.Sch1102Set["results"][i][
        "Statement"
      ] = this.OtherRevenues.controls[i].value.Statement;
      this.taxPayerDetails.Sch1102Set["results"][i][
        "Amt"
      ] = this.OtherRevenues.controls[i].value.Amount.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = parseFloat(
      (this.taxPayerDetails.NetProfit || 0).toString()
    ).toFixed(2);
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#scheduleRevenueModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveCostBankingActivity() {
    this.taxPayerDetails.RCostMan = "B";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1103Set["results"] = [];
    this.taxPayerDetails.RCostmain = "X";
    for (let i = 0; i < this.BankRevenues.controls.length; i++) {
      this.taxPayerDetails.Sch1103Set["results"].push({});
      this.taxPayerDetails.Sch1103Set["results"][i][
        "Statement"
      ] = this.BankRevenues.controls[i].value.Statement;
      this.taxPayerDetails.Sch1103Set["results"][i][
        "AddrTp"
      ] = this.BankRevenues.controls[i].value.Address;
      this.taxPayerDetails.Sch1103Set["results"][i][
        "DepositTerm"
      ] = this.BankRevenues.controls[i].value.DepositTerm;
      this.taxPayerDetails.Sch1103Set["results"][i][
        "ValueAmt"
      ] = this.BankRevenues.controls[i].value.Value.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    jQuery("#CostOfRevenueOptionsModal").modal("hide");
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#CostOfBankingModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveCostFinancingActivity() {
    this.taxPayerDetails.RCostMan = "F";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1103BSet["results"] = [];
    this.taxPayerDetails.RCostmain = "X";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    for (let i = 0; i < this.FinanceRevenues.controls.length; i++) {
      this.taxPayerDetails.Sch1103BSet["results"].push({});
      this.taxPayerDetails.Sch1103BSet["results"][i][
        "Statement"
      ] = this.FinanceRevenues.controls[i].value.Statement;
      this.taxPayerDetails.Sch1103BSet["results"][i][
        "Amt"
      ] = this.FinanceRevenues.controls[i].value.Amount;
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    jQuery("#CostOfRevenueOptionsModal").modal("hide");
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#CostOfFinancingModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }

  SaveProvisionRevenue() {
    this.taxPayerDetails.RProvisionyr = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1104Set["results"] = [];
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    for (let i = 0; i < this.Provisions.controls.length; i++) {
      this.taxPayerDetails.Sch1104Set["results"].push({});
      this.taxPayerDetails.Sch1104Set["results"][i][
        "ProvisionTp"
      ] = this.Provisions.controls[i].value.ProvisionType;
      this.taxPayerDetails.Sch1104Set["results"][i][
        "BegbalAmt"
      ] = this.Provisions.controls[i].value.BeginingBalance.toString();
      this.taxPayerDetails.Sch1104Set["results"][i][
        "ProvisionAmt"
      ] = this.Provisions.controls[
        i
      ].value.ProvisionCreditDuringTheYear.toString();
      this.taxPayerDetails.Sch1104Set["results"][i][
        "UtilisedAmt"
      ] = this.Provisions.controls[i].value.UtilizedDuringPeriod.toString();
      this.taxPayerDetails.Sch1104Set["results"][i][
        "SettlementAmt"
      ] = this.Provisions.controls[i].value.Settlements.toString();
      this.taxPayerDetails.Sch1104Set["results"][i][
        "EndbalAmt"
      ] = this.Provisions.controls[i].value.EndingBalance.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#ProvisionsMadeDuringPeriodModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveRoyalityTechnicalSecurity() {
    this.taxPayerDetails.RRoyalser = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1105Set["results"] = [];
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    for (let i = 0; i < this.RoyalityTechnicalSecurities.controls.length; i++) {
      this.taxPayerDetails.Sch1105Set["results"].push({});
      this.taxPayerDetails.Sch1105Set["results"][i][
        "IdTp"
      ] = this.RoyalityTechnicalSecurities.controls[i].value.IdType;
      this.taxPayerDetails.Sch1105Set["results"][i][
        "IdNo"
      ] = this.RoyalityTechnicalSecurities.controls[i].value.IdNumber;
      this.taxPayerDetails.Sch1105Set["results"][i][
        "BenificiaryNm"
      ] = this.RoyalityTechnicalSecurities.controls[i].value.BeneficiaryName;
      this.taxPayerDetails.Sch1105Set["results"][i][
        "AddrTp"
      ] = this.RoyalityTechnicalSecurities.controls[i].value.InterExternal;
      this.taxPayerDetails.Sch1105Set["results"][i]["Country"] =
        this.RoyalityTechnicalSecurities.controls[i].value.InterExternal == "I"
          ? this.RoyalityTechnicalSecurities.controls[i].value.Country
          : this.RoyalityTechnicalSecurities.controls[i].value.Country.Land1;
      this.taxPayerDetails.Sch1105Set["results"][i][
        "ServiceTp"
      ] = this.RoyalityTechnicalSecurities.controls[i].value.ServiceType;
      this.taxPayerDetails.Sch1105Set["results"][i][
        "ChargedAmt"
      ] = this.RoyalityTechnicalSecurities.controls[
        i
      ].value.ChargedToTheAccounts.toString();
      this.taxPayerDetails.Sch1105Set["results"][i][
        "PaidAmt"
      ] = this.RoyalityTechnicalSecurities.controls[
        i
      ].value.PaidDuringTheYear.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#RoyalityTechnicalSecurityModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveOtherExpenses() {
    this.taxPayerDetails.ROtherexp = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1106Set["results"] = [];
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    for (let i = 0; i < this.OtherExpenses.controls.length; i++) {
      this.taxPayerDetails.Sch1106Set["results"].push({});
      this.taxPayerDetails.Sch1106Set["results"][i][
        "Statement"
      ] = this.OtherExpenses.controls[i].value.Statement;
      this.taxPayerDetails.Sch1106Set["results"][i][
        "Amt"
      ] = this.OtherExpenses.controls[i].value.Amount.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#OtherExpensesModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveIncomeDetails() {
    //this.taxPayerDetails.ROtherexp='X';
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    console.log(this.FeFye);
    console.log(this.UpeFye);

    if (this.taxPayerDetails.Sch1116Set["results"][0].FeFye != null)
      this.taxPayerDetails.Sch1116Set["results"][0].FeFye =
        "/Date(" +
        new Date(this.CommonValidation.changeDate2(this.FeFye)).getTime() +
        ")/";
    if (this.taxPayerDetails.Sch1116Set["results"][0].UpeFye != null)
      this.taxPayerDetails.Sch1116Set["results"][0].UpeFye =
        "/Date(" +
        new Date(this.CommonValidation.changeDate2(this.UpeFye)).getTime() +
        ")/";

    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        // if (this.taxPayerDetails.Sch1116Set['results'][0].FeFye != null)
        //   this.FeFye = moment(new Date(+((this.taxPayerDetails.Sch1116Set['results'][0].FeFye.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        // if (this.taxPayerDetails.Sch1116Set['results'][0].UpeFye != null)
        //   this.UpeFye = moment(new Date(+((this.taxPayerDetails.Sch1116Set['results'][0].UpeFye.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY-MM-DD');
        if (this.taxPayerDetails.Sch1116Set["results"][0].FeFye != null) {
          let date = moment(
            new Date(
              +this.taxPayerDetails.Sch1116Set["results"][0].FeFye.replace(
                ")",
                ""
              )
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("YYYY-MM-DD");
          this.FeFye = this.CommonValidation.toJulianDate1(new Date(date));
        }

        if (this.taxPayerDetails.Sch1116Set["results"][0].UpeFye != null) {
          let date = moment(
            new Date(
              +this.taxPayerDetails.Sch1116Set["results"][0].UpeFye.replace(
                ")",
                ""
              )
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("YYYY-MM-DD");
          this.UpeFye = this.CommonValidation.toJulianDate1(new Date(date));
        }

        this.UpeFyeDis = moment(
          new Date(
            +this.taxPayerDetails.Sch1116Set["results"][0].UpeFye.replace(
              ")",
              ""
            )
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD/MM/YYYY");
        this.FeFyeDis = moment(
          new Date(
            +this.taxPayerDetails.Sch1116Set["results"][0].FeFye.replace(
              ")",
              ""
            )
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD/MM/YYYY");
        console.log(this.UpeFye, this.FeFye);
        console.log(this.FeFye);
        console.log(this.UpeFye);
        this.GetTaxpayerDetails();
        //this.SetFormDetails();
        //this.GetTaxpayerDetails();
        jQuery("#IncomeFromLoansModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        //jQuery("#SuccessModal").modal('show');
      });
  }
  SaveDepreciationsDifferences() {
    this.CalculateTotals();
    console.log(this.DepreciationDifferencesForm);
    this.taxPayerDetails.RDepriciation = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();

    this.taxPayerDetails.Sch1107Set["results"] = [];
    this.taxPayerDetails.Sch1107Set["results"].push({});

    this.taxPayerDetails.Sch1107Set["results"][0][
      "AGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.LandGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ACostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.LandCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ACostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.LandCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ATotCost50Pcyr"
    ] = this.DepreciationDifferencesForm.value.LandFiftyPercentCostCurrentPreviousAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "AComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.LandCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "AComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.LandCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ATotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.LandFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "AGrpRem"
    ] = this.DepreciationDifferencesForm.value.LandRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ADepAmotRatio"
    ] = this.DepreciationDifferencesForm.value.LandDepreciationAmortizationRatio.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ADepAmotValue"
    ] = this.DepreciationDifferencesForm.value.LandDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ARemValueCyr"
    ] = this.DepreciationDifferencesForm.value.LandRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "AGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.LandMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "AMaint4exp"
    ] = this.DepreciationDifferencesForm.value.LandMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "AGrpCyr"
    ] = this.DepreciationDifferencesForm.value.LandRemainingGroupAtEndOfCurrentYear.toString();

    this.taxPayerDetails.Sch1107Set["results"][0][
      "BGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.FirstGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BCostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.FirstCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BCostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.FirstCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BTotCost50Pcyr"
    ] = this.DepreciationDifferencesForm.value.FirstFiftyPercentCostCurrentPreviousAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.FirstCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.FirstCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BTotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.FirstFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BGrpRem"
    ] = this.DepreciationDifferencesForm.value.FirstRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BDepAmotRatio"
    ] = this.DepreciationDifferencesForm.value.FirstDepreciationAmortizationRatio.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BDepAmotValue"
    ] = this.DepreciationDifferencesForm.value.FirstDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BRemValueCyr"
    ] = this.DepreciationDifferencesForm.value.FirstRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.FirstMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BMaint4exp"
    ] = this.DepreciationDifferencesForm.value.FirstMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "BGrpCyr"
    ] = this.DepreciationDifferencesForm.value.FirstRemainingGroupAtEndOfCurrentYear.toString();

    this.taxPayerDetails.Sch1107Set["results"][0][
      "CGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.SecondGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CCostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.SecondCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CCostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.SecondCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CTotCost50Pcyr"
    ] = this.DepreciationDifferencesForm.value.SecondFiftyPercentCostCurrentPreviousAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.SecondCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.SecondCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CTotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.SecondFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CGrpRem"
    ] = this.DepreciationDifferencesForm.value.SecondRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CDepAmotRatio"
    ] = this.DepreciationDifferencesForm.value.SecondDepreciationAmortizationRatio.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CDepAmotValue"
    ] = this.DepreciationDifferencesForm.value.SecondDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CRemValueCyr"
    ] = this.DepreciationDifferencesForm.value.SecondRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.SecondMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CMaint4exp"
    ] = this.DepreciationDifferencesForm.value.SecondMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "CGrpCyr"
    ] = this.DepreciationDifferencesForm.value.SecondRemainingGroupAtEndOfCurrentYear.toString();

    this.taxPayerDetails.Sch1107Set["results"][0][
      "DGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.ThirdGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DCostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.ThirdCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DCostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.ThirdCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DTotCost50Pcyr"
    ] = this.DepreciationDifferencesForm.value.ThirdFiftyPercentCostCurrentPreviousAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.ThirdCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.ThirdCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DTotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.ThirdFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DGrpRem"
    ] = this.DepreciationDifferencesForm.value.ThirdRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DDepAmotRatio"
    ] = this.DepreciationDifferencesForm.value.ThirdDepreciationAmortizationRatio.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DDepAmotValue"
    ] = this.DepreciationDifferencesForm.value.ThirdDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DRemValueCyr"
    ] = this.DepreciationDifferencesForm.value.ThirdRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.ThirdMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DMaint4exp"
    ] = this.DepreciationDifferencesForm.value.ThirdMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "DGrpCyr"
    ] = this.DepreciationDifferencesForm.value.ThirdRemainingGroupAtEndOfCurrentYear.toString();

    this.taxPayerDetails.Sch1107Set["results"][0][
      "EGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.FourthGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ECostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.FourthCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ECostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.FourthCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ETotCost50Pcyr"
    ] = this.DepreciationDifferencesForm.value.FourthFiftyPercentCostCurrentPreviousAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.FourthCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.FourthCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ETotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.FourthFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EGrpRem"
    ] = this.DepreciationDifferencesForm.value.FourthRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EDepAmotRatio"
    ] = this.DepreciationDifferencesForm.value.FourthDepreciationAmortizationRatio.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EDepAmotValue"
    ] = this.DepreciationDifferencesForm.value.FourthDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "ERemValueCyr"
    ] = this.DepreciationDifferencesForm.value.FourthRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.FourthMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EMaint4exp"
    ] = this.DepreciationDifferencesForm.value.FourthMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "EGrpCyr"
    ] = this.DepreciationDifferencesForm.value.FourthRemainingGroupAtEndOfCurrentYear.toString();

    this.taxPayerDetails.Sch1107Set["results"][0][
      "FGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.FifthGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FCostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.FifthCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FCostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.FifthCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FTotCost50Pcyr"
    ] = this.DepreciationDifferencesForm.value.FifthFiftyPercentCostCurrentPreviousAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.FifthCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.FifthCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FTotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.FifthFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FGrpRem"
    ] = this.DepreciationDifferencesForm.value.FifthRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FDepAmotRatio"
    ] = this.DepreciationDifferencesForm.value.FifthDepreciationAmortizationRatio.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FDepAmotValue"
    ] = this.DepreciationDifferencesForm.value.FifthDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FRemValueCyr"
    ] = this.DepreciationDifferencesForm.value.FifthRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.FifthMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FMaint4exp"
    ] = this.DepreciationDifferencesForm.value.FifthMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "FGrpCyr"
    ] = this.DepreciationDifferencesForm.value.FifthRemainingGroupAtEndOfCurrentYear.toString();

    console.log(
      this.DepreciationDifferencesForm.value
        .TotalFiftyPercentCostCurrentPreviousAdditions
    );
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotGrpvalEod"
    ] = this.DepreciationDifferencesForm.value.TotalGroupValueAtPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotCostPyrAddition"
    ] = this.DepreciationDifferencesForm.value.TotalCostOfPreviousYearAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotCostCyrAddition"
    ] = this.DepreciationDifferencesForm.value.TotalCostOfCurrentAdditions.toString();
    this.taxPayerDetails.Sch1107Set["results"][0]["TotCost50Pcyr"] = (
      this.DepreciationDifferencesForm.value
        .TotalFiftyPercentCostCurrentPreviousAdditions || 0.0
    ).toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotComesAssetPyr"
    ] = this.DepreciationDifferencesForm.value.TotalCompensationDepreciationDuringPreviousYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotComesAssetCyr"
    ] = this.DepreciationDifferencesForm.value.TotalCompensationDepreciationDuringCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotTotCost50AssetPcyr"
    ] = this.DepreciationDifferencesForm.value.TotalFiftyPercentDuringPreviousCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotGrpRem"
    ] = this.DepreciationDifferencesForm.value.TotalRemainingValueGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotDepAmotValue"
    ] = this.DepreciationDifferencesForm.value.TotalDepreciationAmortizationValue.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotRemValueCyr"
    ] = this.DepreciationDifferencesForm.value.TotalRemainingValueAtEndCurrentYear.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotGrpMaintCost"
    ] = this.DepreciationDifferencesForm.value.TotalMaintananceCostOfGroup.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotMaint4exp"
    ] = this.DepreciationDifferencesForm.value.TotalMaintancesExpenseExceedfourPercent.toString();
    this.taxPayerDetails.Sch1107Set["results"][0][
      "TotGrpCyr"
    ] = this.DepreciationDifferencesForm.value.TotalRemainingGroupAtEndOfCurrentYear.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveAdjustments() {
    this.taxPayerDetails.RNetprofit = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.Sch1108Set["results"] = [];
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    for (let i = 0; i < this.AdjustmentNetProfits.controls.length; i++) {
      this.taxPayerDetails.Sch1108Set["results"].push({});
      this.taxPayerDetails.Sch1108Set["results"][i][
        "Adjustment"
      ] = this.AdjustmentNetProfits.controls[i].value.Adjustment;
      this.taxPayerDetails.Sch1108Set["results"][i]["Statement"] =
        this.AdjustmentNetProfits.controls[i].value.Statement || "";
      this.taxPayerDetails.Sch1108Set["results"][i][
        "Amt"
      ] = this.AdjustmentNetProfits.controls[i].value.Amount.toString();
    }
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#AdjustmentToNetProfitModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  AdjustmentChange(event) {
    if (event.target.value == "14") {
      this.AdjustmentNetProfits.get("Statement").setValidators(
        Validators.required
      );
    }
  }
  SaveAdjustedCarryForwardLosses() {
    this.taxPayerDetails.RNssharecap25 = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.Sch1110Set["results"][0][
      "CarryforAmt"
    ] = this.AdjustedCarriedCITLosessForm.value.AdjustedCarriedFwdLosses.toString();
    this.taxPayerDetails.Sch1110Set["results"][0][
      "DecprofitAmt"
    ] = this.AdjustedCarriedCITLosessForm.value.AdjustedDeclaredNetProfit.toString();
    this.taxPayerDetails.Sch1110Set["results"][0][
      "LosscuryrAmt"
    ] = this.AdjustedCarriedCITLosessForm.value.LossesDeductedDuringYear.toString();
    this.taxPayerDetails.Sch1110Set["results"][0][
      "EndofyearAmt"
    ] = this.AdjustedCarriedCITLosessForm.value.EndOfYearBalance.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveCapital() {
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.RCapital = "X";
    this.taxPayerDetails.Sch1111Set["results"] = [];
    for (let i = 0; i < this.Capitals.controls.length; i++) {
      console.log(this.Capitals.controls[i].value.DOEOFinYea);
      this.taxPayerDetails.Sch1111Set["results"].push({});
      this.taxPayerDetails.Sch1111Set["results"][i][
        "Capsource"
      ] = this.Capitals.controls[i].value.AdditionSource;
      this.taxPayerDetails.Sch1111Set["results"][i][
        "BegperiodAmt"
      ] = this.Capitals.controls[i].value.BeginOfPeriodBalance.toString();
      this.taxPayerDetails.Sch1111Set["results"][i][
        "DedperiodAmt"
      ] = this.Capitals.controls[i].value.AmountDedFromCapDurCurrent.toString();
      this.taxPayerDetails.Sch1111Set["results"][i][
        "CapcuryrAmt"
      ] = this.Capitals.controls[i].value.AddToTheCapitalDuringYear.toString();
      this.taxPayerDetails.Sch1111Set["results"][i][
        "EndperiodAmt"
      ] = this.Capitals.controls[i].value.EOPBalance.toString();
      this.taxPayerDetails.Sch1111Set["results"][i][
        "UtilizednzakatAmt"
      ] = this.Capitals.controls[i].value.UtilizeNonZakat.toString();
      this.taxPayerDetails.Sch1111Set["results"][i][
        "UtilizedzakatAmt"
      ] = this.Capitals.controls[i].value.UtilizeZakat.toString();
      this.taxPayerDetails.Sch1111Set["results"][i]["CapitalDt"] =
        "/Date(" +
        new Date(
          this.CommonValidation.changeDate2(
            this.Capitals.controls[i].value.DOCapAdd
          )
        ).getTime() +
        ")/";
      this.taxPayerDetails.Sch1111Set["results"][i][
        "YearendDt"
      ] = this.taxPayerDetails.Abrzo; //"\/Date("+new Date(this.Capitals.controls[i].value.DOEOFinYea).getTime()+")\/";
      this.taxPayerDetails.Sch1111Set["results"][i]["NumberDays"] =
        this.Capitals.controls[i].value.NoDays.toString() || "0";
      this.taxPayerDetails.Sch1111Set["results"][i][
        "CapzakatAmt"
      ] = this.Capitals.controls[i].value.CapSubZakat.toString();
    }
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#CapitalZakatModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveEqityEqualentFunds() {
    this.taxPayerDetails.REquity = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.Sch1112Set["results"] = [];

    for (let i = 0; i < this.EquityEqualantFunds.controls.length; i++) {
      this.taxPayerDetails.Sch1112Set["results"].push({});
      this.taxPayerDetails.Sch1112Set["results"][i][
        "Statement"
      ] = this.EquityEqualantFunds.controls[i].value.Statement;
      this.taxPayerDetails.Sch1112Set["results"][i][
        "Amt"
      ] = this.EquityEqualantFunds.controls[i].value.Amount.toString();
    }
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#EquityFundsModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveLongTermEqualentForm() {
    this.taxPayerDetails.RLongloan = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.Sch1114Set["results"] = [];

    for (let i = 0; i < this.LongTermLoans.controls.length; i++) {
      this.taxPayerDetails.Sch1114Set["results"].push({});
      this.taxPayerDetails.Sch1114Set["results"][i][
        "LoanTp"
      ] = this.LongTermLoans.controls[i].value.DebtType;
      this.taxPayerDetails.Sch1114Set["results"][i][
        "ResidenceTp"
      ] = this.LongTermLoans.controls[i].value.LocalForeign;
      this.taxPayerDetails.Sch1114Set["results"][i][
        "Duein365Amt"
      ] = this.LongTermLoans.controls[i].value.DueInYearDays;
      this.taxPayerDetails.Sch1114Set["results"][i][
        "DueafterAmt"
      ] = this.LongTermLoans.controls[i].value.DueAfterYearDays.toString();
    }
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#EquityFundsModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  SaveLongTermDebtsForm() {
    this.taxPayerDetails.RLonddebit = "X";
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.Sch1115Set["results"] = [];

    for (let i = 0; i < this.LongTermDebts.controls.length; i++) {
      this.taxPayerDetails.Sch1115Set["results"].push({});
      this.taxPayerDetails.Sch1115Set["results"][i][
        "DebitTp"
      ] = this.LongTermDebts.controls[i].value.DebtType;
      this.taxPayerDetails.Sch1115Set["results"][i][
        "ResidenceTp"
      ] = this.LongTermDebts.controls[i].value.LocalForeign;
      this.taxPayerDetails.Sch1115Set["results"][i][
        "Duein365Amt"
      ] = this.LongTermDebts.controls[i].value.DueInYearDays;
      this.taxPayerDetails.Sch1115Set["results"][i][
        "DueafterAmt"
      ] = this.LongTermDebts.controls[i].value.DueAfterYearDays.toString();
    }
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
      });
  }
  SaveTransferPricingDetails() {
    // if (this.step == 9) {
    //   this.taxPayerDetails.Operationz = "01";
    // }
    // else {
    //   this.taxPayerDetails.Operationz = "05";
    // }
    this.taxPayerDetails.Operationz = "01";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.Sch1118Set["results"] = [];
    for (let i = 0; i < this.PartyTransactionsSet.controls.length; i++) {
      this.taxPayerDetails.Sch1118Set["results"].push({});
      this.taxPayerDetails.Sch1118Set["results"][i][
        "Transactions"
      ] = this.PartyTransactionsSet.controls[i].value.Transaction;
      this.taxPayerDetails.Sch1118Set["results"][i][
        "Tdescription"
      ] = this.PartyTransactionsSet.controls[i].value.Description;
      this.taxPayerDetails.Sch1118Set["results"][i][
        "PartyName"
      ] = this.PartyTransactionsSet.controls[i].value.NameOfRelatedParty;
      this.taxPayerDetails.Sch1118Set["results"][i][
        "Jurisdiction"
      ] = this.PartyTransactionsSet.controls[i].value.Jurisdiction;
      this.taxPayerDetails.Sch1118Set["results"][i][
        "AmtFg"
      ] = this.PartyTransactionsSet.controls[i].value.TransactionNature;
      this.taxPayerDetails.Sch1118Set["results"][i][
        "Amt"
      ] = this.PartyTransactionsSet.controls[i].value.Amount;
      this.taxPayerDetails.Sch1118Set["results"][i][
        "TpMethod"
      ] = this.PartyTransactionsSet.controls[i].value.TPMethod;
    }
    this.taxPayerDetails.Sch1119Set["results"] = [];
    for (let i = 0; i < this.RelatedPartiesSet.controls.length; i++) {
      this.taxPayerDetails.Sch1119Set["results"].push({});
      this.taxPayerDetails.Sch1119Set["results"][i]["FocDescriptions"] =
        this.RelatedPartiesSet.controls[i].value.TransactionDescription || "";
      this.taxPayerDetails.Sch1119Set["results"][i]["Counterparty"] =
        this.RelatedPartiesSet.controls[i].value.CounterParty || "";
      this.taxPayerDetails.Sch1119Set["results"][i]["Jurisdiction"] =
        this.RelatedPartiesSet.controls[i].value.Jurisdiction || "";
    }

    this.taxPayerDetails.Sch1120Set["results"] = [];
    for (let i = 0; i < this.ShareholdersSet.controls.length; i++) {
      this.taxPayerDetails.Sch1120Set["results"].push({});
      this.taxPayerDetails.Sch1120Set["results"][i][
        "ShName"
      ] = this.ShareholdersSet.controls[i].value.ShareHoldersName;
      this.taxPayerDetails.Sch1120Set["results"][i][
        "Jurisdiction"
      ] = this.ShareholdersSet.controls[i].value.Jurisdiction;
      this.taxPayerDetails.Sch1120Set["results"][i][
        "Ownership"
      ] = this.ShareholdersSet.controls[i].value.OwnerShipPercentage;
    }

    this.taxPayerDetails.Sch1116Set.results[0].UpeFye =
      "/Date(" + new Date().getTime() + ")/";
    this.taxPayerDetails.Sch1116Set.results[0].FeFye =
      "/Date(" + new Date().getTime() + ")/";
    this.taxPayerDetails.AgreeFg = "X";
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
      });
  }
  SaveSukuks() {
    this.taxPayerDetails.Operationz = "05";
    this.taxPayerDetails.CostMain = this.taxPayerDetails.CostMain.toString();
    this.taxPayerDetails.CostExpTot = this.taxPayerDetails.CostExpTot.toString();
    this.taxPayerDetails.NetProfit = this.taxPayerDetails.NetProfit.toString();
    this.taxPayerDetails.RInvdebit = "X";
    this.taxPayerDetails.Sch1118Set["results"] = [];
    for (let i = 0; i < this.Sukuks.controls.length; i++) {
      console.log(this.Sukuks.controls[i]);
      this.taxPayerDetails.Sch1118Set["results"].push({});
      this.taxPayerDetails.Sch1113Set["results"][i][
        "BondsNm"
      ] = this.Sukuks.controls[i].value.NameOfSukuk;
      this.taxPayerDetails.Sch1113Set["results"][i]["MaturityDt"] =
        "/Date(" +
        new Date(this.Sukuks.controls[i].value.MaturityDate).getTime() +
        ")/";
      this.taxPayerDetails.Sch1113Set["results"][i][
        "Duein365Amt"
      ] = this.Sukuks.controls[i].value.DueInYearDays;
      this.taxPayerDetails.Sch1113Set["results"][i][
        "DueafterAmt"
      ] = this.Sukuks.controls[i].value.DueAfterYearDays;
    }
    this.taxPayerDetails.RevMain = this.MainActivityRevenue;
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        this.SetFormDetails();
        jQuery("#SukuksModal").modal("hide");
        jQuery("body").removeClass("modalopen");
        jQuery("#SuccessModal").modal("show");
      });
  }
  InternalExternalChange(pi) {
    moment.locale("en-US");
    console.log(this.Sukuks.controls[pi].value.NameOfSukuk);
    if (this.Sukuks.controls[pi].value.NameOfSukuk) {
      if (
        this.InternalExternalSet.filter((data) => {
          if (data.Zdesc == this.Sukuks.controls[pi].value.NameOfSukuk) {
            return data.MaturityDt;
          }
        }).length > 0
      ) {
        this.Sukuks.controls[pi].patchValue({
          MaturityDate: moment(
            new Date(
              +this.InternalExternalSet.filter((data) => {
                if (data.Zdesc == this.Sukuks.controls[pi].value.NameOfSukuk) {
                  return data.MaturityDt;
                }
              })[0]
                ["MaturityDt"].replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("DD-MM-YYYY"),
        });
      } else {
        this.Sukuks.controls[pi].patchValue({ MaturityDate: "" });
      }
    }
  }

  errMsg: any;

  FileUpload(event, dotype) {
    console.log(event);
    const frmData = new FormData();
    let filename;
    filename = event.target.files[0]["name"];

    let fileSize = Math.round(event.target.files[0]["size"] / 1024);

    if (dotype == "R11E" || dotype == "R11F") {
      if (
        !(
          filename
            .split(".")
            [filename.split(".").length - 1].toString()
            .toLowerCase() in
          { pdf: "pdf", jpeg: "jpeg", png: "png", jpg: "jpg" }
        )
      ) {
        this.errMsg = "extension";
        jQuery("#toolTips1").modal("show");
        return false;
      }

      if (fileSize == 0 || fileSize > 5120) {
        this.errMsg = fileSize == 0 ? "size0" : "size";
        jQuery("#toolTips1").modal("show");
        return false;
      }
    }

    frmData.append("fileUpload", event.target.files[0]);
    this.from11Service
      .SaveForm11Attachments(
        filename,
        this.taxPayerDetails.ReturnId,
        frmData,
        dotype
      )
      .subscribe(
        (data) => {
          console.log(data);
          //this.SaveIncomeDetails();
          if (dotype == "R11E") {
            let obj = {
              Dotyp: dotype,
              Doguid: data["d"]["Doguid"],
              RetGuid: data["d"]["RetGuid"],
              SchGuid: data["d"]["SchGuid"],
              Filename: data["d"]["Filename"].split(".")[0],
              FileExtn: data["d"]["Filename"].split(".")[
                filename.split(".").length - 1
              ],
            };
            this.legalDocCount.push(obj);
          } else if (dotype == "R11C") {
            let obj = {
              Dotyp: dotype,
              Doguid: data["d"]["Doguid"],
              RetGuid: data["d"]["RetGuid"],
              SchGuid: data["d"]["SchGuid"],
              Filename: data["d"]["Filename"].split(".")[0],
              FileExtn: data["d"]["Filename"].split(".")[
                filename.split(".").length - 1
              ],
            };
            this.ChartedFileCount = [];
            this.ChartedFileCount.push(obj);
          } else if (dotype == "R11D") {
            let obj = {
              Dotyp: dotype,
              Doguid: data["d"]["Doguid"],
              RetGuid: data["d"]["RetGuid"],
              SchGuid: data["d"]["SchGuid"],
              Filename: data["d"]["Filename"].split(".")[0],
              FileExtn: data["d"]["Filename"].split(".")[
                filename.split(".").length - 1
              ],
            };
            this.FinancialFileCount = [];
            this.FinancialFileCount.push(obj);
          } else if (dotype == "R11F") {
            let obj = {
              Dotyp: dotype,
              Doguid: data["d"]["Doguid"],
              RetGuid: data["d"]["RetGuid"],
              SchGuid: data["d"]["SchGuid"],
              Filename: data["d"]["Filename"].split(".")[0],
              FileExtn: data["d"]["Filename"].split(".")[
                filename.split(".").length - 1
              ],
            };
            this.ZakatFileCount.push(obj);
          }
          if (this.myInputVariable != undefined) {
            this.myInputVariable.nativeElement.value = "";
          }
          if (this.myInputVariable1 != undefined) {
            this.myInputVariable1.nativeElement.value = "";
          }
          if (this.myinputCharteredFile != undefined) {
            this.myinputCharteredFile.nativeElement.value = "";
          }
          if (this.myinputFinancialStatement != undefined) {
            this.myinputFinancialStatement.nativeElement.value = "";
          }
        },
        (err) => {
          console.error(err);
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
        }
      );
  }
  ValidateStartDate(pi) {
    moment.locale("en-Us");
    if (
      moment(this.Capitals.controls[pi].value.DOCapAdd, "YYYY-MM-DD").diff(
        moment(this.periodStartDate, "DD-MM-YYYY"),
        "days"
      ) <= 0 ||
      moment(this.Capitals.controls[pi].value.DOCapAdd, "YYYY-MM-DD").diff(
        moment(this.periodEndDate, "DD-MM-YYYY"),
        "days"
      ) >= 0
    ) {
      this.Capitals.controls[pi].patchValue({ DOCapAdd: "" });
    }
    this.CapitalZakatCalculation(pi);
  }
  DownloadFormFormat() {
    this.from11Service
      .DownloadFormFormat(this.taxPayerDetails.Fbnumz)
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "FormFormat.pdf");
      });
  }
  DownloadInvoice() {
    this.from11Service
      .DownloadForm11Invoice(this.taxPayerDetails.Fbnumz)
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "Invoice.pdf");
      });
  }
  DeleteAttachement(obj) {
    this.from11Service.GetSavedAttachments().subscribe((data: any) => {
      console.log(data);
    });
    this.from11Service
      .DeleteForm11Attachements(
        obj.RetGuid,
        obj.Dotyp,
        obj.SchGuid,
        obj.Srno || 1,
        obj.Doguid
      )
      .subscribe((data: any) => {
        if (obj.Dotyp == "R11E") {
          this.legalDocCount = this.legalDocCount.filter((data) => {
            return data.Doguid != obj.Doguid;
          });
        } else if (obj.Dotyp == "R11C") {
          this.ChartedFileCount = this.ChartedFileCount.filter((data) => {
            return data.Doguid != obj.Doguid;
          });
        } else if (obj.Dotyp == "R11D") {
          this.FinancialFileCount = this.FinancialFileCount.filter((data) => {
            return data.Doguid != obj.Doguid;
          });
        } else if (obj.Dotyp == "R11F") {
          this.ZakatFileCount = this.ZakatFileCount.filter((data) => {
            return data.Doguid != obj.Doguid;
          });
        }
      });
  }
  addPopup() {
    jQuery("body").addClass("modalopen");
  }
  clsePopup() {
    this.GetTaxpayerDetails();
    jQuery("body").removeClass("modalopen");
  }
  NotApplicableApply(value) {
    if (this.notApplicableAction == "gainLossForm") {
      if (value) {
        this.GainLossForm.patchValue({ Schedule: false });
        this.clearFormArray(this.GainLossSecurities);
        this.AddRow();
        this.TotalsCalculation();
        this.taxPayerDetails.RGainloss = "";
        this.taxPayerDetails.Sch1101Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switch01").prop("checked", false);
        jQuery("#scheduleModal").modal("hide");
      } else {
        this.GainLossForm.patchValue({ Schedule: true });
        jQuery("#switch01").prop("checked", true);
      }
    } else if (this.notApplicableAction == "IncomeFromBanking") {
      if (value) {
        this.IncomeFromBankingForm.patchValue({ Schedule: false });
        this.clearFormArray(this.OtherRevenues);
        this.AddRevenueRow();
        this.TotalRevenueCalculation();
        this.taxPayerDetails.OtherRev = "0";
        this.taxPayerDetails.ROtherrev = "";
        this.taxPayerDetails.Sch1102Set["results"] = [];
        this.SaveIncomeDetails();
        this.GetTaxpayerDetails();
        jQuery("#switch02").prop("checked", false);
        jQuery("#scheduleRevenueModal").modal("hide");
      } else {
        this.IncomeFromBankingForm.patchValue({ Schedule: true });
        jQuery("#switch02").prop("checked", true);
      }
    } else if (this.notApplicableAction == "BankingFinancial") {
      if (value) {
        this.taxPayerDetails.RCostMan = "";
        this.taxPayerDetails.RCostmain = "";
        this.CostOfRevenueModalApplicable = false;
        this.taxPayerDetails.CostMain = "0.00";
        // if (this.SelectedCostOfRevenueOptions == 'Banking') {
        //   this.clearFormArray(this.BankRevenues);
        //   this.AddBankRevenueRow();
        //   this.TotalBankingRevenueCalculation();
        //   this.taxPayerDetails.Sch1103Set["results"] = [];
        //   this.SaveIncomeDetails();
        // }
        // else if (this.SelectedCostOfRevenueOptions == 'FinancialActivities') {
        //   this.clearFormArray(this.FinanceRevenues);
        //   this.AddFinanceRevenueRow();
        //   this.TotalFinanceRevenueCalculation();
        //   this.taxPayerDetails.Sch1103BSet["results"] = [];
        //   this.SaveIncomeDetails();
        // }
        this.clearFormArray(this.BankRevenues);
        this.AddBankRevenueRow();
        this.TotalBankingRevenueCalculation();
        this.taxPayerDetails.Sch1103Set["results"] = [];
        this.clearFormArray(this.FinanceRevenues);
        this.AddFinanceRevenueRow();
        this.TotalFinanceRevenueCalculation();
        this.taxPayerDetails.Sch1103BSet["results"] = [];
        this.SaveIncomeDetails();

        jQuery("#switch03").prop("checked", false);
        jQuery("#CostOfRevenueOptionsModal").modal("hide");
      } else {
        this.GetTaxpayerDetails();
        jQuery("#switch03").prop("checked", true);
      }
    } else if (this.notApplicableAction == "ProvisionForm") {
      if (value) {
        this.taxPayerDetails.RProvisionyr = "";
        this.ProvisionMadeDuringForm.patchValue({ Schedule: false });
        this.clearFormArray(this.Provisions);
        this.AddProvisionRevenueRow();
        this.TotalProvisionEndingCalculation();
        this.taxPayerDetails.Sch1104Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switch07").prop("checked", false);
        jQuery("#ProvisionsMadeDuringPeriodModal").modal("hide");
      } else {
        this.ProvisionMadeDuringForm.patchValue({ Schedule: true });
        jQuery("#switch07").prop("checked", true);
      }
    } else if (this.notApplicableAction == "RoyalityTechnical") {
      if (value) {
        this.taxPayerDetails.RRoyalser = "";
        this.RoyalityTechnicalServicesForm.patchValue({ Schedule: false });
        this.clearFormArray(this.RoyalityTechnicalSecurities);
        this.AddTechnicalSecurityRow();
        this.TotalsRoyalityCalculations();
        this.taxPayerDetails.Sch1105Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switch04").prop("checked", false);
        jQuery("#RoyalityTechnicalSecurityModal").modal("hide");
      } else {
        this.RoyalityTechnicalServicesForm.patchValue({ Schedule: true });
        jQuery("#switch04").prop("checked", true);
      }
    } else if (this.notApplicableAction == "OtherExpenses") {
      if (value) {
        this.taxPayerDetails.ROtherexp = "";
        this.OtherExpensesForm.patchValue({ Schedule: false });
        this.clearFormArray(this.OtherExpenses);
        this.AddOtherExpensesRow();
        this.OtherExpensesTotalCalculation();
        this.taxPayerDetails.Sch1106Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switch05").prop("checked", false);
        jQuery("#OtherExpensesModal").modal("hide");
      } else {
        this.OtherExpensesForm.patchValue({ Schedule: true });
        jQuery("#switch05").prop("checked", true);
      }
    } else if (this.notApplicableAction == "DepreciationDifference") {
      if (value) {
        this.taxPayerDetails.RDepriciation = "";
        this.DepreciationDifferencesForm.patchValue({ Schedule: false });
        this.taxPayerDetails.Sch1107Set["results"][0]["AGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ACostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ACostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ATotCost50Pcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["AComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["AComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ATotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["AGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0][
          "ADepAmotRatio"
        ] = this.taxPayerDetails.Sch1107Set["results"][0]["ADepAmotRatio"];
        this.taxPayerDetails.Sch1107Set["results"][0]["ADepAmotValue"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ARemValueCyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["AGrpMaintCost"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["AMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["AGrpCyr"] = "0.00";

        this.taxPayerDetails.Sch1107Set["results"][0]["BGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BCostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BCostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BTotCost50Pcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BTotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0][
          "BDepAmotRatio"
        ] = this.DepreciationDifferencesForm.value.FirstDepreciationAmortizationRatio.toString();
        this.taxPayerDetails.Sch1107Set["results"][0]["BDepAmotValue"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BRemValueCyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BGrpMaintCost"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["BGrpCyr"] = "0.00";

        this.taxPayerDetails.Sch1107Set["results"][0]["CGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CCostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CCostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CTotCost50Pcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CTotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0][
          "CDepAmotRatio"
        ] = this.DepreciationDifferencesForm.value.SecondDepreciationAmortizationRatio.toString();
        this.taxPayerDetails.Sch1107Set["results"][0]["CDepAmotValue"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CRemValueCyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CGrpMaintCost"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["CGrpCyr"] = "0.00";

        this.taxPayerDetails.Sch1107Set["results"][0]["DGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DCostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DCostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DTotCost50Pcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DTotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0][
          "DDepAmotRatio"
        ] = this.DepreciationDifferencesForm.value.ThirdDepreciationAmortizationRatio.toString();
        this.taxPayerDetails.Sch1107Set["results"][0]["DDepAmotValue"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DRemValueCyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DGrpMaintCost"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["DGrpCyr"] = "0.00";

        this.taxPayerDetails.Sch1107Set["results"][0]["EGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ECostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ECostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ETotCost50Pcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["EComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["EComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ETotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["EGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0][
          "EDepAmotRatio"
        ] = this.DepreciationDifferencesForm.value.FourthDepreciationAmortizationRatio.toString();
        this.taxPayerDetails.Sch1107Set["results"][0]["EDepAmotValue"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["ERemValueCyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["EGrpMaintCost"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["EMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["EGrpCyr"] = "0.00";

        this.taxPayerDetails.Sch1107Set["results"][0]["FGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FCostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FCostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FTotCost50Pcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FTotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0][
          "FDepAmotRatio"
        ] = this.DepreciationDifferencesForm.value.FifthDepreciationAmortizationRatio.toString();
        this.taxPayerDetails.Sch1107Set["results"][0]["FDepAmotValue"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FRemValueCyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FGrpMaintCost"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["FGrpCyr"] = "0.00";

        this.taxPayerDetails.Sch1107Set["results"][0]["TotGrpvalEod"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotCostPyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotCostCyrAddition"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotCost50Pcyr"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotComesAssetPyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotComesAssetCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotTotCost50AssetPcyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotGrpRem"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotDepAmotValue"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotRemValueCyr"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotGrpMaintCost"] =
          "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotMaint4exp"] = "0.00";
        this.taxPayerDetails.Sch1107Set["results"][0]["TotGrpCyr"] = "0.00";
        this.DepreciationDifferencesForm.reset();
        this.taxPayerDetails.DepDiff = "0.00";
        this.SaveIncomeDetails();
        jQuery("#switchd02").prop("checked", false);
        jQuery("#DepreciationDifferenceModal").modal("hide");
      } else {
        this.DepreciationDifferencesForm.patchValue({ Schedule: true });
        jQuery("#switchd02").prop("checked", true);
      }
    } else if (this.notApplicableAction == "AdjustmentToNetProfitForm") {
      if (value) {
        this.taxPayerDetails.RNetprofit = "";
        this.AdjustmentToNetProfitForm.patchValue({ Schedule: false });
        this.clearFormArray(this.AdjustmentNetProfits);
        this.AddAdjustmentNetProfitRow();
        this.AdjustmentNetProfitTotalCalculation();
        this.taxPayerDetails.Sch1108Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switchnet05").prop("checked", false);
        jQuery("#AdjustmentToNetProfitModal").modal("hide");
      } else {
        this.AdjustmentToNetProfitForm.patchValue({ Schedule: true });
        jQuery("#switchnet05").prop("checked", true);
      }
    } else if (this.notApplicableAction == "IncomeFromLoans") {
      if (value) {
        this.taxPayerDetails.RLoanthold = "";
        this.IncomeFromLoansForm.patchValue({ Schedule: false });
        this.IncomeFromLoansForm.reset();
        this.SaveIncomeDetails();
        jQuery("#switch06").prop("checked", false);
        jQuery("#IncomeFromLoansModal").modal("hide");
      } else {
        this.taxPayerDetails.RLoanthold = "X";
        this.IncomeFromLoansForm.patchValue({ Schedule: true });
        jQuery("#switch06").prop("checked", true);
      }
    } else if (this.notApplicableAction == "NonSaudiCurrentYearForm") {
      if (value) {
        this.taxPayerDetails.RNssharecap25 = "";
        this.AdjustedCarriedCITLosessForm.patchValue({ Schedule: false });
        this.AdjustedCarriedCITLosessForm.reset();
        this.taxPayerDetails.Sch1110Set["results"][0]["CarryforAmt"] = "0.00";
        this.taxPayerDetails.Sch1110Set["results"][0]["DecprofitAmt"] = "0.00";
        this.taxPayerDetails.Sch1110Set["results"][0]["LosscuryrAmt"] = "0.00";
        this.taxPayerDetails.Sch1110Set["results"][0]["EndofyearAmt"] = "0.00";
        this.SaveIncomeDetails();
        jQuery("#switch111").prop("checked", false);
        jQuery("#NonSaudiCurrentYearModal").modal("hide");
      } else {
        this.AdjustedCarriedCITLosessForm.patchValue({ Schedule: true });
        jQuery("#switch111").prop("checked", true);
      }
    } else if (this.notApplicableAction == "CapitalZakatForm") {
      if (value) {
        this.taxPayerDetails.RCapital = "";
        this.CapitalZakatForm.patchValue({ Schedule: false });
        this.clearFormArray(this.Capitals);
        this.AddCapitalsRow();
        this.CapitalTotalsCalculation();
        this.taxPayerDetails.Sch1111Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switchcap02").prop("checked", false);
        jQuery("#CapitalZakatModal").modal("hide");
      } else {
        this.CapitalZakatForm.patchValue({ Schedule: true });
        jQuery("#switchcap02").prop("checked", true);
      }
    } else if (this.notApplicableAction == "EquityFunds") {
      if (value) {
        this.taxPayerDetails.REquity = "";
        this.EquityEqualantFundResourceForm.patchValue({ Schedule: false });
        this.clearFormArray(this.EquityEqualantFunds);
        this.AddEquityFundRow();
        this.TotalEquityFundsCalculations();
        this.taxPayerDetails.Sch1112Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switcheqf03").prop("checked", false);
        jQuery("#EquityFundsModal").modal("hide");
      } else {
        this.EquityEqualantFundResourceForm.patchValue({ Schedule: true });
        jQuery("#switcheqf03").prop("checked", true);
      }
    } else if (this.notApplicableAction == "LongTerm") {
      if (value) {
        this.taxPayerDetails.RLongloan = "";
        this.LongTermEquivalentForm.patchValue({ Schedule: false });
        this.clearFormArray(this.LongTermLoans);
        this.AddLongTermRow();
        this.TotalLongTermCalculations();
        this.taxPayerDetails.Sch1114Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switchll04").prop("checked", false);
        jQuery("#LongTermModal").modal("hide");
      } else {
        this.LongTermEquivalentForm.patchValue({ Schedule: true });
        jQuery("#switchll04").prop("checked", true);
      }
    } else if (this.notApplicableAction == "LongTermDebts") {
      if (value) {
        this.taxPayerDetails.RLonddebit = "";
        this.LongTermDebtsEquivalentForm.patchValue({ Schedule: false });
        this.clearFormArray(this.LongTermDebts);
        this.AddLongTermDebtRow();
        this.TotalLongTermDebtCalculations();
        this.taxPayerDetails.Sch1115Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switchlld05").prop("checked", false);
        jQuery("#LongTermDebtsModal").modal("hide");
      } else {
        this.LongTermDebtsEquivalentForm.patchValue({ Schedule: true });
        jQuery("#switchlld05").prop("checked", true);
      }
    } else if (this.notApplicableAction == "Sukuks") {
      if (value) {
        this.taxPayerDetails.RInvdebit = "";
        this.InvestmentsGovernmentSukukForm.patchValue({ Schedule: false });
        this.clearFormArray(this.Sukuks);
        this.AddSukukRow();
        this.TotalSukuksCalculations();
        this.taxPayerDetails.Sch1118Set["results"] = [];
        this.SaveIncomeDetails();
        jQuery("#switchsukuk06").prop("checked", false);
        jQuery("#SukuksModal").modal("hide");
      } else {
        this.InvestmentsGovernmentSukukForm.patchValue({ Schedule: true });
        jQuery("#switchsukuk06").prop("checked", true);
      }
    }
  }
  NumberAllow(event) {
    if (event.keyCode == 8) {
      return true;
    } else if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }

  ValidateAmountPatterns(pi) {
    this.PartyTransactionsSet.controls[pi].patchValue({
      Amount: parseFloat(
        this.PartyTransactionsSet.controls[pi].value.Amount || 0
      ).toFixed(2),
    });
  }
  topWindowScroll() {
    window.scrollTo(0, 0);
  }

  SuccessModalShow() {
    jQuery("#SuccessModal").modal("show");
  }

  fileData: any;
  cancelUpload: boolean = false;
  GainLossUploadFile(event) {
    jQuery("#GainLossConfirmation").modal("show");
    this.fileData = event;
  }

  GainLossUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["الشركة", "سعر البيع", "التكلفة", "الربح (الخسارة)"];
    } else {
      headerTitles = ["Company", "Selling Amount", "Cost", "Profit (Loss)"];
    }
    this.onFileUpload(this.fileData, headerTitles, 1);
  }

  OtherRevenuesUploadFile(event) {
    jQuery("#OtherRevenuesConfirmation").modal("show");
    this.fileData = event;
  }

  OtherRevenuesUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["البيان", "المبلغ"];
    } else {
      headerTitles = ["Statement", "Amount"];
    }
    this.onFileUpload(this.fileData, headerTitles, 2);
  }

  BankRevenuesUploadFile(event) {
    jQuery("#BankRevenuesConfirmation").modal("show");
    this.fileData = event;
  }

  BankRevenuesUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["البيان", "العنوان", "مدة الوديعة", "القيمة"];
    } else {
      headerTitles = ["Statement", "Address", "Deposit Term", "Value"];
    }
    this.onFileUpload(this.fileData, headerTitles, 3);
  }

  FinanceRevenuesUploadFile(event) {
    jQuery("#FinanceRevenuesConfirmation").modal("show");
    this.fileData = event;
  }

  FinanceRevenuesUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["القيمة", "البيان"];
    } else {
      headerTitles = ["Statement", "Amount"];
    }
    this.onFileUpload(this.fileData, headerTitles, "3b");
  }

  ProvisionsUploadFile(event) {
    jQuery("#ProvisionsConfirmation").modal("show");
    this.fileData = event;
  }

  ProvisionsUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "نوع المخصص",
        "رصيد أول المدة",
        "المكون خلال العام",
        "المستخدم خلال العام",
        "التسويات",
        "رصيد نهاية المدة",
      ];
    } else {
      headerTitles = [
        "Provision type",
        "Beginning Balance",
        "Provisions Created during the period",
        "Utilized during the period",
        "Settlements",
        "Ending Balance",
      ];
    }
    this.onFileUpload(this.fileData, headerTitles, 4);
  }

  RoyTechConProFeesUploadFile(event) {
    jQuery("#RoyTechConProFeesConfirmation").modal("show");
    this.fileData = event;
  }

  RoyTechConProFeesUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      //headerTitles=["نوع الهوية","رقم الهوية","اسم الجهة المستفيدة","محلي/أجنبي","البلد","نوع الخدمة","المحمل على الحسابات","المدفوع خلال العام"]
      //headerTitles=["نوع الهوية", "رقم الهوية", "اسم الجهة المستفيدة", "محلي/أجنبي", "البلد", "نوع الخدمة", "المحمل على الحسابات", "المدفوع خلال العام"];
      headerTitles = [
        "نوع الهوية",
        "رقم الهوية",
        "اسم الجهة المستفيدة",
        "محلي/أجنبي",
        "البلد",
        "LAND1",
        "نوع الخدمة",
        "المحمل على الحسابات",
        "المدفوع خلال العام",
      ];
    } else {
      headerTitles = [
        "ID Type",
        "ID Number",
        "Beneficiary Name",
        "Internal / External",
        "Country",
        "LAND1",
        "Service Type",
        "Charged to the accounts",
        "Paid during the year",
      ];
    }

    this.onFileUpload(this.fileData, headerTitles, 5);
  }

  OtherExpensesUploadFile(event) {
    jQuery("#OtherExpensesConfirmation").modal("show");
    this.fileData = event;
  }

  OtherExpensesUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["البيان", "القيمة"];
    } else {
      headerTitles = ["Statement", "Value"];
    }
    this.onFileUpload(this.fileData, headerTitles, 6);
  }

  AdjustmentToNetProfitUploadFile(event) {
    jQuery("#AdjustmentToNetProfitConfirmation").modal("show");
    this.fileData = event;
  }

  AdjustmentToNetProfitUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["التعديل", "البيان", "القيمة"];
    } else {
      headerTitles = ["Adjustment  to net profit", "Statement", "Amount"];
    }

    this.onFileUpload(this.fileData, headerTitles, 8);
  }

  CapitalsUploadFile(event) {
    jQuery("#CapitalsConfirmation").modal("show");
    this.fileData = event;
  }

  CapitalsUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "رصيد بداية الفترة",
        "النقص في رأس المال خلال العام",
        "الاضافة لرأس المال خلال العام",
        "مصدر الإضافة في رأس المال",
        "تاريخ زيادة رأس المال",
        "رصيد نهاية الفترة",
        "المستخدم في بند من بنود الموجودات غير الزكوية",
        "المستخدم في بند من بنود الموجودات الزكوية",
        "تاريخ نهاية السنة المالية",
        "عدد الأيام",
        "رأس المال الخاضع للزكاة",
      ];
    } else {
      headerTitles = [
        "Beginning of period balance",
        "Amount deducted from the capital during the current period",
        "Additions to the capital during the year",
        "Capital addition source",
        "Date of capital addition",
        "End of period balance",
        "Utilized in Non-Zakatable item from Zakat base",
        "Utilized in Zakatable item",
        "Date of end of financial year",
        "Number of days",
        "Capital subject to Zakat",
      ];
    }
    this.onFileUpload(this.fileData, headerTitles, 11);
  }

  EquityEqualantFundsUploadFile(event) {
    jQuery("#EquityEqualantFundsConfirmation").modal("show");
    this.fileData = event;
  }

  EquityEqualantFundsUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = ["البيان", "المبلغ"];
    } else {
      headerTitles = ["Statement", "Amount"];
    }

    this.onFileUpload(this.fileData, headerTitles, 12);
  }

  LongTermLoansUploadFile(event) {
    jQuery("#LongTermLoansConfirmation").modal("show");
    this.fileData = event;
  }

  LongTermLoansUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "اسم الصكوك/السندات",
        "تاريخ الاستحقاق",
        "تستحق خلال 365 يوم أو أقل",
        "تستحق بعد أكثر من 365 يوم",
      ];
    } else {
      headerTitles = [
        "Loan type",
        "Local / Foreign",
        "Amount for Due in 365 days or less",
        "Amount for Due after 365 days or less",
      ];
    }

    this.onFileUpload(this.fileData, headerTitles, 14);
  }

  LongTermDebtsUploadFile(event) {
    jQuery("#LongTermDebtsConfirmation").modal("show");
    this.fileData = event;
  }

  LongTermDebtsUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "نوع الدين",
        "داخلي/خارجي",
        "تستحق خلال 365 يوم أو أقل",
        "تستحق بعد أكثر من 365 يوم",
      ];
    } else {
      headerTitles = [
        "Debt type",
        "Local / Foreign",
        "Due in 365 days or less",
        "Due after 365 days or more",
      ];
    }

    this.onFileUpload(this.fileData, headerTitles, 15);
  }

  SukuksUploadFile(event) {
    jQuery("#SukuksConfirmation").modal("show");
    this.fileData = event;
  }

  SukuksUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "اسم الصكوك/السندات",
        "تاريخ الاستحقاق",
        "تستحق خلال 365 يوم أو أقل",
        "تستحق بعد أكثر من 365 يوم",
      ];
    } else {
      headerTitles = [
        "Name of Sukuk/Bonds",
        "Maturity Date",
        "Amount due in 365 days or less",
        "Amount due after 365 days or more",
      ];
    }
    this.onFileUpload(this.fileData, headerTitles, 13);
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
        for (var i = 0; i != data.length; i++)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {
          type: "binary",
          cellDates: true,
          dateNF: "mm-dd-yyyy;@",
        });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        //console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]);
        for (
          let i = 0;
          i <
          XLSX.utils
            .sheet_to_json(worksheet, { header: 1 })[0]
            .toString()
            .split(",").length;
          i++
        ) {
          headerArray.push(
            XLSX.utils
              .sheet_to_json(worksheet, { header: 1 })[0]
              .toString()
              .split(",")[i]
          );
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
        console.log("ColumnsHeaderArray", ColumnsHeaderArray);
        console.log("headerArray", headerArray);
        console.log(headerArray.length, ColumnsHeaderArray.length);
        if (headerArray.length == ColumnsHeaderArray.length) {
          for (let i = 0; i < headerArray.length; i++) {
            console.log(typeof headerArray[i]);
            if (
              headerArray[i].trimRight() != ColumnsHeaderArray[i].trimRight()
            ) {
              count++;
              break;
            }
          }
        } else {
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
          if (scheduleNo == 5) {
            data1 = data1.filter((d) => d["LAND1"] != "");
          }
          if (scheduleNo == 13) {
            data1 = data1.filter((d) => d["Maturity Date"] != "");
          }
          for (let i = 0; i < data1.length; i++) {
            obj = {};
            //to validate the data in the row
            for (let j = 0; j < headerArray.length; j++) {
              obj[headerArray[j].trimRight()] = data1[i][headerArray[j]]
                ? data1[i][headerArray[j]]
                : 0;
            }
            newData.push(obj);
          }
          console.log("newData", newData);
          if (scheduleNo == 1) {
            this.clearFormArray(this.GainLossSecurities);
            for (let i = 0; i < newData.length; i++) {
              this.AddRow();
              if (this.language == "ar") {
                this.GainLossSecurities.controls[i].patchValue({
                  Company: newData[i]["الشركة"],
                });
                this.GainLossSecurities.controls[i].patchValue({
                  SellingAmount: newData[i]["سعر البيع"],
                });
                this.GainLossSecurities.controls[i].patchValue({
                  Cost: newData[i]["التكلفة"],
                });
              } else {
                this.GainLossSecurities.controls[i].patchValue({
                  Company: newData[i]["Company"],
                });
                this.GainLossSecurities.controls[i].patchValue({
                  SellingAmount: newData[i]["Selling Amount"],
                });
                this.GainLossSecurities.controls[i].patchValue({
                  Cost: newData[i]["Cost"],
                });
              }
              this.ProfitLossCalculation(i);
            }
          } else if (scheduleNo == 2) {
            this.clearFormArray(this.OtherRevenues);
            for (let i = 0; i < newData.length; i++) {
              this.AddRevenueRow();
              if (this.language == "ar") {
                this.OtherRevenues.controls[i].patchValue({
                  Statement: newData[i]["البيان"],
                });
                this.OtherRevenues.controls[i].patchValue({
                  Amount: newData[i]["المبلغ"],
                });
              } else {
                this.OtherRevenues.controls[i].patchValue({
                  Statement: newData[i]["Statement"],
                });
                this.OtherRevenues.controls[i].patchValue({
                  Amount: newData[i]["Amount"],
                });
              }

              this.TotalRevenueCalculation();
            }
          } else if (scheduleNo == 3) {
            this.clearFormArray(this.BankRevenues);
            for (let i = 0; i < newData.length; i++) {
              this.AddBankRevenueRow();
              if (this.language == "ar") {
                console.log(this.DepositTermSet);
                this.BankRevenues.controls[i].patchValue({
                  Statement: newData[i]["البيان"],
                });
                let val = this.AddressSet.filter(
                  (d) => d["DropDown"] == newData[i]["العنوان"]
                );
                console.log("val", val);
                this.BankRevenues.controls[i].patchValue({
                  Address: val[0]["FxdVal"],
                });
                let val1 =
                  this.DepositTermSet.filter(
                    (d) =>
                      d["DropDown"].trim() ==
                      newData[i]["مدة الوديعة"].toString().trim()
                  ) || [];
                console.log("val1", val1);
                console.log(val1 == []);
                this.BankRevenues.controls[i].patchValue({
                  DepositTerm: val1.length == 0 ? "" : val1[0]["FxdVal"],
                });
                this.BankRevenues.controls[i].patchValue({
                  Value: newData[i]["القيمة"],
                });
              } else {
                this.BankRevenues.controls[i].patchValue({
                  Statement: newData[i]["Statement"],
                });
                this.BankRevenues.controls[i].patchValue({
                  Address: this.AddressSet.filter(
                    (d) => d["DropDown"] == newData[i]["Address"]
                  )[0]["FxdVal"],
                });
                this.BankRevenues.controls[i].patchValue({
                  DepositTerm: this.DepositTermSet.filter(
                    (d) => d["DropDown"] == newData[i]["Deposit Term"]
                  )[0]["FxdVal"],
                });
                this.BankRevenues.controls[i].patchValue({
                  Value: newData[i]["Value"],
                });
              }
              this.TotalBankingRevenueCalculation();
            }
          } else if (scheduleNo == "3b") {
            this.clearFormArray(this.FinanceRevenues);
            for (let i = 0; i < newData.length; i++) {
              this.AddFinanceRevenueRow();
              if (this.language == "ar") {
                this.FinanceRevenues.controls[i].patchValue({
                  Statement: newData[i]["البيان"],
                });
                this.FinanceRevenues.controls[i].patchValue({
                  Amount: newData[i]["القيمة"],
                });
              } else {
                this.FinanceRevenues.controls[i].patchValue({
                  Statement: newData[i]["Statement"],
                });
                this.FinanceRevenues.controls[i].patchValue({
                  Amount: newData[i]["Amount"],
                });
              }

              this.TotalFinanceRevenueCalculation();
            }
          } else if (scheduleNo == 4) {
            this.clearFormArray(this.Provisions);
            for (let i = 0; i < newData.length; i++) {
              this.AddProvisionRevenueRow();
              if (this.language == "ar") {
                this.Provisions.controls[i].patchValue({
                  ProvisionType: newData[i]["نوع المخصص"],
                });
                this.Provisions.controls[i].patchValue({
                  BeginingBalance: newData[i]["رصيد أول المدة"],
                });
                this.Provisions.controls[i].patchValue({
                  ProvisionCreditDuringTheYear: newData[i]["المكون خلال العام"],
                });
                this.Provisions.controls[i].patchValue({
                  UtilizedDuringPeriod: newData[i]["المستخدم خلال العام"],
                });
                this.Provisions.controls[i].patchValue({
                  Settlements: newData[i]["التسويات"],
                });
              } else {
                this.Provisions.controls[i].patchValue({
                  ProvisionType: newData[i]["Provision type"],
                });
                this.Provisions.controls[i].patchValue({
                  BeginingBalance: newData[i]["Beginning Balance"],
                });
                this.Provisions.controls[i].patchValue({
                  ProvisionCreditDuringTheYear:
                    newData[i]["Provisions Created during the period"],
                });
                this.Provisions.controls[i].patchValue({
                  UtilizedDuringPeriod:
                    newData[i]["Utilized during the period"],
                });
                this.Provisions.controls[i].patchValue({
                  Settlements: newData[i]["Settlements"],
                });
              }

              this.EndingBalanceCalculation(i);
            }
          } else if (scheduleNo == 5) {
            this.clearFormArray(this.RoyalityTechnicalSecurities);
            for (let i = 0; i < newData.length; i++) {
              this.AddTechnicalSecurityRow();
              if (this.language == "ar") {
                let val = this.IdTypes.filter(
                  (d) => d["DropDown"] == newData[i]["نوع الهوية"]
                );
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  IdType: val[0]["FxdVal"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  IdNumber: newData[i]["رقم الهوية"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  BeneficiaryName: newData[i]["اسم الجهة المستفيدة"],
                });
                let val1 = this.AddressSet.filter(
                  (d) => d["DropDown"] == newData[i]["محلي/أجنبي"]
                );
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  InterExternal: val1[0]["FxdVal"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  Country: newData[i]["LAND1"],
                });
                this.ManageNameControl(i);
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  ServiceType: newData[i]["نوع الخدمة"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  ChargedToTheAccounts: newData[i]["المحمل على الحسابات"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  PaidDuringTheYear: newData[i]["المدفوع خلال العام"],
                });
              } else {
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  IdType: this.IdTypes.filter(
                    (d) => d["DropDown"] == newData[i]["ID Type"]
                  )[0]["FxdVal"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  IdNumber: newData[i]["ID Number"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  BeneficiaryName: newData[i]["Beneficiary Name"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  InterExternal: this.AddressSet.filter(
                    (d) => d["DropDown"] == newData[i]["Internal / External"]
                  )[0]["FxdVal"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  Country: newData[i]["LAND1"],
                });
                this.ManageNameControl(i);
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  ServiceType: newData[i]["Service Type"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  ChargedToTheAccounts: newData[i]["Charged to the accounts"],
                });
                this.RoyalityTechnicalSecurities.controls[i].patchValue({
                  PaidDuringTheYear: newData[i]["Paid during the year"],
                });
              }

              this.TotalsRoyalityCalculations();
            }
          } else if (scheduleNo == 6) {
            this.clearFormArray(this.OtherExpenses);
            for (let i = 0; i < newData.length; i++) {
              this.AddOtherExpensesRow();
              if (this.language == "ar") {
                this.OtherExpenses.controls[i].patchValue({
                  Statement: newData[i]["البيان"],
                });
                this.OtherExpenses.controls[i].patchValue({
                  Amount: newData[i]["القيمة"],
                });
              } else {
                this.OtherExpenses.controls[i].patchValue({
                  Statement: newData[i]["Statement"],
                });
                this.OtherExpenses.controls[i].patchValue({
                  Amount: newData[i]["Value"],
                });
              }

              this.OtherExpensesTotalCalculation();
            }
          } else if (scheduleNo == 8) {
            this.clearFormArray(this.AdjustmentNetProfits);
            for (let i = 0; i < newData.length; i++) {
              this.AddAdjustmentNetProfitRow();
              if (this.language == "ar") {
                let val = this.AdjustmentsNetProfitsSet.filter(
                  (d) => d["DropDown"] == newData[i]["التعديل"]
                );
                this.AdjustmentNetProfits.controls[i].patchValue({
                  Adjustment: val[0]["FxdVal"],
                });
                this.AdjustmentNetProfits.controls[i].patchValue({
                  Statement: newData[i]["البيان"] || "",
                });
                this.AdjustmentNetProfits.controls[i].patchValue({
                  Amount: newData[i]["القيمة"],
                });
              } else {
                this.AdjustmentNetProfits.controls[i].patchValue({
                  Adjustment: this.AdjustmentsNetProfitsSet.filter(
                    (d) =>
                      d["DropDown"] == newData[i]["Adjustment  to net profit"]
                  )[0]["FxdVal"],
                });
                this.AdjustmentNetProfits.controls[i].patchValue({
                  Statement:
                    newData[i]["Statement"] != 0 ? newData[i]["Statement"] : "",
                });
                this.AdjustmentNetProfits.controls[i].patchValue({
                  Amount: newData[i]["Amount"],
                });
              }

              this.AdjustmentNetProfitTotalCalculation();
            }
          } else if (scheduleNo == 11) {
            this.clearFormArray(this.Capitals);
            for (let i = 0; i < newData.length; i++) {
              this.AddCapitalsRow();
              if (this.language == "ar") {
                let val = this.AddressSet.filter(
                  (d) =>
                    d["DropDown"] == newData[i]["مصدر الإضافة في رأس المال"]
                );
                this.Capitals.controls[i].patchValue({
                  AdditionSource: val[0]["FxdVal"],
                });
                this.Capitals.controls[i].patchValue({
                  BeginOfPeriodBalance: newData[i]["رصيد بداية الفترة"],
                });
                this.Capitals.controls[i].patchValue({
                  AmountDedFromCapDurCurrent:
                    newData[i]["النقص في رأس المال خلال العام"],
                });
                this.Capitals.controls[i].patchValue({
                  AddToTheCapitalDuringYear:
                    newData[i]["الاضافة لرأس المال خلال العام"],
                });
                this.Capitals.controls[i].patchValue({
                  EOPBalance: newData[i]["تاريخ زيادة رأس المال"],
                });
                this.Capitals.controls[i].patchValue({
                  UtilizeNonZakat: newData[i]["رصيد نهاية الفترة"],
                });
                this.Capitals.controls[i].patchValue({
                  UtilizeZakat:
                    newData[i]["المستخدم في بند من بنود الموجودات غير الزكوية"],
                });
                this.Capitals.controls[i].patchValue({
                  DOCapAdd:
                    newData[i]["المستخدم في بند من بنود الموجودات الزكوية"],
                });
                this.Capitals.controls[i].patchValue({
                  DOEOFinYea: newData[i]["تاريخ نهاية السنة المالية"],
                });
                this.Capitals.controls[i].patchValue({
                  NoDays: newData[i]["عدد الأيام"],
                });
              } else {
                this.Capitals.controls[i].patchValue({
                  AdditionSource: this.AddressSet.filter(
                    (d) =>
                      d["DropDown"] == newData[i]["Capital addition source"]
                  )[0]["FxdVal"],
                });
                this.Capitals.controls[i].patchValue({
                  BeginOfPeriodBalance:
                    newData[i]["Beginning of period balance"],
                });
                this.Capitals.controls[i].patchValue({
                  AmountDedFromCapDurCurrent:
                    newData[i][
                      "Amount deducted from the capital during the current period"
                    ],
                });
                this.Capitals.controls[i].patchValue({
                  AddToTheCapitalDuringYear:
                    newData[i]["Additions to the capital during the year"],
                });
                this.Capitals.controls[i].patchValue({
                  EOPBalance: newData[i]["Date of capital addition"],
                });
                this.Capitals.controls[i].patchValue({
                  UtilizeNonZakat: newData[i]["End of period balance"],
                });
                this.Capitals.controls[i].patchValue({
                  UtilizeZakat:
                    newData[i][
                      "Utilized in Non-Zakatable item from Zakat base"
                    ],
                });
                this.Capitals.controls[i].patchValue({
                  DOCapAdd: newData[i]["Utilized in Zakatable item"],
                });
                this.Capitals.controls[i].patchValue({
                  DOEOFinYea: newData[i]["Date of end of financial year"],
                });
                this.Capitals.controls[i].patchValue({
                  NoDays: newData[i]["Number of days"],
                });
              }

              this.CapitalZakatCalculation(i);
              //this.ValidateStartDate(i);
              this.DateChange(i);
            }
          } else if (scheduleNo == 12) {
            this.clearFormArray(this.EquityEqualantFunds);
            for (let i = 0; i < newData.length; i++) {
              this.AddEquityFundRow();
              if (this.language == "ar") {
                this.EquityEqualantFunds.controls[i].patchValue({
                  Statement: newData[i]["البيان"],
                });
                this.EquityEqualantFunds.controls[i].patchValue({
                  Amount: newData[i]["المبلغ"],
                });
              } else {
                this.EquityEqualantFunds.controls[i].patchValue({
                  Statement: newData[i]["Statement"],
                });
                this.EquityEqualantFunds.controls[i].patchValue({
                  Amount: newData[i]["Amount"],
                });
              }
              this.TotalEquityFundsCalculations();
            }
          } else if (scheduleNo == 14) {
            this.clearFormArray(this.LongTermLoans);
            for (let i = 0; i < newData.length; i++) {
              this.AddLongTermRow();
              if (this.language == "ar") {
                this.LongTermLoans.controls[i].patchValue({
                  DebtType: newData[i]["نوع الدين"],
                });
                let val = this.InternaExternalSet.filter(
                  (d) => d["DropDown"] == newData[i]["داخلي/خارجي"].trim()
                );
                this.LongTermLoans.controls[i].patchValue({
                  LocalForeign: val[0]["FxdVal"],
                });
                this.LongTermLoans.controls[i].patchValue({
                  DueInYearDays: newData[i]["تستحق خلال 365 يوم أو أقل"],
                });
                this.LongTermLoans.controls[i].patchValue({
                  DueAfterYearDays: newData[i]["تستحق بعد أكثر من 365 يوم"],
                });
              } else {
                this.LongTermLoans.controls[i].patchValue({
                  DebtType: newData[i]["Loan type"],
                });
                this.LongTermLoans.controls[i].patchValue({
                  LocalForeign: this.InternaExternalSet.filter(
                    (d) => d["DropDown"] == newData[i]["Local / Foreign"].trim()
                  )[0]["FxdVal"],
                });
                this.LongTermLoans.controls[i].patchValue({
                  DueInYearDays:
                    newData[i]["Amount for Due in 365 days or less"],
                });
                this.LongTermLoans.controls[i].patchValue({
                  DueAfterYearDays:
                    newData[i]["Amount for Due after 365 days or less"],
                });
              }

              this.TotalLongTermCalculations();
            }
          } else if (scheduleNo == 15) {
            this.clearFormArray(this.LongTermDebts);
            for (let i = 0; i < newData.length; i++) {
              this.AddLongTermDebtRow();
              if (this.language == "ar") {
                this.LongTermDebts.controls[i].patchValue({
                  DebtType: newData[i]["نوع الدين"],
                });
                let val = this.InternaExternalSet.filter(
                  (d) => d["DropDown"] == newData[i]["داخلي/خارجي"].trim()
                );
                this.LongTermDebts.controls[i].patchValue({
                  LocalForeign: val[0]["FxdVal"],
                });
                this.LongTermDebts.controls[i].patchValue({
                  DueInYearDays: newData[i]["تستحق خلال 365 يوم أو أقل"],
                });
                this.LongTermDebts.controls[i].patchValue({
                  DueAfterYearDays: newData[i]["تستحق بعد أكثر من 365 يوم"],
                });
              } else {
                this.LongTermDebts.controls[i].patchValue({
                  DebtType: newData[i]["Debt type"],
                });
                this.LongTermDebts.controls[i].patchValue({
                  LocalForeign: this.InternaExternalSet.filter(
                    (d) => d["DropDown"] == newData[i]["Local / Foreign"].trim()
                  )[0]["FxdVal"],
                });
                this.LongTermDebts.controls[i].patchValue({
                  DueInYearDays: newData[i]["Due in 365 days or less"],
                });
                this.LongTermDebts.controls[i].patchValue({
                  DueAfterYearDays: newData[i]["Due after 365 days or more"],
                });
              }

              this.TotalLongTermDebtCalculations();
            }
          } else if (scheduleNo == 13) {
            this.clearFormArray(this.Sukuks);
            for (let i = 0; i < newData.length; i++) {
              this.AddSukukRow();
              if (this.language == "ar") {
                let val = this.InternalExternalSet.filter(
                  (d) =>
                    d["Zdesc"].toUpperCase() ==
                    newData[i]["اسم الصكوك/السندات"].toUpperCase()
                );
                this.Sukuks.controls[i].patchValue({
                  NameOfSukuk: val[0]["Zdesc"],
                });
                this.Sukuks.controls[i].patchValue({
                  MaturityDate: newData[i]["تاريخ الاستحقاق"],
                });
                this.Sukuks.controls[i].patchValue({
                  DueInYearDays: newData[i]["تستحق خلال 365 يوم أو أقل"],
                });
                this.Sukuks.controls[i].patchValue({
                  DueAfterYearDays: newData[i]["تستحق بعد أكثر من 365 يوم"],
                });
              } else {
                this.Sukuks.controls[i].patchValue({
                  NameOfSukuk: this.InternalExternalSet.filter(
                    (d) =>
                      d["Zdesc"].toUpperCase() ==
                      newData[i]["Name of Sukuk/Bonds"].toUpperCase()
                  )[0]["Zdesc"],
                });
                this.Sukuks.controls[i].patchValue({
                  MaturityDate: newData[i]["Maturity Date"],
                });
                this.Sukuks.controls[i].patchValue({
                  DueInYearDays: newData[i]["Amount due in 365 days or less"],
                });
                this.Sukuks.controls[i].patchValue({
                  DueAfterYearDays:
                    newData[i]["Amount due after 365 days or more"],
                });
              }
              this.TotalSukuksCalculations();
            }
          }

          this.TotalsCalculation();
        } else {
          jQuery("#toolTips").modal("show");
        }
      };
    } else {
      this.cancelUpload = false;
    }
    event.target.value = "";
  }

  ZakatCalculation() {
    if (
      +this.taxPayerDetails.MinZakatBase == 0 &&
      +this.taxPayerDetails.MaxZakatBase == 0
    ) {
      this.taxPayerDetails.ZakatBaseLimit = this.taxPayerDetails.ZakatBaseMinMax;
    } else {
      if (
        +this.taxPayerDetails.ZakatBaseMinMax <
        +this.taxPayerDetails.MinZakatBase
      ) {
        this.taxPayerDetails.ZakatBaseLimit = this.taxPayerDetails.MinZakatBase;
      } else if (
        +this.taxPayerDetails.ZakatBaseMinMax >
        +this.taxPayerDetails.MaxZakatBase
      ) {
        this.taxPayerDetails.ZakatBaseLimit = this.taxPayerDetails.MaxZakatBase;
      } else {
        this.taxPayerDetails.ZakatBaseLimit = parseFloat(
          (+this.taxPayerDetails.ZakatBaseMinMax || 0).toString()
        ).toFixed(2);
      }
    }
    var diff = Math.abs(
      +this.taxPayerDetails.Abrzu.replace(")", "")
        .toString()
        .replace("/Date(", "")
        .toString()
        .replace("/", "") -
        +this.taxPayerDetails.Abrzo.replace(")", "")
          .toString()
          .replace("/Date(", "")
          .toString()
          .replace("/", "")
    );
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log("diffDays", diffDays);
    this.taxPayerDetails.SaudiShareZakat = parseFloat(
      (
        (+this.taxPayerDetails.ZakatBaseLimit *
          +this.taxPayerDetails.SaudiShareCaptl) /
        100
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.ZakatAmt = parseFloat(
      (
        (+this.taxPayerDetails.SaudiShareZakat * (diffDays / 354) * 2.5) /
        100
      ).toString()
    ).toFixed(2);
    this.taxPayerDetails.ZakatPayTot = parseFloat(
      (
        +this.taxPayerDetails.ZakatAmtOutInv + +this.taxPayerDetails.ZakatAmt
      ).toString()
    ).toFixed(2);
  }
  CountrSelection(index) {
    console.log(this.RoyalityTechnicalSecurities);
    let count = 0;
    for (let i = 0; i < this.countrySet.length; i++) {
      if (
        this.countrySet[i].Land1 ==
        this.RoyalityTechnicalSecurities.controls[index].value.Country.Land1
      ) {
        count++;
      }
    }
    if (count == 0) {
      this.RoyalityTechnicalSecurities.controls[index].patchValue({
        Country: "",
      });
    }
  }
  SetCountry(index, Land1) {
    if (this.countrySet) {
      this.RoyalityTechnicalSecurities.controls[index].patchValue({
        Country: this.countrySet.filter((data) => {
          return data.Land1 == Land1;
        })[0],
      });
    }
  }
  View() {
    console.log("dep", this.DepreciationDifferencesForm);
  }
  AllowBeneficiaryName(event) {
    console.log("event", event);
    //if(event.keyCode==13 || (event.keyCode>=33 && event.keyCode<=42) || event.keyCode==44 || event.keyCode==46 || event.keyCode==47 ||(event.keyCode>=58 && event.keyCode<=60) ||(event.keyCode>=62 && event.keyCode<=64) ||(event.keyCode>=91 && event.keyCode<=94) || event.keyCode==96 ||(event.keyCode>=123 && event.keyCode<=126))
    // if(event.keyCode>=49 && event.keyCode<=57)
    // {
    //   return event.preventDefault();
    // }
    // let k=event.keyCode;
    // return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    if (
      event.key == "!" ||
      event.key == "~" ||
      event.key == "`" ||
      event.key == "@" ||
      event.key == "#" ||
      event.key == "$" ||
      event.key == "%" ||
      event.key == "^" ||
      event.key == "&" ||
      event.key == "*" ||
      event.key == "(" ||
      event.key == ")" ||
      event.key == "-" ||
      event.key == "_" ||
      event.key == "+" ||
      event.key == "=" ||
      event.key == "{" ||
      event.key == "}" ||
      event.key == "[" ||
      event.key == "]" ||
      event.key == ":" ||
      event.key == ";" ||
      event.key == '"' ||
      event.key == "'" ||
      event.key == "<" ||
      event.key == "," ||
      event.key == ">" ||
      event.key == "." ||
      event.key == "?" ||
      event.key == "/" ||
      event.key == "|"
    ) {
      return event.preventDefault();
    }
  }
  ValidateShareholder(i) {
    this.ShareholdersSet.controls[i].patchValue({
      OwnerShipPercentage:
        this.ShareholdersSet.controls[i].value.OwnerShipPercentage || 0,
    });
  }
  ValidateAmountParties(pi) {
    this.PartyTransactionsSet.controls[pi].patchValue({
      Amount: parseFloat(
        this.PartyTransactionsSet.controls[pi].value.Amount || 0
      ).toFixed(2),
    });
  }
  Viewe() {
    console.log(this.GainLossForm);
  }
  DateChange(pi) {
    // if (this.language == 'ar') {
    //   moment.locale('ar-Sa')
    // }
    // else {
    //   moment.locale('en-Us');
    // }
    // const control1 = this.Capitals.controls[pi];
    // console.log(control1.value.DOCapAdd)
    // control1.patchValue({ 'DOCapAdd': control1.value.DOCapAdd });
    if (this.taxPayerDetails.CalTyp == "G") {
      if (
        moment(
          this.CommonValidation.changeDate2(
            this.Capitals.controls[pi].value.DOCapAdd
          ),
          "YYYY-MM-DD"
        ).diff(moment(this.periodStartDate, "DD-MM-YYYY"), "days") <= 0 ||
        moment(
          this.CommonValidation.changeDate2(
            this.Capitals.controls[pi].value.DOCapAdd
          ),
          "YYYY-MM-DD"
        ).diff(moment(this.periodEndDate, "DD-MM-YYYY"), "days") >= 0
      ) {
        this.Capitals.controls[pi].patchValue({ DOCapAdd: "" });
      }
    } else {
      if (
        moment(
          this.CommonValidation.changeDate4(
            this.Capitals.controls[pi].value.DOCapAdd
          ),
          "YYYY-MM-DD"
        ).diff(moment(this.periodStartDate, "DD-MM-YYYY"), "days") <= 0 ||
        moment(
          this.CommonValidation.changeDate4(
            this.Capitals.controls[pi].value.DOCapAdd
          ),
          "YYYY-MM-DD"
        ).diff(moment(this.periodEndDate, "DD-MM-YYYY"), "days") >= 0
      ) {
        this.Capitals.controls[pi].patchValue({ DOCapAdd: "" });
      }
    }

    this.CapitalZakatCalculation(pi);
  }
  DateChange1() {
    //this.UpeFye=this.CommonValidation.changeDate2(this.UpeFye)
    if (this.taxPayerDetails.CalTyp == "G") {
      this.UpeFyeDis = this.CommonValidation.changeDate2(this.UpeFye);
    } else {
      this.UpeFyeDis = this.CommonValidation.changeDate4(this.UpeFye);
    }
  }
  DateChange2() {
    //this.FeFye=this.CommonValidation.changeDate2(this.FeFye);
    if (this.taxPayerDetails.CalTyp == "G") {
      this.FeFyeDis = this.CommonValidation.changeDate2(this.FeFye);
    } else {
      this.FeFyeDis = this.CommonValidation.changeDate4(this.FeFye);
    }
  }

  // To Cancel the drafted return
  cancelReturn() {
    this.taxPayerDetails.Operationz = "04";
    this.taxPayerDetails.UserTypz = "TP";
    this.from11Service
      .SaveForm11Data(this.taxPayerDetails)
      .subscribe((data) => {
        console.log(data);
        this.taxPayerDetails = data["d"];
        jQuery("#VoidModal").modal("hide");
        this.router.navigateByUrl("/mains/returns/search");
      });
  }

  //To Amend the Billed retrurn
  AmendReturn() {
    this.from11Service
      .getForm11AmendDetails(this.taxPayerDetails.Fbnumz)
      .subscribe((data) => {
        console.log("Amned", data);
        if (data["d"]["Amdflg"] == "Y") {
          this.disableInputs = false;
          this.step = 1;
          this.isAmendment = true;
        }
      });
  }

  //Submit Return after amendment
  OnAmendSubmit() {
    if (this.isAmendment == true) {
      this.taxPayerDetails["AmdRsn"] = "01";
      this.taxPayerDetails["AmendFg"] = "X";
      this.taxPayerDetails["UserTypz"] = "TP";
      this.taxPayerDetails["Operationz"] = "01";
      this.from11Service.SaveForm11Data(this.taxPayerDetails).subscribe(
        (data) => {
          console.log("Amended Data", data);
          this.taxPayerDetails = data["d"];
          jQuery("#AmendModal").modal("hide");
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
        }
      );
      this.step = 8;
    }
  }

  InstructionsChange(event) {
    if (event.target.checked) {
      this.taxPayerDetails.AgreeFg = "X";
    } else {
      this.taxPayerDetails.AgreeFg = "";
    }
  }
  ZakatValidation(action) {
    if (
      this.taxPayerDetails.ZakatPayTot > 0 &&
      this.taxPayerDetails.ZakatPayTot < 99999999999.99
    ) {
      if (action == "draft") {
        this.SaveIncomeDetails();
        this.SuccessModalShow();
      } else if (action == "continue") {
        this.step = 5;
        this.topWindowScroll();
      }
    } else {
      jQuery("#errorModal").modal("show");
    }
  }
}

export interface ICountry {
  Land1: string;
  Landx: string;
  Landx50: string;
  Mandt: string;
  Natio: string;

  Natio50: string;
  PrqSpregt: string;
  Spras: string;
}
export interface User {
  name: string;
}
