import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

// Router tutorial: https://www.codingame.com/playgrounds/8104/angular-router-tutorial

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default component for router-outlet
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
