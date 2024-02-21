import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './guards/auth.guard';
import { cantActivateGuard, cantMatchGuard } from './guards/public.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule),
    canMatch: [cantMatchGuard], //Anclamos la función del canMatch
    canActivate: [cantActivateGuard]
  },
  {
    path:'movies',
    loadChildren:()=>import('./movies/movies.module').then(m => m.MoviesModule),
    canMatch: [canMatchGuard], //Anclamos la función del canMatch
    canActivate: [canActivateGuard]
  },
  {
    path:'users',
    loadChildren:()=>import('./users/users.module').then(m  => m.UsersModule),
    canMatch: [canMatchGuard], //Anclamos la función del canMatch
    canActivate: [canActivateGuard]
  },
  {
    path:'404',
    component:Error404PageComponent
  },
  {
    path:'**',
    redirectTo:'auth',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
