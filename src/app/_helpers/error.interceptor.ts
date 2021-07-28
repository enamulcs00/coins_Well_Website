import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((data: any) => {
                if (data.body && data.body.code == 400) {
                    Notify.failure(data.body.message);
                    return Observable.throw(data.body.message);
                } else {
                    return data.body;
                }
            }),
            catchError(err => {
                if (err.status === 401) {
                    Notify.failure("Not authorized");
                    localStorage.clear();
                    this.router.navigate(['/login']);
                } else {
                    Notify.failure(err.error.error);
                }
                const error = err.error.error_description || err.error.message || err.statusText;
                return throwError(error);
            }));
    }
}
