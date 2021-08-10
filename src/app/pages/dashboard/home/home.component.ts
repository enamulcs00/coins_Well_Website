import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	link = 'withdraw';
	cmsData : any;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		let urls = this._router.url.split('/');
		this.link = urls[urls.length - 1];
		this.getCMS();
	}

	getCMS() {
		Loading.circle();
		this._common.get(urls.getAllCurrencies).subscribe(data => {
			this.cmsData = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
