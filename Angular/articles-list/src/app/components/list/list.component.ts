import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headElements = ['ID', 'Nombre', 'Descripción'];
  loading = true;
  products = [];
  page = 0;
  size = 10;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadTable(this.page, this.size);
  }

  loadTable(page: number, size: number) {
    this.productService.getByPageSize(page, size).subscribe(
      data => {
        this.products = data.items;
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }
}
