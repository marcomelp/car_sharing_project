import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent 
{
  // attributi
  @Input() isVisible:boolean = false;
  serverError:any;
  @Output() leave = new EventEmitter();
  @Output() loginChecked = new EventEmitter();

  // costruttore
  constructor(private adminService:AdminService) { }

  // abbandono procedura login
  leaveAdminLogin(form:NgForm):void
  {
    this.serverError = undefined;
    form.reset();
    this.leave.emit();
  }

  // metodo di gestione del form
  formManager(form:NgForm):void
  {
    let admin:Admin = {
      username:form.value["username"],
      password:form.value["password"]
    };
    this.adminService.adminLogin(admin)
      .subscribe({
        next: response => {
          /* if(response.code == 401)
            this.serverError = "Accesso Negato"; */
          if(response.code == 202)
          {
            this.adminService.saveAdminToken(response.message);
            this.serverError = undefined;
            form.reset();
            this.loginChecked.emit();
          }
        },
        error: e => {
          if(e.status == 401)
            this.serverError = "Accesso Negato";
          else
            this.serverError = "Problemi del Server";
        }
      });
  }
}