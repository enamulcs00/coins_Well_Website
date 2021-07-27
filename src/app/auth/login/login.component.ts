import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { validEmail } from 'src/app/_validators/validEmail';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isLoading: boolean = false;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			phone: [null, [Validators.required]],
			password: [null, Validators.required]
		})
	}

	loginNow() {
		if (this.loginForm.controls.email.value) {
			this.loginForm.controls.email.setValue(this.loginForm.controls.email.value.trim());
		}
		if (this.loginForm.valid) {
			this.isLoading = true;
			this._auth.login(this.loginForm.value).subscribe(res => {
				this.isLoading = false;
				Notify.success("Logged in successfully.");
				this.router.navigate(['/dashboard']);
			}, error => {
				this.isLoading = false;
			})
		} else {
			// if (this.loginForm.get('email').hasError('required')) {
			// 	Notify.failure("Please enter email address.");
			// } else if (this.loginForm.get('email').hasError('email') || this.loginForm.get('email').hasError('validEmail')) {
			// 	Notify.failure("Please enter valid email address.");
			// } else if (this.loginForm.get('password').hasError('required')) {
			// 	Notify.failure("Please enter password.");
			// }

		}
	}
}
