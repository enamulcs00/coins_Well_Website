import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	link = 'withdraw';
	constructor(private router: Router) {}

	ngOnInit(): void {
		let urls = this.router.url.split('/');
		this.link = urls[urls.length - 1];
		// console.log("This/", );
	}

}
