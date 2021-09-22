import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-company-type',
	templateUrl: './company-type.component.html',
	styleUrls: ['./company-type.component.scss']
})
export class CompanyTypeComponent implements OnInit {
	link = 'privacy_policy';
	cmsData: any;
	security: any;
	Fee: any;
	baseUrl : string = environment.homeURL;
	constructor(private _router: Router, private _common: CommonService) {
		this._router.events.subscribe((val) => {
			let urls = this._router.url.split('/');
			this.link = urls[urls.length - 1];
			window.scrollTo(0, 0);
		})
		let urls = this._router.url.split('/');
		this.link = urls[urls.length - 1];
	}

	ngOnInit(): void {
		this._common.getCMS(urls.getCMS).subscribe(data => {
			this.cmsData = data;
			console.log(this.cmsData);
			this.security=JSON.parse(this.cmsData?.security);
			this.Fee=JSON.parse(this.cmsData?.Fee);
		}, (error) => {
			console.log("Internal Server", error);
		});
	}
}
