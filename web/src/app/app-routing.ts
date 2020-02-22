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
			{ path: 'camisetas', loadChildren: () => import('./pages/shirts/shirts.module').then(m => m.ShirtsModule) },
		]
	},
	{
		path: 'auth',
		loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
	},
	{ path: '**', component: NotFoundComponent }
];
