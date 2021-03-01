import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  PreloadingStrategy,
  Route,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { LoginfirstComponent } from "./loginfirst/loginfirst.component";
import { OtpComponent } from "./main/otp/otp.component";
import { ForgotUNameOrPwdComponent } from "./forgot-uname-or-pwd/forgot-uname-or-pwd.component";
import { Observable } from "rxjs";
import { of } from "rxjs";

const routes: Routes = [
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: "mains",
    loadChildren: () => import("./main/main.module").then((m) => m.MainModule),
    // ,data: { preload: true }
  },
  {
    path: "main",
    component: OtpComponent,
  },

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },

  {
    path: "login",
    component: LoginfirstComponent,
  },
  {
    path: "first",
    component: LoginComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
  },
  {
    path: "forgotUNameOrPwd",
    component: ForgotUNameOrPwdComponent,
  },

  // {
  //   path: "signup",
  //   component: SignupLandingComponent,
  // },
];

// export class AppCustomPreloader implements PreloadingStrategy {
//   preload(route: Route, load: Function): Observable<any> {

//     //console.log("frpom preload function", route.data ? route.data.preload: 'no route data');

//     return route.data && route.data.preload ? load() : of(null);
//   }
// }
// { preloadingStrategy: AppCustomPreloader,useHash: true }

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  // providers: [AppCustomPreloader]
})
export class AppRoutingModule {}
