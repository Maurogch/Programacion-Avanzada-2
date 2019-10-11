import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { MatSnackBar } from '@angular/material';
import { Career } from 'src/app/models/career';
import { CareerAsyncService } from 'src/app/services/career-async.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  private student: Student = new Student();
  private careers: Array<any>;

  constructor(
    private studentAsyncService: StudentAsyncService,
    private careerAsyncService: CareerAsyncService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Get id from route
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    // ----------------------------  NEEDS A PROMISE ALL -------------------------------------------------------------
    this.studentAsyncService
      .getById(studentId)
      .then(result => {
        this.student = new Student(
          result.studentId,
          new Career(result.careerId),
          result.lastName,
          result.firsName,
          result.dni,
          result.email,
          result.address
        );
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error al cargar el estudiante, refresque la página',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });

    this.careerAsyncService
      .getAll()
      .then(result => {
        console.log(result);
        result.forEach(element => {
          console.log(element);
          if (element.careerId === this.student.career.careerId) {
            this.student.career.name == element.name;
          }
        });
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error al cargar el estudiante, refresque la página',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });

    console.log(this.student);
  }
}
