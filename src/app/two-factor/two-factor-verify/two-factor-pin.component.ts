import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'two-factor-pin',
	templateUrl: './two-factor-pin.component.html',
	styleUrls: ['./two-factor-pin.component.scss']
})
export class TwoFactorVerifyComponent implements OnInit {
	hide: boolean = true;
	setTransactionForm: FormGroup;

	constructor(private _common: CommonService, private _fb: FormBuilder, private dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit(): void {
		this.setTransactionForm = this._fb.group({
			transaction_pin: [null, Validators.required]
		});
	}

	checkOTP(event) {
		this.setTransactionForm.get('transaction_pin').setValue(event.join(''));
	}

	setupPassword() {
		if (this.setTransactionForm.valid) {
			Block.circle('#setup-tcp-button');
			const formData = Object.assign(this.setTransactionForm.value);
			delete formData.confirm_password;
			this._common.postWithHeaders(urls.verifyTWOOTP, {
				otp : this.setTransactionForm.value
			}, {
				Authorization : `Bearer ${this.data.token}`
			}).subscribe(res => {
				if(res.data.status) {
					this.dialog.openDialogs[0].close(true);
				} else {
					Notify.failure("Invalid code.");
				}
				Block.remove('#setup-tcp-button');
			}, _ => {
				Block.remove('#setup-tcp-button');
			})
		} else {
			Notify.failure("Enter code.");
		}
	}
}
