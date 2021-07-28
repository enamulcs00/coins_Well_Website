import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
	signUpForm: FormGroup;
	selectedCountry: any;
	userId: string = '';
	@ViewChild('stepper') stepper: MatStepper;
	constructor(private _auth: AuthService, private _fb: FormBuilder, private router : Router) { }

	ngOnInit(): void {
		this.signUpForm = this._fb.group({
			full_phone: [null, Validators.required],
			phone_number: [null, [Validators.required]],
			country_code: [null, Validators.required],
		});
	}

	ngAfterViewInit() {
		this.stepper.selectedIndex = 0;
	}

	countryChanged(event: any) {
		if (event) {
			this.selectedCountry = event;
		}
	}

	signUpNow() {
		if (this.signUpForm.get('full_phone').value) {
			let phones = this.signUpForm.get('full_phone').value.split(this.selectedCountry.dialCode);
			this.signUpForm.get('phone_number').setValue(phones[1]);
			this.signUpForm.get('country_code').setValue('+' + this.selectedCountry.dialCode);
		}
		if (this.signUpForm.valid) {
			Block.circle('#signup-button');
			const formData = Object.assign(this.signUpForm.value);
			delete formData.full_phone;
			this._auth.signup(formData).subscribe(res => {
				this.userId = res.data.id;
				Block.remove('#signup-button');
				if (res.message.toLowerCase() == 'please fill password first !') {
					this.stepper.next();
					this.stepper.next();
				} else {
					Notify.success(res.message);
					this.stepper.next();
				}
			}, _ => {
				Block.remove('#signup-button');
			})
		} else {
			this.signUpForm.markAllAsTouched();
		}
	}

	OtpVerified(event: any) {
		this.stepper.next();
	}

	setPasswordCompleted() {
		this._auth.userId = this.userId;
		this.router.navigate(['/auth/emailid']);
	}

}
