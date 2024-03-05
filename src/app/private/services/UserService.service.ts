import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MetricsUser } from '../Interfaces/Metrics';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  //private urlApi ='http://201.216.243.146:8080'
  //private urlApi ='https://ml.gylgroup.com:8080'
  private urlApi = 'http://localhost:8080'


constructor(private http:HttpClient) { }
refreshToken():Observable<any>{
  return this.http.post<any>(`${this.urlApi}/seller/refresh-token`, null);
}

getGlobalMetricUser(): Observable<MetricsUser> {
  return this.http.get<MetricsUser>(`${this.urlApi}/seller/getSellerRep`).pipe(
    catchError(error => {
      console.log('error en traer los datos GlobalMetricUser');
      return throwError(error);
    })
  )
}

sendAuthorizationCode(code: string): Observable<any> {
  const params = new HttpParams({ fromObject: { TG: code } });

  return this.http.post(`${this.urlApi}/seller/tokenForTG`, null, {params});
}

}
