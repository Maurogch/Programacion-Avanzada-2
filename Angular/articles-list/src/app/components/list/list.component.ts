import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headElements = [
    'ID',
    'Nombre',
    'Descripción'
  ];
  loading = true;

  constructor() { }

  ngOnInit() {
  }

}
