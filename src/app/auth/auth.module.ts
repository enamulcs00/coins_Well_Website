import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { WhatsEmailidComponent } from './whats-emailid/whats-emailid.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { TransactionpinComponent } from './transactionpin/transactionpin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TroubleloginComponent } from './troublelogin/troublelogin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerfiyaccountComponent } from './verfiyaccount/verfiyaccount.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { OldphoneComponent } from './oldphone/oldphone.component';
import { SupportComponent } from './support/support.component';
import { ChatscreenComponent } from './chatscreen/chatscreen.component';
import { VerifyDocComponent } from './verify-doc/verify-doc.component';
import { MaterialCommonModule } from '../material-common/material-common.module';
import { NgxMatIntlTelInputModule } from '../ngx-input-tel';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MtxSelectModule } from '@ng-matero/extensions/select';

@NgModule({
	declarations: [
		CreateprofileComponent,
		WhatsEmailidComponent,
		LoginComponent,
		SignupComponent,
		SetupPasswordComponent,
		TransactionpinComponent,
		WelcomeComponent,
		TroubleloginComponent,
		ForgotpasswordComponent,
		VerfiyaccountComponent,
		ResetpasswordComponent,
		OldphoneComponent,
		SupportComponent,
		ChatscreenComponent,
		VerifyDocComponent],
	exports: [
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		MaterialCommonModule,
		FormsModule, ReactiveFormsModule,
		NgxMatIntlTelInputModule,
		MatStepperModule,
		NgxOtpInputModule,
		SharedModule,
		MtxSelectModule
	],
	providers: [
		MatStepper
	]
})
export class AuthModule { }
