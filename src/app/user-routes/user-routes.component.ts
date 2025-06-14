import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouteService } from '../services/route.service';
import { AssignRouteDialogComponent } from './assign-route-dialog/assign-route-dialog.component';

@Component({
    selector: 'app-user-routes',
    templateUrl: './user-routes.component.html',
    styleUrls: ['./user-routes.component.css'],
})
export class UserRoutesComponent implements OnInit {
    routes: any[] = [];
    users: any[] = [];
    allUserRoutes: any[] = [];  // Store full response
    userRoutesByDay: any[] = [];  // Store filtered routes by day
    selectedDay: string = 'MONDAY';

    assignRouteData: any = {
        userID: '',
        routeID: '',
        status: 'ACTIVE',
        day: 'MONDAY',
    };

    displayedColumns: string[] = ['username', 'routeArea', 'category', 'routeImage'];

    constructor(private manageRoutesService: RouteService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.getAllRoutes();
        this.getAllUsers();
        this.getAllUserRoutes();
    }

    // Fetch all routes
    getAllRoutes(): void {
        this.manageRoutesService.getRoutes().subscribe((response) => {
            this.routes = response.data;
        });
    }

    // Fetch all users
    getAllUsers(): void {
        this.manageRoutesService.getAllUsers().subscribe((response) => {
            this.users = response.data;
        });
    }

    // Fetch all user routes and filter by the selected day
    getAllUserRoutes(): void {
        this.manageRoutesService.getAllUserRoutes().subscribe((response) => {
            if (response.responseCode === '00') {
                this.allUserRoutes = response.data.days;  // Store the full 'days' response
                this.userRoutesByDay = this.filterRoutesByDay(this.selectedDay); // Initial filter
            } else {
                console.error('Error fetching user routes:', response.responseDescription);
            }
        });
    }

    // Private function to filter user routes by selected day
    private filterRoutesByDay(day: string): any[] {
        const dayData = this.allUserRoutes.find(dayObj => dayObj.day === day);
        return dayData ? dayData.routesList : [];  // Return routes for the selected day or empty array
    }

    // Update user routes when day is changed
    onDayChange(): void {
        this.userRoutesByDay = this.filterRoutesByDay(this.selectedDay);
    }

    openAssignRouteDialog(): void {
        const dialogRef = this.dialog.open(AssignRouteDialogComponent, {
            width: '600px',
            data: { users: this.users, routes: this.routes },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.assignRouteData.userID = result.userID;
                this.assignRouteData.routeID = result.routeID;
                this.assignRouteData.day = result.day;
                this.assignRouteToUser();
            }
        });
    }

    assignRouteToUser(): void {
        if (!this.assignRouteData.userID || !this.assignRouteData.routeID) {
            console.error('Required parameters not provided for route assignment');
            return;
        }

        this.manageRoutesService.assignRouteToUser(this.assignRouteData).subscribe(
            () => {
                this.assignRouteData = {
                    userID: '',
                    routeID: '',
                    status: 'ACTIVE',
                    day: 'MONDAY',
                };
                this.getAllUserRoutes();  // Refresh all routes after assigning
            },
            (error) => {
                console.error('Error assigning route to user:', error);
            }
        );
    }
}
