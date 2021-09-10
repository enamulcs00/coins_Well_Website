import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-transaction-details',
	templateUrl: './transaction-details.component.html',
	styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {
	baseUrl : string = environment.homeURL;
	transactionDetails: any;
	transactionId : number | string | null;
	constructor(private _common: CommonService, private route : ActivatedRoute) {
		this.transactionId = this.route.snapshot.paramMap.get('transactionId');
		this.getDetails();
	}
	
	getDetails() {
		Loading.circle();
		this._common.get(urls.getSingleTransaction+this.transactionId+'/').subscribe(data => {
			this.transactionDetails = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
