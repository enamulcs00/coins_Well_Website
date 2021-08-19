import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
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
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService, private route: ActivatedRoute, private dialog: MatDialog) {
		this.transactionId = this.route.snapshot.paramMap.get('currency_id');
	}
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [4],
			request_for: [this.transactionId],
			symbol: ['-'],
			bitamount: [0, [Validators.required, Validators.min(0.01)]],
			amount: [0, [Validators.required]],
			ngnamount: [0, [Validators.required]]
		});
		this.getCMS();
		this.addCashForm.get("bitamount").valueChanges.subscribe(value => {
			// console.log("sdsdfsdf");
			if (value == null) {
				value = 0;
			}
			this.addCashForm.get("amount").setValue(this.balanceDetails?.currency?.buy_rate * value);
			this.addCashForm.get("ngnamount").setValue(value * this.ngnValue);

		})
	}

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
		this.updateDetails(this.addCashForm.value).then(x => {
			this._router.navigate(['/Congratulations'], {
				state: {
					message: `Your order has been placed<br>
					Your account will be credited <br> with in `+ this.balanceDetails?.currency?.name + ` as soon as we verify your order.`
				}
			});
		}, error => {
		});
	}

	getCMS() {
		Loading.circle();
		forkJoin({
			balanceDetails: this._common.get(urls.getCryptoSingleBalance + this.transactionId + '/')
		}).subscribe(data => {
			this.balanceDetails = data.balanceDetails.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}