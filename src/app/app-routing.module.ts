import { HomeComponent } from './examples/home.component';
import { MainGridPageComponent } from './main-grid-page/main-grid-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  { path: '', redirectTo: '/main-grid-page', pathMatch: 'full' },
  { path: '**', redirectTo: '/main-grid-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class AppRoutingRoutingModule { }
