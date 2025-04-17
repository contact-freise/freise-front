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
import { ActivitiesComponent } from '../_lib/actvities/activities.component';
import { MediaType } from '../../models/_utils/media-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ...APP_IMPORTS || [],
    ActivitiesComponent,
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  user$: Observable<User>;

  editor: Editor = new Editor();
  toolbar: Toolbar = TOOLBAR;

  post: Post = new Post();
  mediaType: MediaType;
  mediaPreview: string | ArrayBuffer | null = null;
  file: File;

  activities$: Observable<PaginatedResult<Activity>>;

  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _postService: PostService,
    private _router: Router,
  ) { }

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
        this.mediaPreview = null;
        this.mediaType = null;
      });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
      this.mediaPreview = null;
      return;
    }
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/') && !file.type.startsWith('audio/')) {
      alert('Please select an image or video file');
      return;
    }
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert('File size exceeds 2GB');
      return;
    }

    // if it an image, show the preview
    if (file.type.startsWith('image/')) {
      this.mediaType = 'image';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.mediaPreview = reader.result;
        this.file = file;
      };
    }

    // if it a video, show the preview
    if (file.type.startsWith('video/')) {
      this.mediaType = 'video';
      const videoUrl = URL.createObjectURL(file);
      this.mediaPreview = videoUrl;
      this.file = file;
    }

    // if it an audio, show the preview
    if (file.type.startsWith('audio/')) {
      this.mediaType = 'audio';
      const audioUrl = URL.createObjectURL(file);
      this.mediaPreview = audioUrl;
      this.file = file;
    }

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
