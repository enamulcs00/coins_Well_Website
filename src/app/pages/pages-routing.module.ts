import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
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
import { FullComponent } from '../layout/full/full.component';
import { WithoutheaderComponent } from '../layout/withoutheader/withoutheader.component';
import { AuthGuard } from '../_gurads/auth.guard';
import { ConfirmaccountComponent } from '../shared/confirmaccount/confirmaccount.component';
import { UpdatephonenoComponent } from '../shared/updatephoneno/updatephoneno.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContentShowComponent } from './content-show/content-show.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
const routes: Routes = [
	{
		path: '',
		redirectTo: '/landingpage',
		pathMatch: 'full',
	},
	{
		path: '',
		component: WithoutheaderComponent,
		children: [
			{
				path: 'tpc',
				component: ChangeTranstionpinComponent,
			},
			{
				path: 'change-email',
				component: ChangeemailComponent,
			},
			{
				path: 'email-code',
				component: EmailverifyComponent,
			},
			{
				path: 'chanage-password',
				component: ChangepasswordComponent,
			},
			{
				path: 'change-phone-number',
				component: ConfirmaccountComponent,
			},
			{
				path: 'update-number',
				component: UpdatephonenoComponent,
			},
			{
				path: 'Congratulations',
				component: CongratulationsComponent,
			},
			{
				path: 'sap',
				component: SetappPinComponent,
			},
			{
				path: 'verify-account',
				component: VerifyaccountComponent,
			},
			{
				path: 'verify-phonenumber',
				component: VerifyphonenumberComponent,
			}
		]
	},
	{
		path: '',
		component: FullComponent,
		children: [
			{
				path: 'landingpage',
				component: LandingpageComponent
			},
			{
				path: 'dashboard',
				canActivate: [AuthGuard],
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
			},
			{
				path: 'ticket',
				component: TicketComponent,
			},
			{
				path: 'rate',
				component: RateComponent
			},
			{
				path: 'contact_us',
				component: ContactUsComponent
			},
			{
				path: 'content/privacy_policy',
				component: ContentShowComponent
			},
			{
				path: 'content/about_us',
				component: ContentShowComponent
			},
			{
				path: 'content/terms_and_condition',
				component: ContentShowComponent
			},
			{
				path: 'content/cookie_service',
				component: ContentShowComponent
			},
			{
				path: 'content/aml',
				component: ContentShowComponent
			},
			{
				path: 'companyType/features',
				component: CompanyTypeComponent
			},
			{
				path: 'companyType/download',
				component: CompanyTypeComponent
			},
			{
				path: 'companyType/security',
				component: CompanyTypeComponent
			},
			{
				path: 'companyType/fee',
				component: CompanyTypeComponent
			}
			
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
