import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Notification } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from '../pages/transactions/transactions.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { DepositNgnComponent } from './deposit-ngn/deposit-ngn.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { WithdrawngnComponent } from './withdrawngn/withdrawngn.component';
import { AddbankdetailsComponent } from './addbankdetails/addbankdetails.component';
import { WithdrawcryptoComponent } from './withdrawcrypto/withdrawcrypto.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { VerifyphonenumberComponent } from './verifyphonenumber/verifyphonenumber.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { AccountUpgradeComponent } from './account-upgrade/account-upgrade.component';
import { ReferComponent } from './refer/refer.component';
import { FaqComponent } from './faq/faq.component';
import { TicketComponent } from './ticket/ticket.component';
import { ChangeTranstionpinComponent } from './change-transtionpin/change-transtionpin.component';
import { SetappPinComponent } from './setapp-pin/setapp-pin.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { RateComponent } from './rate/rate.component';
import { FullComponent } from '../layout/full/full.component';
import { WithoutheaderComponent } from '../layout/withoutheader/withoutheader.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/landingpage',	
		pathMatch: 'full',
	},
	{
		path  : '',
		component: FullComponent,
		children: [
			{
				path: 'landingpage',
				component: LandingpageComponent
			},
			{
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: 'notification',
				component: NotificationComponent
			},
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'transactions-page',
				component: TransactionsComponent,
			},
			{
				path: 'transactions-details',
				component: TransactionDetailsComponent,
			},
			{
				path: 'aboutus',
				component: AboutusComponent,
			},
			{
				path: 'deposit-ngn',
				component: DepositNgnComponent,
			},
			{
				path: 'withdrawngn',
				component: WithdrawngnComponent,
			},
			{
				path: 'addbankdetails',
				component: AddbankdetailsComponent,
			},
			{
				path: 'withdrawcryto',
				component: WithdrawcryptoComponent,
			},
			{
				path: 'my-details',
				component: MydetailsComponent,
			},
			{
				path: 'upgrade-account',
				component: AccountUpgradeComponent,
			},
			{
				path: 'refer',
				component: ReferComponent,
			},
			{
				path: 'faq',
				component: FaqComponent,
			},
			{
				path: 'ticket',
				component: TicketComponent,
			},
			{
				path: 'rate',
				component: RateComponent
			}
		]
	},
	{
		path : '',
		component : WithoutheaderComponent,
		children : [
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
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
