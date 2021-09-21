import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-landingpage',
	templateUrl: './landingpage.component.html',
	styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements AfterViewInit {
	userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
	constructor() { }

	ngAfterViewInit(): void {
		AOS.init({
			once: true,
		});
	}
}
