import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading, } from 'notiflix';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-refer',
	templateUrl: './refer.component.html',
	styleUrls: ['./refer.component.scss']
})
export class ReferComponent {
	baseUrl: string = environment.homeURL;
	referCode: any;
	referAmount : any;
	constructor(private _router: Router, private _common: CommonService, private route: ActivatedRoute) {
		this.getDetails();
	}

	getDetails() {
		Loading.circle();
		forkJoin({
			getReferalCode : this._common.get(urls.getReferalCode),
			getReferAmount : this._common.get(urls.getReferAmount)
		}).subscribe(data => {
			this.referCode = data.getReferalCode.data.referral_code;
			this.referAmount = data.getReferAmount.data.amount;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	copyText() {
		var copyText : any = document.getElementById("myInput");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
		console.log("copyText");
	}

}
