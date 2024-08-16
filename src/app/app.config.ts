import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { NgxEditorModule, Toolbar } from 'ngx-editor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { DateAgoPipe } from './components/_pipes/date-ago.pipe';
import { SafeHtmlPipe } from './components/_pipes/safe-html.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';

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
    }),
    provideMarkdown(),
  ]
};

const MATERIAL_MODULES = [
  MatButtonModule,
  /*MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatExpansionModule,
  MatTabsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatBadgeModule,
  MatStepperModule,
  MatProgressBarModule,
  MatRippleModule,
  MatBottomSheetModule,
  MatDividerModule,
  MatGridListModule,
  MatTreeModule,
  MatProgressSpinnerModule*/
];

const PIPES = [
  DateAgoPipe,
  SafeHtmlPipe,
];

const PLUGINS = [
  ToastrModule,
  TranslocoModule,
  NgxEditorModule,
  MarkdownModule,
];

export const appImports = [
  CommonModule,
  CommonModule,
  FormsModule,
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ...MATERIAL_MODULES,
  ...PIPES,
  ...PLUGINS,
];

export const toolbar: Toolbar = [
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
];