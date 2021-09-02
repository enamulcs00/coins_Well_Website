import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../confirm-pin/confirm-pin.component';
import { CurrencyMaskInputMode } from "ngx-currency";
@Component({
	selector: 'app-withdrawcrypto',
	templateUrl: './withdrawcrypto.component.html',
	styleUrls: ['./withdrawcrypto.component.scss']
})
export class WithdrawcryptoComponent implements OnInit {
	transactionId: any;
	addCashForm: FormGroup;
	balanceDetails: any;
	showImage: string | any;
	baseUrl: string = environment.homeURL;
	ngnValue = 500;
	bitCoinPrice: number = 1800;
	cms: any;
	temp = CurrencyMaskInputMode;
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private route: ActivatedRoute, private dialog: MatDialog) {
		this.transactionId = this.route.snapshot.paramMap.get('currency_id');

		if ([environment.bitGoCurrencies.TRC20, environment.bitGoCurrencies.PerfectMoney].indexOf(Number(this.transactionId)) != -1) {
			this._router.navigate(['/dashboard/home/portfolio/withdraw']);
		}

	}
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [2],
			request_for: [this.transactionId],
			symbol: ['-'],
			bitamount: [null, [Validators.required, Validators.min(0.00000000000000001)]],
			amount: [0, [Validators.required]],
			to_wallet: [null, [Validators.required]],
			fee: [0]
		});
		this.getCMS();
		this.addCashForm.get("bitamount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
			this.addCashForm.get("amount").setValue(this.bitCoinPrice * value);
			this.addCashForm.get('fee').setValue(
				((this.addCashForm.get("amount").value * 0.15) / 100)
			)
		})
	}

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
		console.log("this.addCashForm.value", this.addCashForm.value);
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
			Loading.remove();
			this._router.navigate(['/dashboard/home/portfolio/withdraw']);
		})
	}

}
