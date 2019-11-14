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
    this.activePage = pageNumber;
    this.selectedPageEvent.emit(pageNumber);
  }

  setNumberOfPages(totPages: number) {
    this.totalPagesArray = []; // reset array
    // If at end of items, make pages fixed at end
    if (this.activePage + this.numberOfItems > totPages) {
      for (let i = totPages - 9; i <= totPages; i++) {
        this.totalPagesArray.push(i);
      }
    } else {
      // Else calculate number of dynamic pages normally
      for (let i = this.activePage - 1; i < 9 + this.activePage; i++) {
        // If at beginning don't show a page 0
        if (i <= 0) {
          i = 1;
        }
        this.totalPagesArray.push(i);
      }
    }
  }

  ngOnDestroy() {
    this.totalPagesSubscription.unsubscribe();
  }
}
