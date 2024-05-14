import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { RoomStructureComponent } from './room-structure/room-structure.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    FoodMenuComponent,
    RoomStructureComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
