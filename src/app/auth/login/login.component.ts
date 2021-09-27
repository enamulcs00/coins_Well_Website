import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
import firebase from "firebase/app";
import { TwoFactorVerifyComponent } from 'src/app/two-factor/two-factor-verify/two-factor-pin.component';
import { MatDialog } from '@angular/material/dialog';
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
	recpach: boolean = true;
	@ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder, private dialog : MatDialog) { }

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
			let phones = this.loginForm.get('full_phone').value.split('+' + this.selectedCountry.dialCode);
			this.loginForm.get('phone_number').setValue(phones[1]);
			this.loginForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.loginForm.valid) {
			if (this.recpach) {
				const sumitFrm = () => {
					const formData = this.loginForm.value;
					delete formData.full_phone;
					formData['device-token'] = this._auth.firebaseToken;
					formData['device-type'] = "WEB";
					this._auth.login(formData).subscribe(res => {
						Block.remove('#login-button');
						if (res.data.is_profile_setup) {
							if(res.data.is_two_factor_authentication_enable) {
								const dialogRef = this.dialog.open(TwoFactorVerifyComponent, {
									disableClose: true,
									data : {
										token : res.data.token
									}
								});
								dialogRef.afterClosed().subscribe(result => {
									if (result) {
										localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
										Notify.success("Logged in successfully.");
										this.router.navigate(['/dashboard']);
									}
								});
							} else {
								localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
								Notify.success("Logged in successfully.");
								this.router.navigate(['/dashboard']);
							}
						} else {
							this._auth.userId = res.data.id;
							this.router.navigate(['/auth/emailid']);
						}
					}, _ => {
						Block.remove('#login-button');
					})
				}
				Block.circle('#login-button');
				const messaging = firebase.messaging();
				messaging
					.requestPermission()
					.then(() => {
						messaging.getToken().then((token: any) => {
							this._auth.firebaseToken = token;
							sumitFrm();
							messaging.onMessage(() => {
							})
						}).catch(() => {
							sumitFrm();
							Notify.failure("Unable to get permission to notify.");
						})
					})
					.catch(() => {
						Notify.failure("Unable to get permission to notify.");
						sumitFrm();
					});
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
				if (response) {
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
