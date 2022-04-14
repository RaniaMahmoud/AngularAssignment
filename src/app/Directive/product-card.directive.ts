import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ProductCard]'
})
export class ProductCardDirective {

  @Input() bgColor:String="white";
  constructor(private elRef: ElementRef) {//background: #000;
    this.elRef.nativeElement.style.background=`${this.bgColor}`; 
    this.elRef.nativeElement.style.color='#0d6efd'; 
  }
  @HostListener('mouseenter') OnHover(){
    this.elRef.nativeElement.style.boxShadow = "0 1rem 3rem rgba(0, 0, 0, 0.175)";
    this.elRef.nativeElement.style.borderRadius = "5% 5%"; 
  }
  @HostListener('mouseout') OnBlur(){
    this.elRef.nativeElement.style.boxShadow = null;
    this.elRef.nativeElement.style.borderRadius = null; 
  }
}
