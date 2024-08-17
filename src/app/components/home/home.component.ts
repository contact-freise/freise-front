import { Component, OnDestroy, OnInit } from '@angular/core';
import { appImports, toolbar } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { ActivityService } from '../../services/activity.service';
import { ActivitiesComponent } from '../_lib/actvities/activities.component';
import { Editor, Toolbar } from 'ngx-editor';
import { take } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [...appImports, ActivitiesComponent],
})
export class HomeComponent implements OnInit, OnDestroy {

  user: any;
  activities$;

  editor: Editor = new Editor();
  toolbar: Toolbar = toolbar;

  post: Post = new Post();

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _postService: PostService,

  ) { }

  ngOnInit(): void {
    this.user = this._authService.user;
    this.activities$ = this._activityService.get();
  }

  createPost(post: Post) {
    this._postService.createPost({
      ...post,
      author: this.user._id,
    }).pipe(
      take(1),
    ).subscribe(post => {
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