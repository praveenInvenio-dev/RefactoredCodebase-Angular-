import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'ibanformatter'
})
export class IbanFormatterPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(value: string): string {
    // remove existing spaces
    if(value){
      let lIban: string = value.replace(" ", "");
    // place a space after every 4th character
    lIban = lIban.split(' ').join('').replace(/(.{2})/, "$1 ").replace(/(.{5})/, "$1 ").replace(/(.{14})/, "$1 ").replace(/(.{19})/, "$1 ").replace(/(.{24})/, "$1 ");
    console.log(lIban);
    return lIban;
    }

}

}
