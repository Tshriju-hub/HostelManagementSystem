import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prices } from '../prices';
import { Availability } from '../availability';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'hostel-hostel-detail',
  templateUrl: './hostel-detail.component.html',
  styleUrls: ['./hostel-detail.component.css']
})
export class HostelDetailComponent implements OnInit {

  prices: Prices;
  room: any[];

  availability: Availability = {
    boysStandardRooms: 0,  // 12
    boysDeluxeRooms: 0,  // 15
    boysSuperDeluxeRooms: 0, // 10
    girlsStandardRooms: 0, // 13
    girlsDeluxeRooms: 0, // 15
    girlsSuperDeluxeRooms: 0 // 11
  };

  constructor(private adminService: AdminService,private router: Router) 
  { 
    this.adminService.findHostelPriceDetails().subscribe(hostelPriceDetail =>(this.prices = hostelPriceDetail));
    
    this.adminService.boysSuperDeluxRooms().subscribe((total) => { this.availability.boysSuperDeluxeRooms = total.length; });
    this.adminService.boysDeluxRooms().subscribe((total) => { this.availability.boysDeluxeRooms = total.length; });
    this.adminService.boysStandardRooms().subscribe((total) => { this.availability.boysStandardRooms = total.length; });
    this.adminService.girlsSuperDeluxRooms().subscribe((total) => { this.availability.girlsSuperDeluxeRooms = total.length; });
    this.adminService.girlsDeluxRooms().subscribe((total) => { this.availability.girlsDeluxeRooms = total.length; });
    this.adminService.girlsStandardRooms().subscribe((total) => { this.availability.girlsStandardRooms = total.length; });
  }

  //Method to navigate to payment page
  goToPage(Payment:String):void{
    this.router.navigate(['superdeluxe']);
  }

  ToPage(Payment:String):void{
    this.router.navigate(['deluxe']);
  }
  Page(Payment:String):void{
    this.router.navigate(['standard']);
  }

  showMenu(foodmenu:String):void{
    this.router.navigate(['food-menu']);
  }

  Menu(menu:String):void{
    this.router.navigate(['menu']);
  }

  sMenu(Payment:String):void{
    this.router.navigate(['menus']);
  }

  ngOnInit(): void {
  }

}
