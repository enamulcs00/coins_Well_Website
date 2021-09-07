import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
	baseUrl: string = environment.homeURL;
	withdrawRequests: any;
	balance : any;
	constructor(private _router: Router, private _common: CommonService) { 
	}

	ngOnInit(): void {
		this.getCryoto();
		this._common.get(urls.getBalance).subscribe(data => {
			this.balance = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	getCryoto() {
		Loading.circle();
		this._common.get(urls.getCryptoBalances).subscribe(data => {
			this.withdrawRequests = data.data.filter(x => {
				if ([environment.bitGoCurrencies.TRC20, environment.bitGoCurrencies.PerfectMoney, 5].indexOf(x.currency.id) == -1) {
					return true;
				} else {
					return false;
				}
			});
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	onChanged(event) {
		if (event.value == 'ngn') {
			this._router.navigate(['/dashboard/home/payment/withdrawal']);
		} else {
			this._router.navigate(['/dashboard/withdrawcryto/' + event.value]);
		}
	}

}
