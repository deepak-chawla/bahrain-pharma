import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AuthzComponent} from './authz-component/authz-component.component';
import {MatGridListModule} from '@angular/material/grid-list';

import {AuthInterceptorService} from './services/auth-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {FilterPipe} from './filter.pipe';
import {UsersComponent} from './users/users.component';
import {LayoutComponent} from './layout/layout.component';
import {CreateUserDialogComponent} from './users/create-user-dialog/create-user-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {EditUserDialogComponent} from "./users/edit-user-dialog/edit-user-dialog.component";
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthzComponent},
  {
    path: 'secure',
    component: LayoutComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'products', component: ProductsComponent}
    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    AuthzComponent,
    FilterPipe,
    UsersComponent,
    LayoutComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ProductsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    ToastrModule.forRoot()
  ],
  //providers: [AuthInterceptorService],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  //below component will be considered as homeComponent
  bootstrap: [AppComponent]
})
export class AppModule {
}
