import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
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

  ngOnInit() {}

  login() {
    const request = Object.assign({}, this.loginForm.value);
    console.log(request);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
