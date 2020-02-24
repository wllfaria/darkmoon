import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const ROUTES: Routes = [
	{
		path: '',
        children: [
            {
                path: 'camisetas',
                children: [
                    {
                        path: 'unisex',
                        pathMatch: 'full',
                        redirectTo: ''
                    },
                    {
                        path: 'masculino',
                        component: ProductsListComponent
                    },
                    {
                        path: 'feminino',
                        component: ProductsListComponent
                    },
                    {
                        path: 'longsleeve/unisex',
                        pathMatch: 'full',
                        redirectTo: 'longsleeve'
                    },
                    {
                        path: 'longsleeve',
                        component: ProductsListComponent
                    },
                    {
                        path: 'longsleeve/masculino',
                        component: ProductsListComponent
                    },
                    {
                        path: 'longsleeve/feminino',
                        component: ProductsListComponent
                    },
                    {
                        path: 'longsleeve/unisex/:product',
                        pathMatch: 'full',
                        redirectTo: 'longsleeve/:product'
                    },
                    {
                        path: 'longsleeve/:product',
                        component: ProductDetailsComponent
                    },
                    {
                        path: 'longsleeve/feminino/:product',
                        component: ProductDetailsComponent
                    },
                    {
                        path: 'longsleeve/masculino/:product',
                        component: ProductDetailsComponent
                    },
                ]
            }
        ]
	},
];


@NgModule({
	declarations: [
		ProductsListComponent,
		ProductDetailsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES)
	]
})

export class ProductsModule { }
