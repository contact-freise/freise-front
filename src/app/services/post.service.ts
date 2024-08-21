import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {}

  createPost(post: Post, file: File): Observable<Post> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('post', JSON.stringify(post));
    return this._http.post<Post>(
      `${environment.API_URL}/posts`,
      formData,
      this._authService.getHttpOptions(),
    );
  }

  like(post: string): Observable<Like> {
    return this._http.post<Like>(
      `${environment.API_URL}/like/${post}`,
      {},
      this._authService.getHttpOptions(),
    );
  }

  unlike(post: string): Observable<Like> {
    return this._http.delete<Like>(
      `${environment.API_URL}/like/${post}`,
      this._authService.getHttpOptions(),
    );
  }

  dislike(post: string): Observable<Like> {
    return this._http.post<Like>(
      `${environment.API_URL}/dislike/${post}`,
      {},
      this._authService.getHttpOptions(),
    );
  }

  undislike(post: string): Observable<Like> {
    return this._http.delete<Like>(
      `${environment.API_URL}/dislike/${post}`,
      this._authService.getHttpOptions(),
    );
  }
}
