import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingroundoff'
})
export class RatingRoundoffPipe implements PipeTransform {

    value: any;
  transform(value: any, ...args: any[]): any {
    this.value = parseFloat(value);
    return this.value.toFixed(1);
  }

}
