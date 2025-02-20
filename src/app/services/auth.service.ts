import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: string;
  userId: string;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private _http: HttpClient) {}

  register(user): Observable<User> {
    return this._http.post<User>(`${environment.API_URL}/users`, user);
  }

  login(user): Observable<User> {
    return this._http.post<User>(`${environment.API_URL}/users/login`, user);
  }

  initUser(res) {
    localStorage.setItem('authToken', res.authToken);
    this.authToken = res.authToken;

    localStorage.setItem('userId', res.user._id);
    this.userId = res.user._id;

    localStorage.setItem('welcomed', 'true');

    this.user$.next(res.user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isSameUser(user: string | User): boolean {
    const userId = typeof user === 'string' ? user : user._id;
    return userId === this.getUserId();
  }

  getUser(): Observable<User> {
    const user = this.getUserId();
    if (!user) {
      return of(null);
    }
    return this._http
      .get<User>(`${environment.API_URL}/users/${user}`, this.getHttpOptions())
      .pipe(
        tap((user) => {
          this.user$.next(user);
        }),
      );
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('authToken'),
      }),
    };
  }
}
