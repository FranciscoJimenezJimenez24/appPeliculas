import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'movies',
    loadChildren:()=>import('./movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path:'users',
    loadChildren:()=>import('./users/users.module').then(m  => m.UsersModule)
  },
  {
    path:'404',
    component:Error404PageComponent
  },
  {
    path:'**',
    redirectTo:'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
