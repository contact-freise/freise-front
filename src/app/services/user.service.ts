import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private _http: HttpClient,
        private _authService: AuthService,
    ) { }

    getByUserId(user: string): Observable<User> {
        return this._http.get<User>(`${environment.API_URL}/user/${user}`, this._authService.getHttpOptions());
    }

    updateUserImgUrl(user: string, imgUrl: 'avatarUrl' | 'backgroundUrl', file: File): Observable<User> {
        const formData = new FormData();
        formData.append("file", file);
        return this._http.post<User>(`${environment.API_URL}/user/${user}/${imgUrl}/upload`, formData, this._authService.getHttpOptions());
    }
}