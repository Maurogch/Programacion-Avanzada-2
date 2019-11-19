import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAll(): Observable<Student[]> {
    return this.http
      .get(this.apiURL)
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new Student(
                item.careerId,
                item.studentId,
                item.lastName,
                item.firstName,
                item.dni,
                item.email,
                item.address
              )
          )
        )
      );
  }
}
