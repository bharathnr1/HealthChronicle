import { Component,OnInit, ViewChild  } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl}from '@angular/forms';
import {DataService} from '../services/data.services';
import { Router } from '@angular/router';
import {AuthService}from '../services/authenticationService';

@Component({
    selector:'login-pg',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']

})

export class LoginComponent implements OnInit{

 success:boolean=false;

  addloginForm:FormGroup;
  email:AbstractControl;
  password:AbstractControl;

  constructor(private dataService:DataService,
              private formBuilder:FormBuilder,
              private router: Router,
              public authService: AuthService
  ){}


  ngOnInit(){
    this.addloginForm=this.formBuilder.group({
      email:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
    });


    this.email=this.addloginForm.controls['username'];
    this.password=this.addloginForm.controls['password'];

  }

onSubmit(){
  this.dataService.loginPatient(this.addloginForm.value).subscribe(
    res=>{
      if(this.authService.login(res.json()))
      {      //let username=res.json();
             //console.log(username);
             if(this.authService.isLoggedIn()){
              this.success=true;
              console.log(this.success);

     }
             this.router.navigate(['/home/myprofile']);
      }
      else{
        console.log("u r not authenticated");
       if(res.json()===null){

       }

      }
    }
  );
}


}
