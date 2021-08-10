import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block, Confirm, Loading, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

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
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService) { }
	ngOnInit(): void {
		this.addCashForm = this._fb.group({
			request_type: [2],
			symbol: ['-'],
			amount: [null, [Validators.required, Validators.min(1)]],
			bankId : [null, Validators.required]
 		});
		this.getBanks();
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
		if(this.addCashForm.value.amount != 0 && this.addCashForm.value.amount != '' && this.addCashForm.value.amount != null && this.addCashForm.value.amount != undefined && this.addCashForm.invalid) {
			Notify.failure("Please select bank first.");
		}
		if (this.addCashForm.valid) {
			Block.circle('#add-cash-button');
			this.updateDetails(this.addCashForm.value).then(x => {
				this._router.navigate(['/Congratulations'], {
					state: {
						message: `Your order has been placed<br>
						Your account will be credited <br> with in NGN as soon as we verify your order.`
					}
				});
			});
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

	deleteBank(index) {
		Confirm.show('Delete Bank', 'Do you want to delete the selected bank account ?', 'Yes', 'No', () => {
			this._common.delete(urls.deleteBank).subscribe(res => {
				Notify.success("Bank account deleted successfully.");
				this.bankList.splice(1, index);
			}, _ => {
				Block.remove('#setup-password-button');
			})
		}, () => {
			// No button callbackalert('If you say so...');
		});
	}
}
