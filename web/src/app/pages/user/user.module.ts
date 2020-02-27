import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';

export const ROUTES: Routes = [
	{
		path: '',
		component: UserComponent,
		children: [
			{
				path: '',
				redirectTo: 'profile'
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
		]
	}
];

@NgModule({
  declarations: [
      ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgxMaskModule.forChild()
  ]
})
export class UserModule { }
