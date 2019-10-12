import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { Student } from 'src/app/models/student';
import { Career } from 'src/app/models/career';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  student: Student = new Student();
  careers: Array<Career> = [];

  constructor(
    private studentAsyncService: StudentAsyncService,
    private careerAsyncService: CareerAsyncService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.careerAsyncService
      .getAll()
      .then(result => {
        this.careers = result;
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error al cargar la lista de carreras, refresque la página',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });
  }

  add(form: NgForm) {
    console.log(this.student);
    /*this.studentAsyncService
      .add(this.student)
      .then(result => {
        this.snackBar.open('Alumno agregado exitosamente', 'Cerrar', {
          duration: 4000
        });
        form.reset();
        console.log(result);
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error al agregar el alumno, intente de nuevo',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });*/
  }
}
