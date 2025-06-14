import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {httpInterceptors} from './interceptors';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewProductComponent} from './products/view-product/view-product.component';
import {SharedModule} from "./shared/shared.module";
import {UserRoutesComponent} from './user-routes/user-routes.component';
import {MarketComponent} from './market/market.component';
import {AddMarketDialogComponent} from './market/add-market-dialog/add-market-dialog.component';
import {AssignRouteDialogComponent} from './user-routes/assign-route-dialog/assign-route-dialog.component';
import {AddRouteDialogComponent} from './routes/add-route-dialog/add-route-dialog.component';
import {SampleRequestComponent} from './sample-request/sample-request.component';
import {ProductListDialogComponent} from './sample-request/product-list-dialog/product-list-dialog.component';
import {ReturnFormComponent} from "./return-form/return-form.component";
import { EditProfileDialogComponent } from './profile/edit-profile-dialog/edit-profile-dialog.component';
import { AddUserDialogComponent } from './users/add-user-dialog/add-user-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        ReturnFormComponent,
        ViewProductComponent,
        UserRoutesComponent,
        MarketComponent,
        AddMarketDialogComponent,
        AssignRouteDialogComponent,
        AddRouteDialogComponent,
        SampleRequestComponent,
        ProductListDialogComponent,
        EditProfileDialogComponent,
        AddUserDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        DashboardModule,
        AuthModule,
        BrowserAnimationsModule,
        SharedModule,
    ],
    providers: [
        httpInterceptors,
        JwtHelperService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
