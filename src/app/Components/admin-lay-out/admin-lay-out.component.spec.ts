import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayOutComponent } from './admin-lay-out.component';

describe('AdminLayOutComponent', () => {
  let component: AdminLayOutComponent;
  let fixture: ComponentFixture<AdminLayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLayOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
