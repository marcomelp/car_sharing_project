import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StandoffArea } from 'src/app/model/standoff-area';
import { StandoffAreaService } from 'src/app/service/standoff-area.service';

@Component({
  selector: 'app-popup-standoff',
  templateUrl: './popup-standoff.component.html',
  styleUrls: ['./popup-standoff.component.css']
})
export class PopupStandoffComponent {

  @Input() isVisible: boolean = false;
  serverError: any;
  @Input() standoffArea:StandoffArea | undefined;
  @Output() leave = new EventEmitter();

  constructor(private standoffAreaService:StandoffAreaService) { }

  //metodo per abbandonare la procedura di registrazione e chiudere il popup
  leaveStandoffAreaForm(form:NgForm): void //deve emettere l'evento leave
  {
    form.reset(); //pulisco i campi di input
    this.leave.emit();
  }

  //metodo per la gestione del form(verrà invocato al submit, quando il form verrà inviato)
  formManager(form:NgForm): void //metodo che riceve ngForm sottoforma di form, con questo metodo colleghiamo all'evento submit
  {
      this.createStandoffArea(form); 
  }

  createStandoffArea(form:NgForm):void
  {
    let standoffArea:StandoffArea = {
      code:form.value["code"],
      street:form.value["street"],
      civic:form.value["civic"]
    };
    this.standoffAreaService.createStandoffArea(standoffArea)
      .subscribe({
        next: response => {
          if(response.code == 201)
          {
            form.reset();
            this.leave.emit();
          }
        },
        error: e => console.log(e)
      })
  }

}
