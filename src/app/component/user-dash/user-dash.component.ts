import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { VehicleService } from 'src/app/service/vehicle.service';
import { Vehicle } from 'src/app/model/vehicle';
import { Rental } from 'src/app/model/rental';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit{

  // attributi
  serverError:any;
  user: User | undefined;
  userToUpdateImage : any;
  loggedUser: User | undefined; // User è il tipo dei dati dell'utente
  vehicles: Vehicle[] | undefined;
  vehicleToDisplay: Vehicle|undefined;
  datiNoleggio: any[]|undefined;
  importoNoleggio: number = 0;
  rentals: Rental[]| undefined;
  rentalToDelete:Rental|undefined;

  //SCHEDE
  vehicleSchedaPopupVisible: boolean = false;

  //POPUP
  userUpdatePopupVisible: boolean = false;
  rentalRemovalPopupVisible: boolean = false;

  //TABELLE
  vehiclesTableVisible:boolean = false;

  // costruttore
  constructor(
    private userService:UserService,
    private vehicleServise:VehicleService,
    private router:Router){}

  // inizializzazione
  ngOnInit(): void {
    this.callAPI();
  }

  callAPI():void{
    this.userService.getUserData()
    .subscribe({
      next: response =>{
        this.user = response;
        if(this.user)
          this.vehicleServise.getVehicles()
          .subscribe({
            next: response => this.vehicles = response,
            error: e => console.log(e)
          })
      },
      error: e => console.log(e)
    })
  }

  // gestione logout customer
  userLogoutManager():void{
    this.userService.userLogout()
      .subscribe({
        next: response =>{
          if(response.code == 202){
            this.userService.removeUserCredential();
            this.router.navigate([""]); // path per rimandarlo alla home, cioè unica area libera
          }
        },
        error: e => console.log(e)
      })
  }

  //metodo per visualizzare scheda veicolo
  activateVehicleScheda(vehicle:Vehicle): void
  {
    this.vehicleSchedaPopupVisible = true;
    this.vehicleToDisplay = vehicle;
  }

  //METODO PER DISATTIVAZIONE SCHEDA VEICOLO
  deactivateVehicleSchedaPopup(): void
  {
    this.vehicleSchedaPopupVisible = false;
  }

  deactivateVehicleSchedaPopupAndClose():void{
    this.vehicleSchedaPopupVisible = false;
    this.vehiclesTableVisible = false;
    this.callAPI();
  }

  //METODO PER VISUALIZZARE TABELLA VEICOLI
  activateVehiclesTable(): void
  {
    this.vehiclesTableVisible = true;
  }

  activateUserUpdatePopup(): void
  {
    if(this.user && this.user.licenseImage)
      this.userToUpdateImage = this.user.licenseImage
    this.userUpdatePopupVisible = true;
    this.callAPI();
  }

  deactivateUserRegPopup(): void
  {
    this.userToUpdateImage = undefined;
    this.userUpdatePopupVisible = false;
  }

  // metodo 
  rentalPeriodManager(data: any[]): void{
    this.vehicles = data[0]
    this.datiNoleggio = data;
    if(this.datiNoleggio){
      this.importoNoleggio = this.datiNoleggio[3]as number*0.5
    }
  }

  deactivateRemoveRentalConfirmPopup():void{
    this.rentalRemovalPopupVisible = false;
    this.callAPI();
  }

  
  activateRemoveRentalConfirmPopup(rental:Rental):void{
    this.rentalRemovalPopupVisible = true;
    this.rentalToDelete = rental;
  }

  deleteRental(rentalId:number):void{
    if(this.rentals) {
      let index = this.rentals.findIndex(v => v.id == rentalId); // con questa funzione si dichiara che l'indice è uguale all'id
      this.rentals.splice(index, 1);
      this.deactivateRemoveRentalConfirmPopup();
    }
  }

}
