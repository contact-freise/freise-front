import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(
        private http: HttpClient,
        private _authService: AuthService,
    ) {

        // Log the user's navigation activity
        /*this.router.events.subscribe(event => {
            if (this._authService.isLoggedIn() &&
                event instanceof NavigationEnd &&
                event.url !== '/login' && event.url !== '/register') {
                
                this.post({
                    action: {
                        name: `accessed ` + event.url + ` 🤫`,
                        activityType: 'navigation',
                    },
                }).pipe(take(1)).subscribe();
            }
        })*/
    }

    get(): Observable<any> {
        return this.http.get(`${environment.API_URL}/activity`, this._authService.getHttpOptions());
    }

    getByUserId(user: string): Observable<any> {
        return this.http.get(`${environment.API_URL}/activity/${user}`, this._authService.getHttpOptions());
    }

    post(payload): Observable<any> {
        return this.http.post(`${environment.API_URL}/activity`, payload, this._authService.getHttpOptions());
    }

    log(action): void {
        this.post(action).pipe(take(1)).subscribe();
    }
}