import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-troublelogin',
	templateUrl: './troublelogin.component.html',
	styleUrls: ['./troublelogin.component.scss']
})
export class TroubleloginComponent implements OnInit {
	selectedType: string = 'forgot-password';
	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	gotoNext() {
		if (this.selectedType != 'forgot-password') {
			this.router.navigate(['/auth/oldphone']);
		} else {
			this.router.navigate(['/auth/forgotpassword']);
		}
	}
}
