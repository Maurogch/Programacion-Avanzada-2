import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user = new User();
  loginInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
    this.setValues();
  }

  setValues() {
    this.loginForm.get('email').valueChanges.subscribe(val => {
      this.user.email = val;
    });

    this.loginForm.get('password').valueChanges.subscribe(val => {
      this.user.password = val;
    });
  }

  onSubmit() {
    console.log(this.user);
    this.authService.login(this.user).subscribe(
      result => {
        localStorage.setItem('token', result.jwt);
        this.router.navigateByUrl('/list');
      },
      err => {
        console.log(err);
        if (err.status === 401) {
          this.loginInvalid = true;
        }
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
