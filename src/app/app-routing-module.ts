import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoard } from './dash-board/dash-board';
import { Home } from './home/home';

const routes: Routes = [
  {path : "" , component : Home , title : "Home"},
  {path: "dashboard", component: DashBoard , title : "DashBoard"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
