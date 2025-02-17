import { ApplicationConfig ,provideZoneChangeDetection} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { httpInterceptorProviders } from './interceptors/provider.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    httpInterceptorProviders
  ],
};