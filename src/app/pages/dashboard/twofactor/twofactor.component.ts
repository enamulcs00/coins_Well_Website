import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Block, Loading, Notify } from 'notiflix';
import { TwoFactorVerifyComponent } from 'src/app/two-factor/two-factor-verify/two-factor-pin.component';
import { VerifyOtpPinComponent } from 'src/app/two-factor/verify-otp/verify-otp-pin.component';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../confirm-pin/confirm-pin.component';
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
	enabledQRCode : boolean = false;
	keySign : string = '';
	constructor(private _common: CommonService, private dialog: MatDialog) { }

	ngOnInit(): void {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		if (userInfo) {
			this.enable2FA = userInfo.is_two_factor_authentication_enable;
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

	checkCode(val: boolean) {
		const dialogRef = this.dialog.open(ConfirmPinComponent, {
			disableClose: true
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				Loading.circle();
				this._common.post(urls.sendOtpVerify).subscribe(() => {
					Loading.remove();
					const verifyOtpPin = this.dialog.open(VerifyOtpPinComponent, {
						disableClose: true
					});+
					verifyOtpPin.afterClosed().subscribe(result => {
						if (result) {
							if(this.enable2FA) {
								this.enableTwoFactor();
							} else {
								this.verify2fa();
							}
						} else {
							this.enable2FA = !this.enable2FA
						}
					});
				}, () => {
					this.enable2FA = !this.enable2FA
					Loading.remove();
				})
			} else {
				this.enable2FA = !this.enable2FA
			}
		});
	}

	enableTwoFactor() {
		Loading.circle();
		this.enabledQRCode = true;
		this._common.get(urls.getQRCode).subscribe(data => {
			Loading.remove();
			this.genCode(data.data.qr_code);
			this.keySign =  data.data.auth_code
		}, () => {
			Loading.remove();
		})
	}

	ngAfterViewInit() {
		if (this.enable2FA) {
			Loading.circle();
			this._common.get(urls.getQRCode).subscribe(data => {
				Loading.remove();
				this.genCode(data.data.qr_code);
				this.keySign =  data.data.auth_code
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

	verify2fa() {
		const dialogRef2 = this.dialog.open(TwoFactorVerifyComponent, {
			disableClose: true
		});
		dialogRef2.afterClosed().subscribe(result => {
			if (result) {
				Loading.circle();
				this._common.post(urls.twoAuthSend, {
					'two_factor_authentication_status': this.enable2FA
				}).subscribe(() => {
					this._common.updateProfileInfo();
					Loading.remove();
					if(this.enable2FA) {
						this.enabledQRCode = false;
						Notify.success("Your 2FA has been successfully Enabled.");
					} else {
						Notify.success("Your 2FA has been successfully Dsiabled.");

					}
				}, () => {
					Loading.remove();
				});
			}
		});
	}

}
