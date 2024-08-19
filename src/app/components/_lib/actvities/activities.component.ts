import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../../../models/activity';
import { APP_IMPORTS } from '../../../app.config';
import { ActivityService } from '../../../services/activity.service';
import { PaginatedResult } from '../../../models/_utils/paginated-result';
import { SCROLL_LIMIT } from '../../../app.const';
import { User } from '../../../models/user';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class ActivitiesComponent implements OnInit {
  @Input() activities: PaginatedResult<Activity> = {
    data: [],
    total: 0,
    page: 1,
    limit: SCROLL_LIMIT,
  };

  page = 1;
  limit = SCROLL_LIMIT;
  throttle = 300;
  scrollDistance = 1;
  isLoading = false;

  constructor(
    private _router: Router,
    private _activitySevice: ActivityService,
  ) {}

  ngOnInit(): void {
    this.page++;
  }

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
    this._activitySevice.get(this.page, this.limit).subscribe((res) => {
      this.activities.data.push(...res.data);
      this.page++;
      this.isLoading = false;
    });
  }
}
