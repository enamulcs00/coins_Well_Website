import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';
import { validEmail } from 'src/app/_validators/validEmail';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
	selector: 'app-changeemail',
	templateUrl: './changeemail.component.html',
	styleUrls: ['./changeemail.component.scss']
})
export class ChangeemailComponent implements OnInit, AfterViewInit {
	userInfo: any = JSON.parse(localStorage.getItem(environment.storageKey));
	hide: boolean = true;
	setEmailForm: FormGroup;
	data : any;
	from : string = 'no';
	@ViewChild('stepper') stepper: MatStepper;
	constructor(private _common: CommonService, private _fb: FormBuilder, private _router: Router, private _auth: AuthService) { 

		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.data != "undefined") {
			this.data = this._router.getCurrentNavigation().extras.state.data;
			this.from = this._router.getCurrentNavigation().extras.state.from;
		} else {
			this._router.navigate(['/dashboard']);
		}

	}

	ngOnInit(): void {
		this.setEmailForm = this._fb.group({
			email: [this.userInfo.email, Validators.required],
			new_email: [null, [Validators.required, Validators.email, validEmail, removeSpaces]],
			confirm_email: [null, Validators.required]
		}, { validators: MustMatch('new_email', 'confirm_email') });
		this.setEmailForm.get('email').disable();
	}

	ngAfterViewInit() {
		this.stepper.selectedIndex = 0;
	}

	OtpVerified(event: any) {
		this.stepper.next();
	}

	setupEmail() {
		if (this.setEmailForm.valid) {
			Block.circle('#setup-email-form-button');
			const formData = Object.assign(this.setEmailForm.value);
			delete formData.confirm_password;
			this._common.put(urls.updateEmail, {
				email: this.setEmailForm.get('new_email').value.trim()
			}).subscribe(res => {
				let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
				userInfo['email'] = this.setEmailForm.get('new_email').value.trim();
				localStorage.setItem(environment.storageKey, JSON.stringify(userInfo));
				this._auth.onProfileUpdate.next();
				Notify.success("Email changed successfully.");
				this._common.updateProfileInfo();
				this._router.navigate(['/dashboard/my-details']);
				Block.remove('#setup-email-form-button');
			}, _ => {
				Block.remove('#setup-email-form-button');
			})
		} else {
			this.setEmailForm.markAllAsTouched();
		}
	}
}
