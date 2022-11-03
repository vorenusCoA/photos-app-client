import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotosComponent } from './photos/photos.component';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AuthImagePipe } from './authImagePipe';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    AuthImagePipe,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AuthModule.forRoot({
      domain: '',
      clientId: '',
      audience: 'spring.photos.com',
      scope: 'read:photos write:photos',
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts with (note the asterisk)
            uri: 'http://localhost:8080/api/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'spring.photos.com',

              // The attached token should have these scopes
              scope: 'read:photos write:photos'
            }
          }
        ]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
