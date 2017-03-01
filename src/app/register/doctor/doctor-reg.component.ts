import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder ,AbstractControl}  from '@angular/forms';

import { DataService } from '../../services/data.services';
import {AuthService}from '../../services/authenticationService';

@Component({
    selector:'doc-reg',
    templateUrl:'./doctor-reg.component.html',
     styleUrls:['./doctor-reg.component.css']
})

export class DoctorRegComponent implements OnInit{
      doctor = [];
      genders=['Other','Male','Female'];
      constructor(private dataService:DataService,
                  private formBuilder: FormBuilder,
                   private router: Router,
                   private authService:AuthService
    ){}

addDoctorForm:FormGroup;
firstname:AbstractControl;
lastname:AbstractControl;
email:AbstractControl;
age:AbstractControl
medicalid:AbstractControl;
registrationboard:AbstractControl;
qualification:AbstractControl;
pass:AbstractControl;
passcon:AbstractControl;
sex:AbstractControl;
phone:AbstractControl

 ngOnInit(){

        this.addDoctorForm=this.formBuilder.group({
        firstname:['',Validators.compose([Validators.required])],
        lastname:['',Validators.compose([Validators.required])],
        email:['',Validators.compose([Validators.required,emailValidator])],
        age:['',Validators.compose([Validators.required])],
        medicalid:['',Validators.compose([Validators.required])],
        registrationboard:['',Validators.compose([Validators.required])],
        qualification:['',Validators.compose([Validators.required])],
        pass:['',Validators.compose([Validators.required,Validators.minLength(8)])],
        passcon:['',Validators.compose([Validators.required])],
        sex:['',Validators.compose([Validators.required])],
        phone:['',Validators.compose([Validators.required,phoneValidator])],

    },{validator:matchPasswords('pass','passcon')});

   this.firstname=this.addDoctorForm.controls['firstname'];
   this.lastname=this.addDoctorForm.controls['lastname'];
   this.email=this.addDoctorForm.controls['email'];
   this.age=this.addDoctorForm.controls['age'];
   this.medicalid=this.addDoctorForm.controls['medicalid'];
   this.registrationboard=this.addDoctorForm.controls['registrationboard'];
   this.qualification=this.addDoctorForm.controls['qualification'];
   this.pass=this.addDoctorForm.controls['pass'];
   this.passcon=this.addDoctorForm.controls['passcon'];
   this.sex=this.addDoctorForm.controls['sex'];
   this.phone=this.addDoctorForm.controls['phone'];


   function emailValidator(control:FormControl):{[s :string]:boolean}{
       if(!control.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
           return {invalidEmail:true};
       }
   }

   function phoneValidator(control:FormControl):{[s :string]:boolean}{
       if(!control.value.match(/^\d{10}$/)){
           return {invalidPhone:true};
       }
   }

   function matchPasswords(password1: string,password2:string){
             return (group: FormGroup) => {
    let passwordInput = group.controls[password1];
    let passwordConfirmationInput = group.controls[password2];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    }
  }
 }
}
submitted = false;
onSubmit() {
      this.dataService.addDoctor(this.addDoctorForm.value).subscribe(
          res=>{
              let newDoctor = res.json();
              console.log(newDoctor);
              this.doctor.push(newDoctor);
              //console.log("added");
             // console.log(this.patient['firstname']);
             if(this.authService.login(newDoctor.firstname))
             {
            this.router.navigate(['/home']);
             }
          },
              error => console.log(error)
      );
}


}
