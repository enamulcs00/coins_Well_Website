import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../confirm-pin/confirm-pin.component';

@Component({
	selector: 'app-sell-crypto',
	templateUrl: './sell-crypto.component.html',
	styleUrls: ['./sell-crypto.component.scss']
})
export class SellCryptoComponent implements OnInit {
	transactionId: any;
	addCashForm: FormGroup;
	balanceDetails: any;
	showImage: string | any;
	baseUrl: string = environment.homeURL;
	ngnValue = 500;
	cms: any;
	bitcoin_to_usd = 1800;
	walletAddress: any;
	service_fee: number = 0;
	sellRate: number = 0;
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private route: ActivatedRoute, private dialog: MatDialog) {
		this.transactionId = this.route.snapshot.paramMap.get('currency_id');
		if([environment.bitGoCurrencies.bitcoin, environment.bitGoCurrencies.TRC20, environment.bitGoCurrencies.PerfectMoney, environment.bitGoCurrencies.ERC20].indexOf(Number(this.transactionId)) == -1) {
			this._router.navigate(['/dashboard/home/portfolio/buy']);
		}
	}
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [4],
			request_for: [this.transactionId],
			symbol: ['-'],
			bitamount: [0],
			amount: [0, [Validators.required, Validators.min(0.01)]],
			ngnamount: [0, [Validators.required]],
			service_fee: [0]
		});

		if (this.transactionId == 3 || this.transactionId == 4) {
			this.addCashForm.addControl('tempImage', new FormControl(null, Validators.required));
			this.addCashForm.addControl('proof', new FormControl(null));
			this._common.get(urls.getWalletAddress).subscribe(data => {
				if (this.transactionId == 3) {
					this.walletAddress = data.data[1];
				}
				if (this.transactionId == 4) {
					this.walletAddress = data.data[0];
				}
			})
		}

		this.getCMS();
		this.addCashForm.get("amount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
			if (['1', '2', '3'].indexOf(this.transactionId) != -1) {
				this.service_fee = (value > 0 && value <= 20) ? 100 : ((value > 500) ? 3 : 0)
				if((value >= 1 && value <= 20)) {
					this.sellRate = this.balanceDetails.currency.sell_rate;
					this.addCashForm.get("ngnamount").setValue((this.sellRate * value) - 100);	
				} else if((value > 500)) {
					this.sellRate  = Number(this.balanceDetails.currency.sell_rate) + 3;
					this.addCashForm.get("ngnamount").setValue(this.sellRate * value);
				} else {
					this.sellRate = this.balanceDetails.currency.sell_rate;
					this.addCashForm.get("ngnamount").setValue(this.sellRate * value);
				}
			} else {
				this.sellRate = this.balanceDetails.currency.sell_rate;
				this.addCashForm.get("ngnamount").setValue(this.sellRate * value);
			}
			if (this.transactionId == 1) {
				this.addCashForm.get("bitamount").setValue((1 / this.bitcoin_to_usd) * value);
			}
		});
	}

	copyText() {
		var copyText: any = document.getElementById("myInput");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	}

	getNGNrate() {
		this._common.getCurrencyConversion().subscribe(data => {
			if (data) {
				this.ngnValue = this.balanceDetails?.currency?.sell_rate * data.USD_NGN;
			}
		})
	}


	updateDetails(formData: any) {
		return new Promise((resolve, reject) => {
			if (this, this.transactionId == 3 || this.transactionId == 4) {
				let file = this.addCashForm.get('tempImage').value;
				const formData2: FormData = new FormData();
				formData2.append('media', file, file.name);
				this._common.uploadMedia(formData2).subscribe(image => {
					this.addCashForm.get('proof').setValue(image.data[0]['id']);
					this._common.post(urls.addCash, formData).subscribe(() => {
						Block.remove('#add-cash-button')
						resolve(formData);
					}, error => {
						reject(error);
						Block.remove('#add-cash-button')
					})
				});
			} else {
				this._common.post(urls.addCash, formData).subscribe(() => {
					Block.remove('#add-cash-button')
					resolve(formData);
				}, error => {
					reject(error);
					Block.remove('#add-cash-button')
				})
			}
		})
	}

	submitDetails() {
		if (this.addCashForm.valid) {
			const dialogRef = this.dialog.open(ConfirmPinComponent, {
				disableClose: true
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					this.confirmed();
				}
			});
		} else {
			this.addCashForm.markAllAsTouched();
		}
	}

	confirmed() {
		Block.circle('#add-cash-button');
		this.updateDetails(this.addCashForm.value).then(() => {
			Block.remove('#add-cash-button');
			this._router.navigate(['/Congratulations'], {
				state: {
					message: `Your order has been placed successfully.<br>
					Your Naira wallet would be credited with the <br> equivalent value of `+ this.balanceDetails?.currency?.name + ` we received.`
				}
			});
		}, () => {
			Block.remove('#add-cash-button');
		});
	}

	getCMS() {
		Loading.circle();
		this._common.get(urls.getCryptoSingleBalance + this.transactionId + '/').subscribe(data => {
			this.balanceDetails = data.data;
			this.sellRate = this.balanceDetails.currency.sell_rate;
			this.getNGNrate();
			Loading.remove();
		}, _ => {
			this._router.navigate(['/dashboard/home/portfolio/sell']);
			Loading.remove();
		})
	}

}
