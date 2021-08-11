import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-forgotpassword',
	templateUrl: './forgotpassword.component.html',
	styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit, AfterViewInit {
	allowedCountries : any = environment.allowedCountries;
	@ViewChild('stepper') stepper: MatStepper;
	forgotPasswordForm: FormGroup;
	selectedCountry: any;
	userId: string = '';
	constructor(private _auth: AuthService, private _fb: FormBuilder, private router: Router) { }

	ngOnInit(): void {
		this.forgotPasswordForm = this._fb.group({
			full_phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(19)]],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
		});
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}

	ngAfterViewInit() {
		this.stepper.selectedIndex = 0;
	}

	signUpNow() {
		if (this.forgotPasswordForm.get('full_phone').value) {
			let phones = this.forgotPasswordForm.get('full_phone').value.split(this.selectedCountry.dialCode);
			this.forgotPasswordForm.get('phone_number').setValue(phones[1]);
			this.forgotPasswordForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.forgotPasswordForm.valid) {
			Block.circle('#signup-button');
			const formData = Object.assign(this.forgotPasswordForm.value);
			delete formData.full_phone;
			this._auth.forgotPassword(formData).subscribe(res => {
				Block.remove('#signup-button');
				Notify.success(res.message);
				this.stepper.next();
			}, _ => {
				Block.remove('#signup-button');
			})
		} else {
			this.forgotPasswordForm.markAllAsTouched();
		}
	}

	OtpVerified(event: any) {
		// console.log("event",event);
		this.userId = event.id;
		this.stepper.next();
	}

	setPasswordCompleted() {
		Notify.success("Password reset successfully");
		this.router.navigate(['/auth/login']);
	}

}
