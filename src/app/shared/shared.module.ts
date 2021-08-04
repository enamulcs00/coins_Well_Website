import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmaccountComponent } from './confirmaccount/confirmaccount.component';
import { UpdatephonenoComponent } from './updatephoneno/updatephoneno.component';
import { MaterialCommonModule } from '../material-common/material-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from '../ngx-input-tel';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { LoginSvg } from './svg/loginSvg';
@NgModule({
  declarations: [ConfirmaccountComponent, UpdatephonenoComponent, LoginSvg],
  imports: [
    CommonModule,
    MaterialCommonModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputModule,
    NgxOtpInputModule
  ],
  exports: [ConfirmaccountComponent, UpdatephonenoComponent, LoginSvg]
})
export class SharedModule { }
