import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem(environment.storageKey));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    auth: `${currentUser.token}`,
                }
            });
        }
        return next.handle(request)
    }
}
