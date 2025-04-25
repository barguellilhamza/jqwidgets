import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Company {
  id: number;
  companyName: string | null;
  contactName: string | null;
  title: string;
  address: string;
  city: string;
  country: string;
}


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>('http://localhost:8080/api/companies', company);
  }
  
  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl).pipe(
      tap(data => console.log('Données récupérées1:', data))
    );
  }
  
}
