import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
	notificationList: any = [];
	baseUrl: string = environment.homeURL;
	length: number = 10;
	limit: number = 5;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this.getTransactions();
	}

	onPageChange(event) {
		this.getTransactions(event.pageIndex + 1);
	}

	getTransactions(page = 1) {
		Loading.circle();
		this._common.post(urls.getNotification, {
			"length": this.limit,
			"start": ((page - 1) * this.limit) + 1,
		}).subscribe(data => {
			this.notificationList = data.data;
			this.length = data.recordsTotal;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
