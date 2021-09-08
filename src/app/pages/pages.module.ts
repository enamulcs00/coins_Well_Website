import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
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
import { SharedModule } from '../shared/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContentShowComponent } from './content-show/content-show.component';

@NgModule({
	declarations: [
		LandingpageComponent,
		AboutusComponent,
		CongratulationsComponent,
		VerifyaccountComponent,
		VerifyphonenumberComponent,
		TicketComponent,
		ChangeTranstionpinComponent,
		SetappPinComponent,
		ChangepasswordComponent,
		ChangeemailComponent,
		EmailverifyComponent,
		RateComponent,
		ContactUsComponent,
		ContentShowComponent
	],
	imports: [
		CommonModule,
		PagesRoutingModule,
		FormsModule,
		LayoutModule,
		MaterialCommonModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class PagesModule { }
