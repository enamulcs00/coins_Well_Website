import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { validEmail } from '../../_validators/validEmail';
@Component({
	selector: 'app-whats-emailid',
	templateUrl: './whats-emailid.component.html',
	styleUrls: ['./whats-emailid.component.scss']
})
export class WhatsEmailidComponent implements OnInit, AfterViewInit {
	emailForm: FormGroup;
	@ViewChild('stepper') stepper: MatStepper;
	constructor(private _auth: AuthService, private _router: Router, private _fb: FormBuilder) { }

	ngOnInit(): void {
		if (!this._auth.userId) {
			this._router.navigate(['/auth/signup']);
		}
		this.emailForm = this._fb.group({
			email: [null, [Validators.required, Validators.email, validEmail, removeSpaces]],
			referred_by: [null],
			tos: [true, Validators.requiredTrue],
			user_id : [this._auth.userId]
		});
	}

	ngAfterViewInit() {
		this.stepper.selectedIndex = 0;
	}


	submitEmail() {
		if (this.emailForm.valid) {
			Block.circle('#validate-email-button');
			this._auth.validateEmail(this.emailForm.value, this._auth.userId).subscribe(() => {
				Block.remove('#validate-email-button');
				this.stepper.next();
			}, _ => {
				Block.remove('#validate-email-button');
			})
		} else {
			this.emailForm.markAllAsTouched();
		}
	}

	OtpVerified() {
		this._router.navigate(['/auth/createprofie'], {
			state: {
				emailForm: {
					...this.emailForm.value,
					email: this.emailForm.value.email.trim()
				}
			}
		});
	}
}


// CreateprofileDialog()