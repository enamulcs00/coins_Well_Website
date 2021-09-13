import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-transactionpin',
	templateUrl: './transactionpin.component.html',
	styleUrls: ['./transactionpin.component.scss']
})
export class TransactionpinComponent implements OnInit {
	profileForm: any;
	transactionForm: FormGroup;
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.profileForm != "undefined") {
			this.profileForm = this._router.getCurrentNavigation().extras.state.profileForm;
		} else {
			this._router.navigate(['/auth/signup']);
		}
	}

	ngOnInit(): void {
		this.transactionForm = this._fb.group({
			transaction_pin: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6), removeSpaces]],
			transaction_pin_confirm: [null, Validators.required]
		}, { validators: MustMatch('transaction_pin', 'transaction_pin_confirm') })
	}

	sumitFrm() {
		this._auth.updateDetails({
			...this.profileForm,
			...this.transactionForm.value,
			token: this._auth.firebaseToken,
			'device-token': this._auth.firebaseToken,
			'device-type': "WEB"
		}, this._auth.userId).subscribe(res => {
			Block.remove('#transaction-pin-set');
			Notify.success("Account create successfully.");
			localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
			this._router.navigate(['/dashboard']);
		}, _ => {
			Block.remove('#transaction-pin-set');
		})
	}

	submitAllDetails() {
		if (this.transactionForm.valid) {
			Block.circle('#transaction-pin-set')
			const messaging = firebase.messaging();
			messaging
				.requestPermission()
				.then(() => {
					messaging.getToken().then((token: any) => {
						this._auth.firebaseToken = token;
						this.sumitFrm();
					})
					messaging.onMessage(() => {
					})
				}
				)
				.catch((error: any) => {
					Notify.failure("Unable to get permission to notify.");
					this.sumitFrm();
				});
		} else {
			this.transactionForm.markAllAsTouched();
		}
	}

}
