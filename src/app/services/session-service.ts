import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  lang: string;
  baseUrl = environment.url;
  private sessionEventSubject = new BehaviorSubject<any>("");
  sessionEvent = this.sessionEventSubject.asObservable();
  interval: any = null;
  idleTimeout: number = 32; // default minutes 30 mins +2 mins waiting
  waitingTime: number = 2;
  logouturl = environment.logouturl;
  timeLeft: number = 120;
  sessionExpired: boolean = true;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }
  ngOnInit() {
    console.log("SessionService ngOnInit");
    this.idleTimeout = environment.idleTimeOut || 32;
    this.waitingTime = environment.waitingTme || 2;
  }

  startSession() {
    console.log("startSession");
    this.idleTimeout = environment.idleTimeOut || 32;
    this.waitingTime = environment.waitingTme || 2;
    console.log(this.idleTimeout, this.waitingTime);
    this.setSession();
    this.stopTimer();
    this.startTimer();
  }

  validateSession() {}

  getSessionEvent() {
    return this.sessionEvent;
  }

  stayConnected() {
    this.stopTimer();
    return this.http
      .get(
        this.baseUrl +
          "sap/opu/odata/SAP/ZDP_EP_USER_ANG_SRV/EP_USERSet(Gpart='1234567890')"
      )
      .subscribe(
        (response) => {
          this.startTimer();
        },
        (error) => {
          this.startTimer();
        }
      );
  }

  logOut() {
    localStorage.clear();
    this.cookieService.removeAll();
    this.stopTimer();
    if (localStorage.getItem("lang") === "rtl")
      this.logouturl = this.logouturl.replace("=en&", "=ar&");
    window.location.replace(this.logouturl);
  }

  startTimer() {
    //for testing in localhost as cookies are not being set on localhost
    // let mm = moment(new Date()).add(2, 'minutes').toDate();
    // this.cookieService.put("gazt_a_session", mm.getTime().toString());
    ////////////////////////////////////////////////////////////////////
    //console.log("startTimer");
    this.timeLeft = 120;
    this.interval = setInterval(() => {
      let time = this.cookieService.get("gazt_a_session");
      //console.log("time", time);
      if (time) {
        let lastActiveTime = moment(new Date(Number(time)));
        let currentTime = moment(new Date());
        let durationDiff = moment.duration(currentTime.diff(lastActiveTime));
        let mins = durationDiff.asMinutes() || 1;
        //console.log(mins, this.idleTimeout);
        if (mins >= this.idleTimeout - 2 && mins < this.idleTimeout) {
          this.timeLeft--;
          this.sessionEventSubject.next({
            event_name: "session_expiring",
            timeLeft: this.timeLeft,
          });
        } else if (mins > this.idleTimeout) {
          // this.sessionEventSubject.next("session_expired");
          this.logOut();
        }
      } else {
        console.log("no Time");
        // added to skip local environment
        if (environment.env != "localhost") {
          this.logOut();
        }
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setSession() {
    //this will be called on every service call finalize in auth interceptor and on start of the session
    this.cookieService.put("gazt_a_session", new Date().getTime().toString());
  }

  refreshSession() {
    if (!this.isSessionExpired()) {
      this.setSession();
    }
  }

  isSessionExpired() {
    let time = this.cookieService.get("gazt_a_session");
    if (environment.env == "localhost") {
      this.stopTimer();
      this.startSession();
      console.log("localhost Settng Session");
      return false;
    } else if (time) {
      let lastActiveTime = moment(new Date(Number(time)));
      let currentTime = moment(new Date());
      let durationDiff = moment.duration(currentTime.diff(lastActiveTime));
      let mins = durationDiff.asMinutes() || 1;
      if (mins > this.idleTimeout) {
        return true;
        //this.logOut();
      }
    } else {
      console.log("isSessionExpired No Time");
      return true;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
