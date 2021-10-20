import { Observable, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private restService : RestService,
  ) {}
    

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
     const token =  localStorage.getItem('token');  
     if (token){
         request = request.clone({
              setHeaders:{
                  Authorization: `token ${token}`
              }
          });
     }
      if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
      return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Resumen petición: ', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.restService.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
        return throwError(error);
      }));

  }
}
