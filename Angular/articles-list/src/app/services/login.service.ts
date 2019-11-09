import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'https://utn2019-avanzada2-tp9.herokuapp.com/';
  private loginPath = 'login';
  private registerPath = 'sign-up';
  private identitiesPath = 'users/identities';

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

  set setToken(token) {
    this.tokenValue.next(token); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('token', token);
  }

  get getToken() {
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http
      .post(this.apiURL + this.loginPath, user, this.httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http
      .post(this.apiURL + this.registerPath, user, this.httpOptions);
  }

  validateEmail(email: string): Promise<any> {
    return this.http
      .get(this.apiURL + this.identitiesPath + '?email=' + email).toPromise();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenValue.next();
  }
}
