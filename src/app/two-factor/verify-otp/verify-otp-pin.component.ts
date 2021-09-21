import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'verify-otp-pin',
	templateUrl: './verify-otp-pin.component.html',
	styleUrls: ['./verify-otp-pin.component.scss']
})
export class VerifyOtpPinComponent implements OnInit {
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
				const formData = Object.assign({
					...this.data,
					"otp" : this.setTransactionForm.value.transaction_pin
				});
				delete formData.full_phone;
				this._common.post(urls.verifyOtp, formData).subscribe(() => {
					Block.remove('#setup-tcp-button');
					this.dialog.openDialogs[0].close(true);
				}, _ => {
					Block.remove('#setup-tcp-button');
				})
		} else {
			Notify.failure("Enter code.");
		}
	}
}
