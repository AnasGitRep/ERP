import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServicesService } from '../services/AuthServices.service';
import { NotificationServiceService } from '../services/NotificationService.service';
 // Notification service to display messages

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServicesService, private notificationService: NotificationServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Method to get the token from your AuthService
debugger
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403||error.status===0) {
          this.notificationService.showError('Unauthorized or Forbidden access'); // Display error message
          // Handle unauthorized/forbidden errors (e.g., redirect to login page or show message)
          // Example: this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}

