import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cityfilter',
    pure: false
})
export class CityFilterPipe implements PipeTransform {
    transform(items: any[], filter: string, section?: string, param? :string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        if(section == 'MGA'){
          return items.filter(items => items.IndSector.substring(0,2) == filter);
        }
        if(section == 'SGA'){
          return items.filter(items => items.IndSector.substring(0,4) == filter);
        }
        if(section == 'state'){
          return items.filter(items => items.Land1 === filter);
        }
        if(section == 'province'){
          // i => i.Region == '09' && i.Country == 'SA'
          return items.filter(items => items.Region === filter && items.Country === param);
        }
        return items.filter(item => item.Country === filter);
    }
}
