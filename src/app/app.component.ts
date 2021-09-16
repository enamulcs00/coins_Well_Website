import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Notify, Loading, Block, Confirm, Report } from 'notiflix';
import { environment } from 'src/environments/environment';
import { AuthService } from './_services/auth.service';
import { CommonService } from './_services/common.service';
import { urls } from './_services/urls';
import firebase from "firebase/app";
import "firebase/messaging";
import { SwPush, SwUpdate } from '@angular/service-worker';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
	title = 'coinswellWeb';
	serviceWorkerAttempt = 0;
	constructor(private _common: CommonService, private _auth: AuthService, public updates: SwUpdate, public push: SwPush) {
		this.loadFiles();
		this.fetchInfo();

		//Check if user is logged in or not.
		navigator.serviceWorker.register("ngsw-worker.js");
		firebase.initializeApp(environment.firebaseConfig);
		const setInt = () => {
			navigator.serviceWorker.getRegistration().then((swr: any) => {
				this.serviceWorkerAttempt++;
				if (swr != undefined) {
					firebase.messaging().useServiceWorker(swr);
					setTimeout(() => {
						this.permitToNotify();
					}, 2000)
				} else {
					if (this.serviceWorkerAttempt > 0 && this.serviceWorkerAttempt < 20) {
						setInt();
					}
				}
			});
		};
		setInt();
		updates.available.subscribe((_) =>
			updates.activateUpdate().then(() => {
				// console.log("reload for update");
				document.location.reload();
			})
		);
		push.messages.subscribe((msg) => {
			this._common.updateNotification.next("");
			// console.log("push message", msg);
		});
		push.notificationClicks.subscribe((click) => {
			// console.log("notification click", click);
		});
		self.addEventListener("notificationclick", function (event: any) {
			// console.log("Not Working");
			event.notification.close();
		});
	}

	permitToNotify() {
		const messaging = firebase.messaging();
		messaging.onMessage(()=>{
		})
	}

	listenEvents() {

	}

	fetchInfo() {
		this._common.updateProfileInfo();
		this.fetchCMS();
	}

	loadFiles() {
		Notify.init({
			clickToClose: true,
			position: 'right-bottom',
			fontSize: '15px',
			showOnlyTheLastOne: true,
			messageMaxLength: 50000,
			width: '300px',
			zindex: 999999
		})
		Loading.init({
			svgColor: '#17C2EC'
		})
		Block.init({
			svgColor: '#17C2EC'
		})
		Confirm.init({
			titleColor: "#17C2EC",
			okButtonBackground: "#17C2EC"
		})
		Report.init({
			svgSize: '60px',
			success: {
				svgColor: "#17C2EC",
				titleColor: '#17C2EC',
				buttonBackground: '#17C2EC',
				buttonColor: '#fff'
			}
		})
		Loading.pulse();
	}

	fetchCMS() {
		this._common.getCMS(urls.getCMS).subscribe(() => {
		})
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		Loading.remove(500);
	}

}
