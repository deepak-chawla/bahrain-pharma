import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule, // Required for Sorting table
        MatPaginatorModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        MatDividerModule
    ],
    exports: [
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule, // Required for Sorting table
        MatPaginatorModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        MatDividerModule
    ],
})
export class MaterialCustomModule {
}
