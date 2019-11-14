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
  activePage = 1;
  totalPages = 0;
  totalPagesArray = [];
  numberOfItems = 10; // number of items to show on list

  constructor() {}

  ngOnInit() {
    this.totalPagesSubscription = this.totalPagesObservable.subscribe(
      totPages => {
        this.totalPages = totPages;
        this.setNumberOfPages(totPages);
      }
    );
  }

  selectPage(pageNumber: number) {
    console.log(pageNumber);
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
    } else if (this.activePage + this.numberOfItems > totPages) {
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
