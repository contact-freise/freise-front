import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appImports } from '../../app.config';
import { ActivityService } from '../../services/activity.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: appImports,
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '', remember: false };

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._authService
      .login(this.user)
      .subscribe(
        res => {
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._authService.authToken = res.token;
          this._authService.user = res.user;
          this._activityService.post({
            action: {
              name: 'logged in 🚀',
              activityType: 'login',
            }
          }).pipe(take(1)).subscribe();
          this.router.navigate(['/home']);
        },
        err => {
          console.error(err);
          this.toastr.error(err.message);
        }
      );
  }
}