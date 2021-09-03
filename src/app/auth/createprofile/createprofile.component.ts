import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
import { Observable, Subject } from 'rxjs';
import { loadImage } from 'src/app/_helpers/common.helper';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { ValidString } from 'src/app/_validators/string';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-createprofile',
	templateUrl: './createprofile.component.html',
	styleUrls: ['./createprofile.component.scss']
})
export class CreateprofileComponent implements OnInit {
	emailForm: any;
	profileForm: FormGroup;
	showImage: any = '';
	bankList: any = [];
	public bankListEvent = new Subject<string>();
	bankListLoading: boolean = false;
	baseUrl : string = environment.homeURL;
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.emailForm != "undefined") {
			this.emailForm = this._router.getCurrentNavigation().extras.state.emailForm;
		} else {
			this._router.navigate(['/auth/signup']);
		}
		this.profileForm = this._fb.group({
			tempImage: [null],
			image: [null],
			full_name: [null, [Validators.required, Validators.maxLength(30), Validators.minLength(4), ValidString]],
			role: ['2'],
			bank_details: this._fb.group({
				account_holder_name : [null, [Validators.required, Validators.maxLength(30), Validators.minLength(4)]],
				bank_name: [null, [Validators.required]],
				account_number: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
				confirm_account: [null, Validators.required]
			}, { validators: MustMatch('account_number', 'confirm_account') }),
		});

		this.profileForm.get('full_name').valueChanges.subscribe(data=>{
			this.profileForm.get('bank_details').get('account_holder_name').setValue(data);
		})
	}
	ngOnInit(): void {
		this.searchBanks();
	}

	preview(files) {
		if (files.length === 0)
			return;
		loadImage(files[0]).then(image => {
			this.profileForm.get('tempImage').setValue(files[0]);
			this.showImage = image;
		})
	}

	searchBanks() {
		this.bankListEvent
			.pipe(
				distinctUntilChanged(),
				debounceTime(200),
				switchMap((term) => {
					this.bankListLoading = true;
					if(term && term != '') {
						return this._common.get(urls.searchBank + `${term}/`);
					} else {
						return new Observable((resolve => resolve.next(null)));

					}
				})
			)
			.subscribe(
				(items) => {
					this.bankListLoading = false;
					if(items) {
						this.bankList = items.data;
					}
				},
				(err) => {
					this.bankList = [];
					this.bankListLoading = false;
				}
			);
	}

	removeSpaces() {
		Object.keys({
			'full_name': null,
			'bank_details': null
		}).forEach(item => {
			if (this.profileForm.controls[item].value) {
				if (item == 'bank_details') {
					let formG = this.profileForm.controls[item] as FormGroup;
					Object.keys({
						'account_number' : null,
						'confirm_account' : null
					}).forEach(key => {
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
			if(this.profileForm.get('tempImage').value) {
				Block.circle('#create-profile-button');
				let file = this.profileForm.get('tempImage').value;
				const formData: FormData = new FormData();
				formData.append('media', file, file.name);
				this._common.uploadMedia(formData).subscribe(image => {
					Block.remove('#create-profile-button');
					this.profileForm.get('image').setValue(image.data[0]['id']);
					let copyOfProfileForm = this.profileForm.value;
					delete copyOfProfileForm.tempImage;
					this._router.navigate(['/auth/transtionpin'], {
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
				this._router.navigate(['/auth/transtionpin'], {
					state: {
						profileForm: {
							...this.emailForm,
							...this.profileForm.value
						}
					}
				}); 
			}	
		} else {
			this.profileForm.markAllAsTouched();
		}
	}

}
