import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  elements: any = [];

  headElements = [
    'ID',
    'Nombre',
    'Apellido',
    'Email',
    'Dirección',
    'DNI',
    'Borrar'
  ];
  loading: boolean;

  constructor(private studentAsyncService: StudentAsyncService) {}

  ngOnInit() {
    this.loading = true;

    this.studentAsyncService
      .getAll()
      .then(result => {
        this.elements = result;
      })
      .catch(err => {
        console.log(err);
      });

    this.loading = false;
  }

  delete(studentId: number) {
    // Delete student api call
  }
}
