import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { SellComponent } from './sell/sell.component';
import { DepositComponent } from './deposit/deposit.component';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home.component';
import { MaterialCommonModule } from '../../../material-common/material-common.module';
import { SwiperCardComponent } from './swiper-card/swiper-card.component';
import { BalanceComponent } from './balance/balance.component';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
	declarations: [WithdrawComponent, SellComponent, DepositComponent, BuyComponent, HomeComponent, SwiperCardComponent, BalanceComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		MaterialCommonModule,
		MatSelectModule
	]
})
export class HomeModule { }
