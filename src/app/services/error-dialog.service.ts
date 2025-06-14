/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-11-04 18:56:08
 * @modify date 2020-11-04 18:56:08
 * @desc Error Dialog Handler Service
 */
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDisplayComponent} from '../shared/error-display/error-display.component';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

@Injectable({
    providedIn: 'root',
})
export class ErrorDialogService {
    private opened = false;

    dialogRef: MatDialogRef<ErrorDisplayComponent>;

    constructor(private dialog: MatDialog) {
    }

    openDialog(message: string, status?: number): void {
        if (!this.opened) {
            this.opened = true;
            this.dialogRef = this.dialog.open(ErrorDisplayComponent, {
                data: {message, status},
                maxHeight: '100%',
                width: '540px',
                maxWidth: '100%',
                disableClose: true,
                hasBackdrop: true,
            });

            this.dialogRef.afterClosed().subscribe(() => {
                this.opened = false;
            });
        }
    }

    closeDialog() {
        this.dialogRef.close();
        this.opened = false;
    }
}
