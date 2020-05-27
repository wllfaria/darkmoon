import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { PanelComponent } from './panel/panel.component';
import { AddressComponent } from './address/address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const ROUTES: Routes = [
	{
		path: '',
		component: UserComponent,
		children: [
			{
				path: '',
				redirectTo: 'painel'
            },
            {
                path: 'painel',
                component: PanelComponent
            },
			{
				path: 'perfil',
				component: ProfileComponent
            },
            {
                path: 'enderecos',
                component: AddressComponent
            },
            {
                path: 'meus-pedidos',
                component: MyOrdersComponent
            },
            {
                path: 'lista-desejos',
                component: WishlistComponent
            }
		]
	}
];

@NgModule({
  declarations: [
      ProfileComponent,
      PanelComponent,
      AddressComponent,
      MyOrdersComponent,
      WishlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgxMaskModule.forChild()
  ]
})
export class UserModule { }
