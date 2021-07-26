import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositNgnComponent } from './deposit-ngn.component'
import { DepositComponent } from './deposit/deposit.component'
import { WithdrawngnComponent } from './withdrawngn/withdrawngn.component';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'deposit',
		pathMatch: 'full',
	},
	{
		path: '',
		component: DepositNgnComponent,
		children: [{
			path: 'deposit',
			component: DepositComponent
		}, {
			path: 'withdrawal',
			component: WithdrawngnComponent,
		},]
	}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DepositNgnRoutingModule { }
