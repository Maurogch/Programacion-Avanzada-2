import { LoginService } from './../services/login.service';
import { ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static validateUserEmail(email: string): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      let loginService: LoginService;
      loginService
        .validateEmail(email)
        .then(result => {
          console.log(result);
          if (result) {
            resolve({
              asyncInvalid: true // Name that is called for custom validator: formcontrolname.errors.asyncInvalid
            });
          }

          resolve(null);
        })
        .catch(err => {
          console.log(err);
          reject('Error on getting email');
        });
    });
  }
}
