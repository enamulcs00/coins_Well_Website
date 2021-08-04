import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
import { loadImage } from 'src/app/_helpers/common.helper';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { ValidString } from 'src/app/_validators/string';

@Component({
	selector: 'app-createprofile',
	templateUrl: './createprofile.component.html',
	styleUrls: ['./createprofile.component.scss']
})
export class CreateprofileComponent implements OnInit {
	emailForm: any;
	profileForm: FormGroup;
	showImage: any = '';
	bankList: any[] = [
		{
			"id": "1",
			"name": "Access Bank Plc"
		},
		{
			"id": "2",
			"name": "Citibank Nigeria Limited"
		},
		{
			"id": "3",
			"name": "Ecobank Nigeria"
		},
		{
			"id": "4",
			"name": "Fidelity Bank Plc"
		},
		{
			"id": "5",
			"name": "First Bank of Nigeria Limited"
		},
		{
			"id": "6",
			"name": "First City Monument Bank Limited"
		},
		{
			"id": "7",
			"name": "Globus Bank Limited"
		},
		{
			"id": "8",
			"name": "Guaranty Trust Bank Plc"
		},
		{
			"id": "9",
			"name": "Heritage Bank Plc"
		},
		{
			"id": "10",
			"name": "Keystone Bank Limited"
		},
		{
			"id": "11",
			"name": "Polaris Bank Limited"
		},
		{
			"id": "12",
			"name": "Providus Bank Limited"
		},
		{
			"id": "13",
			"name": "Stanbic IBTC Bank Plc"
		},
		{
			"id": "14",
			"name": "Standard Chartered"
		},
		{
			"id": "15",
			"name": "Sterling Bank Plc"
		},
		{
			"id": "16",
			"name": "SunTrust Bank Nigeria Limited"
		},
		{
			"id": "17",
			"name": "TITAN Trust Bank"
		},
		{
			"id": "18",
			"name": "Union Bank of Nigeria Plc"
		},
		{
			"id": "19",
			"name": "Unity Bank Plc"
		},
		{
			"id": "20",
			"name": "Wema Bank Plc"
		},
		{
			"id": "21",
			"name": "Zenith Bank Plc"
		}
	]
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.emailForm != "undefined") {
			this.emailForm = this._router.getCurrentNavigation().extras.state.emailForm;
		} else {
			this._router.navigate(['/auth/signup']);
		}
		this.profileForm = this._fb.group({
			tempImage: [null, Validators.required],
			image: [null],
			full_name: [null, [Validators.required, Validators.maxLength(30), Validators.minLength(4), ValidString]],
			role: ['2'],
			bank_details: this._fb.group({
				bank_name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
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

	removeSpaces() {
		Object.keys({
			'full_name' : null,
			'bank_details' : null
		}).forEach(item => {
			if (this.profileForm.controls[item].value) {
				if (item == 'bank_details') {
					let formG = this.profileForm.controls[item] as FormGroup;
					Object.keys(formG.controls).forEach(key => {
						if (formG.controls[key].value) {
							formG.controls[key].setValue(formG.controls[key].value.trim());
						}
					})
				} else {
					this.profileForm.controls[item].setValue(this.profileForm.controls[item].value.trim());
				}
			}
		})
	}

	submitDetails() {
		this.removeSpaces();
		if (this.profileForm.valid) {
			Block.circle('#create-profile-button');
			let file = this.profileForm.get('tempImage').value;
			const formData: FormData = new FormData();
			formData.append('media', file, file.name);
			this._common.uploadMedia(formData).subscribe(image => {
				Block.remove('#create-profile-button');
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
				Block.remove('#create-profile-button');
			});
		} else {
			this.profileForm.markAllAsTouched();
		}
	}

}
