import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../../../models/activity';
import { appImports } from '../../../app.config';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    standalone: true,
    imports: appImports,
})
export class ActivitiesComponent {

    @Input() activities$

    constructor(
        private _router: Router,
    ) { }

    userClick(activity: Activity) {
        this._router.navigateByUrl(`/users/${activity.user._id}`);
    }
}