import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';

  constructor(private http: HttpClient) {}

  getAll(): Promise<any> {
    return this.http.get(this.apiURL).toPromise();
  }

  getById(studentId: number): Promise<any> {
    return this.http.get(this.apiURL + studentId).toPromise();
  }

  add(student: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.apiURL, student, httpOptions).toPromise();
  }

  delete(studentId: number): Promise<any> {
    return this.http.delete(this.apiURL + studentId).toPromise();
  }
}
