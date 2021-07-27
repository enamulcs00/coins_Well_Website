import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../../src/environments/environment';
import { Notify, Report, Confirm, Loading, Block } from "notiflix";
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        let userInfo = localStorage.getItem(environment.storageKey);
        if((userInfo != null)) {
            return true;
        } else {
            this.router.navigate(['/landingpage']);
            Notify.info('Please login to continue.');
        }
    }
}
