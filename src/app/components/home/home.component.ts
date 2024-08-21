import { Component, OnDestroy, OnInit } from '@angular/core';
import { APP_IMPORTS } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { ActivityService } from '../../services/activity.service';
import { Editor, Toolbar } from 'ngx-editor';
import { finalize, Observable, take, tap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { PaginatedResult } from '../../models/_utils/paginated-result';
import { Activity } from '../../models/activity';
import { TOOLBAR } from '../../app.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class HomeComponent implements OnInit, OnDestroy {
  user$: Observable<User>;

  editor: Editor = new Editor();
  toolbar: Toolbar = TOOLBAR;

  post: Post = new Post();
  imagePreview: string | ArrayBuffer | null = null;
  file: File;

  activities$: Observable<PaginatedResult<Activity>>;

  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _postService: PostService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.user$ = this._authService.getUser();
    this.activities$ = this._activityService.get();
  }

  userClick(user: User) {
    this._router.navigateByUrl(`/users/${user._id}`);
  }

  createPost(user: User, post: Post) {
    this.isLoading = true;
    this._postService
      .createPost(
        {
          ...post,
          author: user._id,
        },
        this.file,
      )
      .pipe(
        take(1),
        tap((post: Post) => {
          this._activityService.log({
            type: 'createPost',
            post: post._id,
          });
        }),
        tap(() => {
          this.activities$ = this._activityService.get();
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(() => {
        this.post = new Post();
        this.file = null;
        this.imagePreview = null;
      });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.file = file;
      };
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
