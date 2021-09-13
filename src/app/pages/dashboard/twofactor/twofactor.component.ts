import { Component, OnInit } from '@angular/core';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-twofactor',
	templateUrl: './twofactor.component.html',
	styleUrls: ['./twofactor.component.scss']
})
export class TwofactorComponent implements OnInit {
	deposit: boolean = false;
	withdraw: boolean = false;
	enable2FA: boolean = false;
	constructor(private _common: CommonService, private _auth : AuthService) { }

	ngOnInit(): void {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		if(userInfo) {
			this.enable2FA =  userInfo.is_two_factor_authentication_enable
		}
	}

	goToNext() {
		Block.circle('#submit-documents');
		this._common.post(urls.twoAuthSend, {
			'two_factor_authentication_status': this.enable2FA
		}).subscribe((data) => {
			Block.remove('#submit-documents');			
			Notify.success(data.message);
		}, () => {
			Block.remove('#submit-documents');
		})
	}

}
