import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
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
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.data != "undefined") {
			this.data = this._router.getCurrentNavigation().extras.state.data;
		} else {
			this._router.navigate(['/auth/login']);
		}
		this.confirmAccount = this._fb.group({
			otp: [null, [Validators.required, Validators.minLength(4), Validators.minLength(4)]],
			email: ['money@gmail.com'],
			password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16), removeSpaces]],
			transaction_pin: [null, [Validators.required]]
		});
	}
	ngOnInit(): void {

	}

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
				this._router.navigate(['/auth/updatephone'], {
					state: {
						confirmAccount: {
							...this.confirmAccount.value,
							...res.data
						}
					}
				});
			}, _ => {
				Block.remove('#confirm-account-button');
			});
		} else {
			this.confirmAccount.markAllAsTouched();
		}
	}
}
