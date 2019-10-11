import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { MatSnackBar } from '@angular/material';

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
    'Borrar',
    'Editar'
  ];
  loading = true;

  constructor(
    private studentAsyncService: StudentAsyncService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.studentAsyncService
      .getAll()
      .then(result => {
        this.elements = result;
        this.loading = false;
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error al cargar la lista de estudiantes, refresque la página',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });
  }

  delete(studentId: number) {
    // Delete student api call
  }

  edit(studentId: number) {
    // todo
  }

  test(el) {
    console.log(el);
  }
}
