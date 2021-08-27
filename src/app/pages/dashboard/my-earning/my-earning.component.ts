import { Component, OnInit } from '@angular/core';
import { Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-my-earning',
	templateUrl: './my-earning.component.html',
	styleUrls: ['./my-earning.component.scss']
})
export class MyEarningComponent implements OnInit {
	transactionList: any = [];
	baseUrl: string = environment.homeURL;
	finalEarning : any = 0;
	constructor(private _common: CommonService) { }

	ngOnInit(): void {
		this.getTransactions();
		// this._common.callBitGoAPI('users/me.json').subscribe(data => {
		// 	console.log("Woro");
		// 	Loading.remove();
		// }, _ => {
		// 	Loading.remove();
		// })
		//Call ZendDesk API
		// var request = new XMLHttpRequest();
		// var url = 'https://your_subdomain.zendesk.com/api/v2/tickets.json';
		// request.open('GET', url, true);
		// request.setRequestHeader("Authorization", "Bearer " + environment.zenDeskSec);
		// request.send();
		// user.authdata = window.btoa(username + ':' + password);

	}


	getTransactions(_page = 1) {
		Loading.circle();
		this._common.get(urls.getEarnigs).subscribe(data => {
			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			this.transactionList = (data.data != null)?data.data:[];
			var temps = this.transactionList.map(x=> {
				return x.amount;
			});

			if(temps.length > 0 ){
				this.finalEarning = temps.reduce(reducer);
			} else {
				this.finalEarning = 0;
			}
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}
}
