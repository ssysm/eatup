import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {DetailComponent} from "./event/detail/detail.component";
import {CreateComponent} from "./event/create/create.component";
import {HomeComponent} from "./home/home.component";
import {MyEventComponent} from "./event/my-event/my-event.component";
import {GuardService} from "./auth/guard.service";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'auth',
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignupComponent
      }
    ]
  },
  {
    path:"event",
    children:[
      {
        path:'id/:id',
        component:DetailComponent,
      },
      {
        path:'create',
        component:CreateComponent,
        canActivate:[GuardService]
      },
      {
        path:'me',
        component:MyEventComponent,
        canActivate:[GuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
