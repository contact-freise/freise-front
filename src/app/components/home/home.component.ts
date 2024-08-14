import { Component, OnInit } from '@angular/core';
import { appImports } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { ActivityService } from '../../services/activity.service';
import { finalize } from 'rxjs';
import { ActivitiesComponent } from '../_lib/actvities/activities.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [...appImports, ActivitiesComponent],
})
export class HomeComponent implements OnInit {

  user: any;
  activities$;
  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,

  ) { }

  ngOnInit(): void {
    this.user = this._authService.user;

    this.isLoading = true;
    this.activities$ = this._activityService.get().pipe(
      finalize(() => this.isLoading = false)
    );
  }

}