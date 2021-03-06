import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { forkJoin } from 'rxjs';
import { TwoFactorVerifyComponent } from 'src/app/two-factor/two-factor-verify/two-factor-pin.component';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../../confirm-pin/confirm-pin.component';

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
	cms : any;
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private dialog : MatDialog) { }
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			tempImage: [null, Validators.required],
			proof: [null],
			request_type: [1],
			symbol: ['+'],
			ngnamount: [0, [Validators.required, Validators.min(0.01)]]
		});
		this.getCMS();
	}

	copyText() {
		var copyText : any = document.getElementById("myInput");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	}

	updateDetails(formData: any) {
		return new Promise((resolve, reject) => {
			this._common.post(urls.addCashNew, formData).subscribe(() => {
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
			this.askForPin();
			// let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
			// if(userInfo) {
			// 	const dialogRef = this.dialog.open(TwoFactorVerifyComponent, {
			// 		disableClose: true
			// 	});
			// 	dialogRef.afterClosed().subscribe(result => {
			// 		if (result) {
			// 			this.askForPin();
			// 		}
			// 	});
			// } else {
			// 	this.askForPin();
			// }
		} else {
			this.addCashForm.markAllAsTouched();
		}
	}

	askForPin() {
		const dialogRef = this.dialog.open(ConfirmPinComponent, {
			disableClose : true
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				Block.circle('#add-cash-button');
				if (this.addCashForm.get('tempImage').value) {
					let file = this.addCashForm.get('tempImage').value;
					const formData: FormData = new FormData();
					formData.append('media', file, file.name);
					this._common.uploadMedia(formData).subscribe(image => {
						this.addCashForm.get('proof').setValue(image.data[0]['id']);
						this.updateDetails(this.addCashForm.value).then(() => {
							this._router.navigate(['/Congratulations'], {
								state: {
									message: `Your order has been placed<br>
									Your account will be credited <br> with in NGN as soon as we verify your order.`
								}
							});
						},() => {
						});
					});
				}
			}
		});
	}

	getCMS() {
		Loading.circle();
		forkJoin({
			cmsData : this._common.get(urls.getBankDetails),
			cms : this._common.getCMS(urls.getCMS)
		}).subscribe(data => {
			this.cmsData = data.cmsData.data;
			this.cms = data.cms;
			Loading.remove();
		}, () => {
			Loading.remove();
		})
	}
}
