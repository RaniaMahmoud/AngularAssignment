import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private dataSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  product$ = new BehaviorSubject<number>(localStorage.getItem('CardItems')?parseInt(localStorage.getItem('CardItems')!):0);
  //private product$ = new BehaviorSubject<number>(0);
  selectedProduct$ = this.product$.asObservable();

  constructor() {    
  }
  // sendData(data: number) {
  //   this.dataSource.next(data);
  // }
  setProduct() {
    this.product$.next(parseInt(localStorage.getItem('CardItems')!));
  }
}
