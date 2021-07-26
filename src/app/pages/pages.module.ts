import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AboutusComponent } from './aboutus/aboutus.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { RateComponent } from './rate/rate.component';
import { LayoutModule } from '../layout/layout.module';
@NgModule({
	declarations: [LandingpageComponent, DashboardComponent, NotificationComponent, HomeComponent, TransactionsComponent, AboutusComponent, DepositNgnComponent, CongratulationsComponent, WithdrawngnComponent, AddbankdetailsComponent, WithdrawcryptoComponent, VerifyaccountComponent, VerifyphonenumberComponent, TransactionDetailsComponent, MydetailsComponent, AccountUpgradeComponent, ReferComponent, FaqComponent, TicketComponent, ChangeTranstionpinComponent, SetappPinComponent, ChangepasswordComponent, ChangeemailComponent, EmailverifyComponent, RateComponent,],

	imports: [
		CommonModule,
		PagesRoutingModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatTabsModule,
		LayoutModule
	]
})
export class PagesModule { }
