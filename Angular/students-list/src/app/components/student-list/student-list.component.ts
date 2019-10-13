import { Career } from 'src/app/models/career';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
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
    'Carrera',
    'Editar',
    'Borrar'
  ];
  loading = true;

  constructor(
    private studentAsyncService: StudentAsyncService,
    private careerAsyncService: CareerAsyncService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    Promise.all([
      this.studentAsyncService.getAll(),
      this.careerAsyncService.getAll()
    ])
      .then(result => {
        this.elements = result[0];

        // Map career name
        this.elements.forEach(el => {
          if (el.careerId === null) {
            el.careerName = 'Sin carrera';
          } else {
            result[1].forEach(carrer => {
              if (el.careerId === carrer.careerId) {
                el.careerName = carrer.name;
              }
            });
          }
        });

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

  test(el) {
    console.log(el);
  }

  private arrayRemove(value) {
    this.elements = this.elements.filter(function(ele) {
      return ele.studentId !== value;
    });
  }
}
