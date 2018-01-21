import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";

@Injectable()
export class EventService {

  constructor(
    private http:Http
  ) { }


  createEvent(data){
    return this.http
      .post(environment.apiBase+'/event/create',data)
  }

  fetchEvent(id){
    return this.http
      .get(environment.apiBase+'/event/id/'+id)
  }

  joinEvent(eid,uid){
    return this.http
      .patch(environment.apiBase+'/event/join/'+eid,{uid})
  }

  fetchAllEvent(limit){
    return this.http
      .get(environment.apiBase+'/event/get/'+limit)
  }

  deleteEvent(eid,uid){
    return this.http
      .patch(environment.apiBase+'/event/delete',{eid:eid,uid:uid})
  }

  fetchByUser(uid){
    return this.http
      .get(environment.apiBase+'/event/user/'+uid)
  }

}
