import { AfterViewInit, Component } from '@angular/core';
import { Notify, Loading, Block } from 'notiflix';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
	title = 'coinswellWeb';
	constructor() {
		Notify.init({
			clickToClose: true,
			position: 'right-bottom',
			closeButton: true,
			fontSize: '15px',
			showOnlyTheLastOne: true
		})
		Loading.init( {
			svgColor : '#17C2EC'
		})

		Block.init({
			svgColor : '#17C2EC'
		})
		Loading.pulse();
	}

	ngAfterViewInit() {
		Loading.remove(500);
	}

}
