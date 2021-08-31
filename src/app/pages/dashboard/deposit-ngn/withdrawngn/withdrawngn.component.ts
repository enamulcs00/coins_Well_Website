import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Block, Confirm, Loading, Notify } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../../confirm-pin/confirm-pin.component';

@Component({
	selector: 'app-withdrawngn',
	templateUrl: './withdrawngn.component.html',
	styleUrls: ['./withdrawngn.component.scss']
})
export class WithdrawngnComponent implements OnInit {
	addCashForm: FormGroup;
	bankList: any = [];
	showImage: string | any;
	baseUrl: string = environment.homeURL;
	selectedBank : string = '';
	userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private dialog : MatDialog) { }
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [2],
			symbol: ['-'],
			ngnamount: [0, [Validators.required, Validators.min(0.01)]],
			bank : [null, Validators.required]
 		});
		this.getBanks();
		if(this.userInfo.user_bitgo_wallet_address.length > 0) {
			this.fetchCryptoBalance();
		}
	}

	fetchCryptoBalance() {
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
		if(this.addCashForm.value.amount != 0 && this.addCashForm.value.amount != '' && this.addCashForm.value.amount != null && this.addCashForm.value.amount != undefined && this.addCashForm.invalid) {
			Notify.failure("Please select bank first.");
		}
		if (this.addCashForm.valid) {
			if (this.addCashForm.valid) {
				const dialogRef = this.dialog.open(ConfirmPinComponent, {
					disableClose : true
				});
				dialogRef.afterClosed().subscribe(result => {
					if(result) {
						Block.circle('#add-cash-button');
						this.updateDetails(this.addCashForm.value).then(() => {
							this._router.navigate(['/Congratulations'], {
								state: {
									message: `Your order has been placed<br>
									Your account will be debited <br> with in NGN as soon as we verify your order.`
								}
							});
						});
					}
				});
			} else {
				this.addCashForm.markAllAsTouched();
			}	
		} else {
			this.addCashForm.markAllAsTouched();
		}
	}

	getBanks() {
		Loading.circle();
		this._common.get(urls.getBanks).subscribe(data => {
			this.bankList = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	deleteBank(index: string | number) {
		Confirm.show('Delete Bank', 'Do you want to delete the selected bank account ?', 'Yes', 'No', () => {
			this._common.delete(urls.deleteBank+this.bankList[index]['id']+'/').subscribe(() => {
				Notify.success("Bank account deleted successfully.");
				this.getBanks();
			}, _ => {
				Block.remove('#setup-password-button');
			})
		}, () => {
			// No button callbackalert('If you say so...');
		});
	}
}
