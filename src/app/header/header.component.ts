import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService, private authService : AuthService) {}
  isAuthenticated :boolean= false;
  authSubcription = new Subscription();
  
  ngOnDestroy(): void {
      this.authSubcription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubcription = this.authService.loggedUser.subscribe(result=>{
      console.log('Inside Header componenet.ts');
      console.log(result);
      this.isAuthenticated = result ? true: false;
    })
  }
  
  OnLogout(){
    this.authService.logUserOut();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
