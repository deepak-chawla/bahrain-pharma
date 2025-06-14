import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ManageUserService } from 'src/app/services/manage-user.service';
import { User } from "../../models/user.model";
import {EditProfileDialogComponent} from "../../profile/edit-profile-dialog/edit-profile-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit, AfterViewInit, OnDestroy {

  // MatTableDataSource with User type
  dataSource = new MatTableDataSource<User>();

  // ViewChild to capture sorting reference
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // Columns displayed in the table
  displayedColumns: string[] = ['id', 'userName', 'name', 'role', 'mobileNo', 'channel', 'Action'];

  // Subscription to handle unsubscribe
  userSubscription: Subscription;

  constructor(
      private manageUserService: ManageUserService,
      public loadingService: LoadingService,
      public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAllUsers(); // Fetch all users on initialization
  }

  fetchAllUsers() {
    this.loadingService.enableLoading(); // Enable loading indicator
    this.userSubscription = this.manageUserService
        .fetchAllUsers()
        .subscribe((response: User[]) => {
          // Update the dataSource with the fetched data
          this.dataSource.data = response;
          this.loadingService.disableLoading(); // Disable loading indicator
        }, error => {
          console.error('Error fetching users:', error);
          this.loadingService.disableLoading();
        });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Assign sorting after the view is initialized
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  addUser(){
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { },
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.fetchAllUsers();
    });
  }


  editUser(user){
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
        this.fetchAllUsers();
    });
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
