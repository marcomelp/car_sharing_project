import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-remove-auto-confirm-popup',
  templateUrl: './remove-auto-confirm-popup.component.html',
  styleUrls: ['./remove-auto-confirm-popup.component.css']
})
export class RemoveAutoConfirmPopupComponent {
  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter;
  @Output() delete = new EventEmitter<number>();
  serverError:any;
  @Input() vehicle:Vehicle|undefined;

  constructor(private vehicleService:VehicleService) { }

  deleteVehicle(vehicleId:number):void {
    this.vehicleService.deleteVehicle(vehicleId)
      .subscribe({
        next: response => {
          if(response.code == 202) {
            this.delete.emit(vehicleId);
            this.leave.emit();
          }
        },
        error: e => {
          if(e.status == 406) {
            this.serverError = "Cancellazione Impossibile";
            setTimeout(() => {
              this.serverError = undefined;
            }, 2000)
          }
            
          else
            this.serverError = e.message;
        }
      })
  }

  deactivateRemoveAutoConfirmPopup(): void
  {
    this.leave.emit()
  }
}
