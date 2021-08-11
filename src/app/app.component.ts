import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Notify, Loading, Block, Confirm, Report } from 'notiflix';
import { environment } from 'src/environments/environment';
import { AuthService } from './_services/auth.service';
import { CommonService } from './_services/common.service';
import { urls } from './_services/urls';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
	title = 'coinswellWeb';
	constructor(private _common: CommonService, private _auth: AuthService) {
		Notify.init({
			clickToClose: true,
			position: 'right-bottom',
			fontSize: '15px',
			showOnlyTheLastOne: true,
			messageMaxLength: 50000,
			width: '300px'
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

		//Check if user is logged in or not.
		if (localStorage.getItem(environment.storageKey) != null) {
			let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
			this._common.get(urls.getProfileDetails).subscribe(data => {
				userInfo = {
					...userInfo,
					...data.data
				};
				localStorage.setItem(environment.storageKey, JSON.stringify(userInfo));
				this._auth.onProfileUpdate.next(data);
			})
		}

	}

	ngOnInit() {
		
	}

	ngAfterViewInit() {
		Loading.remove(500);
	}

	

}
