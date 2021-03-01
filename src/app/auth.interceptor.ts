import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, pipe, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { LoaderService } from "./loader/loader.service";
import { Router } from '@angular/router';
import {SessionService} from './services/session-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService, private router: Router,private sessionService:SessionService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      headers: req.headers.set("ichannel", "243"),
      withCredentials: true
    });

    //show loader
    this.showLoader();

    // Pass the cloned request instead of the original request to the next handle
    //return next.handle(clonedRequest);

    return next.handle(clonedRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
        (err: any) => {
          this.onEnd();
        }
      ), catchError((error: HttpErrorResponse) => {
        console.log("interceptor catchError error", error);

        if (error.url.includes("saml2/idp/sso?SAMLRequest") && error.ok == false) {
          //this.router.navigate(['/login']);
        } else
          if (error.status === 401) {
            //this.router.navigate(['/login']);
          }
        return throwError(error);
      }), finalize(() => {
       // console.warn("finalize");
        //refresh sessionf
       this.sessionService.refreshSession();
      })
    );
  }

  public onEnd(): void {
    this.hideLoader();
  }
  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }
}
