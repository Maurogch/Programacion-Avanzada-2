import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carForm: FormGroup;
  car = new Car();
  snack = false;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService
  ) {
    this.carForm = this.formBuilder.group({
      brand: ['', { validators: [Validators.required], updateOn: 'blur' }],
      model: ['', { validators: [Validators.required], updateOn: 'blur' }],
      year: ['', { validators: [Validators.required], updateOn: 'blur' }], //
      domain: ['', [Validators.required], [this.validateDomain.bind(this)]]
    });
  }

  ngOnInit() {
    this.setValues();
  }

  setValues() {
    this.carForm.get('brand').valueChanges.subscribe(val => {
      this.car.brand = val;
    });
    this.carForm.get('model').valueChanges.subscribe(val => {
      this.car.model = val;
    });
    this.carForm.get('year').valueChanges.subscribe(val => {
      this.car.year = val;
    });
    this.carForm.get('domain').valueChanges.subscribe(val => {
      this.car.domain = val;
    });
  }

  add() {
    console.log(this.car);
    this.snack = false;
    this.carService.add(this.car).subscribe(
      result => {
        this.message = 'Car added successfully';
        this.snack = true;
        this.carForm.reset();
      },
      err => {
        console.log(err);
        this.message = 'There was an error adding car, try again later';
        this.snack = true;
      }
    );
  }

  validateDomain(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.carService.checkDomain(control.value).pipe(
      map(() => null),
      catchError(error => {
        if (error.status === 409) {
          return of({
            asyncInvalid: true
          });
        }
        console.log(error);
        return of(null);
      })
    );
  }

  get brand() {
    return this.carForm.get('brand');
  }
  get model() {
    return this.carForm.get('model');
  }
  get year() {
    return this.carForm.get('year');
  }
  get domain() {
    return this.carForm.get('domain');
  }
}
