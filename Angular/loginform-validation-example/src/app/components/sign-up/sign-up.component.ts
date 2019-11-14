import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { UniqueUserEmailValidator } from './validators/UniqueUserEmailValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder, private emailValidator: UniqueUserEmailValidator) {}

  ngOnInit() {
    this.addUserForm = this.fb.group(
      {
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
            updateOn: 'blur'
          }
        ],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]]
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  isValid(value: string) {
    return this.getFormControl(value).valid;
  }

  isInvalid(value: string) {
    const formControl = this.getFormControl(value);
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  isRequired(value: string) {
    return this.getFormControl(value).errors.required;
  }

  isInvalidEmail(value: string) {
    return this.getFormControl(value).errors.email;
  }

  isEmailTaken(value: string) {
    return this.getFormControl(value).errors.emailTaken;
  }

  isInvalidPattern(value: string) {
    return this.getFormControl(value).errors.pattern;
  }

  passwordsDoNotMatch() {
    if (this.addUserForm.errors) {
      return this.addUserForm.errors.passwordsDoNotMatch;
    }
    return false;
  }

  private getFormControl(value: string) {
    return this.addUserForm.get(value);
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const password = control.get('password');
      const repeatPassword = control.get('repeatPassword');
      return password && repeatPassword && password.value === repeatPassword.value ? null : { passwordsDoNotMatch: true };
    };
  }
}
