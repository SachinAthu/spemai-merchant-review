import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewComponent } from './pages/review/review.component';
import { UnauthComponent } from './pages/unauth/unauth.component';

const routes: Routes = [
  {
    path: 'unauth',
    component: UnauthComponent,
  },
  {
    path: ':appId/:transId',
    component: ReviewComponent
  },
  {
    path: ':appId',
    component: ReviewComponent
  },
  {
    path: '**',
    component: UnauthComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
