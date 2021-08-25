import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { forkJoin } from 'rxjs';
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
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private route: ActivatedRoute, private dialog: MatDialog) {
		this.transactionId = this.route.snapshot.paramMap.get('currency_id');
	}
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [3],
			request_for: [this.transactionId],
			symbol: ['+'],
			bitamount: [0, []],
			amount: [0, [Validators.required,  Validators.min(0.01)]],
			ngnamount: [0, [Validators.required]],
			service_fee : [0]
		});

		if(this.transactionId == 3 || this.transactionId == 4) {
			this.addCashForm.addControl('to_wallet',new FormControl(null, [Validators.required]))
		}

		this.getCMS();
		this.addCashForm.get("amount").valueChanges.subscribe(value => {
			if (value == null) {
				value = 0;
			}
			
			if(['1','2','3'].indexOf(this.transactionId) != -1) {
				console.log("valye", value);
				this.addCashForm.get('service_fee').setValue(
					(value > 0 && value <= 20)?100:((value > 500)?3:0)
				)
			}
			
			if(this.transactionId == 1) {
				this.addCashForm.get("bitamount").setValue((1/this.bitcoin_to_usd) * value);
				this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value);
			} else {
				this.addCashForm.get("ngnamount").setValue(this.balanceDetails?.currency?.buy_rate * value);
			}
		});
	}

	getNGNrate() {
		this._common.getCurrencyConversion().subscribe(data => {
			if(data) {
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
				disableClose : true
			});
			dialogRef.afterClosed().subscribe(result => {
				if(result) {
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
		forkJoin({
			balanceDetails: this._common.get(urls.getCryptoSingleBalance + this.transactionId + '/')
		}).subscribe(data => {
			this.balanceDetails = data.balanceDetails.data;
			this.getNGNrate();
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}
}
