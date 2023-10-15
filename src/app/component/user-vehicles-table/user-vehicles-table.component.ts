import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';

@Component({
  selector: 'app-user-vehicles-table',
  templateUrl: './user-vehicles-table.component.html',
  styleUrls: ['./user-vehicles-table.component.css']
})
export class UserVehiclesTableComponent 
{
  //ATTRIBUTI
  @Input() isVisible:boolean = false;
  @Output() vehicleScheda = new EventEmitter<Vehicle>();
  @Input() vehicles: Vehicle[] | undefined;

  //METODO PER ATTIVAZIONE POPUP SCHEDA DATI VEICOLO
  activateVehicleSchedaPopup(vehicle:Vehicle): void
  {
    this.vehicleScheda.emit(vehicle);
  }


}
