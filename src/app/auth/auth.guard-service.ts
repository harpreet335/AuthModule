import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authSvc : AuthService, private routerSvc :  Router){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authSvc.loggedUser.pipe(take(1),map((response)=>{
            let auth : boolean;
            auth = response ? true : false;
            if(auth)
            {
                return true;
            }
                return this.routerSvc.createUrlTree(['/auth']);
        }))
    }

}