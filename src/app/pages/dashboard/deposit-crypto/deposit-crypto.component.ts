import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Notiflix, { Block, Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ConfirmPinComponent } from '../confirm-pin/confirm-pin.component';
import { CurrencyMaskInputMode } from "ngx-currency";
import { TwoFactorVerifyComponent } from 'src/app/two-factor/two-factor-verify/two-factor-pin.component';
declare var QRCode: any;
@Component({
	selector: 'app-deposit-crypto',
	templateUrl: './deposit-crypto.component.html',
	styleUrls: ['./deposit-crypto.component.scss']
})
export class DepositCryptoComponent implements OnInit, AfterViewInit {
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
			this._router.navigate(['/dashboard/home/portfolio/deposit']);
		}

	}

	ngAfterViewInit() {
		// JsBarcode("#barcode", "TSjQAg8vY6hL3ZCq86DrsTJfr7M5vniBrR", {
		// 	height : 120,
		// 	text: "a",
		// 	fontSize : 0
		// });
	}

	copyText() {
		var copyText: any = document.getElementById("myInput");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	}

	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [1],
			request_for: [this.transactionId],
			symbol: ['+'],
			bitamount: [null, [Validators.required, Validators.min(0.00000000000000001)]],
			service_fee: [0]
		});
		this.getCMS();
		this.addCashForm.get("bitamount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
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
			let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
			if(userInfo.is_suspended) {
				Notiflix.Notify.failure("Your account is suspended. Please contact to admin")
				return;
			}
			const dialogRef = this.dialog.open(ConfirmPinComponent, {
				disableClose: true
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					if(userInfo) {
						const dialogRef2 = this.dialog.open(TwoFactorVerifyComponent, {
							disableClose: true
						});
						dialogRef2.afterClosed().subscribe(result => {
							if (result) {
								this.confirmed();
							}
						});
					} else {
						this.confirmed();
					}
				}
			});
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
			new QRCode(document.getElementById("barcode"), {
				text: data.data.user_bitgo_wallet_address,
				width: 150,
				height: 150,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});
			this.getNGNrate();
			Loading.remove();
		}, _ => {
			this._router.navigate(['/dashboard/home/portfolio/deposit']);
			Loading.remove();
		})
	}
}
