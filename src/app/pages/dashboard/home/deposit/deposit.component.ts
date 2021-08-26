import { Component, OnInit } from '@angular/core';
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
export class DepositComponent implements OnInit {
	baseUrl: string = environment.homeURL;
	withdrawRequests: any;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this.getCryoto()
	}

	getCryoto() {
		Loading.circle();
		this._common.get(urls.getCryptoBalances).subscribe(data => {
			this.withdrawRequests = data.data;
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
