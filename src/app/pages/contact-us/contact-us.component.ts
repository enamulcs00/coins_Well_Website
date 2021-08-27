import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
	cmsContent;
	constructor(private _common: CommonService) {
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
