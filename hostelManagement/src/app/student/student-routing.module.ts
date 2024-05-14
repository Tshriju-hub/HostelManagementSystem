
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './user.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { RoomStructureComponent } from './room-structure/room-structure.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UserGuard],
      children: [
        {
          path:'',
          pathMatch:'full',
          redirectTo: '/student/dashboard'
        },
        {
          path:'dashboard',
          pathMatch:'full',
          component: DashboardComponent
        },
        {
          path:'foodMenu',
          pathMatch:'full',
          component: FoodMenuComponent
        },
        {
          path:'roomStructure',
          pathMatch:'full',
          component: RoomStructureComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
