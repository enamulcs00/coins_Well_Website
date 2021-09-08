import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';

@Component({
	selector: 'app-content-show',
	templateUrl: './content-show.component.html',
	styleUrls: ['./content-show.component.scss']
})
export class ContentShowComponent implements OnInit {
	link = 'withdraw';
	constructor(private _router: Router, private _common: CommonService) {
		this._router.events.subscribe((val) => {
			let urls = this._router.url.split('/');
			this.link = urls[urls.length - 1];
		})
		let urls = this._router.url.split('/');
		this.link = urls[urls.length - 1];
	}

	ngOnInit(): void {
	}

}
