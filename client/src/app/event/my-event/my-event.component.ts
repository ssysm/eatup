import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {EventService} from "../event.service";

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public eventService:EventService,
  ) { }

  eventData:Array<any>;

  ngOnInit() {
    this.eventService.fetchByUser(atob(sessionStorage.getItem('token')))
      .subscribe(data=>{
        this.eventData = data.json().response
      })
  }

  deleteEvent(eid){
    this.eventService.deleteEvent(eid,atob(sessionStorage.getItem('token')))
      .subscribe(data=>{
        location.reload();
      })
  }
}
