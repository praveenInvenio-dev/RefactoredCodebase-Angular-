import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiFieldCasesConstants } from '../constants/fieldInspectionCasesConstants';
import { DashboardService } from './dashboard-service';

@Injectable({
  providedIn: 'root'
})
export class FieldInspectionCasesService {
  lang: string;
  lang1: string;
  public gpart;

  constructor(private http: HttpClient) { 
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
      this.lang1 = "A";
    } else {
      this.lang = "EN";
      this.lang1 = "E";
    }
    this.gpart = localStorage.getItem("gpart");
    console.log(this.gpart)
  }
  
  baseUrl: string = environment.url;

  getFieldInspectionCases() {
    let url =
      this.baseUrl +
      ApiFieldCasesConstants.getFieldCasesData +
      "(Gpart='" + this.gpart +
      "',Begda=datetime'1111-01-31T13:58:10',Endda=datetime'9999-12-31T10:10:10'," + 
      "ShowAll='X')?$expand=DataSet";
     
      return this.http.get(url);
    }
}
