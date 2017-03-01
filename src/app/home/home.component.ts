import { Component } from '@angular/core';
import {AuthService}from '../services/authenticationService'
@Component({
   selector:'my-home',
   templateUrl:'./home.component.html',
    styleUrls:['./home.component.css'],
 })   

 export class HomeComponent{

   constructor(private authService:AuthService){}

    logout(): boolean { 
       this.authService.logout();  
       return false;
       }


 }