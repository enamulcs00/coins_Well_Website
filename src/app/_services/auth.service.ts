import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userId: string | number = '';
	onLogin: Subject<any> = new Subject();
	onProfileUpdate: Subject<any> = new Subject();
	firebaseToken : string = '';
	constructor(private _http: HttpClient) { }

	login(formData: any) {
		return this._http.post<any>(`${environment.baseUrl}auth/login/`, formData)
			.pipe(map((data: any) => {
				// login successful if there's a jwt token in the response
				if (data) {
					if (data.is_profile_setup) {
						this.onLogin.next(data.data);
						localStorage.setItem(environment.storageKey, JSON.stringify(data.data));
					}
				}
				return data;
			}));
	}

	isLoggedIn() {
		return (localStorage.getItem(environment.storageKey) != null) ? true : false;
	}

	signup(formData) {
		return this._http.post<any>(`${environment.baseUrl}auth/sign-up/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	updatePhone(formData, id: string) {
		return this._http.put<any>(`${environment.baseUrl}user/update-phone-number/${id}/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	lostPhone(formData) {
		return this._http.post<any>(`${environment.baseUrl}user/lost-phone-number/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	forgotPassword(formData) {
		return this._http.post<any>(`${environment.baseUrl}user/forgot-password/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	verifyOtp(formData) {
		return this._http.post<any>(`${environment.baseUrl}user/verify-otp/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	setUpPassword(formData, id: string | number) {
		return this._http.post<any>(`${environment.baseUrl}auth/add-update-user-password/${id}/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	updateDetails(formData, id: string | number) {
		return this._http.put<any>(`${environment.baseUrl}user/update-user-details/${id}/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	validateEmail(formData: any, _id: string | number) {
		return this._http.post<any>(`${environment.baseUrl}user/validate-email/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	verifyDetailsPhone(formData) {
		return this._http.post<any>(`${environment.baseUrl}user/verify-details-phone-number/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	resendOTP(formData: any) {
		return this._http.post<any>(`${environment.baseUrl}user/resend-otp/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	resendEmailOtp(formData: any) {
		return this._http.post<any>(`${environment.baseUrl}user/resend-mail-otp/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

}
