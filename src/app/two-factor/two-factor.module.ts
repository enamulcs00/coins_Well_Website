import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoFactorVerifyComponent } from './two-factor-verify/two-factor-pin.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialCommonModule } from '../material-common/material-common.module';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { VerifyOtpPinComponent } from './verify-otp/verify-otp-pin.component';

@NgModule({
	declarations: [TwoFactorVerifyComponent, VerifyOtpPinComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialCommonModule,
		NgxOtpInputModule
	],
	exports : [TwoFactorVerifyComponent, VerifyOtpPinComponent]
})
export class TwoFactorModule { }
