import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Block } from 'notiflix';

@Component({
	selector: 'app-withdraw',
	templateUrl: './withdraw.component.html',
	styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, AfterViewInit {

	constructor() {
		
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		Block.pulse('#myDiv');
		setTimeout(() => {
			Block.remove('#myDiv');
		}, 3000)
	}

}
