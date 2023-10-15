import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-admin-vehicle-scheda',
  templateUrl: './admin-vehicle-scheda.component.html',
  styleUrls: ['./admin-vehicle-scheda.component.css']
})
export class AdminVehicleSchedaComponent 
{
  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter;
  @Output() openPopup = new EventEmitter<Vehicle>();
  serverError:any;
  @Input() vehicles:Vehicle|undefined;

  //COSTRUTTORE
  constructor(private vehicleService:VehicleService) { }

  //METODO PER CHIUDERE SCHEDA DATI AREA DI STAZIONAMENTO
  deactivateVehicleSchedaPopup(): void
  {
    this.leave.emit()
  }

  activateRemoveAutoConfirmPopup(vehicles:Vehicle):void{
    this.openPopup.emit(vehicles);
  }

  
}
