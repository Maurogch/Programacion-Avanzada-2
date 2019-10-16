import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { Student } from 'src/app/models/student';
import { MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  student: Student = new Student();
  careers: Array<any> = [];
  studentForm: FormGroup;

  constructor(
    private studentAsyncService: StudentAsyncService,
    private careerAsyncService: CareerAsyncService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      lastName: ['', { validators: [Validators.required], updateOn: 'blur' }],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.validateEmail.bind(this)], // asyncValidationFunction()
          updateOn: 'blur'
        }
      ],
      careerId: ['', { validators: [Validators.required], updateOn: 'blur' }],
      address: ['', { validators: [Validators.required], updateOn: 'blur' }],
      dni: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

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

  validateEmail(): Promise<ValidationErrors | null> {
    const email = this.studentForm.get('email').value;

    return new Promise((resolve, reject) => {
      this.studentAsyncService.getAll().then((result) => {
        result.forEach(student => {
          if (student.email === email) {
            resolve({
              asyncInvalid: true // Name that is called for custom validator: formcontrolname.errors.asyncInvalid
            });
          }
        });
        resolve(null);
      }).catch((err) => {
        console.log(err);
        reject('Error on getting email');
      });
    });
  }

  add() {
    // Transform data to a valid json request
    const request = Object.assign({}, this.studentForm.value); // Map form values to object
    // request['careerId'] = request.career; // create new key
    // delete request.career; // delete key

    this.studentAsyncService
      .add(request)
      .then(result => {
        this.snackBar.open('Alumno agregado exitosamente', 'Cerrar', {
          duration: 4000
        });

        this.studentForm.reset();
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
  get careerId() {
    return this.studentForm.get('careerId');
  }
  get address() {
    return this.studentForm.get('address');
  }
  get dni() {
    return this.studentForm.get('dni');
  }
}
