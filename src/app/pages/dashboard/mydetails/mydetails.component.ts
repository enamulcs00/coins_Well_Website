import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block, Notify } from 'notiflix';
import { loadImage } from 'src/app/_helpers/common.helper';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { environment } from 'src/environments/environment';
import { urls } from 'src/app/_services/urls';
import { ValidString } from 'src/app/_validators/string';
@Component({
	selector: 'app-mydetails',
	templateUrl: './mydetails.component.html',
	styleUrls: ['./mydetails.component.scss']
})
export class MydetailsComponent implements OnInit {
	profileForm: FormGroup;
	showImage: any = '';
	userInfo: any = JSON.parse(localStorage.getItem(environment.storageKey));
	constructor(private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService) {
		this.profileForm = this._fb.group({
			tempImage: [null],
			image: [null],
			full_name: [null, [Validators.required, Validators.maxLength(30), Validators.minLength(4), ValidString]],
			phone_number: [null],
			email: [null]
		});
	}

	ngOnInit(): void {
		if (this.userInfo) {
			this.profileForm.patchValue({
				full_name: this.userInfo.first_name + ' ' + this.userInfo.last_name,
				phone_number: this.userInfo.phone_number,
				email: this.userInfo.email,
				image : (this.userInfo.image)?this.userInfo.image.id:''
			});
			if((this.userInfo.image)) {
				this.showImage = environment.homeURL + this.userInfo?.image?.media_file;
			}
		}
	}

	preview(files: string | any[]) {
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
			if (this.profileForm.get('tempImage').value) {
				let file = this.profileForm.get('tempImage').value;
				const formData: FormData = new FormData();
				formData.append('media', file, file.name);
				this._common.uploadMedia(formData).subscribe(image => {
					this.profileForm.get('image').setValue(image.data[0]['id']);
					const formData = {
						...this.profileForm.value,
						email: this.userInfo.email,
						phone_number: this.userInfo.phone_number
					}
					this.updateDetails(formData).then(() => {
						Notify.success("Profile updated successfully.");
					});
				});
			} else {
				const formData = {
					...this.profileForm.value,
					email: this.userInfo.email,
					phone_number: this.userInfo.phone_number
				}
				this.updateDetails(formData).then(() => {
					Notify.success("Profile updated successfully.");
				});
			}
		} else {
			this.profileForm.markAllAsTouched();
		}
	}

	updateDetails(formData: any) {
		return new Promise((resolve, reject) => {
			this._common.put(urls.updateDetail, formData).subscribe(() => {
				this._common.get(urls.getProfileDetails).subscribe(data=>{
					Block.remove('#create-profile-button')
					this.userInfo = {
						...this.userInfo,
						...data.data
					};
					localStorage.setItem(environment.storageKey, JSON.stringify(this.userInfo));
					resolve(formData);
					this._auth.onProfileUpdate.next(data);
				})
			}, error => {
				reject(error);
				Block.remove('#create-profile-button')
			})
		})
	}
}
