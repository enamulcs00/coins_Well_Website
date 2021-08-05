import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmaccountComponent } from './confirmaccount/confirmaccount.component';
import { UpdatephonenoComponent } from './updatephoneno/updatephoneno.component';
import { MaterialCommonModule } from '../material-common/material-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from '../ngx-input-tel';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { LoginSvg } from './svg/loginSvg';
import { SignupActivateComponent } from './signup-activate/signup-activate.component';
@NgModule({
  declarations: [ConfirmaccountComponent, UpdatephonenoComponent, LoginSvg, SignupActivateComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputModule,
    NgxOtpInputModule
  ],
  exports: [ConfirmaccountComponent, UpdatephonenoComponent, LoginSvg, SignupActivateComponent]
})
export class SharedModule { }
