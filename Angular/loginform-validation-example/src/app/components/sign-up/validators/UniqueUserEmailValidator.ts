import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { UsersService } from 'src/app/services/users.service';

@Injectable({ providedIn: 'root' })
export class UniqueUserEmailValidator implements AsyncValidator {
  constructor(private usersService: UsersService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usersService.isEmailTaken(ctrl.value).pipe(
      map(() => null),
      catchError(err => {
        if (err.status === 409) {
          return of({
            emailTaken: true
          });
        }
        console.error(err);
        return of(null);
      })
    );
  }
}
