import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import {AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { LoginComponent }from './login/login.component';
import {RegisterComponent}from './register/register.component';
import {PatientRegComponent}from './register/patient/patient-reg.component';
import {DoctorRegComponent }from './register/doctor/doctor-reg.component';
import { DataService } from './services/data.services';
import {AuthService} from './services/authenticationService';
import {PatientHomeGuard}from '../app/guards/patient.home.guards'
import {HomeComponent}from './home/home.component';
import{MyProfile}from './home/patientNav/myProfile/myProfile.component'
import{MyHistory}from './home/patientNav/myHistory/myHistory.component'
@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  ReactiveFormsModule,
                    HttpModule,
                    Ng2Bs3ModalModule,
   ],
  declarations: [ AppComponent,
                  LoginComponent,
                  RegisterComponent,
                  PatientRegComponent,
                  DoctorRegComponent,
                  HomeComponent,
                  MyProfile,
                  MyHistory
   ],
     providers: [
    DataService,
    AuthService,
    PatientHomeGuard

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
