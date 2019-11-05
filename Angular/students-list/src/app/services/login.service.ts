import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/';
  private loginPath = 'login';
  private registerPath = 'sign-up';
  private identitiesPath = 'users/identities';

  httpOptions: {};
  token: string;
  redirectUrl: string;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(user: any): Observable<any> {
    return this.http
      .post(this.apiURL + this.loginPath, user, this.httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http
      .post(this.apiURL + this.registerPath, user, this.httpOptions);
  }

  validateEmail(email: string): Promise<any> {
    return this.http
      .get(this.apiURL + this.identitiesPath + '?email=' + email).toPromise();
  }

  logout(): void {
    this.token = undefined;
  }
}
