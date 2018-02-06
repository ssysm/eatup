import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/finally';
@Pipe({
  name: 'toUsername'
})
export class ToUsernamePipe implements PipeTransform {

  result = '';

  constructor(
    private authService:AuthService
  ){

  }

 async transform(value: string){
    return await this.authService.getUsername(value)
  }
}
