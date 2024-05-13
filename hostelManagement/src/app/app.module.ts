import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptorService } from './interceptors/auth-header-interceptor.service';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { MenuComponent } from './menu/menu.component';
import { MenusComponent } from './menus/menus.component';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/superdeluxe/payment.component';
import { PaymenttComponent } from './payments/deluxe/payment.component';
import { PaymenttsComponent } from './payments/standard/payment.component';
// import { SigninComponent } from './auth/signin/signin.component';
// import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HostelDetailComponent,
    ContactUsComponent,
    FooterComponent,
    NotFoundComponent,
    ProfileComponent,
    PaymentComponent,
    FoodMenuComponent,
    MenuComponent,
    MenusComponent,
    PaymentsComponent,
    PaymenttComponent,
    PaymenttsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
