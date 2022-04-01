import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    const url = environment.baseUrl + req.url;
    headers = headers.set('Content-Type', 'application/json');
    const clonedReq = req.clone({ headers: headers, url: url });

    // send cloned request with header to the next handler by checking server errors.
    return next.handle(clonedReq).pipe(tap(
      (event: HttpEvent<any>) => {
      }, (err) => {
        if (err instanceof HttpErrorResponse) {          
          const message = err.error.message || 'Opps something went wrong, please try again after some time';
          console.log('Error message =>', message);
          
        }
      }
    ))
  }
}
