import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';

export interface Supplier {
  
  id: string;
  cuit: string;
  supplierName: string;
  domicilio: string;
  telefono: string;
  rubro: string;
}

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  
  private apiUrl = 'http://localhost:8080/meli/supplier';

  constructor(private http: HttpClient) {}

  // getSuppliers(): Observable<Supplier[]> {
  //   return this.http.get<Supplier[]>(`${this.apiUrl}/listSupplier`);
  // }

// addSupplier(newSupplier: Supplier): Observable<Supplier> {
//   return this.http.post<Supplier>(`${this.apiUrl}/createSupplier`, newSupplier);
// }
addSupplier(newSupplier: Supplier): Observable<Supplier> {
  return this.http.post(`${this.apiUrl}/createSupplier`, newSupplier, { responseType: 'text' })
    .pipe(
      map(response => {
        // Si la respuesta es un texto, puedes manejarlo aquí según tus necesidades
        console.log('Response:', response);

        // Puedes devolver un objeto ficticio o ajustar el manejo según lo que necesites
        return {
          id: 'nuevo-id',
          cuit: newSupplier.cuit,
          supplierName: newSupplier.supplierName,
          domicilio: newSupplier.domicilio,
          telefono: newSupplier.telefono,
          rubro: newSupplier.rubro
        };
      }),
      catchError(error => {
        // Maneja cualquier error aquí
        console.error('Error adding supplier:', error);
        throw error;
      })
    );
}


updateSupplier(id: string, updatedSupplier: Supplier): Observable<Supplier> {
  return this.http.put<Supplier>(`${this.apiUrl}/editSupplier/${id}`, updatedSupplier)
    .pipe(map(response => {
      console.log('Response:', response);

      return {
        id: '',
        cuit: updatedSupplier.cuit,
        supplierName: updatedSupplier.supplierName,
        domicilio: updatedSupplier.domicilio,
        telefono: updatedSupplier.telefono,
        rubro: updatedSupplier.rubro
      };
    }),
    catchError(error => {
      // Maneja cualquier error aquí
      console.error('Error editing supplier:', error);
      throw error;
    })
  );
}

deleteSupplier(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/deleteSupplier/${id}`);
}
private suppliersSubject = new BehaviorSubject<Supplier[]>([]);
suppliers$ = this.suppliersSubject.asObservable();

getSuppliers(): Observable<Supplier[]> {
  return this.http.get<Supplier[]>(`${this.apiUrl}/listSupplier`).pipe(
    tap(suppliers => this.suppliersSubject.next(suppliers))
  );
}

getSupplierById(id: string): Observable<Supplier> {
  return this.http.get<Supplier>(`${this.apiUrl}/findById/${id}`);
}
}