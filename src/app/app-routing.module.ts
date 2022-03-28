import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectComponent } from './pages/redirect/redirect.component';
import { ReviewComponent } from './pages/review/review.component';
import { UnauthComponent } from './pages/unauth/unauth.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'redirect/:id',
    component: RedirectComponent
  },
  {
    path: 'review/:id',
    component: ReviewComponent
  },
  {
    path: 'unauth',
    component: UnauthComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
