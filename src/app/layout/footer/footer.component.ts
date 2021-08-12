import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	userInfo: any = JSON.parse(localStorage.getItem(environment.storageKey));
	constructor(public _common: CommonService, public _auth: AuthService) { }

	ngOnInit(): void {
		this._auth.onLogin.subscribe(x => {
			this.userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		})

		this._auth.onProfileUpdate.subscribe(x => {
			this.userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		})
	}

}
