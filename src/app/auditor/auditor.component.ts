import { Component, OnInit } from "@angular/core";
import { AuditorService } from "./auditor.service";

@Component({
  selector: "app-auditor",
  templateUrl: "./auditor.component.html",
  styleUrls: ["./auditor.component.css"],
})
export class AuditorComponent implements OnInit {
  GPart: string;
  Direction: string;
  Language: string;

  constructor(private auditorService: AuditorService) {
    if (localStorage.getItem("lang") === "ar") {
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.Direction = "ltr";
      this.Language = "E";
    }
  }

  ngOnInit() {
    // this.auditorService.getAuditorDashboard().subscribe(data => {
    //   console.log('auditor-res', data);
    // }, (error) => {
    //   console.log('auditor-err', error);
    // })
  }
}
