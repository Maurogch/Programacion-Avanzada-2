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
    'Editar',
    'Borrar'
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
    this.studentAsyncService
      .delete(studentId)
      .then(result => {
        console.log(result);
        this.snackBar.open('Estudiante borrado con exito', 'Cerrar', {
          duration: 4000
        });

        this.arrayRemove(studentId);
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open(
          'Ops hubo un error borrar el estudiante, refresque la página e intente de nuevo',
          'Cerrar',
          {
            duration: 4000
          }
        );
      });
  }

  edit(studentId: number) {
    // todo
  }

  test(el) {
    console.log(el);
  }

  private arrayRemove(value) {
    this.elements = this.elements.filter(function(ele) {
      return ele.studentId !== value;
    });
  }
}
