import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../model/service-response';
import { User } from '../model/user';

//API endpoints
const USER_REG_API = "http://localhost:8080/carsharing/user/reg";
const USER_LOGIN_API = "http://localhost:8080/carsharing/user/login";
const USER_GET_API = "http://localhost:8080/carsharing/user/get";
const USER_LOGOUT_API = "http://localhost:8080/carsharing/user/logout";
const USER_PUT_API = "http://localhost:8080/carsharing/user/update";
const USER_DATA_API = "http://localhost:8080/carsharing/user/getlogged";

// CHIAVI LOCAL STORAGE
const USER_STORAGE_ID = "uid";
const USER_STORAGE_TKN = "utkn";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // INVOCAZIONE ENDPOINT
  // registrazione cliente
  public userRegistration(customer:User):Observable<ServiceResponse> {

    return this.http.post<ServiceResponse>(USER_REG_API, customer);
  }

  // login cliente
  public userLogin(customer:User):Observable<ServiceResponse> {

    return this.http.put<ServiceResponse>(USER_LOGIN_API, customer);
  }

  // lista clienti
  public getUsers():Observable<User[]> {
    return this.http.get<User[]>(USER_GET_API)
  }

  // logout cliente loggato
  public userLogout():Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${USER_LOGOUT_API}/${this.getUserToken()}`)
  }

  // dati completi user loggato
  public getUserData(): Observable<User>{
    return this.http.get<User>(`${USER_DATA_API}/${this.getUserToken()}`)
  }

  // METODI DI SERVIZIO INTERNI
  // salvataggio dati cliente nel Local Storage
  public saveUserData(id:any, token:string):void {

    localStorage.setItem(USER_STORAGE_ID, id);
    localStorage.setItem(USER_STORAGE_TKN, token);
  }

  // ottenimento token cliente
  public getUserToken():string {
    if(localStorage.getItem(USER_STORAGE_TKN))
      return localStorage.getItem(USER_STORAGE_TKN) as string;
    return "_";
  }

  // controllo stato di login del cliente
  public checkUserLoginState():boolean {
    return localStorage.getItem(USER_STORAGE_TKN) != null;
  }

  // ottenimento id cliente
  public getUserId():number {
    if(localStorage.getItem(USER_STORAGE_ID))
      return parseInt(localStorage.getItem(USER_STORAGE_ID)!);
    return 0;
  }

  // rimozione credenziali cliente al logout
  public removeUserCredential():void {
    if(localStorage.getItem(USER_STORAGE_ID) && localStorage.getItem(USER_STORAGE_TKN)) {
      localStorage.removeItem(USER_STORAGE_ID);
      localStorage.removeItem(USER_STORAGE_TKN);
    }
  }

  //metodo per modificare i dati di un cliente già registrato
  public userDataUpdate(user:User): Observable<ServiceResponse>
  {
    return this.http.put<ServiceResponse>(`${USER_PUT_API}/${this.getUserToken()}`, user);
  }
}
