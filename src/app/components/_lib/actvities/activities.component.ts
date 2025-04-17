import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../../../models/activity';
import { APP_IMPORTS } from '../../../app.config';
import { ActivityService } from '../../../services/activity.service';
import { PaginatedResult } from '../../../models/_utils/paginated-result';
import { SCROLL_LIMIT } from '../../../app.const';
import { User } from '../../../models/user';
import { finalize } from 'rxjs';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  imports: [ 
    ...APP_IMPORTS || [],
    PostComponent,
  ]
})
export class ActivitiesComponent {
  @Input() activities: PaginatedResult<Activity> = {
    data: [],
    total: 0,
    page: 1,
    limit: SCROLL_LIMIT,
  };

  limit = SCROLL_LIMIT;
  throttle = 300;
  scrollDistance = 1;
  isLoading = false;

  constructor(
    private _router: Router,
    private _activitySevice: ActivityService,
  ) {}

  userClick(user: User) {
    this._router.navigateByUrl(`/users/${user._id}`);
  }

  onScroll() {
    if (this.isLoading) return;
    if (
      this.activities.data.length >= this.activities.total &&
      this.activities.total !== 0
    )
      return;

    this.isLoading = true;
    this._activitySevice
      .get(this.activities.page + 1, this.limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((res) => {
        this.activities.data.push(...res.data);
        this.activities.page++;
      });
  }
}
