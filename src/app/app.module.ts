import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '../app/core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from '../app/auth/signup/signup.component';
// import { SignupActivateComponent } from '../app/auth/signup-activate/signup-activate.component';
// import { SetupPasswordComponent } from '../app/auth/setup-password/setup-password.component';
// import { WhatsEmailidComponent } from '../app/auth/whats-emailid/whats-emailid.component';
// import { CreateprofileComponent } from '../app/auth/createprofile/createprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // SignupActivateComponent,
    // SignupComponent,
    // SetupPasswordComponent,
    // WhatsEmailidComponent,
    // CreateprofileComponent
  ],
  exports:[
CoreModule,FooterComponent,NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
    NoopAnimationsModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent],
  // entryComponents:[LoginComponent,SignupComponent,SignupActivateComponent,SetupPasswordComponent,WhatsEmailidComponent,CreateprofileComponent]
})
export class AppModule { }
