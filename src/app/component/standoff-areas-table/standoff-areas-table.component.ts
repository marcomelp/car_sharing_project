import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StandoffArea } from 'src/app/model/standoff-area';

@Component({
  selector: 'app-standoff-areas-table',
  templateUrl: './standoff-areas-table.component.html',
  styleUrls: ['./standoff-areas-table.component.css']
})
export class StandoffAreasTableComponent 
{
  //ATTRIBUTI
  @Input() isVisible: boolean = false;
  @Output() standoffAreaScheda = new EventEmitter<StandoffArea>();
  @Input() standoffareas:StandoffArea[]|undefined;

  //METODO PER APRIRE POPUP SCHEDA DATI AREA DI STAZIONAMENTO
  activateStandoffAreaSchedaPopup(standoff:StandoffArea): void
  {
    this.standoffAreaScheda.emit(standoff);
  }
}
