import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { ServiceResponse } from '../model/service-response';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';


//API endpoints
const VEHICLES_GET_API = "http://localhost:8080/carsharing/vehicle/get";
const VEHICLES_POST_API = "http://localhost:8080/carsharing/vehicle/reg";
const VEHICLES_PUT_API = "http://localhost:8080/carsharing/vehicle/update";
const VEHICLES_DELETE_API = "http://localhost:8080/carsharing/vehicle/delete";
const VEHICLES_SEARCH_API = "http://localhost:8080/carsharing/vehicle/gethour";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private adminService:AdminService,
              private userService:UserService,
              private http:HttpClient) { }

  //metodo per ottenere elenco dei veicoli
  public getVehicles():Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(VEHICLES_GET_API)
  }

  // metodo per registrare un nuovo veicolo
  public vehicleRegistration(vehicle:Vehicle):Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(`${VEHICLES_POST_API}/${this.adminService.getAdminToken()}`, vehicle);
  }

  // metodo per modificare i dati di un veicolo
  public vehicleDataUpdate(vehicle:Vehicle):Observable<ServiceResponse> {
    return this.http.put<ServiceResponse>(`${VEHICLES_PUT_API}/${this.adminService.getAdminToken()}`, vehicle);
  }

  // metodo per cancellare un veicolo
  public deleteVehicle(vehicleId:number):Observable<ServiceResponse> {
    return this.http.delete<ServiceResponse>(`${VEHICLES_DELETE_API}/${vehicleId}/${this.adminService.getAdminToken()}`);
  }

  // metodo per ottenere lista veicoli disponibili
  public getAvailableVehicles(form:NgForm):Observable<Vehicle[]>{
    return this.http.put<Vehicle[]>(`${VEHICLES_SEARCH_API}/${this.userService.getUserToken()}`, form.value)
  }
}


