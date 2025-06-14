import {Inject} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ErrorDialogService} from '../../services/error-dialog.service';

@Component({
    selector: 'app-error-display',
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css'],
})
export class ErrorDisplayComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { message: string; status?: number },
        private errorDialogService: ErrorDialogService) {
    }

    ngOnInit(): void {
    }

    onClose(){
        this.errorDialogService.closeDialog();
    }
}
