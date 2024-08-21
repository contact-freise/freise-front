import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_IMPORTS } from '../../app.config';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class RegisterComponent {
  user = { username: '', password: '', email: '', gender: '', dob: '' };

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private _router: Router,
    private _toastr: ToastrService,
  ) {}

  onSubmit() {
    this._authService.register(this.user).subscribe(
      (res) => {
        this._authService.initUser(res);
        this._activityService.log({
          type: 'register',
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
