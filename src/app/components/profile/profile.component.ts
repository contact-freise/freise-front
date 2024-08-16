import { Component, OnDestroy, OnInit } from '@angular/core';
import { appImports, toolbar } from '../../app.config';
import { Observable, of, switchMap, take } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivitiesComponent } from '../_lib/actvities/activities.component';
import { AuthService } from '../../services/auth.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [...appImports, ActivitiesComponent],
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: string;
  activities = [];
  isLoggedUser = false;

  user$: Observable<User>;
  activities$;

  editAbout = false;
  editor: Editor = new Editor();
  toolbar: Toolbar = toolbar;

  constructor(
    private _activityService: ActivityService,
    private _userService: UserService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.user = params['user'];
      this.isLoggedUser = this._authService.user._id === this.user;
      this._userService.getByUserId(this.user).pipe(
        take(1),
        switchMap(user => {
          if (!this.isLoggedUser) {
            this._activityService.log({
              action: {
                name: `visited user 👀`,
                activityType: 'visitUser',
              },
              mentionnedUser: user._id,
            });
          }
          return of(user);
        })
      ).subscribe(user => {
        this.user$ = of(user);
      });
      this.activities$ = this._activityService.getByUserId(this.user);
    });
  }

  onFileChange(event, imgUrl: 'avatarUrl' | 'backgroundUrl') {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this._userService.updateUserImgUrl(this.user, imgUrl, file).pipe(
        take(1),
      ).subscribe(user => {
        this.user$ = of(user);
        this._activityService.log({
          action: {
            name: `updated ${imgUrl.replaceAll('Url', '')} 📸`,
            activityType: 'updateImg',
          },
        });
      });
    };
  }

  private _updateUser(user: Partial<User>) {
    this._userService.updateUser(user).pipe(
      take(1),
    ).subscribe(user => {
      this.user$ = of(user);
      this._activityService.log({
        action: {
          name: `updated about me 🥁`,
          activityType: 'updateAbout',
        },
      });
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