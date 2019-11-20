import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://utn2019-avanzada2-parcial2.herokuapp.com/';
  private loginPath = 'login';

  httpOptions: {};
  redirectUrl: string;
  tokenValue = new Subject();

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(user: User): Observable<any> {
    return this.http.post(this.apiURL + this.loginPath, user, this.httpOptions);
  }
}
