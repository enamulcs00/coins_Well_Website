import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Block, Notify } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
	selector: 'signup-activate',
	templateUrl: './signup-activate.component.html',
	styleUrls: ['./signup-activate.component.scss']
})
export class SignupActivateComponent implements OnInit {
	@Input('data') data: any;
	@Input('type') type: any = 'new';
	@Output('verified') verified : EventEmitter<any> = new EventEmitter();
	otp: string = '';
	constructor(private _auth: AuthService) { }

	ngOnInit(): void {
		console.log("data", this.data);
	}
	checkOTP(event) {
		this.otp = event.join('');
		console.log("this.otp",this.otp);
	}

	validateOtp() {
		if (this.otp.length == 4) {
			Block.circle('#validate-otp-button');
			const formData = Object.assign({
				...this.data,
				"otp" : this.otp
			});
			delete formData.full_phone;
			this._auth.verifyOtp(formData).subscribe(res => {
				Block.remove('#validate-otp-button');
				Notify.success(res.message);
				this.verified.emit(res.data);
			}, _ => {
				Block.remove('#validate-otp-button');
			})
		} else if (this.otp.length == 0) {
			Notify.failure("Please fill Otp.");
		}
		else {
			Notify.failure("Invalid Otp");
		}
	}

}


