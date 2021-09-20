import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Block, Loading, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
declare var QRCode: any;

@Component({
	selector: 'app-twofactor',
	templateUrl: './twofactor.component.html',
	styleUrls: ['./twofactor.component.scss']
})
export class TwofactorComponent implements OnInit, AfterViewInit {
	deposit: boolean = false;
	withdraw: boolean = false;
	enable2FA: boolean = false;
	constructor(private _common: CommonService, private _auth : AuthService) { }

	ngOnInit(): void {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		if(userInfo) {
			this.enable2FA =  userInfo.is_two_factor_authentication_enable;
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

	checkCode(val : boolean) {
		if(val) {
			Loading.circle();
			this._common.post(urls.twoAuthSend, {
				'two_factor_authentication_status': this.enable2FA
			}).subscribe((data) => {
				this._common.get(urls.getQRCode).subscribe(data=>{
					Loading.remove();
					Notify.success("Two factor enabled successfully.")
					this.genCode(data.data);
				})
			}, () => {
				Loading.remove();
			})
		} else {
			Loading.circle();
			this._common.post(urls.twoAuthSend, {
				'two_factor_authentication_status': this.enable2FA
			}).subscribe((data) => {
				Loading.remove();
				Notify.success("Two factor disabled successfully.")
			}, () => {
				Loading.remove();
			})
		}
	}

	ngAfterViewInit()  {
		if(this.enable2FA) {
			Loading.circle();
			this._common.get(urls.getQRCode).subscribe(data=>{
				Loading.remove();
				this.genCode(data.data);
			})
		}
	}

	genCode(code: string) {
		new QRCode(document.getElementById("barcode"), {
			text: code,
			width: 150,
			height: 150,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
		});
	}

}
