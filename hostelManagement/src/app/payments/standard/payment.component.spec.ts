import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttsComponent } from './payment.component';

describe('PaymenttsComponent', () => {
  let component: PaymenttsComponent;
  let fixture: ComponentFixture<PaymenttsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymenttsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenttsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
