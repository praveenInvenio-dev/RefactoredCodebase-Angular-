import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReturnsComponent } from "./returns.component";
import { VatComponent } from "./vat/vat.component";
import { SearchReturnsComponent } from "./search-returns/search-returns.component";
import { ExciseTaxComponent } from "./excise-tax/excise-tax.component";
import { WithholdingTaxComponent } from "./withholding-tax/withholding-tax.component";
import { Form12Component } from "./form12/form12.component";
import { Form4Component } from "./form4/form4.component";
import { Form8Component } from "./form8/form8.component";
import { ExciseTransitionalComponent } from "./excise-transitional/excise-transitional.component";
import { Form5Component } from "./form5/form5.component";
import { Form11Component } from "./form11/form11.component";
import { Form2Component } from "./form2/form2.component";
import { Form3Component } from "./form3/form3.component";
import { Form10Component } from "./form10/form10.component";

const routes: Routes = [
  {
    path: "",
    component: ReturnsComponent,
    children: [
      { path: "", redirectTo: "search", pathMatch: "full" },
      { path: "search", component: SearchReturnsComponent },
      { path: "vat/:Fbguid/:Status", component: VatComponent },
      { path: "excisetax/:Fbguid/:Status", component: ExciseTaxComponent },
      {
        path: "withholdingtax/:Fbguid/:Fbtyp/:Status",
        component: WithholdingTaxComponent,
      },
      { path: "formtwelve/:fbGuild/:euser", component: Form12Component },
      { path: "formfour/:Fbguid/:euser/:Status", component: Form4Component },
      { path: "formeight/:fbGuid/:euser/:fbnum", component: Form8Component },
      { path: "excisetransitional", component: ExciseTransitionalComponent },
      { path: "formfive/:fbGuid/:euser", component: Form5Component },
      { path: "formeleven/:fbGuid/:euser/:Status", component: Form11Component },
      { path: "formtwo/:fbGuid/:euser", component: Form2Component },
      { path: "formthree/:fbGuid/:euser", component: Form3Component },
      { path: "formten/:fbGuid/:euser/:fbnum", component: Form10Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnsRoutingModule {}
