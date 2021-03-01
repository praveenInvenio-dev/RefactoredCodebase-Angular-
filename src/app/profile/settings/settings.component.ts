import { Component, OnInit } from "@angular/core";
import { constants } from "src/app/constants/constants.model";
import { VATConstants } from "src/app/constants/VATConstants";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  //Declare Varibales
  lang: any;
  dir: string;
  selectedLang;

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar") {
      this.selectedLang = "1";
      this.dir = constants.langz.arb.dir;
      this.lang = constants.langz.arb.Settings;
    } else {
      this.selectedLang = "2";
      this.dir = constants.langz.eng.dir;
      this.lang = constants.langz.eng.Settings;
    }
  }

  changeLang(id) {
    this.selectedLang = id;
    if (this.selectedLang === "1") {
      localStorage.setItem("lang", "ar");
      location.reload();
    } else {
      localStorage.setItem("lang", "en");
      location.reload();
    }
  }
}
