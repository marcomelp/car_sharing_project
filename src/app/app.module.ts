import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminDashComponent } from './component/admin-dash/admin-dash.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContentComponent } from './component/content/content.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { RentalsTableComponent } from './component/rentals-table/rentals-table.component';
import { VehiclesTableComponent } from './component/vehicles-table/vehicles-table.component';
import { StandoffAreasTableComponent } from './component/standoff-areas-table/standoff-areas-table.component';
import { UsersTableComponent } from './component/users-table/users-table.component';
import { UserDashComponent } from './component/user-dash/user-dash.component';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { UserRegComponent } from './component/user-reg/user-reg.component';
import { AdminSidebarComponent } from './component/admin-sidebar/admin-sidebar.component';
import { UserVehiclesTableComponent } from './component/user-vehicles-table/user-vehicles-table.component';
import { UserRentalsTableComponent } from './component/user-rentals-table/user-rentals-table.component';
import { UserFormSearchComponent } from './component/user-form-search/user-form-search.component';
import { PopupVehicleComponent } from './component/popup-vehicle/popup-vehicle.component';
import { PopupStandoffComponent } from './component/popup-standoff/popup-standoff.component';
import { UserSchedaComponent } from './component/user-scheda/user-scheda.component';
import { StandoffAreaSchedaComponent } from './component/standoff-area-scheda/standoff-area-scheda.component';
import { VehicleSchedaComponent } from './component/vehicle-scheda/vehicle-scheda.component';
import { AdminVehicleSchedaComponent } from './component/admin-vehicle-scheda/admin-vehicle-scheda.component';
import { RemoveAutoConfirmPopupComponent } from './component/remove-auto-confirm-popup/remove-auto-confirm-popup.component';
import { RatesAndServicesComponent } from './component/rates-and-services/rates-and-services.component';
import { FaqComponent } from './component/faq/faq.component';
import { WorkWithUsComponent } from './component/work-with-us/work-with-us.component';
import { RemoveStandoffConfirmPopupComponent } from './component/remove-standoff-confirm-popup/remove-standoff-confirm-popup.component';
import { RemoveRentalConfirmPopupComponent } from './component/remove-rental-confirm-popup/remove-rental-confirm-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AdminDashComponent,
    HomeComponent,
    ContentComponent,
    AdminLoginComponent,
    RentalsTableComponent,
    VehiclesTableComponent,
    StandoffAreasTableComponent,
    UsersTableComponent,
    UserDashComponent,
    UserLoginComponent,
    UserRegComponent,
    AdminSidebarComponent,
    UserVehiclesTableComponent,
    UserRentalsTableComponent,
    UserFormSearchComponent,
    PopupVehicleComponent,
    PopupStandoffComponent,
    UserSchedaComponent,
    StandoffAreaSchedaComponent,
    VehicleSchedaComponent,
    AdminVehicleSchedaComponent,
    RemoveAutoConfirmPopupComponent,
    RatesAndServicesComponent,
    FaqComponent,
    WorkWithUsComponent,
    RemoveStandoffConfirmPopupComponent,
    RemoveRentalConfirmPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
