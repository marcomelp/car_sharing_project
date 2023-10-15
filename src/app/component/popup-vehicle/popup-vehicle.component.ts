import { VehicleService } from './../../service/vehicle.service';
import { Vehicle } from './../../model/vehicle';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StandoffArea } from 'src/app/model/standoff-area';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-popup-vehicle',
  templateUrl: './popup-vehicle.component.html',
  styleUrls: ['./popup-vehicle.component.css']
})
export class PopupVehicleComponent 
{
  @Input() isVisible: boolean = false;
  @Input() standoffareas: StandoffArea[]|undefined;
  @Output() leave = new EventEmitter();
  @Input() vehicle:Vehicle|undefined;
  serverError:any

  constructor (private vehicleService:VehicleService) { }


  // metodo per abbandonare la procedura e chiudere il popup
  leaveVehicleForm(form:NgForm):void {
    form.reset();
    this.standoffareas = undefined;
    this.leave.emit();
  }

  // metodo per la gestione del form invocato dal submit
  formManager(form:NgForm):void {
    //if(!this.book)
      this.createVehicle(form);
    //else
      //this.updateBook(form);
  }

  // metodo per creare e registrare un nuovo veicolo
  createVehicle(form:NgForm):void {
    let vehicleStandoffArea:StandoffArea|undefined = this.selectStandoffById(parseInt(form.value["standoffArea"]));
    console.log(vehicleStandoffArea);
    if(vehicleStandoffArea) {
      let vehicle:Vehicle = {
        plateNumber:form.value["plateNumber"],
        registrationYear:form.value["registrationYear"],
        lastKm:form.value["lastKm"],
        lastDetenctionDate:form.value["lastDetenctionDate"],
        lastReviewDate:form.value["lastReviewDate"],
        state:form.value["state"],
        rate:form.value["rate"],
        standoffArea:vehicleStandoffArea
      }; console.log(vehicle)
      this.vehicleService.vehicleRegistration(vehicle)
        .subscribe({
          next: response => {
            if(response.code == 201) {
              form.reset();
              this.standoffareas = undefined;
              this.leave.emit();
            }
          },
          error: e => console.log(e)
        })
    }
  }

  // metodo per selezionare l'area di un veicolo in base al suo id
  selectStandoffById(standoffId:number):StandoffArea|undefined {
    if(this.standoffareas) {
      let index = this.standoffareas.findIndex(a => a.id == standoffId);
      return this.standoffareas[index];
    }
    return undefined;
  }
}