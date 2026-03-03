import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@fitness-premium-hub/shared-types';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly tokenKey = 'fitness_premium_token';

  // Signals for reactive auth state
  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.checkInitialAuth();
  }

  private checkInitialAuth() {
    const token = localStorage.getItem(this.tokenKey);
    // Dans une implémentation réelle on décode le token JWT avec jwt-decode ou on appelle /api/auth/me
    // Ici pour l'exemple on simule une session active si le token existe
    if (token) {
      this.currentUser.set({ email: 'user@fitness.com', role: 'USER' } as unknown as User);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ user: User; access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);
        this.currentUser.set(response.user);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: Record<string, unknown>) {
    return this.http.post<{ user: User; access_token: string }>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);
        this.currentUser.set(response.user);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Register Error:', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
