import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsComponent } from './components/listings/listings.component';
import { ListingComponent } from './components/listing/listing.component';
import { ToListingImagePipe } from './pipes/to-listing-image/to-listing-image.pipe';
import { PricePipe } from './pipes/price/price.pipe';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { AccessTokenInterceptor } from './services/access-token-interceptor/access-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    ListingComponent,
    ToListingImagePipe,
    PricePipe,
    LoginComponent,
    AddListingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
