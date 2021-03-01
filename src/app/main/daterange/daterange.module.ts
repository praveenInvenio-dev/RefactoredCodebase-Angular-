import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { MaterialModule } from '../../material.module';
import {
    DaterangeContentComponent
} from './components/daterange-content/daterange-content.component';
import { DaterangeToggleComponent } from './components/daterange-toggle/daterange-toggle.component';
import {
    DaterangeComponent, DATERANGE_SCROLL_STRATEGY_PROVIDER
} from './components/daterange/daterange.component';
import { DaterangeInputDirective } from './directives/daterange-input.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    DaterangeComponent,
    DaterangeToggleComponent,
    DaterangeInputDirective
  ],
  declarations: [
    DaterangeComponent,
    DaterangeInputDirective,
    DaterangeContentComponent,
    DaterangeToggleComponent
  ],
  providers: [
    DATERANGE_SCROLL_STRATEGY_PROVIDER
  ],
  entryComponents: [
    DaterangeContentComponent
  ]
})
export class DaterangeModule { }
