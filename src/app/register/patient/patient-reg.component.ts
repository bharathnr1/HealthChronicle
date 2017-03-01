import {Component,OnInit}from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder ,AbstractControl}  from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.services';
import {AuthService}from '../../services/authenticationService';

@Component({
    selector:'patient-reg',
    templateUrl:'./patient-reg.component.html',
    styleUrls:['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit{
    patient = [];
    genders=['Other','Male','Female'];

addPatientForm:FormGroup;
aadharNo:AbstractControl;
firstname:AbstractControl;
lastname:AbstractControl;
email:AbstractControl;
pass:AbstractControl;
passcon:AbstractControl;
sex=new FormControl('',Validators.required);
phone:AbstractControl

    constructor(private dataService:DataService,
                  private formBuilder: FormBuilder,
                   private router: Router,
                   private authService:AuthService
    ){}


    ngOnInit(){

        this.addPatientForm=this.formBuilder.group({
        aadharNo:['',Validators.compose([Validators.required,aadharNoValidator])],
        firstname:['',Validators.compose([Validators.required])],
        lastname:['',Validators.compose([Validators.required])],
        email:['',Validators.compose([Validators.required,emailValidator])],
        pass:['',Validators.compose([Validators.required,Validators.minLength(8)])],
        passcon:['',Validators.compose([Validators.required])],
        sex:this.sex,
        phone:['',Validators.compose([Validators.required,phoneValidator])],
        
    },{validator:matchPasswords('pass','passcon')});
   this.aadharNo=this.addPatientForm.controls['aadharNo'];
   this.firstname=this.addPatientForm.controls['firstname'];
   this.lastname=this.addPatientForm.controls['lastname'];
   this.email=this.addPatientForm.controls['email'];
   this.pass=this.addPatientForm.controls['pass'];
   this.passcon=this.addPatientForm.controls['passcon'];
   this.phone=this.addPatientForm.controls['phone'];
   

   function emailValidator(control:FormControl):{[s :string]:boolean}{
       if(!control.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
           return {invalidEmail:true};
       }
   }
   function aadharNoValidator(control:FormControl):{[s :string]:boolean}{
       if(!control.value.match(/^\d{12}$/)){
           return {inF:true};
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
    submitted=false;
    onSubmit() {
          this.dataService.addPatient(this.addPatientForm.value).subscribe(
              res=>{
                  let newPatient=res.json();
                  console.log(newPatient);
                  this.patient.push(newPatient);
                  //console.log("added");
                 // console.log(this.patient['firstname']);
                 if(this.authService.login(newPatient.firstname))
                 {
                this.router.navigate(['/home']);
                 }
              },
                  error => console.log(error)
          );
 }
}
