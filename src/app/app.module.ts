import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsComponent } from './components/listings/listings.component';
import { ListingComponent } from './components/listing/listing.component';
import { ToListingImagePipe } from './pipes/to-listing-image/to-listing-image.pipe';
import { PricePipe } from './pipes/price/price.pipe';
import { LoginComponent } from './components/login/login.component';
import { AccessTokenInterceptor } from './services/access-token-interceptor/access-token.interceptor';
import { initializeAppFactory } from './services/app-initializer/app-initializer';
import { AuthService } from './services/auth/auth.service';
import { AddListingComponent } from './components/add-listing/add-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    ListingComponent,
    ToListingImagePipe,
    PricePipe,
    LoginComponent,
    AddListingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
