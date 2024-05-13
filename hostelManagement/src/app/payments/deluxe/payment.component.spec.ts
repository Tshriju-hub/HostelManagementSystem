import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttComponent } from './payment.component';

describe('PaymenttComponent', () => {
  let component: PaymenttComponent;
  let fixture: ComponentFixture<PaymenttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymenttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
