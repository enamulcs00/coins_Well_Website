import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
	constructor(private _router : Router) { }
	timoutIns : any;
	ngOnInit(): void {
		this.timoutIns = setTimeout(()=>{
			this._router.navigate(['/auth/login']);
		},3000);
	}

	ngOnDestroy() {
		if(this.timoutIns) {
			clearTimeout(this.timoutIns);
		}
	}

}
