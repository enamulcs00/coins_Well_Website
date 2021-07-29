import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify, Report } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
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
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.confirmAccount != "undefined") {
			this.confirmAccount = this._router.getCurrentNavigation().extras.state.confirmAccount;
			console.log("ConfirAccount", this.confirmAccount);
		} else {
			this._router.navigate(['/auth/login']);
		}
		this.updatePhoneForm = this._fb.group({
			full_phone: [null, Validators.required],
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
			let phones = this.updatePhoneForm.get('full_phone').value.split(this.selectedCountry.dialCode);
			this.updatePhoneForm.get('phone_number').setValue(phones[1]);
			this.updatePhoneForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.updatePhoneForm.valid) {
			Block.circle('#update-phone-button');
			const formData = Object.assign(this.updatePhoneForm.value);
			delete formData.full_phone;
			this._auth.updatePhone(formData, this.confirmAccount.id).subscribe(res => {
				Block.remove('#update-phone-button');
				// Report.success('Success', 'Phone number updated successfully. <br/> Click <b>OK</b> to Login', 'Ok', () => {
				// });
				this._router.navigate(['/auth/login']);
				Notify.success("Phone number updated successfully.");
			}, _ => {
				Block.remove('#update-phone-button');
			})
		} else {
			this.updatePhoneForm.markAllAsTouched();
		}
	}


}
