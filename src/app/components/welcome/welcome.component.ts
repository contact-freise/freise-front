import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { APP_IMPORTS } from '../../app.config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class WelcomeComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  goTo(route: string) {
    if(this.authService.isLoggedIn()) {
      route = '/home';
    }
    this.router.navigate([route]);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}
