import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ThrowStmt } from "@angular/compiler";
import { Title } from "@angular/platform-browser";
import { SessionService } from './services/session-service';
import { NavigationEnd, NavigationStart, Router } from "@angular/router";

declare var jQuery: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "newApp";
  pathString: string;
  show: boolean = false;
  direction: string = "ltr";
  timeLeft: number = 120;
  langLables: any = {
    "data": {
      "title": "Alert",
      "message": "To keep your information confidential, you will be automatically be logged out of the system for no activity after ",
      "timeLabelMinutes": "minutes.",
      "timeLabelSeconds": "seconds.",
      "stayConnected": "Stay Connected",
      "disconnectBtn": "Log out"
    },

    "en": {
      "title": "Alert",
      "message": "To keep your information confidential, you will be automatically be logged out of the system for no activity after ",
      "timeLabelMinutes": "minutes.",
      "timeLabelSeconds": "seconds.",
      "stayConnected": "Stay Connected",
      "disconnectBtn": "Log out"
    },
    "ar": {
      "title": "تنبيه",
      "message": " حفاظا على سرية معلوماتك ، سيتم تسجيل خروجك من النظام بشكل تلقائي لعدم وجود أي نشاط بعد ",
      "timeLabelMinutes": ".دقائق",
      "timeLabelSeconds": ".ثواني",
      "stayConnected": "البقاء متصلآ",
      "disconnectBtn": "تسجيل خروج"
    }
  };
  constructor(location: Location, private titleService: Title, private sessionService: SessionService, private router: Router) {
    this.pathString = location.path();
    localStorage.getItem("lang") === "ar"
      ? this.titleService.setTitle(" الهيئة العامة للزكاة والدخل ")
      : this.titleService.setTitle("General Authority of Zakat and Tax");
    if (localStorage.getItem("lang") === "ar") {
      this.direction = "rtl";
      this.langLables.data = this.langLables.ar;
    } else {
      this.direction = "ltr";
      this.langLables.data = this.langLables.en;
    }

    router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {

      }
      if (event instanceof NavigationEnd) {
        console.log("event.url", event.url);
        if (event.url.includes('/mains')) {
          if (this.sessionService.isSessionExpired()) {
            this.sessionService.logOut();
          }
        } else if (event.url.includes('/signup') || event.url.includes('/forgotUNameOrPwd')) {
          this.sessionService.startSession();
        }
        if (localStorage.getItem("lang") === "ar") {
          this.direction = "rtl";
          this.langLables.data = this.langLables.ar;
        } else {
          this.direction = "ltr";
          this.langLables.data = this.langLables.en;
        }
      }
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

  }
  ngOnInit() {

    jQuery("#sessionExpiryModal").on('hidden.bs.modal', function (e) {
      console.log("hidden event",jQuery('.modal:visible').length);
      if (jQuery('.modal:visible').length) {
        jQuery('body').addClass('modal-open');
      }
    });
    //this.sessionService.startSession();
    this.sessionService.getSessionEvent().subscribe((sessionEvent: any) => {
      console.log("sessionEvent", sessionEvent);
      if (sessionEvent.event_name == "session_expiring") {
        this.timeLeft = +sessionEvent.timeLeft;
        jQuery("#sessionExpiryModal").modal("show");
      }
    });
  }

  stayConnected() {
    jQuery("#sessionExpiryModal").modal("hide");
    this.sessionService.stayConnected();
    // if (jQuery('.modal:visible').length) {
    //   jQuery('body').addClass('modal-open');
    // }
  }

  disconnect() {
    jQuery("#sessionExpiryModal").modal("hide");
    this.sessionService.logOut();
    // if (jQuery('.modal:visible').length) {
    //   jQuery('body').addClass('modal-open');
    // }
  }

  checkk() {
    if (this.pathString === "/login" || this.pathString === "/otp") {
      this.show = false;
    } else {
      this.show = true;
    }
  }
}
