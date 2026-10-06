import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { API_URL } from '../config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    login(email: string, password: string) {
        return this.http
            .post<{ token: string }>(`${API_URL}/auth/login`, { email, password })
            .pipe(tap((res) => localStorage.setItem('token', res.token)));
    }
    logout() { localStorage.removeItem('token'); }
    get token() { return localStorage.getItem('token'); }
    isLoggedIn() { return !!this.token; }
}