import { Component }from '@angular/core';

@Component({
    selector:'register-pg',
    template:`   
                 <nav>
                    <div class=col-md-6>
                     <button class="button" routerLink="/register/patient">Patients</button>
                 </div>
                   <div class=col-md-6 >
                     <button class="button"  routerLink="/register/doctor">Doctors</button>
                 </div>
              
                  </nav>
                  
    `,
styles:[`
 
  `]
})

export class RegisterComponent{}