import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiFieldConstants } from '../constants/fieldInspectionConstants';
import { DashboardService } from './dashboard-service';

@Injectable({
  providedIn: 'root'
})
export class VatFieldInspectionService {
 lang: string;
 lang1: string;
 public gpartz;
 public  Euser;
 public Fbguid;

  constructor(private http: HttpClient, public dashbServ : DashboardService) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lang1 = "A";
    } else {
      this.lang = "EN";
      this.lang1 = "E";
    }
    this.gpartz = localStorage.getItem("gpart");
    this.dashbServ.getDashboardData$().subscribe(dashItem =>{
      console.log("dashboard service here =>",dashItem)
      this.Fbguid = dashItem.d.Fbguid
      this.Euser = dashItem.d.Euser
      console.log(dashItem.d.ReturnDataSet.results[0].Gpart)
    })
   }

   baseUrl: string = environment.url;

   
  getFieldInspection() {
    let url =
      this.baseUrl +
      ApiFieldConstants.getFieldData +
      "(Fbguid='" +    this.Fbguid  +
      "',Fbnumz='',Langz='" + 
      this.lang1 + "',Officerz='',Gpartz='" +
       this.gpartz + 
     "',Euser='" +
       this.Euser  +
      "',TxnTpz='')?&$expand=FieldInsDataSet&$format=json";
     
      return this.http.get(url);
    }
}
