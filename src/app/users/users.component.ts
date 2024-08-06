import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: any[] = [
    {
      username: 'deepak chawla',
      userType: 'Admin',
      isActive: 'true',
    },
    {
      username: 'deepak chawla',
      userType: 'Admin',
      isActive: true,
    }
  ];
  dataSource = new MatTableDataSource<any>(this.users);
  columnsToDisplay: string[] = ['username', 'userType', 'isActive', 'Actions'];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with data:', result);
        this.createUser(result);
      }
    });
  }

  userEdit(event: any, element: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.updateUser(element.username, result);
      }
    });
  }

  userDelete(event: any, element: any) {
    const index = this.users.findIndex(user => user.username === element.username);
    if (index >= 0) {
      this.users.splice(index, 1);
      this.dataSource.data = this.users;
    }
  }

  getUsers() {
  }

  createUser(data: any): void {
    console.log('User data:', data);
    this.users.push(data);
    this.dataSource.data = [...this.users];
  }

  updateUser(username: number, data: any): void {
    const index = this.users.findIndex(user => user.username === username);
    if (index >= 0) {
      this.users[index] = { ...this.users[index], ...data };
      this.dataSource.data = this.users;
    }
  }


}
