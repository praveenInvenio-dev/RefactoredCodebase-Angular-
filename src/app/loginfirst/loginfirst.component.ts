import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-loginfirst",
  templateUrl: "./loginfirst.component.html",
  styleUrls: ["./loginfirst.component.css"],
})
export class LoginfirstComponent implements OnInit {
  loginurl = environment.loginurl;
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") !== null) {
      if (localStorage.getItem("lang") === "ar") {
        this.loginurl = this.loginurl + "ar&login=angular";
      } else {
        this.loginurl = this.loginurl + "en&login=angular";
      }
    } else {
      this.loginurl = this.loginurl + "en&login=angular";
    }

    window.open(this.loginurl, "_self");
  }
}
