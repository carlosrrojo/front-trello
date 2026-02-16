import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/auth/auth';



@Component({
    selector: "app-register",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: "./register.html",
    styleUrls: ["../login/login.css"],
})
export class RegisterComponent {
    registerForm: FormGroup;
    isSignUpFailed = false;
    errorMessage = "";

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.registerForm = this.fb.group({
            username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        });
    }

    onSubmit(): void {
        //this.router.navigate(["/dashboard"]);
        
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value).subscribe({
                next: data => {
                    this.isSignUpFailed = false;
                    localStorage.setItem("auth-token", data)
                    this.router.navigate(["/login"]);
                },
                error: err => {
                    this.isSignUpFailed = true;
                    this.errorMessage = err.error.message || "Registration failed";
                }
            });
        }
    }
}