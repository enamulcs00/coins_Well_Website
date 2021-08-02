import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';

@Component({
	selector: 'app-change-transtionpin',
	templateUrl: './change-transtionpin.component.html',
	styleUrls: ['./change-transtionpin.component.scss']
})
export class ChangeTranstionpinComponent implements OnInit {
	hide: boolean = true;
	setTransactionForm: FormGroup;

	constructor(private _common: CommonService, private _fb: FormBuilder, private _router: Router) { }

	ngOnInit(): void {
		this.setTransactionForm = this._fb.group({
			transaction_pin: [null, Validators.required],
			new_transaction_pin: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), removeSpaces]],
			confirm_transaction_pin: [null, Validators.required]
		}, { validators: MustMatch('new_transaction_pin', 'confirm_transaction_pin') });
	}

	setupPassword() {
		if (this.setTransactionForm.valid) {
			Block.circle('#setup-tcp-button');
			const formData = Object.assign(this.setTransactionForm.value);
			delete formData.confirm_password;
			this._common.put(urls.changeTransactionPin, formData).subscribe(res => {
				Notify.success("Transaction pin changed successfully.");
				this._router.navigate(['/dashboard/my-details']);
				Block.remove('#setup-tcp-button');
			}, _ => {
				Block.remove('#setup-tcp-button');
			})
		} else {
			this.setTransactionForm.markAllAsTouched();
		}
	}


}
