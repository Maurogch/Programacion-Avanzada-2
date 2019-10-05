import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  text: String;
  firstName: String;
  lastName: String;
  email: String;
  address: String;
  dni: String;

  constructor() {}

  ngOnInit() {}
}
