import { CommonModule } from "@angular/common";
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/auth/auth';

@Component({
    selector: "app-register",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: "./register.html",
    styleUrls: ["../login/login.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
    
    private fb: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    registerForm: FormGroup = this.fb.group({
        username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });

    isSignUpFailed = false;
    errorMessage = "";

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value).subscribe({
                next: data => {
                    this.isSignUpFailed = false;
                    localStorage.setItem("auth-token", data);
                    this.router.navigate(["/login"]);
                },
                error: err => {
                    this.isSignUpFailed = true;
                    this.errorMessage = err.error.message || "Registration failed. Please try again.";
                }
            });
        }
    }
}