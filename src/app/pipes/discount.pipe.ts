import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

 // specify every argument individually   
 transform(value: any, arg1: any, arg2: any, arg3: any): any {
   console.log(value , arg1)
   return;
 }
 // or use a rest parameter

}
