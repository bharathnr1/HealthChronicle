import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { LoginComponent }from './login/login.component';
import {RegisterComponent}from './register/register.component';
import {PatientRegComponent}from './register/patient/patient-reg.component';
import {DoctorRegComponent }from './register/doctor/doctor-reg.component';
import {HomeComponent}from './home/home.component';
import {PatientHomeGuard}from '../app/guards/patient.home.guards';
import{MyProfile}from './home/patientNav/myProfile/myProfile.component';
import{MyHistory}from './home/patientNav/myHistory/myHistory.component'
const routes:Routes=[
    {path:'',redirectTo:'/',pathMatch:'full'},
    {path:'login', component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'register/patient',component:PatientRegComponent},
    {path:'register/doctor',component:DoctorRegComponent},
    {path:'home',component:HomeComponent,canActivate:[PatientHomeGuard],children:[
        { path: 'myprofile', component: MyProfile },
        { path: 'myhistory', component: MyHistory }] }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}