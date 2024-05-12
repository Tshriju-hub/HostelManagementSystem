import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prices } from '../../prices';
import { Availability } from '../../availability';
import { AdminService } from '../../admin/admin.service';

declare var paypal: any;

@Component({
  selector: 'pm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentsComponent implements OnInit {
  prices: Prices;
  room: any[];
  availability: Availability = {
    boysStandardRooms: 0,
    boysDeluxeRooms: 0,
    boysSuperDeluxeRooms: 0,
    girlsStandardRooms: 0,
    girlsDeluxeRooms: 0,
    girlsSuperDeluxeRooms: 0
  };

  roomType: string; // Declare roomType property

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    // Fetch data when component is initialized
    this.adminService.findHostelPriceDetails().subscribe(hostelPriceDetail => {
      this.prices = hostelPriceDetail;
    });

    // Fetch availability data
    this.adminService.boysSuperDeluxRooms().subscribe(total => {
      this.availability.boysSuperDeluxeRooms = total.length;
    });
    // Add other subscriptions for availability data here...

    // Render PayPal button
    this.renderPayPalButton();
  }

  // Method to render PayPal button
  renderPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        const totalAmount = '100.00'; // Replace with dynamic calculation
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalAmount,
              currency_code: 'USD'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details);
          this.handleSuccessfulRoomBooking(details);
        });
      },
      onError: (err: any) => {
        console.error(err);
      }
    }).render('#paypal-button-container');
  }

  handleSuccessfulRoomBooking(details: any): void {
    const gender = 'boys'; // Example: Get gender from your system (boys/girls)
    switch (this.roomType) {
      case 'superdeluxe':
        if (gender === 'boys') {
          console.log('Super deluxe room booked for boys');
          // Add specific logic for super deluxe room booking for boys
        } else if (gender === 'girls') {
          console.log('Super deluxe room booked for girls');
          // Add specific logic for super deluxe room booking for girls
        }
        break;
      case 'deluxe':
        console.log('Deluxe room booked');
        // Add specific logic for deluxe room booking
        break;
      case 'standard':
        console.log('Standard room booked');
        // Add specific logic for standard room booking
        break;
    }
  }
}
