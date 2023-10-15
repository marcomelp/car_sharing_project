import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css']
})
export class VehiclesTableComponent {

  // attributi
  @Input() isVisible:boolean = false;
  @Output() vehicleScheda = new EventEmitter<Vehicle>();
  @Input() vehicles:Vehicle[]|undefined;

  //METODO PER APRIRE POPUP SCHEDA DATI VEICOLI
  activateVehicleSchedaPopup(vehicle:Vehicle): void
  {
    this.vehicleScheda.emit(vehicle);
  }
}
