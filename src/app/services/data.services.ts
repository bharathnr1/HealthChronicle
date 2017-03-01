import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

addPatient(patient:any): Observable<any> {
    return this.http.post('/patient',JSON.stringify(patient),this.options);
}
addDoctor(doctor:any): Observable<any> {
  return this.http.post('/doctor', JSON.stringify(doctor),this.options)
}

loginPatient(login:any):Observable<any>{
  console.log(login);
return this.http.post('/login',JSON.stringify(login),this.options)

}

}
