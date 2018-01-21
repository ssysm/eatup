import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService
  ) {
  }

  ngOnInit() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left',
        closeOnClick: true,
        draggable: true,
      }
    );
  }

}
