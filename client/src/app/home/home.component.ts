import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {EventService} from "../event/event.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public eventService:EventService,
  ) { }

  eventData:Array<any>;

  ngOnInit() {
    this.eventService.fetchAllEvent(20)
      .subscribe(data=>{
        this.eventData = data.json().response
      })
  }

}
