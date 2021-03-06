import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-updatephoneno',
	templateUrl: './updatephoneno.component.html',
	styleUrls: ['./updatephoneno.component.scss']
})
export class UpdatephonenoComponent {
	confirmAccount: any;
	updatePhoneForm: FormGroup;
	selectedCountry: any;
	allowedCountries: any = environment.allowedCountries;
	from: string = 'no';
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.confirmAccount != "undefined") {
			this.confirmAccount = this._router.getCurrentNavigation().extras.state.confirmAccount;
			this.from = this._router.getCurrentNavigation().extras.state.from;
			// console.log("ConfirAccount", this.confirmAccount);
		} else {
			this._router.navigate(['/auth/login']);
		}
		this.updatePhoneForm = this._fb.group({
			full_phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(19)]],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
		});
	}

	countryChanged(event: any) {
		console.log("event", event);
		if (event) {
			this.selectedCountry = event;
		}
	}

	signUpNow() {
		if (this.updatePhoneForm.get('full_phone').value) {
			let phones = this.updatePhoneForm.get('full_phone').value.split('+'+this.selectedCountry.dialCode);
			this.updatePhoneForm.get('phone_number').setValue(phones[1]);
			this.updatePhoneForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.updatePhoneForm.valid) {
			Block.circle('#update-phone-button');
			const formData = Object.assign(this.updatePhoneForm.value);
			delete formData.full_phone;
			this._auth.updatePhone(formData, this.confirmAccount.id).subscribe(() => {
				Block.remove('#update-phone-button');
				this._router.navigate(['/auth/login']);
				if (this.from == 'dashboard') {
					Notify.success("Phone number updated successfully. Login again to continue.");
					localStorage.removeItem(environment.storageKey);
					this._router.navigate(['/auth/login']);
				} else {
					Notify.success("Phone number updated successfully.");
				}
				
			}, _ => {
				Block.remove('#update-phone-button');
			})
		} else {
			this.updatePhoneForm.markAllAsTouched();
		}
	}

}
