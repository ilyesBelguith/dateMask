import { element } from 'protractor';
import { Component, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar/primeng-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('mYcalendar', null) private calendar: Calendar;
  title = 'dateMask';
  isDateFilled:boolean;
  deletesplashPossible=true;
  value;

  //onChoosing date value
  onDateChange(event) {
    let searchValue;
    console.log(this.calendar.currentMonth);
    if (event.target.value.length > 0) {
      this.isDateFilled = true;
    }
    else {
      this.isDateFilled = false;
    }
    if (event.target.value.length <= 2) {
      searchValue = event.target.value;
    }
    if ((event.target.value.length <= 6) && (event.target.value.length > 2)) {
      searchValue = event.target.value.substring(3, 5) + "-" + event.target.value.substring(0, 2);
    }
    if (event.target.value.length > 6) {
      searchValue = this.calendar.currentYear + "-" + event.target.value.substring(3, 5) + "-" + event.target.value.substring(0, 2);
    }
    else{
      this.calendar.currentYear=new Date().getFullYear();
    }
    if (((event.target.value.length == 2))) {
      searchValue =event.target.value+"T";
      if (this.deletesplashPossible) {
        event.target.value = event.target.value + '/';
      }
    }
    if ((event.target.value.length == 5)) {
      if (this.deletesplashPossible) {
        event.target.value = event.target.value + '/20';
      }
    }
  }
  // on deleting using keyBoard
  deleteInputCalendar(event) {
    var key = event.keyCode;
    if ((key == 8) && (event.target.value.length == 3) || (event.target.value.length == 6)) {
      this.deletesplashPossible = false;
    }
    else {
      this.deletesplashPossible = true;
    }
    if ((key == 8) && (event.target.value.length > 6)) {
      let currentYearValue = new Date().getFullYear()+"";
     if(currentYearValue.includes(event.target.value.substring(6, event.target.value.length-1))) {
       this.calendar.currentYear=new Date().getFullYear();
     }
    }
    if ((key == 8) &&(event.target.value.length == 10)) {
      this.calendar.showOverlay();
    }
  }

  inputNumberOnlyMask(){
    let element = document.getElementById('calendarInput');
    if(element){
      console.log(element);
      element.setAttribute("myNumberOnly","true");
    }
  }

  omit_alpha_char(event) {
    var key = event.keyCode;
    console.log(key);
    if ((event.target.value.length == 9)) {
      this.calendar.hideOverlay();
    }
    if (((event.target.value.length == 2) || (event.target.value.length == 5))) {
      return key == 47;
    }
    else if ((event.target.value.length == 0)) {
      return (key >= 48 && key <= 51);
    }
    else if ((event.target.value.length == 1) && (event.target.value[event.target.value.length - 1] == '0')) {
      return (key >= 49 && key <= 57);
    }
    else if ((event.target.value.length == 6)) {
      return (key >= 49 && key <= 50);
    }
    else if ((event.target.value.length == 7) && (event.target.value[event.target.value.length - 1] == '2')) {
      return (key == 48);
    }
    else if ((event.target.value.length == 4) && (event.target.value[event.target.value.length - 1] == '1')) {
      return (key >= 48 && key <= 50);
    }
    else if ((event.target.value.length == 4) && (event.target.value[event.target.value.length - 1] == '0')) {
      return (key >= 49);
    }
    else if ((event.target.value.length == 3) || ((event.target.value.length == 1) && (event.target.value[event.target.value.length - 1] == '3'))) {
      return (key >= 48 && key <= 49);
    }    
    else {
      return ((key >= 48 && key <= 57));
    }    
  }
}
