import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthComponent } from './pages/unauth/unauth.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { ReviewComponent } from './pages/review/review.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UnauthComponent,
    RedirectComponent,
    ReviewComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
