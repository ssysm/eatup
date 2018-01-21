import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('',[
        Validators.required
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password:new FormControl('',[
        Validators.required
      ])
    })
  }

  signup(cred){
    this.authService.signup(cred)
      .subscribe(data=>{
        if(data.json().success){
          alert('注册成功,请登陆');
          this.router.navigate(['/'])
        }else{
          alert('系统错误,请检查信息后重试')
        }
      })
  }

}
