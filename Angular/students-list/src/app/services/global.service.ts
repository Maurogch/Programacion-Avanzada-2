import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  tokenValue = new Subject();

  set setToken(token) {
    this.tokenValue.next(token); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('token', token);
  }

  get getToken() {
    return localStorage.getItem('theItem');
  }
}
