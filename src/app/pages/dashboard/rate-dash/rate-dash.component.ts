import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';


@Component({
	selector: 'rate-dash',
	templateUrl: './rate-dash.component.html',
	styleUrls: ['./rate-dash.component.scss']
})
export class RateDashComponent implements OnInit {
	rates : any;
	imageUrl : string = environment.homeURL;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this.getRates();
	}

	getRates() {
		Loading.circle();
		this._common.get(urls.getAllCurrencies).subscribe(data => {
			this.rates  = data.data;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
