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
	isMaintenace: boolean = false;
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
		this.checkMaintenance();
	}

	permitToNotify() {
		const messaging = firebase.messaging();
		messaging.onMessage(() => {
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

	checkMaintenance() {
		this._common.get(urls.checkMaintenace).subscribe((data) => {
			this.isMaintenace = data.data.maintainance;
		})
		setInterval(() => {
			this._common.get(urls.checkMaintenace).subscribe((data) => {
				this.isMaintenace = data.data.maintainance;
			})
		}, 15000);
	}

	fetchCMS() {
		this._common.getCMS(urls.getCMS).subscribe(() => {
		})
	}

	ngOnInit() {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		if (userInfo != null) {
			setTimeout(() => {
				const messaging = firebase.messaging();
				messaging
					.requestPermission()
					.then(() => {
						messaging.getToken().then((token: any) => {
							this._auth.firebaseToken = token;
							this._common.post(urls.updateToken, {
								device_type: 'WEB',
								device_token: this._auth.firebaseToken
							}).subscribe();
							messaging.onMessage(() => {
							})
						}).catch(() => {
							// Notify.failure("Unable to get permission to notify.");
						})
					})
					.catch(() => {
						// Notify.failure("Unable to get permission to notify.");
					});
			}, 10000);
		}
	}

	ngAfterViewInit() {
		Loading.remove(500);
		document.onclick = (event : any)=>{
			if(event.target.tagName == 'BUTTON') {
				setTimeout(()=>{
					if(document.getElementsByTagName('mat-error').length > 0) {
						var elmnt : any = document.getElementsByTagName('mat-form-field')[0].parentElement; 
						window.scrollTo({
							top :  elmnt.offsetTop 
						});
					}
				},300);
			}
		};
	}

	doScrolling(elementY, duration) { 
		var startingY = window.pageYOffset;
		var diff = elementY - startingY;
		var start;
	  
		// Bootstrap our animation - it will get called right before next frame shall be rendered.
		window.requestAnimationFrame(function step(timestamp) {
		  if (!start) start = timestamp;
		  // Elapsed milliseconds since start of scrolling.
		  var time = timestamp - start;
		  // Get percent of completion in range [0, 1].
		  var percent = Math.min(time / duration, 1);
	  
		  window.scrollTo(0, startingY + diff * percent);
	  
		  // Proceed with animation as long as we wanted it to.
		  if (time < duration) {
			window.requestAnimationFrame(step);
		  }
		})
	  }

}
