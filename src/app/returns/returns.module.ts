import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ReturnsRoutingModule } from "./returns-routing.module";
import { ReturnsComponent } from "./returns.component";
import { VatComponent } from "./vat/vat.component";
import { SuffixdatePipe } from "./suffixdate.pipe";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NotifierOptions, NotifierModule } from "angular-notifier";
import { SearchReturnsComponent } from "./search-returns/search-returns.component";
import { ExciseTaxComponent } from "./excise-tax/excise-tax.component";
import { WithholdingTaxComponent } from "./withholding-tax/withholding-tax.component";
import { Form12Component } from "./form12/form12.component";

import { CurrencyPipe } from "@angular/common";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { Form4Component } from "./form4/form4.component";
import { Form8Component } from "./form8/form8.component";
import { ExciseTransitionalComponent } from "./excise-transitional/excise-transitional.component";
import { Form11Component } from "./form11/form11.component";
import { Form5Component } from "./form5/form5.component";
import { Form2Component } from "./form2/form2.component";
import { Form3Component } from "./form3/form3.component";
import { Form10Component } from "./form10/form10.component";
import { MaterialModule } from "../material.module";

const maskConfig: Partial<IConfig> = {
  validation: false,
};

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

if (localStorage.getItem("lang") == "ar") {
  notifierDefaultOptions.position.horizontal.position = "left";
  // alert(notifierDefaultOptions.position.horizontal.position);
} else {
  notifierDefaultOptions.position.horizontal.position = "right";
}

@NgModule({
  declarations: [
    ReturnsComponent,
    VatComponent,
    SuffixdatePipe,
    SearchReturnsComponent,
    ExciseTaxComponent,
    WithholdingTaxComponent,
    Form12Component,
    Form4Component,
    Form8Component,
    ExciseTransitionalComponent,
    Form11Component,
    Form5Component,
    Form2Component,
    Form3Component,
    Form10Component,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    ReturnsRoutingModule,
    Ng2SearchPipeModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [CurrencyPipe],
})
export class ReturnsModule {}
