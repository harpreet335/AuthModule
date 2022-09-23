import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert-box/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent
    ],
    imports:[CommonModule],
    exports:[
        AlertComponent,        
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule{}