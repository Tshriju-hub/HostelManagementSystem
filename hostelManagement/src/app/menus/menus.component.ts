import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-food-Menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  breakfastMenus: MenusItem[] = [];
  lunchMenus: MenusItem[] = [];
  dinnerMenus: MenusItem[] = [];
  startersMenus: MenusItem[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize your Menus items here
    this.initializeMenus();
  }

  initializeMenus() {
    // Populate breakfast Menus with both Nepali and foreign dishes
    this.breakfastMenus = [
      { name: 'Dal Bhat', price: 'NPR 100-150 per serving' },
      { name: 'Pancakes', price: 'NPR 200-300 per serving' },
      { name: 'Omelette', price: 'NPR 150-250 per serving' },
      { name: 'Cereal', price: 'NPR 100-200 per serving' },
      { name: 'French Toast', price: 'NPR 250-350 per serving' },
      { name: 'Croissant', price: 'NPR 150-250 per piece' },
      // Add more items as needed
    ];

    // Populate lunch Menus with both Nepali and foreign dishes
    this.lunchMenus = [
      { name: 'Vegetable Curry', price: 'NPR 100-150 per serving' },
      { name: 'Pizza', price: 'NPR 300-500 per serving' },
      { name: 'Burger', price: 'NPR 200-400 per serving' },
      { name: 'Pasta', price: 'NPR 250-450 per serving' },
      { name: 'Sandwich', price: 'NPR 150-300 per serving' },
      { name: 'Salad', price: 'NPR 200-350 per serving' },
      // Add more items as needed
    ];

    // Populate dinner Menus with both Nepali and foreign dishes
    this.dinnerMenus = [
      { name: 'Vegetable Curry', price: 'NPR 100-150 per serving' },
      { name: 'Sushi', price: 'NPR 400-600 per serving' },
      { name: 'Steak', price: 'NPR 500-800 per serving' },
      { name: 'Curry', price: 'NPR 300-500 per serving' },
      { name: 'Risotto', price: 'NPR 350-600 per serving' },
      { name: 'Grilled Salmon', price: 'NPR 400-700 per serving' },
      // Add more items as needed
    ];

    // Populate starters Menus with both Nepali and foreign dishes
    this.startersMenus = [
      { name: 'Momos', price: 'NPR 100-150 for a plate' },
      { name: 'Spring Rolls', price: 'NPR 200-350 for a plate' },
      { name: 'Bruschetta', price: 'NPR 150-250 per serving' },
      { name: 'Nachos', price: 'NPR 250-400 per serving' },
      { name: 'Pakoras', price: 'NPR 50-70 per serving' },
      { name: 'Calamari', price: 'NPR 300-500 per serving' },
      // Add more items as needed
    ];
  }
}

interface MenusItem {
  name: string;
  price: string;
}
