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
  student: Student = new Student();
  loader = true;

  constructor(
    private studentAsyncService: StudentAsyncService,
    private careerAsyncService: CareerAsyncService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Get id from route
    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    Promise.all([
      this.studentAsyncService.getById(studentId),
      this.careerAsyncService.getAll()
    ])
      .then(result => {
        const resStudent = result[0];

        this.student = new Student(
          new Career(resStudent.careerId),
          resStudent.studentId,
          resStudent.lastName,
          resStudent.firstName,
          resStudent.dni,
          resStudent.email,
          resStudent.address
        );

        result[1].forEach(element => {
          if (element.careerId === this.student.career.careerId) {
            this.student.career.name = element.name;
          }
        });

        this.loader = false;
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
  }
}
