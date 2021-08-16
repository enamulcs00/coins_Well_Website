import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { NotificationComponent } from './notification/notification.component';
import { AccountUpgradeComponent } from './account-upgrade/account-upgrade.component';
import { ReferComponent } from './refer/refer.component';
import { FaqComponent } from './faq/faq.component';
import { AddbankdetailsComponent } from './addbankdetails/addbankdetails.component';
import { MyEarningComponent } from './my-earning/my-earning.component';

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
			path: 'transactions-details/:transactionId',
			component: TransactionDetailsComponent,
		},
		{
			path: 'my-details',
			component: MydetailsComponent,
		}, {
			path: 'notification',
			component: NotificationComponent
		}, { 
			path: 'upgrade-account',
			component: AccountUpgradeComponent,
		}, 
		{
			path: 'refer',
			component: ReferComponent,
		},
		{
			path: 'my-earnings',
			component: MyEarningComponent,
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
			path: 'editankdetails/:bank_id',
			component: AddbankdetailsComponent,
		}, 
		]
	}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
