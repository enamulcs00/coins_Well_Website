import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-deposit',
	templateUrl: './deposit.component.html',
	styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
	addCashForm: FormGroup;
	cmsData: any;
	showImage: string | any;
	baseUrl: string = environment.homeURL;
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService) { }
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			tempImage: [null, Validators.required],
			proof: [null],
			request_type: [1],
			symbol: ['+'],
			amount: [null, [Validators.required, Validators.min(1)]]
		});
		this.getCMS();
	}

	// preview(files) {
	// 	let files2 = files.target.files;
	// 	console.log("files.length",files2);
	// 	console.log("files.length",this.addCashForm.get('tempImage').value);
	// 	if (files2.length === 0)
	// 	return;
	// 	loadImage(files2[0]).then(image => {
	// 		console.log("files",files2);
	// 		this.addCashForm.get('tempImage').setValue(files2[0]);
	// 		this.showImage = image;
	// 		console.log("Ss",this.showImage);
	// 	})
	// }

	updateDetails(formData: any) {
		return new Promise((resolve, reject) => {
			this._common.post(urls.addCash, formData).subscribe(res => {
				Block.remove('#add-cash-button')
				resolve(formData);
			}, error => {
				reject(error);
				Block.remove('#add-cash-button')
			})
		})
	}

	submitDetails() {
		if (this.addCashForm.valid) {
			Block.circle('#add-cash-button');
			if (this.addCashForm.get('tempImage').value) {
				let file = this.addCashForm.get('tempImage').value;
				const formData: FormData = new FormData();
				formData.append('media', file, file.name);
				this._common.uploadMedia(formData).subscribe(image => {
					this.addCashForm.get('proof').setValue(image.data[0]['id']);
					this.updateDetails(this.addCashForm.value).then(x => {
						this._router.navigate(['/Congratulations'], {
							state: {
								message: `Your order has been placed<br>
								Your account will be credited <br> with in NGN as soon as we verify your order.`
							}
						});
					});
				});
			}
		} else {
			this.addCashForm.markAllAsTouched();
		}
	}

	getCMS() {
		Loading.circle();
		this._common.get(urls.getBankDetails).subscribe(data => {
			this.cmsData = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}
}
