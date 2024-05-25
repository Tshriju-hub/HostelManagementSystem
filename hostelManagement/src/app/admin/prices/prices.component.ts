import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prices } from '../../../app/prices';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { negativeValueValidator } from '../admin.validators';
@Component({
  selector: 'pm-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  prices: Prices;

  priceDetails = new FormGroup({
    superDeluxe: new FormControl('', [Validators.required, negativeValueValidator()]),
    deluxe: new FormControl('', [Validators.required, negativeValueValidator()]),
    standard: new FormControl('', [Validators.required, negativeValueValidator()]),
    foodPackage: new FormControl('', [Validators.required, negativeValueValidator()]),
    electricityBillPerUnit: new FormControl('', [Validators.required, negativeValueValidator()]),
    securityDeposit: new FormControl('', [Validators.required, negativeValueValidator()])
  });

  constructor(private adminService: AdminService) {
    this.adminService.findHostelPriceDetails().subscribe((hostelPriceDetail) => {
      this.prices = hostelPriceDetail;
      this.setValue(hostelPriceDetail);
    });
    this.priceDetails.get('superDeluxe')!.enable();
    this.priceDetails.get('deluxe')!.enable();
    this.priceDetails.get('standard')!.enable();
    this.priceDetails.get('foodPackage')!.enable();
    this.priceDetails.get('electricityBillPerUnit')!.enable();
    this.priceDetails.get('securityDeposit')!.enable();
  }

  setValue(price: Prices) {
    this.priceDetails.controls['superDeluxe'].setValue(price.superDeluxe);
    this.priceDetails.controls['deluxe'].setValue(price.deluxe);
    this.priceDetails.controls['standard'].setValue(price.standard);
    this.priceDetails.controls['foodPackage'].setValue(price.foodPackage);
    this.priceDetails.controls['electricityBillPerUnit'].setValue(price.electricityBillPerUnit);
    this.priceDetails.controls['securityDeposit'].setValue(price.securityDeposit);
  }

  updatePriceDetails() {
    if (this.priceDetails.invalid) {
      alert('Please Enter Valid Value!');
      return;
    }
    const price = this.priceDetails.getRawValue();
    this.adminService.updatePriceDetails(price)
      .subscribe((msg) => {
        alert(msg);
      });
  }

  ngOnInit(): void { }

}
