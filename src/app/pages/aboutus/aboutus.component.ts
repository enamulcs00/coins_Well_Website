import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-aboutus',
	templateUrl: './aboutus.component.html',
	styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
	type: string = '';
	cmsContent;
	constructor(private _common: CommonService, private route: ActivatedRoute, private _router: Router) {
		this.type = this.route.snapshot.paramMap.get('type');
		this.route.params.subscribe(() => {
			this.type = this.route.snapshot.paramMap.get('type');
			if (['about_us', 'terms_conditon', 'privacy_policy','features'].indexOf(this.type) == -1) {
				this._router.navigate(['/auth/login']);
			}
			this.ngOnInit();
		})
	}

	ngOnInit(): void {
		this.fetchCMS();
	}

	fetchCMS() {
		this._common.getCMS(urls.getCMS).subscribe(data => {
			this.cmsContent = data;
		})
	}
}
