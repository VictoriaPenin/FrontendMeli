import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../Interfaces/Employee';



@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends DataSource<Employee> {
  private urlApi = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    super();
  }

  override connect(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.urlApi}/meli/employees`)
      .pipe(
        tap(data => console.log('Data from service:', data)),
        catchError(error => {
          console.error('Error in service:', error);
          return of([]);
        })
      );
  }

  override disconnect(collectionViewer: CollectionViewer): void {}

  // Otros métodos del servicio...

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getEmployees(): Observable<Employee[]> {
    const url = `${this.urlApi}/seller/getEmployeesBySellerId`;
    const headers = this.getHeaders();
    return this.http.get<Employee[]>(url, { headers })
      .pipe(
        tap(data => console.log('Datos del servicio:', data)),
        catchError(error => {
          console.error('Error en el servicio:', error);
          return of([]); // Devuelve un array vacío en caso de error
        })
      );
  }
  updateEmployee(employeeId: number, employeeUpdateDTO: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/employees/editar/${employeeId}`, employeeUpdateDTO)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/employees/eliminar/${employeeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError('Algo salió mal; por favor, inténtelo de nuevo más tarde.');
  }


  createEmployee(employeeData: any): Observable<any> {
    const url = `${this.urlApi}/auth/register-employee`; 
    const headers = this.getHeaders();
    return this.http.post<any>(url, employeeData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlApi}/exists?username=${username}`);
  }
}


