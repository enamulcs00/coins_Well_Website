import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';import { ChatIconComponent } from './chat-icon/chat-icon.component';
''
const routes: Routes = [
{
  path:'navbar',
  component:NavbarComponent
},
{
  path:'footer',
  component:FooterComponent
},
{
  path:'chat-icon',
  component:ChatIconComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
