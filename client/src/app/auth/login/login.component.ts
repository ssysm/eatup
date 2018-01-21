import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',[
        Validators.required
      ]),
      password:new FormControl('',[
        Validators.required
      ])
    })
  }

  signIn(cred){
    this.authService.login(cred)
      .subscribe(data=>{
        if(data.json().success){
          localStorage.setItem('loggedIn','true');
          sessionStorage.setItem('token',data.json().response.token);
          this.router.navigate(['/'])
        }else{
          alert('账号信息输入错误')
        }
      })
  }

}
