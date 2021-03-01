import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import {
  DateAdapter,
  MatNativeDateModule,
  MatRippleModule,
} from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { MatJDNConvertibleCalendarDateAdapterModule } from "jdnconvertiblecalendardateadapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Ng5SliderModule } from "ng5-slider";
import { ChartsModule } from "ng2-charts";
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { DatePipe } from "@angular/common";
import { NumberTrackerComponent } from "./constants/NumberTracker";
import { DragDropDirective } from "./constants/drag-drop.directive";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { SafePipe } from "./constants/safe.pipe";
import { IbanFormatterPipe } from "./constants/ibanFormatter.pipe";
import { MinuteSecondsPipe } from "./constants/MinuteSecondsPipe .pipe";
import { NumberDirective } from "./constants/numbers-only.directive";
import { NameValidator } from "./constants/name.directive";
import { CityFilterPipe } from "./constants/cityFilter.pipe";
import { IbanMaskDirective } from "./constants/iban-mask.directive";
import { CategoryPipe } from "./constants/category.pipe";
import { CustomDateAdapter } from "./shared/custom-date-adapter";
import { CalendarModule } from "primeng/calendar";

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
    stacking: 1,
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
  exports: [
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatJDNConvertibleCalendarDateAdapterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng5SliderModule,
    ChartsModule,
    NgxMatFileInputModule,
    NumberTrackerComponent,
    DragDropDirective,
    SafePipe,
    IbanFormatterPipe,
    IbanMaskDirective,
    MinuteSecondsPipe,
    NumberDirective,
    NameValidator,
    CityFilterPipe,
    CategoryPipe,
    CalendarModule,
  ],
  imports: [
    NgxMatFileInputModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
  declarations: [
    NumberTrackerComponent,
    DragDropDirective,
    SafePipe,
    IbanFormatterPipe,
    MinuteSecondsPipe,
    NumberDirective,
    NameValidator,
    CityFilterPipe,
    IbanMaskDirective,
    CategoryPipe,
  ],
  providers: [
    DatePipe,
    SafePipe,
    CategoryPipe,
    MinuteSecondsPipe,
    IbanFormatterPipe,
    IbanMaskDirective,
    NumberDirective,
    NameValidator,
    CityFilterPipe,
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
  ],
})
export class MaterialModule {}
