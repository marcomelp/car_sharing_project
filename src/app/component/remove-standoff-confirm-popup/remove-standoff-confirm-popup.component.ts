import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StandoffArea } from 'src/app/model/standoff-area';
import { StandoffAreaService } from 'src/app/service/standoff-area.service';

@Component({
  selector: 'app-remove-standoff-confirm-popup',
  templateUrl: './remove-standoff-confirm-popup.component.html',
  styleUrls: ['./remove-standoff-confirm-popup.component.css']
})
export class RemoveStandoffConfirmPopupComponent {
  @Input() isVisible: boolean = false;
  @Output() leave = new EventEmitter;
  @Output() delete = new EventEmitter<number>();
  serverError:any;
  @Input() standoffArea:StandoffArea|undefined;

  constructor(private standoffAreaService:StandoffAreaService) { }

  deleteStandoff(standoffId:number):void {
    this.standoffAreaService.deleteStandoffArea(standoffId)
      .subscribe({
        next: response => {
          if(response.code == 202) {
            this.delete.emit(standoffId);
            this.leave.emit();
          }
        },
        error: e => {
          if(e.status == 406) {
            this.serverError = "Cancellazione Impossibile";
            setTimeout(() => {
              this.serverError = undefined;
            }, 2000)
          }
            
          else
            this.serverError = e.message;
        }
      })
  }

  deactivateRemoveStandoffConfirmPopup(): void
  {
    this.leave.emit()
  }
}
