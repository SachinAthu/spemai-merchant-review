import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectComponent } from './pages/redirect/redirect.component';
import { ReviewComponent } from './pages/review/review.component';
import { UnauthComponent } from './pages/unauth/unauth.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'unauth',
    component: UnauthComponent,
    pathMatch: 'full'
  },
  {
    path: 'redirect/:id',
    component: RedirectComponent
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
