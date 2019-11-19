import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user = { email: '', password: '' };

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.validateUserEmail.bind(this)],
          updateOn: 'blur'
        }
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordMatch()]
      ]
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    // Check if there is a token in local storage
    if (token !== null) {
      // If there is a token don't let user enter login again, redirect to list
      this.router.navigateByUrl('/list');
    }

    this.setValues();
  }

  setValues() {
    this.registerForm.get('email').valueChanges.subscribe(val => {
      this.user.email = val;
    });

    this.registerForm.get('password').valueChanges.subscribe(val => {
      this.user.password = val;
    });
  }

  onSubmit() {
    console.log(this.user);
    this.loginService.register(this.user).subscribe(
      result => {
        console.log('registerResult: ' + result);
        this.snackBar.open('Cuenta registrada exitosamente', 'Cerrar', {
          duration: 4000
        });

        // Redirect to home after 4 seconds
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 4000);
      },
      err => {
        this.snackBar.open(
          'Ops hubo un error registrarse, refresque la página',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      }
    );
  }

  passwordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.user.password !== control.value) {
        // get control value to compare
        return { passwordMatch: true };
      } else {
        return null;
      }
    };
  }

  validateUserEmail(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    // const email: string = this.registerForm.get('email').value;
    const email = control.value; // better way to get value

    return this.loginService.validateEmail(email).pipe(
      map(() => null),
      catchError(error => {
        if (error.status === 409) {
          return of({ // Return observable
            asyncInvalid: true // Name that is called for custom validator: formcontrolname.errors.asyncInvalid
          });
        }
        console.log(error);
        return of(null);
      })
    );

    /*return new Promise((resolve, reject) => {  // Async validation with Promise
      this.loginService
        .validateEmail(email)
        .then(result => {
          resolve(null);
        })
        .catch(err => {
          if (err.status === 409) {
            resolve({
              asyncInvalid: true // Name that is called for custom validator: formcontrolname.errors.asyncInvalid
            });
          }
          console.log(err);
          reject('Error on getting email');
        });
    });*/
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }
}
