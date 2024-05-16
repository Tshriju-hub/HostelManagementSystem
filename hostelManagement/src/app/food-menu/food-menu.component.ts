import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {

  breakfastMenu: MenuItem[] = [];
  lunchMenu: MenuItem[] = [];
  dinnerMenu: MenuItem[] = [];
  startersMenu: MenuItem[] = [];

  constructor(private router:Router) { }

  ngOnInit(): void {
    // Initialize your menu items here
    this.initializeMenu();
  }

  goToPage(menu:String):void{
    this.router.navigate(['hostel-detail']);
  }


  initializeMenu() {
    // Populate breakfast menu
    this.breakfastMenu = [
      { name: 'Dal Bhat', price: 'NPR 100-150 per serving' },
      { name: 'Sel Roti', price: 'NPR 50-70 for 3 pieces' },
      { name: 'Egg Bhurji', price: 'NPR 80-100 per serving' },
      { name: 'Chowmein', price: 'NPR 100-150 per serving' },
      { name: 'Poha', price: 'NPR 70-100 per serving' }
    ];

    // Populate lunch menu
    this.lunchMenu = [
      { name: 'Vegetable Curry', price: 'NPR 100-150 per serving' },
      { name: 'Chicken Curry', price: 'NPR 200-250 per serving' },
      { name: 'Mutton Curry', price: 'NPR 250-300 per serving' },
      { name: 'Rice', price: 'NPR 50-80 per serving' },
      { name: 'Roti', price: 'NPR 20-30 per piece' },
      { name: 'Salad', price: 'NPR 50-70 per serving' }
    ];

    // Populate dinner menu
    this.dinnerMenu = [
      { name: 'Vegetable Curry', price: 'NPR 100-150 per serving' },
      { name: 'Chicken Curry', price: 'NPR 200-250 per serving' },
      { name: 'Mutton Curry', price: 'NPR 250-300 per serving' },
      { name: 'Rice', price: 'NPR 50-80 per serving' },
      { name: 'Roti', price: 'NPR 20-30 per piece' },
      { name: 'Salad', price: 'NPR 50-70 per serving' }
    ];

    // Populate starters menu
    this.startersMenu = [
      { name: 'Momos', price: 'NPR 100-150 for a plate' },
      { name: 'Samosas', price: 'NPR 50-70 for 2 pieces' },
      { name: 'Pakoras', price: 'NPR 50-70 per serving' },
      { name: 'Bread Pakora', price: 'NPR 50-70 per serving' },
    ];
  }
}

interface MenuItem {
  name: string;
  price: string;
}
