import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career } from './../models/career';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CareerAsyncService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/careers/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Career[]>{
    return this.http.get(this.apiURL).pipe(
      map((data: any[]) => data.map((item: any) => new Career(
        item.careerId,
        item.name
      )))
    );
  }
}
