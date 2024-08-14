import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ActivityService } from '../../../services/activity.service';
import { Activity } from '../../../models/activity';
import { appImports } from '../../../app.config';

@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    standalone: true,
    imports: appImports,
})
export class ActivitiesComponent implements OnInit {

    @Input() activities$

    constructor(
        private _activityService: ActivityService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    userClick(activity: Activity) {
        this._activityService.post({
            action: {
                name: `visited user <a href='user/${activity.user._id}'>${activity.user.username}</a> 👀`,
                activityType: 'visitUser',
            },
        }).pipe(take(1)).subscribe();
        this.router.navigateByUrl(`/user/${activity.user._id}`);
    }

}