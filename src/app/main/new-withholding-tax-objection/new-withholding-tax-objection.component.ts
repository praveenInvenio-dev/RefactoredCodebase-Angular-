import { Component, OnInit } from '@angular/core';
import { WithholdingObjectionConstants } from 'src/app/constants/WithholdingObjectionConstants';
import { ZakatObjectionService } from 'src/app/services/zakat-objection.service';

@Component({
  selector: 'app-new-withholding-tax-objection',
  templateUrl: './new-withholding-tax-objection.component.html',
  styleUrls: ['./new-withholding-tax-objection.component.css',
  "../new-zakat-objection/new-zakat-objection.component.css",]
})
export class NewWithholdingTaxObjectionComponent implements OnInit {
  lang = WithholdingObjectionConstants["en"];
  processActive = 1;
  objectionSubmitted = false;
  objectionDetails:any;

  constructor(public zakatObjectionService: ZakatObjectionService) {}

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar")
      this.lang = WithholdingObjectionConstants["ar"];
    // this.getObjectionDetails();
  }

  getObjectionDetails(){
    this.zakatObjectionService.getObjectionDetail().subscribe(res => {
      console.log(res);
      this.objectionDetails = res['d']
    }, err => {
      console.log(err);
    })
  }

  onSubmit() {
    this.processActive = 2;
  }
  onSubmit2() {
    this.processActive = 3;
  }
  onSubmit3() {
    this.processActive = 4;
  }
  onSubmit4() {
    this.processActive = 5;
  }
  onSubmit5() {
    this.processActive = 6;
  }
  onSubmit6() {
    this.processActive = 7;
  }
  onSubmit7() {
    this.objectionSubmitted = true;
  }
  back() {
    if (this.processActive > 1) this.processActive--;
  }
}
