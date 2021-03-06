import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { urls } from './urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	cmsData: any;
	updateNotification : BehaviorSubject<any> = new BehaviorSubject("");
	constructor(private _http: HttpClient, private _auth : AuthService) { }

	post(url: string, postData: any = {}) {
		return this._http.post<any>(`${environment.baseUrl}${url}`, postData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	postWithHeaders(url: string, postData: any = {}, headers) {
		return this._http.post<any>(`${environment.baseUrl}${url}`, postData,{
			headers : headers
		})
			.pipe(map((data: any) => {
				return data;
			}));
	}

	get(url: string) {
		return this._http.get<any>(`${environment.baseUrl}${url}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	put(url: string, putData: any = {}) {
		return this._http.put<any>(`${environment.baseUrl}${url}`, putData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	delete(url: string) {
		return this._http.delete<any>(`${environment.baseUrl}${url}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	deleteById(url: string, id: string) {
		return this._http.delete<any>(`${environment.baseUrl}${url}${id}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	getWithQuery(url: string, queryData: any = {}) {
		return this._http.get<any>(`${environment.baseUrl}${urls[url]}${this.obj_to_query(queryData)}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	obj_to_query(obj) {
		var parts = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
			}
		}
		return "?" + parts.join('&');
	}


	getById(url: string, id: string) {
		return this._http.get<any>(`${environment.baseUrl}${urls[url]}/${id}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	putById(url: string, id: string, formData: any = {}) {
		return this._http.put<any>(`${environment.baseUrl}${urls[url]}/${id}`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	
	uploadMedia(formData) {
		return this._http.post<any>(`${environment.baseUrl}upload/media/`, formData)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	getCMS(url: string) {
		return new Observable(resolve => {
			if (this.cmsData) {
				resolve.next(this.cmsData);
				resolve.complete();
			} else {
				this._http.get<any>(`${environment.baseUrl}${url}`)
					.pipe(map((data: any) => {
						return data;
					})).subscribe((data: any) => {
						this.cmsData = data.data;
						resolve.next(data.data);
						resolve.complete();
					});
			}
		})
	}

	callBitGoAPI(url: string) {
		return this._http.get<any>(`${environment.bitGoUrl}/${url}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

	getCurrencyConversion() {
		return this._http.get('https://free.currconv.com/api/v7/convert?q=USD_NGN&compact=ultra&apiKey=674b25743414f62f261c')
			.pipe(map((data: any) => {
				return data;
			}));
	}

	updateProfileInfo() {
		if (localStorage.getItem(environment.storageKey) != null) {
			let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
			this.get(urls.getProfileDetails).subscribe(data => {
				userInfo = {
					...userInfo,
					...data.data
				};
				localStorage.setItem(environment.storageKey, JSON.stringify(userInfo));
				this._auth.onProfileUpdate.next(data);
			})
		}
	}

}
