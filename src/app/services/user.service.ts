import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { API_URL } from '../app.config';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
        private _authService: AuthService,
    ) { }

    getByUserId(userId: string): Observable<User> {
        return this.http.get<User>(`${API_URL}user/${userId}`, this._authService.getHttpOptions());
    }
}