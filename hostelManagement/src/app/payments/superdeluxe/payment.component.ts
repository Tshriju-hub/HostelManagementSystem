import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { Prices } from '../../prices';
import { Availability } from '../../availability';

declare var paypal: any;

@Component({
  selector: 'pm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentsComponent implements OnInit {

  roomType = 'superdeluxe';
  prices: Prices;
  room: any[];
  numRooms: number = 1;

  availability: Availability = {
    boysStandardRooms: 0,
    boysDeluxeRooms: 0,
    boysSuperDeluxeRooms: 0,
    girlsStandardRooms: 0,
    girlsDeluxeRooms: 0,
    girlsSuperDeluxeRooms: 0
  };

  constructor(private adminService: AdminService, private router:Router) {}

  ngOnInit(): void {
    // Fetch prices and availability data
    this.adminService.findHostelPriceDetails().subscribe(hostelPriceDetail => (this.prices = hostelPriceDetail));
    this.fetchAvailability();
  }

  goToPage(Payments:String):void{
    this.router.navigate(['hostel-detail']);
  }

  fetchAvailability(): void {
    // Fetch availability data
    this.adminService.boysSuperDeluxRooms().subscribe((total) => { this.availability.boysSuperDeluxeRooms = total.length; });
    this.adminService.boysDeluxRooms().subscribe((total) => { this.availability.boysDeluxeRooms = total.length; });
    // Fetch other room availability data similarly
  }

  availableRoomOptions(): number[] {
    // Extract the number of available rooms
    const numAvailableRooms = this.availability?.boysSuperDeluxeRooms || 0; // Use the appropriate property here
    
    // Generate an array of available room options
    return Array.from({ length: numAvailableRooms }, (_, index) => index + 1);
  }

  bookNow(): void {
    // Render PayPal button container
    this.renderPaypalButton();
  }

  renderPaypalButton(): void {
    paypal.Buttons({
      createOrder: function(data: any, actions: any){
        // Calculate the total amount based on room booking details
        const totalAmount='100.00';
        return actions.order.create({
          purchase_units:[{
            amount:{
              value:totalAmount,
              currency_code:'USD'
            }
          }]
        });
      },

      onApprove:(data:any,actions: any) => {
        return actions.order.capture().then((details: any)=>{
          // Payment successful
          console.log(details);
          // Logic to handle successful room booking
          this.handleSuccessfulRoomBooking(details);
        });
      },
      onError:(err: any)=>{
        // Handle errors
        console.error(err);
      }
    }).render('#paypal-button-container');
  }

  handleSuccessfulRoomBooking(details: any) {
    // Determine the room type based on details from your system
    const gender = 'boys'; // Example: Get gender from your system (boys/girls)

    // Add logic to handle successful room booking based on room type and gender
    switch(this.roomType) {
      case 'superdeluxe':
        if (gender === 'boys') {
          // Handle super deluxe room booking for boys
          console.log('Super deluxe room booked for boys');
          // Add your specific logic for super deluxe room booking for boys
        } else if (gender === 'girls') {
          // Handle super deluxe room booking for girls
          console.log('Super deluxe room booked for girls');
          // Add your specific logic for super deluxe room booking for girls
        }
        break;
      case 'deluxe':
        // Handle deluxe room booking
        console.log('Deluxe room booked');
        // Add your specific logic for deluxe room booking
        break;
      case 'standard':
        // Handle standard room booking
        console.log('Standard room booked');
        // Add your specific logic for standard room booking
        break;
      }
  }
}
