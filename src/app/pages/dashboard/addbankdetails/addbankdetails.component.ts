import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Block } from 'notiflix';
import { Observable, Subject } from 'rxjs';
import { loadImage } from 'src/app/_helpers/common.helper';
import { AuthService } from 'src/app/_services/auth.service';
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
	constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService, private _common: CommonService) {
		this.bankForm = this._fb.group({
			bank_name: [null, [Validators.required]],
			account_number: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
			confirm_account: [null, Validators.required]
		}, { validators: MustMatch('account_number', 'confirm_account') });
	}

	ngOnInit(): void {
		this.searchBanks()
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
						return new Observable((resolve => resolve.next(null)));

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
				(err) => {
					this.bankList = [];
					this.bankListLoading = false;
				}
			);
	}

	submitDetails() {
		this.removeSpaces();
		if (this.bankForm.valid) {
			Block.circle('#create-profile-button');
			this._common.post(urls.changeEmail, this.bankForm.value).subscribe(image => {
			}, _ => {
				Block.remove('#create-profile-button');
			});
		} else {
			this.bankForm.markAllAsTouched();
		}
	}

}
