import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositComponent } from './deposit/deposit.component';
import { DepositNgnRoutingModule } from './deposit-ngn-routing.module';
import { DepositNgnComponent } from './deposit-ngn.component';
import { WithdrawngnComponent } from './withdrawngn/withdrawngn.component';
import { MaterialCommonModule } from 'src/app/material-common/material-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
	declarations: [DepositComponent, DepositNgnComponent, WithdrawngnComponent],
	imports: [
		CommonModule,
		DepositNgnRoutingModule,
		MaterialCommonModule,
		ReactiveFormsModule,
		NgxMatFileInputModule,
		FormsModule,
		NgxCurrencyModule
	]
})
export class DepositNgnModule { }
