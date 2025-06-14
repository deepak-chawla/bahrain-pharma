import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouteService } from '../services/route.service';
import { AddRouteDialogComponent } from './add-route-dialog/add-route-dialog.component';

@Component({
    selector: 'app-view-distributor',
    templateUrl: './view-distributor.component.html',
    styleUrls: ['./view-distributor.component.css'],
})
export class ViewDistributorComponent implements OnInit {
    routes: any[] = [];
    displayedColumns: string[] = ['routeName', 'area', 'category', 'routeImage', 'actions'];

    constructor(private manageRoutesService: RouteService, public dialog: MatDialog) {}

    getAllRoutes(): void {
        this.manageRoutesService.getRoutes().subscribe((response) => {
            if (response.responseCode === '00') {
                this.routes = response.data; // Populate the routes with API response data
            } else {
                console.error('Error loading routes:', response.responseDescription);
            }
        }, error => {
            console.error('Error fetching routes:', error);
        });
    }

    ngOnInit(): void {
        this.getAllRoutes();
    }

    openAddRouteDialog(): void {
        const dialogRef = this.dialog.open(AddRouteDialogComponent, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.manageRoutesService.addRoute(result).subscribe(
                    (response) => {
                        this.getAllRoutes(); // Refresh the routes list
                    },
                    (error) => {
                        console.error('Error adding route:', error);
                    }
                );
            }
        });
    }

    deleteRouteByID(routeID: string): void {
        this.manageRoutesService.deleteRoute(routeID).subscribe((response) => {
            this.getAllRoutes(); // Refresh the routes list
        });
    }
}
