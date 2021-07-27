import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImage } from './defaultimg';

@NgModule({
	declarations: [
		DefaultImage
	],
	imports: [
		CommonModule
	], exports: [DefaultImage]
})
export class DirectiveModule { }
