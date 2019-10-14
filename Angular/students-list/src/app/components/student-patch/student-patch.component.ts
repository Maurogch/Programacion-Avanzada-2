import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { Student } from 'src/app/models/student';
import { Career } from 'src/app/models/career';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-patch',
  templateUrl: './student-patch.component.html',
  styleUrls: ['./student-patch.component.scss']
})
export class StudentPatchComponent implements OnInit {
  student: Student = new Student();
  careers: Array<any> = [];
  loader = true;
  studentForm: FormGroup;

  constructor(
    private studentAsyncService: StudentAsyncService,
    private careerAsyncService: CareerAsyncService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [], // asyncValidationFunction()
          updateOn: 'blur'
        }
      ],
      career: ['', { validators: [Validators.required], updateOn: 'blur' }],
      address: ['', { validators: [Validators.required], updateOn: 'blur' }],
      dni: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Get id from route
    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    Promise.all([
      this.studentAsyncService.getById(studentId),
      this.careerAsyncService.getAll()
    ])
      .then(result => {
        const resStudent = result[0];
        this.careers = result[1];

        this.student = new Student(
          new Career(resStudent.careerId),
          resStudent.studentId,
          resStudent.lastName,
          resStudent.firstName,
          resStudent.dni,
          resStudent.email,
          resStudent.address
        );

        this.careers.forEach(element => {
          if (element.careerId === this.student.career.careerId) {
            this.student.career.name = element.name;
          }
        });

        this.mapInputs();
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

  private mapInputs() {
    this.studentForm.setValue({
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      email: this.student.email,
      career: this.student.career.careerId,
      address: this.student.address,
      dni: this.student.dni
    });
  }

  edit() {
    const values = Object.assign({}, this.studentForm.value); // Map form values to object
    const jsonObject = {};

    // Crease object with only modified values
    if (this.studentForm.get('firstName').dirty) {
      jsonObject['firstName'] = values.firstName;
    }
    if (this.studentForm.get('lastName').dirty) {
      jsonObject['lastName'] = values.lastName;
    }
    if (this.studentForm.get('email').dirty) {
      jsonObject['email'] = values.email;
    }
    if (this.studentForm.get('career').dirty) {
      jsonObject['careerId'] = values.career;
    }
    if (this.studentForm.get('address').dirty) {
      jsonObject['address'] = values.address;
    }
    if (this.studentForm.get('dni').dirty) {
      jsonObject['dni'] = values.dni;
    }

    this.studentAsyncService
      .patch(this.student.studentId, jsonObject)
      .then(result => {
        this.snackBar.open(
          'Alumno modificado exitosamente, redirigiendo a la lista',
          'Cerrar',
          {
            duration: 4000
          }
        );

        // Redirect to home after 4 seconds
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 4000);
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error al modificar el alumno, intente de nuevo',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });
  }

  get firstName() {
    return this.studentForm.get('firstName');
  }
  get lastName() {
    return this.studentForm.get('lastName');
  }
  get email() {
    return this.studentForm.get('email');
  }
  get career() {
    return this.studentForm.get('career');
  }
  get address() {
    return this.studentForm.get('address');
  }
  get dni() {
    return this.studentForm.get('dni');
  }
}
