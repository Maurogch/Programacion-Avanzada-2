import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { MatSnackBar } from '@angular/material';
import { Career } from 'src/app/models/career';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { Observable, forkJoin } from 'rxjs';

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
    this.loadStudentCarreers().subscribe(result => {
      console.log(result[0]);
      this.student = result[0];
      const careers: Career[] = result[1];

      careers.forEach(career => {
        if (career.careerId === this.student.career.careerId) {
          this.student.career.name = career.name;
        }
      });

      this.loader = false;
    },
    err => {
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

  loadStudentCarreers(): Observable<any> {
    // Get id from route
    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    return forkJoin([
      this.studentAsyncService.getById(studentId),
      this.careerAsyncService.getAll()
    ]);
  }
}
