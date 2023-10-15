import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';
import { ServiceResponse } from '../model/service-response';

// API endpoints
const ADMIN_LOGIN_API:string = "http://localhost:8080/carsharing/admin/login";
const ADMIN_LOGOUT_API:string = "http://localhost:8080/carsharing/admin/logout";

// Local Storage keys
const ADMIN_STORAGE_TKN:string = "atkn";

@Injectable({
  providedIn: 'root'
})
export class AdminService 
{
  constructor(private http:HttpClient) { }

  // METODI DI INVOCAZIONE API
  // login amministratore
  public adminLogin(admin:Admin):Observable<ServiceResponse>
  {
    return this.http.put<ServiceResponse>(ADMIN_LOGIN_API, admin);
  }
  // logout amministratore
  public adminLogout():Observable<ServiceResponse>
  {
    return this.http.get<ServiceResponse>(`${ADMIN_LOGOUT_API}/${this.getAdminToken()}`);
  }

  // METODI DI SERVIZIO INTERNI
  // salvataggio token nel Local Storage
  public saveAdminToken(token:string):void
  {
    localStorage.setItem(ADMIN_STORAGE_TKN, token);
  }
  // ottenimento token dal Local Storage
  public getAdminToken():string
  {
    if(localStorage.getItem(ADMIN_STORAGE_TKN))
      return localStorage.getItem(ADMIN_STORAGE_TKN) as string;
    return "_";
  }
  // rimozione token dal Local Storage in fase di logout
  public removeAdminToken():void
  {
    if(localStorage.getItem(ADMIN_STORAGE_TKN))
      localStorage.removeItem(ADMIN_STORAGE_TKN);
  }

  // controllo stato di login admin
  public checkAdminLoginState():boolean {
    return localStorage.getItem(ADMIN_STORAGE_TKN) != null;
  }
}