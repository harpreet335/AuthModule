import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable,  Subject,  throwError } from "rxjs";
import { catchError,  tap } from "rxjs/operators";
import { UserModel } from "./user.model";


export interface AuthResponseModel{
    idToken :	string;
    email:	string;
    refreshToken:	string;
    expiresIn:	string;
    localId: string;
    kind:string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http: HttpClient,private router : Router){}
    //loggedUser = new Subject<UserModel>();
    loggedUser = new BehaviorSubject<UserModel>(null);
    tokenExpirationTimer : any;

    AutoLoadUser(){
        let user : {email: string, id: string, _token :string, _expirationDate : Date} =  JSON.parse(localStorage.getItem('userObj'));

        if(!user)
        {
            return;
        }
        const userObj = new UserModel(user.email, user.id, user._token, new Date(user._expirationDate));
        if(userObj.Token)
        {
            this.loggedUser.next(userObj);
            const expiresIn = new Date(user._expirationDate).getTime() - new Date().getTime();
            this.AutoLogOut(expiresIn);
        }
    }

    logUserOut(){
        this.loggedUser.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userObj');
        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer  = null;
      }

    AutoLogOut(expiresIn : number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logUserOut();
        }, expiresIn);
    }

    OnSignUp(email:string,password: string) : Observable<any>{
       return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASWE_3EgFO_2vn5Ms_4jblDgJvUaqSCIA',
        {
            email : email,
            password : password,
            returnSecureToken : true
        }).pipe(catchError((error)=>{
            let errMsg :string = "Some unknown error occured on the server";
            if(!error.error.error.message || !error.error)
            {
                return throwError(errMsg);    
            }
            switch(error.error.error.message)
            {
              case 'EMAIL_EXISTS':
                errMsg="The email address is already in use by another account.";
            }
            return throwError(errMsg);
        }), tap((userResponse)=>{
            const expirationDate = new Date(new Date().getTime() + +userResponse.expiresIn * 1000);
            const user = new UserModel(userResponse.email,userResponse.localId,userResponse.idToken,expirationDate);
            localStorage.setItem('userObj',JSON.stringify(user));
            this.loggedUser.next(user);
            this.AutoLogOut(+userResponse.expiresIn * 1000);
        }));
    }


    OnSignIn(Email : string, Password : string): Observable<any>{
        return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASWE_3EgFO_2vn5Ms_4jblDgJvUaqSCIA',
        {
            email:Email,
            password: Password,
            returnSecureToken : true
        }).pipe(catchError((this.HandleError)),tap((response)=>{this.SaveUserDetails(response.email,response.localId,response.idToken, +response.expiresIn)}));
    }

    private HandleError(responseErr : HttpErrorResponse){
        let errMsg :string = "Some unknown error occured on the server";
        if(!responseErr.error.error)
        {
            return throwError(errMsg);
        }
        
        switch(responseErr.error.error.message)
        {
            case 'INVALID_PASSWORD':
                errMsg="The password is invalid or the user does not have a password.";
                break;
            case 'EMAIL_NOT_FOUND':                    
                errMsg="There is no user record corresponding to this identifier. The user may have been deleted.";
                break;
            case 'USER_DISABLED':
                errMsg="The user account has been disabled by an administrator.";
                break;
        }
        return throwError(errMsg);
    }

    private SaveUserDetails(email : string, id : string, token : string , expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new UserModel(email,id,token,expirationDate);
        localStorage.setItem('userObj',JSON.stringify(user));
        this.loggedUser.next(user);
        this.AutoLogOut(expiresIn * 1000);
    }
}