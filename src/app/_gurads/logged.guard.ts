import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../../src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        let userInfo = localStorage.getItem(environment.storageKey);
        if ((userInfo == null)) {
            return true;
        } else {
            this.router.navigate(['/dashboard']);
            // Notify.info('Please login to continue.');
        }
    }
}
