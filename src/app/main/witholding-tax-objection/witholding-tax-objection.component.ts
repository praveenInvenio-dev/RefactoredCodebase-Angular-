import { Component, OnInit } from '@angular/core';
import { WithholdingObjectionConstants } from 'src/app/constants/WithholdingObjectionConstants';

@Component({
  selector: 'app-witholding-tax-objection',
  templateUrl: './witholding-tax-objection.component.html',
  styleUrls: ['./witholding-tax-objection.component.css',
  "../new-zakat-objection/new-zakat-objection.component.css",]
})
export class WitholdingTaxObjectionComponent implements OnInit {
  lang = WithholdingObjectionConstants["en"];
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === "ar")
      this.lang = WithholdingObjectionConstants["ar"];
  }

  onSubmit() {}
}
