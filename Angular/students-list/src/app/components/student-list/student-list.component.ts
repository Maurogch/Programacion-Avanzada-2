import { Career } from 'src/app/models/career';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { MatSnackBar } from '@angular/material';
import { forkJoin, Observable } from 'rxjs';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  careers: Career[];
  students: Student[];

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
    this.loadData();
  }

  loadData() {
    this.loadStudentCarreers().subscribe(result => {
      console.log(result);
      this.students = result[0];
      this.careers = result[1];

      this.students.forEach(student => {
        if (student.career.careerId === null) {
          student.career.name = 'Sin carrera';
        } else {
          this.careers.forEach(career => {
            if (student.career.careerId === career.careerId) {
              student.career.name = career.name;
            }
          });
        }
      });

      this.loading = false;
     });
  }

  loadStudentCarreers(): Observable<any> {
    return forkJoin([
      this.studentAsyncService.getAll(),
      this.careerAsyncService.getAll()
    ]);
  }

  delete(studentId: number) {
    this.studentAsyncService
      .delete(studentId)
      .subscribe(result => {
        console.log(result);
        this.snackBar.open('Estudiante borrado con exito', 'Cerrar', {
          duration: 4000
        });

        this.arrayRemove(studentId);
      }
      , err => {
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

  private arrayRemove(id: number) {
    this.students = this.students.filter(student => {
      return student.studentId !== id;
    });
  }
}
