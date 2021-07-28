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

	validateEmail(formData: any, id: string | number) {
		return this._http.post<any>(`${environment.baseUrl}auth/validate-email/${id}/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}


	// forgot(formData) {
	// 	return this._http.post<any>(`${environment.baseUrl}admin/forgotPassword`, formData)
	// 		.pipe(map((data : any) => {	
	// 			return data;
	// 		}));
	// }

	// getProfileInfo() {
	// 	return this._http.get<any>(`${environment.baseUrl}admin/profile`)
	// 		.pipe(map((data : any) => {	
	// 			return data;
	// 		}));
	// }

	// updateProfile(formData) {
	// 	return this._http.put<any>(`${environment.baseUrl}admin/profile`, formData)
	// 		.pipe(map((data : any) => {	
	// 			if(data) {
	// 				this.onProfileUpdate.next(data.data);
	// 			}
	// 			return data;
	// 		}));
	// }

	// changePassword(formData) {
	// 	return this._http.put<any>(`${environment.baseUrl}admin/changePassword`, formData)
	// 		.pipe(map((data : any) => {	
	// 			if(data) {
	// 				this.onProfileUpdate.next(data.data);
	// 			}
	// 			return data;
	// 		}));
	// }

	// resetPassword(formData, token) {
	// 	return this._http.post<any>(`${environment.baseUrl}admin/resetPassword/${token}`, formData)
	// 		.pipe(map((data : any) => {	
	// 			if(data) {
	// 				this.onProfileUpdate.next(data.data);
	// 			}
	// 			return data;
	// 		}));
	// }
}
