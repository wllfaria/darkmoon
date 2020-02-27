import { Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const ROUTER: Routes = [
	{
		path: '',
		component: TemplateComponent,
		children: [
			{ path: '', pathMatch: 'full', component: HomeComponent },
            { path: 'p', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
            { path: 'a', loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule) },
            { path: 'u', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) }
		]
	},
	{ path: '**', component: NotFoundComponent }
];
