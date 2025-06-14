import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductListDialogComponent } from './product-list-dialog/product-list-dialog.component';

@Component({
  selector: 'app-sample-request',
  templateUrl: './sample-request.component.html',
  styleUrls: ['./sample-request.component.css'],
})
export class SampleRequestComponent implements OnInit {
  sampleRequests: any[] = [];
  filteredSampleRequests: any[] = [];
  displayedColumns: string[] = ['requestNo', 'salesExecutive', 'marketName', 'customerName', 'reason', 'actions'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSampleRequests(); // Assume a method to fetch sample requests
  }

  getSampleRequests(): void {
    // Example data fetching
    this.sampleRequests = [
      {
        requestNo: 'REQ001',
        salesExecutive: 'John Doe',
        marketName: 'Market 1',
        customerName: 'Customer A',
        reason: 'Sample for new product',
        products: [
          { productName: 'Product 1', unit: 'kg', quantity: 10, desc: 'Sample description 1' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
          { productName: 'Product 2', unit: 'ltr', quantity: 5, desc: 'Sample description 2' },
        ],
      },
      {
        requestNo: 'REQ002',
        salesExecutive: 'Jane Smith',
        marketName: 'Market 2',
        customerName: 'Customer B',
        reason: 'Testing new batch',
        products: [
          { productName: 'Product 3', unit: 'pcs', quantity: 15, desc: 'Sample description 3' },
          { productName: 'Product 4', unit: 'box', quantity: 2, desc: 'Sample description 4' },
        ],
      },
    ];
    this.filteredSampleRequests = [...this.sampleRequests]; // Initialize filtered list
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredSampleRequests = this.sampleRequests.filter(sample =>
        Object.values(sample).some(value => value.toString().toLowerCase().includes(filterValue))
    );
  }

  openProductListDialog(products: any[]): void {
    this.dialog.open(ProductListDialogComponent, {
      width: '600px',
      data: { products },
    });
  }
}
