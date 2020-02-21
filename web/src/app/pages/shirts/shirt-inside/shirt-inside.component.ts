import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShirtsService } from 'src/app/core/services/shirts.service';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISku } from 'src/app/models/sku.model';
import { selectCurrentShirt } from 'src/app/core/store/selectors/shirt.selector';

@Component({
	selector: 'app-shirt-inside',
	templateUrl: './shirt-inside.component.html',
	styleUrls: ['./shirt-inside.component.scss']
})
export class ShirtInsideComponent implements OnInit {
	constructor(
		private store$: Store<IAppState>
	) {
		this.shirt$ = this.store$.select(selectCurrentShirt);
	}

	// ! Ngrx definitions
	private shirt$: Observable<ISku>;

	public loading: boolean;

	ngOnInit() {
		this.setupPage();
	}

	private setupPage = (): void => {
		this.loading = true;
	}

	private checkLoading = (): void => {
		if (
			true
		) {
			this.loading = false;
		}
	}

	// getCurrentProduct(): void {
	// 	const urlArray = this.router.url.split('/');
	// 	if (urlArray.length === 5 && urlArray[4].indexOf('-') !== -1) {
	// 		this.shirtsService.getByUrl(urlArray[4]).subscribe(
	// 			response => {
	// 				this.product = response.data[0];
	// 				this.productPreview = this.product.images[0];
	// 			},
	// 			error => { },
	// 			() => {
	// 				console.log('product', this.product);
	// 				this.loading = false;
	// 			}
	// 		);
	// 	}
	// }

	// addToCart(): void {
	// 	let currentCart: any = JSON.parse(
	// 		window.localStorage.getItem('DARKMOONCART')
	// 	);
	// 	if (currentCart) {
	// 		window.localStorage.removeItem('DARKMOONCART');
	// 		const product = {
	// 			sku: this.product.sku,
	// 			name: this.product.product_name,
	// 			url: this.product.product_url,
	// 			size: this.choosenSize
	// 		};
	// 		currentCart.cart.push(product);
	// 		window.localStorage.setItem('DARKMOONCART', JSON.stringify(currentCart));
	// 	} else {
	// 		currentCart = {
	// 			cart: [
	// 				{
	// 					sku: this.product.sku,
	// 					name: this.product.product_name,
	// 					url: this.product.product_url,
	// 					size: this.choosenSize
	// 				}
	// 			]
	// 		};
	// 		window.localStorage.setItem('DARKMOONCART', JSON.stringify(currentCart));
	// 	}
	// }
}
