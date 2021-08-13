import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-withdrawcrypto',
	templateUrl: './withdrawcrypto.component.html',
	styleUrls: ['./withdrawcrypto.component.scss']
})
export class WithdrawcryptoComponent implements OnInit {
	bitCoinBalance : any;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this.getWithdrawBalance();
	}

	getWithdrawBalance() {
		Loading.circle();
		this._common.get(urls.bitcoinBalance).subscribe(data => {
			this.bitCoinBalance = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
