import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { RequestErrorDirective } from './request-error.directive';

@NgModule({
	declarations: [
		RequestErrorDirective
	],
	imports: [
		CommonModule,
		ComponentsModule
	],
	exports: [
		RequestErrorDirective
	]
})
export class DirectivesModule {}
