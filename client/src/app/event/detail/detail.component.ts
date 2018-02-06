import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../event.service";
import {AuthService} from "../../auth/auth.service";
import {MapsAPILoader} from "@agm/core";
declare var $: any;
declare var google: any;
declare var _: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private eventService:EventService,
    private authService:AuthService,
    private mapsAPILoader:MapsAPILoader
  ) { }

  public eid:String;
  public eventData:any;
  public author:any;
  public placeId:string;
  public latitude:String;
  public longitude:String;
  public mapData:Object;

  reported:Boolean;
  ngOnInit() {
    this.eid = this.route.snapshot.params['id'];
    this.eventService.fetchEvent(this.eid)
      .subscribe(data => {
        if (data.json().success) {
          this.eventData = data.json().response;
          this.placeId = data.json().response.location;
          this.authService.getUsername(data.json().response.authorId)
            .then(author => {
              this.author = author
            });
          let data2 = this.eventData.members.find( ( ele ) =>{
            return ele.uid === atob(sessionStorage.getItem('token'));
          } );
          if (data2) {
            this.reported = true;
          }
        } else {
          alert('未查询到，请查证');
          this.router.navigate(['/'])
        }
      });
  }

  mapReady($event: any) {
    // here $event will be of type google.maps.Map
    // and you can put your logic here to get lat lng for marker. I have just put a sample code. You can refactor it the way you want.
    this.getLatLong(this.placeId, $event, null);
  }

  getLatLong(placeid: string, map: any, fn) {
    let placeService = new google.maps.places.PlacesService(map);
    placeService.getDetails({
      placeId: placeid
    }, (result) => {
      this.mapData = result;
      this.latitude = result.geometry.location.lat();
      this.longitude = result.geometry.location.lng();
      console.log(result)
    });
  }

  joinEvent(){
    this.eventService.joinEvent(this.eid,atob(sessionStorage.getItem('token')))
      .subscribe(data=>{
        if(data){
          this.reported = true;
          location.reload();
        }else{
          alert('系统错误')
        }
      })
  }
}
