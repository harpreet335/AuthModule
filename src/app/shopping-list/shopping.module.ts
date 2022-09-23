import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingRouterModule } from "./shopping-routing.module";

@NgModule({
    declarations:[    
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[FormsModule,ReactiveFormsModule,CommonModule,ShoppingRouterModule],
    exports:[
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingModule{
}