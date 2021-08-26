import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImage } from './defaultimg';
import { MatInputCommifiedDirective } from './inputComma';

@NgModule({
	declarations: [
		DefaultImage,
		MatInputCommifiedDirective
	],
	imports: [
		CommonModule
	], exports: [DefaultImage, MatInputCommifiedDirective]
})
export class DirectiveModule { }
