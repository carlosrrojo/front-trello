import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('auth-token');
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }  
        return headers;
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${path}`, {headers: this.getHeaders(), params});
    }

    post<T>(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${path}`, body, {headers: this.getHeaders(), params});
    }
    put<T>(path: string, body: Object = {}): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${path}`, body, {headers: this.getHeaders()});
    }
    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${path}`, {headers: this.getHeaders()});
    }
    patch<T>(path: string, body: Object = {}): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}${path}`, body, {headers: this.getHeaders()});
    }   
}