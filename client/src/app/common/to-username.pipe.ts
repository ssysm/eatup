import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../auth/auth.service";
@Pipe({
  name: 'toUsername'
})
export class ToUsernamePipe implements PipeTransform {

  constructor(
    private authService:AuthService
  ){

  }

  transform(value: string): any {
    this.authService.getUsername(value)
      .subscribe(data=>{
        return data.json().response.username;
      });
  }


}
