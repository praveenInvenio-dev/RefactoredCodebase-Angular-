import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { VATConstants } from "src/app/constants/VATConstants";
import { constants } from "src/app/constants/constants.model";
import { TinDeregistrationService } from "src/app/services/tin-deregistration.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { AppService } from "src/app/app.service";
import { NotifierService } from "angular-notifier";
import { VatServiceService } from "src/app/services/vat-service.service"; 
import { permitDeregLabels } from "../permit-deregistration/permit-deregistration.constants";
import * as FileSaver from "file-saver";
import { AuthorizeConstants } from "src/app/constants/AuthorizationConstants";
declare var $: any;
@Component({
  selector: 'app-outlet-deregistration',
  templateUrl: './outlet-deregistration.component.html',
  styleUrls: ['./outlet-deregistration.component.css']
})
export class OutletDeregistrationComponent implements OnInit {
  //Variables
  headerComponent = CalendarComponent;
  tinDeregDto = new TinDeregDTO();
  menu: any;
  optionActive: number = 1;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  currentTab: any;
  lang: any;
  tin: string;
  reasonList: any;
  dir: string;
  reaList = [];
  reaList2 = [];
  outList = [];
  nameErr1: boolean = false;
  pMsg: string;
  idTypes = [];
  idErr: boolean = false;
  idMsg: any;
  IDErrz: any;
  nameErr2: boolean = false;
  fnMsg: string;
  nameErr3: boolean = false;
  gfMsg: string;
  faMsg: string;
  nameErr4: boolean = false;
  drMsg: string;
  nameErr5: any;
  codes: any;
  indErr: any;
  // cncode = "966";
  maxLength = 10;
  nameErr8: boolean = false;
  mbMsg: any;
  nameErr6: any;
  nsMsg: string;
  nameErr7: boolean = false;
  dsgMsg: string;
  activeOutlet = 0;
  files = [];
  myFiles = [];
  fileNames = [];
  tinDeregdata: any;
  tinDeregdata2: any;
  nameErr9: boolean = false;
  tinMsg: any;
   idValue: boolean = false;
  panelOpenState = false;
  panelOpenState1 = false;

  deregReasons = [];

  permitTypes = [];
  vfromDate: string;
  dobValue: any;
  deregdateValue: string;
  returnId: any;
  outletData: any;
  activeOutlet1: any;
  permitSet = [];
  activeLicense = 0;
  
  tinErr = [];
  idsErr = [];
  idssErr = [];
  tinsErr = [];
  deregDateErr: boolean = false;
  derehMsg: string;
  deregDateErr1: boolean = false;
  idTypeErr: boolean = false;
  idTypeMsg: string;
  dobErr: boolean = false;
  dobMsg: string;
  fNameErr: boolean = false;
  fNameMsg: string;
  lNameMsg: string;
  lNameErr: boolean = false;
  idTypeErr1: boolean = false;
  dobErr1: boolean = false;
  idErr1: boolean = false;
  deregDateErr11: boolean = false;
  fNameErr1: boolean = false;
  lNameErr1: boolean = false;
  idTypeErr1Arr = [];
  deregDateErr11Arr = [];
  idErr1Arr = [];
  dobErr1Arr = [];
  lNameErr1Arr = [];
  fNameErr1Arr = [];

  idTypeErr2Arr = [];
  deregDateErr12Arr = [];
  idErr2Arr = [];
  dobErr2Arr = [];
  lNameErr2Arr = [];
  fNameErr2Arr = [];
  outletNumErr = [];
  attachArray = [];
  licenseAtt = false;
  fileList = [];
  filez = [];
  attchId = 0;
  transferAtch = false;
  name11Msg: string;
  nameErr11: boolean = false;
  nameErr12: boolean = false;
  nameErr13: boolean = false;
  name12Msg: string;
  name13Msg: string;
  errCounter = 0;
  deRegErr: boolean = false;
  derehMsg1 = "";
  deregErr11Arr = [];
  docType: string;
  show: boolean = false;
  name: any;
  no: any;
  ackDate: Date;

  outletSelectedFlag: boolean = false;
  outletAllSelectedFlag: boolean = false;
  crAtt: boolean;
  resText: any;
  res1: string;
  res2: number;
  apprv: string = '';
  rejx: string = '';
  tinDeregdata1: any;
  authErr;
  enableCntrctAtachmnt: boolean;
  contrct: boolean;
  dtValidationFLag: boolean;
  mainOutletSelected: boolean;
  nxtMnOutlt: any;
  submitted1: boolean;
  outnm: any;
  attchTile: any;
  outletNos:any;
  disableTPDetails:boolean = true;
  attachPopulate:boolean = true;
  maxLength1 = 10;
  tinData: any;
  constructor(
    private router: Router,
    public tinService: TinDeregistrationService,
    public commonVaidation: CommonValidation,
    public appSrv: AppService,
    public notifierService: NotifierService,
    public vatService: VatServiceService
  ) { }

  ngOnInit(): void {
    this.ackDate = new Date();
    this.attachPopulate=true;
    if (localStorage.getItem("lang") === "ar") {
      this.dir = constants.langz.arb.dir;
      this.menu = VATConstants.outletDeregistrationArb;
      this.lang = constants.langz.arb.tinDereg;
      this.tin = localStorage.getItem("gpart");
      this.reaList = VATConstants.outletDeregReasonsArb;
      this.reaList2 = [];
      this.outList = VATConstants.deregReasons2Arb;
      this.idTypes = permitDeregLabels.langz.arb.idTypes;
      this.IDErrz = constants.langz.arb.vatError;
      this.indErr = constants.langz.arb.individual.indErr;
      this.authErr = AuthorizeConstants.langz.arb.authErrors;
    } else {
      this.dir = constants.langz.eng.dir;
      this.menu = VATConstants.outletDeregistration;
      this.lang = constants.langz.eng.tinDereg;
      this.tin = localStorage.getItem("gpart");
      this.reaList = VATConstants.outletDeregReasons;
      this.reaList2 = [];
      this.outList = VATConstants.deregReasons2;
      this.idTypes = permitDeregLabels.langz.eng.idTypes;
      this.IDErrz = constants.langz.eng.vatError;
      this.indErr = constants.langz.eng.individual.indErr;
      this.authErr = AuthorizeConstants.langz.eng.authErrors;
    }
    this.deregReasons = this.lang.deregReasons;
    this.permitTypes = this.lang.permitTypes;

    this.optionActive = 1;

   this.setFilez();
    //this.tinDeregDto.deregDate = null;
    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.codes.forEach((item) => {
        item["maxLength"] = 13 - item.Telefto.length;
      });
      console.log("countru", this.codes);
    });

    this.getReasons();
    this.getTinDeregData();

    this.setFiles();
  }
  setFiles() {
    for (var i = 0; i < 6; i++) {
      let obj = {
        name: "",
        size: 0,        
        DocUrl:"",
        Doguid:"",
        RetGuid:""
      };
      this.files.push(obj);
    }
  }
  setFilez() {
    for (var i = 0; i < 6; i++) {
      let obj = {
        at: [],
      };
      this.filez.push(obj);
    }
  }

  getReasons() {
    // this.tinService.getReasons(this.tin).subscribe((res) => {
    //   console.log("res", res);
    //   this.reasonList = res["d"]["REASONSet"]["results"];
    //   this.reasonList.shift();
    // });
    this.reasonList = this.outList;
  }

  getTinDeregData() {
    this.tinService.getDetails(2, this.tin, this.apprv, this.rejx).subscribe((res) => {
      console.log("res", res);
      this.tinDeregdata = res["d"];
      this.tinDeregdata1 = res["d"];

      this.returnId = this.tinDeregdata["CaseGuid"];
      this.tinDeregDto.reason=this.tinDeregdata.ADregReason;
      this.setTinData();
      if (this.tinDeregDto.outlet.length > 0) {
        this.outletNumErr = [];
        this.tinDeregDto.outlet.forEach((it1, i) => {
          let outletErr = {
            outletNo: 0,
            permitArr: [],
            permitList: [],
          };
          outletErr.outletNo = i;
          it1.permit.forEach((it2, j) => {
            console.log(j);
            for (var k = 0; k < 8; k++) {
              outletErr.permitList.push(false);
            }
            outletErr.permitArr.push(outletErr.permitList);
            outletErr.permitList = [];
          });
          this.outletNumErr.push(outletErr);
        });
      }
      console.log("  this.outletNumErr", this.outletNumErr);
     
        this.rejectedFlow();
       
    },
      (err) => {
        if (err.error.error.innererror.errordetails[0].code === "ZD_DREG/112") {
          this.res1 = err.error.error.innererror.errordetails[0].message;
          this.res2 = 1;
          $("#attch1").modal("show");
        } else if (err.error.error.innererror.errordetails[0].code === "ZD_DREG/108") {
          this.res1 = err.error.error.innererror.errordetails[0].message
          this.res2 = 3;
          $("#attch1").modal("show");
        } else if (err.error.error.innererror.errordetails[0].code === "ZD_DREG/226" || err.error.error.innererror.errordetails[0].code  === "ZD_DREG/207") {
          this.res1 = err.error.error.innererror.errordetails[0].message
          this.res2 = 3;
          $("#attch1").modal("show");
        } else if (err.error.error.innererror.errordetails[0].code === "ZD_DREG/206") {
          this.res1 = err.error.error.innererror.errordetails[0].message
          this.res2 = 3;
          $("#attch1").modal("show");
        } else {
          this.res2 = 3;
          $("#attch1").modal("show");
        }

      });
  }
  reloadApi() {
    if (this.res2 === 1) {
      this.apprv = "X";
      this.rejx = "";
    } else {
      this.apprv = "";
      this.rejx = "X";
    }
    this.getTinDeregData();
  }
  ackDownload() {
    this.vatService.getAckDownload(this.no).subscribe(
      (res: any) => {
        // console.log("res", res);
        FileSaver.saveAs(res,this.no+".pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  goto() {
    this.router.navigate(["mains/zakat-deregister"]);
  }

  setTinData() {
    let reason=this.tinDeregDto.reason;
    let outletBkp = this.outletData;
    this.tinDeregDto = new TinDeregDTO();
    this.outletData = outletBkp;
    this.tinDeregDto.reason=reason;
   
    this.permitSet = this.tinDeregdata["PermitSet"].results;
    if (this.tinDeregdata["PermitSet"].results.length > 0) {
      this.tinDeregDto.pNumber = this.tinDeregdata["PermitSet"].results[0][
        "APermitNoTb"
      ];
      this.tinDeregDto.pType = this.tinDeregdata["PermitSet"].results[0][
        "APermitTypeTb"
      ];
      let dd = new Date(
        this.tinDeregdata["PermitSet"].results[0]["APermitValfrDtHTb"]
      );
      if(this.tinDeregdata["PermitSet"].results[0]["APermitValfrDtTb"]!==null){
        let d = this.commonVaidation.getDateFormated(
          this.tinDeregdata["PermitSet"].results[0]["APermitValfrDtTb"]
        );

        if (dd.getFullYear() < 1900) {
          d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getArabicFormat(dd);
          this.tinDeregDto.vFrom = this.commonVaidation.dateFormate(
            this.commonVaidation.toJulianDate1(new Date(d)),
            "Islamic"
          );
        } else {
          // d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getEnglishFormat(d);
          this.tinDeregDto.vFrom = this.commonVaidation.toJulianDate1(
            new Date(d)
          );
        }
    }

      console.log(this.vfromDate);
    }

    this.outletData = this.tinDeregdata["OutletSet"].results;
    this.tinDeregDto.outlet = [];

    for (var i = 0; i < this.tinDeregdata["OutletSet"].results.length; i++) {
      this.tinDeregDto.outlet.push(new OutletDto());
    }

    if (this.tinDeregdata["OutletSet"].results.length > 0) {
      this.tinDeregDto.outletNum = this.tinDeregdata["OutletSet"].results[0][
        "AOutletNoTb"
      ];
      this.tinDeregDto.crNum = this.tinDeregdata["OutletSet"].results[0][
        "AOutletIdentificationNoTb"
      ];
      this.tinDeregDto.crName = this.tinDeregdata["OutletSet"].results[0][
        "AOutletNameTb"
      ];
      this.tinDeregDto.address = this.tinDeregdata["OutletSet"].results[0][
        "AOutletCompAddr"
      ];

      // this.tinDeregDto.deregReason = this.tinDeregdata["OutletSet"].results[0][
      //   "APermitDregRsnTb"
      // ];
      // this.tinDeregDto.deregDate = new Date(
      //   this.tinDeregdata["OutletSet"].results[0]["APermitEffDtHTb"]
      // );
    }

    this.tinDeregdata["OutletSet"].results.forEach((element) => {
      this.tinDeregDto.outlet.forEach((item) => {
        item["outletname"] = element.AOutletNoTb;
      });
    });

    for (var i = 0; i < this.tinDeregdata["OutletSet"].results.length; i++) {
      let cnt = 0;

      for (var j = 0; j < this.permitSet.length; j++) {
        if (
          this.permitSet[j].APermitOutletnoTb ===
          this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"]
        ) {

          cnt++;
        }
      }
      console.log(
        this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"],
        cnt
      );

      this.tinDeregDto.outlet[i]["permitCount"] = cnt;
      this.tinDeregDto.outlet[i]["outletNum"] = this.tinDeregdata[
        "OutletSet"
      ].results[i]["AOutletNoTb"];
      this.tinDeregDto.outlet[i]["address"] = this.tinDeregdata[
        "OutletSet"
      ].results[i]["AOutletCompAddr"];

      this.tinDeregDto.outlet[i]["crName"] = this.tinDeregdata[
        "OutletSet"
      ].results[i]["AOutletNameTb"];
      this.tinDeregDto.outlet[i]["mainFlagTb"] = this.tinDeregdata[
        "OutletSet"
      ].results[i]["AOutletMainFlagTb"];
      
     
      this.tinDeregDto.outlet[i].permit = [];
      for (var k = 0; k < cnt; k++) {
        this.tinDeregDto.outlet[i].permit.push(new PermitDto());
      }
      let permitx = this.permitSet.filter(
        (x) =>
          x.APermitOutletnoTb ===
          this.tinDeregdata["OutletSet"].results[i]["AOutletNoTb"]
      );
      console.log("permit", permitx);
      for (var p = 0; p < permitx.length; p++) {
        this.tinDeregDto.outlet[i].permit[p].pType = permitx[p].APermitTypeTb;
        this.tinDeregDto.outlet[i].permit[p].pNumber = permitx[p].APermitNoTb;
        this.tinDeregDto.outlet[i].permit[p].outletNum = permitx[p].APermitOutletnoTb;
        
       
        if(permitx[p].APermitDregRsnTb ==="1" || permitx[p].APermitDregRsnTb ==="3" ){
          this.tinDeregDto.outlet[i].permit[p].deregDate      = this.commonVaidation.toJulianDate1(this.formatDate(permitx[p].APermitEffDtTb.substring(6, permitx[p].APermitEffDtTb.length-2)));
          this.tinDeregDto.outlet[i].permit[p].deregReason    =permitx[p].APermitDregRsnTb;
            if(permitx[p].APermitDregRsnTb ==="3"){
              this.tinDeregDto.outlet[i].permit[p].tin            =permitx[p].APermitTransTinTb;
              if(this.tinDeregDto.tin !== null && this.tinDeregDto.tin !== undefined && this.tinDeregDto.tin !== ''){
                this.idValue=true;
              }else{
                this.idValue=false;
              }
              this.tinDeregDto.outlet[i].permit[p].idType      =permitx[p].APermitIdTypeTb;
              
              this.tinDeregDto.outlet[i].permit[p].idType === "ZS0003"? this.maxLength1=15 : this.maxLength1=10 ;

              this.tinDeregDto.outlet[i].permit[p].idNumber      =permitx[p].APermitIdNoTb;
              this.tinDeregDto.outlet[i].permit[p].name      =permitx[p].APermitNm1Tb;
              this.tinDeregDto.outlet[i].permit[p].surname      =permitx[p].APermitNm2Tb;
              this.tinDeregDto.outlet[i].permit[p].fName    =permitx[p].APermitNm3Tb;
              this.tinDeregDto.outlet[i].permit[p].gfName            =permitx[p].APermitNm4Tb;
              this.tinDeregDto.outlet[i].permit[p].famName      =permitx[p].APermitNm5Tb;
              if(permitx[p].APermitDobTb !=null)
              this.tinDeregDto.outlet[i].permit[p].dob      =this.commonVaidation.toJulianDate1(this.formatDate(permitx[p].APermitDobTb.substring(6, permitx[p].APermitDobTb.length-2)));
            }

            if (this.attachPopulate &&  this.tinDeregdata1.AttDetSet.results.length > 0) {
              this.setAttachment(this.tinDeregdata1.AttDetSet.results);
              this.attachPopulate=false;
            } 
        }
        

      if(permitx[p]["APermitValfrDtTb"]!==null){
        let dd = new Date(permitx[p]["APermitValfrDtHTb"]);
        let d = this.commonVaidation.getDateFormated(
          permitx[p]["APermitValfrDtTb"]
        );

        if (dd.getFullYear() < 1900) {
          d.setDate(d.getDate());
          this.vfromDate = this.commonVaidation.getArabicFormat(dd);
          this.tinDeregDto.outlet[i].permit[
            p
          ].vFrom = this.commonVaidation.dateFormate(
            this.commonVaidation.toJulianDate1(new Date(d)),
            "Islamic"
          );
        } else {
          // d.setDate(d.getDate() + 1);
          this.vfromDate = this.commonVaidation.getEnglishFormat(d);
          this.tinDeregDto.outlet[i].permit[
            p
          ].vFrom = this.commonVaidation.toJulianDate1(new Date(d));
        }
      }
      }
    }
    
  }

  

  getUserByTin(val, id, i, j) {
    this.tinData="";
    this.resetTPDetails(val,'tin');
    if (val == "") {
      return;
    }
    if (localStorage.getItem('gpart') == val.tin) {
      this.outletNumErr[i].permitArr[j][7] = true;
      this.nameErr9 = true;
      this.tinMsg = this.lang.err.e6;
      return;
    } else {
      this.outletNumErr[i].permitArr[j][7] = false;
      this.nameErr9 = false;
    }
    let first = val.tin.substr(0, 1);
    if (!this.commonVaidation.isNumber(val.tin)) {
      this.nameErr9 = true;
      this.tinMsg = this.authErr.tinErr;
    } else if (first !== "3") {
      this.nameErr9 = true;
      this.tinMsg = this.lang.err.e21;
    } else {
      if (val.tin.length === 10) {
        this.nameErr9 = false;

        this.vatService.getUserByTin(val.tin).subscribe(
          (res) => {
            
           this.idTypeErr=false;
           this.idErr=false;
           this.dobErr=false;

           this.idMsg="";
           this.dobMsg="";
           this.idTypeMsg="";
           
            console.log("bytin", res["d"]);
            this.tinData = res["d"];
            let d ;
            if(this.tinData["Birthdt"] !== null)
              d = this.commonVaidation.getDateFormated(this.tinData["Birthdt"]);
            if (id === 1) {
              this.tinDeregDto.idType = this.tinData["Idtype"];
              this.tinDeregDto.idNumber = this.tinData["Idnum"];
              this.tinDeregDto.fName = this.tinData["FatherName"];
              this.tinDeregDto.gfName = this.tinData["GrandfatherName"];
              this.tinDeregDto.name = this.tinData["Name1"];
              this.tinDeregDto.surname = this.tinData["Name2"];
              this.tinDeregDto.famName = this.tinData["FamilyName"];
              //this.tinDeregDto.dob = data["Birthdt10"];
              //d.setDate(d.getDate());
              if(this.tinData["Birthdt"] !== null){
              if (d.getFullYear() < 1900) {
                this.tinDeregDto.dob = this.commonVaidation.dateFormate(
                  this.commonVaidation.toJulianDate1(new Date(d)),
                  "Islamic"
                );
              } else {
                this.tinDeregDto.dob = this.commonVaidation.toJulianDate1(
                  new Date(d)
                );
              }
            }
            }
            if (id === 2) {
              this.tinDeregDto.outlet[i].idType = this.tinData["Idtype"];
              this.tinDeregDto.outlet[i].idNumber = this.tinData["Idnum"];
              this.tinDeregDto.outlet[i].fName = this.tinData["FatherName"];
              this.tinDeregDto.outlet[i].gfName = this.tinData["GrandfatherName"];
              this.tinDeregDto.outlet[i].name = this.tinData["Name1"];
              this.tinDeregDto.outlet[i].surname = this.tinData["Name2"];
              this.tinDeregDto.outlet[i].famName = this.tinData["FamilyName"];
              //d.setDate(d.getDate());
              if(this.tinData["Birthdt"] !== null){
              if (d.getFullYear() < 1900) {
                this.tinDeregDto.outlet[
                  i
                ].dob = this.commonVaidation.dateFormate(
                  this.commonVaidation.toJulianDate1(new Date(d)),
                  "Islamic"
                );
              } else {
                this.tinDeregDto.outlet[
                  i
                ].dob = this.commonVaidation.toJulianDate1(new Date(d));
              }
            }
            }
            if (id === 3) {
               val.idType = this.tinData["Idtype"];
              val.idNumber = this.tinData["Idnum"];
              val.fName = this.tinData["FatherName"];
              val.gfName =
                this.tinData["GrandfatherName"];
              val.surname = this.tinData["Name2"];
              val.famName = this.tinData["FamilyName"];
              val.name = this.tinData["Name1"];

              //d.setDate(d.getDate());
              if(this.tinData["Birthdt"] !== null){
              if (d.getFullYear() < 1900) {
                val.dob = this.commonVaidation.dateFormate(
                  this.commonVaidation.toJulianDate1(new Date(d)),
                  "Islamic"
                );
              } else {
                val.dob = this.commonVaidation.toJulianDate1(new Date(d));
              }
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
      } else {
        this.nameErr9 = true;
        this.tinMsg = this.lang.err.e22;
      }
    }

    if (id === 2) {
      this.tinErr[i] = this.nameErr9;
    }
    if (id === 3) {
      this.outletNumErr[i].permitArr[j][6] = this.nameErr9;
    }
  }

  getUserValidated(value, ids, i, j) {
    let id = "ZS0015";
    let d;
    let currentdate = '';
    let obj3 = {
      type: value.idType,
      idNumber: value.idNumber,
    };
    if(value.dob !== null) {
      d = value.dob["calendarStart"];
     

      // let d = value.dob["calendarStart"];
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
      currentdate = d.year + "" + mnth + "" + day;
    }
    this.retrieveUserData(obj3, currentdate, ids, i, d, j);
  }

  private retrieveUserData(obj3: { type: any; idNumber: any; }, currentdate: string, ids: any, i: any, d: any, j: any) {
    this.vatService.getUserValidation(obj3, currentdate).subscribe(
      (res) => {
        console.log("res[]", res["d"]);
        let data = res["d"];

        if (ids === 2) {
          this.tinDeregDto.outlet[i].surname = data["Name2"];
          this.tinDeregDto.outlet[i].famName = data["FamilyName"];
          this.tinDeregDto.outlet[i].fName = data["FatherName"];
          this.tinDeregDto.outlet[i].gfName = data["GrandfatherName"];
          this.tinDeregDto.outlet[i].name = data["Name1"];
          this.tinDeregDto.outlet[i].tin = data["Tin"];
          if(!this.isEmpty(d)){
            if (d.getFullYear() < 1900) {
              this.tinDeregDto.dob = this.commonVaidation.dateFormate(
                this.commonVaidation.toJulianDate1(new Date(d)),
                "Islamic"
              );
            } else {
              this.tinDeregDto.dob = this.commonVaidation.toJulianDate1(
                new Date(d)
              );
            }
          }
        }
        if (ids === 3) {
          this.filtertinDeregDtoData()[i].permit[j].surname = data["Name2"];
          this.filtertinDeregDtoData()[i].permit[j].famName = data["FamilyName"];
          this.filtertinDeregDtoData()[i].permit[j].fName = data["FatherName"];
          this.filtertinDeregDtoData()[i].permit[j].gfName = data["GrandfatherName"];
          this.filtertinDeregDtoData()[i].permit[j].name = data["Name1"];
          this.filtertinDeregDtoData()[i].permit[j].tin = data["Tin"];
        }
        if (ids === 1) {
          this.idValue = true;
          this.tinDeregDto.fName = data["FatherName"];
          this.tinDeregDto.gfName = data["GrandfatherName"];
          this.tinDeregDto.name = data["Name1"];
          this.tinDeregDto.tin = data["Tin"];
          this.tinDeregDto.surname = data["Name2"];
          this.tinDeregDto.famName = data["FamilyName"];
        } else {
          this.idValue = true;
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
  }

  NextStep(id) {
    if (id === 3) {
      this.attachment();
    }
    this.currentTab = id;
    this.optionActive = id;
  }

  Back() {
    if (this.optionActive > 1) {
      this.optionActive--;
    } else {
      // this.router.navigate(["mains/profile"]);
      window.history.back();
    }
  }

  selectedReason(val, i) {
    this.tinDeregDto.reason = val.id;
    this.nameErr13 = false;
    console.log(val, this.outList);
    this.activeOutlet = parseInt(i);
    this.tinDeregDto.activeOutlet = val.name;
    this.reaList.forEach((ele) => {
      ele.name === val.name ? (ele.flag = true) : (ele.flag = false);
    });
    
    // if(this.activeOutlet==3){      
    //   this.selectedReason2(this.tinDeregDto.outlet[i],i,i); 
    // }
  }

  selectMainReasons() {
    // if (this.tinDeregDto.reason === "6") {
    //   this.reaList = this.reaList.filter(
    //     (x) => x.ReasonCd === this.tinDeregDto.reason
    //   );
    // } else {
    //   this.reaList  = VATConstants.deregReasons;
    // }
  }

  selectedReason2(val, i, j) {

    console.log(this.tinDeregDto.outlet, i);
    this.tinDeregDto.outlet[i].activeOutletNum = j + 1;
    let length = this.tinDeregDto.outlet[i].reasonList.length;
    this.tinDeregDto.outlet[i].reasonList = [];
    let vals = [];
    for (var ii = 0; ii < length; ii++) {
      let obj = {
        name: "",
        flag: false,
      };
      if (val.name === this.reaList[ii].name) {
        obj.name = this.reaList[ii].name;
        obj.flag = true;
      } else {
        obj.name = this.reaList[ii].name;
        obj.flag = false;
      }

      vals.push(obj);
      // this.tinDeregDto.outlet[i].reasonList[ii].name === val.name
      //   ? (this.tinDeregDto.outlet[i].reasonList[ii].flag = true)
      //   : (this.tinDeregDto.outlet[i].reasonList[ii].flag = false);
    }

    this.tinDeregDto.outlet[i].reasonList = vals;
    console.log(this.tinDeregDto.outlet[i].reasonList);
    // this.tinDeregDto.outlet[i].reasonList.map((res) => {
    //   res.flag = false;
    //   // if (res.name === val.name) {
    //   //   res.flag = true;
    //   // } else {
    //   //   res.flag = false;
    //   // }
    // });
    //this.tinDeregDto.outlet[0].reasonList[1].flag = true;

    // let newArray = [...this.tinDeregDto.outlet[i].reasonList];
    // // this.activeOutlet1 = i + 1;
    // // this.tinDeregDto.outlet[i].activeOutlet = val.name;
    // newArray.forEach((ele) => {
    //   ele.name === val.name ? (ele.flag = true) : (ele.flag = false);
    // });

    // this.tinDeregDto.outlet[i].reasonList = [];
    // this.tinDeregDto.outlet[i].reasonList = newArray;
  }

  selectReason3(i) {
    this.activeLicense = i;
  }

  resetReason() {
    this.activeOutlet = 0;
    this.reaList.forEach((res) => {
      res.flag = false;
    });
  }


  resetdata() {
    this.setTinData();    
    this.files=[];
    this.filez=[];
    this.setFiles();
    this.setFilez();
    this.resetErr();
  }

  resetErr() {
    this.deregDateErr11Arr = [];
    this.idTypeErr1Arr = [];
    this.deregDateErr11Arr = [];
    this.idErr1Arr = [];
    this.dobErr1Arr = [];
    this.lNameErr1Arr = [];
    this.fNameErr1Arr = [];
    this.deregDateErr = false;
    this.nameErr5 = false;
    this.deregDateErr1 = false;
    this.idTypeErr = false;
    this.deregDateErr1 = false;
    this.idErr = false;
    this.dobErr = false;
    this.lNameErr = false;
    this.fNameErr = false;
    this.outletNumErr.forEach((i) => {
      i.permitArr.forEach((j) => {
        j = false;
      });
    });
    console.log(this.outletNumErr);
  }

  getMaxLength(val) {
    this.maxLength = val;
    if (this.tinDeregDto.MobileNo.length < this.maxLength) {
    } else this.tinDeregDto.MobileNo = "";
  }


  onSubmit1() {
    this.submitted1 = true;
    if (this.deregDateErr || this.deregDateErr1 || this.dtValidationFLag) {
      return;
    }
    if(this.mainOutletSelected && this.nxtMnOutlt == undefined) return;
    this.resetErrors();
    let outlets = this.filtertinDeregDtoData();
    console.log("sds", this.tinDeregDto);
    this.errCounter = 0;
    if (this.activeOutlet === 0) {
      this.nameErr13 = true;
      this.name13Msg = this.lang.err.e12;
    } else {
      this.nameErr13 = false;
      if (this.activeOutlet !== 1) {
        if (this.activeOutlet === 2) {
          this.tinDeregDto.deregReason = "2";
          
          if (this.tinDeregDto.deregDate === null) {
            this.deregDateErr1 = true;
            this.derehMsg = this.lang.err.e2;
          } else {
            this.deregDateErr1 = false;
          }

          if(this.isEmpty(this.tinData)){
            if (this.tinDeregDto.idType === "") {
              this.idTypeErr = true;
              this.idTypeMsg = this.lang.err.e16;
            } else {
              this.idTypeErr = false;
              this.idTypeMsg ="";
            }
            if (this.tinDeregDto.dob === null && this.tinDeregDto.idType != 'ZS0005' && this.tinDeregDto.idType != 'ZS0003' ) {
              this.dobErr = true;
              this.dobMsg = this.lang.err.e15;
            } else {
              this.dobErr = false;
            }
            if (this.tinDeregDto.idNumber === "") {
              this.idErr = true;
              this.idMsg = this.lang.err.e17;
            } else {
              this.idErr = false;
              this.idMsg ='';
            }
          

            if (this.tinDeregDto.idType === "ZS0003") {
              if (this.tinDeregDto.name === "") {
                this.fNameErr = true;
                this.fNameMsg = this.lang.err.e13;
              } else {
                this.fNameErr = false;
              }
              if (this.tinDeregDto.surname === "") {
                this.lNameErr = true;
                this.lNameMsg = this.lang.err.e14;
              } else {
                this.lNameErr = false;
              }
            }
          }

          if (
            this.idTypeErr ||
            this.deregDateErr1 ||
            this.idErr ||
            this.dobErr ||
            // this.lNameErr ||
            this.fNameErr
          ) {
          } else {
            if (this.tinDeregDto.deregReason === "2" && this.tinDeregDto.dob !== null) {
              let d = new Date(
                this.commonVaidation.changeDate2(this.tinDeregDto.dob)
              );
              d.getFullYear() > 1900
                ? (this.tinDeregDto.dobValue = this.commonVaidation.getEnglishFormat(
                  this.commonVaidation.changeDate2(this.tinDeregDto.dob)
                ))
                : (this.tinDeregDto.dobValue = this.commonVaidation.getArabicFormat(
                  this.commonVaidation.changeDate2(this.tinDeregDto.dob)
                ));
            }

            let dr = new Date(
              this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
            );
            dr.getFullYear() > 1900
              ? (this.tinDeregDto.deregDateValue = this.commonVaidation.getEnglishFormat(
                this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
              ))
              : (this.tinDeregDto.deregDateValue = this.commonVaidation.getArabicFormat(
                this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
              ));

            outlets.forEach((ele) => {
              ele.deregDateValue = this.tinDeregDto.deregDateValue;
              ele.deregReason = this.tinDeregDto.deregReason;
              ele.deregDate = this.tinDeregDto.deregDate
              ele.dob = this.tinDeregDto.dob;
              ele.dobValue = this.tinDeregDto.dobValue;
              ele.idNumber = this.tinDeregDto.idNumber;
              ele.idType = this.tinDeregDto.idType;
              ele.gfName = this.tinDeregDto.gfName;
              ele.famName = this.tinDeregDto.famName;
              ele.surname = this.tinDeregDto.surname;
              ele.tin = this.tinDeregDto.tin;
              ele.fName = this.tinDeregDto.fName;
              ele.name = this.tinDeregDto.name;

              ele.permit.forEach((item) => {
                item.deregDateValue = this.tinDeregDto.deregDateValue;
                item.deregReason = this.tinDeregDto.deregReason;
                item.dob = this.tinDeregDto.dob;
                item.dobValue = this.tinDeregDto.dobValue;
                item.idNumber = this.tinDeregDto.idNumber;
                item.idType = this.tinDeregDto.idType;
                item.deregDate = this.tinDeregDto.deregDate;
                item.tin = this.tinDeregDto.tin;
                item.name = this.tinDeregDto.name;
                item.surname = this.tinDeregDto.surname;
                item.fName = this.tinDeregDto.fName;
                item.gfName = this.tinDeregDto.gfName;
                item.famName = this.tinDeregDto.famName;
              });
            });
            this.NextStep(3);
          }
        } else {
          this.outletNumErr = [];
          console.log("this.tinDeregDto", this.tinDeregDto);

          outlets.forEach((ele, j) => {
            ele.activeOutletNum = 3;

            {
              let outletErr = {
                outletNo: 0,
                permitArr: [],
                permitList: [],
              };

              ele.permit.forEach((eles, i) => {
                if (eles.deregReason === "" || eles.deregReason === undefined || eles.deregReason === null) {
                  this.deRegErr = true;
                  this.derehMsg1 = this.lang.err.e23;
                } else {
                  this.deRegErr = false;
                  this.derehMsg1 = "";
                }
                if(this.isEmpty(this.tinData)){
                  if (eles.deregReason === "3") {
                    if (eles.idType === "") {
                      this.idTypeErr1 = true;
                      this.idTypeMsg = this.lang.err.e16;
                    } else {
                      this.idTypeErr1 = false;
                    }
                    if (eles.idType !== 'ZS0005' && eles.idType != 'ZS0003') {
                    if (eles.dob === null) {
                      this.dobErr1 = true;
                      this.dobMsg = this.lang.err.e15;
                    } else {
                      this.dobErr1 = false;
                    }
                  }

                  if (eles.idNumber === "") {
                    this.idErr1 = true;
                    this.idMsg = this.lang.err.e17;
                  } else {
                    this.idErr1 = false;
                  }

                  if (eles.idType === "ZS0003") {
                    if (eles.name === "") {
                      this.fNameErr1 = true;
                      this.fNameMsg = this.lang.err.e13;
                    } else {
                      this.fNameErr1 = false;
                    }
                    if (eles.surname === "") {
                      this.lNameErr1 = true;
                      this.lNameMsg = this.lang.err.e14;
                    } else {
                      this.lNameErr1 = false;
                    }
                  }
                }
              }
              if (eles.deregDate === null) {
                this.deregDateErr11 = true;
                this.derehMsg = this.lang.err.e2;
              } else {
                this.deregDateErr11 = false;
              }
             
                if (
                  this.idTypeErr1 ||
                  this.deregDateErr11 ||
                  this.idErr1 ||
                  this.dobErr1 ||
                  this.lNameErr1 ||
                  this.fNameErr1 ||
                  this.deRegErr
                ) {
                  outletErr.outletNo = i;
                  this.idTypeErr2Arr[i] = this.idTypeErr1;
                  this.deregDateErr12Arr[i] = this.deregDateErr11;
                  this.idErr2Arr[i] = this.idErr1;  
                  if (eles.idType !== 'ZS0005' && eles.idType !== 'ZS0003') {                
                    this.dobErr2Arr[i] = this.dobErr1;
                  }
                  this.lNameErr2Arr[i] = this.lNameErr1;
                  this.fNameErr2Arr[i] = this.fNameErr1;
                  this.deregErr11Arr[i] = this.deRegErr;

                  outletErr.permitList.push(this.deregDateErr12Arr[i]);
                  outletErr.permitList.push(this.idTypeErr2Arr[i]);
                  outletErr.permitList.push(this.idErr2Arr[i]);
                  if (eles.idType !== 'ZS0005' && eles.idType !== 'ZS0003') {
                  outletErr.permitList.push(this.dobErr2Arr[i]);
                  }
                  outletErr.permitList.push(this.lNameErr2Arr[i]);
                  outletErr.permitList.push(this.fNameErr2Arr[i]);
                  outletErr.permitList.push(false);
                  outletErr.permitList.push(this.deregErr11Arr[i]);
                } else {
                  outletErr.outletNo = i;
                  this.idTypeErr2Arr[i] = this.idTypeErr1;
                  this.deregDateErr12Arr[i] = this.deregDateErr11;
                  this.idErr2Arr[i] = this.idErr1;
                  if (eles.idType !== 'ZS0005' && eles.idType !== 'ZS0003') {
                  this.dobErr2Arr[i] = this.dobErr1;
                  }
                  this.lNameErr2Arr[i] = this.lNameErr1;
                  this.fNameErr2Arr[i] = this.fNameErr1;
                  this.deregErr11Arr[i] = this.deRegErr;
                  outletErr.permitList.push(this.deregDateErr12Arr[i]);
                  outletErr.permitList.push(this.idTypeErr2Arr[i]);
                  outletErr.permitList.push(this.idErr2Arr[i]);
                  if (eles.idType !== 'ZS0005') {
                  outletErr.permitList.push(this.dobErr2Arr[i]);
                  }
                  outletErr.permitList.push(this.lNameErr2Arr[i]);
                  outletErr.permitList.push(this.fNameErr2Arr[i]);
                  outletErr.permitList.push(false);
                  outletErr.permitList.push(this.deregErr11Arr[i]);
                  let dr = new Date(
                    this.commonVaidation.changeDate2(eles.deregDate)
                  );
                  dr.getFullYear() > 1900
                    ? (eles.deregDateValue = this.commonVaidation.getEnglishFormat(
                      this.commonVaidation.changeDate2(eles.deregDate)
                    ))
                    : (eles.deregDateValue = this.commonVaidation.getArabicFormat(
                      this.commonVaidation.changeDate2(eles.deregDate)
                    ));
                  if (eles.deregReason === "3" &&   eles.idType !== 'ZS0005' ) {
                    if(eles.dob!==null){
                      let d = new Date(
                        this.commonVaidation.changeDate2(eles.dob)
                      );
                      d.getFullYear() > 1900
                        ? (eles.dobValue = this.commonVaidation.getEnglishFormat(
                          this.commonVaidation.changeDate2(eles.dob)
                        ))
                        : (eles.dobValue = this.commonVaidation.getArabicFormat(
                          this.commonVaidation.changeDate2(eles.dob)
                        ));
                    }
                    
                  }
                  // eles.dob = ele.dob;
                  // this.NextStep(2)
                }
                outletErr.permitArr.push(outletErr.permitList);
                outletErr.permitList = [];
              });

              //this.outletNumErr.push(outletErr);
              //this.NextStep(2)
              let temp = Object.assign({}, outletErr);
              this.outletNumErr.push(temp);
              console.log("this.outletNumErr", this.outletNumErr);
            }


          });
          //this.NextStep(2);
        }
      } else {
        if (this.tinDeregDto.deregDate === null) {
          this.deregDateErr = true;
          this.derehMsg = this.lang.err.e2;
        } else {
          //this.deregDateErr = false;
          let dr = new Date(
            this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
          );
          dr.getFullYear() > 1900
            ? (this.tinDeregDto.deregDateValue = this.commonVaidation.getEnglishFormat(
              this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
            ))
            : (this.tinDeregDto.deregDateValue = this.commonVaidation.getArabicFormat(
              this.commonVaidation.changeDate2(this.tinDeregDto.deregDate)
            ));

          outlets.forEach((ele) => {
            ele.deregDateValue = this.tinDeregDto.deregDateValue;
            ele.deregReason = this.tinDeregDto.deregReason;
            ele.deregDate = this.tinDeregDto.deregDate;
            ele.permit.forEach((item) => {
              item.deregDateValue = this.tinDeregDto.deregDateValue;
              item.deregReason = "1";
              item.deregDate = this.tinDeregDto.deregDate;
              item.name = this.tinDeregDto.name;
              item.tin = this.tinDeregDto.tin;
              item.fName = this.tinDeregDto.fName;
              item.surname = this.tinDeregDto.name;
              item.gfName = this.tinDeregDto.gfName;
              item.famName = this.tinDeregDto.famName;
            });
          });
          this.NextStep(3);
        }
      }
    }

    console.log("test", this.outletNumErr);
    outlets.forEach((res,i) => {
      res.deregDate != null ? this.getdateErr(res.deregDate, 2, i, 0) : '';
      res.permit.forEach((item) => {
        let dr = new Date(this.commonVaidation.changeDate2(item.vFrom));
        dr.getFullYear() > 1900
          ? (item.vfromDateValue = this.commonVaidation.getEnglishFormat(
            this.commonVaidation.changeDate2(item.vFrom)
          ))
          : (item.vfromDateValue = this.commonVaidation.getArabicFormat(
            this.commonVaidation.changeDate2(item.vFrom)
          ));
      });
    });

    console.log("this.tinDeregDto.", this.tinDeregDto);

    if (this.activeOutlet === 3) {
      let cnt = 0;
      this.outletNumErr.forEach((i) => {
        i.permitArr.forEach((j) => {
          j.forEach((element) => {
            console.log(element);
            if (element) {
              cnt++;
            }
          });
        });
      });

      let cnts = [];
      this.tinDeregDto.outlet.forEach((ele, i) => {
        if (ele.activeOutletNum === 0) {
          cnts.push(i);
        }
      });

      // if (cnts.length > 0) {
      //   this.notifierService.notify("error", this.lang.err.e1);
      // } else {
      if (cnt === 0 && this.errCounter === 0) {
        this.NextStep(3);
      }
      // }
    }
    console.log("this.outletNumErr", this.outletNumErr);
  }
  resetErrors() {
    // this.idTypeErr1 =false;
    // this.deregDateErr11 =false;
    // this.idErr1 =false;
    // this.dobErr1 =false;
    // this.lNameErr1 =false;
    // this.fNameErr1 =false;
    // this.deRegErr =false;

    // this.idTypeErr =false;
    // this.deregDateErr1 =false;
    // this.idErr =false;
    // this.dobErr =false;

    // this.fNameErr =false;
  }


  getdateErr(val, id, i, j) {
    let dateObj = new Date();
    console.log(dateObj.toLocaleDateString("ar-EG"));
    dateObj.setDate(dateObj.getDate());
    if (
      new Date(
        val["calendarStart"].year +
        "-" +
        val["calendarStart"].month +
        "-" +
        val["calendarStart"].day
      ) > dateObj
    ) {
      if (id === 1) {
        if (this.activeOutlet == 2) this.deregDateErr1 = true;
        else this.deregDateErr = true;
        this.derehMsg = this.lang.err.e3;
      }
      if (id === 2) {
        this.deregDateErr11Arr[i] = true;
        this.derehMsg = this.lang.err.e3;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][0] = true;
        this.derehMsg = this.lang.err.e3;
      }
    } else {
      if (id === 1) {
        if (this.activeOutlet == 2) this.deregDateErr1 = false;
        else this.deregDateErr = false;
      }
      if (id === 2) this.deregDateErr11Arr[i] = false;
      if (id === 3) this.outletNumErr[i].permitArr[j][0] = false;

      console.log("this.outletNumErr[i].permitArr", this.outletNumErr[i]);
    }
  }

  getdobErr(val, id, i, j) {
    if (val.idType === "") {
      if (id === 1) {
        this.idTypeErr = true;
        this.idTypeMsg = this.lang.err.e16;
      }else{
        this.idTypeErr = false;
        this.idTypeMsg ="";
      }
      if (id === 2) {
        this.idTypeErr1Arr[i] = true;
        this.idTypeMsg = this.lang.err.e16;
      }else{
        this.idTypeErr1Arr[i] = false;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][1] = true;
        this.idTypeMsg = this.lang.err.e16;
      }
    } else {
      if (id === 1) this.idTypeErr = false;
      if (id === 2) this.idTypeErr1Arr[i] = false;
      if (id === 3) this.outletNumErr[i].permitArr[j][1] = false;
    }
    if (val.idNumber === "") {
      if (id === 1) {
        this.idErr = true;
        this.idMsg = this.lang.err.e17;
      }
      if (id === 2) {
        this.idsErr[i] = true;
        this.idMsg = this.lang.err.e17;
      }
      if (id === 3) {
        this.outletNumErr[i].permitArr[j][2] = true;
        this.idMsg = this.lang.err.e17;
      }
    }

    if (val.idType !== "ZS0003") {
      let dateObj = new Date();
      console.log(dateObj.toLocaleDateString("ar-EG"));
      dateObj.setDate(dateObj.getDate() - 1);
      if (
        new Date(
          val.dob["calendarStart"].year +
          "-" +
          val.dob["calendarStart"].month +
          "-" +
          val.dob["calendarStart"].day
        ) > dateObj
      ) {
        if (id === 1) {
          if (this.activeOutlet == 2) this.dobErr = true;
          else this.dobErr = true;
          this.dobMsg = this.lang.err.e8;
        }
        if (id === 2) {
          this.dobErr1Arr[i] = true;
          this.dobMsg = this.lang.err.e8;
        }
        if (id === 3) {
          this.outletNumErr[i].permitArr[j][3] = true;
          this.dobMsg = this.lang.err.e8;
        }
      } else {
        if (id === 1) {
          if (this.activeOutlet == 2) this.dobErr = false;
          else this.dobErr = false;

          if (this.dobErr || this.idErr || this.idTypeErr) {
          } else this.getUserValidated(val, id, i, j);
        }
        if (id === 2) {
          this.dobErr1Arr[i] = false;
          if (this.dobErr1Arr[i] || this.idsErr[i] || this.idTypeErr1Arr[i]) {
          } else this.getUserValidated(val, id, i, j);
        }
        if (id === 3) {
          this.outletNumErr[i].permitArr[j][3] = false;
          if (
            this.outletNumErr[i].permitArr[j][1] ||
            this.outletNumErr[i].permitArr[j][2] ||
            this.outletNumErr[i].permitArr[j][3]
          ) {
          } else this.getUserValidated(val, id, i, j);
        }

        console.log("this.outletNumErr[i].permitArr", this.outletNumErr[i]);
      }
    }else{
      this.idValue=false;
    }
  }

  // checkGcc(id, i, j) {
  //   if (id === 1) {
  //     this.tinDeregDto.idNumber = "";
  //     this.tinDeregDto.dob = null;
  //     this.idTypeErr = false;
  //   }
  //   if (id === 2) {
  //     this.tinDeregDto.outlet[i].idNumber = "";
  //     this.tinDeregDto.outlet[i].dob = null;
  //     this.idTypeErr1Arr[i] = false;
  //   }
  //   if (id === 3) {
  //     this.tinDeregDto.outlet[i].permit[j].idNumber = "";
  //     this.tinDeregDto.outlet[i].permit[j].dob = null;
  //     this.outletNumErr[i].permitArr[j][1] = false;
  //   }
  // }


  checkGcc(id, i, j) {
    if (id === 1) {

      this.tinDeregDto.idNumber = "";
      this.tinDeregDto.dob = null;
      this.idTypeErr = false;
      this.tinDeregDto.name = "";
      this.tinDeregDto.surname = "";
      this.tinDeregDto.fName = "";
      this.tinDeregDto.gfName = "";
      this.tinDeregDto.famName = "";
      this.tinDeregDto.tin = "";
    }
    if (id === 2) {
      this.tinDeregDto.outlet[i].idNumber = "";
      this.tinDeregDto.outlet[i].dob = null;
      this.idTypeErr1Arr[i] = false;
      this.tinDeregDto.outlet[i].name = "";
      this.tinDeregDto.outlet[i].surname = "";
      this.tinDeregDto.outlet[i].fName = "";
      this.tinDeregDto.outlet[i].gfName = "";
      this.tinDeregDto.outlet[i].famName = "";
      this.tinDeregDto.outlet[i].tin = "";
    }
    if (id === 3) {
      this.tinDeregDto.outlet[i].permit[j].idNumber = "";
      this.tinDeregDto.outlet[i].permit[j].dob = null;
      this.outletNumErr[i].permitArr[j][1] = false;
      this.tinDeregDto.outlet[i].permit[j].name = "";
      this.tinDeregDto.outlet[i].permit[j].surname = "";
      this.tinDeregDto.outlet[i].permit[j].fName = "";
      this.tinDeregDto.outlet[i].permit[j].gfName = "";
      this.tinDeregDto.outlet[i].permit[j].famName = "";
      this.tinDeregDto.outlet[i].permit[j].tin = "";
    }
  }

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  restrictAlphabetss(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 45) return true;
    else return false;
  }

  IDtypeValidation1(val, id, i, j) {
    this.resetTPDetails(val,'Id');
    if (id === 1) this.idErr = false;
    if (id === 2) this.idsErr[i] = false;
    if (id === 3) this.outletNumErr[i].permitArr[j][2] = false;
    
    if (val.idType === "ZS0003") {
      if (this.commonVaidation.isNumber(val.idNumber)) {
        if (val.idNumber.length < 7 || val.idNumber.length > 15) {
          if (id === 1) this.idErr = true;
          if (id === 2) this.idsErr[i] = true;
          if (id === 3) this.outletNumErr[i].permitArr[j][2] = true;

          this.idMsg = this.IDErrz.e19;
        } else {
          if (id === 1) this.idErr = false;
          if (id === 2) this.idsErr[i] = false;
          if (id === 3) this.outletNumErr[i].permitArr[j][2] = false;
          let obj3 = {
            type: val.idType,
            idNumber: val.idNumber,
          };
          this.retrieveUserData(obj3, '', id, i, '', j);
        }
      } else {
        if (id === 1) this.idErr = true;
        if (id === 2) this.idsErr[i] = true;
        if (id === 3) this.outletNumErr[i].permitArr[j][2] = true;
        this.idMsg = this.IDErrz.e20;
      }
    } else {
      let obj = {
        flag: false,
        msg: "",
      };
      obj = this.commonVaidation.IDtypeValidation(val.idType, val.idNumber);
      if(obj!== undefined){
      this.idMsg = obj.msg;
      if (id === 1) this.idErr = obj.flag;
      if (id === 2) this.idsErr[i] = obj.flag;
      if (id === 3) this.outletNumErr[i].permitArr[j][2] = obj.flag;

      if(val.idType === 'ZS0005' && !obj.flag){
        this.getUserValidated( val, id, i, j);
      }
    }
    }
  }

  getFileDetails(e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size < 1048576) {
        this.myFiles.push(e.target.files[i]);
      }
    }

    // this.uploadFiles(e.target.files[0]);
    console.log(this.myFiles);
    this.fileNames = [];
    //this.vatSecondFormGroup.controls["doc"].setValue([]);
    for (var i = 0; i < this.myFiles.length; i++) {
      console.log(this.myFiles[i]["name"]);
      let n = this.myFiles[i]["name"];
      // this.vatSecondFormGroup.controls["doc"][i]["name"].setValue(n);
      this.fileNames.push(n);
    }
  }

  uploadFiles(file, id, index) {
    //let control = <FormArray>this.vatThirdFormGroup.controls.doc;
    const frmData = new FormData();
    let filename;
    // for (var i = 0; i < this.myFiles.length; i++) {
    filename = file["name"];
    let fileNameStr=new String(filename);
    if(fileNameStr.length > 95){
      this.notifierService.notify("error", this.lang.err.fileNameError);
      return;
    }
    frmData.append("fileUpload", file);
    // }
    const parseExt = filename.split(".");
    const fileExt = parseExt[parseExt.length - 1].toLowerCase();

    if (
      fileExt !== "doc" &&
      fileExt !== "docx" &&
      fileExt !== "jpeg" &&
      fileExt !== "jpg" &&
      fileExt !== "pdf" &&
      fileExt !== "xls" &&
      fileExt !== "xlsx"
    ) {
      this.notifierService.notify("error", this.lang.err.fileType);
      return;
    }
    if (file.size > 1048576) {
        this.notifierService.notify("error", this.lang.err.fileError);
      return;
    }
    if (file.size <= 0) {
      this.notifierService.notify("error", this.lang.err.fileType2);
      return;
    }
    console.log("res", filename, this.myFiles);
     this.tinService
      .postAttachment(this.returnId, this.docType, filename, frmData)
      .subscribe(
        (res) => {
          console.log("resupload", res);
          this.files[id].DocUrl=res["d"]["DocUrl"];
          this.files[id].Doguid=res["d"]["Doguid"];
          this.files[id].RetGuid=res["d"]["RetGuid"];
          
          this.filez[id].at.splice(index, 1);

          this.saveAttchement(id, this.files[id].name, this.files[id].size, res["d"]["DocUrl"], res["d"]["Doguid"],res["d"]["RetGuid"]);
 
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
          this.deleteAttachments(id, index);
        }
      );
    // this.vatService
    //   .attachmentSubmit(
    //     this.returnId,
    //     control.controls[idd].value.id,
    //     filename,
    //     frmData
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log("upload", res);
    //       control.controls[idd]["controls"].name.setValue(filename);
    //       control.controls[idd]["controls"].flag.setValue(true);
    //       control.controls[idd]["controls"].url.setValue(res["d"]["DocUrl"]);
    //       control.controls[idd]["controls"].did.setValue(res["d"]["Doguid"]);
    //       //control.controls[idd].value.id
    //       // this.notifierService.notify(
    //       //   "success",
    //       //   this.lang.successMsg
    //       // );
    //       for (var i in this.vatThirdFormGroup.controls.doc.value) {
    //         if (
    //           this.vatThirdFormGroup.controls.doc.value[i]["id"] != "" &&
    //           this.vatThirdFormGroup.controls.doc.value[i]["name"] == ""
    //         ) {
    //           this.disableContinue = true;
    //           break;
    //         } else {
    //           this.disableContinue = false;
    //         }
    //       }
    //     },
    //     (err) => {
    //       this.notifierService.notify(
    //         "error",
    //         err.error.error.innererror.errordetails[0].message
    //       );
    //       this.disableContinue = true;
    //     }
    //   );
  }


  checkDocTyp() {
    this.notifierService.notify("error", this.lang.err.selAttch);
  }



  uploadFile(event, id) {
    if (this.filez[id].at.length >= 5) {
      this.notifierService.notify("error", this.lang.err.fileNum);
      return;
    } else {
      const element = event[0];
      const parseExt = element.name.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();

      if (
        fileExt !== "doc" &&
        fileExt !== "docx" &&
        fileExt !== "jpeg" &&
        fileExt !== "jpg" &&
        fileExt !== "pdf" &&
        fileExt !== "xls" &&
        fileExt !== "xlsx"
      ) {
        this.notifierService.notify("error", this.lang.err.fileType);
        return;
      }
      if (element.size > 1048576) {
        this.notifierService.notify("error", this.lang.err.fileError);
        return;
      }
      if (element.size <= 0) {
        this.notifierService.notify("error", this.lang.err.fileType2);
        return;
      }

      let filename = event[0]["name"];
      let fileNameStr=new String(filename);
      if(fileNameStr.length > 95){
            this.notifierService.notify("error", this.lang.err.fileNameError);
            return;
      }

      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        console.log(element);
        this.files[id].name = element.name;
        // this.files[id].size = (element.size / 1024 / 1024).toFixed(2);
        this.files[id].size = element.size / 1000000;
      }
      
      let obj = {
        id: 0,
        filenames: {},
      };
      obj.id = id;
      obj.filenames = this.files[id];
      this.fileList.push(obj);""
      this.saveAttchement(id, this.files[id].name, this.files[id].size,"","","");
      let index = this.filez[id].at.length - 1;
      
       
      this.uploadFiles(event[0], id, index);
      
     
      // this.filez[id] = this.fileList;
      // console.log("this.fileList", this.fileList, this.filez);
    }
  }
  openAttchment(id, name) {
    if (id === 3 && this.tinDeregDto.reason === "1") {
      this.attchTile = this.lang.c3.t15;
    } else {
      this.attchTile = name;
    }
    this.attchId = id;
    if (id === 2 && this.transferAtch) {
      this.docType = "DR07";
      $("#attch").modal("show");
    }

    if (id === 4 && this.licenseAtt) {
      this.docType = "DR11";
      $("#attch").modal("show");
    }

    if (id === 1 && this.crAtt) {
      this.docType = "DR10";
      $("#attch").modal("show");
    }


    if (id === 3 && this.contrct) {
      this.docType = "DR09";
      $("#attch").modal("show");
    }

    if (id === 0) {
      this.docType = this.attachArray[0].value;
      $("#attch").modal("show");
    }
  }

  saveAttchement(id, name, size, DocUrl, Doguid,RetGuid) {
    let obj = {
      id: 0,
      name: "",
      size: "",
      DocUrl:"",
      Doguid:"",
      RetGuid:""
    };
    obj.id = id;
    obj.name = name;
    obj.size = size;
    obj.DocUrl = DocUrl;
    obj.Doguid = Doguid;
    obj.RetGuid=RetGuid;
    this.filez[id].at.push(obj);
  }


  deleteAttachments(id, index) {
    this.deleteAttachmentFromSer(this.filez[id].at[index]);
    this.filez[id].at.splice(index, 1);

    console.log(this.filez[id].at.length);
    if (this.filez[id].at.length === 0) {
      this.files[id].name = "";
      this.files[id].size = 0;
    } else {
      
      this.files[id].name = this.filez[id].at[
        this.filez[id].at.length - 1
      ].name;
    }
    
  }

  ValidateValues(id, val, n, i, j) {
    if (n === 1) {
      if (val.name.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.name);
        a ? (this.nameErr1 = false) : (this.nameErr1 = true);
        if (this.nameErr1) {
          if (id === 1) {
            this.fNameErr = true;
            this.fNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.fNameErr1Arr[i] = true;
            this.fNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.outletNumErr[i].permitArr[j][4] = true;
            this.fNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.fNameErr = false;
          if (id === 2) this.fNameErr1Arr[i] = false;
          if (id === 3) this.outletNumErr[i].permitArr[j][4] = false;
        }
      }
    }

    if (n === 2) {
      if (val.surname.toString() !== "") {
        let a = this.commonVaidation.isArabic(val.surname);
        a ? (this.nameErr2 = false) : (this.nameErr2 = true);
        if (this.nameErr2) {
          if (id === 1) {
            this.lNameErr = true;
            this.lNameMsg = this.lang.err.e7;
          }
          if (id === 2) {
            this.lNameErr1Arr[i] = true;
            this.lNameMsg = this.lang.err.e7;
          }
          if (id === 3) {
            this.outletNumErr[i].permitArr[j][5] = true;
            this.lNameMsg = this.lang.err.e7;
          }
        } else {
          if (id === 1) this.lNameErr = false;
          if (id === 2) this.lNameErr1Arr[i] = false;
          if (id === 3) this.outletNumErr[i].permitArr[j][5] = false;
        }
      }
    }
  }

  validate(val, n) {
    if (n === 6) {
      if (val.names.toString() !== "") {


        if (localStorage.getItem("lang") === "ar") {
          let a = this.commonVaidation.isAlphabet(val.names);
          let b = this.commonVaidation.isArabic(val.names);
          a || b ? (this.nameErr6 = false) : (this.nameErr6 = true);
        } else {
          let a = this.commonVaidation.isAlphabet(val.names);
          a ? (this.nameErr6 = false) : (this.nameErr6 = true);
        }

        if (this.nameErr6) {
          this.nsMsg = this.lang.err.e7;
          return;
        }
      }
    }
    if (n === 7) {
      if (val.designation.toString() !== "") {
        if (localStorage.getItem("lang") === "ar") {
          let a = this.commonVaidation.isAlphabet(val.designation);
          let b = this.commonVaidation.isArabic(val.designation);
          a || b ? (this.nameErr7 = false) : (this.nameErr7 = true);
        } else {
          let a = this.commonVaidation.isAlphabet(val.designation);
          a ? (this.nameErr7 = false) : (this.nameErr7 = true);
        }


        // let a = this.commonVaidation.isAlphabet(val.designation);
        // a ? (this.nameErr7 = false) : (this.nameErr7 = true);
        if (this.nameErr7) { this.dsgMsg = this.lang.err.e7; return; }
      }
    }

    if (n === 8) {
      if (val.MobileNo !== "") {
        let n = val.MobileNo.substring(0, 6);
       if (n !== "009665") {
          this.nameErr8 = true;
          this.mbMsg = this.lang.err.mobStart;
          return;
        } else {
          let a = this.commonVaidation.isNumber(val.MobileNo.toString());
          a ? (this.nameErr8 = false) : (this.nameErr8 = true);
          if (this.nameErr8) { this.mbMsg = this.indErr.e3; val.MobileNo = ""; return; }
          else if (val.MobileNo.toString().length !== 14) {
            this.nameErr8 = true;
            this.mbMsg = this.lang.err.moblen;
            return;
          }
          // else if(val.MobileNo.substring(0, 5)!=="009665"){
          //   this.nameErr8 = true;
          //   this.mbMsg = this.indErr.e24;
          // }

          else {
            this.nameErr8 = false;
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
      let first = val.tin.substr(0, 1);
      if (first !== "3") {
        this.nameErr9 = true;
        this.tinMsg = "error";
        return;
      } else {
        if (val.tin.length === 10) {
          this.nameErr9 = false;
        } else {
          this.nameErr9 = true;
          this.tinMsg = "error";
          return;
        }
      }
    }
  }
  attachment() {
    let obj = {
      title: "",
      value: "",
    };

    if (this.tinDeregDto.reason === "2") {
      obj.title = this.lang.c3.t1;
      obj.value = "DR02";
    }

    if (this.tinDeregDto.reason === "8") {
      obj.title = this.lang.c3.t14;
      obj.value = "DR06";
    }

    if (this.tinDeregDto.reason === "3") {
      obj.title = this.lang.c3.t9;
      obj.value = "DR01";
    }

    if (this.tinDeregDto.reason === "4") {
      obj.title = this.lang.c3.t10;
      obj.value = "DR05";
    }

    if (this.tinDeregDto.reason === "1") {
      obj.title = this.lang.c3.t11;
      obj.value = "DR03";
      this.contrct = true;
    }

    if (this.tinDeregDto.reason === "7") {
      obj.title = this.lang.c3.t15;
      obj.value = "DR09";
    }


    if (this.tinDeregDto.reason === "5") {
      obj.title = this.lang.c3.t12;
      obj.value = "DR04";
    }

    this.attachArray = [];
    this.attachArray.push(obj);
    let cnt = 0;
    let cnt23 = 0;

    let selectedOutlets=[];
    selectedOutlets=this.filterOutletData();
    let selectedOutletNos = [];
    for (let i = 0; i < selectedOutlets.length; i++) {
      selectedOutletNos.push(selectedOutlets[i].AOutletNoTb);
    }

    this.permitSet?.forEach((ele) => {
      if (selectedOutletNos.includes(ele.APermitOutletnoTb)) {
        if (ele.APermitTypeTb === "ZS0004") cnt++;
        if (ele.APermitTypeTb === "BUP002") cnt23++;
      }
    });
    if (cnt > 0) {
      this.licenseAtt = true;
    }else{
    this.licenseAtt = false;
    if(this.files[4].size>0){
      this.files[4].size=0;
    }
    }

    if (cnt23 > 0) {
      this.crAtt = true;
    }else{
      this.crAtt = false;
      if(this.files[1].size>0){
        this.files[1].size=0;
      }
      
    }
    
    let cntt = 0;
    this.filtertinDeregDtoData().forEach((item) => {
      
      item.permit.forEach((ele) => {  
        if (ele.deregReason === "2") {
          cntt++;
        }      
        if (ele.deregReason === "3") {
          cntt++;
        }
      });
    });

    if (cntt > 0 || this.tinDeregDto.deregReason === "2") {
      this.transferAtch = true;
    }else{
      this.transferAtch = false;
      if(this.files[2].size>0){
        this.files[2].size=0;
      }
    }

  }


  onSubmit4() {
    let x = false;
    let x1 = false;
    let x2 = false;
    let x3 = false;
    let x4 = false;
    // if (this.filez[0].at.length > 0) {
    if (this.licenseAtt) {
      if (this.filez[4].at.length > 0) {
        x1 = false;
      } else {
        x1 = true;
      }
    }
    // if (this.contrct) {
    //   if (this.filez[3].at.length > 0) {
    //     x2 = false;
    //   } else {
    //     x2 = true;
    //   }
    // }

    if (this.crAtt) {
      if (this.filez[1].at.length > 0) {
        x3 = false;
      } else {
        x3 = true;
      }
    }
    if (this.transferAtch) {
      if (this.filez[2].at.length > 0) {
        x4 = false;
      } else {
        x4 = true;
      }
    }
    // } else {
    //   x = true;
    // }
    if (x1 || x2 || x3 || x4) {
      x = true;
    }
    if (x) {
      this.notifierService.notify("error", this.lang.err.fileErr);
    } else {
      this.NextStep(4);
    }
  }

  onSubmit5() {
    if (this.nameErr6 || this.nameErr7 || this.nameErr8) {
      return;
    }
    if (this.tinDeregDto.names === "") {
      this.nameErr6 = true;
      this.nsMsg = this.lang.err.e18;
      return;
    } else
      this.nameErr6 = false;

    if (this.tinDeregDto.MobileNo === "") {
      this.nameErr8 = true;
      this.mbMsg = this.lang.err.e19;
      return;
    } else
      this.nameErr8 = false;

    if (this.tinDeregDto.designation === "") {
      this.nameErr7 = true;
      this.dsgMsg = this.lang.err.e20;
      return;
    } else
      this.nameErr7 = false;

    if (!this.tinDeregDto.flag2) {
      this.nameErr11 = true;
      this.name11Msg = this.lang.err.e10;
      return;
    } else {
      this.nameErr11 = false;
    }

    if (
      this.nameErr6 ||
      this.nameErr8 ||
      this.nameErr7 ||
      !this.tinDeregDto.flag2
    ) {
      return;
    } else {
      this.NextStep(5);
    }
  }

  submitFinal() {

    this.tinDeregdata2 = this.tinDeregdata1;

    this.removeRequestArrayLists();

    this.mapRequestData();

    let outlets = this.filtertinDeregDtoData();

    this.mapOutletRequest(outlets);
    
    this.mapPermitRequest(outlets);

    this.deleteRequestExtraFileds();
    this.tinDeregdata2.AStep=4;
    // this.tinDeregdata2={};//DELETE
    this.tinService.postDetails(this.tinDeregdata2).subscribe(
      (res) => {
        this.show = true;
        this.name = res["d"]["ATaxpayerName"];
        this.no = res["d"]["Fbnum"];
        console.log("data", res);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
          // err
        );
        
        // this.outletNos = [];
        // for (let i = 0; i < this.tinDeregdata.OutletSet.length; i++) {
        //   this.outletNos.push(this.tinDeregdata2.OutletSet[i].AOutletNoTb);
        //   delete this.tinDeregdata2.OutletSet[i].flag;
        // }
        // $("#aftsubmit").modal("show");
        for ( var outlet of this.outletData ){
           console.log(outlet);
           if(this.outletNos.includes(outlet.AOutletNoTb)){
            outlet
           }
        }
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText = err.error.error.innererror.errordetails[1].message;
        
      }
    );
  }

  private deleteRequestExtraFileds() {
    // this.tinDeregdata2.OutletSet = this.tinDeregdata2.OutletSet.filter(function (obj) {
    //   return obj.flag === true;
    // });
    this.outletNos = [];
    for (let i = 0; i < this.tinDeregdata2.OutletSet.length; i++) {
      if(this.tinDeregdata2.OutletSet[i].flag)
      this.outletNos.push(this.tinDeregdata2.OutletSet[i].AOutletNoTb);
      delete this.tinDeregdata2.OutletSet[i].flag;
    }
    // this.tinDeregdata2.PermitSet = this.tinDeregdata2.PermitSet.filter((x) => outletNos.includes(x.APermitOutletnoTb));
  }

  private mapRequestData() {
    let obj1 = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    this.tinDeregdata2.ADregOpt = this.activeOutlet.toString();
    if (this.tinDeregdata2.ADregOpt === "1" ||
      this.tinDeregdata2.ADregOpt === "2") {
      this.tinDeregDto.deregDate["calendarName"] === "Gregorian"
        ? (this.tinDeregdata2.AEffectiveDtC = "H")
        : (this.tinDeregdata2.AEffectiveDtC = "H");

      this.tinDeregdata2.AEffectiveDt = this.commonVaidation.changedate(
        this.tinDeregDto.deregDate["calendarStart"]
      );

      this.tinDeregdata2.AEffectiveDtH = this.commonVaidation.changedates(
        this.tinDeregDto.deregDate["calendarStart"]
      );
      // this.tinDeregdata2.AEffectiveDtH="20201222";
      // this.tinDeregdata2.AEffectiveDtC="H";
      // this.tinDeregdata2.AEffectiveDt="2020-12-22T04:45:03.000Z";
      if ( this.tinDeregDto.dob !== null && this.tinDeregDto.dob !== undefined) {
        this.tinDeregdata2.ADobH = this.commonVaidation.changedates(
          this.tinDeregDto.dob["calendarStart"]
        );
        this.tinDeregdata2.ADobC = "H";
        this.tinDeregdata2.ADob = this.commonVaidation.changedate(
          this.tinDeregDto.dob["calendarStart"]
        );
      }
          // this.tinDeregdata2.ADob= this.commonVaidation.changeDate(
          //   this.tinDeregDto.dob["calendarStart"]
          // );
        this.tinDeregdata2.ANm1 = this.tinDeregDto.name;
        this.tinDeregdata2.ANm2 = this.tinDeregDto.surname;
        this.tinDeregdata2.ANm3 = this.tinDeregDto.fName;
        this.tinDeregdata2.ANm4 = this.tinDeregDto.gfName;
        this.tinDeregdata2.ANm5 = this.tinDeregDto.famName;
        this.tinDeregdata2.AIdType = this.tinDeregDto.idType;
        this.tinDeregdata2.AIdNo = this.tinDeregDto.idNumber;
     

    }
    this.tinDeregdata2.ADregReason = this.tinDeregDto.reason;

    this.tinDeregdata2.ADecName = this.tinDeregDto.names;
    this.tinDeregdata2.ADecTelNo = this.tinDeregDto.MobileNo;
    this.tinDeregdata2.ADecDesig = this.tinDeregDto.designation;
    this.tinDeregdata2.ADeclarationChkbox = "1";
    this.tinDeregdata2.ADegister = "2";
    this.tinDeregdata2.ADecDate = this.commonVaidation.changedate(obj1);
    this.tinDeregdata2.ASubmissionDate = this.commonVaidation.changedate(obj1);
    obj1.year < 1900
      ? (this.tinDeregdata2.ADecDateC = "H")
      : (this.tinDeregdata2.ADecDateC = "G");

    this.tinDeregdata2.Submitz = "X";
    this.tinDeregdata2.Savez = "";
    if (this.tinDeregDto.reason === "2") {
      this.tinDeregdata2.ADocumnt2 = "1";
      //this.tinDeregdata2.ADocumnt1 = "1";
    }

    if (this.tinDeregDto.reason === "3") {
      this.tinDeregdata2.ADocumnt1 = "1";
    }

    if (this.tinDeregDto.reason === "4") {
      this.tinDeregdata2.ADocumnt5 = "1";
    }

    if (this.tinDeregDto.reason === "6") {
      this.tinDeregdata2.ADocumnt1 = "1";
    }

    if (this.licenseAtt) {
      this.tinDeregdata2.ADocumnt13 = "1";
      this.tinDeregdata2.ADocumnt8 = "1";
    }
    if (this.crAtt) {
      this.tinDeregdata2.ADocumnt13 = "1";
    }
    if (this.transferAtch) {
      this.tinDeregdata2.ADocumnt9 = "1";
    }
  }


  private removeRequestArrayLists() {
    this.tinDeregdata2.PermitSet = this.removeResults(
      this.tinDeregdata2.PermitSet
    );
    this.tinDeregdata2.OutletSet = this.removeResults(
      this.tinDeregdata2.OutletSet
    );

    this.tinDeregdata2.Off_notesSet = this.removeResults(
      this.tinDeregdata2.Off_notesSet
    );
    this.tinDeregdata2.Permit_TableSet = this.removeResults(
      this.tinDeregdata2.Permit_TableSet
    );
    this.tinDeregdata2.returnSet = this.removeResults(
      this.tinDeregdata2.returnSet
    );
  }

  private mapPermitRequest(tinDeregdtos: any[]) {
    let permits = [];
    tinDeregdtos.forEach((res) => {
      res.permit.forEach((ele) => {
        permits.push(ele);
      });
    });
    for (var j = 0; j < permits.length; j++) {
      for(let i=0;i<this.tinDeregdata2.PermitSet.length;i++){
        if(permits[j].outletNum === this.tinDeregdata2.PermitSet[i].APermitOutletnoTb)
        {
       
          this.tinDeregdata2.PermitSet[i].APermitTypTxt =
            this.tinDeregdata2.PermitSet[i].APermitTypeTb == "BUP002"
              ? "C/R Number"
              : "Licence Number";

          console.log(permits[j].deregDate);
          permits[j].deregDate["calendarName"] === "Gregorian"
            ? (this.tinDeregdata2.PermitSet[i].APermitEffDtCTb = "H")
            : (this.tinDeregdata2.PermitSet[i].APermitEffDtCTb = "H");

          this.tinDeregdata2.PermitSet[i].APermitEffDtTb = this.commonVaidation.changedate(
            permits[j].deregDate["calendarStart"]
          );
          this.tinDeregdata2.PermitSet[i].APermitEffDtHTb = this.commonVaidation.changedates(
            permits[j].deregDate["calendarStart"]
          );
          this.tinDeregdata2.PermitSet[i].APermitDregRsnTb =
          permits[j].deregReason;
          if (permits[j].deregReason === "3") {             
              this.tinDeregdata2.PermitSet[i].APermitTransTinTb = permits[j].tin;
              this.tinDeregdata2.PermitSet[i].APermitIdTypeTb = permits[j].idType;
              this.tinDeregdata2.PermitSet[i].APermitIdNoTb = permits[j].idNumber;
              this.tinDeregdata2.PermitSet[i].APermitNm1Tb = permits[j].name;
              this.tinDeregdata2.PermitSet[i].APermitNm2Tb = permits[j].surname;
              this.tinDeregdata2.PermitSet[i].APermitNm3Tb = permits[j].fName;
              this.tinDeregdata2.PermitSet[i].APermitNm4Tb = permits[j].gfName;
              this.tinDeregdata2.PermitSet[i].APermitNm5Tb = permits[j].famName;

            //   this.tinDeregDto.deregDate["calendarName"] === "Gregorian"
            //   ? (this.tinDeregdata2.AEffectiveDtC = "H")
            //   : (this.tinDeregdata2.AEffectiveDtC = "H");
      
            // this.tinDeregdata2.AEffectiveDt = this.commonVaidation.changedate(
            //   this.tinDeregDto.deregDate["calendarStart"]
            // );
      
            // this.tinDeregdata2.AEffectiveDtH = this.commonVaidation.changedates(
            //   this.tinDeregDto.deregDate["calendarStart"]
            // );
            
              // this.tinDeregdata2.PermitSet[i].APermitNm6Tb = permits[j].gfName;
              // this.tinDeregdata2.PermitSet[i].APermitNm7Tb = permits[j].famName;
              if(permits[j].dob !== null && permits[j].dob !== undefined){
                  permits[j].dob["calendarName"] === "Gregorian"
                    ? (this.tinDeregdata2.PermitSet[i].APermitDobCTb = "H")
                    : (this.tinDeregdata2.PermitSet[i].APermitDobCTb = "H");

                  this.tinDeregdata2.PermitSet[i].APermitDobTb = this.commonVaidation.changedate(
                    permits[j].dob["calendarStart"]
                  );

                  this.tinDeregdata2.PermitSet[i].APermitDobHTb = this.commonVaidation.changedates(
                    permits[j].dob["calendarStart"]
                  );
              }
          } 
    } 
  }
  }
  }

  private mapOutletRequest(tinDeregdtos) {
    tinDeregdtos.forEach((dto) => {
      for(let i=0;i<this.tinDeregdata2.OutletSet.length;i++){
        if(this.mainOutletSelected){
          if(this.tinDeregdata2.OutletSet[i].AOutletNoTb === this.outnm){
            this.tinDeregdata2.OutletSet[i].AOutletNewMainOutnumTb=this.nxtMnOutlt;
          }
          if(this.tinDeregdata2.OutletSet[i].AOutletNoTb === this.nxtMnOutlt){
            this.tinDeregdata2.OutletSet[i].AOutletMainFlagTb="1";
          } 
        }
        if(dto.outletNum === this.tinDeregdata2.OutletSet[i].AOutletNoTb)
        {
           if(this.tinDeregdata2.ADregReason!=="3"){
            this.tinDeregdata2.OutletSet[i].AOutletEffDtTb = this.commonVaidation.changedate(
              dto.deregDate["calendarStart"]
            );
            this.tinDeregdata2.OutletSet[i].AOutletEffDtHTb = this.commonVaidation.changedates(
              dto.deregDate["calendarStart"]
            );
          }
            this.tinDeregdata2.OutletSet[i].AOutletEffDtCTb = "H";
            this.tinDeregdata2.OutletSet[i].AOutletMobileNoTb = this.tinDeregDto.MobileNo;
            this.tinDeregdata2.OutletSet[i].AOutletTransTinTb = this.tinDeregDto.tin;
            if (dto.deregReason === "2") {
              
              // this.tinDeregdata2.OutletSet[i].AOutletNm6Tb = dto.gfName;
              if(dto.dob !== null && dto.dob !== undefined){
              this.tinDeregdata2.OutletSet[i].AOutletDobTb = this.commonVaidation.changedate(
                dto.dob["calendarStart"]
              );
              this.tinDeregdata2.OutletSet[i].AOutletDobHTb = this.commonVaidation.changedates(
                dto.dob["calendarStart"]
              );
            }
            }
            this.tinDeregdata2.OutletSet[i].AOutletIdTypeTb = dto.idType;
            this.tinDeregdata2.OutletSet[i].AOutletIdNoTb = dto.idNumber;
            this.tinDeregdata2.OutletSet[i].AOutletNm1Tb = dto.name;
            this.tinDeregdata2.OutletSet[i].AOutletNm2Tb = dto.surname;
            this.tinDeregdata2.OutletSet[i].AOutletNm3Tb = dto.fName;
            this.tinDeregdata2.OutletSet[i].AOutletNm4Tb = dto.gfName;
            this.tinDeregdata2.OutletSet[i].AOutletNm5Tb = dto.famName;
            this.tinDeregdata2.OutletSet[i].AOutletDobCTb = "H";

            this.tinDeregdata2.OutletSet[i].AOutletToDeregTb="1";
            this.tinDeregdata2.OutletSet[i].AOutletDregOptTb=this.tinDeregDto.reason;
        }
      }
    });
  }

  removeResults(obj) {
    let a = [];
    if(obj["results"] !== undefined)
    obj["results"].filter((i) => a.push(i));
    obj = [];
    obj = a;
    return obj;
  }

  onSubmit() {
    let selectedOutlets = this.outletData;
    selectedOutlets = selectedOutlets.filter(i => i.flag);
    if (selectedOutlets.length === 0) {
      this.outletSelectedFlag = true;
      this.outletAllSelectedFlag = false;
      return;
    } else
      this.outletSelectedFlag = false;

    if (this.outletAllSelectedFlag || this.outletSelectedFlag) {
      return;
    }
   
    this.setErrorArrays();
      
    this.NextStep(2);
  }
  setErrorArrays() {
    if (this.filterOutletData().length > 0) {
      this.outletNumErr = [];
    }
      this.filterOutletData().forEach((it1, i) => {
        let outletErr = {
          outletNo: 0,
          permitArr: [],
          permitList: [],
        };
        outletErr.outletNo = i;

        this.tinDeregdata["PermitSet"].results.forEach((it2, j) => {
          if (it1.AOutletNoTb.includes(it2.APermitOutletnoTb)) {
            console.log(j);
            for (var k = 0; k < 8; k++) {
              outletErr.permitList.push(false);
            }
            outletErr.permitArr.push(outletErr.permitList);
            outletErr.permitList = [];
          }
        });
        
        this.outletNumErr.push(outletErr);
      });
  }
  selectedOutlet(i, item, arr) {   
    this.resetdata();
    this.resetReason();
    this.tinDeregDto.reason="";
    this.setAOutletToDeregTb(i);
    this.outletSelectedFlag = false;
    this.outletAllSelectedFlag = false;

    this.outletData[i].flag = !this.outletData[i].flag;


    let selectedOutlets = this.outletData;
    selectedOutlets = selectedOutlets.filter(i => i.flag);
    this.tinDeregDto.outlet = selectedOutlets;
    if(item.AOutletMainFlagTb == '1' && item.flag){
      $("#aftslct1").modal("show");
      this.outnm = item.AOutletNoTb;
      this.mainOutletSelected = true;
    } 
    arr.filter( e => {
      if(e.AOutletMainFlagTb == '1' && e.flag){
        this.mainOutletSelected = true;
      }
      if(e.AOutletMainFlagTb == '1' && !e.flag){
        this.mainOutletSelected = false;
      }
    });
    if (selectedOutlets.length === this.outletData.length) {
      this.outletAllSelectedFlag = true;
      this.outletSelectedFlag = false;
      return;
    } else
      this.outletAllSelectedFlag = false;
    if (selectedOutlets.length === 0) {
      this.outletSelectedFlag = true;
      this.outletAllSelectedFlag = false;
      return;
    } else
      this.outletSelectedFlag = false;
  }

  private setAOutletToDeregTb(i: any) {
    if (this.outletData[i]["AOutletToDeregTb"] === "1") {
      this.outletData[i]["AOutletToDeregTb"] = "";
    }else{
      this.outletData[i]["AOutletToDeregTb"] = "1";
    }
  }

  filterOutletData() {
    return this.outletData.filter(i => i.flag);

  }
  filtertinDeregDtoData() {
    let outlets = this.filterOutletData();
    let tinDeregDtos = [];
    for (let i = 0; i < outlets.length; i++) {
      let tinDeregDto = this.tinDeregDto.outlet.filter(j => j.outletNum == outlets[i]["AOutletNoTb"]);
      if (tinDeregDto.length > 0) {
        tinDeregDtos.push(tinDeregDto[0]);
      }
    }
    return tinDeregDtos;

  }

  compareDate(tinDTO, deregDt){
    // console.log(tinDTO);
    console.log(deregDt);
    let outnm = [];
    let validFrmDts = [];
    this.outletData.filter( i => {
      if(i.flag){
        outnm.push(i.AOutletNoTb);
      }
    });

    for(var i in outnm){
      this.tinDeregdata["PermitSet"]["results"].filter( j => {
        if(j.APermitOutletnoTb == outnm[i]){
          validFrmDts.push(+(j.APermitValfrDtTb.substring(6, j.APermitValfrDtTb.length - 2)));
        }
      })
    }
  validFrmDts = validFrmDts.sort(); 
    let stDt = this.commonVaidation.toJulianDate1(new Date(validFrmDts[0]));
    console.log(stDt);
    if(deregDt['jdnStart'] < stDt['jdnStart']){
      this.dtValidationFLag = true;
    } else this.dtValidationFLag = false;
  }

  getOtherOutlets(){
    return this.tinDeregdata["OutletSet"]["results"].filter( i => i.AOutletNoTb != this.outnm);
  }
  rejectedFlow() {
    for(let i=0;i<this.outletData.length;i++){
      if( this.outletData[i].AOutletToDeregTb !== '') {
        //First Screen 
        this.outletData[i].flag=true;
        
        //Second Screen
        if(this.outletData[i].AOutletDregOptTb !==""){
            let item  = this.reaList.filter(item =>   item.id === this.outletData[i].AOutletDregOptTb);
            this.selectedReason(item[0],item[0]["id"]);
              if(item[0].id==="1"  ){
                this.tinDeregDto.deregDate = 
                this.commonVaidation.toJulianDate1(this.formatDate(this.tinDeregdata1["AEffectiveDt"].substring(6, this.tinDeregdata1["AEffectiveDt"].length-2)));
              }
              if(item[0].id==="2"  ){
                this.tinDeregDto.deregDate =this.commonVaidation.toJulianDate1(this.formatDate(this.tinDeregdata1["AEffectiveDt"].substring(6, this.tinDeregdata1["AEffectiveDt"].length-2)));
                this.tinDeregDto.name=this.tinDeregdata1["ANm1"];
                this.tinDeregDto.surname=this.tinDeregdata1["ANm2"];
                this.tinDeregDto.fName=this.tinDeregdata1["ANm3"];
                this.tinDeregDto.gfName=this.tinDeregdata1["ANm4"];
                this.tinDeregDto.famName=this.tinDeregdata1["ANm5"];
                this.tinDeregDto.idNumber=this.tinDeregdata1["AIdNo"];
                this.tinDeregDto.idType=this.tinDeregdata1["AIdType"];
                
                this.tinDeregDto.idType === "ZS0003"? this.maxLength1=15 : this.maxLength1=10 ;
                
                this.tinDeregDto.tin=this.outletData[i].AOutletTransTinTb;
                if(this.tinDeregDto.tin !== null && this.tinDeregDto.tin !== undefined ){
                  this.idValue=true;
                }
                if(this.tinDeregdata1["ADob"]!=null)
                this.tinDeregDto.dob =this.commonVaidation.toJulianDate1(this.formatDate(this.tinDeregdata1["ADob"].substring(6, this.tinDeregdata1["ADob"].length-2)));                                 
              }
               //Third Screen -- Attachment 
              if ( this.attachPopulate &&  (item[0].id==="2" ||item[0].id==="1"  ) && this.tinDeregdata1.AttDetSet.results.length > 0) {
                this.setAttachment(this.tinDeregdata1.AttDetSet.results);
                this.attachPopulate=false;
              } 
            }

            //Fourth Screen -- Declaration
            this.tinDeregDto.names=this.tinDeregdata1.ADecName;
            this.tinDeregDto.MobileNo=this.tinDeregdata1.ADecTelNo;
            this.tinDeregDto.designation=this.tinDeregdata1.ADecDesig;
            this.tinDeregDto.date=this.tinDeregdata1.ADecDate.replace("/Date(","").replace(")/","");
            this.tinDeregDto.flag2= this.tinDeregdata1.ADeclarationChkbox == "1" ? true : false;
          }
      }
    }
    formatDate(date) {
      return new Date(+date);
    }
    deleteAttachmentFromSer(file) {
      // attach.Dotyp, attach.did
      this.vatService.deleteAttachmentDereg(file.Doguid,file.RetGuid ).subscribe((res) => {
        console.log("delere");
      });
    }
    
  opendowload(url) {
    var a = document.createElement("a");
    a.href = url;
    a.click();
    //window.open(url)
    console.log("url", url);
  }

  
  setAttachment(data) {

    this.attachment() ;
    let file1 = data.filter(
      (x) =>
        x.Dotyp === "DR02" ||
        x.Dotyp === "DR06" ||
        x.Dotyp === "DR01" ||
        x.Dotyp === "DR05" ||
        x.Dotyp === "DR03" ||
        x.Dotyp === "DR09" ||
        x.Dotyp === "DR04"
    );

    let file2 = data.filter((x) => x.Dotyp === "DR07");

    let file3 = data.filter((x) => x.Dotyp === "DR11");

    let file4 = data.filter((x) => x.Dotyp === "DR10");

    let file5 = data.filter((x) => x.Dotyp === "DR09");

    console.log(file1);
    console.log(file2);
    console.log(file3);
    console.log(file4);
    console.log(file5);

    if (file1.length > 0) {
      file1.forEach((element) => {
        this.files[0].name = element.Filename;
        this.files[0].DocUrl = element.DocUrl;
        this.files[0].Doguid = element.Doguid;
        this.files[0].RetGuid = element.RetGuid;
        this.files[0].size = 1;
        this.saveAttchement(
          0,
          this.files[0].name,
          this.files[0].size,
          element.DocUrl,
          element.Doguid,
          element.RetGuid
        );
      });
    }

    // if (file2.length > 0 && this.transferAtch) {
      if (file2.length > 0) {
      file2.forEach((element) => {
        this.files[2].name = element.Filename;
        this.files[2].DocUrl = element.DocUrl;
        this.files[2].Doguid = element.Doguid;
        this.files[2].RetGuid = element.RetGuid;
        this.files[2].size = 1;
        this.saveAttchement(
          2,
          this.files[2].name,
          this.files[2].size,
          element.DocUrl,
          element.Doguid,
          element.RetGuid
        );
      });
    }

    // if (file3.length > 0 && this.licenseAtt) {
      if (file3.length > 0 ) {
      file3.forEach((element) => {
        this.files[4].name = element.Filename;
        this.files[4].DocUrl = element.DocUrl;
        this.files[4].Doguid = element.Doguid;
        this.files[4].RetGuid = element.RetGuid;
        this.files[4].size = 1;
        this.saveAttchement(
          4,
          this.files[4].name,
          this.files[4].size,
          element.DocUrl,
          element.Doguid,
          element.RetGuid
        );
      });
    }

    // if (file4.length > 0 && this.crAtt) {
      if (file4.length > 0 ) {
      file4.forEach((element) => {
        this.files[1].name = element.Filename;
        this.files[1].DocUrl = element.DocUrl;
        this.files[1].Doguid = element.Doguid;
        this.files[1].RetGuid = element.RetGuid;
        this.files[1].size = 1;
        this.saveAttchement(
          1,
          this.files[1].name,
          this.files[1].size,
          element.DocUrl,
          element.Doguid,
          element.RetGuid

        );
      });
    }

    if(this.contrct){
      if (file5.length > 0) {
        file5.forEach((element) => {
          this.files[3].name = element.Filename;
          this.files[3].DocUrl = element.DocUrl;
          this.files[3].Doguid = element.Doguid;
          this.files[3].RetGuid = element.RetGuid;
          this.files[3].size = 1;
          this.saveAttchement(
            3,
            this.files[3].name,
            this.files[3].size,
            element.DocUrl,
            element.Doguid,
            element.RetGuid
          );
        });
      }
    }


    console.log(this.filez);
    console.log(this.files);
  }
  resetTPDetails(item,param){
    item.idType   === "ZS0003"? this.maxLength1=15 : this.maxLength1=10 ;

    if(param==='idtype'){
      this.idValue=false;
      item.tin = "";
      item.idNumber = "";
    }else if(param==='tin'){
      item.idNumber = "";
      item.idType="";
    }else{
      this.idValue=false;
      item.tin = "";     
      if(this.isEmpty(item.idNumber)) 
        item.idType=""; 
    } 
    item.dob = null;
    item.name = "";
    item.surname = "";
    item.fName = "";
    item.gfName = "";
    item.famName = "";
  }

  isEmpty(item){
    if(item === null || item === undefined || item ==="") {
        return true;
      }   
    return false; 
  }
}

export class TinDeregDTO {
  outlet: OutletDto[] = [new OutletDto()];
  reason: string = "";
  activeOutlet: any;
  pType: string;
  pNumber: string;
  vFrom: any;
  deregDate = null;
  deregReason: string = "";
  tin: string;
  idType: string = "";
  idNumber: string = "";
  name: string = "";
  fName: string = "";
  gfName: string = "";
  famName: string = "";
  surname: string = "";
  dob = null;
  MobileNo: string = "";
  date = new Date();
  designation: string = "";
  names: string = "";
  outletNum: string;
  crNum: string;
  address: string;
  actFlag: boolean = false;
  crName: string;
  dobValue: string;
  deregDateValue: string;
  flag1 = false;
  flag2 = false;
  falg3 = false;
}

export class OutletDto {
  activeOutletNum: number = 0;
  reasonList = VATConstants.deregReasons2;
  permit: PermitDto[] = [new PermitDto()];
  activeOutlet: any;
  pType: string;
  pNumber: string;
  vFrom: any;
  deregDate = null;
  deregReason: string = "";
  tin: string;
  idType: string = "";
  idNumber: string = "";
  name: string = "";
  fName: string = "";
  gfName: string = "";
  famName: string = "";
  surname: string = "";
  dob = null;
  MobileNo: string;
  date = new Date();
  designation: string;
  names: string;
  outletNum: string;
  crNum: string;
  address: string;
  actFlag: boolean = false;
  crName: string;
  dobValue: string;
  deregDateValue: string;
  mainFlagTb: any;
}

export class PermitDto {
  pType: string;
  pNumber: string;
  vFrom: any;
  deregDate = null;
  deregReason: string = "";
  tin: string;
  idType: string = "";
  idNumber: string = "";
  name: string = "";
  fName: string = "";
  gfName: string = "";
  famName: string = "";
  surname: string = "";
  dob = null;
  MobileNo: string;
  date = new Date();
  designation: string;
  names: string;
  outletNum: string;
  crNum: string;
  address: string;
  actFlag: boolean = false;
  crName: string;
  flag: boolean = false;
  dobValue: string;
  deregDateValue: string;
  vfromDateValue: string;
}
