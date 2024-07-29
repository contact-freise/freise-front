import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { API_URL } from '../app.config';
import { AuthService } from './auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(
        private http: HttpClient,
        private _authService: AuthService,
        private router: Router,
    ) {
        this.router.events.subscribe(event => {
            if (this._authService.isLoggedIn() && event instanceof NavigationEnd) {
                this.post({
                    action: {
                        name: `accessed ` + event.url + ` 🤫`,
                        activityType: 'navigation',
                    },
                }).pipe(take(1)).subscribe();
            }
        })
    }

    get(): Observable<any> {
        return this.http.get(`${API_URL}activity`, this._authService.getHttpOptions());
    }

    getByUserId(userId: string): Observable<any> {
        return this.http.get(`${API_URL}activity/${userId}`, this._authService.getHttpOptions());
    }

    post(payload): Observable<any> {
        return this.http.post(`${API_URL}activity`, payload, this._authService.getHttpOptions());
    }
}