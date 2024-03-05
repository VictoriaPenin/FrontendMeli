import { Injectable } from '@angular/core';
import { RegisterUser, User } from '../public/interfaces/authIterface';
import { of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';



@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  
  private _user!: User;
  //private baseUrl: string = 'http://201.216.243.146:8080';
  //private baseUrl = 'https://ml.gylgroup.com:8080';
  private baseUrl: string = 'http://localhost:8080';
  private readonly SESSION_STORAGE_KEY = null;
  private readonly SESSION_STORAGE_ROL = null;
  private readonly SESSION_STORAGE_USER_NAME = null;

  constructor(private http: HttpClient) { 
  }

  
  isAuth(username: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = { username, password };
  
    return this.http.post<User>(url, body).pipe(
      tap((resp: User) => {
        if (resp.token) {
          sessionStorage.setItem("SESSION_STORAGE_KEY",resp.token);
          sessionStorage.setItem("SESSION_STORAGE_ROL",resp.roles[0].name);
          sessionStorage.setItem("SESSION_STORAGE_USER_NAME",resp.username);
        }
      }),
      map(resp => !!resp.token),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  
  isAuthenticated(): boolean {
    
      const token = sessionStorage.getItem("SESSION_STORAGE_KEY");
      return !!token
     // Devuelve true si userData no es null ni undefined
  }
  sellerRegister(body:any){
    return this.http.post<any>(`${this.baseUrl}/auth/register-seller`,body).pipe(
      catchError((err) => {
        return throwError(err);
      }))
  }
}
