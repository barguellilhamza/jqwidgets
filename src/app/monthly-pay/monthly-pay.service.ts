import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface MonthlyPaySummary {
  id?: number;
  mois: string;
  entreprise1: string;
  pay1: number;
  entreprise2: string;
  pay2: number;
  gain: number;
  gain2: number;
  gainT: number;
}

@Injectable({
  providedIn: 'root'
})
export class MonthlyPayService {
  private apiUrl = 'http://localhost:8080/api/monthly-pay';

  constructor(private http: HttpClient) {}

  // Fonction pour récupérer le token JWT depuis localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');  // Remplacez 'authToken' par la clé que vous utilisez pour stocker le token
  }

  // Méthode pour ajouter l'en-tête Authorization avec le token
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getAuthToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getMonthlyPaySummaries(): Observable<MonthlyPaySummary[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<MonthlyPaySummary[]>(this.apiUrl, { headers }).pipe(
      tap(data => console.log('Données récupérées:', data))
    );
  }

  addMonthlyPay(summary: MonthlyPaySummary): Observable<MonthlyPaySummary> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<MonthlyPaySummary>(this.apiUrl, summary, { headers });
  }

  updateMonthlyPay(summary: MonthlyPaySummary): Observable<MonthlyPaySummary> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<MonthlyPaySummary>(this.apiUrl, summary, { headers });
  }

  deleteMonthlyPay(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
