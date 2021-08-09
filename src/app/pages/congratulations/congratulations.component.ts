import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-congratulations',
	templateUrl: './congratulations.component.html',
	styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {
	message : string = '';
	constructor(private _router : Router) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.message != "undefined") {
			this.message = this._router.getCurrentNavigation().extras.state.message;
		} else {
			this._router.navigate(['/dashboard']);
		}
	}

	ngOnInit(): void {
	}

}
