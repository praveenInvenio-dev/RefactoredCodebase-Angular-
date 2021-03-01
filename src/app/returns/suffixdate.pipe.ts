import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'suffixdate'
})
export class SuffixdatePipe implements PipeTransform {

  transform(value: string): string {
        return moment(value,'DD/MM/YYYY').format('Do MMM YYYY');

    }

}
