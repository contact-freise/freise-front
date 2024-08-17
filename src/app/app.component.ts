import { Component, OnInit } from '@angular/core';
import { appImports } from './app.config';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivityService } from './services/activity.service';
import { Observable, of, take } from 'rxjs';
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
    private _router: Router,
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    const userId = this.getUserId();
    if (!userId) {
      return;
    }
    this._userService.getByUserId(userId).subscribe(user => {
      this._authService.user$ = of(user);
      this.user$ = this._authService.user$;
    })

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
    return localStorage.getItem('userId');
  }

  logout() {
    this._activityService.post({
      action: {
        name: 'logged out 👋',
        activityType: 'logout',
      }
    }).pipe(take(1)).subscribe(
      () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        this._router.navigate(['/logout']);
      }
    );
  }
}
