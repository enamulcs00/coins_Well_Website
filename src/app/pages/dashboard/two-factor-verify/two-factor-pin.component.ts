import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'two-factor-pin',
	templateUrl: './two-factor-pin.component.html',
	styleUrls: ['./two-factor-pin.component.scss']
})
export class TwoFactorVerifyComponent implements OnInit {
	hide: boolean = true;
	setTransactionForm: FormGroup;

	constructor(private _common: CommonService, private _fb: FormBuilder, private dialog : MatDialog) { }

	ngOnInit(): void {
		this.setTransactionForm = this._fb.group({
			transaction_pin: [null, Validators.required]
		});
	}

	setupPassword() {
		if (this.setTransactionForm.valid) {
			Block.circle('#setup-tcp-button');
			const formData = Object.assign(this.setTransactionForm.value);
			delete formData.confirm_password;
			this._common.post(urls.verifyTWOOTP, {
				otp : this.setTransactionForm.value
			}).subscribe(res => {
				if(res.data.status) {
					this.dialog.openDialogs[0].close(true);
				} else {
					Notify.failure("Invalid Otp.");
				}
				Block.remove('#setup-tcp-button');
			}, _ => {
				Block.remove('#setup-tcp-button');
			})
		} else {
			this.setTransactionForm.markAllAsTouched();
		}
	}
}
