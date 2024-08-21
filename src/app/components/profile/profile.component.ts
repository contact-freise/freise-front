import { Component, OnDestroy, OnInit } from '@angular/core';
import { APP_IMPORTS } from '../../app.config';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { TOOLBAR } from '../../app.const';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string;
  activities = [];
  isLoggedUser = false;

  user$: Observable<User>;
  activities$;

  editAbout = false;
  editor: Editor = new Editor();
  toolbar: Toolbar = TOOLBAR;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _activityService: ActivityService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['user'];
      this.isLoggedUser = this._authService.getUserId() === this.userId;

      this._userService
        .getByUserId(this.userId)
        .pipe(
          take(1),
          switchMap((user) => {
            if (!this.isLoggedUser) {
              this._activityService.log({
                type: 'visitUser',
                mentionnedUser: user._id,
              });
            }
            return of(user);
          }),
        )
        .subscribe((user) => {
          this.user$ = of(user);
        });
      this.activities$ = this._activityService.getByUserId(this.userId);
    });
  }

  onFileChange(event, user: User, imgUrl: 'avatarUrl' | 'backgroundUrl') {
    const file = (event.target as HTMLInputElement).files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this._userService
        .updateUserImgUrl(user._id, imgUrl, file)
        .pipe(
          take(1),
          tap(() => {
            this._activityService.log({
              type:
                imgUrl === 'avatarUrl' ? 'updateAvatar' : 'updateBackground',
            });
          }),
          tap(() => {
            this.activities$ = this._activityService.getByUserId(this.userId);
          }),
        )
        .subscribe((user) => {
          this.user$ = of(user);
          this._authService.user$.next(user);
        });
    };
  }

  private _updateUser(user: Partial<User>) {
    this._userService
      .updateUser(user)
      .pipe(
        take(1),
        tap(() => {
          this._activityService.log({
            type: 'updateProfile',
          });
        }),
      )
      .subscribe((user) => {
        this._authService.user$.next(user);
      });
  }

  updateAbout(user: User) {
    const { _id, about } = user;
    if (!about) return;
    this._updateUser({ _id, about });
    this.editAbout = false;
  }

  onFollow() {
    //this._userService.follow(this.user).subscribe();
  }

  onUnfollow() {
    //this._userService.unfollow(this.user).subscribe();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
