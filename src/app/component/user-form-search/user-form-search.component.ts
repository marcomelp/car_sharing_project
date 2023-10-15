import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Rental } from 'src/app/model/rental';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-user-form-search',
  templateUrl: './user-form-search.component.html',
  styleUrls: ['./user-form-search.component.css']
})
export class UserFormSearchComponent 
{
  //TABELLE
  @Output() vehiclesTable = new EventEmitter();
  serverError: any;
  dateTimeError: any;
  @Output() available = new EventEmitter<any[]>();

  

  // costruttore
  constructor(private vehicleService: VehicleService){}

  //VISUALIZZA TABELLA VEICOLI
  activateVehiclesTable(): void
  {
    this.vehiclesTable.emit();
  }

  // metodo per gestire ricerca veicoli disponibili in base all'orario
  selectAvailableVehiclesManager(form:NgForm):void
  {
    if(new Date(form.value["pickupTiming"]) > new Date() && 
        new Date(form.value["returnTiming"]) > new Date(form.value["pickupTiming"])) {
      this.vehicleService.getAvailableVehicles(form)
        .subscribe({
          next: response => {
            this.activateVehiclesTable();
            this.dateTimeError = undefined;
            let timingDifference = Math.floor((new Date(form.value["returnTiming"]).getTime() - 
              new Date(form.value["pickupTiming"]).getTime()) / (1000 * 60));
            this.available.emit([response, form.value["pickupTiming"], form.value["returnTiming"], timingDifference]);
            form.reset();
          },
          error: e => this.serverError = "Problemi con il server"
        })
      }
      else
      {
        this.dateTimeError = "Periodo non corretto";
        setTimeout(() => {
          this.dateTimeError = undefined;
          form.reset();
        },3000)
      }
    }
}
