import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
const exprtModules = [
	MatFormFieldModule,
	MatInputModule,
	MatDialogModule,
	MatTabsModule,
	MatStepperModule
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		...exprtModules
	],
	exports: [...exprtModules]
})
export class MaterialCommonModule { }
