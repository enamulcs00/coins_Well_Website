import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatscreenComponent } from './chatscreen/chatscreen.component';
import { ConfirmaccountComponent } from './confirmaccount/confirmaccount.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { OldphoneComponent } from './oldphone/oldphone.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { SignupActivateComponent } from './signup-activate/signup-activate.component';
import { SignupComponent } from './signup/signup.component';
import { SupportComponent } from './support/support.component';
import { TransactionpinComponent } from './transactionpin/transactionpin.component';
import { TroubleloginComponent } from './troublelogin/troublelogin.component';
import { UpdatephonenoComponent } from './updatephoneno/updatephoneno.component';
import { VerfiyaccountComponent } from './verfiyaccount/verfiyaccount.component';
import { VerifyDocComponent } from './verify-doc/verify-doc.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WhatsEmailidComponent } from './whats-emailid/whats-emailid.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'activate',
		component: SignupActivateComponent
	},
	{
		path: 'setuppassword',
		component: SetupPasswordComponent
	},
	{
		path: 'emailid',
		component: WhatsEmailidComponent
	},
	{
		path: 'createprofie',
		component: CreateprofileComponent
	},
	{
		path: 'transtionpin',
		component: TransactionpinComponent
	},
	{
		path: 'welcome',
		component: WelcomeComponent
	},
	{
		path: 'troublelogin',
		component: TroubleloginComponent
	},
	{
		path: 'forgotpassword',
		component: ForgotpasswordComponent
	},
	{
		path: 'verifyaccount',
		component: VerfiyaccountComponent
	},
	{
		path: 'resetpassword',
		component: ResetpasswordComponent
	},
	{
		path: 'oldphone',
		component: OldphoneComponent
	},
	{
		path: 'confirmaccount',
		component: ConfirmaccountComponent
	},
	{
		path: 'updatephone',
		component: UpdatephonenoComponent
	},
	{
		path: 'support',
		component: SupportComponent
	},
	{
		path: 'chat',
		component: ChatscreenComponent
	},
	{
		path: 'verify-doc',
		component: VerifyDocComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
