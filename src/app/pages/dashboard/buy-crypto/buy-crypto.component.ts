import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Loading, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../confirm-pin/confirm-pin.component';

@Component({
	selector: 'app-buy-crypto',
	templateUrl: './buy-crypto.component.html',
	styleUrls: ['./buy-crypto.component.scss']
})
export class BuyCryptoComponent implements OnInit {
	transactionId: any;
	addCashForm: FormGroup;
	balanceDetails: any;
	showImage: string | any;
	baseUrl: string = environment.homeURL;
	ngnValue = 500;
	cms: any;
	bitcoin_to_usd = 1800;
	canBuyOrNot: boolean = true;
	userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
	balance : any;
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private route: ActivatedRoute, private dialog: MatDialog, private _auth: AuthService) {
		this.transactionId = this.route.snapshot.paramMap.get('currency_id');
		if ([environment.bitGoCurrencies.bitcoin, environment.bitGoCurrencies.TRC20, environment.bitGoCurrencies.PerfectMoney, environment.bitGoCurrencies.ERC20].indexOf(Number(this.transactionId)) == -1) {
			this._router.navigate(['/dashboard/home/portfolio/buy']);
		}
		this._auth.onProfileUpdate.subscribe(() => {
			this.userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		})
	}

	fetchCryptoBalance() {
		Loading.circle();
		this._common.get(urls.getBalance).subscribe(data => {
			this.balance = data.data.amount;
			this.addCashForm.get('ngnamount').setValidators([Validators.required, Validators.max(this.balance)])
			this.addCashForm.get('ngnamount').markAllAsTouched();
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [3],
			request_for: [Number(this.transactionId)],
			symbol: ['+'],
			bitamount: [0, []],
			amount: [0, [Validators.required, Validators.min(100)]],
			ngnamount: [0, [Validators.required]],
			service_fee: [0]
		});

		this.fetchCryptoBalance();

		if (this.transactionId == 3 || this.transactionId == 4) {
			this.addCashForm.addControl('to_wallet', new FormControl(null, [Validators.required]))
		}

		this.getCMS();
		this.addCashForm.get("amount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
			if (this.transactionId == 1) {
				this.addCashForm.get("bitamount").setValue((value / this.bitcoin_to_usd),{emitEvent: false});
			}
			this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value, {emitEvent: false});
			this.checkAmount();
		});

		this.addCashForm.get("bitamount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
			if (this.transactionId == 1) {
				this.addCashForm.get("amount").setValue(this.bitcoin_to_usd * value,{emitEvent: false});
			}
			this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * this.addCashForm.get("amount").value, {emitEvent: false});
			this.checkAmount();
		});


		this.addCashForm.get("ngnamount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
			this.addCashForm.get("amount").setValue(value / this.balanceDetails?.currency?.buy_rate,{emitEvent: false});
			if (this.transactionId == 1) {
				this.addCashForm.get("bitamount").setValue(this.addCashForm.get("amount").value / this.bitcoin_to_usd, {emitEvent: false});
			}
			this.checkAmount();
		});
	}

	checkAmount() {
		let value = this.addCashForm.get('amount').value;
		if ((value > 100 || this.balanceDetails.transaction_limit_used) && (this.userInfo.document_verification != 4 || this.userInfo.facial_verification != 4)) {
			this.canBuyOrNot = false;
		} else {
			this.canBuyOrNot = true;
		}
	}
	

	// onAmountChange(){
	// 	let value = this.addCashForm.get('amount').value;
	// 	console.log("value",value);
	// 	if (value == null) {
	// 		value = 0;
	// 	}
	// 	if (value > 100 && (this.userInfo.document_verification != 4 || this.userInfo.facial_verification != 4)) {
	// 		this.canBuyOrNot = false;
	// 	} else {
	// 		this.canBuyOrNot = true;
	// 	}
	// 	if (this.transactionId == 1) {
	// 		this.addCashForm.get("bitamount").setValue((1 / this.bitcoin_to_usd) * value);
	// 		this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value);
	// 	} else {
	// 		this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value);
	// 	}
	// }


	// onBitAmountChange(e){
	// 	let value = this.addCashForm.get('bitamount').value;
	// 	if (value == null) {
	// 		value = 0;
	// 	}
	// 	if (this.transactionId == 1) {
	// 		this.addCashForm.get("amount").setValue((this.bitcoin_to_usd) / value);
	// 		// this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value);
	// 	} else {
	// 		// this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value);
	// 	}
	// }

	getNGNrate() {
		this._common.getCurrencyConversion().subscribe(data => {
			if (data) {
				this.ngnValue = this.balanceDetails?.currency?.buy_rate * data.USD_NGN;
			}
		})
	}


	updateDetails(formData: any) {
		return new Promise((resolve, reject) => {
			this._common.post(urls.addCash, formData).subscribe(() => {
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
			if(this.canBuyOrNot) {
				const dialogRef = this.dialog.open(ConfirmPinComponent, {
					disableClose: true
				});
				dialogRef.afterClosed().subscribe(result => {
					if (result) {
						this.confirmed();
					}
				});
			} else {
				Notify.failure("Please verify your account to make an order of more than 100 dollars.");
			}
		} else {
			this.addCashForm.markAllAsTouched();
		}
	}

	confirmed() {
		Block.circle('#add-cash-button');
		this.updateDetails(this.addCashForm.value).then(() => {
			this._router.navigate(['/Congratulations'], {
				state: {
					message: `Your order has been placed successfully.<br>
					Note this order could take sometime if the value order is not available on our hot wallet.`
				}
			});
		}, () => {
		});
	}

	getCMS() {
		Loading.circle();
		this._common.get(urls.getCryptoSingleBalance + this.transactionId + '/').subscribe(data => {
			this.balanceDetails = data.data;
			this.getNGNrate();
			Loading.remove();
		}, _ => {
			this._router.navigate(['/dashboard/home/portfolio/buy']);
			Loading.remove();
		})
	}
}
