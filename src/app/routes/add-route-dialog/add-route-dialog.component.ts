import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-route-dialog',
  templateUrl: './add-route-dialog.component.html',
  styleUrls: ['./add-route-dialog.component.css'],
})
export class AddRouteDialogComponent {
  addRouteForm: FormGroup;
  routeImage: File | null = null; // To store the image file

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddRouteDialogComponent>,
  ) {
    this.addRouteForm = this.fb.group({
      routeName: [''],
      area: [''],
      category: [''],
    });
  }

  // Method to handle image input
  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.routeImage = file; // Store the file
    }
  }

  // Method to submit the form
  addRoute() {
    if (this.addRouteForm.valid && this.routeImage) {
      const formData = new FormData();

      // Append form values
      formData.append('routeName', this.addRouteForm.get('routeName')?.value);
      formData.append('area', this.addRouteForm.get('area')?.value);
      formData.append('category', this.addRouteForm.get('category')?.value);

      formData.append('routeImage', this.routeImage);
      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
