import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loader: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loader.show(undefined, {
      type: 'square-loader',
      size: 'medium',
      bdColor: 'rgba(222,236,255,0.8)',
      color: '#588fbb',
    });
    return next.handle(request).pipe(
      delay(200),
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}
