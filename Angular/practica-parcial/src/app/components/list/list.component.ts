import { Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  students: Student[];
  loading = true;

  headElements = [
    'ID',
    'Nombre',
    'Apellido',
    'Email',
    'Dirección',
    'DNI',
    'Carrera'
  ];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.studentService.getAll().subscribe(result => {
      this.students = result;
      this.loading = false;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
