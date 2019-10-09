import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareerAsyncService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/careers/';

  constructor(private http: HttpClient) {}

  getAll(): Promise<any> {
    return this.http.get(this.apiURL).toPromise();
  }
}
