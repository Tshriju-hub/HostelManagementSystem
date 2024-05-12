import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent} from '../app/payment/payment.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path:'Payment',
    component:PaymentComponent
  },

  {
    path:'food-menu',
    component:FoodMenuComponent
  },
  {
    path:'menu',
    component:MenuComponent
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
    path:'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
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
