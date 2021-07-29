import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
import { loadImage } from 'src/app/_helpers/common.helper';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { MustMatch } from 'src/app/_validators/must-match.validator';

@Component({
	selector: 'app-createprofile',
	templateUrl: './createprofile.component.html',
	styleUrls: ['./createprofile.component.scss']
})
export class CreateprofileComponent implements OnInit {
	emailForm: any;
	profileForm: FormGroup;
	showImage: any = '';
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common : CommonService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.emailForm != "undefined") {
			this.emailForm = this._router.getCurrentNavigation().extras.state.emailForm;
		} else {
			this._router.navigate(['/auth/signup']);
		}
		this.profileForm = this._fb.group({
			tempImage: [null, Validators.required],
			image: [null],
			full_name: [null, [Validators.required, Validators.maxLength(30)]],
			role: [2],
			bank_details: this._fb.group({
				bank_name: [null, [Validators.required, Validators.maxLength(30)]],
				account_number: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
				confirm_account: [null, Validators.required]
			}, { validators: MustMatch('account_number', 'confirm_account') }),
		});
	}
	ngOnInit(): void {

	}

	preview(files) {
		if (files.length === 0)
			return;
		loadImage(files[0]).then(image => {
			this.profileForm.get('tempImage').setValue(files[0]);
			this.showImage = image;
		})
	}

	submitDetails() {
		if (this.profileForm.valid) {
			Block.circle('#create-profile-button');
			let file = this.profileForm.get('tempImage').value;
			const formData: FormData = new FormData();
			formData.append('media', file, file.name);
			this._common.uploadMedia(formData).subscribe(image => {
				Block.circle('#create-profile-button');
				this.profileForm.get('image').setValue(image.data[0]['id']);
				let copyOfProfileForm = this.profileForm.value;
				delete copyOfProfileForm.tempImage;
				this._router.navigate(['/auth/verify-doc'], {
					state: {
						profileForm: {
							...this.emailForm,
							...this.profileForm.value
						}
					}
				});
			}, _ => {
				Block.circle('#create-profile-button');
			});
		} else {
			this.profileForm.markAllAsTouched();
		}
	}

}
