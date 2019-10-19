import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/login/';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(user: any): Promise<any> {
    return this.http.post(this.apiURL, user, this.httpOptions).toPromise();
  }

  register(user: any): Promise<any> {
    return this.http.post(this.apiURL, user, this.httpOptions).toPromise();
  }
}
