import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem(environment.storageKey));
        if (currentUser && currentUser.token) {
            //For our request to server
            if(request.url.match(environment.baseUrl)) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`,
                    }
                });
            }
            
            //For bitgo APIs request
            if(request.url.match(environment.bitGoUrl)) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${environment.zenDeskSec}`,
                    }
                });
            }
        }
        return next.handle(request)
    }
}
