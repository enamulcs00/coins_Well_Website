import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { SellComponent } from './sell/sell.component';
import { DepositComponent } from './deposit/deposit.component';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home.component';
import { MaterialCommonModule } from '../../../material-common/material-common.module';
import { BalanceComponent } from './balance/balance.component';
import { MatSelectModule } from '@angular/material/select';
import { AllComponent } from './all/all.component';
@NgModule({
	declarations: [WithdrawComponent, SellComponent, DepositComponent, BuyComponent, HomeComponent, BalanceComponent, AllComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		MaterialCommonModule,
		MatSelectModule
	]
})
export class HomeModule { }
