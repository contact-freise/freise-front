import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { NgxEditorModule } from 'ngx-editor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MentionModule } from 'angular-mentions';
import { TranslocoHttpLoader } from './transloco-loader';
import { DateAgoPipe } from './components/_pipes/date-ago.pipe';
import { SafeHtmlPipe } from './components/_pipes/safe-html.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
/*
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
*/


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
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
          useFallbackTranslation: true,
        },
      },
      loader: TranslocoHttpLoader,
    }),
    provideMarkdown(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
};

export const MATERIAL_MODULES = [
  MatButtonModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTooltipModule,
  MatTabsModule,
  MatDividerModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  /*
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatToolbarModule,
MatListModule,
MatMenuModule,
MatSidenavModule,
MatExpansionModule,
MatSelectModule,
MatCheckboxModule,
MatRadioModule,
MatDatepickerModule,
MatNativeDateModule,
MatSlideToggleModule,
MatSliderModule,
MatAutocompleteModule,
MatChipsModule,
MatPaginatorModule,
MatSortModule,
MatTableModule,
MatBadgeModule,
MatStepperModule,
MatProgressBarModule,
MatRippleModule,
MatBottomSheetModule,
MatGridListModule,
MatTreeModule,
MatProgressSpinnerModule
*/
];

const APP_PIPES = [DateAgoPipe, SafeHtmlPipe];

const PLUGINS = [
  ToastrModule,
  TranslocoModule,
  NgxEditorModule,
  MarkdownModule,
  InfiniteScrollDirective,
  MentionModule,
];


export const APP_IMPORTS = [
  CommonModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ...APP_PIPES,
  ...MATERIAL_MODULES,
  ...PLUGINS,
];
