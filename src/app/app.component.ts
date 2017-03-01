import { Component,OnInit,ViewChild } from '@angular/core';
import {AuthService}from '../app/services/authenticationService'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  private isLogged:boolean=false;
  constructor(private authService:AuthService){}

  onLog():boolean{
  if( this.authService.isLoggedIn())
  { 
    return false;
  }
  else 
  {
    return true;
  }
  }
}
