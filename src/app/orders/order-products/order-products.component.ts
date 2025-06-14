import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {OrdersService} from '../../services/orders.service';
import {OrderProducts} from '../../models/orders.model';

@Component({
    selector: 'app-order-products',
    templateUrl: './order-products.component.html',
    styleUrls: ['./order-products.component.css'],
})
export class OrderProductsComponent implements OnInit {

    orderId = 'ORD001';
    orderProducts: OrderProducts[] = [];

    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.orderId = this.route.snapshot.params['id'];
        this.orderService
            .fetchAllOrderProducts()
            .subscribe((data: OrderProducts[]) => {
                this.orderProducts = data;
            });
    }

    navigate(): void {
        // this.router.navigate(['/dashboard/addrawmaterial']);
    }
}
