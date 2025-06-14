import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    submitted = false;
    loginSubscription: Subscription;
    errorMessage = '';

    constructor(private authService: AuthService,
                private router: Router,
                public loadingService: LoadingService) {
    }

    ngOnDestroy(): void {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.authService.redirectIfLoggedIn();
        this.initForm();
    }

    login() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.submitData(this.loginForm.value);
        }
    }

    submitData(formData: any) {
        this.loadingService.enableLoading();
        this.loginSubscription = this.authService.login(formData).subscribe(
            (response: any) => {
                if (response.responseCode && !(response.responseCode === '00')) {
                    this.errorMessage = response.data.error;
                } else {
                    this.router.navigate(['/dashboard']);
                }
                this.loadingService.disableLoading();
            }
        );
    }

    initForm() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            channel: new FormControl('admin-portal', [Validators.required])
        });
    }
}
