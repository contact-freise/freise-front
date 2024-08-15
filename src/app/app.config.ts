import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { DateAgoPipe } from './components/_pipes/date-ago.pipe';
import { SafeHtmlPipe } from './components/_pipes/safe-html.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([]),
    ),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        missingHandler: {
          useFallbackTranslation: true
        }
      },
      loader: TranslocoHttpLoader
    })
  ]
};

export const appImports = [
  CommonModule,
  CommonModule,
  FormsModule,
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ToastrModule,
  TranslocoModule,

  DateAgoPipe,
  SafeHtmlPipe,
];
