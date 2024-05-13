import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prices } from '../../prices';
import { AdminService } from '../../admin/admin.service';

declare var paypal: any;

@Component({
  selector: 'pm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentsComponent implements OnInit {
  prices: Prices;
  selectedRooms: number = 1; // Number of rooms to purchase
  availability: number = 5; // Initialize availability

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    // Fetch data when component is initialized
    this.adminService.findHostelPriceDetails().subscribe(hostelPriceDetail => {
      this.prices = hostelPriceDetail;
    });

    // Fetch availability data for superDeluxe rooms
    this.adminService.getTotalAvailability().subscribe(
      (totalAvailability: any) => {
        this.extractSuperDeluxeAvailability(totalAvailability);
      },
      (error: any) => {
        console.error('Error fetching availability:', error);
      }
    );

    // Render PayPal button
    this.renderPayPalButton();
  }

  // Method to render PayPal button
  renderPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        const totalAmount = this.calculateTotalAmount(); // Calculate total amount based on selected rooms and prices
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalAmount.toString(),
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details);
          if (this.checkAvailability()) {
            this.handleSuccessfulRoomBooking(details);
          } else {
            console.error('Room not available');
            // Add logic to handle when room is not available
          }
        });
      },
      onError: (err: any) => {
        console.error(err);
      }
    }).render('#paypal-button-container');
  }

  extractSuperDeluxeAvailability(totalAvailability: any): void {
    const girlsSuperDeluxeAvailability = totalAvailability.girlsSuperDeluxe;
    this.availability = girlsSuperDeluxeAvailability;
  }

  // Method to calculate total amount based on selected rooms and prices
  calculateTotalAmount(): number {
    return this.prices.superDeluxe * this.selectedRooms;
  }

  // Method to check availability before booking
  checkAvailability(): boolean {
    return this.availability >= this.selectedRooms;
  }

  handleSuccessfulRoomBooking(details: any): void {
    // Perform actions after successful room booking, e.g., redirect to confirmation page
    this.router.navigate(['/confirmation']);
  }

  updateSelectedRooms(value: number): void {
    this.selectedRooms = value;
  }
}
