import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[];
  sortedBy = 'carId';
  direction = 'ASC';
  loading = true;

  headElements = [
    { name: 'carId', headName: 'ID' },
    { name: 'brand', headName: 'Brand' },
    { name: 'model', headName: 'Model' },
    { name: 'year', headName: 'Year' },
    { name: 'domain', headName: 'Domain' }
  ];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.loading = true;
    this.carService.getAll(this.sortedBy, this.direction).subscribe(result => {
      this.cars = result;
      this.loading = false;
    });
  }

  sort(orderBy: string) {
    if (this.sortedBy === orderBy) {
      if (this.direction === 'ASC') {
        this.direction = 'DESC';
      } else {
        this.direction = 'ASC';
      }
    } else {
      this.direction = 'ASC';
    }
    this.sortedBy = orderBy;
    this.loadTable();
  }
}
