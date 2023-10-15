import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // attributi
  @Input() position:any;
  @Input() users : User | undefined;
  @Output() adminLogout = new EventEmitter();
  @Output() userLogout = new EventEmitter();

  // POPUP
  @Output() adminLoginFormPopup = new EventEmitter();
  @Output() userLoginFormPopup = new EventEmitter();
  @Output() userRegFormPopup = new EventEmitter();
  @Output() standoffAreaFormPopup = new EventEmitter();
  @Output() vehicleFormPopup = new EventEmitter();
  @Output() update = new EventEmitter();

  // TABELLE
  @Output() vehicleTable = new EventEmitter();
  @Output() rentalsTable = new EventEmitter();
  @Output() usersTable = new EventEmitter();
  @Output() standoffAreasTable = new EventEmitter();

  // attivazione popup form login amministratore
  activateAdminLoginFormPopup():void {
    this.adminLoginFormPopup.emit();
  }

  // attivazione popup form login cliente
  activateUserLoginFormPopup():void {
    this.userLoginFormPopup.emit();
  }

  //REGISTRAZIONE NUOVO CLIENTE
  activateUserRegFormPopup(): void 
  {
    this.userRegFormPopup.emit();
  }

  //REGISTRAZIONE NUOVA STANDOFF
  activateStandoffAreaFormPopup(): void 
  {
    this.standoffAreaFormPopup.emit();
  }

  //REGISTRAZIONE NUOVO VEICOLO
  activateVehicleFormPopup(): void 
  {
    this.vehicleFormPopup.emit();
  }

  //VISUALIZZA TABELLA VEICOLI
  activateVehicleTable():void {
    this.vehicleTable.emit();
  }

  
  //VISUALIZZA TABELLA NOLEGGI
  activateRentalsTable():void {
    this.rentalsTable.emit();
  }

  //VISUALIZZA TABELLA CLIENTI
  activateUsersTable(): void
  {
    this.usersTable.emit();
  }

   //VISUALIZZA TABELLA AREE STAZIONAMENTO
  activateStandoffAreasTable():void 
  {
    this.standoffAreasTable.emit();
  }

// emissione evento logout admin
  adminLogoutEvent():void{
    this.adminLogout.emit();
  }

// emissione evento logout user
  userLogoutEvent():void{
    this.userLogout.emit();
  }

  updateDatas():void
  {
    this.update.emit();
  }
}