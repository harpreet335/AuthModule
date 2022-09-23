import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthIntercpetor } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers:[
        ShoppingListService, 
        RecipeService,
        { 
            provide:HTTP_INTERCEPTORS, 
            useClass:AuthIntercpetor, 
            multi:true 
        }
    ]
})
export class AppCoreModule{}