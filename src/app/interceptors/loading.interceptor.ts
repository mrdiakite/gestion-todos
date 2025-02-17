import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { StateService } from '../services/state.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private stateService: StateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.stateService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => this.stateService.setLoading(false))
    );
  }
}