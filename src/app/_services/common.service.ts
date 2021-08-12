import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { urls } from './urls';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	cmsData: any;
	constructor(private _http: HttpClient) { }

	post(url: string, postData: any = {}) {
		return this._http.post<any>(`${environment.baseUrl}${url}`, postData)
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

	//Custom  data for models binding start here
	fetchUsers() {
		return this._http.get<any>(`${environment.baseUrl}${urls.users}`)
			.pipe(map((data: any) => {
				return data.map((user: User) => new User().deserialize(user));
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
			} else {
				this._http.get<any>(`${environment.baseUrl}${url}`)
					.pipe(map((data: any) => {
						return data;
					})).subscribe((data: any) => {
						this.cmsData = data.data;
						resolve.next(data.data);
					});	
			}
		})
	}

	callBitGoAPI(url : string) {
		return this._http.get<any>(`${environment.bitGoUrl}/${url}`)
			.pipe(map((data: any) => {
				return data;
			}));
	}

}
