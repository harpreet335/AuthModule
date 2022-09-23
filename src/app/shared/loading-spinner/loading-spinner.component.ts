import { Component } from "@angular/core";

@Component({
    selector:"loading-spinner",
    template:'<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
    styleUrls:['./loading-spinner.css']
})
export class LoadingSpinnerComponent{

}