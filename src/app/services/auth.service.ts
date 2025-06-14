import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {User} from '../models/user.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EventService} from './event.service';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authServiceUrl = `${environment.protocol}${environment.applicationUrl}/${environment.authService}`;

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService,
        private eventServie: EventService
    ) {
    }

    login(formData) {
        return this.http.post('/api/v1/authenticate', formData)
            .pipe(
                map((response: any) => {
                    if (response.responseCode === '00' && response.data) {
                        const token = response.data.jwttoken;
                        const user = {
                            userId: response.data.userDetails.id,
                            userName: response.data.userDetails.username,
                            token: token,
                            role: response.data.userDetails.roles[0].role,
                            channel: response.data.userDetails.channel.descr,
                            mobileNo: response.data.userDetails.mobileNo,
                            dateOfBirth: response.data.userDetails.dateOfBirth,
                            firstName: response.data.userDetails.firstName,
                            lastName: response.data.userDetails.lastName,
                            profilePicture: response.data.userDetails.profilePicture != null ? response.data.userDetails.profilePicture.profilePic : null
                        };

                        this.saveToSessionStorage(user);
                        this.eventServie.loggedInUser.next(user);
                        return user;
                    } else {
                        return response;
                    }
                })
            );
    }

    saveToSessionStorage(user: User) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    fetchFromSessionStorage(): User {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    redirectIfLoggedIn() {
        if (this.fetchFromSessionStorage()?.token) {
            this.router.navigate(['/dashboard']);
        }
    }

    isAuthenticated(): boolean {
        const token = this.fetchFromSessionStorage()?.token;
        return true;
    }

    requestSecretQuestion(username) {
        return this.http.get(`${this.authServiceUrl}/auth/forgotpassword/${username}`);
    }

    requestPasswordReset(formData) {
        return this.http.put(`${this.authServiceUrl}/auth/forgotpassword`, formData);
    }

    getRole() {
        return this.fetchFromSessionStorage()?.role;
    }
}
