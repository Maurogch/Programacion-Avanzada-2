import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  private totalPagesSubscription: any;
  @Input() totalPagesObservable: Observable<number>;
  @Output()
  selectedPageEvent = new EventEmitter<number>();
  @Output()
  numberOfRowsEvent = new EventEmitter<number>();

  activePage = 1;
  totalPages = 0;
  totalItems = 0;
  totalPagesArray = [];
  numberOfRows = 10; // number of items to show on list

  constructor() {}

  ngOnInit() {
    this.totalPagesSubscription = this.totalPagesObservable.subscribe(
      totItems => {
        this.totalItems = totItems;
        this.totalPages = Math.ceil(totItems / this.numberOfRows);
        this.setNumberOfPages(this.totalPages);
      }
    );
  }

  setRows(rows) {
    // Convert to int otherwise the conditions in setNumberOfPages will be
    // broken as it will try to concatenate strings instead of doing math
    rows = parseInt(rows, 10);

    // If active page is greater than new max pages, go to last new page
    if (this.activePage > Math.ceil(this.totalItems / rows)) {
      this.selectPage(Math.ceil(this.totalItems / rows));
    }

    this.numberOfRows = rows;
    this.numberOfRowsEvent.emit(rows);
  }

  selectPage(pageNumber: number) {
    this.activePage = pageNumber;
    this.selectedPageEvent.emit(pageNumber);
  }

  setNumberOfPages(totPages: number) {
    this.totalPagesArray = []; // reset array

    if (this.activePage === 1) {
      // If at beginning of pagination, and/or pagination less than 10
      for (let i = 1; i <= totPages && i <= 10; i++) {
        this.totalPagesArray.push(i);
      }
    } else if (this.activePage + this.numberOfRows > totPages) {
      // If at end of items, make pages fixed at end
      for (let i = totPages - 9; i <= totPages; i++) {
        // If less than 10 pages limit lenght
        if (i <= 0) {
          i = 1;
        }
        this.totalPagesArray.push(i);
      }
    } else {
      // Else calculate number of dynamic pages normally
      // (activePage - 1) is to always show number of previous page
      for (let i = this.activePage - 1; i < 9 + this.activePage; i++) {
        this.totalPagesArray.push(i);
      }
    }
  }

  ngOnDestroy() {
    this.totalPagesSubscription.unsubscribe();
  }
}
