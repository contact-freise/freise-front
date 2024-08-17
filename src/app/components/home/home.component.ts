import { Component, OnDestroy, OnInit } from '@angular/core';
import { appImports, toolbar } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { ActivityService } from '../../services/activity.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Observable, take } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: appImports,
})
export class HomeComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  activities$;

  editor: Editor = new Editor();
  toolbar: Toolbar = toolbar;

  post: Post = new Post();

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
    this._postService
      .createPost({
        ...post,
        author: user._id,
      })
      .pipe(take(1))
      .subscribe((post) => {
        this._activityService.log({
          action: {
            name: `created a new post 📝 :`,
            activityType: 'createPost',
          },
          post: post._id,
        });
        this.post = new Post();
      });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
