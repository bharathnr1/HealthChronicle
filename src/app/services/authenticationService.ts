import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
     constructor(
              private router: Router,
  ){}
    login(user:any):boolean{
        if(user !== null && user !==false )
        {
        localStorage.setItem('username',user);
        console.log(localStorage.getItem('username'));
        return true;
    }
    else{
        return false;
    }

  }//login

    logout():any{
        localStorage.removeItem('username');
        this .router.navigate(['/']);
    }//logout

    getUser():any{
        return localStorage.getItem('username');
    }

    isLoggedIn():boolean{
        return this.getUser()!==null;
    }//isLoggedIn
}
    export var AUTH_PROVIDERS: Array<any>=[
        {provide:AuthService, useClass:AuthService}
    ];
 