import { Car } from './../models/car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiURL = 'https://utn2019-avanzada2-parcial2.herokuapp.com/api/cars';
  private identitiesPath = '/identities';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  add(car: Car) {
    return this.http.post(this.apiURL, car, this.httpOptions);
  }

  getAll(orderBy: string, direction: string): Observable<Car[]> {
    return this.http
      .get(this.apiURL, {
        params: new HttpParams()
          .set('oderBy', orderBy)
          .set('direction', direction)
      })
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new Car(
                item.carId,
                item.brand,
                item.model,
                item.year,
                item.domain
              )
          )
        )
      );
  }

  checkDomain(domain: string): Observable<any> {
    return this.http.get(this.apiURL + this.identitiesPath, {
      params: new HttpParams().set('domain', domain)
    });
  }
}
