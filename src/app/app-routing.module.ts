import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
path:'',
redirectTo:'/pages/landingpage',
pathMatch:'full',
},
{
path:'auth',
loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
},
{
path:'pages',
loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule)
},
{
path:'core',
loadChildren:()=>import('./core/core.module').then(m=>m.CoreModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
