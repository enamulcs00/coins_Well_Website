import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-buy',
	templateUrl: './buy.component.html',
	styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
	baseUrl : string = environment.homeURL;
	withdrawRequests: any;
	constructor(private _common: CommonService, private _router : Router) { }

	ngOnInit(): void {
		this.getCryoto();
	}

	getCryoto() {
		Loading.circle();
		this._common.get(urls.getCryptoBalances).subscribe(data => {
			this.withdrawRequests = data.data.filter(x=>{
				if([environment.bitGoCurrencies.bitcoin, environment.bitGoCurrencies.TRC20, environment.bitGoCurrencies.PerfectMoney, environment.bitGoCurrencies.ERC20].indexOf(x.currency.id) != -1) {
					return true
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
		if(event.value == 'ngn') {
			this._router.navigate(['/dashboard/home/payment/withdrawal']);
		} else {
			this._router.navigate(['/dashboard/buy/'+event.value]);
		}
	}

}
