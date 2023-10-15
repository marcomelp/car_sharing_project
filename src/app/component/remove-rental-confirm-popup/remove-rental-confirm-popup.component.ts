import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rental } from 'src/app/model/rental';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-remove-rental-confirm-popup',
  templateUrl: './remove-rental-confirm-popup.component.html',
  styleUrls: ['./remove-rental-confirm-popup.component.css']
})
export class RemoveRentalConfirmPopupComponent {
  @Input() isVisible: boolean = false;
  @Input() rental:Rental|undefined;
  serverError:any;
  @Output() delete = new EventEmitter<number>();
  @Output() leave = new EventEmitter();

  constructor(private rentalService:RentalService){}

  // metodo per eliminare un noleggio
  deleteRental(rentalId:number):void{
    this.rentalService.deleteRental(rentalId)
      .subscribe({
        next:response => {
          if(response.code == 202)
          this.delete.emit(rentalId);
          this.deactivateRentalRemovalPopup();
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

  deactivateRentalRemovalPopup():void{
    this.leave.emit();
  }
}
