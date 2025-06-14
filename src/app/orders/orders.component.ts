import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {LoadingService} from 'src/app/services/loading.service';
import {UpdateStatusComponent} from 'src/app/shared/update-status/update-status.component';
import {Router} from '@angular/router';
import {OrdersService} from '../services/orders.service';
import {Order} from '../models/orders.model';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
    dataSource = new MatTableDataSource<Order>();
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = [
        'orderId',
        'customerName',
        'orderedOn',
        'distributorName',
        'productsQuantity',
        'orderStatus',
        'Actions'
    ];
    orderSubscription: Subscription;

    constructor(
        private orderService: OrdersService,
        public loadingService: LoadingService,
        private router: Router,
        private dialogRef: MatDialog) {
    }

    ngOnInit(): void {
        this.fetchAllOrders();
    }

    fetchAllOrders() {
        this.loadingService.enableLoading();
        this.orderSubscription = this.orderService
            .fetchAllOrders()
            .subscribe((response: Order[]) => {
                this.dataSource.data = response;
                this.loadingService.disableLoading();
            });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.orderSubscription.unsubscribe();
    }

    updateStatus(element) {
        const dialogRef = this.dialogRef.open(UpdateStatusComponent, {
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            this.fetchAllOrders();
        });
    }


    viewOrder(element) {
        this.router.navigate(['/dashboard/orders/' + element.orderId]);
    }
}
