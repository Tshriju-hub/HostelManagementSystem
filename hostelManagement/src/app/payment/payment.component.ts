import { Component, OnInit } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'pm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  roomType = 'superdeluxe';

  constructor() { }

  ngOnInit(): void {
    paypal.Buttons({
      createOrder: function(data: any,actions: any){
        //Calculate the total amount based on room booking details
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
          //Payment successful
          console.log(details);
          //Logic to handle successful room booking
          this.handleSuccessfulRoomBooking(details);
        })
      },
      onError:(err: any)=>{
        //Handle errors
        console.error(err);
      }
    }).render('#paypal-button-container');
  }

  handleSuccessfulRoomBooking(details: any){
    //Determine the room type based on details from your system
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
