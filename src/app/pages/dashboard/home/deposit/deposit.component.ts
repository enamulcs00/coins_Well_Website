import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-deposit',
	templateUrl: './deposit.component.html',
	styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit, AfterViewInit {
	baseUrl: string = environment.homeURL;
	withdrawRequests: any;
	link  = '';
	@ViewChild('mySelect') matSelect : MatSelect
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		let urls = this._router.url.split('/');
		this.link = urls[urls.length - 1];
		this.getCryoto()
	}
	
	ngAfterViewInit() {
		if(this.link == 'deposit_crypto') {
			setTimeout(()=>{
				this.matSelect.open();
			}, 500);
		}
	}

	getCryoto() {
		Loading.circle();
		this._common.get(urls.getCryptoBalances).subscribe(data => {
			this.withdrawRequests = data.data.filter(x=>{
				if([environment.bitGoCurrencies.TRC20, environment.bitGoCurrencies.PerfectMoney].indexOf(x.currency.id) == -1) {
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
			this._router.navigate(['/dashboard/home/payment/deposit']);
		} else {
			this._router.navigate(['/dashboard/depositcrypto/'+event.value]);
		}
	}

}
