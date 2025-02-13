import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LocalStorageService} from './auth/local-storage.service';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
    {
      provide:'API_BASE_URL',
      useValue:'http://localhost:3000'
    }, provideNzI18n(fr_FR), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
    {
      provide:'LOCAL_STORAGE',
      useClass:LocalStorageService
    }
  ]
};
