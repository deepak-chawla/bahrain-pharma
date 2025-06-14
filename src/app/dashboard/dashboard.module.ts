import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDistributorComponent } from '../routes/view-distributor.component';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { ViewProfileComponent } from '../profile/view-profile/view-profile.component';
import { ViewCircularComponent } from '../circulars/view-circular/view-circular.component';
import { SharedModule } from '../shared/shared.module';
import { ViewUsersComponent } from '../users/view-users/view-users.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {OrdersComponent} from '../orders/orders.component';
import {OrderProductsComponent} from '../orders/order-products/order-products.component';
import {ProductsComponent} from '../products/products.component';
import {NotificationComponent} from '../notification/notification.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderProductsComponent,
    ProductsComponent,
    NotificationComponent,
    AddProductComponent,
    ViewCircularComponent,
    ViewUsersComponent,
    ViewProfileComponent,
    ViewDistributorComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
