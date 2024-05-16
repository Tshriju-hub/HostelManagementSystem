import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { MenuComponent } from './menu/menu.component';
import { MenusComponent } from './menus/menus.component';
import { PaymentsComponent } from './payments/superdeluxe/payment.component';
import { PaymenttComponent } from './payments/deluxe/payment.component';
import { PaymenttsComponent } from './payments/standard/payment.component';
const routes: Routes = [
  
  {
    path:'food-menu',
    component:FoodMenuComponent
  },
  {
    path:'menu',
    component:MenuComponent
  },
  {
    path:'menus',
    component:MenusComponent
  },
  {path:"superdeluxe",
  component:PaymentsComponent
  },
  {path:"deluxe",
  component:PaymenttComponent
  },
  {path:"standard",
  component:PaymenttsComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'dashboard'
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'student',
    loadChildren: () => import('./student/student.module').then(m => m.UserModule)
  },
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
  { 
    path: 'hostel-detail', 
    pathMatch:'full',
    component: HostelDetailComponent 
  },
  { 
    path: 'contactUs', 
    pathMatch:'full',
    component: ContactUsComponent 
  },
  { 
    path: 'profile', 
    pathMatch:'full',
    component: ProfileComponent 
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
