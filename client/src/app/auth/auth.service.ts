import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import 'rxjs/operator/map';
@Injectable()
export class AuthService {

  constructor(
    private http:Http
  ) { }

  login(cred){
    return this.http
      .post(environment.apiBase+'/users/login',cred)
  }

  signup(cred){
    return this.http
      .post(environment.apiBase+'/users/',cred)
  }

  getUsername(ObjId){
    return this.http
      .get(environment.apiBase+'/users/id/'+ObjId)
  }

  isLoggedIn(){
    return localStorage.getItem('loggedIn') == 'true';
  }

  logout(){
    localStorage.setItem('loggedIn','false');
    sessionStorage.clear();
    return true;
  }

}
