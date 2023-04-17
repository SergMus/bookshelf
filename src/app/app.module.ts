import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/authentication/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/auth/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpService } from './services/http/http.service';
import { API_URL_1, API_URL_2 } from './shared/constants/inject-tokens';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [AuthService],
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    LoginComponent,
    ToolbarComponent,
    UserProfileComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    INTERCEPTOR_PROVIDER,
    HttpService,
    { provide: API_URL_1, useValue: 'https://reqres.in/api/users/' },
    {
      provide: API_URL_2,
      useValue: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
