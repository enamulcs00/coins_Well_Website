import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoFactorVerifyComponent } from './two-factor-verify/two-factor-pin.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialCommonModule } from '../material-common/material-common.module';
import { NgxOtpInputModule } from 'ngx-otp-input';


@NgModule({
	declarations: [TwoFactorVerifyComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialCommonModule,
		NgxOtpInputModule
	],
	exports : [TwoFactorVerifyComponent]
})
export class TwoFactorModule { }
