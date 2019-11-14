import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { USERS_IDENTITIES_URL } from '../api-constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  isEmailTaken(email: string): Observable<HttpResponse<any>> {
    return this.http.get(USERS_IDENTITIES_URL, { params: new HttpParams().set('email', email), observe: 'response' });
  }
}
