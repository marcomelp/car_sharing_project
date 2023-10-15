import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { AdminService } from './admin.service';
import { StandoffArea } from '../model/standoff-area';

//API ENDPOINTS
const STANDOFF_AREA_POST_API: string = "http://localhost:8080/carsharing/standoffarea/reg"
const STANDOFF_AREA_GET_API: string= "http://localhost:8080/carsharing/standoffarea/get"
const STANDOFF_AREA_DELETE_API: string= "http://localhost:8080/carsharing/standoffarea/delete"
const STANDOFF_AREA_PUT_API: string= "http://localhost:8080/carsharing/standoffarea/update"

@Injectable({
  providedIn: 'root'
})
export class StandoffAreaService {

  constructor
  (
    private http:HttpClient,
    private adminService: AdminService
  ) { }

  //METODO PER OTTENERE L'ELENCO DELLE STANDOFF AREA
  public getStandoffAreas():Observable<StandoffArea[]> //metodo che restituisce array di StandoffArea (vedi rigo 5)
  {
    return this.http.get<StandoffArea[]>(STANDOFF_AREA_GET_API); //metodo get legge
  }

  //metodo per registrare nuova area
  public createStandoffArea(standoffArea:StandoffArea):Observable<ServiceResponse>
  {
    return this.http.post<ServiceResponse>
      (`${STANDOFF_AREA_POST_API}/${this.adminService.getAdminToken()}`, standoffArea); //metodo post 
  }

  //metodo per aggiornare i dati di una area esistente
  public updateStandoffArea(standoffArea:StandoffArea):Observable<ServiceResponse>
  {
    return this.http.put<ServiceResponse>
    (`${STANDOFF_AREA_PUT_API}/${this.adminService.getAdminToken()}`, standoffArea) 
  }

  //metodo per cancellare area esistente
  public deleteStandoffArea(standoffAreaId:number):Observable<ServiceResponse> //a sto giro mi prendo solo l'Id dell'area
  {
    return this.http.delete<ServiceResponse>(`${STANDOFF_AREA_DELETE_API}/${standoffAreaId}/${this.adminService.getAdminToken()}`); //nei backtick ci passo la costante(rigo 10) e l'id dell'autore(rigo 42)
  }

}
