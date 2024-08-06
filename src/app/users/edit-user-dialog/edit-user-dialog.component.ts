import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  editUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      username: [this.data.username, Validators.required],
      userType: [this.data.userType, Validators.required],
      isActive: [this.data.isActive, Validators.required]
    });
  }


  onSubmit(): void {
    console.log('invoked')
    if (this.editUserForm.valid) {
      this.dialogRef.close(this.editUserForm.value);
    }
  }

}
