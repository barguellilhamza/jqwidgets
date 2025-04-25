import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token); // Stocke le token dans localStorage
          localStorage.setItem('authToken', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error?.message || 'Erreur inconnue'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken'); // Supprime le token pour déconnexion
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
