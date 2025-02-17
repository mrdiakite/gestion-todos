import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StateService } from '../services/state.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private stateService: StateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue';
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
        }
        this.stateService.setError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}