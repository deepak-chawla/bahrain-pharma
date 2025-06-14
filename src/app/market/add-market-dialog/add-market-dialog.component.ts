import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-market-dialog',
  templateUrl: './add-market-dialog.component.html',
  styleUrls: ['./add-market-dialog.component.css'],
})
export class AddMarketDialogComponent {
  marketForm: FormGroup;
  placeImages: File[] = [];

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddMarketDialogComponent>
  ) {
    this.marketForm = this.fb.group({
      marketName: [''],
      address: [''],
      marketPlacesList: this.fb.array([]),
    });
  }

  get marketPlacesList(): FormArray {
    return this.marketForm.get('marketPlacesList') as FormArray;
  }

  addPlace() {
    const placeForm = this.fb.group({
      placeName: [''],
      placeImage: [null], // To store file reference
    });
    this.marketPlacesList.push(placeForm);
  }

  removePlace(index: number) {
    this.marketPlacesList.removeAt(index);
    this.placeImages.splice(index, 1); // Remove the image when removing a place
  }

  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.placeImages[index] = file; // Store the image at the index of the place
    }
  }

  onSubmit() {
    if (this.marketForm.valid) {
      const formData = new FormData();

      // Append the market details
      formData.append('request', new Blob([JSON.stringify({
        marketName: this.marketForm.get('marketName')?.value,
        address: this.marketForm.get('address')?.value,
        marketPlacesList: this.marketForm.get('marketPlacesList')?.value.map((place: any) => ({
          placeName: place.placeName
        })),
      })], {
        type: 'application/json'
      }));

      // Append the place images
      this.placeImages.forEach((file, index) => {
        formData.append('placeImages', file);
      });

      // Send the formData to the parent component
      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
