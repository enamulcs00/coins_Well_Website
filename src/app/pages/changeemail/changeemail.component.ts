import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';
import { validEmail } from 'src/app/_validators/validEmail';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-changeemail',
	templateUrl: './changeemail.component.html',
	styleUrls: ['./changeemail.component.scss']
})
export class ChangeemailComponent implements OnInit {
	userInfo : any = JSON.parse(localStorage.getItem(environment.storageKey));
	hide: boolean = true;
	setEmailForm: FormGroup;

	constructor(private _common: CommonService, private _fb: FormBuilder, private _router: Router) { }

	ngOnInit(): void {
		console.log("this.userInfo",this.userInfo);
		this.setEmailForm = this._fb.group({
			email: [this.userInfo.email, Validators.required],
			new_email: [null, [Validators.required, Validators.email, validEmail, removeSpaces]],
			confirm_email: [null, Validators.required]
		}, { validators: MustMatch('new_email', 'confirm_email') });
		this.setEmailForm.get('email').disable();
	}

	setupEmail() {
		if (this.setEmailForm.valid) {
			Block.circle('#setup-email-form-button');
			const formData = Object.assign(this.setEmailForm.value);
			delete formData.confirm_password;
			this._common.put(urls.changeEmail, {
				email: this.setEmailForm.get('new_email').value.trim()
			}).subscribe(res => {
				Notify.success("Email changed successfully.");
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
