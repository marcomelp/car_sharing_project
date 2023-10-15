import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent 
{
  //ATTRIBUTI
  @Input() isVisible: boolean = false;
  @Output() userScheda = new EventEmitter();
  @Input() users: User[]|undefined;

  
  //METODO PER ATTIVAZIONE POPUP SCHEDA DATI UTENTE
  activateUserSchedaPopup(user: User): void
  {
    this.userScheda.emit(user);
  }
}
