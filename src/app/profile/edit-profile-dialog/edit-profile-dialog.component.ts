// edit-profile-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ManageUserService} from "../../services/manage-user.service";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<EditProfileDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private manageUserService: ManageUserService
  ) {
    // Initialize form with the current user data passed from the parent
    this.profileForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      userName: [data.userName, Validators.required],
      channel: [data.channel, Validators.required],
      role: [data.role, Validators.required],
      mobileNo: [data.mobileNo, Validators.required],
      dateOfBirth: [data.dateOfBirth, Validators.required],
    });
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.manageUserService.updateUserProfile(this.profileForm.value).subscribe((res:any)=>{
      if(res.responseCode && res.responseCode === '00') this.dialogRef.close(this.profileForm.value);
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
