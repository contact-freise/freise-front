import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appImports } from '../../app.config';
import { take } from 'rxjs';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: appImports,
})
export class RegisterComponent implements OnInit {
  user = { username: '', password: '', email: '', gender: '', dob: '' };

  constructor(
    private _authService: AuthService,
    private _activityService: ActivityService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._authService.register(this.user).subscribe(
      res => {
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._authService.authToken = res.token;
        this._authService.user = res.user;
        this._activityService.post({
          action: {
            name: 'joined Freise 🍓',
            activityType: 'register',
          }
        }).pipe(take(1)).subscribe();
        this.router.navigate(['/home']);
      },
      err => {
        console.error(err);
        this.toastr.error(err.error.message);
      }
    );
  }
}