import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: "root"
})
export class NotificationService{
    private apiUrl = '/api/v1/notification';

    constructor(private http: HttpClient) {}

    sendBroadcastNotification(payload){
        return this.http.post(`${this.apiUrl}/sendNotificationToAll`,payload);
    }

    sendNotificationToUser(payload){
        return this.http.post(`${this.apiUrl}/sendNotificationToCustomer`,payload);
    }

}
