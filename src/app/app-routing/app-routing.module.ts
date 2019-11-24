import { HomeComponent } from './../home/home.component';
import { PedidoComponent } from './../pedido/pedido.component';
import { AppComponent } from './../app.component';
import { Pedido } from './../pedido/pedido';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

const appRoutes: Routes = [
  { path: 'pedidos', component: PedidoComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
