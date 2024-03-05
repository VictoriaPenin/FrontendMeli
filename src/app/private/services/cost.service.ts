import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CostResponse, ItemResponse } from '../Interfaces/Responses';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  private urlApi = 'http://localhost:8080'

  constructor(private http: HttpClient) { }
  getCostData(sellerId: number, pageIndex: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('sellerId', sellerId.toString())
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

      return this.http.get(`${this.urlApi}/item/seller/list`, { params }).pipe(
        map((res: any) => ({ content: res.content, totalElements: res.totalElements }))
      );
      }
      getCostPage(page: number, pageSize: number): Observable<{ content: CostResponse[], totalElements: number }> {
        const params = new HttpParams()
          .set('sellerId', '1152777827')
          .set('offset', page.toString())
          .set('pageSize', pageSize.toString());
    
        const headers = this.getHeaders();
    
        return this.http.get(`${this.urlApi}/item/seller/list`, { params}).pipe(
          map((res: any) => ({ content: res.content, totalElements: res.totalElements }))
        );
      }
  getHeaders() {
    throw new Error('Method not implemented.');
  }

  getCostPrueba(sellerId: number) {
    const url = `${this.urlApi}/item/seller/list`;

    const params = new HttpParams().set('sellerId', sellerId.toString());

    const headers = this.getHeaders();

    return this.http.get<ItemResponse[]>(url, { params}).pipe(
      map(items => {
        return items.map(item => ({
          MLA: item.id,
          SKU: item.sku,
          'Título': item.title,
          Estado: item.status,
          'Stock total': item.total_stock,
          'Comisión ML %': item.item_cost.comision_fee,
          'Comisión ML': item.item_cost.comision_discount,
          Envío: item.item_cost.shipping,
          'Costo de compra': item.item_cost.replacement_cost,
          'IIBB': item.item_cost.iibb,
          'Costo total': item.item_cost.total_cost.toFixed(2),
          'Precio de venta': item.price,
          Ganancia: item.item_cost.profit,
          Margen: item.item_cost.margin.toFixed(2) + '%'
        }));
      })
    );
  }

    }