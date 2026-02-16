import { Injectable } from "@angular/core";
import { ApiService } from "../services/api";
import { Observable, tap } from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    login(credentials: {username: string, password: string}): Observable<any> {
        return this.apiService.post('/auth/login', credentials).pipe(
            tap((data: any) => {
                this.saveToken(data.token);
                this.saveUser(data.user);
            })
        );
    }

    register(user: any): Observable<any> {
        return this.apiService.post('/auth/register', user);
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    private saveToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    private saveUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }  

    public getUser(): any {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }  
        return {};
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem(TOKEN_KEY) !== null;
    }
}