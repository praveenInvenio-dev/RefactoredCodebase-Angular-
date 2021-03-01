import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AppService } from "src/app/app.service";
import { constants } from "src/app/constants/constants.model";
import { ProfileConstants } from "src/app/constants/profileConstants";
import { DashboardService } from "src/app/services/dashboard-service";
import { ProfileService } from "src/app/services/profile.service";
import { environment } from "src/environments/environment";

declare var $: any;
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  codes;
  lang;
  selectedCC;
  phNo = "";
  img: string;
  dir: string;
  pocDetails;

  pocFormSubmitted: boolean;

  profileObject: any;

  pocForm: FormGroup;
  TPPOC;

  namePattern = "^[a-zA-Z\u0600-\u06FF ][sa-zA-Z\u0600-\u06FF ]*$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  mobPattern = "^[5][0-9]*$";
  setMobPatternError: boolean;
  action: string;
  lastAccessedDate: any;
  lastLoginTime: any;
  data: any;
  baseUrl = environment.url;
  pocIndex: any;

  constructor(
    public appSrv: AppService,
    private profileSrv: ProfileService,
    public notifierService: NotifierService,
    private fb: FormBuilder,
    private dashboardSrv: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardSrv.getDashboardData$().subscribe((data: any) => {
      console.log("Dashboard Data :: ", data);
      this.data = data["d"];
    });

    if (localStorage.getItem("lang") === "ar") {
      this.img = "assets/image/circle-arrow-right-copy-18.svg";
      this.lang = constants.langz.arb.profile;
      this.dir = constants.langz.arb.dir;
    } else {
      this.img = "assets/image/arrow-right.svg";
      this.lang = constants.langz.eng.profile;
      this.dir = constants.langz.eng.dir;
    }

    this.appSrv.getPhoneCode().subscribe((res) => {
      console.log(res);
      this.codes = res["d"]["results"];
      this.selectedCC = this.codes.find((c) => c.Telefto == 966);
      console.log(this.selectedCC);
    });

    this.profileSrv.getprofileDetails().subscribe((res) => {
      console.log("Profile Details", res);
      this.profileObject = res["d"];
      localStorage.setItem("email", this.profileObject["Email"]);
      this.pocDetails = res["d"]["TPOC_DataSet"]["results"];

      this.lastAccessedDate =
        res["d"]["Logdate"] !== null
          ? new Date(
              parseInt(
                res["d"]["Logdate"].substring(6, res["d"]["Logdate"].length - 2)
              )
            )
          : "";

      this.lastLoginTime =
        res["d"]["Logtime"].substr(2, 2) +
        ":" +
        res["d"]["Logtime"].substr(5, 2);
    });

    this.pocForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(this.namePattern)]],
      position: [
        "",
        [Validators.required, Validators.pattern(this.namePattern)],
      ],
      cc: [null],
      phNo: [
        "",
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(this.mobPattern),
        ],
      ],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      ext: [""],
    });

    this.pocForm.get("phNo").valueChanges.subscribe((query) => {
      console.log(query);
      // this.validateibn(query);
      if (query !== null && query.substr(0, 1) != 5) {
        this.setMobPatternError = true;
      } else {
        this.setMobPatternError = false;
      }
    });
  }

  get pocF() {
    return this.pocForm.controls;
  }

  openPOCPopup() {
    this.action = "ADD";
    this.pocFormSubmitted = false;
    if (this.profileObject["TPOC_DataSet"]["results"].length < 2) {
      this.pocForm.reset();
      this.pocForm.get("cc").setValue(this.selectedCC["Telefto"]);
      this.clearFormValues();
      $("#openPOCPopup").modal("show");
    }
    if (this.profileObject["TPOC_DataSet"]["results"].length == 2) {
      this.notifierService.notify("error", this.lang.errMsgs.e1);
    }
  }

  editPOCPopup(item) {
    this.action = "UPDATE";
    this.pocForm.get("name").setValue(item["NamePoc"]);
    this.pocForm.get("cc").setValue(item["MobileNo"].substr(2, 3));
    this.pocForm.get("phNo").setValue(item["MobileNo"].substring(5));
    this.pocForm.get("email").setValue(item["SmtpAddr"]);
    this.pocForm.get("ext").setValue(item["TelExtens"]);
    this.pocForm.get("position").setValue(item["ZdesPoc"]);
    this.TPPOC = JSON.parse(JSON.stringify(ProfileConstants.TPOC_DataSet));
    this.TPPOC["TPOC_DataSet"]["results"][0]["DataVersion"] =
      item["DataVersion"];
    $("#openPOCPopup").modal("show");
  }

  onChange(val) {
    console.log(val);
    this.phNo = val;
  }

  addpoc(form) {
    this.pocFormSubmitted = true;
    if (this.pocForm.invalid) {
      return;
    }
    let TPOC = JSON.parse(JSON.stringify(ProfileConstants.TPOC_DataSet));
    TPOC["Taxpayer"] = localStorage.getItem("gpart");
    TPOC["TPOC_DataSet"]["results"][0]["Action"] = "S";
    TPOC["TPOC_DataSet"]["results"][0]["MobileNo"] =
      "00" + this.pocForm.value.cc + this.pocForm.value.phNo;
    TPOC["TPOC_DataSet"]["results"][0]["NamePoc"] = this.pocForm.value.name;
    TPOC["TPOC_DataSet"]["results"][0]["SmtpAddr"] = this.pocForm.value.email;
    TPOC["TPOC_DataSet"]["results"][0]["Taxpayer"] = localStorage.getItem(
      "gpart"
    );
    if (this.pocForm.value.ext == null) {
      TPOC["TPOC_DataSet"]["results"][0]["TelExtens"] = "";
    } else {
      TPOC["TPOC_DataSet"]["results"][0]["TelExtens"] = this.pocForm.value.ext;
    }
    TPOC["TPOC_DataSet"]["results"][0]["ZdesPoc"] = this.pocForm.value.position;

    this.profileSrv.addDelPOC(TPOC).subscribe((res) => {
      console.log(res);
      this.profileSrv.getprofileDetails().subscribe((res) => {
        console.log("Profile Details", res);
        this.profileObject = res["d"];
        form.resetForm();
        $("#openPOCPopup").modal("hide");
      });
    });
  }

  editpoc(form) {
    this.pocFormSubmitted = true;
    if (this.pocForm.invalid) {
      return;
    }
    this.TPPOC["Taxpayer"] = localStorage.getItem("gpart");
    this.TPPOC["TPOC_DataSet"]["results"][0]["Action"] = "S";
    this.TPPOC["TPOC_DataSet"]["results"][0]["MobileNo"] =
      "00" + this.pocForm.value.cc + this.pocForm.value.phNo;
    this.TPPOC["TPOC_DataSet"]["results"][0][
      "NamePoc"
    ] = this.pocForm.value.name;
    this.TPPOC["TPOC_DataSet"]["results"][0][
      "SmtpAddr"
    ] = this.pocForm.value.email;
    this.TPPOC["TPOC_DataSet"]["results"][0]["Taxpayer"] = localStorage.getItem(
      "gpart"
    );
    if (this.pocForm.value.ext == null) {
      this.TPPOC["TPOC_DataSet"]["results"][0]["TelExtens"] = "";
    } else {
      this.TPPOC["TPOC_DataSet"]["results"][0][
        "TelExtens"
      ] = this.pocForm.value.ext;
    }
    this.TPPOC["TPOC_DataSet"]["results"][0][
      "ZdesPoc"
    ] = this.pocForm.value.position;

    this.profileSrv.addDelPOC(this.TPPOC).subscribe((res) => {
      console.log(res);
      this.profileSrv.getprofileDetails().subscribe((res) => {
        console.log("Profile Details", res);
        this.profileObject = res["d"];
        form.resetForm();
        $("#openPOCPopup").modal("hide");
      });
    });
  }

  delete(i) {
    console.log(i);
    this.profileObject["TPOC_DataSet"]["results"].forEach(
      (ele) => (ele["Action"] = "S")
    );
    this.profileObject["TPOC_DataSet"]["results"][i]["Action"] = "D";

    let TPOC = JSON.parse(JSON.stringify(ProfileConstants.TPOC_DataSet));
    TPOC["Taxpayer"] = localStorage.getItem("gpart");
    TPOC["TPOC_DataSet"]["results"] = this.profileObject["TPOC_DataSet"][
      "results"
    ];

    this.profileSrv.addDelPOC(TPOC).subscribe((res) => {
      console.log(res);
      this.profileSrv.getprofileDetails().subscribe((res) => {
        console.log("Profile Details", res);
        this.profileObject = res["d"];
        $("#openPOCPopup").modal("hide");
      });
    });
  }

  deletePOC(i) {
    if (this.profileObject["TPOC_DataSet"]["results"].length < 2) {
      this.notifierService.notify("error", this.lang.errMsgs.e9);
      return;
    }
    $("#deletePoc").modal("show");
    this.pocIndex = i;
  }

  clearFormValues() {
    for (var i in this.pocForm.value) {
      if (this.pocForm.value[i] == null) {
        this.pocForm.value[i] = "";
      }
    }
  }

  showTile(scrSec, tileNo) {
    if (this.data) {
      return (
        this.data["MainTileSet"]["results"].filter(
          (t) => t["ScreenSection"] === scrSec && t["Tileno"] === tileNo
        ).length > 0
      );
    }
  }

  navigate() {
    if (this.showTile("04", "47")) {
      console.log("VAT ELIGIBLE");
      // sap/bc/ui5_ui5/sap/zdu_eprg_reg/index.html?sap-client=val1&sap-ui-language=val2&uPar1=val3&tMail=val4&uPar8=&Euser=val5&fGUID=val6&tSys=val7&TxnTp=CHG_VTEP
      let tSys = this.data["Protocol"] + "://" + this.data["SystemName"];
      if (this.data["PortNo"] !== "") {
        tSys += ":" + this.data["PortNo"];
      }
      let url =
        this.baseUrl +
        ProfileConstants.externalURLs["vatEligible"]
          .replace("val1", this.data["Client"])
          .replace("val2", this.data["Lang"])
          .replace("val3", this.data["Bpnum"])
          .replace("val4", this.data["Zuser"])
          .replace("val5", this.data["Euser"])
          .replace("val6", this.data["Fbguid"])
          .replace("val7", tSys);
      window.location.href = url;
    } else {
      this.router.navigate(["/mains/regDetails"]);
    }
  }

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    var key = x.keyCode || x.which;
    key = String.fromCharCode(key);
    var regex = /^[:digit:]/;
    if ((x >= 48 && x <= 57) || regex.test(key)) return true;
    else return false;
  }

  allowAlphabets(e) {
    var x = e.which || e.keycode;
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex;
    // regex = /[دجحخ هعغفقثصضذطكمنتالبيسشظزوةىلارؤءئإلإلأأ؟آلآ]|\.|\s/;
    regex = /^[a-zA-Z\u0600-\u06FF ][\sa-zA-Z\u0600-\u06FF ]*$/;
    if (
      (x >= 65 && x <= 90) ||
      x == 32 ||
      (x >= 97 && x <= 122) ||
      regex.test(key)
    )
      return true;
    else return false;
  }

  isEnglish(text) {
    var eng = /^[a-zA-Z]/;
    return eng.test(text);
  }
}
