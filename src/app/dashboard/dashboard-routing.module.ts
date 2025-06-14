import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewDistributorComponent} from '../routes/view-distributor.component';
import {AuthGuard} from '../guards/auth.guard';
import {RoleGuard} from '../guards/role.guard';
import {AddProductComponent} from '../products/add-product/add-product.component';
import {ViewProfileComponent} from '../profile/view-profile/view-profile.component';
import {ViewCircularComponent} from '../circulars/view-circular/view-circular.component';
import {ViewUsersComponent} from '../users/view-users/view-users.component';
import {DashboardComponent} from './dashboard.component';
import {OrdersComponent} from '../orders/orders.component';
import {OrderProductsComponent} from '../orders/order-products/order-products.component';
import {ProductsComponent} from '../products/products.component';
import {NotificationComponent} from '../notification/notification.component';
import {ViewProductComponent} from "../products/view-product/view-product.component";
import {UserRoutesComponent} from "../user-routes/user-routes.component";
import {MarketComponent} from "../market/market.component";
import {SampleRequestComponent} from "../sample-request/sample-request.component";
import {ReturnFormComponent} from "../return-form/return-form.component";

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'addproduct',
                component: AddProductComponent,
                canActivate: [RoleGuard],
                data: {role: 'Admin'},
            },
            {path: 'orders', component: OrdersComponent},
            {
                path: 'orders/:id',
                component: OrderProductsComponent,
            },
            {
                path: 'circulars',
                component: ViewCircularComponent,
            },
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'products/:id',
                component: ViewProductComponent
            },
            {
                path: 'notifications',
                component: NotificationComponent
            },
            {
                path: 'market',
                component: MarketComponent,
            },
            {
                path: 'routes',
                component: ViewDistributorComponent,
            },
            {
                path: 'user-routes',
                component: UserRoutesComponent,
            },
            {
                path: 'users',
                component: ViewUsersComponent,
                canActivate: [RoleGuard],
                data: {role: 'Admin'},
            },
            {
                path: 'sample-request',
                component: SampleRequestComponent,
            },
            {
                path: 'return-form',
                component: ReturnFormComponent,
            },
            {
                path: 'profile',
                component: ViewProfileComponent
            },
            {
                path: '',
                component: ViewProfileComponent
            },
            {
                path: '**',
                redirectTo: '/404'
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DashboardRoutingModule {
}
