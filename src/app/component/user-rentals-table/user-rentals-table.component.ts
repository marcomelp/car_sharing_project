import { RentalService } from './../../service/rental.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rental } from 'src/app/model/rental';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-rentals-table',
  templateUrl: './user-rentals-table.component.html',
  styleUrls: ['./user-rentals-table.component.css']
})
export class UserRentalsTableComponent {

  // Attributi
  @Input() rentals: Rental[]| undefined;
  @Output() popup = new EventEmitter<Rental>();
  @Input() user:User|undefined;
  serverError:any;

  // costruttore
  constructor(private rentalService:RentalService){}

  


  // metodo per eliminare un noleggio
  activateRemoveRentalConfirmPopup(rental:Rental):void{
    this.popup.emit(rental);
  }
}
