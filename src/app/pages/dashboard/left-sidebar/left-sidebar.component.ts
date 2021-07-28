import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Confirm } from 'notiflix';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-left-sidebar',
	templateUrl: './left-sidebar.component.html',
	styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

	constructor(private router : Router) { }

	ngOnInit(): void {
	}

	logoutMe() {
		Confirm.show('Logout', 'Do you want to logout ?', 'Yes', 'No', () => {
			localStorage.removeItem(environment.storageKey);
			this.router.navigate(['/auth']);
		}, () => {
			// No button callbackalert('If you say so...');
		});
	}
}
