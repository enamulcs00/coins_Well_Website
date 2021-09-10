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
	filteredNotificationsList: any = [];
	customizedNotificationList : any = [];
	constructor(private _common: CommonService, private _router: Router) { }

	ngOnInit(): void {
		this.getTransactions();
		// this._common.updateNotification.subscribe(dta=>{
		// 	this.getTransactions();
		// })
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

			this._common.post(urls.readNotifications,{
				"is_read" : true
			}).subscribe(data=>{
				this._common.updateNotification.next("");
			})
		}, _ => {
			Loading.remove();
		})
	}

	goToDetails(noti: any) {
		if (noti.notification.notification_type == 'Transaction') {
			this._router.navigate(['/dashboard/transactions-details/' + noti.order_id]);
		}
	}
}
