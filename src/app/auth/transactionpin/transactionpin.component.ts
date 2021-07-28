import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { removeSpaces } from 'src/app/_validators/remove-spaces';

@Component({
	selector: 'app-transactionpin',
	templateUrl: './transactionpin.component.html',
	styleUrls: ['./transactionpin.component.scss']
})
export class TransactionpinComponent implements OnInit {
	profileForm: any;
	transactionForm: FormGroup;
	constructor(private _router: Router, private _common: CommonService, private _fb: FormBuilder, private _auth : AuthService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.profileForm != "undefined") {
			this.profileForm = this._router.getCurrentNavigation().extras.state.profileForm;
		} else {
			this._router.navigate(['/auth/signup']);
		}
	}

	ngOnInit(): void {
		this.transactionForm = this._fb.group({
			transaction_pin: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(12), removeSpaces]],
			transaction_pin_confirm: [null, Validators.required]
		}, { validators: MustMatch('transaction_pin', 'transaction_pin_confirm') })
	}

	submitAllDetails() {
		if(this.transactionForm.valid) {
			console.log("Working");
			Block.circle('#transaction-pin-set')
			this._auth.updateDetails({
				...this.profileForm,
				...this.transactionForm.value
			}, this._auth.userId).subscribe(res=>{
				Block.remove('#transaction-pin-set')
			}, _ => {
				Block.remove('#transaction-pin-set')
			})
		} else {
			this.transactionForm.markAllAsTouched();
		}
	}

}
