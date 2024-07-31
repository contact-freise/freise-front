import { Component, OnInit } from '@angular/core';
import { appImports } from '../../app.config';
import { finalize, Observable, of, take } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivitiesComponent } from '../_lib/activities.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [...appImports, ActivitiesComponent],
})
export class ProfileComponent implements OnInit {

  userId: string;
  avatarUrl$: Observable<{ downloadUrl: string }> = of({ downloadUrl: 'freise.png' });
  activities = [];
  isLoading = false;

  user$: Observable<User>;
  activities$;

  constructor(
    private _activityService: ActivityService,
    private _userService: UserService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.user$ = this._userService.getByUserId(this.userId);
      this.activities$ = this._activityService.getByUserId(this.userId).pipe(
        finalize(() => this.isLoading = false)
      );
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatarUrl$ = this._userService.updateAvatar(this.userId, file);
    };
  }

  onFollow() {
    //this._userService.follow(this.userId).subscribe();
  }

  onUnfollow() {
    //this._userService.unfollow(this.userId).subscribe();
  }
}