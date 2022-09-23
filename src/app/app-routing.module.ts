import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AuthModule } from './auth/auth.module';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes' , loadChildren: () => import("./recipes/recipe.module").then(module => module.RecipeModule) },
  { path: 'shopping-list', loadChildren : () => import('./shopping-list/shopping.module').then(module => module.ShoppingModule) },
  { path : 'auth', loadChildren : () => import('./auth/auth.module').then(module => module.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
