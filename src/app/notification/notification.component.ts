import {Component, OnInit} from '@angular/core';
import {Notification} from '../models/notification.model';
import {NgForm} from "@angular/forms";
import {RouteService} from "../services/route.service";
import {NotificationService} from "../services/notification.service";

@Component({
    selector: 'app-add-product',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
    notification: Notification;
    users = [];
    notificationSent: boolean = false;
    notificationError: string = ''

    constructor(private routeService: RouteService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.notification = new Notification();
        this.getAllUsers();
    }

    sendNotification(form: NgForm) {
        let payload;
        if (this.notification.username == 'All Users (Broadcast)') {
            payload = {
                name: "Broadcast",
                title: this.notification.title,
                description: this.notification.description,
                notificationType: 'broadcast',
                segments: ['All']
            };

            this.notificationService.sendBroadcastNotification(payload).subscribe(
                (response: any) => {
                    if (response.responseCode == '00') {
                        this.notificationSent = true;
                        setTimeout(() => {
                            this.notificationSent = false;
                        }, 3000);
                        form.resetForm();
                    } else {
                        this.notificationError = response.responseDescription;
                    }
                },
                (error) => {
                    console.error('Error sending notification', error);
                }
            );
        } else {
            payload = {
                name: "Single Notification",
                title: this.notification.title,
                description: this.notification.description,
                notificationType: 'single_notification',
                userID: this.notification.username
            };

            this.notificationService.sendNotificationToUser(payload).subscribe(
                (response: any) => {
                    if (response.responseCode == '00') {
                        this.notificationSent = true;
                        setTimeout(() => {
                            this.notificationSent = false;
                        }, 3000);
                        form.resetForm();
                    } else {
                        this.notificationError = response.responseDescription;
                    }
                },
                (error) => {
                    console.error('Error sending notification', error);
                }
            );

        }

    }

    getAllUsers(): void {
        this.routeService.getAllUsers().subscribe((response) => {
            this.users = response.data;
            this.users.unshift({id: 'All Users (Broadcast)', username: 'All Users (Broadcast)'});
        });
    }
}
