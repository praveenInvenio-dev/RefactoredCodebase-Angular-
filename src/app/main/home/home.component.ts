import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { AppService } from "src/app/app.service";
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  expnd: boolean = false;
  pathString: any;
  routerUrl: any;
  menu: any[];
  direction = "ltr";
  show = false;
  directionz: any;
  name: any;
  url: any;

  baseUrl = environment.url;
  sapclient = environment.sapclient;
  loginurl=environment.loginurl;
  logouturl=environment.logouturl;
  constructor(
    private router: Router,
    public appservice: AppService,
    private routers: ActivatedRoute,
    public location: Location,
    public sanitizer: DomSanitizer,
  ) {
    let count = 0
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.getData();
    }
    });
    // this.pathString = location.path();
    // console.log("appComponent: pathString...");
    // console.log(this.pathString);
  }

  reD() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  ngOnInit(): void {
    this.url= this.sanitizer.bypassSecurityTrustResourceUrl( this.baseUrl + "sap/bc/ui5_ui5/sap/zd_tax01ret_wi/index.html?sap-client="+this.sapclient+"&fGUID=005056B1365C1EEAAA9451F8188E496D&uPar=3300091259&bpnum=3300091259&sAud=&UserTin=&sap-ui-language=EN&taxTp=Z");
    this.directionz = this.routers.snapshot.queryParamMap.get("lang");
    if (this.directionz != null) localStorage.setItem("lang", this.directionz);
    this.menu = [];
    // this.router.navigate(["main"]);
  
    // this.urlredirect("Dashboard");
    // console.log();

    if (localStorage.getItem("lang") === "ar") {
      this.direction = "rtl";
    } else {
      this.direction = "ltr";
    }
  }

  ngAfterViewInit(): void {
    //this.getData();
    //this.getUserInfo();
    // document.getElementById("ifm").onload = function () {
    //   console.log("sdfsdcx");
    //   getdatas();
    // };
    //document.getElementById("ifm").onload = this.getData();
    // setTimeout(() => {
    //   //<<<---    using ()=> syntax
    //   this.getData();
    //   this.getUserInfo();
    // }, 3000);
  }

  getData(): any {
    this.appservice.logout().subscribe((res) => {
      localStorage.setItem("gpart", res["d"]["Gpartz"]);
      console.log("kjsdalqfb; bwefBSDFsd", res);
    });
  }

  testx() {
    console.log("dsfczsd");
  }

  // getUserInfo(): any {
  //   this.appservice.getUserInfo().subscribe((res) => {
  //     console.log("userdata", res);
  //     this.name = res["d"]["Actnm"];
  //     localStorage.setItem("name", res["d"]["Actnm"]);

  //   });
  // }

  urlredirect(name: string) {
    var url = {
      name: name,
      path: "/home/" + name.toLowerCase(),
    };
    if (this.menu.length === 0) {
      this.menu.push(url);
    }
    if (this.menu.length === 1 && name === "Register") {
      this.menu.push(url);
    }
    if (this.menu.length === 2 && name === "Dashboard") {
      this.menu.splice(1);
    }
    console.log(this.menu);
  }

  urlredirect1(id) {
    if (id == 0 && this.menu.length === 1) {
      window.location.reload();
    }
    if (id > 0) {
    } else {
      this.menu.splice(1);
    }

    console.log(this.menu, id);
  }

  logout() {
    window.open(
      this.logouturl,
      "_self"
    );
    //this.router.navigate(["login"]);
    // window.sessionStorage.clear();
    // this.router.navigate(["login"]);
    // this.appservice.logout().subscribe(
    //   (res) => {
    //     console.log("res", res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  redirect() {
    window.location.reload();
  }

  expand() {
    console.log("sdasdasd", this.expnd);
    if (this.expnd) {
      this.expnd = false;
    } else {
      this.expnd = true;
    }
  }
}

function getdatas() {
  console.log("jbsajdbas");
}
