import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	allowedCountries : any = environment.allowedCountries;
	loginForm: FormGroup;
	selectedCountry: any;
	hide = true;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			full_phone: [null, Validators.required],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
			password: [null, Validators.required]
		});
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}

	loginNow() {
		if (this.loginForm.get('full_phone').value) {
			let phones = this.loginForm.get('full_phone').value.split(this.selectedCountry.dialCode);
			this.loginForm.get('phone_number').setValue(phones[1]);
			this.loginForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.loginForm.valid) {
			Block.circle('#login-button');
			const formData = this.loginForm.value;
			delete formData.full_phone;
			this._auth.login(formData).subscribe(res => {
				Block.remove('#login-button');
				if(res.data.is_profile_setup) {
					localStorage.setItem(environment.storageKey,JSON.stringify(res.data));
					Notify.success("Logged in successfully.");
					this.router.navigate(['/dashboard']);
				} else {
					this._auth.userId = res.data.id;
					this.router.navigate(['/auth/emailid']);
				}
			}, error => {
				Block.remove('#login-button');
			})
		} else {
			this.loginForm.markAllAsTouched();
		}
	}
}
