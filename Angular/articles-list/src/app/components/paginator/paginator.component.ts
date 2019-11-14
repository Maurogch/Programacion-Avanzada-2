import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input()
  totalPages = 0;
  @Output()
  selectedPage = new EventEmitter<number>();
  page = 0;

  constructor() {}

  ngOnInit() {}

  selectPage(page: number) {
    this.selectedPage.emit(page);
  }
}
