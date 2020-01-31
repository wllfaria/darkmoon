import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/core/directives/directives.module';

export const ROUTES: Routes = [
	{
		path: '',
		component: AuthenticationComponent,
		children: [
			{
				path: '',
				redirectTo: 'login'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'registro',
				component: RegisterComponent
			},
			{
				path: 'recuperar-conta',
				component: RecoveryComponent
			}
		]
	}
]

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		RecoveryComponent,
		AuthenticationComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		DirectivesModule,
		RouterModule.forChild(ROUTES)
	]
})
export class AuthenticationModule { }
