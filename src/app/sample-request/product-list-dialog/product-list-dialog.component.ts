import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-product-list-dialog',
  templateUrl: './product-list-dialog.component.html',
  styleUrls: ['./product-list-dialog.component.css'],
})
export class ProductListDialogComponent {
  productListForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ProductListDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productListForm = this.fb.group({
      products: this.fb.array(this.data.products.map(product => this.createProductGroup(product)))
    });
  }

  get products(): FormArray {
    return this.productListForm.get('products') as FormArray;
  }

  createProductGroup(product: any): FormGroup {
    return this.fb.group({
      productName: [product.productName],
      unit: [product.unit],
      quantity: [product.quantity],
      desc: [product.desc]
    });
  }

  addProduct(): void {
    this.products.push(this.createProductGroup({ productName: '', unit: '', quantity: 0, desc: '' }));
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  save(): void {
    if (this.productListForm.valid) {
      this.dialogRef.close(this.productListForm.value.products);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
