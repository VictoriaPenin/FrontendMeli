import { CostResponse, ItemResponse, StockItem } from './../../private/Interfaces/Responses';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MyPublicationsService {

  //private urlApi ='http://201.216.243.146:8080'
  //private urlApi ='https://ml.gylgroup.com:8080'
  private urlApi = 'http://localhost:8080'
  baseUrl: any;

  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  sendAuthorizationCode(code: string): Observable<any> {
    const url = `${this.urlApi}/seller/tokenForTG`;

    const params = new HttpParams({ fromObject: { TG: code } });
    const headers = this.getHeaders();

    const options = {
      headers: headers,
      params: params
    };

    return this.http.post(url, null, options);
  }

  public getDataMyProducts(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('sellerId', '1152777827')
      .set('offset', page.toString())
      .set('pageSize', pageSize.toString());

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.urlApi}/item/seller/items`, { params, headers });

  }

  public getSearchDataMyProducts(page: number, pageSize: number, searchType: string, searchTerm: string, isCatalogue: boolean): Observable<any> {
    const params = new HttpParams()
      .set('offset', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchType', searchType)
      .set('searchInput', searchTerm)
      .set('isCatalogue', isCatalogue);

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.urlApi}/item/search`, { params, headers });
  }

  getCatalogoPaginado(catalog_product_id: string, page: number, pageSize: number): Observable<any> {
    const url = `${this.urlApi}/item/catalog/${catalog_product_id}`;
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString());

    const headers = this.getHeaders();

    return this.http.get<any>(url, { params, headers }).pipe(
      catchError(err => {
        console.error('Error en la solicitud al servicio:', err);
        return of({ results: [], paging: { total: 0 } });
      })
    );
  }


  getCabeceraCatalogo(catalog_product_id: string): Observable<any> {

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.urlApi}/item/seller/catalog/` + catalog_product_id, { headers });
  }


  loadBestBox(catalog_product_id: string): Observable<any> {

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.urlApi}/item/winner/` + catalog_product_id, { headers })
  }

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


  getCostPage(page: number, pageSize: number): Observable<{ content: CostResponse[], totalElements: number }> {
    const params = new HttpParams()
      .set('sellerId', '1152777827')
      .set('offset', page.toString())
      .set('pageSize', pageSize.toString());

    const headers = this.getHeaders();

    return this.http.get(`${this.urlApi}/item/seller/list`, { params, headers }).pipe(
      map((res: any) => ({ content: res.content, totalElements: res.totalElements }))
    );
  }

  getCostPrueba(sellerId: number) {
    const url = `${this.urlApi}/item/seller/list`;

    const params = new HttpParams().set('sellerId', sellerId.toString());

    const headers = this.getHeaders();

    return this.http.get<ItemResponse[]>(url, { params, headers }).pipe(
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


  updateItems(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.urlApi}/seller/saveAllItemForSeller`, null, { headers });
  }

refreshToken():Observable<any>{
  const headers = this.getHeaders();
  return this.http.post<any>(`${this.urlApi}/seller/refresh-token`, null, { headers });
}

getOpinion(IdItem:string, limit:number,offset:number):Observable<any>{
  const params = {
    limit: limit.toString(),
    offset: offset.toString()
  };
  
  return this.http.get<any>(`${this.urlApi}/metrics/itemOpinion/`+IdItem, { params });
}

getOneItem(idItem:String):Observable<any>{
  return this.http.get<any>(`${this.urlApi}/item/oneItem/`+idItem)
}

getHealthActions(idItem:String):Observable<any>{

  return this.http.get<any>(`${this.urlApi}/metrics/itemHealthActions/`+idItem)
}

}
