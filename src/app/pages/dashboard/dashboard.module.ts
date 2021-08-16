import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialCommonModule } from '../../material-common/material-common.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { NotificationComponent } from './notification/notification.component';
import { RateDashComponent } from './rate-dash/rate-dash.component';
import { AccountUpgradeComponent } from './account-upgrade/account-upgrade.component';
import { ReferComponent } from './refer/refer.component';
import { FaqComponent } from './faq/faq.component';
import { AddbankdetailsComponent } from './addbankdetails/addbankdetails.component';
import { WithdrawcryptoComponent } from './withdrawcrypto/withdrawcrypto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MtxSelectModule } from '@ng-matero/extensions';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MyEarningComponent } from './my-earning/my-earning.component';
@NgModule({
	declarations: [
		LeftSidebarComponent,
		DashboardComponent,
		MydetailsComponent,
		TransactionsComponent,
		TransactionDetailsComponent,
		NotificationComponent,
		RateDashComponent,
		AccountUpgradeComponent,
		ReferComponent,
		FaqComponent,
		AddbankdetailsComponent,
		WithdrawcryptoComponent,
		MyEarningComponent
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		MaterialCommonModule,
		ReactiveFormsModule,
		MtxSelectModule,
		MatPaginatorModule
	]
})
export class DashboardModule { }
