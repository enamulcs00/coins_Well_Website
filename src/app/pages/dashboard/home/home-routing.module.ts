import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { SellComponent } from './sell/sell.component';
import { DepositComponent } from './deposit/deposit.component';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home.component';
import { BalanceComponent } from './balance/balance.component';
import { WithdrawcryptoComponent } from '../withdrawcrypto/withdrawcrypto.component';
import { RateDashComponent } from '../rate-dash/rate-dash.component';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'portfolio/withdraw',
		pathMatch: 'full',
	},
	{
		path : '',
		component :  BalanceComponent,
		children : [
			{
				path : 'portfolio',
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
			},
			{
				path: 'payment',
				loadChildren: () => import('../deposit-ngn/deposit-ngn.module').then(m => m.DepositNgnModule)
			},
			{
				path: 'withdrawcryto',
				component: WithdrawcryptoComponent,
			},{
				path: 'rate',
				component: RateDashComponent,
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
