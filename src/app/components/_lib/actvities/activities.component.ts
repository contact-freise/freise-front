import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    userClick(activity: Activity) {
        this.router.navigateByUrl(`/users/${activity.user._id}`);
    }

}