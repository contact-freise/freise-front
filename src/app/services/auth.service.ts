import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string;
  set authToken(token: string) {
    this._token = token;
  }
  get authToken() {
    return this._token;
  }

  _user: any;
  set user(user: any) {
    this._user = user;
  }
  get user() {
    return this._user;
  }

  constructor(private http: HttpClient, private router: Router) { }

  register(user): Observable<any> {
    return this.http.post<any>(`${API_URL}user`, user);
  }

  login(user): Observable<any> {
    return this.http.post<any>(`${API_URL}user/login`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('auth_token'),
      }),
    }
  }
}