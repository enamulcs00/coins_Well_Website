import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ChatIconComponent } from './chat-icon/chat-icon.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, ChatIconComponent],
  exports:[
    NavbarComponent, FooterComponent,ChatIconComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],

})
export class CoreModule { }
