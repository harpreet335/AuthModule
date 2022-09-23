import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthIntercpetor implements HttpInterceptor, OnDestroy{
    constructor(private authSvc: AuthService){
    }
    userSubscription : Subscription;

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authSvc.loggedUser.pipe(take(1),exhaustMap((userData)=>{
            if(!userData)
            {
                return next.handle(req);
            }
            const modifiedRequest = req.clone({params: req.params.append("auth",userData.Token)});
            return next.handle(modifiedRequest);
        }))

        // console.log(req.url);
        // if(!req.url.includes('recipes'))
        // {
        //     return next.handle(req);
        // }

        // let authToken:string=null;
        // this.userSubscription = this.authSvc.loggedUser.pipe(take(1)).subscribe((res)=>{
        //     authToken = res.Token;
        // });
        // const modifiedRequest = req.clone({params: req.params.append("auth",authToken)});
    }
}