import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egynationaID'
})
export class EgynationaIDPipe implements PipeTransform {

  transform(nationaID:number, DateType:String): String {
    let NewOne;//29909011509345
    let idNumber = nationaID.toString();
    let Year = idNumber.substring(1, 3);
    console.log(Year);
    let Month = idNumber.substring(3, 5)
    console.log(Month);
    let Day = idNumber.substring(5, 7)
    console.log(Day);

    let cutoff = (new Date()).getFullYear() - 2000
    
    let dob =  Day + '-' + Month + '-' + (parseInt(Year) > cutoff ? '19' : '20')+ Year;

    switch(DateType){
      case 'DD':
        NewOne=Day;
        break;
      case 'MM':
        NewOne=Month;
        break;
      case 'YY':
        NewOne=Year;
        break;
      case 'FullDate':
        NewOne=dob;
        break;
      default:
        NewOne="NAN";
        break;
    }
    return NewOne?.toString();
  }

}
