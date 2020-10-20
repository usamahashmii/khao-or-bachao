import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringbreak'
})
export class StringbreakPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value);
    var str1 = value.split(':')[0];
    var str2 = value.split(':')[1];
    var str3 = value.split(':')[2];
    var str4 = str1+':'+str2;
    console.log(str4);
    return str4;
  }

}
