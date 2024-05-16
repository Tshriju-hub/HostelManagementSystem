import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-food-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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
      { name: 'Pancakes', price: 'NPR 200-300 per serving' },
      { name: 'Omelette', price: 'NPR 150-250 per serving' },
      { name: 'Cereal', price: 'NPR 100-200 per serving' },
      { name: 'French Toast', price: 'NPR 250-350 per serving' },
      { name: 'Croissant', price: 'NPR 150-250 per piece' }
    ];

    // Populate lunch menu
    this.lunchMenu = [
      { name: 'Pizza', price: 'NPR 300-500 per serving' },
      { name: 'Burger', price: 'NPR 200-400 per serving' },
      { name: 'Pasta', price: 'NPR 250-450 per serving' },
      { name: 'Sandwich', price: 'NPR 150-300 per serving' },
      { name: 'Salad', price: 'NPR 200-350 per serving' }
    ];

    // Populate dinner menu
    this.dinnerMenu = [
      { name: 'Sushi', price: 'NPR 400-600 per serving' },
      { name: 'Steak', price: 'NPR 500-800 per serving' },
      { name: 'Curry', price: 'NPR 300-500 per serving' },
      { name: 'Risotto', price: 'NPR 350-600 per serving' },
      { name: 'Grilled Salmon', price: 'NPR 400-700 per serving' }
    ];

    // Populate starters menu
    this.startersMenu = [
      { name: 'Spring Rolls', price: 'NPR 200-350 for a plate' },
      { name: 'Bruschetta', price: 'NPR 150-250 per serving' },
      { name: 'Nachos', price: 'NPR 250-400 per serving' },
      { name: 'Calamari', price: 'NPR 300-500 per serving' },
    ];
  }
}

interface MenuItem {
  name: string;
  price: string;
}
