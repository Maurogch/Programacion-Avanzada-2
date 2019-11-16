import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'https://utn2019-avanzada2-tp9.herokuapp.com/api/products';

  httpOptions: {};
  redirectUrl: string;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getByPageSize(page: number, size: number): Observable<any> {
    return this.http.get(this.apiURL + '?page=' + page + '&size=' + size);
  }

  getByPageSizeOrdered(
    page: number,
    size: number,
    orderBy: string,
    direction: string
  ): Observable<any> {
    return this.http.get(
      this.apiURL +
        '?page=' +
        page +
        '&size=' +
        size +
        '&orderBy=' +
        orderBy +
        '&direction=' +
        direction
    );
  }
}
