import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	userInfo : any = JSON.parse(localStorage.getItem(environment.storageKey));
	constructor(public _auth: AuthService) {
		console.log("userInfo",this.userInfo);
	}

	ngOnInit(): void {
		this._auth.onLogin.subscribe(x=>{
			this.userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		})
	}

}
