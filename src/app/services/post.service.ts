import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private _http: HttpClient,
        private _authService: AuthService,
    ) { }

    createPost(post: Post): Observable<Post> {
        return this._http.post<Post>(`${environment.API_URL}/posts`, post, this._authService.getHttpOptions());
    }

    like(post: string): Observable<Post> {
        return this._http.post<Post>(`${environment.API_URL}/like/${post}`, {}, this._authService.getHttpOptions());
    }

    unlike(post: string): Observable<Post> {
        return this._http.delete<Post>(`${environment.API_URL}/unlike/${post}`, this._authService.getHttpOptions());
    }

    dislike(post: string): Observable<Post> {
        return this._http.post<Post>(`${environment.API_URL}/dislike/${post}`, {}, this._authService.getHttpOptions());
    }

    undislike(post: string): Observable<Post> {
        return this._http.delete<Post>(`${environment.API_URL}/undislike/${post}`, this._authService.getHttpOptions());
    }
}