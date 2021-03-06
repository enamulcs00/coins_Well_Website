import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FullComponent } from './full/full.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ChatIconComponent } from './chat-icon/chat-icon.component';
import { WithoutheaderComponent } from './withoutheader/withoutheader.component';
import { AuthService } from '../_services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

// import
@NgModule({
	declarations: [
		HeaderComponent,
		FullComponent,
		FooterComponent,
		ChatIconComponent,
		WithoutheaderComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		NgScrollbarModule
	],
	exports: [FullComponent, WithoutheaderComponent],
	providers : [AuthService]
})
export class LayoutModule { }
