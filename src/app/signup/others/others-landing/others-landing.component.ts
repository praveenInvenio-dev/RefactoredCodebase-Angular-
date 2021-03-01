import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/constants/constants.model';

@Component({
  selector: 'app-others-landing',
  templateUrl: './others-landing.component.html',
  styleUrls: ['./others-landing.component.css'],
})
export class OthersLandingComponent implements OnInit {

  lang = constants.langz.eng.others;
  direction = constants.langz.eng.dir;
  clicked: boolean;
  tiles: any;

  constructor(private router: Router,) {}

  ngOnInit() {

    this.tiles= [
      {
        tileName: this.lang.subtitle.t1,
        tileImg: "assets/images/charity.png",
        selected: false,
        path: ["/signup/npoCharity"]
      },
      {
        tileName: this.lang.subtitle.t2,
        tileImg: "assets/images/consortium.png",
        selected: false,
        path: ["/signup/others/consortium"]
      },
      {
        tileName: this.lang.subtitle.t3,
        tileImg: "assets/images/govt.png",
        selected: false,
        path: ["/signup/government"]
      },
      {
        tileName: this.lang.subtitle.t4,
        tileImg: "assets/images/inheritors.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t5,
        tileImg: "assets/images/realEstate.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t6,
        tileImg: "assets/images/investment.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t7,
        tileImg: "assets/images/freelance.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t8,
        tileImg: "assets/images/nrcompany.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t9,
        tileImg: "assets/images/naturalgas.png",
        selected: false,
        path: ["/signup/others/naturalGas"]
      },
      {
        tileName: this.lang.subtitle.t10,
        tileImg: "assets/images/oilhydrocarbon.png",
        selected: false,
        path: ["/signup/others/oilHydrocarbon"]
      },
      {
        tileName: this.lang.subtitle.t11,
        tileImg: "assets/images/auditor.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t12,
        tileImg: "assets/images/nrtp.png",
        selected: false,
        path: ["/signup/others"]
      },
      {
        tileName: this.lang.subtitle.t13,
        tileImg: "assets/images/eteligible.png",
        selected: false,
        path: ["/signup/others"]
      }
    ]
    }

    selectedTab(i) {
      this.tiles.filter( i => i.selected = false);
      this.tiles[i].selected = true;
    }

    navigate() {
      for (var i in this.tiles) {
        if(this.tiles[i].selected) {
          this.router.navigate(this.tiles[i].path);
        }
      }
    }

  }


