import { StandoffArea } from 'src/app/model/standoff-area';
import { StandoffAreaService } from './../../service/standoff-area.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-standoff-area-scheda',
  templateUrl: './standoff-area-scheda.component.html',
  styleUrls: ['./standoff-area-scheda.component.css']
})
export class StandoffAreaSchedaComponent 
{
  // attributi
  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter;
  @Output() delete = new EventEmitter<number>();
  serverError:any;
  @Input() standoffareas:StandoffArea|undefined;
  @Output() openPopup = new EventEmitter<StandoffArea>();

  // costruttore
  constructor(private standoffAreaService:StandoffAreaService) { }

  //METODO PER CHIUDERE SCHEDA DATI AREA DI STAZIONAMENTO
  deactivateStandoffAreaSchedaPopup(): void
  {
    this.leave.emit()
  }

  activateRemoveStandoffConfirmPopup(standoffareas:StandoffArea):void{
    this.openPopup.emit(standoffareas);
  }
}
