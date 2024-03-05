import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subject, map, tap } from 'rxjs';
import { StockItem } from '../../private/Interfaces/Responses';

@Injectable({
  providedIn: 'root'
})
export class MyStockService {
  loading$: Subject<boolean> = new Subject<boolean>();


  private urlApi = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }




  uploadFile(file: File, option: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.urlApi}/upload?option=${option}`, formData, { headers });
  }

  postStockProveedores(jsonData: any): Observable<any> {
    const body = jsonData;

    const headers = this.getHeaders();

    return this.http.post(`${this.urlApi}/meli/supplier/createStock`, body, { headers });
  }

  postExcel(jsonData: any): Observable<any> {
    const body = jsonData;

    const headers = this.getHeaders();

    return this.http.post(`${this.urlApi}/stock/save`, body, { headers });
  }

  getStocks(): Observable<any> {

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.urlApi}/meli/supplier/bySellerStock/1`, { headers });
  }

  getStockPage(page: number, pageSize: number): Observable<{ content: StockItem[], totalElements: number }> {
    const params = new HttpParams()
      .set('sellerId', '1')
      .set('offset', page.toString())
      .set('pageSize', pageSize.toString());

    const headers = this.getHeaders();

    return this.http.get(`${this.urlApi}/meli/supplier/bySellerStockPaged`, { params, headers }).pipe(
      map((res: any) => ({ content: res.content, totalElements: res.totalElements }))
    );
  }

  loadData(pageIndex: number, pageSize: number) {
    this.loading$.next(true);

    return this.http.get<any>(`${this.urlApi}/meli/supplier/bySellerStockPaged`, { }).pipe(
      tap(() => this.loading$.next(false))
    );
  }

  sendFileStockManual(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.urlApi}/stock/save`, data, { headers });
}







}
