import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-faq',
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
	baseUrl: string = environment.homeURL;
	faqList: any;
	constructor(private _router: Router, private _common: CommonService, private route: ActivatedRoute) {
		this.getDetails();
	}

	getDetails() {
		Loading.circle();
		this._common.get(urls.getFaq).subscribe(data => {
			this.faqList = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}
}