import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MetricsUser, TopItem, categorie } from '../Interfaces/Metrics';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  //private urlApi ='http://201.216.243.146:8080'
  //private urlApi ='https://ml.gylgroup.com:8080'
  private urlApi = 'http://localhost:8080'
  

constructor(private http:HttpClient) { }

getAllCategorie(): Observable<categorie[]> {
    return this.http.get<categorie[]>(`${this.urlApi}/metrics/listAllCategory`).pipe(
      catchError(error => {
        console.error('Error fetching categories', error);
        return throwError(error); // Puedes retornar un Observable de error o hacer algo más aquí
      })
    );
  }
getTopItem(id:any):Observable<TopItem[]>{
  return this.http.get<TopItem[]>(`${this.urlApi}/metrics/getTopForCategorie/`+id).pipe(
    catchError(error => {
      console.error("Error en obtener los item top");
      return throwError(error);
    })
  )
}

}  