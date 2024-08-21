import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Activity } from '../models/activity';
import { PaginatedResult } from '../models/_utils/paginated-result';
import { SCROLL_LIMIT } from '../app.const';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {
    // Log the user's navigation activity
    /*this.router.events.subscribe(event => {
            if (this._authService.isLoggedIn() &&
                event instanceof NavigationEnd &&
                event.url !== '/login' && event.url !== '/register') {
                
                this.post({
                    type: 'navigation'
                }).pipe(take(1)).subscribe();
            }
        })*/
  }

  get(page = 1, limit = SCROLL_LIMIT): Observable<PaginatedResult<Activity>> {
    return this._http.get<PaginatedResult<Activity>>(
      `${environment.API_URL}/activity?page=${page}&limit=${limit}`,
      this._authService.getHttpOptions(),
    );
  }

  getByUserId(
    user: string,
    page = 1,
    limit = SCROLL_LIMIT,
  ): Observable<PaginatedResult<Activity>> {
    return this._http.get<PaginatedResult<Activity>>(
      `${environment.API_URL}/activity/${user}?page=${page}&limit=${limit}`,
      this._authService.getHttpOptions(),
    );
  }

  post(payload): Observable<Activity> {
    return this._http.post<Activity>(
      `${environment.API_URL}/activity`,
      payload,
      this._authService.getHttpOptions(),
    );
  }

  log(action): void {
    this.post(action).pipe(take(1)).subscribe();
  }
}
