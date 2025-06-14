import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products.model';
import { UpdateStatusComponent } from 'src/app/shared/update-status/update-status.component';
import {Router} from "@angular/router";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatSort) sort: MatSort;  // Correct initialization
    @ViewChild(MatPaginator) paginator: MatPaginator;  // Correct initialization

    dataSource = new MatTableDataSource<Product>();  // Ensure dataSource is initialized
    displayedColumns: string[] = [
        'productName', 'supplier', 'wp', 'code', 'barcode', 'packSize',
        'cartoonSize', 'category', 'unit', 'tax', 'hsCode', 'country'
    ];
    productSubscription: Subscription;
    totalProducts: number;

    constructor(
        private productService: ProductsService,
        private router: Router,
        public loadingService: LoadingService,
        private dialogRef: MatDialog
    ) {}

    ngOnInit(): void {
        this.fetchAllProducts(1, 10);  // Fetch initial data with pagination
    }

    fetchAllProducts(pageNumber: number, pageSize: number) {
        this.loadingService.enableLoading();
        this.productSubscription = this.productService
            .fetchAllProducts(pageNumber, pageSize)
            .subscribe(response => {
                this.dataSource.data = response.products;  // Set dataSource data
                this.totalProducts = response.total;  // Set total product count
                this.loadingService.disableLoading();
            });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;  // Set sorter
        // Subscribe to paginator changes
        this.paginator.page.subscribe(() => {
            this.fetchAllProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);
        });
    }

    doFilter(filterValue: string) {
        if (filterValue.trim()) {
            this.loadingService.enableLoading();
            this.productSubscription = this.productService
                .filterProductsByName(filterValue.trim().toLowerCase())
                .subscribe(filteredProducts => {
                    this.dataSource.data = filteredProducts;  // Update dataSource data with filtered products
                    this.loadingService.disableLoading();
                });
        } else {
            this.fetchAllProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);  // Reset to all products if filter is cleared
        }
    }

    goToProductDetail(productID){
        this.router.navigate(['/dashboard/products/'+productID]);
    }

    ngOnDestroy(): void {
        if (this.productSubscription) {
            this.productSubscription.unsubscribe();  // Unsubscribe to avoid memory leaks
        }
    }

    updateStatus(element) {
        const dialogRef = this.dialogRef.open(UpdateStatusComponent, { data: element });
        dialogRef.afterClosed().subscribe(result => {
            this.fetchAllProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);  // Reload current page after updating
        });
    }
}
