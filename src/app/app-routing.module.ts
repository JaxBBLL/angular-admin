import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demo01Component } from './demo01/demo01.component';
import { Demo02Component } from './demo02/demo02.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', component: Demo01Component },
  { path: 'demo01', component: Demo01Component },
  { path: 'demo02', component: Demo02Component },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
