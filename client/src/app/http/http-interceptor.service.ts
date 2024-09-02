import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{
  
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService: AuthenticationService = inject(AuthenticationService);
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${authService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(clonedRequest).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status === 401)
                authService.logout();
        }
      })
    );

  }
}
