import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './partical/navbar/navbar.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateComponent } from './event/create/create.component';
import { DetailComponent } from './event/detail/detail.component';
import {EventService} from "./event/event.service";
import { HomeComponent } from './home/home.component';
import { MyEventComponent } from './event/my-event/my-event.component';

import { AgmCoreModule } from '@agm/core';
import {GuardService} from "./auth/guard.service";
import { ToUsernamePipe } from './common/to-username.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    CreateComponent,
    DetailComponent,
    HomeComponent,
    MyEventComponent,
    ToUsernamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsUNYEKNF3n4IUNHjH3Rq6XS58lFgwKY4',
      libraries: ["places"]
    })
  ],
  providers: [AuthService,EventService,GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
