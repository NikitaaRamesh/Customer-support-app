import { HomeComponent } from './examples/home.component';
import { MainGridPageComponent } from './main-grid-page/main-grid-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'main-grid-page', children:[
    {
      path:'',
      component: MainGridPageComponent
    },
    {
      path: ':id',
      component: UserDetailsComponent
    },
  ]
  },
  { path: 'login-page', component: LoginPageComponent},
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: '**', redirectTo: '/main-grid-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }), TranslateModule],
  exports: [RouterModule, TranslateModule],
  providers: [AuthService]
})
export class AppRoutingRoutingModule { }
