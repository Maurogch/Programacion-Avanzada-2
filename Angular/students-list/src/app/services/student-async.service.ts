import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAll(): Promise<any> {
    return this.http.get(this.apiURL).toPromise();
  }

  getById(studentId: number): Promise<any> {
    return this.http.get(this.apiURL + studentId).toPromise();
  }

  add(student: any): Promise<any> {
    return this.http.post(this.apiURL, student, this.httpOptions).toPromise();
  }

  delete(studentId: number): Promise<any> {
    return this.http.delete(this.apiURL + studentId).toPromise();
  }

  patch(studentId: number, values): Promise<any> {
    return this.http
      .patch(this.apiURL + studentId, values, this.httpOptions)
      .toPromise();
  }

  checkDniEmail(dni: string, email: string): Promise<any> {
    return this.http
      .get(this.apiURL + '/identities?dni=' + dni + 'email=' + email)
      .toPromise();
  }
}
