import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add', component: CarAddComponent },
  { path: 'list', component: CarListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
