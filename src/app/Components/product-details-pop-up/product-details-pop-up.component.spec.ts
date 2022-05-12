import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsPopUpComponent } from './product-details-pop-up.component';

describe('ProductDetailsPopUpComponent', () => {
  let component: ProductDetailsPopUpComponent;
  let fixture: ComponentFixture<ProductDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
