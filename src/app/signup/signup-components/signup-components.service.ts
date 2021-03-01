import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DatepickerUtilitiesService } from 'src/app/shared/services/datepicker-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class SignupComponentsService {

  constructor(private dpuService: DatepickerUtilitiesService) { }

  updateCalendarType(formGroup: FormGroup, fields, calendarType) {
    //console.log("updateCalendarType", fields, calendarType);
    Object.keys(formGroup.controls).forEach(field => {
      //console.log("form field***", field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (fields.indexOf(field) != -1) {
          
          if (control.value) {
            console.log("Date Field", field);
          console.log("control value", control.value);
            let frmtddate = this.dpuService.getConvertedDate(control.value, calendarType);
            control.setValue(frmtddate);
          }
        }
      } else if (control instanceof FormGroup) {
        this.updateCalendarType(control, fields, calendarType);
      } else if (control instanceof FormArray) {
        control.value.forEach((factrl, index) => {
          // if (control.at(index) instanceof FormGroup) {
          this.updateCalendarType(<FormGroup>control.at(index), fields, calendarType);
          // }
        });
      }
    });
  }




  
}
