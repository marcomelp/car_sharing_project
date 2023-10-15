import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  // attributi 
  @Input() isVisible:boolean = false;
  serverError:any;
  @Output() leave = new EventEmitter();
  @Output() login = new EventEmitter();

  constructor(private userService:UserService) { }

  // abbandono procedura di login
  leaveLogin(form:NgForm):void {
    form.reset();
    this.serverError = undefined;
    this.leave.emit();
  }

  formManager(form:NgForm):void {
    let user:User = {
      mail:form.value["mail"],
      password:form.value["password"]
    };
    this.userService.userLogin(user)
      .subscribe({
        next: response => {
          this.userService.saveUserData(response.code, response.message);
          this.serverError = undefined;
          form.reset();
          this.login.emit();
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
