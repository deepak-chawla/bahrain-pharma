/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-11-05 00:48:39
 * @modify date 2020-11-05 00:48:39
 * @desc Used to manage Users
 */
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable, of} from 'rxjs';
import {UserDetails} from '../models/user-details.model';
import {map} from 'rxjs/operators';
import {User} from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class ManageUserService {
    authServiceUrl = `/api/v1/user`;

    constructor(private http: HttpClient) {
    }

    fetchAllUsers(): Observable<User[]> {
        return this.http.get<any>(`${this.authServiceUrl}/getNonAdminUsers`).pipe(
            map(response => {
                // Check if the response is successful
                if (response.responseCode === '00') {
                    // Map the data array to match the User interface
                    return response.data.map((user: any) => ({
                        userId: user.id.toString(),
                        userName: user.username,
                        token: '', // Assuming there's no token in the response
                        role: user.roles && user.roles.length > 0 ? user.roles[0].role : 'N/A',
                        channel: user.channel ? user.channel.descr : 'N/A',
                        mobileNo: user.mobileNo || 'N/A',
                        dateOfBirth: user.dateOfBirth || 'N/A',
                        firstName: user.firstName || 'N/A',
                        lastName: user.lastName || 'N/A',
                        profilePicture: user.profilePicture ? user.profilePicture.profilePic : 'N/A'
                    }));
                } else {
                    // Handle error cases by returning an empty array or throwing an error
                    console.error('Error fetching users:', response.responseDescription);
                    return [];
                }
            })
        );
    }

    updateProfilePicture(formData) {
        return this.http.post(`${this.authServiceUrl}/uploadProfilePicture`, formData);
    }

    updateUserProfile(user) {
        return this.http.post(`${this.authServiceUrl}/updateUser`, user);
    }

    addUser(user) {
        return this.http.post(`${this.authServiceUrl}/addUser`, user);
    }
}
