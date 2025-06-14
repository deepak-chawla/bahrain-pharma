import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../models/products.model';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product: Product;
  suppliers = [
    { id: 1, name: 'Supplier A' },
    { id: 2, name: 'Supplier B' },
    { id: 3, name: 'Supplier C' },
  ];

  categories = [
    { id: 1, name: 'Category X' },
    { id: 2, name: 'Category Y' },
    { id: 3, name: 'Category Z' },
  ];

  constructor(
    private service: ProductsService,
    private router: Router
  ) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.product = new Product();
  }

  saveProduct(formData) {
    this.service.addProduct(this.product).subscribe((res) => {
      this.router.navigate(['/dashboard/products']);
    });
  }
}
