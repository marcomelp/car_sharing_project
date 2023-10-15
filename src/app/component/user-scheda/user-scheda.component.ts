import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-scheda',
  templateUrl: './user-scheda.component.html',
  styleUrls: ['./user-scheda.component.css']
})
export class UserSchedaComponent 
{
  //ATTRIBUTI
  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter();
  @Input() user: User | undefined;

  //METODO PER CHIUDERE SCHEDA
  deactivateUserSchedaPopup(): void
  {
    this.leave.emit()
  }
}
