import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("request",request);
        let currentUser = JSON.parse(localStorage.getItem(environment.storageKey));
        if (currentUser && currentUser.token) {
            //For our request to server
            let requestTemp = {
                // 'device-type' : 'WEB',
            };
            if(request.url.match(environment.baseUrl)) {
                requestTemp['Authorization'] = `Bearer ${currentUser.token}`;
            }
            if(!request.url.match('/admin/get-website-maintenance-status/')) {
                request = request.clone({
                    setHeaders: requestTemp
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
