import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Vehicle } from 'src/app/model/vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { //implements OnInit DA METTEREEEE

  // attributi
  adminLoginPopupVisible:boolean = false;
  userLoginPopupVisible:boolean = false;
  userRegPopupVisible: boolean = false;
  userSchedaVisible: boolean = false;
  userLogged: boolean = false; //parto con user sloggato
  vehicles : Vehicle[] | undefined;

  constructor(private adminService:AdminService,
              private router:Router,
              private userService:UserService) { }


  //INIZIALIZZAZIONE
  ngOnInit(): void 
  {
    
  }

  // visualizzazione popup form login amministratore
  activateAdminLoginFormPopup():void
  {
    if(this.adminService.checkAdminLoginState())
      this.router.navigate(["admin"]);
    this.adminLoginPopupVisible = true;
  }

  // disattivazione popup form login amministratore
  deactivateAdminLoginFormPopup():void {
    this.adminLoginPopupVisible = false;
    }

  //gestione login amministratore
  adminLoginManager():void {
    this.adminLoginPopupVisible = false;
    this.router.navigate(["admin"]); // tramite il router il metodo navigate ci porta all'interno di admin
   }

  // visualizzazione popup form login cliente
  activateUserLoginFormPopup():void 
  {
    if(this.userService.checkUserLoginState())
      this.router.navigate(["user"]);
    this.userLoginPopupVisible = true;
  }

  // disattivazione popup form login cliente
  deactivateUserLoginFormPopup():void {
    this.userLoginPopupVisible = false;
  }

  //gestione login user
  userLoginManager():void {
    this.userLoginPopupVisible = false;
    this.router.navigate(["user"]); // tramite il router il metodo navigate ci porta all'interno di user
   }

  // METODO PER VISUALIZZARE POPUP FORM REGISTRAZIONE CLIENTE
  activateUserRegFormPopup():void
  {
    this.userRegPopupVisible = true;
  }

  // METODO PER DISATTIVAZIONE POPUP FORM REGISTRAZIONE CLIENTE
  deactivateUserRegFormPopup():void
  {
    this.userRegPopupVisible = false;
  }

  //METOO PER REGISTRAZIONE CLIENTE
  userRegistrationManager():void{
    this.userRegPopupVisible = false;
    this.userLoginPopupVisible = true;
  }

}
