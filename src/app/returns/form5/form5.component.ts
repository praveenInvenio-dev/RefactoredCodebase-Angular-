import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturnsService } from '../returns.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { VatServiceService } from 'src/app/services/vat-service.service';
import * as FileSaver from "file-saver";
import * as moment from 'moment';
declare var jQuery;
import { form5constants } from "src/app/returns/form5/form5constants.model";
import { toHijri } from 'hijri-converter';
import { environment } from "src/environments/environment";
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-form5',
  templateUrl: './form5.component.html',
  styleUrls: ['./form5.component.css']
})
export class Form5Component implements OnInit {
  baseUrl = environment.loginurl.split("irj")[0]+"/";
  language:any;
  tinKey:string;
  lang: any;
  direction: string;
  step: number = 1;
  tinNoObj: any = [];
  tinNameObj: any = [];
  usersObject: any = [];
  basicInformationObj: any = [];
  financialcabsList: any = [];
  financialcabsObj: any = [];
  financialProffList: any = [];
  financialProffObj: any = [];
  sellBuyList: any = [];
  sellBuyObj: any = [];
  LaborOccupList: any = [];
  LaborOccupObj: any = [];
  IndustryList: any = [];
  IndustryObj: any = [];
  ContractingList: any = [];
  ContractingObj: any = [];
  InvstRealEstList: any = [];
  InvstRealEstObj: any = [];
  HotelsObj: any = [];
  HotelsList: any = [];
  EduHealthObj: any = [];
  EduHealthList: any = [];
  PoultryList: any = [];
  PoultryObj: any = [];
  CarsObj: any = [];
  CarsList: any = [];
  MineralsList: any = [];
  MineralsObj: any = [];
  AdditionalList: any = [];
  AdditionalObj: any = [];
  submitdataObj: any = [];
  amendReturn: boolean = false;
  fbGuid: number;
  Euser: number;
  checked: boolean = true;
  ImportsShow: boolean = true;
  importsInternalShow = true;
  Form5Form: FormGroup;
  CabsExpenses: FormGroup;
  ProfExpenses: FormGroup;
  SellBuyExpenses: FormGroup;
  LabourExpenses: FormGroup;
  InvstRealExpenses: FormGroup;
  HotelsExpenses: FormGroup;
  EduHealthExpenses: FormGroup;
  AdditionalExpenses: FormGroup;
  Form5FormTrading: FormGroup;
  fieldsExample: FormArray;
  fields: FormArray;
  fields1: FormArray;
  fields2: FormArray;
  fields3: FormArray;
  fields4: FormArray;
  fields5: FormArray;
  fields6: FormArray;
  fields7: FormArray;
  fields8: FormArray;
  fields9: FormArray;
  fields10: FormArray;
  fields11: FormArray;
  fields12: FormArray;
  NoOfAddedForms: number = 1;
  NoOfFormsAdded: number = 1;
  Form5FormPro: FormGroup;
  Form5FormSell: FormGroup;
  Form5LaborOccup: FormGroup;
  Form5Industry: FormGroup;
  Form5Contracting: FormGroup;
  Form5Invst: FormGroup;
  Form5Hotels: FormGroup;
  Form5Health: FormGroup;
  Form5Poultry: FormGroup;
  Form5Cars: FormGroup;
  Form5Minerals: FormGroup;
  typeIndex: number;
  Form5Additional: FormGroup;
  action: string = 'FillManually';
  expensesObj: any = [];
  Amount: number;
  totalCabsExpensesvalue: number = 0;
  totalProfExpensesvalue: number = 0;
  totalSellBuyExpensesvalue: number = 0;
  totalLabourExpensesvalue: number = 0;
  totalInvstRealExpensesvalue: number = 0;
  totalHotelsExpensesvalue: number = 0;
  totalEduHealthExpensesvalue: number = 0;
  totalAmountOfProfit: number = 0;
  dropdownObj: any = [];
  descriptiondrpdown: any = [];
  generalTradingObj1: any = [];
  generalTradingObj2: any = [];
  generalTradingObj3: any = [];
  generalTradingObj6: any = [];
  generalTradingObj7: any = [];
  generalTradingObj8: any = [];
  IncreaseCapitalObj: any = [];
  description_GP03_26set: any = [];
  description_GP03_37set: any = [];
  description_GP03_48set: any = [];
  subdescription_GP03_26set: any = [];
  subdescription1: any = [];
  subdescription2: any = [];
  subdescription3: any = [];
  subdescription_GP03_37set: any = [];
  subdescription_GP03_48set: any = [];
  ValueOfSupplyContObj: any = [];
  GovernmentContProfitsObj: any = [];
  ProfitCivilContractingObj: any = [];
  otherIncomeObj: any = [];
  selectedDes: string;
  fieldsTr1: FormArray;
  fieldsTr2: FormArray;
  fieldsTr3: FormArray;
  fieldsTr4: FormArray;
  fieldsTr5: FormArray;
  fieldsTr6: FormArray;
  Form5FormTrading1: FormGroup;
  Form5FormTrading2: FormGroup;
  Form5FormTrading3: FormGroup;
  Form5FormTrading4: FormGroup;
  Form5FormTrading5: FormGroup;
  Form5FormTrading6: FormGroup;
  Form5FormProfitModel1: FormGroup;
  Form5FormProfitModel2: FormGroup;
  Form5FormProfitModel3: FormGroup;
  fieldsProfit1: FormArray;
  fieldsProfit2: FormArray;
  fieldsProfit3: FormArray;
  Form5FormCapitalModel: FormGroup;
  fieldsCapital: FormArray;
  tinNumbers: any = [];
  totValue1: number;
  totProfit1: number;
  totValue2: number;
  totProfit2: number;
  totValue3: number;
  totProfit3: number;
  totValue4: number;
  totProfit4: number;
  totValue5: number;
  totProfit5: number;
  totValue6: number;
  totProfit6: number;
  ProfitRatio1: number;
  ProfitRatio2: number;
  ProfitRatio3: number;
  ProfitRatio4: number;
  ProfitRatio5: number;
  ProfitRatio6: number;
  TotalIncreaseinCapital: number;
  TotalLoanValue: number;
  IncreaseinCapitalratio: number;
  value: number;
  totalContractValue: number;
  totalStipendContractvalue: number;
  totalProfitsofContract: number;
  ProfitsoftheContractvalue: number;
  totalContractValue1: number;
  totalStipendContractvalue1: number;
  totalProfitsofContract1: number;
  ProfitsoftheContractvalue1: number;
  totalContractValue2: number;
  totalStipendContractvalue2: number;
  totalProfitsofContract2: number;
  ProfitsoftheContractvalue2: number;
  profExpensesObj: any = [];
  sellBuyExpensesObj: any = [];
  laborOccupExpensesObj: any = [];
  invstRealEstExpensesObj: any = [];
  hotelsExpensesObj: any = [];
  eduHealthExpensesObj: any = [];
  cabsExpensesObj: any = [];
  totalcabExpensesvalue: number;
  ActivityDetailsObj: any = [];
  ActivityDetailsCabsObj: any = [];
  ActivityDetailsProfObj: any = [];
  ActivityDetailsSellBuyObj: any = [];
  ActivityDetailsLabourObj: any = [];
  ActivityDetailsIndustryObj: any = [];
  ActivityDetailsContractingObj: any = [];
  ActivityDetailsInvstRealObj: any = [];
  ActivityDetailsHotelsObj: any = [];
  ActivityDetailsEduHealthObj: any = [];
  ActivityDetailsPoultryObj: any = [];
  ActivityDetailsCarsObj: any = [];
  ActivityDetailsMineralsObj: any = [];
  fieldsCabs: FormArray;
  fieldsProf: FormArray;
  fieldsSell: FormArray;
  fieldsLabour: FormArray;
  fieldsInd: FormArray;
  fieldsContract: FormArray;
  fieldsInvst: FormArray;
  fieldsHotels: FormArray;
  fieldsEdu: FormArray;
  fieldsPoultry: FormArray;
  fieldsCars: FormArray;
  fieldsMinerels: FormArray;
  fieldsAdditional: FormArray;
  additionalInfoModalObj: any = [];
  ButtonsObj: any = [];
  ZakatAmountObj: any = [];
  invoiseSet: any = [];
  tokensList: any = [];
  SadadBillNumber: any = [];
  TotalZakatPayable: any = [];
  AgreeClick: boolean = false;
  periodStartDate: any;
  periodEndDate: any;
  serviceStarts: boolean = true;
  disableInputs: boolean = false;
  titleText:any;
  downloadExcelbuttonTitle:any;
  cityList:any = [];
  periodStartDateDisplay:any;
  periodEndDateDisplay:any;

 TINNO = [
    {
   "Key" : "1",
   "Text" : "Tin No."
    },    
    {
   "Key" : "2",
   "Text" : "C/R No."
    }      
 ]
  constructor(private returnsService: ReturnsService, private vatService: VatServiceService, private fb: FormBuilder, private route: ActivatedRoute) {

  }

  ngOnInit(): void {   
   
    this.step = 1;
    if (localStorage.getItem("lang") === "ar") {
      this.lang = form5constants.langz.arb.form5;
      this.direction = form5constants.langz.arb.dir;
      this.language='ar';
      this.titleText="لم تقم باختيار ملف";
      this.downloadExcelbuttonTitle = "تحميل بصيغة إكسل"
    } else {
      this.lang = form5constants.langz.eng.form5;
      this.direction = form5constants.langz.eng.dir;
      this.language='en';
      this.titleText="No file chosen"
      this.downloadExcelbuttonTitle = "Download Excel Format"
    }

    // if (localStorage.getItem("lang") === "ar") {
    //   moment.locale('ar-Sa');
    // }
    // else {
      moment.locale('en-Us');
    // }

    //For Tab Active    
    if (localStorage.getItem("lang") === "ar") {
      localStorage.setItem("ActiveTab",JSON.stringify("الزكاة و ضريبة الدخل"));
      }else
      {
        localStorage.setItem("ActiveTab",JSON.stringify("Zakat & CIT"));
      }
    //For Tab Active end

    this.fbGuid = this.route.snapshot.params["fbGuid"];
    this.Euser = this.route.snapshot.params["euser"];
    this.GetUserDetails();
    this.getBasicInformation();

    this.CabsExpenses = this.fb.group({
      fields: this.fb.array([])
    });
    
    this.AdditionalExpenses = this.fb.group({
      fields: this.fb.array([])
    });


    this.ProfExpenses = this.fb.group({
      fields: this.fb.array([])
    });

    this.SellBuyExpenses = this.fb.group({
      fields: this.fb.array([])
    });

    this.LabourExpenses = this.fb.group({
      fields: this.fb.array([])
    });

    this.InvstRealExpenses = this.fb.group({
      fields: this.fb.array([])
    });

    this.HotelsExpenses = this.fb.group({
      fields: this.fb.array([])
    });

    this.EduHealthExpenses = this.fb.group({
      fields: this.fb.array([])
    });

    this.Form5FormCapitalModel = this.fb.group({
      fields: this.fb.array([])
    });

    this.Form5FormProfitModel1 = this.fb.group({
      fields: this.fb.array([])
    });

    this.Form5FormProfitModel2 = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormProfitModel3 = this.fb.group({
      fields: this.fb.array([])
    });

    this.Form5FormTrading1 = this.fb.group({
      fields: this.fb.array([])
    });

    this.Form5FormTrading2 = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormTrading3 = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormTrading4 = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormTrading5 = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormTrading6 = this.fb.group({
      fields: this.fb.array([])
    });

    this.Form5Form = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormPro = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5FormSell = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5LaborOccup = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Industry = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Contracting = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Invst = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Hotels = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Health = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Poultry = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Cars = this.fb.group({
      fields: this.fb.array([])
    });
    this.Form5Minerals = this.fb.group({
      fields: this.fb.array([])
    });
    // this.Form5Additional = this.fb.group({	
    //   fields: this.fb.array([])      	
    // });


    this.Form5Additional = this.fb.group({
      'ShareinCompany': ['0.00', [Validators.required]],
      'ZakatBase': ['0.00', [Validators.required]],
      'noOfBranch': [0, [Validators.required]],
      'noOfEmployees': [0, [Validators.required]],
      'Yearlyrent': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'TotalofAnnualSalary': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'ScheduleAdditional': [false]
    });
  }


  get Types(): FormArray {
    return this.Form5Form.get('Types') as FormArray;
  }

  //formgroup for Cabs Expenses Schedule
  addCabsForm():FormGroup {
    return this.fb.group({
      'Description1': ['', [Validators.required]],
      'Amount1': ['0.00', [Validators.required]]
    });
  }

  //formgroup of professional expenses schedule
  addProfExpensesForm():FormGroup {
    return this.fb.group ({
      'Description2':['',[Validators.required]],
      'Amount2':['0.00',[Validators.required]]
    });
  }

  //FormGroup for SellBuy Expenses Schedule
  addSellBuyExpensesForm():FormGroup {
    return this.fb.group ({
      'Description3':['',[Validators.required]],
      'Amount3':['0.00',[Validators.required]]
    });
  }

  //FormGroup for Labour Expenses schedule 
  addLabourExpensesForm():FormGroup {
    return this.fb.group ({
      'Description4':['',[Validators.required]],
      'Amount4':['0.00',[Validators.required]]
    })
  }

  //FormGroup for InvstReal Expenses Schedule
  addInstRealExpensesForm():FormGroup {
    return this.fb.group ({
      'Description5':['',[Validators.required]],
      'Amount5':['0.00',[Validators.required]]
    });
  }
  //FormGroup for Hotels Expenses Schedule
  addHotelsExpensesForm():FormGroup {
    return this.fb.group ({
      'Description6':['',[Validators.required]],
      'Amount6':['0.00',[Validators.required]]
    });
  }

  //FormGroup for EduHealth Expenses Schedule 
  addEduHealthExpensesForm():FormGroup {
    return this.fb.group ({
      'Description7':['',[Validators.required]],
      'Amount7':['0.00',[Validators.required]]
    });
  }

  // //FormGroup for Additional Schedule
  addAdditionalScheduleForm():FormGroup {
    return this.fb.group ({
      'Tin':['',[Validators.required]],
      'Name':['',[Validators.required]],
      'AmountOfProfit':['0.00',[Validators.required]]

    });
  }

  addForm(i): FormGroup {
    return this.fb.group({
      // 'outletTitle':[0,[Validators.required]],
      'outletName': ['', [Validators.required]],
      'noofCars': [0, [Validators.required,Validators.min(0),Validators.max(9999.00)]],
      'avgDailyIncome': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'OccupancyRate': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'NetProfit': ['0.00', [Validators.required]],
      'Revenue': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      "NetProfitSAR": ['0.00', [Validators.required]],
      'Expenses': ['0.00', [Validators.required]],
      "ScheduleCabs": [false],
      'profitratio': ['0.00', [Validators.min(0),Validators.max(100)]],
      'sales': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'Capital': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'salesProfitratio': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'Description1': [''],
      'Amount1': ['0.00', [Validators.required]],
      'Description2': [''],
      'Amount2': ['0.00', [Validators.required]],
      'Description3': [''],
      'Amount3': ['0.00', [Validators.required]],
      'Description4': [''],
      'Amount4': ['0.00', [Validators.required]],
      'Description5': [0, [Validators.required]],
      'Amount5': ['0.00', [Validators.required]],
      'Description6': [''],
      'Amount6': ['0.00', [Validators.required]],
      'Description7': [''],
      'Amount7': ['0.00', [Validators.required]],
      'Tin': [''],
      'Name': [''],
      'AmountOfProfit': ['0.00', [Validators.required]]

    });
  }

  addForm1(i): FormGroup {
    return this.fb.group({
      'outletName1': ['', [Validators.required]],
      'Revenue1': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'Expenses1': ['0.00', [Validators.required]],
      "ScheduleProf": [false],
      'NetProfit1': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]]
    });
  }
  addForm2(i): FormGroup {
    return this.fb.group({
      'outletName': ['', [Validators.required]],
      'Expenses': ['0.00', [Validators.required]],
      'profitratio': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'sales': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'Capital': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'salesProfitratio': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'Revenue': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'NoofLabours': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999.00)]],
      'NetProfit': ['0.00', [Validators.required]],
      'FundingTotal': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'DeclaredCapital': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'Sales': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'ProfitSAR': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'GovernmentCont': ['0.00', [Validators.required]],
      'ProfitfromCivil': ['0.00', [Validators.required]],
      'OtherProfit': ['0.00', [Validators.required]],
      'totalProfits': ['0.00', [Validators.required]],
      'City': [''],
      'NoofRooms': [0, [Validators.required,Validators.min(0),Validators.max(9999.00)]],
      'RoomRate': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'AddRoomRate': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'ServiceFees': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'OccupancyRate': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'Ownedyou': ['', [Validators.required]],
      'ValueofSubsidy': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'IncreaseinCapital': ['0.00', [Validators.required]],
      'Capitalrate': ['0.00', [Validators.required]],
      'Profit': ['0.00', [Validators.required]],
      'InternalProcurement': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'Imports': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'SalesMin': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'ShareCapital': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'Percentagesales': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'Percentagesalesgain': ['0.00', [Validators.required,Validators.min(0),Validators.max(100)]],
      'ShareCapitalmineral': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'noOfBranch': [0, [Validators.required]],
      'noOfEmployees': [0, [Validators.required]],
      'Yearlyrent': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'TotalofAnnualSalary': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'ShareinCompany': ['0.00', [Validators.required]],
      'ZakatBase': ['0.00', [Validators.required,Validators.min(0),Validators.max(999999999999.00)]],
      'ImportsforGeneralTrading': ['0.00', [Validators.required]],
      'ImportsforLivelihoods': ['0.00', [Validators.required]],
      'ImportsforLivestock': ['0.00', [Validators.required]],
      'TotalofImports': ['0.00', [Validators.required]],
      'GeneralTradingInternal': ['0.00', [Validators.required]],
      'LivelihoodsInternal': ['0.00', [Validators.required]],
      'LivestockAnimals': ['0.00', [Validators.required]],
      'TotalProfits': ['0.00', [Validators.required]],
      "ScheduleBuy": [false],
      "ScheduleLabourOccup": [false],
      "ScheduleGovProfits": [false],
      "ScheduleProfitfromCivil": [false],
      "ScheduleOtherProfit": [false],
      "ScheduleHotels": [false],
      "ScheduleInvst": [false],
      "ScheduleHealth": [false],
      'SchedulePoultry': [false],
      'ScheduleLiveStock': [false],
      'ScheduleLivelihoods': [false],
      'ScheduleGentrInt': [false],
      'ScheduleIntProcurement': [false],
      'ScheduleImpLivestock': [false],
      'ScheduleImpLivelihoods': [false],
      'ScheduleImpGeneralTrade': [false],
      'ScheduleHaveImports': [false],

    });
  }

  addFormTr(i): FormGroup {
    return this.fb.group({
      "LineNo": [i],
      'description1': ['', [Validators.required]],
      'subdescription1': ['', [Validators.required]],
      'tradingValue': ['0.00', [Validators.required]],
      'tradingProfit': ['0.00', [Validators.required]],
      'tradingProfitRatio': ['0.00', [Validators.required]],
    });
  }

  addFormProfit(i): FormGroup {
    return this.fb.group({
      'identificationType': ['', [Validators.required]],
      'AmountofContractingParty': ['0.00', [Validators.required]],
      'ContractingPartyName': ['', [Validators.required]],
      'Description': ['', [Validators.required]],
      'ContractValue': ['0.00', [Validators.required]],
      'StipendContract': ['0.00', [Validators.required]],
      'ProfitsofContract': ['0.00', [Validators.required]],
      'ContractValue1': ['', [Validators.required]],
      'StipendContract1': ['0.00', [Validators.required]],
      'ProfitsofContract1': ['0.00', [Validators.required]],
      'govCode': ['', [Validators.required]],

    });
  }

  addFormProfitGov(): FormGroup {
    return this.fb.group({
      'govCode': ['', [Validators.required]],
      'Description': ['', [Validators.required]],
      'ContractValue': ['0.00', [Validators.required]],
      'StipendContract': ['0.00', [Validators.required]],
      'ProfitsofContract': ['0.00', [Validators.required]]
    });
  }

  addFormProfitCivil(): FormGroup {
    return this.fb.group({
      'identificationType': ['', [Validators.required]],
      'AmountofContractingParty': ['', [Validators.required]],
      'ContractingPartyName': ['', [Validators.required]],
      'Description': ['', [Validators.required]],
      'ContractValue1': ['', [Validators.required]],
      'StipendContract1': ['0.00', [Validators.required]],
      'ProfitsofContract1': ['0.00', [Validators.required]]
    });
  }

  addFormProfitOther(): FormGroup {
    return this.fb.group({
      'Description': ['', [Validators.required]],
      'ContractValue': ['0.00', [Validators.required]],
      'StipendContract': ['0.00', [Validators.required]],
      'ProfitsofContract': ['0.00', [Validators.required]]
    });
  }

  addFormCapital(): FormGroup {
    return this.fb.group({
      'Description': ['', [Validators.required]],
      'DateofLoan': ['', [Validators.required]],
      'LastDayofBillingPeriod': [this.periodEndDate.hd+"-"+this.periodEndDate.hm+"-"+this.periodEndDate.hy , [Validators.required]],
      'LoanValue': ['0.00', [Validators.required]],
      'IncreaseinCapital': ['0.00', [Validators.required]],
      'NumberofYears': ['', [Validators.required]],
      // 'identificationType': ['', [Validators.required]],
      // 'AmountofContractingParty': ['0.00', [Validators.required]],
      // 'ContractingPartyName': ['', [Validators.required]],

    });
  }

   GetUserDetails() {
    this.vatService.getVatData().subscribe(
      (res) => {
        console.log("resdata", res["d"]);
        this.usersObject = res["d"]; 
      console.log("this.usersObject", this.usersObject);
       
      },
    );
  }

  status:any;
  statusOfReturn:any;
  getBasicInformation() {
    this.returnsService.getBasicInformation(this.fbGuid, this.Euser).subscribe((data) => {
      this.basicInformationObj = data["d"];
      // console.log("this.basicInformationObj", this.basicInformationObj);
      moment.locale('en-Us');

      this.periodStartDate = this.basicInformationObj.AFromDt;
      this.periodEndDate = this.basicInformationObj.AToDt;
      console.log(this.basicInformationObj.PeriodKeyz);
      if (this.basicInformationObj.ACalendarTp == 'H') {
      
        this.periodStartDate = (toHijri(+(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('MM')), (+moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD'))));
        this.periodEndDate = (toHijri(+(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('YYYY')), +(moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('MM')), (+moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD'))));
        console.log('Dates',this.periodStartDate,this.periodEndDate);
        this.periodStartDateDisplay = this.periodStartDate.hy+"/"+(+this.periodStartDate.hm<10?"0"+this.periodStartDate.hm:this.periodStartDate.hm)+"/"+(+this.periodStartDate.hd<10?"0"+this.periodStartDate.hd:this.periodStartDate.hd);
        this.periodEndDateDisplay = this.periodEndDate.hy+"/"+(+this.periodEndDate.hm<10?"0"+this.periodEndDate.hm:this.periodEndDate.hm)+"/"+(+this.periodEndDate.hd<10?"0"+this.periodEndDate.hd:this.periodEndDate.hd);
      }
      else {
        this.periodStartDate = moment(new Date(+(((this.periodStartDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');

        this.periodEndDate = moment(new Date(+(((this.periodEndDate).toString().replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', ''))).format('DD/MM/YYYY');

      }
      this.financialInfo();
      if(this.basicInformationObj.AResidency == 'Resident' || this.basicInformationObj.AResidency == 'مقيم'){
        this.status = this.language == 'en'?"Resident (living in Saudi Arabia)":"Resident (living in Saudi Arabia)";
      }else{
        this.status = this.basicInformationObj.AResidency;
      }
      if(this.basicInformationObj.Status == "IP014"){
        this.step = 2;
        if (this.language == 'ar') {
          this.statusOfReturn = "فاتورة";
        }
        else {
          this.statusOfReturn = "Billed";
        }
      }
      setTimeout(() => {
          this.serviceStarts = false;
        },1000);

    })
  }

  dropdownBinding() {
    // this.lang
    this.returnsService.getDropdownData(this.usersObject.Langz).subscribe((data) => {
      this.dropdownObj = data["d"];
      // console.log("dropdownObj",this.dropdownObj);

      this.descriptiondrpdown = this.dropdownObj["zmain_descSet"]["results"];
      // console.log("descriptiondrpdown",this.descriptiondrpdown);

      this.description_GP03_26set = this.descriptiondrpdown.filter(data => {
        return data['Gensch'] == "G"
      });
      console.log("description_GP03_26set filterrrrrrrrrrrrrr",this.description_GP03_26set);

      this.description_GP03_37set = this.descriptiondrpdown.filter(data => {
        return data['Livsch'] == "L"
      });

      this.description_GP03_48set = this.descriptiondrpdown.filter(data => {
        return data['Lstsch'] == "A"
      });

      this.subdescription_GP03_26set = this.dropdownObj["zsub_desc_A61Set"]["results"];
      console.log("subdescription_GP03_26set", this.subdescription_GP03_26set);

      this.subdescription_GP03_37set = this.dropdownObj["zsub_desc_A60Set"]["results"];
      // console.log("subdescription_GP03_37set", this.subdescription_GP03_37set);

      this.subdescription_GP03_48set = this.dropdownObj["zsub_desc_A62Set"]["results"];
      // console.log("subdescription_GP03_48set", this.subdescription_GP03_48set);

      this.cityList = this.dropdownObj["zcitySet"]["results"];

    })
  }

  
  onDesciptionSelect() {

    // this.selectedDes = this.Form5FormTrading1.value.description1;
    // console.log("event",event.target.value);
    this.fieldsTr1 = this.Form5FormTrading1.get('fields') as FormArray;
    console.log("fieldsTr1",this.fieldsTr1);

    // this.selectedDes = this.fields.controls[0].value.description1;
    // console.log("selectedDes", this.selectedDes);

    this.subdescription_GP03_26set = this.subdescription1.filter(data => {
      return data['Desciption'] == this.selectedDes
    });

  }

  financialInfo() {
    this.returnsService.getBasicInformation(this.fbGuid, this.Euser).subscribe((data) => {
      console.log('DATA',data);
      this.financialcabsList = data["d"]["SCH_GP01"]["results"];
      console.log('data',this.financialcabsList);
      this.financialcabsObj = data["d"];

      this.financialProffList = data["d"]["SCH_GP02"]["results"];
      this.financialProffObj = data["d"];
      this.sellBuyList = data["d"]["SCH_GP03"]["results"];
      this.sellBuyObj = data["d"];
      this.LaborOccupList = data["d"]["SCH_GP04"]["results"];
      this.LaborOccupObj = data["d"];
      this.IndustryList = data["d"]["SCH_GP05"]["results"];
      this.IndustryObj = data["d"];
      this.ContractingList = data["d"]["SCH_GP06"]["results"];
      console.log('minerals',this,this.ContractingList);
      this.ContractingObj = data["d"];
      this.InvstRealEstList = data["d"]["SCH_GP07"]["results"];
      this.InvstRealEstObj = data["d"];
      this.HotelsList = data["d"]["SCH_GP08"]["results"];
      this.HotelsObj = data["d"];
      this.EduHealthList = data["d"]["SCH_GP09"]["results"];
      this.EduHealthObj = data["d"];
      this.PoultryList = data["d"]["SCH_GP10"]["results"];
      this.PoultryObj = data["d"];
      this.CarsList = data["d"]["SCH_GP11"]["results"];
      this.CarsObj = data["d"];
      this.MineralsList = data["d"]["SCH_GP12"]["results"];
      
      this.MineralsObj = data["d"];
      this.AdditionalList = data["d"];
      this.AdditionalObj = data["d"];

      //console.log("AdditionalList", this.AdditionalList);

      this.ValueOfSupplyContObj = data["d"]["GEN_SUB_SCH"]["results"];
      this.GovernmentContProfitsObj = data["d"]["GP06_1Set"]["results"];
      this.ProfitCivilContractingObj = data["d"]["GP06_2Set"]["results"];
      this.otherIncomeObj = data["d"]["GP06_2Set"]["results"];
      this.generalTradingObj1 = data["d"]["GP03_2Set"]["results"];
      this.generalTradingObj2 = data["d"]["GP03_3Set"]["results"];
      this.generalTradingObj3 = data["d"]["GP03_4Set"]["results"];
      this.generalTradingObj6 = data["d"]["GP03_6Set"]["results"];
      this.generalTradingObj7 = data["d"]["GP03_7Set"]["results"];
      this.generalTradingObj8 = data["d"]["GP03_8Set"]["results"];
      this.IncreaseCapitalObj = data["d"]["SUB_SCH_CAPITALSet"]["results"];
      this.expensesObj = data["d"]["GEN_SUB_SCH"]["results"];
      // console.log("expensesObj filterrrr",this.expensesObj);
      console.log("hihello",this.expensesObj)
      this.cabsExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP01";
      });
      // console.log("cabsExpensesObj filterrrr",this.cabsExpensesObj);

      this.profExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP02";
      });
      console.log("profExpensesObj ",this.profExpensesObj);

      this.sellBuyExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP03";
      });
      // console.log("sellBuyExpensesObj ",this.sellBuyExpensesObj);

      this.laborOccupExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP04";
      });
      // console.log("laborOccupExpensesObj ",this.laborOccupExpensesObj);

      this.invstRealEstExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP07";
      });
      // console.log("invstRealEstExpensesObj ",this.invstRealEstExpensesObj);

      this.hotelsExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP08";
      });
      this.eduHealthExpensesObj = this.expensesObj.filter(data => {
        return data['GrpNm'] == "GP09";
      });
      this.additionalInfoModalObj = data["d"]["SCH_200Set"]["results"];
      //  console.log("this.cabsExpensesObj ",this.cabsExpensesObj )


      // this.view()
    })

  }


  ContinueBasicInfo(basicInfoObj) {
    this.step = 3;
    // this.financialInfo();
    this.ReadOnlyDataBind();
  }


  ReadOnlyDataBind() {
    // this.step = 3;
    window.scrollTo(0, 0);
    this.financialInfo();
    this.disableInputs = true;

    if ((this.Form5FormSell.get('fields') as FormArray).controls['ScheduleHaveImports'] == true) {
      this.ImportsShow = true;
    } else {
      this.ImportsShow = false;

    }

    if ((this.Form5FormSell.get('fields') as FormArray).controls['ScheduleIntProcurement'] == true) {
      this.importsInternalShow = true;
    } else {
      this.importsInternalShow = false;

    }

    this.FormsSet();
    this.BindGeneralTrading();
    this.dropdownBinding();
    this.CabsExpensesCalculations();
    this.ProfExpensesCalculations();
    this.Form5ProfitCalculations();
    this.SellBuyExpensesCalculations();
    this.LabourExpensesCalculations();
    this.InvstRealExpensesCalculations();
    this.Form5CapitalCalculations();
    this.EduHealthExpensesCalculations();
    this.HotelsExpensesCalculations();
    this.Form5TradingCalculations();
    this.AdditionalInfoCalculations();

    this.fields = this.Form5Form.get('fields') as FormArray;
    for(let i=0;i<this.fields.length;i++){
      this.fields.value[i].Expenses>0? this.fields.controls[i].patchValue({'ScheduleCabs':true}):this.fields.controls[i].patchValue({'ScheduleCabs':false});
    }
    
    this.fields = this.Form5FormPro.get('fields') as FormArray;
    for(let j=0;j<this.fields.length;j++){
      this.fields.value[j].Expenses1>0? this.fields.controls[j].patchValue({'ScheduleProf':true}):this.fields.controls[j].patchValue({'ScheduleProf':false});
    }
    
  
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    for(let k=0;k<this.fields.length;k++){
      this.fields.value[k].Expenses>0? this.fields.controls[k].patchValue({'ScheduleBuy':true}):this.fields.controls[k].patchValue({'ScheduleBuy':false});
    }
   

    this.fields = this.Form5LaborOccup.get('fields') as FormArray;
    for(let l=0;l<this.fields.length;l++) {
      this.fields.value[l].Expenses>0? this.fields.controls[l].patchValue({'ScheduleLabourOccup':true}):this.fields.controls[l].patchValue({'ScheduleLabourOccup':false});
    }
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.value[0].GovernmentCont>0? this.fields.controls[0].patchValue({'ScheduleGovProfits':true}):this.fields.controls[0].patchValue({'ScheduleGovProfits':false});
    this.fields.value[0].ProfitfromCivil>0? this.fields.controls[0].patchValue({'ScheduleProfitfromCivil':true}):this.fields.controls[0].patchValue({'ScheduleProfitfromCivil':false});
    this.fields.value[0].OtherProfit>0? this.fields.controls[0].patchValue({'ScheduleOtherProfit':true}):this.fields.controls[0].patchValue({'ScheduleOtherProfit':false});

    this.fields = this.Form5Invst.get('fields') as FormArray;
    for(let m=0;m<this.fields.length;m++){
      this.fields.value[m].Expenses>0? this.fields.controls[m].patchValue({'ScheduleInvst':true}):this.fields.controls[m].patchValue({'ScheduleInvst':false});
    }
    this.fields = this.Form5Hotels.get('fields') as FormArray;
    for(let n=0;n<this.fields.length;n++){
      this.fields.value[n].Expenses>0? this.fields.controls[n].patchValue({'ScheduleHotels':true}):this.fields.controls[n].patchValue({'ScheduleHotels':false});
    }
    this.fields = this.Form5Health.get('fields') as FormArray;
    for(let o=0;o<this.fields.length;o++){
      this.fields.value[o].Expenses>0? this.fields.controls[o].patchValue({'ScheduleHealth':true}):this.fields.controls[o].patchValue({'ScheduleHealth':false});
    }
    
   
    this.fields = this.Form5Poultry.get('fields') as FormArray;
    console.log(" this.fields  capital poultry............", this.fields );
    console.log(" this.fields.controls['IncreaseinCapital']", this.fields.value[0].IncreaseinCapital)
    for(let p=0;p<this.fields.length;p++){
      this.fields.value[p].IncreaseinCapital>0? this.fields.controls[p].patchValue({'SchedulePoultry':true}):this.fields.controls[p].patchValue({'SchedulePoultry':false});
    }
    
 
    // this.fields = this.Form5Poultry.get('fields') as FormArray;
    // this.fields.controls['IncreaseinCapital']>0? this.fields.controls[0].patchValue({'SchedulePoultry':true}):this.fields.controls[0].patchValue({'SchedulePoultry':false});
 
 
 
  }


  amendValues() {
    this.step = 3;
    this.financialInfo();
    this.amendReturn = true;
    this.disableInputs = false;

    if ((this.Form5FormSell.get('fields') as FormArray).controls['ScheduleHaveImports'] == true) {
      this.ImportsShow = true;
    } else {
      this.ImportsShow = false;

    }

    if ((this.Form5FormSell.get('fields') as FormArray).controls['ScheduleIntProcurement'] == true) {
      this.importsInternalShow = true;
    } else {
      this.importsInternalShow = false;

    }
    this.addformSet();
    // this.FormsSet();
    // this.BindGeneralTrading();
    // this.dropdownBinding();
    // this.CabsExpensesCalculations();
    // this.ProfExpensesCalculations();
    // this.Form5ProfitCalculations();
    // this.SellBuyExpensesCalculations();
    // this.LabourExpensesCalculations();
    // this.InvstRealExpensesCalculations();
    // this.Form5CapitalCalculations();
    // this.EduHealthExpensesCalculations();
    // this.HotelsExpensesCalculations();
    // this.Form5TradingCalculations();
    // this.AdditionalInfoCalculations();

    this.fields = this.Form5Form.get('fields') as FormArray;
    for(let i=0;i<this.fields.length;i++){
      this.fields.value[i].Expenses>0? this.fields.controls[i].patchValue({'ScheduleCabs':true}):this.fields.controls[i].patchValue({'ScheduleCabs':false});
    }
    
    this.fields = this.Form5FormPro.get('fields') as FormArray;
    for(let j=0;j<this.fields.length;j++){
      this.fields.value[j].Expenses1>0? this.fields.controls[j].patchValue({'ScheduleProf':true}):this.fields.controls[j].patchValue({'ScheduleProf':false});
    }
    
  
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    for(let k=0;k<this.fields.length;k++){
      this.fields.value[k].Expenses>0? this.fields.controls[k].patchValue({'ScheduleBuy':true}):this.fields.controls[k].patchValue({'ScheduleBuy':false});
    }
   

    this.fields = this.Form5LaborOccup.get('fields') as FormArray;
    for(let l=0;l<this.fields.length;l++) {
      this.fields.value[l].Expenses>0? this.fields.controls[l].patchValue({'ScheduleLabourOccup':true}):this.fields.controls[l].patchValue({'ScheduleLabourOccup':false});
    }
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.value[0].GovernmentCont>0? this.fields.controls[0].patchValue({'ScheduleGovProfits':true}):this.fields.controls[0].patchValue({'ScheduleGovProfits':false});
    this.fields.value[0].ProfitfromCivil>0? this.fields.controls[0].patchValue({'ScheduleProfitfromCivil':true}):this.fields.controls[0].patchValue({'ScheduleProfitfromCivil':false});
    this.fields.value[0].OtherProfit>0? this.fields.controls[0].patchValue({'ScheduleOtherProfit':true}):this.fields.controls[0].patchValue({'ScheduleOtherProfit':false});

    this.fields = this.Form5Invst.get('fields') as FormArray;
    for(let m=0;m<this.fields.length;m++){
      this.fields.value[m].Expenses>0? this.fields.controls[m].patchValue({'ScheduleInvst':true}):this.fields.controls[m].patchValue({'ScheduleInvst':false});
    }
    this.fields = this.Form5Hotels.get('fields') as FormArray;
    for(let n=0;n<this.fields.length;n++){
      this.fields.value[n].Expenses>0? this.fields.controls[n].patchValue({'ScheduleHotels':true}):this.fields.controls[n].patchValue({'ScheduleHotels':false});
    }
    this.fields = this.Form5Health.get('fields') as FormArray;
    for(let o=0;o<this.fields.length;o++){
      this.fields.value[o].Expenses>0? this.fields.controls[o].patchValue({'ScheduleHealth':true}):this.fields.controls[o].patchValue({'ScheduleHealth':false});
    }
    
   
    this.fields = this.Form5Poultry.get('fields') as FormArray;
    console.log(" this.fields  capital poultry............", this.fields );
    console.log(" this.fields.controls['IncreaseinCapital']", this.fields.value[0].IncreaseinCapital)
    for(let p=0;p<this.fields.length;p++){
      this.fields.value[p].IncreaseinCapital>0? this.fields.controls[p].patchValue({'SchedulePoultry':true}):this.fields.controls[p].patchValue({'SchedulePoultry':false});
    }
    // this.fields = this.Form5Poultry.get('fields') as FormArray;
    // this.fields.controls['IncreaseinCapital']>0? this.fields.controls[0].patchValue({'SchedulePoultry':true}):this.fields.controls[0].patchValue({'SchedulePoultry':false});
 
 
 
  }

  addformSet() {
    const field1 = this.CabsExpenses.get('fields') as FormArray
    if (this.cabsExpensesObj.length == 0 && field1.controls.length == 0) {
      let i;
      this.onAddFormCabs(i)
    }
    else {
      this.BindGeneralTrading();
    }
    const field2 = this.ProfExpenses.get('fields') as FormArray;
    if (this.profExpensesObj.length == 0 && field2.controls.length==0) {
      let i;
      this.onAddFormProf(i)
    }
    else {
      this.BindGeneralTrading();
    }
    const forms = this.SellBuyExpenses.get('fields') as FormArray;
    if (forms.controls.length == 0) {
      let i;
      this.onAddFormSellBuy(i)
    }
    else {
      this.BindGeneralTrading();
    }
    const laborOccupExpensesObjforms = this.LabourExpenses.get('fields') as FormArray;
    if (laborOccupExpensesObjforms.controls.length == 0 && this.laborOccupExpensesObj.lenght == 0) {
      let i;
      this.onAddFormLabour(i)
    }
    else {
      this.BindGeneralTrading();
    }
    const invstRealEstExpForms = this.InvstRealExpenses.get('fields') as FormArray;
    if (this.invstRealEstExpensesObj.length == 0 && invstRealEstExpForms.controls.length == 0) {
      let i;
      this.onAddFormInvstReal(i)
    }
    else {
      this.BindGeneralTrading();
    }
    const hotelsExpensesForms = this.HotelsExpenses.get('fields') as FormArray;
    if (this.hotelsExpensesObj.length == 0 && hotelsExpensesForms.controls.length == 0) {
      let i;
      this.onAddFormHotels(i)
    }
    else {
      this.BindGeneralTrading();
    }
    const eduHealthExpensesforms = this.EduHealthExpenses.get('fields') as FormArray;
    if (this.eduHealthExpensesObj.length == 0 && eduHealthExpensesforms.controls.length == 0) {
      let i;
      this.onAddFormEduHealth(i)
    }
    else {
      this.BindGeneralTrading();
    }
  }

  amendContinue() {
    this.step = 6;
    this.ConfirmSubmit();
  }

  review() {
    this.step = 4;
    this.fields = this.Form5Form.get('fields') as FormArray;
    this.fields1 = this.Form5FormPro.get('fields') as FormArray;
    this.fields2 = this.Form5FormSell.get('fields') as FormArray;
    this.fields3 = this.Form5LaborOccup.get('fields') as FormArray;
    this.fields4 = this.Form5Industry.get('fields') as FormArray;
    this.fields5 = this.Form5Contracting.get('fields') as FormArray;
    this.fields6 = this.Form5Invst.get('fields') as FormArray;
    this.fields7 = this.Form5Hotels.get('fields') as FormArray;
    this.fields8 = this.Form5Health.get('fields') as FormArray;
    this.fields9 = this.Form5Poultry.get('fields') as FormArray;
    this.fields10 = this.Form5Cars.get('fields') as FormArray;
    this.fields11 = this.Form5Minerals.get('fields') as FormArray;
    // this.fields12 = this.Form5Additional.get('fields') as FormArray;


    for (let j = 0; j < (this.fields.value).length; j++) {

      this.financialcabsObj["SCH_GP01"]["results"][j]['ActDesc'] = this.fields.value[j].outletName;
      this.financialcabsObj["SCH_GP01"]["results"][j]['NoOfCars'] = this.fields.value[j].noofCars;
      this.financialcabsObj["SCH_GP01"]["results"][j]['AgvDlyIncome'] = this.fields.value[j].avgDailyIncome;
      this.financialcabsObj["SCH_GP01"]["results"][j]['OccRate'] = this.fields.value[j].OccupancyRate;
      this.financialcabsObj["SCH_GP01"]["results"][j]['NetPftPer'] = this.fields.value[j].NetProfit;
      this.financialcabsObj["SCH_GP01"]["results"][j]['Revenue'] = this.fields.value[j].Revenue;
      this.financialcabsObj["SCH_GP01"]["results"][j]['NetPft'] = this.fields.value[j].NetProfitSAR;
      this.financialcabsObj["SCH_GP01"]["results"][j]['Expenses'] = this.fields.value[j].Expenses;

    }
    // console.log("  this.financialcabsObj",  this.financialcabsObj)
    this.financialcabsList = this.financialcabsObj["SCH_GP01"]["results"];

    for (let j = 0; j < (this.fields1.value).length; j++) {

      this.financialProffObj["SCH_GP02"]["results"][j]['ActDesc'] = this.fields1.value[j].outletName1;
      this.financialProffObj["SCH_GP02"]["results"][j]['Revenue'] = this.fields1.value[j].Revenue1;
      this.financialProffObj["SCH_GP02"]["results"][j]['Expenses'] = this.fields1.value[j].Expenses1;
      this.financialProffObj["SCH_GP02"]["results"][j]['NetPftPer'] = this.fields1.value[j].NetProfit1
    }
    this.financialProffList = this.financialProffObj["SCH_GP02"]["results"];
    // console.log(" financialProffList viewwwwwwwwwwwwwwwww",  this.financialProffList)
    //sell&Buy
    for (let j = 0; j < (this.fields2.value).length; j++) {

      this.sellBuyObj["SCH_GP03"]["results"][j]['ActDesc'] = this.fields2.value[j].outletName;
      this.sellBuyObj["SCH_GP03"]["results"][j]['Capital'] = this.fields2.value[j].Capital;
      this.sellBuyObj["SCH_GP03"]["results"][j]['Expenses'] = this.fields2.value[j].SuppCon;
      this.sellBuyObj["SCH_GP03"]["results"][j]['profitratio'] = this.fields2.value[j].ProfitRatio;
      this.sellBuyObj["SCH_GP03"]["results"][j]['sales'] = this.fields2.value[j].Sales;
      this.sellBuyObj["SCH_GP03"]["results"][j]['salesProfitratio'] = this.fields2.value[j].SalePrfRatio;

    }
    this.sellBuyList = this.sellBuyObj["SCH_GP03"]["results"];
    // console.log(" sellBuyList tttttttttttt",  this.sellBuyList)
    //Labor occu
    for (let j = 0; j < (this.fields3.value).length; j++) {

      this.LaborOccupObj["SCH_GP04"]["results"][j]['ActDesc'] = this.fields3.value[j].outletName;
      this.LaborOccupObj["SCH_GP04"]["results"][j]['NoOfLabour'] = this.fields3.value[j].NoofLabours;
      this.LaborOccupObj["SCH_GP04"]["results"][j]['Revenue'] = this.fields3.value[j].Revenue;
      this.LaborOccupObj["SCH_GP04"]["results"][j]['Expenses'] = this.fields3.value[j].Expenses;
      this.LaborOccupObj["SCH_GP04"]["results"][j]['NetProfit'] = this.fields3.value[j].NetProfit;
      // this.LaborOccupObj["SCH_GP04"]["results"][j]['salesProfitratio']=  this.fields3.value[j].SalePrfRatio;

    }
    this.LaborOccupList = this.LaborOccupObj["SCH_GP04"]["results"];

    //industry  
    for (let j = 0; j < (this.fields4.value).length; j++) {

      this.IndustryObj["SCH_GP05"]["results"][j]['ActDesc'] = this.fields4.value[j].outletName;
      this.IndustryObj["SCH_GP05"]["results"][j]['FundingTot'] = this.fields4.value[j].FundingTotal;
      this.IndustryObj["SCH_GP05"]["results"][j]['CapitalStr'] = this.fields4.value[j].DeclaredCapital;
      this.IndustryObj["SCH_GP05"]["results"][j]['Profit'] = this.fields4.value[j].ProfitSAR;
      this.IndustryObj["SCH_GP05"]["results"][j]['Sales'] = this.fields4.value[j].Sales;
      // this.IndustryObj["SCH_GP05"]["results"][j]['salesProfitratio']=  this.fields4.value[j].SalePrfRatio;

    }
    this.IndustryList = this.IndustryObj["SCH_GP05"]["results"];

    for (let j = 0; j < (this.fields5.value).length; j++) {

      this.ContractingObj["SCH_GP06"]["results"][j]['ActDesc'] = this.fields5.value[j].outletName;
      this.ContractingObj["SCH_GP06"]["results"][j]['GovtContractProf'] = this.fields5.value[j].GovernmentCont;
      this.ContractingObj["SCH_GP06"]["results"][j]['CivilContrRev'] = this.fields5.value[j].ProfitfromCivil;
      this.ContractingObj["SCH_GP06"]["results"][j]['OtherIncome'] = this.fields5.value[j].OtherProfit;
      this.ContractingObj["SCH_GP06"]["results"][j]['TotalProfit'] = this.fields5.value[j].totalProfits;
      this.ContractingObj["SCH_GP06"]["results"][j]['NoOfLabours'] = this.fields5.value[j].NoofLabours;

    }
    this.ContractingList = this.ContractingObj["SCH_GP06"]["results"];
    // console.log("ContractingList",this.ContractingList)

    for (let j = 0; j < (this.fields6.value).length; j++) {

      this.InvstRealEstObj["SCH_GP07"]["results"][j]['ActDesc'] = this.fields6.value[j].outletName;
      this.InvstRealEstObj["SCH_GP07"]["results"][j]['City'] = this.fields6.value[j].City;
      this.InvstRealEstObj["SCH_GP07"]["results"][j]['Revenue'] = this.fields6.value[j].Revenue;
      this.InvstRealEstObj["SCH_GP07"]["results"][j]['Expenses'] = this.fields6.value[j].Expenses;
      this.InvstRealEstObj["SCH_GP07"]["results"][j]['NetPft'] = this.fields6.value[j].NetProfit;

    }
    this.InvstRealEstList = this.InvstRealEstObj["SCH_GP07"]["results"];
    // console.log("InvstRealEstList",this.InvstRealEstList)/
    for (let j = 0; j < (this.fields7.value).length; j++) {

      this.HotelsObj["SCH_GP08"]["results"][j]['ActDesc'] = this.fields7.value[j].outletName;
      this.HotelsObj["SCH_GP08"]["results"][j]['NoOfRooms'] = this.fields7.value[j].NoofRooms;
      this.HotelsObj["SCH_GP08"]["results"][j]['RoomRate'] = this.fields7.value[j].RoomRate;
      this.HotelsObj["SCH_GP08"]["results"][j]['AddRoomRate'] = this.fields7.value[j].AddRoomRate;
      this.HotelsObj["SCH_GP08"]["results"][j]['ServicFee'] = this.fields7.value[j].ServiceFees;
      this.HotelsObj["SCH_GP08"]["results"][j]['OccRate'] = this.fields7.value[j].OccupancyRate;
      this.HotelsObj["SCH_GP08"]["results"][j]['City'] = this.fields7.value[j].City;
      this.HotelsObj["SCH_GP08"]["results"][j]['Owned'] = this.fields7.value[j].Ownedyou;
      this.HotelsObj["SCH_GP08"]["results"][j]['Revenue'] = this.fields7.value[j].Revenue;
      this.HotelsObj["SCH_GP08"]["results"][j]['Expenses'] = this.fields7.value[j].Expenses;
      this.HotelsObj["SCH_GP08"]["results"][j]['NetProfit'] = this.fields7.value[j].NetProfit;


    }
    this.HotelsList = this.HotelsObj["SCH_GP08"]["results"];

    for (let j = 0; j < (this.fields8.value).length; j++) {

      this.EduHealthObj["SCH_GP09"]["results"][j]['ActDesc'] = this.fields8.value[j].outletName;
      this.EduHealthObj["SCH_GP09"]["results"][j]['SubsidyVal'] = this.fields8.value[j].ValueofSubsidy;
      this.EduHealthObj["SCH_GP09"]["results"][j]['Revenue'] = this.fields8.value[j].Revenue;
      this.EduHealthObj["SCH_GP09"]["results"][j]['Expenses'] = this.fields8.value[j].Expenses;
      this.EduHealthObj["SCH_GP09"]["results"][j]['NetPft'] = this.fields8.value[j].NetProfit;

    }
    this.EduHealthList = this.EduHealthObj["SCH_GP09"]["results"];

    for (let j = 0; j < (this.fields9.value).length; j++) {

      this.PoultryObj["SCH_GP10"]["results"][j]['ActDesc'] = this.fields9.value[j].outletName;
      this.PoultryObj["SCH_GP10"]["results"][j]['Capital'] = this.fields9.value[j].DeclaredCapital;
      this.PoultryObj["SCH_GP10"]["results"][j]['IncrInCap'] = this.fields9.value[j].IncreaseinCapital;
      this.PoultryObj["SCH_GP10"]["results"][j]['CapitalRate'] = this.fields9.value[j].Capitalrate;
      this.PoultryObj["SCH_GP10"]["results"][j]['Profits'] = this.fields9.value[j].Profit;

    }
    this.PoultryList = this.PoultryObj["SCH_GP10"]["results"];

    for (let j = 0; j < (this.fields10.value).length; j++) {

      this.CarsObj["SCH_GP11"]["results"][j]['ActDesc'] = this.fields10.value[j].outletName;
      this.CarsObj["SCH_GP11"]["results"][j]['ShareCap'] = this.fields10.value[j].ShareCapital;
      this.CarsObj["SCH_GP11"]["results"][j]['IntrPurchase'] = this.fields10.value[j].InternalProcurement;
      this.CarsObj["SCH_GP11"]["results"][j]['ForgPurchase'] = this.fields10.value[j].Imports;
      this.CarsObj["SCH_GP11"]["results"][j]['Sales'] = this.fields10.value[j].Sales;
      this.CarsObj["SCH_GP11"]["results"][j]['PerSalesGain'] = this.fields10.value[j].Percentagesales;

    }
    this.CarsList = this.CarsObj["SCH_GP11"]["results"];

    for (let j = 0; j < (this.fields11.value).length; j++) {

      this.MineralsObj["SCH_GP12"]["results"][j]['ActDesc'] = this.fields11.value[j].outletName;
      this.MineralsObj["SCH_GP12"]["results"][j]['ShareCap'] = this.fields11.value[j].ShareCapitalmineral;
      this.MineralsObj["SCH_GP12"]["results"][j]['IntrPurchase'] = this.fields11.value[j].InternalProcurement;
      this.MineralsObj["SCH_GP12"]["results"][j]['ForgPurchase'] = this.fields11.value[j].Imports;
      this.MineralsObj["SCH_GP12"]["results"][j]['Sales']=  this.fields11.value[j].SalesMin;
      this.MineralsObj["SCH_GP12"]["results"][j]['PerSalesGain'] = this.fields11.value[j].Percentagesalesgain;

    }
    this.MineralsList = this.MineralsObj["SCH_GP12"]["results"];


    this.AdditionalObj.ANoBranches = this.Form5Additional.value.noOfBranch;
    this.AdditionalObj.ANoEmp = this.Form5Additional.value.noOfEmployees;
    this.AdditionalObj.AAnnualRent = this.Form5Additional.value.Yearlyrent;
    this.AdditionalObj.ATotAnnualSal = this.Form5Additional.value.TotalofAnnualSalary;
    this.AdditionalObj.ACapital = this.Form5Additional.value.ZakatBase;
    this.AdditionalObj.APlShare = this.Form5Additional.value.ShareinCompany;
    this.AdditionalList = this.AdditionalObj;
    console.log(" Review AdditionalList ..........", this.AdditionalList)

    // for(let j=0;j<(this.fields12.value).length;j++){

    //   this.AdditionalObj[j]['ANoBranches']=  this.fields12.value[j].noOfBranch;
    //   this.AdditionalObj[j]['ANoEmp']=  this.fields12.value[j].noOfEmployees;
    //   this.AdditionalObj[j]['AAnnualRent']=  this.fields12.value[j].Yearlyrent;
    //   this.AdditionalObj[j]['ATotAnnualSal']=  this.fields12.value[j].TotalofAnnualSalary;
    //  this.AdditionalObj[j]['ACapital']=  this.fields12.value[j].ZakatBase;
    //  this.AdditionalObj[j]['APlShare']=  this.fields12.value[j].ShareinCompany;
    // }

  }


  allDatatoSave() {
    this.fields = this.Form5Form.get('fields') as FormArray;
    this.fields1 = this.Form5FormPro.get('fields') as FormArray;
    this.fields2 = this.Form5FormSell.get('fields') as FormArray;
    this.fields3 = this.Form5LaborOccup.get('fields') as FormArray;
    this.fields4 = this.Form5Industry.get('fields') as FormArray;
    this.fields5 = this.Form5Contracting.get('fields') as FormArray;
    this.fields6 = this.Form5Invst.get('fields') as FormArray;
    this.fields7 = this.Form5Hotels.get('fields') as FormArray;
    this.fields8 = this.Form5Health.get('fields') as FormArray;
    this.fields9 = this.Form5Poultry.get('fields') as FormArray;
    this.fields10 = this.Form5Cars.get('fields') as FormArray;
    this.fields11 = this.Form5Minerals.get('fields') as FormArray;
    // this.fields12 = this.Form5Additional.get('fields') as FormArray;

    this.fieldsCabs = this.CabsExpenses.get('fields') as FormArray;
    this.fieldsProf = this.ProfExpenses.get('fields') as FormArray;
    this.fieldsSell = this.SellBuyExpenses.get('fields') as FormArray;
    this.fieldsLabour = this.LabourExpenses.get('fields') as FormArray;
    this.fieldsInvst = this.InvstRealExpenses.get('fields') as FormArray;
    this.fieldsHotels = this.HotelsExpenses.get('fields') as FormArray;
    this.fieldsEdu = this.EduHealthExpenses.get('fields') as FormArray;

    this.fieldsAdditional = this.AdditionalExpenses.get('fields') as FormArray;

    this.fieldsProfit1 = this.Form5FormProfitModel1.get('fields') as FormArray;
    this.fieldsProfit2 = this.Form5FormProfitModel2.get('fields') as FormArray;
    this.fieldsProfit3 = this.Form5FormProfitModel3.get('fields') as FormArray;

    this.fieldsCapital = this.Form5FormCapitalModel.get('fields') as FormArray;
    this.fieldsTr1 = this.Form5FormTrading1.get('fields') as FormArray;
    this.fieldsTr2 = this.Form5FormTrading2.get('fields') as FormArray;
    this.fieldsTr3 = this.Form5FormTrading3.get('fields') as FormArray;
    this.fieldsTr4 = this.Form5FormTrading4.get('fields') as FormArray;
    this.fieldsTr5 = this.Form5FormTrading5.get('fields') as FormArray;
    this.fieldsTr6 = this.Form5FormTrading6.get('fields') as FormArray;

    console.log("this.fieldsTr1",this.fieldsTr1 )
    for (let j = 0; j < (this.fields.value).length; j++) {

      this.basicInformationObj["SCH_GP01"]["results"][j]['ActDesc'] = this.fields.value[j].outletName;
      this.basicInformationObj["SCH_GP01"]["results"][j]['NoOfCars'] = this.fields.value[j].noofCars;
      this.basicInformationObj["SCH_GP01"]["results"][j]['AgvDlyIncome'] = this.fields.value[j].avgDailyIncome;
      this.basicInformationObj["SCH_GP01"]["results"][j]['OccRate'] = this.fields.value[j].OccupancyRate;
      this.basicInformationObj["SCH_GP01"]["results"][j]['NetPftPer'] = this.fields.value[j].NetProfit;
      this.basicInformationObj["SCH_GP01"]["results"][j]['Revenue'] = this.fields.value[j].Revenue;
      this.basicInformationObj["SCH_GP01"]["results"][j]['NetPft'] = this.fields.value[j].NetProfitSAR.toString();
      this.basicInformationObj["SCH_GP01"]["results"][j]['Expenses'] = this.fields.value[j].Expenses;

    }
    console.log("basicInformationObj accccccccccc", this.basicInformationObj);

    // this.financialcabsList =this.financialcabsObj["SCH_GP01"]["results"];

    for (let j = 0; j < (this.fields1.value).length; j++) {

      this.basicInformationObj["SCH_GP02"]["results"][j]['ActDesc'] = this.fields1.value[j].outletName1;
      this.basicInformationObj["SCH_GP02"]["results"][j]['Revenue'] = this.fields1.value[j].Revenue1;
      this.basicInformationObj["SCH_GP02"]["results"][j]['Expenses'] = this.fields1.value[j].Expenses1;
      this.basicInformationObj["SCH_GP02"]["results"][j]['NetPft'] = this.fields1.value[j].NetProfit1.toString();
    }
    // this.financialProffList =this.financialProffObj["SCH_GP02"]["results"];

    //sell&Buy
    for (let j = 0; j < (this.fields2.value).length; j++) {

      this.basicInformationObj["SCH_GP03"]["results"][j]['ActDesc'] = this.fields2.value[j].outletName;
      this.basicInformationObj["SCH_GP03"]["results"][j]['Capital'] = this.fields2.value[j].Capital;
      // this.basicInformationObj["SCH_GP03"]["results"][j]['Expenses']=  this.fields2.value[j].Expenses;
      this.basicInformationObj["SCH_GP03"]["results"][j]['SuppCon'] = this.fields2.value[j].Expenses.toString();
      this.basicInformationObj["SCH_GP03"]["results"][j]['ProfitRatio'] = this.fields2.value[j].profitratio || "0";
      this.basicInformationObj["SCH_GP03"]["results"][j]['Sales'] = this.fields2.value[j].sales;
      this.basicInformationObj["SCH_GP03"]["results"][j]['SalePrfRatio'] = this.fields2.value[j].salesProfitratio;

      this.basicInformationObj["SCH_GP03"]["results"][j]['GenTrade'] = this.fields2.value[j].ImportsforGeneralTrading;
      this.basicInformationObj["SCH_GP03"]["results"][j]['Livelihoods'] = this.fields2.value[j].ImportsforLivelihoods;
      this.basicInformationObj["SCH_GP03"]["results"][j]['LiveStkAnimals'] = this.fields2.value[j].ImportsforLivestock;
      this.basicInformationObj["SCH_GP03"]["results"][j]['ExtnProc'] = this.fields2.value[j].TotalofImports;

      this.basicInformationObj["SCH_GP03"]["results"][j]['GenTradeI'] = this.fields2.value[j].GeneralTradingInternal;
      this.basicInformationObj["SCH_GP03"]["results"][j]['LivelihoodsI'] = this.fields2.value[j].LivelihoodsInternal;
      this.basicInformationObj["SCH_GP03"]["results"][j]['LiveStkAnimalsI'] = this.fields2.value[j].LivestockAnimals;
      this.basicInformationObj["SCH_GP03"]["results"][j]['IntnProc'] = this.fields2.value[j].TotalProfits;

    }


    // this.sellBuyList =this.sellBuyObj["SCH_GP03"]["results"];

    //Labor occu
    for (let j = 0; j < (this.fields3.value).length; j++) {

      this.basicInformationObj["SCH_GP04"]["results"][j]['ActDesc'] = this.fields3.value[j].outletName;
      this.basicInformationObj["SCH_GP04"]["results"][j]['NoOfLabour'] = this.fields3.value[j].NoofLabours;
      this.basicInformationObj["SCH_GP04"]["results"][j]['Revenue'] = this.fields3.value[j].Revenue;
      this.basicInformationObj["SCH_GP04"]["results"][j]['Expenses'] = this.fields3.value[j].Expenses;
      this.basicInformationObj["SCH_GP04"]["results"][j]['NetProfit'] = this.fields3.value[j].NetProfit;
      // this.basicInformationObj["SCH_GP04"]["results"][j]['salesProfitratio']=  this.fields3.value[j].SalePrfRatio;

    }
    // this.LaborOccupList =this.LaborOccupObj["SCH_GP04"]["results"];

    //industry 
    for (let j = 0; j < (this.fields4.value).length; j++) {

      this.basicInformationObj["SCH_GP05"]["results"][j]['ActDesc'] = this.fields4.value[j].outletName;
      this.basicInformationObj["SCH_GP05"]["results"][j]['FundingTot'] = this.fields4.value[j].FundingTotal;
      this.basicInformationObj["SCH_GP05"]["results"][j]['CapitalStr'] = this.fields4.value[j].DeclaredCapital;
      this.basicInformationObj["SCH_GP05"]["results"][j]['Profit'] = this.fields4.value[j].ProfitSAR;
      this.basicInformationObj["SCH_GP05"]["results"][j]['Sales'] = this.fields4.value[j].Sales;
      // this.basicInformationObj["SCH_GP05"]["results"][j]['salesProfitratio']=  this.fields4.value[j].SalePrfRatio;

    }
    // this.IndustryList =this.IndustryObj["SCH_GP05"]["results"];

    for (let j = 0; j < (this.fields5.value).length; j++) {

      this.basicInformationObj["SCH_GP06"]["results"][j]['ActDesc'] = this.fields5.value[j].outletName;
      this.basicInformationObj["SCH_GP06"]["results"][j]['GovtContractProf'] = this.fields5.value[j].GovernmentCont;
      this.basicInformationObj["SCH_GP06"]["results"][j]['CivilContrRev'] = this.fields5.value[j].ProfitfromCivil;
      this.basicInformationObj["SCH_GP06"]["results"][j]['OtherIncome'] = this.fields5.value[j].OtherProfit;
      this.basicInformationObj["SCH_GP06"]["results"][j]['TotalProfit'] = this.fields5.value[j].totalProfits;
      this.basicInformationObj["SCH_GP06"]["results"][j]['NoOfLabours'] = this.fields5.value[j].NoofLabours;

    }
    // this.ContractingList =this.ContractingObj["SCH_GP06"]["results"];

    for (let j = 0; j < (this.fields6.value).length; j++) {

      this.basicInformationObj["SCH_GP07"]["results"][j]['ActDesc'] = this.fields6.value[j].outletName;
      this.basicInformationObj["SCH_GP07"]["results"][j]['City'] = this.fields6.value[j].City;
      this.basicInformationObj["SCH_GP07"]["results"][j]['Revenue'] = this.fields6.value[j].Revenue;
      this.basicInformationObj["SCH_GP07"]["results"][j]['Expenses'] = this.fields6.value[j].Expenses;
      this.basicInformationObj["SCH_GP07"]["results"][j]['NetPft'] = this.fields6.value[j].NetProfit.toString();

    }
    // this.InvstRealEstList =this.InvstRealEstObj["SCH_GP07"]["results"];
    for (let j = 0; j < (this.fields7.value).length; j++) {

      this.basicInformationObj["SCH_GP08"]["results"][j]['ActDesc'] = this.fields7.value[j].outletName;
      this.basicInformationObj["SCH_GP08"]["results"][j]['NoOfRooms'] = this.fields7.value[j].NoofRooms;
      this.basicInformationObj["SCH_GP08"]["results"][j]['RoomRate'] = this.fields7.value[j].RoomRate;
      this.basicInformationObj["SCH_GP08"]["results"][j]['AddRoomRate'] = this.fields7.value[j].AddRoomRate;
      this.basicInformationObj["SCH_GP08"]["results"][j]['ServicFee'] = this.fields7.value[j].ServiceFees;
      this.basicInformationObj["SCH_GP08"]["results"][j]['OccRate'] = this.fields7.value[j].OccupancyRate;
      this.basicInformationObj["SCH_GP08"]["results"][j]['City'] = this.fields7.value[j].City;
      this.basicInformationObj["SCH_GP08"]["results"][j]['Owned'] = this.fields7.value[j].Ownedyou;
      this.basicInformationObj["SCH_GP08"]["results"][j]['Revenue'] = this.fields7.value[j].Revenue;
      this.basicInformationObj["SCH_GP08"]["results"][j]['Expenses'] = this.fields7.value[j].Expenses;
      this.basicInformationObj["SCH_GP08"]["results"][j]['NetProfit'] = this.fields7.value[j].NetProfit;


    }
    // this.HotelsList =this.HotelsObj["SCH_GP08"]["results"];

    for (let j = 0; j < (this.fields8.value).length; j++) {

      this.basicInformationObj["SCH_GP09"]["results"][j]['ActDesc'] = this.fields8.value[j].outletName;
      this.basicInformationObj["SCH_GP09"]["results"][j]['SubsidyVal'] = this.fields8.value[j].ValueofSubsidy;
      this.basicInformationObj["SCH_GP09"]["results"][j]['Revenue'] = this.fields8.value[j].Revenue;
      this.basicInformationObj["SCH_GP09"]["results"][j]['Expenses'] = this.fields8.value[j].Expenses;
      this.basicInformationObj["SCH_GP09"]["results"][j]['NetPft'] = this.fields8.value[j].NetProfit.toString();

    }
    // this.EduHealthList =this.EduHealthObj["SCH_GP09"]["results"];

    for (let j = 0; j < (this.fields9.value).length; j++) {

      this.basicInformationObj["SCH_GP10"]["results"][j]['ActDesc'] = this.fields9.value[j].outletName;
      this.basicInformationObj["SCH_GP10"]["results"][j]['Capital'] = this.fields9.value[j].DeclaredCapital;
      this.basicInformationObj["SCH_GP10"]["results"][j]['IncrInCap'] = this.fields9.value[j].IncreaseinCapital;
      this.basicInformationObj["SCH_GP10"]["results"][j]['CapitalRate'] = this.fields9.value[j].Capitalrate;
      this.basicInformationObj["SCH_GP10"]["results"][j]['Profits'] = this.fields9.value[j].Profit;

    }
    // this.PoultryList =this.PoultryObj["SCH_GP10"]["results"];

    for (let j = 0; j < (this.fields10.value).length; j++) {

      this.basicInformationObj["SCH_GP11"]["results"][j]['ActDesc'] = this.fields10.value[j].outletName;
      this.basicInformationObj["SCH_GP11"]["results"][j]['ShareCap'] = this.fields10.value[j].ShareCapital;
      this.basicInformationObj["SCH_GP11"]["results"][j]['IntrPurchase'] = this.fields10.value[j].InternalProcurement;
      this.basicInformationObj["SCH_GP11"]["results"][j]['ForgPurchase'] = this.fields10.value[j].Imports;
      this.basicInformationObj["SCH_GP11"]["results"][j]['Sales'] = this.fields10.value[j].Sales;
      this.basicInformationObj["SCH_GP11"]["results"][j]['PerSalesGain'] = this.fields10.value[j].Percentagesales;

    }
    // this.CarsList =this.CarsObj["SCH_GP11"]["results"];

    for (let j = 0; j < (this.fields11.value).length; j++) {

      this.basicInformationObj["SCH_GP12"]["results"][j]['ActDesc'] = this.fields11.value[j].outletName;
      this.basicInformationObj["SCH_GP12"]["results"][j]['ShareCap'] = this.fields11.value[j].ShareCapitalmineral;
      this.basicInformationObj["SCH_GP12"]["results"][j]['IntrPurchase'] = this.fields11.value[j].InternalProcurement;
      this.basicInformationObj["SCH_GP12"]["results"][j]['ForgPurchase'] = this.fields11.value[j].Imports;
      this.MineralsObj["SCH_GP12"]["results"][j]['Sales'] = this.fields11.value[j].SalesMin;
      this.MineralsObj["SCH_GP12"]["results"][j]['PerSalesGain'] = this.fields11.value[j].Percentagesalesgain;
    }

    this.basicInformationObj.ANoBranches = this.Form5Additional.value.noOfBranch;
    // this.basicInformationObj.ANoBranches=this.Form5Additional.controls["noOfBranch"];
    this.basicInformationObj.ANoEmp = this.Form5Additional.value.noOfEmployees;
    this.basicInformationObj.AAnnualRent = this.Form5Additional.value.Yearlyrent;
    this.basicInformationObj.ATotAnnualSal = this.Form5Additional.value.TotalofAnnualSalary;
    this.basicInformationObj.ACapital = this.Form5Additional.value.ZakatBase;
    this.basicInformationObj.APlShare = this.Form5Additional.value.ShareinCompany;
    // for(let j=0;j<(this.fields12.value).length;j++){

    //   this.basicInformationObj[j]['ANoBranches']=  this.fields12.value[j].noOfBranch;
    //   this.basicInformationObj[j]['ANoEmp']=  this.fields12.value[j].noOfEmployees;
    //   this.basicInformationObj[j]['AAnnualRent']=  this.fields12.value[j].Yearlyrent;
    //   this.basicInformationObj[j]['ATotAnnualSal']=  this.fields12.value[j].TotalofAnnualSalary;
    //   this.basicInformationObj[j]['ACapital']=  this.fields12.value[j].ZakatBase;
    //   this.basicInformationObj[j]['APlShare']=  this.fields12.value[j].ShareinCompany;

    // }

    console.log("this.basicInformationObj sssssssssssss", this.basicInformationObj)


    // for (let j = 0; j < (this.fieldsCabs.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsCabs.value[j].Description1.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsCabs.value[j].Amount1;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP01";
    // }
    // for (let j = 0; j < (this.fieldsProf.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsProf.value[j].Description2.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsProf.value[j].Amount2;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP02";
    // }
    // for (let j = 0; j < (this.fieldsSell.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsSell.value[j].Description3.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsSell.value[j].Amount3;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP03";
    // }
    // for (let j = 0; j < (this.fieldsLabour.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsLabour.value[j].Description4.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsLabour.value[j].Amount4;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP04";
    // }
    // for (let j = 0; j < (this.fieldsInvst.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsInvst.value[j].Description5.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsInvst.value[j].Amount5;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP07";
    // }
    // for (let j = 0; j < (this.fieldsHotels.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsHotels.value[j].Description6.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsHotels.value[j].Amount6;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP08";
    // }
    // for (let j = 0; j < (this.fieldsEdu.value).length; j++) {

    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsEdu.value[j].Description7.toString();
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsEdu.value[j].Amount7;
    //   this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP09";
    // }
    this.AdditionalList = this.AdditionalObj;


    // //capital
    // for (let j = 0; j < (this.fieldsCapital.value).length; j++) {

    //   this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['Description'] = this.fieldsCapital.value[j].Description.toString();
    //   this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['LoanDt'] = this.fieldsCapital.value[j].DateofLoan || null;
    //   this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['ApprovalDt'] = this.fieldsCapital.value[j].LastDayofBillingPeriod || null;
    //   this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['LoanVal'] = this.fieldsCapital.value[j].LoanValue.toString();
    //   this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['NumberOfYr'] = this.fieldsCapital.value[j].NumberofYears.toString();
    //   this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['IncrCapital'] = this.fieldsCapital.value[j].IncreaseinCapital.toString();
    // }

    // // Profit from Civil Contracting 
    // for (let j = 0; j < (this.fieldsProfit1.value).length; j++) {

    //   this.basicInformationObj["GP06_2Set"]["results"][j]['TincrnoInd'] = this.fieldsProfit1.value[j].identificationType;
    //   this.basicInformationObj["GP06_2Set"]["results"][j]['Tin'] = this.fieldsProfit1.value[j].AmountofContractingParty;
    //   this.basicInformationObj["GP06_2Set"]["results"][j]['ContractingName'] = this.fieldsProfit1.value[j].ContractingPartyName;
    //   this.basicInformationObj["GP06_2Set"]["results"][j]['Description'] = this.fieldsProfit1.value[j].Description.toString();
    //   this.basicInformationObj["GP06_2Set"]["results"][j]['ContractVal'] = this.fieldsProfit1.value[j].ContractValue1;
    //   this.basicInformationObj["GP06_2Set"]["results"][j]['StipendContr'] = this.fieldsProfit1.value[j].StipendContract1;
    //   this.basicInformationObj["GP06_2Set"]["results"][j]['PrfOfConrtact'] = this.fieldsProfit1.controls[j].value.ProfitsofContract1.toString();

    // }

    // //other profit
    // for (let j = 0; j < (this.fieldsProfit2.value).length; j++) {

    //   this.basicInformationObj["GP06_3Set"]["results"][j]['Description'] = this.fieldsProfit2.value[j].Description.toString();
    //   this.basicInformationObj["GP06_3Set"]["results"][j]['ContractVal'] = this.fieldsProfit2.value[j].ContractValue;
    //   this.basicInformationObj["GP06_3Set"]["results"][j]['StipendContr'] = this.fieldsProfit2.value[j].StipendContract;
    //   this.basicInformationObj["GP06_3Set"]["results"][j]['PrfOfConrtact'] = this.fieldsProfit2.value[j].ProfitsofContract.toFixed(2);
    // }

    // //govr profit
    // for (let j = 0; j < (this.fieldsProfit3.value).length; j++) {

    //   this.basicInformationObj["GP06_1Set"]["results"][j]['GovCode'] = this.fieldsProfit3.value[j].govCode;
    //   this.basicInformationObj["GP06_1Set"]["results"][j]['Description'] = this.fieldsProfit3.value[j].Description.toString();
    //   this.basicInformationObj["GP06_1Set"]["results"][j]['ContractVal'] = this.fieldsProfit3.value[j].ContractValue;
    //   this.basicInformationObj["GP06_1Set"]["results"][j]['StipendContr'] = this.fieldsProfit3.value[j].StipendContract;
    //   this.basicInformationObj["GP06_1Set"]["results"][j]['PrfOfConrtact'] = this.fieldsProfit3.value[j].ProfitsofContract.toFixed(2);
    // }

    // // trading 

    // for (let j = 0; j < (this.fieldsTr1.value).length; j++) {

    //   this.basicInformationObj["GP03_2Set"]["results"][j]['Description'] = this.fieldsTr1.value[j].description1.toString();
    //   this.basicInformationObj["GP03_2Set"]["results"][j]['SubDesc'] = this.fieldsTr1.value[j].subdescription1 || "";
    //   this.basicInformationObj["GP03_2Set"]["results"][j]['Value'] = this.fieldsTr1.value[j].tradingValue.toString();
    //   this.basicInformationObj["GP03_2Set"]["results"][j]['Profit'] = this.fieldsTr1.value[j].tradingProfit.toString();
    //   this.basicInformationObj["GP03_2Set"]["results"][j]['ProfitRatio'] = this.fieldsTr1.value[j].tradingProfitRatio || "0";
    // }

    // for (let j = 0; j < (this.fieldsTr2.value).length; j++) {

    //   this.basicInformationObj["GP03_3Set"]["results"][j]['Description'] = this.fieldsTr2.value[j].description1.toString();
    //   this.basicInformationObj["GP03_3Set"]["results"][j]['SubDescription'] = this.fieldsTr2.value[j].subdescription1 || "";
    //   this.basicInformationObj["GP03_3Set"]["results"][j]['Value'] = this.fieldsTr2.value[j].tradingValue.toString();
    //   this.basicInformationObj["GP03_3Set"]["results"][j]['Profit'] = this.fieldsTr2.value[j].tradingProfit.toString();
    //   this.basicInformationObj["GP03_3Set"]["results"][j]['ProfitRatio'] = this.fieldsTr2.value[j].tradingProfitRatio || "0";
    // }
    // for (let j = 0; j < (this.fieldsTr3.value).length; j++) {

    //   this.basicInformationObj["GP03_4Set"]["results"][j]['Description'] = this.fieldsTr3.value[j].description1.toString();
    //   this.basicInformationObj["GP03_4Set"]["results"][j]['SubDesc'] = this.fieldsTr3.value[j].subdescription1 || "";
    //   this.basicInformationObj["GP03_4Set"]["results"][j]['Value'] = this.fieldsTr3.value[j].tradingValue.toString();
    //   this.basicInformationObj["GP03_4Set"]["results"][j]['Profit'] = this.fieldsTr3.value[j].tradingProfit.toString();
    //   this.basicInformationObj["GP03_4Set"]["results"][j]['ProfitRatio'] = this.fieldsTr3.value[j].tradingProfitRatio || "0";
    // }

    // for (let j = 0; j < (this.fieldsTr4.value).length; j++) {

    //   this.basicInformationObj["GP03_6Set"]["results"][j]['Description'] = this.fieldsTr4.value[j].description1.toString();
    //   this.basicInformationObj["GP03_6Set"]["results"][j]['SubDesc'] = this.fieldsTr4.value[j].subdescription1 || "";
    //   this.basicInformationObj["GP03_6Set"]["results"][j]['Value'] = this.fieldsTr4.value[j].tradingValue.toString();
    //   this.basicInformationObj["GP03_6Set"]["results"][j]['Profit'] = this.fieldsTr4.value[j].tradingProfit.toString();
    //   this.basicInformationObj["GP03_6Set"]["results"][j]['ProfitRatio'] = this.fieldsTr4.value[j].tradingProfitRatio || "0";
    // }
    // for (let j = 0; j < (this.fieldsTr5.value).length; j++) {

    //   this.basicInformationObj["GP03_7Set"]["results"][j]['Description'] = this.fieldsTr5.value[j].description1.toString();
    //   this.basicInformationObj["GP03_7Set"]["results"][j]['SubDescription'] = this.fieldsTr5.value[j].subdescription1 || "";
    //   this.basicInformationObj["GP03_7Set"]["results"][j]['Value'] = this.fieldsTr5.value[j].tradingValue.toString();
    //   this.basicInformationObj["GP03_7Set"]["results"][j]['Profit'] = this.fieldsTr5.value[j].tradingProfit.toString();
    //   this.basicInformationObj["GP03_7Set"]["results"][j]['ProfitRatio'] = this.fieldsTr5.value[j].tradingProfitRatio || "0";
    // }
    // for (let j = 0; j < (this.fieldsTr6.value).length; j++) {

    //   this.basicInformationObj["GP03_8Set"]["results"][j]['Description'] = this.fieldsTr6.value[j].description1.toString();
    //   this.basicInformationObj["GP03_8Set"]["results"][j]['SubDesc'] = this.fieldsTr6.value[j].subdescription1 || "";
    //   this.basicInformationObj["GP03_8Set"]["results"][j]['Value'] = this.fieldsTr6.value[j].tradingValue.toString();
    //   this.basicInformationObj["GP03_8Set"]["results"][j]['Profit'] = this.fieldsTr6.value[j].tradingProfit.toString();
    //   this.basicInformationObj["GP03_8Set"]["results"][j]['ProfitRatio'] = this.fieldsTr6.value[j].tradingProfitRatio || "0";
    // }

  }

  checkValue(event: any) {
    console.log("checked or not", event);
    if (event == true) {
      this.checked == true;
    } else {
      this.checked == false;
    }
  }
  // eventCheck(event){
  //   console.log("checked or not",event.checked) 
  // }

  goBack() {
    window.location.href = 'http://localhost:4200/#/mains/returns/zakatcit';
  }

  FormsSet() {
    window.scrollTo(0, 0);
    // console.log("this.financialcabsList FormsSet",this.financialcabsList)
    for (let j = 0; j < (this.financialcabsList).length; j++) {

      let form = this.addForm(j + 1);
      const forms = this.Form5Form.get('fields') as FormArray;
      forms.push(form);
      // forms.controls[j].patchValue({'outletTitle':this.financialcabsList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'outletName': this.financialcabsList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'noofCars': (+this.financialcabsList[j]['NoOfCars']).toString() || "0" });
      forms.controls[j].patchValue({ 'avgDailyIncome': this.financialcabsList[j]['AgvDlyIncome'] || 0.00 });
      forms.controls[j].patchValue({ 'OccupancyRate': this.financialcabsList[j]['OccRate'] || 0.00 });
      forms.controls[j].patchValue({ 'NetProfit': this.financialcabsList[j]['NetPftPer'] || 0.00 });
      forms.controls[j].patchValue({ 'Revenue': this.financialcabsList[j]['Revenue'] || 0.00 });
      forms.controls[j].patchValue({ 'NetProfitSAR': this.financialcabsList[j]['NetPft'] || 0.00 });
      forms.controls[j].patchValue({ 'Expenses': this.financialcabsList[j]['Expenses'] || 0.00 });
      forms.controls[j].patchValue({ 'ScheduleApplicable': false });
    }

    for (let i = 0; i < (this.financialProffList).length; i++) {
      console.log('one');
      console.log(2);
      let form1 = this.addForm1(i + 1);
      const forms1 = this.Form5FormPro.get('fields') as FormArray;
      forms1.push(form1);
      forms1.controls[i].patchValue({ 'outletName1': this.financialProffList[i]['ActDesc'] || '' });
      forms1.controls[i].patchValue({ 'Revenue1': this.financialProffList[i]['Revenue'] || "0.00" });
      forms1.controls[i].patchValue({ 'Expenses1': this.financialProffList[i]['Expenses'] || "0.00" });
      forms1.controls[i].patchValue({ 'NetProfit1': this.financialProffList[i]['NetPftPer'] || "0.00" });

    }
    for (let j = 0; j < (this.sellBuyList).length; j++) {
      // console.log("this.sellBuyList bindinggg", this.sellBuyList)
      let form = this.addForm2(j + 1);
      const forms = this.Form5FormSell.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.sellBuyList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'Capital': this.sellBuyList[j]['Capital'] || 0.00 });
      forms.controls[j].patchValue({ 'Expenses': this.sellBuyList[j]['Expenses'] || "0.00" });
      forms.controls[j].patchValue({ 'profitratio': this.sellBuyList[j]['ProfitRatio'] || 0.00 });
      forms.controls[j].patchValue({ 'sales': this.sellBuyList[j]['Sales'] || 0.00 });
      forms.controls[j].patchValue({ 'salesProfitratio': this.sellBuyList[j]['SalePrfRatio'] || 0.00 });

      forms.controls[j].patchValue({ 'ImportsforGeneralTrading': this.sellBuyList[j]['GenTrade'] || 0.00 });
      forms.controls[j].patchValue({ 'ImportsforLivelihoods': this.sellBuyList[j]['Livelihoods'] || 0.00 });
      forms.controls[j].patchValue({ 'ImportsforLivestock': this.sellBuyList[j]['LiveStkAnimals'] || 0.00 });
      forms.controls[j].patchValue({ 'TotalofImports': this.sellBuyList[j]['ExtnProc'] || 0.00 });

      forms.controls[j].patchValue({ 'GeneralTradingInternal': this.sellBuyList[j]['GenTradeI'] || 0.00 });
      forms.controls[j].patchValue({ 'LivelihoodsInternal': this.sellBuyList[j]['LivelihoodsI'] || 0.00 });
      forms.controls[j].patchValue({ 'LivestockAnimals': this.sellBuyList[j]['LiveStkAnimalsI'] || 0.00 });
      forms.controls[j].patchValue({ 'TotalProfits': this.sellBuyList[j]['IntnProc'] || 0.00 });

    }

    for (let j = 0; j < (this.LaborOccupList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5LaborOccup.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.LaborOccupList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'NoofLabours': (+this.LaborOccupList[j]['NoOfLabour']).toString() || 0 });
      forms.controls[j].patchValue({ 'Revenue': this.LaborOccupList[j]['Revenue'] || 0.00 });
      forms.controls[j].patchValue({ 'Expenses': this.LaborOccupList[j]['Expenses'] || "0.00" });
      forms.controls[j].patchValue({ 'NetProfit': this.LaborOccupList[j]['NetProfit'] || 0.00 });
    }

    //industry
    for (let j = 0; j < (this.IndustryList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Industry.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.IndustryList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'FundingTotal': this.IndustryList[j]['FundingTot'] || 0.00 });
      forms.controls[j].patchValue({ 'DeclaredCapital': this.IndustryList[j]['CapitalStr'] || 0.00 });
      forms.controls[j].patchValue({ 'ProfitSAR': this.IndustryList[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'Sales': this.IndustryList[j]['Sales'] || 0.00 });
    }

    for (let j = 0; j < (this.ContractingList).length; j++) {
      const forms = this.Form5Contracting.get('fields') as FormArray;
      if (this.ContractingList[j]['GovtContractProf'] == "0.00") {
        forms.controls['ScheduleGovProfits'] = false;
      }
      let form = this.addForm2(j + 1);
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.ContractingList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'GovernmentCont': this.ContractingList[j]['GovtContractProf'] || 0.00 });
      forms.controls[j].patchValue({ 'ProfitfromCivil': this.ContractingList[j]['CivilContrRev'] || 0.00 });
      forms.controls[j].patchValue({ 'OtherProfit': this.ContractingList[j]['OtherIncome'] || 0.00 });
      forms.controls[j].patchValue({ 'totalProfits': this.ContractingList[j]['TotalProfit'] || 0.00 });
      forms.controls[j].patchValue({ 'NoofLabours': (+this.ContractingList[j]['NoOfLabours']).toString() || 0 });
    }
    for (let j = 0; j < (this.InvstRealEstList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Invst.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.InvstRealEstList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'City': this.InvstRealEstList[j]['City'] || '' });
      forms.controls[j].patchValue({ 'Revenue': this.InvstRealEstList[j]['Revenue'] || 0.00 });
      forms.controls[j].patchValue({ 'Expenses': this.InvstRealEstList[j]['Expenses'] || 0.00 });
      forms.controls[j].patchValue({ 'NetProfit': this.InvstRealEstList[j]['NetPft'] || 0.00 });
    }

    for (let j = 0; j < (this.HotelsList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Hotels.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.HotelsList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'NoofRooms': (+this.HotelsList[j]['NoOfRooms']).toString() || 0 });
      forms.controls[j].patchValue({ 'RoomRate': this.HotelsList[j]['RoomRate'] || 0.00 });
      forms.controls[j].patchValue({ 'AddRoomRate': this.HotelsList[j]['AddRoomRate'] || 0.00 });
      forms.controls[j].patchValue({ 'ServiceFees': this.HotelsList[j]['ServicFee'] || 0.00 });
      forms.controls[j].patchValue({ 'OccupancyRate': this.HotelsList[j]['OccRate'] || 0.00 });
      forms.controls[j].patchValue({ 'City': this.HotelsList[j]['City'] || '' });
      forms.controls[j].patchValue({ 'Ownedyou': this.HotelsList[j]['Owned'] || "" });
      forms.controls[j].patchValue({ 'Revenue': this.HotelsList[j]['Revenue'] || 0.00 });
      forms.controls[j].patchValue({ 'Expenses': this.HotelsList[j]['Expenses'] || 0.00 });
      forms.controls[j].patchValue({ 'NetProfit': this.HotelsList[j]['NetProfit'] || 0.00 });
    }
    for (let j = 0; j < (this.EduHealthList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Health.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.EduHealthList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'ValueofSubsidy': this.EduHealthList[j]['SubsidyVal'] || 0.00 });
      forms.controls[j].patchValue({ 'Revenue': this.EduHealthList[j]['Revenue'] || 0.00 });
      forms.controls[j].patchValue({ 'Expenses': this.EduHealthList[j]['Expenses'] || 0.00 });
      forms.controls[j].patchValue({ 'NetProfit': this.EduHealthList[j]['NetPft'] || 0.00 });
    }

    for (let j = 0; j < (this.PoultryList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Poultry.get('fields') as FormArray;
      forms.push(form);
      console.log("this.PoultryList[j]['IncrInCap'] ", this.PoultryList[j]['IncrInCap'])
      if (this.PoultryList[j]['IncrInCap'] != 0.00) {
        forms.controls[j].patchValue({ 'SchedulePoultry': true });
      }
      forms.controls[j].patchValue({ 'outletName': this.PoultryList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'DeclaredCapital': this.PoultryList[j]['Capital'] || 0.00 });
      forms.controls[j].patchValue({ 'IncreaseinCapital': this.PoultryList[j]['IncrInCap'] || 0.00 });
      forms.controls[j].patchValue({ 'Capitalrate': this.PoultryList[j]['CapitalRate'] || 0.00 });
      forms.controls[j].patchValue({ 'Profit': this.PoultryList[j]['Profits'] || 0.00 });
    }

    for (let j = 0; j < (this.CarsList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Cars.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.CarsList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'ShareCapital': this.CarsList[j]['ShareCap'] || 0.00 });
      forms.controls[j].patchValue({ 'InternalProcurement': this.CarsList[j]['IntrPurchase'] || 0.00 });
      forms.controls[j].patchValue({ 'Imports': this.CarsList[j]['ForgPurchase'] || 0.00 });
      forms.controls[j].patchValue({ 'Sales': this.CarsList[j]['Sales'] || 0.00 });
      forms.controls[j].patchValue({ 'Percentagesales': this.CarsList[j]['PerSalesGain'] || 0.00 });

    }

    for (let j = 0; j < (this.MineralsList).length; j++) {

      let form = this.addForm2(j + 1);
      const forms = this.Form5Minerals.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'outletName': this.MineralsList[j]['ActDesc'] || '' });
      forms.controls[j].patchValue({ 'ShareCapitalmineral': this.MineralsList[j]['ShareCap'] || 0.00 });
      forms.controls[j].patchValue({ 'InternalProcurement': this.MineralsList[j]['IntrPurchase'] || 0.00 });
      forms.controls[j].patchValue({ 'Imports': this.MineralsList[j]['ForgPurchase'] || 0.00 });
      forms.controls[j].patchValue({ 'Percentagesalesgain': this.MineralsList[j]['PerSalesGain'] || 0.00 });

    }

    this.Form5Additional.controls['noOfBranch'].setValue(this.AdditionalList['ANoBranches'] || 0);
    this.Form5Additional.controls['noOfEmployees'].setValue((+this.AdditionalList['ANoEmp']).toString() || 0);

    this.Form5Additional.controls['Yearlyrent'].setValue(this.AdditionalList['AAnnualRent'] || 0.00);

    this.Form5Additional.controls['TotalofAnnualSalary'].setValue(this.AdditionalList['ATotAnnualSal'] || 0.00);

    this.Form5Additional.controls['ZakatBase'].setValue(this.AdditionalList['ACapital'] || 0.00);

    this.Form5Additional.controls['ShareinCompany'].setValue(this.AdditionalList['APlShare'] || 0.00);

    // this.Form5Additional.se.noOfBranch = this.AdditionalList['ANoBranches'] || 0.00 ;
    // this.Form5Additional.value.noOfEmployees = this.AdditionalList['ANoEmp'] || 0.00 ;
    // this.Form5Additional.value.Yearlyrent = this.AdditionalList['AAnnualRent'] || 0.00 ;
    // this.Form5Additional.value.TotalofAnnualSalary = this.AdditionalList['ATotAnnualSal'] || 0.00 
    // this.Form5Additional.value.ZakatBase = this.AdditionalList['ACapital'] || 0.00 ;
    // this.Form5Additional.value.ShareinCompany = this.AdditionalList['APlShare'] || 0.00 ;
    // console.log("this.Form5Additional.value.noOfBranch",this.Form5Additional.value.noOfBranch);

  }


  get formsControls() {
    return this.Form5Form.get('fields')['controls'];
  }
  get formsControls1() {
    return this.Form5FormPro.get('fields')['controls'];
  }
  get formsControls2() {
    return this.Form5FormSell.get('fields')['controls'];
  }
  get formsControls3() {
    return this.Form5LaborOccup.get('fields')['controls'];
  }
  get formsControls4() {
    return this.Form5Industry.get('fields')['controls'];
  }
  get formsControls5() {
    return this.Form5Contracting.get('fields')['controls'];
  }
  get formsControls6() {
    return this.Form5Invst.get('fields')['controls'];
  }
  get formsControls7() {
    return this.Form5Hotels.get('fields')['controls'];
  }
  get formsControls8() {
    return this.Form5Health.get('fields')['controls'];
  }
  get formsControls9() {
    return this.Form5Poultry.get('fields')['controls'];
  }
  get formsControls10() {
    return this.Form5Cars.get('fields')['controls'];
  }
  get formsControls11() {
    return this.Form5Minerals.get('fields')['controls'];
  }
  // get formsControls12() {	
  //   return this.Form5Additional.get('fields')['controls'];	
  // }	
  get formsControlsCabs():FormArray {
    return this.CabsExpenses.get('fields') as FormArray;
  }
  get formsControlsProfEx() {
    return this.ProfExpenses.get('fields') as FormArray;
  }
  get formsControlsSellBuyEx() {
    return this.SellBuyExpenses.get('fields') as FormArray;
  }
  get formsControlsLabourEx() {
    return this.LabourExpenses.get('fields') as FormArray;
  }
  get formsControlsInvstRealEx() {
    return this.InvstRealExpenses.get('fields') as FormArray;
  }
  get formsControlsHotelsEx() {
    return this.HotelsExpenses.get('fields') as FormArray;
  }
  get formsControlsEduHealthEx() {
    return this.EduHealthExpenses.get('fields') as FormArray;
  }
  get formsControlsEduAdditionalEx() {
    return this.AdditionalExpenses.get('fields') as FormArray;
  }
  get formsControlsTr1() {
    return this.Form5FormTrading1.get('fields') as FormArray;
  }
  get formsControlsTr2() {
    return this.Form5FormTrading2.get('fields') as FormArray;
  }
  get formsControlsTr3() {
    return this.Form5FormTrading3.get('fields') as FormArray;
  }
  get formsControlsTr4() {
    return this.Form5FormTrading4.get('fields') as FormArray;
  }
  get formsControlsTr5() {
    return this.Form5FormTrading5.get('fields') as FormArray;
  }
  get formsControlsTr6() {
    return this.Form5FormTrading6.get('fields') as FormArray;
  }
  get formsControlspProfit1() {
    return this.Form5FormProfitModel1.get('fields') as FormArray;
  }
  get formsControlspProfit2() {
    return this.Form5FormProfitModel2.get('fields') as FormArray;
  }
  get formsControlspProfit3() {
    return this.Form5FormProfitModel3.get('fields') as FormArray;
  }
  get formsControlsCapital():FormArray {
    return this.Form5FormCapitalModel.get('fields') as FormArray;
  }

  GlobalNumberAllow(event) {
    var rgx = /^[0-9]*\.?[0-9]*$/;

    if (rgx.test(event.target.value)) {
      return true;

    }
    else if (event.keyCode == 32) {
      return false;
    }
  }

  GlobalNumberAllow1(event) {
    var rgx = /^\d{0,13}(\.\d{0,2})?$/;
    if (event.keyCode == 8) {
      return true;
    }
    else if (event.keyCode == 32) {
      event.preventDefault();
    }
    else if (!rgx.test((event.target.value).toString().replace(/,/g, ''))) {
      event.preventDefault();
    }
  }

  onAddMultipleFormsCabs(i) {
    const fields = this.CabsExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      //const forms = this.addForm((this.CabsExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addCabsForm());
    }
    jQuery("#addMultipleFormsModalCabs").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  onAddMultipleFormsAdditionals(i) {
    const fields = this.AdditionalExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.AdditionalExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addAdditionalScheduleForm())
    }

    jQuery("#addMultipleFormsModalCabs").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleFormsProf(i) {
    const fields = this.ProfExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.ProfExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addProfExpensesForm())
    }

    jQuery("#addMultipleFormsModalProf").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleFormsSellBuy(i) {
    const fields = this.SellBuyExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.SellBuyExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addSellBuyExpensesForm())
    }

    jQuery("#addMultipleFormsModalSellBuy").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleFormsLabour(i) {
    const fields = this.LabourExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.LabourExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addLabourExpensesForm())
    }

    jQuery("#addMultipleFormsModalLabour").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleFormsInvstReal(i) {
    const fields = this.InvstRealExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.InvstRealExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addInstRealExpensesForm())
    }

    jQuery("#addMultipleFormsModalInvstReal").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleFormsHotels(i) {
    const fields = this.HotelsExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.HotelsExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addHotelsExpensesForm())
    }

    jQuery("#addMultipleFormsModalHotels").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleFormsEduHealth(i) {
    const fields = this.EduHealthExpenses.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      // const forms = this.addForm((this.EduHealthExpenses.get('fields') as FormArray).length + 1);
      fields.push(this.addEduHealthExpensesForm())
    }

    jQuery("#addMultipleFormsModalEduHealth").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  onAddMultipleProfitForms1(i) {
    const fields = this.Form5FormProfitModel1.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      //const forms = this.addFormProfit((this.Form5FormProfitModel1.get('fields') as FormArray).length + 1);
      fields.push(this.addFormProfitCivil())
    }

    jQuery("#addMultipleFormsProfitModal1").modal('hide');
    jQuery('body').addClass('modalopen');
  }

  onAddMultipleProfitForms2(i) {
    const fields = this.Form5FormProfitModel1.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      //const forms = this.addFormProfit((this.Form5FormProfitModel1.get('fields') as FormArray).length + 1);
      fields.push(this.addFormProfitOther())
    }

    jQuery("#addMultipleFormsProfitModal2").modal('hide');
    jQuery('body').addClass('modalopen');
  }


  onAddMultipleProfitForms3(i) {
    const fields = this.Form5FormProfitModel2.get('fieldsProfit3') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      //const forms = this.addFormProfit((this.Form5FormProfitModel2.get('fieldsProfit3') as FormArray).length + 1);
      fields.push(this.addFormProfitGov())
    }

    jQuery("#addMultipleFormsProfitModal3").modal('hide');
    jQuery('body').addClass('modalopen');
  }
  onAddMultipleCapitalForms(i) {
    // console.logs()
    const fields = this.Form5FormCapitalModel.get('fields') as FormArray;

    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      //const forms = this.addFormProfit((this.Form5FormCapitalModel.get('fields') as FormArray).length + 1);
      fields.push(this.addFormCapital())
      console.log("fields add capital", fields)
    }

    jQuery("#addMultipleFormsCapitalModal").modal('hide');
    jQuery('body').addClass('modalopen');

  }

  addMultipleTr1Forms(i) {
    const fields = this.Form5FormTrading1.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      const forms = this.addFormTr((this.Form5FormTrading1.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }
    jQuery("#addMultipleFormsModalTr1").modal('hide');
    jQuery('body').addClass('modalopen');

  }

  addMultipleTr2Forms(i) {
    const fields = this.Form5FormTrading2.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      const forms = this.addFormTr((this.Form5FormTrading2.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }
    jQuery("#addMultipleFormsModalTr2").modal('hide');
    jQuery('body').addClass('modalopen');

  }

  addMultipleTr3Forms(i) {
    const fields = this.Form5FormTrading3.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      const forms = this.addFormTr((this.Form5FormTrading3.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }

    jQuery("#addMultipleFormsModalTr3").modal('hide');
    jQuery('body').addClass('modalopen');

  }

  addMultipleTr4Forms(i) {
    const fields = this.Form5FormTrading4.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      const forms = this.addFormTr((this.Form5FormTrading4.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }

    jQuery("#addMultipleFormsModalTr4").modal('hide');
    jQuery('body').addClass('modalopen');

  }
  addMultipleTr5Forms(i) {
    const fields = this.Form5FormTrading5.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      const forms = this.addFormTr((this.Form5FormTrading5.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }

    jQuery("#addMultipleFormsModalTr5").modal('hide');
    jQuery('body').addClass('modalopen');

  }
  addMultipleTr6Forms(i) {
    const fields = this.Form5FormTrading6.get('fields') as FormArray;
    for (let j = 0; j < this.NoOfFormsAdded; j++) {
      const forms = this.addFormTr((this.Form5FormTrading6.get('fields') as FormArray).length + 1);
      fields.push(forms)
    }

    jQuery("#addMultipleFormsModalTr6").modal('hide');
    jQuery('body').addClass('modalopen');

  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  onAddFormAdditional(i) {
    this.fieldsExample = this.AdditionalExpenses.get('fields') as FormArray;
    this.fieldsExample.push(this.addForm(i));
    // this.AdditionalInfoCalculations();
    // this.BindGeneralTrading();	

    // console.log("add form push",this.fields);	  
  }
  onAddFormCabs(i) {
    this.fieldsExample = this.CabsExpenses.get('fields') as FormArray;
    console.log("onAddFormCabs  this.fieldsExample ", this.fieldsExample)
    this.fieldsExample.push(this.addCabsForm());
    // this.BindGeneralTrading();	
    // this.CabsExpensesCalculations();



    // console.log("add form push",this.fields);	  
  }

  onAddFormProf(i) {
    console.log("hihello")
  const field1 = this.ProfExpenses.get('fields') as FormArray;
  field1.push(this.addProfExpensesForm());
    // this.ProfExpensesCalculations();
    // this.BindGeneralTrading();	

    // console.log("add form push",this.fields);	  
  }
  onAddFormSellBuy(i) {
    this.fieldsExample = this.SellBuyExpenses.get('fields') as FormArray;
    this.fieldsExample.push(this.addSellBuyExpensesForm());
    // this.SellBuyExpensesCalculations();
    // this.BindGeneralTrading();	

    // console.log("add form push",this.fields);	  
  }
  onAddFormLabour(i) {
    this.fieldsExample = this.LabourExpenses.get('fields') as FormArray;
    this.fieldsExample.push(this.addLabourExpensesForm());
    // this.LabourExpensesCalculations();
    // this.BindGeneralTrading();	

    // console.log("add form push",this.fields);	  
  }
  onAddFormInvstReal(i) {
    this.fieldsExample = this.InvstRealExpenses.get('fields') as FormArray;
    this.fieldsExample.push(this.addInstRealExpensesForm());
    // this.InvstRealExpensesCalculations();
    // this.BindGeneralTrading();

    // console.log("add form push",this.fields);	  
  }
  onAddFormHotels(i) {
    this.fieldsExample = this.HotelsExpenses.get('fields') as FormArray;
    this.fieldsExample.push(this.addHotelsExpensesForm());
    // this.HotelsExpensesCalculations();
    // this.BindGeneralTrading();	

  }
  onAddFormEduHealth(i) {
    this.fieldsExample = this.EduHealthExpenses.get('fields') as FormArray;
    this.fieldsExample.push(this.addEduHealthExpensesForm());
    // this.EduHealthExpensesCalculations();
    // this.BindGeneralTrading();	

  }
  //trading
  onAddFormtr1(i) {
    console.log("addform")
    this.fieldsTr1 = this.Form5FormTrading1.get('fields') as FormArray;
    this.fieldsTr1.push(this.addFormTr(i));
    // this.Form5TradingCalculations();
    // this.BindGeneralTrading();	
    // this.Form5TradingCalculations();
  }
  onAddFormtr2(i) {
    this.fieldsTr2 = this.Form5FormTrading2.get('fields') as FormArray;
    this.fieldsTr2.push(this.addFormTr(i));
    // this.BindGeneralTrading();
    // this.Form5TradingCalculations();


  }
  onAddFormtr3(i) {
    this.fieldsTr3 = this.Form5FormTrading3.get('fields') as FormArray;
    this.fieldsTr3.push(this.addFormTr(i));
    // this.BindGeneralTrading();
    // this.Form5TradingCalculations();

  }

  onAddFormtr4(i) {
    this.fieldsTr4 = this.Form5FormTrading4.get('fields') as FormArray;
    this.fieldsTr4.push(this.addFormTr(i));
    // this.BindGeneralTrading();
    // this.Form5TradingCalculations();

  }
  onAddFormtr5(i) {
    this.fieldsTr5 = this.Form5FormTrading5.get('fields') as FormArray;
    this.fieldsTr5.push(this.addFormTr(i));
    // this.BindGeneralTrading();
    // this.Form5TradingCalculations();

  }
  onAddFormtr6(i) {
    this.fieldsTr6 = this.Form5FormTrading6.get('fields') as FormArray;
    this.fieldsTr6.push(this.addFormTr(i));
    // this.BindGeneralTrading();
    // this.Form5TradingCalculations();

  }


  //profit popup
  onAddFormProfit1(i) {
    this.fieldsProfit1 = this.Form5FormProfitModel1.get('fields') as FormArray;
    this.fieldsProfit1.push(this.addFormProfitCivil());
  }
  onAddFormProfit2(i) {
    this.fieldsProfit2 = this.Form5FormProfitModel2.get('fields') as FormArray;
    this.fieldsProfit2.push(this.addFormProfitOther());
  }
  onAddFormProfit3(i) {
    this.fieldsProfit3 = this.Form5FormProfitModel3.get('fields') as FormArray;
    this.fieldsProfit3.push(this.addFormProfitGov());
  }
  //capital
  onAddFormCapital(i) {
    this.fields = this.Form5FormCapitalModel.get('fields') as FormArray;
    this.fields.push(this.addFormCapital());
    //this.BindGeneralTrading();
    // this.Form5CapitalCalculations();

  }


  downloadExcel() {

  }

  deleteFormAdd(i) {

    const control = this.AdditionalExpenses.get('fields') as FormArray;
    console.log(control, i)
    if (i > 0) {
      control.removeAt(i);
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormCabs(i);
    }
    this.errorTin[i]=false;
    this.AdditionalInfoCalculations();

  }

  deleteFormCabs(i) {

    const control = this.CabsExpenses.get('fields') as FormArray;
    if (i >= 0) {
      if (i > 0) {
        control.removeAt(i);

      }

    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormCabs(i);
    }
    this.CabsExpensesCalculations();
  }
  deleteFormProf(i) {

    const control = this.ProfExpenses.get('fields') as FormArray;

    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);

      }
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormProf(i);
    }
    this.ProfExpensesCalculations();

  }
  deleteFormSellBuy(i: number) {

    const control = this.SellBuyExpenses.get('fields') as FormArray;
    console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormSellBuy(i);
    }
    this.SellBuyExpensesCalculations();

  }
  deleteFormLabour(i) {

    const control = this.LabourExpenses.get('fields') as FormArray;
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormLabour(i);
    }
    this.LabourExpensesCalculations();

  }
  deleteFormInvstReal(i) {

    const control = this.InvstRealExpenses.get('fields') as FormArray;
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormInvstReal(i);
    }
    this.InvstRealExpensesCalculations();

  }
  deleteFormHotels(i: number) {

    const control = this.HotelsExpenses.get('fields') as FormArray;
    console.log(control, i)

    if (i > 0) {
      control.removeAt(i);
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormHotels(i);
    }
    this.HotelsExpensesCalculations();

  }
  deleteFormEduHealth(i) {

    const control = this.EduHealthExpenses.get('fields') as FormArray;

    if (i > 0) {

      control.removeAt(i);

    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormEduHealth(i);
    }
    this.EduHealthExpensesCalculations();

  }
  deleteFormTr1(i) {
    const control = this.Form5FormTrading1.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {

      control.removeAt(i);

    }
    else {
      this.clearFormArray(this.fieldsTr1);
      this.onAddFormtr1(i);
    }
    this.Form5TradingCalculations();
  }

  deleteFormTr2(i) {
    const control = this.Form5FormTrading2.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsTr2);
      this.onAddFormtr2(i);
    }
    this.Form5TradingCalculations();

  }

  deleteFormTr3(i) {
    const control = this.Form5FormTrading3.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsTr3);
      this.onAddFormtr3(i);
    }
    this.Form5TradingCalculations();

  }

  deleteFormTr6(i) {
    const control = this.Form5FormTrading6.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsTr6);
      this.onAddFormtr6(i);
    }
    this.Form5TradingCalculations();

  }

  deleteFormTr4(i) {
    const control = this.Form5FormTrading4.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsTr4);
      this.onAddFormtr4(i);
    }
    this.Form5TradingCalculations();

  }

  deleteFormTr5(i) {
    const control = this.Form5FormTrading5.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsTr5);
      this.onAddFormtr5(i);
    }
    this.Form5TradingCalculations();

  }

  deleteFormProfit1(i) {
    const control = this.Form5FormProfitModel1.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsProfit1);
      this.onAddFormProfit1(i);
    }
    this.Form5ProfitCalculations();
  }

  deleteFormProfit2(i) {
    const control = this.Form5FormProfitModel2.get('fields') as FormArray;
    // console.log(control, i)
    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsProfit2);
      this.onAddFormProfit2(i);
    }
    this.Form5ProfitCalculations();

  }

  deleteFormProfit3(i) {
    const control = this.Form5FormProfitModel3.get('fields') as FormArray;

    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fieldsProfit3);
      this.onAddFormProfit3(i);
    }
    this.Form5ProfitCalculations();

  }

  deleteFormCapital(i) {
    const control = this.Form5FormCapitalModel.get('fields') as FormArray;

    if (i > 0) {
      if (i > 0) {
        control.removeAt(i);
      }
    }
    else {
      this.clearFormArray(this.fields);
      this.onAddFormCapital(i);
    }
    this.Form5CapitalCalculations();
  }

  SaveAsDraft(){
    this.basicInformationObj["Savez"] = "X";
    this.basicInformationObj["UserType"] = "TP";
    this.returnsService.submitForm5(this.basicInformationObj).subscribe((data) => { 
      this.basicInformationObj = data['d'];
     });
  }

  SaveSchedulescabs(totalvalue) {
    // console.log(" SaveSchedulescabs totalvalue", totalvalue)
    this.fields = this.Form5Form.get('fields') as FormArray;
    // for(let i=0;i<this.fields.length;i++){
    this.fields.controls[0].patchValue({ 'Expenses': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    if(this.fields.controls[0].value.Expenses > 0) {
      this.fields.controls['ScheduleCabs'] = true;
    }
    else {
      this.fields.controls['ScheduleCabs'] = false;
    }
    this.ValidateCABS(this.indexCabs);
    // }
    this.fieldsCabs = this.CabsExpenses.get('fields') as FormArray;

    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP01");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.fieldsCabs.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsCabs.value[i].Description1.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsCabs.value[i].Amount1;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP01";
      i++;
    }

    this.SaveAsDraft();    
    jQuery("#ExpensesModalCabs").modal('hide');

  }
  SaveSchedulesProf(totalvalue) {

    this.fields = this.Form5FormPro.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses1': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    if(this.fields.value[0].Expenses1 > 0 ) {
      this.fields.controls['ScheduleProf'] = true;
    }
    else {
      this.fields.controls['ScheduleProf'] = false;
    }
    
    this.fieldsProf = this.ProfExpenses.get('fields') as FormArray;
    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP02");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.fieldsProf.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsProf.value[i].Description2.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsProf.value[i].Amount2;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP02";
      i++;
    }

    this.SaveAsDraft();    
    jQuery("#ExpensesModalProff").modal('hide');

  }
  SaveSchedulessell(totalvalue) {
    // console.log(" SaveSchedulescabs totalvalue", totalvalue)
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    if(this.fields.value[0].Expenses > 0) {
      this.fields.controls['ScheduleBuy'] = true;
    }
    else {
      this.fields.controls['ScheduleBuy'] = false;
    }
    this.fieldsSell = this.SellBuyExpenses.get('fields') as FormArray;
    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP03");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.fieldsSell.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsSell.value[i].Description3.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsSell.value[i].Amount3;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP03";
      i++;
    }

    this.SaveAsDraft();
    jQuery("#ExpensesModalsellBuy").modal('hide');


  }
  SaveSchedulesLabour(totalvalue) {

    this.fields = this.Form5LaborOccup.get('fields') as FormArray;
    console.log("SaveSchedulesLabour this.fields", this.fields)
    this.fields.controls[0].patchValue({ 'Expenses': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls['ScheduleLabourOccup'] = true;
    this.ValidateLabourOccup(this.indexLabour);

    this.fieldsLabour = this.LabourExpenses.get('fields') as FormArray;
    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP04");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.fieldsLabour.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.fieldsLabour.value[i].Description4.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.fieldsLabour.value[i].Amount4;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP04";
      i++;
    }

    this.SaveAsDraft();
    jQuery("#ExpensesModalLaborOccup").modal('hide');
  }

  SaveSchedulesInvst(totalvalue) {

    this.fields = this.Form5Invst.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls['ScheduleInvst'] = true;
    this.ValidateInvstRealEstate(this.indexInvestReal);

    this.fieldsInvst = this.InvstRealExpenses.get('fields') as FormArray;
    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP07");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.InvstRealExpenses.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.InvstRealExpenses.value[i].Description5.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.InvstRealExpenses.value[i].Amount5;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP07";
      i++;
    }

    this.SaveAsDraft();
    jQuery("#ExpensesModalInvstRealEst").modal('hide');
  }

  SaveSchedulesHotels(totalvalue) {
    this.fields = this.Form5Hotels.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls['ScheduleHotels'] = true;
    this.ValidateHotels(this.indexHotel);

    this.fieldsHotels = this.HotelsExpenses.get('fields') as FormArray;
    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP08");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.HotelsExpenses.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.HotelsExpenses.value[i].Description6.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.HotelsExpenses.value[i].Amount6;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP08";
      i++;
    }

    this.SaveAsDraft();
    jQuery("#ExpensesModalHotels").modal('hide');

  }

  SaveSchedulesEduHealth(totalvalue) {

    this.fields = this.Form5Health.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls['ScheduleHealth'] = true;
    this.ValidateEduHealth(this.indexEduHealth);

    this.fieldsEdu = this.EduHealthExpenses.get('fields') as FormArray;
    this.basicInformationObj["GEN_SUB_SCH"]["results"] =  this.basicInformationObj["GEN_SUB_SCH"]["results"].filter(x => x['GrpNm'] != "GP09");
    let i=0;
    const length = this.basicInformationObj["GEN_SUB_SCH"]["results"].length;
    for (let j = length; j < length+(this.EduHealthExpenses.value).length; j++) {
      this.basicInformationObj["GEN_SUB_SCH"]["results"].push({});

      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Description'] = this.EduHealthExpenses.value[i].Description7.toString();
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['Amount'] = this.EduHealthExpenses.value[i].Amount7;
      this.basicInformationObj["GEN_SUB_SCH"]["results"][j]['GrpNm'] = "GP09";
      i++;
    }

    this.SaveAsDraft();
    jQuery("#ExpensesModalEduHealth").modal('hide');
  }

  SaveSchedulesAditional(totalvalue) {
    // this.fields = this.Form5Additional.get('fields') as FormArray;
    this.Form5Additional.controls['ShareinCompany'].setValue((parseFloat(totalvalue).toFixed(2)) || 0.00);
    this.Form5Additional.controls['ShareinCompany'].setValue(true);

    this.fieldsAdditional = this.AdditionalExpenses.get('fields') as FormArray;
    this.basicInformationObj["SCH_200Set"]["results"] =[];

    for (let j = 0; j < (this.fieldsAdditional.value).length; j++) {
      this.basicInformationObj["SCH_200Set"]["results"].push({});

      this.basicInformationObj["SCH_200Set"]["results"][j]['Tin'] = this.fieldsAdditional.value[j].Tin;
      this.basicInformationObj["SCH_200Set"]["results"][j]['Name'] = this.fieldsAdditional.value[j].Name;
      this.basicInformationObj["SCH_200Set"]["results"][j]['Amount'] = this.fieldsAdditional.value[j].AmountOfProfit;
    }

    this.SaveAsDraft();
    jQuery("#AdditionalModal").modal('hide');


    // this.Form5Additional.controls['ScheduleAdditional']=true;  

  }

  SaveProfitFromCivil(totalProfitsofContract) {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    //this.fields.controls[0].patchValue({ 'ProfitfromCivil': (parseFloat(totalProfitsofContract).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'ProfitfromCivil':   this.totalContractValue*0.105>this.totalProfitsofContract?(this.totalContractValue*0.105).toFixed(2):this.totalProfitsofContract.toFixed(2) || "0.00" })
    this.fields.controls[0].patchValue({ 'totalProfits': ((+this.fields.controls[0].get('GovernmentCont').value)+(+this.fields.controls[0].get('ProfitfromCivil').value)+(+this.fields.controls[0].get('OtherProfit').value)).toFixed(2)  || "0.00" });
    this.fields.controls['ScheduleProfitfromCivil'] = true;

    this.fieldsProfit1 = this.Form5FormProfitModel1.get('fields') as FormArray;
    this.basicInformationObj["GP06_2Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsProfit1.value).length; j++) {
      this.basicInformationObj["GP06_2Set"]["results"].push({});

      this.basicInformationObj["GP06_2Set"]["results"][j]['TincrnoInd'] = this.fieldsProfit1.value[j].identificationType;
      this.basicInformationObj["GP06_2Set"]["results"][j]['Tin'] = this.fieldsProfit1.value[j].AmountofContractingParty;
      this.basicInformationObj["GP06_2Set"]["results"][j]['ContractingName'] = this.fieldsProfit1.value[j].ContractingPartyName;
      this.basicInformationObj["GP06_2Set"]["results"][j]['Description'] = this.fieldsProfit1.value[j].Description.toString();
      this.basicInformationObj["GP06_2Set"]["results"][j]['ContractVal'] = this.fieldsProfit1.value[j].ContractValue1;
      this.basicInformationObj["GP06_2Set"]["results"][j]['StipendContr'] = this.fieldsProfit1.value[j].StipendContract1;
      this.basicInformationObj["GP06_2Set"]["results"][j]['PrfOfConrtact'] = (+this.fieldsProfit1.controls[j].value.ProfitsofContract1).toFixed(2);

    }

    this.SaveAsDraft();
    jQuery("#ProfitModal1").modal('hide');


  }
  SaveGovernmentContProfit(totalvalue) {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    // this.fields.controls[0].patchValue({ 'GovernmentCont': (parseFloat(totalvalue).toFixed(2)) || 0.00 })
    this.fields.controls[0].patchValue({ 'GovernmentCont':   this.totalContractValue2*0.105>this.totalProfitsofContract2?(this.totalContractValue2*0.105).toFixed(2):this.totalProfitsofContract2.toFixed(2) || "0.00" });
    this.fields.controls[0].patchValue({ 'totalProfits': ((+this.fields.controls[0].get('GovernmentCont').value)+(+this.fields.controls[0].get('ProfitfromCivil').value)+(+this.fields.controls[0].get('OtherProfit').value)).toFixed(2)  || "0.00" });
    this.fields.controls['ScheduleGovProfits'] = true;

    this.fieldsProfit3 = this.Form5FormProfitModel3.get('fields') as FormArray;
    this.basicInformationObj["GP06_1Set"]["results"] =[];

    for (let j = 0; j < (this.fieldsProfit3.value).length; j++) {
      this.basicInformationObj["GP06_1Set"]["results"].push({});

      this.basicInformationObj["GP06_1Set"]["results"][j]['GovCode'] = this.fieldsProfit3.value[j].govCode;
      this.basicInformationObj["GP06_1Set"]["results"][j]['Description'] = this.fieldsProfit3.value[j].Description.toString();
      this.basicInformationObj["GP06_1Set"]["results"][j]['ContractVal'] = this.fieldsProfit3.value[j].ContractValue;
      this.basicInformationObj["GP06_1Set"]["results"][j]['StipendContr'] = this.fieldsProfit3.value[j].StipendContract;
      this.basicInformationObj["GP06_1Set"]["results"][j]['PrfOfConrtact'] = (+this.fieldsProfit3.value[j].ProfitsofContract).toFixed(2);
    }

    this.SaveAsDraft();
    jQuery("#ProfitModal").modal('hide');

  }

  SaveOtherProfit(totalvalue) {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    //this.fields.controls[0].patchValue({ 'OtherProfit': (parseFloat(totalvalue).toFixed(2)) || 0.00 })
    this.fields.controls[0].patchValue({ 'OtherProfit':   this.totalContractValue1*0.105>this.totalProfitsofContract1?(this.totalContractValue1*0.105).toFixed(2):this.totalProfitsofContract1.toFixed(2) || "0.00" });
    this.fields.controls[0].patchValue({ 'totalProfits': ((+this.fields.controls[0].get('GovernmentCont').value)+(+this.fields.controls[0].get('ProfitfromCivil').value)+(+this.fields.controls[0].get('OtherProfit').value)).toFixed(2)  || "0.00" });
    this.fields.controls['ScheduleOtherProfit'] = true;

    this.fieldsProfit2 = this.Form5FormProfitModel2.get('fields') as FormArray;
    this.basicInformationObj["GP06_3Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsProfit2.value).length; j++) {
      this.basicInformationObj["GP06_3Set"]["results"].push({});

      this.basicInformationObj["GP06_3Set"]["results"][j]['Description'] = this.fieldsProfit2.value[j].Description.toString();
      this.basicInformationObj["GP06_3Set"]["results"][j]['ContractVal'] = this.fieldsProfit2.value[j].ContractValue;
      this.basicInformationObj["GP06_3Set"]["results"][j]['StipendContr'] = this.fieldsProfit2.value[j].StipendContract;
      this.basicInformationObj["GP06_3Set"]["results"][j]['PrfOfConrtact'] = (+this.fieldsProfit2.value[j].ProfitsofContract).toFixed(2);
    }

    this.SaveAsDraft();
    jQuery("#ProfitModal2").modal('hide');

  }

  SaveCapital(totalcapialvalue) {
    this.fields = this.Form5Poultry.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'IncreaseinCapital': (parseFloat(totalcapialvalue).toFixed(2)) || 0.00 });
    this.fields.controls['SchedulePoultry'] = true;
    this.ValidatePoultryFishFarms(this.indexPoultry);

    this.fieldsCapital = this.Form5FormCapitalModel.get('fields') as FormArray;
    this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"]=[];

    for (let j = 0; j < (this.fieldsCapital.value).length; j++) {
      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"].push({});

      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['Description'] = this.fieldsCapital.value[j].Description.toString();
      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['LoanDt'] = "\/Date(" + new Date(this.fieldsCapital.value[j].DateofLoan).getTime() + ")\/" || null;
      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['ApprovalDt'] = "\/Date(" + new Date(this.fieldsCapital.value[j].LastDayofBillingPeriod).getTime() + ")\/" || null;
      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['LoanVal'] = this.fieldsCapital.value[j].LoanValue.toString();
      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['NumberOfYr'] = this.fieldsCapital.value[j].NumberofYears.toString();
      this.basicInformationObj["SUB_SCH_CAPITALSet"]["results"][j]['IncrCapital'] = this.fieldsCapital.value[j].IncreaseinCapital.toString();
    }

    this.SaveAsDraft();
    jQuery("#capitalModal").modal('hide');

  }

  SaveImportsforGeneralTrading(totalvalue) {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ImportsforGeneralTrading': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'TotalofImports': (parseFloat(this.fields.value[0]['ImportsforGeneralTrading'])+parseFloat(this.fields.value[0]['ImportsforLivelihoods'])+parseFloat(this.fields.value[0]['ImportsforLivestock'])).toFixed(2) || "0.00" });
    this.fields.controls['ScheduleImpGeneralTrade'] = true;

    this.fieldsTr1 = this.Form5FormTrading1.get('fields') as FormArray;
    this.basicInformationObj["GP03_2Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsTr1.value).length; j++) {
      this.basicInformationObj["GP03_2Set"]["results"].push({});

      this.basicInformationObj["GP03_2Set"]["results"][j]['Description'] = this.fieldsTr1.value[j].description1.toString();
      this.basicInformationObj["GP03_2Set"]["results"][j]['SubDesc'] = this.fieldsTr1.value[j].subdescription1 || "";
      this.basicInformationObj["GP03_2Set"]["results"][j]['Value'] = this.fieldsTr1.value[j].tradingValue.toString();
      this.basicInformationObj["GP03_2Set"]["results"][j]['Profit'] = this.fieldsTr1.value[j].tradingProfit.toString();
      this.basicInformationObj["GP03_2Set"]["results"][j]['ProfitRatio'] = this.fieldsTr1.value[j].tradingProfitRatio || "0.00";
    }

    this.SaveAsDraft();
    jQuery("#generalTrading1").modal('hide');

  }
  SaveImportsforLivelihoods(totalvalue) {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ImportsforLivelihoods': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'TotalofImports': (parseFloat(this.fields.value[0]['ImportsforGeneralTrading'])+parseFloat(this.fields.value[0]['ImportsforLivelihoods'])+parseFloat(this.fields.value[0]['ImportsforLivestock'])).toFixed(2) || "0.00" });
    this.fields.controls['ScheduleImpLivelihoods'] = true;

    this.fieldsTr2 = this.Form5FormTrading2.get('fields') as FormArray;
    this.basicInformationObj["GP03_3Set"]["results"]=[];

    for (let j = 0; j < (this.fieldsTr2.value).length; j++) {
      this.basicInformationObj["GP03_3Set"]["results"].push({});

      this.basicInformationObj["GP03_3Set"]["results"][j]['Description'] = this.fieldsTr2.value[j].description1.toString();
      this.basicInformationObj["GP03_3Set"]["results"][j]['SubDescription'] = this.fieldsTr2.value[j].subdescription1 || "";
      this.basicInformationObj["GP03_3Set"]["results"][j]['Value'] = this.fieldsTr2.value[j].tradingValue.toString();
      this.basicInformationObj["GP03_3Set"]["results"][j]['Profit'] = this.fieldsTr2.value[j].tradingProfit.toString();
      this.basicInformationObj["GP03_3Set"]["results"][j]['ProfitRatio'] = this.fieldsTr2.value[j].tradingProfitRatio || "0.00";
    }
    
    this.SaveAsDraft();
    jQuery("#generalTrading2").modal('hide');

  }
  SaveImportsforLivestock(totalvalue) {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ImportsforLivestock': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'TotalofImports': (parseFloat(this.fields.value[0]['ImportsforGeneralTrading'])+parseFloat(this.fields.value[0]['ImportsforLivelihoods'])+parseFloat(this.fields.value[0]['ImportsforLivestock'])).toFixed(2) || "0.00" });
    this.fields.controls['ScheduleImpLivestock'] = true;

    this.fieldsTr3 = this.Form5FormTrading3.get('fields') as FormArray;
    this.basicInformationObj["GP03_4Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsTr3.value).length; j++) {
      this.basicInformationObj["GP03_4Set"]["results"].push({});

      this.basicInformationObj["GP03_4Set"]["results"][j]['Description'] = this.fieldsTr3.value[j].description1.toString();
      this.basicInformationObj["GP03_4Set"]["results"][j]['SubDesc'] = this.fieldsTr3.value[j].subdescription1 || "";
      this.basicInformationObj["GP03_4Set"]["results"][j]['Value'] = this.fieldsTr3.value[j].tradingValue.toString();
      this.basicInformationObj["GP03_4Set"]["results"][j]['Profit'] = this.fieldsTr3.value[j].tradingProfit.toString();
      this.basicInformationObj["GP03_4Set"]["results"][j]['ProfitRatio'] = this.fieldsTr3.value[j].tradingProfitRatio || "0.00";
    }

    this.SaveAsDraft();
    jQuery("#generalTrading3").modal('hide');

  }

  SaveGeneralTradingInternal(totalvalue) {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'GeneralTradingInternal': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'TotalProfits': (parseFloat(this.fields.value[0]['GeneralTradingInternal'])+parseFloat(this.fields.value[0]['LivelihoodsInternal'])+parseFloat(this.fields.value[0]['LivestockAnimals'])).toFixed(2) || "0.00" });
    this.fields.controls['ScheduleGentrInt'] = true;

    this.fieldsTr4 = this.Form5FormTrading4.get('fields') as FormArray;
    this.basicInformationObj["GP03_6Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsTr4.value).length; j++) {
      this.basicInformationObj["GP03_6Set"]["results"].push({});

      this.basicInformationObj["GP03_6Set"]["results"][j]['Description'] = this.fieldsTr4.value[j].description1.toString();
      this.basicInformationObj["GP03_6Set"]["results"][j]['SubDesc'] = this.fieldsTr4.value[j].subdescription1 || "";
      this.basicInformationObj["GP03_6Set"]["results"][j]['Value'] = this.fieldsTr4.value[j].tradingValue.toString();
      this.basicInformationObj["GP03_6Set"]["results"][j]['Profit'] = this.fieldsTr4.value[j].tradingProfit.toString();
      this.basicInformationObj["GP03_6Set"]["results"][j]['ProfitRatio'] = this.fieldsTr4.value[j].tradingProfitRatio || "0.00";
    }

    this.SaveAsDraft();
    jQuery("#generalTrading4").modal('hide');

  }


  SaveLivelihoodsInternal(totalvalue) {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'LivelihoodsInternal': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'TotalProfits': (parseFloat(this.fields.value[0]['GeneralTradingInternal'])+parseFloat(this.fields.value[0]['LivelihoodsInternal'])+parseFloat(this.fields.value[0]['LivestockAnimals'])).toFixed(2) || "0.00" });
    this.fields.controls['ScheduleLivelihoods'] = true;

    this.fieldsTr5 = this.Form5FormTrading5.get('fields') as FormArray;
    this.basicInformationObj["GP03_7Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsTr5.value).length; j++) {
      this.basicInformationObj["GP03_7Set"]["results"].push({});

      this.basicInformationObj["GP03_7Set"]["results"][j]['Description'] = this.fieldsTr5.value[j].description1.toString();
      this.basicInformationObj["GP03_7Set"]["results"][j]['SubDescription'] = this.fieldsTr5.value[j].subdescription1 || "";
      this.basicInformationObj["GP03_7Set"]["results"][j]['Value'] = this.fieldsTr5.value[j].tradingValue.toString();
      this.basicInformationObj["GP03_7Set"]["results"][j]['Profit'] = this.fieldsTr5.value[j].tradingProfit.toString();
      this.basicInformationObj["GP03_7Set"]["results"][j]['ProfitRatio'] = this.fieldsTr5.value[j].tradingProfitRatio || "0.00";
    }
    
    this.SaveAsDraft();
    jQuery("#generalTrading5").modal('hide');

  }

  SaveLivestockAnimals(totalvalue) {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'LivestockAnimals': (parseFloat(totalvalue).toFixed(2)) || 0.00 });
    this.fields.controls[0].patchValue({ 'TotalProfits': (parseFloat(this.fields.value[0]['GeneralTradingInternal'])+parseFloat(this.fields.value[0]['LivelihoodsInternal'])+parseFloat(this.fields.value[0]['LivestockAnimals'])).toFixed(2) || "0.00" });
    this.fields.controls['ScheduleLiveStock'] = true;

    this.fieldsTr6 = this.Form5FormTrading6.get('fields') as FormArray;
    this.basicInformationObj["GP03_8Set"]["results"] = [];

    for (let j = 0; j < (this.fieldsTr6.value).length; j++) {
      this.basicInformationObj["GP03_8Set"]["results"].push({});

      this.basicInformationObj["GP03_8Set"]["results"][j]['Description'] = this.fieldsTr6.value[j].description1.toString();
      this.basicInformationObj["GP03_8Set"]["results"][j]['SubDesc'] = this.fieldsTr6.value[j].subdescription1 || "";
      this.basicInformationObj["GP03_8Set"]["results"][j]['Value'] = this.fieldsTr6.value[j].tradingValue.toString();
      this.basicInformationObj["GP03_8Set"]["results"][j]['Profit'] = this.fieldsTr6.value[j].tradingProfit.toString();
      this.basicInformationObj["GP03_8Set"]["results"][j]['ProfitRatio'] = this.fieldsTr6.value[j].tradingProfitRatio || "0.00";
    }

    this.SaveAsDraft();
    jQuery("#generalTrading6").modal('hide');

  }



  CabsExpensesCalculations() {
    this.totalCabsExpensesvalue = 0;
    this.fields = this.CabsExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalCabsExpensesvalue = this.totalCabsExpensesvalue + (+this.fields.value[j].Amount1);
    }
    // console.log("this.totalCabsExpensesvalue", this.totalCabsExpensesvalue)
  }
  ProfExpensesCalculations() {
    this.totalProfExpensesvalue = 0;
    this.fields = this.ProfExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalProfExpensesvalue = this.totalProfExpensesvalue + (+this.fields.value[j].Amount2);
    }
    // console.log("this.totalProfExpensesvalue", this.totalProfExpensesvalue)

  }
  SellBuyExpensesCalculations() {
    this.totalSellBuyExpensesvalue = 0;
    this.fields = this.SellBuyExpenses.get('fields') as FormArray;
    // console.log("SellBuyExpensesCalculations fields", this.fields);

    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalSellBuyExpensesvalue = this.totalSellBuyExpensesvalue + (+this.fields.value[j].Amount3);
      // console.log("totalSellBuyExpensesvalue", this.totalSellBuyExpensesvalue);
    }
  }
  LabourExpensesCalculations() {
    this.totalLabourExpensesvalue = 0;
    this.fields = this.LabourExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalLabourExpensesvalue = this.totalLabourExpensesvalue + (+this.fields.value[j].Amount4);
      // console.log("totalLabourExpensesvalue",this.totalLabourExpensesvalue);
    }
  }
  InvstRealExpensesCalculations() {
    this.totalInvstRealExpensesvalue = 0;
    this.fields = this.InvstRealExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalInvstRealExpensesvalue = this.totalInvstRealExpensesvalue + (+this.fields.value[j].Amount5);
      // console.log("totalInvstRealExpensesvalue",this.totalInvstRealExpensesvalue);
    }
  }
  HotelsExpensesCalculations() {
    this.totalHotelsExpensesvalue = 0;
    this.fields = this.HotelsExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalHotelsExpensesvalue = this.totalHotelsExpensesvalue + (+this.fields.value[j].Amount6);
      // console.log("totalHotelsExpensesvalue",this.totalHotelsExpensesvalue);
    }
  }
  EduHealthExpensesCalculations() {
    this.totalEduHealthExpensesvalue = 0;
    this.fields = this.EduHealthExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalEduHealthExpensesvalue = this.totalEduHealthExpensesvalue + (+this.fields.value[j].Amount7);
      // console.log("totalEduHealthExpensesvalue",this.totalEduHealthExpensesvalue);
    }
  }

  AdditionalInfoCalculations() {
    this.totalAmountOfProfit = 0;
    this.fields = this.AdditionalExpenses.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {
      this.totalAmountOfProfit = this.totalAmountOfProfit + (+this.fields.value[j].AmountOfProfit);
      console.log("totalEduHealthExpensesvalue", this.totalAmountOfProfit);
    }
  }

  Form5TradingCalculations() {
    this.totValue1 = 0;
    this.totProfit1 = 0;
    this.ProfitRatio1 = 0;

    this.totValue2 = 0;
    this.totProfit2 = 0;
    this.ProfitRatio2 = 0;

    this.totValue3 = 0;
    this.totProfit3 = 0;
    this.ProfitRatio3 = 0;

    this.totValue4 = 0;
    this.totProfit4 = 0;
    this.ProfitRatio4 = 0;

    this.totValue5 = 0;
    this.totProfit5 = 0;
    this.ProfitRatio5 = 0;

    this.totValue6 = 0;
    this.totProfit6 = 0;
    this.ProfitRatio6 = 0;

    this.fields = this.Form5FormTrading1.get('fields') as FormArray;
    // console.log("Form5TradingCalculations 1",this.fields );

    for (let j = 0; j < (this.fields.value).length; j++) {

      this.totValue1 = this.totValue1 + (+this.fields.value[j].tradingValue);
      this.totProfit1 = this.totProfit1 + (+this.fields.value[j].tradingProfit);
      // console.log("totValue1",this.totValue1);
      // console.log("totProfit1",this.totProfit1);
      if ((+this.fields.value[j].tradingProfit) < 10.5) {
        this.ProfitRatio1 = 7 * ((+this.fields.value[j].tradingValue) / 100);
      } else {
        this.ProfitRatio1 = (+this.fields.value[j].tradingProfit) * ((+this.fields.value[j].tradingValue) / 100);
      }
      this.fields.controls[j].patchValue({ 'tradingProfitRatio': this.ProfitRatio1.toFixed(2) });
    }

    this.fields = this.Form5FormTrading2.get('fields') as FormArray;
    // console.log("Form5TradingCalculations ",this.fields );
    for (let j = 0; j < (this.fields.value).length; j++) {

      this.totValue2 = this.totValue2 + (+this.fields.value[j].tradingValue);
      this.totProfit2 = this.totProfit2 + (+this.fields.value[j].tradingProfit);
      // console.log("totValue1",this.totValue2);
      // console.log("totProfit1",this.totProfit2);
      if ((+this.fields.value[j].tradingProfit) < 7) {
        this.ProfitRatio2 = 10.5 * ((+this.fields.value[j].tradingValue) / 100);
      } else {
        this.ProfitRatio2 = (+this.fields.value[j].tradingProfit) * ((+this.fields.value[j].tradingValue) / 100);
      }
      this.fields.controls[j].patchValue({ 'tradingProfitRatio': this.ProfitRatio2.toFixed(2) });
    }

    this.fields = this.Form5FormTrading3.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {

      this.totValue3 = this.totValue3 + (+this.fields.value[j].tradingValue);
      this.totProfit3 = this.totProfit3 + (+this.fields.value[j].tradingProfit);

      if ((+this.fields.value[j].tradingProfit) < 3.5) {
        this.ProfitRatio3 = 3.5 * ((+this.fields.value[j].tradingValue) / 100);
      } else {
        this.ProfitRatio3 = (+this.fields.value[j].tradingProfit) * ((+this.fields.value[j].tradingValue) / 100);
      }
      this.fields.controls[j].patchValue({ 'tradingProfitRatio': this.ProfitRatio3.toFixed(2) });
    }

    /////////////
    this.fields = this.Form5FormTrading4.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {

      this.totValue4 = this.totValue4 + (+this.fields.value[j].tradingValue);
      this.totProfit4 = this.totProfit4 + (+this.fields.value[j].tradingProfit);

      if ((+this.fields.value[j].tradingProfit) < 10.5) {
        this.ProfitRatio4 = 7 * ((+this.fields.value[j].tradingValue) / 100);
      } else {
        this.ProfitRatio4 = (+this.fields.value[j].tradingProfit) * ((+this.fields.value[j].tradingValue) / 100);
      }
      this.fields.controls[j].patchValue({ 'tradingProfitRatio': this.ProfitRatio4.toFixed(2) });
    }

    this.fields = this.Form5FormTrading5.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {

      this.totValue5 = this.totValue5 + (+this.fields.value[j].tradingValue);
      this.totProfit5 = this.totProfit5 + (+this.fields.value[j].tradingProfit);

      if ((+this.fields.value[j].tradingProfit) < 10.5) {
        this.ProfitRatio5 = 10.5 * ((+this.fields.value[j].tradingValue) / 100);
      } else {
        this.ProfitRatio5 = (+this.fields.value[j].tradingProfit) * ((+this.fields.value[j].tradingValue) / 100);
      }
      this.fields.controls[j].patchValue({ 'tradingProfitRatio': this.ProfitRatio5.toFixed(2) });
    }

    this.fields = this.Form5FormTrading6.get('fields') as FormArray;
    for (let j = 0; j < (this.fields.value).length; j++) {

      this.totValue6 = this.totValue6 + (+this.fields.value[j].tradingValue);
      this.totProfit6 = this.totProfit6 + (+this.fields.value[j].tradingProfit);

      if ((+this.fields.value[j].tradingProfit) < 10.5) {
        this.ProfitRatio6 = 3.5 * ((+this.fields.value[j].tradingValue) / 100);
      } else {
        this.ProfitRatio6 = (+this.fields.value[j].tradingProfit) * ((+this.fields.value[j].tradingValue) / 100);
      }
      this.fields.controls[j].patchValue({ 'tradingProfitRatio': this.ProfitRatio6.toFixed(2) });
    }

  }
  Form5CapitalCalculations() {

    this.TotalIncreaseinCapital = 0.00;
    this.TotalLoanValue = 0.00;
    this.IncreaseinCapitalratio = 0.00;

    this.fields = this.Form5FormCapitalModel.get('fields') as FormArray;
    console.log("Form5CapitalCalculations", this.fields);

    for (let j = 0; j < (this.fields.value).length; j++) {
      console.log("this.fields.value[j].LoanValue", this.fields.value[j].LoanValue);
      this.TotalLoanValue = this.TotalLoanValue + (+this.fields.value[j].LoanValue);
      this.TotalIncreaseinCapital = this.TotalIncreaseinCapital + (+this.fields.value[j].IncreaseinCapital);
      this.value = (+this.fields.value[j].NumberofYears) * ((+this.fields.value[j].LoanValue) / 0.15);
      // console.log("value",this.value);

      if (this.value > (+this.fields.value[j].LoanValue)) {
        this.IncreaseinCapitalratio = this.fields.value[j].LoanValue;
      }
      else {
        this.IncreaseinCapitalratio = this.value;
      }

      console.log("TotalLoanValue", this.TotalLoanValue);
      console.log("IncreaseinCapitalratio", this.IncreaseinCapitalratio);

      this.fields.controls[j].patchValue({ 'IncreaseinCapital': this.IncreaseinCapitalratio.toFixed(2) });
    }

  }

  CapitalCal(i){
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    if((+this.fields.controls[i].get('totalProfits').value)>0){
    this.fields.controls[i].patchValue({'ProfitSAR': Math.max((+this.fields.controls[i].get('NoofLabours').value)*4000, (+this.fields.controls[i].get('totalProfits').value)).toFixed(2) || "0.00" });
    }
  }


  Form5ProfitCalculations() {
    this.totalContractValue = 0;
    this.totalStipendContractvalue = 0;
    this.totalProfitsofContract = 0;
    this.ProfitsoftheContractvalue = 0;

    this.fields = this.Form5FormProfitModel1.get('fields') as FormArray;
    // console.log("Form5ProfitCalculations",this.fields );

    for (let j = 0; j < (this.fields.value).length; j++) {

      // this.totBeginingbalance+(+this.fields.controls[j].value.BeginningPeriodBalance);
      this.totalContractValue = this.totalContractValue + (+this.fields.value[j].ContractValue1);
      this.totalStipendContractvalue = this.totalStipendContractvalue + (+this.fields.value[j].StipendContract1);
      this.ProfitsoftheContractvalue = (+this.fields.value[j].ContractValue1) - (+this.fields.value[j].StipendContract1);
      this.fields.controls[j].patchValue({ 'ProfitsofContract1': this.ProfitsoftheContractvalue>0?this.ProfitsoftheContractvalue.toFixed(2):"0.00" });
      this.totalProfitsofContract = this.totalProfitsofContract + (+this.fields.value[j].ProfitsofContract1);
      // console.log("totalContractValue",this.totalContractValue );
    }

    this.totalContractValue1 = 0;
    this.totalStipendContractvalue1 = 0;
    this.totalProfitsofContract1 = 0;
    this.ProfitsoftheContractvalue1 = 0;

    this.fields = this.Form5FormProfitModel2.get('fields') as FormArray;
    // console.log("Form5FormProfitModel2 Calculations",this.fields );

    for (let j = 0; j < (this.fields.value).length; j++) {

      // this.totBeginingbalance+(+this.fields.controls[j].value.BeginningPeriodBalance);
      this.totalContractValue1 = this.totalContractValue1 + (+this.fields.value[j].ContractValue);
      this.totalStipendContractvalue1 = this.totalStipendContractvalue1 + (+this.fields.value[j].StipendContract);
      this.ProfitsoftheContractvalue1 = (+this.fields.value[j].ContractValue) - (+this.fields.value[j].StipendContract);
      this.fields.controls[j].patchValue({ 'ProfitsofContract': this.ProfitsoftheContractvalue1>0?this.ProfitsoftheContractvalue1.toFixed(2):"0.00" });
      this.totalProfitsofContract1 = this.totalProfitsofContract1 + (+this.fields.value[j].ProfitsofContract);
      // console.log("totalContractValue",this.totalContractValue1 );
    }


    this.totalContractValue2 = 0;
    this.totalStipendContractvalue2 = 0;
    this.totalProfitsofContract2 = 0;
    this.ProfitsoftheContractvalue2 = 0;

    this.fields = this.Form5FormProfitModel3.get('fields') as FormArray;
    console.log("Form5FormProfitModel3 Calculations", this.fields);

    for (let j = 0; j < (this.fields.value).length; j++) {

      // this.totBeginingbalance+(+this.fields.controls[j].value.BeginningPeriodBalance);
      this.totalContractValue2 = this.totalContractValue2 + (+this.fields.value[j].ContractValue);
      this.totalStipendContractvalue2 = this.totalStipendContractvalue2 + (+this.fields.value[j].StipendContract);
      this.ProfitsoftheContractvalue2 = (+this.fields.value[j].ContractValue) - (+this.fields.value[j].StipendContract)
      // console.log("totalContractValue",this.totalContractValue2 );
      this.fields.controls[j].patchValue({ 'ProfitsofContract': this.ProfitsoftheContractvalue2>0?this.ProfitsoftheContractvalue2.toFixed(2):"0.00" });
      this.totalProfitsofContract2 = this.totalProfitsofContract2 + (+this.fields.value[j].ProfitsofContract);
    }
    // console.log("Form5FormProfitModel3 totalContractValue2",this.totalContractValue2 );


  }

  BindGeneralTrading() {

    // console.log("this.cabsExpensesObj bind generL trading",this.cabsExpensesObj.length);
    //expenses cabs
    const cabExpensesObjforms = this.CabsExpenses.get('fields') as FormArray;
    this.clearFormArray(cabExpensesObjforms);
    for (let j = 0; j < (this.cabsExpensesObj).length; j++) {
      //  console.log("cabsExpensesObj xsxas",this.cabsExpensesObj)
      // let form = this.addCabsForm(j + 1);
      const forms = this.CabsExpenses.get('fields') as FormArray;
      forms.push(this.addCabsForm());
      forms.controls[j].patchValue({ 'Description1': this.cabsExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount1': this.cabsExpensesObj[j]['Amount'] || 0.00 });
    }

    const profExpensesObjforms = this.ProfExpenses.get('fields') as FormArray;
    this.clearFormArray(profExpensesObjforms);
    for (let j = 0; j < (this.profExpensesObj).length; j++) {
      console.log("hihello")
      // console.log(" profExpensesObj",this.profExpensesObj)
      // let form = this.addForm(j + 1);
      const forms = this.ProfExpenses.get('fields') as FormArray;
      forms.push(this.addProfExpensesForm());
      forms.controls[j].patchValue({ 'Description2': this.profExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount2': this.profExpensesObj[j]['Amount'] || 0.00 });
    }

    const sellBuyExpensesObjforms = this.SellBuyExpenses.get('fields') as FormArray;
    this.clearFormArray(sellBuyExpensesObjforms);
    for (let j = 0; j < (this.sellBuyExpensesObj).length; j++) {
      // console.log(" sellBuyExpensesObj",this.sellBuyExpensesObj)
      // let form = this.addForm(j + 1);
      const forms = this.SellBuyExpenses.get('fields') as FormArray;
      forms.push(this.addSellBuyExpensesForm());
      forms.controls[j].patchValue({ 'Description3': this.sellBuyExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount3': this.sellBuyExpensesObj[j]['Amount'] || 0.00 });
    }
    // this.SellBuyExpensesCalculations();
    const laborOccupExpensesObjforms = this.LabourExpenses.get('fields') as FormArray;
    this.clearFormArray(laborOccupExpensesObjforms);
    for (let j = 0; j < (this.laborOccupExpensesObj).length; j++) {
      // console.log(" laborOccupExpensesObj",this.laborOccupExpensesObj)
      // let form = this.addForm(j + 1);
      const forms = this.LabourExpenses.get('fields') as FormArray;
      forms.push(this.addLabourExpensesForm());
      forms.controls[j].patchValue({ 'Description4': this.laborOccupExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount4': this.laborOccupExpensesObj[j]['Amount'] || 0.00 });
    }

    const invstRealEstExpensesObjforms = this.InvstRealExpenses.get('fields') as FormArray;
    this.clearFormArray(invstRealEstExpensesObjforms);
    for (let j = 0; j < (this.invstRealEstExpensesObj).length; j++) {
      // console.log(" invstRealEstExpensesObj",this.invstRealEstExpensesObj)
      // let form = this.addForm(j + 1);
      const forms = this.InvstRealExpenses.get('fields') as FormArray;
      forms.push(this.addInstRealExpensesForm());
      forms.controls[j].patchValue({ 'Description5': this.invstRealEstExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount5': this.invstRealEstExpensesObj[j]['Amount'] || 0.00 });
    }

    const hotelsExpensesObjforms = this.HotelsExpenses.get('fields') as FormArray;
    this.clearFormArray(hotelsExpensesObjforms);
    for (let j = 0; j < (this.hotelsExpensesObj).length; j++) {
      // console.log(" hotelsExpensesObj",this.hotelsExpensesObj)
      // let form = this.addForm(j + 1);
      const forms = this.HotelsExpenses.get('fields') as FormArray;
      forms.push(this.addHotelsExpensesForm());
      forms.controls[j].patchValue({ 'Description6': this.hotelsExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount6': this.hotelsExpensesObj[j]['Amount'] || 0.00 });
    }
    const eduHealthExpensesObjforms = this.HotelsExpenses.get('fields') as FormArray;
    this.clearFormArray(eduHealthExpensesObjforms);
    for (let j = 0; j < (this.eduHealthExpensesObj).length; j++) {
      // console.log(" eduHealthExpensesObj",this.eduHealthExpensesObj)
      // let form = this.addForm(j + 1);
      const forms = this.EduHealthExpenses.get('fields') as FormArray;
      forms.push(this.addEduHealthExpensesForm());
      forms.controls[j].patchValue({ 'Description7': this.eduHealthExpensesObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'Amount7': this.eduHealthExpensesObj[j]['Amount'] || 0.00 });
    }

    const additionalInfoModalObjforms = this.AdditionalExpenses.get('fields') as FormArray;
    this.clearFormArray(additionalInfoModalObjforms);
    for (let j = 0; j < (this.additionalInfoModalObj).length; j++) {
      console.log(" additionalInfoModalObj bindinggggggggggggggg", this.additionalInfoModalObj)
      // let form = this.addForm(j + 1);
      const forms = this.AdditionalExpenses.get('fields') as FormArray;
      forms.push(this.addAdditionalScheduleForm());
      forms.controls[j].patchValue({ 'Tin': this.additionalInfoModalObj[j]['Tin'] || '' });
      forms.controls[j].patchValue({ 'Name': this.additionalInfoModalObj[j]['Name'] || '' });
      forms.controls[j].patchValue({ 'AmountOfProfit': this.additionalInfoModalObj[j]['Amount'] || 0.00 });
    }


    console.log("(this.generalTradingObj1).length",(this.generalTradingObj1).length)
    const forms1 = this.Form5FormTrading1.get('fields') as FormArray;
    this.clearFormArray(forms1)
    for (let j = 0; j < (this.generalTradingObj1).length; j++) {
      let form = this.addFormTr(j + 1);
      const forms = this.Form5FormTrading1.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'description1': this.generalTradingObj1[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'subdescription1': this.generalTradingObj1[j]['SubDesc'] || '' });
      forms.controls[j].patchValue({ 'tradingValue': this.generalTradingObj1[j]['Value'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfit': this.generalTradingObj1[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfitRatio': this.generalTradingObj1[j]['ProfitRatio'] || 0.00 });
    }
    // this.Form5TradingCalculations();
    //Capital binding
    console.log("IncreaseCapitalObj poultry", this.IncreaseCapitalObj)
    const forms12 = this.Form5FormCapitalModel.get('fields') as FormArray;
    this.clearFormArray(forms12)
    for (let j = 0; j < (this.IncreaseCapitalObj).length; j++) {

      //let form = this.addFormCapital(j + 1);
      const forms = this.Form5FormCapitalModel.get('fields') as FormArray;
      forms.push(this.addFormCapital());
      forms.controls[j].patchValue({ 'Description': this.IncreaseCapitalObj[j]['Description'] || '' });
      // forms.controls[j].patchValue({ 'DateofLoan': this.IncreaseCapitalObj[j]['LoanDt'] });
      // forms.controls[j].patchValue({ 'LastDayofBillingPeriod': this.IncreaseCapitalObj[j]['ApprovalDt'] });

      forms.controls[j].patchValue({ 'DateofLoan': this.IncreaseCapitalObj[j]['LoanDt'] != null?moment(new Date(+(((this.IncreaseCapitalObj[j]['LoanDt'].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD'):""});
      forms.controls[j].patchValue({ 'LastDayofBillingPeriod': this.IncreaseCapitalObj[j]['ApprovalDt'] !=null?moment(new Date(+(((this.IncreaseCapitalObj[j]['ApprovalDt'].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD'):""});
      forms.controls[j].patchValue({ 'LoanValue': this.IncreaseCapitalObj[j]['LoanVal'] || '' });
      forms.controls[j].patchValue({ 'IncreaseinCapital': this.IncreaseCapitalObj[j]['IncrCapital'] || 0.00 });
      forms.controls[j].patchValue({ 'NumberofYears': (+this.IncreaseCapitalObj[j]['NumberOfYr']).toString() || "000" });
    }
    // this.Form5CapitalCalculations();


    const forms2 = this.Form5FormTrading2.get('fields') as FormArray;
    this.clearFormArray(forms2)
    for (let j = 0; j < (this.generalTradingObj2).length; j++) {

      let form = this.addFormTr(j + 1);
      const forms = this.Form5FormTrading2.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'description1': this.generalTradingObj2[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'subdescription1': this.generalTradingObj2[j]['SubDesc'] || '' });
      forms.controls[j].patchValue({ 'tradingValue': this.generalTradingObj2[j]['Value'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfit': this.generalTradingObj2[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfitRatio': this.generalTradingObj2[j]['ProfitRatio'] || 0.00 });
    }

    const forms3 = this.Form5FormTrading3.get('fields') as FormArray;
    this.clearFormArray(forms3)
    for (let j = 0; j < (this.generalTradingObj3).length; j++) {

      let form = this.addFormTr(j + 1);
      const forms = this.Form5FormTrading3.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'description1': this.generalTradingObj3[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'subdescription1': this.generalTradingObj3[j]['SubDesc'] || '' });
      forms.controls[j].patchValue({ 'tradingValue': this.generalTradingObj3[j]['Value'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfit': this.generalTradingObj3[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfitRatio': this.generalTradingObj3[j]['ProfitRatio'] || 0.00 });
    }
    /////////////////
    const forms4 = this.Form5FormTrading4.get('fields') as FormArray;
    this.clearFormArray(forms4)

    for (let j = 0; j < (this.generalTradingObj6).length; j++) {

      let form = this.addFormTr(j + 1);
      const forms = this.Form5FormTrading4.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'description1': this.generalTradingObj6[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'subdescription1': this.generalTradingObj6[j]['SubDesc'] || '' });
      forms.controls[j].patchValue({ 'tradingValue': this.generalTradingObj6[j]['Value'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfit': this.generalTradingObj6[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfitRatio': this.generalTradingObj6[j]['ProfitRatio'] || 0.00 });
    }

    const forms5 = this.Form5FormTrading5.get('fields') as FormArray;
    this.clearFormArray(forms5)
    for (let j = 0; j < (this.generalTradingObj7).length; j++) {

      let form = this.addFormTr(j + 1);
      const forms = this.Form5FormTrading5.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'description1': this.generalTradingObj7[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'subdescription1': this.generalTradingObj7[j]['SubDesc'] || '' });
      forms.controls[j].patchValue({ 'tradingValue': this.generalTradingObj7[j]['Value'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfit': this.generalTradingObj7[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfitRatio': this.generalTradingObj7[j]['ProfitRatio'] || 0.00 });
    }
    const forms6 = this.Form5FormTrading6.get('fields') as FormArray;
    this.clearFormArray(forms6)
    for (let j = 0; j < (this.generalTradingObj8).length; j++) {

      let form = this.addFormTr(j + 1);
      const forms = this.Form5FormTrading6.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'description1': this.generalTradingObj8[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'subdescription1': this.generalTradingObj8[j]['SubDesc'] || '' });
      forms.controls[j].patchValue({ 'tradingValue': this.generalTradingObj8[j]['Value'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfit': this.generalTradingObj8[j]['Profit'] || 0.00 });
      forms.controls[j].patchValue({ 'tradingProfitRatio': this.generalTradingObj8[j]['ProfitRatio'] || 0.00 });
    }
    //Profit modal  data binding
    const ProfitCivilContractingObjforms = this.Form5FormProfitModel1.get('fields') as FormArray;
    this.clearFormArray(ProfitCivilContractingObjforms);
    for (let j = 0; j < (this.ProfitCivilContractingObj).length; j++) {

      let form = this.addFormProfitCivil();
      const forms = this.Form5FormProfitModel1.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'identificationType': this.ProfitCivilContractingObj[j]['TincrnoInd'] });
      forms.controls[j].patchValue({ 'AmountofContractingParty': this.ProfitCivilContractingObj[j]['Tin'] || '' });
      forms.controls[j].patchValue({ 'ContractingPartyName': this.ProfitCivilContractingObj[j]['ContractingName'] || '' });
      forms.controls[j].patchValue({ 'Description': this.ProfitCivilContractingObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'ContractValue1': this.ProfitCivilContractingObj[j]['ContractVal'] || '' });
      forms.controls[j].patchValue({ 'StipendContract1': this.ProfitCivilContractingObj[j]['StipendContr'] || 0.00 });
      forms.controls[j].patchValue({ 'ProfitsofContract1': this.ProfitCivilContractingObj[j]['PrfOfConrtact'] || 0.00 });

    }

    // this.Form5ProfitCalculations();
   // this.Form5FormProfitModel1.get('fields') as FormArray;
   const GovernmentContProfitsObjforms = this.Form5FormProfitModel3.get('fields') as FormArray;
   this.clearFormArray(GovernmentContProfitsObjforms);
    for (let j = 0; j < (this.GovernmentContProfitsObj).length; j++) {

      let form = this.addFormProfitGov();;
      const forms = this.Form5FormProfitModel3.get('fields') as FormArray;
      forms.push(form);
      forms.controls[j].patchValue({ 'govCode': this.GovernmentContProfitsObj[j]['GovCode'] || '' });
      forms.controls[j].patchValue({ 'Description': this.GovernmentContProfitsObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'ContractValue': this.GovernmentContProfitsObj[j]['ContractVal'] || 0.00 });
      forms.controls[j].patchValue({ 'StipendContract': this.GovernmentContProfitsObj[j]['StipendContr'] || 0.00 });
      forms.controls[j].patchValue({ 'ProfitsofContract': this.GovernmentContProfitsObj[j]['PrfOfConrtact'] || 0.00 });
    }
    console.log("GovernmentContProfitsObj 12333333", this.GovernmentContProfitsObj)
    //other information

    const otherIncomeObjforms = this.Form5FormProfitModel2.get('fields') as FormArray;
    this.clearFormArray(otherIncomeObjforms);

    for (let j = 0; j < (this.otherIncomeObj).length; j++) {

      let form = this.addFormProfitOther();;
      const forms = this.Form5FormProfitModel2.get('fields') as FormArray;

      forms.push(form);
      // forms.controls[j].patchValue({'govCode':this.otherIncomeObj[j]['GovCode']});
      forms.controls[j].patchValue({ 'Description': this.otherIncomeObj[j]['Description'] || '' });
      forms.controls[j].patchValue({ 'ContractValue': this.otherIncomeObj[j]['ContractVal'] || 0.00 });
      forms.controls[j].patchValue({ 'StipendContract': this.otherIncomeObj[j]['StipendContr'] || 0.00 });
      forms.controls[j].patchValue({ 'ProfitsofContract': this.otherIncomeObj[j]['PrfOfConrtact'] || 0.00 });
    }
  }

  submit() {

    this.allDatatoSave();
    this.basicInformationObj["Submitz"] = "X";
    this.basicInformationObj["UserType"] = "TP";
    console.log(" basicInformationObj to submit ", this.basicInformationObj)
    this.returnsService.submitForm5(this.basicInformationObj).subscribe((data) => {
      // console.log("return success",data);
      this.submitdataObj = data["d"];
      // console.log("submitdataObj submitttttttttttttttt", this.submitdataObj)
      this.ConfirmSubmit123(this.submitdataObj);
      //this.DownloadInvoice(this.submitdataObj.Fbnum)

      // this.getButtons(this.submitdataObj)
      setTimeout(() => {
      }, 500);
    })

    // this.step=7;
    this.step = 6;


  }

  ConfirmSubmit123(submitdataObj) {
    //  console.log("Fbnum",Fbnum)
    this.returnsService.ShowIndivisualActivityDetails(submitdataObj.Fbnum).subscribe((data) => {
      this.ActivityDetailsObj = data["d"];
      this.ActivityDetailsCabsObj = this.ActivityDetailsObj["SchGP01Set"]["results"][0];
      this.ActivityDetailsProfObj = this.ActivityDetailsObj["SchGP02Set"]["results"][0];
      this.ActivityDetailsSellBuyObj = this.ActivityDetailsObj["SchGP03Set"]["results"][0];
      this.ActivityDetailsLabourObj = this.ActivityDetailsObj["SchGP04Set"]["results"][0];
      this.ActivityDetailsIndustryObj = this.ActivityDetailsObj["SchGP05Set"]["results"][0];
      this.ActivityDetailsContractingObj = this.ActivityDetailsObj["SchGP06Set"]["results"][0];
      this.ActivityDetailsInvstRealObj = this.ActivityDetailsObj["SchGP07Set"]["results"][0];
      this.ActivityDetailsHotelsObj = this.ActivityDetailsObj["SchGP08Set"]["results"][0];
      this.ActivityDetailsEduHealthObj = this.ActivityDetailsObj["SchGP09Set"]["results"][0];
      this.ActivityDetailsPoultryObj = this.ActivityDetailsObj["SchGP10Set"]["results"][0];
      this.ActivityDetailsCarsObj = this.ActivityDetailsObj["SchGP11Set"]["results"][0];
      this.ActivityDetailsMineralsObj = this.ActivityDetailsObj["SchGP12Set"]["results"][0];
      this.SadadBillNumber = this.ActivityDetailsObj["SadadSet"]["results"][0]['Sopbel'];
      this.TotalZakatPayable = this.ActivityDetailsObj["SadadSet"]["results"][0]['Betrh'];

      console.log("ActivityDetailsObj confirmmmmmmmmmm", this.ActivityDetailsObj);
      // console.log("ActivityDetailsObj cabs", this.ActivityDetailsCabsObj);

      console.log("SadadBillNumber", this.SadadBillNumber);

      console.log("TotalZakatPayable", this.ActivityDetailsObj["SadadSet"]);
      // this.somezakatAmt=submitdataObj.ATotProfit +submitdataObj.APlShare +submitdataObj.ACapital+"m";
      this.CalculateZakatAmount(submitdataObj.RegIdz, submitdataObj.PeriodKeyz, (submitdataObj.ATotProfit + (+submitdataObj.APlShare) + (+submitdataObj.ACapital) + "m"));


      setTimeout(() => {
      }, 500);
    })
  }

  ConfirmSubmit() {
    this.step = 7;
    console.log("this.submitdataObj ConfirmSubmit ", this.submitdataObj)
    this.ConfirmSubmit123(this.submitdataObj);
    // this.CalculateZakatAmount(RegIdz,PeriodKeyz,ZakatAmt);
  }

  getButtons(Obj) {
    this.returnsService.getButtons(Obj.Status, Obj.Isamend).subscribe((data) => {
      this.ButtonsObj = data["d"];
      console.log("ButtonsObj", this.ButtonsObj);

    })
  }

  DownloadInvoice(Fbnum) {
    this.returnsService.DownloadInvoiceForm5(Fbnum).subscribe((data: any) => {
      FileSaver.saveAs(data, "Form5Invoice.pdf");
    });
  }

  // downLoad(Cotyp,Cokey){
  //   this.returnsService.DownloadInvoiceForm5(this.fbGuid).subscribe((data:any) => {
  //     FileSaver.saveAs(data, "Form12Invoice.pdf");
  //   });
  // }

  generateSadadNumber(fbnum) {
    this.returnsService.generateSadadNumber(fbnum).subscribe((data) => {
      this.SadadBillNumber["Sopbel"] = data["d"]["results"][0]["Sopbel"];
      console.log("SadadBillNumber", this.SadadBillNumber);
    });
  }

  onRefresh() {
    if (this.SadadBillNumber.length == 0) {
      // console.log("this.submitdataObj",this.submitdataObj["Fbnum"])
      // console.log("this.submitdxvxfvxvxataObj",this.submitdataObj.Fbnum)

      this.generateSadadNumber(this.submitdataObj["Fbnum"]);
    }
    setTimeout(() => {
      // this.confirm=true;
    }, 500);
  }

  CalculateZakatAmount(RegIdz, PeriodKeyz, ZakatAmt) {
    this.returnsService.geZakatCalculatedAmount(RegIdz, PeriodKeyz, ZakatAmt).subscribe((data) => {
      // this.ButtonsObj = data["d"];
      // console.log("ButtonsObj", this.ButtonsObj);
      this.ZakatAmountObj = data["d"];
      console.log("ZakatAmountObj", this.ZakatAmountObj);
    })
  }

  goToamend() {
    this.step = 3;
    this.ContinueBasicInfo(this.basicInformationObj);
    this.amendValues();
    // this.router.navigate(['/route2'], { fragment: 'Cabs' });
  }
  get getFields(): FormArray {
    return this.Form5Form.get('fields') as FormArray;
  }

  indexCabs:number;
  ScheduleCabsChange(type, index, event) {
    // console.log("type,index,event cabs",type,index,event)
    const forms = this.Form5Form.get('fields') as FormArray;
    this.indexCabs = index;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleCabs'] = true;
      const field = this.CabsExpenses.get('fields') as FormArray;
      if (field.controls.length == 0) { 
        field.push(this.addCabsForm());
      }

      setTimeout(() => {
        jQuery("#ExpensesModalCabs").modal('show');
      }, 500);
    }
    else {

      jQuery("#ConfirmCabsApplModal").modal('show');
    }

  }

  ConfirmCabsApplicable() {
    this.fields = this.Form5Form.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': '0.00' });
    this.fields.controls[0].patchValue({ 'ScheduleCabs': false });
    this.clearFormArray(this.formsControlsCabs);
    this.CabsExpensesCalculations();
    this.ValidateCABS(this.indexCabs);
  }

  cabsCancel() {
    this.fields = this.Form5Form.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleCabs': true });
  }

  ScheduleProfChange(type, index, event) {
    console.log("type,index,event prof", type, index, event)
    const forms = this.Form5FormPro.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleProf'] = true;      
      const field2 = this.ProfExpenses.get('fields') as FormArray;
      console.log(field2.controls.length);
      if (field2.controls.length == 0) {        
        field2.push(this.addProfExpensesForm());
      }

      setTimeout(() => {
        jQuery("#ExpensesModalProff").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmProfApplModal").modal('show');
    }

  }

  ConfirmProfApplicable() {
    this.fields = this.Form5FormPro.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses1': '0.00' });
    //  this.fields.controls['ScheduleProf']=false;
    this.fields.controls[0].patchValue({ 'ScheduleProf': false });

    this.clearFormArray(this.formsControlsProfEx);
    this.ProfExpensesCalculations();
  }

  profCancel() {
    this.fields = this.Form5FormPro.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleProf': true });
  }


  ScheduleSellBuyChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleBuy'] = true;
      const field2 = this.SellBuyExpenses.get('fields') as FormArray;
      if (field2.controls.length == 0) {        
        field2.push(this.addSellBuyExpensesForm());
      }

      setTimeout(() => {
        jQuery("#ExpensesModalsellBuy").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmSellBuyApplModal").modal('show');
    }

  }

  ConfirmSellBuyApplicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': '0.00' });
    //  this.fields.controls['ScheduleBuy']=false;
    this.fields.controls[0].patchValue({ 'ScheduleBuy': false });

    this.clearFormArray(this.formsControlsSellBuyEx);
    this.SellBuyExpensesCalculations()
  }

  sellCancel() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleBuy': true });
  }

  indexLabour:number;
  //labour
  ScheduleLabourOccupChange(type, index, event) {
    const forms = this.Form5LaborOccup.get('fields') as FormArray;
    this.indexLabour =index;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleLabourOccup'] = true;
      const field10 = this.LabourExpenses.get('fields') as FormArray;
      if (field10.controls.length == 0) {
        field10.push(this.addLabourExpensesForm());
      }

      setTimeout(() => {
        jQuery("#ExpensesModalLaborOccup").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmLabourApplModal").modal('show');
    }

  }

  ConfirmLabourOccpApplicable() {
    this.fields = this.Form5LaborOccup.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': '0.00' });
    //this.fields.controls['ScheduleLabourOccup'] = false;
    this.fields.controls[0].patchValue({ 'ScheduleLabourOccup': false });

    this.clearFormArray(this.formsControlsLabourEx);
    this.LabourExpensesCalculations();
    this.ValidateLabourOccup(this.indexLabour);
  }

  labourCancel() {
    this.fields = this.Form5LaborOccup.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleLabourOccup': true });
  }

  //profits
  ScheduleGovProfitsChange(type, index, event) {
    const forms = this.Form5Contracting.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleGovProfits'] = true;
      console.log("GovernmentContProfitsObj111", this.GovernmentContProfitsObj)
      console.log("index", index)
     // formsControlspProfit3
     const GovernmentContProfitsObjForm = this.Form5FormProfitModel3.get('fields') as FormArray;
      if (GovernmentContProfitsObjForm.controls.length == 0) {      
        
        GovernmentContProfitsObjForm.push(this.addFormProfitGov());
      }
      setTimeout(() => {
        jQuery("#ProfitModal").modal('show');
      }, 500);

    }
    else {
      jQuery("#ConfirmGvtProfitModal").modal('show');
    }


  }

  ConfirmGovProfitsApplicable() {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'GovernmentCont': '0.00' });
    //  this.fields.controls['ScheduleGovProfits']=false;
    this.fields.controls[0].patchValue({ 'ScheduleGovProfits': false });
    this.fields.controls[0].patchValue({ 'totalProfits': ((+this.fields.controls[0].get('GovernmentCont').value)+(+this.fields.controls[0].get('ProfitfromCivil').value)+(+this.fields.controls[0].get('OtherProfit').value)).toFixed(2)  || "0.00" });

    this.clearFormArray(this.formsControlspProfit3);
    this.Form5ProfitCalculations();
    this.CapitalCal(0);
  }

  govProfitsCancel() {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleGovProfits': true });
  }


  //profits2
  ScheduleProfitfroCivilChange(type, index, event) {
    const forms = this.Form5Contracting.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleProfitfromCivil'] = true;
      const ProfitCivilContractingObjForms = this.Form5FormProfitModel1.get('fields') as FormArray;
      if (ProfitCivilContractingObjForms.controls.length == 0) {        
        ProfitCivilContractingObjForms.push(this.addFormProfitCivil());
      }

      setTimeout(() => {
        jQuery("#ProfitModal1").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmProfitfromCivilApplModal").modal('show');
    }

  }

  ConfirmProfitfromCivilgApplicable() {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ProfitfromCivil': '0.00' });
    //  this.fields.controls['ScheduleProfitfromCivil']=false;
    this.fields.controls[0].patchValue({ 'ScheduleProfitfromCivil': false });
    this.fields.controls[0].patchValue({ 'totalProfits': ((+this.fields.controls[0].get('GovernmentCont').value)+(+this.fields.controls[0].get('ProfitfromCivil').value)+(+this.fields.controls[0].get('OtherProfit').value)).toFixed(2)  || "0.00" });

    this.clearFormArray(this.formsControlspProfit1);
    this.Form5ProfitCalculations();
    this.CapitalCal(0);
  }

  ProfitsCivilCancel() {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleProfitfromCivil': true });
  }

  //profits3
  ScheduleOtherProfitChange(type, index, event) {
    const forms = this.Form5Contracting.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      console.log("otherIncomeObj changee", this.otherIncomeObj)

      console.log("index", index)
      forms.controls['ScheduleOtherProfit'] = true;
      const otherIncomeObjForms = this.Form5FormProfitModel2.get('fields') as FormArray;
      if (otherIncomeObjForms.controls.length == 0) {        
        otherIncomeObjForms.push(this.addFormProfitOther());
      }

      setTimeout(() => {
        jQuery("#ProfitModal2").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmOtherApplModal").modal('show');
    }

  }

  ConfirmOtherProfitApplicable() {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'OtherProfit': '0.00' });
    //  this.fields.controls['ScheduleOtherProfit']=false;
    this.fields.controls[0].patchValue({ 'ScheduleOtherProfit': false });
    this.fields.controls[0].patchValue({ 'totalProfits': ((+this.fields.controls[0].get('GovernmentCont').value)+(+this.fields.controls[0].get('ProfitfromCivil').value)+(+this.fields.controls[0].get('OtherProfit').value)).toFixed(2)  || "0.00" });

    this.clearFormArray(this.formsControlspProfit2);
    this.Form5ProfitCalculations();
    this.CapitalCal(0);
  }

  otherProfitsCancel() {
    this.fields = this.Form5Contracting.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleOtherProfit': true });
  }


  indexInvestReal:number;
  //invst
  ScheduleInvstChange(type, index, event) {
    const forms = this.Form5Invst.get('fields') as FormArray;
    this.indexInvestReal = index;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleInvst'] = true;
      const fieldsExample = this.InvstRealExpenses.get('fields') as FormArray;
      if (fieldsExample.controls.length == 0) {
          fieldsExample.push(this.addInstRealExpensesForm());
      }

      setTimeout(() => {
        jQuery("#ExpensesModalInvstRealEst").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirminvstApplModal").modal('show');
    }

  }

  ConfirmInvstApplicable() {
    this.fields = this.Form5Invst.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': '0.00' });
    //  this.fields.controls['ScheduleInvst']=false;
    this.fields.controls[0].patchValue({ 'ScheduleInvst': false });

    this.clearFormArray(this.formsControlsInvstRealEx);
    this.InvstRealExpensesCalculations();
    this.ValidateInvstRealEstate(this.indexInvestReal);
  }

  invstCancel() {
    this.fields = this.Form5Invst.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleInvst': true });
  }

  indexHotel:number;
  //Hotel 
  ScheduleHotelsChange(type, index, event) {
    const forms = this.Form5Hotels.get('fields') as FormArray;
    this.indexHotel=index;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleHotels'] = true;
      const hotelsExpensesObjForms = this.HotelsExpenses.get('fields') as FormArray;
      if (hotelsExpensesObjForms.controls.length == 0) {        
        hotelsExpensesObjForms.push(this.addHotelsExpensesForm());
      }
      setTimeout(() => {
        jQuery("#ExpensesModalHotels").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmHotelApplModal").modal('show');
    }

  }

  ConfirmhotelApplicable() {
    this.fields = this.Form5Hotels.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': '0.00' });
    //  this.fields.controls['ScheduleHotels']=false;
    this.fields.controls[0].patchValue({ 'ScheduleHotels': false });

    this.clearFormArray(this.formsControlsHotelsEx);
    this.HotelsExpensesCalculations();
    this.ValidateHotels(this.indexHotel);
  }

  hotelsCancel() {
    this.fields = this.Form5Hotels.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleHotels': true });
  }

  indexEduHealth:number;
  //health
  ScheduleHealthChange(type, index, event) {
    const forms = this.Form5Health.get('fields') as FormArray;
    this.indexEduHealth = index;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleHealth'] = true;
      const eduHealthExpensesObjForms = this.EduHealthExpenses.get('fields') as FormArray;
      if (eduHealthExpensesObjForms.controls.length == 0) {        
        eduHealthExpensesObjForms.push(this.addEduHealthExpensesForm());
      }

      setTimeout(() => {
        jQuery("#ExpensesModalEduHealth").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmHealthApplModal").modal('show');
    }

  }

  ConfirmHealthApplicable() {
    this.fields = this.Form5Health.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'Expenses': '0.00' });
    //  this.fields.controls['ScheduleHealth']=false;
    this.fields.controls[0].patchValue({ 'ScheduleHealth': false });

    this.clearFormArray(this.formsControlsEduHealthEx);
    this.EduHealthExpensesCalculations();
    this.ValidateEduHealth(this.indexEduHealth)
  }
  healthCancel() {
    this.fields = this.Form5Health.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleHealth': true });
  }

  indexPoultry:number;
  //poultry
  SchedulePoultryChange(type, index, event) {
    const forms = this.Form5Poultry.get('fields') as FormArray;
    this.indexPoultry = index;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['SchedulePoultry'] = true;
      const IncreaseCapitalObjForms = this.Form5FormCapitalModel.get('fields') as FormArray;
      if (IncreaseCapitalObjForms.controls.length == 0) {        
        IncreaseCapitalObjForms.push(this.addFormCapital());
      }

      setTimeout(() => {
        jQuery("#capitalModal").modal('show');
      }, 500);
    }
    else {
      jQuery("#ConfirmPoultryApplModal").modal('show');
    }

  }

  ConfirmPoultryApplicable() {
    this.fields = this.Form5Poultry.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'IncreaseinCapital': '0.00' });
    //  this.fields.controls['SchedulePoultry']=false;
    this.fields.controls[0].patchValue({ 'SchedulePoultry': false });
    this.clearFormArray(this.formsControlsCapital);
    this.Form5CapitalCalculations();
    this.ValidatePoultryFishFarms(this.indexPoultry);
  }
  poultryCancel() {
    this.fields = this.Form5Poultry.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'SchedulePoultry': true });
  }
  // Additional info
  ScheduleAdditionalChange(event) {
    if (event.target.checked) {
      this.Form5Additional.value.ScheduleAdditional = true;
      console.log("additionalInfoModalObj ScheduleAdditionalChange", this.additionalInfoModalObj)
      const additionalInfoModalObjForms = this.AdditionalExpenses.get('fields') as FormArray;
      if (additionalInfoModalObjForms.controls.length == 0) {       
        additionalInfoModalObjForms.push(this.addAdditionalScheduleForm());
      }
      jQuery("#AdditionalModal").modal('show');
      // setTimeout(() => {
      //   jQuery("#AdditionalModal").modal('show');
      // }, 500);
    }
    else {
      jQuery("#ConfirmAdditionalApplModal").modal('show');
    }

  }

  ConfirmaddiApplicable() {
    this.Form5Additional.controls['ShareinCompany'].setValue('0.00');
    this.Form5Additional.value.ScheduleAdditional = false;
    this.clearFormArray(this.formsControlsEduAdditionalEx);
    this.AdditionalInfoCalculations();
    this.errorTin = [false];
  }

  additionalCancel() {
    // this.Form5Additional.value.ScheduleAdditional = true;
    this.Form5Additional.value.ScheduleAdditional = true;;

  }

  // Do you have Imports? - sell&Buy

  haveImportsChange(event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      console.log("checked")
      forms.controls['ScheduleHaveImports'] = true;
      this.ImportsShow = true;
    }
    else {
      console.log("unchecked")
      forms.controls['ScheduleHaveImports'] = false;
      this.ImportsShow = false;
    }

  }

  //Imports for General Trading(SAR)

  importsforGeneralTradingChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleImpGeneralTrade'] = true;
      console.log("generalTradingObj1 change", this.generalTradingObj1);
      const field3 = this.Form5FormTrading1.get('fields') as FormArray;
      if (field3.controls.length == 0) {        
        field3.push(this.addFormTr(index));
      }
      jQuery("#generalTrading1").modal('show');
      // setTimeout(() => {
      //   jQuery("#generalTrading1").modal('show');
      // }, 500);
    }
    else {
      jQuery("#ConfirmgeneralTr1ApplModal").modal('show');
    }

  }

  generalTr1Applicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ImportsforGeneralTrading': '0.00' });
    //  this.fields.controls['ScheduleImpGeneralTrade']=false;
    this.fields.controls[0].patchValue({ 'ScheduleImpGeneralTrade': false });
    this.fields.controls[0].patchValue({ 'TotalofImports': (parseFloat(this.fields.value[0]['ImportsforGeneralTrading'])+parseFloat(this.fields.value[0]['ImportsforLivelihoods'])+parseFloat(this.fields.value[0]['ImportsforLivestock'])).toFixed(2) || "0.00" });

    this.clearFormArray(this.formsControlsTr1);
    this.Form5TradingCalculations();
  }

  cancelTr1() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleImpGeneralTrade': true });
  }

  //Imports for Livelihoods(SAR)

  importsforLivelihoodsChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleImpLivelihoods'] = true;
      console.log("generalTradingObj2 change", this.generalTradingObj2);
      // if (this.generalTradingObj2.length == 0) {
      //   this.fieldsExample = this.Form5FormTrading2.get('fields') as FormArray;
      //   this.fieldsExample.push(this.addFormTr(index));
      // }
      const field3 = this.Form5FormTrading2.get('fields') as FormArray;
      if (field3.controls.length == 0) {        
        field3.push(this.addFormTr(index));
      }

      jQuery("#generalTrading2").modal('show');

    }
    else {
      jQuery("#ConfirmgeneralTr2ApplModal").modal('show');
    }

  }

  generalTr2Applicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ImportsforLivelihoods': '0.00' });
    //  this.fields.controls['ScheduleImpLivelihoods']=false;
    this.fields.controls[0].patchValue({ 'ScheduleImpLivelihoods': false });
    this.fields.controls[0].patchValue({ 'TotalofImports': (parseFloat(this.fields.value[0]['ImportsforGeneralTrading'])+parseFloat(this.fields.value[0]['ImportsforLivelihoods'])+parseFloat(this.fields.value[0]['ImportsforLivestock'])).toFixed(2) || "0.00" });

    this.clearFormArray(this.formsControlsTr2);
    this.Form5TradingCalculations();
  }
  cancelTr2() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleImpLivelihoods': true });
  }

  //Imports for Livestock & Animals(SAR) 
  importsforLivestockChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleImpLivestock'] = true;
      // if (this.generalTradingObj3.length == 0) {
      //   this.fieldsExample = this.Form5FormTrading3.get('fields') as FormArray;
      //   this.fieldsExample.push(this.addFormTr(index));
      // }
      const field3 = this.Form5FormTrading3.get('fields') as FormArray;
      if (field3.controls.length == 0) {        
        field3.push(this.addFormTr(index));
      }
      jQuery("#generalTrading3").modal('show');
    }
    else {
      jQuery("#ConfirmgeneralTr3ApplModal").modal('show');
    }

  }

  generalTr3Applicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ImportsforLivestock': '0.00' });
    //  this.fields.controls['ScheduleImpLivestock']=false;
    this.fields.controls[0].patchValue({ 'ScheduleImpLivestock': false });
    this.fields.controls[0].patchValue({ 'TotalofImports': (parseFloat(this.fields.value[0]['ImportsforGeneralTrading'])+parseFloat(this.fields.value[0]['ImportsforLivelihoods'])+parseFloat(this.fields.value[0]['ImportsforLivestock'])).toFixed(2) || "0.00" });

    this.clearFormArray(this.formsControlsTr3);
    this.Form5TradingCalculations();
  }
  cancelTr3() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleImpLivestock': true });
  }

  //Do you have Internal Procurement from Saudi?

  haveInternalProcurementChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      forms.controls['ScheduleIntProcurement'] = true;
      this.importsInternalShow = true;

    }
    else {
      forms.controls['ScheduleIntProcurement'] = false;
      this.importsInternalShow = false;

    }

  }


  GeneralTradingInternalChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleGentrInt'] = true;
      // if (this.generalTradingObj7.length == 0) {
      //   this.fieldsExample = this.Form5FormTrading4.get('fields') as FormArray;
      //   this.fieldsExample.push(this.addFormTr(index));
      // }
      const field3 = this.Form5FormTrading4.get('fields') as FormArray;
      if (field3.controls.length == 0) {        
        field3.push(this.addFormTr(index));
      }
      jQuery("#generalTrading4").modal('show');
    }
    else {
      jQuery("#ConfirmgeneralTr4ApplModal").modal('show');
    }

  }

  generalTr4Applicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'GeneralTradingInternal': '0.00' });
    //  this.fields.controls['ScheduleGentrInt']=false;
    this.fields.controls[0].patchValue({ 'ScheduleGentrInt': false });
    this.fields.controls[0].patchValue({ 'TotalProfits': (parseFloat(this.fields.value[0]['GeneralTradingInternal'])+parseFloat(this.fields.value[0]['LivelihoodsInternal'])+parseFloat(this.fields.value[0]['LivestockAnimals'])).toFixed(2) || "0.00" });

    this.clearFormArray(this.formsControlsTr4);
    this.Form5TradingCalculations(); 
  }
  cancelTr4() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleGentrInt': true });
  }

  LivelihoodsChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleLivelihoods'] = true;
      // if (this.generalTradingObj8.length == 0) {
      //   this.fieldsExample = this.Form5FormTrading5.get('fields') as FormArray;
      //   this.fieldsExample.push(this.addFormTr(index));
      // }
      const field3 = this.Form5FormTrading5.get('fields') as FormArray;
      if (field3.controls.length == 0) {        
        field3.push(this.addFormTr(index));
      }
      jQuery("#generalTrading5").modal('show');

    }
    else {
      jQuery("#ConfirmgeneralTr5ApplModal").modal('show');
    }

  }

  generalTr5Applicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'LivelihoodsInternal': '0.00' });
    //  this.fields.controls['ScheduleLivelihoods']=false;
    this.fields.controls[0].patchValue({ 'ScheduleLivelihoods': false });
    this.fields.controls[0].patchValue({ 'TotalProfits': (parseFloat(this.fields.value[0]['GeneralTradingInternal'])+parseFloat(this.fields.value[0]['LivelihoodsInternal'])+parseFloat(this.fields.value[0]['LivestockAnimals'])).toFixed(2) || "0.00" });

    this.clearFormArray(this.formsControlsTr5);
    this.Form5TradingCalculations();
  }
  cancelTr5() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleLivelihoods': true });
  }

  liveStockAnimalsChange(type, index, event) {
    const forms = this.Form5FormSell.get('fields') as FormArray;
    if (event.target.checked) {
      this.typeIndex = index;
      forms.controls['ScheduleLiveStock'] = true;
    //  const IncreaseCapitalObjForm = this.Form5FormTrading6.get('fields') as FormArray;
    //   if (IncreaseCapitalObjForm.controls.length == 0) {        
    //     IncreaseCapitalObjForm.push(this.addFormTr(index));
    //   }
    const field3 = this.Form5FormTrading6.get('fields') as FormArray;
      if (field3.controls.length == 0) {        
        field3.push(this.addFormTr(index));
      }
      jQuery("#generalTrading6").modal('show');
      // setTimeout(() => {
      //   jQuery("#generalTrading6").modal('show');
      // }, 500);
    }
    else {
      jQuery("#ConfirmgeneralTr6ApplModal").modal('show');
    }

  }

  generalTr6Applicable() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'LivestockAnimals': '0.00' });
    //  this.fields.controls['ScheduleLiveStock']=false;
    this.fields.controls[0].patchValue({ 'ScheduleLiveStock': false });
    this.fields.controls[0].patchValue({ 'TotalProfits': (parseFloat(this.fields.value[0]['GeneralTradingInternal'])+parseFloat(this.fields.value[0]['LivelihoodsInternal'])+parseFloat(this.fields.value[0]['LivestockAnimals'])).toFixed(2) || "0.00" });

    this.clearFormArray(this.formsControlsTr6);
    this.Form5TradingCalculations();
  }
  cancelTr6() {
    this.fields = this.Form5FormSell.get('fields') as FormArray;
    this.fields.controls[0].patchValue({ 'ScheduleLiveStock': true });
  }

  declareChange(event) {
    if (event.target.checked) {
      this.AgreeClick = true;
    } else {
      this.AgreeClick = false;
    }
  }

  getTinNameBytinNo(tinNo,i) {

    this.returnsService.getTinNameBytinNo(tinNo,this.tinKey).subscribe((data) => {
      this.tinNoObj = data["d"];
      console.log("this.tinNoObj",this.tinNoObj);
      this.fields = this.Form5FormProfitModel1.get('fields') as FormArray;
      this.fields.controls[i].patchValue({ 'ContractingPartyName': this.tinNoObj.Name });



    })
  }

  errorTin = [false];
  getTinName(tinNo,i) {
    if(tinNo.length == 10){
    this.returnsService.getTinName(tinNo,this.usersObject.Gpartz, this.basicInformationObj.RegIdz, this.basicInformationObj.PeriodKeyz).subscribe((data) => {
      this.tinNameObj = data["d"];
      console.log("this.tinNameObj",this.tinNameObj);
      this.fields = this.AdditionalExpenses.get('fields') as FormArray;
      this.fields.controls[i].patchValue({ 'Name': this.tinNameObj.Name });
      this.errorTin[i] = this.fields.controls[i].get('Name').value == ""?true:false;
    })
  }
  }

  ontinSelect(event){
    console.log("ontinSelect value",event.target.value);
    this.tinKey =event.target.value;

  }
  ValidateCABS(i)
  {
    if(this.formsControls[i].value.noofCars < 0 || this.formsControls[i].value.noofCars > 9999) {
      
      this.formsControls[i].patchValue({'noofCars':'000'});

    }
    if(this.formsControls[i].value.avgDailyIncome < 0 || this.formsControls[i].value.avgDailyIncome > 999999999999.99) {
      this.formsControls[i].patchValue({'avgDailyIncome':'0.00'});
    }
    if(this.formsControls[i].value.Revenue < 0 || this.formsControls[i].value.Revenue > 999999999999.99) {
      this.formsControls[i].patchValue({'Revenue':'0.00'});
    }
    if(this.formsControls[i].value.NetProfit < 0 || this.formsControls[i].value.NetProfit > 99) {
      this.formsControls[i].patchValue({'NetProfit':'0.00'});
    }
    if(this.formsControls[i].value.OccupancyRate < 0 || this.formsControls[i].value.OccupancyRate > 100) {
      this.formsControls[i].patchValue({'OccupancyRate':'0.00'});
    }
    
    //this.formsControls[i].patchValue({'noofCars':parseFloat(this.formsControls[i].value.noofCars || 0).toFixed});
    this.formsControls[i].patchValue({'avgDailyIncome':parseFloat(this.formsControls[i].value.avgDailyIncome || 0).toFixed(2)}); 
    this.formsControls[i].patchValue({'OccupancyRate':(this.formsControls[i].value.OccupancyRate || 0)}); 
    this.formsControls[i].patchValue({'NetProfit':parseFloat(this.formsControls[i].value.NetProfit || 0).toFixed(2)}); 
    this.formsControls[i].patchValue({'Revenue':parseFloat(this.formsControls[i].value.Revenue || 0).toFixed(2)});
    this.formsControls[i].patchValue({'NetProfitSAR': (parseFloat(this.formsControls[i].value.Revenue || 0)-parseFloat(this.formsControls[i].value.Expenses || 0)).toFixed(2)});
    
    console.log("Cabs Valid ", this.Form5Cars.valid);
     
  }
  ExpensesModalCabsValidation(i)
  {
    this.formsControlsCabs.controls[i].patchValue({'Amount1':parseFloat(this.formsControlsCabs.controls[i].value.Amount1 || 0).toFixed(2)}); 
  }
  ValidateProfessionals(i)
  {
    if(this.formsControls1[i].value.Revenue1 < 0 || this.formsControls1[i].value.Revenue1 > 999999999999.99) {
      this.formsControls1[i].patchValue({'Revenue1':'0.00'});
    }
    if(this.formsControls1[i].value.NetProfit1 < 0 || this.formsControls1[i].value.NetProfit1 > 999999999999.99) {
      this.formsControls1[i].patchValue({'NetProfit1':'0.00'});
    }
    this.formsControls1[i].patchValue({'Revenue1':parseFloat(this.formsControls1[i].value.Revenue1 || 0).toFixed(2)}); 
    this.formsControls1[i].patchValue({'NetProfit1':parseFloat(this.formsControls1[i].value.NetProfit1 || 0).toFixed(2)}); 
  }
  ValidateProfessionalExpenses(i)
  {
    this.formsControlsProfEx.controls[i].patchValue({'Amount2':parseFloat(this.formsControlsProfEx.controls[i].value.Amount2 || 0).toFixed(2)}); 
  }
  ValidateSellBuy(i)
  {
    if(this.formsControls2[i].value.Capital < 0 || this.formsControls2[i].value.Capital > 999999999999.99) {
      this.formsControls2[i].patchValue({'Capital':'0.00'});
    }
    if(this.formsControls2[i].value.profitratio < 0 || this.formsControls2[i].value.profitratio > 100) {
      this.formsControls2[i].patchValue({'profitratio':'0.00'});
    }
    if(this.formsControls2[i].value.sales < 0 || this.formsControls2[i].value.sales > 999999999999.99) {
      this.formsControls2[i].patchValue({'sales':'0.00'});
    }
    if(this.formsControls2[i].value.salesProfitratio < 0 || this.formsControls2[i].value.salesProfitratio > 100) {
      this.formsControls2[i].patchValue({'salesProfitratio':'0.00'});
    }
    this.formsControls2[i].patchValue({'Capital':parseFloat(this.formsControls2[i].value.Capital || 0).toFixed(2)}); 
    this.formsControls2[i].patchValue({'profitratio':parseFloat(this.formsControls2[i].value.profitratio || 0).toFixed(2)}); 
    this.formsControls2[i].patchValue({'sales':parseFloat(this.formsControls2[i].value.sales || 0).toFixed(2)}); 
    this.formsControls2[i].patchValue({'salesProfitratio':parseFloat(this.formsControls2[i].value.salesProfitratio || 0).toFixed(2)});     
  }
  ValidateSellBuyExpenses(i) {
    this.formsControlsSellBuyEx.controls[i].patchValue({'Amount3':parseFloat(this.formsControlsSellBuyEx.controls[i].value.Amount3 || 0).toFixed(2)}); 
  }
  ValidateFormControlTrd1(i)
  {
    this.formsControlsTr1.controls[i].patchValue({'tradingValue':parseFloat(this.formsControlsTr1.controls[i].value.tradingValue || 0).toFixed(2)}); 
    this.formsControlsTr1.controls[i].patchValue({'tradingProfit':parseFloat(this.formsControlsTr1.controls[i].value.tradingProfit || 0).toFixed(2)}); 
    this.formsControlsTr1.controls[i].patchValue({'tradingProfitRatio':parseFloat(this.formsControlsTr1.controls[i].value.tradingProfitRatio || 0).toFixed(2)}); 
  }
  ValidateFormControlTrd2(i)
  {
    this.formsControlsTr2.controls[i].patchValue({'tradingValue':parseFloat(this.formsControlsTr2.controls[i].value.tradingValue || 0).toFixed(2)}); 
    this.formsControlsTr2.controls[i].patchValue({'tradingProfit':parseFloat(this.formsControlsTr2.controls[i].value.tradingProfit || 0).toFixed(2)}); 
    this.formsControlsTr2.controls[i].patchValue({'tradingProfitRatio':parseFloat(this.formsControlsTr2.controls[i].value.tradingProfitRatio || 0).toFixed(2)}); 
  }
  ValidateFormControlTrd3(i)
  {
    this.formsControlsTr3.controls[i].patchValue({'tradingValue':parseFloat(this.formsControlsTr3.controls[i].value.tradingValue || 0).toFixed(2)}); 
    this.formsControlsTr3.controls[i].patchValue({'tradingProfit':parseFloat(this.formsControlsTr3.controls[i].value.tradingProfit || 0).toFixed(2)}); 
    this.formsControlsTr3.controls[i].patchValue({'tradingProfitRatio':parseFloat(this.formsControlsTr3.controls[i].value.tradingProfitRatio || 0).toFixed(2)}); 
  }
  ValidateFormControlTrd4(i)
  {
    this.formsControlsTr4.controls[i].patchValue({'tradingValue':parseFloat(this.formsControlsTr4.controls[i].value.tradingValue || 0).toFixed(2)}); 
    this.formsControlsTr4.controls[i].patchValue({'tradingProfit':parseFloat(this.formsControlsTr4.controls[i].value.tradingProfit || 0).toFixed(2)}); 
    this.formsControlsTr4.controls[i].patchValue({'tradingProfitRatio':parseFloat(this.formsControlsTr4.controls[i].value.tradingProfitRatio || 0).toFixed(2)}); 
  }
  ValidateFormControlTrd5(i)
  {
    this.formsControlsTr5.controls[i].patchValue({'tradingValue':parseFloat(this.formsControlsTr5.controls[i].value.tradingValue || 0).toFixed(2)}); 
    this.formsControlsTr5.controls[i].patchValue({'tradingProfit':parseFloat(this.formsControlsTr5.controls[i].value.tradingProfit || 0).toFixed(2)}); 
    this.formsControlsTr5.controls[i].patchValue({'tradingProfitRatio':parseFloat(this.formsControlsTr5.controls[i].value.tradingProfitRatio || 0).toFixed(2)}); 
  }
  ValidateFormControlTrd6(i)
  {
    this.formsControlsTr6.controls[i].patchValue({'tradingValue':parseFloat(this.formsControlsTr6.controls[i].value.tradingValue || 0).toFixed(2)}); 
    this.formsControlsTr6.controls[i].patchValue({'tradingProfit':parseFloat(this.formsControlsTr6.controls[i].value.tradingProfit || 0).toFixed(2)}); 
    this.formsControlsTr6.controls[i].patchValue({'tradingProfitRatio':parseFloat(this.formsControlsTr6.controls[i].value.tradingProfitRatio || 0).toFixed(2)}); 
  }
  ValidateLabourOccup(i)
  {
    if(this.formsControls3[i].value.NoofLabours < 0 || this.formsControls3[i].value.NoofLabours > 999999) {
      this.formsControls3[i].patchValue({'NoofLabours':'000'});
    }
    if(this.formsControls3[i].value.Revenue < 0 || this.formsControls3[i].value.Revenue > 999999999999.99) {
      this.formsControls3[i].patchValue({'Revenue':'0.00'});
    }
    // if(this.formsControls3[i].value.NetProfit < 0 || this.formsControls3[i].value.NetProfit > 100) {
    //   this.formsControls3[i].patchValue({'NetProfit':'0.00'});
    // }

    //this.formsControls3[i].patchValue({'NoofLabours':parseFloat(this.formsControls3[i].value.NoofLabours || 0).toFixed(2)});
    this.formsControls3[i].patchValue({'Revenue':parseFloat(this.formsControls3[i].value.Revenue || 0).toFixed(2)}); 
    this.formsControls3[i].patchValue({'NetProfit': (parseFloat(this.formsControls3[i].value.Revenue || 0)-parseFloat(this.formsControls3[i].value.Expenses || 0)).toFixed(2)}); 
  }
  ValidateformsControlsLabourEx(i)
  {
    this.formsControlsLabourEx.controls[i].patchValue({'Amount4':parseFloat(this.formsControlsLabourEx.controls[i].value.Amount4 || 0).toFixed(2)}); 
  }
  ValidateIndustry(i)
  {
    if(this.formsControls4[i].value.FundingTotal < 0 || this.formsControls4[i].value.FundingTotal > 999999999999.99) {
      this.formsControls4[i].patchValue({'FundingTotal':'0.00'});
    }
    if(this.formsControls4[i].value.DeclaredCapital < 0 || this.formsControls4[i].value.DeclaredCapital > 999999999999.99) {
      this.formsControls4[i].patchValue({'DeclaredCapital':'0.00'});
    }
    if(this.formsControls4[i].value.ProfitSAR < 0 || this.formsControls4[i].value.ProfitSAR > 999999999999.99) {
      this.formsControls4[i].patchValue({'ProfitSAR':'0.00'});
    }
    if(this.formsControls4[i].value.Sales < 0 || this.formsControls4[i].value.Sales > 999999999999.99) {
      this.formsControls4[i].patchValue({'FundingTotal':'0.00'});
    }

    this.formsControls4[i].patchValue({'FundingTotal':parseFloat(this.formsControls4[i].value.FundingTotal || 0).toFixed(2)}); 
    this.formsControls4[i].patchValue({'DeclaredCapital':parseFloat(this.formsControls4[i].value.DeclaredCapital || 0).toFixed(2)}); 
    this.formsControls4[i].patchValue({'ProfitSAR':parseFloat(this.formsControls4[i].value.ProfitSAR || 0).toFixed(2)});
    this.formsControls4[i].patchValue({'Sales':parseFloat(this.formsControls4[i].value.Sales || 0).toFixed(2)}); 
  }
  ValidateformsControlspProfit3(i)
  {
    this.formsControlspProfit3.controls[i].patchValue({'ContractValue':parseFloat(this.formsControlspProfit3.controls[i].value.ContractValue || 0).toFixed(2)}); 
    this.formsControlspProfit3.controls[i].patchValue({'StipendContract':parseFloat(this.formsControlspProfit3.controls[i].value.StipendContract || 0).toFixed(2)}); 
    this.formsControlspProfit3.controls[i].patchValue({'ProfitsofContract':parseFloat(this.formsControlspProfit3.controls[i].value.ProfitsofContract || 0).toFixed(2)}); 
  }
  ValidateformsControlspProfit1(i)
  {
    this.formsControlspProfit1.controls[i].patchValue({'ContractValue1':parseFloat(this.formsControlspProfit1.controls[i].value.ContractValue1 || 0).toFixed(2)}); 
    this.formsControlspProfit1.controls[i].patchValue({'StipendContract1':parseFloat(this.formsControlspProfit1.controls[i].value.StipendContract1 || 0).toFixed(2)}); 
    this.formsControlspProfit1.controls[i].patchValue({'ProfitsofContract1':parseFloat(this.formsControlspProfit1.controls[i].value.ProfitsofContract1 || 0).toFixed(2)}); 
  }
  ValidateformsControlspProfit2(i)
  {
    this.formsControlspProfit2.controls[i].patchValue({'ContractValue':parseFloat(this.formsControlspProfit2.controls[i].value.ContractValue || 0).toFixed(2)}); 
    this.formsControlspProfit2.controls[i].patchValue({'StipendContract':parseFloat(this.formsControlspProfit2.controls[i].value.StipendContract || 0).toFixed(2)}); 
    this.formsControlspProfit2.controls[i].patchValue({'ProfitsofContract':parseFloat(this.formsControlspProfit2.controls[i].value.ProfitsofContract || 0).toFixed(2)}); 
  }
  ValidateContractComp(i)
  {
    if(this.formsControls5[i].value.totalProfits < 0 || this.formsControls5[i].value.totalProfits > 999999999999.99) {
      this.formsControls5[i].patchValue({'totalProfits':'0.00'});
    }
    if(this.formsControls5[i].value.NoofLabours < 0 || this.formsControls5[i].value.NoofLabours > 999999) {
      this.formsControls5[i].patchValue({'NoofLabours':'000'});
    }
    if(this.formsControls5[i].value.ProfitSAR < 0 || this.formsControls5[i].value.ProfitSAR > 999999999999.99) {
      this.formsControls5[i].patchValue({'ProfitSAR':'0.00'});
    }
    this.formsControls5[i].patchValue({'ProfitSAR':parseFloat(this.formsControls5[i].value.ProfitSAR || 0).toFixed(2)}); 
    //this.formsControls5[i].patchValue({'NoofLabours':parseFloat(this.formsControls5[i].value.NoofLabours || 0)}); 
    this.formsControls5[i].patchValue({'totalProfits':parseFloat(this.formsControls5[i].value.totalProfits || 0).toFixed(2)}); 
  }
  ValidateInvstRealEstate(i)
  {
    if(this.formsControls6[i].value.Revenue < 0 || this.formsControls6[i].value.Revenue > 999999999999.99) {
      this.formsControls6[i].patchValue({'Revenue':'0.00'});
    }
    // if(this.formsControls6[i].value.NetProfit < 0 || this.formsControls6[i].value.NetProfit > 100) {
    //   this.formsControls6[i].patchValue({'NetProfit':'0.00'});
    // }
    this.formsControls6[i].patchValue({'Revenue':parseFloat(this.formsControls6[i].value.Revenue || 0).toFixed(2)}); 
    this.formsControls6[i].patchValue({'NetProfit':(parseFloat(this.formsControls6[i].value.Revenue || 0)-parseFloat(this.formsControls6[i].value.Expenses || 0)).toFixed(2)});
  }
  ValidateInvstRealExpenses(i) {
    this.formsControlsInvstRealEx.controls[i].patchValue({'Amount5':parseFloat(this.formsControlsInvstRealEx.controls[i].value.Amount5 || 0).toFixed(2)}); 
  }
  ValidateHotels(i)
  {
    if(this.formsControls7[i].value.NoofRooms < 0 || this.formsControls7[i].value.NoofRooms > 9999 ) {
      this.formsControls7[i].patchValue({'NoofRooms':'0'});
    }
    if(this.formsControls7[i].value.RoomRate < 0 || this.formsControls7[i].value.RoomRate > 999999999999.99) {
      this.formsControls7[i].patchValue({'RoomRate':'0.00'});
    }
    if(this.formsControls7[i].value.AddRoomRate < 0 || this.formsControls7[i].value.AddRoomRate > 999999999999.99) {
      this.formsControls7[i].patchValue({'AddRoomRate':'0.00'});
    }
    if(this.formsControls7[i].value.ServiceFees < 0 || this.formsControls7[i].value.ServiceFees > 100 ) {
      this.formsControls7[i].patchValue({'ServiceFees':'0.00'});
    }
    if(this.formsControls7[i].value.OccupancyRate < 0 || this.formsControls7[i].value.OccupancyRate > 100 ) {
      this.formsControls7[i].patchValue({'OccupancyRate':'0.00'});
    }
    if(this.formsControls7[i].value.Revenue < 0 || this.formsControls7[i].value.Revenue > 999999999999.99) {
      this.formsControls7[i].patchValue({'Revenue':'0.00'});
    }
    // if(this.formsControls7[i].value.NetProfit < 0 || this.formsControls7[i].value.NetProfit > 100) {
    //   this.formsControls7[i].patchValue({'NetProfit':'0.00'});
    // }
    this.formsControls7[i].patchValue({'RoomRate':parseFloat(this.formsControls7[i].value.RoomRate || 0).toFixed(2)});
    this.formsControls7[i].patchValue({'AddRoomRate':parseFloat(this.formsControls7[i].value.AddRoomRate || 0).toFixed(2)});
    this.formsControls7[i].patchValue({'ServiceFees':parseFloat(this.formsControls7[i].value.ServiceFees || 0).toFixed(2)});
    this.formsControls7[i].patchValue({'OccupancyRate':parseFloat(this.formsControls7[i].value.OccupancyRate || 0).toFixed(2)});
    this.formsControls7[i].patchValue({'Revenue':parseFloat(this.formsControls7[i].value.Revenue || 0).toFixed(2)});
    this.formsControls7[i].patchValue({'NetProfit':(parseFloat(this.formsControls7[i].value.Revenue || 0)-parseFloat(this.formsControls7[i].value.Expenses || 0)).toFixed(2)});
  }
  ValidateHotelsExpensesModel(i)
  {
    this.formsControlsHotelsEx.controls[i].patchValue({'Amount6':parseFloat(this.formsControlsHotelsEx.controls[i].value.Amount6 || 0).toFixed(2)});
  }
  ValidateEduHealth(i)
  {
    if(this.formsControls8[i].value.ValueofSubsidy < 0 || this.formsControls8[i].value.ValueofSubsidy > 999999999999.99) {
      this.formsControls8[i].patchValue({'ValueofSubsidy':'0.00'});
    }
    // if(this.formsControls8[i].value.NetProfit < 0 || this.formsControls8[i].value.NetProfit > 100) {
    //   this.formsControls8[i].patchValue({'NetProfit':'0.00'});
    // }
    if(this.formsControls8[i].value.Revenue < 0 || this.formsControls8[i].value.Revenue > 999999999999.99) {
      this.formsControls8[i].patchValue({'Revenue':'0.00'});
    }
    this.formsControls8[i].patchValue({'ValueofSubsidy':parseFloat(this.formsControls8[i].value.ValueofSubsidy || 0).toFixed(2)});
    this.formsControls8[i].patchValue({'Revenue':parseFloat(this.formsControls8[i].value.Revenue || 0).toFixed(2)});
    this.formsControls8[i].patchValue({'NetProfit':(parseFloat(this.formsControls8[i].value.ValueofSubsidy || 0)+parseFloat(this.formsControls8[i].value.Revenue || 0)-parseFloat(this.formsControls8[i].value.Expenses || 0)).toFixed(2)});
  }
  ValidateExpensesModalHealth(i)
  {
    this.formsControlsEduHealthEx.controls[i].patchValue({'Amount7':parseFloat(this.formsControlsEduHealthEx.controls[i].value.Amount7 || 0).toFixed(2)});
  }
  ValidatePoultryFishFarms(i)
  {
    if(this.formsControls9[i].value.DeclaredCapital < 0 || this.formsControls9[i].value.DeclaredCapital > 999999999999.99) {
      this.formsControls9[i].patchValue({'DeclaredCapital':'0.00'});
    }
    this.formsControls9[i].patchValue({'DeclaredCapital':parseFloat(this.formsControls9[i].value.DeclaredCapital || 0).toFixed(2)});
    this.formsControls9[i].patchValue({'Capitalrate': (parseFloat(this.formsControls9[i].value.DeclaredCapital || 0)+parseFloat(this.formsControls9[i].value.IncreaseinCapital || 0)).toFixed(2)});
    this.formsControls9[i].patchValue({'Profit':(parseFloat(this.formsControls9[i].value.Capitalrate || 0)*0.15).toFixed(2)});
  }
  ValidateFormControlCapital(i)
  {
    this.formsControlsCapital.controls[i].patchValue({'LoanValue':parseFloat(this.formsControlsCapital.controls[i].value.LoanValue || 0).toFixed(2)});
    this.formsControlsCapital.controls[i].patchValue({'IncreaseinCapital':parseFloat(this.formsControlsCapital.controls[i].value.IncreaseinCapital || 0).toFixed(2)});
  }
  ValidateCars(i)
  {
    if(this.formsControls10[i].value.ShareCapital < 0 || this.formsControls10[i].value.ShareCapital > 999999999999.99) {
      this.formsControls10[i].patchValue({'ShareCapital':'0.00'});
    }
    if(this.formsControls10[i].value.InternalProcurement < 0 || this.formsControls10[i].value.InternalProcurement > 999999999999.99) {
      this.formsControls10[i].patchValue({'InternalProcurement':'0.00'});
    }
    if(this.formsControls10[i].value.Imports < 0 || this.formsControls10[i].value.Imports > 999999999999.99) {
      this.formsControls10[i].patchValue({'Imports':'0.00'});
    }
    if(this.formsControls10[i].value.Sales < 0 || this.formsControls10[i].value.Sales > 999999999999.99) {
      this.formsControls10[i].patchValue({'Sales':'0.00'});
    }
    if(this.formsControls10[i].value.Percentagesales < 0 || this.formsControls10[i].value.Percentagesales > 100) {
      this.formsControls10[i].patchValue({'Percentagesales':'0.00'});
    }
    this.formsControls10[i].patchValue({'ShareCapital':parseFloat(this.formsControls10[i].value.ShareCapital || 0).toFixed(2)});
    this.formsControls10[i].patchValue({'InternalProcurement':parseFloat(this.formsControls10[i].value.InternalProcurement || 0).toFixed(2)});
    this.formsControls10[i].patchValue({'Imports':parseFloat(this.formsControls10[i].value.Imports || 0).toFixed(2)});
    this.formsControls10[i].patchValue({'Sales':parseFloat(this.formsControls10[i].value.Sales || 0).toFixed(2)});
    this.formsControls10[i].patchValue({'Percentagesales':parseFloat(this.formsControls10[i].value.Percentagesales || 0).toFixed(2)});
  }
  ValidateMinerals(i)
  {
    if(this.formsControls11[i].value.ShareCapitalmineral < 0 || this.formsControls11[i].value.ShareCapitalmineral > 999999999999.99) {
      this.formsControls11[i].patchValue({'ShareCapitalmineral':'0.00'});
    }
    if(this.formsControls11[i].value.InternalProcurement < 0 || this.formsControls11[i].value.InternalProcurement > 999999999999.99) {
      this.formsControls11[i].patchValue({'InternalProcurement':'0.00'});
    }
    if(this.formsControls11[i].value.Imports < 0 || this.formsControls11[i].value.Imports > 999999999999.99) {
      this.formsControls11[i].patchValue({'Imports':'0.00'});
    }
    if(this.formsControls11[i].value.Percentagesalesgain < 0 || this.formsControls11[i].value.Percentagesalesgain > 100) {
      this.formsControls11[i].patchValue({'Percentagesalesgain':'0.00'});
    }
    if(this.formsControls11[i].value.ZakatBase < 0 || this.formsControls11[i].value.ZakatBase > 999999999999.99) {
      this.formsControls11[i].patchValue({'ZakatBase':'0.00'});
    }
    if(this.formsControls11[i].value.noOfBranch < 0 || this.formsControls11[i].value.noOfBranch > 9999) {
      this.formsControls11[i].patchValue({'noOfBranch':'0.00'});
    }
    if(this.formsControls11[i].value.noOfEmployees < 0 || this.formsControls11[i].value.noOfEmployees > 9999999999.00) {
      this.formsControls11[i].patchValue({'noOfEmployees':'000'});
    }
    if(this.formsControls11[i].value.Yearlyrent < 0 || this.formsControls11[i].value.Yearlyrent > 999999999999.99) {
      this.formsControls11[i].patchValue({'Yearlyrent':'0.00'});
    }
    if(this.formsControls11[i].value.TotalofAnnualSalary < 0 || this.formsControls11[i].value.TotalofAnnualSalary > 999999999999.99) {
      this.formsControls11[i].patchValue({'TotalofAnnualSalary':'0.00'});
    }
    this.formsControls11[i].patchValue({'ShareCapitalmineral':parseFloat(this.formsControls11[i].value.ShareCapitalmineral || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'InternalProcurement':parseFloat(this.formsControls11[i].value.InternalProcurement || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'Imports':parseFloat(this.formsControls11[i].value.Imports || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'Percentagesalesgain':parseFloat(this.formsControls11[i].value.Percentagesalesgain || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'ZakatBase':parseFloat(this.formsControls11[i].value.ZakatBase || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'noOfBranch':parseFloat(this.formsControls11[i].value.noOfBranch || 0).toFixed(2)});
    //this.formsControls11[i].patchValue({'noOfEmployees':parseFloat(this.formsControls11[i].value.noOfEmployees || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'Yearlyrent':parseFloat(this.formsControls11[i].value.Yearlyrent || 0).toFixed(2)});
    this.formsControls11[i].patchValue({'TotalofAnnualSalary':parseFloat(this.formsControls11[i].value.TotalofAnnualSalary || 0).toFixed(2)});
  }

  ValidateAdditionalsSchedule(i) {
    this.formsControlsEduAdditionalEx.controls[i].patchValue({'AmountOfProfit':parseFloat(this.formsControlsEduAdditionalEx.controls[i].value.AmountOfProfit || 0).toFixed(2)});
  }
  ValidateAdditional(){
    this.Form5Additional.patchValue({'ZakatBase': parseFloat(this.Form5Additional.value.ZakatBase || 0).toFixed(2) });
    this.Form5Additional.patchValue({'Yearlyrent': parseFloat(this.Form5Additional.value.Yearlyrent || 0).toFixed(2) });
    this.Form5Additional.patchValue({'TotalofAnnualSalary': parseFloat(this.Form5Additional.value.TotalofAnnualSalary || 0).toFixed(2) });
  }
  form(){
    console.log('formcabs',this.Form5Form);
  }
  View()
  {
    // console.log(this.Form5Minerals)
    // console.log(this.Form5Cars)
    // console.log(this.Form5Poultry)
    // console.log(this.Form5Health)
    // console.log(this.Form5Hotels)
    // console.log(this.Form5Invst)
    // console.log(this.Form5Contracting)
    // console.log(this.Form5Industry)
    // console.log(this.Form5LaborOccup)
    // console.log(this.Form5FormSell)
    // console.log(this.Form5FormPro)//valid
    console.log("Form5Form", this.Form5Form.dirty)
    console.log("Additional", this.Form5Additional.dirty)
   
  }

  addPopup() {
    jQuery('body').addClass('modalopen');
  }

  fileData: any;
  cancelUpload: boolean = false;
  scheduleName:any;
  
  ExpensesUploadFile(event, scheduleName) {
    jQuery("#ExpensesConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  ExpensesUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["الوصف", "القيمة"];
    }
    else {
      headerTitles = ["Description",	"Amount (SAR)"];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }

  AdditionalExpensesUploadFile(event, scheduleName) {
    jQuery("#AdditionalExpensesConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  AdditionalExpensesUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["الرقم المميز", "اسم المكلف", "مبلغ الربح/الخسارة(يالريال السعودي)"];
    }
    else {
      headerTitles = ["TIN", "Name", "Amount of Profit/Loss"];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }


  ImportsInternalProUploadFile(event, scheduleName){
    jQuery("#ImportsInternalProConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  ImportsInternalProUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["الوصف", "وصف فرعي", "القيمة", "الأرباح (ريال سعودي)"];
    }
    else {
      headerTitles = ["Description",	"Sub-Description",	"Value",	"Profit"];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }


  GovContUploadFile(event, scheduleName){
    jQuery("#GovContConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  GovContUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["رمز الجهة الحكومية", "الوصف", "قيمة العقد", "مصروف العقد"];
    }
    else {
      headerTitles = ["Gov Code", "Description", "Contract Value", "Stipend Contract"];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }

  OtherContUploadFile(event, scheduleName){
    jQuery("#OtherContConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  OtherContUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = [];
    }
    else {
      headerTitles = [];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }

  CivilContUploadFile(event, scheduleName){
    jQuery("#CivilContConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  CivilContUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["نوع المعرف", "الرقم المميز / رقم السجل التجاري للجهة المتعاقدة", "تاريخ نهاية الإقرار", "الوصف", "قيمة العقد", "مصروف العقد", "الأرباح من العقد"];
    }
    else {
      headerTitles = ["Identification Type", "TIN/CR No.of Contracting Party", "Contracting Party Name", "Description", "Contract Value", "Stipend Contract", "Profits of Contract"];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }


  CapitalIncUploadFile(event, scheduleName){
    jQuery("#CapitalIncConfirmation").modal('show');
    this.fileData = event;
    this.scheduleName = scheduleName;
  }
  
  CapitalIncUploadOk() {
    let headerTitles;
    if(this.language == 'ar') {
      headerTitles = ["الوصف", "نوع التقويم", "تاريخ نهاية الإقرار", "قيمة القرض"];
    }
    else {
      headerTitles = ["Description", "Calendar Type", "Date of Loan", "Loan Value"];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }


  file: any;
  arrayBuffer: any;
  filelist: any[] = [];
  onFileUpload(event, headerTitles, scheduleName) {
    this.action="FillManually";
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
              obj[headerArray[j].trimRight()] = data1[i][headerArray[j]] ? data1[i][headerArray[j]] : 0;
            }
            newData.push(obj);

          }
          console.log("newData", newData)

          if (scheduleName == "CabExpenses") {
            this.clearFormArray(this.formsControlsCabs);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormCabs(i);
              let cabs = this.CabsExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                cabs.controls[i].patchValue({ "Description1": newData[i]["الوصف"] });
                cabs.controls[i].patchValue({ "Amount1": newData[i]["القيمة"] });
              }
              else {
                cabs.controls[i].patchValue({ "Description1": newData[i]["Description"] });
                cabs.controls[i].patchValue({ "Amount1": newData[i]["Amount (SAR)"] });
              }
              
              this.ExpensesModalCabsValidation(i);
            }
            this.CabsExpensesCalculations();

          }else if (scheduleName == "ProfExpenses") {
            this.clearFormArray(this.formsControlsProfEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormProf(i);
              let prof = this.ProfExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
               prof.controls[i].patchValue({ "Description2": newData[i]["الوصف"] });
               prof.controls[i].patchValue({ "Amount2": newData[i]["القيمة"] });
              }
              else {
                prof.controls[i].patchValue({ "Description2": newData[i]["Description"] });
                prof.controls[i].patchValue({ "Amount2": newData[i]["Amount (SAR)"] });
              }
              
              this.ValidateProfessionalExpenses(i);
            }
            this.ProfExpensesCalculations();
                      
          }else if (scheduleName == "SellBuyExpenses") {
            this.clearFormArray(this.formsControlsSellBuyEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormSellBuy(i);
              let sellBuy = this.SellBuyExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                sellBuy.controls[i].patchValue({ "Description3": newData[i]["الوصف"] });
                sellBuy.controls[i].patchValue({ "Amount3": newData[i]["القيمة"] });
              }
              else {
                sellBuy.controls[i].patchValue({ "Description3": newData[i]["Description"] });
                sellBuy.controls[i].patchValue({ "Amount3": newData[i]["Amount (SAR)"] });
              }
              
              this.ValidateSellBuyExpenses(i);
            }
            this.SellBuyExpensesCalculations();

          }else if (scheduleName == "LabourOccupExpenses") {
            this.clearFormArray(this.formsControlsLabourEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormLabour(i);
              let labour = this.LabourExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                labour.controls[i].patchValue({ "Description4": newData[i]["الوصف"] });
                labour.controls[i].patchValue({ "Amount4": newData[i]["القيمة"] });
              }
              else {
                labour.controls[i].patchValue({ "Description4": newData[i]["Description"] });
                labour.controls[i].patchValue({ "Amount4": newData[i]["Amount (SAR)"] });
              }
              
              this.ValidateformsControlsLabourEx(i);
            }
            this.LabourExpensesCalculations();
                  
          }else if (scheduleName == "InvestRealExpenses") {
            this.clearFormArray(this.formsControlsInvstRealEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormInvstReal(i);
              let investReal = this.InvstRealExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                investReal.controls[i].patchValue({ "Description5": newData[i]["الوصف"] });
                investReal.controls[i].patchValue({ "Amount5": newData[i]["القيمة"] });
              }
              else {
                investReal.controls[i].patchValue({ "Description5": newData[i]["Description"] });
                investReal.controls[i].patchValue({ "Amount5": newData[i]["Amount (SAR)"] });
              }
              
              this.ValidateInvstRealExpenses(i);
            }
            this.InvstRealExpensesCalculations();
                  
          }else if (scheduleName == "HotelExpenses") {
            this.clearFormArray(this.formsControlsHotelsEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormHotels(i);
              let hotel = this.HotelsExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                hotel.controls[i].patchValue({ "Description6": newData[i]["الوصف"] });
                hotel.controls[i].patchValue({ "Amount6": newData[i]["القيمة"] });
              }
              else {
                hotel.controls[i].patchValue({ "Description6": newData[i]["Description"] });
                hotel.controls[i].patchValue({ "Amount6": newData[i]["Amount (SAR)"] });
              }
              
              this.ValidateHotelsExpensesModel(i);
            }
            this.HotelsExpensesCalculations();
                  
          }else if (scheduleName == "EduHealthExpenses") {
            this.clearFormArray(this.formsControlsEduHealthEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormEduHealth(i);
              let eduHealth = this.EduHealthExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                eduHealth.controls[i].patchValue({ "Description7": newData[i]["الوصف"] });
                eduHealth.controls[i].patchValue({ "Amount7": newData[i]["القيمة"] });
              }
              else {
                eduHealth.controls[i].patchValue({ "Description7": newData[i]["Description"] });
                eduHealth.controls[i].patchValue({ "Amount7": newData[i]["Amount (SAR)"] });
              }
              
              this.ValidateExpensesModalHealth(i);
            }
            this.EduHealthExpensesCalculations();
                  
          }else if (scheduleName == "AdditionalExpenses") {
            this.clearFormArray(this.formsControlsEduAdditionalEx);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormAdditional(i);
              let additional = this.AdditionalExpenses.get('fields') as FormArray;
              if(this.language == 'ar') {
                additional.controls[i].patchValue({ "Tin": newData[i]["الرقم المميز"].toString() });
                //additional.controls[i].patchValue({ "Name": newData[i]["اسم المكلف"] });
                additional.controls[i].patchValue({ "AmountOfProfit": newData[i]["مبلغ الربح/الخسارة(يالريال السعودي)"] });
              }
              else {
                additional.controls[i].patchValue({ "Tin": newData[i]["TIN"].toString() });
                //additional.controls[i].patchValue({ "Name": newData[i]["Name"] });
                additional.controls[i].patchValue({ "AmountOfProfit": newData[i]["Amount of Profit/Loss"] });
              }
              
              this.getTinName(additional.controls[i].get('Tin').value,i);
              this.ValidateAdditionalsSchedule(i);
            }
            this.AdditionalInfoCalculations();
                  
          }else if (scheduleName == "GeneralTrading") {
            this.clearFormArray(this.formsControlsTr1);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormtr1(i);
              let trading1 = this.Form5FormTrading1.get('fields') as FormArray;
              if(this.language == 'ar') {
                trading1.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["الوصف"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading1.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["وصف فرعي"])[0]["SubDesc"] });
                trading1.controls[i].patchValue({ "tradingValue": newData[i]["القيمة"] });
                trading1.controls[i].patchValue({ "tradingProfit": newData[i]["الأرباح (ريال سعودي)"] });
              }
              else {
                trading1.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["Description"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading1.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["Sub-Description"])[0]["SubDesc"] });
                trading1.controls[i].patchValue({ "tradingValue": newData[i]["Value"] });
                trading1.controls[i].patchValue({ "tradingProfit": newData[i]["Profit"] });
              }
            
              this.ValidateFormControlTrd1(i);
            }
            this.Form5TradingCalculations();
                  
          }else if (scheduleName == "Livelihood") {
            this.clearFormArray(this.formsControlsTr2);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormtr2(i);
              let trading2 = this.Form5FormTrading2.get('fields') as FormArray;
              if(this.language == 'ar') {
                trading2.controls[i].patchValue({ "description1":  this.description_GP03_37set.filter(x => x["Text"] == newData[i]["الوصف"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading2.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_37set.filter(x => x["Text"] == newData[i]["وصف فرعي"])[0]["SubDesc"] });
                trading2.controls[i].patchValue({ "tradingValue": newData[i]["القيمة"] });
                trading2.controls[i].patchValue({ "tradingProfit": newData[i]["الأرباح (ريال سعودي)"] });
              }
              else {
                trading2.controls[i].patchValue({ "description1":  this.description_GP03_37set.filter(x => x["Text"] == newData[i]["Description"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading2.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_37set.filter(x => x["Text"] == newData[i]["Sub-Description"])[0]["SubDesc"] });
                trading2.controls[i].patchValue({ "tradingValue": newData[i]["Value"] });
                trading2.controls[i].patchValue({ "tradingProfit": newData[i]["Profit"] });
              }
            
              this.ValidateFormControlTrd2(i);
            }
            this.Form5TradingCalculations();
                  
          }else if (scheduleName == "Livestock") {
            this.clearFormArray(this.formsControlsTr3);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormtr3(i);
              let trading3 = this.Form5FormTrading3.get('fields') as FormArray;
              if(this.language == 'ar') {
                trading3.controls[i].patchValue({ "description1":  this.description_GP03_48set.filter(x => x["Text"] == newData[i]["الوصف"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading3.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_48set.filter(x => x["Text"] == newData[i]["وصف فرعي"])[0]["SubDesc"] });
                trading3.controls[i].patchValue({ "tradingValue": newData[i]["القيمة"] });
                trading3.controls[i].patchValue({ "tradingProfit": newData[i]["الأرباح (ريال سعودي)"] });
              }
              else {
                trading3.controls[i].patchValue({ "description1":  this.description_GP03_48set.filter(x => x["Text"] == newData[i]["Description"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading3.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_48set.filter(x => x["Text"] == newData[i]["Sub-Description"])[0]["SubDesc"] });
                trading3.controls[i].patchValue({ "tradingValue": newData[i]["Value"] });
                trading3.controls[i].patchValue({ "tradingProfit": newData[i]["Profit"] });
              }
            
              this.ValidateFormControlTrd3(i);
            }
            this.Form5TradingCalculations();
                  
          }else if (scheduleName == "IntGeneralTrading") {
            this.clearFormArray(this.formsControlsTr4);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormtr4(i);
              let trading4 = this.Form5FormTrading4.get('fields') as FormArray;
              if(this.language == 'ar') {
                trading4.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["الوصف"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading4.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["وصف فرعي"])[0]["SubDesc"] });
                trading4.controls[i].patchValue({ "tradingValue": newData[i]["القيمة"] });
                trading4.controls[i].patchValue({ "tradingProfit": newData[i]["الأرباح (ريال سعودي)"] });
              }
              else {
                trading4.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["Description"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading4.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["Sub-Description"])[0]["SubDesc"] });
                trading4.controls[i].patchValue({ "tradingValue": newData[i]["Value"] });
                trading4.controls[i].patchValue({ "tradingProfit": newData[i]["Profit"] });
              }
            
              this.ValidateFormControlTrd4(i);
            }
            this.Form5TradingCalculations();
                  
          }else if (scheduleName == "IntLivelihoods") {
            this.clearFormArray(this.formsControlsTr5);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormtr5(i);
              let trading5 = this.Form5FormTrading5.get('fields') as FormArray;
              if(this.language == 'ar') {
                trading5.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["الوصف"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading5.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["وصف فرعي"])[0]["SubDesc"] });
                trading5.controls[i].patchValue({ "tradingValue": newData[i]["القيمة"] });
                trading5.controls[i].patchValue({ "tradingProfit": newData[i]["الأرباح (ريال سعودي)"] });
              }
              else {
                trading5.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["Description"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading5.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["Sub-Description"])[0]["SubDesc"] });
                trading5.controls[i].patchValue({ "tradingValue": newData[i]["Value"] });
                trading5.controls[i].patchValue({ "tradingProfit": newData[i]["Profit"] });
              }
            
              this.ValidateFormControlTrd5(i);
            }
            this.Form5TradingCalculations();
                  
          }else if (scheduleName == "IntLivestock") {
            this.clearFormArray(this.formsControlsTr6);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormtr6(i);
              let trading6 = this.Form5FormTrading6.get('fields') as FormArray;
              if(this.language == 'ar') {
                trading6.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["الوصف"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading6.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["وصف فرعي"])[0]["SubDesc"] });
                trading6.controls[i].patchValue({ "tradingValue": newData[i]["القيمة"] });
                trading6.controls[i].patchValue({ "tradingProfit": newData[i]["الأرباح (ريال سعودي)"] });
              }
              else {
                trading6.controls[i].patchValue({ "description1":  this.description_GP03_26set.filter(x => x["Text"] == newData[i]["Description"].split('_').join(' ').split('  ').join(', '))[0]["Desciption"] });
                trading6.controls[i].patchValue({ "subdescription1": this.subdescription_GP03_26set.filter(x => x["Text"] == newData[i]["Sub-Description"])[0]["SubDesc"] });
                trading6.controls[i].patchValue({ "tradingValue": newData[i]["Value"] });
                trading6.controls[i].patchValue({ "tradingProfit": newData[i]["Profit"] });
              }
            
              this.ValidateFormControlTrd6(i);
            }
            this.Form5TradingCalculations();
                  
          }else if (scheduleName == "GovCont") {
            this.clearFormArray(this.formsControlspProfit3);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormProfit3(i);
              let govCont = this.Form5FormProfitModel3.get('fields') as FormArray;
              if(this.language == 'ar') {
                govCont.controls[i].patchValue({ "govCode": newData[i]["رمز الجهة الحكومية"]  });
                govCont.controls[i].patchValue({ "Description": newData[i]["الوصف"] });
                govCont.controls[i].patchValue({ "ContractValue": newData[i]["قيمة العقد"] });
                govCont.controls[i].patchValue({ "StipendContract": newData[i]["مصروف العقد"] });
              }
              else {
                govCont.controls[i].patchValue({ "govCode": newData[i]["Gov Code"]  });
                govCont.controls[i].patchValue({ "Description": newData[i]["Description"] });
                govCont.controls[i].patchValue({ "ContractValue": newData[i]["Contract Value"] });
                govCont.controls[i].patchValue({ "StipendContract": newData[i]["Stipend Contract"] });
              }
            
              this.ValidateformsControlspProfit3(i);
            }
            this.Form5ProfitCalculations();
                  
          }else if (scheduleName == "OtherCont") {
            //pending
            this.clearFormArray(this.formsControlspProfit2);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormProfit2(i);
              let otherCont = this.Form5FormProfitModel2.get('fields') as FormArray;
              if(this.language == 'ar') {
                otherCont.controls[i].patchValue({ "Description": newData[i][""]  });
                otherCont.controls[i].patchValue({ "ContractValue": newData[i][""] });
                otherCont.controls[i].patchValue({ "StipendContract": newData[i][""] });
                
              }
              else {
                otherCont.controls[i].patchValue({ "Description": newData[i][""]  });
                otherCont.controls[i].patchValue({ "ContractValue": newData[i][""] });
                otherCont.controls[i].patchValue({ "StipendContract": newData[i][""] });
                
              }
            
              this.ValidateformsControlspProfit2(i);
            }
            this.Form5ProfitCalculations();
                  
          }else if (scheduleName == "CivilCont") {
            this.clearFormArray(this.formsControlspProfit1);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormProfit1(i);
              let civilCont = this.Form5FormProfitModel1.get('fields') as FormArray;
              if(this.language == 'ar') {
                civilCont.controls[i].patchValue({ "identificationType":  newData[i]["نوع المعرف"].trim() == "TIN"?"1":"2" });
                civilCont.controls[i].patchValue({ "AmountofContractingParty": newData[i]["الرقم المميز / رقم السجل التجاري للجهة المتعاقدة"].toString() });
                civilCont.controls[i].patchValue({ "Description": newData[i]["الوصف"] });
                civilCont.controls[i].patchValue({ "ContractValue1": newData[i]["قيمة العقد"] });
                civilCont.controls[i].patchValue({ "StipendContract1": newData[i]["مصروف العقد"] });
              }
              else {
                // this.TINNO.filter( x => x["Text"] == newData[i]["Identification Type"])[0]["Key"]
                civilCont.controls[i].patchValue({ "identificationType":  newData[i]["Identification Type"].trim() == "TIN"?"1":"2" });
                civilCont.controls[i].patchValue({ "AmountofContractingParty": newData[i]["TIN/CR No.of Contracting Party"].toString() });
                civilCont.controls[i].patchValue({ "Description": newData[i]["Description"] });
                civilCont.controls[i].patchValue({ "ContractValue1": newData[i]["Contract Value"] });
                civilCont.controls[i].patchValue({ "StipendContract1": newData[i]["Stipend Contract"] });
              }
            
              this.ValidateformsControlspProfit1(i);
              this.getTinNameBytinNo(civilCont.controls[i].get('AmountofContractingParty').value,i)
            }
            this.Form5ProfitCalculations();
                  
          }else if (scheduleName == "CapitalInc") {
            this.clearFormArray(this.formsControlsCapital);

            for (let i = 0; i < newData.length; i++) {
              this.onAddFormCapital(i);
              let capitalInc = this.Form5FormCapitalModel.get('fields') as FormArray;
              if(this.language == 'ar') {
                capitalInc.controls[i].patchValue({ "Description": newData[i]["الوصف"] });
                capitalInc.controls[i].patchValue({ "DateofLoan": newData[i]["تاريخ نهاية الإقرار"] });
                capitalInc.controls[i].patchValue({ "LoanValue": newData[i]["قيمة القرض"] });
              }
              else {
                capitalInc.controls[i].patchValue({ "Description": newData[i]["Description"] });
                capitalInc.controls[i].patchValue({ "DateofLoan": newData[i]["Date of Loan"] });
                capitalInc.controls[i].patchValue({ "LoanValue": newData[i]["Loan Value"] });
              }
            
              this.ValidateFormControlCapital(i);
            }
            this.Form5CapitalCalculations();
                  
          }



          
        }
        else {
          jQuery("#toolTips").modal('show');
        }
      }
    }else{
      this.cancelUpload=false;
    }
    event.target.value = "";
  }

}
