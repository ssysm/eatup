import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Injectable()
export class GuardService {

  constructor(
    private authService:AuthService
  ) { }

  canActivate(){
    return this.authService.isLoggedIn();
  }

}
