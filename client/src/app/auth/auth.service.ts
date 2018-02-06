import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import 'rxjs/Rx';
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

 async getUsername(ObjId){
    const res = await this.http
      .get(environment.apiBase + '/users/id/' + ObjId).toPromise();
    return res.text();
  }

  isLoggedIn(){
    return !!(localStorage.getItem('loggedIn') && sessionStorage.getItem('token'));
  }

  logout(){
    localStorage.setItem('loggedIn','false');
    sessionStorage.clear();
    return true;
  }

}
