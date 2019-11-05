import { LoginService } from './../../services/login.service';
import { Component, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ValidationErrors
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output 

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur'
        }
      ],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (typeof this.loginService.token !== 'undefined') {
      this.router.navigateByUrl('/list');
    }
  }

  login() {
    const request = Object.assign({}, this.loginForm.value);
    console.log(request);

    this.loginService.login(request)
      .subscribe(result => {
        console.log(result);
        // set token
        this.loginService.token = result.jwt;
        this.router.navigateByUrl('/list');
      },
      err => {
        this.snackBar.open('Usuario o contraseña inválidos', 'Cerrar', {
          duration: 4000
        });
        console.log(err);
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
