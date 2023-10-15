import { Component, Input } from '@angular/core';
import { Rental } from 'src/app/model/rental';

@Component({
  selector: 'app-rentals-table',
  templateUrl: './rentals-table.component.html',
  styleUrls: ['./rentals-table.component.css']
})
export class RentalsTableComponent 
{
  @Input() isVisible: boolean = false;
  @Input() rentals:Rental[]|undefined;
}
