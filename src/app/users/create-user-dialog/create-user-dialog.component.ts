import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {

  createUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.createUserForm = this.fb.group({
      username: [''],
      userType: [''],
      isActive: ['']
    });
  }


  ngOnInit(): void {
  }


  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.dialogRef.close(this.createUserForm.value);
    }
  }

}
