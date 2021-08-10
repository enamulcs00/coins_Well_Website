import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { NotificationComponent } from './notification/notification.component';
import { RateDashComponent } from './rate-dash/rate-dash.component';
import { AccountUpgradeComponent } from './account-upgrade/account-upgrade.component';
import { ReferComponent } from './refer/refer.component';
import { FaqComponent } from './faq/faq.component';
import { DepositNgnComponent } from './deposit-ngn/deposit-ngn.component';
import { AddbankdetailsComponent } from './addbankdetails/addbankdetails.component';
import { WithdrawcryptoComponent } from './withdrawcrypto/withdrawcrypto.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: '',
		component: DashboardComponent,
		children: [{
			path: 'home',
			loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
		},
		{
			path: 'transactions',
			component: TransactionsComponent,
		},
		{
			path: 'transactions-details',
			component: TransactionDetailsComponent,
		},
		{
			path: 'my-details',
			component: MydetailsComponent,
		}, {
			path: 'notification',
			component: NotificationComponent
		}, {
			path: 'rate',
			component: RateDashComponent,
		}, {
			path: 'upgrade-account',
			component: AccountUpgradeComponent,
		}, {
			path: 'refer',
			component: ReferComponent,
		},
		{
			path: 'faq',
			component: FaqComponent,
		},
		{
			path: 'payment',
			loadChildren: () => import('./deposit-ngn/deposit-ngn.module').then(m => m.DepositNgnModule)
		},
		{
			path: 'addbankdetails',
			component: AddbankdetailsComponent,
		}, 
		{
			path: 'addbankdetails/:bank_id',
			component: AddbankdetailsComponent,
		}, 
		{
			path: 'withdrawcryto',
			component: WithdrawcryptoComponent,
		}
		]
	}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
