import { Component, OnInit } from '@angular/core';
import { appImports } from './app.config';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivityService } from './services/activity.service';
import { Observable, take } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [...appImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this._authService.user = JSON.parse(localStorage.getItem('user'));
      this.user$ = this._userService.getByUserId(this.getUserId());
    }

    /*
    const eventSource = new EventSource('sse');
    eventSource.onmessage = ({ data }) => {
      const message = document.createElement('li');
      message.innerText = 'New message: ' + data;
      document.body.appendChild(message);
    }*/
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  getUserId() {
    return this._authService.user._id;
  }

  getUserAvatarUrl() {
    return this._authService.user.avatarUrl;
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
