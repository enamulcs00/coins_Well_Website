import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block, Confirm, Loading, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	userInfo: any = JSON.parse(localStorage.getItem(environment.storageKey));
	baseUrl: string = environment.homeURL;
	constructor(public _auth: AuthService, private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this._auth.onLogin.subscribe(x => {
			this.userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		})

		this._auth.onProfileUpdate.subscribe(x => {
			this.userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		})
	}

	deactivateAccount() {
		Confirm.show('Deactivate Account', 'Do you want to deactivate your account ?', 'Yes', 'No', () => {
			this._common.put(urls.deactivateAccount, {}).subscribe(res => {
				Notify.success("Account deactivated successfully.");
				localStorage.removeItem(environment.storageKey);
				this._router.navigate(['/auth']);
			}, _ => {
				Block.remove('#setup-password-button');
			})
		}, () => {
			// No button callbackalert('If you say so...');
		});
	}

	changePassword() {
		const formData = Object.assign({
			country_code: this.userInfo.country_code,
			phone_number: this.userInfo.phone_number
		});
		delete formData.full_phone;
		Loading.circle();
		this._auth.lostPhone(formData).subscribe(res => {
			Notify.success("Email sent on your registered email address.");
			this._router.navigate(['/change-phone-number'], {
				state: {
					data: res.data,
					from: 'dashboard'
				}
			});
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	changeEmail() {
		const formData = Object.assign({
			email: this.userInfo.email,
		});
		delete formData.full_phone;
		Loading.circle();
		this._common.put(urls.changeEmail, formData).subscribe(res => {
			Notify.success("Otp sent on your registered phone number.");
			this._router.navigate(['/change-email'], {
				state: {
					data: {
						country_code: this.userInfo.country_code,
						phone_number: this.userInfo.phone_number
					},
					from: 'dashboard'
				}
			});
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
