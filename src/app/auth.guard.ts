import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(): boolean {
    const isLoggedIn = this._authService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class WelcomeGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(): boolean {
    const isLoggedIn = this._authService.isLoggedIn();
    if (isLoggedIn) {
      this._router.navigate(['/home']);
    }
    return true;
  }
}
