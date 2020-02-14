import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShirtsListComponent } from './shirts-list/shirts-list.component';
import { ShirtInsideComponent } from './shirt-inside/shirt-inside.component';

const ROUTES: Routes = [
	{
		path: '',
		component: ShirtsListComponent
	},
	{
		path: 'unisex',
		pathMatch: 'full',
		redirectTo: ''
	},
	{
		path: 'masculino',
		component: ShirtsListComponent
	},
	{
		path: 'feminino',
		component: ShirtsListComponent
	},
	{
		path: 'longsleeve/unisex',
		pathMatch: 'full',
		redirectTo: 'longsleeve'
	},
	{
		path: 'longsleeve',
		component: ShirtsListComponent
	},
	{
		path: 'longsleeve/masculino',
		component: ShirtsListComponent
	},
	{
		path: 'longsleeve/feminino',
		component: ShirtsListComponent
	},
	{
		path: 'longsleeve/unisex/:product',
		pathMatch: 'full',
		redirectTo: 'longsleeve/:product'
	},
	{
		path: 'longsleeve/:product',
		component: ShirtInsideComponent
	},
	{
		path: 'longsleeve/feminino/:product',
		component: ShirtInsideComponent
	},
	{
		path: 'longsleeve/masculino/:product',
		component: ShirtInsideComponent
	},
];


@NgModule({
	declarations: [
		ShirtsListComponent,
		ShirtInsideComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES)
	]
})

export class ShirtsModule { }
