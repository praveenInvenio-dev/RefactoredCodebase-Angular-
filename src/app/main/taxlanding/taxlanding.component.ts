import { DashboardService } from "./../../services/dashboard-service";
import { VatServiceService } from "./../../services/vat-service.service";
import { Component, OnInit } from "@angular/core";
import { constants } from "src/app/constants/constants.model";
import { ExciseServiceService } from "src/app/services/excise-service.service";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-taxlanding",
  templateUrl: "./taxlanding.component.html",
  styleUrls: ["./taxlanding.component.css"],
})
export class TaxlandingComponent implements OnInit {
  gPart: string;
  flag: boolean;
  vatFlag: boolean;
  lang: any;
  dir: string;
  data: any;
  listDashboard = [];
  generalTiles = [];
  img: string;
  secondSet: boolean;
  name = [];
  icn: string;
  listDashboard1 = [];
  sublistDashboard = [];
  name2 = "";
  showVatElg: boolean = false;
  showVat: boolean = false;
  showExcise: boolean = false;
  showZakat: boolean = false;
  subTileNumber: any;

  constructor(
    private exciseService: ExciseServiceService,
    private vatservice: VatServiceService,
    private dashboardSrv: DashboardService,
    private appServ: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gPart = localStorage.getItem("gpart");

    if (localStorage.getItem("lang") === "ar") {
      this.img = "assets/image/circle-arrow-right-copy-18.svg";
      this.icn = "keyboard_arrow_left";
      this.lang = constants.langz.arb.taxLanding;
      this.dir = constants.langz.arb.dir;
    } else {
      this.icn = "keyboard_arrow_right";
      this.img = "assets/image/arrow-right.svg";
      this.lang = constants.langz.eng.taxLanding;
      this.dir = constants.langz.eng.dir;
    }

    // this.getETData();
    // this.getVATData();

    this.getTaxData();
    this.appServ.data11.subscribe((res) => {
      
      this.subTileNumber = res;
      //this.setmenu2()
    });
    this.appServ.data9.subscribe((res) => {
      this.setMenu(res);
    });




    // this.showTile2("01", this.lang.c1);
    // this.subTileNumber="13";
    // this.setmenu2();


    // setTimeout(() => {
    //   this.subTileNumber="13";
    //   this.setmenu2();
    // }, 1000);

this.appServ.cancelConsolidateStep2.subscribe(data=>{
  if(data)
  {
    this.secondSet=true;
    this.setMenu("003");
  }
});

this.appServ.cancelConsolidateStep3.subscribe(data=>{
  if(data)
  {
    this.secondSet=true;
    this.subTileNumber="24";
    this.setMenu("003");
  }
});




  }

  setmenu2(){
    console.log(this.listDashboard1);
    if (this.subTileNumber !== "") {
      let obj =  this.listDashboard1.filter(
        (x) => x.Tileno === this.subTileNumber
      );
      this.showTile3(obj[0]);
      console.log("setmenu2",obj)
    }
  }
  setMenu(res: any) {
    if (this.subTileNumber !== "") {
      let obj =  this.listDashboard.filter(
        (x) => x.Tileno === this.subTileNumber
      );
      this.showTile3(obj);
      console.log("setmenu",obj)
    }
    
    if (res === "001") {
      this.showTile2("02", this.lang.c2);
      this.setmenu2();
      //this.appServ.updatedDataSelection9("");
    }
    if (res === "002") {
      this.showTile2("03", this.lang.c3);
      this.setmenu2();
    }
    if (res === "003") {
      this.showTile2("01", this.lang.c1);
      this.setmenu2();
    }
    if (res === "004") {
      this.showTile2("04", this.lang.c5);
      this.setmenu2();
    }
    if (res === "005") {
      this.showTile2("05", this.lang.c4);
      this.setmenu2();
    }

  }

  getTaxData() {
    this.dashboardSrv.getDashboardData$().subscribe((data: any) => {
      console.log("Dashboard Data :: ", data);
      this.data = data["d"];
      this.listDashboard = data["d"]["MainTileSet"]["results"];
      let dataa = [];
      this.data.MainTileSet.results.forEach((element) => {});

      this.listDashboard1 = data["d"]["MainTileSet"]["results"];

      this.listDashboard1.forEach((ele) => {
        if (ele.AngUrl === "") {
          ele.AngUrl = "/mains/tax";
        }
        //ele.Applink = "/mains/tax";
        if (ele.Tileno === "07") {
          ele.ScreenSection = "03";
          ele.AngUrl = "/mains/excise";
        }
        if (ele.Tileno === "03") {
          ele.ScreenSection = "02";
          ele.AngUrl = "/mains/newvat";
        }

        if (ele.Tileno === "28") {
          //   ele.ScreenSection = "02";
          ele.AngUrl = "/mains/tax";
        }
        //Removing this code as per the call with niranjana and hani
        // if (ele.Tileno === "61") {
        //   //   ele.ScreenSection = "02";
        //   ele.AngUrl = "/mains/tax";
        // }

        if (ele.Tileno === "05") {
          // ele.ScreenSection = "07";
          ele.AngUrl = "/mains/tax";
        }

        if (ele.Tileno === "04") {
          ele.ScreenSection = "04";
          ele.AngUrl = "/mains/tax";
        }
      });

      console.log("this.listDashboard1",this.listDashboard1)

      this.listDashboard = this.listDashboard1;
      this.sublistDashboard = data["d"]["SubTileSet"]["results"];
      this.generalTiles = [];
      this.listDashboard.forEach((element) => {
        if (element.AngUrl === "") {
          element.AngUrl = "/mains/tax";
        }

        if (element.ScreenSection === "00") this.generalTiles.push(element);

        // if (element.ScreenSection === "02") console.log(element);
        if (element.Tileno === "07") {
          element.ScreenSection = "03";
          element.AngUrl = "/mains/excise";
        }
        if (element.Tileno === "03") {
          element.ScreenSection = "02";
          element.AngUrl = "/mains/newvat";
        }

        if (element.ScreenSection === "04") {
          this.showVatElg = true;
        }

        if (element.ScreenSection === "02") {
          this.showVat = true;
        }

        if (element.ScreenSection === "03") {
          this.showExcise = true;
        }

        if (element.ScreenSection === "01") {
          this.showZakat = true;
        }

        if (element.ScreenSection === "04") {
          this.showVatElg = true;
        }
      });
      this.sublistDashboard.forEach((ele) => {});
      this.generalTiles = this.generalTiles.filter((x) => x.Tileno !== "05");
      console.log("this.listDashboard1", this.listDashboard);
    });
    
  }

  getETData() {
    this.exciseService.getETData(this.gPart).subscribe(
      (res) => {
        console.log(res);
        if (res["d"]["Statusz"] === "E0045") this.flag = true;
      },
      (err) => {}
    );
  }

  getVATData() {
    this.vatservice.getVatData().subscribe(
      (res) => {
        console.log("VAT", res);
        if (res["d"]["Statusz"] === "E0045") this.vatFlag = true;
      },
      (err) => {}
    );
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

  showTile2(scrSec, val) {
    let obj = {
      source: "",
      val: "",
      id: "",
      scrn: "",
    };
    this.listDashboard = this.listDashboard1;
    this.listDashboard = this.listDashboard.filter(
      (x) => x.ScreenSection === scrSec
    );

    this.listDashboard.length > 0
      ? (this.secondSet = true)
      : (this.secondSet = true);

    this.listDashboard.forEach((ele) => {
      ele["list"] = "main";
    });

    this.listDashboard.length > 0
      ? (this.secondSet = true)
      : (this.secondSet = true);

    if (this.listDashboard.length > 0) {
      obj.source = this.listDashboard[0]["list"];
      obj.val = val;
      obj.id = this.listDashboard[0]["Tileno"];
      obj.scrn = this.listDashboard[0]["ScreenSection"];
      this.name.push(obj);
    }

    console.log("showTile2",this.listDashboard)
  }

  showTile3(tile) {
    console.log("tile",tile);
    var obj = {
      source: "",
      val: "",
      id: "",
      scrn: "",
    };

    //item.Tileno, item.Tilenm,item
    //this.name.push(val);
    //this.listDashboard = this.sublistDashboard;
    let subLists = this.sublistDashboard.filter(
      (x) => x.UTileno === tile.Tileno
    );
    if (subLists.length > 0) this.secondSet = true;
    console.log("subLists", subLists);
    console.log("scrSec", tile.Tileno);
    console.log("val", tile.Tilenm);
    if (subLists.length > 0) {
      this.listDashboard = subLists;
      this.listDashboard.forEach((ele) => {
        if (ele.AngUrl === "") {
          ele.AngUrl = "/mains/tax";
        }
        ele["Tilenm"] = ele["Appnm"];
        ele["list"] = "sub";
      });
      obj.source = this.listDashboard[0]["list"];
      obj.val = tile.Tilenm;
      obj.id = this.listDashboard[0]["UTileno"];
      this.name.push(obj);
      this.appServ.updatedDataSelection11('');
    } else if (tile.AngUrl) {
      this.router.navigate([tile.AngUrl]);
    }
    console.log("showTile3",this.listDashboard)
  }

  back2(){
    this.secondSet = false;
    this.getTaxData();  
  }

  back() {
    this.name.splice(this.name.length - 1, 1);
    this.name2 = "";

    if (this.name.length === 0) {
      this.secondSet = false;
      this.getTaxData();
    } else {
      if (this.name.length > 1) {
        for (var i = 1; i <= this.name.length; i++) {
          //item.Tileno, item.Tilenm,item
          let tile = {
            Tileno: this.name[i].id,
            Tilenm: this.name[i - 1].val,
          };
          if (this.name[i].source === "main") {
            this.showTile3(tile);
          } else {
            this.showTile3(tile);
          }
        }
      } else {
        if (this.name[0].source === "main") {
          //  this.showTile2(this.name[0].scrn, this.name[0].val);
          this.listDashboard = this.listDashboard1;
          this.listDashboard = this.listDashboard.filter(
            (x) => x.ScreenSection === this.name[0].scrn
          );
        } else {
          this.secondSet = false;
          this.getTaxData();
        }

        console.log("back",this.listDashboard)
      }
    }
  }
}
