import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: String): String {
    let NewOne = value.substring(0,4);
    NewOne+='-';
    NewOne += value.substring(4,8);
    NewOne+='-';
    NewOne += value.substring(8,12);
    console.log(NewOne);
    return NewOne;
  }

}
