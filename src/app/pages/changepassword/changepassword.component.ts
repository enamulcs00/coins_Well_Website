import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';
import { uperCase } from 'src/app/_validators/upercase.validator';
import { lowerCase } from 'src/app/_validators/lowercase.validator';
import { oneDigit } from 'src/app/_validators/onedigit.validator';
import { specialChar } from 'src/app/_validators/specialChar.validator';
import { showErrors } from 'src/app/_helpers/common.helper';
@Component({
	selector: 'app-changepassword',
	templateUrl: './changepassword.component.html',
	styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
	hide: boolean = true;
	hide2: boolean = true;
	hide3: boolean = true;
	setPasswordForm: FormGroup;
	showErrors = showErrors;
	constructor(private _common: CommonService, private _fb: FormBuilder, private _router: Router) { }

	ngOnInit(): void {
		this.setPasswordForm = this._fb.group({
			current_password: [null, Validators.required],
			new_password: [null, [Validators.required, Validators.minLength(8),  removeSpaces, uperCase, lowerCase, oneDigit, specialChar]],
			confirm_password: [null, Validators.required]
		}, { validators: MustMatch('new_password', 'confirm_password') });
	}

	setupPassword() {
		if (this.setPasswordForm.valid) {
			Block.circle('#setup-password-button');
			const formData = Object.assign(this.setPasswordForm.value);
			delete formData.confirm_password;
			this._common.put(urls.changePassword, formData).subscribe(res => {
				Notify.success("Password changed successfully.");
				this._router.navigate(['/dashboard/my-details']);
				Block.remove('#setup-password-button');
			}, _ => {
				Block.remove('#setup-password-button');
			})
		} else {
			this.setPasswordForm.markAllAsTouched();
		}
	}

}
