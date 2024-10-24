import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) {}

  findByPost(post: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(
      `${environment.API_URL}/comments/post/${post}`,
      this._authService.getHttpOptions(),
    );
  }

  create(comment: Partial<Comment>): Observable<Comment> {
    return this._http.post<Comment>(
      `${environment.API_URL}/comments`,
      comment,
      this._authService.getHttpOptions(),
    );
  }
}
