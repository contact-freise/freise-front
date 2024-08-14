import { Component, OnInit } from '@angular/core';
import { appImports } from '../../app.config';
import { finalize, Observable, of, take, tap } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivitiesComponent } from '../_lib/actvities/activities.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [...appImports, ActivitiesComponent],
})
export class ProfileComponent implements OnInit {

  user: string;
  activities = [];
  isLoggedUser = false;
  isLoading = false;

  user$: Observable<User>;
  activities$;

  constructor(
    private _activityService: ActivityService,
    private _userService: UserService,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.user = params['user'];
      this.isLoggedUser = this._authService.user._id === this.user;
      this.user$ = this._userService.getByUserId(this.user)
      this.activities$ = this._activityService.getByUserId(this.user).pipe(
        finalize(() => this.isLoading = false)
      );
    });
  }

  onFileChange(event, imgUrl: 'avatarUrl' | 'backgroundUrl') {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user$ = this._userService.updateUserImgUrl(this.user, imgUrl, file);
      this._activityService.post({
        action: {
          name: `updated ${imgUrl.replaceAll('Url', '')} 📸`,
          activityType: 'updateImg',
        },
      }).pipe(take(1)).subscribe()
    };
  }

  onFollow() {
    //this._userService.follow(this.user).subscribe();
  }

  onUnfollow() {
    //this._userService.unfollow(this.user).subscribe();
  }
}