import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { constants } from "src/app/constants/constants.model";

@Component({
  selector: "app-otherslanding",
  templateUrl: "./otherslanding.component.html",
  styleUrls: ["./otherslanding.component.css"],
})
export class OtherslandingComponent implements OnInit {
  lang;
  direction;
  clicked: boolean;
  tiles: any;
  url = "/signup";
  idd = -1;

  constructor(private router: Router) {}

  mouseover(id) {
    this.idd = id;
  }

  mouseout() {
    this.idd = -1;
  }

  ngOnInit() {

    if (localStorage.getItem("lang") === "ar") {
      this.lang =  constants.langz.arb.others;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang =  constants.langz.eng.others;
      this.direction = constants.langz.eng.dir;
    }


    this.tiles = [
      {
        tileName: this.lang.subtitle.t1,
        tileImg: "assets/icons/Chr-NonProfit_1.png",
        tileImg1: "assets/icons/Chr-NonProfit.png",
        selected: false,
        path: ["/signup/npoCharity"],
      },
      {
        tileName: this.lang.subtitle.t2,
        tileImg: "assets/icons/Companies_Group.png",
        tileImg1: "assets/icons/Companies_Group_1.png",
        selected: false,
        path: ["/signup/consortium"],
      },
      {
        tileName: this.lang.subtitle.t3,
        tileImg: "assets/icons/government.png",
        tileImg1: "assets/icons/government_1.png",
        selected: false,
        path: ["/signup/government"],
      },
      {
        tileName: this.lang.subtitle.t4,
        tileImg: "assets/icons/Inheritors.png",
        tileImg1: "assets/icons/Inheritors_1.png",
        selected: false,
        path: ["/signup/others"],
      },
      {
        tileName: this.lang.subtitle.t5,
        tileImg: "assets/icons/Real_State_Con.png",
        tileImg1: "assets/icons/Real_State_Con_1.png",
        selected: false,
        path: ["/signup/others"],
      },
      {
        tileName: this.lang.subtitle.t6,
        tileImg: "assets/icons/Investment.png",
        tileImg1: "assets/icons/Investment_1.png",
        selected: false,
        path: ["/signup/others"],
      },
      {
        tileName: this.lang.subtitle.t7,
        tileImg: "assets/icons/briefcase (1).png",
        tileImg1: "assets/icons/briefcase.png",
        selected: false,
        path: ["/signup/others"],
      },
      {
        tileName: this.lang.subtitle.t8,
        tileImg: "assets/icons/homepage (1).png",
        tileImg1: "assets/icons/homepage.png",
        selected: false,
        path: ["/signup/nonResidentCompany"],
      },
      {
        tileName: this.lang.subtitle.t9,
        tileImg: "assets/icons/ecology-and-environment (1).png",
        tileImg1: "assets/icons/ecology-and-environment.png",
        selected: false,
        path: ["/signup/naturalGas"],
      },
      {
        tileName: this.lang.subtitle.t10,
        tileImg: "assets/icons/oil (1).png",
        tileImg1: "assets/icons/oil.png",
        selected: false,
        path: ["/signup/oilHydrocarbon"],
      },
      {
        tileName: this.lang.subtitle.t11,
        tileImg: "assets/icons/budget.png",
        tileImg1: "assets/icons/budget (1).png",
        selected: false,
        path: ["/signup/auditor"],
      },
      {
        tileName: this.lang.subtitle.t12,
        tileImg: "assets/icons/Non Regular TP-G.png",
        tileImg1: "assets/icons/Non Regular TP-W.png",
        selected: false,

        path: ["/signup/nonRegTP"],
      },
      {
        tileName: this.lang.subtitle.t13,
        tileImg: "assets/icons/vote (1).png",
        tileImg1: "assets/icons/vote.png",
        selected: false,
        path: ["/signup/vatEligiblePerson"],
      },
    ];
  }

  selectedTab(i) {
    this.tiles.filter((i) => (i.selected = false));
    this.tiles[i].selected = true;
  }

  navigate() {
    for (var i in this.tiles) {
      if (this.tiles[i].selected) {
        this.router.navigate(this.tiles[i].path);
      }
    }
  }
}
