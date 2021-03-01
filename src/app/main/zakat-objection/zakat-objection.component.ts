import { Component, OnInit } from "@angular/core";
import { ZakatObjectionConstants } from "src/app/constants/ZakatObjectionConstants";

@Component({
  selector: "app-zakat-objection",
  templateUrl: "./zakat-objection.component.html",
  styleUrls: [
    "./zakat-objection.component.css",
    "../new-zakat-objection/new-zakat-objection.component.css",
  ],
})
export class ZakatObjectionComponent implements OnInit {
  lang = ZakatObjectionConstants["en"];
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar")
      this.lang = ZakatObjectionConstants["ar"];
  }

  onSubmit() {}
}
