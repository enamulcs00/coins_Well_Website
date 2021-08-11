import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-balance',
	templateUrl: './balance.component.html',
	styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
	link = 'withdraw';
	balance: any;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		let urls = this._router.url.split('/');
		this.link = urls[urls.length - 1];
		this.getCMS();
	}

	getCMS() {
		Loading.circle();
		this._common.get(urls.getBalance).subscribe(data => {
			this.balance = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}
}
