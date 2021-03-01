import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { SessionService } from "../services/session-service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  directionz: any;
  url;
  direction: string;
  samlLoginUrl = environment.samlLoginUrl;
  constructor(
    private router: Router,
    private routers: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.directionz = this.routers.snapshot.queryParamMap.get("lang");
    if (this.directionz != null) localStorage.setItem("lang", this.directionz);
    console.log("LoginComponent");
    this.sessionService.startSession();
    //this.router.navigate(["first"]);
    //http://tsteradang1.mygazt.gov.sa:8080/saml/login
    window.open(this.samlLoginUrl, "_self");
  }
}
