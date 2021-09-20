import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { removeSpaces } from 'src/app/_validators/remove-spaces';

@Component({
	selector: 'app-confirmaccount',
	templateUrl: './confirmaccount.component.html',
	styleUrls: ['./confirmaccount.component.scss']
})
export class ConfirmaccountComponent implements OnInit {
	data: any;
	confirmAccount: FormGroup;
	showImage: any = '';
	hide: boolean = true;
	from: string = 'no';
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.data != "undefined") {
			this.data = this._router.getCurrentNavigation().extras.state.data;
			this.from = this._router.getCurrentNavigation().extras.state.from;
		} else {
			this._router.navigate(['/auth/login']);
		}
		this.confirmAccount = this._fb.group({
			otp: [null, [Validators.required, Validators.minLength(4), Validators.minLength(4)]],
			email: [this.data.email],
			password: [null, [Validators.required, removeSpaces]],
			transaction_pin: [null, [Validators.required]]
		});
	}

	ngOnInit(): void {}

	otpEnter(event) {
		this.confirmAccount.get('otp').setValue(event.join(''));
	}

	transactionEnter(event) {
		this.confirmAccount.get('transaction_pin').setValue(event.join(''));
	}

	submitDetails() {
		if (this.confirmAccount.valid) {
			Block.circle('#confirm-account-button');
			this._auth.verifyDetailsPhone(this.confirmAccount.value).subscribe(res => {
				Block.remove('#confirm-account-button');
				if (this.from == 'dashboard') {
					this._router.navigate(['/update-number'], {
						state: {
							confirmAccount: {
								...this.confirmAccount.value,
								...res.data
							},
							from  : 'dashboard'
						}
					});
				} else {
					this._router.navigate(['/auth/updatephone'], {
						state: {
							confirmAccount: {
								...this.confirmAccount.value,
								...res.data
							}
						}
					});
				}
			}, _ => {
				Block.remove('#confirm-account-button');
			});
		} else {
			this.confirmAccount.markAllAsTouched();
		}
	}

	resendOtp() {
		Block.circle('#confirm-account-button');
		this._auth.resendEmailOtp(this.data).subscribe(() => {
			Notify.success("Otp sent successfully.");
			Block.remove('#confirm-account-button');
		}, _ => {
			Block.remove('#confirm-account-button');
		})
	}

	returnEmail(input: string) {
		var a = input.split("@");
		var b = a[0];
		var newstr = "";
		for (let i = 0; i < b.length; i++) {
			if (i > 0 && i < b.length - 1) newstr += "*";
			else newstr += b[i];
		}
		return newstr + "@" + a[1];
	}
}
