import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headElements = [
    { name: 'productId', translatedName: 'ID' },
    { name: 'name', translatedName: 'Nombre' },
    { name: 'description', translatedName: 'Descripción' }
  ];
  loading = true;
  products = [];
  page = 1; // value comes from paginator
  size = 10; // value comes from paginator
  totalItems: Subject<number> = new Subject<number>();
  sortedBy = 'productId';
  sortOrder = 'ASC';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable(
    page = this.page,
    size = this.size,
    orderBy = this.sortedBy,
    direction = this.sortOrder
  ) {
    console.log(orderBy);
    console.log(direction);
    this.loading = true;
    this.productService
      .getByPageSizeOrdered(page - 1, size, orderBy, direction)
      .subscribe(
        data => {
          this.products = data.items;
          this.loading = false;
          this.totalItems.next(data.total);
        },
        err => {
          console.log(err);
        }
      );
  }

  pageChange(pageNumber: number) {
    this.page = pageNumber;
    this.loadTable();
  }

  setRows(size: number) {
    this.size = size;
    this.loadTable();
  }

  sort(orderBy: string) {
    if (this.sortedBy === orderBy) {
      if (this.sortOrder === 'ASC') {
        this.sortOrder = 'DESC';
      } else {
        this.sortOrder = 'ASC';
      }
    } else {
      this.sortOrder = 'ASC';
    }
    this.sortedBy = orderBy;
    this.loadTable();
  }
}
