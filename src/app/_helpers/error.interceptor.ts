import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { environment } from 'src/environments/environment';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((data: any) => {
                if (data.body && data.body.code == 400) {
                    if (data.body.data != null && data.body.data != undefined) {
                        if (typeof data.body.data == 'object') {
                            Object.keys(data.body.data).forEach(key => {
                                if (typeof data.body.data[key] == 'object') {
                                    Object.keys(data.body.data[key]).forEach(key2 => {
                                        Notify.failure(data.body.data[key][key2]);
                                    })
                                }
                            })
                        }
                    } else {
                        Notify.failure(data.body.message);
                    }
                    return Observable.throw(data.body.message);
                } else {
                    return data.body;
                }
            }),
            catchError(err => {
                if(request.url.match(environment.baseUrl)) {
                    if (err.status === 401) {
                        Notify.failure("Not authorized");
                        localStorage.removeItem(environment.storageKey);
                        this.router.navigate(['/auth/login']);
                    } else {
                        var error = err.error.error_description || err.error.message || err.statusText || err.message;
                        Notify.failure(error);
                    }
                }
                var error = err.error.error_description || err.error.message || err.statusText || err.message;
                return throwError(error);
            }));
    }
}
