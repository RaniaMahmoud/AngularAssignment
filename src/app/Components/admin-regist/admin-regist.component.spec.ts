import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistComponent } from './admin-regist.component';

describe('AdminRegistComponent', () => {
  let component: AdminRegistComponent;
  let fixture: ComponentFixture<AdminRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
