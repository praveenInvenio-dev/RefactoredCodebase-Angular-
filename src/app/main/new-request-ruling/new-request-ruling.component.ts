import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { NewRequestRulingConstant } from "src/app/constants/NewRequestRulingConstant";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import { environment } from "src/environments/environment";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NewRequestRulingService } from "src/app/services/new-request-ruling.service";
import * as moment from "moment";
import { LoaderService } from "../../loader/loader.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { DashboardService } from 'src/app/services/dashboard-service';


declare var $: any;
const nonWhitespaceRegExp: RegExp = new RegExp("^[^.\\s]");

// const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
// const nonWhitespaceRegExp: RegExp = new RegExp("^[^.\\s]");
let maxLength = 132;

@Component({
  selector: "app-new-request-ruling",
  templateUrl: "./new-request-ruling.component.html",
  styleUrls: ["./new-request-ruling.component.css"],
})
export class NewRequestRulingComponent implements OnInit {
  headerComponent = CalendarComponent;
  baseUrl = environment.url;

  lang: any = NewRequestRulingConstant.eng;
  showSuccess = false;
  // showTerms = false;
  mainPage = false;
  showApp = false;
  optionActive = 0;
  langX: String;
  langSingle: String;
  listData = {};
  data;
  id1 = "";
  idErr1 = false;
  idErr;
  idMsg;
  dob1: any;
  dobErr = false;
  dobMsg = "";
  Inschk = "true";
  notes = [];
  selectedStatus = "01";
  formType = "req";
  isAgree = false;
  successData;
  currentDate;
  layoutType = "grid";
  searchText = "";
  isIdValidated = false;
  count = 0;
  reqTiles = [];
  Fbnum;
  showIdNumError = false;
  showSearch = true;
  showListHeader = true;
  today = new Date();
  isSubmit = true;

  requestRulingFormGroup: FormGroup;
  requestRulingFormGroup2: FormGroup;
  requestRulingFormGroup3: FormGroup;
  requestRulingFormGroup4: FormGroup;
  isInstructionSubmitted = false;
  dbData: any;
  fbguidData: Object;
  isApplicationEditable: boolean;
  statusCode: any;
  statusText: any;

  constructor(
    private _formBuilder: FormBuilder,
    public loaderService: LoaderService,
    public requestRulingService: NewRequestRulingService,
    private http: HttpClient,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    private router: Router,
    public appSrv: AppService,
    public dbservice: DashboardService
  ) {
    if (localStorage.getItem("lang") === "ar") {
      this.langX = "AR";
      this.langSingle = "A";
    } else {
      this.langX = "EN";
      this.langSingle = "E";
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = NewRequestRulingConstant.arb;
    }

    this.dbservice.getDashboardData$().subscribe((res) => {
      this.dbData = res;

      this.requestRulingService.getInitialListData().subscribe(
        (res) => {
          console.log("in initial Data");
          console.log(res);

          this.listData = res;
          this.reqTiles = this.listData["d"]["ASSLISTSet"]["results"];
          //get the count of Cards to be shown :
          this.count = -1;
          for (let i = 0; i < this.reqTiles.length; i++) {
            let each = this.reqTiles[i];
            if (
              (each.Fbust == this.selectedStatus ||
                this.selectedStatus == "01") &&
              each.Fbtyp == "TPEV"
            ) {
              this.count = this.count + 1;

              this.reqTiles[i].convertedDate = this.formatDate(each.Receipt);
            }
          }

          this.mainPage = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }, (err) => {
      console.log("dashboardErr", err)
    })


    this.currentDate = moment(new Date()).locale("en-us").format("YYYY/MM/DD");
  }

  onSubmit() {
    if (this.requestRulingFormGroup.invalid) {
      this.isSubmit = false;
      return;
    } else {
      this.isSubmit = true;
    }

    if (this.requestRulingFormGroup.valid) {

      this.optionActive = 2;
      console.log("2");
    }
  }

  onInputChange() {
    $("#reportDetailNote").on("input focus keydown keyup", function () {
      var text = $(this).val();
      var lines = text.split(/(\r\n|\n|\r)/gm);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > maxLength) {
          lines[i] = lines[i].substring(0, maxLength) + "\n";
        }
      }
      $(this).val(lines.join(""));
    });
  }
  onSubmit2() {
    if (this.requestRulingFormGroup2.invalid) {
      this.isSubmit = false;
      return;
    } else {
      this.isSubmit = true;
    }

    let count = 0;
    let start = 0;
    let end;
    console.log(this.requestRulingFormGroup2.controls.reportDetailNote.value);
    const el = this.requestRulingFormGroup2.controls.reportDetailNote.value;
    for (let i = 0; i < el.length; i++) {
      if (
        el.charAt(i) === "\n" ||
        el.charAt(i) === "\r" ||
        el.charAt(i) === "\r\n"
      ) {
        end = i;
        let tdline = el.substring(start, end);
        const noteObj = {
          __metadata: {
            id:
              'https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_M_SRV/NOTESSet("001")',
            uri:
              'https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_M_SRV/NOTESSet("001")',
            type: "ZDP_TPEV_M_SRV.NOTES",
          },
          Notenoz: "003",
          Refnamez: "",
          XInvoicez: "",
          XObsoletez: "",
          Rcodez: "TPEV_BOXTP",
          Erfusrz: "",
          Erfdtz: null,
          Erftmz: "PT13H19M36S",
          AttByz: "TP",
          ByPusrz: "",
          ByGpartz: localStorage.getItem("gpart"),
          DataVersionz: "00000",
          Namez: "",
          Noteno: "003",
          Lineno: count,
          ElemNo: 0,
          Tdformat: "",
          Tdline: tdline,
          Sect: "",

          Strline: "",
        };

        this.notes.push(noteObj);

        start = end + 1;
        count++;
      }
    }

    this.optionActive = 3;
    console.log("3");
  }

  onSubmit3() {
    if (this.requestRulingFormGroup3.invalid || !this.isIdValidated) {
      this.isSubmit = false;
      return;
    } else {
      this.isSubmit = true;
    }

    this.optionActive = 4;
    console.log("4");
  }

  onSubmit4() {
    const obj = {
      __metadata: {
        id: `https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_M_SRV/HeaderSet(Officerz='',Langz='EN',Gpartz='${localStorage.getItem(
          "gpart"
        )}',Fbnumz='',Fbguid='',Euser='')`,
        uri: `https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_M_SRV/HeaderSet(Officerz='',Langz='EN',Gpartz='${localStorage.getItem(
          "gpart"
        )}',Fbnumz='',Fbguid='',Euser='')`,
        type: "ZDP_TPEV_M_SRV.Header",
      },
      Idtp: this.requestRulingFormGroup3.controls.idType.value,
      UserTypz: "TP",
      TxnTpz: "",
      Trtp: "",
      Stpno: "03",
      StepNumberz: "03",
      Statusz: this.data["d"]["Statusz"],
      Status: "",
      SrcAppz: "",
      ReturnIdz: this.data["d"]["ReturnIdz"],
      ReturnId: "",
      Rdbtsr: "1",
      Rdbtpr: "0",
      Rdbtop: "",
      PortalUsrz: "",
      Periodkeyz: "",
      Operationz: "01",
      Officerz: "",
      OfficerTz: "",
      Officer: "",
      Langz: this.langX,
      Inschk: "1",
      Idno: this.requestRulingFormGroup3.controls.idNum.value,
      Gpartz: localStorage.getItem("gpart"),
      Gpart: "",
      Formprocz: "",
      FormGuid: "",
      Fbnumz: "",
      Fbnum: "",
      Fbguid: "",
      EvStatus: "",
      Euser: "",
      DmodeFlg: "",
      Decchk: "1",
      DataVersion: this.data["d"]["DataVersion"],
      Cnnm: this.requestRulingFormGroup3.controls.name.value,
      Caltp: "",
      ATTACHSet: {
        results: [],
      },
      NOTESSet: {
        results: this.notes,
      },
      QuesListSet: {
        results: [],
      },
    };

    this.requestRulingService.submitData(obj).subscribe(
      (res) => {
        console.log(res);
        this.successData = res["d"];
        this.showSuccess = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initForms() {
    this.requestRulingFormGroup = this._formBuilder.group({
      reqType: ["", Validators.required],
      proType: ["", Validators.required],
    });
    this.requestRulingFormGroup2 = this._formBuilder.group({
      reportDetailNote: [
        "",
        [Validators.required, Validators.pattern(nonWhitespaceRegExp)],
      ],
      docType: [""],
      doc: this._formBuilder.array([]),
    });
    this.requestRulingFormGroup3 = this._formBuilder.group({
      idType: ["", Validators.required],
      idNum: ["", Validators.required],
      name: [
        "",
        [
          Validators.required,
          Validators.pattern(nonWhitespaceRegExp),
          Validators.maxLength(80),
        ],
      ],
      cbdeclaration: ["", Validators.requiredTrue],
    });
    this.requestRulingFormGroup4 = this._formBuilder.group({});
  }

  acceptInstructions() {

    this.isInstructionSubmitted = true;
    if (this.isAgree) {
      $("#terms").modal("hide");
      this.startProcess();
    }
  }


  startProcess() {
    this.isSubmit = true;
    console.log("start Process");
    this.initForms();
    if (this.Fbnum == "" && !this.isAgree) {
      //if a new Request and instruction Popup not checked  // show the popup
      $("#terms").modal("show");
      return;
    }
    this.showLoader();
    // for new Request || existing request callung getInitial Data Api -- 
    // get Fbguid from get Fbguid Service  

    this.requestRulingService.getFbguid(this.Fbnum, this.dbData).subscribe((res) => {
      this.fbguidData = res;
      this.requestRulingService.getInitialData(this.Fbnum, this.dbData, res).subscribe(
        (res) => {
          console.log(res);

          this.data = res;

          //set fg1 data 

          this.data["d"]["Rdbtsr"] == "0"
            ? this.requestRulingFormGroup.controls.reqType.setValue("rbSelf")
            : this.requestRulingFormGroup.controls.reqType.setValue("rbOnBeh");
          this.data["d"]["Rdbtpr"] == "0"
            ? this.requestRulingFormGroup.controls.proType.setValue("rbPrivate")
            : this.requestRulingFormGroup.controls.proType.setValue("rbPublic");
          if (this.data["d"]["Rdbtsr"] == "") {
            this.requestRulingFormGroup.controls.reqType.setValue("");
          }
          if (this.data["d"]["Rdbtpr"] == "") {
            this.requestRulingFormGroup.controls.proType.setValue("");
          }

          //set fg2 data
          if (this.data["d"]["NOTESSet"]["results"].length > 0) {
            this.requestRulingFormGroup2.controls.reportDetailNote.setValue(
              this.data["d"]["NOTESSet"]["results"][0].Strline
            );
          } else {
            this.requestRulingFormGroup2.controls.reportDetailNote.setValue("");
          }

          this.setAttachment(this.data["d"]["ATTACHSet"]["results"]);


          //set fg3 data 
          this.requestRulingFormGroup3.controls.idType.setValue(
            this.data["d"]["Idtp"]
          );
          this.requestRulingFormGroup3.controls.idNum.setValue(
            this.data["d"]["Idno"]
          );
          this.requestRulingFormGroup3.controls.name.setValue(
            this.data["d"]["Cnnm"]
          );

          if (
            this.data["d"]["Idtp"].length > 0 &&
            this.data["d"]["Idno"].length > 0
          ) {
            this.isIdValidated = true;
          }


          this.hideLoader();

          //https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_TPEV_UH_SRV/UI_HDRSet(Fbnum='',Lang='E',Officer='',Gpart='3060000044',Status='E0001',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet

          const url = `sap/opu/odata/SAP/ZDP_TPEV_UH_SRV/UI_HDRSet(Fbnum='',Lang='${this.langSingle
            }',Officer='',Gpart='${localStorage.getItem(
              "gpart"
            )}',Status='${this.data['d']['Statusz']}',TxnTp='',Formproc='')?&$expand=UI_BTNSet,UserListSet&$format=json`;

          this.requestRulingService.getButtonSet(url).subscribe(
            (res) => {
              console.log(res);

              this.mainPage = false;
              this.showApp = true;
              if (res['d']['EditFgz'] == "X") {

                this.optionActive = 1;
                this.isApplicationEditable = true;
              } else {
                this.optionActive = 4;
                this.isApplicationEditable = false;

              }
            },
            (err) => { //getbuttonset api err
              this.hideLoader();
              console.log(err);
            }
          );
        },
        (err) => { // initialdata api error
          console.log(err);
          this.hideLoader();

          let errMsg = "";
          for (
            let i = 0;
            i < err.error.error.innererror.errordetails.length;
            i++
          ) {
            if (
              err.error.error.innererror.errordetails[i]["code"].includes(
                "ZDM_TPEV"
              )
            ) {
              errMsg =
                errMsg +
                " " +
                err.error.error.innererror.errordetails[i]["message"];
            }
          }

          this.notifierService.notify("error", errMsg);
        }
      );

    }, (err) => {//fbguid api error
      this.hideLoader();
    })

  }



  // add ruling request determines when adding a request if anu
  addRulingRequest(Fbnum, statusCode, statusText) {
    // this.showTerms = true;
    this.Fbnum = Fbnum;
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.startProcess()
    // if (this.Fbnum != "") {
    //   this.showLoader();
    //   this.requestRulingService.getInitialData(this.Fbnum).subscribe(
    //     (res) => {
    //       this.hideLoader();
    //       this.isAgree = true;
    //       $("#terms").modal("show");
    //     },
    //     (err) => {
    //       this.isAgree = false;
    //       this.hideLoader();
    //       let errMsg = "";
    //       for (
    //         let i = 0;
    //         i < err.error.error.innererror.errordetails.length;
    //         i++
    //       ) {
    //         if (
    //           err.error.error.innererror.errordetails[i]["code"].includes(
    //             "ZDM_TPEV"
    //           )
    //         ) {
    //           errMsg =
    //             errMsg +
    //             " " +
    //             err.error.error.innererror.errordetails[i]["message"];
    //         }
    //       }

    //       this.notifierService.notify("error", errMsg);
    //     }
    //   );
    // } else {
    //   $("#terms").modal("show");
    // }
  }

  back() {

    if (this.optionActive == 4 && !this.isApplicationEditable) {

      this.optionActive = 0;

    }

    if (this.optionActive > 1) {
      this.optionActive--;
      return;
    }

    if (this.optionActive == 1) {
      this.optionActive--;
    }

    if (this.optionActive == 0) {
      if (!this.mainPage && this.showApp) {
        // $("#terms").modal("toggle");
        this.mainPage = true;
        this.showApp = false;
        this.isAgree = false;
        this.isInstructionSubmitted = false;
      } else {
        this.backTo("001");
      }
    }
  }

  formatDate(date: String) {
    if (date != null) {
      const date1 = parseInt(date.replace(/\D/g, ""));

      return moment(date1).locale("en-us").format("DD MMM YYYY");
    } else {
      return "";
    }
  }

  onClickFilterIcon() {
    $("#filter").modal("show");
  }

  onApplyFilter() {
    this.filterStatus();
    $("#filter").modal("toggle");
  }



  closeModal(cardType) {
    // console.log(' $("#aftsubmit").modal("show");');

    if (cardType === "terms") {
      this.isAgree = false;
      this.isInstructionSubmitted = false;
      $("#terms").modal("toggle");
    }

    if (cardType === "filter") {
      $("#filter").modal("toggle");
    }
  }

  // nameValidator(event) {
  //   let name = event.target.value;
  //   name = name.replace(
  //     /[^a-zA-Z\u0600-\u06FF ][^\sa-zA-Z\u0600-\u06FF ]*$/g,
  //     ""
  //   );
  //   name = name.replace(/[\s]{2,}/g, " ");
  //   var regex;
  //   // regex = /[دجحخ هعغفقثصضذطكمنتالبيسشظزوةىلارؤءئإلإلأأ؟آلآ]|\.|\s/;
  //   regex = /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/;
  //   this.requestRulingFormGroup3.controls.name.setValue(name);
  // }


  nameValidator(event) {
    let name = event.target.value;
    name = name.replace(/[^\u0621-\u064Aa-zA-Z \s]/g, "");
    name = name.replace(/[\s]{2,}/g, " ");
    this.requestRulingFormGroup3.controls.name.setValue(name);
  }

  onIdNumChange() {
    if (
      this.requestRulingFormGroup3.controls.idType.value == "ZS0003" &&
      (this.requestRulingFormGroup3.controls.idNum.value.length < 7 ||
        this.requestRulingFormGroup3.controls.idNum.value.length > 15)
    ) {
      this.showIdNumError = true;
      this.isIdValidated = false;
    } else {
      this.showIdNumError = false;
      this.isIdValidated = true;
    }
  }
  onIdSelect() {
    // if (this.vatReviewFormGroup6.controls.idType.value == "ZS0001" || this.vatReviewFormGroup6.controls.idType.value == "ZS0002") {
    this.isIdValidated = false;
    this.requestRulingFormGroup3.controls.idNum.setValue("");
    this.requestRulingFormGroup3.controls.name.setValue('');

    this.dob1 = undefined;
    this.id1 = undefined;
    if (this.requestRulingFormGroup3.controls.idType.value != "ZS0003") {
      $("#aftSelect").modal("show");
    }

    // }
  }

  onDobChange() {
    if (
      this.dob1 === undefined &&
      this.requestRulingFormGroup3.controls.idType.value != "ZS0003"
    ) {
      // this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;
      this.dobMsg = this.lang["dobMsg"];
    } else {
      this.dobErr = false;
    }
  }

  onIdinputChange() {
    this.IDtypeValidation1(this.id1);
    // if (this.changeFreFormGroup4.controls.DecidTy.value == "ZS0002" && this.id1[0]!=2) {
    //   this.idErr1 = true;
    //   this.idMsg = "Enter a valid Iqama ID";
    // }else{
    //   this.idErr1 = false;
    //   this.idMsg = "";
    // }
  }

  idValidationOnBlur() {
    let d;
    let currentdate;
    if (
      this.id1 === undefined ||
      this.id1 === "" ||
      this.id1.trim().length == 0
    ) {
      this.idErr1 = true;
      // this.idMsg = this.vatErr.e5;
      this.idMsg = this.lang["idMsg"];
    } else {
      if (
        this.requestRulingFormGroup3.controls.idType.value == "ZS0001" ||
        this.requestRulingFormGroup3.controls.idType.value == "ZS0002"
      ) {
        this.IDtypeValidation1(this.id1);
      }
    }
  }

  validateID2() {
    let d;
    let currentdate;
    if (
      this.id1 === undefined ||
      this.id1 === "" ||
      this.id1.trim().length == 0
    ) {
      this.idErr1 = true;
      // this.idMsg = this.vatErr.e5;
      this.idMsg = this.lang["idMsg"];
    } else {
      if (
        this.requestRulingFormGroup3.controls.idType.value == "ZS0001" ||
        this.requestRulingFormGroup3.controls.idType.value == "ZS0002"
      ) {
        this.IDtypeValidation1(this.id1);
      }
    }

    if (
      this.dob1 === undefined &&
      this.requestRulingFormGroup3.controls.idType.value != "ZS0003"
    ) {
      // this.idErr1 = false;
      this.dobErr = true;
      // this.dobMsg = this.vatErr.e6;
      this.dobMsg = this.lang["dobMsg"];
    } else {
      this.dobErr = false;
      if (
        this.requestRulingFormGroup3.controls.idType.value == "ZS0001" ||
        this.requestRulingFormGroup3.controls.idType.value == "ZS0002"
      ) {
        this.IDtypeValidation1(this.id1);
        d = this.dob1;
        // if (d.day < 10) {
        //   d.day = d.day;
        // }
        // if (d.month < 10) {
        //   d.month = d.month;
        // }
        console.log(d);
        currentdate =
          d.calendarStart.year.toString() +
          ("0" + d.calendarStart.month.toString()).slice(-2) +
          ("0" + d.calendarStart.day.toString()).slice(-2);
        console.log(currentdate);
      } else {
        d = new Date();
        console.log(d);
        let year = d.getFullYear().toString();
        let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
        let day = ("0" + d.getDate().toString()).slice(-2);

        // let dateNow= new Date() ;
        currentdate = year + month + day;
        console.log(currentdate);
      }

      console.log(currentdate);

      let obj = {
        type: this.requestRulingFormGroup3.value.idType,
        idNumber: this.id1,
      };
      if (!this.idErr1) {
        console.log(currentdate);
        this.requestRulingService.getUserValidation(obj, currentdate).subscribe(
          (res) => {
            // this.tinErr = false;
            console.log("res", res);
            // this.iddErr = false;
            this.requestRulingFormGroup3.controls["idNum"].setValue(
              res["d"]["Idnum"]
            );

            if ("FullName" in res["d"] && res["d"]["FullName"] != "") {
              this.requestRulingFormGroup3.controls["name"].setValue(
                res["d"]["FullName"]
              );
            } else if ("Name1" in res["d"] && res["d"]["Name1"] != "") {
              this.requestRulingFormGroup3.controls["name"].setValue(
                res["d"]["Name1"] + " " + res["d"]["Name2"]
              );
            }

            $("#aftSelect").modal("hide");

            //this.vatFormThirdGroup.get("Decname").disable();
            // this.notifierService.notify("success", this.lang['validId']);

            this.isIdValidated = true;
          },
          (err) => {
            console.log(err);
            this.isIdValidated = false;

            this.notifierService.notify(
              "error",
              err.error.error.innererror.errordetails[0].message
            );
          }
        );
      }
    }
  }

  IDtypeValidation1(idNum) {
    let obj = this.commonValid.IDtypeValidation(
      this.requestRulingFormGroup3.value.idType,
      idNum
    );
    this.idErr1 = obj.flag;
    this.idMsg = obj.msg;
  }

  reset() {
    if (this.isIdValidated == false) {
      this.requestRulingFormGroup3.controls.idType.setValue("");
    }

    this.idErr1 = false;
    this.dobErr = false;
  }
  filterStatus() { }

  downloadAck() {
    // /sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='90000000231')/$value
    const url = `sap/opu/odata/SAP/Z_GET_ACK_LETTER_SRV/Ack_letterSet(Fbnum='${this.successData["Fbnumz"]}')/$value`;
    // const url = `${ApiConstants.getRejectedForms}/HeaderSet(Langx='${this.langX}',Gpartx='${localStorage.getItem('gpart')}',TxnTpx='${this.data['d']['TxnTpx']}',Fbustx='${this.data['d']['Fbustx']}',Fbstax='${this.data['d']['Fbstax']}',UserTypx='${this.btnData['d']['UserTyp']}',RvRsn='${this.vatReviewFormGroup2.controls.selectedReason.value}',RvSubRsn='${this.vatReviewFormGroup2.controls.selectedSubReason.value}',Fbnumx='${this.data['d']['Fbnumx']}',Sopbel='${this.data['d']['SecurityDtl'].Sopbel}',Formprocx='ZTAX_VT_REV')?$expand=RejectedFormSet`;

    // this.http.get(this.baseUrl + url, { observe: 'response' }).subscribe((res) => {
    //   this.hideLoader();

    console.log(this.baseUrl + url);
    window.open(this.baseUrl + url, "_self");
    //   // this.downloadFile()
    //   // console.log(res.headers.get());

    // }, (err) => {
    //   this.hideLoader();
    //   this.rejectedFormSetMsg = err['error']['error']['innererror']['errordetails'][0].message;
    //   this.notifierService.notify(
    //     "error",
    //     this.rejectedFormSetMsg
    //   );
    //   console.log(err);
    // });
  }

  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }

  changeLayoutType(type) {
    // type == grid or table
    this.layoutType = type;
  }

  step(stepToDisplay) {
    this.optionActive = stepToDisplay;
  }

  getControls() {
    let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
    console.log(control);
    console.log(control.value);
    return control.value;

    // console.log((this.vatReviewFormGroup3.get('doc') as FormArray).controls)
    // return (this.vatReviewFormGroup3.get('doc') as FormArray).controls;
  }

  formatBytes(x) {
    const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let l = 0,
      n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    //include a decimal point and a tenths-place digit if presenting
    //less than ten of KB or greater units
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
  }

  statusColor(status) {
    // console.log(status)
    let yellow = ["E0061", "E0052", "E0044", "E0041", "E0016", "E0015"];
    let red = ["E0051", "E0043"];
    let green = ["E0045"];
    let grey = ["E0018", "E0013"];

    if (yellow.findIndex((each) => status == each) != -1) {
      return "tag32 tag-partial";
    } else if (red.findIndex((each) => status == each) != -1) {
      return "tag32 tag-danger";
    } else if (green.findIndex((each) => status == each) != -1) {
      return "tag32 tag-success";
    } else if (grey.findIndex((each) => status == each) != -1) {
      return "tag32 tag-unsubmit";
    } else {
      return "tag32 tag-unsubmit";
    }
  }

  onSearchFocusIn() {
    console.log("focusIN");
    console.log(this.searchText.length);

    if (this.searchText.length > 0) {
      this.showSearch = false;
    } else {
      this.showSearch = true;
    }
  }

  onSearchFocusOut() {
    console.log("focusout");
    this.showSearch = true;
  }

  onSearchHover() {
    if (this.searchText.length == 0) {
      this.showSearch = true;
    } else {
      this.showSearch = false;
    }
  }

  changeStatus() {
    let reqTiles = this.listData["d"]["ASSLISTSet"]["results"];
    //get the count of Cards to be shown :
    let count = 0;
    for (let i = 0; i < reqTiles.length; i++) {
      let each = reqTiles[i];
      if (
        (each.Fbust == this.selectedStatus || this.selectedStatus == "01") &&
        each.Fbtyp == "TPEV"
      ) {
        console.log("in changed Status");
        console.log(this.selectedStatus);
        count = 1;
        break;
      }
    }

    if (count == 1) {
      this.showListHeader = true;
    } else {
      this.showListHeader = false;
    }
  }

  backTo(process): void {
    this.appSrv.updatedDataSelection9(process);
    this.router.navigate(["/mains/tax"]);
  }


  setAttachment(value) {
    let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
    for (var i = 0; i < value.length; i++) {
      control.push(
        this._formBuilder.group({
          ext: value[i]["FileExtn"].toLowerCase(),
          id: value[i].Dotyp,
          name: value[i].Filename,
          url: value[i].DocUrl,
          flag: true,
          did: value[i].Doguid,
        })
      );
    }
    console.log(control.value);
  }

  uploadFile(res, fileSize) {
    let obj = {
      name: res["d"]["Filename"],
      size: fileSize,
      id: "TPEB",
      flag: true,
      url: res["d"]["DocUrl"],
      did: res["d"]["Doguid"],
    };

    let control = <FormArray>this.requestRulingFormGroup2.controls.doc;

    control.push(this._formBuilder.group(obj));

    console.log(this.requestRulingFormGroup2.controls.doc);
  }

  uploadFiles(e) {
    let parseExt;
    this.showLoader();

    if (e[0].size == 0) {
      this.hideLoader();
      this.notifierService.notify("error", this.lang.Invalidfilesize);
      return;
    }

    let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
    const frmData = new FormData();
    let filename;
    let size;

    for (var i = 0; i < 1; i++) {
      console.log(e[i]);
      if (e[i] == undefined) {
        this.hideLoader();
        return false;
      }
      filename = e[i]["name"];
      parseExt = filename.split(".");
      const fileExt = parseExt[parseExt.length - 1].toLowerCase();
      if (filename.length > 100) {
        this.notifierService.notify("error", this.lang["fileNameLarge"]);
        this.hideLoader();

        return false;
      }

      if (
        fileExt !== "doc" &&
        fileExt !== "docx" &&
        fileExt !== "jpeg" &&
        fileExt !== "jpg" &&
        fileExt !== "pdf" &&
        fileExt !== "xls" &&
        fileExt !== "xlsx"
      ) {
        this.notifierService.notify("error", this.lang["invalidFormat"]);
        this.hideLoader();

        return false;
      }
      if (e[i]["size"] > 20971520) {
        this.notifierService.notify("error", this.lang["filesizeMessage"]);
        this.hideLoader();

        return false;
      }
      console.log(control.value);
      const fileIndex = control.value.findIndex(
        (file) => filename === file["name"]
      );
      if (fileIndex > -1) {
        this.notifierService.notify("error", this.lang["fileAlreayExists"]);
        this.hideLoader();

        return false;
      }

      size = e[i].size / 10000;
      frmData.append("fileUpload", e[i]);
    }
    console.log("res", filename, e[i]);
    console.log(control);
    // console.log(idd);

    let encodedFileName = encodeURI(parseExt[0]) + '.' + parseExt[1];
    this.requestRulingService
      .attachmentSubmit(
        this.data["d"]["ReturnIdz"],
        // control.controls[idd].value.id,
        "TPEB",
        encodedFileName,
        frmData
      )
      .subscribe(
        (res) => {
          console.log("upload", res);

          this.uploadFile(res, size);
          this.hideLoader();
          // control.controls[idd]["controls"].name.setValue(filename);

          //control.controls[idd].value.id
          // this.notifierService.notify(
          //   "success",
          //   "Successfully uploaded the file"
          // );
        },
        (err) => {
          this.hideLoader();
          this.notifierService.notify(
            "error",
            err["error"]["error"]["innererror"]["errordetails"][0].message
          );
        }
      );
  }

  deleteAttachmentFromSer(dotyp, doguid, index) {
    this.requestRulingService.deleteAttachment(dotyp, doguid).subscribe(
      (res) => {
        console.log("delete", res);
        let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
        control.removeAt(index);
      },
      (err) => {
        console.log("err in delete attachement");
      }
    );
  }


  getAttachmentCount() {
    let count = 0;
    let control = <FormArray>this.requestRulingFormGroup2.controls.doc;
    for (let i = 0; i < control.value.length; i++) {

      if (control.value[i].id == 'TPEB' || control.value[i].id.includes('TPE')) {
        count = count + 1;

      }


    }

    return count;

  }

  isPdf(fileName) {
    return false;
    // const parseExt = fileName.split(".");
    // const fileExt = parseExt[parseExt.length - 1].toLowerCase();
    // return fileExt.toLowerCase() === 'pdf';
  }


  // formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }
}
