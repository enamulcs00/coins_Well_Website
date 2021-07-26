import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FormsModule } from '@angular/forms';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DepositNgnComponent } from './deposit-ngn/deposit-ngn.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { WithdrawngnComponent } from './withdrawngn/withdrawngn.component';
import { AddbankdetailsComponent } from './addbankdetails/addbankdetails.component';
import { WithdrawcryptoComponent } from './withdrawcrypto/withdrawcrypto.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { VerifyphonenumberComponent } from './verifyphonenumber/verifyphonenumber.component';
import { TicketComponent } from './ticket/ticket.component';
import { ChangeTranstionpinComponent } from './change-transtionpin/change-transtionpin.component';
import { SetappPinComponent } from './setapp-pin/setapp-pin.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { RateComponent } from './rate/rate.component';
import { LayoutModule } from '../layout/layout.module';
import { MaterialCommonModule } from '../material-common/material-common.module';

@NgModule({
	declarations: [
		LandingpageComponent,
		AboutusComponent,
		DepositNgnComponent,
		CongratulationsComponent,
		WithdrawngnComponent,
		AddbankdetailsComponent,
		WithdrawcryptoComponent,
		VerifyaccountComponent,
		VerifyphonenumberComponent,
		TicketComponent,
		ChangeTranstionpinComponent,
		SetappPinComponent,
		ChangepasswordComponent,
		ChangeemailComponent,
		EmailverifyComponent,
		RateComponent
	],
	imports: [
		CommonModule,
		PagesRoutingModule,
		FormsModule,
		LayoutModule,
		MaterialCommonModule
	]
})
export class PagesModule { }
