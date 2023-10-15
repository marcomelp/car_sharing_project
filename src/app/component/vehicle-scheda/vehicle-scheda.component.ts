import { Rental } from 'src/app/model/rental';
import { Vehicle } from './../../model/vehicle';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RentalService } from 'src/app/service/rental.service';
import { UserDashComponent } from '../user-dash/user-dash.component';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-vehicle-scheda',
  templateUrl: './vehicle-scheda.component.html',
  styleUrls: ['./vehicle-scheda.component.css']
})
export class VehicleSchedaComponent 
{

  constructor(private rentalService:RentalService, private api:UserDashComponent){}

  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter();
  @Output() leaveAndClose = new EventEmitter();
  @Input() vehicle: Vehicle | undefined;
  @Input() rental: Rental | undefined;
  @Input() datiNoleggio: any[]|undefined;
  @Input() importoNoleggio:number = 0;
  @Input() user:User|undefined;
  @ViewChild('cvv') cvvInput!: ElementRef;
  serverError:any;

  //METODO PER CHIUDERE SCHEDA VEICOLO
  deactivateVehicleSchedaPopup(): void
  {
    this.cvvInput.nativeElement.value = '';
    this.leave.emit()
  }

  confirmAndCreateRental(){
    let rental:Rental = {pickupTiming:this.datiNoleggio![1],
    returnTiming:this.datiNoleggio![2],
    amount:this.importoNoleggio,
    vehicle:{id:this.vehicle?.id},
    user:{id:this.user?.id}}
    this.rentalService.createRental(rental).subscribe({
      next:response =>{
        if(response.code == 201)
        this.leaveAndClose.emit()
        this.cvvInput.nativeElement.value = '';
      },
      error: e =>{
        this.serverError = e.message
      }
    })
  }
}
