import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoadingInterceptor} from "./loading.interceptor";
import {ErrorInterceptor} from "./error.interceptor";
import {Provider} from "@angular/core";

export const httpInterceptorProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]