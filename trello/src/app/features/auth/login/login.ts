import { Component, inject, Inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {

    private authService: AuthService = inject(AuthService);

    loginForm: FormGroup;
    isLoginFailed = false
    errorMessage = '';

    constructor(private fb: FormBuilder, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    onSubmit(): void {
        //this.router.navigate(['/dashboard']);
        
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (data) => {
                    this.isLoginFailed = false;
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    this.errorMessage = err.error.message || 'Login failed';
                    this.isLoginFailed = true;
                }
            });
        }
    }
}