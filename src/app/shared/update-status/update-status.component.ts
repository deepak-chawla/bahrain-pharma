/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-11-08 14:53:14
 * @modify date 2020-11-08 14:53:14
 * @desc Update Status Popup
 */
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css'],
})
export class UpdateStatusComponent implements OnInit {
  statuses = ['Delivered', 'Cancelled'];
  statusForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private dialogRef: MatDialogRef<UpdateStatusComponent>,
    public loadingService: LoadingService
  ) {
    this.initForm();
  }
  initForm() {
    this.statusForm = new FormGroup({
      newStatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.data['productId']) {
      this.updateProductData();
    } else this.updateRawMaterialData();
  }

  updateRawMaterialData() {
    let data = {
      orderId: this.data.rawMaterialOrderId,
      status: this.statusForm.value.newStatus,
    };

    this.loadingService.enableLoading();
  }

  updateProductData() {
    let data = {
      orderId: this.data.productOrderId,
      status: this.statusForm.value.newStatus,
    };
    this.loadingService.enableLoading();
  }
}
