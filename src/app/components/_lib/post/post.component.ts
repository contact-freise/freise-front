import { Component, Input, OnInit } from '@angular/core';
import { APP_IMPORTS } from '../../../app.config';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { take, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import * as _ from 'lodash';
import { ActivityService } from '../../../services/activity.service';
import { CommentsComponent } from '../comments/comments.component';
import { MediaType } from '../../../models/_utils/media-type';
import { MatDialog } from '@angular/material/dialog';
import { MediaPreviewComponent } from '../media-preview/media-preview.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  imports: [
    ...APP_IMPORTS || [],
    CommentsComponent,
    MediaPreviewComponent,
  ],
})
export class PostComponent implements OnInit {
  likesCount: number;
  dislikesCount: number;

  alreadyLiked = false;
  alreadyDisliked = false;

  commentsCount: number = 0;
  seeComments = false;

  mediaType: MediaType;

  @Input() post: Post = new Post();
  @Input() activityType: string;
  @Input() isGalleryView: boolean = false;

  constructor(
    private _postService: PostService,
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.likesCount = this.post.likesCount;
    this.dislikesCount = this.post.dislikesCount;

    this._authService.user$.subscribe((user) => {
      this.alreadyLiked =
        _.intersection(this.post.likes, user.likes).length > 0;
      this.alreadyDisliked =
        _.intersection(this.post.dislikes, user.dislikes).length > 0;
    });

    this._getMediaType();
  }

  private _getMediaType() {
    let mediaExtension = this.post.mediaUrl?.split('.').pop();
    if (!mediaExtension) {
      return;
    }
    mediaExtension = mediaExtension.toLowerCase().replace('?alt=media', '');
    if (mediaExtension === 'mp4' || mediaExtension === 'webm') {
      this.mediaType = 'video';
    }
    if (mediaExtension === 'mp3' || mediaExtension === 'wav') {
      this.mediaType = 'audio';
    }
    if (mediaExtension === 'jpg' || mediaExtension === 'png' || mediaExtension === 'jpeg' || mediaExtension === 'gif') {
      this.mediaType = 'image';
    }
  }

  openMediaPreview(mediaUrl: string, mediaType: string): void {
    this._dialog.open(MediaPreviewComponent, {
      data: { mediaUrl, mediaType },
      panelClass: 'fullscreen-dialog',
    });
  }

  likeDislikeChanged(event) {
    if (event.value === 'like') {
      this.like(this.post);
      if (this.alreadyDisliked) {
        this.undislike(this.post);
      }
    }
    if (event.value === 'dislike') {
      this.dislike(this.post);
      if (this.alreadyLiked) {
        this.unlike(this.post);
      }
    }
  }

  like(post: Post) {
    this._postService
      .like(post._id)
      .pipe(
        take(1),
        tap(() => {
          this._activityService.log({
            type: 'likePost',
            mentionnedUser: post.author,
            post: post._id,
          });
        }),
      )
      .subscribe(() => {
        this.likesCount++;
        this.alreadyLiked = true;
      });
  }

  unlike(post: Post) {
    this._postService
      .unlike(post._id)
      .pipe(take(1))
      .subscribe(() => {
        this.likesCount--;
        this.alreadyLiked = false;
      });
  }

  dislike(post: Post) {
    this._postService
      .dislike(post._id)
      .pipe(
        take(1),
        tap(() => {
          this._activityService.log({
            type: 'dislikePost',
            mentionnedUser: post.author,
            post: post._id,
          });
        }),
      )
      .subscribe(() => {
        this.dislikesCount++;
        this.alreadyDisliked = true;
      });
  }

  undislike(post: Post) {
    this._postService
      .undislike(post._id)
      .pipe(take(1))
      .subscribe(() => {
        this.dislikesCount--;
        this.alreadyDisliked = false;
      });
  }

  comment(post: Post) {
    console.log('comment', post);
  }
}
