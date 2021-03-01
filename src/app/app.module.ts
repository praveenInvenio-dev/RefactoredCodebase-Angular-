import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LogoutComponent } from "./logout/logout.component";
import { Ng5SliderModule } from "ng5-slider";
import { CalendarComponent } from "./constants/calendar.component";
import { ChartsModule } from "ng2-charts";
import { AuthInterceptor } from "./auth.interceptor";
import { LoaderComponent } from './loader/loader.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { LoginfirstComponent } from './loginfirst/loginfirst.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotUNameOrPwdComponent } from './forgot-uname-or-pwd/forgot-uname-or-pwd.component';
import { OTPVerificationComponent } from './otpverification/otpverification.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CookieModule, CookieService } from 'ngx-cookie';
import { CalendarSelectorComponent } from "./constants/calendarselector.component";
import {ToastModule} from 'primeng/toast';


const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12,
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10,
    },
  },
  theme: "material",
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease",
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: "ease",
    },
    overlap: 150,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    CalendarComponent,
    LoaderComponent,
    LoginfirstComponent,
    ForgotUNameOrPwdComponent,
    OTPVerificationComponent,
    CreatePasswordComponent,
    CalendarSelectorComponent


  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng5SliderModule,
    ChartsModule,
    RecaptchaModule.forRoot(),
    NotifierModule.withConfig(notifierDefaultOptions),
    NgbModule,
    DateRangePickerModule,
    CookieModule.forRoot(),
    ToastModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService
  ],

  bootstrap: [AppComponent],
  entryComponents: [CalendarComponent,CalendarSelectorComponent],
})
export class AppModule { }
