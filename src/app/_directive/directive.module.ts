import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputCommifiedDirective } from './inputComma';

@NgModule({
	declarations: [
		
		MatInputCommifiedDirective
	],
	imports: [
		CommonModule
	], exports: [MatInputCommifiedDirective]
})
export class DirectiveModule { }
