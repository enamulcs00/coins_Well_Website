import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-withdraw',
	templateUrl: './withdraw.component.html',
	styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
	withdrawRequests : any;
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


}
