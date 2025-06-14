import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ManageUserService} from "../../services/manage-user.service";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {

  profileForm: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<AddUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private manageUserService: ManageUserService
  ) {
    // Initialize form with the current user data passed from the parent
    this.profileForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      userName: [data.userName, Validators.required],
      password: [data.password, Validators.required],
      channel: [data.channel, Validators.required],
      role: [data.role, Validators.required],
      mobileNo: [data.mobileNo, Validators.required],
      dateOfBirth: [data.dateOfBirth, Validators.required],
    });
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.manageUserService.addUser(this.profileForm.value).subscribe((res:any)=>{
        if(res.responseCode && res.responseCode === '00') this.dialogRef.close(this.profileForm.value);
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
