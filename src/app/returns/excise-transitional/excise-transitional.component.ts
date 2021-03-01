import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from "@angular/forms";
import { excisetransitionalconstants } from "src/app/returns/excise-transitional/excise-transitionalconstants.model";
import { Router } from "@angular/router";
import * as moment from "moment";
import { ReturnsService } from "../returns.service";
import { VatServiceService } from "src/app/services/vat-service.service";
import { AppService } from "src/app/app.service";
import * as FileSaver from "file-saver";
import { FlexAlignStyleBuilder } from "@angular/flex-layout";
import { NotifierService } from "angular-notifier";
import { environment } from "src/environments/environment";
import * as XLSX from "xlsx";

declare var jQuery: any;

@Component({
  selector: "app-excise-transitional",
  templateUrl: "./excise-transitional.component.html",
  styleUrls: ["./excise-transitional.component.css"],
})
export class ExciseTransitionalComponent implements OnInit {
  baseUrl = environment.loginurl.split("irj")[0] + "/";
  @ViewChild("inputFile") myInputVariable: ElementRef;
  AttachSet = [];
  sadadDetails: any = [];
  typeIndex: number;
  isrefund: boolean = false;
  lang: any;
  direction: string;
  declarationFormGroup: FormGroup;
  SweetenedBeveragesFormGroup: FormGroup;
  TobaccoFormGroup: FormGroup;
  fields: FormArray;
  submitted = false;
  InstructionFormGroup: FormGroup = new FormGroup({});
  GPartz: any;
  Direction: string;
  Step: any = 1;
  PeronalDetailsObj: any = [];
  PeronalDetailsObj2: any = [];
  paymentHistoryObj: any = [];
  latePaymentPnaltyObj: any = [];
  sweetenedBeveragesObj: any = [];
  userObject: any = [];
  step: number;
  measuringunit: any = [];
  productTypes: any = [];
  ItemTypes: any = [];
  Descriptions: any = [];
  measuringunitstoboccos: any = [];
  totalretailsellingprice: any = 0.0;
  exciseTaxamount: any = 0.0;
  Qty: any = 0.0;
  Rsp: any = 0.0;
  Addline: any = [];
  sweetenedBeveragesList: any = [];
  tobaccoList: any = [];
  AddLineTobacco: any = [];
  toboccoObj: any = [];
  productTypesdropdown: any = [];
  measureunitdropdown: any = [];
  ItemTypesdropdown: any = [];
  Descriptiondropdown: any = [];
  measuringunitstoboccosdrpdwn: any = [];
  Descriptiondropdown1: any = [];
  measuringunitstoboccosdrpdwn1: any = [];
  totalQuantity: any = 0.0;
  totalRSP: any = 0.0;
  totalTRSP: any = 0.0;
  totalDueExciseTax: any = 0.0;
  totalMET: any = 0.0;
  totaltoboccoQty: any = 0.0;
  totaltoboccoRsp: any = 0.0;
  totaltoboccoTrsp: any = 0.0;
  totaltoboccoExciseTax: any = 0.0;
  totalTaxtoMET: any = 0.0;
  totaltoboccoDueExciseTax: any = 0.0;
  submitObj: any = [];
  saveObj: any = [];
  totalDueAmount: number = 0.0;
  TotalExcise: any = [];
  TotalDueAmount: number;
  AgreeClick: boolean = false;
  Sweetendtiles: boolean = false;
  toboccotiles: boolean = false;
  uploadCheck: boolean = false;
  declareClick: boolean = false;
  infoNum = 0;
  language;
  Email;
  action: any = "FillManually";
  titleText: any;
  downloadExcelbuttonTitle: any;
  notesAttached: string;
  errorNotes: boolean = false;
  IdTypesEn = [
    {
      Key: "ZS0001",
      Text: "National ID Number",
    },
    {
      Key: "ZS0002",
      Text: "Iqama Number",
    },
    {
      Key: "ZS0003",
      Text: "GCC ID",
    },
    {
      Key: "ZS0004",
      Text: "Licence Number",
    },
    {
      Key: "ZS0005",
      Text: "Company ID",
    },
  ];

  IdTypesAr = [
    {
      Key: "ZS0001",
      Text: "رقم الهوية الوطنية",
    },
    {
      Key: "ZS0002",
      Text: "رقم الإقامة",
    },
    {
      Key: "ZS0003",
      Text: "رقم هوية مواطني دول الخليج",
    },
    {
      Key: "ZS0004",
      Text: "رقم الرخصة",
    },
    {
      Key: "ZS0005",
      Text: "معرف الشركة",
    },
  ];

  idDisplayName: any;
  hasError: boolean = false;

  constructor(
    private returnsService: ReturnsService,
    private vatService: VatServiceService,
    private fb: FormBuilder,
    private router: Router,
    public appServ: AppService,
    private notifierService: NotifierService
  ) {
    console.log("IdTypes", this.IdTypesEn);
    this.GPartz = localStorage.getItem("gpart");
    //this.Email = localStorage.getItem('email');
    console.log("GPartz", this.GPartz);
  }

  ngOnInit(): void {
    // //For Tab Active
    // if (localStorage.getItem("lang") === "ar") {
    //   localStorage.setItem("ActiveTab",JSON.stringify("الزكاة و ضريبة الدخل"));
    //   }else
    //   {
    //     localStorage.setItem("ActiveTab",JSON.stringify("Zakat & CIT"));
    //   }
    // //For Tab Active end

    if (localStorage.getItem("lang") === "ar") {
      this.lang = excisetransitionalconstants.langz.arb.excisetransitional;
      this.direction = excisetransitionalconstants.langz.arb.dir;
      this.language = "ar";
      this.titleText = "لم تقم باختيار ملف";
      this.downloadExcelbuttonTitle = "تحميل بصيغة إكسل";
    } else {
      this.lang = excisetransitionalconstants.langz.eng.excisetransitional;
      this.direction = excisetransitionalconstants.langz.eng.dir;
      this.language = "en";
      this.titleText = "No file chosen";
      this.downloadExcelbuttonTitle = "Download Excel Format";
    }
    this.declarationFormGroup = this.fb.group({
      //idType: ['', Validators.required],
      contactPersonName: ["", Validators.required],
      occupation: ["", Validators.required],
      idNumber: ["", Validators.required],
      declarationDate: ["", Validators.required],
    });
    //this.language = localStorage.getItem("lang");
    // if (localStorage.getItem("lang") == 'ar') {
    //   moment.locale('ar-Sa');
    // }
    // else {
    //moment.locale('en-Us');

    //}

    moment.locale("en-Us");
    console.log("this.declarationFormGroup", this.declarationFormGroup);
    this.declarationFormGroup.patchValue({
      declarationDate: moment(new Date()).format("YYYY/MM/DD"),
    });

    if (localStorage.getItem("lang") === "ar") {
      this.lang = excisetransitionalconstants.langz.arb.excisetransitional;
      this.direction = excisetransitionalconstants.langz.arb.dir;
    } else {
      this.lang = excisetransitionalconstants.langz.eng.excisetransitional;
      this.direction = excisetransitionalconstants.langz.eng.dir;
    }
    this.GetUserDetails();
    this.SweetenedBeveragesFormGroup = this.fb.group({
      fields: this.fb.array([]),
    });
    this.TobaccoFormGroup = this.fb.group({
      fields: this.fb.array([]),
    });
  }

  addRowTobacco(): FormGroup {
    return this.fb.group({
      ItemType: ["", Validators.required],
      description: ["", Validators.required],
      measuringunitstobocco: ["", Validators.required],
      met: ["0.00", Validators.required],
      quanitityToboco: ["0.000", Validators.required],
      retailpricetoboco: ["0.00", Validators.required],
      totalsellingPriceToboco: ["", Validators.required],
      exciseTax: ["", Validators.required],
      exciseTaxtomet: ["", Validators.required],
      dueexciseTaxToboco: ["", Validators.required],
    });
  }

  addRowSweetend(): FormGroup {
    return this.fb.group({
      producttype: ["0001", Validators.required],
      ItemDescrption: ["", Validators.required],
      measuringunit: ["CAN", Validators.required],
      quantity: ["0.000", Validators.required],
      retailingPriceUnit: ["0.00", Validators.required],
      totalretailsellingPrice: ["", Validators.required],
      dueExciseTax: ["", Validators.required],
    });
  }

  get formsControls1() {
    return this.SweetenedBeveragesFormGroup.get("fields") as FormArray;
  }
  get formsControls2() {
    return this.TobaccoFormGroup.get("fields") as FormArray;
  }

  getUserInfo() {
    this.appServ.getUserInfo(this.GPartz).subscribe(
      (res) => {
        this.Email = res["d"]["Email"];
        console.log("email", this.Email);
      }
      // (err) => {
      //   this.appServ.updatedDataSelection4("0");
      // }
    );
  }

  GetUserDetails() {
    this.vatService.getVatData().subscribe((res) => {
      console.log("resdata", res["d"]);
      this.userObject = res;
      console.log("this.userObject", this.userObject);
      console.log("this.Taxpayerz", this.userObject.Gpartz);
      this.getUserInfo();
      this.getPeronalDetails();
      this.getPaymentHisotry();
    });
  }
  stepsChecking() {
    switch (this.Step) {
      case 1:
        //this.WarehouseDetail();
        break;
      case 2:
        // this.WarehoueManagerInformation1();
        break;
      case 3:
        // this.declarationFormControls();
        break;

      default:
        break;
    }
    return this.Step;
  }
  get f() {
    return this.declarationFormGroup.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.declarationFormGroup.invalid) {
      return;
    }
  }
  sweetenedBeverages() {
    var x = document.getElementById("sweetenedBeveragesView");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  tobaccoProduct() {
    var x = document.getElementById("tobaccoProductView");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  productDropDownList: any = [];
  ExcelDownloadObj: any = [];
  ExcelDownload: any = [];

  getPeronalDetails() {
    this.returnsService
      .getPeronalDetails(
        this.GPartz,
        this.Email,
        this.userObject["d"]["Langz"][0]
      )
      .subscribe((data) => {
        this.PeronalDetailsObj = data["d"];
        console.log("PeronalDetailsObj ppppppppppppp", this.PeronalDetailsObj);
        this.productTypes = data["d"]["ITEM_typeSet"]["results"];
        this.measuringunit = data["d"]["UnitMeasureSet"]["results"];
        this.ItemTypes = data["d"]["ITEM_typeSet"]["results"];
        this.Descriptions = data["d"]["ITem_descSet"]["results"];
        this.ExcelDownloadObj = data["d"]["Excel_DataSet"]["results"];
        this.ExcelDownload = this.ExcelDownloadObj.filter((data) => {
          return data["SourceFg"] == "6";
        });
        this.measuringunitstoboccos = data["d"]["Met_typeSet"]["results"];

        this.productTypesdropdown = this.productTypes.filter((data) => {
          return data["Code"] == "004";
        });
        this.measureunitdropdown = this.measuringunit.filter((data) => {
          return data["GoodsNo"] == "004";
        });
        this.ItemTypesdropdown = this.ItemTypes.filter((data) => {
          return data["Code"] == "001";
        });
        this.Descriptiondropdown = this.Descriptions.filter((data) => {
          return data["Code"] == "001";
        });
        this.measuringunitstoboccosdrpdwn = this.measuringunitstoboccos.filter(
          (data) => {
            return data["Code"] == "001";
          }
        );

        // console.log("productTypes", this.productTypesdropdown);
        // console.log("measuringunit ", this.measureunitdropdown);
        // console.log("ItemTypes", this.ItemTypesdropdown);
        // console.log("Descriptions", this.Descriptiondropdown);
        // console.log("measuringunitstoboccos", this.measuringunitstoboccosdrpdwn);
        this.getPeronalDetails2();
      });
  }

  downLoadExcel() {
    // this.returnsService.downLoadExcel().subscribe((data: any) => {
    FileSaver.saveAs(this.ExcelDownload.UrlPortal, "ExcelDownload.pdf");
    // });
  }

  FormsSet() {
    console.log(
      "this.sweetenedBeveragesObjresult",
      this.sweetenedBeveragesObj["results"]
    );

    console.log(
      "this.sweetenedBeveragesObj...results[0].FormGuid",
      this.sweetenedBeveragesObj["results"][0]["FormGuid"]
    );

    this.clearFormArray(this.formsControls1);
    for (let j = 0; j < this.sweetenedBeveragesObj["results"].length; j++) {
      this.onAddRowSweetend();
      this.formsControls1.controls[j].patchValue({
        producttype:
          this.sweetenedBeveragesObj["results"][j]["ItemSr"] == "0000"
            ? "0001"
            : this.sweetenedBeveragesObj["results"][j]["ItemSr"],
      });
      this.formsControls1.controls[j].patchValue({
        ItemDescrption: this.sweetenedBeveragesObj["results"][j]["Des"] || "",
      });
      this.formsControls1.controls[j].patchValue({
        measuringunit:
          this.sweetenedBeveragesObj["results"][j]["Unit"] || "CAN",
      });
      this.formsControls1.controls[j].patchValue({
        quantity: this.sweetenedBeveragesObj["results"][j]["Qty"] || "0.000",
      });
      this.formsControls1.controls[j].patchValue({
        retailingPriceUnit:
          this.sweetenedBeveragesObj["results"][j]["Rsp"] || "0.00",
      });
      this.formsControls1.controls[j].patchValue({
        totalretailsellingPrice: this.sweetenedBeveragesObj["results"][j][
          "Trsp"
        ].toString(),
      });
      this.formsControls1.controls[j].patchValue({
        dueExciseTax: this.sweetenedBeveragesObj["results"][j][
          "Duetax"
        ].toString(),
      });
      this.totalretailCalculations();
    }
    console.log("this.toboccoObj[results]", this.toboccoObj["results"]);
    this.clearFormArray(this.formsControls2);
    for (let j = 0; j < this.toboccoObj["results"].length; j++) {
      this.onAddRowTobacco();
      this.formsControls2.controls[j].patchValue({
        ItemType:
          this.toboccoObj["results"][j]["ItemSr"] == "0000"
            ? ""
            : this.toboccoObj["results"][j]["ItemSr"],
      });
      this.formsControls2.controls[j].patchValue({
        description: this.toboccoObj["results"][j]["Des"] || "",
      });
      this.formsControls2.controls[j].patchValue({
        measuringunitstobocco: this.toboccoObj["results"][j]["Unit"] || "",
      });
      this.formsControls2.controls[j].patchValue(
        { met: this.toboccoObj["results"][j]["Metrate"] } || "0.00"
      );
      this.formsControls2.controls[j].patchValue({
        quanitityToboco: this.toboccoObj["results"][j]["Qty"] || "0.000",
      });
      this.formsControls2.controls[j].patchValue({
        retailpricetoboco: this.toboccoObj["results"][j]["Rsp"] || "0.00",
      });
      this.formsControls2.controls[j].patchValue({
        totalsellingPriceToboco: this.toboccoObj["results"][j]["Trsp"] || 0.0,
      });
      this.formsControls2.controls[j].patchValue({
        exciseTax: this.toboccoObj["results"][j]["Excise"] || 0.0,
      });
      this.formsControls2.controls[j].patchValue({
        exciseTaxtomet: this.toboccoObj["results"][j]["Metexcise"] || 0.0,
      });
      this.formsControls2.controls[j].patchValue({
        dueexciseTaxToboco: this.toboccoObj["results"][j]["Duetax"] || 0.0,
      });
      this.totalToboccoCalculations();
    }
  }

  getPeronalDetails2() {
    this.returnsService
      .getPeronalDetails2(this.GPartz, this.Email)
      .subscribe((data) => {
        this.PeronalDetailsObj2 = data["d"];
        console.log("PeronalDetailsObj2", this.PeronalDetailsObj2);
        this.sweetenedBeveragesObj = this.PeronalDetailsObj2["Good_SSBSet"];
        this.toboccoObj = this.PeronalDetailsObj2["Good_TABSet"];
        this.Sweetendtiles =
          this.sweetenedBeveragesObj["results"].length > 0 &&
          this.sweetenedBeveragesObj["results"][0].Des != "";
        this.toboccotiles =
          this.toboccoObj["results"].length > 0 &&
          this.toboccoObj["results"][0].Des != "";
        this.notesAttached = "";
        console.log(this.PeronalDetailsObj2);
        if (this.PeronalDetailsObj2["notesSet"]["results"].length > 0) {
          for (
            let i = 0;
            i < this.PeronalDetailsObj2["notesSet"]["results"].length;
            i++
          ) {
            this.notesAttached =
              this.notesAttached +
              this.PeronalDetailsObj2["notesSet"]["results"][i].Tdline;
          }
        }

        if (this.language == "ar") {
          this.idDisplayName = this.IdTypesAr.filter(
            (x) => x.Key == this.PeronalDetailsObj2.Type
          )[0]["Text"];
        } else {
          this.idDisplayName = this.IdTypesEn.filter(
            (x) => x.Key == this.PeronalDetailsObj2.Type
          )[0]["Text"];
        }
      });
  }

  continuePerInfo() {
    this.FormsSet();
    this.totalretailCalculations();
    this.totalToboccoCalculations();
    this.TotalDueAmount =
      this.latePaymentPnaltyObj.LateFillpenalty * 1 +
      this.latePaymentPnaltyObj.LatePaypenalty * 1 +
      this.totalDueExciseTax * 1 +
      this.totaltoboccoDueExciseTax * 1;
    // console.log("this.TotalDueAmount finallllll",this.TotalDueAmount)
  }

  basicInfo() {
    this.getUserInfo();
    this.getPeronalDetails();
    jQuery("#infoModal").modal("hide");
  }

  getPaymentHisotry() {
    this.returnsService.getPaymentHisotry(this.GPartz).subscribe((data) => {
      this.paymentHistoryObj = data["d"]["results"];
      console.log("paymentHistoryObj", this.paymentHistoryObj);
    });
  }
  totalDueAmount1: any;
  latePaymentPnalty() {
    this.returnsService
      .latePaymentPnalty(
        this.GPartz,
        +this.totalDueExciseTax + +this.totaltoboccoDueExciseTax
      )
      .subscribe((data) => {
        this.latePaymentPnaltyObj = data["d"];
        console.log("latePaymentPnaltyobj", this.latePaymentPnaltyObj);
        this.totalDueAmount1 =
          this.latePaymentPnaltyObj.LateFillpenalty * 1 +
          this.latePaymentPnaltyObj.LatePaypenalty * 1;
        console.log("this.totalDueAmount", this.totalDueAmount1);
      });
  }

  onAddRowTobacco() {
    this.formsControls2.push(this.addRowTobacco());
  }

  onAddRowSweetend() {
    this.formsControls1.push(this.addRowSweetend());
  }

  deleteSweetend(i) {
    // const control = this.SweetenedBeveragesFormGroup.get('fields') as FormArray;
    this.formsControls1.removeAt(i);
    if (this.formsControls1.length == 0) {
      this.onAddRowSweetend();
    }
    this.totalretailCalculations();
    if (this.totaltoboccoRsp == 0 && this.totalRSP == 0) {
      this.latePaymentPnaltyObj.LateFillpenalty = "0.00";
      this.latePaymentPnaltyObj.LatePaypenalty = "0.00";
    }
  }

  deleteTobacco(i) {
    // const control = this.TobaccoFormGroup.get('fields') as FormArray;
    this.formsControls2.removeAt(i);
    if (this.formsControls2.length == 0) {
      this.onAddRowTobacco();
    }
    this.totalToboccoCalculations();
    if (this.totaltoboccoRsp == 0 && this.totalRSP == 0) {
      this.latePaymentPnaltyObj.LateFillpenalty = "0.00";
      this.latePaymentPnaltyObj.LatePaypenalty = "0.00";
    }
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  totalretailCalculations() {
    this.totalQuantity = 0;
    this.totalRSP = 0;
    this.totalTRSP = 0;
    this.totalDueExciseTax = 0;

    for (let j = 0; j < this.formsControls1.length; j++) {
      this.formsControls1.controls[j].patchValue({
        quantity: (+this.formsControls1.controls[j].value.quantity).toFixed(3),
      });
      this.formsControls1.controls[j].patchValue({
        retailingPriceUnit: (+this.formsControls1.controls[j].value
          .retailingPriceUnit).toFixed(2),
      });
      this.formsControls1.controls[j].patchValue({
        totalretailsellingPrice: (
          +this.formsControls1.controls[j].value.quantity *
          +this.formsControls1.controls[j].value.retailingPriceUnit
        ).toString(),
      });
      this.formsControls1.controls[j].patchValue({
        dueExciseTax: (
          +this.formsControls1.controls[j].value.totalretailsellingPrice / 2
        ).toString(),
      });

      this.totalQuantity =
        this.totalQuantity + +this.formsControls1.controls[j].value.quantity;
      this.totalRSP =
        this.totalRSP +
        +this.formsControls1.controls[j].value.retailingPriceUnit;
      this.totalTRSP =
        this.totalTRSP +
        +this.formsControls1.controls[j].value.totalretailsellingPrice;
      this.totalDueExciseTax =
        this.totalDueExciseTax +
        +this.formsControls1.controls[j].value.dueExciseTax;
      console.log(" this.totalQuantity ", this.totalQuantity);
      if (this.totalRSP > 0) {
        this.latePaymentPnalty();
      }
      if (this.totaltoboccoRsp == 0 && this.totalRSP == 0) {
        this.latePaymentPnaltyObj.LateFillpenalty = "0.00";
        this.latePaymentPnaltyObj.LatePaypenalty = "0.00";
      }
      // this.TotalExcise = this.totalDueExciseTax  +  (+this.totaltoboccoDueExciseTax);
      // console.log("TotalExcise",this.TotalExcise)
      //  this.TotalDueAmount= this.totalDueAmount + (+ this.TotalExcise);
      // console.log("TotalDueAmount",this.TotalDueAmount)
    }
  }

  continueSummary() {
    this.latePaymentPnalty();
    this.totalretailCalculations();
    this.totalToboccoCalculations();
  }
  totalToboccoCalculations() {
    this.totalMET = 0;
    this.totaltoboccoQty = 0;
    this.totaltoboccoRsp = 0;
    this.totaltoboccoTrsp = 0;
    this.totaltoboccoExciseTax = 0;
    this.totalTaxtoMET = 0;
    this.totaltoboccoDueExciseTax = 0;

    for (let j = 0; j < this.formsControls2.length; j++) {
      this.formsControls2.controls[j].patchValue({
        quanitityToboco: (+this.formsControls2.controls[j].value
          .quanitityToboco).toFixed(3),
      });
      this.formsControls2.controls[j].patchValue({
        retailpricetoboco: (+this.formsControls2.controls[j].value
          .retailpricetoboco).toFixed(2),
      });
      this.formsControls2.controls[j].patchValue({
        totalsellingPriceToboco: (
          +this.formsControls2.controls[j].value.quanitityToboco *
          +this.formsControls2.controls[j].value.retailpricetoboco
        ).toString(),
      });
      this.formsControls2.controls[j].patchValue({
        exciseTax: (
          +this.formsControls2.controls[j].value.totalsellingPriceToboco / 2
        ).toString(),
      });
      this.formsControls2.controls[j].patchValue({
        exciseTaxtomet: (
          +this.formsControls2.controls[j].value.quanitityToboco *
          +this.formsControls2.controls[j].value.met
        ).toString(),
      });
      this.formsControls2.controls[j].patchValue({
        dueexciseTaxToboco:
          +this.formsControls2.controls[j].value.exciseTaxtomet -
            +this.formsControls2.controls[j].value.exciseTax <
          0
            ? "0.00"
            : (
                +this.formsControls2.controls[j].value.exciseTaxtomet -
                +this.formsControls2.controls[j].value.exciseTax
              ).toFixed(2),
      });

      this.totalMET =
        this.totalMET + +this.formsControls2.controls[j].value.met;

      this.totaltoboccoQty =
        this.totaltoboccoQty +
        +this.formsControls2.controls[j].value.quanitityToboco;
      this.totaltoboccoRsp =
        this.totaltoboccoRsp +
        +this.formsControls2.controls[j].value.retailpricetoboco;
      this.totaltoboccoTrsp =
        this.totaltoboccoTrsp +
        +this.formsControls2.controls[j].value.totalsellingPriceToboco;
      this.totaltoboccoExciseTax =
        this.totaltoboccoExciseTax +
        +this.formsControls2.controls[j].value.exciseTax;
      this.totalTaxtoMET =
        this.totalTaxtoMET +
        +this.formsControls2.controls[j].value.exciseTaxtomet;
      this.totaltoboccoDueExciseTax =
        this.totaltoboccoDueExciseTax +
        +this.formsControls2.controls[j].value.dueexciseTaxToboco;
      if (this.totaltoboccoRsp > 0) {
        this.latePaymentPnalty();
      }
      if (this.totaltoboccoRsp == 0 && this.totalRSP == 0) {
        this.latePaymentPnaltyObj.LateFillpenalty = "0.00";
        this.latePaymentPnaltyObj.LatePaypenalty = "0.00";
      }
    }
  }

  datatoSave() {}

  SaveasDraft() {
    console.log(
      "this.sweetenedBeveragesObj...results",
      this.sweetenedBeveragesObj["results"][0]
    );
    console.log(
      "this.sweetenedBeveragesObj...results[0]",
      this.sweetenedBeveragesObj["results"][0]["FormGuid"]
    );
    const sweetenedSet = this.sweetenedBeveragesObj["results"][0];
    const toboccoSet = this.toboccoObj["results"][0];

    this.PeronalDetailsObj2["Good_SSBSet"]["results"] = [];

    for (let j = 0; j < this.formsControls1.length; j++) {
      this.PeronalDetailsObj2["Good_SSBSet"]["results"].push({});
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "ItemSr"
      ] = this.formsControls1.controls[j].value.producttype;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Des"
      ] = this.formsControls1.controls[j].value.ItemDescrption;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Unit"
      ] = this.formsControls1.controls[j].value.measuringunit;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Qty"
      ] = this.formsControls1.controls[j].value.quantity;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Rsp"
      ] = this.formsControls1.controls[j].value.retailingPriceUnit;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Trsp"
      ] = this.formsControls1.controls[j].value.totalretailsellingPrice;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Duetax"
      ] = this.formsControls1.controls[j].value.dueExciseTax;

      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j]["DataVersion"] =
        sweetenedSet["DataVersion"] || "";
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j]["Excise"] =
        sweetenedSet["Excise"] || "0.00";
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j]["FormGuid"] =
        sweetenedSet["FormGuid"] || "00000000-0000-0000-0000-000000000000";
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j]["LineNo"] = j + 1;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j]["Metexcise"] =
        sweetenedSet["Metexcise"] || "0.00";
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j]["RankingOrder"] =
        sweetenedSet["RankingOrder"] || "";
    }
    this.PeronalDetailsObj2["Good_TABSet"]["results"] = [];
    for (let j = 0; j < this.formsControls2.length; j++) {
      this.PeronalDetailsObj2["Good_TABSet"]["results"].push({});
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "ItemSr"
      ] = this.formsControls2.controls[j].value.ItemType;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Des"
      ] = this.formsControls2.controls[j].value.description;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Unit"
      ] = this.formsControls2.controls[j].value.measuringunitstobocco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Metrate"
      ] = this.formsControls2.controls[j].value.met;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Qty"
      ] = this.formsControls2.controls[j].value.quanitityToboco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Rsp"
      ] = this.formsControls2.controls[j].value.retailpricetoboco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Trsp"
      ] = this.formsControls2.controls[j].value.totalsellingPriceToboco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Excise"
      ] = this.formsControls2.controls[j].value.exciseTax;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Metexcise"
      ] = this.formsControls2.controls[j].value.exciseTaxtomet;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Duetax"
      ] = this.formsControls2.controls[j].value.dueexciseTaxToboco;

      this.PeronalDetailsObj2["Good_TABSet"]["results"][j]["DataVersion"] =
        toboccoSet["DataVersion"] || "";
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j]["Excise"] =
        toboccoSet["Excise"] || "0.00";
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j]["FormGuid"] =
        toboccoSet["FormGuid"] || "00000000-0000-0000-0000-000000000000";
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j]["LineNo"] = j + 1;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j]["Metexcise"] =
        toboccoSet["Metexcise"] || "0.00";
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j]["RankingOrder"] =
        toboccoSet["RankingOrder"] || "";
    }
    this.PeronalDetailsObj2["Operation"] = "05";
    this.returnsService
      .SubmitExciseTransData(this.PeronalDetailsObj2)
      .subscribe((data) => {
        this.saveObj = data["d"];
        console.log("saveObj", this.saveObj);
        jQuery("#ConfirmSaveasDraft").modal("show");
      });
  }

  submit() {
    jQuery("#ConfirmSubmitPopup").modal("show");
  }

  confirmSubmit() {
    // this.PeronalDetailsObj2["Good_SSBSet"]["results"] =[];

    for (let j = 0; j < this.formsControls1.length; j++) {
      // this.PeronalDetailsObj2["Good_SSBSet"]["results"].push({});
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "ItemSr"
      ] = this.formsControls1.controls[j].value.producttype;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Des"
      ] = this.formsControls1.controls[j].value.ItemDescrption;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Unit"
      ] = this.formsControls1.controls[j].value.measuringunit;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Qty"
      ] = this.formsControls1.controls[j].value.quantity;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Rsp"
      ] = this.formsControls1.controls[j].value.retailingPriceUnit;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Trsp"
      ] = this.formsControls1.controls[j].value.totalretailsellingPrice;
      this.PeronalDetailsObj2["Good_SSBSet"]["results"][j][
        "Duetax"
      ] = this.formsControls1.controls[j].value.dueExciseTax;
    }
    // this.PeronalDetailsObj2["Good_TABSet"]["results"] =[];
    for (let j = 0; j < this.formsControls2.length; j++) {
      // this.PeronalDetailsObj2["Good_TABSet"]["results"].push({});
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "ItemSr"
      ] = this.formsControls2.controls[j].value.ItemType;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Des"
      ] = this.formsControls2.controls[j].value.description;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Unit"
      ] = this.formsControls2.controls[j].value.measuringunitstobocco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Metrate"
      ] = this.formsControls2.controls[j].value.met;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Qty"
      ] = this.formsControls2.controls[j].value.quanitityToboco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Rsp"
      ] = this.formsControls2.controls[j].value.retailpricetoboco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Trsp"
      ] = this.formsControls2.controls[j].value.totalsellingPriceToboco;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Excise"
      ] = this.formsControls2.controls[j].value.exciseTax;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Metexcise"
      ] = this.formsControls2.controls[j].value.exciseTaxtomet;
      this.PeronalDetailsObj2["Good_TABSet"]["results"][j][
        "Duetax"
      ] = this.formsControls2.controls[j].value.dueexciseTaxToboco;
    }
    //this.PeronalDetailsObj2["Type"] = this.declarationFormGroup.value.idType;
    this.PeronalDetailsObj2[
      "Idnumber"
    ] = this.declarationFormGroup.value.idNumber;
    this.PeronalDetailsObj2[
      "DecName"
    ] = this.declarationFormGroup.value.contactPersonName;
    this.PeronalDetailsObj2[
      "Occupation"
    ] = this.declarationFormGroup.value.occupation;
    this.PeronalDetailsObj2[
      "DecDate"
    ] = this.declarationFormGroup.value.declarationDate;
    this.PeronalDetailsObj2[
      "DecIdno"
    ] = this.declarationFormGroup.value.idNumber;
    this.PeronalDetailsObj2[
      "DecDesignation"
    ] = this.declarationFormGroup.value.occupation;

    this.PeronalDetailsObj2["SsbExcise"] =
      (+this.totalDueExciseTax).toFixed(2) || "0.00";
    this.PeronalDetailsObj2["TobacoExcise"] =
      (+this.totaltoboccoDueExciseTax).toFixed(2) || "0.00";
    this.PeronalDetailsObj2["TotalExcise"] =
      (+this.totalDueExciseTax + +this.totaltoboccoDueExciseTax).toFixed(2) ||
      "0.00";
    this.PeronalDetailsObj2["LateFillpenalty"] =
      (+this.latePaymentPnaltyObj.LateFillpenalty).toFixed(2) || "0.00";
    this.PeronalDetailsObj2["LatePaypenalty"] =
      (+this.latePaymentPnaltyObj.LatePaypenalty).toFixed(2) || "0.00";
    this.PeronalDetailsObj2["TotalDue"] =
      (
        +this.latePaymentPnaltyObj.LateFillpenalty +
        +this.latePaymentPnaltyObj.LatePaypenalty +
        +this.totalDueExciseTax +
        +this.totaltoboccoDueExciseTax
      ).toFixed(2) || "0.00";

    this.PeronalDetailsObj2["Operation"] = "01";
    this.PeronalDetailsObj2["Taxpayerz"] = this.PeronalDetailsObj2["Taxpayer"];
    this.returnsService
      .SubmitExciseTransData(this.PeronalDetailsObj2)
      .subscribe((data) => {
        this.submitObj = data["d"];
        this.sadadDetails = data["d"];
        console.log("submitObj", this.submitObj);
        console.log("submitObj Fbnum", this.submitObj.Fbnum);
        //this.DownloadInvoice();
        jQuery("#submitSuccessPopup").modal("show");
      });
  }

  restrictFirstSpace(event, value) {
    if (event.which === 32 && !value.length) {
      event.preventDefault();
    }
  }

  ItemTypeChange(event, index) {
    console.log("event 1", event);
    console.log("event ItemTypeChange", event.target.value);
    this.Descriptiondropdown1[index] = this.Descriptions.filter((data) => {
      return data["ItemSr"] == event.target.value;
    });
    this.measuringunitstoboccosdrpdwn1[
      index
    ] = this.measuringunitstoboccos.filter((data) => {
      return data["ItemSr"] == event.target.value;
    });
    // console.log("measuringunitstoboccosdrpdwn1",this.measuringunitstoboccosdrpdwn1)
    this.formsControls2.controls[index].patchValue({
      description: "",
      measuringunitstobocco: "",
      met: "0.00",
    });
    this.totalToboccoCalculations();
  }

  descriptionChange(event) {
    console.log("event descriptionChange", event.target.value);
  }
  MetRateobj: any = [];
  measuringunitChange(event, index) {
    // console.log("event measuringunitChange",event.target.value)
    this.MetRateobj[index] = this.measuringunitstoboccosdrpdwn1[index].filter(
      (data) => {
        return data["Msehi"] == event.target.value;
      }
    );
    // console.log(" this.MetRateobj.MetRate", this.MetRateobj[0].MetRate)
    this.formsControls2.controls[index].patchValue({
      met: this.MetRateobj[index][0]["MetRate"],
    });
    this.totalToboccoCalculations();
  }
  downloadInvoiceObj: any = [];
  DownloadInvoice() {
    this.returnsService
      .DownloadInvoiceExciseTrans(this.submitObj["Fbnum"])
      .subscribe((data: any) => {
        FileSaver.saveAs(data, "exciseTrantionalAcknowledgement.pdf");
        // console.log("download invoice",data);
        this.downloadInvoiceObj = data;

        this.returnsService
          .downloadcokeyCotyp(
            this.downloadInvoiceObj.cokey,
            this.downloadInvoiceObj.cotyp
          )
          .subscribe((data: any) => {
            console.log("downloadcokeyCotyp", data);
          });
      });
  }

  idTypeSelect(event) {
    console.log("idTypeSelect value", event.target.value);
  }

  agreeChange(event) {
    if (event.target.checked) {
      this.AgreeClick = true;
    } else {
      this.AgreeClick = false;
    }
  }
  declareChange(event) {
    if (event.target.checked) {
      this.declareClick = true;
    } else {
      this.declareClick = false;
    }
  }

  uploadcheckChange(event) {
    if (event.target.checked) {
      this.uploadCheck = true;
    } else {
      this.uploadCheck = false;
    }
  }

  fillManuallycheckChange(event) {
    if (event.target.checked) {
      this.uploadCheck = false;
    } else {
      this.uploadCheck = true;
    }
  }
  SweetendTilesChange() {
    if (this.Sweetendtiles) {
      jQuery("#ConfirmPopupSB").modal("show");
    }
  }
  sweetenedConfirmOk() {
    this.clearFormArray(this.formsControls1);
    this.onAddRowSweetend();
    this.totalretailCalculations();
    this.Sweetendtiles = false;
  }
  ToboccoTilesChange() {
    if (this.toboccotiles) {
      jQuery("#ConfirmPopupTP").modal("show");
    }
  }
  toboccoConfirmOk() {
    this.clearFormArray(this.formsControls2);
    this.onAddRowTobacco();
    this.totalToboccoCalculations();
    this.toboccotiles = false;
  }
  onRefresh(fbnum) {
    this.generateSadadNumber(fbnum);
  }
  SadadBillNumber: any;
  generateSadadNumber(fbnum) {
    this.returnsService.generateSadadNumber(fbnum).subscribe((data) => {
      this.sadadDetails.Zsopbel = data["d"]["results"][0]["Sopbel"];
      this.sadadDetails.ZexcAmt = data["d"]["results"][0]["Betrh"];
      console.log("sadadDetails.Sopbel", this.sadadDetails.Zsopbel);
    });
  }

  GlobalNumberAllow(event) {
    var rgx = /^\d{0,11}(\.\d{0,3})?$/;
    if (event.keyCode == 8) {
      return true;
    } else if (!rgx.test(event.target.value.toString().replace(/,/g, ""))) {
      event.preventDefault();
    }
  }

  fileUpload(event) {
    const frmData = new FormData();
    let filename;
    filename = event.target.files[0]["name"];

    let fileSize = Math.round(event.target.files[0]["size"] / 1024);

    if (
      !(
        filename
          .split(".")
          [filename.split(".").length - 1].toString()
          .toLowerCase() in
        {
          pdf: "pdf",
          jpg: "jpg",
          doc: "doc",
          docx: "docx",
          xls: "xls",
          xlsx: "xlsx",
        }
      )
    ) {
      if (this.language == "ar") {
        this.notifierService.notify(
          "error",
          "DOC, DOCX, XLS, XLSX, PDF, JPG  الرجاء إختيار ملف من الإمتدادات التالية فقط"
        );
      } else {
        this.notifierService.notify(
          "error",
          "Choose only file with extension DOC, DOCX, XLS, XLSX, PDF, JPG."
        );
      }
      event.target.value = "";
      return false;
    }

    if (fileSize == 0 || fileSize > 1024) {
      if (this.language == "ar") {
        fileSize == 0
          ? this.notifierService.notify("error", "Unable to attach file")
          : this.notifierService.notify(
              "error",
              "يجب ان يكون الحد الأقصى لحجم الملف 1 ميجا بايت"
            );
      } else {
        fileSize == 0
          ? this.notifierService.notify("error", "Unable to attach file")
          : this.notifierService.notify(
              "error",
              "Maximum file size should be 1 MB."
            );
      }
      event.target.value = "";
      return false;
    }

    frmData.append("fileUpload", event.target.files[0]);

    this.returnsService
      .SaveETReturnsAttachment(
        this.PeronalDetailsObj2["PartnerGuid"],
        filename,
        frmData,
        "ETP1"
      )
      .subscribe(
        (data) => {
          console.log("FileUploadData", data);
          let obj = {
            Filename: data["d"]["Filename"],
            FileExtn: data["d"]["Filename"].toString().split(".")[
              data["d"]["Filename"].toString().split(".").length - 1
            ],
            Doguid: data["d"]["Doguid"],
            Srno: data["d"]["Srno"],
          };
          this.AttachSet.push(obj);
          this.myInputVariable.nativeElement.value = "";
        },
        (err) => {
          console.error(err);
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0]["message"]
          );
          this.myInputVariable.nativeElement.value = "";
        }
      );

    event.target.value = "";
  }

  deleteFile(obj) {
    this.returnsService
      .DeleteETReturnsAttachement("ETP1", obj["Srno"], obj["Doguid"])
      .subscribe(
        (data) => {
          //console.log(data);
          this.AttachSet = this.AttachSet.filter((data) => {
            return data["Filename"] != obj["Filename"];
          });
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

  fileData: any;
  cancelUpload: boolean = false;
  scheduleName: any;

  ExcelUploadFile(event, scheduleName) {
    jQuery("#ExcelUploadConfirmation").modal("show");
    this.fileData = event;
    this.scheduleName = scheduleName;
  }

  ExcelUploadOk() {
    let headerTitles;
    if (this.language == "ar") {
      headerTitles = [
        "وصف المنتج",
        "وحدة القياس",
        "الكمية",
        "سعر بيع التجزئة/الوحدة",
        "إجمالي سعر البيع",
        "قيمة الضريبة المستحقة",
      ];
    } else {
      headerTitles = [
        "Item Description",
        "Measuring Unit",
        "Quantity",
        "Retail Selling Price /Unit",
        "Total Retail Selling Price",
        "Due Excise Tax",
      ];
    }
    this.onFileUpload(this.fileData, headerTitles, this.scheduleName);
  }

  file: any;
  arrayBuffer: any;
  filelist: any[] = [];
  onFileUpload(event, headerTitles, scheduleName) {
    this.action = "FillManually";
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
        var first_sheet_name = workbook.SheetNames[1];
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

          if (scheduleName == "ExcelUpload") {
            this.clearFormArray(this.formsControls1);

            for (let i = 0; i < newData.length; i++) {
              this.onAddRowSweetend();
              if (this.language == "ar") {
                this.formsControls1.controls[i].patchValue({
                  ItemDescrption: newData[i]["وصف المنتج"],
                });
                this.formsControls1.controls[i].patchValue({
                  measuringunit: this.measureunitdropdown.filter(
                    (x) => x["Text"] == newData[i]["وحدة القياس"]
                  )[0]["Msehi"],
                });
                this.formsControls1.controls[i].patchValue({
                  quantity: newData[i]["الكمية"],
                });
                this.formsControls1.controls[i].patchValue({
                  retailingPriceUnit: newData[i]["سعر بيع التجزئة/الوحدة"],
                });
              } else {
                this.formsControls1.controls[i].patchValue({
                  ItemDescrption: newData[i]["Item Description"],
                });
                this.formsControls1.controls[i].patchValue({
                  measuringunit: this.measureunitdropdown.filter(
                    (x) => x["Text"] == newData[i]["Measuring Unit"]
                  )[0]["Msehi"],
                });
                this.formsControls1.controls[i].patchValue({
                  quantity: newData[i]["Quantity"],
                });
                this.formsControls1.controls[i].patchValue({
                  retailingPriceUnit: newData[i]["Retail Selling Price /Unit"],
                });
              }
            }
            this.totalretailCalculations();
          }
        } else {
          jQuery("#excelUploadError").modal("show");
        }
      };
    } else {
      this.cancelUpload = false;
    }
    event.target.value = "";
  }

  /* To save notes */
  SaveNotes() {
    let linebreaks = this.notesAttached.split(/\n/g); //.match(/\n/g)||[]);
    let count = 0;
    for (let i = 0; i < linebreaks.length; i++) {
      if (linebreaks[i].length > 132) {
        count++;
      }
    }
    if (count > 0) {
      this.errorNotes = true;
    } else {
      this.errorNotes = false;
    }
  }

  /*submit notes*/
  SubmitNotes() {
    let linebreaks = this.notesAttached.split(/\n/g); //.match(/\n/g)||[]);
    let notesSet = [];
    let noteno = "1";
    for (let i = 0; i < linebreaks.length; i++) {
      let obj = {
        TextId: "001",
        Tdformat: "",
        Tdline: linebreaks[i],
      };
      console.log("notes", obj);
      notesSet.push(obj);
    }
    this.PeronalDetailsObj2["notesSet"]["results"] = notesSet;
    console.log("notes", this.PeronalDetailsObj2["notesSet"]["results"]);
    //this.SaveasDraft();
  }
}
