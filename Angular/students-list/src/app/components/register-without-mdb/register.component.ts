/*import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-2',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
        this.validateEmail.bind(this)
      ],
      password: ['', [Validators.required, this.passwordMustHaveNumbers()]]
    });
  }

  ngOnInit() {}

  register() {
    const request = Object.assign({}, this.registerForm.value);
    console.log(request);
    his.authService.register(request).subscribe(result => {
      console.log('registration result: ' + result);
      this.router.navigateByUrl('/login');
    });
  }

  passwordMustHaveNumbers(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!/\d/.test(control.value)) {
        return { passwordMustHaveNumbers: true };
      } else {
        return null;
      }
    };
  }

  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.validateEmail(control.value).pipe(
      map(() => null),
      catchError(error => {
        if (error.status === 409) {
          return of({
            asyncInvalid: true // Name that is called for custom validator: formcontrolname.errors.asyncInvalid
          });
        }
        console.log(error);
        return of(null);
      })
    );
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
*/
