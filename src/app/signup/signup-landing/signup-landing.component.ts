import { Component, OnInit } from "@angular/core";
import { constants } from "src/app/constants/constants.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-signup-landing",
  templateUrl: "./signup-landing.component.html",
  styleUrls: ["./signup-landing.component.css"],
})
export class SignupLandingComponent implements OnInit {
  lang;
  direction;
  directionz: any;
  url = "/login";
  idd: any;
  img: string;
  img3: string;
  img2: string;
  img1: string;
  constructor(private routers: ActivatedRoute) {}

  mouseover(id) {
    this.idd = id;
    if (id === 1) {
      this.img = "assets/images/Company_1.png";
    }
    if (id === 2) {
      this.img1 = "assets/images/Establishment_1.png";
    }
    if (id === 3) {
      this.img2 = "assets/images/Individual_1.png";
    }
    if (id === 4) {
      this.img3 = "assets/images/Other_1.png";
    }
  }
  mouseout() {
    this.idd = 0;
    this.img1 = "assets/images/establishment.png";
    this.img = "assets/images/company.png";
    this.img3 = "assets/images/other.png";
    this.img2 = "assets/images/individual.png";
  }
  ngOnInit(): void {
    this.img1 = "assets/images/establishment.png";
    this.img = "assets/images/company.png";
    this.img3 = "assets/images/other.png";
    this.img2 = "assets/images/individual.png";
    this.directionz = this.routers.snapshot.queryParamMap.get("lang");
    if (this.directionz != null) {
      localStorage.setItem("lang", this.directionz);
    }
    if (localStorage.getItem("lang") === "ar") {
      this.lang =  constants.langz.arb.signup;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang =  constants.langz.eng.signup;
      this.direction = constants.langz.eng.dir;
    }
  }
}
