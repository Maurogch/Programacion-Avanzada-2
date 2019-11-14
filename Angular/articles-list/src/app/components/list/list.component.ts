import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headElements = ['ID', 'Nombre', 'Descripción'];
  loading = true;
  products = [];
  page = 1; // value comes from paginator
  size = 10; // value comes from paginator
  private totalPages: Subject<number> = new Subject<number>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadTable(this.page, this.size);
  }

  loadTable(page: number, size: number) {
    console.log('laod table page: ' + page);
    this.productService.getByPageSize(page - 1, size).subscribe(
      data => {
        this.products = data.items;
        this.loading = false;
        this.totalPages.next(data.total / this.size);
      },
      err => {
        console.log(err);
      }
    );
  }

  pageChange(pageNumber: number) {
    this.page = pageNumber;
    this.loadTable(this.page, this.size);
  }
}
