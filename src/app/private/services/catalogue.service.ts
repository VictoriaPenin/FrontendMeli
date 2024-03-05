import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private urlApi = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.urlApi}/metrics/listCategories`, { headers });
  }

  getTopProductsByCategory(id: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.urlApi}/metrics/topSold/${id}`, { headers });
  }

  getDataCatalog(sellerId: number, offset: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('sellerId', sellerId.toString())
      .set('offset', offset.toString())
      .set('pageSize', pageSize.toString());

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.urlApi}/item/seller/catalogItems`, { params, headers });
  }

  private getHeaders(): HttpHeaders {
    // Add any additional headers here if needed
    return new HttpHeaders();
  }
}
