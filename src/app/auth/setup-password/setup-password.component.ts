import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Block } from 'notiflix';
import { AuthService } from 'src/app/_services/auth.service';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { MustMatch } from 'src/app/_validators/must-match.validator';
@Component({
	selector: 'setup-password',
	templateUrl: './setup-password.component.html',
	styleUrls: ['./setup-password.component.scss']
})
export class SetupPasswordComponent implements OnInit {
	@Input('data') data: any;
	@Output('setupDone') setupDone: EventEmitter<any> = new EventEmitter();
	hide: boolean = true;
	setPasswordForm: FormGroup;

	constructor(private _auth: AuthService, private _fb: FormBuilder) { }

	ngOnInit(): void {
		this.setPasswordForm = this._fb.group({
			password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16), removeSpaces]],
			confirm_password: [null, Validators.required]
		}, { validators: MustMatch('password', 'confirm_password') });
	}

	setupPassword() {
		if (this.setPasswordForm.valid) {
			Block.circle('#setup-password-button');
			const formData = Object.assign(this.setPasswordForm.value);
			delete formData.confirm_password;
			this._auth.setUpPassword(formData, this.data.id).subscribe(res => {
				console.log("res.data",res.data);
				this.setupDone.emit(res.data);
				Block.remove('#setup-password-button');
			}, _ => {
				Block.remove('#setup-password-button');
			})
		} else {
			this.setPasswordForm.markAllAsTouched();
		}
	}

}
