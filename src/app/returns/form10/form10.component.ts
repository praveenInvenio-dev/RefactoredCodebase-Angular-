import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReturnsService } from "../returns.service";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
declare var jQuery: any;

import * as moment from "moment";
import * as FileSaver from "file-saver";

import { form10constants } from "src/app/returns/form10/form10constants.model";

//import { parse } from 'path';
//import { Item1002Set } from '../../item1002-set'
import { Router } from "@angular/router";
import { parse } from "querystring";
import { ParseSourceFile } from "@angular/compiler";
@Component({
  selector: "app-form10",
  templateUrl: "./form10.component.html",
  styleUrls: ["./form10.component.css"],
})
export class Form10Component implements OnInit {
  step: number = 1;
  Fbguid: number;
  Euser: number;
  lang: any;
  direction: string;
  Fbnum: number;
  Gpart: number;
  form10List: any;
  ServiceDetails: any;
  Zacattax: any;
  //saraswathi start
  BeLiabilityandequity: any = 0;
  BsLiabilityandequity: any = 0;
  taxbaseD1Form: FormGroup;
  taxbaseD2Form: FormGroup;
  Item1003Set: any = [];
  I1008SetData: any = [];
  I1003SetData: any = [];
  Item1008SetAdd: any = [];
  Item1008Set: any = [];
  Item1008C1A: any;
  Item1008C2A: any;
  Item1008C3A: any;
  //saraswthi end
  //phani start
  transactionsSet: any[] = [];
  JurisdictionSet: any[] = [];
  TransactionNatureSet: any[] = [];
  TPMethodsSet: any[] = [];
  TaxJuridictionSet: any[] = [];
  ProvisionsForm: FormGroup;
  LoanChargesForm: FormGroup;
  ProvisionsTotal = 0;
  NetProfitIsAppilicable: boolean = false;
  RepairThresholdIsAppilicable: boolean = false;
  AmendTypeDropDownList: any;
  ProvisionsValidation = [];
  CorrectFlag: boolean = false;

  //phani end
  //purna start
  IsCancelShow: boolean = false;
  IsAmendShow: boolean = false;
  IsAmendClick: boolean = false;
  AgreeClick: boolean = false;
  ZakatFileCount: any[] = [];
  @ViewChild("inputFile") myInputVariable: ElementRef;
  @ViewChild("inputFile1") myInputVariable1: ElementRef;
  @ViewChild("inputCharteredFile") myinputCharteredFile: ElementRef;
  @ViewChild("inputFinancialStatement") myinputFinancialStatement: ElementRef;
  ChartedFileCount: any[] = [];
  FinancialFileCount: any[] = [];
  chartFile: boolean = false;
  UpeFye: any;
  FeFye: any;
  isReadOnly: any = true;
  amandData: any;
  periodStartDate: any;
  periodEndDate: any;
  NoOfAddedForms: number = 1;
  TransactionDetailsForm: FormGroup;
  RelatedPartiesYesForm: FormGroup;
  ShareHoldersDetailsForm: FormGroup;
  zcD1Form: FormGroup;
  zcD2Form: FormGroup;
  zcD3Form: FormGroup;
  zcD4Form: FormGroup;
  totalOD: number = 0;
  totalIIL: number = 0;
  InvestmentTypeDropDownList: any;
  LAEDropDownlist: any;
  zcA2Form: FormGroup;
  zcA3Form: FormGroup;
  totalOA: number = 0;
  zcA2Error1: boolean = false;
  zcA2Error2: boolean = false;
  zcA2Error3: boolean = false;
  zcA2Error4: boolean = false;
  zcA2Error5: boolean = false;
  zcA2Error6: boolean = false;
  AddZakatBase: any;
  TotalDed: any;
  totalZDSell: any;
  Item1001SetFormFG: FormGroup;
  Item1002SetFormFG: FormGroup;
  Item1004SetFormFG: FormGroup;
  Item1006SetFormFG: FormGroup;
  Item1013SetFormFG: FormGroup;
  Item1019SetFormFG: FormGroup;
  //purna end
  //venkat start
  SubContractorTotal: string = "0.00";
  beginingyearbal: any = 0.0;
  ChargedAccount: any = 0.0;
  paidduringyear: any = 0.0;
  endyearbal: any = 0.0;
  Provbalbegperiod: any = 0.0;
  Provmadeduryear: any = 0.0;
  Provutiduryear: any = 0.0;
  Adjustments: any = 0.0;
  Provisionsbalendperiod: any = 0.0;
  ContractsDropDownList: any;
  SubContractsDropDownList: any;
  Item1001Set: any = [];
  Item1002Set: any = {};
  Item1004Set: any = [];
  CountryDropDownList: any;
  MachinaryDropDownList: any;
  ResidencyDropDownList: any;
  Item1013Set: any = [];
  Item1005Set: any = [];
  ServiceDropDownList: any;
  Item1019Set: any = [];
  RoyaltiesTechDropDownList: any;
  Item1006Set: any = [];
  OtherExpansesTotal: any = "0.00";
  chkincomeinsurance: any = false;
  CuryrRevenue: string = "0.00";
  ROthergainloss: any = true;
  maxDate: any;
  incomeError1: boolean = false;
  IncomeInsuChange: boolean = false;
  IncomeContractorsChange: boolean = false;
  SubContractorsChange: boolean = false;
  MacEquiChange: boolean = false;
  RoyaTechSerChange: boolean = false;
  OtherExpChange: boolean = false;
  //venkat end
  constructor(
    private router: Router,
    private from10Service: ReturnsService,
    private returnsService: ReturnsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.maxDate = new Date();
    this.taxbaseD1Form = this.fb.group({
      Schedule: [false],
      TaxBaseD1: this.fb.array([]),
      Totals: [0.0],
    });
    this.taxbaseD2Form = this.fb.group({
      Schedule: [false],
      TaxBaseD2: this.fb.array([]),
      Totals: [0.0],
    });
    this.zcD1Form = this.fb.group({
      Schedule: [false],
      ZCD1: this.fb.array([]),
      Totals: [0.0],
    });
    this.zcD2Form = this.fb.group({
      Schedule: [false],
      ZCD2: this.fb.array([]),
      Totals: [0.0],
    });
    this.zcD3Form = this.fb.group({
      Schedule: [false],
      ZCD3: this.fb.array([]),
      Totals: [0.0],
    });
    this.zcD4Form = this.fb.group({
      Schedule: [false],
      ZCD4: this.fb.array([]),
      Totals: [0.0],
    });
    this.zcA3Form = this.fb.group({
      Schedule: [false],
      ZCA3: this.fb.array([]),
      Totals: [0.0],
    });
    this.zcA2Form = this.fb.group({
      Schedule: [false],
      ZCA2: this.fb.array([]),
      Totals: [0.0],
    });
    this.Item1001SetFormFG = this.fb.group({
      Schedule: [false],
      Item1001SetForm: this.fb.array([]),
      Totals: [0.0],
    });
    this.Item1002SetFormFG = this.fb.group({
      Schedule: [false],
      Item1002SetForm: this.fb.array([]),
      Totals: [0.0],
    });
    this.Item1004SetFormFG = this.fb.group({
      Schedule: [false],
      Item1004SetForm: this.fb.array([]),
      Totals: [0.0],
    });
    this.Item1006SetFormFG = this.fb.group({
      Schedule: [false],
      Item1006SetForm: this.fb.array([]),
      Totals: [0.0],
    });
    this.Item1013SetFormFG = this.fb.group({
      Schedule: [false],
      Item1013SetForm: this.fb.array([]),
      Totals: [0.0],
    });
    this.Item1019SetFormFG = this.fb.group({
      Schedule: [false],
      Item1019SetForm: this.fb.array([]),
      Totals: [0.0],
    });

    //phani start
    this.TransactionDetailsForm = this.fb.group({
      PartyTransactionsSet: this.fb.array([]),
    });
    this.RelatedPartiesYesForm = this.fb.group({
      RelatedPartiesSet: this.fb.array([]),
    });
    this.ShareHoldersDetailsForm = this.fb.group({
      ShareholdersSet: this.fb.array([]),
    });
    this.ProvisionsForm = this.fb.group({
      Schedule: [false],
      Provisions: this.fb.array([]),
    });
    this.LoanChargesForm = this.fb.group({
      Schedule: [false],
      LoanCharges: this.fb.array([]),
    });
    //phani end
  }
  ngOnInit(): void {
    //  //For Tab Active
    //  if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab",JSON.stringify("الزكاة و ضريبة الدخل"));
    //   }else
    //   {
    //     localStorage.setItem("ActiveTab",JSON.stringify("Zakat & CIT"));
    //   }
    // //For Tab Active end

    moment.locale("en-Us");
    if (localStorage.getItem("lang") === "ar") {
      this.lang = form10constants.langz.arb.form10;
      this.direction = form10constants.langz.arb.dir;
    } else {
      this.lang = form10constants.langz.eng.form10;
      this.direction = form10constants.langz.eng.dir;
    }
    this.route.params.subscribe((params) => {
      console.log("params", params);
      this.Fbguid = params["fbGuid"] || "";
      this.Euser = params["euser"] || "";
      this.Fbnum = params["fbnum"] || "";
      this.Gpart = JSON.parse(localStorage.getItem("gpart"));
      this.Zacattax = JSON.parse(localStorage.getItem("Zacattax"));
      if (this.Fbguid && this.Euser) {
        this.getForm10Details();
      }
    });
  }
  agree(event) {
    let ev = event;
    if (event.currentTarget.checked == true) {
      //jQuery("#agreeModal").modal('show');
      this.CorrectFlag = true;
      this.form10List.CorrectFg = "X";
      this.form10List.AgreeFg = "X";
    } else {
      this.CorrectFlag = false;
      this.form10List.CorrectFg = "";
      this.form10List.AgreeFg = "";
      //jQuery("#agreeModal").modal('hide');
    }
  }
  getForm10Details() {
    this.returnsService
      .getForm10Details(this.Fbguid, this.Euser)
      .subscribe((data) => {
        this.GetServiceDetails();
        this.form10List = data["d"];
        if (
          this.form10List.Statusz == "" ||
          this.form10List.Statusz == "E0013" ||
          this.form10List.Statusz == "E0001"
        ) {
          this.IsCancelShow = true;
        } else {
          this.IsCancelShow = false;
        }
        if (
          (this.form10List.Statusz == "E0045" ||
            this.form10List.Statusz == "E0006") &&
          this.IsAmendClick == false
        ) {
          this.IsAmendShow = true;
          this.step = 10;
        } else {
          this.IsAmendShow = false;
        }
        if (this.form10List.Statusz == "E0058" && this.IsAmendClick == false) {
          this.step = 10;
        }
        console.log("form10list", this.form10List);
        //punra start
        this.clearFormArray(this.PartyTransactionsSet);
        for (
          let i = 0;
          i < this.form10List.Item1022Set["results"].length;
          i++
        ) {
          this.AddTransactionRow();
          this.PartyTransactionsSet.controls[i].patchValue({
            Transaction: this.form10List.Item1022Set["results"][i][
              "Transactions"
            ],
          });
          this.PartyTransactionsSet.controls[i].patchValue({
            Description: this.form10List.Item1022Set["results"][i][
              "Tdescription"
            ],
          });
          this.PartyTransactionsSet.controls[i].patchValue({
            NameOfRelatedParty: this.form10List.Item1022Set["results"][i][
              "PartyName"
            ],
          });
          this.PartyTransactionsSet.controls[i].patchValue({
            Jurisdiction: this.form10List.Item1022Set["results"][i][
              "Jurisdiction"
            ],
          });
          this.PartyTransactionsSet.controls[i].patchValue({
            TransactionNature: this.form10List.Item1022Set["results"][i][
              "AmtFg"
            ],
          });
          this.PartyTransactionsSet.controls[i].patchValue({
            Amount: this.form10List.Item1022Set["results"][i]["Amt"],
          });
          this.PartyTransactionsSet.controls[i].patchValue({
            TPMethod: this.form10List.Item1022Set["results"][i]["TpMethod"],
          });
        }
        this.clearFormArray(this.RelatedPartiesSet);
        for (
          let i = 0;
          i < this.form10List.Item1023Set["results"].length;
          i++
        ) {
          this.AddRelatedPartiesRow();
          this.RelatedPartiesSet.controls[i].patchValue({
            TransactionDescription: this.form10List.Item1023Set["results"][i][
              "FocDescriptions"
            ],
          });
          this.RelatedPartiesSet.controls[i].patchValue({
            CounterParty: this.form10List.Item1023Set["results"][i][
              "Counterparty"
            ],
          });
          this.RelatedPartiesSet.controls[i].patchValue({
            Jurisdiction: this.form10List.Item1023Set["results"][i][
              "Jurisdiction"
            ],
          });
        }
        this.clearFormArray(this.ShareholdersSet);
        for (
          let i = 0;
          i < this.form10List.Item1024Set["results"].length;
          i++
        ) {
          this.AddShareholdersSetRow();
          this.ShareholdersSet.controls[i].patchValue({
            ShareHoldersName: this.form10List.Item1024Set["results"][i][
              "ShName"
            ],
          });
          this.ShareholdersSet.controls[i].patchValue({
            Jurisdiction: this.form10List.Item1024Set["results"][i][
              "Jurisdiction"
            ],
          });
          this.ShareholdersSet.controls[i].patchValue({
            OwnerShipPercentage: this.form10List.Item1024Set["results"][i][
              "Ownership"
            ],
          });
        }
        this.periodStartDate = moment(
          new Date(
            +this.form10List.Abrzu.replace(")", "")
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD/MM/YYYY");
        this.periodEndDate = moment(
          new Date(
            +this.form10List.Abrzo.replace(")", "")
              .toString()
              .replace("/Date(", "")
              .toString()
              .replace("/", "")
          )
        ).format("DD/MM/YYYY");

        this.form10List.CorrectFg == "X"
          ? (this.CorrectFlag = true)
          : (this.CorrectFlag = false);

        this.form10List.RLoanEqui == "X"
          ? this.zcA2Form.patchValue({ Schedule: true })
          : this.zcA2Form.patchValue({ Schedule: false });
        //if (this.form10List.RLoanEqui == "X") {
        this.clearFormArray(this.ZCA2);
        for (
          let i = 0;
          i < this.form10List.Item1012Set["results"].length;
          i++
        ) {
          this.AddRowZCA2();
          this.ZCA2.controls[i].patchValue({
            LenderName: this.form10List.Item1012Set["results"][i]["LenderName"],
          });
          this.ZCA2.controls[i].patchValue({
            LocalFore: this.form10List.Item1012Set["results"][i]["LocalFore"],
          });
          this.ZCA2.controls[i].patchValue({
            BalBegPeriod: this.form10List.Item1012Set["results"][i][
              "BalBegPeriod"
            ],
          });
          this.ZCA2.controls[i].patchValue({
            AmtClrCyr: this.form10List.Item1012Set["results"][i]["AmtClrCyr"],
          });
          this.ZCA2.controls[i].patchValue({
            AddLoanCyr: this.form10List.Item1012Set["results"][i]["AddLoanCyr"],
          });
          this.ZCA2.controls[i].patchValue({
            BalEndPeriod: this.form10List.Item1012Set["results"][i][
              "BalEndPeriod"
            ],
          });
          this.ZCA2.controls[i].patchValue({
            UtiDedItem: this.form10List.Item1012Set["results"][i]["UtiDedItem"],
          });
          this.ZCA2.controls[i].patchValue({
            LoanBalance: this.form10List.Item1012Set["results"][i][
              "LoanBalance"
            ],
          });
          this.ZCA2.controls[i].patchValue({
            LoanStartDt:
              this.form10List.Item1012Set["results"][i]["LoanStartDt"] != null
                ? moment(
                    new Date(
                      +this.form10List.Item1012Set["results"][i]["LoanStartDt"]
                        .replace(")", "")
                        .toString()
                        .replace("/Date(", "")
                        .toString()
                        .replace("/", "")
                    )
                  ).format("YYYY-MM-DD")
                : moment(new Date()).format("YYYY-MM-DD"),
          });
          this.ZCA2.controls[i].patchValue({
            LoanClearDt:
              this.form10List.Item1012Set["results"][i]["LoanClearDt"] != null
                ? moment(
                    new Date(
                      +this.form10List.Item1012Set["results"][i]["LoanClearDt"]
                        .replace(")", "")
                        .toString()
                        .replace("/Date(", "")
                        .toString()
                        .replace("/", "")
                    )
                  ).format("YYYY-MM-DD")
                : moment(new Date()).format("YYYY-MM-DD"),
          });
          this.ZCA2.controls[i].patchValue({
            LoanDays: this.form10List.Item1012Set["results"][i]["LoanDays"],
          });
          this.ZCA2.controls[i].patchValue({
            PeriodDays: this.form10List.Item1012Set["results"][i]["PeriodDays"],
          });
          this.ZCA2.controls[i].patchValue({
            LoanAddZakat: this.form10List.Item1012Set["results"][i][
              "LoanAddZakat"
            ],
          });
          this.ZCA2.controls[i].patchValue({
            TotDed: this.form10List.Item1012Set["results"][i]["TotDed"],
          });
          this.ZCA2.controls[i].patchValue({
            AddZakatBase: this.form10List.Item1012Set["results"][i][
              "AddZakatBase"
            ],
          });
          this.CalcZCA2(i);
        }
        //}

        this.form10List.ROthadd == "X"
          ? this.zcA3Form.patchValue({ Schedule: true })
          : this.zcA3Form.patchValue({ Schedule: false });
        //if (this.form10List.ROthadd == "X") {
        this.clearFormArray(this.ZCA3);
        for (
          let i = 0;
          i < this.form10List.Item1014Set["results"].length;
          i++
        ) {
          this.AddRowZCA3();
          this.ZCA3.controls[i].patchValue({
            AddItem: this.form10List.Item1014Set["results"][i]["AddItem"],
          });
          this.ZCA3.controls[i].patchValue({
            Amount: this.form10List.Item1014Set["results"][i]["Amount"],
          });
          this.calCellTotalOA();
        }
        //}

        this.form10List.RInvsetlocal == "X"
          ? this.zcD1Form.patchValue({ Schedule: true })
          : this.zcD1Form.patchValue({ Schedule: false });
        //if (this.form10List.RInvsetlocal == "X") {
        this.clearFormArray(this.ZCD1);
        for (
          let i = 0;
          i < this.form10List.Item1011Set["results"].length;
          i++
        ) {
          this.AddRowZCD1();
          this.ZCD1.controls[i].patchValue({
            InvType: this.form10List.Item1011Set["results"][i]["InvType"],
          });
          this.ZCD1.controls[i].patchValue({
            Tim: this.form10List.Item1011Set["results"][i]["Tim"],
          });
          this.ZCD1.controls[i].patchValue({
            InvCmpName: this.form10List.Item1011Set["results"][i]["InvCmpName"],
          });
          this.ZCD1.controls[i].patchValue({
            Amount: this.form10List.Item1011Set["results"][i]["Amount"],
          });
          this.CalZCIIL();
        }
        //}

        this.form10List.ROthded == "X"
          ? this.zcD4Form.patchValue({ Schedule: true })
          : this.zcD4Form.patchValue({ Schedule: false });
        //if (this.form10List.ROthded == "X") {
        this.clearFormArray(this.ZCD4);
        for (
          let i = 0;
          i < this.form10List.Item1016Set["results"].length;
          i++
        ) {
          this.AddRowZCD4();
          this.ZCD4.controls[i].patchValue({
            AccName: this.form10List.Item1016Set["results"][i]["AccName"],
          });
          this.ZCD4.controls[i].patchValue({
            ZakatReason: this.form10List.Item1016Set["results"][i][
              "ZakatReason"
            ],
          });
          this.ZCD4.controls[i].patchValue({
            Amount: this.form10List.Item1016Set["results"][i]["Amount"],
          });
          this.calCellTotalOD();
        }
        //}

        this.form10List.RAdjcarry == "X"
          ? this.zcD2Form.patchValue({ Schedule: true })
          : this.zcD2Form.patchValue({ Schedule: false });
        //if (this.form10List.RAdjcarry == "X") {
        this.clearFormArray(this.ZCD2);
        for (
          let i = 0;
          i < this.form10List.Item1015Set["results"].length;
          i++
        ) {
          this.AddRowZCD2();
          this.ZCD2.controls[i].patchValue({
            NetProfit: this.form10List.ZakprofitadAmt,
          });
          this.ZCD2.controls[i].patchValue({
            DefAdjacement: this.form10List.Item1015Set["results"][i][
              "DefAdjacement"
            ],
          });
          this.ZCD2.controls[i].patchValue({
            AllocReject: this.form10List.Item1015Set["results"][i][
              "AllocReject"
            ],
          });
          this.ZCD2.controls[i].patchValue({
            CayyForward: this.form10List.Item1015Set["results"][i][
              "CayyForward"
            ],
          });
          this.ZCD2.controls[i].patchValue({
            TotLoss: this.form10List.Item1015Set["results"][i]["TotLoss"],
          });
          this.ZCD2.controls[i].patchValue({
            CayyForwardloss: this.form10List.Item1015Set["results"][i][
              "CayyForwardloss"
            ],
          });
          this.CalculateZCACFL();
        }
        //}

        this.form10List.RProperty == "X"
          ? this.zcD3Form.patchValue({ Schedule: true })
          : this.zcD3Form.patchValue({ Schedule: false });
        //if (this.form10List.RProperty == "X") {
        this.clearFormArray(this.ZCD3);
        for (
          let i = 0;
          i < this.form10List.Item1009Set["results"].length;
          i++
        ) {
          this.AddRowZCD3();
          this.ZCD3.controls[i].patchValue({
            Statement: this.form10List.Item1009Set["results"][i]["Statement"],
          });
          this.ZCD3.controls[i].patchValue({
            BegBal: this.form10List.Item1009Set["results"][i]["BegBal"],
          });
          this.ZCD3.controls[i].patchValue({
            Addition: this.form10List.Item1009Set["results"][i]["Addition"],
          });
          this.ZCD3.controls[i].patchValue({
            DispCost: this.form10List.Item1009Set["results"][i]["DispCost"],
          });
          this.ZCD3.controls[i].patchValue({
            EndBal: this.form10List.Item1009Set["results"][i]["EndBal"],
          });
          this.ZCD3.controls[i].patchValue({
            TotSale: this.form10List.Item1009Set["results"][i]["TotSale"],
          });
          this.ZCD3.controls[i].patchValue({
            CusTotPay: this.form10List.Item1009Set["results"][i]["CusTotPay"],
          });
          this.ZCD3.controls[i].patchValue({
            Per: this.form10List.Item1009Set["results"][i]["Per"],
          });
          this.ZCD3.controls[i].patchValue({
            DedBase: this.form10List.Item1009Set["results"][i]["DedBase"],
          });
          this.calTotalZDSell(i);
        }
        //}
        this.CalculateTotalZCDeduction();
        this.form10List.RIncomeContract == "X"
          ? this.Item1001SetFormFG.patchValue({ Schedule: true })
          : this.Item1001SetFormFG.patchValue({ Schedule: false });
        //if (this.form10List.RInvsetlocal == "X") {
        this.clearFormArray(this.Item1001SetForm);
        for (
          let i = 0;
          i < this.form10List.Item1001Set["results"].length;
          i++
        ) {
          this.AddRowItem1001Set();
          this.Item1001SetForm.controls[i].patchValue({
            IdTp: this.form10List.Item1001Set["results"][i]["IdTp"],
          });
          this.Item1001SetForm.controls[i].patchValue({
            IdNo: this.form10List.Item1001Set["results"][i]["IdNo"],
          });
          this.Item1001SetForm.controls[i].patchValue({
            ContraPatry: this.form10List.Item1001Set["results"][i][
              "ContraPatry"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            ContractDt:
              this.form10List.Item1001Set["results"][i]["ContractDt"] != null
                ? moment(
                    new Date(
                      +this.form10List.Item1001Set["results"][i]["ContractDt"]
                        .replace(")", "")
                        .toString()
                        .replace("/Date(", "")
                        .toString()
                        .replace("/", "")
                    )
                  ).format("YYYY-MM-DD")
                : moment(new Date()).format("YYYY-MM-DD"),
          });
          this.Item1001SetForm.controls[i].patchValue({
            OriContraValue: this.form10List.Item1001Set["results"][i][
              "OriContraValue"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            AmedContraValue: this.form10List.Item1001Set["results"][i][
              "AmedContraValue"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            ContraAftAmed: this.form10List.Item1001Set["results"][i][
              "ContraAftAmed"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            ActualCost: this.form10List.Item1001Set["results"][i]["ActualCost"],
          });
          this.Item1001SetForm.controls[i].patchValue({
            EstimateCost: this.form10List.Item1001Set["results"][i][
              "EstimateCost"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            CpmplePercentage: this.form10List.Item1001Set["results"][i][
              "CpmplePercentage"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            RevenueCompletion: this.form10List.Item1001Set["results"][i][
              "RevenueCompletion"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            PreyrRevenue: this.form10List.Item1001Set["results"][i][
              "PreyrRevenue"
            ],
          });
          this.Item1001SetForm.controls[i].patchValue({
            CuryrRevenue: this.form10List.Item1001Set["results"][i][
              "CuryrRevenue"
            ],
          });
        }
        this.RevenuefromContractscalc();
        this.form10List.RIncomeInsu == "X"
          ? this.Item1002SetFormFG.patchValue({ Schedule: true })
          : this.Item1002SetFormFG.patchValue({ Schedule: true });
        this.clearFormArray(this.Item1002SetForm);
        for (
          let i = 0;
          i < this.form10List.Item1002Set["results"].length;
          i++
        ) {
          this.AddRowItem1002Set();
          this.Item1002SetForm.controls[i].patchValue({
            TotInsuPremium: this.form10List.Item1002Set["results"][i][
              "TotInsuPremium"
            ],
          });
          this.Item1002SetForm.controls[i].patchValue({
            CanInsuPremium: this.form10List.Item1002Set["results"][i][
              "CanInsuPremium"
            ],
          });
          this.Item1002SetForm.controls[i].patchValue({
            ReinsuPremium: this.form10List.Item1002Set["results"][i][
              "ReinsuPremium"
            ],
          });
          this.Item1002SetForm.controls[i].patchValue({
            ReinsuPremiumFore: this.form10List.Item1002Set["results"][i][
              "ReinsuPremiumFore"
            ],
          });
          this.Item1002SetForm.controls[i].patchValue({
            NetPremium: this.form10List.Item1002Set["results"][i]["NetPremium"],
          });
          this.Item1002SetForm.controls[i].patchValue({
            ReinsuFee: this.form10List.Item1002Set["results"][i]["ReinsuFee"],
          });
          this.Item1002SetForm.controls[i].patchValue({
            DiffInstallment: this.form10List.Item1002Set["results"][i][
              "DiffInstallment"
            ],
          });
          this.Item1002SetForm.controls[i].patchValue({
            InvesIncome: this.form10List.Item1002Set["results"][i][
              "InvesIncome"
            ],
          });
          this.Item1002SetForm.controls[i].patchValue({
            OthIncome: this.form10List.Item1002Set["results"][i]["OthIncome"],
          });
          this.Item1002SetForm.controls[i].patchValue({
            TotInsuIncome: this.form10List.Item1002Set["results"][i][
              "TotInsuIncome"
            ],
          });
        }
        this.RevfromInsurActivityCalc();
        this.form10List.RSubcontract == "X"
          ? this.Item1004SetFormFG.patchValue({ Schedule: true })
          : this.Item1004SetFormFG.patchValue({ Schedule: true });
        this.clearFormArray(this.Item1004SetForm);
        for (
          let i = 0;
          i < this.form10List.Item1004Set["results"].length;
          i++
        ) {
          this.AddRowItem1004Set();
          this.Item1004SetForm.controls[i].patchValue({
            FxdVal: this.form10List.Item1004Set["results"][i]["FxdVal"],
          });
          this.Item1004SetForm.controls[i].patchValue({
            IdNo: this.form10List.Item1004Set["results"][i]["IdNo"],
          });
          this.Item1004SetForm.controls[i].patchValue({
            ContraName: this.form10List.Item1004Set["results"][i]["ContraName"],
          });
          this.Item1004SetForm.controls[i].patchValue({
            Country: this.form10List.Item1004Set["results"][i]["Country"],
          });
          this.Item1004SetForm.controls[i].patchValue({
            WorkValue: this.form10List.Item1004Set["results"][i]["WorkValue"],
          });
        }
        this.SubContractorTotalCal();
        this.form10List.ROtherexp == "X"
          ? this.Item1006SetFormFG.patchValue({ Schedule: true })
          : this.Item1006SetFormFG.patchValue({ Schedule: true });
        this.clearFormArray(this.Item1006SetForm);
        for (
          let i = 0;
          i < this.form10List.Item1006Set["results"].length;
          i++
        ) {
          this.AddRowItem1006Set();
          this.Item1006SetForm.controls[i].patchValue({
            Statement: this.form10List.Item1006Set["results"][i]["Statement"],
          });
          this.Item1006SetForm.controls[i].patchValue({
            Amount: this.form10List.Item1006Set["results"][i]["Amount"],
          });
        }
        this.otherExpenses();
        this.form10List.RMachineExp == "X"
          ? this.Item1013SetFormFG.patchValue({ Schedule: true })
          : this.Item1013SetFormFG.patchValue({ Schedule: true });
        this.clearFormArray(this.Item1013SetForm);
        for (
          let i = 0;
          i < this.form10List.Item1013Set["results"].length;
          i++
        ) {
          this.AddRowItem1013Set();
          this.Item1013SetForm.controls[i].patchValue({
            IdTp: this.form10List.Item1013Set["results"][i]["IdTp"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            IdNo: this.form10List.Item1013Set["results"][i]["IdNo"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            BeniName: this.form10List.Item1013Set["results"][i]["BeniName"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            Residancy: this.form10List.Item1013Set["results"][i]["Residancy"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            Country: this.form10List.Item1013Set["results"][i]["Country"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            BegYrBal: this.form10List.Item1013Set["results"][i]["BegYrBal"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            AccCharged: this.form10List.Item1013Set["results"][i]["AccCharged"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            PaidYear: this.form10List.Item1013Set["results"][i]["PaidYear"],
          });
          this.Item1013SetForm.controls[i].patchValue({
            EndYrBal: this.form10List.Item1013Set["results"][i]["EndYrBal"],
          });
        }
        this.machinarycalc();
        this.form10List.RRoyaTechser == "X"
          ? this.Item1019SetFormFG.patchValue({ Schedule: true })
          : this.Item1019SetFormFG.patchValue({ Schedule: true });
        this.clearFormArray(this.Item1019SetForm);
        for (
          let i = 0;
          i < this.form10List.Item1019Set["results"].length;
          i++
        ) {
          this.AddRowItem1019Set();
          this.Item1019SetForm.controls[i].patchValue({
            IdTp: this.form10List.Item1019Set["results"][i]["IdTp"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            IdNo: this.form10List.Item1019Set["results"][i]["IdNo"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            BeniName: this.form10List.Item1019Set["results"][i]["BeniName"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            Residancy: this.form10List.Item1019Set["results"][i]["Residancy"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            Country: this.form10List.Item1019Set["results"][i]["Country"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            SerTyp: this.form10List.Item1019Set["results"][i]["SerTyp"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            BegYrbal: this.form10List.Item1019Set["results"][i]["BegYrbal"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            AccCharged: this.form10List.Item1019Set["results"][i]["AccCharged"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            PaidYr: this.form10List.Item1019Set["results"][i]["PaidYr"],
          });
          this.Item1019SetForm.controls[i].patchValue({
            EndYrbal: this.form10List.Item1019Set["results"][i]["EndYrbal"],
          });
        }
        this.RoyaltiesTechConsultProfCal();
        //purna end
        //saraswthi start
        this.Item1008Set = data["d"]["Item1008Set"]["results"];
        this.I1008SetData = this.form10List.Item1008Set.results;
        this.Item1003Set = data["d"]["Item1003Set"];
        this.I1003SetData = this.form10List.Item1003Set.results;
        this.CalCellTotalNetProfitAdjustment();
        this.form10List.RCarryAdj == "X"
          ? this.taxbaseD1Form.patchValue({ Schedule: true })
          : this.taxbaseD1Form.patchValue({ Schedule: false });
        //if (this.form10List.RCarryAdj == "X") {
        this.clearFormArray(this.TaxBaseD1);
        for (
          let i = 0;
          i < this.form10List.Item1017Set["results"].length;
          i++
        ) {
          this.AddRowD1();
          this.TaxBaseD1.controls[i].patchValue({
            CitCarryLoss: this.form10List.Item1017Set["results"][i][
              "CitCarryLoss"
            ],
          });
          this.TaxBaseD1.controls[i].patchValue({
            AdjDeclProfit: this.form10List.Item1017Set["results"][i][
              "AdjDeclProfit"
            ],
          });
          this.TaxBaseD1.controls[i].patchValue({
            LossDedCyr: this.form10List.Item1017Set["results"][i]["LossDedCyr"],
          });
          this.TaxBaseD1.controls[i].patchValue({
            EndYrbal: this.form10List.Item1017Set["results"][i]["EndYrbal"],
          });
          this.CitCarriedForwardCal(i);
        }
        //}

        this.form10List.RTaxamt == "X"
          ? this.taxbaseD2Form.patchValue({ Schedule: true })
          : this.taxbaseD2Form.patchValue({ Schedule: false });
        //if (this.form10List.RTaxamt == "X") {
        this.clearFormArray(this.TaxBaseD2);
        for (
          let i = 0;
          i < this.form10List.Item1018Set["results"].length;
          i++
        ) {
          this.AddRowD2();
          this.TaxBaseD2.controls[i].patchValue({
            TotInsuPre: this.form10List.Item1018Set["results"][i]["TotInsuPre"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            CanInsuPre: this.form10List.Item1018Set["results"][i]["CanInsuPre"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocReisnuPremi: this.form10List.Item1018Set["results"][i][
              "LocReisnuPremi"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            ExtReisnuPremi: this.form10List.Item1018Set["results"][i][
              "ExtReisnuPremi"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            NetPremEar: this.form10List.Item1018Set["results"][i]["NetPremEar"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            ResCompPyr: this.form10List.Item1018Set["results"][i]["ResCompPyr"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            ResCompExiPyr: this.form10List.Item1018Set["results"][i][
              "ResCompExiPyr"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            TotResePyr: this.form10List.Item1018Set["results"][i]["TotResePyr"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocGeneIns: this.form10List.Item1018Set["results"][i]["LocGeneIns"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GloGeneIns: this.form10List.Item1018Set["results"][i]["GloGeneIns"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GloInveIncome: this.form10List.Item1018Set["results"][i][
              "GloInveIncome"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            NonInvsnuReven: this.form10List.Item1018Set["results"][i][
              "NonInvsnuReven"
            ],
          });

          this.TaxBaseD2.controls[i].patchValue({
            PerOthsnuIncom: this.form10List.Item1018Set["results"][i][
              "PerOthsnuIncom"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            Total1: this.form10List.Item1018Set["results"][i]["Total1"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            ComPaidDanger: this.form10List.Item1018Set["results"][i][
              "ComPaidDanger"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            AmtCovReinsurance: this.form10List.Item1018Set["results"][i][
              "AmtCovReinsurance"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            NetCompaPaid: this.form10List.Item1018Set["results"][i][
              "NetCompaPaid"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            UnprePaidCyr: this.form10List.Item1018Set["results"][i][
              "UnprePaidCyr"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            ExistingRevCyr: this.form10List.Item1018Set["results"][i][
              "ExistingRevCyr"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            NonlegalDed: this.form10List.Item1018Set["results"][i][
              "NonlegalDed"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            PreEstabilisment: this.form10List.Item1018Set["results"][i][
              "PreEstabilisment"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LegalDedPerEst: this.form10List.Item1018Set["results"][i][
              "LegalDedPerEst"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocGenInsPre: this.form10List.Item1018Set["results"][i][
              "LocGenInsPre"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GlobGenInsPre: this.form10List.Item1018Set["results"][i][
              "GlobGenInsPre"
            ],
          });

          this.TaxBaseD2.controls[i].patchValue({
            GenAdminExp: this.form10List.Item1018Set["results"][i][
              "GenAdminExp"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            PreEstShareMain: this.form10List.Item1018Set["results"][i][
              "PreEstShareMain"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            Total2: this.form10List.Item1018Set["results"][i]["Total2"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            Total1Total2: this.form10List.Item1018Set["results"][i][
              "Total1Total2"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocGenInsPreWri: this.form10List.Item1018Set["results"][i][
              "LocGenInsPreWri"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GlobGenInsPreWri: this.form10List.Item1018Set["results"][i][
              "GlobGenInsPreWri"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GlobNetProfitTax: this.form10List.Item1018Set["results"][i][
              "GlobNetProfitTax"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            TaxBase: this.form10List.Item1018Set["results"][i]["TaxBase"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            TaxableInsuActivity: this.form10List.Item1018Set["results"][i][
              "TaxableInsuActivity"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocSavPerWriteu: this.form10List.Item1018Set["results"][i][
              "LocSavPerWriteu"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            SavingGlobalInsuu: this.form10List.Item1018Set["results"][i][
              "SavingGlobalInsuu"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GlobalInvestIncome: this.form10List.Item1018Set["results"][i][
              "GlobalInvestIncome"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            PerEstableshIncome: this.form10List.Item1018Set["results"][i][
              "PerEstableshIncome"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocSavPerWrite: this.form10List.Item1018Set["results"][i][
              "LocSavPerWrite"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            SavingGlobalInsu: this.form10List.Item1018Set["results"][i][
              "SavingGlobalInsu"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GenAdminMainCenter: this.form10List.Item1018Set["results"][i][
              "GenAdminMainCenter"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            PerEstableshMainCen: this.form10List.Item1018Set["results"][i][
              "PerEstableshMainCen"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            LocSavPerWritet: this.form10List.Item1018Set["results"][i][
              "LocSavPerWritet"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            SavingGlobalInsuv: this.form10List.Item1018Set["results"][i][
              "SavingGlobalInsuv"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            GenAdminMainCenterv: this.form10List.Item1018Set["results"][i][
              "GenAdminMainCenterv"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            PerEstableshMainCenv: this.form10List.Item1018Set["results"][i][
              "PerEstableshMainCenv"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            TotalTaxPerEsta: this.form10List.Item1018Set["results"][i][
              "TotalTaxPerEsta"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            RevenuLoan: this.form10List.Item1018Set["results"][i]["RevenuLoan"],
          });
          this.TaxBaseD2.controls[i].patchValue({
            RealizedGains: this.form10List.Item1018Set["results"][i][
              "RealizedGains"
            ],
          });
          this.TaxBaseD2.controls[i].patchValue({
            TaxbasedActivity: this.form10List.Item1018Set["results"][i][
              "TaxbasedActivity"
            ],
          });
          //this.TaxBaseD2.controls[i].patchValue({ "PerEstaTax": this.form10List.Item1018Set["results"][i]["PerEstaTax"] });
          this.ReinsuranceCal(i);
        }
        //}
        //saraswthi end
        //venkat start
        this.form10List.RIncomeInsu == "X"
          ? (this.IncomeInsuChange = true)
          : (this.IncomeInsuChange = false);
        //this.form10List.RIncomeContract == "X" ? this.IncomeContractorsChange = true : this.IncomeContractorsChange = false;
        this.form10List.RSubcontract == "X"
          ? (this.SubContractorsChange = true)
          : (this.SubContractorsChange = false);
        this.form10List.RMachineExp == "X"
          ? (this.MacEquiChange = true)
          : (this.MacEquiChange = false);
        this.form10List.RRoyaTechser == "X"
          ? (this.RoyaTechSerChange = true)
          : (this.RoyaTechSerChange = false);
        this.form10List.ROtherexp == "X"
          ? (this.OtherExpChange = true)
          : (this.OtherExpChange = false);
        this.Item1001Set = data["d"]["Item1001Set"]["results"];
        for (let i = 0; i < this.Item1001Set.length; i++) {
          this.Item1001Set[i].ContractDt = moment(
            new Date(
              +this.Item1001Set[i].ContractDt.replace(")", "")
                .toString()
                .replace("/Date(", "")
                .toString()
                .replace("/", "")
            )
          ).format("YYYY-MM-DD");
        }
        this.Item1002Set = data["d"]["Item1002Set"]["results"][0];
        this.Item1004Set = data["d"]["Item1004Set"]["results"];
        this.Item1013Set = data["d"]["Item1013Set"]["results"];
        this.Item1005Set = data["d"]["Item1005Set"]["results"];
        this.Item1019Set = data["d"]["Item1019Set"]["results"];
        this.Item1006Set = data["d"]["Item1006Set"]["results"];
        if (this.form10List.ROthergainloss == "X") {
          this.ROthergainloss = true;
        } else {
          this.ROthergainloss = false;
        }
        this.RevenuefromContractscalc();
        this.SubContractorTotalCal();
        this.calccogs();
        this.isioa();
        this.machinarycalc();
        this.RoyaltiesTechConsultProfCal();
        this.otherExpenses();
        //venkat end
        //phani start
        this.form10List.RProvision == "X"
          ? this.ProvisionsForm.patchValue({ Schedule: true })
          : this.ProvisionsForm.patchValue({ Schedule: false });
        //if (this.form10List.RProvision == "X") {
        this.clearFormArray(this.Provisions);
        for (
          let i = 0;
          i < this.form10List.Item1005Set["results"].length;
          i++
        ) {
          this.addProvisionsForm();
          this.form10List.Item1005Set["results"][i]["LineNo"] = i + 1;
          this.Provisions.controls[i].patchValue({
            Name: this.form10List.Item1005Set["results"][i]["Name"],
            ProBalSperiod: this.form10List.Item1005Set["results"][i][
              "ProBalSperiod"
            ],
            ProBalPeriod: this.form10List.Item1005Set["results"][i][
              "ProBalPeriod"
            ],
            ProBalUtili: this.form10List.Item1005Set["results"][i][
              "ProBalUtili"
            ],
            Adjacement: this.form10List.Item1005Set["results"][i]["Adjacement"],
            ProBalEperiod: this.form10List.Item1005Set["results"][i][
              "ProBalEperiod"
            ],
          });
        }
        this.calProvisions();
        //}
        this.form10List.RLoanchagres == "X"
          ? this.LoanChargesForm.patchValue({ Schedule: true })
          : this.LoanChargesForm.patchValue({ Schedule: false });
        //if (this.form10List.RLoanchagres == "X") {
        if (this.LoanCharges.length == 0) {
          this.LoanCharges.push(this.LoanChargesGroup());
        }
        this.LoanCharges.controls[0].patchValue({
          TotLoanInt: this.form10List.Item1007Set["results"][0]["TotLoanInt"],
          TotLoanCharg: this.form10List.Item1007Set["results"][0][
            "TotLoanCharg"
          ],
          DedLoancharg: this.form10List.Item1007Set["results"][0][
            "DedLoancharg"
          ],
          NondedLoancharg: this.form10List.Item1007Set["results"][0][
            "NondedLoancharg"
          ],
        });
        this.calLoanCharges();
        //}

        this.form10List.RAdjnetprofit == "X"
          ? (this.NetProfitIsAppilicable = true)
          : (this.NetProfitIsAppilicable = false);
        //if (this.form10List.RAdjnetprofit == "X") {
        this.Item1008Set = this.form10List.Item1008Set["results"];
        //}

        this.form10List.RDepriciation == "X"
          ? (this.RepairThresholdIsAppilicable = true)
          : (this.RepairThresholdIsAppilicable = false);

        //phani end
      });
  }
  //saraswathi start
  get TaxBaseD1(): FormArray {
    return this.taxbaseD1Form.get("TaxBaseD1") as FormArray;
  }
  get TaxBaseD2(): FormArray {
    return this.taxbaseD2Form.get("TaxBaseD2") as FormArray;
  }
  //saraswathi end
  //purna start
  get ShareholdersSet(): FormArray {
    return this.ShareHoldersDetailsForm.get("ShareholdersSet") as FormArray;
  }
  get RelatedPartiesSet(): FormArray {
    return this.RelatedPartiesYesForm.get("RelatedPartiesSet") as FormArray;
  }
  get PartyTransactionsSet(): FormArray {
    return this.TransactionDetailsForm.get("PartyTransactionsSet") as FormArray;
  }
  get ZCD1(): FormArray {
    return this.zcD1Form.get("ZCD1") as FormArray;
  }
  get ZCD2(): FormArray {
    return this.zcD2Form.get("ZCD2") as FormArray;
  }
  get ZCD3(): FormArray {
    return this.zcD3Form.get("ZCD3") as FormArray;
  }
  get Item1001SetForm(): FormArray {
    return this.Item1001SetFormFG.get("Item1001SetForm") as FormArray;
  }
  get Item1002SetForm(): FormArray {
    return this.Item1002SetFormFG.get("Item1002SetForm") as FormArray;
  }
  get Item1006SetForm(): FormArray {
    return this.Item1006SetFormFG.get("Item1006SetForm") as FormArray;
  }
  get Item1004SetForm(): FormArray {
    return this.Item1004SetFormFG.get("Item1004SetForm") as FormArray;
  }
  get Item1013SetForm(): FormArray {
    return this.Item1013SetFormFG.get("Item1013SetForm") as FormArray;
  }
  get Item1019SetForm(): FormArray {
    return this.Item1019SetFormFG.get("Item1019SetForm") as FormArray;
  }
  get ZCD4(): FormArray {
    return this.zcD4Form.get("ZCD4") as FormArray;
  }
  get ZCA3(): FormArray {
    return this.zcA3Form.get("ZCA3") as FormArray;
  }
  get ZCA2(): FormArray {
    return this.zcA2Form.get("ZCA2") as FormArray;
  }
  //purna end
  GetServiceDetails() {
    return this.returnsService
      .getServiceForm10Details(this.Gpart, this.Fbnum)
      .subscribe((data) => {
        this.ServiceDetails = data["d"] || [];
        this.AmendTypeDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1008" && x.FieldNm == "AMEND_TYP");
        this.InvestmentTypeDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1011" && x.FieldNm == "INV_TYPE");
        this.LAEDropDownlist = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1012" && x.FieldNm == "LOCAL_FORE");
        this.RoyaltiesTechDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1019" && x.FieldNm == "ID_TP");
        this.ResidencyDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1019" && x.FieldNm == "RESIDANCY");
        this.ServiceDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1019" && x.FieldNm == "SER_TYP");
        this.CountryDropDownList = this.ServiceDetails["CountrySet"]["results"];
        this.ContractsDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1001" && x.FieldNm == "ID_TP");
        this.SubContractsDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1004" && x.FieldNm == "ID_TP");
        this.MachinaryDropDownList = this.ServiceDetails["DropdownSet"][
          "results"
        ].filter((x) => x.FormNoNm == "ZDGD_1013" && x.FieldNm == "ID_TP");
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
      });
  }
  IncomefromInsurance(event) {
    if (event.currentTarget.checked == true) {
      this.IncomeInsuChange = true;
      jQuery("#incomeInsurance").modal("show");
      if (this.Item1002SetForm.controls.length == 0) {
        this.AddRowItem1002Set();
      }
      this.Item1002SetFormFG.patchValue({ Schedule: true });
    } else {
      this.form10List.RIncomeInsu = "";
      this.form10List.IncomeInsu = "0.00";
      this.Item1002SetFormFG.patchValue({ Schedule: false });
      jQuery("#incomeInsurance").modal("hide");
      this.clearFormArray(this.Item1002SetForm);
      this.AddRowItem1002Set();
      this.RevfromInsurActivityCalc();
    }
  }
  ResetItem1001Set() {
    this.form10List.RIncomeContract == "X"
      ? this.Item1001SetFormFG.patchValue({ Schedule: true })
      : this.Item1001SetFormFG.patchValue({ Schedule: false });
    //if (this.form10List.RInvsetlocal == "X") {
    this.clearFormArray(this.Item1001SetForm);
    for (let i = 0; i < this.form10List.Item1001Set["results"].length; i++) {
      this.AddRowItem1001Set();
      this.Item1001SetForm.controls[i].patchValue({
        IdTp: this.form10List.Item1001Set["results"][i]["IdTp"],
      });
      this.Item1001SetForm.controls[i].patchValue({
        IdNo: this.form10List.Item1001Set["results"][i]["IdNo"],
      });
      this.Item1001SetForm.controls[i].patchValue({
        ContraPatry: this.form10List.Item1001Set["results"][i]["ContraPatry"],
      });
      this.Item1001SetForm.controls[i].patchValue({
        ContractDt:
          this.form10List.Item1001Set["results"][i]["ContractDt"] != null
            ? moment(
                new Date(
                  +this.form10List.Item1001Set["results"][i]["ContractDt"]
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"),
      });
      this.Item1001SetForm.controls[i].patchValue({
        OriContraValue: this.form10List.Item1001Set["results"][i][
          "OriContraValue"
        ],
      });
      this.Item1001SetForm.controls[i].patchValue({
        AmedContraValue: this.form10List.Item1001Set["results"][i][
          "AmedContraValue"
        ],
      });
      this.Item1001SetForm.controls[i].patchValue({
        ContraAftAmed: this.form10List.Item1001Set["results"][i][
          "ContraAftAmed"
        ],
      });
      this.Item1001SetForm.controls[i].patchValue({
        ActualCost: this.form10List.Item1001Set["results"][i]["ActualCost"],
      });
      this.Item1001SetForm.controls[i].patchValue({
        EstimateCost: this.form10List.Item1001Set["results"][i]["EstimateCost"],
      });
      this.Item1001SetForm.controls[i].patchValue({
        CpmplePercentage: this.form10List.Item1001Set["results"][i][
          "CpmplePercentage"
        ],
      });
      this.Item1001SetForm.controls[i].patchValue({
        RevenueCompletion: this.form10List.Item1001Set["results"][i][
          "RevenueCompletion"
        ],
      });
      this.Item1001SetForm.controls[i].patchValue({
        PreyrRevenue: this.form10List.Item1001Set["results"][i]["PreyrRevenue"],
      });
      this.Item1001SetForm.controls[i].patchValue({
        CuryrRevenue: this.form10List.Item1001Set["results"][i]["CuryrRevenue"],
      });
      this.RevenuefromContractscalc();
    }
    this.clsePopup();
  }
  ResetItem1002Set() {
    this.form10List.RIncomeInsu == "X"
      ? this.Item1002SetFormFG.patchValue({ Schedule: true })
      : this.Item1002SetFormFG.patchValue({ Schedule: true });

    //if (this.form10List.RInvsetlocal == "X") {
    this.clearFormArray(this.Item1002SetForm);
    for (let i = 0; i < this.form10List.Item1002Set["results"].length; i++) {
      this.AddRowItem1002Set();
      this.Item1002SetForm.controls[i].patchValue({
        TotInsuPremium: this.form10List.Item1002Set["results"][i][
          "TotInsuPremium"
        ],
      });
      this.Item1002SetForm.controls[i].patchValue({
        CanInsuPremium: this.form10List.Item1002Set["results"][i][
          "CanInsuPremium"
        ],
      });
      this.Item1002SetForm.controls[i].patchValue({
        ReinsuPremium: this.form10List.Item1002Set["results"][i][
          "ReinsuPremium"
        ],
      });
      this.Item1002SetForm.controls[i].patchValue({
        ReinsuPremiumFore: this.form10List.Item1002Set["results"][i][
          "ReinsuPremiumFore"
        ],
      });
      this.Item1002SetForm.controls[i].patchValue({
        NetPremium: this.form10List.Item1002Set["results"][i]["NetPremium"],
      });
      this.Item1002SetForm.controls[i].patchValue({
        ReinsuFee: this.form10List.Item1002Set["results"][i]["ReinsuFee"],
      });
      this.Item1002SetForm.controls[i].patchValue({
        DiffInstallment: this.form10List.Item1002Set["results"][i][
          "DiffInstallment"
        ],
      });
      this.Item1002SetForm.controls[i].patchValue({
        InvesIncome: this.form10List.Item1002Set["results"][i]["InvesIncome"],
      });
      this.Item1002SetForm.controls[i].patchValue({
        OthIncome: this.form10List.Item1002Set["results"][i]["OthIncome"],
      });
      this.Item1002SetForm.controls[i].patchValue({
        TotInsuIncome: this.form10List.Item1002Set["results"][i][
          "TotInsuIncome"
        ],
      });
      this.RevfromInsurActivityCalc();
    }
    this.isioa();
    this.clsePopup();
  }
  ResetItem1004Set() {
    this.form10List.RSubcontract == "X"
      ? this.Item1004SetFormFG.patchValue({ Schedule: true })
      : this.Item1004SetFormFG.patchValue({ Schedule: true });
    this.clearFormArray(this.Item1004SetForm);
    for (let i = 0; i < this.form10List.Item1004Set["results"].length; i++) {
      this.AddRowItem1004Set();
      this.Item1004SetForm.controls[i].patchValue({
        FxdVal: this.form10List.Item1004Set["results"][i]["FxdVal"],
      });
      this.Item1004SetForm.controls[i].patchValue({
        IdNo: this.form10List.Item1004Set["results"][i]["IdNo"],
      });
      this.Item1004SetForm.controls[i].patchValue({
        ContraName: this.form10List.Item1004Set["results"][i]["ContraName"],
      });
      this.Item1004SetForm.controls[i].patchValue({
        Country: this.form10List.Item1004Set["results"][i]["Country"],
      });
      this.Item1004SetForm.controls[i].patchValue({
        WorkValue: this.form10List.Item1004Set["results"][i]["WorkValue"],
      });
      this.SubContractorTotalCal();
    }
    this.clsePopup();
  }
  ResetItem1006Set() {
    this.form10List.ROtherexp == "X"
      ? this.Item1006SetFormFG.patchValue({ Schedule: true })
      : this.Item1006SetFormFG.patchValue({ Schedule: true });
    this.clearFormArray(this.Item1006SetForm);
    for (let i = 0; i < this.form10List.Item1006Set["results"].length; i++) {
      this.AddRowItem1006Set();
      this.Item1006SetForm.controls[i].patchValue({
        Statement: this.form10List.Item1006Set["results"][i]["Statement"],
      });
      this.Item1006SetForm.controls[i].patchValue({
        Amount: this.form10List.Item1006Set["results"][i]["Amount"],
      });
    }
    this.otherExpenses();
    this.clsePopup();
  }
  ResetItem1013Set() {
    this.form10List.RMachineExp == "X"
      ? this.Item1013SetFormFG.patchValue({ Schedule: true })
      : this.Item1013SetFormFG.patchValue({ Schedule: true });
    this.clearFormArray(this.Item1013SetForm);
    for (let i = 0; i < this.form10List.Item1013Set["results"].length; i++) {
      this.AddRowItem1013Set();
      this.Item1013SetForm.controls[i].patchValue({
        IdTp: this.form10List.Item1013Set["results"][i]["IdTp"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        IdNo: this.form10List.Item1013Set["results"][i]["IdNo"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        BeniName: this.form10List.Item1013Set["results"][i]["BeniName"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        Residancy: this.form10List.Item1013Set["results"][i]["Residancy"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        Country: this.form10List.Item1013Set["results"][i]["Country"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        BegYrBal: this.form10List.Item1013Set["results"][i]["BegYrBal"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        AccCharged: this.form10List.Item1013Set["results"][i]["AccCharged"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        PaidYear: this.form10List.Item1013Set["results"][i]["PaidYear"],
      });
      this.Item1013SetForm.controls[i].patchValue({
        EndYrBal: this.form10List.Item1013Set["results"][i]["EndYrBal"],
      });
    }
    this.machinarycalc();
    this.clsePopup();
  }
  ResetItem1019Set() {
    this.form10List.RRoyaTechser == "X"
      ? this.Item1019SetFormFG.patchValue({ Schedule: true })
      : this.Item1019SetFormFG.patchValue({ Schedule: true });
    this.clearFormArray(this.Item1019SetForm);
    for (let i = 0; i < this.form10List.Item1019Set["results"].length; i++) {
      this.AddRowItem1019Set();
      this.Item1019SetForm.controls[i].patchValue({
        IdTp: this.form10List.Item1019Set["results"][i]["IdTp"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        IdNo: this.form10List.Item1019Set["results"][i]["IdNo"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        BeniName: this.form10List.Item1019Set["results"][i]["BeniName"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        Residancy: this.form10List.Item1019Set["results"][i]["Residancy"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        Country: this.form10List.Item1019Set["results"][i]["Country"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        SerTyp: this.form10List.Item1019Set["results"][i]["SerTyp"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        BegYrbal: this.form10List.Item1019Set["results"][i]["BegYrbal"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        AccCharged: this.form10List.Item1019Set["results"][i]["AccCharged"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        PaidYr: this.form10List.Item1019Set["results"][i]["PaidYr"],
      });
      this.Item1019SetForm.controls[i].patchValue({
        EndYrbal: this.form10List.Item1019Set["results"][i]["EndYrbal"],
      });
    }
    this.RoyaltiesTechConsultProfCal();
    this.clsePopup();
  }
  IncomefromContracts(event) {
    if (event.currentTarget.checked == true) {
      this.IncomeContractorsChange = true;
      this.Item1001SetFormFG.patchValue({ Schedule: true });
      jQuery("#contractsModal").modal("show");
      if (this.Item1001SetForm.controls.length == 0) {
        this.AddRowItem1001Set();
      }
    } else {
      this.Item1001SetFormFG.patchValue({ Schedule: false });
      this.form10List.RIncomeContract = "";
      jQuery("#contractsModal").modal("hide");
      this.clearFormArray(this.Item1001SetForm);
      this.AddRowItem1001Set();
      this.RevenuefromContractscalc();
      this.form10List.IncomeContract = "0.00";
    }
    if (this.ServiceDetails != undefined) {
      this.ContractsDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1001" && x.FieldNm == "ID_TP");
    }
  }
  RoyaltiesTechConsultProf(event) {
    if (event.currentTarget.checked == true) {
      this.RoyaTechSerChange = true;
      jQuery("#royaltiModal").modal("show");
      this.Item1019SetFormFG.patchValue({ Schedule: true });
      if (this.Item1019SetForm.controls.length == 0) {
        this.AddRowItem1019Set();
      }
    } else {
      this.form10List.RRoyaTechser = "";
      this.Item1019SetFormFG.patchValue({ Schedule: false });
      this.clearFormArray(this.Item1019SetForm);
      this.AddRowItem1019Set();
      this.RoyaltiesTechConsultProfAdd();
      this.RoyaltiesTechConsultProfCal();
      this.isioa();
      this.form10List.ExpRoyalti = "0.00";
      jQuery("#royaltiModal").modal("hide");
    }
    if (this.ServiceDetails != undefined) {
      this.RoyaltiesTechDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1019" && x.FieldNm == "ID_TP");
      this.ResidencyDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1019" && x.FieldNm == "RESIDANCY");
      this.ServiceDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1019" && x.FieldNm == "SER_TYP");
      this.CountryDropDownList = this.ServiceDetails["CountrySet"]["results"];
    }
  }
  //purna start
  ZCLATE(event) {
    if (event.currentTarget.checked == true) {
      this.zcA2Form.patchValue({ Schedule: true });
      this.LAEDropDownlist = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1012" && x.FieldNm == "LOCAL_FORE");
      jQuery("#zcloanequialent").modal("show");
    } else {
      this.zcA2Form.patchValue({ Schedule: false });
      jQuery("#zcloanequialent").modal("hide");
      this.clearFormArray(this.ZCA2);
      this.AddRowZCA2();
      this.CalcZCA2(0);
      this.form10List.RLoanEqui = "";
      this.form10List.ZaddlonAmt = "0.00";
      this.calcoverZC();
      this.TotalDed = "0.00";
    }
  }
  ZCOA(event) {
    if (event.currentTarget.checked == true) {
      this.zcA3Form.patchValue({ Schedule: true });
      jQuery("#ZCotheraddiation").modal("show");
    } else {
      jQuery("#ZCotheraddiation").modal("hide");
      this.zcA3Form.patchValue({ Schedule: false });
      this.form10List.ROthadd = "";
      this.clearFormArray(this.ZCA3);
      this.AddRowZCA3();
      this.calCellTotalOA();
      this.calcoverZC();
    }
  }
  ZCOZD(event) {
    if (event.currentTarget.checked == true) {
      this.zcD4Form.patchValue({ Schedule: true });
      jQuery("#otherZakatDeduction").modal("show");
    } else {
      jQuery("#otherZakatDeduction").modal("hide");
      this.zcD4Form.patchValue({ Schedule: false });
      this.form10List.ROthded = "";
      this.clearFormArray(this.ZCD4);
      this.AddRowZCD4();
      this.calCellTotalOD();
      this.CalculateTotalZCDeduction();
    }
  }
  ZCPAPD(event) {
    if (event.currentTarget.checked == true) {
      this.zcD3Form.patchValue({ Schedule: true });
      jQuery("#zcproperties").modal("show");
    } else {
      jQuery("#zcproperties").modal("hide");
      this.zcD3Form.patchValue({ Schedule: false });
      this.form10List.RProperty = "";
      this.clearFormArray(this.ZCD3);
      this.AddRowZCD3();
      this.CalcZCA2(0);
      this.CalculateTotalZCDeduction();
      this.totalZDSell = "0.00";
      this.form10List.ZdedsellAmt = "0.00";
    }
  }
  ZCACFL(event) {
    if (event.currentTarget.checked == true) {
      this.zcD2Form.patchValue({ Schedule: true });
      this.ZCD2.controls[0].patchValue({
        NetProfit: this.form10List.ZakprofitadAmt,
      });
      jQuery("#ZCforwardloss").modal("show");
    } else {
      jQuery("#ZCforwardloss").modal("hide");
      this.zcD2Form.patchValue({ Schedule: false });
      this.form10List.RAdjcarry = "";
      this.clearFormArray(this.ZCD2);
      this.AddRowZCD2();
      this.CalculateZCACFL();
      this.CalculateTotalZCDeduction();
      this.form10List.ZdedlossAmt = "0.00";
    }
  }
  ZCDILTI(event) {
    if (event.currentTarget.checked == true) {
      this.zcD1Form.patchValue({ Schedule: true });
      this.InvestmentTypeDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1011" && x.FieldNm == "INV_TYPE");
      jQuery("#zcdeducation").modal("show");
    } else {
      jQuery("#zcdeducation").modal("hide");
      this.zcD1Form.patchValue({ Schedule: false });
      this.form10List.RInvsetlocal = "";
      this.clearFormArray(this.ZCD1);
      this.AddRowZCD1();
      this.CalZCIIL();
      this.CalculateTotalZCDeduction();
    }
  }
  calcoverZC() {
    if (
      this.form10List.ZaddcapAmt == "" ||
      this.form10List.ZaddcapAmt == undefined
    ) {
      this.form10List.ZaddcapAmt = "0.00";
    } else {
      this.form10List.ZaddcapAmt = (+this.form10List.ZaddcapAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddretAmt == "" ||
      this.form10List.ZaddretAmt == undefined
    ) {
      this.form10List.ZaddretAmt = "0.00";
    } else {
      this.form10List.ZaddretAmt = (+this.form10List.ZaddretAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddprlossAmt == "" ||
      this.form10List.ZaddprlossAmt == undefined
    ) {
      this.form10List.ZaddprlossAmt = "0.00";
    } else {
      this.form10List.ZaddprlossAmt = (+this.form10List.ZaddprlossAmt).toFixed(
        2
      );
    }
    if (
      this.form10List.ZaddproAmt == "" ||
      this.form10List.ZaddproAmt == undefined
    ) {
      this.form10List.ZaddproAmt = "0.00";
    } else {
      this.form10List.ZaddproAmt = (+this.form10List.ZaddproAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddrevsAmt == "" ||
      this.form10List.ZaddrevsAmt == undefined
    ) {
      this.form10List.ZaddrevsAmt = "0.00";
    } else {
      this.form10List.ZaddrevsAmt = (+this.form10List.ZaddrevsAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddlonAmt == "" ||
      this.form10List.ZaddlonAmt == undefined
    ) {
      this.form10List.ZaddlonAmt = "0.00";
    } else {
      this.form10List.ZaddlonAmt = (+this.form10List.ZaddlonAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddfairAmt == "" ||
      this.form10List.ZaddfairAmt == undefined
    ) {
      this.form10List.ZaddfairAmt = "0.00";
    } else {
      this.form10List.ZaddfairAmt = (+this.form10List.ZaddfairAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddothitemAmt == "" ||
      this.form10List.ZaddothitemAmt == undefined
    ) {
      this.form10List.ZaddothitemAmt = "0.00";
    } else {
      this.form10List.ZaddothitemAmt = (+this.form10List
        .ZaddothitemAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddotoAmt == "" ||
      this.form10List.ZaddotoAmt == undefined
    ) {
      this.form10List.ZaddotoAmt = "0.00";
    } else {
      this.form10List.ZaddotoAmt = (+this.form10List.ZaddotoAmt).toFixed(2);
    }
    let totalcOA =
      parseFloat(this.form10List.ZaddcapAmt) +
      parseFloat(this.form10List.ZaddretAmt) +
      parseFloat(this.form10List.ZaddprlossAmt) +
      parseFloat(this.form10List.ZaddproAmt) +
      parseFloat(this.form10List.ZaddrevsAmt) +
      parseFloat(this.form10List.ZaddlonAmt) +
      parseFloat(this.form10List.ZaddfairAmt) +
      parseFloat(this.form10List.ZaddothitemAmt) +
      parseFloat(this.form10List.ZaddotoAmt);
    this.form10List.ZaddtooAmt = totalcOA.toFixed(2).toString();
    //this.SaveForm();
  }
  //Purna end
  //saraswathi start
  AddnewLineNetProfitAdjustment() {
    this.Item1008SetAdd = {
      AmendName: "OTHER",
      AmendTyp: "",
      Amount: "0.00",
      DataVersion: "00000",
      Description: "",
      FormGuid: "",
      LineNo: 1,
      LinoNo: "000000",
      Mandt: "",
      RankingOrder: "00",
      ReturnId: "",
      TaxShare: "0.00",
      TimestampCh: null,
      TimestampCr: null,
      Waers: "",
      ZakatShare: "0.00",
      __metadata: null,
    };
    this.Item1008SetAdd.LineNo = this.Item1008Set.length + 1;
    this.Item1008Set.push(this.Item1008SetAdd);
  }
  delLineOthers(i) {
    this.Item1008Set.pop(i);
    this.CalCellTotalNetProfitAdjustment();
  }
  AdjustmentNetProfit(event) {
    if (event.currentTarget.checked == true) {
      this.NetProfitIsAppilicable = true;
      jQuery("#adjustprofit1").modal("show");
    } else {
      this.form10List.RAdjnetprofit = "";
      this.NetProfitIsAppilicable = false;
      for (let i = 0; i < this.Item1008Set.length; i++) {
        this.Item1008Set[i].Amount = "0.00";
        this.Item1008Set[i].ZakatShare = "0.00";
        this.Item1008Set[i].TaxShare = "0.00";
        if (this.Item1008Set[i].AmendName == "OTHER") {
          this.delLineOthers(i);
        }
      }
      this.CalCellTotalNetProfitAdjustment();
      this.calAdjustments();
    }
    this.form10List.AdjprofitAmt = "0.00";
    jQuery("#adjustprofit1").modal("hide");
  }
  declarification(event) {
    if (event.currentTarget.checked == true) {
      jQuery("#declarification1").modal("show");
    } else {
      jQuery("#declarification1").modal("hide");
      this.form10List.RDepriciation = "";
      this.form10List.DepdiffAmt = this.form10List.ExpBookdep;
      this.Item1003Set.AGrpvalEod = "0.00";
      this.Item1003Set.BGrpvalEod = "0.00";
      this.Item1003Set.CGrpvalEod = "0.00";
      this.Item1003Set.DGrpvalEod = "0.00";
      this.Item1003Set.EGrpvalEod = "0.00";
      this.Item1003Set.FGrpvalEod = "0.00";
      this.Item1003Set.TotGrpvalEod = "0.00";
      this.Item1003Set.ACostPyrAddition = "0.00";
      this.Item1003Set.BCostPyrAddition = "0.00";
      this.Item1003Set.CCostPyrAddition = "0.00";
      this.Item1003Set.DCostPyrAddition = "0.00";
      this.Item1003Set.ECostPyrAddition = "0.00";
      this.Item1003Set.FCostPyrAddition = "0.00";
      this.Item1003Set.TotCostPyrAddition = "0.00";
      this.Item1003Set.ACostCyrAddition = "0.00";
      this.Item1003Set.BCostCyrAddition = "0.00";
      this.Item1003Set.CCostCyrAddition = "0.00";
      this.Item1003Set.DCostCyrAddition = "0.00";
      this.Item1003Set.ECostCyrAddition = "0.00";
      this.Item1003Set.FCostCyrAddition = "0.00";
      this.Item1003Set.TotCostCyrAddition = "0.00";
      this.Item1003Set.ATotCost50Pcyr = "0.00";
      this.Item1003Set.BTotCost50Pcyr = "0.00";
      this.Item1003Set.CTotCost50Pcyr = "0.00";
      this.Item1003Set.DTotCost50Pcyr = "0.00";
      this.Item1003Set.ETotCost50Pcyr = "0.00";
      this.Item1003Set.FTotCost50Pcyr = "0.00";
      this.Item1003Set.TotCost50Pcyr = "0.00";
      this.Item1003Set.AComesAssetPyr = "0.00";
      this.Item1003Set.BComesAssetPyr = "0.00";
      this.Item1003Set.CComesAssetPyr = "0.00";
      this.Item1003Set.DComesAssetPyr = "0.00";
      this.Item1003Set.EComesAssetPyr = "0.00";
      this.Item1003Set.FComesAssetPyr = "0.00";
      this.Item1003Set.TotComesAssetPyr = "0.00";
      this.Item1003Set.AComesAssetCyr = "0.00";
      this.Item1003Set.BComesAssetCyr = "0.00";
      this.Item1003Set.CComesAssetCyr = "0.00";
      this.Item1003Set.DComesAssetCyr = "0.00";
      this.Item1003Set.EComesAssetCyr = "0.00";
      this.Item1003Set.FComesAssetCyr = "0.00";
      this.Item1003Set.TotComesAssetCyr = "0.00";
      this.Item1003Set.ATotCost50AssetPcyr = "0.00";
      this.Item1003Set.BTotCost50AssetPcyr = "0.00";
      this.Item1003Set.CTotCost50AssetPcyr = "0.00";
      this.Item1003Set.DTotCost50AssetPcyr = "0.00";
      this.Item1003Set.ETotCost50AssetPcyr = "0.00";
      this.Item1003Set.FTotCost50AssetPcyr = "0.00";
      this.Item1003Set.TotTotCost50AssetPcyr = "0.00";
      this.Item1003Set.AGrpRem = "0.00";
      this.Item1003Set.BGrpRem = "0.00";
      this.Item1003Set.CGrpRem = "0.00";
      this.Item1003Set.DGrpRem = "0.00";
      this.Item1003Set.EGrpRem = "0.00";
      this.Item1003Set.FGrpRem = "0.00";
      this.Item1003Set.TotGrpRem = "0.00";
      this.Item1003Set.ADepAmotValue = "0.00";
      this.Item1003Set.BDepAmotValue = "0.00";
      this.Item1003Set.CDepAmotValue = "0.00";
      this.Item1003Set.DDepAmotValue = "0.00";
      this.Item1003Set.EDepAmotValue = "0.00";
      this.Item1003Set.FDepAmotValue = "0.00";
      this.Item1003Set.TotDepAmotValue = "0.00";
      this.Item1003Set.ARemValueCyr = "0.00";
      this.Item1003Set.BRemValueCyr = "0.00";
      this.Item1003Set.CRemValueCyr = "0.00";
      this.Item1003Set.DRemValueCyr = "0.00";
      this.Item1003Set.ERemValueCyr = "0.00";
      this.Item1003Set.FRemValueCyr = "0.00";
      this.Item1003Set.TotRemValueCyr = "0.00";
      this.Item1003Set.AGrpMaintCost = "0.00";
      this.Item1003Set.BGrpMaintCost = "0.00";
      this.Item1003Set.CGrpMaintCost = "0.00";
      this.Item1003Set.DGrpMaintCost = "0.00";
      this.Item1003Set.EGrpMaintCost = "0.00";
      this.Item1003Set.FGrpMaintCost = "0.00";
      this.Item1003Set.TotGrpMaintCost = "0.00";
      this.Item1003Set.AMaint4exp = "0.00";
      this.Item1003Set.BMaint4exp = "0.00";
      this.Item1003Set.CMaint4exp = "0.00";
      this.Item1003Set.DMaint4exp = "0.00";
      this.Item1003Set.EMaint4exp = "0.00";
      this.Item1003Set.FMaint4exp = "0.00";
      this.Item1003Set.TotMaint4exp = "0.00";
      this.Item1003Set.AGrpCyr = "0.00";
      this.Item1003Set.BGrpCyr = "0.00";
      this.Item1003Set.CGrpCyr = "0.00";
      this.Item1003Set.DGrpCyr = "0.00";
      this.Item1003Set.EGrpCyr = "0.00";
      this.Item1003Set.FGrpCyr = "0.00";
      this.Item1003Set.TotGrpCyr = "0.00";
      this.form10List.RepmainAmt = "0.00";
      this.DepreciationCalAdjust();
      this.calAdjustments();
      this.form10List.RepmainAmt = (+this.Item1003Set.TotMaint4exp).toFixed(2);
      this.form10List.DepdiffAmt = (
        +this.form10List.ExpBookdep - +this.Item1003Set.TotDepAmotValue
      ).toFixed(2);
    }
  }

  CalTotalNetProfitAdj(AmendType: string, Index) {
    this.Item1008Set[Index].Amount = (+this.Item1008Set[Index].Amount).toFixed(
      2
    );
    if (AmendType == "M" || AmendType == "MIXED") {
      this.Item1008Set[Index].ZakatShare = (
        parseFloat(this.Item1008Set[Index].Amount) *
        (parseFloat(this.form10List.TdSaudiSharePrft) / 100)
      ).toFixed(2);
      this.Item1008Set[Index].TaxShare = (
        parseFloat(this.Item1008Set[Index].Amount) *
        (parseFloat(this.form10List.TdNonSaudiSharePrft) / 100)
      ).toFixed(2);
    } else if (AmendType == "C" || AmendType == "CIT") {
      {
        this.Item1008Set[Index].ZakatShare = "0.00";
        this.Item1008Set[Index].TaxShare = (
          parseFloat(this.Item1008Set[Index].Amount) *
          (parseFloat(this.form10List.TdNonSaudiSharePrft) / 100)
        ).toFixed(2);
      }
    } else {
      this.Item1008Set[Index].ZakatShare = (
        parseFloat(this.Item1008Set[Index].Amount) *
        (parseFloat(this.form10List.TdSaudiSharePrft) / 100)
      ).toFixed(2);
      this.Item1008Set[Index].TaxShare = "0.00";
    }
    this.CalCellTotalNetProfitAdjustment();
  }

  CalCellTotalNetProfitAdjustment() {
    if (this.Item1008Set.length > 0) {
      this.Item1008C1A = 0;
      this.Item1008C2A = 0;
      this.Item1008C3A = 0;
      // this.Item1008R1A = 0;
      for (let i = 0; i < this.Item1008Set.length; i++) {
        this.Item1008C1A = (
          parseFloat(this.Item1008C1A) + parseFloat(this.Item1008Set[i].Amount)
        ).toFixed(2);
        this.Item1008C2A = (
          parseFloat(this.Item1008C2A) +
          parseFloat(this.Item1008Set[i].ZakatShare)
        ).toFixed(2);
        this.Item1008C3A = (
          parseFloat(this.Item1008C3A) +
          parseFloat(this.Item1008Set[i].TaxShare)
        ).toFixed(2);
      }
    }
  }

  // DEPRECIATION Calculation
  DepreciationCalAdjust() {
    // The group value at the end of the previous year
    if (
      this.Item1003Set.AGrpvalEod == "" ||
      this.Item1003Set.AGrpvalEod == undefined
    ) {
      this.Item1003Set.AGrpvalEod = "0.00";
    } else {
      this.Item1003Set.AGrpvalEod = (+this.Item1003Set.AGrpvalEod).toFixed(2);
    }
    if (
      this.Item1003Set.BGrpvalEod == "" ||
      this.Item1003Set.BGrpvalEod == undefined
    ) {
      this.Item1003Set.BGrpvalEod = "0.00";
    } else {
      this.Item1003Set.BGrpvalEod = (+this.Item1003Set.BGrpvalEod).toFixed(2);
    }
    if (
      this.Item1003Set.CGrpvalEod == "" ||
      this.Item1003Set.CGrpvalEod == undefined
    ) {
      this.Item1003Set.CGrpvalEod = "0.00";
    } else {
      this.Item1003Set.CGrpvalEod = (+this.Item1003Set.CGrpvalEod).toFixed(2);
    }
    if (
      this.Item1003Set.DGrpvalEod == "" ||
      this.Item1003Set.DGrpvalEod == undefined
    ) {
      this.Item1003Set.DGrpvalEod = "0.00";
    } else {
      this.Item1003Set.DGrpvalEod = (+this.Item1003Set.DGrpvalEod).toFixed(2);
    }
    if (
      this.Item1003Set.EGrpvalEod == "" ||
      this.Item1003Set.EGrpvalEod == undefined
    ) {
      this.Item1003Set.EGrpvalEod = "0.00";
    } else {
      this.Item1003Set.EGrpvalEod = (+this.Item1003Set.EGrpvalEod).toFixed(2);
    }
    if (
      this.Item1003Set.FGrpvalEod == "" ||
      this.Item1003Set.FGrpvalEod == undefined
    ) {
      this.Item1003Set.FGrpvalEod = "0.00";
    } else {
      this.Item1003Set.FGrpvalEod = (+this.Item1003Set.FGrpvalEod).toFixed(2);
    }

    if (
      this.Item1003Set.ACostPyrAddition == "" ||
      this.Item1003Set.ACostPyrAddition == undefined
    ) {
      this.Item1003Set.ACostPyrAddition = "0.00";
    } else {
      this.Item1003Set.ACostPyrAddition = (+this.Item1003Set
        .ACostPyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.BCostPyrAddition == "" ||
      this.Item1003Set.BCostPyrAddition == undefined
    ) {
      this.Item1003Set.BCostPyrAddition = "0.00";
    } else {
      this.Item1003Set.BCostPyrAddition = (+this.Item1003Set
        .BCostPyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.CCostPyrAddition == "" ||
      this.Item1003Set.CCostPyrAddition == undefined
    ) {
      this.Item1003Set.CCostPyrAddition = "0.00";
    } else {
      this.Item1003Set.CCostPyrAddition = (+this.Item1003Set
        .CCostPyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.DCostPyrAddition == "" ||
      this.Item1003Set.DCostPyrAddition == undefined
    ) {
      this.Item1003Set.DCostPyrAddition = "0.00";
    } else {
      this.Item1003Set.DCostPyrAddition = (+this.Item1003Set
        .DCostPyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.ECostPyrAddition == "" ||
      this.Item1003Set.ECostPyrAddition == undefined
    ) {
      this.Item1003Set.ECostPyrAddition = "0.00";
    } else {
      this.Item1003Set.ECostPyrAddition = (+this.Item1003Set
        .ECostPyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.FCostPyrAddition == "" ||
      this.Item1003Set.FCostPyrAddition == undefined
    ) {
      this.Item1003Set.FCostPyrAddition = "0.00";
    } else {
      this.Item1003Set.FCostPyrAddition = (+this.Item1003Set
        .FCostPyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.ACostCyrAddition == "" ||
      this.Item1003Set.ACostCyrAddition == undefined
    ) {
      this.Item1003Set.ACostCyrAddition = "0.00";
    } else {
      this.Item1003Set.ACostCyrAddition = (+this.Item1003Set
        .ACostCyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.BCostCyrAddition == "" ||
      this.Item1003Set.BCostCyrAddition == undefined
    ) {
      this.Item1003Set.BCostCyrAddition = "0.00";
    } else {
      this.Item1003Set.BCostCyrAddition = (+this.Item1003Set
        .BCostCyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.CCostCyrAddition == "" ||
      this.Item1003Set.CCostCyrAddition == undefined
    ) {
      this.Item1003Set.CCostCyrAddition = "0.00";
    } else {
      this.Item1003Set.CCostCyrAddition = (+this.Item1003Set
        .CCostCyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.DCostCyrAddition == "" ||
      this.Item1003Set.DCostCyrAddition == undefined
    ) {
      this.Item1003Set.DCostCyrAddition = "0.00";
    } else {
      this.Item1003Set.DCostCyrAddition = (+this.Item1003Set
        .DCostCyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.ECostCyrAddition == "" ||
      this.Item1003Set.ECostCyrAddition == undefined
    ) {
      this.Item1003Set.ECostCyrAddition = "0.00";
    } else {
      this.Item1003Set.ECostCyrAddition = (+this.Item1003Set
        .ECostCyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.FCostCyrAddition == "" ||
      this.Item1003Set.FCostCyrAddition == undefined
    ) {
      this.Item1003Set.FCostCyrAddition = "0.00";
    } else {
      this.Item1003Set.FCostCyrAddition = (+this.Item1003Set
        .FCostCyrAddition).toFixed(2);
    }
    if (
      this.Item1003Set.AComesAssetPyr == "" ||
      this.Item1003Set.AComesAssetPyr == undefined
    ) {
      this.Item1003Set.AComesAssetPyr = "0.00";
    } else {
      this.Item1003Set.AComesAssetPyr = (+this.Item1003Set
        .AComesAssetPyr).toFixed(2);
    }
    if (
      this.Item1003Set.BComesAssetPyr == "" ||
      this.Item1003Set.BComesAssetPyr == undefined
    ) {
      this.Item1003Set.BComesAssetPyr = "0.00";
    } else {
      this.Item1003Set.BComesAssetPyr = (+this.Item1003Set
        .BComesAssetPyr).toFixed(2);
    }
    if (
      this.Item1003Set.CComesAssetPyr == "" ||
      this.Item1003Set.CComesAssetPyr == undefined
    ) {
      this.Item1003Set.CComesAssetPyr = "0.00";
    } else {
      this.Item1003Set.CComesAssetPyr = (+this.Item1003Set
        .CComesAssetPyr).toFixed(2);
    }
    if (
      this.Item1003Set.DComesAssetPyr == "" ||
      this.Item1003Set.DComesAssetPyr == undefined
    ) {
      this.Item1003Set.DComesAssetPyr = "0.00";
    } else {
      this.Item1003Set.DComesAssetPyr = (+this.Item1003Set
        .DComesAssetPyr).toFixed(2);
    }
    if (
      this.Item1003Set.EComesAssetPyr == "" ||
      this.Item1003Set.EComesAssetPyr == undefined
    ) {
      this.Item1003Set.EComesAssetPyr = "0.00";
    } else {
      this.Item1003Set.EComesAssetPyr = (+this.Item1003Set
        .EComesAssetPyr).toFixed(2);
    }
    if (
      this.Item1003Set.FComesAssetPyr == "" ||
      this.Item1003Set.FComesAssetPyr == undefined
    ) {
      this.Item1003Set.FComesAssetPyr = "0.00";
    } else {
      this.Item1003Set.FComesAssetPyr = (+this.Item1003Set
        .FComesAssetPyr).toFixed(2);
    }
    if (
      this.Item1003Set.AComesAssetCyr == "" ||
      this.Item1003Set.AComesAssetCyr == undefined
    ) {
      this.Item1003Set.AComesAssetCyr = "0.00";
    } else {
      this.Item1003Set.AComesAssetCyr = (+this.Item1003Set
        .AComesAssetCyr).toFixed(2);
    }
    if (
      this.Item1003Set.BComesAssetCyr == "" ||
      this.Item1003Set.BComesAssetCyr == undefined
    ) {
      this.Item1003Set.BComesAssetCyr = "0.00";
    } else {
      this.Item1003Set.BComesAssetCyr = (+this.Item1003Set
        .BComesAssetCyr).toFixed(2);
    }
    if (
      this.Item1003Set.CComesAssetCyr == "" ||
      this.Item1003Set.CComesAssetCyr == undefined
    ) {
      this.Item1003Set.CComesAssetCyr = "0.00";
    } else {
      this.Item1003Set.CComesAssetCyr = (+this.Item1003Set
        .CComesAssetCyr).toFixed(2);
    }
    if (
      this.Item1003Set.DComesAssetCyr == "" ||
      this.Item1003Set.DComesAssetCyr == undefined
    ) {
      this.Item1003Set.DComesAssetCyr = "0.00";
    } else {
      this.Item1003Set.DComesAssetCyr = (+this.Item1003Set
        .DComesAssetCyr).toFixed(2);
    }
    if (
      this.Item1003Set.EComesAssetCyr == "" ||
      this.Item1003Set.EComesAssetCyr == undefined
    ) {
      this.Item1003Set.EComesAssetCyr = "0.00";
    } else {
      this.Item1003Set.EComesAssetCyr = (+this.Item1003Set
        .EComesAssetCyr).toFixed(2);
    }
    if (
      this.Item1003Set.FComesAssetCyr == "" ||
      this.Item1003Set.FComesAssetCyr == undefined
    ) {
      this.Item1003Set.FComesAssetCyr = "0.00";
    } else {
      this.Item1003Set.FComesAssetCyr = (+this.Item1003Set
        .FComesAssetCyr).toFixed(2);
    }
    if (
      this.Item1003Set.AGrpMaintCost == "" ||
      this.Item1003Set.AGrpMaintCost == undefined
    ) {
      this.Item1003Set.AGrpMaintCost = "0.00";
    } else {
      this.Item1003Set.AGrpMaintCost = (+this.Item1003Set
        .AGrpMaintCost).toFixed(2);
    }
    if (
      this.Item1003Set.BGrpMaintCost == "" ||
      this.Item1003Set.BGrpMaintCost == undefined
    ) {
      this.Item1003Set.BGrpMaintCost = "0.00";
    } else {
      this.Item1003Set.BGrpMaintCost = (+this.Item1003Set
        .BGrpMaintCost).toFixed(2);
    }
    if (
      this.Item1003Set.CGrpMaintCost == "" ||
      this.Item1003Set.CGrpMaintCost == undefined
    ) {
      this.Item1003Set.CGrpMaintCost = "0.00";
    } else {
      this.Item1003Set.CGrpMaintCost = (+this.Item1003Set
        .CGrpMaintCost).toFixed(2);
    }
    if (
      this.Item1003Set.DGrpMaintCost == "" ||
      this.Item1003Set.DGrpMaintCost == undefined
    ) {
      this.Item1003Set.DGrpMaintCost = "0.00";
    } else {
      this.Item1003Set.DGrpMaintCost = (+this.Item1003Set
        .DGrpMaintCost).toFixed(2);
    }
    if (
      this.Item1003Set.EGrpMaintCost == "" ||
      this.Item1003Set.EGrpMaintCost == undefined
    ) {
      this.Item1003Set.EGrpMaintCost = "0.00";
    } else {
      this.Item1003Set.EGrpMaintCost = (+this.Item1003Set
        .EGrpMaintCost).toFixed(2);
    }
    if (
      this.Item1003Set.FGrpMaintCost == "" ||
      this.Item1003Set.FGrpMaintCost == undefined
    ) {
      this.Item1003Set.FGrpMaintCost = "0.00";
    } else {
      this.Item1003Set.FGrpMaintCost = (+this.Item1003Set
        .FGrpMaintCost).toFixed(2);
    }

    this.Item1003Set.TotGrpvalEod = (
      parseFloat(this.Item1003Set.AGrpvalEod) +
      parseFloat(this.Item1003Set.BGrpvalEod) +
      parseFloat(this.Item1003Set.CGrpvalEod) +
      parseFloat(this.Item1003Set.DGrpvalEod) +
      parseFloat(this.Item1003Set.EGrpvalEod) +
      parseFloat(this.Item1003Set.FGrpvalEod)
    ).toFixed(2);

    // The group value at the end of the previous year
    this.Item1003Set.TotCostPyrAddition = (
      parseFloat(this.Item1003Set.ACostPyrAddition) +
      parseFloat(this.Item1003Set.BCostPyrAddition) +
      parseFloat(this.Item1003Set.CCostPyrAddition) +
      parseFloat(this.Item1003Set.DCostPyrAddition) +
      parseFloat(this.Item1003Set.ECostPyrAddition) +
      parseFloat(this.Item1003Set.FCostPyrAddition)
    ).toFixed(2);

    // The cost of current additions
    this.Item1003Set.TotCostCyrAddition = (
      parseFloat(this.Item1003Set.ACostCyrAddition) +
      parseFloat(this.Item1003Set.BCostCyrAddition) +
      parseFloat(this.Item1003Set.CCostCyrAddition) +
      parseFloat(this.Item1003Set.DCostCyrAddition) +
      parseFloat(this.Item1003Set.ECostCyrAddition) +
      parseFloat(this.Item1003Set.FCostCyrAddition)
    ).toFixed(2);

    // 50% of the total cost of additions during the current and previous years
    this.Item1003Set.ATotCost50Pcyr = (
      (parseFloat(this.Item1003Set.ACostPyrAddition) +
        parseFloat(this.Item1003Set.ACostCyrAddition)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.BTotCost50Pcyr = (
      (parseFloat(this.Item1003Set.BCostPyrAddition) +
        parseFloat(this.Item1003Set.BCostCyrAddition)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.CTotCost50Pcyr = (
      (parseFloat(this.Item1003Set.CCostPyrAddition) +
        parseFloat(this.Item1003Set.CCostCyrAddition)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.DTotCost50Pcyr = (
      (parseFloat(this.Item1003Set.DCostPyrAddition) +
        parseFloat(this.Item1003Set.DCostCyrAddition)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.ETotCost50Pcyr = (
      (parseFloat(this.Item1003Set.ECostPyrAddition) +
        parseFloat(this.Item1003Set.ECostCyrAddition)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.FTotCost50Pcyr = (
      (parseFloat(this.Item1003Set.FCostPyrAddition) +
        parseFloat(this.Item1003Set.FCostCyrAddition)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.TotCost50Pcyr = (
      (parseFloat(this.Item1003Set.TotCostPyrAddition) +
        parseFloat(this.Item1003Set.TotCostCyrAddition)) *
      0.5
    ).toFixed(2);

    // Compensation for assets which do not qualify for depreciation during the previous year
    this.Item1003Set.TotComesAssetPyr = (
      parseFloat(this.Item1003Set.AComesAssetPyr) +
      parseFloat(this.Item1003Set.BComesAssetPyr) +
      parseFloat(this.Item1003Set.CComesAssetPyr) +
      parseFloat(this.Item1003Set.DComesAssetPyr) +
      parseFloat(this.Item1003Set.EComesAssetPyr) +
      parseFloat(this.Item1003Set.FComesAssetPyr)
    ).toFixed(2);

    // Compensation for assets which do not qualify for depreciation during the current year

    this.Item1003Set.TotComesAssetCyr = (
      parseFloat(this.Item1003Set.AComesAssetCyr) +
      parseFloat(this.Item1003Set.BComesAssetCyr) +
      parseFloat(this.Item1003Set.CComesAssetCyr) +
      parseFloat(this.Item1003Set.DComesAssetCyr) +
      parseFloat(this.Item1003Set.EComesAssetCyr) +
      parseFloat(this.Item1003Set.FComesAssetCyr)
    ).toFixed(2);

    // 50% of the total value of compensation for assets which do not qualify for depreciation during the previous and current years

    this.Item1003Set.ATotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.AComesAssetPyr) +
        parseFloat(this.Item1003Set.AComesAssetCyr)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.BTotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.BComesAssetPyr) +
        parseFloat(this.Item1003Set.BComesAssetCyr)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.CTotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.CComesAssetPyr) +
        parseFloat(this.Item1003Set.CComesAssetCyr)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.DTotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.DComesAssetPyr) +
        parseFloat(this.Item1003Set.DComesAssetCyr)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.ETotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.EComesAssetPyr) +
        parseFloat(this.Item1003Set.EComesAssetCyr)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.FTotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.FComesAssetPyr) +
        parseFloat(this.Item1003Set.FComesAssetCyr)) *
      0.5
    ).toFixed(2);
    this.Item1003Set.TotTotCost50AssetPcyr = (
      (parseFloat(this.Item1003Set.TotComesAssetPyr) +
        parseFloat(this.Item1003Set.TotComesAssetCyr)) *
      0.5
    ).toFixed(2);

    // The remaining value of the group
    this.Item1003Set.AGrpRem = (
      parseFloat(this.Item1003Set.AGrpvalEod) +
      parseFloat(this.Item1003Set.ACostPyrAddition) +
      parseFloat(this.Item1003Set.ACostCyrAddition) -
      parseFloat(this.Item1003Set.ATotCost50Pcyr) -
      parseFloat(this.Item1003Set.ATotCost50AssetPcyr)
    ).toFixed(2);
    this.Item1003Set.BGrpRem = (
      parseFloat(this.Item1003Set.BGrpvalEod) +
      parseFloat(this.Item1003Set.BCostPyrAddition) +
      parseFloat(this.Item1003Set.BCostCyrAddition) -
      parseFloat(this.Item1003Set.BTotCost50Pcyr) -
      parseFloat(this.Item1003Set.BTotCost50AssetPcyr)
    ).toFixed(2);
    this.Item1003Set.CGrpRem = (
      parseFloat(this.Item1003Set.CGrpvalEod) +
      parseFloat(this.Item1003Set.CCostPyrAddition) +
      parseFloat(this.Item1003Set.CCostCyrAddition) -
      parseFloat(this.Item1003Set.CTotCost50Pcyr) -
      parseFloat(this.Item1003Set.CTotCost50AssetPcyr)
    ).toFixed(2);
    this.Item1003Set.DGrpRem = (
      parseFloat(this.Item1003Set.DGrpvalEod) +
      parseFloat(this.Item1003Set.DCostPyrAddition) +
      parseFloat(this.Item1003Set.DCostCyrAddition) -
      parseFloat(this.Item1003Set.DTotCost50Pcyr) -
      parseFloat(this.Item1003Set.DTotCost50AssetPcyr)
    ).toFixed(2);
    this.Item1003Set.EGrpRem = (
      parseFloat(this.Item1003Set.EGrpvalEod) +
      parseFloat(this.Item1003Set.ECostPyrAddition) +
      parseFloat(this.Item1003Set.ECostCyrAddition) -
      parseFloat(this.Item1003Set.ETotCost50Pcyr) -
      parseFloat(this.Item1003Set.ETotCost50AssetPcyr)
    ).toFixed(2);
    this.Item1003Set.FGrpRem = (
      parseFloat(this.Item1003Set.FGrpvalEod) +
      parseFloat(this.Item1003Set.FCostPyrAddition) +
      parseFloat(this.Item1003Set.FCostCyrAddition) -
      parseFloat(this.Item1003Set.FTotCost50Pcyr) -
      parseFloat(this.Item1003Set.FTotCost50AssetPcyr)
    ).toFixed(2);
    this.Item1003Set.TotGrpRem = (
      parseFloat(this.Item1003Set.TotGrpvalEod) +
      parseFloat(this.Item1003Set.TotCostPyrAddition) +
      parseFloat(this.Item1003Set.TotCostCyrAddition) -
      parseFloat(this.Item1003Set.TotCost50Pcyr) -
      parseFloat(this.Item1003Set.TotTotCost50AssetPcyr)
    ).toFixed(2);

    // Depreciation / amortization value

    this.Item1003Set.BDepAmotValue = (
      parseFloat(this.Item1003Set.BGrpRem) * 0.05
    ).toFixed(2);
    this.Item1003Set.CDepAmotValue = (
      parseFloat(this.Item1003Set.CGrpRem) * 0.1
    ).toFixed(2);
    this.Item1003Set.DDepAmotValue = (
      parseFloat(this.Item1003Set.DGrpRem) * 0.25
    ).toFixed(2);
    this.Item1003Set.EDepAmotValue = (
      parseFloat(this.Item1003Set.EGrpRem) * 0.2
    ).toFixed(2);
    this.Item1003Set.FDepAmotValue = (
      parseFloat(this.Item1003Set.FGrpRem) * 0.1
    ).toFixed(2);
    this.Item1003Set.TotDepAmotValue = (
      parseFloat(this.Item1003Set.BDepAmotValue) +
      parseFloat(this.Item1003Set.CDepAmotValue) +
      parseFloat(this.Item1003Set.DDepAmotValue) +
      parseFloat(this.Item1003Set.EDepAmotValue) +
      parseFloat(this.Item1003Set.FDepAmotValue)
    ).toFixed(2);

    // The remaining value of the group at the end of the current year

    this.Item1003Set.ARemValueCyr = parseFloat(
      this.Item1003Set.AGrpRem
    ).toFixed(2);
    this.Item1003Set.BRemValueCyr = (
      parseFloat(this.Item1003Set.BGrpRem) -
      parseFloat(this.Item1003Set.BDepAmotValue)
    ).toFixed(2);
    this.Item1003Set.CRemValueCyr = (
      parseFloat(this.Item1003Set.CGrpRem) -
      parseFloat(this.Item1003Set.CDepAmotValue)
    ).toFixed(2);
    this.Item1003Set.DRemValueCyr = (
      parseFloat(this.Item1003Set.DGrpRem) -
      parseFloat(this.Item1003Set.DDepAmotValue)
    ).toFixed(2);
    this.Item1003Set.ERemValueCyr = (
      parseFloat(this.Item1003Set.EGrpRem) -
      parseFloat(this.Item1003Set.EDepAmotValue)
    ).toFixed(2);
    this.Item1003Set.FRemValueCyr = (
      parseFloat(this.Item1003Set.FGrpRem) -
      parseFloat(this.Item1003Set.FDepAmotValue)
    ).toFixed(2);
    this.Item1003Set.TotRemValueCyr = (
      parseFloat(this.Item1003Set.ARemValueCyr) +
      parseFloat(this.Item1003Set.BRemValueCyr) +
      parseFloat(this.Item1003Set.CRemValueCyr) +
      parseFloat(this.Item1003Set.DRemValueCyr) +
      parseFloat(this.Item1003Set.ERemValueCyr) +
      parseFloat(this.Item1003Set.FRemValueCyr)
    ).toFixed(2);

    // Maintenance cost for the group

    this.Item1003Set.TotGrpMaintCost = (
      parseFloat(this.Item1003Set.AGrpMaintCost) +
      parseFloat(this.Item1003Set.BGrpMaintCost) +
      parseFloat(this.Item1003Set.CGrpMaintCost) +
      parseFloat(this.Item1003Set.DGrpMaintCost) +
      parseFloat(this.Item1003Set.EGrpMaintCost) +
      parseFloat(this.Item1003Set.FGrpMaintCost)
    ).toFixed(2);

    // Maintenance expenses exceeding 4%

    this.Item1003Set.AMaint4exp = (
      parseFloat(this.Item1003Set.AGrpMaintCost) -
      parseFloat(this.Item1003Set.ARemValueCyr) * 0.04
    ).toFixed(2);
    this.Item1003Set.BMaint4exp = (
      parseFloat(this.Item1003Set.BGrpMaintCost) -
      parseFloat(this.Item1003Set.BRemValueCyr) * 0.04
    ).toFixed(2);
    this.Item1003Set.CMaint4exp = (
      parseFloat(this.Item1003Set.CGrpMaintCost) -
      parseFloat(this.Item1003Set.CRemValueCyr) * 0.04
    ).toFixed(2);
    this.Item1003Set.DMaint4exp = (
      parseFloat(this.Item1003Set.DGrpMaintCost) -
      parseFloat(this.Item1003Set.DRemValueCyr) * 0.04
    ).toFixed(2);
    this.Item1003Set.EMaint4exp = (
      parseFloat(this.Item1003Set.EGrpMaintCost) -
      parseFloat(this.Item1003Set.ERemValueCyr) * 0.04
    ).toFixed(2);
    this.Item1003Set.FMaint4exp = (
      parseFloat(this.Item1003Set.FGrpMaintCost) -
      parseFloat(this.Item1003Set.FRemValueCyr) * 0.04
    ).toFixed(2);
    this.Item1003Set.TotMaint4exp = (
      parseFloat(this.Item1003Set.AMaint4exp) +
      parseFloat(this.Item1003Set.BMaint4exp) +
      parseFloat(this.Item1003Set.CMaint4exp) +
      parseFloat(this.Item1003Set.DMaint4exp) +
      parseFloat(this.Item1003Set.EMaint4exp) +
      parseFloat(this.Item1003Set.FMaint4exp)
    ).toFixed(2);

    //  The remaining of the group at the end of the current year

    this.Item1003Set.AGrpCyr = (
      parseFloat(this.Item1003Set.ARemValueCyr) +
      parseFloat(this.Item1003Set.AMaint4exp)
    ).toFixed(2);
    this.Item1003Set.BGrpCyr = (
      parseFloat(this.Item1003Set.BRemValueCyr) +
      parseFloat(this.Item1003Set.BMaint4exp)
    ).toFixed(2);
    this.Item1003Set.CGrpCyr = (
      parseFloat(this.Item1003Set.CRemValueCyr) +
      parseFloat(this.Item1003Set.CMaint4exp)
    ).toFixed(2);
    this.Item1003Set.DGrpCyr = (
      parseFloat(this.Item1003Set.DRemValueCyr) +
      parseFloat(this.Item1003Set.DMaint4exp)
    ).toFixed(2);
    this.Item1003Set.EGrpCyr = (
      parseFloat(this.Item1003Set.ERemValueCyr) +
      parseFloat(this.Item1003Set.EMaint4exp)
    ).toFixed(2);
    this.Item1003Set.FGrpCyr = (
      parseFloat(this.Item1003Set.FRemValueCyr) +
      parseFloat(this.Item1003Set.FMaint4exp)
    ).toFixed(2);
    this.Item1003Set.TotGrpCyr = (
      parseFloat(this.Item1003Set.AGrpCyr) +
      parseFloat(this.Item1003Set.BGrpCyr) +
      parseFloat(this.Item1003Set.CGrpCyr) +
      parseFloat(this.Item1003Set.DGrpCyr) +
      parseFloat(this.Item1003Set.EGrpCyr) +
      parseFloat(this.Item1003Set.FGrpCyr)
    ).toFixed(2);
  }
  // Current Assets
  CurrentTotalAsserts() {
    let BsTotCurrAssetTotal = "0.00";
    let BeTotCurrAssetTotal = "0.00";
    let BsTotNcurrAssetTotal = "0.00";
    let BeTotNcurrAssetTotal = "0.00";
    let BsTotintassetTotal = "0.00";
    let BeTotintassetTotal = "0.00";
    let BsTotalAssetsTotal = "0.00";
    let BeTotalAssetsTotal = "0.00";
    let BsTotLiabilitiesTotal = "0.00";
    let BeTotLiabilitiesTotal = "0.00";
    let BsTotNonliabilitiesTotal = "0.00";
    let BeTotNonliabilitiesTotal = "0.00";
    let BsTotshareTotal = "0.00";
    let BeTotshareTotal = "0.00";

    if (
      this.form10List.BsCashInhand == "" ||
      this.form10List.BsCashInhand == undefined
    ) {
      this.form10List.BsCashInhand = "0.00";
    }
    this.form10List.BsCashInhand = parseFloat(
      this.form10List.BsCashInhand
    ).toFixed(2);
    if (
      this.form10List.BsShortTmInvs == "" ||
      this.form10List.BsShortTmInvs == undefined
    ) {
      this.form10List.BsShortTmInvs = "0.00";
    }
    this.form10List.BsShortTmInvs = parseFloat(
      this.form10List.BsShortTmInvs
    ).toFixed(2);
    if (
      this.form10List.BsAccRecDebit == "" ||
      this.form10List.BsAccRecDebit == undefined
    ) {
      this.form10List.BsAccRecDebit = "0.00";
    }
    this.form10List.BsAccRecDebit = parseFloat(
      this.form10List.BsAccRecDebit
    ).toFixed(2);
    if (
      this.form10List.BsMecInventory == "" ||
      this.form10List.BsMecInventory == undefined
    ) {
      this.form10List.BsMecInventory = "0.00";
    }
    this.form10List.BsMecInventory = parseFloat(
      this.form10List.BsMecInventory
    ).toFixed(2);
    if (
      this.form10List.BsAccRevenue == "" ||
      this.form10List.BsAccRevenue == undefined
    ) {
      this.form10List.BsAccRevenue = "0.00";
    }
    this.form10List.BsAccRevenue = parseFloat(
      this.form10List.BsAccRevenue
    ).toFixed(2);
    if (
      this.form10List.BsPrapaidExp == "" ||
      this.form10List.BsPrapaidExp == undefined
    ) {
      this.form10List.BsPrapaidExp = "0.00";
    }
    this.form10List.BsPrapaidExp = parseFloat(
      this.form10List.BsPrapaidExp
    ).toFixed(2);
    if (this.form10List.BsDue == "" || this.form10List.BsDue == undefined) {
      this.form10List.BsDue = "0.00";
    }
    this.form10List.BsDue = parseFloat(this.form10List.BsDue).toFixed(2);
    if (
      this.form10List.BsCurrAsset == "" ||
      this.form10List.BsCurrAsset == undefined
    ) {
      this.form10List.BsCurrAsset = "0.00";
    }
    this.form10List.BsCurrAsset = parseFloat(
      this.form10List.BsCurrAsset
    ).toFixed(2);
    if (
      this.form10List.BeCashInhand == "" ||
      this.form10List.BeCashInhand == undefined
    ) {
      this.form10List.BeCashInhand = "0.00";
    }
    this.form10List.BeCashInhand = parseFloat(
      this.form10List.BeCashInhand
    ).toFixed(2);
    if (
      this.form10List.BeShortTmInvs == "" ||
      this.form10List.BeShortTmInvs == undefined
    ) {
      this.form10List.BeShortTmInvs = "0.00";
    }
    this.form10List.BeShortTmInvs = parseFloat(
      this.form10List.BeShortTmInvs
    ).toFixed(2);
    if (
      this.form10List.BeAccRecDebit == "" ||
      this.form10List.BeAccRecDebit == undefined
    ) {
      this.form10List.BeAccRecDebit = "0.00";
    }
    this.form10List.BeAccRecDebit = parseFloat(
      this.form10List.BeAccRecDebit
    ).toFixed(2);
    if (
      this.form10List.BeMecInventory == "" ||
      this.form10List.BeMecInventory == undefined
    ) {
      this.form10List.BeMecInventory = "0.00";
    }
    this.form10List.BeMecInventory = parseFloat(
      this.form10List.BeMecInventory
    ).toFixed(2);
    if (
      this.form10List.BeAccRevenue == "" ||
      this.form10List.BeAccRevenue == undefined
    ) {
      this.form10List.BeAccRevenue = "0.00";
    }
    this.form10List.BeAccRevenue = parseFloat(
      this.form10List.BeAccRevenue
    ).toFixed(2);
    if (
      this.form10List.BePrapaidExp == "" ||
      this.form10List.BePrapaidExp == undefined
    ) {
      this.form10List.BePrapaidExp = "0.00";
    }
    this.form10List.BePrapaidExp = parseFloat(
      this.form10List.BePrapaidExp
    ).toFixed(2);
    if (this.form10List.BeDue == "" || this.form10List.BeDue == undefined) {
      this.form10List.BeDue = "0.00";
    }
    this.form10List.BeDue = parseFloat(this.form10List.BeDue).toFixed(2);
    if (
      this.form10List.BeCurrAsset == "" ||
      this.form10List.BeCurrAsset == undefined
    ) {
      this.form10List.BeCurrAsset = "0.00";
    }
    this.form10List.BeCurrAsset = parseFloat(
      this.form10List.BeCurrAsset
    ).toFixed(2);

    BsTotCurrAssetTotal = (
      parseFloat(this.form10List.BsCashInhand) +
      parseFloat(this.form10List.BsShortTmInvs) +
      parseFloat(this.form10List.BsAccRecDebit) +
      parseFloat(this.form10List.BsMecInventory) +
      parseFloat(this.form10List.BsAccRevenue) +
      parseFloat(this.form10List.BsPrapaidExp) +
      parseFloat(this.form10List.BsDue) +
      parseFloat(this.form10List.BsCurrAsset)
    ).toFixed(2);

    BeTotCurrAssetTotal = (
      parseFloat(this.form10List.BeCashInhand) +
      parseFloat(this.form10List.BeShortTmInvs) +
      parseFloat(this.form10List.BeAccRecDebit) +
      parseFloat(this.form10List.BeMecInventory) +
      parseFloat(this.form10List.BeAccRevenue) +
      parseFloat(this.form10List.BePrapaidExp) +
      parseFloat(this.form10List.BeDue) +
      parseFloat(this.form10List.BeCurrAsset)
    ).toFixed(2);

    //  Non current Assets
    if (
      this.form10List.BsLongtermInves == "" ||
      this.form10List.BsLongtermInves == undefined
    ) {
      this.form10List.BsLongtermInves = "0.00";
    }
    this.form10List.BsLongtermInves = parseFloat(
      this.form10List.BsLongtermInves
    ).toFixed(2);
    if (
      this.form10List.BsNetproperty == "" ||
      this.form10List.BsNetproperty == undefined
    ) {
      this.form10List.BsNetproperty = "0.00";
    }
    this.form10List.BsNetproperty = parseFloat(
      this.form10List.BsNetproperty
    ).toFixed(2);
    if (this.form10List.BsWip == "" || this.form10List.BsWip == undefined) {
      this.form10List.BsWip = "0.00";
    }
    this.form10List.BsWip = parseFloat(this.form10List.BsWip).toFixed(2);
    if (
      this.form10List.BsEstablish == "" ||
      this.form10List.BsEstablish == undefined
    ) {
      this.form10List.BsEstablish = "0.00";
    }
    this.form10List.BsEstablish = parseFloat(
      this.form10List.BsEstablish
    ).toFixed(2);
    if (
      this.form10List.BsNonasset == "" ||
      this.form10List.BsNonasset == undefined
    ) {
      this.form10List.BsNonasset = "0.00";
    }
    this.form10List.BsNonasset = parseFloat(this.form10List.BsNonasset).toFixed(
      2
    );
    if (
      this.form10List.BeLongtermInves == "" ||
      this.form10List.BeLongtermInves == undefined
    ) {
      this.form10List.BeLongtermInves = "0.00";
    }

    this.form10List.BeLongtermInves = parseFloat(
      this.form10List.BeLongtermInves
    ).toFixed(2);
    if (
      this.form10List.BeNetproperty == "" ||
      this.form10List.BeNetproperty == undefined
    ) {
      this.form10List.BeNetproperty = "0.00";
    }
    this.form10List.BeNetproperty = parseFloat(
      this.form10List.BeNetproperty
    ).toFixed(2);
    if (this.form10List.BeWip == "" || this.form10List.BeWip == undefined) {
      this.form10List.BeWip = "0.00";
    }
    this.form10List.BeWip = parseFloat(this.form10List.BeWip).toFixed(2);
    if (
      this.form10List.BeEstablish == "" ||
      this.form10List.BeEstablish == undefined
    ) {
      this.form10List.BeEstablish = "0.00";
    }
    this.form10List.BeEstablish = parseFloat(
      this.form10List.BeEstablish
    ).toFixed(2);
    if (
      this.form10List.BeNonasset == "" ||
      this.form10List.BeNonasset == undefined
    ) {
      this.form10List.BeNonasset = "0.00";
    }
    this.form10List.BeNonasset = parseFloat(this.form10List.BeNonasset).toFixed(
      2
    );

    BsTotNcurrAssetTotal = (
      parseFloat(this.form10List.BsLongtermInves) +
      parseFloat(this.form10List.BsNetproperty) +
      parseFloat(this.form10List.BsWip) +
      parseFloat(this.form10List.BsEstablish) +
      parseFloat(this.form10List.BsNonasset)
    ).toFixed(2);

    BeTotNcurrAssetTotal = (
      parseFloat(this.form10List.BeLongtermInves) +
      parseFloat(this.form10List.BeNetproperty) +
      parseFloat(this.form10List.BeWip) +
      parseFloat(this.form10List.BeEstablish) +
      parseFloat(this.form10List.BeNonasset)
    ).toFixed(2);

    //  Intangible Assets
    if (
      this.form10List.BsPatent == "" ||
      this.form10List.BsPatent == undefined
    ) {
      this.form10List.BsPatent = "0.00";
    }
    this.form10List.BsPatent = parseFloat(this.form10List.BsPatent).toFixed(2);
    if (
      this.form10List.BsGoodwill == "" ||
      this.form10List.BsGoodwill == undefined
    ) {
      this.form10List.BsGoodwill = "0.00";
    }
    this.form10List.BsGoodwill = parseFloat(this.form10List.BsGoodwill).toFixed(
      2
    );
    if (
      this.form10List.BePatent == "" ||
      this.form10List.BePatent == undefined
    ) {
      this.form10List.BePatent = "0.00";
    }
    this.form10List.BePatent = parseFloat(this.form10List.BePatent).toFixed(2);
    if (
      this.form10List.BeGoodwill == "" ||
      this.form10List.BeGoodwill == undefined
    ) {
      this.form10List.BeGoodwill = "0.00";
    }
    this.form10List.BeGoodwill = parseFloat(this.form10List.BeGoodwill).toFixed(
      2
    );

    BsTotintassetTotal = (
      parseFloat(this.form10List.BsPatent) +
      parseFloat(this.form10List.BsGoodwill)
    ).toFixed(2);

    BeTotintassetTotal = (
      parseFloat(this.form10List.BePatent) +
      parseFloat(this.form10List.BeGoodwill)
    ).toFixed(2);

    // Current Liabilities
    if (
      this.form10List.BsLiabShorttrmPay == "" ||
      this.form10List.BsLiabShorttrmPay == undefined
    ) {
      this.form10List.BsLiabShorttrmPay = "0.00";
    }
    this.form10List.BsLiabShorttrmPay = parseFloat(
      this.form10List.BsLiabShorttrmPay
    ).toFixed(2);
    if (
      this.form10List.BsLiabPay == "" ||
      this.form10List.BsLiabPay == undefined
    ) {
      this.form10List.BsLiabPay = "0.00";
    }
    this.form10List.BsLiabPay = parseFloat(this.form10List.BsLiabPay).toFixed(
      2
    );
    if (
      this.form10List.BsLiabAcc == "" ||
      this.form10List.BsLiabAcc == undefined
    ) {
      this.form10List.BsLiabAcc = "0.00";
    }
    this.form10List.BsLiabAcc = parseFloat(this.form10List.BsLiabAcc).toFixed(
      2
    );
    if (
      this.form10List.BsLiabDiv == "" ||
      this.form10List.BsLiabDiv == undefined
    ) {
      this.form10List.BsLiabDiv = "0.00";
    }
    this.form10List.BsLiabDiv = parseFloat(this.form10List.BsLiabDiv).toFixed(
      2
    );
    if (
      this.form10List.BsLiabAccper == "" ||
      this.form10List.BsLiabAccper == undefined
    ) {
      this.form10List.BsLiabAccper = "0.00";
    }
    this.form10List.BsLiabAccper = parseFloat(
      this.form10List.BsLiabAccper
    ).toFixed(2);
    if (
      this.form10List.BsLiabShortLoan == "" ||
      this.form10List.BsLiabShortLoan == undefined
    ) {
      this.form10List.BsLiabShortLoan = "0.00";
    }
    this.form10List.BsLiabShortLoan = parseFloat(
      this.form10List.BsLiabShortLoan
    ).toFixed(2);
    if (
      this.form10List.BsLiabPayParties == "" ||
      this.form10List.BsLiabPayParties == undefined
    ) {
      this.form10List.BsLiabPayParties = "0.00";
    }
    this.form10List.BsLiabPayParties = parseFloat(
      this.form10List.BsLiabPayParties
    ).toFixed(2);
    if (
      this.form10List.BeLiabShorttrmPay == "" ||
      this.form10List.BeLiabShorttrmPay == undefined
    ) {
      this.form10List.BeLiabShorttrmPay = "0.00";
    }
    this.form10List.BeLiabShorttrmPay = parseFloat(
      this.form10List.BeLiabShorttrmPay
    ).toFixed(2);
    if (
      this.form10List.BeLiabPay == "" ||
      this.form10List.BeLiabPay == undefined
    ) {
      this.form10List.BeLiabPay = "0.00";
    }
    this.form10List.BeLiabPay = parseFloat(this.form10List.BeLiabPay).toFixed(
      2
    );
    if (
      this.form10List.BeLiabAcc == "" ||
      this.form10List.BeLiabAcc == undefined
    ) {
      this.form10List.BeLiabAcc = "0.00";
    }
    this.form10List.BeLiabAcc = parseFloat(this.form10List.BeLiabAcc).toFixed(
      2
    );
    if (
      this.form10List.BeLiabDiv == "" ||
      this.form10List.BeLiabDiv == undefined
    ) {
      this.form10List.BeLiabDiv = "0.00";
    }
    this.form10List.BeLiabDiv = parseFloat(this.form10List.BeLiabDiv).toFixed(
      2
    );
    if (
      this.form10List.BeLiabAccper == "" ||
      this.form10List.BeLiabAccper == undefined
    ) {
      this.form10List.BeLiabAccper = "0.00";
    }
    this.form10List.BeLiabAccper = parseFloat(
      this.form10List.BeLiabAccper
    ).toFixed(2);
    if (
      this.form10List.BeLiabShortLoan == "" ||
      this.form10List.BeLiabShortLoan == undefined
    ) {
      this.form10List.BeLiabShortLoan = "0.00";
    }
    this.form10List.BeLiabShortLoan = parseFloat(
      this.form10List.BeLiabShortLoan
    ).toFixed(2);
    if (
      this.form10List.BeLiabPayParties == "" ||
      this.form10List.BeLiabPayParties == undefined
    ) {
      this.form10List.BeLiabPayParties = "0.00";
    }
    this.form10List.BeLiabPayParties = parseFloat(
      this.form10List.BeLiabPayParties
    ).toFixed(2);

    BsTotLiabilitiesTotal = (
      parseFloat(this.form10List.BsLiabShorttrmPay) +
      parseFloat(this.form10List.BsLiabPay) +
      parseFloat(this.form10List.BsLiabAcc) +
      parseFloat(this.form10List.BsLiabDiv) +
      parseFloat(this.form10List.BsLiabAccper) +
      parseFloat(this.form10List.BsLiabShortLoan) +
      parseFloat(this.form10List.BsLiabPayParties)
    ).toFixed(2);

    BeTotLiabilitiesTotal = (
      parseFloat(this.form10List.BeLiabShorttrmPay) +
      parseFloat(this.form10List.BeLiabPay) +
      parseFloat(this.form10List.BeLiabAcc) +
      parseFloat(this.form10List.BeLiabDiv) +
      parseFloat(this.form10List.BeLiabAccper) +
      parseFloat(this.form10List.BeLiabShortLoan) +
      parseFloat(this.form10List.BeLiabPayParties)
    ).toFixed(2);

    // Non Current Liabilities
    if (
      this.form10List.BsNliabLongLoan == "" ||
      this.form10List.BsNliabLongLoan == undefined
    ) {
      this.form10List.BsNliabLongLoan = "0.00";
    }
    this.form10List.BsNliabLongLoan = parseFloat(
      this.form10List.BsNliabLongLoan
    ).toFixed(2);
    if (
      this.form10List.BsNliabLongtrmPay == "" ||
      this.form10List.BsNliabLongtrmPay == undefined
    ) {
      this.form10List.BsNliabLongtrmPay = "0.00";
    }
    this.form10List.BsNliabLongtrmPay = parseFloat(
      this.form10List.BsNliabLongtrmPay
    ).toFixed(2);
    if (
      this.form10List.BsNliabOth == "" ||
      this.form10List.BsNliabOth == undefined
    ) {
      this.form10List.BsNliabOth = "0.00";
    }
    this.form10List.BsNliabOth = parseFloat(this.form10List.BsNliabOth).toFixed(
      2
    );
    if (
      this.form10List.BsNliabCurPartners == "" ||
      this.form10List.BsNliabCurPartners == undefined
    ) {
      this.form10List.BsNliabCurPartners = "0.00";
    }
    this.form10List.BsNliabCurPartners = parseFloat(
      this.form10List.BsNliabCurPartners
    ).toFixed(2);
    if (
      this.form10List.BsNliabPayParties == "" ||
      this.form10List.BsNliabPayParties == undefined
    ) {
      this.form10List.BsNliabPayParties = "0.00";
    }
    this.form10List.BsNliabPayParties = parseFloat(
      this.form10List.BsNliabPayParties
    ).toFixed(2);

    if (
      this.form10List.BeNliabLongLoan == "" ||
      this.form10List.BeNliabLongLoan == undefined
    ) {
      this.form10List.BeNliabLongLoan = "0.00";
    }
    this.form10List.BeNliabLongLoan = parseFloat(
      this.form10List.BeNliabLongLoan
    ).toFixed(2);
    if (
      this.form10List.BeNliabLongtrmPay == "" ||
      this.form10List.BeNliabLongtrmPay == undefined
    ) {
      this.form10List.BeNliabLongtrmPay = "0.00";
    }
    this.form10List.BeNliabLongtrmPay = parseFloat(
      this.form10List.BeNliabLongtrmPay
    ).toFixed(2);
    if (
      this.form10List.BeNliabOth == "" ||
      this.form10List.BeNliabOth == undefined
    ) {
      this.form10List.BeNliabOth = "0.00";
    }
    this.form10List.BeNliabOth = parseFloat(this.form10List.BeNliabOth).toFixed(
      2
    );
    if (
      this.form10List.BeNliabCurPartners == "" ||
      this.form10List.BeNliabCurPartners == undefined
    ) {
      this.form10List.BeNliabCurPartners = "0.00";
    }
    this.form10List.BeNliabCurPartners = parseFloat(
      this.form10List.BeNliabCurPartners
    ).toFixed(2);
    if (
      this.form10List.BeNliabPayParties == "" ||
      this.form10List.BeNliabPayParties == undefined
    ) {
      this.form10List.BeNliabPayParties = "0.00";
    }
    this.form10List.BeNliabPayParties = parseFloat(
      this.form10List.BeNliabPayParties
    ).toFixed(2);

    BsTotNonliabilitiesTotal = (
      parseFloat(this.form10List.BsNliabLongLoan) +
      parseFloat(this.form10List.BsNliabLongtrmPay) +
      parseFloat(this.form10List.BsNliabOth) +
      parseFloat(this.form10List.BsNliabCurPartners) +
      parseFloat(this.form10List.BsNliabPayParties)
    ).toFixed(2);

    BeTotNonliabilitiesTotal = (
      parseFloat(this.form10List.BeNliabLongLoan) +
      parseFloat(this.form10List.BeNliabLongtrmPay) +
      parseFloat(this.form10List.BeNliabOth) +
      parseFloat(this.form10List.BeNliabCurPartners) +
      parseFloat(this.form10List.BeNliabPayParties)
    ).toFixed(2);

    // Shareholders' Equity
    if (
      this.form10List.BsCapital == "" ||
      this.form10List.BsCapital == undefined
    ) {
      this.form10List.BsCapital = "0.00";
    }
    this.form10List.BsCapital = parseFloat(this.form10List.BsCapital).toFixed(
      2
    );
    if (
      this.form10List.BsReserves == "" ||
      this.form10List.BsReserves == undefined
    ) {
      this.form10List.BsReserves = "0.00";
    }
    this.form10List.BsReserves = parseFloat(this.form10List.BsReserves).toFixed(
      2
    );
    if (
      this.form10List.BsLiabRet == "" ||
      this.form10List.BsLiabRet == undefined
    ) {
      this.form10List.BsLiabRet = "0.00";
    }
    this.form10List.BsLiabRet = parseFloat(this.form10List.BsLiabRet).toFixed(
      2
    );
    if (this.form10List.BsOther == "" || this.form10List.BsOther == undefined) {
      this.form10List.BsOther = "0.00";
    }
    this.form10List.BsOther = parseFloat(this.form10List.BsOther).toFixed(2);
    if (
      this.form10List.BeCapital == "" ||
      this.form10List.BeCapital == undefined
    ) {
      this.form10List.BeCapital = "0.00";
    }

    this.form10List.BeCapital = parseFloat(this.form10List.BeCapital).toFixed(
      2
    );
    if (
      this.form10List.BeReserves == "" ||
      this.form10List.BeReserves == undefined
    ) {
      this.form10List.BeReserves = "0.00";
    }
    this.form10List.BeReserves = parseFloat(this.form10List.BeReserves).toFixed(
      2
    );
    if (
      this.form10List.BeLiabRet == "" ||
      this.form10List.BeLiabRet == undefined
    ) {
      this.form10List.BeLiabRet = "0.00";
    }
    this.form10List.BeLiabRet = parseFloat(this.form10List.BeLiabRet).toFixed(
      2
    );
    if (this.form10List.BeOther == "" || this.form10List.BeOther == undefined) {
      this.form10List.BeOther = "0.00";
    }
    this.form10List.BeOther = parseFloat(this.form10List.BeOther).toFixed(2);

    BsTotshareTotal = (
      parseFloat(this.form10List.BsCapital) +
      parseFloat(this.form10List.BsReserves) +
      parseFloat(this.form10List.BsLiabRet) +
      parseFloat(this.form10List.BsOther)
    ).toFixed(2);

    BeTotshareTotal = (
      parseFloat(this.form10List.BeCapital) +
      parseFloat(this.form10List.BeReserves) +
      parseFloat(this.form10List.BeLiabRet) +
      parseFloat(this.form10List.BeOther)
    ).toFixed(2);

    this.form10List.BsTotCurrAsset = BsTotCurrAssetTotal;
    this.form10List.BeTotCurrAsset = BeTotCurrAssetTotal;
    this.form10List.BsTotNcurrAsset = BsTotNcurrAssetTotal;
    this.form10List.BeTotNcurrAsset = BeTotNcurrAssetTotal;
    this.form10List.BsTotintasset = BsTotintassetTotal;
    this.form10List.BeTotintasset = BeTotintassetTotal;

    // TotalAsserts
    BsTotalAssetsTotal = (
      parseFloat(this.form10List.BsTotCurrAsset) +
      parseFloat(this.form10List.BsTotNcurrAsset) +
      parseFloat(this.form10List.BsTotintasset)
    ).toFixed(2);

    BeTotalAssetsTotal = (
      parseFloat(this.form10List.BeTotCurrAsset) +
      parseFloat(this.form10List.BeTotNcurrAsset) +
      parseFloat(this.form10List.BeTotintasset)
    ).toFixed(2);

    this.form10List.BsTotAssets = BsTotalAssetsTotal;
    this.form10List.BeTotAssets = BeTotalAssetsTotal;

    this.form10List.BsTotLiabilities = BsTotLiabilitiesTotal;
    this.form10List.BeTotLiabilities = BeTotLiabilitiesTotal;
    this.form10List.BsTotNonliabilities = BsTotNonliabilitiesTotal;
    this.form10List.BeTotNonliabilities = BeTotNonliabilitiesTotal;
    this.form10List.BsTotshare = BsTotshareTotal;
    this.form10List.BeTotshare = BeTotshareTotal;

    // Total Liability and equity
    this.BsLiabilityandequity = (
      parseFloat(this.form10List.BsTotLiabilities) +
      parseFloat(this.form10List.BsTotNonliabilities) +
      parseFloat(this.form10List.BsTotshare)
    ).toFixed(2);

    this.BeLiabilityandequity = (
      parseFloat(this.form10List.BeTotLiabilities) +
      parseFloat(this.form10List.BeTotNonliabilities) +
      parseFloat(this.form10List.BeTotshare)
    ).toFixed(2);
  }
  CitCalculation(event) {
    if (event.currentTarget.checked == true) {
      this.taxbaseD1Form.patchValue({ Schedule: true });
      jQuery("#CFcit").modal("show");
    } else {
      this.taxbaseD1Form.patchValue({ Schedule: false });
      jQuery("#CFcit").modal("hide");
      this.form10List.RCarryAdj = "";
      this.clearFormArray(this.TaxBaseD1);
      this.AddRowD1();
      this.CitCarriedForwardCal(0);
      this.form10List.DedCayy25 = (+this.TaxBaseD1.controls[0].value
        .LossDedCyr).toFixed(2);
    }
  }
  CitReInsurance(event) {
    if (event.currentTarget.checked == true) {
      this.taxbaseD2Form.patchValue({ Schedule: true });
      jQuery("#CFtaxamount").modal("show");
    } else {
      this.taxbaseD1Form.patchValue({ Schedule: false });
      jQuery("#CFtaxamount").modal("hide");
      this.form10List.RTaxamt = "";
      this.form10List.DedTaxamtInsu = "0.00";
      this.totalZDSell = "0.00";
      this.form10List.ZdedsellAmt = this.totalZDSell;
      this.clearFormArray(this.TaxBaseD2);
      this.AddRowD2();
      this.ReinsuranceCal(0);
      this.form10List.DedTaxamtInsu = this.TaxBaseD2.controls[0].value.PerEstaTax;
    }
  }
  DeductionTotal: any = 0.0;
  TaxableTotalAmount: any = 0.0;
  IncomeTaxShareTotal: any = 0.0;
  IncomeTaxPayableTotal: any = 0.0;
  InvcmplossAmtTotal: any = 0.0;

  CitCalculationDetails() {
    // Net CIT profit / loss after amendments
    // Losses In The Invested Company
    if (
      this.form10List.InvcmplossAmt == "" ||
      this.form10List.InvcmplossAmt == undefined
    ) {
      this.form10List.InvcmplossAmt = "0.00";
    } else {
      this.form10List.InvcmplossAmt = (+this.form10List.InvcmplossAmt).toFixed(
        2
      );
    }
    if (
      this.form10List.DedNsaudiShare == "" ||
      this.form10List.DedNsaudiShare == undefined
    ) {
      this.form10List.DedNsaudiShare = "0.00";
    } else {
      this.form10List.DedNsaudiShare = (+this.form10List
        .DedNsaudiShare).toFixed(2);
    }
    if (
      this.form10List.DedInkindDiv == "" ||
      this.form10List.DedInkindDiv == undefined
    ) {
      this.form10List.DedInkindDiv = "0.00";
    } else {
      this.form10List.DedInkindDiv = (+this.form10List.DedInkindDiv).toFixed(2);
    }
    if (
      this.form10List.DedGainsInvscmp == "" ||
      this.form10List.DedGainsInvscmp == undefined
    ) {
      this.form10List.DedGainsInvscmp = "0.00";
    } else {
      this.form10List.DedGainsInvscmp = (+this.form10List
        .DedGainsInvscmp).toFixed(2);
    }
    if (
      this.form10List.DedCayy25 == "" ||
      this.form10List.DedCayy25 == undefined
    ) {
      this.form10List.DedCayy25 = "0.00";
    } else {
      this.form10List.DedCayy25 = (+this.form10List.DedCayy25).toFixed(2);
    }
    this.InvcmplossAmtTotal = parseFloat(this.form10List.InvcmplossAmt).toFixed(
      2
    );
    // Deductions
    this.form10List.DedNsaudiShare = parseFloat(
      this.form10List.DedNsaudiShare
    ).toFixed(2);
    this.form10List.DedInkindDiv = parseFloat(
      this.form10List.DedInkindDiv
    ).toFixed(2);
    this.form10List.DedGainsInvscmp = parseFloat(
      this.form10List.DedGainsInvscmp
    ).toFixed(2);

    this.DeductionTotal = (
      parseFloat(this.form10List.DedNsaudiShare) +
      parseFloat(this.form10List.DedInkindDiv) +
      parseFloat(this.form10List.DedCayy25) +
      parseFloat(this.form10List.DedGainsInvscmp)
    ).toFixed(2);

    //Taxable amount
    if (
      this.form10List.TaxprofitadAmt == "" ||
      this.form10List.TaxprofitadAmt == undefined
    ) {
      this.form10List.TaxprofitadAmt = "0.00";
    } else {
      this.form10List.TaxprofitadAmt = (+this.form10List
        .TaxprofitadAmt).toFixed(2);
    }
    if (
      this.form10List.InvcmplossAmtTotal == "" ||
      this.form10List.InvcmplossAmtTotal == undefined
    ) {
      this.form10List.InvcmplossAmtTotal = "0.00";
    } else {
      this.form10List.InvcmplossAmtTotal = (+this.form10List
        .InvcmplossAmtTotal).toFixed(2);
    }
    if (
      this.form10List.DeductionTotal == "" ||
      this.form10List.DeductionTotal == undefined
    ) {
      this.form10List.DeductionTotal = "0.00";
    } else {
      this.form10List.DeductionTotal = (+this.form10List
        .DeductionTotal).toFixed(2);
    }
    if (
      this.form10List.DedTaxamtInsu == "" ||
      this.form10List.DedTaxamtInsu == undefined
    ) {
      this.form10List.DedTaxamtInsu = "0.00";
    } else {
      this.form10List.DedTaxamtInsu = (+this.form10List.DedTaxamtInsu).toFixed(
        2
      );
    }
    this.TaxableTotalAmount = (
      parseFloat(this.form10List.TaxprofitadAmt) +
      parseFloat(this.InvcmplossAmtTotal) -
      parseFloat(this.DeductionTotal)
    ).toFixed(2);

    // Income Tax on the share of non-Saudi's
    this.form10List.DedTaxable = this.TaxableTotalAmount;
    this.IncomeTaxShareTotal = (
      (parseFloat(this.form10List.DedTaxable) +
        parseFloat(this.form10List.DedTaxamtInsu)) *
      0.2
    ).toFixed(2);

    // Total Income Tax Payable

    this.IncomeTaxPayableTotal = this.IncomeTaxShareTotal;

    // CARRIED FORWARD LOSSES CIT

    this.form10List.CittotaddAmt = this.InvcmplossAmtTotal;
    this.form10List.DedTotal = this.DeductionTotal;

    this.form10List.DedItaxNsaudi = this.IncomeTaxShareTotal;
    this.form10List.DedTotTaxPay = this.IncomeTaxPayableTotal;
  }
  DeleteTransaction(pi) {
    const control = this.RelatedPartiesYesForm.get(
      "RelatedPartiesSet"
    ) as FormArray;
    control.removeAt(pi);
  }
  DeletePartyTransaction(pi) {
    const control = this.TransactionDetailsForm.get(
      "PartyTransactionsSet"
    ) as FormArray;
    control.removeAt(pi);
  }
  DeleteShareholdersSet(pi) {
    const control = this.ShareHoldersDetailsForm.get(
      "ShareholdersSet"
    ) as FormArray;
    control.removeAt(pi);
  }
  DeleteRowD1(pi) {
    const control = this.taxbaseD1Form.get("TaxBaseD1") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowD1();
    }
  }
  DeleteRowD2(pi) {
    const control = this.taxbaseD2Form.get("TaxBaseD2") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowD2();
    }
  }
  AddShareholdersSet() {
    return this.fb.group({
      ShareHoldersName: [null, Validators.required],
      Jurisdiction: [null, Validators.required],
      OwnerShipPercentage: [null, Validators.required],
    });
  }
  AddRelatedPartiesRow() {
    let PartiesRow = this.AddRelatedPartiesSet();
    this.RelatedPartiesSet.push(PartiesRow);
  }
  AddShareholdersSetRow() {
    let shareholderSetRow = this.AddShareholdersSet();
    this.ShareholdersSet.push(shareholderSetRow);
  }
  AddTransactionRow() {
    let transactionRow = this.AddPartyTransactions();
    this.PartyTransactionsSet.push(transactionRow);
  }
  AddPartyTransactions() {
    return this.fb.group({
      Transaction: [null, Validators.required],
      Description: [null, Validators.required],
      NameOfRelatedParty: [null, Validators.required],
      Jurisdiction: [null, Validators.required],
      TransactionNature: [null, Validators.required],
      Amount: [null, Validators.required],
      TPMethod: [null, Validators.required],
    });
  }
  AddRowD1() {
    let type = this.TaxBaseD1Form();
    this.TaxBaseD1.push(type);
  }
  AddRowD2() {
    let type = this.TaxBaseD2Form();
    this.TaxBaseD2.push(type);
  }
  TaxBaseD1Form() {
    return this.fb.group({
      CitCarryLoss: ["0.00", [Validators.required, Validators.min(0)]],
      AdjDeclProfit: ["0.00", [Validators.required, Validators.min(0)]],
      LossDedCyr: ["0.00", [Validators.required, Validators.min(0)]],
      EndYrbal: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  TaxBaseD2Form() {
    return this.fb.group({
      TotInsuPre: ["0.00", [Validators.required, Validators.min(0)]],
      CanInsuPre: ["0.00", [Validators.required, Validators.min(0)]],
      LocReisnuPremi: ["0.00", [Validators.required, Validators.min(0)]],
      ExtReisnuPremi: ["0.00", [Validators.required, Validators.min(0)]],
      NetPremEar: ["0.00", [Validators.required, Validators.min(0)]],

      ResCompPyr: ["0.00", [Validators.required, Validators.min(0)]],
      ResCompExiPyr: ["0.00", [Validators.required, Validators.min(0)]],
      TotResePyr: ["0.00", [Validators.required, Validators.min(0)]],
      LocGeneIns: ["0.00", [Validators.required, Validators.min(0)]],
      GloGeneIns: ["0.00", [Validators.required, Validators.min(0)]],
      GloInveIncome: ["0.00", [Validators.required, Validators.min(0)]],
      NonInvsnuReven: ["0.00", [Validators.required, Validators.min(0)]],
      PerOthsnuIncom: ["0.00", [Validators.required, Validators.min(0)]],
      Total1: ["0.00", [Validators.required, Validators.min(0)]],
      ComPaidDanger: ["0.00", [Validators.required, Validators.min(0)]],
      AmtCovReinsurance: ["0.00", [Validators.required, Validators.min(0)]],
      NetCompaPaid: ["0.00", [Validators.required, Validators.min(0)]],
      UnprePaidCyr: ["0.00", [Validators.required, Validators.min(0)]],
      ExistingRevCyr: ["0.00", [Validators.required, Validators.min(0)]],
      NonlegalDed: ["0.00", [Validators.required, Validators.min(0)]],
      PreEstabilisment: ["0.00", [Validators.required, Validators.min(0)]],
      LegalDedPerEst: ["0.00", [Validators.required, Validators.min(0)]],
      LocGenInsPre: ["0.00", [Validators.required, Validators.min(0)]],
      GlobGenInsPre: ["0.00", [Validators.required, Validators.min(0)]],
      GenAdminExp: ["0.00", [Validators.required, Validators.min(0)]],
      PreEstShareMain: ["0.00", [Validators.required, Validators.min(0)]],
      Total2: ["0.00", [Validators.required, Validators.min(0)]],
      Total1Total2: ["0.00", [Validators.required, Validators.min(0)]],
      LocGenInsPreWri: ["0.00", [Validators.required, Validators.min(0)]],
      GlobGenInsPreWri: ["0.00", [Validators.required, Validators.min(0)]],
      GlobNetProfitTax: ["0.00", [Validators.required, Validators.min(0)]],
      TaxBase: ["0.00", [Validators.required, Validators.min(0)]],
      TaxableInsuActivity: ["0.00", [Validators.required, Validators.min(0)]],
      LocSavPerWriteu: ["0.00", [Validators.required, Validators.min(0)]],
      SavingGlobalInsuu: ["0.00", [Validators.required, Validators.min(0)]],
      GlobalInvestIncome: ["0.00", [Validators.required, Validators.min(0)]],
      PerEstableshIncome: ["0.00", [Validators.required, Validators.min(0)]],
      LocSavPerWrite: ["0.00", [Validators.required, Validators.min(0)]],
      SavingGlobalInsu: ["0.00", [Validators.required, Validators.min(0)]],
      GenAdminMainCenter: ["0.00", [Validators.required, Validators.min(0)]],
      PerEstableshMainCen: ["0.00", [Validators.required, Validators.min(0)]],
      LocSavPerWritet: ["0.00", [Validators.required, Validators.min(0)]],
      SavingGlobalInsuv: ["0.00", [Validators.required, Validators.min(0)]],
      GenAdminMainCenterv: ["0.00", [Validators.required, Validators.min(0)]],
      PerEstableshMainCenv: ["0.00", [Validators.required, Validators.min(0)]],
      TotalTaxPerEsta: ["0.00", [Validators.required, Validators.min(0)]],
      RevenuLoan: ["0.00", [Validators.required, Validators.min(0)]],
      RealizedGains: ["0.00", [Validators.required, Validators.min(0)]],
      TaxbasedActivity: ["0.00", [Validators.required, Validators.min(0)]],
      PerEstaTax: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
  GlobalNumberAllow(event) {
    var rgx = /^\d{0,13}(\.\d{0,2})?$/;
    if (event.keyCode == 8) {
      return true;
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }
  CitCarriedForwardCal(i) {
    if (
      this.TaxBaseD1.controls[i].value.AdjDeclProfit == "" ||
      this.TaxBaseD1.controls[i].value.AdjDeclProfit == undefined
    ) {
      this.TaxBaseD1.controls[i].patchValue({ AdjDeclProfit: "0.00" });
    } else {
      this.TaxBaseD1.controls[i].patchValue({
        AdjDeclProfit: (+this.TaxBaseD1.controls[i].value
          .AdjDeclProfit).toFixed(2),
      });
    }
    if (
      this.TaxBaseD1.controls[i].value.CitCarryLoss == "" ||
      this.TaxBaseD1.controls[i].value.CitCarryLoss == undefined
    ) {
      this.TaxBaseD1.controls[i].patchValue({ CitCarryLoss: "0.00" });
    } else {
      this.TaxBaseD1.controls[i].patchValue({
        CitCarryLoss: (+this.TaxBaseD1.controls[i].value.CitCarryLoss).toFixed(
          2
        ),
      });
    }
    let c1 = parseFloat(this.TaxBaseD1.controls[i].value.AdjDeclProfit) * 0.25;
    if (c1 < parseFloat(this.TaxBaseD1.controls[i].value.CitCarryLoss)) {
      this.TaxBaseD1.controls[i].patchValue({ LossDedCyr: c1.toFixed(2) });
    } else {
      this.TaxBaseD1.controls[i].patchValue({
        LossDedCyr: (+this.TaxBaseD1.controls[i].value.CitCarryLoss).toFixed(2),
      });
    }
    let c2 =
      parseFloat(this.TaxBaseD1.controls[i].value.CitCarryLoss) -
      parseFloat(this.TaxBaseD1.controls[i].value.LossDedCyr);
    this.TaxBaseD1.controls[i].patchValue({ EndYrbal: c2.toFixed(2) });
  }
  SaveTaxbaseD1FormResult() {
    this.form10List.DedCayy25 = (+this.TaxBaseD1.controls[0].value
      .LossDedCyr).toFixed(2);
    this.taxbaseD1Form.value.Schedule = true;
    this.form10List.RCarryAdj = "X";
    this.form10List.Item1017Set["results"] = [];
    for (let i = 0; i < this.TaxBaseD1.controls.length; i++) {
      this.form10List.Item1017Set["results"].push({});
      this.form10List.Item1017Set["results"][i][
        "CitCarryLoss"
      ] = this.TaxBaseD1.controls[i].value.CitCarryLoss;
      this.form10List.Item1017Set["results"][i][
        "AdjDeclProfit"
      ] = this.TaxBaseD1.controls[i].value.AdjDeclProfit;
      this.form10List.Item1017Set["results"][i][
        "LossDedCyr"
      ] = this.TaxBaseD1.controls[i].value.LossDedCyr;
      this.form10List.Item1017Set["results"][i]["EndYrbal"] = (+this.TaxBaseD1
        .controls[i].value.EndYrbal).toFixed(2);
      //this.form10List.Item1017Set["results"][i]["FormGuid"] = fbguid5;
      this.form10List.Item1017Set["results"][i]["LineNo"] = i + 1;
    }
    this.SaveForm();
    jQuery("#CFcit").modal("hide");
    this.clsePopup();
  }
  SaveTaxbaseD2FormResult() {
    this.form10List.DedTaxamtInsu = this.TaxBaseD2.controls[0].value.PerEstaTax;
    this.taxbaseD2Form.value.Schedule = true;
    this.form10List.RTaxamt = "X";
    this.form10List.Item1018Set["results"] = [];
    for (let i = 0; i < this.TaxBaseD2.controls.length; i++) {
      this.form10List.Item1018Set["results"].push({});
      this.form10List.Item1018Set["results"][i][
        "TotInsuPre"
      ] = this.TaxBaseD2.controls[i].value.TotInsuPre;
      this.form10List.Item1018Set["results"][i][
        "CanInsuPre"
      ] = this.TaxBaseD2.controls[i].value.CanInsuPre;
      this.form10List.Item1018Set["results"][i][
        "LocReisnuPremi"
      ] = this.TaxBaseD2.controls[i].value.LocReisnuPremi;
      this.form10List.Item1018Set["results"][i][
        "ExtReisnuPremi"
      ] = this.TaxBaseD2.controls[i].value.ExtReisnuPremi;
      this.form10List.Item1018Set["results"][i][
        "NetPremEar"
      ] = this.TaxBaseD2.controls[i].value.NetPremEar;
      this.form10List.Item1018Set["results"][i][
        "ResCompPyr"
      ] = this.TaxBaseD2.controls[i].value.ResCompPyr;
      this.form10List.Item1018Set["results"][i][
        "ResCompExiPyr"
      ] = this.TaxBaseD2.controls[i].value.ResCompExiPyr;
      this.form10List.Item1018Set["results"][i][
        "TotResePyr"
      ] = this.TaxBaseD2.controls[i].value.TotResePyr;
      this.form10List.Item1018Set["results"][i][
        "LocGeneIns"
      ] = this.TaxBaseD2.controls[i].value.LocGeneIns;
      this.form10List.Item1018Set["results"][i][
        "GloGeneIns"
      ] = this.TaxBaseD2.controls[i].value.GloGeneIns;
      this.form10List.Item1018Set["results"][i][
        "GloInveIncome"
      ] = this.TaxBaseD2.controls[i].value.GloInveIncome;
      this.form10List.Item1018Set["results"][i][
        "NonInvsnuReven"
      ] = this.TaxBaseD2.controls[i].value.NonInvsnuReven;
      this.form10List.Item1018Set["results"][i][
        "PerOthsnuIncom"
      ] = this.TaxBaseD2.controls[i].value.PerOthsnuIncom;
      this.form10List.Item1018Set["results"][i][
        "Total1"
      ] = this.TaxBaseD2.controls[i].value.Total1;
      this.form10List.Item1018Set["results"][i][
        "ComPaidDanger"
      ] = this.TaxBaseD2.controls[i].value.ComPaidDanger;
      this.form10List.Item1018Set["results"][i][
        "AmtCovReinsurance"
      ] = this.TaxBaseD2.controls[i].value.AmtCovReinsurance;
      this.form10List.Item1018Set["results"][i][
        "NetCompaPaid"
      ] = this.TaxBaseD2.controls[i].value.NetCompaPaid;
      this.form10List.Item1018Set["results"][i][
        "UnprePaidCyr"
      ] = this.TaxBaseD2.controls[i].value.UnprePaidCyr;
      this.form10List.Item1018Set["results"][i][
        "ExistingRevCyr"
      ] = this.TaxBaseD2.controls[i].value.ExistingRevCyr;
      this.form10List.Item1018Set["results"][i][
        "NonlegalDed"
      ] = this.TaxBaseD2.controls[i].value.NonlegalDed;
      this.form10List.Item1018Set["results"][i][
        "GenAdminExp"
      ] = this.TaxBaseD2.controls[i].value.GenAdminExp;
      this.form10List.Item1018Set["results"][i][
        "PreEstShareMain"
      ] = this.TaxBaseD2.controls[i].value.PreEstShareMain;
      this.form10List.Item1018Set["results"][i][
        "Total2"
      ] = this.TaxBaseD2.controls[i].value.Total2;
      this.form10List.Item1018Set["results"][i][
        "Total1Total2"
      ] = this.TaxBaseD2.controls[i].value.Total1Total2;
      this.form10List.Item1018Set["results"][i][
        "LocGenInsPreWri"
      ] = this.TaxBaseD2.controls[i].value.LocGenInsPreWri;
      this.form10List.Item1018Set["results"][i][
        "LocGenInsPre"
      ] = this.TaxBaseD2.controls[i].value.LocGenInsPre;
      this.form10List.Item1018Set["results"][i][
        "GlobGenInsPreWri"
      ] = this.TaxBaseD2.controls[i].value.GlobGenInsPreWri;
      this.form10List.Item1018Set["results"][i][
        "GlobGenInsPre"
      ] = this.TaxBaseD2.controls[i].value.GlobGenInsPre;
      this.form10List.Item1018Set["results"][i][
        "PreEstabilisment"
      ] = this.TaxBaseD2.controls[i].value.PreEstabilisment;

      this.form10List.Item1018Set["results"][i][
        "GlobNetProfitTax"
      ] = this.TaxBaseD2.controls[i].value.GlobNetProfitTax;
      this.form10List.Item1018Set["results"][i][
        "TaxBase"
      ] = this.TaxBaseD2.controls[i].value.TaxBase;
      this.form10List.Item1018Set["results"][i][
        "TaxableInsuActivity"
      ] = this.TaxBaseD2.controls[i].value.TaxableInsuActivity;
      this.form10List.Item1018Set["results"][i][
        "LocSavPerWriteu"
      ] = this.TaxBaseD2.controls[i].value.LocSavPerWriteu;
      this.form10List.Item1018Set["results"][i][
        "SavingGlobalInsuu"
      ] = this.TaxBaseD2.controls[i].value.SavingGlobalInsuu;
      this.form10List.Item1018Set["results"][i][
        "GlobalInvestIncome"
      ] = this.TaxBaseD2.controls[i].value.GlobalInvestIncome;
      this.form10List.Item1018Set["results"][i][
        "PerEstableshIncome"
      ] = this.TaxBaseD2.controls[i].value.PerEstableshIncome;
      this.form10List.Item1018Set["results"][i][
        "LocSavPerWrite"
      ] = this.TaxBaseD2.controls[i].value.LocSavPerWrite;
      this.form10List.Item1018Set["results"][i][
        "SavingGlobalInsu"
      ] = this.TaxBaseD2.controls[i].value.SavingGlobalInsu;
      this.form10List.Item1018Set["results"][i][
        "GenAdminMainCenter"
      ] = this.TaxBaseD2.controls[i].value.GenAdminMainCenter;
      this.form10List.Item1018Set["results"][i][
        "PerEstableshMainCen"
      ] = this.TaxBaseD2.controls[i].value.PerEstableshMainCen;
      this.form10List.Item1018Set["results"][i][
        "LocSavPerWritet"
      ] = this.TaxBaseD2.controls[i].value.LocSavPerWritet;
      this.form10List.Item1018Set["results"][i][
        "SavingGlobalInsuv"
      ] = this.TaxBaseD2.controls[i].value.SavingGlobalInsuv;
      this.form10List.Item1018Set["results"][i][
        "GenAdminMainCenterv"
      ] = this.TaxBaseD2.controls[i].value.GenAdminMainCenterv;
      this.form10List.Item1018Set["results"][i][
        "PerEstableshMainCenv"
      ] = this.TaxBaseD2.controls[i].value.PerEstableshMainCenv;
      this.form10List.Item1018Set["results"][i][
        "TotalTaxPerEsta"
      ] = this.TaxBaseD2.controls[i].value.TotalTaxPerEsta;
      this.form10List.Item1018Set["results"][i][
        "RevenuLoan"
      ] = this.TaxBaseD2.controls[i].value.RevenuLoan;
      this.form10List.Item1018Set["results"][i][
        "RealizedGains"
      ] = this.TaxBaseD2.controls[i].value.RealizedGains;
      this.form10List.Item1018Set["results"][i][
        "TaxbasedActivity"
      ] = this.TaxBaseD2.controls[i].value.TaxbasedActivity;
      this.form10List.Item1018Set["results"][i][
        "PerEstaTax"
      ] = this.TaxBaseD2.controls[i].value.PerEstaTax;
      //this.form10List.Item1018Set["results"][i]["FormGuid"] = fbguid6;
      this.form10List.Item1018Set["results"][i]["LineNo"] = i + 1;
    }
    this.SaveForm();
    jQuery("#CFtaxamount").modal("hide");
    this.clsePopup();
  }
  //  Re-insurance
  ReinsuranceCal(i) {
    // Net premiums earned and vested
    // this.TaxBaseD2.controls[i].setValue({
    //   "TotInsuPre" : (+this.TaxBaseD2.controls[i].value.TotInsuPre).toFixed(2),
    //   "CanInsuPre" : (+this.TaxBaseD2.controls[i].value.CanInsuPre).toFixed(2),
    //   "LocReisnuPremi" : (+this.TaxBaseD2.controls[i].value.LocReisnuPremi).toFixed(2),
    //   "ExtReisnuPremi" : (+this.TaxBaseD2.controls[i].value.ExtReisnuPremi).toFixed(2)
    // });
    if (
      this.TaxBaseD2.controls[i].value.TotInsuPre == "" ||
      this.TaxBaseD2.controls[i].value.TotInsuPre == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ TotInsuPre: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        TotInsuPre: (+this.TaxBaseD2.controls[i].value.TotInsuPre).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.CanInsuPre == "" ||
      this.TaxBaseD2.controls[i].value.CanInsuPre == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ CanInsuPre: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        CanInsuPre: (+this.TaxBaseD2.controls[i].value.CanInsuPre).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.LocReisnuPremi == "" ||
      this.TaxBaseD2.controls[i].value.LocReisnuPremi == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocReisnuPremi: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocReisnuPremi: (+this.TaxBaseD2.controls[i].value
          .LocReisnuPremi).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.ExtReisnuPremi == "" ||
      this.TaxBaseD2.controls[i].value.ExtReisnuPremi == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ ExtReisnuPremi: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        ExtReisnuPremi: (+this.TaxBaseD2.controls[i].value
          .ExtReisnuPremi).toFixed(2),
      });
    }
    let NetPremEar = (
      parseFloat(this.TaxBaseD2.controls[i].value.TotInsuPre) -
      parseFloat(this.TaxBaseD2.controls[i].value.CanInsuPre) -
      parseFloat(this.TaxBaseD2.controls[i].value.LocReisnuPremi) -
      parseFloat(this.TaxBaseD2.controls[i].value.ExtReisnuPremi)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ NetPremEar: NetPremEar });

    if (
      this.TaxBaseD2.controls[i].value.ResCompPyr == "" ||
      this.TaxBaseD2.controls[i].value.ResCompPyr == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ ResCompPyr: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        ResCompPyr: (+this.TaxBaseD2.controls[i].value.ResCompPyr).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.ResCompExiPyr == "" ||
      this.TaxBaseD2.controls[i].value.ResCompExiPyr == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ ResCompExiPyr: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        ResCompExiPyr: (+this.TaxBaseD2.controls[i].value
          .ResCompExiPyr).toFixed(2),
      });
    }
    // Total reserves at the end of the previous year
    let TotResePyr = (
      parseFloat(this.TaxBaseD2.controls[i].value.ResCompPyr) +
      parseFloat(this.TaxBaseD2.controls[i].value.ResCompExiPyr)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ TotResePyr: TotResePyr });
    if (
      this.TaxBaseD2.controls[i].value.LocGeneIns == "" ||
      this.TaxBaseD2.controls[i].value.LocGeneIns == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocGeneIns: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocGeneIns: (+this.TaxBaseD2.controls[i].value.LocGeneIns).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GloGeneIns == "" ||
      this.TaxBaseD2.controls[i].value.GloGeneIns == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GloGeneIns: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GloGeneIns: (+this.TaxBaseD2.controls[i].value.GloGeneIns).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GloInveIncome == "" ||
      this.TaxBaseD2.controls[i].value.GloInveIncome == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GloInveIncome: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GloInveIncome: (+this.TaxBaseD2.controls[i].value
          .GloInveIncome).toFixed(2),
      });
    }
    // Investment revenue for non-resident companies
    let NonInvsnuReven = (
      (parseFloat(this.TaxBaseD2.controls[i].value.LocGeneIns) /
        parseFloat(this.TaxBaseD2.controls[i].value.GloGeneIns)) *
      parseFloat(this.TaxBaseD2.controls[i].value.GloInveIncome)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ NonInvsnuReven: NonInvsnuReven });
    if (NonInvsnuReven == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ NonInvsnuReven: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        NonInvsnuReven: (+this.TaxBaseD2.controls[i].value
          .NonInvsnuReven).toFixed(2),
      });
    }

    // Other income for the permanent establishment
    //this.Item1018Set[i].PerOthsnuIncom = parseFloat(this.Item1018Set[i].PerOthsnuIncom)
    // Total (ref1)
    // Tag (ref1) – is for internal identification only
    if (
      this.TaxBaseD2.controls[i].value.NetPremEar == "" ||
      this.TaxBaseD2.controls[i].value.NetPremEar == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ NetPremEar: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        NetPremEar: (+this.TaxBaseD2.controls[i].value.NetPremEar).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.TotResePyr == "" ||
      this.TaxBaseD2.controls[i].value.TotResePyr == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ TotResePyr: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        TotResePyr: (+this.TaxBaseD2.controls[i].value.TotResePyr).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.NonInvsnuReven == "" ||
      this.TaxBaseD2.controls[i].value.NonInvsnuReven == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ NonInvsnuReven: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        NonInvsnuReven: (+this.TaxBaseD2.controls[i].value
          .NonInvsnuReven).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.PerOthsnuIncom == "" ||
      this.TaxBaseD2.controls[i].value.PerOthsnuIncom == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ PerOthsnuIncom: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        PerOthsnuIncom: (+this.TaxBaseD2.controls[i].value
          .PerOthsnuIncom).toFixed(2),
      });
    }
    let Total1 = (
      parseFloat(this.TaxBaseD2.controls[i].value.NetPremEar) +
      parseFloat(this.TaxBaseD2.controls[i].value.TotResePyr) +
      parseFloat(this.TaxBaseD2.controls[i].value.NonInvsnuReven) +
      parseFloat(this.TaxBaseD2.controls[i].value.PerOthsnuIncom)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ Total1: Total1 });
    if (Total1 == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ Total1: "0.00" });
    }
    // Net compensation paid after exclusions covered by re-insurance
    if (
      this.TaxBaseD2.controls[i].value.ComPaidDanger == "" ||
      this.TaxBaseD2.controls[i].value.ComPaidDanger == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ ComPaidDanger: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        ComPaidDanger: (+this.TaxBaseD2.controls[i].value
          .ComPaidDanger).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.AmtCovReinsurance == "" ||
      this.TaxBaseD2.controls[i].value.AmtCovReinsurance == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ AmtCovReinsurance: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        AmtCovReinsurance: (+this.TaxBaseD2.controls[i].value
          .AmtCovReinsurance).toFixed(2),
      });
    }
    let NetCompaPaid = (
      parseFloat(this.TaxBaseD2.controls[i].value.ComPaidDanger) -
      parseFloat(this.TaxBaseD2.controls[i].value.AmtCovReinsurance)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ NetCompaPaid: NetCompaPaid });

    // Legal deducted permanent establishment expenses incurred in KSA
    if (
      this.TaxBaseD2.controls[i].value.NonlegalDed == "" ||
      this.TaxBaseD2.controls[i].value.NonlegalDed == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ NonlegalDed: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        NonlegalDed: (+this.TaxBaseD2.controls[i].value.NonlegalDed).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.PreEstabilisment == "" ||
      this.TaxBaseD2.controls[i].value.PreEstabilisment == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ PreEstabilisment: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        PreEstabilisment: (+this.TaxBaseD2.controls[i].value
          .PreEstabilisment).toFixed(2),
      });
    }
    let LegalDedPerEst = (
      parseFloat(this.TaxBaseD2.controls[i].value.NonlegalDed) -
      parseFloat(this.TaxBaseD2.controls[i].value.PreEstabilisment)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ LegalDedPerEst: LegalDedPerEst });

    // Permanent establishment share of the general and administrative expenses for the main Centre
    if (
      this.TaxBaseD2.controls[i].value.LocGenInsPre == "" ||
      this.TaxBaseD2.controls[i].value.LocGenInsPre == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocGenInsPre: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocGenInsPre: (+this.TaxBaseD2.controls[i].value.LocGenInsPre).toFixed(
          2
        ),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GlobGenInsPre == "" ||
      this.TaxBaseD2.controls[i].value.GlobGenInsPre == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GlobGenInsPre: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GlobGenInsPre: (+this.TaxBaseD2.controls[i].value
          .GlobGenInsPre).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GenAdminExp == "" ||
      this.TaxBaseD2.controls[i].value.GenAdminExp == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GenAdminExp: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GenAdminExp: (+this.TaxBaseD2.controls[i].value.GenAdminExp).toFixed(2),
      });
    }
    let PreEstShareMain = (
      (parseFloat(this.TaxBaseD2.controls[i].value.LocGenInsPre) /
        parseFloat(this.TaxBaseD2.controls[i].value.GlobGenInsPre)) *
      parseFloat(this.TaxBaseD2.controls[i].value.GenAdminExp)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ PreEstShareMain: PreEstShareMain });
    if (PreEstShareMain == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ PreEstShareMain: "0.00" });
    }

    // Total2
    if (
      this.TaxBaseD2.controls[i].value.NetCompaPaid == "" ||
      this.TaxBaseD2.controls[i].value.NetCompaPaid == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ NetCompaPaid: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        NetCompaPaid: (+this.TaxBaseD2.controls[i].value.NetCompaPaid).toFixed(
          2
        ),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.UnprePaidCyr == "" ||
      this.TaxBaseD2.controls[i].value.UnprePaidCyr == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ UnprePaidCyr: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        UnprePaidCyr: (+this.TaxBaseD2.controls[i].value.UnprePaidCyr).toFixed(
          2
        ),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.ExistingRevCyr == "" ||
      this.TaxBaseD2.controls[i].value.ExistingRevCyr == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ ExistingRevCyr: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        ExistingRevCyr: (+this.TaxBaseD2.controls[i].value
          .ExistingRevCyr).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.LegalDedPerEst == "" ||
      this.TaxBaseD2.controls[i].value.LegalDedPerEst == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LegalDedPerEst: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LegalDedPerEst: (+this.TaxBaseD2.controls[i].value
          .LegalDedPerEst).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.PreEstShareMain == "" ||
      this.TaxBaseD2.controls[i].value.PreEstShareMain == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ PreEstShareMain: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        PreEstShareMain: (+this.TaxBaseD2.controls[i].value
          .PreEstShareMain).toFixed(2),
      });
    }
    let Total2 = (
      parseFloat(this.TaxBaseD2.controls[i].value.NetCompaPaid) +
      parseFloat(this.TaxBaseD2.controls[i].value.UnprePaidCyr) +
      parseFloat(this.TaxBaseD2.controls[i].value.ExistingRevCyr) +
      parseFloat(this.TaxBaseD2.controls[i].value.LegalDedPerEst) +
      parseFloat(this.TaxBaseD2.controls[i].value.PreEstShareMain)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ Total2: Total2 });
    if (Total2 == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ Total2: "0.00" });
    }
    // Total1Total2
    let Total1Total2 = (
      parseFloat(this.TaxBaseD2.controls[i].value.Total1) +
      parseFloat(this.TaxBaseD2.controls[i].value.Total2)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ Total1Total2: Total1Total2 });

    // TaxBase
    if (
      this.TaxBaseD2.controls[i].value.LocGenInsPreWri == "" ||
      this.TaxBaseD2.controls[i].value.LocGenInsPreWri == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocGenInsPreWri: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocGenInsPreWri: (+this.TaxBaseD2.controls[i].value
          .LocGenInsPreWri).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GlobGenInsPreWri == "" ||
      this.TaxBaseD2.controls[i].value.GlobGenInsPreWri == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GlobGenInsPreWri: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GlobGenInsPreWri: (+this.TaxBaseD2.controls[i].value
          .GlobGenInsPreWri).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GlobNetProfitTax == "" ||
      this.TaxBaseD2.controls[i].value.GlobNetProfitTax == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GlobNetProfitTax: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GlobNetProfitTax: (+this.TaxBaseD2.controls[i].value
          .GlobNetProfitTax).toFixed(2),
      });
    }
    let TaxBase = (
      (parseFloat(this.TaxBaseD2.controls[i].value.LocGenInsPreWri) /
        parseFloat(this.TaxBaseD2.controls[i].value.GlobGenInsPreWri)) *
      parseFloat(this.TaxBaseD2.controls[i].value.GlobNetProfitTax)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ TaxBase: TaxBase });
    if (TaxBase == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ TaxBase: "0.00" });
    }
    // The taxable for general insurance activity for the permanent establishment
    let TaxableInsuActivity = 0;
    if (
      parseFloat(this.TaxBaseD2.controls[i].value.Total1Total2) >
      parseFloat(this.TaxBaseD2.controls[i].value.TaxBase)
    ) {
      this.TaxBaseD2.controls[i].patchValue({
        TaxableInsuActivity: this.TaxBaseD2.controls[i].value.Total1Total2,
      });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        TaxableInsuActivity: this.TaxBaseD2.controls[i].value.TaxBase,
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.LocSavPerWriteu == "" ||
      this.TaxBaseD2.controls[i].value.LocSavPerWriteu == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocSavPerWriteu: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocSavPerWriteu: (+this.TaxBaseD2.controls[i].value
          .LocSavPerWriteu).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.SavingGlobalInsuu == "" ||
      this.TaxBaseD2.controls[i].value.SavingGlobalInsuu == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ SavingGlobalInsuu: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        SavingGlobalInsuu: (+this.TaxBaseD2.controls[i].value
          .SavingGlobalInsuu).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GlobalInvestIncome == "" ||
      this.TaxBaseD2.controls[i].value.GlobalInvestIncome == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GlobalInvestIncome: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GlobalInvestIncome: (+this.TaxBaseD2.controls[i].value
          .GlobalInvestIncome).toFixed(2),
      });
    }
    // Permanent establishment share of global management expenses related to investment income
    let PerEstableshIncome = (
      (parseFloat(this.TaxBaseD2.controls[i].value.LocSavPerWriteu) /
        parseFloat(this.TaxBaseD2.controls[i].value.SavingGlobalInsuu)) *
      parseFloat(this.TaxBaseD2.controls[i].value.GlobalInvestIncome)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({
      PerEstableshIncome: PerEstableshIncome,
    });
    if (PerEstableshIncome == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ PerEstableshIncome: "0.00" });
    }
    if (
      this.TaxBaseD2.controls[i].value.LocSavPerWrite == "" ||
      this.TaxBaseD2.controls[i].value.LocSavPerWrite == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocSavPerWrite: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocSavPerWrite: (+this.TaxBaseD2.controls[i].value
          .LocSavPerWrite).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.SavingGlobalInsu == "" ||
      this.TaxBaseD2.controls[i].value.SavingGlobalInsu == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ SavingGlobalInsu: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        SavingGlobalInsu: (+this.TaxBaseD2.controls[i].value
          .SavingGlobalInsu).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GenAdminMainCenter == "" ||
      this.TaxBaseD2.controls[i].value.GenAdminMainCenter == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GenAdminMainCenter: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GenAdminMainCenter: (+this.TaxBaseD2.controls[i].value
          .GenAdminMainCenter).toFixed(2),
      });
    }
    // Permanent establishment share of general and administrative expenses for the main Centre
    let PerEstableshMainCen = (
      (parseFloat(this.TaxBaseD2.controls[i].value.LocSavPerWriteu) /
        parseFloat(this.TaxBaseD2.controls[i].value.SavingGlobalInsuu)) *
      parseFloat(this.TaxBaseD2.controls[i].value.GenAdminMainCenter)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({
      PerEstableshMainCen: PerEstableshMainCen,
    });
    if (PerEstableshMainCen == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ PerEstableshMainCen: "0.00" });
    }
    if (
      this.TaxBaseD2.controls[i].value.LocSavPerWritet == "" ||
      this.TaxBaseD2.controls[i].value.LocSavPerWritet == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ LocSavPerWritet: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        LocSavPerWritet: (+this.TaxBaseD2.controls[i].value
          .LocSavPerWritet).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.SavingGlobalInsuv == "" ||
      this.TaxBaseD2.controls[i].value.SavingGlobalInsuv == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ SavingGlobalInsuv: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        SavingGlobalInsuv: (+this.TaxBaseD2.controls[i].value
          .SavingGlobalInsuv).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.GenAdminMainCenterv == "" ||
      this.TaxBaseD2.controls[i].value.GenAdminMainCenterv == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ GenAdminMainCenterv: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        GenAdminMainCenterv: (+this.TaxBaseD2.controls[i].value
          .GenAdminMainCenterv).toFixed(2),
      });
    }
    // Permanent establishment share of general and administrative expenses for the main Centre (ref2)
    let PerEstableshMainCenv = (
      (parseFloat(this.TaxBaseD2.controls[i].value.LocSavPerWritet) /
        parseFloat(this.TaxBaseD2.controls[i].value.SavingGlobalInsuv)) *
      parseFloat(this.TaxBaseD2.controls[i].value.GenAdminMainCenterv)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({
      PerEstableshMainCenv: PerEstableshMainCenv,
    });
    if (PerEstableshMainCenv == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ PerEstableshMainCenv: "0.00" });
    }
    // Total of taxable for the permanent establishment on the savings insurance activity
    let TotalTaxPerEsta = (
      parseFloat(this.TaxBaseD2.controls[i].value.PerEstableshIncome) -
      parseFloat(this.TaxBaseD2.controls[i].value.PerEstableshMainCen) -
      parseFloat(this.TaxBaseD2.controls[i].value.PerEstableshMainCenv)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ TotalTaxPerEsta: TotalTaxPerEsta });
    if (TotalTaxPerEsta == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ TotalTaxPerEsta: "0.00" });
    }
    // 49 Tax base of the activity of the insurance savings permanent establishment
    if (
      this.TaxBaseD2.controls[i].value.RevenuLoan == "" ||
      this.TaxBaseD2.controls[i].value.RevenuLoan == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ RevenuLoan: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        RevenuLoan: (+this.TaxBaseD2.controls[i].value.RevenuLoan).toFixed(2),
      });
    }
    if (
      this.TaxBaseD2.controls[i].value.RealizedGains == "" ||
      this.TaxBaseD2.controls[i].value.RealizedGains == undefined
    ) {
      this.TaxBaseD2.controls[i].patchValue({ RealizedGains: "0.00" });
    } else {
      this.TaxBaseD2.controls[i].patchValue({
        RealizedGains: (+this.TaxBaseD2.controls[i].value
          .RealizedGains).toFixed(2),
      });
    }
    let TaxbasedActivity = (
      parseFloat(this.TaxBaseD2.controls[i].value.TotalTaxPerEsta) +
      parseFloat(this.TaxBaseD2.controls[i].value.RevenuLoan) -
      parseFloat(this.TaxBaseD2.controls[i].value.RealizedGains)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({
      TaxbasedActivity: TaxbasedActivity,
    });
    if (TaxbasedActivity == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ TaxbasedActivity: "0.00" });
    }
    //purna the taxable of the est
    let PerEstaTax = (
      parseFloat(this.TaxBaseD2.controls[i].value.TaxableInsuActivity) +
      parseFloat(this.TaxBaseD2.controls[i].value.TaxbasedActivity)
    ).toFixed(2);
    this.TaxBaseD2.controls[i].patchValue({ PerEstaTax: PerEstaTax });
    if (PerEstaTax == "NaN") {
      this.TaxBaseD2.controls[i].patchValue({ PerEstaTax: "0.00" });
    }
    //this.form10List.DedTaxamtInsu = this.TaxBaseD2.controls[0].value.PerEstaTax;
  }
  //saraswathi end
  //purna start
  DeleteRowZCD1(pi) {
    const control = this.zcD1Form.get("ZCD1") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowZCD1();
    }
    this.CalZCIIL();
  }
  DeleteRowZCD2(pi) {
    const control = this.zcD2Form.get("ZCD2") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowZCD2();
    }
  }
  DeleteRowZCD3(pi) {
    const control = this.zcD3Form.get("ZCD3") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowZCD3();
    }
    for (let i = 0; i < this.ZCD3.controls.length; i++) {
      this.calTotalZDSell(i);
    }
  }
  DeleteRowItem1001Set(pi) {
    const control = this.Item1001SetFormFG.get("Item1001SetForm") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowItem1001Set();
    }
    this.RevenuefromContractscalc();
  }
  DeleteRowItem1002Set(pi) {
    const control = this.Item1002SetFormFG.get("Item1002SetForm") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowItem1002Set();
    }
  }
  DeleteRowItem1004Set(pi) {
    const control = this.Item1004SetFormFG.get("Item1004SetForm") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowItem1004Set();
    }
    this.SubContractorTotalCal();
  }
  DeleteRowItem1006Set(pi) {
    const control = this.Item1006SetFormFG.get("Item1006SetForm") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowItem1006Set();
    }
    this.otherExpenses();
  }
  DeleteRowItem1013Set(pi) {
    const control = this.Item1013SetFormFG.get("Item1013SetForm") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowItem1013Set();
    }
    this.machinarycalc();
  }
  DeleteRowItem1019Set(pi) {
    const control = this.Item1019SetFormFG.get("Item1019SetForm") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowItem1019Set();
    }
    this.RoyaltiesTechConsultProfCal();
  }
  DeleteRowZCD4(pi) {
    const control = this.zcD4Form.get("ZCD4") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowZCD4();
    }
    this.calCellTotalOD();
  }
  DeleteRowZCA2(pi) {
    const control = this.zcA2Form.get("ZCA2") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowZCA2();
    }
    for (let i = 0; i < this.ZCA2.controls.length; i++) {
      this.CalcZCA2(i);
    }
  }
  DeleteRowZCA3(pi) {
    const control = this.zcA3Form.get("ZCA3") as FormArray;
    control.removeAt(pi);
    if (pi == 0) {
      this.AddRowZCA3();
    }
    this.calCellTotalOA();
  }
  AddRelatedPartiesSet() {
    return this.fb.group({
      TransactionDescription: [null, Validators.required],
      CounterParty: [null, Validators.required],
      Jurisdiction: [null, Validators.required],
    });
  }
  AddRowZCA2() {
    let type = this.ZCA2Form();
    this.ZCA2.push(type);
  }
  AddRowZCA3() {
    let type = this.ZCA3Form();
    this.ZCA3.push(type);
  }
  AddRowZCD1() {
    let type = this.ZCD1Form();
    this.ZCD1.push(type);
  }
  AddRowZCD2() {
    let type = this.ZCD2Form();
    this.ZCD2.push(type);
  }
  AddRowZCD3() {
    let type = this.ZCD3Form();
    this.ZCD3.push(type);
  }
  AddRowItem1001Set() {
    let type = this.Item1001SetFormM();
    this.Item1001SetForm.push(type);
  }
  AddRowItem1002Set() {
    let type = this.Item1002SetFormM();
    this.Item1002SetForm.push(type);
  }
  AddRowItem1004Set() {
    let type = this.Item1004SetFormM();
    this.Item1004SetForm.push(type);
  }
  AddRowItem1006Set() {
    let type = this.Item1006SetFormM();
    this.Item1006SetForm.push(type);
  }
  AddRowItem1013Set() {
    let type = this.Item1013SetFormM();
    this.Item1013SetForm.push(type);
  }
  AddRowItem1019Set() {
    let type = this.Item1019SetFormM();
    this.Item1019SetForm.push(type);
  }
  AddRowZCD4() {
    let type = this.ZCD4Form();
    this.ZCD4.push(type);
  }
  ZCA2Form() {
    return this.fb.group({
      LenderName: ["", [Validators.required, Validators.maxLength(100)]],
      LocalFore: ["", [Validators.required]],
      BalBegPeriod: ["0.00", [Validators.required, Validators.min(0)]],
      AmtClrCyr: ["0.00", [Validators.required, Validators.min(0)]],
      AddLoanCyr: ["0.00", [Validators.required, Validators.min(0)]],
      BalEndPeriod: ["0.00", [Validators.required, Validators.min(0)]],
      UtiDedItem: ["0.00", [Validators.required, Validators.min(0)]],
      LoanBalance: ["0.00", [Validators.required, Validators.min(0)]],
      LoanStartDt: ["", [Validators.required, Validators.min(0)]],
      LoanClearDt: ["", [Validators.required, Validators.min(0)]],
      LoanDays: ["0.00", [Validators.required, Validators.min(0)]],
      PeriodDays: ["0.00", [Validators.required, Validators.min(0)]],
      LoanAddZakat: ["0.00", [Validators.required, Validators.min(0)]],
      TotDed: ["0.00", [Validators.required, Validators.min(0)]],
      AddZakatBase: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ZCA3Form() {
    return this.fb.group({
      AddItem: ["", [Validators.required, Validators.maxLength(200)]],
      Amount: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ZCD1Form() {
    return this.fb.group({
      InvType: ["", [Validators.required]],
      Tim: ["", [Validators.required]],
      InvCmpName: ["", [Validators.required]],
      Amount: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ZCD2Form() {
    return this.fb.group({
      NetProfit: ["0.00", [Validators.required, Validators.min(0)]],
      DefAdjacement: ["0.00", [Validators.required, Validators.min(0)]],
      AllocReject: ["0.00", [Validators.required, Validators.min(0)]],
      CayyForward: ["0.00", [Validators.required, Validators.min(0)]],
      TotLoss: ["0.00", [Validators.required, Validators.min(0)]],
      CayyForwardloss: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  Item1001SetFormM() {
    return this.fb.group({
      IdTp: ["", [Validators.required]],
      IdNo: ["", [Validators.required]],
      ContraPatry: ["", [Validators.required]],
      ContractDt: [null, [Validators.required]],
      OriContraValue: ["0.00", [Validators.required, Validators.min(0)]],
      AmedContraValue: ["0.00", [Validators.required, Validators.min(0)]],
      ContraAftAmed: ["0.00", [Validators.required, Validators.min(0)]],
      ActualCost: ["0.00", [Validators.required, Validators.min(0)]],
      EstimateCost: ["0.00", [Validators.required, Validators.min(0)]],
      CpmplePercentage: ["0.00", [Validators.required, Validators.min(0)]],
      RevenueCompletion: [
        "0",
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      PreyrRevenue: ["0.00", [Validators.required, Validators.min(0)]],
      CuryrRevenue: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  Item1002SetFormM() {
    return this.fb.group({
      TotInsuPremium: ["0.00", [Validators.required, Validators.min(0)]],
      CanInsuPremium: ["0.00", [Validators.required, Validators.min(0)]],
      ReinsuPremium: ["0.00", [Validators.required, Validators.min(0)]],
      ReinsuPremiumFore: ["0.00", [Validators.required, Validators.min(0)]],
      NetPremium: ["0.00", [Validators.required, Validators.min(0)]],
      ReinsuFee: ["0.00", [Validators.required, Validators.min(0)]],
      DiffInstallment: ["0.00", [Validators.required, Validators.min(0)]],
      InvesIncome: ["0.00", [Validators.required, Validators.min(0)]],
      OthIncome: ["0.00", [Validators.required, Validators.min(0)]],
      TotInsuIncome: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  Item1004SetFormM() {
    return this.fb.group({
      IdTp: ["", [Validators.required]],
      IdNo: ["", [Validators.required]],
      ContraName: ["", [Validators.required]],
      Country: ["", [Validators.required]],
      WorkValue: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  Item1006SetFormM() {
    return this.fb.group({
      Statement: ["", [Validators.required]],
      Amount: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  Item1013SetFormM() {
    return this.fb.group({
      IdTp: ["", [Validators.required]],
      IdNo: ["", [Validators.required]],
      BeniName: ["", [Validators.required]],
      Residancy: ["", [Validators.required]],
      Country: ["", [Validators.required]],
      BegYrBal: ["0.00", [Validators.required, Validators.min(0)]],
      WorkValue: ["0.00", [Validators.required, Validators.min(0)]],
      AccCharged: ["0.00", [Validators.required, Validators.min(0)]],
      PaidYear: ["0.00", [Validators.required, Validators.min(0)]],
      EndYrBal: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  Item1019SetFormM() {
    return this.fb.group({
      IdTp: ["", [Validators.required]],
      IdNo: ["", [Validators.required]],
      BeniName: ["", [Validators.required]],
      Residancy: ["", [Validators.required]],
      Country: ["", [Validators.required]],
      SerTyp: ["", [Validators.required, Validators.min(0)]],
      BegYrbal: ["0.00", [Validators.required, Validators.min(0)]],
      AccCharged: ["0.00", [Validators.required, Validators.min(0)]],
      PaidYr: ["0.00", [Validators.required, Validators.min(0)]],
      EndYrbal: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ZCD3Form() {
    return this.fb.group({
      Statement: ["", [Validators.required, Validators.maxLength(200)]],
      BegBal: ["0.00", [Validators.required, Validators.min(0)]],
      Addition: ["0.00", [Validators.required, Validators.min(0)]],
      DispCost: ["0.00", [Validators.required, Validators.min(0)]],
      EndBal: ["0.00", [Validators.required, Validators.min(0)]],
      TotSale: ["0.00", [Validators.required, Validators.min(0)]],
      CusTotPay: ["0.00", [Validators.required, Validators.min(0)]],
      Per: ["0", [Validators.required, Validators.min(0), Validators.max(100)]],
      DedBase: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ZCD4Form() {
    return this.fb.group({
      AccName: ["", [Validators.required, Validators.maxLength(200)]],
      ZakatReason: ["", [Validators.required, Validators.maxLength(200)]],
      Amount: ["0.00", [Validators.required, Validators.min(0)]],
    });
  }
  ClearZCD1() {
    this.form10List.RInvsetlocal == "X"
      ? this.zcD1Form.patchValue({ Schedule: true })
      : this.zcD1Form.patchValue({ Schedule: false });
    //if (this.form10List.RInvsetlocal == "X") {
    this.clearFormArray(this.ZCD1);
    for (let i = 0; i < this.form10List.Item1011Set["results"].length; i++) {
      this.AddRowZCD1();
      this.ZCD1.controls[i].patchValue({
        InvType: this.form10List.Item1011Set["results"][i]["InvType"],
      });
      this.ZCD1.controls[i].patchValue({
        Tim: this.form10List.Item1011Set["results"][i]["Tim"],
      });
      this.ZCD1.controls[i].patchValue({
        InvCmpName: this.form10List.Item1011Set["results"][i]["InvCmpName"],
      });
      this.ZCD1.controls[i].patchValue({
        Amount: this.form10List.Item1011Set["results"][i]["Amount"],
      });
      this.CalZCIIL();
    }
    this.clsePopup();
  }
  ClearZCOD() {
    this.form10List.ROthded == "X"
      ? this.zcD4Form.patchValue({ Schedule: true })
      : this.zcD4Form.patchValue({ Schedule: false });
    //if (this.form10List.ROthded == "X") {
    this.clearFormArray(this.ZCD4);
    for (let i = 0; i < this.form10List.Item1016Set["results"].length; i++) {
      this.AddRowZCD4();
      this.ZCD4.controls[i].patchValue({
        AccName: this.form10List.Item1016Set["results"][i]["AccName"],
      });
      this.ZCD4.controls[i].patchValue({
        ZakatReason: this.form10List.Item1016Set["results"][i]["ZakatReason"],
      });
      this.ZCD4.controls[i].patchValue({
        Amount: this.form10List.Item1016Set["results"][i]["Amount"],
      });
      this.calCellTotalOD();
    }
    jQuery("#otherZakatDeduction").modal("hide");
    this.clsePopup();
  }
  calCellTotalOD() {
    this.form10List.ZdedothAmt = "0.00";
    this.totalOD = 0;
    for (let i = 0; i < this.ZCD4.controls.length; i++) {
      this.ZCD4.controls[i].patchValue({
        Amount: (+this.ZCD4.controls[i].value.Amount).toFixed(2),
      });

      this.totalOD =
        this.totalOD + parseFloat(this.ZCD4.controls[i].value.Amount);
      // parseFloat(((+this.taxpayerDetails.AShareProfit)+(+this.individualCompaniesResult.controls[i].value.Amount)).toString()).toFixed(2);
    }
    this.form10List.ZdedothAmt = this.totalOD.toFixed(2);
  }
  SaveZCOD() {
    this.form10List.ZdedothAmt = this.totalOD.toFixed(2);
    this.form10List.ROthded = "X";
    this.form10List.Item1016Set["results"] = [];
    for (let i = 0; i < this.ZCD4.controls.length; i++) {
      this.form10List.Item1016Set["results"].push({});
      this.form10List.Item1016Set["results"][i]["AccName"] = this.ZCD4.controls[
        i
      ].value.AccName;
      this.form10List.Item1016Set["results"][i][
        "ZakatReason"
      ] = this.ZCD4.controls[i].value.ZakatReason;
      this.form10List.Item1016Set["results"][i]["Amount"] = this.ZCD4.controls[
        i
      ].value.Amount;
      //this.form10List.Item1016Set["results"][i]["FormGuid"] = fbguid3;
      this.form10List.Item1016Set["results"][i]["LineNo"] = i + 1;
    }
    this.CalculateTotalZCDeduction();
    this.SaveForm();
    jQuery("#otherZakatDeduction").modal("hide");
    this.clsePopup();
  }
  AddMultipleOZD() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowZCD4();
    }
    this.addPopup();
    jQuery("#addMultiplOZCD").modal("hide");
  }
  CalculateZCACFL() {
    if (
      this.ZCD2.controls[0].value.DefAdjacement == "" ||
      this.ZCD2.controls[0].value.DefAdjacement == undefined
    ) {
      this.ZCD2.controls[0].patchValue({ DefAdjacement: "0.00" });
    } else {
      this.ZCD2.controls[0].patchValue({
        DefAdjacement: (+this.ZCD2.controls[0].value.DefAdjacement).toFixed(2),
      });
    }
    if (
      this.ZCD2.controls[0].value.AllocReject == "" ||
      this.ZCD2.controls[0].value.AllocReject == undefined
    ) {
      this.ZCD2.controls[0].patchValue({ AllocReject: "0.00" });
    } else {
      this.ZCD2.controls[0].patchValue({
        AllocReject: (+this.ZCD2.controls[0].value.AllocReject).toFixed(2),
      });
    }
    if (
      this.ZCD2.controls[0].value.TotLoss == "" ||
      this.ZCD2.controls[0].value.TotLoss == undefined
    ) {
      this.ZCD2.controls[0].patchValue({ TotLoss: "0.00" });
    } else {
      this.ZCD2.controls[0].patchValue({
        TotLoss: (+this.ZCD2.controls[0].value.TotLoss).toFixed(2),
      });
    }
    let total1 =
      parseFloat(this.ZCD2.controls[0].value.DefAdjacement) +
      parseFloat(this.ZCD2.controls[0].value.AllocReject);
    this.ZCD2.controls[0].patchValue({ CayyForward: total1.toFixed(2) });
    if (total1 > this.ZCD2.controls[0].value.TotLoss) {
      this.ZCD2.controls[0].patchValue({
        CayyForwardloss: (+this.ZCD2.controls[0].value.TotLoss).toFixed(2),
      });
    } else {
      this.ZCD2.controls[0].patchValue({
        CayyForwardloss: (+this.ZCD2.controls[0].value.CayyForward).toFixed(2),
      });
    }
  }
  ZCACFLSave() {
    this.form10List.ZdedlossAmt = this.ZCD2.controls[0].value.CayyForwardloss;
    if (parseFloat(this.ZCD2.controls[0].value.CayyForwardloss) > 0) {
      this.zcD2Form.value.Schedule = true;
    } else {
      this.zcD2Form.value.Schedule = false;
    }

    this.form10List.RAdjcarry = "X";
    this.form10List.Item1015Set["results"] = [];
    this.form10List.Item1015Set["results"].push({});
    this.form10List.ZakprofitadAmt = this.ZCD2.controls[0].value.NetProfit;
    this.form10List.Item1015Set["results"][0][
      "DefAdjacement"
    ] = this.ZCD2.controls[0].value.DefAdjacement;
    this.form10List.Item1015Set["results"][0][
      "AllocReject"
    ] = this.ZCD2.controls[0].value.AllocReject;
    this.form10List.Item1015Set["results"][0][
      "CayyForward"
    ] = this.ZCD2.controls[0].value.CayyForward;
    this.form10List.Item1015Set["results"][0][
      "TotLoss"
    ] = this.ZCD2.controls[0].value.TotLoss;
    this.form10List.Item1015Set["results"][0][
      "CayyForwardloss"
    ] = this.ZCD2.controls[0].value.CayyForwardloss;

    this.CalculateZCACFL();
    this.CalculateTotalZCDeduction();
    this.SaveForm();
    jQuery("#ZCforwardloss").modal("hide");
    this.clsePopup();
  }
  CalZCIIL() {
    this.form10List.ZaddinvlocalAmt = 0;
    this.totalIIL = 0;
    for (let i = 0; i < this.ZCD1.controls.length; i++) {
      this.ZCD1.controls[i].patchValue({
        Amount: (+this.ZCD1.controls[i].value.Amount).toFixed(2),
      });
      this.totalIIL =
        this.totalIIL + parseFloat(this.ZCD1.controls[i].value.Amount);
    }
    this.form10List.ZaddinvlocalAmt = this.totalIIL.toFixed(2);
    this.CalculateTotalZCDeduction();
  }
  GetTinDetails(index) {
    let TIN = this.ZCD1.controls[index].value.Tim;
    this.returnsService.getDetailsByTIN(TIN, this.Gpart).subscribe((data) => {
      this.ZCD1.controls[index].patchValue({ InvCmpName: data["d"].Name });
    });
  }
  AddMultiplededucation() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowZCD1();
    }
    this.addPopup();
    jQuery("#addMultipldeducation").modal("hide");
  }
  ZCIILSave() {
    this.zcD1Form.value.Schedule = true;
    this.form10List.ZaddinvlocalAmt = this.totalIIL.toFixed(2);
    this.form10List.RInvsetlocal = "X";
    this.form10List.Item1011Set["results"] = [];
    for (let i = 0; i < this.ZCD1.controls.length; i++) {
      this.form10List.Item1011Set["results"].push({});
      this.form10List.Item1011Set["results"][i]["Tim"] = this.ZCD1.controls[
        i
      ].value.Tim;
      this.form10List.Item1011Set["results"][i]["InvType"] = this.ZCD1.controls[
        i
      ].value.InvType;
      this.form10List.Item1011Set["results"][i][
        "InvCmpName"
      ] = this.ZCD1.controls[i].value.InvCmpName;
      this.form10List.Item1011Set["results"][i]["Amount"] = this.ZCD1.controls[
        i
      ].value.Amount;
      //this.form10List.Item1011Set["results"][i]["FormGuid"] = fbguid2;
      this.form10List.Item1011Set["results"][i]["LineNo"] = i + 1;
    }
    this.CalculateTotalZCDeduction();
    this.SaveForm();
    jQuery("#zcdeducation").modal("hide");
    this.clsePopup();
  }
  CalculateTotalZCDeduction() {
    if (
      this.form10List.ZdedothAmt == "" ||
      this.form10List.ZdedothAmt == undefined
    ) {
      this.form10List.ZdedothAmt = "0.00";
    } else {
      this.form10List.ZdedothAmt = (+this.form10List.ZdedothAmt).toFixed(2);
    }
    if (
      this.form10List.ZdedsellAmt == "" ||
      this.form10List.ZdedsellAmt == undefined
    ) {
      this.form10List.ZdedsellAmt = "0.00";
    } else {
      this.form10List.ZdedsellAmt = (+this.form10List.ZdedsellAmt).toFixed(2);
    }
    if (
      this.form10List.ZdedlossAmt == "" ||
      this.form10List.ZdedlossAmt == undefined
    ) {
      this.form10List.ZdedlossAmt = "0.00";
    } else {
      this.form10List.ZdedlossAmt = (+this.form10List.ZdedlossAmt).toFixed(2);
    }
    if (
      this.form10List.ZaddinvlocalAmt == "" ||
      this.form10List.ZaddinvlocalAmt == undefined
    ) {
      this.form10List.ZaddinvlocalAmt = "0.00";
    } else {
      this.form10List.ZaddinvlocalAmt = (+this.form10List
        .ZaddinvlocalAmt).toFixed(2);
    }
    if (
      this.form10List.ZdedinvoutAmt == "" ||
      this.form10List.ZdedinvoutAmt == undefined
    ) {
      this.form10List.ZdedinvoutAmt = "0.00";
    } else {
      this.form10List.ZdedinvoutAmt = (+this.form10List.ZdedinvoutAmt).toFixed(
        2
      );
    }
    if (
      this.form10List.ZdedfixassAmt == "" ||
      this.form10List.ZdedfixassAmt == undefined
    ) {
      this.form10List.ZdedfixassAmt = "0.00";
    } else {
      this.form10List.ZdedfixassAmt = (+this.form10List.ZdedfixassAmt).toFixed(
        2
      );
    }
    if (
      this.form10List.ZaddtooAmt == "" ||
      this.form10List.ZaddtooAmt == undefined
    ) {
      this.form10List.ZaddtooAmt = "0.00";
    } else {
      this.form10List.ZaddtooAmt = (+this.form10List.ZaddtooAmt).toFixed(2);
    }
    if (
      this.form10List.ZdedcertiAmt == "" ||
      this.form10List.ZdedcertiAmt == undefined
    ) {
      this.form10List.ZdedcertiAmt = "0.00";
    } else {
      this.form10List.ZdedcertiAmt = (+this.form10List.ZdedcertiAmt).toFixed(2);
    }
    let totalZCD =
      parseFloat(this.form10List.ZdedothAmt) +
      parseFloat(this.form10List.ZdedsellAmt) +
      parseFloat(this.form10List.ZdedlossAmt) +
      parseFloat(this.form10List.ZaddinvlocalAmt) +
      parseFloat(this.form10List.ZdedinvoutAmt) +
      parseFloat(this.form10List.ZdedfixassAmt);
    this.form10List.ZdedtotAmt = totalZCD.toFixed(2);
    let ZdedbaseAmt =
      parseFloat(this.form10List.ZaddtooAmt) -
      parseFloat(this.form10List.ZdedtotAmt);
    this.form10List.ZdedbaseAmt = ZdedbaseAmt.toFixed(2);
    if (parseFloat(this.form10List.ZdedcertiAmt) <= 0) {
      this.isReadOnly = true;
      this.form10List.ZdedinvoutAmt = "0.00";
    } else {
      this.isReadOnly = false;
    }
    let var1 =
      (parseFloat(this.form10List.ZaddcapAmt) +
        parseFloat(this.form10List.ZaddretAmt) +
        parseFloat(this.form10List.ZaddproAmt) +
        parseFloat(this.form10List.ZaddrevsAmt) +
        parseFloat(this.form10List.ZaddlonAmt) +
        parseFloat(this.form10List.ZaddfairAmt) +
        parseFloat(this.form10List.ZaddothitemAmt) +
        parseFloat(this.form10List.ZdedcertiAmt) +
        parseFloat(this.form10List.ZaddotoAmt) -
        parseFloat(this.form10List.ZdedfixassAmt) -
        parseFloat(this.form10List.ZdedinvoutAmt) -
        parseFloat(this.form10List.ZaddinvlocalAmt) -
        parseFloat(this.form10List.ZdedsellAmt) -
        parseFloat(this.form10List.ZdedothAmt)) *
        parseFloat(this.form10List.TdSaudiSharePrft) +
      parseFloat(this.form10List.ZakprofitadAmt) -
      parseFloat(this.form10List.ZdedlossAmt);
    if (var1 > parseFloat(this.form10List.ZaddprlossAmt)) {
      this.form10List.ZdedzakatAmt = var1.toFixed(2);
    } else {
      this.form10List.ZdedzakatAmt = (+this.form10List.ZaddprlossAmt).toFixed(
        2
      );
    }
    if (parseFloat(this.form10List.ZdedzakatAmt) < 0) {
      this.form10List.ZdedzakatAmt = "0.00";
    }
    this.form10List.ZdedpayAmt = "0.00";
    //need to apply condition
    if (
      parseFloat(this.form10List.ZdedzakatAmt) ==
      parseFloat(this.form10List.ZakprofitadAmt)
    ) {
      this.form10List.ZdedpayAmt = (
        parseFloat(this.form10List.ZakprofitadAmt) * 0.025 +
        parseFloat(this.form10List.ZdedcertiAmt)
      ).toFixed(2);
    } else {
      this.form10List.ZdedpayAmt = (
        (parseFloat(this.form10List.ZaddcapAmt) +
          parseFloat(this.form10List.ZaddretAmt) +
          parseFloat(this.form10List.ZaddproAmt) +
          parseFloat(this.form10List.ZaddrevsAmt) +
          parseFloat(this.form10List.ZaddlonAmt) +
          parseFloat(this.form10List.ZaddfairAmt) +
          parseFloat(this.form10List.ZaddothitemAmt) +
          parseFloat(this.form10List.ZaddotoAmt) -
          parseFloat(this.form10List.ZdedtotAmt) +
          parseFloat(this.form10List.ZdedlossAmt)) *
          parseFloat(this.form10List.TdSaudiShareCaptl) *
          (parseFloat(this.form10List.Totdays) / 354) *
          0.025 +
        parseFloat(this.form10List.ZdedcertiAmt) +
        parseFloat(this.form10List.ZaddprlossAmt) * 0.025 -
        parseFloat(this.form10List.ZdedlossAmt) *
          (parseFloat(this.form10List.Totdays) / 354) *
          0.025
      ).toFixed(2);
    }
    if (this.form10List.ZdedpayAmt < 0) {
      this.form10List.ZdedpayAmt = "0.00";
    } else {
      this.form10List.ZdedpayAmt = this.form10List.ZdedpayAmt.toString();
    }
    // this.SaveForm();
  }
  AddMultipleZCOA() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowZCA3();
    }
    this.addPopup();
    jQuery("#addMultiplZCOA").modal("hide");
  }
  ZCOASave() {
    this.form10List.ZaddotoAmt = this.totalOA.toFixed(2);
    this.zcA3Form.value.Schedule = true;
    this.form10List.ROthadd = "X";
    this.form10List.Item1014Set["results"] = [];
    for (let i = 0; i < this.ZCA3.controls.length; i++) {
      this.form10List.Item1014Set["results"].push({});
      this.form10List.Item1014Set["results"][i]["AddItem"] = this.ZCA3.controls[
        i
      ].value.AddItem;
      this.form10List.Item1014Set["results"][i]["Amount"] = this.ZCA3.controls[
        i
      ].value.Amount;
      //this.form10List.Item1014Set["results"][i]["FormGuid"] = fbguid1;
      this.form10List.Item1014Set["results"][i]["LineNo"] = i + 1;
    }
    this.calcoverZC();
    //this.SaveForm();
    jQuery("#ZCotheraddiation").modal("hide");
    this.clsePopup();
  }
  calCellTotalOA() {
    this.form10List.ZaddotoAmt = "0.00";
    this.totalOA = 0;
    for (let i = 0; i < this.ZCA3.controls.length; i++) {
      if (
        this.ZCA3.controls[i].value.Amount == "" ||
        this.ZCA3.controls[i].value.Amount == undefined
      ) {
        this.ZCA3.controls[i].patchValue({ Amount: "0.00" });
      }
      this.ZCA3.controls[i].patchValue({
        Amount: (+this.ZCA3.controls[i].value.Amount).toFixed(2),
      });
      this.totalOA =
        this.totalOA + parseFloat(this.ZCA3.controls[i].value.Amount);
    }
    this.form10List.ZaddotoAmt = this.totalOA.toFixed(2);
  }
  ResetProvision() {
    this.form10List.RProvision == "X"
      ? this.ProvisionsForm.patchValue({ Schedule: true })
      : this.ProvisionsForm.patchValue({ Schedule: false });
    //if (this.form10List.RProvision == "X") {
    this.clearFormArray(this.Provisions);
    for (let i = 0; i < this.form10List.Item1005Set["results"].length; i++) {
      this.addProvisionsForm();
      this.form10List.Item1005Set["results"][i]["LineNo"] = i + 1;
      this.Provisions.controls[i].patchValue({
        Name: this.form10List.Item1005Set["results"][i]["Name"],
        ProBalSperiod: this.form10List.Item1005Set["results"][i][
          "ProBalSperiod"
        ],
        ProBalPeriod: this.form10List.Item1005Set["results"][i]["ProBalPeriod"],
        ProBalUtili: this.form10List.Item1005Set["results"][i]["ProBalUtili"],
        Adjacement: this.form10List.Item1005Set["results"][i]["Adjacement"],
        ProBalEperiod: this.form10List.Item1005Set["results"][i][
          "ProBalEperiod"
        ],
      });
    }
    this.calProvisions();
    this.clsePopup();
  }
  ClearZCLAE() {
    this.form10List.RLoanEqui == "X"
      ? this.zcA2Form.patchValue({ Schedule: true })
      : this.zcA2Form.patchValue({ Schedule: false });
    //if (this.form10List.RLoanEqui == "X") {
    this.clearFormArray(this.ZCA2);
    for (let i = 0; i < this.form10List.Item1012Set["results"].length; i++) {
      this.AddRowZCA2();
      this.ZCA2.controls[i].patchValue({
        LenderName: this.form10List.Item1012Set["results"][i]["LenderName"],
      });
      this.ZCA2.controls[i].patchValue({
        LocalFore: this.form10List.Item1012Set["results"][i]["LocalFore"],
      });
      this.ZCA2.controls[i].patchValue({
        BalBegPeriod: this.form10List.Item1012Set["results"][i]["BalBegPeriod"],
      });
      this.ZCA2.controls[i].patchValue({
        AmtClrCyr: this.form10List.Item1012Set["results"][i]["AmtClrCyr"],
      });
      this.ZCA2.controls[i].patchValue({
        AddLoanCyr: this.form10List.Item1012Set["results"][i]["AddLoanCyr"],
      });
      this.ZCA2.controls[i].patchValue({
        BalEndPeriod: this.form10List.Item1012Set["results"][i]["BalEndPeriod"],
      });
      this.ZCA2.controls[i].patchValue({
        UtiDedItem: this.form10List.Item1012Set["results"][i]["UtiDedItem"],
      });
      this.ZCA2.controls[i].patchValue({
        LoanBalance: this.form10List.Item1012Set["results"][i]["LoanBalance"],
      });
      this.ZCA2.controls[i].patchValue({
        LoanStartDt:
          this.form10List.Item1012Set["results"][i]["LoanStartDt"] != null
            ? moment(
                new Date(
                  +this.form10List.Item1012Set["results"][i]["LoanStartDt"]
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"),
      });
      this.ZCA2.controls[i].patchValue({
        LoanClearDt:
          this.form10List.Item1012Set["results"][i]["LoanClearDt"] != null
            ? moment(
                new Date(
                  +this.form10List.Item1012Set["results"][i]["LoanClearDt"]
                    .replace(")", "")
                    .toString()
                    .replace("/Date(", "")
                    .toString()
                    .replace("/", "")
                )
              ).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"),
      });
      this.ZCA2.controls[i].patchValue({
        LoanDays: this.form10List.Item1012Set["results"][i]["LoanDays"],
      });
      this.ZCA2.controls[i].patchValue({
        PeriodDays: this.form10List.Item1012Set["results"][i]["PeriodDays"],
      });
      this.ZCA2.controls[i].patchValue({
        LoanAddZakat: this.form10List.Item1012Set["results"][i]["LoanAddZakat"],
      });
      this.ZCA2.controls[i].patchValue({
        TotDed: this.form10List.Item1012Set["results"][i]["TotDed"],
      });
      this.ZCA2.controls[i].patchValue({
        AddZakatBase: this.form10List.Item1012Set["results"][i]["AddZakatBase"],
      });
      this.CalcZCA2(i);
    }
    this.clsePopup();
  }
  ClearZCOA() {
    this.form10List.ROthadd == "X"
      ? this.zcA3Form.patchValue({ Schedule: true })
      : this.zcA3Form.patchValue({ Schedule: false });
    //if (this.form10List.ROthadd == "X") {
    this.clearFormArray(this.ZCA3);
    for (let i = 0; i < this.form10List.Item1014Set["results"].length; i++) {
      this.AddRowZCA3();
      this.ZCA3.controls[i].patchValue({
        AddItem: this.form10List.Item1014Set["results"][i]["AddItem"],
      });
      this.ZCA3.controls[i].patchValue({
        Amount: this.form10List.Item1014Set["results"][i]["Amount"],
      });
      this.calCellTotalOA();
    }
    jQuery("#ZCotheraddiation").modal("hide");
    this.clsePopup();
  }
  AddMultipleZCA2() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowZCA2();
    }
    this.addPopup();
    jQuery("#addMultiplZCA2").modal("hide");
  }
  CalcZCA2(index) {
    if (
      this.ZCA2.controls[index].value.BalBegPeriod == "" ||
      this.ZCA2.controls[index].value.BalBegPeriod == undefined
    ) {
      this.ZCA2.controls[index].patchValue({ BalBegPeriod: "0.00" });
    } else {
      this.ZCA2.controls[index].patchValue({
        BalBegPeriod: (+this.ZCA2.controls[index].value.BalBegPeriod).toFixed(
          2
        ),
      });
    }
    if (
      this.ZCA2.controls[index].value.AmtClrCyr == "" ||
      this.ZCA2.controls[index].value.AmtClrCyr == undefined
    ) {
      this.ZCA2.controls[index].patchValue({ AmtClrCyr: "0.00" });
    } else {
      this.ZCA2.controls[index].patchValue({
        AmtClrCyr: (+this.ZCA2.controls[index].value.AmtClrCyr).toFixed(2),
      });
    }
    if (
      this.ZCA2.controls[index].value.AddLoanCyr == "" ||
      this.ZCA2.controls[index].value.AddLoanCyr == undefined
    ) {
      this.ZCA2.controls[index].patchValue({ AddLoanCyr: "0.00" });
    } else {
      this.ZCA2.controls[index].patchValue({
        AddLoanCyr: (+this.ZCA2.controls[index].value.AddLoanCyr).toFixed(2),
      });
    }
    if (
      this.ZCA2.controls[index].value.UtiDedItem == "" ||
      this.ZCA2.controls[index].value.UtiDedItem == undefined
    ) {
      this.ZCA2.controls[index].patchValue({ UtiDedItem: "0.00" });
    } else {
      this.ZCA2.controls[index].patchValue({
        UtiDedItem: (+this.ZCA2.controls[index].value.UtiDedItem).toFixed(2),
      });
    }
    let c3 = parseFloat(this.ZCA2.controls[index].value.BalBegPeriod);
    let c4 = parseFloat(this.ZCA2.controls[index].value.AmtClrCyr);
    let c5 = parseFloat(this.ZCA2.controls[index].value.AddLoanCyr);
    let c6 = c3 - c4 + c5;
    this.ZCA2.controls[index].patchValue({ BalEndPeriod: c6.toFixed(2) });
    let c7 = parseFloat(this.ZCA2.controls[index].value.UtiDedItem);
    let c8 = c6 - c7;
    this.ZCA2.controls[index].patchValue({ LoanBalance: c8.toFixed(2) });
    if (c4 > c3 + c5) {
      this.zcA2Error1 = true;
    } else {
      this.zcA2Error1 = false;
    }
    if (c7 > c5) {
      this.zcA2Error2 = true;
    } else {
      this.zcA2Error2 = false;
    }
    if (c3 > 0) {
      if (
        moment(this.ZCA2.controls[index].value.LoanStartDt) >
        moment(this.periodStartDate)
      ) {
        this.zcA2Error3 = true;
      } else {
        this.zcA2Error3 = false;
      }
    } else {
      if (
        moment(this.ZCA2.controls[index].value.LoanStartDt) <
        moment(this.periodStartDate)
      ) {
        this.zcA2Error4 = true;
      } else {
        this.zcA2Error4 = false;
      }
    }
    if (
      moment(this.ZCA2.controls[index].value.LoanStartDt) >
      moment(this.ZCA2.controls[index].value.LoanClearDt)
    ) {
      this.zcA2Error5 = true;
    } else {
      this.zcA2Error5 = false;
    }
    if (c6 > 0) {
      let year = new Date(
        this.ZCA2.controls[index].value.LoanStartDt
      ).getFullYear();
      let date = "12/12/" + year;
      if (moment(this.ZCA2.controls[index].value.LoanClearDt) < moment(date)) {
        this.zcA2Error6 = true;
      } else {
        this.zcA2Error6 = false;
      }
    } else {
      this.zcA2Error6 = false;
    }
    let sdate = new Date(this.ZCA2.controls[index].value.LoanStartDt);
    let edate = new Date(this.ZCA2.controls[index].value.LoanClearDt);
    let c11 = Math.floor(
      (Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate()) -
        Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    this.ZCA2.controls[index].patchValue({ LoanDays: c11 });

    var myarray = this.periodEndDate.split("/");
    let renddate = new Date(myarray[2] + "-" + myarray[1] + "-" + myarray[0]);
    let c12 = Math.floor(
      (Date.UTC(
        renddate.getFullYear(),
        renddate.getMonth(),
        renddate.getDate()
      ) -
        Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    this.ZCA2.controls[index].patchValue({ PeriodDays: c12 });
    let c13 = 0;
    if (c11 >= 354) {
      let year = new Date(
        this.ZCA2.controls[index].value.LoanStartDt
      ).getFullYear();
      let noofdaysinyear = Math.floor(
        (Date.UTC(year, 12, 31) - Date.UTC(year, 1, 1)) / (1000 * 60 * 60 * 24)
      );
      c13 = c7 + (c8 * c12) / noofdaysinyear;
    } else {
      c13 = c7;
    }
    this.ZCA2.controls[index].patchValue({ LoanAddZakat: c13.toFixed(2) });
    let c14 = 0;
    if (parseFloat(this.form10List.ZaddprlossAmt) > 0) {
      c14 = parseFloat(this.form10List.ZaddprlossAmt);
    } else {
      c14 =
        parseFloat(this.form10List.ZdedtotAmt) +
        parseFloat(this.form10List.ZaddprlossAmt);
    }
    this.ZCA2.controls[index].patchValue({ TotDed: c14.toFixed(2) });
    let c15 = 0;
    let sumofc13 = 0;
    for (let i = 0; i < this.ZCA2.controls.length; i++) {
      sumofc13 =
        sumofc13 + parseFloat(this.ZCA2.controls[i].value.LoanAddZakat);
    }
    if (c14 >= sumofc13) {
      c15 = sumofc13;
    } else {
      c15 = c14;
    }
    this.TotalDed = c14;
    this.AddZakatBase = c15;
    this.ZCA2.controls[index].patchValue({ AddZakatBase: c15.toFixed(2) });
  }
  ZCA2Save() {
    this.form10List.ZaddlonAmt = parseFloat(this.AddZakatBase).toFixed(2);
    this.form10List.RLoanEqui = "X";
    this.form10List.Item1012Set["results"] = [];
    for (let i = 0; i < this.ZCA2.controls.length; i++) {
      this.form10List.Item1012Set["results"].push({});
      this.form10List.Item1012Set["results"][i][
        "LenderName"
      ] = this.ZCA2.controls[i].value.LenderName;
      this.form10List.Item1012Set["results"][i][
        "LocalFore"
      ] = this.ZCA2.controls[i].value.LocalFore;
      this.form10List.Item1012Set["results"][i][
        "BalBegPeriod"
      ] = this.ZCA2.controls[i].value.BalBegPeriod;
      this.form10List.Item1012Set["results"][i][
        "AmtClrCyr"
      ] = this.ZCA2.controls[i].value.AmtClrCyr;
      this.form10List.Item1012Set["results"][i][
        "AddLoanCyr"
      ] = this.ZCA2.controls[i].value.AddLoanCyr;
      this.form10List.Item1012Set["results"][i]["BalEndPeriod"] = (+this.ZCA2
        .controls[i].value.BalEndPeriod).toFixed(2);
      this.form10List.Item1012Set["results"][i][
        "UtiDedItem"
      ] = this.ZCA2.controls[i].value.UtiDedItem;
      this.form10List.Item1012Set["results"][i]["LoanBalance"] = (+this.ZCA2
        .controls[i].value.LoanBalance).toFixed(2);
      this.form10List.Item1012Set["results"][i]["LoanStartDt"] =
        "/Date(" +
          new Date(this.ZCA2.controls[i].value.LoanStartDt).getTime() +
          ")/" || null;
      this.form10List.Item1012Set["results"][i]["LoanClearDt"] =
        "/Date(" +
          new Date(this.ZCA2.controls[i].value.LoanClearDt).getTime() +
          ")/" || null;
      this.form10List.Item1012Set["results"][i][
        "LoanDays"
      ] = this.ZCA2.controls[i].value.LoanDays.toString();
      this.form10List.Item1012Set["results"][i][
        "PeriodDays"
      ] = this.ZCA2.controls[i].value.PeriodDays.toString();
      this.form10List.Item1012Set["results"][i]["LoanAddZakat"] = (+this.ZCA2
        .controls[i].value.LoanAddZakat).toFixed(2);
      this.form10List.Item1012Set["results"][i]["TotDed"] = (+this.ZCA2
        .controls[i].value.TotDed).toFixed(2);
      this.form10List.Item1012Set["results"][i]["AddZakatBase"] = (+this.ZCA2
        .controls[i].value.AddZakatBase).toFixed(2);
      //this.form10List.Item1012Set["results"][i]["FormGuid"] = fbguid;
      this.form10List.Item1012Set["results"][i]["LineNo"] = i + 1;
    }
    this.calcoverZC();
    this.clsePopup();
    jQuery("#zcloanequialent").modal("hide");
  }
  AddMultipleZCD3() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowZCD3();
    }
    this.addPopup();
    jQuery("#addMultiplZCD3").modal("hide");
  }
  AddMultipleItem1001Set() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowItem1001Set();
    }
    this.addPopup();
    jQuery("#MultipleIS1").modal("hide");
  }
  calTotalZDSell(i: number) {
    if (
      this.ZCD3.controls[i].value.BegBal == "" ||
      this.ZCD3.controls[i].value.BegBal == undefined
    ) {
      this.ZCD3.controls[i].patchValue({ BegBal: "0.00" });
    } else {
      this.ZCD3.controls[i].patchValue({
        BegBal: (+this.ZCD3.controls[i].value.BegBal).toFixed(2),
      });
    }
    if (
      this.ZCD3.controls[i].value.Addition == "" ||
      this.ZCD3.controls[i].value.Addition == undefined
    ) {
      this.ZCD3.controls[i].patchValue({ Addition: "0.00" });
    } else {
      this.ZCD3.controls[i].patchValue({
        Addition: (+this.ZCD3.controls[i].value.Addition).toFixed(2),
      });
    }
    if (
      this.ZCD3.controls[i].value.DispCost == "" ||
      this.ZCD3.controls[i].value.DispCost == undefined
    ) {
      this.ZCD3.controls[i].patchValue({ DispCost: "0.00" });
    } else {
      this.ZCD3.controls[i].patchValue({
        DispCost: (+this.ZCD3.controls[i].value.DispCost).toFixed(2),
      });
    }
    if (
      this.ZCD3.controls[i].value.TotSale == "" ||
      this.ZCD3.controls[i].value.TotSale == undefined
    ) {
      this.ZCD3.controls[i].patchValue({ TotSale: "0.00" });
    } else {
      this.ZCD3.controls[i].patchValue({
        TotSale: (+this.ZCD3.controls[i].value.TotSale).toFixed(2),
      });
    }
    if (
      this.ZCD3.controls[i].value.CusTotPay == "" ||
      this.ZCD3.controls[i].value.CusTotPay == undefined
    ) {
      this.ZCD3.controls[i].patchValue({ CusTotPay: "0.00" });
    } else {
      this.ZCD3.controls[i].patchValue({
        CusTotPay: (+this.ZCD3.controls[i].value.CusTotPay).toFixed(2),
      });
    }
    this.ZCD3.controls[i].patchValue({
      EndBal: (
        parseFloat(this.ZCD3.controls[i].value.BegBal) +
        parseFloat(this.ZCD3.controls[i].value.Addition) -
        parseFloat(this.ZCD3.controls[i].value.DispCost)
      ).toFixed(2),
    });
    let perCal =
      parseFloat(this.ZCD3.controls[i].value.BegBal) +
        parseFloat(this.ZCD3.controls[i].value.Addition) ==
      0
        ? 0
        : ((parseFloat(this.ZCD3.controls[i].value.TotSale) +
            parseFloat(this.ZCD3.controls[i].value.CusTotPay)) /
            (parseFloat(this.ZCD3.controls[i].value.BegBal) +
              parseFloat(this.ZCD3.controls[i].value.Addition))) *
          100;
    this.ZCD3.controls[i].patchValue({ Per: perCal.toFixed(2) });
    let DedBase =
      perCal > 25
        ? "Not allowable for deduction"
        : this.ZCD3.controls[i].value.EndBal;
    if (DedBase != "Not allowable for deduction") {
      this.ZCD3.controls[i].patchValue({ DedBase: (+DedBase).toFixed(2) });
    } else {
      this.ZCD3.controls[i].patchValue({ DedBase: DedBase });
    }
    this.totalZDSell = 0;
    for (let i = 0; i < this.ZCD3.controls.length; i++) {
      if (
        this.ZCD3.controls[i].value.DedBase != "Not allowable for deduction"
      ) {
        this.totalZDSell =
          this.totalZDSell + parseFloat(this.ZCD3.controls[i].value.DedBase);
      }
    }
    this.totalZDSell = parseFloat(this.totalZDSell).toFixed(2);
    // this.Item1009Set[i].EndBal = (parseFloat(this.Item1009Set[i].BegBal) + parseFloat(this.Item1009Set[i].Addition) - parseFloat(this.Item1009Set[i].DispCost)).toFixed(2);
    //let perCal = (parseFloat(this.Item1009Set[i].BegBal) + parseFloat(this.Item1009Set[i].Addition)) == 0 ? 0 : ((parseFloat(this.Item1009Set[i].TotSale) + parseFloat(this.Item1009Set[i].CusTotPay)) / ((parseFloat(this.Item1009Set[i].BegBal) + parseFloat(this.Item1009Set[i].Addition)))) * 100;
    // this.Item1009Set[i].Per = perCal.toFixed(2) + "%";
    // this.Item1009Set[i].DedBase = perCal > 25 ? "Not allowable for deduction" : this.Item1009Set[i].EndBal;
    // this.totalZDSell = "0.00"
    // for (let i = 0; i < this.Item1009Set.length; i++) {
    //   if (this.Item1009Set[i].DedBase != "Not allowable for deduction") { this.totalZDSell = (parseFloat(this.totalZDSell) + parseFloat(this.Item1009Set[i].DedBase)).toFixed(2); }
    // }
  }
  ZCD3Save() {
    this.form10List.ZdedsellAmt = this.totalZDSell;
    this.form10List.RProperty = "X";
    this.form10List.Item1009Set["results"] = [];
    for (let i = 0; i < this.ZCD3.controls.length; i++) {
      this.form10List.Item1009Set["results"].push({});
      this.form10List.Item1009Set["results"][i][
        "Statement"
      ] = this.ZCD3.controls[i].value.Statement;
      this.form10List.Item1009Set["results"][i]["BegBal"] = this.ZCD3.controls[
        i
      ].value.BegBal;
      this.form10List.Item1009Set["results"][i][
        "Addition"
      ] = this.ZCD3.controls[i].value.Addition;
      this.form10List.Item1009Set["results"][i][
        "DispCost"
      ] = this.ZCD3.controls[i].value.DispCost;
      this.form10List.Item1009Set["results"][i]["EndBal"] = this.ZCD3.controls[
        i
      ].value.EndBal;
      this.form10List.Item1009Set["results"][i]["TotSale"] = this.ZCD3.controls[
        i
      ].value.TotSale;
      this.form10List.Item1009Set["results"][i][
        "CusTotPay"
      ] = this.ZCD3.controls[i].value.CusTotPay;
      this.form10List.Item1009Set["results"][i]["Per"] = this.ZCD3.controls[
        i
      ].value.Per;
      this.form10List.Item1009Set["results"][i]["DedBase"] = this.ZCD3.controls[
        i
      ].value.DedBase;
      //this.form10List.Item1009Set["results"][i]["FormGuid"] = fbguid4;
      this.form10List.Item1009Set["results"][i]["LineNo"] = i + 1;
    }
    this.CalculateTotalZCDeduction();
    this.SaveForm();
    jQuery("#zcproperties").modal("hide");
    this.clsePopup();
  }
  // SubmitForm10() {
  //   this.form10List.AgreeFg = "X";
  //   this.form10List.Operationz = "05";
  //   this.form10List.UserTypz = "TP";
  //   let fbguid = this.form10List.Item1012Set["results"][0]["FormGuid"];
  //   this.form10List.Item1012Set["results"] = [];
  //   for (let i = 0; i < this.ZCA2.controls.length; i++) {
  //     this.form10List.Item1012Set["results"].push({});
  //     this.form10List.Item1012Set["results"][i]["LenderName"] = this.ZCA2.controls[i].value.LenderName;
  //     this.form10List.Item1012Set["results"][i]["LocalFore"] = this.ZCA2.controls[i].value.LocalFore;
  //     this.form10List.Item1012Set["results"][i]["BalBegPeriod"] = this.ZCA2.controls[i].value.BalBegPeriod;
  //     this.form10List.Item1012Set["results"][i]["AmtClrCyr"] = this.ZCA2.controls[i].value.AmtClrCyr;
  //     this.form10List.Item1012Set["results"][i]["AddLoanCyr"] = this.ZCA2.controls[i].value.AddLoanCyr;
  //     this.form10List.Item1012Set["results"][i]["BalEndPeriod"] = this.ZCA2.controls[i].value.BalEndPeriod;
  //     this.form10List.Item1012Set["results"][i]["UtiDedItem"] = this.ZCA2.controls[i].value.UtiDedItem;
  //     this.form10List.Item1012Set["results"][i]["LoanBalance"] = this.ZCA2.controls[i].value.LoanBalance;
  //     this.form10List.Item1012Set["results"][i]["LoanStartDt"] = this.ZCA2.controls[i].value.LoanStartDt;
  //     this.form10List.Item1012Set["results"][i]["LoanClearDt"] = this.ZCA2.controls[i].value.LoanClearDt;
  //     this.form10List.Item1012Set["results"][i]["LoanDays"] = this.ZCA2.controls[i].value.LoanDays;
  //     this.form10List.Item1012Set["results"][i]["PeriodDays"] = this.ZCA2.controls[i].value.PeriodDays;
  //     this.form10List.Item1012Set["results"][i]["LoanAddZakat"] = this.ZCA2.controls[i].value.LoanAddZakat;
  //     this.form10List.Item1012Set["results"][i]["TotDed"] = this.ZCA2.controls[i].value.TotDed;
  //     this.form10List.Item1012Set["results"][i]["AddZakatBase"] = this.ZCA2.controls[i].value.AddZakatBase;
  //     this.form10List.Item1012Set["results"][i]["FormGuid"] = fbguid;
  //     this.form10List.Item1012Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let fbguid1 = this.form10List.Item1014Set["results"][0]["FormGuid"];
  //   this.form10List.Item1014Set["results"] = [];
  //   for (let i = 0; i < this.ZCA3.controls.length; i++) {
  //     this.form10List.Item1014Set["results"].push({});
  //     this.form10List.Item1014Set["results"][i]["AddItem"] = this.ZCA3.controls[i].value.AddItem;
  //     this.form10List.Item1014Set["results"][i]["Amount"] = this.ZCA3.controls[i].value.Amount;
  //     this.form10List.Item1014Set["results"][i]["FormGuid"] = fbguid1;
  //     this.form10List.Item1014Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let fbguid2 = this.form10List.Item1011Set["results"][0]["FormGuid"];
  //   this.form10List.Item1011Set["results"] = [];
  //   for (let i = 0; i < this.ZCD1.controls.length; i++) {
  //     this.form10List.Item1011Set["results"].push({});
  //     this.form10List.Item1011Set["results"][i]["Tim"] = this.ZCD1.controls[i].value.Tim;
  //     this.form10List.Item1011Set["results"][i]["InvType"] = this.ZCD1.controls[i].value.InvType;
  //     this.form10List.Item1011Set["results"][i]["InvCmpName"] = this.ZCD1.controls[i].value.InvCmpName;
  //     this.form10List.Item1011Set["results"][i]["Amount"] = this.ZCD1.controls[i].value.Amount;
  //     this.form10List.Item1011Set["results"][i]["FormGuid"] = fbguid2;
  //     this.form10List.Item1011Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let fbguid3 = this.form10List.Item1016Set["results"][0]["FormGuid"];
  //   this.form10List.Item1016Set["results"] = [];
  //   for (let i = 0; i < this.ZCD4.controls.length; i++) {
  //     this.form10List.Item1016Set["results"].push({});
  //     this.form10List.Item1016Set["results"][i]["AccName"] = this.ZCD4.controls[i].value.AccName;
  //     this.form10List.Item1016Set["results"][i]["ZakatReason"] = this.ZCD4.controls[i].value.ZakatReason;
  //     this.form10List.Item1016Set["results"][i]["Amount"] = this.ZCD4.controls[i].value.Amount;
  //     this.form10List.Item1016Set["results"][i]["FormGuid"] = fbguid3;
  //     this.form10List.Item1016Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let fbguid4 = this.form10List.Item1009Set["results"][0]["FormGuid"];
  //   this.form10List.Item1009Set["results"] = [];
  //   for (let i = 0; i < this.ZCD3.controls.length; i++) {
  //     this.form10List.Item1009Set["results"].push({});
  //     this.form10List.Item1009Set["results"][i]["Statement"] = this.ZCD3.controls[i].value.Statement;
  //     this.form10List.Item1009Set["results"][i]["BegBal"] = this.ZCD3.controls[i].value.BegBal;
  //     this.form10List.Item1009Set["results"][i]["Addition"] = this.ZCD3.controls[i].value.Addition;
  //     this.form10List.Item1009Set["results"][i]["DispCost"] = this.ZCD3.controls[i].value.DispCost;
  //     this.form10List.Item1009Set["results"][i]["EndBal"] = this.ZCD3.controls[i].value.EndBal;
  //     this.form10List.Item1009Set["results"][i]["TotSale"] = this.ZCD3.controls[i].value.TotSale;
  //     this.form10List.Item1009Set["results"][i]["CusTotPay"] = this.ZCD3.controls[i].value.CusTotPay;
  //     this.form10List.Item1009Set["results"][i]["Per"] = this.ZCD3.controls[i].value.Per;
  //     this.form10List.Item1009Set["results"][i]["DedBase"] = this.ZCD3.controls[i].value.DedBase;
  //     this.form10List.Item1009Set["results"][i]["FormGuid"] = fbguid4;
  //     this.form10List.Item1009Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let fbguid5 = this.form10List.Item1017Set["results"][0]["FormGuid"];
  //   this.form10List.Item1017Set["results"] = [];
  //   for (let i = 0; i < this.TaxBaseD1.controls.length; i++) {
  //     this.form10List.Item1017Set["results"].push({});
  //     this.form10List.Item1017Set["results"][i]["CitCarryLoss"] = this.TaxBaseD1.controls[i].value.CitCarryLoss;
  //     this.form10List.Item1017Set["results"][i]["AdjDeclProfit"] = this.TaxBaseD1.controls[i].value.AdjDeclProfit;
  //     this.form10List.Item1017Set["results"][i]["LossDedCyr"] = this.TaxBaseD1.controls[i].value.LossDedCyr;
  //     this.form10List.Item1017Set["results"][i]["EndYrbal"] = this.TaxBaseD1.controls[i].value.EndYrbal;
  //     this.form10List.Item1017Set["results"][i]["FormGuid"] = fbguid5;
  //     this.form10List.Item1017Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let fbguid6 = this.form10List.Item1018Set["results"][0]["FormGuid"];
  //   this.form10List.Item1018Set["results"] = [];
  //   for (let i = 0; i < this.TaxBaseD2.controls.length; i++) {
  //     this.form10List.Item1018Set["results"].push({});
  //     this.form10List.Item1018Set["results"][i]["TotInsuPre"] = this.TaxBaseD2.controls[i].value.TotInsuPre;
  //     this.form10List.Item1018Set["results"][i]["CanInsuPre"] = this.TaxBaseD2.controls[i].value.CanInsuPre;
  //     this.form10List.Item1018Set["results"][i]["LocReisnuPremi"] = this.TaxBaseD2.controls[i].value.LocReisnuPremi;
  //     this.form10List.Item1018Set["results"][i]["ExtReisnuPremi"] = this.TaxBaseD2.controls[i].value.ExtReisnuPremi;
  //     this.form10List.Item1018Set["results"][i]["NetPremEar"] = this.TaxBaseD2.controls[i].value.NetPremEar;
  //     this.form10List.Item1018Set["results"][i]["ResCompPyr"] = this.TaxBaseD2.controls[i].value.ResCompPyr;
  //     this.form10List.Item1018Set["results"][i]["ResCompExiPyr"] = this.TaxBaseD2.controls[i].value.ResCompExiPyr;
  //     this.form10List.Item1018Set["results"][i]["TotResePyr"] = this.TaxBaseD2.controls[i].value.TotResePyr;
  //     this.form10List.Item1018Set["results"][i]["LocGeneIns"] = this.TaxBaseD2.controls[i].value.LocGeneIns;
  //     this.form10List.Item1018Set["results"][i]["GloGeneIns"] = this.TaxBaseD2.controls[i].value.GloGeneIns;
  //     this.form10List.Item1018Set["results"][i]["GloInveIncome"] = this.TaxBaseD2.controls[i].value.GloInveIncome;
  //     this.form10List.Item1018Set["results"][i]["NonInvsnuReven"] = this.TaxBaseD2.controls[i].value.NonInvsnuReven;
  //     this.form10List.Item1018Set["results"][i]["PerOthsnuIncom"] = this.TaxBaseD2.controls[i].value.PerOthsnuIncom;
  //     this.form10List.Item1018Set["results"][i]["Total1"] = this.TaxBaseD2.controls[i].value.Total1;
  //     this.form10List.Item1018Set["results"][i]["ComPaidDanger"] = this.TaxBaseD2.controls[i].value.ComPaidDanger;
  //     this.form10List.Item1018Set["results"][i]["AmtCovReinsurance"] = this.TaxBaseD2.controls[i].value.AmtCovReinsurance;
  //     this.form10List.Item1018Set["results"][i]["NetCompaPaid"] = this.TaxBaseD2.controls[i].value.NetCompaPaid;
  //     this.form10List.Item1018Set["results"][i]["UnprePaidCyr"] = this.TaxBaseD2.controls[i].value.UnprePaidCyr;
  //     this.form10List.Item1018Set["results"][i]["ExistingRevCyr"] = this.TaxBaseD2.controls[i].value.ExistingRevCyr;
  //     this.form10List.Item1018Set["results"][i]["NonlegalDed"] = this.TaxBaseD2.controls[i].value.NonlegalDed;
  //     this.form10List.Item1018Set["results"][i]["GenAdminExp"] = this.TaxBaseD2.controls[i].value.GenAdminExp;
  //     this.form10List.Item1018Set["results"][i]["PreEstShareMain"] = this.TaxBaseD2.controls[i].value.PreEstShareMain;
  //     this.form10List.Item1018Set["results"][i]["Total2"] = this.TaxBaseD2.controls[i].value.Total2;
  //     this.form10List.Item1018Set["results"][i]["Total1Total2"] = this.TaxBaseD2.controls[i].value.Total1Total2;
  //     this.form10List.Item1018Set["results"][i]["LocGenInsPreWri"] = this.TaxBaseD2.controls[i].value.LocGenInsPreWri;
  //     this.form10List.Item1018Set["results"][i]["GlobGenInsPreWri"] = this.TaxBaseD2.controls[i].value.GlobGenInsPreWri;
  //     this.form10List.Item1018Set["results"][i]["GlobNetProfitTax"] = this.TaxBaseD2.controls[i].value.GlobNetProfitTax;
  //     this.form10List.Item1018Set["results"][i]["TaxBase"] = this.TaxBaseD2.controls[i].value.TaxBase;
  //     this.form10List.Item1018Set["results"][i]["TaxableInsuActivity"] = this.TaxBaseD2.controls[i].value.TaxableInsuActivity;
  //     this.form10List.Item1018Set["results"][i]["LocSavPerWriteu"] = this.TaxBaseD2.controls[i].value.LocSavPerWriteu;
  //     this.form10List.Item1018Set["results"][i]["SavingGlobalInsuu"] = this.TaxBaseD2.controls[i].value.SavingGlobalInsuu;
  //     this.form10List.Item1018Set["results"][i]["GlobalInvestIncome"] = this.TaxBaseD2.controls[i].value.GlobalInvestIncome;
  //     this.form10List.Item1018Set["results"][i]["PerEstableshIncome"] = this.TaxBaseD2.controls[i].value.PerEstableshIncome;
  //     this.form10List.Item1018Set["results"][i]["LocSavPerWrite"] = this.TaxBaseD2.controls[i].value.LocSavPerWrite;
  //     this.form10List.Item1018Set["results"][i]["SavingGlobalInsu"] = this.TaxBaseD2.controls[i].value.SavingGlobalInsu;
  //     this.form10List.Item1018Set["results"][i]["GenAdminMainCenter"] = this.TaxBaseD2.controls[i].value.GenAdminMainCenter;
  //     this.form10List.Item1018Set["results"][i]["PerEstableshMainCen"] = this.TaxBaseD2.controls[i].value.PerEstableshMainCen;
  //     this.form10List.Item1018Set["results"][i]["LocSavPerWritet"] = this.TaxBaseD2.controls[i].value.LocSavPerWritet;
  //     this.form10List.Item1018Set["results"][i]["SavingGlobalInsuv"] = this.TaxBaseD2.controls[i].value.SavingGlobalInsuv;
  //     this.form10List.Item1018Set["results"][i]["GenAdminMainCenterv"] = this.TaxBaseD2.controls[i].value.GenAdminMainCenterv;
  //     this.form10List.Item1018Set["results"][i]["PerEstableshMainCenv"] = this.TaxBaseD2.controls[i].value.PerEstableshMainCenv;
  //     this.form10List.Item1018Set["results"][i]["TotalTaxPerEsta"] = this.TaxBaseD2.controls[i].value.TotalTaxPerEsta;
  //     this.form10List.Item1018Set["results"][i]["RevenuLoan"] = this.TaxBaseD2.controls[i].value.RevenuLoan;
  //     this.form10List.Item1018Set["results"][i]["RealizedGains"] = this.TaxBaseD2.controls[i].value.RealizedGains;
  //     this.form10List.Item1018Set["results"][i]["TaxbasedActivity"] = this.TaxBaseD2.controls[i].value.TaxbasedActivity;
  //     this.form10List.Item1018Set["results"][i]["PerEstaTax"] = this.TaxBaseD2.controls[i].value.PerEstaTax;
  //     this.form10List.Item1018Set["results"][i]["FormGuid"] = fbguid6;
  //     this.form10List.Item1018Set["results"][i]["LineNo"] = i + 1;
  //   }
  //   let Item1001SetData = this.Item1001Set;
  //   this.form10List.Item1001Set["results"] = [];
  //   for (let i = 0; i < Item1001SetData.length; i++) {
  //     this.form10List.Item1001Set["results"].push({});
  //     this.form10List.Item1001Set["results"][i]["FormGuid"] = Item1001SetData[i].FormGuid;
  //     this.form10List.Item1001Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1001Set["results"][i]["OriContraValue"] = Item1001SetData[i].OriContraValue;
  //     this.form10List.Item1001Set["results"][i]["PrevYrFg"] = Item1001SetData[i].PrevYrFg;
  //     this.form10List.Item1001Set["results"][i]["AmedContraValue"] = Item1001SetData[i].AmedContraValue;
  //     this.form10List.Item1001Set["results"][i]["Mandt"] = Item1001SetData[i].Mandt;
  //     this.form10List.Item1001Set["results"][i]["ContraAftAmed"] = Item1001SetData[i].ContraAftAmed.toString();
  //     this.form10List.Item1001Set["results"][i]["DataVersion"] = Item1001SetData[i].DataVersion;
  //     this.form10List.Item1001Set["results"][i]["ActualCost"] = Item1001SetData[i].ActualCost;
  //     this.form10List.Item1001Set["results"][i]["RankingOrder"] = Item1001SetData[i].RankingOrder;
  //     this.form10List.Item1001Set["results"][i]["EstimateCost"] = Item1001SetData[i].EstimateCost;
  //     this.form10List.Item1001Set["results"][i]["IdTp"] = Item1001SetData[i].IdTp;
  //     this.form10List.Item1001Set["results"][i]["CpmplePercentage"] = Item1001SetData[i].CpmplePercentage;
  //     this.form10List.Item1001Set["results"][i]["IdNo"] = Item1001SetData[i].IdNo;
  //     this.form10List.Item1001Set["results"][i]["RevenueCompletion"] = Item1001SetData[i].RevenueCompletion;
  //     this.form10List.Item1001Set["results"][i]["ContraPatry"] = Item1001SetData[i].ContraPatry;
  //     this.form10List.Item1001Set["results"][i]["PreyrRevenue"] = Item1001SetData[i].PreyrRevenue;
  //     this.form10List.Item1001Set["results"][i]["Waers"] = Item1001SetData[i].Waers;
  //     this.form10List.Item1001Set["results"][i]["CuryrRevenue"] = Item1001SetData[i].CuryrRevenue;
  //     this.form10List.Item1001Set["results"][i]["ReturnId"] = Item1001SetData[i].ReturnId;
  //     this.form10List.Item1001Set["results"][i]["ContractDt"] = "\/Date(" + new Date(Item1001SetData[i].ContractDt).getTime() + ")\/" || null;
  //     this.form10List.Item1001Set["results"][i]["TimestampCr"] = Item1001SetData[i].TimestampCr;
  //     this.form10List.Item1001Set["results"][i]["TimestampCh"] = Item1001SetData[i].TimestampCh;
  //   }

  //   this.form10List.Item1002Set["results"] = [];
  //   // this.form10List.Item1002Set["results"] = this.Item1002Set;
  //   // for (let i = 0; i < Item1002SetData.length; i++) {
  //   this.form10List.Item1002Set["results"].push({});
  //   this.form10List.Item1002Set["results"][0]["FormGuid"] = this.Item1002Set.FormGuid;
  //   this.form10List.Item1002Set["results"][0]["LineNo"] = 1;
  //   this.form10List.Item1002Set["results"][0]["NetPremium"] = this.Item1002Set.NetPremium;
  //   this.form10List.Item1002Set["results"][0]["TotInsuPremium"] = this.Item1002Set.TotInsuPremium;
  //   this.form10List.Item1002Set["results"][0]["TotInsuIncome"] = this.Item1002Set.TotInsuIncome;
  //   this.form10List.Item1002Set["results"][0]["CanInsuPremium"] = this.Item1002Set.CanInsuPremium;
  //   this.form10List.Item1002Set["results"][0]["Mandt"] = this.Item1002Set.Mandt;
  //   this.form10List.Item1002Set["results"][0]["DataVersion"] = this.Item1002Set.DataVersion;
  //   this.form10List.Item1002Set["results"][0]["ReinsuPremium"] = this.Item1002Set.ReinsuPremium;
  //   this.form10List.Item1002Set["results"][0]["RankingOrder"] = this.Item1002Set.RankingOrder;
  //   this.form10List.Item1002Set["results"][0]["ReinsuPremiumFore"] = this.Item1002Set.ReinsuPremiumFore;
  //   this.form10List.Item1002Set["results"][0]["Waers"] = this.Item1002Set.Waers;
  //   this.form10List.Item1002Set["results"][0]["ReinsuFee"] = this.Item1002Set.ReinsuFee;
  //   this.form10List.Item1002Set["results"][0]["ReturnId"] = this.Item1002Set.ReturnId;
  //   this.form10List.Item1002Set["results"][0]["DiffInstallment"] = this.Item1002Set.DiffInstallment;
  //   this.form10List.Item1002Set["results"][0]["InvesIncome"] = this.Item1002Set.InvesIncome;
  //   this.form10List.Item1002Set["results"][0]["OthIncome"] = this.Item1002Set.OthIncome;
  //   this.form10List.Item1002Set["results"][0]["TimestampCr"] = this.Item1002Set.TimestampCr;
  //   this.form10List.Item1002Set["results"][0]["TimestampCh"] = this.Item1002Set.TimestampCh;
  //   // }
  //   this.form10List.Item1004Set["results"] = [];
  //   for (let i = 0; i < this.Item1004Set.length; i++) {
  //     this.form10List.Item1004Set["results"].push({});
  //     this.form10List.Item1004Set["results"][i]["WorkValue"] = this.Item1004Set[i].WorkValue;
  //     this.form10List.Item1004Set["results"][i]["TimestampCr"] = this.Item1004Set[i].TimestampCr;
  //     this.form10List.Item1004Set["results"][i]["TimestampCh"] = this.Item1004Set[i].TimestampCh;
  //     this.form10List.Item1004Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1004Set["results"][i]["FormGuid"] = this.Item1004Set[i].FormGuid;
  //     this.form10List.Item1004Set["results"][i]["Mandt"] = this.Item1004Set[i].Mandt;
  //     this.form10List.Item1004Set["results"][i]["DataVersion"] = this.Item1004Set[i].DataVersion;
  //     this.form10List.Item1004Set["results"][i]["RankingOrder"] = this.Item1004Set[i].RankingOrder;
  //     this.form10List.Item1004Set["results"][i]["IdTp"] = this.Item1004Set[i].IdTp;
  //     this.form10List.Item1004Set["results"][i]["IdNo"] = this.Item1004Set[i].IdNo;
  //     this.form10List.Item1004Set["results"][i]["Country"] = this.Item1004Set[i].Country;
  //     this.form10List.Item1004Set["results"][i]["ContraName"] = this.Item1004Set[i].ContraName;
  //     this.form10List.Item1004Set["results"][i]["Waers"] = this.Item1004Set[i].Waers;
  //     this.form10List.Item1004Set["results"][i]["ReturnId"] = this.Item1004Set[i].ReturnId;
  //   }
  //   this.form10List.Item1013Set["results"] = [];
  //   for (let i = 0; i < this.Item1013Set.length; i++) {
  //     this.form10List.Item1013Set["results"].push({});
  //     this.form10List.Item1013Set["results"][i]["BegYrBal"] = this.Item1013Set[i].BegYrBal;
  //     this.form10List.Item1013Set["results"][i]["TimestampCr"] = this.Item1013Set[i].TimestampCr;
  //     this.form10List.Item1013Set["results"][i]["TimestampCh"] = this.Item1013Set[i].TimestampCh;
  //     this.form10List.Item1013Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1013Set["results"][i]["FormGuid"] = this.Item1013Set[i].FormGuid;
  //     this.form10List.Item1013Set["results"][i]["AccCharged"] = this.Item1013Set[i].AccCharged;
  //     this.form10List.Item1013Set["results"][i]["PaidYear"] = this.Item1013Set[i].PaidYear;
  //     this.form10List.Item1013Set["results"][i]["EndYrBal"] = this.Item1013Set[i].EndYrBal;
  //     this.form10List.Item1013Set["results"][i]["DataVersion"] = this.Item1013Set[i].DataVersion;
  //     this.form10List.Item1013Set["results"][i]["RankingOrder"] = this.Item1013Set[i].RankingOrder;
  //     this.form10List.Item1013Set["results"][i]["IdTp"] = this.Item1013Set[i].IdTp;
  //     this.form10List.Item1013Set["results"][i]["IdNo"] = this.Item1013Set[i].IdNo;
  //     this.form10List.Item1013Set["results"][i]["BeniName"] = this.Item1013Set[i].BeniName;
  //     this.form10List.Item1013Set["results"][i]["Residancy"] = this.Item1013Set[i].Residancy;
  //     this.form10List.Item1013Set["results"][i]["Country"] = this.Item1013Set[i].Country;
  //     this.form10List.Item1013Set["results"][i]["Waers"] = this.Item1013Set[i].Waers;
  //     this.form10List.Item1013Set["results"][i]["ReturnId"] = this.Item1013Set[i].ReturnId;
  //   }
  //   this.form10List.Item1005Set["results"] = [];
  //   for (let i = 0; i < this.Item1005Set.length; i++) {
  //     this.form10List.Item1005Set["results"].push({});
  //     this.form10List.Item1005Set["results"][i]["ProBalSperiod"] = this.Item1005Set[i].ProBalSperiod;
  //     this.form10List.Item1005Set["results"][i]["TimestampCr"] = this.Item1005Set[i].TimestampCr;
  //     this.form10List.Item1005Set["results"][i]["TimestampCh"] = this.Item1005Set[i].TimestampCh;
  //     this.form10List.Item1005Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1005Set["results"][i]["FormGuid"] = this.Item1005Set[i].FormGuid;
  //     this.form10List.Item1005Set["results"][i]["ProBalPeriod"] = this.Item1005Set[i].ProBalPeriod;
  //     this.form10List.Item1005Set["results"][i]["ProBalUtili"] = this.Item1005Set[i].ProBalUtili;
  //     this.form10List.Item1005Set["results"][i]["Adjacement"] = this.Item1005Set[i].Adjacement;
  //     this.form10List.Item1005Set["results"][i]["PrevYrFg"] = this.Item1005Set[i].PrevYrFg;
  //     this.form10List.Item1005Set["results"][i]["ProBalEperiod"] = this.Item1005Set[i].ProBalEperiod;
  //     this.form10List.Item1005Set["results"][i]["Mandt"] = this.Item1005Set[i].Mandt;
  //     this.form10List.Item1005Set["results"][i]["DataVersion"] = this.Item1005Set[i].DataVersion;
  //     this.form10List.Item1005Set["results"][i]["RankingOrder"] = this.Item1005Set[i].RankingOrder;
  //     this.form10List.Item1005Set["results"][i]["Name"] = this.Item1005Set[i].Name;
  //     this.form10List.Item1005Set["results"][i]["Waers"] = this.Item1005Set[i].Waers;
  //     this.form10List.Item1005Set["results"][i]["ReturnId"] = this.Item1005Set[i].ReturnId;
  //   }
  //   this.form10List.Item1006Set["results"] = [];
  //   for (let i = 0; i < this.Item1006Set.length; i++) {
  //     this.form10List.Item1006Set["results"].push({});
  //     this.form10List.Item1006Set["results"][i]["Amount"] = this.Item1006Set[i].Amount;
  //     this.form10List.Item1006Set["results"][i]["TimestampCr"] = this.Item1006Set[i].TimestampCr;
  //     this.form10List.Item1006Set["results"][i]["TimestampCh"] = this.Item1006Set[i].TimestampCh;
  //     this.form10List.Item1006Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1006Set["results"][i]["FormGuid"] = this.Item1006Set[i].FormGuid;
  //     this.form10List.Item1006Set["results"][i]["Mandt"] = this.Item1006Set[i].Mandt;
  //     this.form10List.Item1006Set["results"][i]["DataVersion"] = this.Item1006Set[i].DataVersion;
  //     this.form10List.Item1006Set["results"][i]["RankingOrder"] = this.Item1006Set[i].RankingOrder;
  //     this.form10List.Item1006Set["results"][i]["Srno"] = this.Item1006Set[i].Srno;
  //     this.form10List.Item1006Set["results"][i]["Statement"] = this.Item1006Set[i].Statement;
  //     this.form10List.Item1006Set["results"][i]["Waers"] = this.Item1006Set[i].Waers;
  //     this.form10List.Item1006Set["results"][i]["ReturnId"] = this.Item1006Set[i].ReturnId;
  //   }
  //   this.form10List.Item1008Set["results"] = [];
  //   for (let i = 0; i < this.Item1008Set.length; i++) {
  //     this.form10List.Item1008Set["results"].push({});
  //     this.form10List.Item1008Set["results"][i]["Amount"] = this.Item1008Set[i].Amount;
  //     this.form10List.Item1008Set["results"][i]["TimestampCr"] = this.Item1008Set[i].TimestampCr;
  //     this.form10List.Item1008Set["results"][i]["TimestampCh"] = this.Item1008Set[i].TimestampCh;
  //     this.form10List.Item1008Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1008Set["results"][i]["FormGuid"] = this.Item1008Set[i].FormGuid;
  //     this.form10List.Item1008Set["results"][i]["Mandt"] = this.Item1008Set[i].Mandt;
  //     this.form10List.Item1008Set["results"][i]["DataVersion"] = this.Item1008Set[i].DataVersion;
  //     this.form10List.Item1008Set["results"][i]["RankingOrder"] = this.Item1008Set[i].RankingOrder;
  //     this.form10List.Item1008Set["results"][i]["ZakatShare"] = this.Item1008Set[i].ZakatShare;
  //     this.form10List.Item1008Set["results"][i]["TaxShare"] = this.Item1008Set[i].TaxShare;
  //     this.form10List.Item1008Set["results"][i]["AmendName"] = this.Item1008Set[i].AmendName;
  //     this.form10List.Item1008Set["results"][i]["Description"] = this.Item1008Set[i].Description;
  //     this.form10List.Item1008Set["results"][i]["AmendTyp"] = this.Item1008Set[i].AmendTyp;
  //     this.form10List.Item1008Set["results"][i]["Waers"] = this.Item1008Set[i].Waers;
  //     this.form10List.Item1008Set["results"][i]["ReturnId"] = this.Item1008Set[i].ReturnId;
  //     this.form10List.Item1008Set["results"][i]["LinoNo"] = this.Item1008Set[i].LinoNo;
  //   }
  //   this.form10List.Item1003Set["results"] = [];
  //   for (let i = 0; i < this.Item1003Set.length; i++) {
  //     this.form10List.Item1003Set["results"].push({});
  //     this.form10List.Item1003Set["results"][i]["TotGrpvalEod"] = this.Item1003Set[i].TotGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["Waers"] = this.Item1003Set[i].Waers;
  //     this.form10List.Item1003Set["results"][i]["TimestampCr"] = this.Item1003Set[i].TimestampCr;
  //     this.form10List.Item1003Set["results"][i]["LineNo"] = i + 1;
  //     this.form10List.Item1003Set["results"][i]["FormGuid"] = this.Item1003Set[i].FormGuid;
  //     this.form10List.Item1003Set["results"][i]["TotCostPyrAddition"] = this.Item1003Set[i].TotCostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["TimestampCh"] = this.Item1003Set[i].TimestampCh;
  //     this.form10List.Item1003Set["results"][i]["TotCostCyrAddition"] = this.Item1003Set[i].TotCostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["ReturnId"] = this.Item1003Set[i].ReturnId;
  //     this.form10List.Item1003Set["results"][i]["TotCost50Pcyr"] = this.Item1003Set[i].TotCost50Pcyr;
  //     this.form10List.Item1003Set["results"][i]["RankingOrder"] = this.Item1003Set[i].RankingOrder;
  //     this.form10List.Item1003Set["results"][i]["TotComesAssetPyr"] = this.Item1003Set[i].TotComesAssetPyr;
  //     this.form10List.Item1003Set["results"][i]["Mandt"] = this.Item1003Set[i].Mandt;
  //     this.form10List.Item1003Set["results"][i]["TotComesAssetCyr"] = this.Item1003Set[i].TotComesAssetCyr;
  //     this.form10List.Item1003Set["results"][i]["TotTotCost50AssetPcyr"] = this.Item1003Set[i].TotTotCost50AssetPcyr;
  //     this.form10List.Item1003Set["results"][i]["FTotCost50Pcyr"] = this.Item1003Set[i].FTotCost50Pcyr;

  //     this.form10List.Item1003Set["results"][i]["TotGrpRem"] = this.Item1003Set[i].TotGrpRem;
  //     this.form10List.Item1003Set["results"][i]["FTotCost50AssetPcyr"] = this.Item1003Set[i].FTotCost50AssetPcyr;
  //     this.form10List.Item1003Set["results"][i]["TotDepAmotRatio"] = this.Item1003Set[i].TotDepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["FRemValueCyr"] = this.Item1003Set[i].FRemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["TotDepAmotValue"] = this.Item1003Set[i].TotDepAmotValue;
  //     this.form10List.Item1003Set["results"][i]["FormGuid"] = this.Item1003Set[i].FormGuid;
  //     this.form10List.Item1003Set["results"][i]["TotRemValueCyr"] = this.Item1003Set[i].TotRemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["FMaint4exp"] = this.Item1003Set[i].FMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["TotGrpMaintCost"] = this.Item1003Set[i].TotGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["FGrpvalEod"] = this.Item1003Set[i].FGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["TotMaint4exp"] = this.Item1003Set[i].TotMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["FGrpRem"] = this.Item1003Set[i].FGrpRem;
  //     this.form10List.Item1003Set["results"][i]["TotGrpCyr"] = this.Item1003Set[i].TotGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["FGrpMaintCost"] = this.Item1003Set[i].FGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["FGrpCyr"] = this.Item1003Set[i].FGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["FDepAmotValue"] = this.Item1003Set[i].FDepAmotValue;

  //     this.form10List.Item1003Set["results"][i]["FDepAmotRatio"] = this.Item1003Set[i].FDepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["FCostPyrAddition"] = this.Item1003Set[i].FCostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["FCostCyrAddition"] = this.Item1003Set[i].FCostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["FComesAssetPyr"] = this.Item1003Set[i].FComesAssetPyr;
  //     this.form10List.Item1003Set["results"][i]["FComesAssetCyr"] = this.Item1003Set[i].FComesAssetCyr;
  //     this.form10List.Item1003Set["results"][i]["ETotCost50Pcyr"] = this.Item1003Set[i].ETotCost50Pcyr;
  //     this.form10List.Item1003Set["results"][i]["ETotCost50AssetPcyr"] = this.Item1003Set[i].ETotCost50AssetPcyr;
  //     this.form10List.Item1003Set["results"][i]["ERemValueCyr"] = this.Item1003Set[i].ERemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["EMaint4exp"] = this.Item1003Set[i].EMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["EGrpvalEod"] = this.Item1003Set[i].EGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["EGrpRem"] = this.Item1003Set[i].EGrpRem;
  //     this.form10List.Item1003Set["results"][i]["EGrpMaintCost"] = this.Item1003Set[i].EGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["EGrpCyr"] = this.Item1003Set[i].EGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["EDepAmotValue"] = this.Item1003Set[i].EDepAmotValue;
  //     this.form10List.Item1003Set["results"][i]["EDepAmotRatio"] = this.Item1003Set[i].EDepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["ECostPyrAddition"] = this.Item1003Set[i].ECostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["ECostCyrAddition"] = this.Item1003Set[i].ECostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["EComesAssetPyr"] = this.Item1003Set[i].EComesAssetPyr;
  //     this.form10List.Item1003Set["results"][i]["EComesAssetCyr"] = this.Item1003Set[i].EComesAssetCyr;
  //     this.form10List.Item1003Set["results"][i]["DTotCost50Pcyr"] = this.Item1003Set[i].DTotCost50Pcyr;
  //     this.form10List.Item1003Set["results"][i]["DTotCost50AssetPcyr"] = this.Item1003Set[i].DTotCost50AssetPcyr;
  //     this.form10List.Item1003Set["results"][i]["DRemValueCyr"] = this.Item1003Set[i].DRemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["DMaint4exp"] = this.Item1003Set[i].DMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["DGrpvalEod"] = this.Item1003Set[i].DGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["DGrpRem"] = this.Item1003Set[i].DGrpRem;
  //     this.form10List.Item1003Set["results"][i]["DGrpMaintCost"] = this.Item1003Set[i].DGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["DGrpCyr"] = this.Item1003Set[i].DGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["DDepAmotValue"] = this.Item1003Set[i].DDepAmotValue;
  //     this.form10List.Item1003Set["results"][i]["DDepAmotRatio"] = this.Item1003Set[i].DDepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["DCostPyrAddition"] = this.Item1003Set[i].DCostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["DCostCyrAddition"] = this.Item1003Set[i].DCostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["DComesAssetPyr"] = this.Item1003Set[i].DComesAssetPyr;

  //     this.form10List.Item1003Set["results"][i]["DComesAssetCyr"] = this.Item1003Set[i].DComesAssetCyr;
  //     this.form10List.Item1003Set["results"][i]["DataVersion"] = this.Item1003Set[i].DataVersion;
  //     this.form10List.Item1003Set["results"][i]["CTotCost50Pcyr"] = this.Item1003Set[i].CTotCost50Pcyr;
  //     this.form10List.Item1003Set["results"][i]["CTotCost50AssetPcyr"] = this.Item1003Set[i].CTotCost50AssetPcyr;
  //     this.form10List.Item1003Set["results"][i]["CRemValueCyr"] = this.Item1003Set[i].CRemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["CMaint4exp"] = this.Item1003Set[i].CMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["CGrpvalEod"] = this.Item1003Set[i].CGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["CGrpRem"] = this.Item1003Set[i].CGrpRem;
  //     this.form10List.Item1003Set["results"][i]["CGrpMaintCost"] = this.Item1003Set[i].CGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["CGrpCyr"] = this.Item1003Set[i].CGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["CDepAmotValue"] = this.Item1003Set[i].CDepAmotValue;
  //     this.form10List.Item1003Set["results"][i]["CDepAmotRatio"] = this.Item1003Set[i].CDepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["CCostPyrAddition"] = this.Item1003Set[i].CCostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["CCostCyrAddition"] = this.Item1003Set[i].CCostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["CComesAssetPyr"] = this.Item1003Set[i].CComesAssetPyr;
  //     this.form10List.Item1003Set["results"][i]["CComesAssetCyr"] = this.Item1003Set[i].CComesAssetCyr;
  //     this.form10List.Item1003Set["results"][i]["BTotCost50Pcyr"] = this.Item1003Set[i].BTotCost50Pcyr;
  //     this.form10List.Item1003Set["results"][i]["BTotCost50AssetPcyr"] = this.Item1003Set[i].BTotCost50AssetPcyr;
  //     this.form10List.Item1003Set["results"][i]["BRemValueCyr"] = this.Item1003Set[i].BRemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["BMaint4exp"] = this.Item1003Set[i].BMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["BGrpvalEod"] = this.Item1003Set[i].BGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["BGrpRem"] = this.Item1003Set[i].BGrpRem;
  //     this.form10List.Item1003Set["results"][i]["BGrpMaintCost"] = this.Item1003Set[i].BGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["BGrpCyr"] = this.Item1003Set[i].BGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["BDepAmotValue"] = this.Item1003Set[i].BDepAmotValue;
  //     this.form10List.Item1003Set["results"][i]["BDepAmotRatio"] = this.Item1003Set[i].BDepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["BCostPyrAddition"] = this.Item1003Set[i].BCostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["BCostCyrAddition"] = this.Item1003Set[i].BCostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["BComesAssetPyr"] = this.Item1003Set[i].BComesAssetPyr;
  //     this.form10List.Item1003Set["results"][i]["BComesAssetCyr"] = this.Item1003Set[i].BComesAssetCyr;
  //     this.form10List.Item1003Set["results"][i]["ATotCost50Pcyr"] = this.Item1003Set[i].ATotCost50Pcyr;
  //     this.form10List.Item1003Set["results"][i]["ATotCost50AssetPcyr"] = this.Item1003Set[i].ATotCost50AssetPcyr;

  //     this.form10List.Item1003Set["results"][i]["ARemValueCyr"] = this.Item1003Set[i].ARemValueCyr;
  //     this.form10List.Item1003Set["results"][i]["AMaint4exp"] = this.Item1003Set[i].AMaint4exp;
  //     this.form10List.Item1003Set["results"][i]["AGrpvalEod"] = this.Item1003Set[i].AGrpvalEod;
  //     this.form10List.Item1003Set["results"][i]["AGrpRem"] = this.Item1003Set[i].AGrpRem;
  //     this.form10List.Item1003Set["results"][i]["AGrpMaintCost"] = this.Item1003Set[i].AGrpMaintCost;
  //     this.form10List.Item1003Set["results"][i]["AGrpCyr"] = this.Item1003Set[i].AGrpCyr;
  //     this.form10List.Item1003Set["results"][i]["ADepAmotValue"] = this.Item1003Set[i].ADepAmotValue;
  //     this.form10List.Item1003Set["results"][i]["ADepAmotRatio"] = this.Item1003Set[i].ADepAmotRatio;
  //     this.form10List.Item1003Set["results"][i]["ACostPyrAddition"] = this.Item1003Set[i].ACostPyrAddition;
  //     this.form10List.Item1003Set["results"][i]["ACostCyrAddition"] = this.Item1003Set[i].ACostCyrAddition;
  //     this.form10List.Item1003Set["results"][i]["AComesAssetPyr"] = this.Item1003Set[i].AComesAssetPyr;
  //     this.form10List.Item1003Set["results"][i]["AComesAssetCyr"] = this.Item1003Set[i].AComesAssetCyr;
  //   }

  //   this.returnsService.submitForm10(this.form10List).subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
  GetAmendForm10() {
    return this.returnsService.getForm10Amend(this.Fbnum).subscribe((data) => {
      console.log("amend", data["d"]);
      this.IsAmendClick = true;
      if (data["d"].Amdstatus == "P") {
      } else if (
        data["d"].Amdstatus == "P" &&
        data["d"].msgtxtSet.results.length > 0 &&
        data["d"].msgtxtSet.results[0]["Msgno"] == "473"
      ) {
      } else if (data["d"].Amdstatus == "A" && data["d"].Amdflg == "Y") {
        this.getForm10Details();
        this.step = 2;
        this.IsAmendShow = false;
      }
      //this.ServiceDetails = data["d"] || [];
      // this.AmendTypeDropDownList = this.ServiceDetails['DropdownSet']['results'].filter(x => x.FormNoNm == 'ZDGD_1008' && x.FieldNm == 'AMEND_TYP');
      // this.InvestmentTypeDropDownList = this.ServiceDetails['DropdownSet']['results'].filter(x => x.FormNoNm == 'ZDGD_1011' && x.FieldNm == 'INV_TYPE');
      // this.LAEDropDownlist = this.ServiceDetails['DropdownSet']['results'].filter(x => x.FormNoNm == 'ZDGD_1012' && x.FieldNm == 'LOCAL_FORE');
    });
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //purna end
  //Phani Start
  get Provisions(): FormArray {
    return this.ProvisionsForm.get("Provisions") as FormArray;
  }
  get LoanCharges(): FormArray {
    return this.LoanChargesForm.get("LoanCharges") as FormArray;
  }
  LoanThresholdAppilicableChange(event) {
    if (event.currentTarget.checked) {
      this.LoanChargesForm.patchValue({ Schedule: true });
      jQuery("#loancharge").modal("show");
      this.LoanCharges.push(this.LoanChargesGroup());
    } else {
      this.LoanChargesForm.patchValue({ Schedule: false });
      this.clearFormArray(this.LoanCharges);
      this.form10List.LoancrgAmt = "0.00";
      this.calLoanCharges();
      this.calAdjustments();
      jQuery("#loancharge").modal("hide");
      this.form10List.RLoanchagres = "";
    }
  }
  ProvisionsApplicableChange(event) {
    if (event.currentTarget.checked) {
      this.ProvisionsForm.patchValue({ Schedule: true });
      if (this.Provisions.length == 0) {
        this.addProvisionsForm();
      }
      jQuery("#ProvisionsSchedule").modal("show");
    } else {
      this.ProvisionsForm.patchValue({ Schedule: false });
      this.clearFormArray(this.Provisions);
      this.calProvisions();
      this.calAdjustments();
      this.form10List.ZaddproAmt = "0.00";
      this.calcoverZC();
      jQuery("#ProvisionsSchedule").modal("hide");
      this.form10List.RProvision = "";
    }
  }
  ProvisionsGroup() {
    return this.fb.group({
      Name: ["", Validators.required],
      ProBalSperiod: ["0.00", Validators.required],
      ProBalPeriod: ["0.00", Validators.required],
      ProBalUtili: ["0.00", Validators.required],
      Adjacement: ["0.00", Validators.required],
      ProBalEperiod: ["0.00"],
    });
  }
  LoanChargesGroup() {
    return this.fb.group({
      TotLoanInt: ["0.00", Validators.required],
      TotLoanCharg: ["0.00", Validators.required],
      DedLoancharg: ["0.00"],
      NondedLoancharg: ["0.00"],
    });
  }
  addProvisionsForm() {
    let form = this.ProvisionsGroup();
    this.Provisions.push(form);
  }
  addMultipleProvisionsForms() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.addProvisionsForm();
    }
    this.addPopup();
    jQuery("#MultipleProvisionsFormsModal").modal("hide");
  }
  delProvisoinsForm(i) {
    const control = this.ProvisionsForm.get("Provisions") as FormArray;
    control.removeAt(i);
    this.calProvisions();
    if (control.length == 0) {
      this.addProvisionsForm();
    }
  }
  calProvisions() {
    this.ProvisionsTotal = 0;
    this.form10List.ProutiyerAmt = "0.00";
    this.form10List.ProloadAmt = "0.00";
    this.form10List.ExpProvisiYear = "0.00";
    this.form10List.ZaddproAmt = "0.00";
    for (let i = 0; i < this.Provisions.length; i++) {
      this.Provisions.controls[i].value.ProBalEperiod = "0.00";
      this.ProvisionsValidation[i] = 0;
      this.Provisions.controls[i].value.ProBalEperiod = (
        +this.Provisions.controls[i].value.ProBalSperiod +
        +this.Provisions.controls[i].value.ProBalPeriod -
        +this.Provisions.controls[i].value.ProBalUtili +
        +this.Provisions.controls[i].value.Adjacement
      ).toFixed(2);
      this.Provisions.controls[i].setValue({
        Name: this.Provisions.controls[i].value.Name,
        ProBalSperiod: (+this.Provisions.controls[i].value
          .ProBalSperiod).toFixed(2),
        ProBalPeriod: (+this.Provisions.controls[i].value.ProBalPeriod).toFixed(
          2
        ),
        ProBalUtili: (+this.Provisions.controls[i].value.ProBalUtili).toFixed(
          2
        ),
        Adjacement: (+this.Provisions.controls[i].value.Adjacement).toFixed(2),
        ProBalEperiod: (+this.Provisions.controls[i].value
          .ProBalEperiod).toFixed(2),
      });
      this.ProvisionsValidation[i] =
        +this.Provisions.controls[i].value.ProBalSperiod +
        +this.Provisions.controls[i].value.ProBalPeriod;
      this.ProvisionsTotal = +(
        +this.ProvisionsTotal + +this.Provisions.controls[i].value.ProBalEperiod
      ).toFixed(2);
      this.form10List.ProutiyerAmt = (
        +this.form10List.ProutiyerAmt +
        +this.Provisions.controls[i].value.ProBalUtili
      ).toFixed(2);
      this.form10List.ProutiyerAmt =
        (this.form10List.ProutiyerAmt == "0.00" ? "" : "-") +
        this.form10List.ProutiyerAmt;
      this.form10List.ProloadAmt = (
        +this.form10List.ProloadAmt +
        +this.Provisions.controls[i].value.ProBalPeriod
      ).toFixed(2);
      this.form10List.ExpProvisiYear = (
        +this.form10List.ExpProvisiYear +
        +this.Provisions.controls[i].value.ProBalPeriod
      ).toFixed(2);
      this.form10List.ZaddproAmt = (
        +this.form10List.ZaddproAmt +
        (+this.Provisions.controls[i].value.ProBalSperiod -
          +this.Provisions.controls[i].value.ProBalUtili)
      ).toFixed(2);
    }
  }
  calLoanCharges() {
    this.LoanCharges.controls[0].value.DedLoancharg = "0.00";
    this.LoanCharges.controls[0].value.NondedLoancharg = "0.00";
    let Var11 = (
      parseFloat(this.form10List.TotalIncome) -
      parseFloat(this.LoanCharges.controls[0].value.TotLoanInt)
    ).toFixed(2);
    if (Var11 == "NaN") {
      Var11 = "0.00";
    }
    let Var12 = (
      parseFloat(this.form10List.ExpTotalGoods) -
      parseFloat(this.LoanCharges.controls[0].value.TotLoanCharg)
    ).toFixed(2);
    if (Var12 == "NaN") {
      Var12 = "0.00";
    }
    let Var13 = (
      parseFloat(Var12) - parseFloat(this.form10List.TotcitloansadAmt)
    ).toFixed(2);
    if (Var13 == "NaN") {
      Var13 = "0.00";
    }
    let Var14 = (
      parseFloat(this.LoanCharges.controls[0].value.TotLoanInt) +
      0.5 * (parseFloat(Var11) - parseFloat(Var13))
    ).toFixed(2);
    if (Var14 == "NaN") {
      Var14 = "0.00";
    }
    if (parseFloat(Var14) < 0) {
      this.LoanCharges.controls[0].value.DedLoancharg = "0.00";
    } else {
      this.LoanCharges.controls[0].value.DedLoancharg = Math.min(
        parseFloat(Var14),
        parseFloat(this.LoanCharges.controls[0].value.TotLoanCharg)
      ).toFixed(2);
    }
    this.LoanCharges.controls[0].value.NondedLoancharg = (
      parseFloat(this.LoanCharges.controls[0].value.TotLoanCharg) -
      parseFloat(this.LoanCharges.controls[0].value.DedLoancharg)
    ).toFixed(2);
    this.LoanCharges.controls[0].setValue({
      TotLoanInt:
        this.LoanCharges.controls[0].value.TotLoanInt != null
          ? (+this.LoanCharges.controls[0].value.TotLoanInt).toFixed(2)
          : null,
      TotLoanCharg:
        this.LoanCharges.controls[0].value.TotLoanCharg != null
          ? (+this.LoanCharges.controls[0].value.TotLoanCharg).toFixed(2)
          : null,
      DedLoancharg: this.LoanCharges.controls[0].value.DedLoancharg,
      NondedLoancharg: this.LoanCharges.controls[0].value.NondedLoancharg,
    });
    this.form10List.LoancrgAmt = (+this.LoanCharges.controls[0].value
      .NondedLoancharg).toFixed(2);
  }
  saveProvisions() {
    this.form10List.Item1005Set["results"] = [];
    for (let i = 0; i < this.Provisions.length; i++) {
      this.form10List.Item1005Set["results"].push({});
      this.form10List.Item1005Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1005Set["results"][i][
        "Name"
      ] = this.Provisions.controls[i].value.Name;
      this.form10List.Item1005Set["results"][i][
        "ProBalSperiod"
      ] = this.Provisions.controls[i].value.ProBalSperiod;
      this.form10List.Item1005Set["results"][i][
        "ProBalPeriod"
      ] = this.Provisions.controls[i].value.ProBalPeriod;
      this.form10List.Item1005Set["results"][i][
        "ProBalUtili"
      ] = this.Provisions.controls[i].value.ProBalUtili;
      this.form10List.Item1005Set["results"][i][
        "Adjacement"
      ] = this.Provisions.controls[i].value.Adjacement;
      this.form10List.Item1005Set["results"][i][
        "ProBalEperiod"
      ] = this.Provisions.controls[i].value.ProBalEperiod;
    }
    this.form10List.RProvision = "X";
    this.calccogs();
    this.calcoverZC();
    this.SaveForm();
    jQuery("#ProvisionsSchedule").modal("hide");
    this.clsePopup();
  }
  saveLoanCharges() {
    this.form10List.Item1007Set["results"] = [];
    this.form10List.Item1007Set["results"].push({});
    this.form10List.Item1007Set["results"][0][
      "TotLoanInt"
    ] = this.LoanCharges.controls[0].value.TotLoanInt;
    this.form10List.Item1007Set["results"][0][
      "TotLoanCharg"
    ] = this.LoanCharges.controls[0].value.TotLoanCharg;
    this.form10List.Item1007Set["results"][0][
      "DedLoancharg"
    ] = this.LoanCharges.controls[0].value.DedLoancharg;
    this.form10List.Item1007Set["results"][0][
      "NondedLoancharg"
    ] = this.LoanCharges.controls[0].value.NondedLoancharg;
    this.form10List.RLoanchagres = "X";
    this.SaveForm();
    jQuery("#loancharge").modal("hide");
    this.clsePopup();
  }
  saveNetProfit() {
    console.log("Item1008set", this.Item1008Set);
    this.form10List.AdjprofitAmt = this.Item1008C1A;
    this.form10List.RAdjnetprofit = "X";
    this.form10List.Item1005Set["results"] = [];
    this.form10List.Item1008Set["results"] = this.Item1008Set;
    this.SaveForm();
    jQuery("#adjustprofit1").modal("hide");
    this.clsePopup();
  }
  saveDepreciation() {
    console.log("Item1003set", this.Item1003Set);
    this.form10List.RepmainAmt = (+this.Item1003Set.TotMaint4exp).toFixed(2);
    this.form10List.DepdiffAmt = (
      +this.form10List.ExpBookdep - +this.Item1003Set.TotDepAmotValue
    ).toFixed(2);
    this.form10List.RDepriciation = "X";
    this.form10List.Item1003Set = {};
    this.form10List.Item1003Set = this.Item1003Set;
    this.SaveForm();
    jQuery("#declarification1").modal("hide");
    this.clsePopup();
  }
  DeleteRevenueContactform1(i: number) {
    this.Item1001Set.pop(i);
    if (this.Item1001Set.length == 0) {
      this.RevenueContactform1Addform();
    }
    this.RevenuefromContractscalc();
  }
  DeleteSubContractform1(i: number) {
    this.Item1004Set.pop(i);
    if (this.Item1004Set.length == 0) {
      this.SubContractAdd();
    }
    this.SubContractorTotalCal();
  }
  DeleteMachinaryForm(i: number) {
    this.Item1013Set.pop(i);
    if (this.Item1013Set.length == 0) {
      this.machinaryAddform();
    }
    this.machinarycalc();
  }
  DeleteRoyaltiesTechConsultProf(i: number) {
    this.Item1019Set.pop(i);
    if (this.Item1019Set.length == 0) {
      this.RoyaltiesTechConsultProfAdd();
    }
    this.RoyaltiesTechConsultProfCal();
  }
  DeleteOtherExpensesForm(i: number) {
    this.Item1006Set.pop(i);
    if (this.Item1006Set.length == 0) {
      this.OtherExpansesAdd();
    }
    this.otherExpenses();
  }
  addMultipleIS1() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.RevenueContactform1Addform();
    }
    this.addPopup();
    jQuery("#MultipleIS1").modal("hide");
  }
  addMultipleIS2() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowItem1004Set();
    }
    this.addPopup();
    jQuery("#MultipleIS2").modal("hide");
  }
  addMultipleIS3() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.machinaryAddform();
    }
    this.addPopup();
    jQuery("#MultipleIS3").modal("hide");
  }
  addMultipleIS4() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowItem1001Set();
    }
    this.addPopup();
    jQuery("#MultipleIS4").modal("hide");
  }
  addMultipleIS5() {
    for (let i = 0; i < this.NoOfAddedForms; i++) {
      this.AddRowItem1006Set();
    }
    this.addPopup();
    jQuery("#MultipleIS5").modal("hide");
  }
  SaveForm() {
    this.form10List.AgreeFg = "X";
    this.form10List.Operationz = "05";
    this.form10List.UserTypz = "TP";
    console.log("postobj", this.form10List);
    localStorage.setItem("posobj", JSON.stringify(this.form10List));
    this.returnsService.submitForm10(this.form10List).subscribe((data: any) => {
      this.getForm10Details();
    });
    this.clsePopup();
  }
  // setForm10fields(data) {
  //   this.form10List = data["d"];
  //   console.log("form10list", this.form10List);
  //   //punra start
  //   this.clearFormArray(this.PartyTransactionsSet);
  //   for (let i = 0; i < this.form10List.Item1022Set["results"].length; i++) {
  //     this.AddTransactionRow();
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'Transaction': this.form10List.Item1022Set["results"][i]["Transactions"] });
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'Description': this.form10List.Item1022Set["results"][i]["Tdescription"] });
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'NameOfRelatedParty': this.form10List.Item1022Set["results"][i]["PartyName"] });
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'Jurisdiction': this.form10List.Item1022Set["results"][i]["Jurisdiction"] });
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'TransactionNature': this.form10List.Item1022Set["results"][i]["AmtFg"] });
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'Amount': this.form10List.Item1022Set["results"][i]["Amt"] });
  //     this.PartyTransactionsSet.controls[i].patchValue({ 'TPMethod': this.form10List.Item1022Set["results"][i]["TpMethod"] });
  //   }
  //   this.clearFormArray(this.RelatedPartiesSet);
  //   for (let i = 0; i < this.form10List.Item1023Set["results"].length; i++) {
  //     this.AddRelatedPartiesRow();
  //     this.RelatedPartiesSet.controls[i].patchValue({ 'TransactionDescription': this.form10List.Item1023Set["results"][i]["FocDescriptions"] });
  //     this.RelatedPartiesSet.controls[i].patchValue({ 'CounterParty': this.form10List.Item1023Set["results"][i]["Counterparty"] });
  //     this.RelatedPartiesSet.controls[i].patchValue({ 'Jurisdiction': this.form10List.Item1023Set["results"][i]["Jurisdiction"] });
  //   }
  //   this.clearFormArray(this.ShareholdersSet);
  //   for (let i = 0; i < this.form10List.Item1024Set["results"].length; i++) {
  //     this.AddShareholdersSetRow();
  //     this.ShareholdersSet.controls[i].patchValue({ 'ShareHoldersName': this.form10List.Item1024Set["results"][i]["ShName"] });
  //     this.ShareholdersSet.controls[i].patchValue({ 'Jurisdiction': this.form10List.Item1024Set["results"][i]["Jurisdiction"] });
  //     this.ShareholdersSet.controls[i].patchValue({ 'OwnerShipPercentage': this.form10List.Item1024Set["results"][i]["Ownership"] });
  //   }
  //   this.periodStartDate = moment(new Date(+(((this.form10List.Abrzu.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('DD/MM/YYYY');
  //   this.periodEndDate = moment(new Date(+(((this.form10List.Abrzo.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('DD/MM/YYYY');

  //   this.form10List.CorrectFg == "X" ? this.CorrectFlag = true : this.CorrectFlag = false;

  //   this.form10List.RLoanEqui == "X" ? this.zcA2Form.patchValue({ "Schedule": true }) : this.zcA2Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.RLoanEqui == "X") {
  //   this.clearFormArray(this.ZCA2);
  //   for (let i = 0; i < this.form10List.Item1012Set["results"].length; i++) {
  //     this.AddRowZCA2();
  //     this.ZCA2.controls[i].patchValue({ "LenderName": this.form10List.Item1012Set["results"][i]["LenderName"] });
  //     this.ZCA2.controls[i].patchValue({ "LocalFore": this.form10List.Item1012Set["results"][i]["LocalFore"] });
  //     this.ZCA2.controls[i].patchValue({ "BalBegPeriod": this.form10List.Item1012Set["results"][i]["BalBegPeriod"] });
  //     this.ZCA2.controls[i].patchValue({ "AmtClrCyr": this.form10List.Item1012Set["results"][i]["AmtClrCyr"] });
  //     this.ZCA2.controls[i].patchValue({ "AddLoanCyr": this.form10List.Item1012Set["results"][i]["AddLoanCyr"] });
  //     this.ZCA2.controls[i].patchValue({ "BalEndPeriod": this.form10List.Item1012Set["results"][i]["BalEndPeriod"] });
  //     this.ZCA2.controls[i].patchValue({ "UtiDedItem": this.form10List.Item1012Set["results"][i]["UtiDedItem"] });
  //     this.ZCA2.controls[i].patchValue({ "LoanBalance": this.form10List.Item1012Set["results"][i]["LoanBalance"] });
  //     this.ZCA2.controls[i].patchValue({ "LoanStartDt": moment(new Date(+(((this.form10List.Item1012Set["results"][i]["LoanStartDt"].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD') });
  //     this.ZCA2.controls[i].patchValue({ "LoanClearDt": moment(new Date(+(((this.form10List.Item1012Set["results"][i]["LoanClearDt"].replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD') });
  //     this.ZCA2.controls[i].patchValue({ "LoanDays": this.form10List.Item1012Set["results"][i]["LoanDays"] });
  //     this.ZCA2.controls[i].patchValue({ "PeriodDays": this.form10List.Item1012Set["results"][i]["PeriodDays"] });
  //     this.ZCA2.controls[i].patchValue({ "LoanAddZakat": this.form10List.Item1012Set["results"][i]["LoanAddZakat"] });
  //     this.ZCA2.controls[i].patchValue({ "TotDed": this.form10List.Item1012Set["results"][i]["TotDed"] });
  //     this.ZCA2.controls[i].patchValue({ "AddZakatBase": this.form10List.Item1012Set["results"][i]["AddZakatBase"] });
  //      this.CalcZCA2(i);
  //   }
  //   //}

  //   this.form10List.ROthadd == "X" ? this.zcA3Form.patchValue({ "Schedule": true }) : this.zcA3Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.ROthadd == "X") {
  //   this.clearFormArray(this.ZCA3);
  //   for (let i = 0; i < this.form10List.Item1014Set["results"].length; i++) {
  //     this.AddRowZCA3();
  //     this.ZCA3.controls[i].patchValue({ "AddItem": this.form10List.Item1014Set["results"][i]["AddItem"] });
  //     this.ZCA3.controls[i].patchValue({ "Amount": this.form10List.Item1014Set["results"][i]["Amount"] });
  //     this.calCellTotalOA();
  //   }
  //   //}

  //   this.form10List.RInvsetlocal == "X" ? this.zcD1Form.patchValue({ "Schedule": true }) : this.zcD1Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.RInvsetlocal == "X") {
  //   this.clearFormArray(this.ZCD1);
  //   for (let i = 0; i < this.form10List.Item1011Set["results"].length; i++) {
  //     this.AddRowZCD1();
  //     this.ZCD1.controls[i].patchValue({ "InvType": this.form10List.Item1011Set["results"][i]["InvType"] });
  //     this.ZCD1.controls[i].patchValue({ "Tim": this.form10List.Item1011Set["results"][i]["Tim"] });
  //     this.ZCD1.controls[i].patchValue({ "InvCmpName": this.form10List.Item1011Set["results"][i]["InvCmpName"] });
  //     this.ZCD1.controls[i].patchValue({ "Amount": this.form10List.Item1011Set["results"][i]["Amount"] });
  //      this.CalZCIIL();
  //   }
  //   //}

  //   this.form10List.ROthded == "X" ? this.zcD4Form.patchValue({ "Schedule": true }) : this.zcD4Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.ROthded == "X") {
  //   this.clearFormArray(this.ZCD4);
  //   for (let i = 0; i < this.form10List.Item1016Set["results"].length; i++) {
  //     this.AddRowZCD4();
  //     this.ZCD4.controls[i].patchValue({ "AccName": this.form10List.Item1016Set["results"][i]["AccName"] });
  //     this.ZCD4.controls[i].patchValue({ "ZakatReason": this.form10List.Item1016Set["results"][i]["ZakatReason"] });
  //     this.ZCD4.controls[i].patchValue({ "Amount": this.form10List.Item1016Set["results"][i]["Amount"] });
  //      this.calCellTotalOD();
  //   }
  //   //}

  //   this.form10List.RAdjcarry == "X" ? this.zcD2Form.patchValue({ "Schedule": true }) : this.zcD2Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.RAdjcarry == "X") {
  //   this.clearFormArray(this.ZCD2);
  //   for (let i = 0; i < this.form10List.Item1015Set["results"].length; i++) {
  //     this.AddRowZCD2();
  //     this.ZCD2.controls[i].patchValue({ "NetProfit": this.form10List.ZakprofitadAmt });
  //     this.ZCD2.controls[i].patchValue({ "DefAdjacement": this.form10List.Item1015Set["results"][i]["DefAdjacement"] });
  //     this.ZCD2.controls[i].patchValue({ "AllocReject": this.form10List.Item1015Set["results"][i]["AllocReject"] });
  //     this.ZCD2.controls[i].patchValue({ "CayyForward": this.form10List.Item1015Set["results"][i]["CayyForward"] });
  //     this.ZCD2.controls[i].patchValue({ "TotLoss": this.form10List.Item1015Set["results"][i]["TotLoss"] });
  //     this.ZCD2.controls[i].patchValue({ "CayyForwardloss": this.form10List.Item1015Set["results"][i]["CayyForwardloss"] });
  //      this.CalculateZCACFL();
  //   }
  //   //}

  //   this.form10List.RProperty == "X" ? this.zcD3Form.patchValue({ "Schedule": true }) : this.zcD3Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.RProperty == "X") {
  //   this.clearFormArray(this.ZCD3);
  //   for (let i = 0; i < this.form10List.Item1009Set["results"].length; i++) {
  //     this.AddRowZCD3();
  //     this.ZCD3.controls[i].patchValue({ "Statement": this.form10List.Item1009Set["results"][i]["Statement"] });
  //     this.ZCD3.controls[i].patchValue({ "BegBal": this.form10List.Item1009Set["results"][i]["BegBal"] });
  //     this.ZCD3.controls[i].patchValue({ "Addition": this.form10List.Item1009Set["results"][i]["Addition"] });
  //     this.ZCD3.controls[i].patchValue({ "DispCost": this.form10List.Item1009Set["results"][i]["DispCost"] });
  //     this.ZCD3.controls[i].patchValue({ "EndBal": this.form10List.Item1009Set["results"][i]["EndBal"] });
  //     this.ZCD3.controls[i].patchValue({ "TotSale": this.form10List.Item1009Set["results"][i]["TotSale"] });
  //     this.ZCD3.controls[i].patchValue({ "CusTotPay": this.form10List.Item1009Set["results"][i]["CusTotPay"] });
  //     this.ZCD3.controls[i].patchValue({ "Per": this.form10List.Item1009Set["results"][i]["Per"] });
  //     this.ZCD3.controls[i].patchValue({ "DedBase": this.form10List.Item1009Set["results"][i]["DedBase"] });
  //     this.calTotalZDSell(i);
  //   }
  //   //}
  //    this.CalculateTotalZCDeduction();
  //   //purna end
  //   //saraswthi start
  //   this.Item1008Set = data["d"]["Item1008Set"]["results"];
  //   this.Item1003Set = data["d"]["Item1003Set"];

  //   this.form10List.RCarryAdj == "X" ? this.taxbaseD1Form.patchValue({ "Schedule": true }) : this.taxbaseD1Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.RCarryAdj == "X") {
  //   this.clearFormArray(this.TaxBaseD1);
  //   for (let i = 0; i < this.form10List.Item1017Set["results"].length; i++) {
  //     this.AddRowD1();
  //     this.TaxBaseD1.controls[i].patchValue({ "CitCarryLoss": this.form10List.Item1017Set["results"][i]["CitCarryLoss"] });
  //     this.TaxBaseD1.controls[i].patchValue({ "AdjDeclProfit": this.form10List.Item1017Set["results"][i]["AdjDeclProfit"] });
  //     this.TaxBaseD1.controls[i].patchValue({ "LossDedCyr": this.form10List.Item1017Set["results"][i]["LossDedCyr"] });
  //     this.TaxBaseD1.controls[i].patchValue({ "EndYrbal": this.form10List.Item1017Set["results"][i]["EndYrbal"] });
  //     this.CitCarriedForwardCal(i);
  //   }
  //   //}

  //   this.form10List.RTaxamt == "X" ? this.taxbaseD2Form.patchValue({ "Schedule": true }) : this.taxbaseD2Form.patchValue({ "Schedule": false });
  //   //if (this.form10List.RTaxamt == "X") {
  //   this.clearFormArray(this.TaxBaseD2);
  //   for (let i = 0; i < this.form10List.Item1018Set["results"].length; i++) {
  //     this.AddRowD2();
  //     this.TaxBaseD2.controls[i].patchValue({ "TotInsuPre": this.form10List.Item1018Set["results"][i]["TotInsuPre"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "CanInsuPre": this.form10List.Item1018Set["results"][i]["CanInsuPre"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocReisnuPremi": this.form10List.Item1018Set["results"][i]["LocReisnuPremi"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "ExtReisnuPremi": this.form10List.Item1018Set["results"][i]["ExtReisnuPremi"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "NetPremEar": this.form10List.Item1018Set["results"][i]["NetPremEar"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "ResCompPyr": this.form10List.Item1018Set["results"][i]["ResCompPyr"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "ResCompExiPyr": this.form10List.Item1018Set["results"][i]["ResCompExiPyr"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "TotResePyr": this.form10List.Item1018Set["results"][i]["TotResePyr"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocGeneIns": this.form10List.Item1018Set["results"][i]["LocGeneIns"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GloGeneIns": this.form10List.Item1018Set["results"][i]["GloGeneIns"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GloInveIncome": this.form10List.Item1018Set["results"][i]["GloInveIncome"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "NonInvsnuReven": this.form10List.Item1018Set["results"][i]["NonInvsnuReven"] });

  //     this.TaxBaseD2.controls[i].patchValue({ "PerOthsnuIncom": this.form10List.Item1018Set["results"][i]["PerOthsnuIncom"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "Total1": this.form10List.Item1018Set["results"][i]["Total1"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "ComPaidDanger": this.form10List.Item1018Set["results"][i]["ComPaidDanger"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "AmtCovReinsurance": this.form10List.Item1018Set["results"][i]["AmtCovReinsurance"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "NetCompaPaid": this.form10List.Item1018Set["results"][i]["NetCompaPaid"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "UnprePaidCyr": this.form10List.Item1018Set["results"][i]["UnprePaidCyr"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "ExistingRevCyr": this.form10List.Item1018Set["results"][i]["ExistingRevCyr"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "NonlegalDed": this.form10List.Item1018Set["results"][i]["NonlegalDed"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "PreEstabilisment": this.form10List.Item1018Set["results"][i]["PreEstabilisment"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LegalDedPerEst": this.form10List.Item1018Set["results"][i]["LegalDedPerEst"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocGenInsPre": this.form10List.Item1018Set["results"][i]["LocGenInsPre"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GlobGenInsPre": this.form10List.Item1018Set["results"][i]["GlobGenInsPre"] });

  //     this.TaxBaseD2.controls[i].patchValue({ "GenAdminExp": this.form10List.Item1018Set["results"][i]["GenAdminExp"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "PreEstShareMain": this.form10List.Item1018Set["results"][i]["PreEstShareMain"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "Total2": this.form10List.Item1018Set["results"][i]["Total2"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "Total1Total2": this.form10List.Item1018Set["results"][i]["Total1Total2"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocGenInsPreWri": this.form10List.Item1018Set["results"][i]["LocGenInsPreWri"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GlobGenInsPreWri": this.form10List.Item1018Set["results"][i]["GlobGenInsPreWri"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GlobNetProfitTax": this.form10List.Item1018Set["results"][i]["GlobNetProfitTax"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "TaxBase": this.form10List.Item1018Set["results"][i]["TaxBase"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "TaxableInsuActivity": this.form10List.Item1018Set["results"][i]["TaxableInsuActivity"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocSavPerWriteu": this.form10List.Item1018Set["results"][i]["LocSavPerWriteu"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "SavingGlobalInsuu": this.form10List.Item1018Set["results"][i]["SavingGlobalInsuu"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GlobalInvestIncome": this.form10List.Item1018Set["results"][i]["GlobalInvestIncome"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "PerEstableshIncome": this.form10List.Item1018Set["results"][i]["PerEstableshIncome"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocSavPerWrite": this.form10List.Item1018Set["results"][i]["LocSavPerWrite"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "SavingGlobalInsu": this.form10List.Item1018Set["results"][i]["SavingGlobalInsu"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GenAdminMainCenter": this.form10List.Item1018Set["results"][i]["GenAdminMainCenter"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "PerEstableshMainCen": this.form10List.Item1018Set["results"][i]["PerEstableshMainCen"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "LocSavPerWritet": this.form10List.Item1018Set["results"][i]["LocSavPerWritet"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "SavingGlobalInsuv": this.form10List.Item1018Set["results"][i]["SavingGlobalInsuv"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "GenAdminMainCenterv": this.form10List.Item1018Set["results"][i]["GenAdminMainCenterv"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "PerEstableshMainCenv": this.form10List.Item1018Set["results"][i]["PerEstableshMainCenv"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "TotalTaxPerEsta": this.form10List.Item1018Set["results"][i]["TotalTaxPerEsta"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "RevenuLoan": this.form10List.Item1018Set["results"][i]["RevenuLoan"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "RealizedGains": this.form10List.Item1018Set["results"][i]["RealizedGains"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "TaxbasedActivity": this.form10List.Item1018Set["results"][i]["TaxbasedActivity"] });
  //     this.TaxBaseD2.controls[i].patchValue({ "PerEstaTax": this.form10List.Item1018Set["results"][i]["PerEstaTax"] });
  //     // this.ReinsuranceCal(i);
  //   }
  //   //}
  //   //saraswthi end
  //   //venkat start
  //   this.form10List.RIncomeInsu == "X" ? this.IncomeInsuChange = true : this.IncomeInsuChange = false;
  //   this.form10List.RIncomeContract == "X" ? this.IncomeContractorsChange = true : this.IncomeContractorsChange = false;
  //   this.form10List.RSubcontract == "X" ? this.SubContractorsChange = true : this.SubContractorsChange = false;
  //   this.form10List.RMachineExp == "X" ? this.MacEquiChange = true : this.MacEquiChange = false;
  //   this.form10List.RRoyaTechser == "X" ? this.RoyaTechSerChange = true : this.RoyaTechSerChange = false;
  //   this.form10List.ROtherexp == "X" ? this.OtherExpChange = true : this.OtherExpChange = false;
  //   this.Item1001Set = data["d"]["Item1001Set"]["results"];
  //   for (let i = 0; i < this.Item1001Set.length; i++) {

  //     this.Item1001Set[i].ContractDt = moment(new Date(+(((this.Item1001Set[i].ContractDt.replace(')', '')).toString().replace('/Date(', '')).toString().replace('/', '')))).format('YYYY-MM-DD');
  //   }
  //   this.Item1002Set = data["d"]["Item1002Set"]["results"][0];
  //   this.Item1004Set = data["d"]["Item1004Set"]["results"];
  //   this.Item1013Set = data["d"]["Item1013Set"]["results"];
  //   this.Item1005Set = data["d"]["Item1005Set"]["results"];
  //   this.Item1019Set = data["d"]["Item1019Set"]["results"];
  //   this.Item1006Set = data["d"]["Item1006Set"]["results"];
  //   if (this.form10List.ROthergainloss == "X") {
  //     this.ROthergainloss = true;
  //   }
  //   else {
  //     this.ROthergainloss = false;
  //   }

  //   //venkat end
  //   //phani start
  //   this.form10List.RProvision == "X" ? this.ProvisionsForm.patchValue({ "Schedule": true }) : this.ProvisionsForm.patchValue({ "Schedule": false });
  //   //if (this.form10List.RProvision == "X") {
  //   this.clearFormArray(this.Provisions);
  //   for (let i = 0; i < this.form10List.Item1005Set["results"].length; i++) {
  //     this.addProvisionsForm();
  //     this.form10List.Item1005Set["results"][i]["LineNo"] = i + 1;
  //     this.Provisions.controls[i].patchValue({
  //       "Name": this.form10List.Item1005Set["results"][i]["Name"],
  //       "ProBalSperiod": this.form10List.Item1005Set["results"][i]["ProBalSperiod"],
  //       "ProBalPeriod": this.form10List.Item1005Set["results"][i]["ProBalPeriod"],
  //       "ProBalUtili": this.form10List.Item1005Set["results"][i]["ProBalUtili"],
  //       "Adjacement": this.form10List.Item1005Set["results"][i]["Adjacement"],
  //       "ProBalEperiod": this.form10List.Item1005Set["results"][i]["ProBalEperiod"]
  //     });
  //   }

  //   //}
  //   this.form10List.RLoanchagres == "X" ? this.LoanChargesForm.patchValue({ "Schedule": true }) : this.LoanChargesForm.patchValue({ "Schedule": false });
  //   //if (this.form10List.RLoanchagres == "X") {
  //   this.LoanCharges.push(this.LoanChargesGroup());
  //   this.LoanCharges.controls[0].patchValue({
  //     "TotLoanInt": this.form10List.Item1007Set["results"][0]["TotLoanInt"],
  //     "TotLoanCharg": this.form10List.Item1007Set["results"][0]["TotLoanCharg"],
  //     "DedLoancharg": this.form10List.Item1007Set["results"][0]["DedLoancharg"],
  //     "NondedLoancharg": this.form10List.Item1007Set["results"][0]["NondedLoancharg"]
  //   });

  //   //}

  //   this.form10List.RAdjnetprofit == "X" ? this.NetProfitIsAppilicable = true : this.NetProfitIsAppilicable = false;
  //   //if (this.form10List.RAdjnetprofit == "X") {
  //   this.Item1008Set = this.form10List.Item1008Set["results"];
  //   //}

  //   this.form10List.RDepriciation == "X" ? this.RepairThresholdIsAppilicable = true : this.RepairThresholdIsAppilicable = false;

  //   //phani end
  //   this.GetServiceDetails();

  // }
  //Need some clarification on caliculation
  calAdjustments() {
    this.form10List.TotzakatadAmt = 0;
    this.form10List.TotcitadAmt = 0;
    // hidden field
    this.form10List.TotcitloansadAmt = 0;

    this.form10List.ZakprofitadAmt = 0;
    this.form10List.TaxprofitadAmt = 0;

    // If Taxpayer Type is mixed company
    this.form10List.TotzakatadAmt = (
      parseFloat(this.form10List.ProloadAmt) *
        parseFloat(this.form10List.TdSaudiSharePrft) +
      parseFloat(this.Item1008C2A)
    ).toFixed(2);
    // If Taxpayer Type is 100% Saudi (Individualn or Company Both):-
    this.form10List.TotzakatadAmt = (
      parseFloat(this.form10List.ProloadAmt) +
      parseFloat(this.form10List.AdjprofitAmt)
    ).toFixed(2);

    // If Taxpayer Type is mixed company
    this.form10List.TotcitadAmt = (
      parseFloat(this.form10List.RepmainAmt) +
      parseFloat(this.form10List.ProutiyerAmt) +
      parseFloat(this.form10List.ProloadAmt) +
      parseFloat(this.form10List.DepdiffAmt) +
      parseFloat(this.form10List.LoancrgAmt) *
        parseFloat(this.form10List.TdNonSaudiSharePrft) +
      parseFloat(this.Item1008C3A)
    ).toFixed(2);
    // If Taxpayer Type is 100% Foreigner (Individual or Company Both):-
    this.form10List.TotcitadAmt = (
      parseFloat(this.form10List.AdjprofitAmt) +
      parseFloat(this.form10List.RepmainAmt) +
      parseFloat(this.form10List.ProutiyerAmt) +
      parseFloat(this.form10List.ProloadAmt) +
      parseFloat(this.form10List.DepdiffAmt) +
      parseFloat(this.form10List.LoancrgAmt)
    ).toFixed(2);
    // Do not show this field if taxpayer is 100% ZAKAT.

    //   If Taxpayer Type is mixed company:-
    this.form10List.TotcitloansadAmt = (
      parseFloat(this.form10List.RepmainAmt) +
      parseFloat(this.form10List.ProutiyerAmt) +
      parseFloat(this.form10List.ProloadAmt) +
      parseFloat(this.form10List.DepdiffAmt) +
      parseFloat(this.Item1008C3A) /
        parseFloat(this.form10List.TdNonSaudiSharePrft)
    ).toFixed(2);
    // If Taxpayer Type is 100% Foreigner (Individual or Company Both):-
    this.form10List.TotcitloansadAmt = (
      parseFloat(this.form10List.RepmainAmt) +
      parseFloat(this.form10List.AdjprofitAmt) +
      parseFloat(this.form10List.ProutiyerAmt) +
      parseFloat(this.form10List.ProloadAmt) +
      parseFloat(this.form10List.DepdiffAmt)
    ).toFixed(2);

    this.form10List.ZakprofitadAmt = (
      parseFloat(this.form10List.ExpNetprofit) +
      parseFloat(this.form10List.TotzakatadAmt)
    ).toFixed(2);
    this.form10List.TaxprofitadAmt = (
      parseFloat(this.form10List.ExpNetprofit) *
        parseFloat(this.form10List.TdNonSaudiSharePrft) +
      parseFloat(this.form10List.TotcitadAmt)
    ).toFixed(2);

    this.form10List.CitnetprolossAmt = parseFloat(
      this.form10List.TaxprofitadAmt
    ).toFixed(2);
  }
  //Phani End
  //Venkat start
  // getForm10SelectedKey(text) {
  //     return this.returnsService.getForm10SelectedKey(text, this.Zacattax[0].Gpart).subscribe((data) => {
  //         console.log('Selectedkeys', data);
  //         this.ServiceDetails = data["d"] || [];
  //     })
  // }
  getForm10SelectedKey(text, index, flag) {
    //purna1612
    this.Item1001Set[index].ContraPatry = "";
    return this.returnsService
      .getForm10SelectedKey(text, this.Gpart)
      .subscribe((data) => {
        console.log("Selectedkeys", data);
        // this.ServiceDetails = data["d"] || [];
        if (flag == 0) {
          this.Item1001SetForm.controls[index].patchValue({
            ContraPatry: data["d"].Name,
          });
          //this.Item1001Set[index].ContraPatry = data["d"].Name;
        } else if (flag == 1) {
          //this.Item1004Set[index].ContraName = data["d"].Name;
          this.Item1004SetForm.controls[index].patchValue({
            ContraName: data["d"].Name,
          });
        } else if (flag == 2) {
          this.Item1013SetForm.controls[index].patchValue({
            BeniName: data["d"].Name,
          });
          //this.Item1013Set[index].BeniName = data["d"].Name;
        } else if (flag == 3) {
          this.Item1019SetForm.controls[index].patchValue({
            BeniName: data["d"].Name,
          });
          //this.Item1019Set[index].BeniName = data["d"].Name;
        }
      });
  }

  RevenuefromContractscalc() {
    this.CuryrRevenue = "0.00";
    for (let i = 0; i < this.Item1001SetForm.controls.length; i++) {
      if (
        this.Item1001SetForm.controls[i].value.OriContraValue == "" ||
        this.Item1001SetForm.controls[i].value.OriContraValue == undefined
      ) {
        this.Item1001SetForm.controls[i].patchValue({ OriContraValue: "0.00" });
      }
      this.Item1001SetForm.controls[i].patchValue({
        OriContraValue: (+this.Item1001SetForm.controls[i].value
          .OriContraValue).toFixed(2),
      });
      if (
        this.Item1001SetForm.controls[i].value.AmedContraValue == "" ||
        this.Item1001SetForm.controls[i].value.AmedContraValue == undefined
      ) {
        this.Item1001SetForm.controls[i].patchValue({
          AmedContraValue: "0.00",
        });
      }
      this.Item1001SetForm.controls[i].patchValue({
        AmedContraValue: (+this.Item1001SetForm.controls[i].value
          .AmedContraValue).toFixed(2),
      });
      if (
        this.Item1001SetForm.controls[i].value.ActualCost == "" ||
        this.Item1001SetForm.controls[i].value.ActualCost == undefined
      ) {
        this.Item1001SetForm.controls[i].patchValue({ ActualCost: "0.00" });
      }
      this.Item1001SetForm.controls[i].patchValue({
        ActualCost: (+this.Item1001SetForm.controls[i].value
          .ActualCost).toFixed(2),
      });
      if (
        this.Item1001SetForm.controls[i].value.EstimateCost == "" ||
        this.Item1001SetForm.controls[i].value.EstimateCost == undefined
      ) {
        this.Item1001SetForm.controls[i].patchValue({ EstimateCost: "0.00" });
      }
      this.Item1001SetForm.controls[i].patchValue({
        EstimateCost: (+this.Item1001SetForm.controls[i].value
          .EstimateCost).toFixed(2),
      });
      if (
        this.Item1001SetForm.controls[i].value.PreyrRevenue == "" ||
        this.Item1001SetForm.controls[i].value.PreyrRevenue == undefined
      ) {
        this.Item1001SetForm.controls[i].patchValue({ PreyrRevenue: "0.00" });
      }
      this.Item1001SetForm.controls[i].patchValue({
        PreyrRevenue: (+this.Item1001SetForm.controls[i].value
          .PreyrRevenue).toFixed(2),
      });
      let val1 = (
        parseFloat(this.Item1001SetForm.controls[i].value.OriContraValue) +
        parseFloat(this.Item1001SetForm.controls[i].value.AmedContraValue)
      ).toFixed(2);
      if (val1 == "NaN") {
        val1 = "0.00";
      }
      this.Item1001SetForm.controls[i].patchValue({
        ContraAftAmed: (+val1).toFixed(2),
      });
      let val2 = (
        (parseFloat(this.Item1001SetForm.controls[i].value.ActualCost) /
          parseFloat(this.Item1001SetForm.controls[i].value.EstimateCost)) *
        100
      ).toFixed(2);
      if (val2 == "NaN") {
        val2 = "0.00";
      }
      this.Item1001SetForm.controls[i].patchValue({
        CpmplePercentage: (+val2).toFixed(2),
      });
      let val3 = (
        parseFloat(this.Item1001SetForm.controls[i].value.ContraAftAmed) *
        (parseFloat(this.Item1001SetForm.controls[i].value.CpmplePercentage) /
          100)
      ).toFixed(2);
      if (val3 == "NaN") {
        val3 = "0.00";
      }
      this.Item1001SetForm.controls[i].patchValue({
        RevenueCompletion: (+val3).toFixed(2),
      });
      let val4 = (
        parseFloat(this.Item1001SetForm.controls[i].value.RevenueCompletion) -
        parseFloat(this.Item1001SetForm.controls[i].value.PreyrRevenue)
      ).toFixed(2);
      if (val4 == "NaN") {
        val4 = "0.00";
      }
      this.Item1001SetForm.controls[i].patchValue({
        CuryrRevenue: (+val4).toFixed(2),
      });
      this.CuryrRevenue = (
        parseFloat(this.CuryrRevenue) +
        parseFloat(this.Item1001SetForm.controls[i].value.CuryrRevenue)
      ).toFixed(2);
    }
  }
  Subcontractors(event) {
    if (event.currentTarget.checked == true) {
      this.SubContractorTotal = "0.00";
      this.SubContractorsChange = true;
      this.Item1004SetFormFG.patchValue({ Schedule: true });
      if (this.Item1001SetForm.controls.length == 0) {
        this.AddRowItem1004Set();
      }
      jQuery("#subContractsModal").modal("show");
      this.form10List.RSubcontract = "X";
    } else {
      this.clearFormArray(this.Item1004SetForm);
      this.AddRowItem1004Set();
      this.SubContractorTotalCal();
      this.SubContractorsChange = false;
      jQuery("#subContractsModal").modal("hide");
      this.Item1004SetFormFG.patchValue({ Schedule: false });
      this.form10List.ExpSubcont = "0.00";
      this.form10List.RSubcontract = "";
    }
    if (this.ServiceDetails != undefined) {
      this.SubContractsDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1004" && x.FieldNm == "ID_TP");
      console.log(this.ContractsDropDownList);
      this.CountryDropDownList = this.ServiceDetails["CountrySet"]["results"];
    }
  }
  machiequirent(event) {
    if (event.currentTarget.checked == true) {
      jQuery("#machineryModal").modal("show");
      this.Item1013SetFormFG.patchValue({ Schedule: true });
      if (this.Item1013SetForm.controls.length == 0) {
        this.AddRowItem1013Set();
      }
      this.form10List.RMachineExp = "X";
    } else {
      jQuery("#machineryModal").modal("hide");
      this.form10List.ExpMachinerent = "0.00";
      this.clearFormArray(this.Item1013SetForm);
      this.Item1013SetFormFG.patchValue({ Schedule: false });
      this.form10List.RMachineExp = "";
      this.AddRowItem1013Set();
      this.machinarycalc();
      this.calccogs();
    }
    if (this.ServiceDetails != undefined) {
      this.MachinaryDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1013" && x.FieldNm == "ID_TP");
      this.ResidencyDropDownList = this.ServiceDetails["DropdownSet"][
        "results"
      ].filter((x) => x.FormNoNm == "ZDGD_1013" && x.FieldNm == "RESIDANCY");
      this.CountryDropDownList = this.ServiceDetails["CountrySet"]["results"];
    }
  }
  machinarycalc() {
    this.beginingyearbal = "0.00";
    this.ChargedAccount = "0.00";
    this.paidduringyear = "0.00";
    this.endyearbal = "0.00";
    for (let i = 0; i < this.Item1013SetForm.controls.length; i++) {
      if (
        this.Item1013SetForm.controls[i].value.BegYrBal == "" ||
        this.Item1013SetForm.controls[i].value.BegYrBal == undefined
      ) {
        this.Item1013SetForm.controls[i].patchValue({ BegYrBal: "0.00" });
      }
      this.Item1013SetForm.controls[i].patchValue({
        BegYrBal: (+this.Item1013SetForm.controls[i].value.BegYrBal).toFixed(2),
      });
      if (
        this.Item1013SetForm.controls[i].value.AccCharged == "" ||
        this.Item1013SetForm.controls[i].value.AccCharged == undefined
      ) {
        this.Item1013SetForm.controls[i].patchValue({ AccCharged: "0.00" });
      }
      this.Item1013SetForm.controls[i].patchValue({
        AccCharged: (+this.Item1013SetForm.controls[i].value
          .AccCharged).toFixed(2),
      });
      if (
        this.Item1013SetForm.controls[i].value.PaidYear == "" ||
        this.Item1013SetForm.controls[i].value.PaidYear == undefined
      ) {
        this.Item1013SetForm.controls[i].patchValue({ PaidYear: "0.00" });
      }
      this.Item1013SetForm.controls[i].patchValue({
        PaidYear: (+this.Item1013SetForm.controls[i].value.PaidYear).toFixed(2),
      });
      let val1 = (
        parseFloat(this.Item1013SetForm.controls[i].value.AccCharged) +
        parseFloat(this.Item1013SetForm.controls[i].value.BegYrBal) -
        parseFloat(this.Item1013SetForm.controls[i].value.PaidYear)
      ).toFixed(2);
      this.Item1013SetForm.controls[i].patchValue({
        EndYrBal: (+val1).toFixed(2),
      });
      this.ChargedAccount = (
        parseFloat(this.ChargedAccount) +
        parseFloat(this.Item1013SetForm.controls[i].value.AccCharged)
      ).toFixed(2);

      this.beginingyearbal = (
        parseFloat(this.beginingyearbal) +
        parseFloat(this.Item1013SetForm.controls[i].value.BegYrBal)
      ).toFixed(2);

      this.paidduringyear = (
        parseFloat(this.paidduringyear) +
        parseFloat(this.Item1013SetForm.controls[i].value.PaidYear)
      ).toFixed(2);

      this.endyearbal = (
        parseFloat(this.endyearbal) +
        parseFloat(this.Item1013SetForm.controls[i].value.EndYrBal)
      ).toFixed(2);

      //this.Item1013Set[i].EndYrBal = (parseFloat((this.Item1013Set[i].AccCharged == undefined || this.Item1013Set[i].AccCharged == '') ? 0.00 : this.Item1013Set[i].AccCharged) + parseFloat((this.Item1013Set[i].BegYrBal == undefined || this.Item1013Set[i].BegYrBal == '') ? 0.00 : this.Item1013Set[i].BegYrBal) - parseFloat((this.Item1013Set[i].PaidYear == undefined || this.Item1013Set[i].PaidYear == '') ? 0.00 : this.Item1013Set[i].PaidYear)).toFixed(2);
      //this.ChargedAccount += parseFloat((this.Item1013Set[i].AccCharged == undefined || this.Item1013Set[i].AccCharged == '') ? 0.00 : this.Item1013Set[i].AccCharged);
      //this.beginingyearbal += parseFloat((this.Item1013Set[i].BegYrBal == undefined || this.Item1013Set[i].BegYrBal == '') ? 0.00 : this.Item1013Set[i].BegYrBal);
      //this.paidduringyear += parseFloat((this.Item1013Set[i].PaidYear == undefined || this.Item1013Set[i].PaidYear == '') ? 0.00 : this.Item1013Set[i].PaidYear);
      //this.endyearbal += parseFloat(this.Item1013Set[i].EndYrBal);
    }
  }
  machinaryAddform() {
    let ItemAdd = {
      AccCharged: "0.00",
      BegYrBal: "0.00",
      BeniName: "",
      Country: "",
      DataVersion: "00000",
      EndYrbal: "0.00",
      FormGuid: "",
      IdNo: "",
      IdTp: "",
      LineNo: 1,
      PaidYear: "0.00",
      RankingOrder: "00",
      Residancy: "",
      ReturnId: "",
      TimestampCh: null,
      TimestampCr: null,
      Waers: "",
      __metadata: null,
    };
    this.Item1013Set.push(ItemAdd);
  }
  MachinarySave() {
    this.form10List.Item1013Set["results"] = [];
    for (let i = 0; i < this.Item1013SetForm.controls.length; i++) {
      this.form10List.Item1013Set["results"].push({});
      this.form10List.Item1013Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1013Set["results"][i][
        "IdTp"
      ] = this.Item1013SetForm.controls[i].value.IdTp;
      this.form10List.Item1013Set["results"][i][
        "IdNo"
      ] = this.Item1013SetForm.controls[i].value.IdNo;
      this.form10List.Item1013Set["results"][i][
        "BegYrBal"
      ] = this.Item1013SetForm.controls[i].value.BegYrBal;
      this.form10List.Item1013Set["results"][i][
        "AccCharged"
      ] = this.Item1013SetForm.controls[i].value.AccCharged;
      this.form10List.Item1013Set["results"][i][
        "PaidYear"
      ] = this.Item1013SetForm.controls[i].value.PaidYear;
      this.form10List.Item1013Set["results"][i][
        "EndYrBal"
      ] = this.Item1013SetForm.controls[i].value.EndYrBal;
      this.form10List.Item1013Set["results"][i][
        "BeniName"
      ] = this.Item1013SetForm.controls[i].value.BeniName;
      this.form10List.Item1013Set["results"][i][
        "Residancy"
      ] = this.Item1013SetForm.controls[i].value.Residancy;
      this.form10List.Item1013Set["results"][i][
        "Country"
      ] = this.Item1013SetForm.controls[i].value.Country;
    }
    this.form10List.ExpMachinerent = (+this.ChargedAccount).toFixed(2);
    this.form10List.RMachineExp = "X";
    this.calccogs();
    //this.SaveForm();
    jQuery("#machineryModal").modal("hide");
    this.clsePopup();
  }

  RoyaltiesTechConsultProfAdd() {
    let ItemAdd = {
      AccCharged: "0.00",
      BegYrbal: "0.00",
      BeniName: "",
      Country: "",
      DataVersion: "00000",
      EndYrbal: "0.00",
      FormGuid: "",
      IdNo: "",
      IdTp: "",
      LineNo: 1,
      Mandt: "",
      PaidYr: "0.00",
      RankingOrder: "00",
      Residancy: "",
      ReturnId: "",
      SerTyp: "",
      TimestampCh: null,
      TimestampCr: null,
      Waers: "",
      __metadata: null,
    };
    this.Item1019Set.push(ItemAdd);
  }
  RoyaltiesTechConsultProfCal() {
    this.beginingyearbal = "0.00";
    this.ChargedAccount = "0.00";
    this.paidduringyear = "0.00";
    this.endyearbal = "0.00";
    this.Provisionsbalendperiod = "0.00";
    for (let i = 0; i < this.Item1019SetForm.controls.length; i++) {
      if (
        this.Item1019SetForm.controls[i].value.BegYrbal == "" ||
        this.Item1019SetForm.controls[i].value.BegYrbal == undefined
      ) {
        this.Item1019SetForm.controls[i].patchValue({ BegYrbal: "0.00" });
      }
      this.Item1019SetForm.controls[i].patchValue({
        BegYrbal: (+this.Item1019SetForm.controls[i].value.BegYrbal).toFixed(2),
      });
      if (
        this.Item1019SetForm.controls[i].value.AccCharged == "" ||
        this.Item1019SetForm.controls[i].value.AccCharged == undefined
      ) {
        this.Item1019SetForm.controls[i].patchValue({ AccCharged: "0.00" });
      }
      this.Item1019SetForm.controls[i].patchValue({
        AccCharged: (+this.Item1019SetForm.controls[i].value
          .AccCharged).toFixed(2),
      });
      if (
        this.Item1019SetForm.controls[i].value.PaidYr == "" ||
        this.Item1019SetForm.controls[i].value.PaidYr == undefined
      ) {
        this.Item1019SetForm.controls[i].patchValue({ PaidYr: "0.00" });
      }
      this.Item1019SetForm.controls[i].patchValue({
        PaidYr: (+this.Item1019SetForm.controls[i].value.PaidYr).toFixed(2),
      });
      let val1 = (
        parseFloat(this.Item1019SetForm.controls[i].value.AccCharged) +
        parseFloat(this.Item1019SetForm.controls[i].value.BegYrbal) -
        parseFloat(this.Item1019SetForm.controls[i].value.PaidYr)
      ).toFixed(2);
      this.Item1019SetForm.controls[i].patchValue({
        EndYrbal: (+val1).toFixed(2),
      });

      this.ChargedAccount = (
        parseFloat(this.ChargedAccount) +
        parseFloat(this.Item1019SetForm.controls[i].value.AccCharged)
      ).toFixed(2);
      this.beginingyearbal = (
        parseFloat(this.beginingyearbal) +
        parseFloat(this.Item1019SetForm.controls[i].value.BegYrbal)
      ).toFixed(2);
      this.paidduringyear = (
        parseFloat(this.paidduringyear) +
        parseFloat(this.Item1019SetForm.controls[i].value.PaidYr)
      ).toFixed(2);
      this.endyearbal = (
        parseFloat(this.endyearbal) +
        parseFloat(this.Item1019SetForm.controls[i].value.EndYrbal)
      ).toFixed(2);
    }
  }
  RoyaltiesTechConsultProfSave() {
    console.log("Item1019set: ", this.Item1019Set);
    this.form10List.ExpRoyalti = (+this.ChargedAccount).toFixed();
    // this.form10List.Item1019Set.results = this.Item1019Set;
    this.form10List.Item1019Set["results"] = [];
    for (let i = 0; i < this.Item1019SetForm.controls.length; i++) {
      this.form10List.Item1019Set["results"].push({});
      this.form10List.Item1019Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1019Set["results"][i][
        "IdTp"
      ] = this.Item1019SetForm.controls[i].value.IdTp;
      this.form10List.Item1019Set["results"][i][
        "IdNo"
      ] = this.Item1019SetForm.controls[i].value.IdNo;
      this.form10List.Item1019Set["results"][i][
        "BegYrbal"
      ] = this.Item1019SetForm.controls[i].value.BegYrbal;
      this.form10List.Item1019Set["results"][i][
        "AccCharged"
      ] = this.Item1019SetForm.controls[i].value.AccCharged;
      this.form10List.Item1019Set["results"][i][
        "PaidYr"
      ] = this.Item1019SetForm.controls[i].value.PaidYr;
      this.form10List.Item1019Set["results"][i][
        "EndYrbal"
      ] = this.Item1019SetForm.controls[i].value.EndYrbal;
      this.form10List.Item1019Set["results"][i][
        "BeniName"
      ] = this.Item1019SetForm.controls[i].value.BeniName;
      this.form10List.Item1019Set["results"][i][
        "Residancy"
      ] = this.Item1019SetForm.controls[i].value.Residancy;
      this.form10List.Item1019Set["results"][i][
        "Country"
      ] = this.Item1019SetForm.controls[i].value.Country;
      this.form10List.Item1019Set["results"][i][
        "SerTyp"
      ] = this.Item1019SetForm.controls[i].value.SerTyp;
    }
    this.form10List.RRoyaTechser = "X"; //purna1612
    this.isioa(); //purna1612
    // this.SaveForm();
    jQuery("#royaltiModal").modal("hide");
    this.clsePopup();
  }
  otherexpenses(event) {
    if (event.currentTarget.checked == true) {
      jQuery("#othersModal").modal("show");
      this.Item1006SetFormFG.patchValue({ Schedule: true });
      if (this.Item1006SetForm.controls.length == 0) {
        this.AddRowItem1006Set();
      }
    } else {
      this.OtherExpChange = false;
      jQuery("#othersModal").modal("hide");
      this.Item1006SetFormFG.patchValue({ Schedule: false });
      // this.Item1006Set = [];
      // this.OtherExpansesAdd();
      this.clearFormArray(this.Item1006SetForm);
      this.AddRowItem1006Set();
      this.otherExpenses();
      this.OtherExpansesTotal = "0.00";
      this.form10List.ExpOther = "0.00";
      this.form10List.ROtherexp = ""; //purna1612
    }
  }
  OtherExpansesAdd() {
    let ItemAdd = {
      Amount: "0.00",
      DataVersion: "00000",
      FormGuid: "",
      LineNo: 1,
      Mandt: "",
      RankingOrder: "00",
      ReturnId: "",
      Srno: "00",
      Statement: "",
      TimestampCh: null,
      TimestampCr: null,
      Waers: "",
      __metadata: null,
    };
    this.Item1006Set.push(ItemAdd);
  }
  otherExpenses() {
    this.OtherExpansesTotal = "0.00";
    for (let i = 0; i < this.Item1006SetForm.controls.length; i++) {
      if (
        this.Item1006SetForm.controls[i].value.Amount == "" ||
        this.Item1006SetForm.controls[i].value.Amount == undefined
      ) {
        this.Item1006SetForm.controls[i].patchValue({ Amount: "0.00" });
      }
      this.Item1006SetForm.controls[i].patchValue({
        Amount: (+this.Item1006SetForm.controls[i].value.Amount).toFixed(2),
      });

      this.OtherExpansesTotal = (
        parseFloat(this.OtherExpansesTotal) +
        parseFloat(this.Item1006SetForm.controls[i].value.Amount)
      ).toFixed(2);
    }
  }
  SaveOtherExpanses() {
    this.form10List.ExpOther = (+this.OtherExpansesTotal).toFixed(2);
    //this.form10List.Item1006Set.results = this.Item1006Set;
    this.form10List.Item1006Set["results"] = [];
    for (let i = 0; i < this.Item1006SetForm.controls.length; i++) {
      this.form10List.Item1006Set["results"].push({});
      this.form10List.Item1006Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1006Set["results"][i][
        "Statement"
      ] = this.Item1006SetForm.controls[i].value.Statement;
      this.form10List.Item1006Set["results"][i][
        "Amount"
      ] = this.Item1006SetForm.controls[i].value.Amount;
    }
    this.form10List.ROtherexp = "X"; //purna1612
    this.calccogs(); //purna1612
    //this.SaveForm();
    jQuery("#othersModal").modal("hide");
    this.clsePopup();
  }

  Changecontractsdd(index) {
    //purna1612
    this.Item1001SetForm.controls[index].patchValue({ IdNo: "" });
    this.Item1001SetForm.controls[index].patchValue({ ContraPatry: "" });
  }
  Changecontractsdd1(index) {
    //purna1612
    this.Item1004SetForm.controls[index].patchValue({ IdNo: "" });
    this.Item1004SetForm.controls[index].patchValue({ ContraName: "" });
    //this.Item1004Set[index].IdNo = "";
    //this.Item1004Set[index].ContraName = "";
  }
  Changecontractsdd2(index) {
    //purna1612
    this.Item1013SetForm.controls[index].patchValue({ IdNo: "" });
    this.Item1013SetForm.controls[index].patchValue({ BeniName: "" });
    // this.Item1013Set[index].IdNo = "";
    // this.Item1013Set[index].BeniName = "";
  }
  Changecontractsdd3(index) {
    //purna1612
    this.Item1019SetForm.controls[index].patchValue({ IdNo: "" });
    this.Item1019SetForm.controls[index].patchValue({ BeniName: "" });
    // this.Item1019Set[index].IdNo = "";
    // this.Item1019Set[index].BeniName = "";
  }
  Changecontracts(value, text, index) {
    //purna1612
    this.Item1001SetForm.controls[index].patchValue({ ContraPatry: "" });
    //this.Item1001Set[index].ContraPatry = "";
    if (text == "TIN" || text == "CR") {
      this.getForm10SelectedKey(value, index, 0);
    }
  }
  Changecontracts1(value, text, index) {
    //purna1612
    // this.Item1004Set[index].ContraName = "";
    this.Item1004SetForm.controls[index].patchValue({ ContraName: "" });
    if (text == "TIN" || text == "CR") {
      this.getForm10SelectedKey(value, index, 1);
    }
  }
  Changecontracts2(value, text, index) {
    //purna1612
    //this.Item1013Set[index].BeniName = "";
    this.Item1013SetForm.controls[index].patchValue({ BeniName: "" });
    if (text == "TIN" || text == "CR") {
      this.getForm10SelectedKey(value, index, 2);
    }
  }
  Changecontracts3(value, text, index) {
    //purna1612
    //this.Item1019Set[index].BeniName = "";
    this.Item1019SetForm.controls[index].patchValue({ BeniName: "" });
    if (text == "TIN" || text == "CR") {
      this.getForm10SelectedKey(value, index, 3);
    }
  }
  RevenueContactform1Addform() {
    let Item1001SetAdd = {
      ActualCost: "0.00",
      AmedContraValue: "0.00",
      ContraAftAmed: "0.00",
      ContraPatry: "",
      ContractDt: null,
      CpmplePercentage: "0.00",
      CuryrRevenue: "0.00",
      DataVersion: "00000",
      EstimateCost: "0.00",
      FormGuid: "",
      IdNo: "",
      IdTp: "",
      LineNo: 0,
      Mandt: "",
      OriContraValue: "0.00",
      PrevYrFg: "",
      PreyrRevenue: "0.00",
      RankingOrder: "00",
      ReturnId: "",
      RevenueCompletion: "0.00",
      TimestampCh: null,
      TimestampCr: null,
      Waers: "",
    };
    this.Item1001Set.push(Item1001SetAdd);
  }
  SaveRevenueContactform1() {
    this.form10List.IncomeContract = (+this.CuryrRevenue).toFixed(2);
    this.form10List.Item1001Set["results"] = [];
    for (let i = 0; i < this.Item1001SetForm.controls.length; i++) {
      this.form10List.Item1001Set["results"].push({});
      this.form10List.Item1001Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1001Set["results"][i][
        "OriContraValue"
      ] = this.Item1001SetForm.controls[i].value.OriContraValue;
      this.form10List.Item1001Set["results"][i][
        "AmedContraValue"
      ] = this.Item1001SetForm.controls[i].value.AmedContraValue;
      this.form10List.Item1001Set["results"][i][
        "ContraAftAmed"
      ] = this.Item1001SetForm.controls[i].value.ContraAftAmed.toString();
      this.form10List.Item1001Set["results"][i][
        "ActualCost"
      ] = this.Item1001SetForm.controls[i].value.ActualCost;
      this.form10List.Item1001Set["results"][i][
        "EstimateCost"
      ] = this.Item1001SetForm.controls[i].value.EstimateCost;
      this.form10List.Item1001Set["results"][i][
        "IdTp"
      ] = this.Item1001SetForm.controls[i].value.IdTp;
      this.form10List.Item1001Set["results"][i][
        "CpmplePercentage"
      ] = this.Item1001SetForm.controls[i].value.CpmplePercentage;
      this.form10List.Item1001Set["results"][i][
        "IdNo"
      ] = this.Item1001SetForm.controls[i].value.IdNo;
      this.form10List.Item1001Set["results"][i][
        "RevenueCompletion"
      ] = this.Item1001SetForm.controls[i].value.RevenueCompletion;
      this.form10List.Item1001Set["results"][i][
        "ContraPatry"
      ] = this.Item1001SetForm.controls[i].value.ContraPatry;
      this.form10List.Item1001Set["results"][i][
        "PreyrRevenue"
      ] = this.Item1001SetForm.controls[i].value.PreyrRevenue;
      this.form10List.Item1001Set["results"][i][
        "CuryrRevenue"
      ] = this.Item1001SetForm.controls[i].value.CuryrRevenue;
      this.form10List.Item1001Set["results"][i]["ContractDt"] =
        "/Date(" +
          new Date(
            this.Item1001SetForm.controls[i].value.ContractDt
          ).getTime() +
          ")/" || null;
    }
    this.form10List.RIncomeContract = "X";
    this.isioa();
    //this.SaveForm();
    jQuery("#contractsModal").modal("hide");
    this.clsePopup();
  }
  RevfromInsurActivityCalc() {
    if (
      this.Item1002SetForm.controls[0].value.TotInsuPremium == "" ||
      this.Item1002SetForm.controls[0].value.TotInsuPremium == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ TotInsuPremium: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      TotInsuPremium: (+this.Item1002SetForm.controls[0].value
        .TotInsuPremium).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.CanInsuPremium == "" ||
      this.Item1002SetForm.controls[0].value.CanInsuPremium == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ CanInsuPremium: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      CanInsuPremium: (+this.Item1002SetForm.controls[0].value
        .CanInsuPremium).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.ReinsuPremium == "" ||
      this.Item1002SetForm.controls[0].value.ReinsuPremium == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ ReinsuPremium: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      ReinsuPremium: (+this.Item1002SetForm.controls[0].value
        .ReinsuPremium).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.ReinsuPremiumFore == "" ||
      this.Item1002SetForm.controls[0].value.ReinsuPremiumFore == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({
        ReinsuPremiumFore: "0.00",
      });
    }
    this.Item1002SetForm.controls[0].patchValue({
      ReinsuPremiumFore: (+this.Item1002SetForm.controls[0].value
        .ReinsuPremiumFore).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.NetPremium == "" ||
      this.Item1002SetForm.controls[0].value.NetPremium == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ NetPremium: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      NetPremium: (+this.Item1002SetForm.controls[0].value.NetPremium).toFixed(
        2
      ),
    });

    if (
      this.Item1002SetForm.controls[0].value.ReinsuFee == "" ||
      this.Item1002SetForm.controls[0].value.ReinsuFee == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ ReinsuFee: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      ReinsuFee: (+this.Item1002SetForm.controls[0].value.ReinsuFee).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.DiffInstallment == "" ||
      this.Item1002SetForm.controls[0].value.DiffInstallment == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ DiffInstallment: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      DiffInstallment: (+this.Item1002SetForm.controls[0].value
        .DiffInstallment).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.InvesIncome == "" ||
      this.Item1002SetForm.controls[0].value.InvesIncome == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ InvesIncome: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      InvesIncome: (+this.Item1002SetForm.controls[0].value
        .InvesIncome).toFixed(2),
    });

    if (
      this.Item1002SetForm.controls[0].value.OthIncome == "" ||
      this.Item1002SetForm.controls[0].value.OthIncome == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ OthIncome: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      OthIncome: (+this.Item1002SetForm.controls[0].value.OthIncome).toFixed(2),
    });
    if (
      this.Item1002SetForm.controls[0].value.TotInsuIncome == "" ||
      this.Item1002SetForm.controls[0].value.TotInsuIncome == undefined
    ) {
      this.Item1002SetForm.controls[0].patchValue({ TotInsuIncome: "0.00" });
    }
    this.Item1002SetForm.controls[0].patchValue({
      TotInsuIncome: (+this.Item1002SetForm.controls[0].value
        .TotInsuIncome).toFixed(2),
    });
    let val1 = (
      parseFloat(this.Item1002SetForm.controls[0].value.TotInsuPremium) -
      parseFloat(this.Item1002SetForm.controls[0].value.CanInsuPremium) -
      parseFloat(this.Item1002SetForm.controls[0].value.ReinsuPremium) -
      parseFloat(this.Item1002SetForm.controls[0].value.ReinsuPremiumFore)
    ).toFixed(2);
    if (val1 == "NaN") {
      val1 = "0.00";
    }
    this.Item1002SetForm.controls[0].patchValue({ NetPremium: val1 });
    let val2 = (
      parseFloat(this.Item1002SetForm.controls[0].value.NetPremium) +
      parseFloat(this.Item1002SetForm.controls[0].value.OthIncome) +
      parseFloat(this.Item1002SetForm.controls[0].value.InvesIncome) +
      parseFloat(this.Item1002SetForm.controls[0].value.DiffInstallment) +
      parseFloat(this.Item1002SetForm.controls[0].value.ReinsuFee)
    ).toFixed(2);
    if (val2 == "NaN") {
      val2 = "0.00";
    }
    this.Item1002SetForm.controls[0].patchValue({ TotInsuIncome: val2 });
  }
  SaveRevenueInsuActiv() {
    this.form10List.Item1002Set["results"] = [];
    for (let i = 0; i < this.Item1002SetForm.controls.length; i++) {
      this.form10List.Item1002Set["results"].push({});
      this.form10List.Item1002Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1002Set["results"][i][
        "TotInsuPremium"
      ] = this.Item1002SetForm.controls[i].value.TotInsuPremium;
      this.form10List.Item1002Set["results"][i][
        "CanInsuPremium"
      ] = this.Item1002SetForm.controls[i].value.CanInsuPremium;
      this.form10List.Item1002Set["results"][i][
        "ReinsuPremium"
      ] = this.Item1002SetForm.controls[i].value.ReinsuPremium;
      this.form10List.Item1002Set["results"][i][
        "ReinsuPremiumFore"
      ] = this.Item1002SetForm.controls[i].value.ReinsuPremiumFore;
      this.form10List.Item1002Set["results"][i][
        "NetPremium"
      ] = this.Item1002SetForm.controls[i].value.NetPremium;
      this.form10List.Item1002Set["results"][i][
        "ReinsuFee"
      ] = this.Item1002SetForm.controls[i].value.ReinsuFee;
      this.form10List.Item1002Set["results"][i][
        "DiffInstallment"
      ] = this.Item1002SetForm.controls[i].value.DiffInstallment;
      this.form10List.Item1002Set["results"][i][
        "InvesIncome"
      ] = this.Item1002SetForm.controls[i].value.InvesIncome;
      this.form10List.Item1002Set["results"][i][
        "OthIncome"
      ] = this.Item1002SetForm.controls[i].value.OthIncome;
      this.form10List.Item1002Set["results"][i][
        "TotInsuIncome"
      ] = this.Item1002SetForm.controls[i].value.TotInsuIncome;
    }

    this.form10List.IncomeInsu = this.Item1002SetForm.controls[0].value.TotInsuIncome;
    this.form10List.RIncomeInsu = "X";
    this.isioa();
    //this.SaveForm();
    jQuery("#incomeInsurance").modal("hide");
    this.clsePopup();
  }
  RevInsuranceActivCancel() {
    //this.Item1002Set = JSON.parse(this.Item1002SetTemp);
    this.getForm10Details();
    jQuery("#incomeInsurance").modal("hide");
  }
  SubContractAdd() {
    let Item1004SetAdd = {
      ContraName: "",
      Country: "",
      DataVersion: "00000",
      FormGuid: "",
      IdNo: "",
      IdTp: "",
      LineNo: 1,
      Mandt: "",
      RankingOrder: "00",
      ReturnId: "",
      TimestampCh: null,
      TimestampCr: null,
      Waers: "",
      WorkValue: "0.00",
      __metadata: null,
    };
    this.Item1004Set.push(Item1004SetAdd);
  }
  SaveSubContractor() {
    this.form10List.Item1004Set["results"] = [];
    for (let i = 0; i < this.Item1004SetForm.controls.length; i++) {
      this.form10List.Item1004Set["results"].push({});
      this.form10List.Item1004Set["results"][i]["LineNo"] = i + 1;
      this.form10List.Item1004Set["results"][i][
        "IdTp"
      ] = this.Item1004SetForm.controls[i].value.IdTp;
      this.form10List.Item1004Set["results"][i][
        "IdNo"
      ] = this.Item1004SetForm.controls[i].value.IdNo;
      this.form10List.Item1004Set["results"][i][
        "Country"
      ] = this.Item1004SetForm.controls[i].value.Country;
      this.form10List.Item1004Set["results"][i][
        "WorkValue"
      ] = this.Item1004SetForm.controls[i].value.WorkValue;
      this.form10List.Item1004Set["results"][i][
        "ContraName"
      ] = this.Item1004SetForm.controls[i].value.ContraName;
    }
    this.form10List.ExpSubcont = (+this.SubContractorTotal).toFixed(2);
    this.form10List.RSubcontract = "X"; //purna1612
    this.calccogs(); //purna1612
    //this.SaveForm();
    jQuery("#subContractsModal").modal("hide");
    this.clsePopup();
  }
  SubContractorTotalCal() {
    this.SubContractorTotal = "0.00";
    for (let i = 0; i < this.Item1004SetForm.controls.length; i++) {
      if (
        this.Item1004SetForm.controls[i].value.WorkValue == "" ||
        this.Item1004SetForm.controls[i].value.WorkValue == undefined
      ) {
        this.Item1004SetForm.controls[i].patchValue({ WorkValue: "0.00" });
      }
      this.Item1004SetForm.controls[i].patchValue({
        WorkValue: (+this.Item1004SetForm.controls[i].value.WorkValue).toFixed(
          2
        ),
      });

      this.SubContractorTotal = (
        parseFloat(this.SubContractorTotal) +
        parseFloat(this.Item1004SetForm.controls[i].value.WorkValue)
      ).toFixed(2);
    }
  }
  IncomeStmt(index) {
    var myarray = this.Item1001Set[index].ContractDt.split("-");
    let renddate = new Date(myarray[1] + "/" + myarray[2] + "/" + myarray[0]);
    var myarray1 = this.periodEndDate.split("/");
    let renddate1 = new Date(
      myarray1[2] + "-" + myarray1[1] + "-" + myarray1[0]
    );
    if (moment(renddate) > moment(renddate1)) {
      this.incomeError1 = true;
    } else {
      this.incomeError1 = false;
    }
  }
  ROthergainlossm(event) {
    if (event.currentTarget.checked == true) {
      this.ROthergainloss = true;
      this.form10List.ROthergainloss = "X";
    } else {
      this.ROthergainloss = false;
      this.form10List.ROthergainloss = "";
      this.form10List.CapitalGainloss = "0.00";
      this.form10List.OtherIncome = "0.00";
      this.form10List.TototherIncome = "0.00";
      this.totalincome();
    }
  }
  isoigl() {
    if (
      this.form10List.CapitalGainloss == "" ||
      this.form10List.CapitalGainloss == undefined
    ) {
      this.form10List.CapitalGainloss = "0.00";
    }
    this.form10List.CapitalGainloss = (+this.form10List
      .CapitalGainloss).toFixed(2);
    if (
      this.form10List.OtherIncome == "" ||
      this.form10List.OtherIncome == undefined
    ) {
      this.form10List.OtherIncome = "0.00";
    }
    this.form10List.OtherIncome = (+this.form10List.OtherIncome).toFixed(2);
    this.form10List.TototherIncome = (
      parseFloat(this.form10List.CapitalGainloss) +
      parseFloat(this.form10List.OtherIncome)
    ).toFixed(2);
    this.totalincome();
  }
  isioa() {
    if (
      this.form10List.IncomeOper == "" ||
      this.form10List.IncomeOper == null ||
      this.form10List.IncomeOper == undefined ||
      this.form10List.IncomeOper == "undefined"
    ) {
      this.form10List.IncomeOper = "0.00";
    }
    this.form10List.IncomeOper = (+this.form10List.IncomeOper).toFixed(2);
    this.form10List.IncomeOper = (+this.form10List.IncomeOper).toFixed(2);
    this.form10List.IncomeOper = (+this.form10List.IncomeOper).toFixed(2);
    this.form10List.TotalIncomeOpr = (
      parseFloat(this.form10List.IncomeOper) +
      parseFloat(this.form10List.IncomeInsu) +
      parseFloat(this.form10List.IncomeContract)
    ).toFixed(2);
    this.totalincome();
  }
  totalincome() {
    this.form10List.TotalIncome = (
      parseFloat(this.form10List.TotalIncomeOpr) +
      parseFloat(this.form10List.TototherIncome)
    ).toFixed(2);
    this.totalnetprofit();
  }
  totalnetprofit() {
    this.form10List.ExpNetprofit = (
      parseFloat(this.form10List.TotalIncome) -
      parseFloat(this.form10List.ExpTotalGoods)
    ).toFixed(2);
    //parseFloat(this.form10List.ExpTotalGoods)
    //this.SaveForm();
  }
  calccogs() {
    if (
      this.form10List.InvopenAmt == "" ||
      this.form10List.InvopenAmt == undefined
    ) {
      this.form10List.InvopenAmt = "0.00";
    }
    this.form10List.InvopenAmt = (+this.form10List.InvopenAmt).toFixed(2);
    if (
      this.form10List.ExtpurAmt == "" ||
      this.form10List.ExtpurAmt == undefined
    ) {
      this.form10List.ExtpurAmt = "0.00";
    }
    this.form10List.ExtpurAmt = (+this.form10List.ExtpurAmt).toFixed(2);
    if (
      this.form10List.IntpurAmt == "" ||
      this.form10List.IntpurAmt == undefined
    ) {
      this.form10List.IntpurAmt = "0.00";
    }
    this.form10List.IntpurAmt = (+this.form10List.IntpurAmt).toFixed(2);
    if (
      this.form10List.InvendAmt == "" ||
      this.form10List.InvendAmt == undefined
    ) {
      this.form10List.InvendAmt = "0.00";
    }
    this.form10List.InvendAmt = (+this.form10List.InvendAmt).toFixed(2);
    if (
      this.form10List.ExpSubcont == "" ||
      this.form10List.ExpSubcont == undefined
    ) {
      this.form10List.ExpSubcont = "0.00";
    }
    this.form10List.ExpSubcont = (+this.form10List.ExpSubcont).toFixed(2);
    if (
      this.form10List.ExpMachinerent == "" ||
      this.form10List.ExpMachinerent == undefined
    ) {
      this.form10List.ExpMachinerent = "0.00";
    }
    this.form10List.ExpMachinerent = (+this.form10List.ExpMachinerent).toFixed(
      2
    );
    if (
      this.form10List.ExpRepExpenses == "" ||
      this.form10List.ExpRepExpenses == undefined
    ) {
      this.form10List.ExpRepExpenses = "0.00";
    }
    this.form10List.ExpRepExpenses = (+this.form10List.ExpRepExpenses).toFixed(
      2
    );
    if (
      this.form10List.ExpBasicallow == "" ||
      this.form10List.ExpBasicallow == undefined
    ) {
      this.form10List.ExpBasicallow = "0.00";
    }
    this.form10List.ExpBasicallow = (+this.form10List.ExpBasicallow).toFixed(2);
    if (
      this.form10List.ExpOthbenef == "" ||
      this.form10List.ExpOthbenef == undefined
    ) {
      this.form10List.ExpOthbenef = "0.00";
    }
    this.form10List.ExpOthbenef = (+this.form10List.ExpOthbenef).toFixed(2);
    if (
      this.form10List.ExpSocialsaudi == "" ||
      this.form10List.ExpSocialsaudi == undefined
    ) {
      this.form10List.ExpSocialsaudi = "0.00";
    }
    this.form10List.ExpSocialsaudi = (+this.form10List.ExpSocialsaudi).toFixed(
      2
    );
    if (
      this.form10List.ExpSocialforei == "" ||
      this.form10List.ExpSocialforei == undefined
    ) {
      this.form10List.ExpSocialforei = "0.00";
    }
    this.form10List.ExpSocialforei = (+this.form10List.ExpSocialforei).toFixed(
      2
    );
    if (
      this.form10List.ExpProvisiYear == "" ||
      this.form10List.ExpProvisiYear == undefined
    ) {
      this.form10List.ExpProvisiYear = "0.00";
    }
    this.form10List.ExpProvisiYear = (+this.form10List.ExpProvisiYear).toFixed(
      2
    );
    if (
      this.form10List.ExpRoyalti == "" ||
      this.form10List.ExpRoyalti == undefined
    ) {
      this.form10List.ExpRoyalti = "0.00";
    }
    this.form10List.ExpRoyalti = (+this.form10List.ExpRoyalti).toFixed(2);
    if (
      this.form10List.ExpDonations == "" ||
      this.form10List.ExpDonations == undefined
    ) {
      this.form10List.ExpDonations = "0.00";
    }
    this.form10List.ExpDonations = (+this.form10List.ExpDonations).toFixed(2);
    if (
      this.form10List.ExpBookdep == "" ||
      this.form10List.ExpBookdep == undefined
    ) {
      this.form10List.ExpBookdep = "0.00";
    }
    this.form10List.ExpBookdep = (+this.form10List.ExpBookdep).toFixed(2);
    if (
      this.form10List.ExpReasrchDev == "" ||
      this.form10List.ExpReasrchDev == undefined
    ) {
      this.form10List.ExpReasrchDev = "0.00";
    }
    this.form10List.ExpReasrchDev = (+this.form10List.ExpReasrchDev).toFixed(2);
    if (
      this.form10List.ExpOther == "" ||
      this.form10List.ExpOther == undefined
    ) {
      this.form10List.ExpOther = "0.00";
    }
    this.form10List.ExpOther = (+this.form10List.ExpOther).toFixed(2);
    this.form10List.ExtpurAmt = (+this.form10List.ExtpurAmt).toFixed(2);
    this.form10List.CostgoodsAmt = (
      parseFloat(this.form10List.InvopenAmt) +
      parseFloat(this.form10List.ExtpurAmt) +
      parseFloat(this.form10List.IntpurAmt) -
      parseFloat(this.form10List.InvendAmt)
    ).toFixed(2);
    this.form10List.ExpTotal = (
      parseFloat(this.form10List.ExpSubcont) +
      parseFloat(this.form10List.ExpMachinerent) +
      parseFloat(this.form10List.ExpRepExpenses) +
      parseFloat(this.form10List.ExpBasicallow) +
      parseFloat(this.form10List.ExpOthbenef) +
      parseFloat(this.form10List.ExpSocialsaudi) +
      parseFloat(this.form10List.ExpSocialforei) +
      parseFloat(this.form10List.ExpProvisiYear) +
      parseFloat(this.form10List.ExpRoyalti) +
      parseFloat(this.form10List.ExpDonations) +
      parseFloat(this.form10List.ExpBookdep) +
      parseFloat(this.form10List.ExpReasrchDev) +
      parseFloat(this.form10List.ExpOther)
    ).toFixed(2);
    this.form10List.ExpTotalGoods = (
      parseFloat(this.form10List.ExpTotal) +
      parseFloat(this.form10List.CostgoodsAmt)
    ).toFixed(2);
    this.totalnetprofit();
    //this.SaveForm();
  }
  ddlflchange(index, flag) {
    if (flag == 0) {
      if (
        this.Item1013SetForm.controls[index].value.Residancy == "L" ||
        this.Item1013SetForm.controls[index].value.Residancy == "Local"
      ) {
        this.Item1013SetForm.controls[index].patchValue({ Country: "SA" });
      } else {
      }
    } else if (flag == 1) {
      if (
        this.Item1019SetForm.controls[index].value.Residancy == "L" ||
        this.Item1019SetForm.controls[index].value.Residancy == "Local"
      ) {
        this.Item1019SetForm.controls[index].patchValue({ Country: "SA" });
      } else {
      }
    }
  }
  //venkat end
  //purna start
  SaveTransferPricingDetails() {
    // if (this.step == 7) {
    //   this.form10List.Operationz = "01";
    // }
    // else {
    //   this.form10List.Operationz = "05";
    // }
    this.form10List.Item1022Set["results"] = [];
    for (let i = 0; i < this.PartyTransactionsSet.controls.length; i++) {
      this.form10List.Item1022Set["results"].push({});
      this.form10List.Item1022Set["results"][i][
        "Transactions"
      ] = this.PartyTransactionsSet.controls[i].value.Transaction;
      this.form10List.Item1022Set["results"][i][
        "Tdescription"
      ] = this.PartyTransactionsSet.controls[i].value.Description;
      this.form10List.Item1022Set["results"][i][
        "PartyName"
      ] = this.PartyTransactionsSet.controls[i].value.NameOfRelatedParty;
      this.form10List.Item1022Set["results"][i][
        "Jurisdiction"
      ] = this.PartyTransactionsSet.controls[i].value.Jurisdiction;
      this.form10List.Item1022Set["results"][i][
        "AmtFg"
      ] = this.PartyTransactionsSet.controls[i].value.TransactionNature;
      this.form10List.Item1022Set["results"][i][
        "Amt"
      ] = this.PartyTransactionsSet.controls[i].value.Amount;
      this.form10List.Item1022Set["results"][i][
        "TpMethod"
      ] = this.PartyTransactionsSet.controls[i].value.TPMethod;
    }
    this.form10List.Item1023Set["results"] = [];
    for (let i = 0; i < this.RelatedPartiesSet.controls.length; i++) {
      this.form10List.Item1023Set["results"].push({});
      this.form10List.Item1023Set["results"][i]["FocDescriptions"] =
        this.RelatedPartiesSet.controls[i].value.TransactionDescription || "";
      this.form10List.Item1023Set["results"][i]["Counterparty"] =
        this.RelatedPartiesSet.controls[i].value.CounterParty || "";
      this.form10List.Item1023Set["results"][i]["Jurisdiction"] =
        this.RelatedPartiesSet.controls[i].value.Jurisdiction || "";
    }

    this.form10List.Item1024Set["results"] = [];
    for (let i = 0; i < this.ShareholdersSet.controls.length; i++) {
      this.form10List.Item1024Set["results"].push({});
      this.form10List.Item1024Set["results"][i][
        "ShName"
      ] = this.ShareholdersSet.controls[i].value.ShareHoldersName;
      this.form10List.Item1024Set["results"][i][
        "Jurisdiction"
      ] = this.ShareholdersSet.controls[i].value.Jurisdiction;
      this.form10List.Item1024Set["results"][i][
        "Ownership"
      ] = this.ShareholdersSet.controls[i].value.OwnerShipPercentage;
    }

    this.form10List.Item1020Set.results[0].UpeFye =
      "/Date(" + new Date().getTime() + ")/";
    this.form10List.Item1020Set.results[0].FeFye =
      "/Date(" + new Date().getTime() + ")/";
    this.form10List.AgreeFg = "X";
    this.SaveForm();
    this.clsePopup();
  }
  FileUpload(event, dotype) {
    console.log(event);
    const frmData = new FormData();
    let filename;
    filename = event.target.files[0]["name"];
    frmData.append("fileUpload", event.target.files[0]);
    //   this.from11Service.SaveForm11Attachments(filename,this.taxPayerDetails.ReturnId,frmData,dotype).subscribe((data)=>{
    // console.log(data);
    // //this.SaveIncomeDetails();
    // if(dotype=='R11E')
    // {let obj={
    //   "Filename":data["d"]["Filename"].split('.')[0],
    //   "FileExtn":data["d"]["Filename"].split('.')[1]
    // }
    //   //this.legalDocCount.push(obj);
    // }
    // else if(dotype=='R11C')
    // {
    //   let obj={
    //     "Filename":data["d"]["Filename"].split('.')[0],
    //     "FileExtn":data["d"]["Filename"].split('.')[1]
    //   }
    //   this.ChartedFileCount=[];
    //   this.ChartedFileCount.push(obj);
    // }
    // else if(dotype=='R11D')
    // {
    //   let obj={
    //     "Filename":data["d"]["Filename"].split('.')[0],
    //     "FileExtn":data["d"]["Filename"].split('.')[1]
    //   }
    //   this.FinancialFileCount=[];
    //   this.FinancialFileCount.push(obj);
    // }
    // else if(dotype=='R11F')
    // {
    //   let obj={
    //     "Filename":data["d"]["Filename"].split('.')[0],
    //     "FileExtn":data["d"]["Filename"].split('.')[1]
    //   }
    //   this.ZakatFileCount.push(obj);
    // }
    // this.myInputVariable.nativeElement.value = '';
    // this.myInputVariable1.nativeElement.value = '';
    // this.myinputCharteredFile.nativeElement.value = '';
    // this.myinputFinancialStatement.nativeElement.value = '';
    // });
  }
  DownloadFormFormat() {
    this.returnsService
      .getForm10Download(this.form10List.Fbnumz)
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "FormFormat.pdf");
      });
  }
  DownloadInvoice() {
    this.returnsService
      .getForm10Download(this.form10List.Fbnumz)
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "Invoice.pdf");
      });
  }
  declareChange(event) {
    if (event.target.checked) {
      this.AgreeClick = true;
    } else {
      this.AgreeClick = false;
    }
  }
  CancelReturn() {
    this.form10List.AgreeFg = "";
    this.form10List.Operationz = "04";
    this.form10List.UserTypz = "TP";
    localStorage.setItem("posobj", JSON.stringify(this.form10List));
    this.returnsService.submitForm10(this.form10List).subscribe((data: any) => {
      this.homeBack();
    });
  }
  submit() {
    this.form10List.AgreeFg = "X";
    this.form10List.Operationz = "01";
    this.form10List.UserTypz = "TP";
    console.log("postobj", this.form10List);
    localStorage.setItem("posobj", JSON.stringify(this.form10List));
    this.returnsService.submitForm10(this.form10List).subscribe((data: any) => {
      this.getForm10Details();
      this.step = 9;
    });
  }
  homeBack() {
    this.router.navigate(["mains/returns/zakatcit"]);
    //mains/returns/zakatcit
  }
  addPopup() {
    jQuery("body").addClass("modalopen");
    this.NoOfAddedForms = 1;
  }
  clsePopup() {
    jQuery("body").removeClass("modalopen");
  }
  ResetInsurence() {
    this.form10List.RTaxamt == "X"
      ? this.taxbaseD2Form.patchValue({ Schedule: true })
      : this.taxbaseD2Form.patchValue({ Schedule: false });
    //if (this.form10List.RTaxamt == "X") {
    this.clearFormArray(this.TaxBaseD2);
    for (let i = 0; i < this.form10List.Item1018Set["results"].length; i++) {
      this.AddRowD2();
      this.TaxBaseD2.controls[i].patchValue({
        TotInsuPre: this.form10List.Item1018Set["results"][i]["TotInsuPre"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        CanInsuPre: this.form10List.Item1018Set["results"][i]["CanInsuPre"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocReisnuPremi: this.form10List.Item1018Set["results"][i][
          "LocReisnuPremi"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        ExtReisnuPremi: this.form10List.Item1018Set["results"][i][
          "ExtReisnuPremi"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        NetPremEar: this.form10List.Item1018Set["results"][i]["NetPremEar"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        ResCompPyr: this.form10List.Item1018Set["results"][i]["ResCompPyr"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        ResCompExiPyr: this.form10List.Item1018Set["results"][i][
          "ResCompExiPyr"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        TotResePyr: this.form10List.Item1018Set["results"][i]["TotResePyr"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocGeneIns: this.form10List.Item1018Set["results"][i]["LocGeneIns"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GloGeneIns: this.form10List.Item1018Set["results"][i]["GloGeneIns"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GloInveIncome: this.form10List.Item1018Set["results"][i][
          "GloInveIncome"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        NonInvsnuReven: this.form10List.Item1018Set["results"][i][
          "NonInvsnuReven"
        ],
      });

      this.TaxBaseD2.controls[i].patchValue({
        PerOthsnuIncom: this.form10List.Item1018Set["results"][i][
          "PerOthsnuIncom"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        Total1: this.form10List.Item1018Set["results"][i]["Total1"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        ComPaidDanger: this.form10List.Item1018Set["results"][i][
          "ComPaidDanger"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        AmtCovReinsurance: this.form10List.Item1018Set["results"][i][
          "AmtCovReinsurance"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        NetCompaPaid: this.form10List.Item1018Set["results"][i]["NetCompaPaid"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        UnprePaidCyr: this.form10List.Item1018Set["results"][i]["UnprePaidCyr"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        ExistingRevCyr: this.form10List.Item1018Set["results"][i][
          "ExistingRevCyr"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        NonlegalDed: this.form10List.Item1018Set["results"][i]["NonlegalDed"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        PreEstabilisment: this.form10List.Item1018Set["results"][i][
          "PreEstabilisment"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LegalDedPerEst: this.form10List.Item1018Set["results"][i][
          "LegalDedPerEst"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocGenInsPre: this.form10List.Item1018Set["results"][i]["LocGenInsPre"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GlobGenInsPre: this.form10List.Item1018Set["results"][i][
          "GlobGenInsPre"
        ],
      });

      this.TaxBaseD2.controls[i].patchValue({
        GenAdminExp: this.form10List.Item1018Set["results"][i]["GenAdminExp"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        PreEstShareMain: this.form10List.Item1018Set["results"][i][
          "PreEstShareMain"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        Total2: this.form10List.Item1018Set["results"][i]["Total2"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        Total1Total2: this.form10List.Item1018Set["results"][i]["Total1Total2"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocGenInsPreWri: this.form10List.Item1018Set["results"][i][
          "LocGenInsPreWri"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GlobGenInsPreWri: this.form10List.Item1018Set["results"][i][
          "GlobGenInsPreWri"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GlobNetProfitTax: this.form10List.Item1018Set["results"][i][
          "GlobNetProfitTax"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        TaxBase: this.form10List.Item1018Set["results"][i]["TaxBase"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        TaxableInsuActivity: this.form10List.Item1018Set["results"][i][
          "TaxableInsuActivity"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocSavPerWriteu: this.form10List.Item1018Set["results"][i][
          "LocSavPerWriteu"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        SavingGlobalInsuu: this.form10List.Item1018Set["results"][i][
          "SavingGlobalInsuu"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GlobalInvestIncome: this.form10List.Item1018Set["results"][i][
          "GlobalInvestIncome"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        PerEstableshIncome: this.form10List.Item1018Set["results"][i][
          "PerEstableshIncome"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocSavPerWrite: this.form10List.Item1018Set["results"][i][
          "LocSavPerWrite"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        SavingGlobalInsu: this.form10List.Item1018Set["results"][i][
          "SavingGlobalInsu"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GenAdminMainCenter: this.form10List.Item1018Set["results"][i][
          "GenAdminMainCenter"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        PerEstableshMainCen: this.form10List.Item1018Set["results"][i][
          "PerEstableshMainCen"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        LocSavPerWritet: this.form10List.Item1018Set["results"][i][
          "LocSavPerWritet"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        SavingGlobalInsuv: this.form10List.Item1018Set["results"][i][
          "SavingGlobalInsuv"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        GenAdminMainCenterv: this.form10List.Item1018Set["results"][i][
          "GenAdminMainCenterv"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        PerEstableshMainCenv: this.form10List.Item1018Set["results"][i][
          "PerEstableshMainCenv"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        TotalTaxPerEsta: this.form10List.Item1018Set["results"][i][
          "TotalTaxPerEsta"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        RevenuLoan: this.form10List.Item1018Set["results"][i]["RevenuLoan"],
      });
      this.TaxBaseD2.controls[i].patchValue({
        RealizedGains: this.form10List.Item1018Set["results"][i][
          "RealizedGains"
        ],
      });
      this.TaxBaseD2.controls[i].patchValue({
        TaxbasedActivity: this.form10List.Item1018Set["results"][i][
          "TaxbasedActivity"
        ],
      });
      //this.TaxBaseD2.controls[i].patchValue({ "PerEstaTax": this.form10List.Item1018Set["results"][i]["PerEstaTax"] });
      this.ReinsuranceCal(i);
    }
    this.clsePopup();
  }
  ResetCit() {
    this.form10List.RCarryAdj == "X"
      ? this.taxbaseD1Form.patchValue({ Schedule: true })
      : this.taxbaseD1Form.patchValue({ Schedule: false });
    //if (this.form10List.RCarryAdj == "X") {
    this.clearFormArray(this.TaxBaseD1);
    for (let i = 0; i < this.form10List.Item1017Set["results"].length; i++) {
      this.AddRowD1();
      this.TaxBaseD1.controls[i].patchValue({
        CitCarryLoss: this.form10List.Item1017Set["results"][i]["CitCarryLoss"],
      });
      this.TaxBaseD1.controls[i].patchValue({
        AdjDeclProfit: this.form10List.Item1017Set["results"][i][
          "AdjDeclProfit"
        ],
      });
      this.TaxBaseD1.controls[i].patchValue({
        LossDedCyr: this.form10List.Item1017Set["results"][i]["LossDedCyr"],
      });
      this.TaxBaseD1.controls[i].patchValue({
        EndYrbal: this.form10List.Item1017Set["results"][i]["EndYrbal"],
      });
      this.CitCarriedForwardCal(i);
    }
    this.clsePopup();
  }
  ResetPROP() {
    this.form10List.RProperty == "X"
      ? this.zcD3Form.patchValue({ Schedule: true })
      : this.zcD3Form.patchValue({ Schedule: false });
    //if (this.form10List.RProperty == "X") {
    this.clearFormArray(this.ZCD3);
    for (let i = 0; i < this.form10List.Item1009Set["results"].length; i++) {
      this.AddRowZCD3();
      this.ZCD3.controls[i].patchValue({
        Statement: this.form10List.Item1009Set["results"][i]["Statement"],
      });
      this.ZCD3.controls[i].patchValue({
        BegBal: this.form10List.Item1009Set["results"][i]["BegBal"],
      });
      this.ZCD3.controls[i].patchValue({
        Addition: this.form10List.Item1009Set["results"][i]["Addition"],
      });
      this.ZCD3.controls[i].patchValue({
        DispCost: this.form10List.Item1009Set["results"][i]["DispCost"],
      });
      this.ZCD3.controls[i].patchValue({
        EndBal: this.form10List.Item1009Set["results"][i]["EndBal"],
      });
      this.ZCD3.controls[i].patchValue({
        TotSale: this.form10List.Item1009Set["results"][i]["TotSale"],
      });
      this.ZCD3.controls[i].patchValue({
        CusTotPay: this.form10List.Item1009Set["results"][i]["CusTotPay"],
      });
      this.ZCD3.controls[i].patchValue({
        Per: this.form10List.Item1009Set["results"][i]["Per"],
      });
      this.ZCD3.controls[i].patchValue({
        DedBase: this.form10List.Item1009Set["results"][i]["DedBase"],
      });
      this.calTotalZDSell(i);
    }
    this.clsePopup();
  }
  ResetACFL() {
    this.form10List.RAdjcarry == "X"
      ? this.zcD2Form.patchValue({ Schedule: true })
      : this.zcD2Form.patchValue({ Schedule: false });
    //if (this.form10List.RAdjcarry == "X") {
    this.clearFormArray(this.ZCD2);
    for (let i = 0; i < this.form10List.Item1015Set["results"].length; i++) {
      this.AddRowZCD2();
      this.ZCD2.controls[i].patchValue({
        NetProfit: this.form10List.ZakprofitadAmt,
      });
      this.ZCD2.controls[i].patchValue({
        DefAdjacement: this.form10List.Item1015Set["results"][i][
          "DefAdjacement"
        ],
      });
      this.ZCD2.controls[i].patchValue({
        AllocReject: this.form10List.Item1015Set["results"][i]["AllocReject"],
      });
      this.ZCD2.controls[i].patchValue({
        CayyForward: this.form10List.Item1015Set["results"][i]["CayyForward"],
      });
      this.ZCD2.controls[i].patchValue({
        TotLoss: this.form10List.Item1015Set["results"][i]["TotLoss"],
      });
      this.ZCD2.controls[i].patchValue({
        CayyForwardloss: this.form10List.Item1015Set["results"][i][
          "CayyForwardloss"
        ],
      });
      this.CalculateZCACFL();
    }
    this.clsePopup();
  }
  ResetNetPro() {
    this.getForm10Details();
    this.clsePopup();
  }
  ResetLoan() {
    this.form10List.RLoanchagres == "X"
      ? this.LoanChargesForm.patchValue({ Schedule: true })
      : this.LoanChargesForm.patchValue({ Schedule: false });
    //if (this.form10List.RLoanchagres == "X") {
    if (this.LoanCharges.length == 0) {
      this.LoanCharges.push(this.LoanChargesGroup());
    }
    this.LoanCharges.controls[0].patchValue({
      TotLoanInt: this.form10List.Item1007Set["results"][0]["TotLoanInt"],
      TotLoanCharg: this.form10List.Item1007Set["results"][0]["TotLoanCharg"],
      DedLoancharg: this.form10List.Item1007Set["results"][0]["DedLoancharg"],
      NondedLoancharg: this.form10List.Item1007Set["results"][0][
        "NondedLoancharg"
      ],
    });
    this.calLoanCharges();
  }
  ResetDepreciation() {
    this.getForm10Details();
    this.clsePopup();
  }
  ResetOAIn() {
    this.getForm10Details();
    this.clsePopup();
  }
  ResetRT() {
    this.getForm10Details();
    this.clsePopup();
  }
  ResetMEQ() {
    this.getForm10Details();
    this.clsePopup();
  }
  ResetRFC() {
    this.getForm10Details();
    this.clsePopup();
  }
  AmtTxtChange(i) {
    if (
      this.PartyTransactionsSet.controls[i].value.Amount == "" ||
      this.PartyTransactionsSet.controls[i].value.Amount == undefined
    ) {
      this.PartyTransactionsSet.controls[i].patchValue({ Amount: "0.00" });
    }
    this.PartyTransactionsSet.controls[i].patchValue({
      Amount: (+this.PartyTransactionsSet.controls[i].value.Amount).toFixed(2),
    });
  }
  AmtTxtChange1() {
    if (
      this.form10List.Item1021.Revenue == "" ||
      this.form10List.Item1021.Revenue == undefined
    ) {
      this.form10List.Item1021.Revenue = "0.00";
    }
    this.form10List.Item1021.Revenue = (+this.form10List.Item1021
      .Revenue).toFixed(2);
    if (
      this.form10List.Item1021.Expense == "" ||
      this.form10List.Item1021.Expense == undefined
    ) {
      this.form10List.Item1021.Expense = "0.00";
    }
    this.form10List.Item1021.Expense = (+this.form10List.Item1021
      .Expense).toFixed(2);
    if (
      this.form10List.Item1021.NetAmount == "" ||
      this.form10List.Item1021.NetAmount == undefined
    ) {
      this.form10List.Item1021.NetAmount = "0.00";
    }
    this.form10List.Item1021.NetAmount = (+this.form10List.Item1021
      .NetAmount).toFixed(2);
  }
  AmtTxtChange2(i) {
    if (
      this.PartyTransactionsSet.controls[i].value.Amount == "" ||
      this.PartyTransactionsSet.controls[i].value.Amount == undefined
    ) {
      this.PartyTransactionsSet.controls[i].patchValue({ Amount: "0.00" });
    }
    this.PartyTransactionsSet.controls[i].patchValue({
      Amount: (+this.PartyTransactionsSet.controls[i].value.Amount).toFixed(2),
    });
  }

  //purna end
}
