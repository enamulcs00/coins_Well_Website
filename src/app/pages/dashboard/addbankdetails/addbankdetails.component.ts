import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Block, Loading, Notify } from 'notiflix';
import { Subject } from 'rxjs';
import { showErrors } from 'src/app/_helpers/common.helper';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { ValidString } from 'src/app/_validators/string';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-addbankdetails',
	templateUrl: './addbankdetails.component.html',
	styleUrls: ['./addbankdetails.component.scss']
})
export class AddbankdetailsComponent implements OnInit {
	bankForm: FormGroup;
	bankList: any = [];
	public bankListEvent = new Subject<string>();
	bankListLoading: boolean = false;
	baseUrl: string = environment.homeURL;
	bankId : any;
	userInfo : any = JSON.parse(localStorage.getItem(environment.storageKey));
	showError = showErrors;
	constructor(private _router: Router, private _fb: FormBuilder, private _common: CommonService, private route : ActivatedRoute) {
		this.bankId = this.route.snapshot.paramMap.get('bank_id');
		this.bankForm = this._fb.group({
			bank_name: [null, [Validators.required]],
			account_holder_name : [this.userInfo.first_name+' '+this.userInfo.last_name, [Validators.required, ValidString]],
			account_number: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
			confirm_account: [null, Validators.required]
		}, { validators: MustMatch('account_number', 'confirm_account') });
	}

	ngOnInit(): void {
		if(this.bankId) {
			this.getBankDetails();
		}
		this.searchBanks();
	}

	getBankDetails() {
		Loading.circle();
		this._common.get(urls.getBankInfo+this.bankId+'/').subscribe(data=>{
			this.bankList = [data.data.bank_name];
			this.bankForm.patchValue({
				account_holder_name : data.data.account_holder_name,
				account_number : data.data.account_number,
				confirm_account : data.data.account_number,
				bank_name : data.data.bank_name.id
			});
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	removeSpaces() {
		Object.keys({
			'account_number': null,
			'confirm_account': null
		}).forEach(item => {
			if (this.bankForm.controls[item].value) {
				this.bankForm.controls[item].setValue(this.bankForm.controls[item].value.trim());
			}
		})
	}

	searchBanks() {
		this.bankListEvent
			.pipe(
				distinctUntilChanged(),
				debounceTime(200),
				switchMap((term) => {
					this.bankListLoading = true;
					if (term && term != '') {
						return this._common.get(urls.searchBank + `${term}/`);
					} else {
						return this._common.get(urls.searchBank + `b/`);
					}
				})
			)
			.subscribe(
				(items) => {
					this.bankListLoading = false;
					if (items) {
						this.bankList = items.data;
					}
				},
				() => {
					// this.bankList = [];
					this.bankListLoading = false;
				}
			);
	}

	submitDetails() {
		this.removeSpaces();
		if (this.bankForm.valid) {
			Block.circle('#add-bank-account-button');
			if(this.bankId) {
				this._common.put(urls.updateBankAccount+''+this.bankId+'/', this.bankForm.value).subscribe(_ => {
					Block.remove('#add-bank-account-button');
					this._router.navigate(['/dashboard/payment/withdrawal'])
					Notify.success("Bank information updated successfully.");
				}, _ => {
					Block.remove('#add-bank-account-button');
				});
			} else {
				this._common.post(urls.addBankAccount, this.bankForm.value).subscribe(_ => {
					Block.remove('#add-bank-account-button');
					this._router.navigate(['/dashboard/payment/withdrawal'])
					Notify.success("Bank added successfully.");
				}, _ => {
					Block.remove('#add-bank-account-button');
				});
			}
		} else {
			this.bankForm.markAllAsTouched();
		}
	}

}
