import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
	transactionList : any = [];
	baseUrl : string = environment.homeURL;
	length : number = 10;
	limit : number = 5;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this.getTransactions();
	}

	onPageChange(event) {
		this.getTransactions(event.pageIndex + 1);
	}

	getTransactions(page = 1) {
		Loading.circle();
		this._common.post(urls.getTransactions,  {
			"length":this.limit,
			"start": ((page -1) * this.limit) + 1,
			"filter_type": 3
		}).subscribe(data => {
			this.transactionList = data.data;
			this.length = data.recordsTotal;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
