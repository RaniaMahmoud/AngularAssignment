import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayOutWithHeaderComponent } from './lay-out-with-header.component';

describe('LayOutWithHeaderComponent', () => {
  let component: LayOutWithHeaderComponent;
  let fixture: ComponentFixture<LayOutWithHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayOutWithHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayOutWithHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
