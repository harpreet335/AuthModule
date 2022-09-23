import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'alert-box',
    templateUrl:"./alert.component.html",
    styleUrls:["./alert.component.css"]
})
export class AlertComponent{
@Input() errorMsg : string ;
@Output() closePopUp = new EventEmitter<void>();

ClosePopUp(){
    this.closePopUp.emit();
}

}