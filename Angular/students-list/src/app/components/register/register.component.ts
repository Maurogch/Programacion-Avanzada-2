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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    const request = Object.assign({}, this.registerForm.value);
    console.log(request);

    this.loginService
      .register(request)
      .then(result => {
        console.log('registerResult: ' + result);
        this.snackBar.open('Cuenta registrada exitosamente', 'Cerrar', {
          duration: 4000
        });

        // Redirect to home after 4 seconds
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 4000);
      })
      .catch(err => {
        this.snackBar.open(
          'Ops hubo un error registrarse, refresque la página',
          'Cerrar',
          {
            duration: 4000
          }
        );
        console.log(err);
      });
  }

  validateUserEmail(): Promise<ValidationErrors | null> {
    const email: string = this.registerForm.get('email').value;

    return new Promise((resolve, reject) => {
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
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
