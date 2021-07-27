import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../src/environments/environment';
import { NotificationsService } from '../_services/notifications.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _noti : NotificationsService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userInfo = localStorage.getItem(environment.storageKey);
        if((userInfo != null)) {
            return true;
        } else {
            this.router.navigate(['/login']);
            this._noti.show("error", "Please login to continue.", "Login")
        }
    }
}
