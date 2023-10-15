import { RentalService } from './../../service/rental.service';
import { UserService } from 'src/app/service/user.service';
import { StandoffAreaService } from './../../service/standoff-area.service';
import { Component, OnInit } from '@angular/core';
import { StandoffArea } from 'src/app/model/standoff-area';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';
import { Rental } from 'src/app/model/rental';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit
{
  //attributi
  serverError: any;
  // POPUP
  standoffFormPopupVisible:boolean = false;
  standoffAreas: StandoffArea[] | undefined;
  vehicleFormPopupVisible:boolean = false;
  vehicles:Vehicle[]|undefined;
  standoffForVehicles:StandoffArea[]|undefined; // copia dell'array per non sporcare la memoria
  removeAutoConfirmPopupVisible:boolean = false;
  vehicleToDelete:Vehicle|undefined;
  removeStandoffConfirmPopupVisible:boolean = false;
  standoffToDelete:StandoffArea|undefined;
  

  // TABELLE
  vehicleTableVisible:boolean = true;
  rentalsTableVisible: boolean = false;
  usersTableVisible: boolean = false;
  standoffAreasTableVisible: boolean = false;
  rentals:Rental[]|undefined;
  users: User[]|undefined;

  //SCHEDE
  userSchedaPopupVisible: boolean = false;
  standoffAreaSchedaPopupVisible: boolean = false;
  vehicleSchedaPopupVisible:boolean = false;
  selectedStandoffArea: StandoffArea | undefined;
  selectedVehicle:Vehicle|undefined;
  selectedUser: User | undefined;

  //prova
  vehicleLibero:number = 0;
  vehicleOccupato:number = 0;
  standoffareaLibero:number = 0;
  standoffareaOccupato:number = 0;
  userRegistrati:number = 0;
  rentalPrenotati:number = 0;
  rentalIncorso:number = 0;
  rentalTerminati:number = 0;

  constructor
  (
    private standoffAreaService:StandoffAreaService,
    private adminService: AdminService,
    private userService: UserService,
    private rentalService : RentalService,
    private router:Router,
    private vehicleService:VehicleService
  ) { }

  //gestione stato di inzizializzazione del componente
  ngOnInit(): void 
  {
    this.callReadAPI();
  }

  callReadAPI(): void 
  {
    this.standoffAreaService.getStandoffAreas()
      .subscribe ({
        next: response => {
          this.standoffAreas = response;

          this.standoffareaOccupato = 0;
          this.standoffareaLibero = 0;
          for (const standoffArea of this.standoffAreas) { // Itera su ciascun veicolo
            if (standoffArea.state == 'O') {
              this.standoffareaOccupato++;
            } else if (standoffArea.state == 'L') {
              this.standoffareaLibero++;
            }
          }

          if(this.standoffAreas)
            this.vehicleService.getVehicles()
            .subscribe({
              next: response => {
                this.vehicles = response;

                this.vehicleLibero = 0;
                this.vehicleOccupato = 0;
                for (const vehicle of this.vehicles) { // Itera su ciascun veicolo
                  if (vehicle.state == 'O') {
                    this.vehicleOccupato++;
                  } else if (vehicle.state == 'L') {
                    this.vehicleLibero++;
                  }
                }
                
                if(this.vehicles)
                  this.userService.getUsers()
                    .subscribe({
                      next: response => {
                        this.users = response

                        this.userRegistrati = 0;
                        for (const user of this.users) { // Itera su ciascun veicolo
                            this.userRegistrati++;
                        }

                        if(this.users)
                          this.rentalService.getRentals()
                          .subscribe({
                            next: response => {this.rentals = response

                              this.rentalPrenotati = 0;
                              this.rentalIncorso = 0;
                              this.rentalTerminati = 0;
                              for (const rental of this.rentals) { // Itera su ciascun veicolo
                                if (rental.state == 'P') {
                                  this.rentalPrenotati++;
                                } else if (rental.state == 'C') {
                                  this.rentalIncorso++;
                                } else if (rental.state == 'T') {
                                  this.rentalTerminati++;
                                }
                              }

                            },
                            error: e => this.serverError = e.message
                          })
                      },
                      error: e => this.serverError = e.message
                  })
              },
              error: e => this.serverError = e.message
          })
        },
        error: e => this.serverError = e.message
      })
  }

  // gestione logout admin
  adminLogoutManager():void{
    this.adminService.adminLogout()
      .subscribe({
        next: response =>{
          if(response.code == 202){
            this.adminService.removeAdminToken();
            this.router.navigate([""]); // path per rimandarlo alla home, cioè unica area libera
          }
        },
        error: e => console.log(e)
      })
  }

  //metodo per visualizzare il popup form standoff area
  activateStandoffAreaFormPopup(): void
  {
    this.standoffFormPopupVisible = true;
  }

  //metodo per chiudere il popup form standoff
  deactivateStandoffAreaFormPopup(): void
  {
    //this.standoffAreaToUpdate = undefined;
    this.standoffFormPopupVisible = false;
    this.standoffAreas = undefined;
    this.callReadAPI(); //rifaccio lettura generale dell'API
  }

  //metodo per visualizzare il popup form standoff area
  activateVehicleFormPopup(): void
  {
    this.standoffForVehicles = this.standoffAreas;
    this.vehicleFormPopupVisible = true;
  }

  //metodo per chiudere il popup form veicolo
  deactivateVehicleFormPopup(): void
  {
    //this.standoffAreaToUpdate = undefined;
    this.vehicleFormPopupVisible = false;
    this.vehicles = undefined;
    this.callReadAPI(); //rifaccio lettura generale dell'API
  }

  //metodo per visualizzare tabella veicoli
  activateVehicleTable(): void
  {
    this.vehicleTableVisible = true;
    this.rentalsTableVisible = false;
    this.usersTableVisible = false;
    this.standoffAreasTableVisible = false;
  }

  //metodo per visualizzare scheda veicoli
  activateVehicleScheda(vehicle:Vehicle): void
  {
    this.vehicleSchedaPopupVisible = true;
    this.selectedVehicle = vehicle;
  }

  //METODO PER DISATTIVAZIONE SCHEDA AREA STAZIONAMENTO
  deactivateVehicleSchedaPopup(): void
  {
    this.vehicleSchedaPopupVisible = false;
  }

  //metodo per visualizzare tabella noleggi
  activateRentalsTable(): void
  {
    this.vehicleTableVisible = false;
    this.rentalsTableVisible = true;
    this.usersTableVisible = false;
    this.standoffAreasTableVisible = false;
  }

  //METODO PER VISUALIZZARE TABELLA UTENTI
  activateUsersTable(): void
  {
    this.usersTableVisible = true;
    this.vehicleTableVisible = false;
    this.rentalsTableVisible = false;
    this.standoffAreasTableVisible = false;
  }

  //METODO PER VISUALIZZARE TABELLA AREE STAZIONAMENTO
  activateStandoffAreasTable(): void
  {
    this.standoffAreasTableVisible = true;
    this.usersTableVisible = false;
    this.vehicleTableVisible = false;
    this.rentalsTableVisible = false;
  }


  //metodo per visualizzare scheda utente
  activateUserScheda(user : User): void
  {
    this.userSchedaPopupVisible = true;
    this.selectedUser = user;
  }

  //METODO PER DISATTIVAZIONE SCHEDA UTENTE
  deactivateUserSchedaPopup(): void
  {
    this.userSchedaPopupVisible = false;
    this.callReadAPI();
  }

  //metodo per visualizzare scheda area stazionamento
  activateStandoffAreaScheda(standoffarea:StandoffArea): void
  {
    this.standoffAreaSchedaPopupVisible = true;
    this.selectedStandoffArea = standoffarea;
  }

  //METODO PER DISATTIVAZIONE SCHEDA AREA STAZIONAMENTO
  deactivateStandoffAreaSchedaPopup(): void
  {
    this.standoffAreaSchedaPopupVisible = false;
  }

  // metodo per gestire la cancellazione di un'area
  deleteStandoffArea(standoffId:number):void {
    if(this.standoffAreas) {
      let index = this.standoffAreas.findIndex(sa => sa.id == standoffId); // con questa funzione si dichiara che l'indice è uguale all'id
      this.standoffAreas.splice(index, 1);
    }
  }

  activateRemoveStandoffConfirm(standoff:StandoffArea):void{
    this.removeStandoffConfirmPopupVisible = true;
    this.standoffToDelete = standoff;
  }

  deactivateRemoveStandoffConfirm():void{
    this.removeStandoffConfirmPopupVisible = false;
    this.standoffAreaSchedaPopupVisible = false;
    this.callReadAPI();
  }

  // metodo per gestire la cancellazione veicolo
  deleteVehicle(vehicleId:number):void {
    if(this.vehicles) {
      let index = this.vehicles.findIndex(v => v.id == vehicleId); // con questa funzione si dichiara che l'indice è uguale all'id
      this.vehicles.splice(index, 1);
      this.deactivateVehicleSchedaPopup();
    }
  }

  activateRemoveAutoConfirm(vehicle:Vehicle):void{
    this.removeAutoConfirmPopupVisible = true;
    this.vehicleToDelete = vehicle;
  }

  deactivateRemoveAutoConfirm():void{
    this.removeAutoConfirmPopupVisible = false;
    this.callReadAPI();
  }
}