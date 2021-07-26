import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { SellComponent } from './sell/sell.component';
import { DepositComponent } from './deposit/deposit.component';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home.component';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'withdraw',
		pathMatch: 'full',
	},
	{
		path : '',
		component :  HomeComponent,
		children : [
			{
				path : 'withdraw',
				component : WithdrawComponent
			},
			{
				path : 'sell',
				component : SellComponent
			},
			{
				path : 'deposit',
				component : DepositComponent
			},
			{
				path : 'buy',
				component : BuyComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
