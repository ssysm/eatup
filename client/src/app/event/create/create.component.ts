import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../event.service";
import {Router} from "@angular/router";
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  public eventForm: FormGroup;

  public gcode:String;
  public address:String;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private eventService:EventService,
    private router:Router
  ) {
  }

  private _date: string;
  public decodedaid:String;

  ngOnInit() {
    this.decodedaid = atob(sessionStorage.getItem('token'));
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
    });

    //create search FormControl
    this.eventForm = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      gcode:new FormControl('',
        Validators.required
      ),
      startTime:new FormControl('',
        Validators.required
      ),
      endTime:new FormControl('',[
        Validators.required
      ]),
      address:new FormControl('',
        Validators.required
      ),
      authorId:new FormControl('',
        Validators.required)
    });

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        type:["restaurant", "food"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.gcode = place.place_id;
          this.address = place.formatted_address;
          console.log(place);

        });
      });
    });
  }

  createEvent(data){
    this.eventService.createEvent(data)
      .subscribe(data=>{
        this.router.navigate(['/','event','id',data.json().response._id])
      })
  }

}
