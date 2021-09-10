import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
	allowedCountries: any = environment.allowedCountries;
	loginForm: FormGroup;
	selectedCountry: any;
	hide = true;
	recpach : boolean = false;
	@ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			full_phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(19)]],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
			password: [null, Validators.required]
		});
		this.addRecaptchaScript();
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}

	loginNow() {
		if (this.loginForm.get('full_phone').value) {
			let phones = this.loginForm.get('full_phone').value.split('+'+this.selectedCountry.dialCode);
			this.loginForm.get('phone_number').setValue(phones[1]);
			this.loginForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.loginForm.valid) {
			if(this.recpach) {
				Block.circle('#login-button');
					const formData = this.loginForm.value;
					delete formData.full_phone;
					formData['device-token'] = this._auth.firebaseToken;
					this._auth.login(formData).subscribe(res => {
						Block.remove('#login-button');
						if (res.data.is_profile_setup) {
							localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
							Notify.success("Logged in successfully.");
							this.router.navigate(['/dashboard']);
						} else {
							this._auth.userId = res.data.id;
							this.router.navigate(['/auth/emailid']);
						}
					}, _ => {
						Block.remove('#login-button');
					})
			} else {
				Notify.failure("Fill the captcha first.");
			}
		} else {
			this.loginForm.markAllAsTouched();
		}
	}

	renderReCaptcha() {
		window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
			'sitekey': environment.googleSiteKey,
			'callback': (response) => {
				if(response) {
					this.recpach = true;
				}
			}
		});
	}

	addRecaptchaScript() {
		window['grecaptchaCallback'] = () => {
			this.renderReCaptcha();
		}

		(function (d, s, id, obj) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) { obj.renderReCaptcha(); return; }
			js = d.createElement(s); js.id = id;
			js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'recaptcha-jssdk', this));

	}
}
