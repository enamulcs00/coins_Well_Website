import { AfterContentInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
declare var Hammer: any;
@Component({
	selector: 'swiper-card',
	templateUrl: './swiper-card.component.html',
	styleUrls: ['./swiper-card.component.scss']
})
export class SwiperCardComponent implements AfterContentInit {
	@Output('approved') approved : EventEmitter<any> = new EventEmitter();
	@Output('rejected') rejected : EventEmitter<any> = new EventEmitter();
	constructor(private ele: ElementRef) { }

	ngAfterContentInit(): void {
		var hammer = this.ele.nativeElement;
		hammer.style.transition = '2s ease-out';
		var mc = new Hammer(hammer);
		mc.on('panstart', (ev) => {
			hammer.style.transition = '.2s ease-out';
			hammer.classList.add('moving-card');
		})

		mc.on("panright", (ev) => {
			hammer.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`
		});

		mc.on("panleft", (ev) => {
			hammer.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`
		});

		mc.on('panend', (ev) => {
			hammer.classList.remove('moving-card');
			console.log("ev", ev);
			if (ev.deltaX > 300) {
				hammer.style.transform = `translateX(${window.innerWidth * 2}px) rotate(${ev.deltaX / 2}deg)`;
				this.approved.emit('approved');
			} else if (ev.deltaX < -300) {
				hammer.style.transform = `translateX(-${window.innerWidth * 2}px) rotate(${ev.deltaX / 2}deg)`
				this.rejected.emit('rejected');
			} else {
				hammer.style.transform = ``
			}
			hammer.style.transition = '2s ease-out';
		})

	}

	approveIt() {
		this.ele.nativeElement.style.transform = `translateX(${window.innerWidth * 2}px) rotate(${300 / 2}deg)`;
		setTimeout(()=>{
			this.approved.emit('approved');
		},2000)
	}

}
