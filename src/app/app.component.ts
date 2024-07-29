import { Component, OnInit } from '@angular/core';
import { appImports } from './app.config';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivityService } from './services/activity.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...appImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this._authService.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  getUserId() {
    return this._authService.user._id;
  }

  logout() {
    this._activityService.post({
      action: {
        name: 'logged out 👋',
        activityType: 'logout',
      }
    }).pipe(take(1)).subscribe(
      res => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.router.navigate(['/logout']);
      }
    );
  }
}
