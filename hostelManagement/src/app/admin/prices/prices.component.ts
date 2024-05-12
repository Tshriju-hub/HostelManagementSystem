import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prices } from '../../../app/prices';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pm-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  prices: Prices;

  priceDetails = new FormGroup({
    superDeluxe: new FormControl('',[Validators.required]),
    deluxe: new FormControl('',[Validators.required]),
    standard: new FormControl('',[Validators.required]),
    foodPackage: new FormControl('',[Validators.required]),
    electricityBillPerUnit: new FormControl('',[Validators.required]),
    securityDeposit: new FormControl('',[Validators.required])
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
    if(this.priceDetails.status == "INVALID") { 
      alert('Please Enter Valiad Value !');
      return; 
    }
    const price = this.priceDetails.getRawValue();
    // console.log(price);
    this.adminService.updatePriceDetails(price)
    .subscribe((msg) => {
        alert(msg);
    }
    );
  }

  ngOnInit(): void {
    
  }

}
