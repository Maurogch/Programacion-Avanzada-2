import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/';
  private loginPath = 'login';
  private registerPath = 'sign-up';
  private identitiesPath = 'users/identities';

  httpOptions: {};

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(user: any): Observable<any> {
    return this.http.post(this.apiURL + this.loginPath, user, this.httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http.post(
      this.apiURL + this.registerPath,
      user,
      this.httpOptions
    );
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get(this.apiURL + this.identitiesPath, {
      params: new HttpParams().set('email', email)
    });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
