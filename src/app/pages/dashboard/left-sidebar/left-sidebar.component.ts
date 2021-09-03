import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Confirm, Loading, Notify } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-left-sidebar',
	templateUrl: './left-sidebar.component.html',
	styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
	user_unread_notification_count: any;
	updateCount: number = 0;
	constructor(private router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this._common.updateNotification.subscribe(() => {
			this._common.get(urls.getNotificationCount).subscribe(data => {
				this.updateCount = data.data.user_unread_notification_count;
			}, () => {
				Notify.failure("Unable to get the notification count.")
			})
		})
	}

	logoutMe() {
		Confirm.show('Logout', 'Do you want to logout ?', 'Yes', 'No', () => {
			localStorage.removeItem(environment.storageKey);
			this.router.navigate(['/auth']);
		}, () => {
			// No button callbackalert('If you say so...');
		});
	}
}
