import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent{

  @Input() vehiclelibero:number = 0;
  @Input() vehicleoccupato:number = 0;
  @Input() standoffarealibero:number = 0;
  @Input() standoffareaoccupato:number = 0;
  @Input() userregistrati:number = 0;
  @Input() rentalprenotati:number = 0;
  @Input() rentalincorso:number = 0;
  @Input() rentalterminati:number = 0;
  
}
