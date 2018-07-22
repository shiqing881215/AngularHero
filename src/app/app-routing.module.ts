import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// The routes
// each route needs two attributes : path (url) and the component it will render
const routes : Routes = [
  {path : 'heroes', component : HeroesComponent},
  {path : 'dashboard', component : DashboardComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // this is for default view
  {path: 'detail/:id', component: HeroDetailComponent }
]

@NgModule({
  // This will start the router to listen for url change
  imports: [ RouterModule.forRoot(routes) ], 
  exports : [RouterModule]
})
export class AppRoutingModule { }
