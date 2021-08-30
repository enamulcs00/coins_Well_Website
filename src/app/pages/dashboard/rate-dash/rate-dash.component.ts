import { Component, OnInit } from '@angular/core';
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
	rates: any;
	imageUrl: string = environment.homeURL;
	cms: any;
	constructor(private _common: CommonService) { }

	ngOnInit(): void {
		this.getRates();
		this._common.getCMS(urls.getCMS).subscribe(data => {
			this.cms = data;
		})
	}

	getRates() {
		Loading.circle();
		this._common.get(urls.getAllCurrencies).subscribe(data => {
			this.rates = data.data.filter(x => Object.values(environment.bitGoCurrencies).indexOf(x.id) != -1);
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

}
