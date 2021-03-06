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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MtxSelectModule } from '@ng-matero/extensions';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MyEarningComponent } from './my-earning/my-earning.component';
import {WebcamModule} from 'ngx-webcam';
import { BuyCryptoComponent } from './buy-crypto/buy-crypto.component';
import { SellCryptoComponent } from './sell-crypto/sell-crypto.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { ConfirmPinComponent } from './confirm-pin/confirm-pin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DepositCryptoComponent } from './deposit-crypto/deposit-crypto.component';
import { DirectiveModule } from '../../_directive/directive.module';
import { TwofactorComponent } from './twofactor/twofactor.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TwoFactorModule } from 'src/app/two-factor/two-factor.module';

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
		MyEarningComponent,
		BuyCryptoComponent,
		SellCryptoComponent,
		ConfirmPinComponent,
		DepositCryptoComponent,
		TwofactorComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		MaterialCommonModule,
		ReactiveFormsModule,
		MtxSelectModule,
		MatPaginatorModule,
		WebcamModule,
		NgxCurrencyModule,
		MatDialogModule,
		NgxMatFileInputModule,
		DirectiveModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		FormsModule,
		TwoFactorModule
	],
	entryComponents : [ConfirmPinComponent]
})
export class DashboardModule { }
