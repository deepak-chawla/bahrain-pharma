import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {LoadingService} from 'src/app/services/loading.service';
import {User} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileDialogComponent} from "../edit-profile-dialog/edit-profile-dialog.component";
import {ManageUserService} from "../../services/manage-user.service";

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
    user: User;

    constructor(
        public loadingService: LoadingService,
        private manageUserService: ManageUserService,
        private authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.fetchUser();
    }

    fetchUser() {
        this.loadingService.enableLoading();
        this.user = this.authService.fetchFromSessionStorage();
        this.loadingService.disableLoading();

    }

    openEditProfileDialog(): void {
        const dialogRef = this.dialog.open(EditProfileDialogComponent, {
            width: '400px',
            data: { ...this.user },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.user = result;
            }
        });
    }

    onProfilePictureChange(event: Event): void {
        const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            const formData = new FormData();
            formData.append('userID',this.user.userId)
            formData.append('profilePicture', file);

            // Post the form data to the server (endpoint for uploading profile picture)
            this.manageUserService.updateProfilePicture(formData).subscribe(
                (response: any) => {
                    // Update profile picture URL after successful upload
                    this.user.profilePicture = response.newProfilePictureUrl;
                },
                (error) => {
                    console.error('Error uploading profile picture:', error);
                }
            );
        }
    }
}
