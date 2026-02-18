import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    private fb: FormBuilder = inject(FormBuilder);

    loginForm: FormGroup = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    
    isLoginFailed = false;
    errorMessage = '';

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (data) => {
                    this.isLoginFailed = false;
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    this.errorMessage = err.error.message || 'Login failed. Please try again.';
                    this.isLoginFailed = true;
                }
            });
        }
    }
}