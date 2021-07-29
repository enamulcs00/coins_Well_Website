import { AfterViewInit, Component } from '@angular/core';
import { Notify, Loading, Block, Confirm, Report } from 'notiflix';

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
			// closeButton: true,
			fontSize: '15px',
			showOnlyTheLastOne: true
		})
		Loading.init( {
			svgColor : '#17C2EC'
		})

		Block.init({
			svgColor : '#17C2EC'
		})

		Confirm.init({
			titleColor : "#17C2EC",
			okButtonBackground : "#17C2EC"
		})

		Report.init({
			svgSize : '60px',
			success : {
				svgColor : "#17C2EC",
				titleColor : '#17C2EC',
				buttonBackground : '#17C2EC',
				buttonColor : '#fff'
			}
		})

		Loading.pulse();
	}

	ngAfterViewInit() {
		Loading.remove(500);
	}

}
