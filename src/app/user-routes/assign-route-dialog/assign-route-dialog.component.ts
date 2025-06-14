import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assign-route-dialog',
  templateUrl: './assign-route-dialog.component.html',
  styleUrls: ['./assign-route-dialog.component.css'],
})
export class AssignRouteDialogComponent implements OnInit {
  assignRouteForm: FormGroup;
  users: any[] = [];
  routes: any[] = [];
  days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AssignRouteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.assignRouteForm = this.fb.group({
      userID: [''],
      routeID: [''],
      day: ['MONDAY'],
    });
  }

  ngOnInit(): void {
    this.users = this.data.users;
    this.routes = this.data.routes;
  }

  assignRouteToUser() {
    if (this.assignRouteForm.valid) {
      this.dialogRef.close(this.assignRouteForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
