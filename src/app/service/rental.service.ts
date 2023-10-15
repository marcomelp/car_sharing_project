import { Injectable } from '@angular/core';
import { Rental } from '../model/rental';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ServiceResponse } from '../model/service-response';
import { UserService } from './user.service';

// API endpoints
const RENTALS_GET_API="http://localhost:8080/carsharing/rental/get"
const RENTALS_POST_API="http://localhost:8080/carsharing/rental/reg"
const RENTALS_DELETE_API="http://localhost:8080/carsharing/rental/delete"

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  // costruttore
  constructor(private http:HttpClient,
    private userService:UserService) { }

    // metodo per ottenere elenco dei noleggi
    public getRentals():Observable<Rental[]>{
    return this.http.get<Rental[]>(RENTALS_GET_API);
  }

  // metodo per registrare un nuovo
  public createRental(rental:Rental):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(`${RENTALS_POST_API}/${this.userService.getUserToken()}`, rental);
  }

  // metodo per cancellare un autore esistente
  public deleteRental(rentalId:number):Observable<ServiceResponse>
  {
    return this.http.delete<ServiceResponse>(`${RENTALS_DELETE_API}/${rentalId}/${this.userService.getUserToken()}`);
  }
}
