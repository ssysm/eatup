import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../auth/auth.service";
@Pipe({
  name: 'toUsername'
})
export class ToUsernamePipe implements PipeTransform {

  public result: string = 'placeholder';

  constructor(
    private authService:AuthService
  ){

  }


  transform(value: string): any {
    var self = this;
    this.authService.getUsername(value)
      .subscribe(function(data){
       self.result = data.text();
        return self.result;
      });
  }


}
