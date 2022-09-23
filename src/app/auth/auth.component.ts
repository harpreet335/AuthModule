import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert-box/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseModel, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
  constructor( private authSvc : AuthService, private router : Router, private componentFactoryResolver : ComponentFactoryResolver){}
  IsLogin = true;
  IsLoading=false;
  authForm : FormGroup;
  error : string =null;
  @ViewChild(PlaceholderDirective,{static : true}) alertHost;
  closesub : Subscription;

  
  ngOnInit(): void {
    this.authForm = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }

  onClosePopUp(){
    this.error = null;
  }


  SwitchToLogin(){
    this.error = null;
    this.IsLogin = !this.IsLogin;
  }

  private showErrorComponent(errorMsg : string)
  {
      const compFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const hostComponent = hostViewContainerRef.createComponent(compFactory);
      hostComponent.instance.errorMsg = errorMsg;
      this.closesub = hostComponent.instance.closePopUp.subscribe(()=>{
          this.closesub.unsubscribe();
          hostViewContainerRef.clear();
      });
  }

  onFormSubmit()
  {
    const emailId = this.authForm.value.email;
    const password  = this.authForm.value.password;
    this.error = null;
    let  responseObs : Observable<AuthResponseModel>;
    console.log("Inside OnFormSubmit method");
    if(!this.authForm.valid)
    {
      return;
    }
    console.log(this.authForm.value);
    
    if(this.IsLogin)
    {
          this.IsLoading = true;
          responseObs = this.authSvc.OnSignIn(emailId,password);
    }
    else
    {
          this.IsLoading = true;
          responseObs = this.authSvc.OnSignUp(emailId,password);
    }

    responseObs.subscribe((response)=>{
          this.IsLoading = false;
          console.log(response);
          this.router.navigate(["/recipes"])
        },(error)=>{
          this.IsLoading = false;
          this.error = error;
          this.showErrorComponent(error);
          console.log(error);
        });
    this.authForm.reset();
  }
}
