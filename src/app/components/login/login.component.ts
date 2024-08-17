import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appImports } from '../../app.config';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: appImports,
})
export class LoginComponent {
  user = { username: '', password: '', remember: false };

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _router: Router,
    private _toastr: ToastrService,
  ) {}

  onSubmit() {
    this._authService.login(this.user).subscribe(
      (res) => {
        this._authService.initUser(res);

        this._activityService.log({
          action: {
            name: 'logged in 🚀',
            activityType: 'login',
          },
        });
        this._router.navigate(['/home']);
      },
      (err) => {
        console.error(err);
        this._toastr.error(err.error.message);
      },
    );
  }
}
