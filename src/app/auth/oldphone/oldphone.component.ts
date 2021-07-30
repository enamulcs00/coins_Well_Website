import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-oldphone',
	templateUrl: './oldphone.component.html',
	styleUrls: ['./oldphone.component.scss']
})
export class OldphoneComponent implements OnInit {
	allowedCountries : any = environment.allowedCountries;
	oldPhoneForm: FormGroup;
	selectedCountry: any;
	userId: string = '';
	constructor(private _auth: AuthService, private _fb: FormBuilder, private _router : Router) { }

	ngOnInit(): void {
		this.oldPhoneForm = this._fb.group({
			full_phone: [null, Validators.required],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
		});
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}
	

	signUpNow() {
		if (this.oldPhoneForm.get('full_phone').value) {
			let phones = this.oldPhoneForm.get('full_phone').value.split(this.selectedCountry.dialCode);
			this.oldPhoneForm.get('phone_number').setValue(phones[1]);
			this.oldPhoneForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.oldPhoneForm.valid) {
			Block.circle('#signup-button');
			const formData = Object.assign(this.oldPhoneForm.value);
			delete formData.full_phone;
			this._auth.lostPhone(formData).subscribe(res => {
				Block.remove('#signup-button');
				Notify.success("Email sent on your registered email address.");
				this._router.navigate(['/auth/confirmaccount'], {
					state: {
						data : res.data
					}
				});				
			}, _ => {
				Block.remove('#signup-button');
			})
		} else {
			this.oldPhoneForm.markAllAsTouched();
		}
	}
}
